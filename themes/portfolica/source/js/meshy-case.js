(function () {
  'use strict';
  var gridButton = document.querySelector('[data-ms-grid]');
  if (gridButton) gridButton.addEventListener('click', function () {
    var visible = gridButton.getAttribute('aria-pressed') !== 'true';
    document.getElementById('ms-grid-canvas').classList.toggle('show-grid', visible);
    gridButton.setAttribute('aria-pressed', String(visible));
    gridButton.textContent = visible ? '隐藏栅格' : '显示栅格';
  });
  var stage = document.querySelector('[data-mx-motion]');
  if (!stage) return;
  var button = stage.querySelector('[data-mx-play]');
  var status = stage.querySelector('[data-mx-time]');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  var timer;
  function stop() {
    clearTimeout(timer);
    stage.classList.remove('is-playing');
    button.textContent = '重新播放 ↗';
    button.setAttribute('aria-label', '重新播放 12 秒品牌动效');
    status.textContent = '12 秒 · 播放完毕';
  }
  button.addEventListener('click', function () {
    if (stage.classList.contains('is-playing')) {
      stop();
      status.textContent = '已停止 · 可重新播放';
      return;
    }
    if (reduced.matches) {
      status.textContent = '已按减少动态效果设置显示静态画面';
      return;
    }
    stage.classList.add('is-playing');
    button.textContent = '停止播放 □';
    button.setAttribute('aria-label', '停止播放品牌动效');
    status.textContent = '播放中 · 12 秒';
    timer = setTimeout(stop, 12000);
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden && stage.classList.contains('is-playing')) stop();
  });
})();
