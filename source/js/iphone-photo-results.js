(() => {
  const section = document.querySelector('.ip17-photo-results');
  if (!section) return;
  const track = section.querySelector('.ip17-results-track');
  const cards = [...track.querySelectorAll('figure')];
  const prev = section.querySelector('[data-results-prev]');
  const next = section.querySelector('[data-results-next]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let active = 0;
  const target = (index) => Math.max(0, track.scrollWidth - track.clientWidth) * index / (cards.length - 1);
  const go = (index) => {
    active = Math.max(0, Math.min(cards.length - 1, index));
    track.scrollTo({ left: target(active), behavior: reduced ? 'instant' : 'smooth' });
  };
  const dots = cards.map((card, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', card.querySelector('strong').textContent);
    button.addEventListener('click', () => go(index));
    section.querySelector('.ip17-results-dots').append(button);
    return button;
  });
  const sync = () => {
    active = cards.reduce((best, _, index) =>
      Math.abs(target(index) - track.scrollLeft) < Math.abs(target(best) - track.scrollLeft) ? index : best, 0);
    dots.forEach((dot, index) => dot.setAttribute('aria-current', String(index === active)));
    prev.disabled = track.scrollLeft < 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  };
  prev.addEventListener('click', () => go(active - 1));
  next.addEventListener('click', () => go(active + 1));
  track.addEventListener('scroll', sync, { passive: true });
  track.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    go(active + (event.key === 'ArrowRight' ? 1 : -1));
  });
  new ResizeObserver(sync).observe(track);
  sync();
})();
