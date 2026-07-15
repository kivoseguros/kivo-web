/* KIVO — Sección 5 · script */
(function () {
  const cards = document.querySelectorAll('.s05-article, .s05-review');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
          }, i * 80);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  cards.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(el);
  });
})();
