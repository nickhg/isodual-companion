// lattice2d: a two-dimensional lattice with a draggable basis.
// Config: {"lattice": "hex" | "square" | "generic", "dual": true|false (show the dual toggle), "showDual": bool}
// The lattice is scaled to area 1, so Delta = 1 for every basis and eta(L) = lambda_1^2.
import { svg, html, button, fmt, dot, COLORS } from "./common.js";

const S3 = Math.sqrt(3);
const PRESETS = {
  hex: { name: "hexagonal (A₂)", g: [[1, 0], [0.5, S3 / 2]] },
  square: { name: "square (ℤ²)", g: [[1, 0], [0, 1]] },
  generic: { name: "a generic lattice", g: [[1, 0], [0.37, 1.18]] },
};

function normalise(g) { // scale so that the fundamental area is 1
  const a = Math.abs(g[0][0] * g[1][1] - g[0][1] * g[1][0]), s = 1 / Math.sqrt(a);
  return g.map((v) => v.map((x) => x * s));
}
const vec = (g, c) => [c[0] * g[0][0] + c[1] * g[1][0], c[0] * g[0][1] + c[1] * g[1][1]];

export default function lattice2d(el, cfg) {
  el.classList.add("w-lattice2d");
  if (!el.id) el.id = "w" + Math.random().toString(36).slice(2, 8);
  let key = cfg.lattice || "hex";
  let g = normalise(PRESETS[key].g);
  let c = [[2, 1], [1, 1]];            // integer coefficients of b1, b2 (a deliberately poor start)
  let showDual = !!cfg.showDual;
  const R = 3.3;                        // half-width of the view, in lattice units

  // --- controls -----------------------------------------------------------------------------------
  const bar = html("div", { class: "wbar" }, el);
  if (cfg.presets !== false) {
    const sel = html("select", { "aria-label": "lattice" }, bar);
    for (const k in PRESETS) {
      const o = html("option", { value: k }, sel, PRESETS[k].name);
      if (k === key) o.selected = true;
    }
    sel.addEventListener("change", () => { key = sel.value; g = normalise(PRESETS[key].g); c = [[2, 1], [1, 1]]; draw(); });
  }
  button(bar, "Best basis", () => { gauss(); draw(); }, "Lagrange–Gauss reduction: the exact 2D minimisation");
  button(bar, "Reset", () => { c = [[2, 1], [1, 1]]; draw(); });
  if (cfg.dual) {
    const lab = html("label", { class: "wcheck" }, bar);
    const cb = html("input", { type: "checkbox" }, lab);
    cb.checked = showDual;
    lab.appendChild(document.createTextNode(" show the dual lattice"));
    cb.addEventListener("change", () => { showDual = cb.checked; draw(); });
  }

  const box = svg("svg", { viewBox: `${-R} ${-R} ${2 * R} ${2 * R}`, class: "wsvg", role: "img",
    "aria-label": "A lattice with two basis vectors you can drag" });
  el.appendChild(box);
  const defs = svg("defs", {}, box);
  for (const [id, col] of [["a1", COLORS.b1], ["a2", COLORS.b2], ["ad", COLORS.dual]]) {
    const m = svg("marker", { id: el.id + id, viewBox: "0 0 10 10", refX: 8, refY: 5, markerWidth: 5, markerHeight: 5, orient: "auto-start-reverse" }, defs);
    svg("path", { d: "M0,0 L10,5 L0,10 z", fill: col }, m);
  }
  const layer = svg("g", { transform: "scale(1,-1)" }, box);   // y axis up
  const out = html("div", { class: "wreadout" }, el);

  // --- maths --------------------------------------------------------------------------------------
  function gauss() { // Lagrange-Gauss reduction of the current basis
    let [u, v] = c.map((x) => x.slice());
    const n = (k) => { const w = vec(g, k); return dot(w, w); };
    for (let it = 0; it < 50; it++) {
      if (n(u) > n(v)) [u, v] = [v, u];
      const m = Math.round(dot(vec(g, u), vec(g, v)) / n(u));
      if (m === 0) break;
      v = [v[0] - m * u[0], v[1] - m * u[1]];
    }
    if (n(u) > n(v)) [u, v] = [v, u];
    c = [u, v];
  }
  function lambda1() {
    let best = Infinity;
    for (let i = -6; i <= 6; i++) for (let j = -6; j <= 6; j++) {
      if (!i && !j) continue;
      const w = vec(g, [i, j]); best = Math.min(best, dot(w, w));
    }
    return best;
  }
  function snap(p) { // nearest nonzero lattice point to the plane point p
    const D = g[0][0] * g[1][1] - g[0][1] * g[1][0];
    const a = (p[0] * g[1][1] - p[1] * g[1][0]) / D, b = (-p[0] * g[0][1] + p[1] * g[0][0]) / D;
    let best = null, bd = Infinity;
    for (let i = Math.floor(a) - 1; i <= Math.ceil(a) + 1; i++) for (let j = Math.floor(b) - 1; j <= Math.ceil(b) + 1; j++) {
      if (!i && !j) continue;
      const w = vec(g, [i, j]), d = (w[0] - p[0]) ** 2 + (w[1] - p[1]) ** 2;
      if (d < bd) { bd = d; best = [i, j]; }
    }
    return best;
  }

  // --- drawing ------------------------------------------------------------------------------------
  function draw() {
    layer.innerHTML = "";
    // the fundamental parallelogram of the current basis
    const b1 = vec(g, c[0]), b2 = vec(g, c[1]);
    svg("polygon", { points: `0,0 ${b1} ${b1[0] + b2[0]},${b1[1] + b2[1]} ${b2}`, class: "cell" }, layer);
    // lattice points
    const N = 9;
    for (let i = -N; i <= N; i++) for (let j = -N; j <= N; j++) {
      const p = vec(g, [i, j]);
      if (Math.abs(p[0]) > R || Math.abs(p[1]) > R) continue;
      svg("circle", { cx: p[0], cy: p[1], r: 0.055, class: "pt" }, layer);
    }
    if (showDual) { // the dual lattice: generators d_i with d_i . g_j = delta_ij
      const D = g[0][0] * g[1][1] - g[0][1] * g[1][0];
      const gd = [[g[1][1] / D, -g[1][0] / D], [-g[0][1] / D, g[0][0] / D]];
      for (let i = -N; i <= N; i++) for (let j = -N; j <= N; j++) {
        const p = vec(gd, [i, j]);
        if (Math.abs(p[0]) > R || Math.abs(p[1]) > R) continue;
        svg("circle", { cx: p[0], cy: p[1], r: 0.08, class: "dpt" }, layer);
      }
    }
    arrow(b1, COLORS.b1, "a1", 0);
    arrow(b2, COLORS.b2, "a2", 1);
    readout(b1, b2);
  }
  function arrow(p, col, mk, idx) {
    svg("line", { x1: 0, y1: 0, x2: p[0], y2: p[1], stroke: col, "stroke-width": 0.045, "marker-end": `url(#${el.id + mk})` }, layer);
    const h = svg("circle", { cx: p[0], cy: p[1], r: 0.2, fill: col, "fill-opacity": 0.25, stroke: col, "stroke-width": 0.03, class: "handle" }, layer);
    const t = svg("text", { x: p[0] + 0.15, y: -p[1] - 0.15, transform: "scale(1,-1)", class: "lbl", fill: col }, layer);
    t.textContent = idx ? "b₂" : "b₁";
    h.addEventListener("pointerdown", (e) => startDrag(e, idx));
  }
  function startDrag(e, idx) {
    e.preventDefault();
    const move = (ev) => {
      const pt = box.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
      const q = pt.matrixTransform(box.getScreenCTM().inverse());
      const s = snap([q.x, -q.y]);
      if (s && (s[0] !== c[idx][0] || s[1] !== c[idx][1])) { c[idx] = s; draw(); }
    };
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", up);
  }
  function readout(b1, b2) {
    const idx = Math.abs(c[0][0] * c[1][1] - c[0][1] * c[1][0]);
    const n1 = dot(b1, b1), n2 = dot(b2, b2), m = dot(b1, b2);
    const G2 = n1 * n2 - m * m, l1 = lambda1();
    if (idx === 0) { out.innerHTML = "<p>b₁ and b₂ point the same way: they do not span the plane.</p>"; return; }
    if (idx !== 1) {
      out.innerHTML = `<p>These two vectors span a sublattice of index ${idx} (its area is ${idx}), so they are not a basis. ` +
        "Move one of them until the shaded cell contains no other lattice point.</p>";
      return;
    }
    const isMin = Math.abs(n1 - l1) < 1e-9;
    out.innerHTML =
      `<table><tr><td>|b₁|²</td><td>${fmt(n1)}</td><td>det Gram(b₁, b₂) = Δ</td><td>${fmt(G2)}</td></tr>` +
      `<tr><td>|b₂|²</td><td>${fmt(n2)}</td><td>Ψ² = |b₁|² · Δ</td><td>${fmt(n1 * G2)}</td></tr>` +
      `<tr><td>Ψ² / Δ<sup>3/2</sup></td><td>${fmt(n1 / Math.sqrt(G2))}</td><td>η(L) = λ₁² / √Δ</td><td>${fmt(l1)}</td></tr></table>` +
      `<p class="${isMin ? "ok" : ""}">${isMin ? "This basis is Ψ-minimal: b₁ is a shortest vector, so Ψ² / Δ<sup>3/2</sup> = η(L)."
        : "Not Ψ-minimal yet: there is a shorter choice of b₁. (Moving b₂ alone never changes Ψ² in two dimensions.)"}</p>`;
  }
  draw();
}
