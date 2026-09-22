(function () {
  'use strict';
  var root = document.querySelector('.builder-hero');
  if (!root) return;
  var glows = Array.from(root.querySelectorAll('.builder-glow'));
  var cards = Array.from(root.querySelectorAll('.builder-card'));
  var stories = Array.from(root.querySelectorAll('.builder-story'));
  if (cards.length < 2) return;
  var tabs = Array.from(root.querySelectorAll('[data-slide]'));
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var current = 0, elapsed = 0, last = 0, frame = 0;
  var visible = true, hovered = false;
  var duration = 5500;
  function running() { return !reduced.matches && visible && !document.hidden && !hovered && !root.contains(document.activeElement); }
  function sync() {
    cancelAnimationFrame(frame);
    last = 0;
    if (running()) frame = requestAnimationFrame(tick);
  }
  function select(index, manual) {
    current = (index + cards.length) % cards.length;
    elapsed = 0;
    cards.forEach(function (card, i) {
      var active = i === current;
      card.classList.toggle('is-active', active);
      glows[i].classList.toggle('is-active', active);
      card.inert = !active;
      card.setAttribute('aria-hidden', String(!active));
      stories[i].classList.toggle('is-active', active);
      stories[i].inert = !active;
      stories[i].setAttribute('aria-hidden', String(!active));
      
      tabs[i].setAttribute('aria-current', String(active));
    });
    if (manual) {
      root.querySelector('.builder-status').textContent = stories[current].querySelector('h1,h2').textContent;
    }
    sync();
  }
  function tick(now) {
    if (!running()) return;
    if (last) elapsed += now - last;
    last = now;
    if (elapsed >= duration) { select(current + 1, false); return; }
    frame = requestAnimationFrame(tick);
  }
  tabs.forEach(function (tab, i) { tab.addEventListener('click', function () { select(i, true); }); });
  root.querySelectorAll('[data-step]').forEach(function (button) {
    button.addEventListener('click', function () { select(current + Number(button.dataset.step), true); });
  });
  root.addEventListener('pointerenter', function (event) { if (event.pointerType === 'mouse') { hovered = true; sync(); } });
  root.addEventListener('pointerleave', function (event) { if (event.pointerType === 'mouse') { hovered = false; elapsed = 0; sync(); } });
  root.addEventListener('focusin', sync);
  root.addEventListener('focusout', function () { elapsed = 0; setTimeout(sync, 0); });
  root.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      var next = (current + (event.key === 'ArrowRight' ? 1 : -1) + cards.length) % cards.length;
      tabs[next].focus();
      select(next, true);
    }
  });
  var deck = root.querySelector('.builder-deck'), touchStart = null, swiped = false;
  deck.addEventListener('touchstart', function (event) { touchStart = event.touches[0]; swiped = false; }, {passive:true});
  deck.addEventListener('touchend', function (event) {
    if (!touchStart) return;
    var end = event.changedTouches[0], dx = end.clientX - touchStart.clientX, dy = end.clientY - touchStart.clientY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) { swiped = true; select(current + (dx < 0 ? 1 : -1), true); }
    touchStart = null;
  }, {passive:true});
  deck.addEventListener('click', function (event) { if (swiped) { event.preventDefault(); swiped = false; } }, true);
  document.addEventListener('visibilitychange', sync);
  reduced.addEventListener('change', sync);
  if ('IntersectionObserver' in window) new IntersectionObserver(function (entries) { visible = entries[0].isIntersecting; sync(); }).observe(root);
  sync();
})();
