(() => {
  const page = document.querySelector('.su7-page');
  if (!page) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  page.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.getElementById(link.hash.slice(1));
      if (!target) return;
      event.preventDefault();
      history.replaceState(null, '', link.hash);
      target.scrollIntoView({behavior: reduced ? 'instant' : 'smooth'});
    });
  });
  const links = [...page.querySelectorAll('.su7-nav-links a')];
  const sections = links.map(link => document.querySelector(link.hash));
  const progress = page.querySelector('.su7-progress');
  let pending = false;
  function update() {
    const scrollable = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${scrollable > 0 ? Math.min(1, Math.max(0, scrollY / scrollable)) : 0})`;
    let index = -1;
    sections.forEach((section, i) => { if (section.getBoundingClientRect().top <= innerHeight * .4) index = i; });
    links.forEach((link,i) => { if (i === index) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); });
    pending = false;
  }
  addEventListener('scroll', () => { if (!pending) { pending = true; requestAnimationFrame(update); } }, {passive:true});
  addEventListener('resize', update);
  update();
  const getCenteredIndex = (track, slides) => {
    const center = track.scrollLeft + track.clientWidth / 2;
    return slides.reduce((closest, slide, index) => {
      const distance = Math.abs(slide.offsetLeft + slide.offsetWidth / 2 - center);
      return distance < closest.distance ? {index, distance} : closest;
    }, {index: 0, distance: Infinity}).index;
  };
  const centerSlide = (track, slide, behavior) => {
    track.scrollTo({left: Math.max(0, slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2), behavior});
  };
  const fadeCaption = caption => {
    if (reduced) return;
    caption.getAnimations().forEach(animation => animation.cancel());
    caption.animate([{opacity: 0, transform: 'translateY(7px)'}, {opacity: 1, transform: 'translateY(0)'}], {duration: 320, easing: 'ease-out'});
  };

  const angleTrack = page.querySelector('.su7-angle-track');
  const angleSlides = [...page.querySelectorAll('.su7-angle-slide')];
  const angleCaption = page.querySelector('.su7-angle-caption');
  let angleIndex = 0;
  let angleProgrammatic = false;
  let angleSettle;
  function renderAngle(index, animate = false) {
    angleIndex = (index + angleSlides.length) % angleSlides.length;
    const slide = angleSlides[angleIndex];
    angleSlides.forEach((item, i) => item.classList.toggle('is-active', i === angleIndex));
    page.querySelector('[data-angle-title]').textContent = slide.dataset.title;
    page.querySelector('[data-angle-copy]').textContent = slide.dataset.copy;
    if (animate) fadeCaption(angleCaption);
  }
  function selectAngle(index) {
    renderAngle(index, true);
    angleProgrammatic = true;
    clearTimeout(angleSettle);
    centerSlide(angleTrack, angleSlides[angleIndex], reduced ? 'instant' : 'smooth');
    angleSettle = setTimeout(() => { angleProgrammatic = false; }, reduced ? 0 : 650);
  }
  page.querySelectorAll('[data-angle-step]').forEach(button => button.addEventListener('click', () => selectAngle(angleIndex + Number(button.dataset.angleStep))));
  let angleFrame;
  angleTrack.addEventListener('scroll', () => {
    cancelAnimationFrame(angleFrame);
    angleFrame = requestAnimationFrame(() => {
      if (angleProgrammatic) return;
      const next = getCenteredIndex(angleTrack, angleSlides);
      if (next !== angleIndex) renderAngle(next, true);
    });
  }, {passive:true});
  angleTrack.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    selectAngle(event.key === 'Home' ? 0 : event.key === 'End' ? angleSlides.length - 1 : angleIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  new ResizeObserver(() => centerSlide(angleTrack, angleSlides[angleIndex], 'instant')).observe(angleTrack);
  renderAngle(0);

  const detailRail = page.querySelector('.su7-light-rail');
  const detailCards = [...detailRail.querySelectorAll('.su7-light-card')];
  const detailCaption = page.querySelector('.su7-detail-caption');
  let detailIndex = 0;
  let detailProgrammatic = false;
  let detailSettle;
  function renderDetail(index, animate = false) {
    detailIndex = (index + detailCards.length) % detailCards.length;
    const card = detailCards[detailIndex];
    detailCards.forEach((item, i) => item.classList.toggle('is-active', i === detailIndex));
    page.querySelector('[data-detail-title]').textContent = card.dataset.name;
    page.querySelector('[data-detail-copy]').textContent = card.dataset.copy;
    if (animate) fadeCaption(detailCaption);
  }
  function selectDetail(index) {
    renderDetail(index, true);
    detailProgrammatic = true;
    clearTimeout(detailSettle);
    centerSlide(detailRail, detailCards[detailIndex], reduced ? 'instant' : 'smooth');
    detailSettle = setTimeout(() => { detailProgrammatic = false; }, reduced ? 0 : 650);
  }
  page.querySelectorAll('[data-detail-step]').forEach(button => button.addEventListener('click', () => selectDetail(detailIndex + Number(button.dataset.detailStep))));
  let detailFrame;
  detailRail.addEventListener('scroll', () => {
    cancelAnimationFrame(detailFrame);
    detailFrame = requestAnimationFrame(() => {
      if (detailProgrammatic) return;
      const next = getCenteredIndex(detailRail, detailCards);
      if (next !== detailIndex) renderDetail(next, true);
    });
  }, {passive:true});
  detailRail.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    selectDetail(event.key === 'Home' ? 0 : event.key === 'End' ? detailCards.length - 1 : detailIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  new ResizeObserver(() => centerSlide(detailRail, detailCards[detailIndex], 'instant')).observe(detailRail);
  renderDetail(0);
  const paintStage = page.querySelector('.su7-paint-stage');
  const paintImage = page.querySelector('[data-paint-image]');
  const paintOverlay = page.querySelector('[data-paint-overlay]');
  const paintButtons = [...page.querySelectorAll('[data-paint-src]')];
  const paintStatus = page.querySelector('.su7-paint-status');
  let paintSnapFrame;
  let paintSnapTimer;
  let paintSnapActive = false;
  let paintScrollY = scrollY;
  let paintScrollDirection = 0;
  const cancelPaintSnap = () => {
    cancelAnimationFrame(paintSnapFrame);
    paintSnapActive = false;
  };
  const settlePaintStage = () => {
    if (reduced || paintSnapActive) return;
    const rect = paintStage.getBoundingClientRect();
    const offset = rect.top + rect.height / 2 - innerHeight / 2;
    if (Math.abs(offset) > Math.min(620, innerHeight * .72) || rect.bottom < 0 || rect.top > innerHeight) return;
    if ((paintScrollDirection > 0 && offset <= 0) || (paintScrollDirection < 0 && offset >= 0)) return;
    const start = scrollY;
    const target = Math.max(0, start + offset);
    const duration = Math.min(980, Math.max(600, Math.abs(offset) * 1.35));
    const startedAt = performance.now();
    paintSnapActive = true;
    const step = now => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = progress < .5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2;
      scrollTo(0, start + (target - start) * eased);
      if (progress < 1) paintSnapFrame = requestAnimationFrame(step);
      else { paintSnapActive = false; paintScrollY = target; }
    };
    paintSnapFrame = requestAnimationFrame(step);
  };
  addEventListener('scroll', () => {
    if (paintSnapActive) return;
    const delta = scrollY - paintScrollY;
    if (Math.abs(delta) > 1) paintScrollDirection = Math.sign(delta);
    paintScrollY = scrollY;
    clearTimeout(paintSnapTimer);
    paintSnapTimer = setTimeout(settlePaintStage, 180);
  }, {passive:true});
  ['wheel','touchstart','pointerdown','keydown'].forEach(type => addEventListener(type, cancelPaintSnap, {passive:true}));
  let paintRequest = 0;
  let paintAnimation;
  paintButtons.forEach(button => button.addEventListener('click', async () => {
    const request = ++paintRequest;
    paintStage.setAttribute('aria-busy','true');
    paintStatus.textContent = `正在载入${button.dataset.paintName}…`;
    const img = new Image();
    img.src = button.dataset.paintSrc;
    try {
      await img.decode();
      if (request !== paintRequest) return;
      paintAnimation?.cancel();
      paintOverlay.src = paintImage.src;
      paintImage.src = img.src;
      paintImage.alt = button.dataset.paintName + ' SU7 外观';
      paintButtons.forEach(b => b.setAttribute('aria-pressed',String(b === button)));
      page.querySelector('[data-paint-name]').textContent = button.dataset.paintName;
      page.querySelector('[data-paint-copy]').textContent = button.dataset.paintCopy;
      if (!reduced) paintAnimation = paintOverlay.animate([{opacity:1},{opacity:0}],{duration:380,easing:'ease-out'});
      paintStage.setAttribute('aria-busy','false');
      paintStatus.textContent = '';
    } catch {
      if (request !== paintRequest) return;
      paintStage.setAttribute('aria-busy','false');
      paintStatus.textContent = '图片未能加载，请重新选择车色。';
    }
  }));
  let imageRequest = 0;
  const cabin = document.getElementById('su7-cabin-image');
  page.querySelectorAll('.su7-swatch').forEach(button => {
    button.addEventListener('click', () => {
      const request = ++imageRequest;
      const preload = new Image();
      preload.onload = () => {
        if (request !== imageRequest) return;
        cabin.src = button.dataset.image;
        cabin.alt = button.dataset.name + '内饰';
        document.getElementById('su7-cabin-label').textContent = button.dataset.name;
        page.querySelectorAll('.su7-swatch').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
      };
      preload.onerror = () => { if (request === imageRequest) document.getElementById('su7-cabin-label').textContent = '图片暂未加载，请重试'; };
      preload.src = button.dataset.image;
    });
  });
  document.getElementById('su7-differences').addEventListener('change', event => {
    page.querySelectorAll('.su7-common').forEach(row => { row.hidden = event.target.checked; });
    document.getElementById('su7-compare-status').textContent = event.target.checked ? '显示 5 项差异配置，已隐藏 2 项相同配置。' : '显示全部 7 项关键配置。完整配置与选装组合以官方为准。';
  });
})();
