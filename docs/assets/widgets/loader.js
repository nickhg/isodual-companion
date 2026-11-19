// Widget loader. A page embeds <div class="widget" data-widget="name" data-config='{...}'></div>;
// this imports ./name.js and calls its default export (element, config). Runs again after each
// instant-navigation page change. Widget state lives in memory only.
const base = new URL(".", import.meta.url);

async function mount(el) {
  if (el.dataset.mounted) return;
  el.dataset.mounted = "1";
  let cfg = {};
  try { cfg = JSON.parse(el.dataset.config || "{}"); } catch (e) { console.warn("bad widget config", e); }
  try {
    const mod = await import(new URL(el.dataset.widget + ".js", base).href);
    await mod.default(el, cfg);
  } catch (e) {
    console.error("widget " + el.dataset.widget + " failed", e);
    el.innerHTML = '<p class="widget-error">This interactive figure could not be loaded (' + e.message + ').</p>';
  }
}

function scan() { document.querySelectorAll(".widget[data-widget]").forEach(mount); }

function hook() {
  if (window.document$) window.document$.subscribe(scan); else scan();
}
// Material's bundle defines document$; wait briefly for it.
let tries = 0;
(function wait() {
  if (window.document$ || tries++ > 40) hook(); else setTimeout(wait, 25);
})();
