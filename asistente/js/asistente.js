/* ═══ KIVO Asistente IA — asistente.js — 18/07/2026 ═══ */

var IA_RESP = [
  'KIVO tiene tres planes de salud: CARE (80% reembolso, límite 3.500 €/año), CARE+ (90%, límite 4.000 €/año) y PREMIUM (100% sin copago, límite 5.000 €/año). También puedes añadir R.C. a cualquier plan o contratarlo solo.',
  'Puedes consultar más detalles en kivoseguros.com o contactarnos por WhatsApp.',
  'Estamos aquí para ayudarte. Escríbenos por WhatsApp o a hola@kivoseguros.com.',
  'El plan R.C. cubre hasta 300.000 € por daños a terceros causados por tu mascota. Incluye gastos de defensa jurídica. Puedes contratarlo solo o añadirlo a un plan de salud por solo 8,90 €/mes.',
  'El período de carencia en KIVO es de 5 días para accidentes y 28 días para enfermedades.',
  'Para solicitar un reembolso, accede a la app de KIVO y sube la factura del veterinario. Te reembolsamos en menos de 5 días hábiles.',
  'Puedes contratar en menos de 2 minutos: elige tu plan, rellena tus datos y confirma el pago.',
  'Puedes pagar mensualmente o de forma anual. Con el pago anual obtienes un 15% de descuento.'
];

var iaOpen = false;

function toggleIA() {
  iaOpen = !iaOpen;
  var box = document.getElementById('ia-panel');
  if (!box) return;
  box.classList.toggle('open', iaOpen);
  if (iaOpen) {
    box.classList.remove('expanded');
    var icon = document.getElementById('ia-expand-icon');
    if (icon) icon.innerHTML = '<path d="M2 6V2h4M2 2l4.5 4.5M14 10v4h-4M14 14l-4.5-4.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  }
}

function sendIA() {
  var inp = document.getElementById('ia-input');
  if (!inp) return;
  var q = (inp.value || '').trim();
  if (!q) return;
  inp.value = '';
  _iaAddMsg(q, 'user');
  setTimeout(function() { _iaAddMsg(_iaMatch(q), 'bot'); }, 400);
}

function _iaAddMsg(text, role) {
  var log = document.getElementById('ia-msgs');
  if (!log) return;
  var div = document.createElement('div');
  div.className = 'ia-' + role;
  div.textContent = text;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

function toggleIAExpand() {
  var panel = document.getElementById('ia-panel');
  var icon = document.getElementById('ia-expand-icon');
  if (!panel) return;
  panel.classList.toggle('expanded');
  if (panel.classList.contains('expanded')) {
    if (icon) icon.innerHTML = '<path d="M6 2H2v4M2 2l4.5 4.5M10 14h4v-4M14 14l-4.5-4.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  } else {
    if (icon) icon.innerHTML = '<path d="M2 6V2h4M2 2l4.5 4.5M14 10v4h-4M14 14l-4.5-4.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  }
}

/* Escucha mensajes de la página principal (botón "Abrir Asistente KIVO") */
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'kivo-toggle-ia') toggleIA();
});

function _iaMatch(q) {
  var ql = q.toLowerCase();
  if (ql.includes('carencia') || ql.includes('espera')) return IA_RESP[4];
  if (ql.includes('plan') || ql.includes('care') || ql.includes('premium')) return IA_RESP[0];
  if (ql.includes('precio') || ql.includes('cuesta') || ql.includes('cuanto')) return 'El precio depende de la especie, raza y edad de tu mascota. Calcula en 2 minutos con el tarificador.';
  if (ql.includes('rc') || ql.includes('responsabilidad')) return IA_RESP[3];
  if (ql.includes('reembolso') || ql.includes('reclamacion') || ql.includes('siniestro')) return IA_RESP[5];
  if (ql.includes('contratar') || ql.includes('comprar')) return IA_RESP[6];
  if (ql.includes('pago') || ql.includes('mensual') || ql.includes('anual')) return IA_RESP[7];
  if (ql.includes('hola') || ql.includes('buenas') || ql.includes('hey')) return '¡Hola! Soy KIVO IA. Pregúntame sobre coberturas, planes, carencias o reembolsos. ¿En qué te ayudo?';
  return 'Para más información contáctanos por WhatsApp o escríbenos a hola@kivoseguros.com.';
}
