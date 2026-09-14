(function () {
  'use strict';
  const nav = document.querySelector('.rb-index');
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll('a'));
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const header = document.querySelector('.portfolio-header');
  function navOffset() {
    return header.getBoundingClientRect().height + nav.getBoundingClientRect().height;
  }
  function syncLayout() {
    const page = document.querySelector('.rb-case');
    page.style.setProperty('--rb-header-height', header.getBoundingClientRect().height + 'px');
    page.style.setProperty('--rb-nav-stack', navOffset() + 'px');
    update();
  }
  let scheduled = false;
  function update() {
    scheduled = false;
    const top = navOffset() + 2;
    let current = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= top) current = index;
    });
    links.forEach((link, index) => {
      link.classList.toggle('active', index === current);
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  nav.addEventListener('click', function (event) {
    const link = event.target.closest('a');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    event.stopPropagation();
    const target = document.querySelector(link.getAttribute('href'));
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const top = Math.max(0, window.scrollY + target.getBoundingClientRect().top - navOffset());
    if (window.lenisInstance) {
      window.lenisInstance.scrollTo(top, { duration: 1.05, immediate: reduced, force: true, onComplete: update });
    } else {
      window.scrollTo({ top: top, behavior: reduced ? 'instant' : 'smooth' });
    }
    history.replaceState(null, '', link.getAttribute('href'));
  }, true);
  window.addEventListener('scroll', function () {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', syncLayout);
  window.addEventListener('load', syncLayout);
  syncLayout();
}());
