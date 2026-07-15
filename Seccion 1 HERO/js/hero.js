// ── TARIFICADOR — lógica original ──
const steps      = document.querySelectorAll('.step');
const stepLines  = document.querySelectorAll('.step-line');
const title      = document.getElementById('form-title');
const continueBtn = document.getElementById('continueBtn');

const stepTitles = {
  1: '1. Tu mascota',
  2: '2. Raza y edad',
  3: '3. Cobertura',
  4: '4. Tus datos',
  5: '5. Resultado'
};

function setStep(n) {
  steps.forEach((s, i)    => s.classList.toggle('active', i + 1 <= n));
  stepLines.forEach((l, i) => l.classList.toggle('active', i + 1 < n));
  if (title) title.textContent = stepTitles[n] || '1. Tu mascota';
}

steps.forEach(btn => btn.addEventListener('click', () => setStep(+btn.dataset.step)));

document.querySelectorAll('.species button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.species button').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  });
});

if (continueBtn) {
  continueBtn.addEventListener('click', () => {
    const active = document.querySelectorAll('.step.active').length;
    setStep(Math.min(active + 1, 5));
  });
}

setStep(1);

// ── KIVO IA — base de conocimiento real ──
const KB = [
  { keys: ['care plus','care+'],            resp: '**KIVO CARE+** → 90% de reembolso, hasta 4.000 €/año. El más elegido.' },
  { keys: ['plan care','solo care'],        resp: '**KIVO CARE** → 80% de reembolso, hasta 3.500 €/año. La opción esencial.' },
  { keys: ['premium'],                      resp: '**KIVO PREMIUM** → 100% sin copago, hasta 5.000 €/año. La máxima protección.' },
  { keys: ['rc','responsabilidad civil','obligatorio'], resp: 'La **R.C. ESENCIAL** cubre daños a terceros. Obligatoria por la Ley 7/2023 para todos los perros.' },
  { keys: ['cubre','cobertura','incluye'],  resp: 'Todos los planes cubren: consultas, hospitalización, cirugía, diagnóstico, oncología, urgencias 24h, fisioterapia (9 sesiones/año), vacunación (250 €/año) y teleconsulta.' },
  { keys: ['carencia','espera','cuando empieza'], resp: 'Accidentes: 5 días · Enfermedades: 28 días · Oncología/epilepsia: 6 meses · Vacunas: sin carencia.' },
  { keys: ['reembolso','devuelve','tarda','pago'], resp: 'Sube la factura desde la app. Casos simples: **24-48 h**. Complejos: máx. 10 días hábiles.' },
  { keys: ['precio','cuesta','vale','tarifa','cuanto'], resp: 'El precio depende de especie, raza, edad y código postal. Calcula en 30 segundos con el formulario de esta página.' },
  { keys: ['edad','maxima','minima'],       resp: 'Mínima: 2 meses. Máxima al contratar: 11 años perros · 10 años gatos.' },
  { keys: ['microchip','chip'],             resp: 'El microchip es obligatorio por la Ley 7/2023. Lo necesitas para contratar.' },
  { keys: ['ley 7','bienestar animal'],     resp: 'La **Ley 7/2023** exige seguro de R.C. a todos los dueños de perros. KIVO la cumple.' },
  { keys: ['exclu','no cubre','no incluye'], resp: 'Exclusiones: preexistencias, razas PPP, perros de caza, castración electiva y patologías congénitas.' },
  { keys: ['veterinario','clinica','donde'], resp: 'Libertad total: cualquier clínica veterinaria colegiada en España. Pagas tú y KIVO te reembolsa.' },
  { keys: ['cancelar','baja','anular'],     resp: 'Cancela con 30 días de preaviso antes del vencimiento. Sin penalizaciones.' },
  { keys: ['gato','felino'],               resp: 'KIVO asegura perros y gatos. CARE, CARE+ y PREMIUM disponibles para ambos.' },
  { keys: ['kivo','quienes','que es'],     resp: 'KIVO Seguros S.L. es una Agencia de Suscripción (MGA) especializada en mascotas en España, registrada en la DGSFP.' },
  { keys: ['hola','buenas','hey','saludos'], resp: '¡Hola! Soy KIVO IA. Pregúntame sobre coberturas, precios, carencias o reembolsos. ¿En qué te ayudo?' },
  { keys: ['gracias','perfecto','genial'],  resp: '¡De nada! 🐾 Aquí estoy si tienes más dudas.' },
];

function getResp(txt) {
  const t = txt.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  for (const {keys, resp} of KB) {
    if (keys.some(k => t.includes(k.normalize('NFD').replace(/[̀-ͯ]/g, '')))) return resp;
  }
  return 'Puedo ayudarte con coberturas, planes, carencias y reembolsos. ¿Qué quieres saber?';
}

function renderMD(t) {
  return t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

const overlay   = document.getElementById('kivoChatOverlay');
const openBtn   = document.getElementById('openKivoAssistant');
const closeBtn  = document.getElementById('closeKivoAssistant');
const chatForm  = document.getElementById('kivoChatForm');
const chatInput = document.getElementById('kivoChatText');
const chatBody  = document.querySelector('.chat-body');

function openChat(e)  { if (e) e.preventDefault(); if (!overlay) return; overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); setTimeout(() => chatInput && chatInput.focus(), 60); }
function closeChat()  { if (!overlay) return; overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); }
function addMsg(html, type) { if (!chatBody) return; const d = document.createElement('div'); d.className = `message ${type}-message`; d.innerHTML = html; chatBody.appendChild(d); chatBody.scrollTop = chatBody.scrollHeight; }

if (openBtn)  openBtn.addEventListener('click', openChat);
if (closeBtn) closeBtn.addEventListener('click', closeChat);
if (overlay)  overlay.addEventListener('click', e => { if (e.target === overlay) closeChat(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeChat(); });

if (chatForm) {
  chatForm.addEventListener('submit', e => {
    e.preventDefault();
    const txt = chatInput ? chatInput.value.trim() : '';
    if (!txt) return;
    addMsg(txt, 'user');
    if (chatInput) chatInput.value = '';
    setTimeout(() => addMsg(renderMD(getResp(txt)), 'assistant'), 450);
  });
}

document.querySelectorAll('.quick-actions button').forEach(btn => {
  btn.addEventListener('click', () => {
    addMsg(btn.textContent, 'user');
    setTimeout(() => addMsg(renderMD(getResp(btn.textContent)), 'assistant'), 350);
  });
});
