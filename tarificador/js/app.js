
/* ── INIT ── (corre tras DOMContentLoaded para que STEPS ya esté definido) */
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.screen, .cscreen').forEach(function(el) {
    el.style.display = 'none';
  });
  var params = new URLSearchParams(window.location.search);
  if (params.get('modo') === 'fullscreen') {
    // Fullscreen: mostrar botón salir, ir directo al flow
    var salirBtn = document.getElementById('kivo-btn-salir-fixed');
    if (salirBtn) salirBtn.style.display = 'flex';
    var esp = params.get('especie');
    if (esp) {
      selectEspecie(esp);
      showScreen('fw');
      showStep(1);
    } else {
      showFW();
    }
  } else {
    // Preview: mostrar solo portal de paso (s0)
    var s0 = document.getElementById('s0');
    if (s0) s0.style.display = 'flex';
    try { window.parent.postMessage({ type: 'kivo-iframe-height', height: 480 }, '*'); } catch(e) {}
  }
});

/* ── S0: selección de especie en la vista embebida ── */
var _s0Especie = null;
function s0SelectEspecie(esp) {
  _s0Especie = esp;
  document.getElementById('hero-tile-perro').classList.toggle('sel', esp === 'perro');
  document.getElementById('hero-tile-gato').classList.toggle('sel', esp === 'gato');
  document.getElementById('s0-btn-cta').disabled = false;
}

/* ── FULLSCREEN: expandir iframe a pantalla completa ── */
function goFullscreen() {
  // Flash azul al pulsar antes de abrir
  var btn = document.getElementById('s0-btn-cta');
  if (btn) {
    btn.classList.add('clicking');
    setTimeout(function() { btn.classList.remove('clicking'); }, 200);
  }
  try { window.parent.postMessage({ type: 'kivo-fullscreen', especie: _s0Especie }, '*'); } catch(e) {}
  setTimeout(function() {
    if (_s0Especie) {
      selectEspecie(_s0Especie);
      showScreen('fw');
      showStep(1);
    } else {
      showFW();
    }
  }, 120);
}

/* ── Escuchar orden de abrir desde la web padre ── */
window.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'kivo-open') {
    goFullscreen();
  }
});

/* ═══════════════════════════════════════════════════════
   KIVO TARIFICADOR — LÓGICA PRINCIPAL
   (Los precios y textos se configuran en js/config.js)
   ═══════════════════════════════════════════════════════ */

var _planColors = { care:'#E8823A', careplus:'#3DBFA0', premium:'#C9A227', rc:'#4F7EDB' };

var S = {
  especie: null, nombre: '', sexo: null, esterilizada: null,
  noFecha: false, tipoRaza: 'pura', raza: null, raza2: null, peso: null,
  interior: null,
  email: '', tel: '', plan: null, rcAddon: false, periodo: 'mensual'
};
var pets = []; // mascotas ya confirmadas
var _checkoutPets = []; // mascotas con plan elegido pendientes de pago
var completedMascotas = [];
var _checkoutPets = []; // mascotas en proceso de checkout
var _saludRespondida = false; // si el usuario respondió el cuestionario de salud // mascotas confirmadas con plan desde s6 (nuevo flujo)
var _activePetIdx  = -1;  // -1 = nueva mascota en curso; >=0 = mascota confirmada
var _newPetDraft   = null; // estado guardado de la nueva mascota al cambiar de tab

var BREEDS = {
  perro: [
    'Affenpinscher','Afghan Hound (Lebrel Afgano)','Airedale Terrier','Akita Americano',
    'Akita Inu','Alano Español','Alaskan Malamute','American Staffordshire Terrier',
    'Appenzeller Sennenhund','Australian Cattle Dog','Australian Shepherd','Australian Terrier',
    'Azawakh','Basenji','Basset Artesiano Normando','Basset Azul de Gascuña',
    'Basset Hound','Beagle','Beagle Harrier','Bearded Collie','Bedlington Terrier',
    'Bergamasco','Bichón Frisé','Bichón Maltés','Billy','Black and Tan Coonhound',
    'Bloodhound (San Huberto)','Bobtail (Old English Sheepdog)','Bolognés',
    'Border Collie','Border Terrier','Borzoi (Galgo Ruso)','Boston Terrier',
    'Bouvier des Flandres','Boxer','Boyero de Appenzell','Boyero de Berna',
    'Boyero de Entlebuch','Braco Alemán de Pelo Corto','Braco Alemán de Pelo Duro',
    'Braco de Auvernia','Braco de Weimar (Weimaraner)','Braco Francés tipo Gascuña',
    'Braco Húngaro (Vizsla)','Braco Italiano','Braco de Burgos',
    'Braco Eslovaco de Pelo Duro','Bull Terrier','Bulldog Americano','Bulldog Francés',
    'Bulldog Inglés','Bullmastiff','Cairn Terrier','Canaan Dog',
    'Caniche Toy (Poodle Toy)','Caniche Miniatura','Caniche Mediano','Caniche Grande',
    'Cane Corso','Cao de Castro Laboreiro','Cao Fila de Sao Miguel',
    'Carlino (Pug)','Cavalier King Charles Spaniel','Chesapeake Bay Retriever',
    'Chihuahua pelo corto','Chihuahua pelo largo','Chow Chow','Cirneco del Etna',
    'Clumber Spaniel','Cocker Spaniel Americano','Cocker Spaniel Inglés',
    'Collie de Pelo Corto','Collie de Pelo Largo','Corgi Galés Cardigan',
    'Corgi Galés Pembroke','Dálmata','Dandie Dinmont Terrier','Deerhound',
    'Dobermann','Dogo Alemán (Gran Danés)','Dogo Argentino','Dogo de Burdeos',
    'Dogo del Tíbet (Mastín del Tíbet)','Épagneul Bretón (Bretón)','Épagneul Picard',
    'Eurasier','Field Spaniel','Fila Brasileiro','Flat Coated Retriever',
    'Fox Terrier de Pelo Duro','Fox Terrier de Pelo Liso','Foxhound Americano',
    'Foxhound Inglés','Galgo Español','Galgo Húngaro (Magyar Agar)',
    'Galgo Italiano','Golden Retriever','Gordon Setter','Gran Basset Grifón Vendeano',
    'Gran Boyero Suizo','Gran Danés','Greyhound (Galgo Inglés)',
    'Griffon Belga','Griffon de Bruselas','Griffon de Pelo Duro de Korthals',
    'Harrier','Hovawart','Husky Siberiano','Ibizan Hound (Podenco Ibicenco)',
    'Irish Terrier','Irish Water Spaniel','Irish Wolfhound','Jack Russell Terrier',
    'Kai Ken','Keeshond (Spitz Holandés)','Kerry Blue Terrier','King Charles Spaniel',
    'Kishu Ken','Komondor','Kuvasz','Labrador Retriever','Lagotto Romagnolo',
    'Lakeland Terrier','Lancashire Heeler','Leonberger','Lhasa Apso',
    'Lowchen (Pequeño Perro León)','Malinois (Pastor Belga Malinois)',
    'Maltés (Bichón Maltés)','Manchester Terrier','Mastín de los Pirineos',
    'Mastín del Pirineo','Mastín Español','Mastín Napolitano','Mastín Tibetano',
    'Miniature American Shepherd','Mudi','Norfolk Terrier','Norrbottenspets',
    'Norwegian Buhund','Norwegian Elkhound','Norwich Terrier','Nova Scotia Duck Tolling Retriever',
    'Otterhound','Papillón','Parson Russell Terrier','Pastor Alemán',
    'Pastor Australiano','Pastor Belga Groenendael','Pastor Belga Laekenois',
    'Pastor Belga Tervueren','Pastor Blanco Suizo','Pastor Catalán (Gos d\'Atura)',
    'Pastor Croata','Pastor de Anatolia','Pastor de Asia Central',
    'Pastor de Beauce (Beaucerón)','Pastor de Brie (Briard)','Pastor de los Pirineos',
    'Pastor de Shetland (Sheltie)','Pastor del Cáucaso','Pastor Holandés',
    'Pastor Húngaro (Puli)','Pastor Húngaro (Pumi)','Pastor Islandés',
    'Pastor Leonés','Pastor Maremano-Abrucés','Pastor Polaco de las Llanuras',
    'Pastor de la Maremma','Pekingese (Pequinés)','Perdigüero de Burgos',
    'Perro de Agua Español','Perro de Agua Irlandés','Perro de Agua Portugués',
    'Perro de Canaán','Perro de Groenlandia','Perro de Montaña de los Pirineos',
    'Perro de Presa Canario','Perro de Presa Mallorquín (Ca de Bou)',
    'Perro Lobo Checoslovaco','Perro Lobo de Saarloos','Perro Nórdico de Caza',
    'Perro Sin Pelo del Perú','Perro Sin Pelo Mexicano (Xoloitzcuintle)',
    'Petit Basset Grifón Vendeano','Pinscher Alemán','Pinscher Miniatura',
    'Plott Hound','Podenco Andaluz','Podenco Canario','Podenco Ibicenco',
    'Podenco Portugués','Pointer Inglés','Pomerania (Spitz Enano)',
    'Porcelaine','Rottweiler','Sabueso Español','Sabueso Italiano',
    'Saint Bernard (San Bernardo)','Saluki','Samoyedo','Schipperke',
    'Schnauzer Estándar','Schnauzer Gigante','Schnauzer Miniatura',
    'Scottish Deerhound','Scottish Terrier','Segugio Italiano',
    'Shar Pei','Shiba Inu','Shih Tzu','Silky Terrier',
    'Skye Terrier','Sloughi','Pequeno Brabançon','Spitz Alemán',
    'Spitz Finlandés','Spitz Japonés','Spitz Nórdico de Caza',
    'Springer Spaniel Galés','Springer Spaniel Inglés','Staffordshire Bull Terrier',
    'Sussex Spaniel','Teckel Miniatura pelo liso','Teckel Miniatura pelo largo',
    'Teckel Miniatura pelo duro','Teckel Estándar pelo liso','Teckel Estándar pelo largo',
    'Teckel Estándar pelo duro','Terranova (Newfoundland)','Tibetan Mastiff',
    'Tibetan Spaniel','Tibetan Terrier','Tosa Inu','Toy Fox Terrier',
    'Vizsla (Braco Húngaro)','Volpino Italiano','Welsh Terrier','West Highland White Terrier',
    'Whippet','Wire Fox Terrier','Xoloitzcuintle','Yorkshire Terrier'
  ],
  gato: ['Europeo Común','Persa','Maine Coon','Siamés','Bengalí','Ragdoll','Sphynx',
    'Británico de Pelo Corto','Abisinio','Noruego del Bosque','Azul Ruso','Devon Rex',
    'Scottish Fold','Angora Turco','Exótico de Pelo Corto','Birmano','Ocicat','Tonkinés',
    'Chartreux','Manx','Balinés','Bombay','Burmés','Cornish Rex','Cymric',
    'Egyptian Mau','Himalayas','Japanese Bobtail','Korat','LaPerm',
    'Munchkin','Neva Masquerade','Oriental','Peterbald','Pixiebob',
    'Ragamuffin','Savannah','Selkirk Rex','Serengueti','Singapura',
    'Snowshoe','Somali','Turkish Van','York Chocolate']
};

var MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio',
             'Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

/* ── UTILS ── */
function fmt(n) { return n.toFixed(2).replace('.', ',') + ' €'; }


/* ── RESUMEN POR MASCOTA EN SC4 ── */
var _DOCS = {
  care:     { ipid: 'assets/docs/ipid-care.pdf',      ipidLabel: 'IPID KIVO CARE',    cg: '#', cgLabel: 'Condicionado General KIVO CARE' },
  careplus: { ipid: 'assets/docs/ipid-care-plus.pdf', ipidLabel: 'IPID KIVO CARE+',   cg: '#', cgLabel: 'Condicionado General KIVO CARE+' },
  premium:  { ipid: 'assets/docs/ipid-premium.pdf',   ipidLabel: 'IPID KIVO PREMIUM', cg: '#', cgLabel: 'Condicionado General KIVO PREMIUM' },
  rc:       { ipid: '#', ipidLabel: 'IPID KIVO R.C.',  cg: '#', cgLabel: 'Condicionado General KIVO R.C.' }
};

var _COBERTURAS = {
  care:     ['80% de reembolso', 'Límite 3.500 €/año', 'Consultas y visitas veterinarias', 'Hospitalización y cirugía', 'Pruebas diagnósticas', 'Medicamentos recetados'],
  careplus: ['90% de reembolso', 'Límite 4.000 €/año', 'Consultas y visitas veterinarias', 'Hospitalización y cirugía', 'Pruebas diagnósticas', 'Medicamentos recetados', 'Fisioterapia y rehabilitación'],
  premium:  ['100% sin copago', 'Límite 5.000 €/año', 'Consultas y visitas veterinarias', 'Hospitalización y cirugía', 'Pruebas diagnósticas', 'Medicamentos recetados', 'Fisioterapia y rehabilitación', 'Atención de urgencias 24h'],
  rc:       ['Cobertura hasta 300.000 €', 'Daños a terceras personas', 'Daños a bienes de terceros', 'Defensa jurídica incluida']
};

var _PLAN_COLOR = { care:'#E8823A', careplus:'#3DBFA0', premium:'#C9A227', rc:'#4F7EDB' };
var _PLAN_LOGO  = { care:'assets/images/care.png', careplus:'assets/images/care-plus.png', premium:'assets/images/premium.png', rc:'assets/images/rc.png' };

function _renderSc4ResumenMascotas() {
  var container = document.getElementById('sc4-mascotas-resumen');
  if (!container) return;
  if (!_checkoutPets || _checkoutPets.length === 0) { container.innerHTML = ''; return; }

  var p = _checkoutPets[0].periodo || S.periodo;
  var DESC = typeof DESC_ANUAL !== 'undefined' ? DESC_ANUAL : 0.15;
  var html = '';

  _checkoutPets.forEach(function(pet, i) {
    var planKey  = pet.plan;
    var hasRc    = pet.rcAddon && planKey !== 'rc';
    var isRcOnly = planKey === 'rc';
    var color    = _PLAN_COLOR[planKey] || '#1B2A4A';

    // Precios plan principal
    var rcBase    = typeof RC_SUELTA !== 'undefined' ? (RC_SUELTA[pet.especie] || 14.90) : 14.90;
    var rcAddonP  = typeof RC_ADDON  !== 'undefined' ? RC_ADDON : 8.90;
    var planMes   = isRcOnly ? rcBase : (hasRc ? pet.precioMes - rcAddonP : pet.precioMes);
    var planAnual = planMes * 12 * (1 - DESC);
    var rcMes     = hasRc ? rcAddonP : (isRcOnly ? rcBase : 0);
    var rcAnual   = rcMes * 12 * (1 - DESC);

    html += '<div class="ccard" style="margin-bottom:16px;border-top:4px solid ' + color + '">';

    // ── CABECERA: nombre + especie + esterilización + salud ─────────────────
    var esterilStr = '';
    if (pet.sexo) {
      esterilStr = pet.sexo === 'macho' ? '♂ Macho' : '♀ Hembra';
      if (pet.esterilizada === true)  esterilStr += ' · Castrado/a';
      if (pet.esterilizada === false) esterilStr += ' · No castrado/a';
    }
    var saludStr = '';
    if (pet._enf && pet._enf.length > 0) {
      saludStr = '⚕️ Historial: ' + pet._enf.join(', ');
    } else if (pet._saludRespondida) {
      saludStr = '✅ Sin enfermedades previas declaradas';
    }

    html += '<div style="margin-bottom:16px">';
    html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px"><img src="assets/icons/' + (pet.especie === 'gato' ? 'gato' : 'perro') + '.svg" style="width:48px;height:48px"><span style="font-size:18px;font-weight:900;color:#1B2A4A">' + (pet.nombre || 'Mascota') + '</span></div>';
    if (esterilStr) html += '<div style="font-size:12px;color:rgba(27,42,74,0.55);margin-top:3px">' + esterilStr + '</div>';
    if (saludStr)   html += '<div style="font-size:12px;color:rgba(27,42,74,0.55);margin-top:2px">' + saludStr + '</div>';
    html += '</div>';

    // ── FILA DE PLANES (plan + RC en fila si hay dos) ──────────────────────
    html += '<div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap">';

    // Tarjeta plan principal
    if (!isRcOnly) {
      html += '<div style="flex:1;min-width:200px;background:#fff;border:2px solid ' + color + ';border-radius:14px;padding:16px 18px;box-shadow:0 4px 16px rgba(27,42,74,0.10)">';
      html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">';
      html += '<img src="' + (_PLAN_LOGO[planKey] || 'assets/images/care.png') + '" style="height:32px;width:auto">';
      html += '<div>';
      html += '<div style="font-size:10px;color:rgba(27,42,74,0.45);font-weight:700;text-transform:uppercase;letter-spacing:.06em">Plan Acc. y Enfermedades</div>';
      html += '<div style="font-size:14px;font-weight:800;color:#1B2A4A">' + ({ care:'KIVO CARE', careplus:'KIVO CARE+', premium:'KIVO PREMIUM' }[planKey] || planKey.toUpperCase()) + '</div>';
      html += '</div></div>';
      html += '<div style="font-size:24px;font-weight:900;color:' + color + '">' + fmt(p==='anual'?planAnual:planMes) + ' €<span style="font-size:12px;font-weight:500;color:rgba(27,42,74,0.5)">/' + (p==='anual'?'año':'mes') + '</span></div>';
      if (p==='anual') html += '<div style="font-size:11px;color:rgba(27,42,74,0.4);margin-top:2px">' + fmt(planMes) + ' €/mes</div>';
      else             html += '<div style="font-size:11px;color:#3DBFA0;margin-top:2px">o ' + fmt(planAnual) + ' €/año</div>';
      html += '</div>';
    }

    // Tarjeta RC (addon o RC suelta)
    if (hasRc || isRcOnly) {
      html += '<div style="flex:1;min-width:200px;background:#fff;border:2px solid #4F7EDB;border-radius:14px;padding:16px 18px;box-shadow:0 4px 16px rgba(79,126,219,0.12)">';
      html += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">';
      html += '<img src="assets/images/rc.png" style="height:32px;width:auto">';
      html += '<div>';
      html += '<div style="font-size:10px;color:rgba(79,126,219,0.7);font-weight:700;text-transform:uppercase;letter-spacing:.06em">' + (isRcOnly ? 'R.C. Suelta' : 'Complemento R.C.') + '</div>';
      html += '<div style="font-size:14px;font-weight:800;color:#1B2A4A">KIVO R.C.</div>';
      html += '</div></div>';
      html += '<div style="font-size:24px;font-weight:900;color:#4F7EDB">' + fmt(p==='anual'?rcAnual:rcMes) + ' €<span style="font-size:12px;font-weight:500;color:rgba(27,42,74,0.5)">/' + (p==='anual'?'año':'mes') + '</span></div>';
      if (p==='anual') html += '<div style="font-size:11px;color:rgba(27,42,74,0.4);margin-top:2px">' + fmt(rcMes) + ' €/mes</div>';
      else             html += '<div style="font-size:11px;color:#4F7EDB;margin-top:2px">o ' + fmt(rcAnual) + ' €/año</div>';
      html += '</div>';
    }

    html += '</div>'; // end fila planes

    // Coberturas del plan principal — desplegable
    var covs = _COBERTURAS[planKey] || [];
    if (covs.length) {
      var covId = 'sc4-cov-' + i;
      html += '<button onclick="toggleSc4Cov(\'' + covId + '\',this)" style="width:100%;display:flex;align-items:center;justify-content:space-between;background:none;border:none;border-top:1px solid #eee;padding:12px 0;cursor:pointer;color:#1B2A4A;font-size:13px;font-weight:700;margin-top:4px">';
      html += '<span>Ver coberturas incluidas</span>';
      html += '<svg id="' + covId + '-arr" width="16" height="16" viewBox="0 0 16 16" fill="none" style="transition:transform .2s"><path d="M4 6l4 4 4-4" stroke="#3DBFA0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      html += '</button>';
      html += '<div id="' + covId + '" style="display:none;padding-bottom:12px">';
      html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 16px">';
      covs.forEach(function(c) {
        html += '<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#1B2A4A;padding:3px 0">';
        html += '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#3DBFA0" stroke-width="1.5" stroke-linecap="round"/></svg>' + c;
        html += '</div>';
      });
      html += '</div>';
      if (hasRc) {
        html += '<div style="background:rgba(79,126,219,0.07);border-radius:10px;padding:12px;margin-top:10px">';
        html += '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#4F7EDB;margin-bottom:8px">+ R.C. incluida</div>';
        html += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:4px 16px">';
        _COBERTURAS.rc.forEach(function(c) {
          html += '<div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#1B2A4A;padding:3px 0">';
          html += '<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#4F7EDB" stroke-width="1.5" stroke-linecap="round"/></svg>' + c;
          html += '</div>';
        });
        html += '</div></div>';
      }
      html += '</div>';
    }

    // Documentación
    html += '<div style="border-top:1px solid #eee;padding-top:14px">';
    html += '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:rgba(27,42,74,0.45);margin-bottom:10px">Documentación contractual</div>';

    function docRow(d) {
      var isPending = d.ipid === '#';
      var ipidHtml = isPending
        ? '<span style="color:rgba(27,42,74,0.35)">' + d.ipidLabel + ' <em style="font-size:10px">(próximamente)</em></span>'
        : '<a href="' + d.ipid + '" target="_blank" style="color:#1B2A4A;font-weight:600;text-decoration:none;border-bottom:1px dashed rgba(27,42,74,0.3)">' + d.ipidLabel + ' ↓</a>';
      var cgPending = d.cg === '#';
      var cgHtml = cgPending
        ? '<span style="color:rgba(27,42,74,0.35)">' + d.cgLabel + ' <em style="font-size:10px">(próximamente)</em></span>'
        : '<a href="' + d.cg + '" target="_blank" style="color:#1B2A4A;font-weight:600;text-decoration:none;border-bottom:1px dashed rgba(27,42,74,0.3)">' + d.cgLabel + ' ↓</a>';

      return '<div style="display:flex;flex-direction:column;gap:6px">'
        + '<div style="display:flex;align-items:center;gap:8px;font-size:12px">📄 ' + ipidHtml + '</div>'
        + '<div style="display:flex;align-items:center;gap:8px;font-size:12px">📄 ' + cgHtml + '</div>'
        + '</div>';
    }

    // Docs plan principal
    if (planKey !== 'rc' && _DOCS[planKey]) {
      html += docRow(_DOCS[planKey]);
    } else if (planKey === 'rc') {
      html += docRow(_DOCS.rc);
    }
    // Docs RC addon
    if (hasRc) {
      html += '<div style="margin-top:8px;padding-top:8px;border-top:1px dashed #eee">';
      html += '<div style="font-size:10px;font-weight:700;color:#4F7EDB;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">R.C. Adjunta</div>';
      html += docRow(_DOCS.rc);
      html += '</div>';
    }

    html += '</div>'; // end docs

    // ── MICROCHIP ────────────────────────────────────────────────────────────
    html += '<div style="border-top:1px solid #eee;padding-top:14px;margin-top:14px">';
    html += '<div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:rgba(27,42,74,0.45);margin-bottom:10px">Identificación del animal</div>';
    html += '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">';
    html += '<div style="flex:1;min-width:180px">';
    html += '<label style="font-size:12px;color:rgba(27,42,74,0.6);display:block;margin-bottom:4px">Nº microchip</label>';
    html += '<input class="kinput" type="text" id="chip-' + i + '" maxlength="15" placeholder="15 dígitos" style="font-size:13px" oninput="validateChip(' + i + ')">';
    html += '<span id="chip-msg-' + i + '" style="font-size:11px;color:#888;display:block;margin-top:3px"></span>';
    html += '</div>';
    html += '</div>';
    html += '<label style="display:flex;align-items:flex-start;gap:8px;margin-top:10px;cursor:pointer">';
    html += '<input type="checkbox" id="chip-nd-' + i + '" onchange="toggleChipNd(' + i + ')" style="margin-top:2px">';
    html += '<span style="font-size:12px;color:rgba(27,42,74,0.65);line-height:1.45">Soy consciente de que la ley obliga a todas las mascotas a llevar microchip y me comprometo a aportarlo antes de que la póliza cumpla tres meses o antes de realizar el primer reembolso.</span>';
    html += '</label>';
    html += '</div>';

    html += '</div>'; // end ccard
  });

  container.innerHTML = html;
  // Re-attach chip validation listeners after render
  _checkoutPets.forEach(function(pet, i) {
    var ndEl = document.getElementById('chip-nd-' + i);
    if(ndEl) ndEl.addEventListener('change', function(){ toggleChipNd(i); });
  });
}


function validateChip(idx) {
  var inp = document.getElementById('chip-' + idx);
  var msg = document.getElementById('chip-msg-' + idx);
  var nd  = document.getElementById('chip-nd-' + idx);
  if (!inp) return;
  var v = inp.value.replace(/\D/g,'');
  inp.value = v;
  if (nd && nd.checked) { if(msg) msg.textContent = ''; return; }
  if (!v) { if(msg) { msg.textContent = ''; } }
  else if (v.length !== 15) { if(msg) { msg.style.color='#e53935'; msg.textContent = 'El microchip tiene 15 dígitos'; } }
  else { if(msg) { msg.style.color='#3DBFA0'; msg.textContent = '✓ Correcto'; } }
  checkC4();
}

function toggleChipNd(idx) {
  var inp = document.getElementById('chip-' + idx);
  var nd  = document.getElementById('chip-nd-' + idx);
  var msg = document.getElementById('chip-msg-' + idx);
  if (!inp || !nd) return;
  inp.disabled = nd.checked;
  inp.style.opacity = nd.checked ? '0.4' : '1';
  if (nd.checked && msg) { msg.textContent = ''; }
  checkC4();
}

function checkC4Chip() {
  // Valida que cada mascota tiene chip válido o ha marcado "no dispongo aún"
  var allOk = true;
  if (_checkoutPets) {
    _checkoutPets.forEach(function(pet, i) {
      var inp = document.getElementById('chip-' + i);
      var nd  = document.getElementById('chip-nd-' + i);
      if (!inp) return;
      if (nd && nd.checked) return; // accepted with commitment
      if (inp.value.length !== 15) allOk = false;
    });
  }
  return allOk;
}
function _renderSc4Docs() { _renderSc4ResumenMascotas(); } // alias por compatibilidad

function showScreen(id) {
  document.querySelectorAll('.screen, .cscreen').forEach(function(el) {
    el.classList.remove('active');
    el.style.display = 'none';
  });
  var el = document.getElementById(id);
  el.classList.add('active');
  el.style.display = (id === 's0' || id === 'fw') ? 'flex' : 'block';
  window.scrollTo(0, 0);
  if (id === 'sc4') { _renderSc4ResumenMascotas(); }
  if (id === 'sc5') { _initSc5(); }
  // Altura dinámica para el iframe en la web principal
  var heights = {
    's0': 520, 'fw': 880, 's6': 920,
    'sc1': 820, 'sc2': 860, 'sc3': 820, 'sc4': 880, 'sc5': 700,
    's-loading': 480, 's-letra': 780, 's-ok': 580
  };
  try { window.parent.postMessage({ type: 'kivo-iframe-height', height: heights[id] || 820 }, '*'); } catch(e) {}
}

function _initSc5() {
  // Reset pay button - user must re-confirm on payment screen
  var btnPagar = document.getElementById('btn-pagar');
  if (btnPagar) btnPagar.disabled = false; // enable - no extra validation needed
  // Sync plan summary from sc4 elements
  // c4-logo, c4-pname, c4-mascota, c4-total already populated by _irAlCheckout
}

function ageYears() {
  if (S.noFecha) {
    var mes  = document.getElementById('sel-mes2').value;
    var anio = document.getElementById('sel-anio2').value;
    if (!mes || !anio) return 3;
    var mIdx  = MESES.indexOf(mes);
    var birth = new Date(parseInt(anio), mIdx < 0 ? 0 : mIdx, 15);
    return (Date.now() - birth) / (365.25 * 24 * 3600 * 1000);
  } else {
    var val = document.getElementById('inp-fecha').value; // YYYY-MM-DD
    if (!val) return 3;
    var birth = new Date(val);
    return (Date.now() - birth) / (365.25 * 24 * 3600 * 1000);
  }
}

function ageMult(y) {
  for (var i = 0; i < MULT_EDAD.length; i++) {
    if (y < MULT_EDAD[i].hasta) return MULT_EDAD[i].mult;
  }
  return 2.00;
}

function weightMult() {
  if (S.tipoRaza === 'desconocida') return MULT_PESO[S.peso] || 1.00;
  return 1.00;
}

function calcBase(plan) {
  if (!S.especie || !PRECIOS_BASE[S.especie][plan]) return 0;
  return PRECIOS_BASE[S.especie][plan] * ageMult(ageYears()) * weightMult();
}

/* ── FLOW ── */
var curStep = 1;
var STEPS = [null, 'fs1', 'fs2', 'fs3', 'fs4', 'fs4b', 'fs5'];

function showStep(n) {
  document.querySelectorAll('.fstep').forEach(function(s) { s.classList.remove('active'); });
  document.getElementById(STEPS[n]).classList.add('active');
  document.getElementById('prog-label').textContent = 'Paso ' + n + ' de 6';
  document.getElementById('prog-fill').style.width = (n / 6 * 100) + '%';
  curStep = n;
  // Ocultar Volver en paso 1, mostrar a partir de paso 2
  var btnBack = document.querySelector('#fw .btn-back');
  if (btnBack) btnBack.style.visibility = (n === 1) ? 'hidden' : 'visible';
  // Botón Salir: solo visible en paso 1, solo si estamos en modo fullscreen
  var salirBtn = document.getElementById('kivo-btn-salir-fixed');
  if (salirBtn) {
    var _isFS = new URLSearchParams(window.location.search).get('modo') === 'fullscreen';
    salirBtn.style.display = (_isFS && n === 1) ? 'flex' : 'none';
  }
  if (n === 5) setupStep4b();
  if (n === 6) populateMascotaResumen();
  window.scrollTo(0, 0);
  // Altura dinámica del iframe para cada paso
  var stepHeights = { 1: 520, 2: 580, 3: 520, 4: 540, 5: 520, 6: 600 };
  try { window.parent.postMessage({ type: 'kivo-iframe-height', height: stepHeights[n] || 520 }, '*'); } catch(e) {}
}

function setupStep4b() {
  // Restaurar selección previa si vuelve atrás
  document.getElementById('btn-s4b').disabled = (S.interior === null || S.interior === undefined);
  document.getElementById('yn-si').classList.toggle('sel', S.interior === true);
  document.getElementById('yn-no').classList.toggle('sel', S.interior === false);
}

function showFW() { showScreen('fw'); showStep(1); }

function startWithEspecie(esp) {
  // Marcar selección en hero
  document.getElementById('hero-tile-perro').classList.toggle('sel', esp === 'perro');
  document.getElementById('hero-tile-gato').classList.toggle('sel', esp === 'gato');
  // Abrir tarificador con especie pre-seleccionada
  showScreen('fw');
  showStep(1);
  selectEspecie(esp);
}

function goBack() {
  if (curStep <= 1) {
    if (pets.length > 0) {
      // Restaurar última mascota guardada como actual y volver a pantalla familia
      var last = pets.pop();
      Object.assign(S, last);
      showStep(6);
    } else if (completedMascotas.length > 0) {
      // Mascota 2+ en flujo multi-mascota → volver a s6 con la mascota anterior
      showScreen('s6');
    } else {
      showExitModal();
    }
    return;
  }
  var prev = curStep - 1;
  // Perros saltan fs4b al volver
  if (curStep === 6 && S.especie === 'perro') prev = 4;
  showStep(prev);
}

function showExitModal() {
  var n = (S.nombre || '').trim();
  var titulo = n ? '¿Dejas a ' + n + ' sin protección?' : '¿Dejas a tu mascota sin protección?';
  var desc   = n
    ? 'Solo te falta 1 minuto. No dejes que un imprevisto pille a <strong>' + n + '</strong> sin cobertura.<br><em>Cuida su salud como se merece.</em>'
    : 'Tan solo estás a 1 minuto de recibir el precio del seguro sin compromiso.<br><em>Cuida su salud como se merece.</em>';
  var modal = document.getElementById('exit-modal');
  modal.querySelector('.exit-modal-title').textContent = titulo;
  modal.querySelector('.exit-modal-desc').innerHTML = desc;
  modal.classList.add('active');
}
function closeExitModal() {
  document.getElementById('exit-modal').classList.remove('active');
}
function confirmExit() {
  closeExitModal();
  // Colapsar fullscreen y volver a la web
  try { window.parent.postMessage({ type: 'kivo-fullscreen', active: false }, '*'); } catch(e) {}
  try { window.parent.postMessage({ type: 'kivo-tarificador-exit' }, '*'); } catch(e) {}
  // Reiniciar estado
  S.especie = null; S.nombre = ''; S.sexo = null;
  S.noFecha = false; S.tipoRaza = 'pura'; S.raza = null; S.peso = null;
  S.email = ''; S.tel = ''; S.plan = null; S.periodo = 'mensual';
  // Limpiar campos visibles
  document.getElementById('inp-nombre').value = '';
  document.getElementById('tile-perro').classList.remove('sel');
  document.getElementById('tile-gato').classList.remove('sel');
  document.getElementById('btn-s1').disabled = true;
  // Resetear selector s0
  _s0Especie = null;
  var hp = document.getElementById('hero-tile-perro');
  var hg = document.getElementById('hero-tile-gato');
  var sb = document.getElementById('s0-btn-cta');
  if (hp) hp.classList.remove('sel');
  if (hg) hg.classList.remove('sel');
  if (sb) sb.disabled = true;
  showScreen('s0');
}

function nextStep() {
  var next = curStep + 1;
  // Perros saltan fs4b (paso 5, solo gatos)
  if (curStep === 4 && S.especie === 'perro') next = 6;
  if (next <= 6) showStep(next);
}

function selectInterior(val, el) {
  S.interior = val;
  document.getElementById('yn-si').classList.toggle('sel', val === true);
  document.getElementById('yn-no').classList.toggle('sel', val === false);
  document.getElementById('btn-s4b').disabled = false;
}

/* ── STEP 0 ── */
function selectEspecie(esp) {
  S.especie = esp;
  document.getElementById('tile-perro').classList.toggle('sel', esp === 'perro');
  document.getElementById('tile-gato').classList.toggle('sel', esp === 'gato');
  buildBreeds('');
  checkS1();
}

function checkS1() {
  var nombre = (document.getElementById('inp-nombre').value || '').trim();
  document.getElementById('btn-s1').disabled = !(nombre && S.especie);
}

/* ── STEP 1 ── */
function onNombre() {
  S.nombre = document.getElementById('inp-nombre').value.trim();
  checkS1();
  var n = S.nombre || 'tu mascota';
  document.getElementById('q2').textContent = n.charAt(0).toUpperCase() + n.slice(1) + ', ¿es macho o hembra?';
  document.getElementById('q3').textContent = '¿Cuándo nació ' + n + '?';
  document.getElementById('q4').textContent = '¿Cuál es la raza de ' + n + '?';
}

/* ── STEP 2 ── */
function selectSexo(sexo) {
  S.sexo = sexo;
  S.esterilizada = null; // resetear al cambiar sexo
  document.getElementById('tile-macho').classList.toggle('sel', sexo === 'macho');
  document.getElementById('tile-hembra').classList.toggle('sel', sexo === 'hembra');

  // Mostrar pregunta según sexo
  var wrapHembra = document.getElementById('esteril-wrap');
  var wrapMacho  = document.getElementById('castrado-wrap');
  if (wrapHembra) wrapHembra.style.display = sexo === 'hembra' ? 'block' : 'none';
  if (wrapMacho)  wrapMacho.style.display  = sexo === 'macho'  ? 'block' : 'none';

  // Limpiar selecciones visuales
  ['tile-esteril-si','tile-esteril-no','tile-castrado-si','tile-castrado-no'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.classList.remove('sel');
  });

  // Siempre esperar respuesta (castrado/esterilizada) antes de continuar
  document.getElementById('btn-s2').disabled = true;
}

function selectEsterilizada(valor) {
  S.esterilizada = valor;
  document.getElementById('tile-esteril-si').classList.toggle('sel', valor === true);
  document.getElementById('tile-esteril-no').classList.toggle('sel', valor === false);
  document.getElementById('btn-s2').disabled = false;
}

function selectCastrado(valor) {
  S.esterilizada = valor; // reutilizamos el mismo campo
  document.getElementById('tile-castrado-si').classList.toggle('sel', valor === true);
  document.getElementById('tile-castrado-no').classList.toggle('sel', valor === false);
  document.getElementById('btn-s2').disabled = false;
}

/* ── STEP 3 ── */
function toggleNoFecha() {
  S.noFecha = document.getElementById('chk-nofecha').checked;
  document.getElementById('fecha-exact').classList.toggle('hidden', S.noFecha);
  document.getElementById('fecha-aprox').classList.toggle('hidden', !S.noFecha);
  onFecha();
}

function onFechaSelects() {
  var d = document.getElementById('sel-dia').value;
  var m = document.getElementById('sel-mes').value;
  var y = document.getElementById('sel-anio').value;
  if (d && m && y) {
    document.getElementById('inp-fecha').value = y + '-' + m + '-' + d.padStart(2,'0');
  } else {
    document.getElementById('inp-fecha').value = '';
  }
  onFecha();
}

function onFecha() {
  var ok;
  if (S.noFecha) {
    ok = document.getElementById('sel-mes2').value && document.getElementById('sel-anio2').value;
  } else {
    ok = !!document.getElementById('inp-fecha').value;
  }
  document.getElementById('btn-s3').disabled = !ok;
}

/* ── STEP 4 ── */
function selectRazaTab(t) {
  S.tipoRaza = t;
  document.getElementById('tab-pura').classList.toggle('active', t === 'pura');
  document.getElementById('tab-cruce').classList.toggle('active', t === 'cruce');
  document.getElementById('pura-wrap').classList.toggle('hidden', t !== 'pura');
  document.getElementById('cruce-wrap').classList.toggle('hidden', t !== 'cruce');
  document.getElementById('noraza-wrap').classList.add('hidden');
  S.raza = null; S.raza2 = null; S.peso = null;
  document.getElementById('btn-s4').disabled = true;
  if (t === 'pura') document.getElementById('inp-raza').value = '';
  if (t === 'cruce') buildCruceSelects();
  // desmarcar "no conozco"
  var chk = document.getElementById('chk-noraza');
  if (chk) chk.checked = false;
}

function buildCruceSelects() {
  var breeds = BREEDS[S.especie] || [];
  ['sel-raza1','sel-raza2'].forEach(function(id) {
    var sel = document.getElementById(id);
    var first = sel.options[0];
    sel.innerHTML = '';
    sel.appendChild(first);
    breeds.forEach(function(b) {
      var o = document.createElement('option');
      o.value = b; o.textContent = b;
      sel.appendChild(o);
    });
  });
}

function onCruce() {
  var r1 = document.getElementById('sel-raza1').value;
  var r2 = document.getElementById('sel-raza2').value;
  S.raza  = r1 || null;
  S.raza2 = r2 || null;
  document.getElementById('btn-s4').disabled = !(r1 && r2);
}

function toggleNoRaza() {
  var checked = document.getElementById('chk-noraza').checked;
  document.getElementById('pura-wrap').classList.toggle('hidden', checked);
  document.getElementById('cruce-wrap').classList.toggle('hidden', true);
  document.getElementById('noraza-wrap').classList.toggle('hidden', !checked);
  if (checked) {
    document.getElementById('tab-pura').classList.remove('active');
    document.getElementById('tab-cruce').classList.remove('active');
    S.tipoRaza = 'desconocida';
    S.raza = null; S.raza2 = null; S.peso = null;
    document.getElementById('btn-s4').disabled = true; // espera a que elija peso
    document.querySelectorAll('.wtile').forEach(function(t) { t.classList.remove('sel'); });
  } else {
    selectRazaTab('pura');
  }
}

function selectPeso(p, el) {
  S.peso = p; S.raza = 'Desconocida';
  document.querySelectorAll('.wtile').forEach(function(t) { t.classList.remove('sel'); });
  el.classList.add('sel');
  document.getElementById('btn-s4').disabled = false;
}

function buildBreeds(filter) {
  var breeds = BREEDS[S.especie] || [];
  var f = filter.toLowerCase();
  var list = f ? breeds.filter(function(b) { return b.toLowerCase().indexOf(f) >= 0; }) : breeds;
  var el = document.getElementById('breed-list');
  el.innerHTML = '';
  list.forEach(function(b) {
    var d = document.createElement('div');
    d.className = 'bitem';
    d.textContent = b;
    d.addEventListener('mousedown', function(e) { e.preventDefault(); });
    d.addEventListener('click', function() { selectBreed(b); });
    el.appendChild(d);
  });
  el.classList.add('open');
}

function filterBreeds() { buildBreeds(document.getElementById('inp-raza').value); }
function openBreeds()   { buildBreeds(document.getElementById('inp-raza').value); }
function closeBreeds()  { setTimeout(function() { document.getElementById('breed-list').classList.remove('open'); }, 200); }

function selectBreed(b) {
  S.raza = b;
  document.getElementById('inp-raza').value = b;
  document.getElementById('breed-list').classList.remove('open');
  document.getElementById('btn-s4').disabled = false;
}

/* ── STEP 5: FAMILIA ── */
function petMeta(pet) {
  var parts = [];
  if (pet.sexo) parts.push(pet.sexo.charAt(0).toUpperCase() + pet.sexo.slice(1));
  if (pet.tipoRaza === 'pura' && pet.raza) parts.push(pet.raza);
  if (pet.tipoRaza === 'cruce' && pet.raza) parts.push(pet.raza + ' × ' + (pet.raza2 || ''));
  if (pet.tipoRaza === 'desconocida' && pet.peso) parts.push(pet.peso + ' kg');
  return parts.join(' · ') || '—';
}

function populateMascotaResumen() {
  var wrap = document.getElementById('mascotas-lista');
  if (!wrap) return;
  wrap.innerHTML = '';

  // Mascotas ya guardadas
  pets.forEach(function(pet, i) {
    wrap.appendChild(buildPetCard(pet, i, true));
  });

  // Mascota actual
  var current = Object.assign({}, S);
  wrap.appendChild(buildPetCard(current, -1, false));
}

function buildPetCard(pet, idx, saved) {
  var div = document.createElement('div');
  div.className = 'mascota-resumen';
  div.innerHTML =
    '<div class="mr-avatar">' + (pet.especie === 'gato' ? '🐱' : '🐶') + '</div>' +
    '<div class="mr-info">' +
      '<div class="mr-nombre">' + (pet.nombre || 'Tu mascota') + '</div>' +
      '<div class="mr-meta">' + petMeta(pet) + '</div>' +
    '</div>' +
    '<div class="mr-actions">' +
    (saved
      ? '<button class="mr-edit mr-del" onclick="removePet(' + idx + ')" title="Eliminar">✕</button>'
      : '<button class="mr-edit" onclick="showStep(1)" title="Editar">✏️</button>' +
        '<button class="mr-edit mr-del" onclick="removeCurrentPet()" title="Eliminar">✕</button>') +
    '</div>';
  return div;
}

function removePet(idx) {
  pets.splice(idx, 1);
  if (pets.length === 0 && !S.especie) {
    // No quedan mascotas en absoluto → reiniciar
    _resetSUI();
    showStep(1);
    return;
  }
  populateMascotaResumen();
}

function removeCurrentPet() {
  if (pets.length > 0) {
    // Restaurar la última guardada como actual
    var last = pets.pop();
    Object.assign(S, last);
    populateMascotaResumen();
  } else {
    // Era la única mascota → reiniciar desde el principio
    _resetSUI();
    showStep(1);
  }
}

function _resetSUI() {
  S.especie = null; S.nombre = ''; S.sexo = null;
  S.noFecha = false; S.tipoRaza = 'pura'; S.raza = null; S.raza2 = null; S.peso = null;
  S.interior = null; S.plan = null; S.rcAddon = false;
  pets = [];
  _checkoutPets = [];
  completedMascotas = [];
  var el = document.getElementById('inp-nombre');
  if (el) el.value = '';
  document.getElementById('tile-perro').classList.remove('sel');
  document.getElementById('tile-gato').classList.remove('sel');
  document.getElementById('btn-s1').disabled = true;
}

function addOtraMascota() {
  // Guardar mascota actual
  pets.push(Object.assign({}, S));
  // Resetear estado
  S.especie = null; S.nombre = ''; S.sexo = null;
  S.noFecha = false; S.tipoRaza = 'pura'; S.raza = null; S.raza2 = null; S.peso = null;
  // Limpiar campos
  document.getElementById('inp-nombre').value = '';
  document.getElementById('tile-perro').classList.remove('sel');
  document.getElementById('tile-gato').classList.remove('sel');
  document.getElementById('btn-s1').disabled = true;
  document.getElementById('btn-s2').disabled = true;
  showStep(1);
}

/* ── STEP 6: CONTACTO ── */
function onContacto() {
  S.email = document.getElementById('inp-email').value.trim();
  var ok = validEmail(S.email)
         && document.getElementById('chk-l1').checked
         && document.getElementById('chk-l3').checked;
  document.getElementById('btn-s6').disabled = !ok;
}

function togglePromo() {
  var b = document.getElementById('promo-body');
  var a = document.getElementById('promo-arrow');
  var open = b.style.display === 'block';
  b.style.display = open ? 'none' : 'block';
  a.style.transform = open ? '' : 'rotate(180deg)';
}

/* ── PANTALLA DATOS (oferta) ── */
function prepararOferta() {
  // Si ya tenemos email y tel del ciclo anterior, saltar directo a resultados
  if (S.email && validEmail(S.email) && S.tel && S.tel.length >= 9) {
    showResults();
    return;
  }
  showScreen('s-loading');
  window.scrollTo(0, 0);
  // Pre-rellenar si los tenemos de otra mascota anterior
  var ofE = document.getElementById('of-email');
  var ofT = document.getElementById('of-tel');
  if (ofE && S.email) ofE.value = S.email;
  if (ofT && S.tel)   ofT.value = S.tel;
  checkOferta();
}

function validarDNI(dni) {
  if (!dni) return false;
  dni = dni.trim().toUpperCase();
  // NIE: X, Y, Z + 7 digits + letter
  if (/^[XYZ]\d{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(dni)) {
    var nie = dni.replace(/^X/, '0').replace(/^Y/, '1').replace(/^Z/, '2');
    var num = parseInt(nie.slice(0, 8), 10);
    var letra = 'TRWAGMYFPDXBNJZSQVHLCKE'[num % 23];
    return dni.slice(-1) === letra;
  }
  // DNI: 8 digits + letter
  if (/^\d{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/.test(dni)) {
    var num2 = parseInt(dni.slice(0, 8), 10);
    var letra2 = 'TRWAGMYFPDXBNJZSQVHLCKE'[num2 % 23];
    return dni.slice(-1) === letra2;
  }
  return false;
}

function validEmail(email) {
  if (!/^[^\s@]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) return false;
  var lower = email.toLowerCase();
  var parts = lower.split('@');
  if (parts.length !== 2) return false;
  var domainParts = parts[1].split('.');
  var tld = domainParts[domainParts.length - 1];
  var sld = domainParts[domainParts.length - 2] || '';
  // Bloquear TLDs falsos/inexistentes
  var fakeTlds = ['try','test','fake','example','invalid','local','localhost',
    'demo','temp','xxx','mail','web','site','tor','onion','null','none',
    'nope','void','spam','trash','nomail','error','foo','bar','baz','asdf',
    'qwerty','foobar','noname','here','sample','placeholder','domain','host'];
  if (fakeTlds.indexOf(tld) !== -1) return false;
  // Proveedores conocidos solo aceptan sus TLDs reales
  var knownProviders = {
    gmail: ['com'], hotmail: ['com','es'], yahoo: ['com','es','fr','co.uk'],
    outlook: ['com','es'], icloud: ['com'], live: ['com','es'],
    protonmail: ['com'], proton: ['me'], yopmail: ['com']
  };
  if (knownProviders[sld] && knownProviders[sld].indexOf(tld) === -1) return false;
  return true;
}

function checkOferta() {
  var email = (document.getElementById('of-email').value || '').trim();
  var tel   = (document.getElementById('of-tel').value   || '').trim();
  var chk   = document.getElementById('chk-privacidad').checked;
  var ok = validEmail(email) && tel.length >= 9 && chk;
  document.getElementById('of-continuar').disabled = !ok;
}

function aplicarCodigo() {
  var codigo = (document.getElementById('of-codigo').value || '').trim().toUpperCase();
  if (codigo === 'KIVO10') {
    alert('¡Código aplicado! 10% de descuento.');
  } else if (codigo) {
    alert('Código no válido.');
  }
}

function mostrarResultados() {
  S.email = (document.getElementById('of-email').value || '').trim();
  S.tel   = (document.getElementById('of-tel').value   || '').trim();
  showResults();
}

/* ── RESULTS ── */
function showResults() {
  _activePetIdx = -1; // siempre empezar en la mascota nueva
  _newPetDraft  = null;
  _enfSeleccionadas = [];
  showScreen('s6');
  updatePrices();
  _renderMascotasChips();
  _updateS6Total();
  var meta = '';
  if (S.tipoRaza === 'desconocida') {
    meta = 'Mestizo/Desconocida' + (S.peso ? ' · ' + S.peso + ' kg' : '');
  } else if (S.tipoRaza === 'cruce') {
    meta = (S.raza || '') + (S.raza2 ? ' × ' + S.raza2 : '');
  } else {
    meta = S.raza || '';
  }
  if (S.sexo) meta += (meta ? ' · ' : '') + S.sexo.charAt(0).toUpperCase() + S.sexo.slice(1);
  document.getElementById('res-name').textContent  = S.nombre || 'Tu mascota';
  document.getElementById('res-meta').textContent  = [S.especie, meta].filter(Boolean).join(' · ');
  document.getElementById('res-title').textContent = 'Planes para ' + (S.nombre || 'tu mascota');
  document.getElementById('mascota-icon').innerHTML = '<img src="assets/icons/' + (S.especie === 'gato' ? 'gato' : 'perro') + '.svg" width="48" height="48" alt="">';
  updatePrices();
  _renderMascotasChips();
  _updateS6Total();
  _updateAddBtn();
}

function setPeriod(p) {
  S.periodo = p;
  document.getElementById('pbtn-mes').classList.toggle('active', p === 'mensual');
  document.getElementById('pbtn-ano').classList.toggle('active', p === 'anual');
  updatePrices();
  _renderMascotasChips();
  _updateS6Total();
}

function updatePrices() {
  var p = S.periodo;
  var plans = [['CARE','care'],['CARE+','careplus'],['PREMIUM','premium']];
  plans.forEach(function(pair) {
    var plan = pair[0], id = pair[1];
    var base = calcBase(plan);
    var mesBase = base;
    if (p === 'anual') {
      document.getElementById('p-'  + id).textContent = fmt(mesBase * 12 * (1 - DESC_ANUAL));
      document.getElementById('pp-' + id).textContent = '/año';
      document.getElementById('pa-' + id).textContent = '(' + fmt(mesBase * (1 - DESC_ANUAL)) + '/mes)';
    } else {
      document.getElementById('p-'  + id).textContent = fmt(mesBase);
      document.getElementById('pp-' + id).textContent = '/mes';
      document.getElementById('pa-' + id).textContent = 'o ' + fmt(mesBase * 12 * (1 - DESC_ANUAL)) + '/año';
    }
  });
  var rcb = RC_SUELTA[S.especie] || 14.90;
  if (p === 'anual') {
    document.getElementById('p-rc').textContent  = fmt(rcb * 12 * (1 - DESC_ANUAL));
    document.getElementById('pp-rc').textContent = '/año';
  } else {
    document.getElementById('p-rc').textContent  = fmt(rcb);
    document.getElementById('pp-rc').textContent = '/mes';
  }
  // RC add-on price strip
  var addonVal = document.getElementById('rc-addon-price-val');
  var addonPer = document.getElementById('rc-addon-price-per');
  if (addonVal) {
    if (p === 'anual') {
      addonVal.textContent = '+' + fmt(rcb * 12 * (1 - DESC_ANUAL));
      if (addonPer) addonPer.textContent = '/año';
    } else {
      addonVal.textContent = '+' + fmt(rcb);
      if (addonPer) addonPer.textContent = '/mes';
    }
  }
}

function togglePlansDetail() {
  var el  = document.getElementById('plans-detail');
  var lbl = document.getElementById('lbl-plans-detail');
  var arr = document.getElementById('arr-plans-detail');
  var open = el.classList.toggle('open');
  lbl.textContent = open ? 'Ocultar información' : 'Desplegar más información';
  if (arr) arr.style.transform = open ? 'rotate(180deg)' : '';
}

function toggleMore(id) {
  var el  = document.getElementById('more-' + id);
  var lbl = document.getElementById('lbl-'  + id);
  var arr = document.getElementById('arr-'  + id);
  var open = el.classList.toggle('open');
  lbl.textContent = open ? 'Ocultar información' : 'Desplegar más información';
  arr.style.transform = open ? 'rotate(180deg)' : '';
}

var _enfSeleccionadas = [];

function selectSalud(v) {
  _saludRespondida = true;
  document.getElementById('sbtn-si').classList.toggle('active', v === 'si');
  document.getElementById('sbtn-no').classList.toggle('active', v === 'no');
  _updateContratar(); // re-evalúa btn-contratar-main
  _updateAddBtn();   // re-evalúa btn-agregar
  if (v === 'si') {
    document.getElementById('enf-dropdown').style.display = 'block';
  } else {
    // Resetear todo
    _enfSeleccionadas = [];
    document.getElementById('enf-dropdown').style.display = 'none';
    document.getElementById('enf-tags-wrap').style.display = 'none';
    document.querySelectorAll('#enf-chips-list .echip').forEach(function(c) { c.classList.remove('sel'); });
    document.getElementById('otras-input-wrap').style.display = 'none';
    document.getElementById('otras-enf-input').value = '';
    _renderEnfTags();
  }
}

function toggleEnf(el) {
  el.classList.toggle('sel');
}

function toggleOtras(el) {
  el.classList.toggle('sel');
  var wrap = document.getElementById('otras-input-wrap');
  wrap.style.display = el.classList.contains('sel') ? 'block' : 'none';
  if (!el.classList.contains('sel')) {
    document.getElementById('otras-enf-input').value = '';
  }
}

function confirmarEnf() {
  _enfSeleccionadas = [];
  document.querySelectorAll('#enf-chips-list .echip.sel').forEach(function(chip) {
    if (chip.classList.contains('echip-otras')) {
      var txt = (document.getElementById('otras-enf-input').value || '').trim();
      if (txt) _enfSeleccionadas.push(txt);
    } else {
      _enfSeleccionadas.push(chip.textContent.trim());
    }
  });
  _renderEnfTags();
  document.getElementById('enf-dropdown').style.display = 'none';
  document.getElementById('enf-tags-wrap').style.display = _enfSeleccionadas.length > 0 ? 'block' : 'none';
}

function _renderEnfTags() {
  var container = document.getElementById('enf-tags');
  if (!container) return;
  container.innerHTML = '';
  _enfSeleccionadas.forEach(function(name) {
    var tag = document.createElement('div');
    tag.className = 'enf-tag';
    var safe = name.replace(/'/g, '\\\'');
    tag.innerHTML = '<span>' + name + '</span><button onclick="quitarEnf(\'' + safe + '\')" title="Quitar">×</button>';
    container.appendChild(tag);
  });
}

function _restoreEnfUI() {
  // Restaura la UI de declaracion de salud segun _enfSeleccionadas actual
  _renderEnfTags();
  var hasEnf = _enfSeleccionadas.length > 0;
  var wrapEl = document.getElementById('enf-tags-wrap');
  if (wrapEl) wrapEl.style.display = hasEnf ? 'block' : 'none';
  // Sincronizar chips visuales
  document.querySelectorAll('#enf-chips-list .echip').forEach(function(chip) {
    var name = chip.textContent.trim();
    chip.classList.toggle('sel', _enfSeleccionadas.indexOf(name) !== -1);
  });
  // Botones si/no
  var btnSi = document.getElementById('sbtn-si');
  var btnNo = document.getElementById('sbtn-no');
  if (btnSi) btnSi.classList.toggle('active', hasEnf);
  if (btnNo) btnNo.classList.toggle('active', !hasEnf);
  // Dropdown oculto al restaurar
  var dd = document.getElementById('enf-dropdown');
  if (dd) dd.style.display = 'none';
}

function quitarEnf(name) {
  _enfSeleccionadas = _enfSeleccionadas.filter(function(e) { return e !== name; });
  // Deseleccionar el chip correspondiente
  document.querySelectorAll('#enf-chips-list .echip').forEach(function(chip) {
    if (chip.textContent.trim() === name) chip.classList.remove('sel');
  });
  _renderEnfTags();
  document.getElementById('enf-tags-wrap').style.display = _enfSeleccionadas.length > 0 ? 'block' : 'none';
}

function abrirDropdownEnf() {
  document.getElementById('enf-dropdown').style.display = 'block';
}

/* ── CONTRATAR ── */
/* ── LETRA PEQUEÑA ── */
var _letraLeidos = {};
var _letraItems  = ['microchip','cartilla','carencia','preexistentes'];

function toggleLetra(id) { /* headers ya no son clicables */ }

function mostrarLetra() {
  _letraLeidos = {};
  _letraItems.forEach(function(id) {
    var btn = document.getElementById('lb-' + id);
    if (btn) { btn.style.background=''; btn.style.color=''; btn.style.borderColor=''; btn.style.cursor=''; btn.textContent='He leído y entiendo.'; }
    var chk = document.getElementById('lc-' + id);
    if (chk) { chk.style.background=''; chk.style.color=''; chk.style.borderColor=''; }
    var item = document.getElementById('li-' + id);
    if (item) item.classList.remove('li-done');
  });
  document.getElementById('letra-continuar').disabled = true;
  showScreen('s-letra');
}

function marcarLeido(id) {
  _letraLeidos[id] = true;
  // Barra se pone verde
  var btn = document.getElementById('lb-' + id);
  if (btn) {
    btn.style.background = 'var(--teal)';
    btn.style.color = '#fff';
    btn.style.borderColor = 'var(--teal)';
    btn.style.cursor = 'default';
    btn.textContent = '✓ He leído y entiendo';
  }
  // Checkmark arriba a la derecha se activa
  var chk = document.getElementById('lc-' + id);
  if (chk) {
    chk.style.background = 'var(--teal)';
    chk.style.color = '#fff';
    chk.style.borderColor = 'var(--teal)';
  }
  var item = document.getElementById('li-' + id);
  if (item) item.classList.add('li-done');
  // Habilitar Continuar solo si los 4 están marcados
  var all = _letraItems.every(function(k) { return _letraLeidos[k]; });
  document.getElementById('letra-continuar').disabled = !all;
}

function continuarContratar() {
  try {
  var names    = { care:'KIVO CARE', careplus:'KIVO CARE+', premium:'KIVO PREMIUM', rc:'KIVO R.C.' };
  var planKeys = { care:'CARE', careplus:'CARE+', premium:'PREMIUM' };
  var p        = S.periodo;

  // Si estamos viendo una mascota confirmada, restaurar la nueva mascota al S
  // para que calcBase() use los datos correctos (especie, edad) de la nueva mascota
  if (_activePetIdx >= 0 && _newPetDraft) {
    S.especie = _newPetDraft.especie;
    S.nombre  = _newPetDraft.nombre;
    S.plan    = _newPetDraft.plan;
    S.rcAddon = _newPetDraft.rcAddon;
    S.noFecha = _newPetDraft.noFecha;
    var inpF  = document.getElementById('inp-fecha');
    if (inpF) inpF.value = _newPetDraft._fecha || '';
    _activePetIdx = -1;
  }

  // Construir array completo: confirmadas + nueva en curso (si tiene plan)
  var allPets = completedMascotas.map(function(pet) {
    return {
      nombre: pet.nombre, especie: pet.especie,
      plan: pet.plan, planLabel: pet.planLabel, rcAddon: pet.rcAddon,
      precio: (p==='anual') ? pet.precioMes*12*(1-DESC_ANUAL) : pet.precioMes,
      precioMes: pet.precioMes, precioAno: pet.precioMes*12*(1-DESC_ANUAL),
      periodo: p, _email: pet._email||S.email, _tel: pet._tel||S.tel
    };
  });

  // Añadir mascota nueva si tiene plan
  if (S.plan || S.rcAddon) {
    var plan = S.plan, rcAddon = S.rcAddon;
    var rcBase = RC_SUELTA[S.especie] || 14.90;
    var precioMes = 0, planLabel = '';
    if (plan && plan !== 'rc') {
      var base = calcBase(planKeys[plan]);
      precioMes = base + (rcAddon ? RC_ADDON : 0);
      planLabel = names[plan] + (rcAddon ? ' + R.C.' : '');
    } else {
      plan = 'rc'; precioMes = rcBase; planLabel = names['rc'];
    }
    var precioFinal = (p==='anual') ? precioMes*12*(1-DESC_ANUAL) : precioMes;
    allPets.push({
      nombre: S.nombre||'Tu mascota', especie: S.especie,
      plan: plan, planLabel: planLabel, rcAddon: rcAddon,
      precio: precioFinal, precioMes: precioMes,
      precioAno: precioMes*12*(1-DESC_ANUAL),
      periodo: p, _email: S.email, _tel: S.tel
    });
  }

  if (allPets.length === 0) { _activePetIdx = -1; showScreen('s6'); return; }

  _irAlCheckout(allPets);
  } catch(e) {
    console.error('continuarContratar error:', e);
    alert('Error al procesar: ' + e.message);
  }
}

function _applyPlanVisual(planId, active) {
  var sel  = document.getElementById('ps-' + planId);
  var rad  = document.getElementById('pr-' + planId);
  var chk  = document.getElementById('pc-' + planId);
  var card = sel ? sel.closest('.pcard') : null;
  var col  = _planColors[planId];
  if (active) {
    if (sel)  sel.classList.add('sel');
    if (rad)  rad.classList.add('ps-checked');
    if (chk)  chk.classList.add('pc-checked');
    if (card) { card.style.borderColor = col; card.style.boxShadow = '0 0 0 4px ' + col + '30, 0 12px 40px rgba(27,42,74,0.15)'; }
  } else {
    if (sel)  sel.classList.remove('sel');
    if (rad)  rad.classList.remove('ps-checked');
    if (chk)  chk.classList.remove('pc-checked');
    if (card) { card.style.borderColor = ''; card.style.boxShadow = ''; }
  }
}

function seleccionarPlan(id) {
  if (id === 'rc') {
    S.rcAddon = !S.rcAddon;
    _applyPlanVisual('rc', S.rcAddon);
  } else {
    if (S.plan === id) {
      S.plan = null;
      _applyPlanVisual(id, false);
    } else {
      if (S.plan) _applyPlanVisual(S.plan, false);
      S.plan = id;
      _applyPlanVisual(id, true);
    }
  }

  // Si estamos viendo una mascota confirmada, sincronizar cambios de vuelta
  if (_activePetIdx >= 0 && _activePetIdx < completedMascotas.length) {
    var pet      = completedMascotas[_activePetIdx];
    var _names   = { care:'KIVO CARE', careplus:'KIVO CARE+', premium:'KIVO PREMIUM', rc:'KIVO R.C.' };
    var _planKeys= { care:'CARE', careplus:'CARE+', premium:'PREMIUM' };
    pet.plan    = S.plan;
    pet.rcAddon = S.rcAddon;
    var _rcBase = RC_SUELTA[S.especie] || 14.90;
    if (S.plan && S.plan !== 'rc') {
      var _base = calcBase(_planKeys[S.plan]);
      pet.precioMes = _base + (S.rcAddon ? RC_ADDON : 0);
      pet.planLabel = _names[S.plan] + (S.rcAddon ? ' + R.C.' : '');
    } else {
      pet.precioMes = _rcBase;
      pet.planLabel = _names['rc'];
    }
    pet.precioAno = pet.precioMes * 12 * (1 - DESC_ANUAL);
  }

  _updateContratar();
  updatePrices();
  _renderMascotasChips();
  _updateS6Total();
  _updateAddBtn();
}

function toggleRCAddon() {
  // El add-on solo aplica a un plan, no a RC Suelta
  if (S.plan === 'rc') return;
  S.rcAddon = !S.rcAddon;
  var btn = document.getElementById('btn-rc-addon');
  var lbl = document.getElementById('rc-addon-label');
  if (btn) btn.classList.toggle('rc-addon-active', S.rcAddon);
  if (lbl) lbl.textContent = S.rcAddon ? '✓ Añadido' : 'Añadir';
  updatePrices();
  _renderMascotasChips();
  _updateS6Total();
  _updateAddBtn();
}

function _updateRCAddonBar() {
  var bar = document.getElementById('rc-addon-bar');
  if (!bar) return;
  // El add-on solo tiene sentido si hay un plan de salud seleccionado (no RC Suelta)
  var planActivo = S.plan && S.plan !== 'rc';
  bar.classList.toggle('rc-addon-disabled', !planActivo);
  var btn = document.getElementById('btn-rc-addon');
  if (btn) btn.disabled = !planActivo;
  // Si el plan se deselecciona, quitar el add-on
  if (!planActivo && S.rcAddon) {
    S.rcAddon = false;
    if (btn) btn.classList.remove('rc-addon-active');
    var lbl = document.getElementById('rc-addon-label');
    if (lbl) lbl.textContent = 'Añadir';
  }
  updatePrices();
}

function contratar(plan) {
  _procesarContratar();
}

function _procesarContratar() {
  // plan viene de S.plan; RC de S.rcAddon
  var plan = S.plan;
  var names    = { care:'KIVO CARE', careplus:'KIVO CARE+', premium:'KIVO PREMIUM', rc:'KIVO R.C.' };
  var planKeys = { care:'CARE', careplus:'CARE+', premium:'PREMIUM' };
  var p      = S.periodo;
  var rcBase = RC_SUELTA[S.especie] || 14.90;

  var price = 0;
  var planLabel = '';

  if (plan && plan !== 'rc') {
    // Plan de salud (con o sin RC add-on)
    var base = calcBase(planKeys[plan]);
    price = (p === 'anual') ? base * 12 * (1 - DESC_ANUAL) : base;
    if (S.rcAddon) {
      // RC como add-on sobre plan de salud → precio add-on (menor)
      var addonPrice = (typeof RC_ADDON !== 'undefined') ? RC_ADDON : 8.90;
      price += (p === 'anual') ? addonPrice * 12 * (1 - DESC_ANUAL) : addonPrice;
      planLabel = names[plan] + ' + R.C.';
    } else {
      planLabel = names[plan];
    }
  } else if (S.rcAddon) {
    // Solo RC Suelta (sin plan de salud)
    plan = 'rc';
    price = (p === 'anual') ? rcBase * 12 * (1 - DESC_ANUAL) : rcBase;
    planLabel = names['rc'];
  } else {
    return; // nada seleccionado
  }

  var suffix = (p === 'anual') ? '/año' : '/mes';

  var logoEl = document.getElementById('ref-logo-' + plan);
  if (logoEl) document.getElementById('c4-logo').src = logoEl.src;
  document.getElementById('c4-pname').textContent   = planLabel;
  document.getElementById('c4-mascota').textContent = S.nombre || 'Tu mascota';
  document.getElementById('c4-total').textContent   = fmt(price) + suffix;
  var c4IpidEl = document.getElementById('c4-ipid');
  if (c4IpidEl) c4IpidEl.textContent = 'IPID — ' + names[plan];
  var c4PlanInfoEl2 = document.getElementById('c4-plan-info');
  if (c4PlanInfoEl2) c4PlanInfoEl2.textContent = planLabel + ' · ' + (S.nombre || 'Tu mascota') + ' · ' + fmt(price) + suffix;
  // Pre-fill email y tel como readonly (ya dados en la oferta)
  var emailEl = document.getElementById('c2-email');
  var telEl   = document.getElementById('c2-tel');
  if (emailEl) { emailEl.value = S.email || ''; emailEl.setAttribute('readonly','readonly'); emailEl.classList.add('input-readonly'); }
  if (telEl)   { telEl.value   = S.tel   || ''; telEl.setAttribute('readonly','readonly');   telEl.classList.add('input-readonly'); }

  showScreen('sc2');
  _silentCheckC2();
}

function _silentCheckC2() {
  // Solo activa o desactiva el botón — no muestra mensajes de error
  var nombre    = (document.getElementById('c2-nombre').value || '').trim();
  var apellidos = (document.getElementById('c2-apellidos').value || '').trim();
  var fnac      = document.getElementById('c2-fnac').value;
  var dni       = (document.getElementById('c2-dni').value || '').trim().toUpperCase();
  var email     = (document.getElementById('c2-email').value || '').trim();
  var consentOk = true;
  var consentEl2 = document.getElementById('consent-privacidad');
  if(consentEl2) consentOk = consentEl2.checked;
  var ok = nombre && apellidos && fnac && validarDNI(dni)
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && consentOk;
  document.getElementById('btn-c2').disabled = !ok;
}

/* ── C1 ── */
function checkC1() {
  var ok = document.getElementById('c1-l1').checked
         && document.getElementById('c1-l3').checked
         && document.getElementById('c1-l4').checked;
  document.getElementById('btn-c1').disabled = !ok;
}

/* ── UTILIDAD VALIDACIÓN ── */
function setField(inputId, msgId, state, msg) {
  var el  = document.getElementById(inputId);
  var msg2 = msgId ? document.getElementById(msgId) : null;
  if (!el) return;
  el.classList.remove('field-ok', 'field-err');
  if (state === 'ok')  el.classList.add('field-ok');
  if (state === 'err') el.classList.add('field-err');
  if (msg2) {
    msg2.textContent = msg || '';
    msg2.className = 'field-msg' + (state === 'ok' ? ' ok' : state === 'err' ? ' err' : '');
  }
}

/* ── C2: DATOS PERSONALES ── */
function validateC2() {
  var allOk = true;

  // Nombre
  var nombre = (document.getElementById('c2-nombre').value || '').trim();
  if (!nombre) { setField('c2-nombre', 'msg-nombre', 'err', 'Obligatorio'); allOk = false; }
  else setField('c2-nombre', 'msg-nombre', 'ok', '');

  // Apellidos
  var apellidos = (document.getElementById('c2-apellidos').value || '').trim();
  if (!apellidos) { setField('c2-apellidos', 'msg-apellidos', 'err', 'Obligatorio'); allOk = false; }
  else setField('c2-apellidos', 'msg-apellidos', 'ok', '');

  // Fecha nacimiento
  var fnac = document.getElementById('c2-fnac').value;
  if (!fnac) { setField('c2-fnac', 'msg-fnac', 'err', 'Obligatorio'); allOk = false; }
  else setField('c2-fnac', 'msg-fnac', 'ok', '');

  // DNI/NIE
  var dni = (document.getElementById('c2-dni').value || '').trim().toUpperCase();
  document.getElementById('c2-dni').value = dni;
  if (!dni) {
    setField('c2-dni', 'msg-dni', 'err', 'Obligatorio');
    allOk = false;
  } else if (!validarDNI(dni)) {
    setField('c2-dni', 'msg-dni', 'err', 'DNI/NIE no válido');
    allOk = false;
  } else {
    setField('c2-dni', 'msg-dni', 'ok', '✓ Correcto');
  }

  // Email (readonly, pre-rellenado desde oferta — solo comprobamos que existe)
  var emailEl2 = document.getElementById('c2-email');
  var email = (emailEl2 ? emailEl2.value : '').trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (!emailEl2 || !emailEl2.hasAttribute('readonly')) {
      setField('c2-email', 'msg-c2email', 'err', email ? 'Email no válido' : 'Obligatorio');
      allOk = false;
    }
  } else {
    setField('c2-email', 'msg-c2email', 'ok', '');
  }

  // Teléfono (opcional — solo validar formato si hay algo)
  var tel = (document.getElementById('c2-tel').value || '').trim();
  if (tel && !/^[+\d\s\-()]{7,15}$/.test(tel)) {
    setField('c2-tel', 'msg-c2tel', 'err', 'Teléfono no válido');
    allOk = false;
  } else {
    setField('c2-tel', 'msg-c2tel', tel ? 'ok' : 'neutral', '');
  }

  // Consentimiento obligatorio privacidad
  var consentEl = document.getElementById('consent-privacidad');
  if (consentEl && !consentEl.checked) { allOk = false; }

  document.getElementById('btn-c2').disabled = !allOk;
}

/* ── C3 DIRECCIÓN ── */
var PROV = {
  '01':'Álava / Araba','02':'Albacete','03':'Alicante','04':'Almería','05':'Ávila',
  '06':'Badajoz','07':'Illes Balears','08':'Barcelona','09':'Burgos','10':'Cáceres',
  '11':'Cádiz','12':'Castellón','13':'Ciudad Real','14':'Córdoba','15':'A Coruña',
  '16':'Cuenca','17':'Girona','18':'Granada','19':'Guadalajara','20':'Gipuzkoa',
  '21':'Huelva','22':'Huesca','23':'Jaén','24':'León','25':'Lleida','26':'La Rioja',
  '27':'Lugo','28':'Madrid','29':'Málaga','30':'Murcia','31':'Navarra','32':'Ourense',
  '33':'Asturias','34':'Palencia','35':'Las Palmas','36':'Pontevedra','37':'Salamanca',
  '38':'Santa Cruz de Tenerife','39':'Cantabria','40':'Segovia','41':'Sevilla',
  '42':'Soria','43':'Tarragona','44':'Teruel','45':'Toledo','46':'Valencia',
  '47':'Valladolid','48':'Bizkaia','49':'Zamora','50':'Zaragoza','51':'Ceuta','52':'Melilla'
};

function onCPInput(el) {
  var cp = el.value.replace(/\D/g, '');
  el.value = cp;
  var ciudadEl = document.getElementById('inp-ciudad');
  var provEl   = document.getElementById('inp-provincia');
  if (cp.length !== 5) {
    setField('inp-cp', 'msg-cp', 'neutral', '');
    ciudadEl.value = '';
    if (provEl) provEl.value = '';
    setField('inp-ciudad', 'msg-ciudad', 'neutral', '');
    validateC3();
    return;
  }
  var found = (typeof CP_DATA !== 'undefined') ? CP_DATA[cp] : null;
  if (!found) {
    setField('inp-cp', 'msg-cp', 'ok', '');
    ciudadEl.readOnly = false;
    ciudadEl.classList.remove('input-readonly');
    ciudadEl.placeholder = 'Escribe tu municipio';
    if (provEl) {
      provEl.readOnly = false;
      provEl.classList.remove('input-readonly');
      provEl.placeholder = 'Escribe tu provincia';
    }
    setField('inp-ciudad', 'msg-ciudad', 'neutral', '');
  } else {
    setField('inp-cp', 'msg-cp', 'ok', '');
    ciudadEl.readOnly = true;
    ciudadEl.classList.add('input-readonly');
    ciudadEl.placeholder = 'Auto-rellenado';
    ciudadEl.value = found.m;
    setField('inp-ciudad', 'msg-ciudad', 'ok', '');
    if (provEl) {
      provEl.readOnly = true;
      provEl.classList.add('input-readonly');
      provEl.placeholder = 'Auto-rellenado';
      provEl.value = found.p;
      setField('inp-provincia', 'msg-provincia', 'ok', '');
    }
  }
  validateC3();
}

function validateC3() {
  var allOk = true;
  var cp     = (document.getElementById('inp-cp').value     || '').trim();
  var ciudad = (document.getElementById('inp-ciudad').value || '').trim();
  var via    = (document.getElementById('inp-via').value    || '').trim();
  var num    = (document.getElementById('inp-num').value    || '').trim();
  var tipo   = document.getElementById('sel-tipoavia').value;

  // CP — cualquier código de 5 dígitos es válido; el municipio puede rellenarse manualmente
  if (cp.length !== 5) {
    if (cp) setField('inp-cp', 'msg-cp', 'err', 'Introduce 5 dígitos');
    allOk = false;
  } else { setField('inp-cp', 'msg-cp', 'ok', ''); }

  // Municipio (auto-rellenado por CP)
  if (!ciudad) { allOk = false; }
  else { setField('inp-ciudad', 'msg-ciudad', 'ok', ''); }

  // Tipo de vía
  if (!tipo) { allOk = false; }
  else { setField('sel-tipoavia', 'msg-tipovia', 'ok', ''); }

  // Nombre vía
  if (!via) { allOk = false; }
  else { setField('inp-via', 'msg-via', 'ok', ''); }

  // Número
  if (!num) { allOk = false; }
  else { setField('inp-num', 'msg-num', 'ok', ''); }

  document.getElementById('btn-c3').disabled = !allOk;
  return allOk;
}

function onViaInput(el) {
  var v = el.value.trim();
  if (!v) setField('inp-via', 'msg-via', 'err', 'Obligatorio');
  else setField('inp-via', 'msg-via', 'ok', '');
  validateC3();
}

function onNumInput(el) {
  var v = el.value.trim();
  if (!v) setField('inp-num', 'msg-num', 'err', 'Obligatorio');
  else setField('inp-num', 'msg-num', 'ok', '');
  validateC3();
}

function showAddrConfirm() {
  var tipoVia = document.getElementById('sel-tipoavia').value || '';
  var via     = document.getElementById('inp-via').value     || '';
  var num     = document.getElementById('inp-num').value     || '';
  var piso    = document.getElementById('inp-piso').value    || '';
  var cp      = document.getElementById('inp-cp').value      || '';
  var ciudad    = document.getElementById('inp-ciudad').value   || '';
  var provincia = (document.getElementById('inp-provincia') ? document.getElementById('inp-provincia').value : '') || '';
  var addr    = [tipoVia, via, num, piso].filter(Boolean).join(' ');
  if (cp || ciudad) addr += (addr ? ', ' : '') + [cp, ciudad].filter(Boolean).join(' ');
  if (provincia) addr += ' (' + provincia + ')';
  document.getElementById('addr-formatted').textContent = addr || '—';
  document.getElementById('addr-confirm').classList.add('open');
  // Cambiar botón a estado confirmado
  var btnC3 = document.getElementById('btn-c3');
  if(btnC3){
    btnC3.style.background = '#3DBFA0';
    btnC3.innerHTML = '✓ Dirección confirmada &nbsp;·&nbsp; Continuar <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    btnC3.onclick = function(){ goToC4(); };
  }
}


/* ── PAGO: TABS TARJETA / IBAN ── */
function setPayTab(tab, el) {
  document.querySelectorAll('.pay-tab').forEach(function(b){ b.classList.remove('active'); });
  if (el) el.classList.add('active');
  var cardDiv = document.getElementById('pay-card');
  var ibanDiv = document.getElementById('pay-iban');
  if (cardDiv) cardDiv.style.display = (tab === 'card') ? '' : 'none';
  if (ibanDiv) ibanDiv.style.display = (tab === 'iban') ? '' : 'none';
}

function formatIBAN(el) {
  var v = el.value.replace(/[^A-Z0-9a-z]/g,'').toUpperCase();
  var formatted = v.match(/.{1,4}/g);
  el.value = formatted ? formatted.join(' ') : v;
}

/* ── PAGO: CHECK CONDICIONES ── */
function checkC4() {
  var ok = document.getElementById('c4-l1') && document.getElementById('c4-l1').checked
        && document.getElementById('c4-l3') && document.getElementById('c4-l3').checked
        && document.getElementById('c4-l4') && document.getElementById('c4-l4').checked
        && checkC4Chip();
  var btn4 = document.getElementById('btn-c4');
  if (btn4) btn4.disabled = !ok;
}

function goToC4() {
  populateC4();
  // Reset casillas legales y botones
  ['c4-l1','c4-l2','c4-l3','c4-l4'].forEach(function(id){ var el=document.getElementById(id); if(el) el.checked=false; });
  var btnC4 = document.getElementById('btn-c4'); if(btnC4) btnC4.disabled = true;
  var btnPagar = document.getElementById('btn-pagar'); if(btnPagar) btnPagar.disabled = true;
  document.getElementById('addr-confirm').classList.remove('open');
  // Reset botón de dirección
  var btnC3 = document.getElementById('btn-c3');
  if(btnC3){ btnC3.textContent = 'Comprobar dirección '; btnC3.style.background=''; btnC3.onclick=function(){ showAddrConfirm(); }; }
  showScreen('sc4');
}
function goToSC1() {
  var c1chks = ['c1-l1','c1-l3','c1-l4'];
  c1chks.forEach(function(id){ var el=document.getElementById(id); if(el) el.checked=false; });
  document.getElementById('btn-c1').disabled = true;
  document.getElementById('addr-confirm').classList.remove('open');
  showScreen('sc1');
}

function populateC4() {
  var nombre   = (document.getElementById('c2-nombre').value   || '').trim();
  var apellidos= (document.getElementById('c2-apellidos').value|| '').trim();
  var dni      = (document.getElementById('c2-dni').value      || '').trim();
  var fnac     = (document.getElementById('c2-fnac').value     || '');
  var email    = (document.getElementById('c2-email').value    || S.email || '').trim();
  var tel      = (document.getElementById('c2-tel').value      || '').trim();
  var parts = [];
  if (nombre || apellidos) parts.push([nombre, apellidos].filter(Boolean).join(' '));
  if (dni)   parts.push('DNI/NIE: ' + dni);
  if (fnac)  parts.push('Nac: ' + fnac);
  if (email) parts.push(email);
  if (tel)   parts.push(tel);
  document.getElementById('c4-datos').textContent = parts.join(' · ') || '—';
  var tipoVia = document.getElementById('sel-tipoavia').value || '';
  var via     = document.getElementById('inp-via').value     || '';
  var num     = document.getElementById('inp-num').value     || '';
  var cp      = document.getElementById('inp-cp').value      || '';
  var ciudad  = document.getElementById('inp-ciudad').value  || '';
  var prov    = document.getElementById('inp-provincia').value || '';
  var addr = [tipoVia + ' ' + via, num, cp, ciudad, prov].filter(function(x){return x.trim();}).join(', ');
  var c4d = document.getElementById('c4-dir');
  if (c4d) c4d.textContent = addr || '—';
}

var iaOpen = false;

function toggleIA() {
  iaOpen = !iaOpen;
  var box = document.getElementById('ia-panel');
  if (!box) return;
  box.classList.toggle('open', iaOpen);
  // Al abrir: resetear siempre a tamaño normal
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
  setTimeout(function() {
    var resp = _iaMatch(q);
    _iaAddMsg(resp, 'bot');
  }, 400);
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
  var icon  = document.getElementById('ia-expand-icon');
  if (!panel) return;
  panel.classList.toggle('expanded');
  if (panel.classList.contains('expanded')) {
    if (icon) icon.innerHTML = '<path d="M6 2H2v4M2 2l4.5 4.5M10 14h4v-4M14 14l-4.5-4.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  } else {
    if (icon) icon.innerHTML = '<path d="M2 6V2h4M2 2l4.5 4.5M14 10v4h-4M14 14l-4.5-4.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>';
  }
}

function _iaMatch(q) {
  var ql = q.toLowerCase();
  // Carencia ANTES de 'care' para evitar falso positivo (carencia contiene "care")
  if (ql.includes('carencia') || ql.includes('espera')) return IA_RESP[4];
  if (ql.includes('plan') || ql.includes('care') || ql.includes('premium')) return IA_RESP[0];
  if (ql.includes('precio') || ql.includes('cost') || ql.includes('cuanto')) return 'El precio depende de la especie, raza y edad de tu mascota. Los precios que ves en pantalla ya son los definitivos.';
  if (ql.includes('rc') || ql.includes('responsabilidad')) return IA_RESP[3];
  if (ql.includes('reembolso') || ql.includes('reclamacion') || ql.includes('siniestro')) return IA_RESP[5];
  if (ql.includes('contratar') || ql.includes('comprar')) return IA_RESP[6];
  if (ql.includes('pago') || ql.includes('mensual') || ql.includes('anual')) return IA_RESP[7];
  return 'Para mas informacion sobre este tema, contactanos por WhatsApp o escribenos a hola@kivo.es.';
}

function iaKeydown(e) {
  if (e.key === 'Enter') sendIA();
}

/* ── WHATSAPP ── */
function abrirWhatsApp() {
  var num = (typeof TEXTOS !== 'undefined' && TEXTOS.whatsapp_numero) ? TEXTOS.whatsapp_numero : '34600000000';
  var txt = (typeof TEXTOS !== 'undefined' && TEXTOS.whatsapp_texto)  ? TEXTOS.whatsapp_texto  : 'Hola, necesito ayuda con mi seguro de mascota KIVO.';
  window.open('https://api.whatsapp.com/send?phone=' + num + '&text=' + encodeURIComponent(txt), '_blank');
}

/* ── FORMATO TARJETA ── */
function formatCardNum(el) {
  var v = el.value.replace(/\D/g, '').substring(0, 16);
  var parts = [];
  for (var i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
  el.value = parts.join(' ');
}

function formatExpiry(el) {
  var v = el.value.replace(/\D/g, '').substring(0, 4);
  if (v.length >= 2) el.value = v.substring(0, 2) + '/' + v.substring(2);
  else el.value = v;
}

/* ── PROCESAR PAGO ── */
function procesarPago() {
  var btn = document.getElementById('btn-pagar');
  if (btn) { btn.disabled = true; btn.textContent = 'Procesando…'; }

  // Simula pago (aquí irá Stripe)
  setTimeout(function() {
    // Enviar email de bienvenida/póliza por Resend
    _enviarEmailPoliza().then(function() {
      showScreen('s-ok');
    }).catch(function(err) {
      console.warn('Email no enviado:', err);
      showScreen('s-ok'); // mostramos ok igualmente
    });
  }, 1500);
}

function _buildEmailHtml(mascotas, periodo) {
  var suffix = periodo === 'anual' ? '/año' : '/mes';
  var planNames = { care:'KIVO CARE', careplus:'KIVO CARE+', premium:'KIVO PREMIUM', rc:'KIVO R.C.' };

  var mascoRow = mascotas.map(function(pet) {
    var pr = periodo === 'anual'
      ? (pet.precioMes * 12 * (1 - DESC_ANUAL))
      : pet.precioMes;
    var docs = '';
    var planKey = pet.plan;
    if (planKey && planKey !== 'rc') {
      docs += '<a href="https://kivoseguros.com/docs/ipid-' + planKey + '.pdf" style="color:#3DBFA0;text-decoration:none;font-size:13px;">📄 IPID ' + planNames[planKey] + '</a><br>';
      docs += '<a href="https://kivoseguros.com/docs/cg-' + planKey + '.pdf" style="color:#3DBFA0;text-decoration:none;font-size:13px;">📄 Condicionado General</a><br>';
    }
    if (pet.rcAddon || planKey === 'rc') {
      docs += '<a href="https://kivoseguros.com/docs/ipid-rc.pdf" style="color:#3DBFA0;text-decoration:none;font-size:13px;">📄 IPID R.C.</a><br>';
      docs += '<a href="https://kivoseguros.com/docs/cg-rc.pdf" style="color:#3DBFA0;text-decoration:none;font-size:13px;">📄 Condicionado General R.C.</a><br>';
    }
    return (
      '<tr>' +
        '<td style="padding:16px;border-bottom:1px solid #eee;vertical-align:top">' +
          '<strong style="font-size:15px;color:#1B2A4A">' + (pet.especie === 'gato' ? '🐱' : '🐶') + ' ' + pet.nombre + '</strong><br>' +
          '<span style="font-size:13px;color:#555">' + (pet.planLabel || planNames[planKey]) + '</span>' +
        '</td>' +
        '<td style="padding:16px;border-bottom:1px solid #eee;vertical-align:top;text-align:right">' +
          '<strong style="font-size:15px;color:#1B2A4A">' + pr.toFixed(2).replace('.', ',') + ' €' + suffix + '</strong>' +
        '</td>' +
        '<td style="padding:16px;border-bottom:1px solid #eee;vertical-align:top">' + docs + '</td>' +
      '</tr>'
    );
  }).join('');

  var total = mascotas.reduce(function(s, pet) {
    return s + (periodo === 'anual' ? pet.precioMes * 12 * (1 - DESC_ANUAL) : pet.precioMes);
  }, 0);

  return (
    '<!DOCTYPE html><html><body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f5f5f5">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 0">' +
    '<tr><td align="center">' +
    '<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden">' +
    '<tr><td style="background:#1B2A4A;padding:32px;text-align:center">' +
      '<img src="https://kivoseguros.com/assets/images/logo-blanco.png" alt="KIVO" height="36" style="display:block;margin:0 auto 16px">' +
      '<h1 style="color:#fff;margin:0;font-size:22px;font-weight:700">¡Tu póliza KIVO ya está activa! 🎉</h1>' +
    '</td></tr>' +
    '<tr><td style="padding:32px">' +
      '<p style="font-size:15px;color:#555;margin:0 0 24px">Hola, tu contratación se ha completado con éxito. Aquí tienes el resumen de tus coberturas:</p>' +
      '<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #eee;border-radius:8px;overflow:hidden">' +
        '<tr style="background:#f8f8f8"><th style="padding:12px 16px;text-align:left;font-size:12px;color:#888;font-weight:600">MASCOTA / PLAN</th>' +
        '<th style="padding:12px 16px;text-align:right;font-size:12px;color:#888;font-weight:600">PRECIO</th>' +
        '<th style="padding:12px 16px;text-align:left;font-size:12px;color:#888;font-weight:600">DOCUMENTOS</th></tr>' +
        mascoRow +
        '<tr><td colspan="2" style="padding:16px;font-size:14px;color:#1B2A4A;font-weight:700">Total</td>' +
        '<td style="padding:16px;text-align:right;font-size:16px;color:#1B2A4A;font-weight:700">' + total.toFixed(2).replace('.', ',') + ' €' + suffix + '</td></tr>' +
      '</table>' +
      '<div style="margin-top:24px;padding:16px;background:#f0fdf9;border-radius:8px;font-size:13px;color:#555">' +
        '⏱️ <strong>Período de carencia:</strong> 5 días para accidentes · 28 días para enfermedades<br>' +
        '📱 <strong>Gestiona tus siniestros</strong> desde la app de KIVO (disponible próximamente)<br>' +
        '✉️ ¿Dudas? Escríbenos a <a href="mailto:hola@kivoseguros.com" style="color:#3DBFA0">hola@kivoseguros.com</a>' +
      '</div>' +
    '</td></tr>' +
    '<tr><td style="background:#f8f8f8;padding:20px;text-align:center;font-size:12px;color:#aaa">' +
      'KIVO Seguros S.L. · Agencia de Suscripción de Seguros · DGS Nº X-XXXX<br>' +
      '<a href="https://kivoseguros.com/privacidad" style="color:#aaa">Política de Privacidad</a>' +
    '</td></tr>' +
    '</table></td></tr></table>' +
    '</body></html>'
  );
}

function _enviarEmailPoliza() {
  var pets   = _checkoutPets && _checkoutPets.length ? _checkoutPets : [];
  var email  = (document.getElementById('c2-email') ? document.getElementById('c2-email').value : '') || S.email;
  var nombre = (document.getElementById('c2-nombre') ? document.getElementById('c2-nombre').value : '') || (pets[0] ? pets[0].nombre : 'Cliente');
  var p      = pets[0] ? pets[0].periodo : S.periodo;

  if (!email) return Promise.resolve();

  var html = _buildEmailHtml(pets, p);

  return fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: email,
      subject: '¡Tu póliza KIVO está activa! 🐾',
      html: html
    })
  }).then(function(r) { return r.json(); });
}

/* ── CHECKOUT COMBINADO MULTI-MASCOTA ── */
function _irAlCheckout(allMascotas) {
  _checkoutPets = allMascotas; // guardamos para docs y sc5
  var p      = allMascotas.length > 0 ? allMascotas[0].periodo : S.periodo;
  var names  = { care:'KIVO CARE', careplus:'KIVO CARE+', premium:'KIVO PREMIUM', rc:'KIVO R.C.' };
  var total  = allMascotas.reduce(function(s, pet) {
    return s + (p === 'anual' ? (pet.precioMes || pet.precio) * 12 * (1 - DESC_ANUAL) : (pet.precioMes || pet.precio));
  }, 0);
  var suffix = (p === 'anual') ? '/año' : '/mes';

  var firstPlan = allMascotas[0] ? allMascotas[0].plan : 'care';
  var logoEl    = document.getElementById('ref-logo-' + firstPlan);
  if (logoEl) document.getElementById('c4-logo').src = logoEl.src;

  var pname = allMascotas.length === 1
    ? allMascotas[0].planLabel
    : allMascotas.length + ' mascotas';
  var mascotaStr = allMascotas.map(function(pet) { return pet.nombre; }).join(', ');

  document.getElementById('c4-pname').textContent   = pname;
  document.getElementById('c4-mascota').textContent = mascotaStr;
  document.getElementById('c4-total').textContent   = fmt(total) + suffix;
  // docs rendered dynamically via _renderSc4Docs()
  var planInfoEl = document.getElementById('c4-plan-info');
  if (planInfoEl) {
    planInfoEl.textContent = allMascotas.map(function(pet) {
      var pr = p === 'anual' ? (pet.precioMes||pet.precio)*12*(1-DESC_ANUAL) : (pet.precioMes||pet.precio);
      return pet.nombre + ': ' + pet.planLabel + ' · ' + fmt(pr) + suffix;
    }).join(' | ');
  }

  var email0  = allMascotas[0] ? allMascotas[0]._email : S.email;
  var tel0    = allMascotas[0] ? allMascotas[0]._tel   : S.tel;
  var emailEl = document.getElementById('c2-email');
  var telEl   = document.getElementById('c2-tel');
  if (emailEl) { emailEl.value = email0 || ''; emailEl.setAttribute('readonly','readonly'); emailEl.classList.add('input-readonly'); }
  if (telEl)   { telEl.value   = tel0   || ''; telEl.setAttribute('readonly','readonly');   telEl.classList.add('input-readonly'); }

  completedMascotas = []; _activePetIdx = -1; _newPetDraft = null;
  // Reset checkbox exclusiones
  var exclChk = document.getElementById('excl-chk');
  var btnExcl = document.getElementById('btn-excl');
  if (exclChk) exclChk.checked = false;
  if (btnExcl) btnExcl.disabled = true;
  showScreen('sc-excl');
}

/* ═══════════════════════════════════════════════════════════════

/* ═══════════════════════════════════════════════════════════════
   MULTI-MASCOTA DESDE S6 -- Flujo estilo Musky
   ═══════════════════════════════════════════════════════════════ */

/**
 * Guarda la mascota actual (con su plan seleccionado en s6) en completedMascotas[].
 */
function _saveCurrentToCompleted() {
  var plan    = S.plan;
  var rcAddon = S.rcAddon;
  if (!plan && !rcAddon) return;

  var names    = { care:'KIVO CARE', careplus:'KIVO CARE+', premium:'KIVO PREMIUM', rc:'KIVO R.C.' };
  var planKeys = { care:'CARE', careplus:'CARE+', premium:'PREMIUM' };
  var rcBase   = RC_SUELTA[S.especie] || 14.90;
  var precioMes = 0, planLabel = '';

  if (plan && plan !== 'rc') {
    var base = calcBase(planKeys[plan]);
    precioMes = base;
    if (rcAddon) {
      var addonP = (typeof RC_ADDON !== 'undefined') ? RC_ADDON : 8.90;
      precioMes += addonP;
      planLabel = names[plan] + ' + R.C.';
    } else {
      planLabel = names[plan];
    }
  } else {
    plan      = 'rc';
    precioMes = rcBase;
    planLabel = names['rc'];
  }

  var inpF = document.getElementById('inp-fecha');
  completedMascotas.push({
    nombre:    S.nombre    || 'Tu mascota',
    especie:   S.especie,
    sexo:      S.sexo,
    esterilizada: S.esterilizada,
    noFecha:   S.noFecha,
    plan:      plan,
    planLabel: planLabel,
    rcAddon:   rcAddon,
    precioMes: precioMes,
    precioAno: precioMes * 12 * (1 - DESC_ANUAL),
    _fecha:    inpF ? inpF.value : '',
    _enf:      _enfSeleccionadas.slice(),
    _email:    S.email,
    _tel:      S.tel,
    _saludRespondida: _saludRespondida
  });
}

/**
 * Boton "Anadir otra mascota" en s6.
 */
function addMascotaDesdeS6() {
  if (!S.plan && !S.rcAddon) return;

  _saveCurrentToCompleted();
  _activePetIdx = -1;
  _newPetDraft  = null;

  var savedEmail = S.email, savedTel = S.tel;

  S.especie  = null; S.nombre = ''; S.sexo = null; S.esterilizada = null;
  S.noFecha  = false; S.tipoRaza = 'pura'; S.raza = null; S.raza2 = null;
  S.peso     = null; S.interior = null; S.plan = null; S.rcAddon = false;
  S.email    = savedEmail; S.tel = savedTel;
  _saludRespondida = false;
  pets       = [];

  var elN = document.getElementById('inp-nombre');
  if (elN) elN.value = '';
  var tP = document.getElementById('tile-perro');
  var tG = document.getElementById('tile-gato');
  if (tP) tP.classList.remove('sel');
  if (tG) tG.classList.remove('sel');
  var b1 = document.getElementById('btn-s1');
  if (b1) b1.disabled = true;

  _enfSeleccionadas = [];
  _restoreEnfUI();
  showScreen('fw');
  showStep(1);
}

/**
 * Renderiza chips-tab de TODAS las mascotas (confirmadas + nueva en curso).
 * Pinchar en un chip carga los datos de esa mascota en s6.
 */
function _renderMascotasChips() {
  var row  = document.getElementById('mascotas-prev-chips');
  var list = document.getElementById('mascotas-chips-list');
  if (!row || !list) return;

  if (completedMascotas.length === 0 && !S.plan && !S.rcAddon) {
    row.style.display = 'none';
    return;
  }

  var p        = S.periodo;
  var ICO_GATO  = '🐱';
  var ICO_PERRO = '🐶';
  row.style.display = 'flex';

  var html = completedMascotas.map(function(pet, i) {
    var precio = p === 'anual' ? fmt(pet.precioAno) + '/ano' : fmt(pet.precioMes) + '/mes';
    var ico    = pet.especie === 'gato' ? ICO_GATO : ICO_PERRO;
    var active = (_activePetIdx === i) ? ' prev-chip-active' : '';
    return (
      '<div class="prev-chip' + active + '" onclick="switchMascotaTab(' + i + ')">' +
        '<span class="prev-chip-ico">' + ico + '</span>' +
        '<div class="prev-chip-info">' +
          '<div class="prev-chip-nom">' + pet.nombre + '</div>' +
          '<div class="prev-chip-pl">' + pet.planLabel + ' - ' + precio + '</div>' +
        '</div>' +
        '<button class="prev-chip-del" onclick="event.stopPropagation();eliminarMascota(' + i + ')" title="Eliminar">x</button>' +
      '</div>'
    );
  }).join('');

  // Chip de la mascota nueva en curso
  var newNomSrc  = (_activePetIdx === -1) ? S : (_newPetDraft || {});
  var newIco     = (newNomSrc.especie === 'gato') ? ICO_GATO : ((newNomSrc.especie === 'perro') ? ICO_PERRO : '+');
  var newNom     = newNomSrc.nombre || 'Nueva mascota';
  var chipNames  = { care:'KIVO CARE', careplus:'KIVO CARE+', premium:'KIVO PREMIUM', rc:'KIVO R.C.' };
  var newPlanKey = (_activePetIdx === -1) ? (S.plan || (S.rcAddon ? 'rc' : null)) : (_newPetDraft && (_newPetDraft.plan || (_newPetDraft.rcAddon ? 'rc' : null)));
  var newPlanLbl = '';
  if (newPlanKey) {
    var _npKeys = { care:'CARE', careplus:'CARE+', premium:'PREMIUM' };
    var _npRcB  = (S.especie && RC_SUELTA) ? (RC_SUELTA[S.especie] || 14.90) : 14.90;
    var _npPm   = 0;
    if (newPlanKey !== 'rc') {
      _npPm = calcBase(_npKeys[newPlanKey]) + (S.rcAddon ? RC_ADDON : 0);
    } else {
      _npPm = _npRcB;
    }
    var _npPrecio = (p === 'anual') ? fmt(_npPm * 12 * (1 - DESC_ANUAL)) + '/ano' : fmt(_npPm) + '/mes';
    newPlanLbl = (chipNames[newPlanKey] || '') + ' - ' + _npPrecio;
  } else {
    newPlanLbl = 'En configuracion';
  }
  var newActive  = (_activePetIdx === -1) ? ' prev-chip-active' : '';
  html += (
    '<div class="prev-chip prev-chip-new' + newActive + '" onclick="switchMascotaTab(-1)">' +
      '<span class="prev-chip-ico">' + newIco + '</span>' +
      '<div class="prev-chip-info">' +
        '<div class="prev-chip-nom">' + newNom + '</div>' +
        '<div class="prev-chip-pl">' + newPlanLbl + '</div>' +
      '</div>' +
      '<button class="prev-chip-del" onclick="event.stopPropagation();eliminarMascotaEnCurso()" title="Eliminar">x</button>' +
    '</div>'
  );

  list.innerHTML = html;
  var label = row.querySelector('.mascotas-prev-label');
  if (label) label.textContent = 'Mascotas tarificadas:';
}

/**
 * Cambia la vista de s6 a la mascota indicada.
 * idx === -1: mascota nueva en curso.  idx >= 0: mascota confirmada.
 */
function switchMascotaTab(idx) {
  if (_activePetIdx === idx) return;

  // Guardar estado de la mascota nueva al alejarse
  if (_activePetIdx === -1) {
    var inpSave = document.getElementById('inp-fecha');
    _newPetDraft = {
      especie: S.especie, nombre: S.nombre, sexo: S.sexo, esterilizada: S.esterilizada,
      plan: S.plan, rcAddon: S.rcAddon, noFecha: S.noFecha,
      _fecha: inpSave ? inpSave.value : '',
      _enf: _enfSeleccionadas.slice(),
      _saludRespondida: _saludRespondida
    };
  }

  _activePetIdx = idx;

  if (idx === -1) {
    // Restaurar mascota nueva
    if (_newPetDraft) {
      S.especie = _newPetDraft.especie; S.nombre = _newPetDraft.nombre;
      S.sexo    = _newPetDraft.sexo;   S.plan    = _newPetDraft.plan;
      S.rcAddon = _newPetDraft.rcAddon; S.noFecha = _newPetDraft.noFecha;
      S.esterilizada = _newPetDraft.esterilizada || null;
      var inpR = document.getElementById('inp-fecha');
      if (inpR) inpR.value = _newPetDraft._fecha || '';
      _enfSeleccionadas = _newPetDraft._enf ? _newPetDraft._enf.slice() : [];
      _saludRespondida  = _newPetDraft._saludRespondida || false;
    } else {
      _enfSeleccionadas = [];
      _saludRespondida  = false;
    }
    _restoreEnfUI();
  } else {
    // Cargar mascota confirmada
    var petLoad = completedMascotas[idx];
    S.especie = petLoad.especie; S.nombre  = petLoad.nombre;
    S.plan    = petLoad.plan;   S.rcAddon = petLoad.rcAddon;
    S.sexo    = petLoad.sexo || null; S.esterilizada = petLoad.esterilizada !== undefined ? petLoad.esterilizada : null;
    S.noFecha = petLoad.noFecha || false;
    var inpL = document.getElementById('inp-fecha');
    if (inpL) inpL.value = petLoad._fecha || '';
    _enfSeleccionadas = petLoad._enf ? petLoad._enf.slice() : [];
    _saludRespondida  = petLoad._saludRespondida !== undefined ? petLoad._saludRespondida : true; // confirmada ya la respondió
    _restoreEnfUI();
  }

  // Actualizar barra de mascota
  var ICO_G = '🐱'; var ICO_P = '🐶';
  document.getElementById('res-name').textContent = S.nombre || 'Tu mascota';
  document.getElementById('res-title').textContent = 'Planes para ' + (S.nombre || 'tu mascota');
  document.getElementById('mascota-icon').innerHTML = '<img src="assets/icons/' + (S.especie === 'gato' ? 'gato' : 'perro') + '.svg" width="48" height="48" alt="">';
  var metaEl = document.getElementById('res-meta');
  if (metaEl) metaEl.textContent = S.especie ? (S.especie.charAt(0).toUpperCase() + S.especie.slice(1)) : '';

  // Restablecer visual de planes
  ['care','careplus','premium','rc'].forEach(function(pid) { _applyPlanVisual(pid, false); });
  if (S.plan && S.plan !== 'rc') _applyPlanVisual(S.plan, true);
  if (S.rcAddon) _applyPlanVisual('rc', true);

  _updateContratar();
  updatePrices();
  _renderMascotasChips();
  _updateS6Total();
  _updateAddBtn();
}

/**
 * Elimina una mascota confirmada con confirmacion.
 */
function eliminarMascota(idx) {
  var petDel = completedMascotas[idx];
  if (!petDel) return;
  if (!confirm('Seguro que quieres eliminar a ' + petDel.nombre + ' del contrato?')) return;
  completedMascotas.splice(idx, 1);
  if (completedMascotas.length > 0) {
    // Quedan mascotas confirmadas — ir a la primera
    switchMascotaTab(0);
  } else {
    // No quedan mascotas confirmadas — resetear y preguntar
    _activePetIdx = -1;
    S.plan = null; S.rcAddon = false;
    ['care','careplus','premium','rc'].forEach(function(pid){ _applyPlanVisual(pid, false); });
    showUltimaModal();
  }
}
/**
 * Elimina la mascota "en curso" (nueva, no confirmada todavia).
 */
function eliminarMascotaEnCurso() {
  var nom = S.nombre || 'esta mascota';
  if (!confirm('Seguro que quieres eliminar a ' + nom + '?')) return;
  // Resetear estado de la mascota en curso
  S.plan = null; S.rcAddon = false; S.especie = null; S.nombre = '';
  S.sexo = null; S.noFecha = false; S.raza = null; S.raza2 = null; S.peso = null;
  _enfSeleccionadas = [];
  _activePetIdx = -1;
  _newPetDraft = null;
  // Si hay mascotas confirmadas, volver a s6 mostrando la primera
  if (completedMascotas.length > 0) {
    switchMascotaTab(0);
  } else {
    showUltimaModal();
  }
}


/**
 * Total acumulado de todas las mascotas (confirmadas + nueva si tiene plan).
 */
function _updateS6Total() {
  var totalRow = document.getElementById('s6-total-row');
  var totalVal = document.getElementById('s6-total-val');
  if (!totalRow || !totalVal) return;

  var p = S.periodo;
  var totalConfirmed = completedMascotas.reduce(function(sum, pet) {
    return sum + (p === 'anual' ? pet.precioAno : pet.precioMes);
  }, 0);

  var currentPrice = 0;
  if (_activePetIdx === -1 && (S.plan || S.rcAddon)) {
    var plan2    = S.plan;
    var planKeys = { care:'CARE', careplus:'CARE+', premium:'PREMIUM' };
    var rcBase2  = RC_SUELTA[S.especie] || 14.90;
    if (plan2 && plan2 !== 'rc') {
      var base2 = calcBase(planKeys[plan2]);
      var pm2   = base2 + (S.rcAddon ? RC_ADDON : 0);
      currentPrice = (p === 'anual') ? pm2 * 12 * (1 - DESC_ANUAL) : pm2;
    } else {
      currentPrice = (p === 'anual') ? rcBase2 * 12 * (1 - DESC_ANUAL) : rcBase2;
    }
  }

  var grand  = totalConfirmed + currentPrice;
  var suffix = (p === 'anual') ? '/ano' : '/mes';

  if (completedMascotas.length === 0) {
    totalRow.style.display = 'none';
  } else {
    totalVal.textContent = fmt(grand) + suffix;
    totalRow.style.display = 'flex';
  }
}

/**
 * Habilita/deshabilita el boton "Anadir otra mascota".
 * Solo activo cuando: hay plan seleccionado Y estamos en mascota nueva (idx=-1).
 */
function _updateAddBtn() {
  var btn = document.getElementById('btn-add-mascota-s6');
  if (!btn) return;
  btn.disabled = !(S.plan || S.rcAddon) || !_saludRespondida || (_activePetIdx >= 0);
}

function _updateContratar() {
  var btn = document.getElementById('btn-contratar-main');
  if (!btn) return;
  var hasPlan = !!(S.plan || S.rcAddon);
  var hasSalud = _saludRespondida;
  btn.disabled = !(hasPlan && hasSalud);

  // Mostrar/ocultar aviso cuestionario de salud
  var aviso = document.getElementById('aviso-salud');
  if (aviso) {
    if (hasPlan && !hasSalud) {
      aviso.style.display = 'flex';
    } else {
      aviso.style.display = 'none';
    }
  }
}

/* ═══════════════════════════════════════════════════════════════════
   INTEGRACIÓN ASESOR KIVO
   Lee parámetros URL ?desde=asesor&plan=careplus&rc=extra
   y muestra banner de bienvenida + preselecciona plan en paso 4
   ═══════════════════════════════════════════════════════════════════ */
(function _initDesdeAsesor() {
  var params = new URLSearchParams(window.location.search);
  if (params.get('desde') !== 'asesor') return;

  // Mostrar banner de bienvenida
  var banner = document.getElementById('banner-asesor');
  if (banner) banner.style.display = 'block';

  // Parámetros del asesor
  var planParam = params.get('plan');  // care | careplus | premium
  var rcParam   = params.get('rc');    // extra | null
  var validPlans = { care: true, careplus: true, premium: true };
  if (!planParam || !validPlans[planParam]) return;

  // Envolver showStep para interceptar cuando el cliente llega al paso 4
  // (fs4 = pantalla de selección de plan) y preseleccionar el plan recomendado
  var _applied = false;
  var _origShowStep = showStep;

  showStep = function(n) {
    _origShowStep(n);
    if (n === 4 && !_applied) {
      _applied = true;
      // Pequeño timeout para que el DOM del paso 4 esté listo
      setTimeout(function() {
        // Preseleccionar el plan recomendado
        seleccionarPlan(planParam);
        // Si el asesor recomendó también RC, activar el addon
        if (rcParam === 'extra') {
          // rcAddon empieza en false; seleccionarPlan('rc') lo activa
          if (!S.rcAddon) seleccionarPlan('rc');
        }
      }, 50);
    }
  };
})();

/* ══ EXCLUSIONES ══ */
function toggleExcl(idx) {
  var body = document.getElementById('excl-body-' + idx);
  var arr  = document.getElementById('excl-arr-'  + idx);
  if (!body) return;
  var open = body.style.display === 'block';
  body.style.display = open ? 'none' : 'block';
  if (arr) arr.textContent = open ? '▾' : '▴';
}

function checkExcl() {
  var chk = document.getElementById('excl-chk');
  var btn = document.getElementById('btn-excl');
  if (btn) btn.disabled = !(chk && chk.checked);
}

function toggleSc4Cov(id, btn) {
  var el  = document.getElementById(id);
  var arr = document.getElementById(id + '-arr');
  if (!el) return;
  var open = el.style.display === 'block';
  el.style.display = open ? 'none' : 'block';
  if (arr) arr.style.transform = open ? '' : 'rotate(180deg)';
  var span = btn ? btn.querySelector('span') : null;
  if (span) span.textContent = open ? 'Ver coberturas incluidas' : 'Ocultar coberturas';
}
