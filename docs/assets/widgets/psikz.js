// psikz: the 2007 example where the Psi-minimal basis does not start with a shortest vector.
// The lattice has the lower-triangular basis rows (X, 0, 0), (X/2, sqrt(3) Y/2, 0), (0, 0, 1): a stretched
// hexagonal plane with a unit vector at right angles to it. Drag the point (X, Y). The readout compares the
// three ways of placing the unit vector e = (0,0,1) in the order of the basis, and checks the true minimum
// by the exact search of lattice3d.
// Config: {} (none)
import { svg, html, fmt, gram, prefixDets } from "./common.js";
import { bestBasis } from "./lattice3d.js";

const S3 = Math.sqrt(3), K = 2 / S3;
const X0 = 0.85, X1 = 1.25, Y0 = 0.85, Y1 = 1.35;     // the window of the (X, Y) plane

export default function psikz(el) {
  el.classList.add("w-psikz");
  let X = 1.03, Y = 1.08;
  const W = 300, H = 300, pad = 40;
  const px = (x) => pad + ((x - X0) / (X1 - X0)) * (W - 2 * pad);
  const py = (y) => H - pad - ((y - Y0) / (Y1 - Y0)) * (H - 2 * pad);
  const ux = (p) => X0 + ((p - pad) / (W - 2 * pad)) * (X1 - X0);
  const uy = (p) => Y0 + ((H - pad - p) / (H - 2 * pad)) * (Y1 - Y0);

  const wrap = html("div", { class: "psikz-wrap" }, el);
  const box = svg("svg", { viewBox: `0 0 ${W} ${H}`, class: "wsvg small", role: "img",
    "aria-label": "The (X, Y) plane with the region where the Psi-minimal basis starts with a longer vector" });
  wrap.appendChild(box);
  const out = html("div", { class: "wreadout" }, wrap);

  // the region Y > X > 1, XY < 2/sqrt3, as a polygon along the curve
  const pts = [];
  const xa = 1, xb = Math.sqrt(K);                      // the curve Y = K/X meets Y = X at X = sqrt(K)
  for (let i = 0; i <= 40; i++) { const x = xa + (xb - xa) * i / 40; pts.push([x, K / x]); }
  pts.push([xb, xb], [1, 1]);
  svg("polygon", { points: pts.map(([x, y]) => `${px(x)},${py(y)}`).join(" "), fill: "#4daf4a", opacity: 0.3 }, box);
  // axes, the lines X = 1, Y = X and the curve XY = 2/sqrt3
  svg("rect", { x: pad, y: pad, width: W - 2 * pad, height: H - 2 * pad, fill: "none", class: "axis" }, box);
  svg("line", { x1: px(1), y1: py(Y0), x2: px(1), y2: py(Y1), class: "axis", "stroke-dasharray": "3 3" }, box);
  svg("line", { x1: px(Math.max(X0, Y0)), y1: py(Math.max(X0, Y0)), x2: px(Math.min(X1, Y1)), y2: py(Math.min(X1, Y1)),
    class: "axis", "stroke-dasharray": "3 3" }, box);
  const cv = [];
  for (let i = 0; i <= 60; i++) { const x = X0 + (X1 - X0) * i / 60, y = K / x; if (y >= Y0 && y <= Y1) cv.push(`${px(x)},${py(y)}`); }
  svg("polyline", { points: cv.join(" "), fill: "none", class: "axis" }, box);
  const lab = (x, y, s, a = "middle") => { const t = svg("text", { x, y, class: "tick", "text-anchor": a }, box); t.textContent = s; };
  lab(W / 2, H - 6, "X");
  lab(8, H / 2 + 4, "Y");
  for (const v of [0.9, 1, 1.1, 1.2]) { lab(px(v), H - pad + 14, String(v)); lab(pad - 4, py(v) + 4, String(v), "end"); }
  lab(px(1.17), py(1.03), "XY = 2/√3", "start");
  lab(px(0.93), py(0.89), "Y = X", "start");
  const dot = svg("circle", { r: 7, class: "handle", fill: "#d6604d", "fill-opacity": 0.8, stroke: "#d6604d" }, box);

  function place(e) {
    const pt = box.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const q = pt.matrixTransform(box.getScreenCTM().inverse());
    X = Math.min(X1, Math.max(X0, ux(q.x))); Y = Math.min(Y1, Math.max(Y0, uy(q.y)));
    draw();
  }
  box.addEventListener("pointerdown", (e) => {
    e.preventDefault(); place(e);
    const up = () => { window.removeEventListener("pointermove", place); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", place); window.addEventListener("pointerup", up);
  });

  function draw() {
    dot.setAttribute("cx", px(X)); dot.setAttribute("cy", py(Y));
    const a = [X, 0, 0], b = [X / 2, S3 * Y / 2, 0], e = [0, 0, 1];
    const P = (B) => prefixDets(gram(B)).reduce((s, t) => s * t, 1);
    const orders = [
      { name: "e last (the 2007 basis)", B: [a, b, e] },
      { name: "e in the middle", B: [a, e, b] },
      { name: "e first (shortest vector first)", B: [e, a, b] },
    ].map((o) => ({ ...o, P: P(o.B) }));
    const pmin = Math.min(...orders.map((o) => o.P));
    const best = bestBasis([a, b, e]);
    const b1 = best.C[0], v = [0, 1, 2].map((j) => b1[0] * a[j] + b1[1] * b[j] + b1[2] * e[j]);
    const n1 = v[0] ** 2 + v[1] ** 2 + v[2] ** 2, lam = Math.min(1, X * X, X * X / 4 + 3 * Y * Y / 4);
    const inRegion = Y > X && X > 1 && X * Y < K;
    const m = (r) => `<tr>${r.map((x) => `<td>${fmt(x, 3)}</td>`).join("")}</tr>`;
    out.innerHTML =
      `<p>X = ${fmt(X, 3)}, Y = ${fmt(Y, 3)}. Basis rows, already lower triangular:</p>` +
      `<table class="wmatrix">${m(a)}${m(b)}${m(e)}</table>` +
      `<table><tr><th>order</th><th>Ψ²</th></tr>` +
      orders.map((o) => `<tr${Math.abs(o.P - pmin) < 1e-12 ? ' class="ok"' : ""}><td>${o.name}</td><td>${fmt(o.P, 4)}</td></tr>`).join("") +
      `</table>` +
      `<p>Exact search over all bases: Ψ²<sub>min</sub> = ${fmt(best.P, 4)}, with |b₁|² = ${fmt(n1, 4)}. ` +
      `The shortest vector has squared length ${fmt(lam, 4)}.</p>` +
      `<p class="${inRegion ? "ok" : ""}">${inRegion
        ? "Inside the green region: the best basis starts with a vector longer than the shortest one. A KZ basis puts e first, so it does not minimise Ψ."
        : n1 > lam + 1e-9 ? "The best basis does not start with a shortest vector here."
        : "Outside the green region: here the best basis does start with a shortest vector."}</p>`;
  }
  draw();
}
