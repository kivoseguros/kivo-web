document.addEventListener("DOMContentLoaded", () => {

  // Acordeón comparativa
  const trigger = document.querySelector(".s03-accordion-trigger");
  if (trigger) {
    trigger.addEventListener("click", () => {
      const acc = document.querySelector(".s03-accordion");
      const isOpen = acc.classList.toggle("active");
      trigger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Botones planes (feedback visual)
  document.querySelectorAll(".js-s03-button").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("is-clicked");
      setTimeout(() => btn.classList.remove("is-clicked"), 260);
    });
  });

  // Modal asistente
  const modal    = document.getElementById("kivoModal");
  const closeBtn = document.getElementById("kivoModalClose");
  const openBtn  = document.getElementById("s03AsisteBtn");

  function openModal() {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (openBtn)  openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal)    modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

});
