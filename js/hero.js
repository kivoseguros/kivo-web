/* ══ KIVO hero.js — funciones del hero y efectos ══ */

/* ── Destello aleatorio en filas de beneficios ── */
(function(){
  var palette=['#3DBFA0','#F97316','#8B5CF6','#3B82F6','#EC4899','#EAB308','#10B981','#06B6D4','#F43F5E'];
  var BASE_ICON='rgba(61,191,160,0.12)';
  var BASE_TEXT='#1B2A4A';

  function doFlash(){
    var items=Array.from(document.querySelectorAll('.hero-benefit, .bottom-info > div'));
    if(!items.length){setTimeout(doFlash,800);return;}
    var el=items[Math.floor(Math.random()*items.length)];
    var col=palette[Math.floor(Math.random()*palette.length)];
    var light=col+'22';
    var icon=el.querySelector('div[style*="border-radius:50%"], span');
    var strong=el.querySelector('strong');
    if(icon) icon.style.setProperty('background',light,'important');
    if(strong) strong.style.setProperty('color',col,'important');
    setTimeout(function(){
      if(icon) icon.style.setProperty('background',BASE_ICON,'important');
      if(strong) strong.style.setProperty('color',BASE_TEXT,'important');
    },700);
    setTimeout(doFlash,350+Math.random()*700);
  }

  document.addEventListener('DOMContentLoaded',function(){
    setTimeout(doFlash,600);
    setTimeout(doFlash,1100);
    setTimeout(doFlash,1700);
  });
})();
