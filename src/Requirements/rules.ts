import { Requirement } from "./types";

// Central rules catalog — keep links and wording here to avoid touching logic elsewhere
export const RULES: Requirement[] = [
  {
    key: "registro_mercantil",
    title: "Registro mercantil y establecimiento",
    description:
      "Matricular persona (natural o jurídica) y el establecimiento en la Cámara de Comercio.",
    category: "Base legal",
    always: true,
    links: [
      { label: "Cámara de Comercio de Villavicencio", url: "https://www.ccv.org.co/" }
    ],
    renewalHint: "Renovación anual (hasta el 31 de marzo)"
  },
  {
    key: "rut_dian",
    title: "RUT DIAN (actividad CIIU)",
    description:
      "Inscribir/actualizar RUT con CIIU correcto. Eventual obligación de facturación electrónica.",
    category: "Base legal",
    always: true,
    links: [
      { label: "DIAN – RUT", url: "https://www.dian.gov.co/" },
      { label: "DIAN – Facturación Electrónica", url: "https://www.dian.gov.co/" }
    ]
  },
  {
    key: "ica_rit",
    title: "Registro de Industria y Comercio (RIT) – Villavicencio",
    description: "Inscripción y declaración del ICA en el municipio.",
    category: "Base legal",
    conditions: { city: "Villavicencio" },
    links: [
      {
        label: "Hacienda Villavicencio",
        url: "https://www.villavicencio.gov.co/"
      }
    ]
  },
  {
    key: "uso_suelo",
    title: "Concepto de Uso del Suelo",
    description:
      "Verificar en Planeación/Curaduría que la actividad es permitida en la dirección del local.",
    category: "Local y seguridad",
    conditions: { hasPublicPremises: true },
    links: [
      { label: "Planeación – Villavicencio", url: "https://www.villavicencio.gov.co/" }
    ]
  },
  {
    key: "bomberos",
    title: "Inspección y certificado de Bomberos",
    description:
      "Seguridad humana y contra incendios (aforo, salidas, extintores, señalización).",
    category: "Local y seguridad",
    conditions: { hasPublicPremises: true, expectedAforo: { gt: 0 } },
    links: [{ label: "Bomberos Villavicencio", url: "https://bomberosvillavicencio.com/" }],
    renewalHint: "Mantenimiento de extintores/señalización: revisión anual"
  },
  {
    key: "salud_alimentos",
    title: "Concepto sanitario y manipuladores de alimentos",
    description:
      "Condiciones higiénico-sanitarias y capacitación/carné para manipuladores (cuando aplique).",
    category: "Sectorial",
    conditions: { handlesFood: true },
    links: [
      { label: "Secretaría de Salud – Villavicencio", url: "https://www.villavicencio.gov.co/" },
      { label: "INVIMA – Trámites", url: "https://www.invima.gov.co/" }
    ]
  },
  {
    key: "ambiental_cormacarena",
    title: "Permisos ambientales (CORMACARENA)",
    description:
      "Permiso de vertimientos/emisiones/ruido según la actividad y el proceso.",
    category: "Sectorial",
    conditions: { hasDischarges: true },
    links: [
      { label: "CORMACARENA – Trámites", url: "https://www.cormacarena.gov.co/" }
    ]
  },
  {
    key: "rnt",
    title: "Registro Nacional de Turismo (RNT)",
    description: "Obligatorio para prestadores de servicios turísticos.",
    category: "Sectorial",
    conditions: { isTourismProvider: true },
    links: [
      { label: "RNT – Confecámaras", url: "https://rnt.confecamaras.co/" },
      { label: "MinCIT – RNT", url: "https://www.mincit.gov.co/" }
    ],
    renewalHint: "Renovación anual"
  },
  {
    key: "facturacion_electronica",
    title: "Facturación electrónica (DIAN)",
    description:
      "Si estás obligado, habilítate como facturador electrónico y expide FE.",
    category: "Operación continua",
    conditions: { isElectronicInvoicingObliged: true },
    links: [
      { label: "DIAN – FE", url: "https://www.dian.gov.co/" }
    ]
  },
  {
    key: "rnbd_sic",
    title: "Registro Nacional de Bases de Datos (SIC)",
    description:
      "Cuando tratas datos personales a cierta escala (según umbrales SIC).",
    category: "Operación continua",
    conditions: { processesPersonalData: true, meetsSICThresholds: true },
    links: [
      { label: "SIC – RNBD", url: "https://www.sic.gov.co/" }
    ]
  },
  {
    key: "marca_sic",
    title: "Registro de marca (SIC)",
    description: "No obligatorio, recomendado para proteger la identidad.",
    category: "Operación continua",
    optional: true,
    links: [
      { label: "SIC – Registro de marca", url: "https://www.sic.gov.co/" }
    ]
  }
];
