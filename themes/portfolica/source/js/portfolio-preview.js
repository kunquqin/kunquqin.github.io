(function () {
  'use strict';
  // A viewing convenience, not authentication or access control.
  if (new URLSearchParams(location.search).get('preview') !== '1') return;
  document.querySelectorAll('.role-switcher[hidden]').forEach(function (nav) { nav.hidden = false; });
  document.querySelectorAll('a[href]').forEach(function (link) {
    if (link.hasAttribute('data-role-switch') || link.getAttribute('href').startsWith('#')) return;
    var url = new URL(link.href, location.href);
    if (url.origin === location.origin && url.pathname.startsWith('/ai-native-builder/')) {
      url.searchParams.set('preview', '1');
      link.href = url.pathname + url.search + url.hash;
    }
  });
})();
