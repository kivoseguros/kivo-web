/* ==========================================================
   KIVO — ASISTENTE DE COBERTURA v4
   Iconos Lucide exactos — monocromáticos, coherentes con la pregunta
========================================================== */

(function () {

  /* ---- SVG helper ---- */
  function svg(paths) {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
  }

  /* ---- Lucide icon paths (copiados directamente del paquete npm) ---- */
  const IC = {
    // Animales
    paw:        `<circle cx="11" cy="4" r="2"/><circle cx="18" cy="8" r="2"/><circle cx="20" cy="16" r="2"/><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z"/>`,
    cat:        `<path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75Z"/>`,
    // Edad
    baby:       `<path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M15 12h.01"/><path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/><path d="M9 12h.01"/>`,
    zap:        `<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>`,
    hourglass:  `<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/>`,
    medal:      `<path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/>`,
    // Peso
    footprints: `<path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/><path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/><path d="M16 17h4"/><path d="M4 13h4"/>`,
    weight:     `<circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"/>`,
    dumbbell:   `<path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"/><path d="m2.5 21.5 1.4-1.4"/><path d="m20.1 3.9 1.4-1.4"/><path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"/><path d="m9.6 14.4 4.8-4.8"/>`,
    // Salud
    heart:      `<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>`,
    calendar:   `<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>`,
    stethoscope:`<path d="M11 2v2"/><path d="M5 2v2"/><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>`,
    heartPulse: `<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>`,
    // Estilo de vida
    treePine:   `<path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/><path d="M12 22v-3"/>`,
    sun:        `<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>`,
    sofa:       `<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"/><path d="M4 18v2"/><path d="M20 18v2"/><path d="M12 4v9"/>`,
    house:      `<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,
    // Prioridad
    tag:        `<path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>`,
    shield:     `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>`,
    sparkles:   `<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/><path d="M20 2v4"/><path d="M22 4h-4"/><circle cx="4" cy="20" r="2"/>`,
    timer:      `<line x1="10" x2="14" y1="2" y2="2"/><line x1="12" x2="15" y1="14" y2="11"/><circle cx="12" cy="14" r="8"/>`,
    // Presupuesto
    coins:      `<path d="M13.744 17.736a6 6 0 1 1-7.48-7.48"/><path d="M15 6h1v4"/><path d="m6.134 14.768.866-.5 2 3.464"/><circle cx="16" cy="8" r="6"/>`,
    wallet:     `<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>`,
    card:       `<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>`,
    gem:        `<path d="M10.5 3 8 9l4 13 4-13-2.5-6"/><path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z"/><path d="M2 9h20"/>`,
    // RC
    shieldcheck:`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>`,
    shieldplus: `<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M9 12h6"/><path d="M12 9v6"/>`,
    shieldalert:`<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>`,
    help:       `<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>`,
    // Resultado
    check:      `<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>`,
    arrowRight: `<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>`,
  };

  /* ---- Preguntas con iconos Lucide coherentes ---- */
  const QUESTIONS = [
    {
      id: 'tipo',
      question: '¿Qué tipo de mascota tienes?',
      options: [
        { icon: 'paw',  text: 'Perro', sub: null, value: 'perro' },
        { icon: 'cat',  text: 'Gato',  sub: null, value: 'gato'  },
      ],
      skipIfGato: false,
    },
    {
      id: 'edad',
      question: '¿Cuántos años tiene tu mascota?',
      options: [
        { icon: 'baby',      text: 'Cachorro', sub: 'Menos de 1 año',   value: 'cachorro' },
        { icon: 'zap',       text: 'Joven',    sub: 'Entre 1 y 3 años', value: 'joven'    },
        { icon: 'hourglass', text: 'Adulto',   sub: 'Entre 3 y 7 años', value: 'adulto'   },
        { icon: 'medal',     text: 'Senior',   sub: 'Más de 7 años',    value: 'senior'   },
      ],
      skipIfGato: false,
    },
    {
      id: 'peso',
      question: '¿Cuánto pesa tu perro aproximadamente?',
      options: [
        { icon: 'footprints', text: 'Pequeño', sub: 'Menos de 10 kg',   value: 'pequeno' },
        { icon: 'weight',     text: 'Mediano', sub: 'Entre 10 y 25 kg', value: 'mediano' },
        { icon: 'dumbbell',   text: 'Grande',  sub: 'Más de 25 kg',     value: 'grande'  },
      ],
      skipIfGato: true,
    },
    {
      id: 'salud',
      question: '¿Con qué frecuencia va al veterinario?',
      options: [
        { icon: 'heart',       text: 'Casi nunca',            sub: 'Está muy sano, sin problemas',          value: 'sano'       },
        { icon: 'calendar',    text: 'Revisiones anuales',    sub: 'Algún imprevisto puntual',              value: 'revisiones' },
        { icon: 'stethoscope', text: 'Varias veces al año',  sub: 'Más seguimiento del habitual',          value: 'frecuente'  },
        { icon: 'heartPulse',  text: 'Seguimiento regular',  sub: 'Tiene algo crónico o necesita control', value: 'cronico'    },
      ],
      skipIfGato: false,
    },
    {
      id: 'vida',
      question: '¿Cómo es el estilo de vida de tu mascota?',
      options: [
        { icon: 'treePine', text: 'Muy activo',        sub: 'Sale mucho, le encanta el exterior', value: 'activo'      },
        { icon: 'sun',      text: 'Equilibrado',        sub: 'Paseos normales, vida tranquila',    value: 'equilibrado' },
        { icon: 'sofa',     text: 'Tranquilo en casa', sub: 'Prefiere el sofá a la calle',        value: 'tranquilo'   },
        { icon: 'house',    text: 'Indoor total',       sub: 'Apenas sale al exterior',            value: 'indoor'      },
      ],
      skipIfGato: false,
    },
    {
      id: 'prioridad',
      question: '¿Qué es lo más importante para ti en un seguro?',
      options: [
        { icon: 'tag',      text: 'Precio ajustado',     sub: 'Protección básica al mejor coste', value: 'precio'    },
        { icon: 'shield',   text: 'Buena cobertura',     sub: 'Sin pasarse, pero bien cubierto',  value: 'cobertura' },
        { icon: 'sparkles', text: 'Todo incluido',        sub: 'Sin límites ni sorpresas',         value: 'completo'  },
        { icon: 'timer',    text: 'Rapidez de reembolso',sub: 'Quiero recuperar mi dinero rápido',value: 'rapidez'   },
      ],
      skipIfGato: false,
    },
    {
      id: 'presupuesto',
      question: '¿Cuánto estarías dispuesto a invertir al mes?',
      options: [
        { icon: 'coins',  text: 'Menos de 20 €',   sub: 'Plan básico',           value: 'bajo'       },
        { icon: 'wallet', text: 'Entre 20 y 40 €', sub: 'Cobertura equilibrada', value: 'medio_bajo' },
        { icon: 'card',   text: 'Entre 40 y 70 €', sub: 'Cobertura amplia',      value: 'medio_alto' },
        { icon: 'gem',    text: 'Más de 70 €',      sub: 'Máxima protección',    value: 'alto'       },
      ],
      skipIfGato: false,
    },
    {
      id: 'rc',
      question: 'Todos nuestros planes incluyen RC básica. ¿Necesitas algo más?',
      options: [
        { icon: 'shieldcheck', text: 'Me basta con la RC incluida', sub: 'RC básica ya viene en tu plan',              value: 'rc_basica' },
        { icon: 'shieldplus',  text: 'Quiero una RC independiente', sub: 'Mayor capital: 150k · 200k · 300k €',        value: 'rc_extra'  },
        { icon: 'shieldalert', text: 'Necesito RC para raza PPP',   sub: 'Mi perro está en lista de razas peligrosas', value: 'rc_ppp'    },
        { icon: 'help',        text: 'No sé qué diferencia hay',    sub: 'Explícame las opciones',                     value: 'rc_info'   },
      ],
      skipIfGato: true,
      infoOption: 'rc_info',
      infoText: 'La RC básica incluida en todos los planes cubre daños cotidianos. La RC independiente amplía el capital hasta 300.000 € y es obligatoria para algunas razas PPP en ciertas comunidades autónomas.',
    },
  ];

  /* ---- Scoring ---- */
  function calcScore(answers) {
    const s = { care: 0, careplus: 0, premium: 0, rcExtra: 0 };
    if (answers.edad === 'cachorro') { s.care += 3; s.careplus += 1; }
    if (answers.edad === 'joven')    { s.care += 2; s.careplus += 2; }
    if (answers.edad === 'adulto')   { s.careplus += 3; s.premium += 1; }
    if (answers.edad === 'senior')   { s.premium += 5; }
    if (answers.peso === 'pequeno')  { s.care += 2; }
    if (answers.peso === 'mediano')  { s.careplus += 2; }
    if (answers.peso === 'grande')   { s.premium += 1; s.rcExtra += 2; }
    if (answers.salud === 'sano')       { s.care += 4; }
    if (answers.salud === 'revisiones') { s.care += 2; s.careplus += 1; }
    if (answers.salud === 'frecuente')  { s.careplus += 2; s.premium += 2; }
    if (answers.salud === 'cronico')    { s.premium += 5; }
    if (answers.vida === 'activo')      { s.careplus += 1; s.rcExtra += 2; }
    if (answers.vida === 'equilibrado') { s.careplus += 3; }
    if (answers.vida === 'tranquilo')   { s.care += 2; s.careplus += 1; }
    if (answers.vida === 'indoor')      { s.care += 3; }
    if (answers.prioridad === 'precio')    { s.care += 5; }
    if (answers.prioridad === 'cobertura') { s.careplus += 5; }
    if (answers.prioridad === 'completo')  { s.premium += 5; }
    if (answers.prioridad === 'rapidez')   { s.careplus += 2; s.premium += 3; }
    if (answers.presupuesto === 'bajo')       { s.care += 5; }
    if (answers.presupuesto === 'medio_bajo') { s.care += 2; s.careplus += 3; }
    if (answers.presupuesto === 'medio_alto') { s.careplus += 2; s.premium += 3; }
    if (answers.presupuesto === 'alto')       { s.premium += 5; }
    if (answers.rc === 'rc_extra') { s.rcExtra += 4; }
    if (answers.rc === 'rc_ppp')   { s.rcExtra += 5; }
    if (answers.rc === 'rc_info')  { s.rcExtra += 1; }
    return s;
  }

  function getRecommendation(scores, answers) {
    const plans = ['care', 'careplus', 'premium'];
    let best = plans.reduce((a, b) => scores[a] >= scores[b] ? a : b);
    if (best === 'care' && scores.careplus >= scores.care - 1) best = 'careplus';
    const addRCExtra = answers.tipo === 'perro' && scores.rcExtra >= 3;
    return { plan: best, addRCExtra };
  }

  /* ---- Datos planes ---- */
  const PLAN_DATA = {
    care: {
      name: 'KIVO CARE', accent: '#FB740B', badge: 'Plan Esencial',
      pct: '80%', pctLabel: 'REEMBOLSO', limit: 'Hasta 1.500 € anuales',
      features: ['Enfermedad y accidente','Cirugías y hospitalización','Pruebas diagnósticas','Medicamentos y tratamientos','Urgencias 24/7','Sin franquicia anual','RC básica incluida'],
    },
    careplus: {
      name: 'KIVO CARE+', accent: '#1B4D3E', badge: 'Más popular',
      pct: '90%', pctLabel: 'REEMBOLSO', limit: 'Hasta 2.500 € anuales',
      features: ['Enfermedad y accidente','Cirugías y hospitalización','Pruebas diagnósticas avanzadas','Medicamentos y tratamientos','Rehabilitación y fisioterapia','Urgencias 24/7','Sin franquicia anual','RC básica incluida'],
    },
    premium: {
      name: 'KIVO PREMIUM', accent: '#7C3AED', badge: 'Máxima protección',
      pct: '100%', pctLabel: 'REEMBOLSO', limit: 'Sin límite anual',
      features: ['Enfermedad y accidente','Cirugías y hospitalización','Pruebas diagnósticas avanzadas','Medicamentos y tratamientos','Rehabilitación y fisioterapia','Chequeos y prevención','Urgencias 24/7','Sin franquicia anual','RC básica incluida'],
    },
  };

  const RC_EXTRA = {
    name: 'KIVO R.C. Independiente', accent: '#0C8B9D', badge: 'Complemento recomendado',
    pct: '300k€', pctLabel: 'CAPITAL MÁX.', limit: 'Toda España',
    features: ['Daños a terceros cubiertos','Defensa jurídica y fianzas','Reclamación de daños','Asistencia en viaje','Obligatoria para razas PPP','Cobertura en toda España'],
  };

  function buildReason(plan, answers) {
    const edadMap  = { cachorro:'al ser todavía un cachorro', joven:'al ser un animal joven', adulto:'para una mascota adulta', senior:'dado que es un animal senior con necesidades crecientes' };
    const saludMap = { sano:'con excelente estado de salud', revisiones:'con un historial de salud normal', frecuente:'con visitas frecuentes al veterinario', cronico:'con necesidad de seguimiento médico continuo' };
    const presMap  = { bajo:'ajustando el presupuesto al máximo', medio_bajo:'con un presupuesto equilibrado', medio_alto:'con margen para una cobertura amplia', alto:'priorizando la máxima protección' };
    const parts = [edadMap[answers.edad], saludMap[answers.salud], presMap[answers.presupuesto]].filter(Boolean);
    return `Hemos analizado tu caso: <strong>${parts.join(', ')}</strong>. Por eso <strong>${PLAN_DATA[plan].name}</strong> es la opción que mejor se adapta a ti.`;
  }

  function planCardHTML(pd, isMain) {
    const checkIcon = svg(`<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>`);
    return `
      <div class="result-plan-card" style="--accent:${pd.accent}">
        <div class="rpc-top">
          <span class="rpc-badge">${isMain ? 'Plan recomendado' : pd.badge}</span>
          <div class="rpc-pct">${pd.pct}</div>
          <div class="rpc-pct-label">${pd.pctLabel}</div>
          <div class="rpc-name">${pd.name}</div>
          <div class="rpc-limit">${pd.limit}</div>
        </div>
        <ul class="rpc-features">
          ${pd.features.map(f => `<li><span class="rpc-check">${checkIcon}</span>${f}</li>`).join('')}
        </ul>
        <button class="rpc-cta" onclick="location.href='#contratar'">Contratar ${pd.name} →</button>
      </div>
    `;
  }

  /* ---- Estado ---- */
  let currentIdx = 0;
  let activeQuestions = [];
  let answers = {};

  const progressFill  = document.getElementById('progressFill');
  const progressLabel = document.getElementById('progressLabel');
  const quizContent   = document.getElementById('quizContent');
  const quizPanel     = document.getElementById('quizPanel');
  const resultPanel   = document.getElementById('resultPanel');
  const quizCard      = document.getElementById('quizCard');

  function buildActiveQuestions(tipo) {
    activeQuestions = QUESTIONS.filter(q => !(q.skipIfGato && tipo === 'gato'));
  }

  function renderQuestion(idx) {
    const q     = activeQuestions[idx];
    const total = activeQuestions.length;
    progressFill.style.width  = Math.round((idx / total) * 100) + '%';
    progressLabel.textContent = `${idx + 1} / ${total}`;

    quizContent.innerHTML = `
      <span class="quiz-step-num">${idx + 1}</span>
      <p class="quiz-question">${q.question}</p>
      <div class="quiz-options">
        ${q.options.map(o => `
          <button class="quiz-option${answers[q.id] === o.value ? ' selected' : ''}" data-value="${o.value}" type="button">
            <span class="quiz-radio"><span class="quiz-radio-dot"></span></span>
            <span class="quiz-opt-icon">${svg(IC[o.icon])}</span>
            <span class="quiz-opt-text">
              <span class="quiz-opt-label">${o.text}</span>
              ${o.sub ? `<span class="quiz-opt-sub">${o.sub}</span>` : ''}
            </span>
          </button>
        `).join('')}
      </div>
      ${q.infoText ? `<div class="quiz-info-box${answers[q.id] === q.infoOption ? ' visible' : ''}" id="infoBox">${q.infoText}</div>` : ''}
      <div class="quiz-nav-bar">
        ${idx > 0 ? `
          <button class="quiz-btn-back" id="backBtn" type="button">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
            Volver
          </button>
        ` : '<span></span>'}
        <button class="quiz-btn-next${answers[q.id] ? ' active' : ''}" id="nextBtn" type="button">
          ${idx < total - 1
            ? `Siguiente ${svg(IC.arrowRight)}`
            : `Ver mi recomendación ${svg(IC.check)}`}
        </button>
        <button class="quiz-btn-reset" id="resetBtnQuiz" type="button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          Empezar de nuevo
        </button>
      </div>
    `;

    quizContent.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        answers[q.id] = val;
        if (q.id === 'tipo') buildActiveQuestions(val);
        quizContent.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        const infoBox = document.getElementById('infoBox');
        if (infoBox) infoBox.classList.toggle('visible', val === q.infoOption);
        document.getElementById('nextBtn').classList.add('active');
      });
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      if (!answers[q.id]) return;
      idx < activeQuestions.length - 1 ? goTo(idx + 1) : showResult();
    });

    const backBtn = document.getElementById('backBtn');
    if (backBtn) {
      backBtn.addEventListener('click', () => goBack(idx));
    }

    const resetBtnQuiz = document.getElementById('resetBtnQuiz');
    if (resetBtnQuiz) {
      resetBtnQuiz.addEventListener('click', resetQuiz);
    }
  }

  function goTo(idx) {
    quizContent.classList.add('fade-out');
    setTimeout(() => {
      currentIdx = idx;
      quizContent.classList.remove('fade-out');
      quizContent.classList.add('fade-in');
      renderQuestion(idx);
      requestAnimationFrame(() => requestAnimationFrame(() => quizContent.classList.remove('fade-in')));
    }, 220);
  }

  function goBack(idx) {
    if (idx <= 0) return;
    // Borrar la respuesta de la pregunta actual al retroceder
    delete answers[activeQuestions[idx].id];
    quizContent.classList.add('fade-out');
    setTimeout(() => {
      currentIdx = idx - 1;
      quizContent.classList.remove('fade-out');
      quizContent.classList.add('fade-in');
      renderQuestion(idx - 1);
      requestAnimationFrame(() => requestAnimationFrame(() => quizContent.classList.remove('fade-in')));
    }, 220);
  }

  function showResult() {
    const scores = calcScore(answers);
    const { plan, addRCExtra } = getRecommendation(scores, answers);
    const pd = PLAN_DATA[plan];

    progressFill.style.width  = '100%';
    progressLabel.textContent = '¡Listo!';
    quizPanel.style.display   = 'none';
    if (quizCard) quizCard.style.display = 'none';
    resultPanel.classList.add('visible');

    resultPanel.innerHTML = `
      <div class="result-intro">
        <div class="result-check-icon">${svg(`<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>`)}</div>
        <h3>Tu plan ideal es ${pd.name}</h3>
        <p>Basado en tus respuestas, esta es nuestra recomendación personalizada.</p>
      </div>
      <div class="result-cards-row">
        ${planCardHTML(pd, true)}
        ${addRCExtra ? planCardHTML(RC_EXTRA, false) : ''}
      </div>
      <div class="result-reason">${buildReason(plan, answers)}</div>
      <button class="result-cta-reset" id="resetBtn">↩ Volver a empezar</button>
    `;
    document.getElementById('resetBtn').addEventListener('click', resetQuiz);
  }

  function resetQuiz() {
    answers = {}; currentIdx = 0; activeQuestions = [...QUESTIONS];
    resultPanel.classList.remove('visible');
    resultPanel.innerHTML   = '';
    if (quizCard) quizCard.style.display = '';
    quizPanel.style.display = 'block';
    progressFill.style.width  = '0%';
    progressLabel.textContent = '1 / 8';
    renderQuestion(0);
  }

  buildActiveQuestions('perro');
  renderQuestion(0);

})();
