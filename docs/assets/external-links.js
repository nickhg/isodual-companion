// Open links that leave the site in a new tab, so that the reader keeps their place on the page.
// Runs again after each instant-navigation page change.
(function () {
  function mark() {
    document.querySelectorAll(".md-content a[href]").forEach(function (a) {
      if (a.host && a.host !== location.host) { a.target = "_blank"; a.rel = "noopener"; }
    });
  }
  function hook() { if (window.document$) window.document$.subscribe(mark); else mark(); }
  var tries = 0;
  (function wait() { if (window.document$ || tries++ > 40) hook(); else setTimeout(wait, 25); })();
})();
