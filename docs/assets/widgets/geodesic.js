// geodesic: Phi_5 along the isodual geodesic from D4 through M* to A2 (x) A2 (paper, Figure 1).
// Data: numerics/geodesic_phi5.txt of the certificate repository (66 points, numerical). The three
// marked values are exact. Config: {"data": "url of geodesic_phi5.json"}
import { svg, html, fmt } from "./common.js";

const MARKS = [
  { s: 0, y: 3 * (36 * Math.SQRT2 / 35) ** 2, name: "D₄", exact: "3(36√2/35)² ≈ 6.348" },
  { s: Math.log(1.2), y: 2 ** 16 / (3 ** 4 * 5 ** 3), name: "M*", exact: "2¹⁶/(3⁴·5³) ≈ 6.4727" },
  { s: Math.log(2), y: 16 / 3, name: "A₂⊗A₂", exact: "16/3 ≈ 5.333" },
];

export default async function geodesic(el, cfg) {
  el.classList.add("w-geodesic");
  const res = await fetch(new URL(cfg.data || "../data/geodesic_phi5.json", import.meta.url));
  const pts = (await res.json()).points;
  const W = 640, H = 340, m = { l: 48, r: 16, t: 16, b: 42 };
  const x0 = pts[0][0], x1 = pts[pts.length - 1][0], y0 = 4.0, y1 = 6.75;
  const X = (s) => m.l + ((s - x0) / (x1 - x0)) * (W - m.l - m.r);
  const Y = (v) => H - m.b - ((v - y0) / (y1 - y0)) * (H - m.t - m.b);
  const box = svg("svg", { viewBox: `0 0 ${W} ${H}`, class: "wsvg wide", role: "img",
    "aria-label": "Phi_5 along the geodesic from D4 through M* to A2 tensor A2" });
  el.appendChild(box);
  // axes and ticks
  svg("line", { x1: m.l, y1: H - m.b, x2: W - m.r, y2: H - m.b, class: "axis" }, box);
  svg("line", { x1: m.l, y1: m.t, x2: m.l, y2: H - m.b, class: "axis" }, box);
  for (let v = 4; v <= 6.5; v += 0.5) {
    svg("line", { x1: m.l - 4, y1: Y(v), x2: m.l, y2: Y(v), class: "axis" }, box);
    svg("text", { x: m.l - 7, y: Y(v) + 4, class: "tick", "text-anchor": "end" }, box).textContent = v;
  }
  for (let s = -0.2; s <= 0.9; s += 0.2) {
    const sx = Math.round(s * 10) / 10;
    svg("line", { x1: X(sx), y1: H - m.b, x2: X(sx), y2: H - m.b + 4, class: "axis" }, box);
    svg("text", { x: X(sx), y: H - m.b + 16, class: "tick", "text-anchor": "middle" }, box).textContent = sx;
  }
  svg("text", { x: (W + m.l) / 2, y: H - 6, class: "tick", "text-anchor": "middle" }, box).textContent = "distance from D₄ along the geodesic";
  svg("text", { x: 14, y: (H - m.b) / 2, class: "tick", transform: `rotate(-90 14 ${(H - m.b) / 2})`, "text-anchor": "middle" }, box).textContent = "Φ₅";
  // the line Phi_5 = 6 = eta_5
  svg("line", { x1: m.l, y1: Y(6), x2: W - m.r, y2: Y(6), class: "dash" }, box);
  svg("text", { x: W - m.r - 4, y: Y(6) - 5, class: "tick", "text-anchor": "end" }, box).textContent = "6 = η₅";
  // the curve
  svg("polyline", { points: pts.map((p) => `${X(p[0])},${Y(p[1])}`).join(" "), class: "curve" }, box);
  for (const k of MARKS) {
    svg("circle", { cx: X(k.s), cy: Y(k.y), r: 5, class: "mark" }, box);
    svg("text", { x: X(k.s) + (k.name === "M*" ? 0 : 8), y: Y(k.y) - 10, class: "mlbl", "text-anchor": k.name === "M*" ? "middle" : "start" }, box).textContent = k.name;
  }
  // hover / touch readout
  const cur = svg("line", { y1: m.t, y2: H - m.b, class: "cursor", visibility: "hidden" }, box);
  const dot = svg("circle", { r: 4, class: "hdot", visibility: "hidden" }, box);
  const out = html("div", { class: "wreadout" }, el);
  const idle = "Move over the curve (or touch it) to read off values. The curve is numerical; the three marked values are exact.";
  out.textContent = idle;
  function show(ev) {
    const pt = box.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
    const q = pt.matrixTransform(box.getScreenCTM().inverse());
    const s = x0 + ((q.x - m.l) / (W - m.l - m.r)) * (x1 - x0);
    const mk = MARKS.find((k) => Math.abs(X(k.s) - q.x) < 8);
    if (mk) {
      cur.setAttribute("x1", X(mk.s)); cur.setAttribute("x2", X(mk.s));
      dot.setAttribute("cx", X(mk.s)); dot.setAttribute("cy", Y(mk.y));
      out.innerHTML = `<b>${mk.name}</b> at distance ${fmt(mk.s, 4)}: Φ₅ = ${mk.exact} (exact).`;
    } else {
      let best = pts[0];
      for (const p of pts) if (Math.abs(p[0] - s) < Math.abs(best[0] - s)) best = p;
      cur.setAttribute("x1", X(best[0])); cur.setAttribute("x2", X(best[0]));
      dot.setAttribute("cx", X(best[0])); dot.setAttribute("cy", Y(best[1]));
      out.innerHTML = `distance ${fmt(best[0], 4)}: Φ₅ ≈ ${best[1].toFixed(5)} (numerical; η of the 4D lattice ≈ ${best[3].toFixed(4)})`;
    }
    cur.setAttribute("visibility", "visible"); dot.setAttribute("visibility", "visible");
  }
  box.addEventListener("pointermove", show);
  box.addEventListener("pointerdown", show);
  box.addEventListener("pointerleave", () => { cur.setAttribute("visibility", "hidden"); dot.setAttribute("visibility", "hidden"); out.textContent = idle; });
}
