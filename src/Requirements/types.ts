export type Flags = {
  city: "Villavicencio" | string;
  legalForm: "Natural" | "SAS" | "LTDA" | "Otra";
  ciiu?: string; // selected CIIU code
  hasPublicPremises: boolean; // local abierto al público
  expectedAforo: number; // capacidad estimada
  handlesFood: boolean; // manipula / prepara alimentos
  hasDischarges: boolean; // vertimientos / emisiones / ruido
  isTourismProvider: boolean; // prestador turístico
  processesPersonalData: boolean; // trata datos personales a escala
  meetsSICThresholds: boolean; // umbrales SIC para RNBD
  isElectronicInvoicingObliged: boolean; // obligado DIAN FE
};

export type Requirement = {
  key: string;
  title: string;
  description?: string;
  category: "Base legal" | "Local y seguridad" | "Sectorial" | "Operación continua";
  always?: boolean;
  optional?: boolean;
    conditions?: Partial<Omit<Flags, 'expectedAforo'>> & {
    expectedAforo?: number | { gt?: number; gte?: number; lt?: number; lte?: number };
  };
  links?: { label: string; url: string }[];
  renewalHint?: string; // e.g. "Anual (antes del 31 de marzo)"
};

export type RequirementState = "pending" | "approved" | "na";

export type EvaluatedRequirement = Requirement & {
  applicable: boolean;
  state: RequirementState;
};

export type CIIUPreset = {
  code: string;
  name: string;
  flags: Partial<Flags>;
};
