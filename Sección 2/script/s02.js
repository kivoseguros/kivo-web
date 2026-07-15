document.addEventListener("DOMContentLoaded", function () {
  const s02Toggle       = document.getElementById("s02Toggle");
  const s02ToggleBottom = document.getElementById("s02ToggleBottom");
  const s02More         = document.getElementById("s02More");

  if (!s02Toggle || !s02More) return;

  function open() {
    s02More.classList.add("is-open");
    s02Toggle.textContent = "Ver menos situaciones ↑";
  }

  function close() {
    s02More.classList.remove("is-open");
    s02Toggle.textContent = "Ver más situaciones ↓";
    s02Toggle.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  s02Toggle.addEventListener("click", function () {
    s02More.classList.contains("is-open") ? close() : open();
  });

  if (s02ToggleBottom) {
    s02ToggleBottom.addEventListener("click", close);
  }
});


// Abrir Asistente KIVO
const s02OpenAsistente = document.getElementById('s02OpenAsistente');
if (s02OpenAsistente) {
  s02OpenAsistente.addEventListener('click', function () {
    window.open(
      '../Sección 4/index.html#openModal',
      'asistente_kivo',
      'width=860,height=620,left=' + Math.round((screen.width-860)/2) + ',top=' + Math.round((screen.height-620)/2) + ',scrollbars=yes,resizable=yes'
    );
  });
}
