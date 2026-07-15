/* ============================================================
   KIVO — Sistema de traducciones ES / EN
   Uso: añade data-i18n="clave" al elemento HTML
        Para placeholder: data-i18n-placeholder="clave"
        Para aria-label:  data-i18n-aria="clave"
============================================================ */

const TRANSLATIONS = {
  es: {
    // NAV
    'nav.coberturas': 'Coberturas',
    'nav.blog': 'Blog',
    'nav.sobre': 'Sobre KIVO',
    'nav.faq': 'FAQ',

    // HERO S01
    'hero.badge': 'Protección clara para tu mascota. Sin sorpresas.',
    'hero.title': 'Tu mascota<br/><span>bien protegida,</span><br/>tu tranquilidad<br/>asegurada<span>.</span>',
    'hero.text': 'Reembolso en 24/48 horas, sin complicaciones y sin letra pequeña. Calcula en menos de 30 segundos cuánto costaría proteger a tu mascota y descubre la protección que mejor se adapta a ella.',
    'hero.benefit1': 'Sin letra<br/>pequeña.',
    'hero.benefit2': 'Reembolso en<br/>24/48h.',
    'hero.benefit3': 'Sin<br/>complicaciones.',
    'hero.social': '+25.000 familias ya confían en KIVO',
    'hero.stars': '4,8/5 en Google',

    // ASESOR
    'advisor.title': 'Asesor <span>KIVO</span>',
    'advisor.desc': 'Cuéntanos quién es tu compañero y qué es lo que más te preocupa. Te ayudaremos a encontrar la protección que mejor se adapta a vosotros.',
    'advisor.step1': 'Tu mascota',
    'advisor.step2': 'Tus necesidades',
    'advisor.step3': 'Cobertura',
    'advisor.step4': 'Tus datos',
    'advisor.step5': 'Resultado',
    'advisor.form.title': '1. Tu mascota',
    'advisor.form.name': '¿Cómo se llama tu mascota?',
    'advisor.form.species': '¿Es un perro o un gato?',
    'advisor.form.dog': 'Perro',
    'advisor.form.cat': 'Gato',
    'advisor.form.breed': '¿Qué raza es?',
    'advisor.form.age': '¿Qué edad tiene?',
    'advisor.form.postal': 'Código postal',
    'advisor.form.continue': 'Continuar →',
    'advisor.info1': '<strong>Te aconsejamos</strong> según lo que más te preocupa.',
    'advisor.info2': '<strong>Recomendamos</strong> el plan que mejor se adapta a ti.',
    'advisor.info3': '<strong>Te explicamos</strong> por qué ese plan es el ideal.',
    'advisor.info4': '<strong>Y te damos</strong> el precio al instante.',
    'advisor.privacy': '🔒 Tus datos están protegidos y no serán compartidos.',

    // CHAT IA
    'chat.subtitle': 'Tu asistente inteligente para mascotas.',
    'chat.welcome': 'Hola, soy KIVO IA. ¿En qué puedo ayudarte hoy?',
    'chat.q1': 'Calcular mi seguro',
    'chat.q2': '¿Qué cubre la póliza?',
    'chat.q3': 'Ver condicionados',
    'chat.q4': 'Ya soy cliente',
    'chat.placeholder': 'Escribe tu consulta...',
    'chat.send': 'Enviar',

    // PÁGINAS INTERNAS — FAQ
    'faq.title': 'Preguntas frecuentes',
    'faq.subtitle': 'Resolvemos todas tus dudas sobre KIVO',

    // PÁGINAS INTERNAS — COBERTURAS
    'coberturas.title': 'Coberturas KIVO',
    'coberturas.subtitle': 'Todo lo que cubre tu seguro de mascotas',

    // PÁGINAS INTERNAS — BLOG
    'blog.title': 'Blog KIVO',
    'blog.subtitle': 'Consejos, cuidados y novedades para tu mascota',

    // PÁGINAS INTERNAS — SOBRE KIVO
    'sobre.title': 'Sobre KIVO',
    'sobre.subtitle': 'El seguro de mascotas fácil de entender y rápido de cobrar',

    // PLANES
    'planes.care.title': 'KIVO CARE',
    'planes.care.desc': 'El plan esencial. Cobertura completa al 80% de reembolso.',
    'planes.careplus.title': 'KIVO CARE+',
    'planes.careplus.desc': 'El más elegido. 90% de reembolso y más coberturas.',
    'planes.premium.title': 'KIVO PREMIUM',
    'planes.premium.desc': '100% sin copago. La máxima protección sin límites.',
    'planes.rc.title': 'KIVO R.C. ESENCIAL',
    'planes.rc.desc': 'Responsabilidad Civil obligatoria. Cumple con la Ley 7/2023.',

    // FOOTER / LEGAL
    'footer.rights': '© 2025 KIVO Seguros para Mascotas. Todos los derechos reservados.',
    'legal.aviso': 'Aviso Legal',
    'legal.privacidad': 'Política de Privacidad',
    'legal.cookies': 'Política de Cookies',
  },

  en: {
    // NAV
    'nav.coberturas': 'Coverage',
    'nav.blog': 'Blog',
    'nav.sobre': 'About KIVO',
    'nav.faq': 'FAQ',

    // HERO S01
    'hero.badge': 'Clear protection for your pet. No surprises.',
    'hero.title': 'Your pet<br/><span>well protected,</span><br/>your peace<br/>of mind assured<span>.</span>',
    'hero.text': 'Reimbursement in 24/48 hours, no complications and no fine print. Calculate in under 30 seconds how much it would cost to protect your pet and find the coverage that best suits you.',
    'hero.benefit1': 'No fine<br/>print.',
    'hero.benefit2': 'Reimbursement<br/>in 24/48h.',
    'hero.benefit3': 'No<br/>complications.',
    'hero.social': '+25,000 families already trust KIVO',
    'hero.stars': '4.8/5 on Google',

    // ASESOR
    'advisor.title': 'KIVO <span>Advisor</span>',
    'advisor.desc': 'Tell us about your companion and what worries you most. We will help you find the protection that best suits both of you.',
    'advisor.step1': 'Your pet',
    'advisor.step2': 'Your needs',
    'advisor.step3': 'Coverage',
    'advisor.step4': 'Your details',
    'advisor.step5': 'Result',
    'advisor.form.title': '1. Your pet',
    'advisor.form.name': 'What is your pet\'s name?',
    'advisor.form.species': 'Is it a dog or a cat?',
    'advisor.form.dog': 'Dog',
    'advisor.form.cat': 'Cat',
    'advisor.form.breed': 'What breed is it?',
    'advisor.form.age': 'How old is it?',
    'advisor.form.postal': 'Postal code',
    'advisor.form.continue': 'Continue →',
    'advisor.info1': '<strong>We advise you</strong> based on what worries you most.',
    'advisor.info2': '<strong>We recommend</strong> the plan that best fits you.',
    'advisor.info3': '<strong>We explain</strong> why that plan is the ideal one.',
    'advisor.info4': '<strong>And we give you</strong> the price instantly.',
    'advisor.privacy': '🔒 Your data is protected and will not be shared.',

    // CHAT IA
    'chat.subtitle': 'Your smart pet assistant.',
    'chat.welcome': 'Hi, I\'m KIVO IA. How can I help you today?',
    'chat.q1': 'Calculate my insurance',
    'chat.q2': 'What does the policy cover?',
    'chat.q3': 'View policy documents',
    'chat.q4': 'I\'m already a customer',
    'chat.placeholder': 'Type your question...',
    'chat.send': 'Send',

    // PÁGINAS INTERNAS — FAQ
    'faq.title': 'Frequently asked questions',
    'faq.subtitle': 'We answer all your questions about KIVO',

    // PÁGINAS INTERNAS — COBERTURAS
    'coberturas.title': 'KIVO Coverage',
    'coberturas.subtitle': 'Everything your pet insurance covers',

    // PÁGINAS INTERNAS — BLOG
    'blog.title': 'KIVO Blog',
    'blog.subtitle': 'Tips, care guides and news for your pet',

    // PÁGINAS INTERNAS — SOBRE KIVO
    'sobre.title': 'About KIVO',
    'sobre.subtitle': 'Pet insurance that\'s easy to understand and fast to claim',

    // PLANES
    'planes.care.title': 'KIVO CARE',
    'planes.care.desc': 'The essential plan. Full coverage with 80% reimbursement.',
    'planes.careplus.title': 'KIVO CARE+',
    'planes.careplus.desc': 'Most popular. 90% reimbursement and more coverage.',
    'planes.premium.title': 'KIVO PREMIUM',
    'planes.premium.desc': '100% no co-pay. Maximum protection without limits.',
    'planes.rc.title': 'KIVO R.C. ESSENTIAL',
    'planes.rc.desc': 'Mandatory Liability Insurance. Complies with Law 7/2023.',

    // FOOTER / LEGAL
    'footer.rights': '© 2025 KIVO Pet Insurance. All rights reserved.',
    'legal.aviso': 'Legal Notice',
    'legal.privacidad': 'Privacy Policy',
    'legal.cookies': 'Cookie Policy',
  }
};

function applyLang(lang) {
  document.documentElement.lang = lang;
  localStorage.setItem('kivo-lang', lang);

  // Text / innerHTML
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (TRANSLATIONS[lang][key] !== undefined) {
      el.innerHTML = TRANSLATIONS[lang][key];
    }
  });

  // Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (TRANSLATIONS[lang][key] !== undefined) {
      el.placeholder = TRANSLATIONS[lang][key];
    }
  });

  // Lang buttons
  document.querySelectorAll('.hero-lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

function initLang() {
  const saved = localStorage.getItem('kivo-lang') || 'es';
  applyLang(saved);

  document.querySelectorAll('.hero-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.dataset.lang));
  });
}

document.addEventListener('DOMContentLoaded', initLang);
