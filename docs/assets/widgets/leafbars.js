// leafbars: the leaf counts of stage 2 of the proof of eta_5 = 6, by type (paper, Appendix E).
import { svg, html } from "./common.js";

const LEAVES = [
  { t: "N", n: 1563150108, what: "v is not shortest: an explicit shorter vector" },
  { t: "F", n: 1735212582, what: "one flag (or one split) gives η < 6" },
  { t: "P", n: 5398164149, what: "a weighted mix of flag bounds gives η < 6" },
  { t: "B", n: 47437, what: "inside the ball around D₅ or D₅* (Theorem 13)" },
];
export default function leafbars(el) {
  el.classList.add("w-leafbars");
  const W = 640, row = 46, H = LEAVES.length * row + 20, L = 40, max = 5.5e9;
  const box = svg("svg", { viewBox: `0 0 ${W} ${H}`, class: "wsvg wide", role: "img", "aria-label": "Stage 2 leaf counts by type" });
  el.appendChild(box);
  LEAVES.forEach((x, i) => {
    const y = 10 + i * row, w = Math.max(1.5, ((W - L - 20) * x.n) / max);
    svg("text", { x: 8, y: y + 20, class: "mlbl" }, box).textContent = `(${x.t})`;
    svg("rect", { x: L, y, width: w, height: 26, class: "lbar lbar-" + x.t, rx: 2 }, box);
    const label = x.n.toLocaleString("en-US") + (x.t === "B" ? "  (too few to see at this scale)" : "");
    const inside = w > 300;
    svg("text", { x: inside ? L + 8 : L + w + 8, y: y + 18, class: "tick" + (inside ? " inv" : "") }, box).textContent = label;
    svg("text", { x: L, y: y + 40, class: "tick faint" }, box).textContent = x.what;
  });
  html("p", { class: "note" }, el, "Total 8,696,574,276 leaves, every one re-proved by the checker check_lift.");
}
