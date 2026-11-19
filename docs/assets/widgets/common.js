// Shared helpers for the widgets: small linear algebra on Gram matrices, SVG creation, and controls.

export const SVGNS = "http://www.w3.org/2000/svg";
export function svg(tag, attrs = {}, parent = null) {
  const e = document.createElementNS(SVGNS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
}
export function html(tag, attrs = {}, parent = null, text = null) {
  const e = document.createElement(tag);
  for (const k in attrs) {
    if (k === "class") e.className = attrs[k]; else e.setAttribute(k, attrs[k]);
  }
  if (text !== null) e.textContent = text;
  if (parent) parent.appendChild(e);
  return e;
}
export function button(parent, label, onclick, title = "") {
  const b = html("button", { type: "button", class: "wbtn", title }, parent, label);
  b.addEventListener("click", onclick);
  return b;
}
export function fmt(x, d = 4) {
  if (!isFinite(x)) return "–";
  return Math.abs(x) < 1e-12 ? "0" : x.toFixed(d).replace(/\.?0+$/, (m) => (m.startsWith(".") ? "" : m));
}

// Vectors and matrices as plain arrays.
export const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
export const sub = (a, b) => a.map((x, i) => x - b[i]);
export const add = (a, b) => a.map((x, i) => x + b[i]);
export const scale = (a, c) => a.map((x) => x * c);
export function matvec(C, B) { // integer coefficient row c times generator rows B
  return B[0].map((_, j) => C.reduce((s, c, i) => s + c * B[i][j], 0));
}
export function gram(vs) { return vs.map((a) => vs.map((b) => dot(a, b))); }

// Gram-Schmidt squared norms r_i from a Gram matrix (LDL^T without pivoting).
export function gsProfile(G) {
  const n = G.length, L = G.map((r) => r.slice()), r = [];
  for (let i = 0; i < n; i++) {
    let d = L[i][i];
    for (let k = 0; k < i; k++) d -= L[i][k] * L[i][k] * r[k];
    r.push(d);
    for (let j = i + 1; j < n; j++) {
      let s = L[j][i];
      for (let k = 0; k < i; k++) s -= L[j][k] * L[i][k] * r[k];
      L[j][i] = s / d;
    }
  }
  return r;
}
// Prefix determinants G_k and the potential Psi^2 = prod G_k.
export function prefixDets(G) {
  const r = gsProfile(G), out = [];
  let p = 1;
  for (const x of r) { p *= x; out.push(p); }
  return out;
}
export function psi2(G) { return prefixDets(G).reduce((a, b) => a * b, 1); }
export function det(G) { const d = prefixDets(G); return d[d.length - 1]; }

export function det3i(C) { // integer 3x3 determinant
  return C[0][0] * (C[1][1] * C[2][2] - C[1][2] * C[2][1])
       - C[0][1] * (C[1][0] * C[2][2] - C[1][2] * C[2][0])
       + C[0][2] * (C[1][0] * C[2][1] - C[1][1] * C[2][0]);
}
export function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; }

// Does the device have WebGL? Used by the three.js widgets to fall back to a static image.
export function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch (e) { return false; }
}
export function fallback(el, cfg, what) {
  const fig = html("figure", { class: "widget-fallback" }, el);
  if (cfg.fallback) html("img", { src: new URL("../img/" + cfg.fallback, import.meta.url).href, alt: what }, fig);
  html("figcaption", {}, fig, (cfg.fallbackCaption || what) + " (Your browser has no WebGL, so this is a still picture of the interactive figure.)");
}

// Read a CSS colour variable so that widgets follow the light/dark theme.
export function cssVar(name, dflt) {
  const v = getComputedStyle(document.body).getPropertyValue(name).trim();
  return v || dflt;
}
export const COLORS = { b1: "#d6604d", b2: "#2166ac", b3: "#1b9e77", point: "#555", dual: "#e08214" };
