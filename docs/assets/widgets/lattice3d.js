// lattice3d: Z^3, fcc (A_3) or bcc (A_3*) in three.js, with an editable basis, its flag
// (the line through b1 and the plane through b1, b2), the Gram-Schmidt staircase and the potential.
// Config: {"lattice": "fcc" | "bcc" | "Z3", "fallback": "img url"}
import { html, button, fmt, dot, gram, matvec, prefixDets, gsProfile, det3i, gcd, hasWebGL, fallback, COLORS } from "./common.js";

const LATTICES = {
  Z3: { name: "ℤ³ (cubic)", g: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], eta: "1" },
  fcc: { name: "fcc (A₃): stacked oranges", g: [[1, 1, 0], [1, 0, 1], [0, 1, 1]], eta: "3/2" },
  bcc: { name: "bcc (A₃*)", g: [[2, 0, 0], [0, 2, 0], [1, 1, 1]], eta: "3/2" },
};
const START = [[1, 1, 0], [0, 1, 0], [1, 1, 1]];   // a unimodular but poor starting basis
// Integer inverse of a unimodular 3x3 matrix (adjugate times det = +-1), and a real 3x3 inverse.
function inv3(A) {
  const d = det3i(A), c = (i, j) => {
    const r = [0, 1, 2].filter((x) => x !== i), k = [0, 1, 2].filter((x) => x !== j);
    return ((i + j) % 2 ? -1 : 1) * (A[r[0]][k[0]] * A[r[1]][k[1]] - A[r[0]][k[1]] * A[r[1]][k[0]]);
  };
  return [0, 1, 2].map((i) => [0, 1, 2].map((j) => c(j, i) / d));
}
const tr = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// The exact minimum of Psi^2 over bases, by the recursion Psi^2_min(L) = min_v |v|^6 Psi^2_min(pi_v L):
// b1 runs over short primitive vectors, b2 over vectors completing b1 to a primitive pair (minimising
// G2 = det Gram(b1, b2)), and b3 is any completion (G3 = Delta whatever it is).
export function bestBasis(g) {
  const vs = [];
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) for (let k = -3; k <= 3; k++) {
    if (!i && !j && !k) continue;
    const c = [i, j, k], v = matvec(c, g);
    vs.push({ c, v, n: dot(v, v) });
  }
  vs.sort((a, b) => a.n - b.n);
  const lam = vs[0].n, D = prefixDets(gram(g))[2];
  let best = null;
  for (const a of vs) {
    if (a.n > 2 * lam + 1e-9) break;                       // b1 of a Psi-minimal basis is short (mu_3 bound)
    if (gcd(gcd(a.c[0], a.c[1]), a.c[2]) !== 1) continue;
    for (const b of vs) {
      if (b.n > 3 * lam + 1e-9) break;
      const x = cross(a.c, b.c);
      if (gcd(gcd(x[0], x[1]), x[2]) !== 1) continue;     // (a, b) extends to a basis
      const m = dot(a.v, b.v), G2 = a.n * b.n - m * m, P = a.n * G2 * D;
      if (!best || P < best.P - 1e-9) best = { P, c1: a.c, c2: b.c };
    }
  }
  for (const t of vs) {                                    // any completion; take the shortest
    const d = det3i([best.c1, best.c2, t.c]);
    if (d === 1 || d === -1) { best.C = [best.c1.slice(), best.c2.slice(), t.c.slice()]; break; }
  }
  return best;
}

export default async function lattice3d(el, cfg) {
  el.classList.add("w-lattice3d");
  if (!hasWebGL()) return fallback(el, cfg, "The fcc lattice with a basis and its flag");
  const THREE = await import("../vendor/three/three.module.min.js");
  const { OrbitControls } = await import("../vendor/three/OrbitControls.js");

  let key = cfg.lattice || "fcc", g = LATTICES[key].g, C = START.map((r) => r.slice());
  let best = bestBasis(g);

  // --- layout -------------------------------------------------------------------------------------
  const bar = html("div", { class: "wbar" }, el);
  const sel = html("select", { "aria-label": "lattice" }, bar);
  for (const k in LATTICES) { const o = html("option", { value: k }, sel, LATTICES[k].name); if (k === key) o.selected = true; }
  sel.addEventListener("change", () => { key = sel.value; g = LATTICES[key].g; dualOn = false; dcb.checked = false; best = bestBasis(g); C = START.map((r) => r.slice()); rebuildPoints(); update(); });
  // "view the dual": replace the lattice by its dual (rescaled to the same volume) and the basis by its
  // reversed dual basis. The staircase flips over and Psi^2/Delta^2 stays the same.
  let dualOn = false;
  const dlab = html("label", { class: "wcheck" }, bar);
  const dcb = html("input", { type: "checkbox" }, dlab); dlab.append(" view the dual");
  dcb.addEventListener("change", () => {
    dualOn = dcb.checked;
    const V = Math.sqrt(prefixDets(gram(g))[2]);                 // volume of the current lattice
    const gd = tr(inv3(g)).map((r) => r.map((x) => x * V ** (2 / 3)));
    g = gd; C = tr(inv3(C)).map((r) => r.map(Math.round)).reverse();
    best = bestBasis(g); rebuildPoints(); update();
  });
  const wrap = html("div", { class: "w3wrap" }, el);
  const canvasBox = html("div", { class: "w3canvas" }, wrap);
  const side = html("div", { class: "w3side" }, wrap);
  const ops = html("div", { class: "wbar" }, el);
  const mkSel = (lab) => {
    const s = html("select", { "aria-label": lab }, ops);
    for (let i = 0; i < 3; i++) html("option", { value: i }, s, "b" + "₁₂₃"[i]);
    return s;
  };
  const si = mkSel("i"); const sj = mkSel("j"); sj.value = 1;
  const I = () => +si.value, J = () => +sj.value;
  const op = (f) => () => { const i = I(), j = J(); if (i === j && f !== neg) return; f(i, j); update(); };
  const plus = (i, j) => { C[i] = C[i].map((x, k) => x + C[j][k]); };
  const minus = (i, j) => { C[i] = C[i].map((x, k) => x - C[j][k]); };
  const swap = (i, j) => { [C[i], C[j]] = [C[j], C[i]]; };
  const neg = (i) => { C[i] = C[i].map((x) => -x); };
  button(ops, "bᵢ + bⱼ", op(plus)); button(ops, "bᵢ − bⱼ", op(minus));
  button(ops, "swap", op(swap)); button(ops, "negate bᵢ", op(neg));
  button(ops, "Find best", () => { C = best.C.map((r) => r.slice()); update(); }, "exact minimisation of Ψ² over bases");
  button(ops, "Reset", () => { C = START.map((r) => r.slice()); update(); });

  // --- three.js scene ------------------------------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasBox.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(5.5, 4.2, 6.5);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false; controls.enablePan = false;
  controls.addEventListener("change", render);
  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  const dl = new THREE.DirectionalLight(0xffffff, 1.8); dl.position.set(3, 5, 4); scene.add(dl);
  let pointsMesh = null;
  const flag = new THREE.Group(); scene.add(flag);

  function rebuildPoints() {
    if (pointsMesh) { scene.remove(pointsMesh); pointsMesh.geometry.dispose(); }
    const pts = [], R2 = 3.0 * 3.0;
    for (let i = -5; i <= 5; i++) for (let j = -5; j <= 5; j++) for (let k = -5; k <= 5; k++) {
      const v = matvec([i, j, k], g); if (dot(v, v) <= R2) pts.push(v);
    }
    const geo = new THREE.SphereGeometry(0.11, 14, 10);
    const mat = new THREE.MeshStandardMaterial({ color: 0x8a8f99, roughness: 0.6 });
    pointsMesh = new THREE.InstancedMesh(geo, mat, pts.length);
    const m = new THREE.Matrix4();
    pts.forEach((p, n) => { m.makeTranslation(p[0], p[1], p[2]); pointsMesh.setMatrixAt(n, m); });
    scene.add(pointsMesh);
  }
  function drawFlag(b) {
    flag.clear();
    const cols = [COLORS.b1, COLORS.b2, COLORS.b3];
    b.forEach((v, i) => {
      const V = new THREE.Vector3(...v), len = V.length();
      flag.add(new THREE.ArrowHelper(V.clone().normalize(), new THREE.Vector3(), len, cols[i], 0.28, 0.14));
    });
    // the Gram-Schmidt heights: dotted perpendiculars from b2 to the line of b1, and from b3 to the plane
    for (let k = 1; k < 3; k++) {
      const t = new THREE.Vector3(...b[k]), u = new THREE.Vector3(...b[0]);
      let foot;
      if (k === 1) foot = u.clone().multiplyScalar(t.dot(u) / u.dot(u));
      else {
        const w = new THREE.Vector3(...b[1]), nn = new THREE.Vector3().crossVectors(u, w).normalize();
        foot = t.clone().addScaledVector(nn, -t.dot(nn));
      }
      const hg = new THREE.BufferGeometry().setFromPoints([t, foot]);
      const hl = new THREE.Line(hg, new THREE.LineDashedMaterial({ color: cols[k], dashSize: 0.08, gapSize: 0.06 }));
      hl.computeLineDistances(); flag.add(hl);
    }
    // the line through b1 (first step of the flag)
    const d = new THREE.Vector3(...b[0]).normalize().multiplyScalar(4.5);
    const lg = new THREE.BufferGeometry().setFromPoints([d.clone().negate(), d]);
    flag.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: COLORS.b1, transparent: true, opacity: 0.7 })));
    // the plane through b1, b2 (second step)
    const nrm = new THREE.Vector3(...cross(b[0], b[1])).normalize();
    const pg = new THREE.CircleGeometry(3.4, 48);
    const pm = new THREE.MeshBasicMaterial({ color: COLORS.b2, transparent: true, opacity: 0.13, side: THREE.DoubleSide, depthWrite: false });
    const plane = new THREE.Mesh(pg, pm);
    plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), nrm);
    flag.add(plane);
  }
  function resize() {
    const w = canvasBox.clientWidth, h = Math.max(260, Math.min(w, 480));
    renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render();
  }
  function render() { renderer.render(scene, camera); }
  new ResizeObserver(resize).observe(canvasBox);

  // --- readout: staircase and potential ------------------------------------------------------------
  function update() {
    const b = C.map((c) => matvec(c, g)), G = gram(b);
    const r = gsProfile(G), P = prefixDets(G), psi = P[0] * P[1] * P[2], D = P[2];
    drawFlag(b); render();
    const rmax = Math.max(...r, 1e-9);
    const cols = [COLORS.b1, COLORS.b2, COLORS.b3];
    const bars = r.map((x, i) => `<div class="sbar"><div class="sfill" style="height:${(100 * x) / rmax}%;background:${cols[i]}"></div>` +
      `<span>r${"₁₂₃"[i]} = ${fmt(x, 3)}</span></div>`).join("");
    const reached = Math.abs(psi - best.P) < 1e-9 * best.P;
    side.innerHTML = `<div class="stair">${bars}</div>` +
      `<table><tr><td>G₁ = |b₁|²</td><td>${fmt(P[0])}</td></tr><tr><td>G₂</td><td>${fmt(P[1])}</td></tr>` +
      `<tr><td>G₃ = Δ</td><td>${fmt(P[2])}</td></tr><tr><td>Ψ² = G₁G₂G₃</td><td>${fmt(psi)}</td></tr>` +
      `<tr><td>Ψ² / Δ²</td><td>${fmt(psi / (D * D))}</td></tr></table>` +
      (dualOn ? `<p class="note">Showing the dual lattice and the reversed dual basis.</p>` : "") +
      `<p class="${reached ? "ok" : ""}">${reached ? `Minimal: η(L) = ${LATTICES[key].eta} reached.` :
        `The best basis has Ψ² / Δ² = ${fmt(best.P / (D * D))}.`}</p>`;
  }
  rebuildPoints(); resize(); update();
}
