(function(){
  'use strict';
  var root=document.querySelector('.visual-flow');
  if(!root)return;
  var cards=Array.from(root.querySelectorAll('.vf-card'));
  var stories=Array.from(root.querySelectorAll('.vf-story'));
  var dots=Array.from(root.querySelectorAll('[data-select]'));
  var stage=root.querySelector('.vf-stage'),current=0,start=null,suppressClick=false;
  var timer=0,hovered=false,visible=true;
  var reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  function schedule(){
    clearTimeout(timer);
    if(!reduced.matches&&!document.hidden&&visible&&!hovered&&!start&&!root.contains(document.activeElement)){
      timer=setTimeout(function(){select(current+1,true);},5500);
    }
  }
  function select(index,automatic){
    current=(index+cards.length)%cards.length;
    cards.forEach(function(card,i){
      var distance=(i-current+cards.length)%cards.length;
      if(distance>cards.length/2)distance-=cards.length;
      card.dataset.position=distance;
      card.tabIndex=Math.abs(distance)<2?0:-1;
      card.setAttribute('aria-hidden',String(Math.abs(distance)>=2));
      card.setAttribute('aria-label',(distance===0?'查看':'选择')+card.dataset.name+'项目');
      stories[i].classList.toggle('is-active',i===current);
      stories[i].inert=i!==current;
      stories[i].setAttribute('aria-hidden',String(i!==current));
      dots[i].setAttribute('aria-current',String(i===current));
    });
    if(!automatic)root.querySelector('.vf-status').textContent=cards[current].dataset.name+'，'+(current+1)+' / '+cards.length;
    schedule();
  }
  cards.forEach(function(card,i){card.addEventListener('click',function(event){
    if(suppressClick){event.preventDefault();suppressClick=false;return;}
    if(i!==current){event.preventDefault();select(i);}
  });card.addEventListener('dragstart',function(event){event.preventDefault();});});
  dots.forEach(function(dot,i){dot.addEventListener('click',function(){select(i);});});
  root.addEventListener('keydown',function(event){
    if(event.key==='ArrowLeft'||event.key==='ArrowRight'){
      event.preventDefault();select(current+(event.key==='ArrowRight'?1:-1));dots[current].focus();
    }
  });
  stage.addEventListener('pointerdown',function(event){if(!event.isPrimary||event.button!==0)return;suppressClick=false;start={x:event.clientX,y:event.clientY,id:event.pointerId};schedule();});
  window.addEventListener('pointerup',function(event){
    if(!start||start.id!==event.pointerId)return;
    var dx=event.clientX-start.x,dy=event.clientY-start.y;start=null;
    if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.3){suppressClick=true;select(current+(dx<0?1:-1));}
    schedule();
  });
  window.addEventListener('pointercancel',function(){start=null;schedule();});
  var wheelAt=0;
  stage.addEventListener('wheel',function(event){
    if(Math.abs(event.deltaX)<=Math.abs(event.deltaY)||Math.abs(event.deltaX)<8)return;
    event.preventDefault();var now=Date.now();if(now-wheelAt<700)return;wheelAt=now;select(current+(event.deltaX>0?1:-1));
  },{passive:false});
  root.addEventListener('pointerenter',function(event){if(event.pointerType==='mouse'){hovered=true;schedule();}});
  root.addEventListener('pointerleave',function(event){if(event.pointerType==='mouse'){hovered=false;schedule();}});
  root.addEventListener('focusin',schedule);
  root.addEventListener('focusout',function(){setTimeout(schedule,0);});
  document.addEventListener('visibilitychange',schedule);
  reduced.addEventListener('change',schedule);
  new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;schedule();},{threshold:.15}).observe(root);
  window.addEventListener('pagehide',function(){clearTimeout(timer);});
  window.addEventListener('pageshow',schedule);
  schedule();
})();
