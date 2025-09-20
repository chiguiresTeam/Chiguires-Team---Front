import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../context/AuthContext";
import {
  Camera,
  Mail,
  Phone,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  FileX2,
  PlusCircle,
} from "lucide-react";

const DEFAULT_STORAGE_KEYS = ["formalizationChecklist", "formalization_docs", "formalizacion_docs", "docs_formalizacion"];

/** Intenta leer el arreglo de documentos desde localStorage.
 * 1) Busca por claves conocidas
 * 2) Si no, escanea todas las claves y devuelve el primer valor que cumpla la forma esperada.
 */
function loadFormalizationFromLocalStorage() {
  if (typeof window === "undefined") return [];
  const tryParse = (raw) => {
    try {
      const x = JSON.parse(raw);
      return Array.isArray(x) ? x : null;
    } catch {
      return null;
    }
  };

  // 1) claves conocidas
  for (const k of DEFAULT_STORAGE_KEYS) {
    const raw = localStorage.getItem(k);
    const arr = raw ? tryParse(raw) : null;
    if (arr && arr.length && typeof arr[0] === "object") return arr;
  }

  // 2) escaneo general
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const raw = localStorage.getItem(key);
    const arr = raw ? tryParse(raw) : null;
    if (arr && arr.length && typeof arr[0] === "object" && "state" in arr[0]) {
      return arr;
    }
  }

  return [];
}

function computeStatus(docs) {
  // Filtra solo los requeridos (no opcionales)
  const required = docs.filter((d) => !d.optional);
  const totalRequired = required.length || 0;
  const approvedRequired = required.filter((d) => d.state === "approved").length;
  const pendingRequired = required.filter((d) => d.state !== "approved");

  const percent = totalRequired === 0 ? 0 : Math.round((approvedRequired / totalRequired) * 100);

  // Mapea a color/estado
  let level = "Rojo";
  if (percent === 100) level = "Verde";
  else if (percent > 0) level = "Amarillo";

  return {
    totalRequired,
    approvedRequired,
    pendingRequired,
    percent,
    level,
  };
}

function getFormalizationColor(level) {
  switch (level) {
    case "Verde":
      return "bg-green-500";
    case "Amarillo":
      return "bg-yellow-400";
    case "Rojo":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
}

function getFormalizationText(level) {
  switch (level) {
    case "Verde":
      return "¡Felicitaciones! Tu negocio se encuentra al día y formalizado.";
    case "Amarillo":
      return "Estás en proceso. ¡Sigue así! Completa los siguientes requisitos para estar al 100%:";
    case "Rojo":
      return "¡Impulsa tu negocio! Aún no has iniciado tu proceso de formalización.";
    default:
      return "Estado de formalización desconocido.";
  }
}

function getFormalizationIcon(level) {
  switch (level) {
    case "Verde":
      return <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />;
    case "Amarillo":
      return <AlertTriangle className="w-8 h-8 text-yellow-500 flex-shrink-0" />;
    case "Rojo":
      return <FileX2 className="w-12 h-12 text-red-500 mx-auto mb-2" />;
    default:
      return null;
  }
}

export default function ProfileBusiness() {
  const { auth } = useAuth();
  const [activeTab, setActiveTab] = useState("edit");

  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const data = loadFormalizationFromLocalStorage();
    setDocs(data);
  }, []);

  // Derivados
  const formal = useMemo(() => computeStatus(docs), [docs]);

  const isEdit = activeTab === "edit";
  const isProducts = activeTab === "products";

  const staticCompanyData = {
    logo: "https://placehold.co/128x128/FF7E5F/FFFFFF?text=Logo",
    businessName: auth.user?.fullName || "Nombre del Negocio",
    userName: auth.user?.fullName || "Tu Nombre",
    userEmail: auth.user?.email || "tu.correo@ejemplo.com",
    phone: "+57 300 123 4567",
    whatsappPhone: "+57 310 987 6543",
    description:
      "Descripción de la empresa o perfil de usuario. Este es un texto de ejemplo para mantener el diseño original.",
  };

  const staticProducts = [
    {
      id: "1",
      name: "Carne a la Llanera",
      price: 35000,
      imageUrl: "https://placehold.co/400x300/FF7E5F/FFFFFF?text=Producto+1",
    },
    {
      id: "2",
      name: "Picada para 2",
      price: 50000,
      imageUrl: "https://placehold.co/400x300/FF7E5F/FFFFFF?text=Producto+4",
    },
  ];

  if (!auth.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-700 text-lg">Por favor, inicia sesión para ver tu perfil de empresa.</p>
      </div>
    );
  }

  return (
    <section id="perfil" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-12">Mi Perfil de Vendedor</h2>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Columna izquierda */}
          <div className="lg:col-span-1 space-y-8 top-28">
            <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={staticCompanyData.logo}
                  alt="Foto de perfil"
                  className="rounded-full w-full h-full object-cover border-4 border-white shadow-md"
                />
                <button
                  className="absolute bottom-0 right-0 bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-800 transition"
                  type="button"
                  aria-label="Cambiar foto"
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-2xl font-bold text-green-8  00">{staticCompanyData.businessName}</h3>
              <p className="text-gray-500">{staticCompanyData.userName}</p>
              <div className="mt-4 text-left space-y-3">
                <p className="flex items-center text-gray-700">
                  <Mail className="w-4 h-4 mr-3 text-orange-500" /> {staticCompanyData.userEmail}
                </p>
                <p className="flex items-center text-gray-700">
                  <Phone className="w-4 h-4 mr-3 text-orange-500" /> {staticCompanyData.phone}
                </p>
                <p className="flex items-center text-gray-700">
                  <MessageCircle className="w-4 h-4 mr-3 text-orange-500" /> {staticCompanyData.whatsappPhone}
                </p>
              </div>
            </div>

            {/* ===== Estado de Formalización (dinámico desde localStorage) ===== */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h4 className="font-bold text-lg text-green-800 mb-4 text-center">Estado de Formalización</h4>

              <div
                className={`p-4 ${formal.level === "Verde"
                    ? "bg-green-50 border-l-4 border-green-500"
                    : formal.level === "Amarillo"
                      ? "bg-yellow-50 border-l-4 border-yellow-500"
                      : "bg-red-50 border-l-4 border-red-500"
                  } rounded-r-lg`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {getFormalizationIcon(formal.level)}
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{getFormalizationText(formal.level)}</p>

                    {/* Barra de progreso */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1 text-sm text-gray-700">
                        <span>
                          Aprobados: {formal.approvedRequired}/{formal.totalRequired}
                        </span>
                        <span className="font-semibold">{formal.percent}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-3 ${getFormalizationColor(formal.level)} transition-all duration-500`}
                          style={{ width: `${formal.percent}%` }}
                        />
                      </div>
                    </div>

                    {/* Lista de pendientes (solo requeridos) */}
                    {formal.level !== "Verde" && formal.pendingRequired.length > 0 && (
                      <ul className="mt-4 text-sm text-gray-700 space-y-2 list-disc list-inside">
                        {formal.pendingRequired.map((d) => (
                          <li key={d.key || d.title}>{d.title}</li>
                        ))}
                      </ul>
                    )}

                    {/* CTA */}
                    {formal.level !== "Verde" && (
                      <NavLink
                        to="/formalization-wizard?resume=1"
                        className="w-full inline-block mt-4 bg-orange-500 text-white font-bold py-2 px-4 rounded-full hover:bg-orange-600 text-sm transition text-center"
                      >
                        {formal.level === "Amarillo" ? "Continuar Proceso" : "Iniciar Proceso Ahora"}
                      </NavLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* ===== /Estado de Formalización ===== */}
          </div>

          {/* Columna derecha */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex border-b mb-6">
                <button
                  className={`py-3 px-6 font-semibold transition-colors ${isEdit
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "text-gray-600 hover:text-orange-500 border-b-2 border-transparent"
                    }`}
                  onClick={() => setActiveTab("edit")}
                  type="button"
                >
                  Editar Información
                </button>
                <button
                  className={`py-3 px-6 font-semibold transition-colors ${isProducts
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "text-gray-600 hover:text-orange-500 border-b-2 border-transparent"
                    }`}
                  onClick={() => setActiveTab("products")}
                  type="button"
                >
                  Mis Productos
                </button>
              </div>

              {isEdit && (
                <div>
                  <h3 className="text-2xl font-bold text-green-800 mb-6">Información de la Cuenta</h3>
                  <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre del Negocio</label>
                        <input
                          type="text"
                          defaultValue={staticCompanyData.businessName}
                          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tu Nombre Completo</label>
                        <input
                          type="text"
                          defaultValue={staticCompanyData.userName}
                          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
                        <input
                          type="tel"
                          defaultValue={staticCompanyData.phone}
                          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Número de WhatsApp</label>
                        <input
                          type="tel"
                          defaultValue={staticCompanyData.whatsappPhone}
                          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Correo Electrónico (no editable)</label>
                      <input
                        type="email"
                        defaultValue={staticCompanyData.userEmail}
                        readOnly
                        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
                      />
                    </div>

                    <div className="text-right pt-4">
                      <button
                        type="submit"
                        className="bg-green-700 text-white font-bold py-2 px-5 rounded-full hover:bg-green-800 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {isProducts && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-green-800">Mis Productos y Servicios</h3>
                    <NavLink
                      to="/up-products"
                      className="bg-orange-500 text-white font-bold py-2 px-5 rounded-full hover:bg-orange-600 transition flex items-center gap-2"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span>Subir Producto</span>
                    </NavLink>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {staticProducts.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-xl overflow-hidden border">
                        <img src={item.imageUrl} alt={item.name} className="w-full h-40 object-cover" />
                        <div className="p-4">
                          <h4 className="font-bold text-green-800">{item.name}</h4>
                          <p className="text-lg font-bold text-orange-500">
                            ${item.price.toLocaleString("es-CO")}
                          </p>
                          <div className="flex gap-2 mt-4">
                            <button
                              className="w-full bg-green-600 text-white text-sm font-bold py-2 px-3 rounded-lg hover:bg-green-700 transition"
                              type="button"
                            >
                              Editar
                            </button>
                            <button
                              className="w-full bg-gray-200 text-gray-700 text-sm font-bold py-2 px-3 rounded-lg hover:bg-gray-300 transition"
                              type="button"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* /Columna derecha */}
        </div>
      </div>
    </section>
  );
}
