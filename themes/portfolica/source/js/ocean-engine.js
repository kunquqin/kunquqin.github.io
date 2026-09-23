(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var root = document.querySelector('.oe-case');
    if (!root) return;
    var media = window.matchMedia('(min-width:901px) and (min-height:741px) and (prefers-reduced-motion:no-preference)');
    var scenes = Array.from(root.querySelectorAll('.oe-campaign')).map(function (el) {
      return {el:el,bg:el.querySelector('.oe-bg'),shade:el.querySelector('.oe-shade'),copy:el.querySelector('.oe-copy'),phone:el.querySelector('.oe-device'),title:el.querySelector('.oe-scene-title'),bar:el.querySelector('.oe-progress')};
    });
    var queued = false;
    var clamp = function (x) { return Math.max(0, Math.min(1, x)); };
    var ease = function (x) { x=clamp(x); return x*x*(3-2*x); };
    function render() {
      queued = false;
      if (!media.matches) return;
      var navHeight = document.querySelector('.portfolio-header').getBoundingClientRect().height;
      scenes.forEach(function (s) {
        var rect=s.el.getBoundingClientRect();
        var p=clamp((navHeight-rect.top)/(rect.height-(window.innerHeight-navHeight)));
        var fade=ease((p-.09)/.46), phone=ease((p-.16)/.49), copy=ease((p-.24)/.4);
        s.bg.style.filter='grayscale('+fade+') blur('+(fade*9)+'px)';
        s.shade.style.opacity=fade;
        s.copy.style.opacity=copy;
        s.copy.style.transform='translateY('+((1-copy)*30)+'px)';
        s.phone.style.opacity=phone;
        s.phone.style.transform='translateY('+((1-phone)*320)+'px)';
        s.title.style.opacity=1-ease(p/.25);
        s.bar.style.transform='scaleX('+p+')';
      });
    }
    function schedule() { if(!queued) {queued=true;requestAnimationFrame(render);} }
    function configure() {
      root.classList.toggle('oe-motion',media.matches);
      scenes.forEach(function(s){[s.bg,s.shade,s.copy,s.phone,s.title,s.bar].forEach(function(el){el.removeAttribute('style');});});
      schedule();
    }
    media.addEventListener('change',configure);
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    configure();
  });
})();
