// bnb2d: a miniature of the paper's branch and bound, in dimension 2, certifying eta_2 <= 2/sqrt3.
// Coordinates as in Appendix C, restricted to n = 2: y = log G_1 = log |b1|^2 (determinant 1) and the
// Gram-Schmidt coefficient mu = mu_10 in [0, 1/2]. Leaves:
//   (D) no Psi-minimal basis in the box: b2 is strictly shorter than b1 everywhere in it;
//   (A) the bound Psi^2 = e^y is below the threshold 2/sqrt3 everywhere in it;
//   (B) the box lies in a small ball (metric d) around the hexagonal lattice;
//   (C) collected: the box got too small without closing (only with a threshold below the truth).
// ILLUSTRATION ONLY: floating point with an explicit safety margin, not interval arithmetic.
import { svg, html, button, fmt } from "./common.js";

const T = Math.log(2 / Math.sqrt(3));      // log of 2/sqrt3, the true value of eta_2
const TLOW = Math.log(1.15);               // a threshold below the truth, to see boxes get collected
const WMIN = 0.004;                        // boxes narrower than this in both coordinates are collected
const YHI = Math.log(4 / Math.PI);         // Minkowski: |b1|^2 <= 4/pi for a shortest b1 at determinant 1
const YLO = -0.4;                          // below this, e^y < 2/sqrt3 trivially
const EPS = 1e-9, RHO = 0.02;              // safety margin; radius of the ball around the hexagonal lattice

// Gram matrix at determinant 1 from (y, mu): r0 = e^y, r1 = e^-y
const gramOf = (y, m) => { const r0 = Math.exp(y), r1 = 1 / r0; return [r0, m * r0, m * m * r0 + r1]; };
const G0 = gramOf(T, 0.5);
function dist(y, m) { // affine-invariant distance d(G, G0) for 2x2 matrices of determinant 1
  const [a, b, c] = gramOf(y, m), [p, q, s] = G0;
  // G0^{-1} G has eigenvalues l, 1/l with l + 1/l = tr(G0^{-1} G)
  const tr = (s * a - 2 * q * b + p * c);           // det G0 = 1
  const l = (tr + Math.sqrt(Math.max(0, tr * tr - 4))) / 2;
  return Math.SQRT2 * Math.log(l);
}
function classify(bx, thr) {
  if (bx.y1 < thr - EPS) return "A";
  if (1 - bx.m1 * bx.m1 - Math.exp(-2 * bx.y0) > EPS) return "D";
  const corners = [[bx.y0, bx.m0], [bx.y0, bx.m1], [bx.y1, bx.m0], [bx.y1, bx.m1]];
  // the ball lemma bounds eta by 2/sqrt3, so it can close boxes only for the true threshold
  if (thr === T && Math.max(...corners.map(([y, m]) => dist(y, m))) <= RHO * 0.9) return "B";
  if (bx.y1 - bx.y0 < WMIN && bx.m1 - bx.m0 < WMIN) return "C";
  return null;
}

export default function bnb2d(el) {
  el.classList.add("w-bnb2d");
  const W = 560, H = 440, mg = { l: 52, r: 14, t: 12, b: 44 };
  const X = (m) => mg.l + (m / 0.5) * (W - mg.l - mg.r);
  const Y = (y) => H - mg.b - ((y - YLO) / (YHI - YLO)) * (H - mg.t - mg.b);
  const bar = html("div", { class: "wbar" }, el);
  const bStep = button(bar, "Step", () => { stop(); step(1); });
  const bRun = button(bar, "Run", () => (timer ? stop() : run()));
  button(bar, "Reset", () => { stop(); reset(); });
  const sp = html("label", { class: "wcheck" }, bar); sp.append("speed ");
  const speed = html("input", { type: "range", min: 0, max: 6, step: 1, value: 0 }, sp);
  const ts = html("select", { "aria-label": "threshold" }, bar);
  html("option", { value: "t" }, ts, "threshold 2/√3 (the truth)");
  html("option", { value: "l" }, ts, "threshold 1.15 (too low)");
  ts.addEventListener("change", () => { stop(); reset(); });
  const lab = html("label", { class: "wcheck" }, bar);
  const cb = html("input", { type: "checkbox" }, lab); cb.checked = true; lab.append(" show the curves");

  const box = svg("svg", { viewBox: `0 0 ${W} ${H}`, class: "wsvg wide", role: "img", "aria-label": "Branch and bound on the root box" });
  el.appendChild(box);
  const gBoxes = svg("g", {}, box), gCurves = svg("g", { class: "curves" }, box), gAxes = svg("g", {}, box);
  const out = html("div", { class: "wreadout" }, el);
  cb.addEventListener("change", () => gCurves.setAttribute("visibility", cb.checked ? "visible" : "hidden"));

  // axes
  svg("rect", { x: X(0), y: Y(YHI), width: X(0.5) - X(0), height: Y(YLO) - Y(YHI), class: "rootbox" }, gAxes);
  for (const m of [0, 0.1, 0.2, 0.3, 0.4, 0.5])
    svg("text", { x: X(m), y: H - mg.b + 16, class: "tick", "text-anchor": "middle" }, gAxes).textContent = m;
  for (const y of [-0.4, -0.2, 0, 0.2])
    svg("text", { x: mg.l - 6, y: Y(y) + 4, class: "tick", "text-anchor": "end" }, gAxes).textContent = y;
  svg("text", { x: (W + mg.l) / 2, y: H - 8, class: "tick", "text-anchor": "middle" }, gAxes).textContent = "μ (Gram–Schmidt coefficient of b₂ on b₁)";
  svg("text", { x: 14, y: H / 2, class: "tick", transform: `rotate(-90 14 ${H / 2})`, "text-anchor": "middle" }, gAxes).textContent = "y = log |b₁|²";
  // the two curves: the threshold line y = T, and the edge of the Psi-minimal region y = -log(1 - mu^2)/2
  svg("line", { x1: X(0), x2: X(0.5), y1: Y(T), y2: Y(T), class: "dash" }, gCurves);
  svg("text", { x: X(0.01), y: Y(T) - 5, class: "tick" }, gCurves).textContent = "Ψ² = 2/√3";
  const pts = []; for (let i = 0; i <= 50; i++) { const m = i / 100; pts.push(`${X(m)},${Y(-0.5 * Math.log(1 - m * m))}`); }
  svg("polyline", { points: pts.join(" "), class: "curve thin" }, gCurves);
  svg("text", { x: X(0.18), y: Y(-0.5 * Math.log(1 - 0.0324)) + 16, class: "tick" }, gCurves).textContent = "|b₂| = |b₁|";
  svg("circle", { cx: X(0.5), cy: Y(T), r: 4, class: "mark" }, gCurves);
  svg("text", { x: X(0.5) - 6, y: Y(T) - 8, class: "mlbl", "text-anchor": "end" }, gCurves).textContent = "hexagonal";

  let queue, count, timer = null, nodes;
  function reset() {
    gBoxes.innerHTML = "";
    queue = [{ y0: YLO, y1: YHI, m0: 0, m1: 0.5, depth: 0 }];
    count = { A: 0, D: 0, B: 0, C: 0, split: 0 }; nodes = new Map();
    drawBox(queue[0], null); report();
  }
  function drawBox(bx, type) {
    let r = nodes.get(bx);
    if (!r) { r = svg("rect", { x: X(bx.m0), y: Y(bx.y1), width: X(bx.m1) - X(bx.m0), height: Y(bx.y0) - Y(bx.y1) }, gBoxes); nodes.set(bx, r); }
    r.setAttribute("class", type ? "leaf leaf-" + type : "open");
  }
  function step(k) {
    for (let i = 0; i < k && queue.length; i++) {
      const bx = queue.shift(), t = classify(bx, ts.value === "t" ? T : TLOW);
      if (t) { count[t]++; drawBox(bx, t); continue; }
      nodes.get(bx).remove(); nodes.delete(bx); count.split++;
      // bisect the widest coordinate, y widths counted half (as in the paper)
      const wy = (bx.y1 - bx.y0) / 2, wm = bx.m1 - bx.m0, d = bx.depth + 1;
      let kids;
      if (wy >= wm) { const c = 0.5 * (bx.y0 + bx.y1); kids = [{ ...bx, y1: c, depth: d }, { ...bx, y0: c, depth: d }]; }
      else { const c = 0.5 * (bx.m0 + bx.m1); kids = [{ ...bx, m1: c, depth: d }, { ...bx, m0: c, depth: d }]; }
      for (const kb of kids) { queue.push(kb); drawBox(kb, null); }
    }
    report();
    if (!queue.length) stop();
  }
  function report() {
    const done = !queue.length;
    out.innerHTML =
      `<span class="chip leaf-D">(D) ${count.D}</span> <span class="chip leaf-A">(A) ${count.A}</span> ` +
      `<span class="chip leaf-B">(B) ${count.B}</span> <span class="chip leaf-C">collected ${count.C}</span> <span class="chip open">open ${queue.length}</span> &nbsp;splits ${count.split}` +
      (!done ? "" : count.C ? `<p>Finished, but ${count.C} boxes near the hexagonal lattice could not be closed: they contain lattices with η above 1.15. ` +
        `In the real proof such boxes are <i>collected</i> and handed to a second stage.</p>` :
        `<p class="ok">Every box is closed: every lattice of determinant 1 has η ≤ 2/√3, with equality only inside the (B) ball, at the hexagonal lattice. ` +
        `${count.A + count.B + count.D} leaves.</p>`);
  }
  function run() {
    bRun.textContent = "Pause";
    const tick = () => { step(2 ** +speed.value); if (queue.length) timer = setTimeout(tick, 400 / (1 + +speed.value)); };
    timer = setTimeout(tick, 0);
  }
  function stop() { clearTimeout(timer); timer = null; bRun.textContent = "Run"; }
  reset();
}
