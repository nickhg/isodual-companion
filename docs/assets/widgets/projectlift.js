// projectlift: the three-dimensional analogue of the paper's five-dimensional argument (Proposition 10).
// Step 1: fcc collapses along a shortest vector v onto the plane v-perp, giving a 2D lattice M.
// Step 2: rebuild 3D lattices over M from a lifting form phi (two numbers mod 1) and a height r = |v|^2,
// and see which lifts keep v shortest. kappa(M) is the best r any lift can reach.
// Config: {"fallback": "img url"}
import { html, fmt, hasWebGL, fallback, COLORS } from "./common.js";

const S2 = Math.SQRT2;
// fcc = {x in Z^3 : sum even}; v = (1,1,0). Plane coordinates: e1 = (1,-1,0)/sqrt2, e2 = (0,0,1).
// M = pi_v(fcc) has basis s1 = pi(1,0,1) = (1/sqrt2, 1), s2 = pi(1,0,-1) = (1/sqrt2, -1); det Gram = 2.
// fcc itself is the lift with phi = (1/2, 1/2) and r = 2.
const M = [[1 / S2, 1], [1 / S2, -1]];
const detM = (M[0][0] * M[1][1] - M[0][1] * M[1][0]) ** 2;
const frac = (x) => Math.abs(x - Math.round(x));          // ||x||, distance to the nearest integer

// all s = a s1 + b s2 in a window, with |s|^2
const SV = [];
for (let a = -4; a <= 4; a++) for (let b = -4; b <= 4; b++) {
  if (!a && !b) continue;
  const x = a * M[0][0] + b * M[1][0], y = a * M[0][1] + b * M[1][1];
  SV.push({ a, b, x, y, n: x * x + y * y });
}
// the largest r for which v stays a shortest vector of the lift with form phi
function rmax(p) {
  let m = Infinity;
  for (const s of SV) m = Math.min(m, s.n / (1 - frac(s.a * p[0] + s.b * p[1]) ** 2));
  return m;
}
// kappa_raw(M) = sup over phi of rmax(phi), here on a fine grid (numerical, for illustration)
let KAPPA = 0, KARG = [0, 0];
for (let i = 0; i <= 200; i++) for (let j = 0; j <= 200; j++) {
  const p = [i / 200, j / 200], r = rmax(p);
  if (r > KAPPA) { KAPPA = r; KARG = p; }
}
const etaM = Math.min(...SV.map((s) => s.n)) / Math.sqrt(detM);     // eta of a 2D lattice

export default async function projectlift(el, cfg) {
  el.classList.add("w-projectlift");
  if (!hasWebGL()) return fallback(el, cfg, "fcc projected along a shortest vector, and lifted back");
  const THREE = await import("../vendor/three/three.module.min.js");
  const { OrbitControls } = await import("../vendor/three/OrbitControls.js");

  let phi = [0.5, 0.5], r = 2, mode = "project", t = 0, anim = null;

  const bar = html("div", { class: "wbar" }, el);
  const bProj = html("button", { type: "button", class: "wbtn" }, bar, "1. Project fcc along v");
  const bLift = html("button", { type: "button", class: "wbtn" }, bar, "2. Lift back over M");
  const canvasBox = html("div", { class: "w3canvas" }, el);
  const sliders = html("div", { class: "wsliders" }, el);
  const mk = (label, min, max, step, val, on) => {
    const row = html("label", {}, sliders); row.append(label + " ");
    const s = html("input", { type: "range", min, max, step, value: val }, row);
    const o = html("output", {}, row, fmt(val, 3));
    s.addEventListener("input", () => { o.textContent = fmt(+s.value, 3); on(+s.value); });
    return { s, o };
  };
  const p1 = mk("φ(s₁)", 0, 1, 0.005, phi[0], (x) => { phi[0] = x; drawLift(); });
  const p2 = mk("φ(s₂)", 0, 1, 0.005, phi[1], (x) => { phi[1] = x; drawLift(); });
  const rr = mk("r = |v|²", 0.5, 3, 0.001, r, (x) => { r = x; drawLift(); });
  const out = html("div", { class: "wreadout" }, el);
  const bBest = html("button", { type: "button", class: "wbtn" }, bar, "best φ");
  bBest.addEventListener("click", () => {
    phi = KARG.slice(); r = KAPPA * (1 - 1e-9);
    p1.s.value = phi[0]; p2.s.value = phi[1]; rr.s.value = r;
    p1.o.textContent = fmt(phi[0], 3); p2.o.textContent = fmt(phi[1], 3); rr.o.textContent = fmt(r, 3);
    if (mode !== "lift") startLift(); else drawLift();
  });

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  canvasBox.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(6, 4, 4);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false; controls.addEventListener("change", render);
  scene.add(new THREE.AmbientLight(0xffffff, 1.6));
  const dl = new THREE.DirectionalLight(0xffffff, 1.8); dl.position.set(3, 5, 4); scene.add(dl);
  const vhat = new THREE.Vector3(1, 1, 0).normalize(), e1 = new THREE.Vector3(1, -1, 0).normalize(), e2 = new THREE.Vector3(0, 0, 1);
  const plane = new THREE.Mesh(new THREE.CircleGeometry(3.3, 48),
    new THREE.MeshBasicMaterial({ color: COLORS.b2, transparent: true, opacity: 0.12, side: THREE.DoubleSide, depthWrite: false }));
  plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), vhat); scene.add(plane);
  const geo = new THREE.SphereGeometry(0.1, 12, 8);
  const grey = new THREE.MeshStandardMaterial({ color: 0x8a8f99 }), red = new THREE.MeshStandardMaterial({ color: 0xd6604d });
  const blue = new THREE.MeshStandardMaterial({ color: 0x2166ac });
  const group = new THREE.Group(); scene.add(group);
  let vArrow = null;

  // fcc points in a ball, for the projection animation
  const fcc = [];
  for (let i = -3; i <= 3; i++) for (let j = -3; j <= 3; j++) for (let k = -3; k <= 3; k++)
    if ((i + j + k) % 2 === 0 && i * i + j * j + k * k <= 8) fcc.push(new THREE.Vector3(i, j, k));
  const fccMesh = new THREE.InstancedMesh(geo, grey, fcc.length); scene.add(fccMesh);
  const tmp = new THREE.Matrix4();
  function placeFcc(s) { // s in [0,1]: 0 = fcc, 1 = projected onto the plane
    fcc.forEach((p, n) => {
      const q = p.clone().addScaledVector(vhat, -s * p.dot(vhat));
      tmp.makeTranslation(q.x, q.y, q.z); fccMesh.setMatrixAt(n, tmp);
    });
    fccMesh.instanceMatrix.needsUpdate = true;
  }
  function setArrow(len, col) {
    if (vArrow) scene.remove(vArrow);
    vArrow = new THREE.ArrowHelper(vhat, new THREE.Vector3(), len, col, 0.25, 0.12); scene.add(vArrow);
  }

  function drawLift() {
    if (mode !== "lift") return;
    group.clear();
    const sr = Math.sqrt(r), rm = rmax(phi);
    let shorter = 0;
    const pts = [], bad = [], base = [];
    for (const s of SV.concat([{ a: 0, b: 0, x: 0, y: 0, n: 0 }])) {
      if (s.n > 7) continue;
      const f = s.a * phi[0] + s.b * phi[1];
      const P = e1.clone().multiplyScalar(s.x).addScaledVector(e2, s.y);
      base.push(P.clone());
      for (let j = -3; j <= 3; j++) {
        const h = (j + f) * sr; if (Math.abs(h) > 3.2) continue;
        const Q = P.clone().addScaledVector(vhat, h), nn = s.n + h * h;
        if (nn < 1e-9) continue;
        if (nn < r - 1e-9) { bad.push(Q); shorter++; } else pts.push(Q);
      }
    }
    const add = (arr, mat, sc) => {
      const m = new THREE.InstancedMesh(sc ? new THREE.SphereGeometry(0.05, 8, 6) : geo, mat, arr.length);
      arr.forEach((q, n) => { tmp.makeTranslation(q.x, q.y, q.z); m.setMatrixAt(n, tmp); }); group.add(m);
    };
    add(pts, grey); add(bad, red); add(base, blue, true);
    setArrow(sr, shorter ? 0xd6604d : 0x1b9e77);
    render();
    const kap = KAPPA / Math.sqrt(detM);
    out.innerHTML =
      `<p>The plane lattice M (blue dots) has det 2 and minimum 3/2. For this φ, v stays shortest as long as ` +
      `r ≤ ${fmt(rm, 4)}. ${shorter ? `<b>Now r is too big:</b> ${shorter} lattice points (red) are shorter than v.` : "v is a shortest vector."}</p>` +
      `<table><tr><td>κ(M), best over all φ (grid search)</td><td>${fmt(kap, 4)}</td></tr>` +
      `<tr><td>η(M) = λ₁²/√det</td><td>${fmt(etaM, 4)}</td></tr>` +
      `<tr><td>Φ₃(M) = κ(M)·η(M), the bound on η of every lift</td><td>${fmt(kap * etaM, 4)}</td></tr></table>` +
      `<p class="note">A three-dimensional analogue of the argument, for illustration. φ = (½, ½) with r = 2 rebuilds fcc exactly.</p>`;
  }

  function animate(to, done) {
    cancelAnimationFrame(anim);
    const from = t, t0 = performance.now();
    const step = (now) => {
      const u = Math.min(1, (now - t0) / 1200); t = from + (to - from) * (0.5 - 0.5 * Math.cos(Math.PI * u));
      placeFcc(t); render();
      if (u < 1) anim = requestAnimationFrame(step); else if (done) done();
    };
    anim = requestAnimationFrame(step);
  }
  function startProject() {
    mode = "project"; group.clear(); fccMesh.visible = true; sliders.style.opacity = 0.4; setArrow(S2, 0x1b9e77);
    t = 0; placeFcc(0); render();
    out.innerHTML = "<p>fcc, with a shortest vector v = (1, 1, 0) (green). Watch the points slide along v onto the plane perpendicular to it.</p>";
    animate(1, () => { out.innerHTML = "<p>Every point has landed on the plane, and they form a two-dimensional lattice M = π<sub>v</sub>(fcc). Points that differed by a multiple of v landed on top of each other. Now press 2 to rebuild a 3D lattice over M.</p>"; });
  }
  function startLift() { mode = "lift"; fccMesh.visible = false; sliders.style.opacity = 1; drawLift(); }
  bProj.addEventListener("click", startProject);
  bLift.addEventListener("click", startLift);

  function resize() {
    const w = canvasBox.clientWidth, h = Math.max(260, Math.min(w * 0.8, 460));
    renderer.setSize(w, h); camera.aspect = w / h; camera.updateProjectionMatrix(); render();
  }
  function render() { renderer.render(scene, camera); }
  new ResizeObserver(resize).observe(canvasBox);
  setArrow(S2, 0x1b9e77); placeFcc(0); sliders.style.opacity = 0.4; resize();
  out.innerHTML = "<p>fcc, with a shortest vector v (green). Press 1 to project.</p>";
}
