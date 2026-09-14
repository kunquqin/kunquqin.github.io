(() => {
  const buttons = [...document.querySelectorAll('.ep-poster-open')];
  const dialog = document.querySelector('.ep-lightbox');
  if (!dialog || !buttons.length) return;
  const image = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  let index = 0;
  let opener;
  let overflow;
  let resumeLenis = false;
  function show(next) {
    index = (next + buttons.length) % buttons.length;
    const original = buttons[index].querySelector('img');
    image.src = original.currentSrc || original.src;
    image.alt = original.alt;
    caption.textContent = `${buttons[index].dataset.caption || buttons[index].closest('figure').querySelector('h3')?.textContent || original.alt} · ${index + 1} / ${buttons.length}`;
  }
  buttons.forEach((button, i) => button.addEventListener('click', () => {
    opener = button;
    show(i);
    overflow = document.documentElement.style.overflow;
    resumeLenis = !!window.lenisInstance && !window.lenisInstance.isStopped;
    if (resumeLenis) window.lenisInstance.stop();
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    dialog.querySelector('.ep-lightbox-close').focus();
  }));
  dialog.querySelector('.ep-lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.ep-lightbox-prev').addEventListener('click', () => show(index - 1));
  dialog.querySelector('.ep-lightbox-next').addEventListener('click', () => show(index + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = overflow;
    if (resumeLenis) window.lenisInstance?.start();
    opener?.focus({preventScroll: true});
  });
})();
