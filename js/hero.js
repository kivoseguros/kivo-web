/* ══ KIVO hero.js — ciclo de color global (--cycle-color) ══
   Toda la web (botones, título hero, badges, bordes de tarjetas, iconos…)
   usa var(--cycle-color) con transiciones suaves ya definidas en el CSS.
   Este script es el único responsable de ir rotando esa variable en :root.
   ORDEN: 1º VERDE, 2º NARANJA, luego el resto de colores de marca KIVO.
   Actualizado 22-07-2026. */
(function(){
  var palette = [
    '#3DBFA0', // 1º Verde
    '#FB740B', // 2º Naranja
    '#B48841', // Dorado
    '#0C8B9D', // Turquesa (R.C.)
    '#011C4B'  // Azul KIVO
  ];
  var i = 0;
  var INTERVALO = 4000; // ms entre cambios

  function setColor(hex){
    document.documentElement.style.setProperty('--cycle-color', hex);
  }

  function tick(){
    i = (i + 1) % palette.length;
    setColor(palette[i]);
  }

  function start(){
    // Arranca en verde.
    setColor(palette[0]);
    // Respeta reduce-motion: se queda en verde fijo.
    if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      return;
    }
    setInterval(tick, INTERVALO); // primer cambio (4s) → naranja
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', start)
    : start();
})();
