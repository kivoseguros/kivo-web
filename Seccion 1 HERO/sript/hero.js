const steps = document.querySelectorAll('.step');
const stepLines = document.querySelectorAll('.step-line');
const title = document.getElementById('form-title');
const speciesButtons = document.querySelectorAll('.species button');
const continueBtn = document.getElementById('continueBtn');

const stepTitles = {
  1: '1. Tu mascota',
  2: '2. Tus necesidades',
  3: '3. Cobertura',
  4: '4. Tus datos',
  5: '5. Resultado'
};

function setStep(stepNumber) {
  steps.forEach((step, index) => {
    const current = index + 1;
    step.classList.toggle('active', current <= stepNumber);
  });

  stepLines.forEach((line, index) => {
    line.classList.toggle('active', index + 1 < stepNumber);
  });

  if (title) {
    title.textContent = stepTitles[stepNumber] || '1. Tu mascota';
  }
}

steps.forEach((step) => {
  step.addEventListener('click', () => {
    const stepNumber = Number(step.dataset.step);
    setStep(stepNumber);
  });
});

speciesButtons.forEach((button) => {
  button.addEventListener('click', () => {
    speciesButtons.forEach((btn) => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

if (continueBtn) {
  continueBtn.addEventListener('click', () => {
    const activeSteps = document.querySelectorAll('.step.active').length;
    const nextStep = Math.min(activeSteps + 1, 5);
    setStep(nextStep);
  });
}

setStep(1);


const openKivoAssistant = document.getElementById('openKivoAssistant');
const closeKivoAssistant = document.getElementById('closeKivoAssistant');
const kivoChatOverlay = document.getElementById('kivoChatOverlay');
const kivoChatForm = document.getElementById('kivoChatForm');
const kivoChatText = document.getElementById('kivoChatText');
const chatBody = document.querySelector('.chat-body');

function openChat(event) {
  if (event) event.preventDefault();
  if (!kivoChatOverlay) return;
  kivoChatOverlay.classList.add('open');
  kivoChatOverlay.setAttribute('aria-hidden', 'false');
  setTimeout(() => kivoChatText && kivoChatText.focus(), 60);
}

function closeChat() {
  if (!kivoChatOverlay) return;
  kivoChatOverlay.classList.remove('open');
  kivoChatOverlay.setAttribute('aria-hidden', 'true');
}

function addMessage(text, type) {
  if (!chatBody || !text.trim()) return;
  const message = document.createElement('div');
  message.className = `message ${type}-message`;
  message.textContent = text.trim();
  chatBody.appendChild(message);
  chatBody.scrollTop = chatBody.scrollHeight;
}

if (openKivoAssistant) openKivoAssistant.addEventListener('click', openChat);
if (closeKivoAssistant) closeKivoAssistant.addEventListener('click', closeChat);
if (kivoChatOverlay) {
  kivoChatOverlay.addEventListener('click', (event) => {
    if (event.target === kivoChatOverlay) closeChat();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeChat();
});

if (kivoChatForm) {
  kivoChatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = kivoChatText ? kivoChatText.value : '';
    if (!text.trim()) return;
    addMessage(text, 'user');
    if (kivoChatText) kivoChatText.value = '';
    setTimeout(() => {
      addMessage('Perfecto. Te ayudo con eso. Para darte una respuesta precisa, dime la edad, raza y ciudad de tu mascota.', 'assistant');
    }, 450);
  });
}

document.querySelectorAll('.quick-actions button').forEach((button) => {
  button.addEventListener('click', () => {
    addMessage(button.textContent, 'user');
    setTimeout(() => {
      addMessage('Genial. Vamos paso a paso para resolverlo rápido.', 'assistant');
    }, 350);
  });
});
