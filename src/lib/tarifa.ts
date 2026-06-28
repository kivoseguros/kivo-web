// TABLA DE PRECIOS PROVISIONALES KIVO — Jun 2026
// Derivada de normalización de precios de competencia (Barkibu, Santévet, Musky, Milo, Swipet)
// PENDIENTE de validación actuarial por Wakam S.A.
// Precios en €/AÑO (IVA/IPT 8% incluido)

import type { Tamano } from "./razas";

export type Tramo = "J" | "A1" | "A2" | "S";
export type Sexo = "M" | "H";
export type Plan = "care" | "care_plus" | "premium" | "rc_esencial" | "rc_total";

// Precio base CARE por tamaño → tramo → sexo (€/año)
const BASE_CARE: Record<Tamano, Record<Tramo, Record<Sexo, number>>> = {
  P: {
    J:  { M: 434, H: 439 },
    A1: { M: 452, H: 448 },
    A2: { M: 522, H: 516 },
    S:  { M: 707, H: 690 },
  },
  M: {
    J:  { M: 504, H: 510 },
    A1: { M: 520, H: 513 },
    A2: { M: 612, H: 605 },
    S:  { M: 831, H: 810 },
  },
  G: {
    J:  { M: 556, H: 552 },
    A1: { M: 588, H: 568 },
    A2: { M: 693, H: 683 },
    S:  { M: 977, H: 950 },
  },
};

const PLAN_FACTOR: Record<Plan, number> = {
  care:       1.000,
  care_plus:  1.142,
  premium:    1.260,
  rc_esencial: 0,  // precio fijo anual
  rc_total:    0,  // precio fijo anual
};

// RC Suelta: precios anuales fijos
const RC_PRECIOS: Record<"rc_esencial" | "rc_total", number> = {
  rc_esencial: 29,
  rc_total:    49,
};

export function calcularTramo(fechaNacimiento: string): Tramo | null {
  const nacimiento = new Date(fechaNacimiento);
  const hoy = new Date();
  const meses = (hoy.getFullYear() - nacimiento.getFullYear()) * 12 +
    (hoy.getMonth() - nacimiento.getMonth());
  const anos = meses / 12;

  if (meses < 2) return null;   // Menor de 2 meses: no asegurable
  if (anos <= 3) return "J";
  if (anos <= 5) return "A1";
  if (anos <= 7) return "A2";
  if (anos <= 11) return "S";
  return null; // Mayor de 11 años: no asegurable
}

export function calcularPrecio(params: {
  tamano: Tamano;
  tramo: Tramo;
  sexo: Sexo;
  plan: Plan;
}): { anual: number; mensual: number } | null {
  const { tamano, tramo, sexo, plan } = params;

  if (plan === "rc_esencial" || plan === "rc_total") {
    const anual = RC_PRECIOS[plan];
    return { anual, mensual: parseFloat((anual / 12).toFixed(2)) };
  }

  const base = BASE_CARE[tamano]?.[tramo]?.[sexo];
  if (!base) return null;

  const anual = Math.round(base * PLAN_FACTOR[plan]);
  return { anual, mensual: parseFloat((anual / 12).toFixed(2)) };
}

export const PLANES_INFO = {
  care: {
    id: "care" as Plan,
    nombre: "KIVO CARE",
    subtitulo: "Cobertura esencial",
    reembolso: "80%",
    limite: "3.500 €/año",
    rc: "200.000 €",
    color: "#3DBFA0",
    destacado: false,
    coberturas: [
      "Consultas y visitas veterinarias (80%)",
      "Hospitalización, cirugía y anestesia (80%)",
      "Diagnóstico: análisis, radiografías, ecografías (80%)",
      "Oncología hasta 2.500 € por proceso (80%)",
      "Urgencias veterinarias 24h",
      "Fisioterapia y rehabilitación: 9 sesiones/año",
      "Vacunación obligatoria incluida",
      "Teleconsulta veterinaria",
      "R.C. hasta 200.000 € — Franquicia 100 €",
    ],
    noTincluyе: [
      "Preexistencias y patologías congénitas",
      "Gestación, parto y esterilización electiva",
      "Tratamientos estéticos o experimentales",
    ],
  },
  care_plus: {
    id: "care_plus" as Plan,
    nombre: "KIVO CARE+",
    subtitulo: "Nuestra más popular",
    reembolso: "90%",
    limite: "4.000 €/año",
    rc: "250.000 €",
    color: "#1B2A4A",
    destacado: true,
    coberturas: [
      "Todo lo de KIVO CARE",
      "Reembolso mejorado al 90%",
      "Límite anual 4.000 €",
      "Leishmaniosis incluida",
      "R.C. hasta 250.000 € — Franquicia 50 €",
    ],
    noTincluyе: [
      "Preexistencias y patologías congénitas",
      "Gestación, parto y esterilización electiva",
    ],
  },
  premium: {
    id: "premium" as Plan,
    nombre: "KIVO PREMIUM",
    subtitulo: "Cobertura total",
    reembolso: "100%",
    limite: "5.000 €/año",
    rc: "300.000 €",
    color: "#1B4D3E",
    destacado: false,
    coberturas: [
      "Todo lo de KIVO CARE+",
      "Reembolso del 100% sin copago",
      "Límite anual 5.000 €",
      "Oncología hasta 3.500 € (centros acreditados)",
      "Tartrectomía desde el primer año",
      "R.C. hasta 300.000 € — Sin franquicia",
    ],
    noTincluyе: [
      "Preexistencias y patologías congénitas",
      "Gestación y esterilización electiva",
    ],
  },
  rc_esencial: {
    id: "rc_esencial" as Plan,
    nombre: "R.C. ESENCIAL",
    subtitulo: "Solo responsabilidad civil",
    reembolso: "—",
    limite: "300.000 €",
    rc: "300.000 €",
    color: "#6B7280",
    destacado: false,
    coberturas: [
      "R.C. obligatoria Ley 7/2023 Bienestar Animal",
      "Hasta 300.000 € por siniestro",
      "Daños corporales y materiales a terceros",
      "Franquicia 150 € por siniestro",
      "Defensa jurídica hasta 6.000 €",
      "Cobertura en toda la UE",
    ],
    noTincluyе: [
      "Gastos veterinarios del animal asegurado",
      "Daños propios del asegurado",
    ],
  },
};
