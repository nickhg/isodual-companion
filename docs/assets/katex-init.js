// Render the maths that pymdownx.arithmatex (generic mode) leaves in <span|div class="arithmatex">.
// Uses the vendored KaTeX only; no CDN. Re-runs on every page change under Material's instant loading.
(function () {
  function render(root) {
    root.querySelectorAll(".arithmatex").forEach(function (el) {
      if (el.dataset.katexDone) return;
      var tex = el.textContent.trim(), display = el.tagName === "DIV";
      if (tex.startsWith("\\(") || tex.startsWith("\\[")) tex = tex.slice(2, -2);
      try { katex.render(tex, el, { displayMode: display, throwOnError: false }); el.dataset.katexDone = "1"; }
      catch (e) { console.warn("KaTeX:", e); }
    });
  }
  function hook() {
    if (window.document$) document$.subscribe(function () { render(document.body); });
    else render(document.body);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", hook); else hook();
})();
