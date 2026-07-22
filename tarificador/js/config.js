/* ═══════════════════════════════════════════════════════════════
   KIVO TARIFICADOR — CONFIGURACIÓN
   Edita aquí precios, textos y ajustes sin tocar el resto del código
   ═══════════════════════════════════════════════════════════════ */

/* ── PRECIOS BASE (€/mes) ─────────────────────────────────── */
var PRECIOS_BASE = {
  perro: { CARE: 27.90, 'CARE+': 44.90, PREMIUM: 67.90 },
  gato:  { CARE: 21.90, 'CARE+': 34.90, PREMIUM: 53.90 }
};

/* ── ADICIONALES ──────────────────────────────────────────── */
var RC_ADDON    = 8.90;
var RC_SUELTA   = { perro: 14.90, gato: 11.90 };
var DESC_ANUAL  = 0;

/* ── MULTIPLICADORES DE EDAD ──────────────────────────────── */
var MULT_EDAD = [
  { hasta: 1,  mult: 0.90 },
  { hasta: 3,  mult: 1.00 },
  { hasta: 7,  mult: 1.20 },
  { hasta: 10, mult: 1.55 },
  { hasta: 99, mult: 2.00 }
];

/* ── MULTIPLICADORES DE PESO (solo mestizos) ──────────────── */
var MULT_PESO = {
  '<5':    0.80,
  '5-10':  1.00,
  '10-20': 1.25,
  '20-40': 1.55
};

/* ── TEXTOS EDITABLES ─────────────────────────────────────── */
var TEXTOS = {
  landing_titulo:    'El seguro de tu mascota, sin letra pequeña',
  landing_subtitulo: 'Calcula tu precio personalizado en menos de 2 minutos.',
  whatsapp_numero:   '34600000000',
  whatsapp_texto:    'Hola, tengo una pregunta sobre KIVO Seguros'
};

/* ── RESPUESTAS IA ────────────────────────────────────────── */
var IA_RESP = [
  /* 0 — planes/care/premium */
  'KIVO tiene tres planes de salud: CARE (80% reembolso, límite 3.500 €/año), CARE+ (90%, límite 4.000 €/año) y PREMIUM (100% sin copago, límite 5.000 €/año). También puedes añadir R.C. a cualquier plan o contratarlo solo.',
  /* 1 — reservado */
  'Puedes consultar más detalles en kivo.es o contactarnos por WhatsApp.',
  /* 2 — reservado */
  'Estamos aquí para ayudarte. Escríbenos por WhatsApp o a hola@kivo.es.',
  /* 3 — rc/responsabilidad */
  'El plan R.C. cubre hasta 300.000 € por daños a terceros causados por tu mascota. Incluye gastos de defensa jurídica. Puedes contratarlo solo (desde 11,90 €/mes para gatos, 14,90 €/mes para perros) o añadirlo a un plan de salud por solo 8,90 €/mes.',
  /* 4 — carencia/espera */
  'El período de carencia en KIVO es de 5 días para accidentes y 28 días para enfermedades. Durante ese tiempo la cobertura no está activa, pero a partir de entonces tienes toda la protección.',
  /* 5 — reembolso/reclamacion/siniestro */
  'Para solicitar un reembolso, accede a la app de KIVO y sube la factura del veterinario. Nuestro equipo la revisa y te reembolsa en menos de 5 días hábiles directamente a tu cuenta.',
  /* 6 — contratar/comprar */
  'Puedes contratar en menos de 2 minutos: elige tu plan, rellena tus datos y confirma el pago. La cobertura empieza desde el día de contratación (respetando los períodos de carencia).',
  /* 7 — pago/mensual/anual */
  'Puedes pagar mensualmente o de forma anual. Con el pago anual obtienes un 15% de descuento. Aceptamos tarjeta de crédito/débito y domiciliación bancaria (IBAN).'
];
