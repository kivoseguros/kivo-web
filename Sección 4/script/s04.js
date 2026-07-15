/* KIVO — Sección 4 · script */
// Animación de entrada al hacer scroll
(function () {
  const steps = document.querySelectorAll('.s04-step');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
          }, i * 120);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  steps.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
})();
