(function () {
  const heroWrap = document.getElementById('hero');
  const header = document.getElementById('heroHeader');
  const panel = document.getElementById('heroPanel');
  if (!heroWrap || !header || !panel) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    panel.style.transform = 'translateY(0)';
    header.style.transform = 'translateY(-100%)';
    header.style.opacity = '0';
    return;
  }

  let ticking = false;

  function update() {
    const rect = heroWrap.getBoundingClientRect();
    const scrollRange = heroWrap.offsetHeight - window.innerHeight;
    const scrolled = -rect.top;
    let progress = scrollRange > 0 ? scrolled / scrollRange : 0;
    progress = Math.min(1, Math.max(0, progress));

    panel.style.transform = `translateY(${(1 - progress) * 100}%)`;
    header.style.transform = `translateY(${-progress * 100}%)`;
    header.style.opacity = String(1 - progress);
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();