import React, { useEffect, useMemo, useState } from "react";
import { Check, Clock, XCircle, ArrowRight, ArrowLeft, FileCheck, Building, Shield, Settings } from "lucide-react";
import { Flags, Requirement, RequirementState, EvaluatedRequirement, CIIUPreset } from "../Requirements/types";
import { RULES } from "../Requirements/rules";

// =============================
// Presets CIIU (demo)
// =============================
const CIIU_PRESETS: CIIUPreset[] = [
  { code: "5610", name: "Restaurantes y servicios móviles de comida", flags: { handlesFood: true, hasDischarges: true, hasPublicPremises: true } },
  { code: "5511", name: "Alojamiento en hoteles", flags: { isTourismProvider: true, hasPublicPremises: true } },
  { code: "4791", name: "Comercio por Internet (e-commerce)", flags: { hasPublicPremises: false } },
  { code: "4711", name: "Comercio minorista no especializado", flags: { hasPublicPremises: true } }
];

// =============================
// Helpers de Lógica (sin cambios)
// =============================
function compareAforo(cond: Requirement["conditions"], value: number) {
  const r = cond && (cond as any).expectedAforo;
  if (r == null) return true;
  if (typeof r === "number") return value === r;
  if (r.gt != null && !(value > r.gt)) return false;
  if (r.gte != null && !(value >= r.gte)) return false;
  if (r.lt != null && !(value < r.lt)) return false;
  if (r.lte != null && !(value <= r.lte)) return false;
  return true;
}

function isApplicable(r: Requirement, flags: Flags): boolean {
  if (r.always) return true;
  if (!r.conditions) return true;
  const c = r.conditions;
  const keys = Object.keys(c) as (keyof Flags | "expectedAforo")[];
  for (const k of keys) {
    if (k === "expectedAforo") continue;
    const v = (c as any)[k];
    if (v !== undefined && (flags as any)[k] !== v) return false;
  }
  return compareAforo(r.conditions, flags.expectedAforo);
}

function slugify(s: string) {
  const lower = (s || "").toLowerCase().trim().replace(/\s+/g, "-");
  return lower.replace(/[^a-z0-9-]/g, "").slice(0, 64);
}



// Badge para estado (Cumplido, Pendiente, N/A)
function RequirementStatusBadge({ state }: { state: RequirementState }) {
  const config = {
    approved: { icon: Check, className: "bg-green-100 text-green-700", label: "Cumplido" },
    pending: { icon: Clock, className: "bg-amber-100 text-amber-700", label: "Pendiente" },
    na: { icon: XCircle, className: "bg-slate-200 text-slate-600", label: "No Aplica" },
  };
  const current = config[state];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${current.className}`}>
      <current.icon className="h-3.5 w-3.5 mr-1.5" />
      {current.label}
    </span>
  );
}

// Stepper visual para el progreso del wizard
function WizardProgressBar({ steps, currentStepIndex }: { steps: readonly { key: string; title: string; icon: React.ElementType }[], currentStepIndex: number }) {
  const progress = Math.round(((currentStepIndex + 1) / steps.length) * 100);

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-2">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isDone = index < currentStepIndex;
          const Icon = step.icon;
          return (
            <div key={step.key} className="flex-1 text-center">
              <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                isActive ? "bg-orange-500 text-white scale-110" : isDone ? "bg-green-600 text-white" : "bg-gray-200 text-gray-500"
              }`}>
                {isDone ? <Check size={24} /> : <Icon size={24} />}
              </div>
              <p className={`text-sm mt-3 font-semibold ${isActive ? "text-orange-600" : isDone ? "text-green-700" : "text-gray-500"}`}>
                {step.title}
              </p>
            </div>
          );
        })}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-green-600 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-right text-sm font-semibold text-green-700 mt-2">{progress}% Completado</p>
    </div>
  );
}

// Componente para un campo de formulario con label y error
function FormField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1.5">{error}</p>}
    </div>
  );
}

// =============================
// Componente Principal del Wizard
// =============================
export default function FormalizationWizard() {
  // --- ESTADO DEL FORMULARIO ---
  const [bizName, setBizName] = useState("");
  const [city, setCity] = useState<string>("Villavicencio");
  const [legalForm, setLegalForm] = useState<Flags["legalForm"]>("Natural");
  const [ciiu, setCiiu] = useState<string>("");
  const [hasPublicPremises, setHasPublicPremises] = useState<boolean>(false);
  const [expectedAforo, setExpectedAforo] = useState<number>(0);
  const [handlesFood, setHandlesFood] = useState(false);
  const [hasDischarges, setHasDischarges] = useState(false);
  const [isTourismProvider, setIsTourismProvider] = useState(false);
  const [processesPersonalData, setProcessesPersonalData] = useState(false);
  const [meetsSICThresholds, setMeetsSICThresholds] = useState(false);
  const [isElectronicInvoicingObliged, setIsElectronicInvoicingObliged] = useState(false);

  // --- ESTADO DEL WIZARD ---
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [checklistStates, setChecklistStates] = useState<Record<string, RequirementState>>({});

  // --- DATOS Y LÓGICA DERIVADA ---

  // Definición de los pasos del wizard
  const steps = useMemo(() => [
    { key: "identidad", title: "Identificación", icon: Building },
    { key: "riesgos", title: "Local y Riesgos", icon: Shield },
    { key: "operacion", title: "Operación", icon: Settings },
    { key: "checklist", title: "Mi Checklist", icon: FileCheck }
  ] as const, []);

  // Auto-rellenado de flags basado en el código CIIU seleccionado
  useEffect(() => {
    const preset = CIIU_PRESETS.find(p => p.code === ciiu);
    if (!preset) return;
    setHasPublicPremises(prev => prev || !!preset.flags.hasPublicPremises);
    setHandlesFood(prev => prev || !!preset.flags.handlesFood);
    setHasDischarges(prev => prev || !!preset.flags.hasDischarges);
    setIsTourismProvider(prev => prev || !!preset.flags.isTourismProvider);
  }, [ciiu]);

  // Objeto 'flags' que agrupa todas las respuestas del usuario
  const flags: Flags = useMemo(() => ({
    city: (city || "").trim() || "Villavicencio",
    legalForm, ciiu, hasPublicPremises,
    expectedAforo: Number(expectedAforo) || 0,
    handlesFood, hasDischarges, isTourismProvider,
    processesPersonalData, meetsSICThresholds, isElectronicInvoicingObliged
  }), [city, legalForm, ciiu, hasPublicPremises, expectedAforo, handlesFood, hasDischarges, isTourismProvider, processesPersonalData, meetsSICThresholds, isElectronicInvoicingObliged]);

  // Evaluación de qué requerimientos aplican basado en las 'flags'
  const evaluatedRequirements: EvaluatedRequirement[] = useMemo(() =>
    RULES.map(r => ({
      ...r,
      applicable: isApplicable(r, flags),
      state: checklistStates[r.key] || "pending"
    })),
  [flags, checklistStates]);

  // Agrupación de requerimientos aplicables por categoría para mostrarlos en el checklist
  const groupedChecklist = useMemo(() => {
    const grouped: Record<string, EvaluatedRequirement[]> = {};
    evaluatedRequirements.forEach(er => {
      if (!er.applicable) return;
      (grouped[er.category] = grouped[er.category] || []).push(er);
    });
    Object.values(grouped).forEach(group => group.sort((a, b) => Number(!!a.optional) - Number(!!b.optional)));
    return grouped;
  }, [evaluatedRequirements]);

  // Validación de errores para el paso actual
  const stepErrors = useMemo(() => {
    const e: Record<string, string> = {};
    if (stepIndex === 0) {
      if (!bizName || bizName.trim().length < 3) e.bizName = "Ingresa un nombre de negocio (mín. 3 caracteres).";
      if (!city || city.trim().length < 3) e.city = "Ingresa la ciudad.";
    }
    if (stepIndex === 1) {
      if (hasPublicPremises && expectedAforo < 1) e.expectedAforo = "Si tienes local, el aforo debe ser al menos 1.";
    }
    return e;
  }, [stepIndex, bizName, city, hasPublicPremises, expectedAforo]);

  // --- MANEJADORES DE EVENTOS ---

  const handleNext = () => {
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStepIndex(s => Math.min(s + 1, steps.length - 1));
  };

  const handleBack = () => {
    setErrors({});
    setStepIndex(s => Math.max(s - 1, 0));
  };

  const handleFinish = () => {

    const dataToStore = evaluatedRequirements
      .filter(r => r.applicable)
      .map(r => ({
        key: r.key,
        title: r.title,
        state: r.state,
        category: r.category,
        optional: !!r.optional
      }));

    // 2. Guardar en localStorage
    try {
      localStorage.setItem('formalizationChecklist', JSON.stringify(dataToStore, null, 2));

      //Aqui puede ir logica para mostrar un modal bonito con el mensaje de exito
    } catch (error) {
      console.error('Error al guardar el checklist en localStorage:', error);
      alert('Error al guardar el checklis, porfavor revisa tu respuestas');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setRequirementState = (key: string, state: RequirementState) => {
    setChecklistStates(prev => ({ ...prev, [key]: state }));
  };


  return (
    <section className="py-12 md:py-20 bg-green-50/70">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800 mb-3">
            Tu Ruta hacia la Formalización
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Este asistente inteligente te guiará paso a paso para generar una lista de requisitos a tu medida. ¡Empecemos!
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200/80">
          <WizardProgressBar steps={steps} currentStepIndex={stepIndex} />


          <div className="transition-all duration-300">
            {stepIndex === 0 && (
              <div>
                <h3 className="text-2xl font-bold text-green-800 mb-6">1. Identificación del Negocio</h3>
                <FormField label="Nombre de tu Negocio o Emprendimiento" error={errors.bizName}>
                  <input value={bizName} onChange={e => setBizName(e.target.value)} placeholder="Ej: Artesanías El Caporal" className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 ${errors.bizName ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-orange-300 focus:border-orange-400"}`} />
                </FormField>
                <div className="grid md:grid-cols-2 gap-x-6">
                  <FormField label="Ciudad" error={errors.city}>
                    <input value={city} onChange={e => setCity(e.target.value)} className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 ${errors.city ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-orange-300 focus:border-orange-400"}`} />
                  </FormField>
                  <FormField label="Tipo de Persona">
                    <select value={legalForm} onChange={e => setLegalForm(e.target.value as Flags["legalForm"])} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400">
                      <option>Natural</option> <option>SAS</option> <option>LTDA</option> <option>Otra</option>
                    </select>
                  </FormField>
                </div>
                 <FormField label="Código CIIU">
                    <select value={ciiu} onChange={e => setCiiu(e.target.value)} className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400">
                      <option value="">— Seleccionar para autocompletar —</option>
                      {CIIU_PRESETS.map(p => <option key={p.code} value={p.code}>{p.code} — {p.name}</option>)}
                    </select>
                  </FormField>
              </div>
            )}

            {stepIndex === 1 && (
              <div>
                <h3 className="text-2xl font-bold text-green-800 mb-6">2. Sobre tu Local y Actividad</h3>
                <div className="space-y-5">
                    <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
                        <input type="checkbox" checked={hasPublicPremises} onChange={e => setHasPublicPremises(e.target.checked)} className="h-5 w-5 rounded text-orange-600 focus:ring-orange-500" />
                        <span className="ml-4 text-sm font-medium text-gray-800">¿Tienes un local físico abierto al público?</span>
                    </label>
                    {hasPublicPremises && (
                        <FormField label="Aforo Estimado del Local" error={errors.expectedAforo}>
                            <input type="number" value={expectedAforo} onChange={e => setExpectedAforo(Number(e.target.value))} className={`w-full rounded-lg border px-4 py-2.5 focus:outline-none focus:ring-2 ${errors.expectedAforo ? "border-red-500 ring-red-200" : "border-gray-300 focus:ring-orange-300 focus:border-orange-400"}`} />
                        </FormField>
                    )}
                    <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
                        <input type="checkbox" checked={handlesFood} onChange={e => setHandlesFood(e.target.checked)} className="h-5 w-5 rounded text-orange-600 focus:ring-orange-500" />
                        <span className="ml-4 text-sm font-medium text-gray-800">¿Manipulas o preparas alimentos?</span>
                    </label>
                    <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
                        <input type="checkbox" checked={hasDischarges} onChange={e => setHasDischarges(e.target.checked)} className="h-5 w-5 rounded text-orange-600 focus:ring-orange-500" />
                        <span className="ml-4 text-sm font-medium text-gray-800">¿Generas vertimientos, emisiones o ruido significativo?</span>
                    </label>
                     <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
                        <input type="checkbox" checked={isTourismProvider} onChange={e => setIsTourismProvider(e.target.checked)} className="h-5 w-5 rounded text-orange-600 focus:ring-orange-500" />
                        <span className="ml-4 text-sm font-medium text-gray-800">¿Eres un prestador de servicios turísticos (hotel, agencia, etc.)?</span>
                    </label>
                </div>
              </div>
            )}
            
            {stepIndex === 2 && (
                 <div>
                    <h3 className="text-2xl font-bold text-green-800 mb-6">3. Sobre tu Operación Contable y de Datos</h3>
                    <div className="space-y-5">
                        <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
                            <input type="checkbox" checked={isElectronicInvoicingObliged} onChange={e => setIsElectronicInvoicingObliged(e.target.checked)} className="h-5 w-5 rounded text-orange-600 focus:ring-orange-500" />
                            <span className="ml-4 text-sm font-medium text-gray-800">¿Estás obligado a emitir Factura Electrónica?</span>
                        </label>
                        <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
                            <input type="checkbox" checked={processesPersonalData} onChange={e => setProcessesPersonalData(e.target.checked)} className="h-5 w-5 rounded text-orange-600 focus:ring-orange-500" />
                            <span className="ml-4 text-sm font-medium text-gray-800">¿Almacenas y tratas datos personales de clientes o empleados?</span>
                        </label>
                        {processesPersonalData && (
                            <label className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition cursor-pointer">
                                <input type="checkbox" checked={meetsSICThresholds} onChange={e => setMeetsSICThresholds(e.target.checked)} className="h-5 w-5 rounded text-orange-600 focus:ring-orange-500" />
                                <span className="ml-4 text-sm font-medium text-gray-800">¿Tus activos totales superan las 100,000 UVT? (Requerido para RNBD)</span>
                            </label>
                        )}
                    </div>
                </div>
            )}

            {stepIndex === 3 && (
              <div>
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-green-800">4. Tu Checklist de Formalización Personalizado</h3>
                    <p className="text-gray-600 mt-2">Basado en tus respuestas, estos son los requisitos que te aplican. ¡Manos a la obra!</p>
                </div>

                {Object.keys(groupedChecklist).length === 0 && (
                    <div className="text-center text-gray-600 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                        <p>Completa los pasos anteriores para generar tu checklist.</p>
                    </div>
                )}

                <div className="space-y-8">
                    {Object.entries(groupedChecklist).map(([category, items]) => (
                    <div key={category}>
                        <h4 className="text-lg font-bold text-green-700 mb-4 pb-2 border-b-2 border-green-200">{category}</h4>
                        <ul className="space-y-4">
                        {items.map(item => (
                            <li key={item.key} className="bg-white rounded-lg border border-gray-200 p-4 transition hover:shadow-md hover:border-green-300">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                <p className="font-bold text-gray-800">{item.title}</p>
                                {item.description && <p className="text-sm text-gray-600 mt-1">{item.description}</p>}
                                </div>
                                <div className="flex-shrink-0">
                                    <RequirementStatusBadge state={item.state} />
                                </div>
                            </div>
                            
                            {(item.renewalHint || item.links) && <div className="mt-3 pt-3 border-t border-gray-100">
                                {item.renewalHint && <p className="text-xs text-gray-500"><strong>Renovación:</strong> {item.renewalHint}</p>}
                                {item.links && (
                                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                                    {item.links.map((l, i) => (
                                        <a key={i} href={l.url} target="_blank" rel="noreferrer" className="text-xs font-medium text-blue-600 hover:underline">{l.label}</a>
                                    ))}
                                    </div>
                                )}
                            </div>}

                            <div className="mt-4 flex items-center gap-2">
                                <button onClick={() => setRequirementState(item.key, "approved")} className="text-xs font-semibold rounded-md border border-gray-200 px-2.5 py-1.5 hover:bg-green-50 hover:border-green-300 transition-all">Marcar Cumplido</button>
                                <button onClick={() => setRequirementState(item.key, "pending")} className="text-xs font-semibold rounded-md border border-gray-200 px-2.5 py-1.5 hover:bg-amber-50 hover:border-amber-300 transition-all">Marcar Pendiente</button>
                                {item.optional && <button onClick={() => setRequirementState(item.key, "na")} className="text-xs font-semibold rounded-md border border-gray-200 px-2.5 py-1.5 hover:bg-gray-100 hover:border-gray-300 transition-all">No Aplica</button>}
                            </div>
                            </li>
                        ))}
                        </ul>
                    </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>


        <div className="max-w-4xl mx-auto mt-6 sticky bottom-4">
             <div className="bg-white/80 backdrop-blur-sm supports-backdrop-filter:bg-white/60 border rounded-xl p-3 flex items-center justify-between shadow-lg">
                <button onClick={handleBack} disabled={stepIndex === 0} className="inline-flex items-center gap-2 rounded-lg font-bold py-2 px-4 text-gray-700 transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100">
                    <ArrowLeft size={16} />
                    <span>Atrás</span>
                </button>
                <div className="text-sm font-semibold text-gray-600">Paso {stepIndex + 1} de {steps.length}</div>
                {stepIndex < steps.length - 1 ? (
                <button onClick={handleNext} className="inline-flex items-center gap-2 rounded-lg font-bold py-2 px-4 bg-orange-500 text-white transition-all hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed">
                    <span>Siguiente</span>
                    <ArrowRight size={16} />
                </button>
                ) : (
                <button onClick={handleFinish} className="inline-flex items-center gap-2 rounded-lg font-bold py-2 px-4 bg-green-600 text-white transition-all hover:bg-green-700">
                    <span>Finalizar</span>
                    <Check size={16} />
                </button>
                )}
            </div>
        </div>
        
        <footer className="text-center text-xs text-gray-500 mt-8">
            * Este asistente es una guía. Valida siempre la información con las entidades oficiales correspondientes.
        </footer>
      </div>
    </section>
  );
}
