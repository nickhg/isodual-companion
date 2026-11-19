// staircase: bar charts of the Psi-minimal Gram-Schmidt profiles r_i of root lattices (paper, Table 2).
// Config: {"lattices": ["D4", "D5", "E6", "E7", "E8"]}
import { svg, html } from "./common.js";

const F = (p, q) => ({ v: p / q, s: q === 1 ? String(p) : `${p}/${q}` });
const BASE = [F(2, 1), F(3, 2), F(4, 3)];
export const PROFILES = {
  A2: { eta: "2/√3", r: [F(2, 1), F(3, 2)] },
  A3: { eta: "3/2", r: BASE },
  D4: { eta: "3", r: [...BASE, F(1, 1)] },
  D5: { eta: "6", r: [...BASE, F(1, 1), F(1, 1)] },
  "D5*": { eta: "6", label: "D₅* (scaled by 2)", r: [F(2, 1), F(2, 1), F(3, 2), F(4, 3), F(1, 1)] },
  E6: { eta: "128√3/9", r: [...BASE, F(1, 1), F(1, 1), F(3, 4)] },
  E7: { eta: "144", r: [...BASE, F(1, 1), F(1, 1), F(3, 4), F(2, 3)] },
  E8: { eta: "2304", r: [...BASE, F(1, 1), F(1, 1), F(3, 4), F(2, 3), F(1, 2)] },
};
const SUB = "₀₁₂₃₄₅₆₇₈₉";
const sub = (s) => s.replace(/\d/g, (d) => SUB[+d]);

export default function staircase(el, cfg) {
  el.classList.add("w-staircase");
  const grid = html("div", { class: "stairgrid" }, el);
  for (const name of cfg.lattices || ["D4", "D5", "E6", "E7", "E8"]) {
    const P = PROFILES[name]; if (!P) continue;
    const cell = html("figure", { class: "stairfig" }, grid);
    const n = P.r.length, bw = 26, gap = 6, H = 120, T = 18, W = n * (bw + gap) + gap;
    const box = svg("svg", { viewBox: `0 ${-T} ${W} ${H + 34 + T}`, class: "wstair", width: W * 1.4, role: "img",
      "aria-label": `Gram-Schmidt profile of ${name}: ${P.r.map((x) => x.s).join(", ")}` });
    cell.appendChild(box);
    P.r.forEach((x, i) => {
      const h = (x.v / 2) * H, xx = gap + i * (bw + gap);
      svg("rect", { x: xx, y: H - h, width: bw, height: h, class: "sbarrect", rx: 2 }, box);
      svg("text", { x: xx + bw / 2, y: H - h - 4, class: "tick", "text-anchor": "middle" }, box).textContent = x.s;
      svg("text", { x: xx + bw / 2, y: H + 14, class: "tick faint", "text-anchor": "middle" }, box).textContent = "r" + sub(String(i + 1));
    });
    svg("line", { x1: 0, y1: H, x2: W, y2: H, class: "axis" }, box);
    html("figcaption", {}, cell).innerHTML = `<b>${P.label || sub(name)}</b> &nbsp;η = ${P.eta}`;
  }
}
