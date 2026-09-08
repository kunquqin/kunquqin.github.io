(function () {
  'use strict';
  // A viewing convenience, not authentication or access control.
  if (new URLSearchParams(location.search).get('preview') !== '1') return;
  document.querySelectorAll('.role-switcher[hidden]').forEach(function (nav) { nav.hidden = false; });
})();
