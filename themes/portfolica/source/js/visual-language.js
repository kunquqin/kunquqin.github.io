(function () {
  'use strict';
  var control = document.querySelector('.visual-language');
  var data = document.getElementById('visual-translations');
  if (!control || !data) return;
  var dictionary = JSON.parse(data.textContent);
  var reverse = new Map(Object.keys(dictionary).map(function (key) { return [dictionary[key].trim(), key]; }));
  var records = new WeakMap();
  var initial = true;
  var attributes = ['aria-label', 'aria-roledescription', 'alt', 'title', 'placeholder', 'data-tooltip'];
  var language = document.documentElement.lang === 'en' ? 'en' : 'zh';
  var key = 'visual-portfolio-language';
  var portfolioHome = document.body.dataset.portfolioHome;
  var ignored = 'script,style,noscript,code,pre,.visual-language';

  // Preserve text nodes and their surrounding markup, event handlers and whitespace.
  function translated(value, record) {
    var trimmed = value.trim();
    if (!record || (value !== record.zh && value !== record.en)) {
      var original = Object.prototype.hasOwnProperty.call(dictionary, trimmed) ? trimmed : (!initial && reverse.get(trimmed));
      if (!original) return {zh:value, en:value};
      var leading = value.match(/^\s*/)[0], trailing = value.match(/\s*$/)[0];
      record = {zh: leading + original + trailing, en: leading + dictionary[original].trim() + trailing};
    }
    return record;
  }
  function text(node) {
    if (!node.parentElement || node.parentElement.closest(ignored)) return;
    var record = translated(node.nodeValue, records.get(node));
    if (!record) return;
    records.set(node, record);
    var value = record[language];
    if (node.nodeValue !== value) node.nodeValue = value;
  }
  function element(node) {
    if (node.closest(ignored)) return;
    var cache = records.get(node) || {};
    attributes.forEach(function (name) {
      if (!node.hasAttribute(name)) return;
      var value = node.getAttribute(name), record = translated(value, cache[name]);
      if (!record) return;
      cache[name] = record;
      if (value !== record[language]) node.setAttribute(name, record[language]);
    });
    records.set(node, cache);
  }
  function walk(root) {
    if (root.nodeType === Node.TEXT_NODE) { text(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE || root.closest(ignored)) return;
    element(root);
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        return node.nodeType === Node.ELEMENT_NODE && node.matches(ignored) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeType === Node.TEXT_NODE) text(node); else element(node);
    }
  }
  // Chinese large-number units need a corresponding value conversion.
  var metrics = document.querySelectorAll('.zstar-metrics strong');
  [[0, '100', 'B+'], [1, '230', 'K+']].forEach(function (item) {
    var metric = metrics[item[0]];
    if (!metric) return;
    records.set(metric.firstChild, {zh: metric.firstChild.nodeValue, en: item[1]});
    records.set(metric.querySelector('span').firstChild, {zh: metric.querySelector('span').textContent, en: item[2]});
  });
  var observer = new MutationObserver(function (changes) {
    observer.disconnect();
    changes.forEach(function (change) {
      if (change.type === 'characterData') text(change.target);
      else if (change.type === 'attributes') element(change.target);
      else change.addedNodes.forEach(walk);
    });
    observe();
  });
  function observe() {
    observer.observe(document.documentElement, {subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attributes});
  }
  function apply(next, persist) {
    language = next === 'en' ? 'en' : 'zh';
    observer.disconnect();
    document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
    walk(document.head.querySelector('title'));
    walk(document.body);
    control.querySelectorAll('button').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });
    if (persist) {
      try { localStorage.setItem(key, language); } catch (e) { /* URL remains a storage-free fallback. */ }
      var url = new URL(location.href);
      url.searchParams.set('lang', language);
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
    // Propagate language through scoped project, next-project and return links.
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      // Keep in-page anchors intact for existing chapter and smooth-scroll code.
      if (href.startsWith('#')) return;
      var url = new URL(href, location.href);
      if (url.origin !== location.origin || !portfolioHome || !url.pathname.startsWith(portfolioHome)) return;
      url.searchParams.set('lang', language);
      link.href = url.pathname + url.search + url.hash;
    });
    observe();
    document.dispatchEvent(new CustomEvent('visual-language-change', {detail:{language:language}}));
    requestAnimationFrame(function () {
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      window.dispatchEvent(new Event('resize'));
    });
  }
  control.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-language]');
    if (button) apply(button.dataset.language, true);
  });
  window.addEventListener('storage', function (event) { if (event.key === key) apply(event.newValue, false); });
  window.addEventListener('pageshow', function (event) {
    if (!event.persisted) return;
    try { apply(localStorage.getItem(key) || language, false); } catch (e) { apply(language, false); }
  });
  window.visualLanguage = {get:function(){return language;}, translate:function(value){return language === 'en' ? dictionary[value] || value : value;}};
  apply(language, false);
  initial = false;
  control.hidden = false;
})();
