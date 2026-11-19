// landscape3d: Phi_5 on the plane through pi_vD5, the nearest D4 and the nearest M* (paper, Figure 2), as a surface.
// Data: a 221 x 181 grid in invariant-metric coordinates (x, y) about pi_vD5, numerical (floating point), not
// certified. Heights above 6 are coloured warm, so the region where the project-and-lift bound fails stands out.
// Config: {"data": "../data/landscape_phi5.json", "fallback": "phi5_surface.png"}
import { html, fmt, hasWebGL, fallback } from "./common.js";

const LOW = ["#cde2fb", "#9ec5f4", "#6da7ec", "#3987e5", "#256abf", "#184f95", "#0d366b"];   // below 6
const HIGH = ["#fdd49e", "#fc8d59", "#d7301f", "#7f0000"];                                      // 6 to 6.5
function hex(c) { return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16) / 255); }
function ramp(stops, t) {
  t = Math.min(1, Math.max(0, t)) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(t)), f = t - i, a = hex(stops[i]), b = hex(stops[i + 1]);
  return a.map((v, k) => v + (b[k] - v) * f);
}
const colour = (v) => (v < 6 ? ramp(LOW, (v - 2) / 4) : ramp(HIGH, (v - 6) / 0.5));

export default async function landscape3d(el, cfg) {
  el.classList.add("w-landscape3d");
  if (!hasWebGL()) return fallback(el, cfg, "Φ₅ on the plane through π_vD₅, D₄ and M*, as a surface");
  const THREE = await import("../vendor/three/three.module.min.js");
  const { OrbitControls } = await import("../vendor/three/OrbitControls.js");
  const D = await (await fetch(new URL(cfg.data || "../data/landscape_phi5.json", import.meta.url))).json();

  let ZS = 0.18;                                   // vertical scale: height = (Phi - 2) * ZS
  const bar = html("div", { class: "wbar" }, el);
  const lab = html("label", { class: "wcheck" }, bar);
  const cb = html("input", { type: "checkbox" }, lab); cb.checked = true; lab.append(" show the level Φ₅ = 6");
  const zl = html("label", { class: "wcheck" }, bar); zl.append("height ×");
  const zs = html("input", { type: "range", min: 0.06, max: 0.4, step: 0.01, value: ZS }, zl);
  const box = html("div", { class: "w3canvas w3rel" }, el);
  const out = html("div", { class: "wreadout" }, el);
  const idle = "Drag to turn, pinch or scroll to zoom. Warm colours mark Φ₅ > 6. Values are numerical, except the three marked ones.";
  out.textContent = idle;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  box.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.01, 50);
  const cx = D.x0 + (D.nx - 1) * D.step / 2, cy = D.y0 + (D.ny - 1) * D.step / 2;
  camera.position.set(cx - 1.15, 1.35, -cy + 1.5);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(cx, 0.5, -cy); controls.enablePan = false; controls.update();
  controls.addEventListener("change", render);
  scene.add(new THREE.AmbientLight(0xffffff, 1.4));
  const dl = new THREE.DirectionalLight(0xffffff, 1.6); dl.position.set(-1, 3, 2); scene.add(dl);

  // the surface: grid ordered x outer, y inner; world coordinates (x, height, -y)
  const n = D.nx * D.ny, pos = new Float32Array(3 * n), col = new Float32Array(3 * n);
  for (let i = 0; i < D.nx; i++) for (let j = 0; j < D.ny; j++) {
    const k = i * D.ny + j, v = D.phi[k], c = colour(v);
    pos.set([D.x0 + i * D.step, 0, -(D.y0 + j * D.step)], 3 * k); col.set(c, 3 * k);
  }
  const idx = [];
  for (let i = 0; i < D.nx - 1; i++) for (let j = 0; j < D.ny - 1; j++) {
    const a = i * D.ny + j, b = a + D.ny;
    idx.push(a, b, a + 1, b, b + 1, a + 1);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  geo.setIndex(idx);
  const surf = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.75, side: THREE.DoubleSide }));
  scene.add(surf);
  const sea = new THREE.Mesh(new THREE.PlaneGeometry((D.nx - 1) * D.step, (D.ny - 1) * D.step),
    new THREE.MeshBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false }));
  sea.rotation.x = -Math.PI / 2; sea.position.set(cx, 0, -cy); scene.add(sea);

  // the three special lattices: a marker and an HTML label each
  const marks = [];
  for (const k in D.special) {
    const s = D.special[k];
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 12), new THREE.MeshStandardMaterial({ color: 0xffffff }));
    scene.add(m);
    const tag = html("div", { class: "w3label" + (k === "Mstar" ? " left" : "") }, box, `${s.label} ${s.short}`);
    marks.push({ s, m, tag });
  }
  function setHeights() {
    for (let k = 0; k < n; k++) pos[3 * k + 1] = (D.phi[k] - 2) * ZS;
    geo.attributes.position.needsUpdate = true; geo.computeVertexNormals(); geo.computeBoundingSphere();
    sea.position.y = (6 - 2) * ZS;
    for (const { s, m } of marks) m.position.set(s.x, (s.value - 2) * ZS + 0.012, -s.y);
    render();
  }
  cb.addEventListener("change", () => { sea.visible = cb.checked; render(); });
  zs.addEventListener("input", () => { ZS = +zs.value; setHeights(); });

  // hover / touch readout by ray casting onto the surface
  const ray = new THREE.Raycaster(), ptr = new THREE.Vector2();
  renderer.domElement.addEventListener("pointermove", (e) => {
    const r = renderer.domElement.getBoundingClientRect();
    ptr.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ptr, camera);
    const near = marks.find(({ m }) => ray.ray.distanceToPoint(m.position) < 0.02);
    if (near) { out.innerHTML = `<b>${near.s.label}</b>: Φ₅ = ${near.s.exact} (exact)`; return; }
    const hit = ray.intersectObject(surf)[0];
    if (!hit) { out.textContent = idle; return; }
    const x = hit.point.x, y = -hit.point.z, v = hit.point.y / ZS + 2;
    out.innerHTML = `x = ${fmt(x, 3)}, y = ${fmt(y, 3)} (distance ${fmt(Math.hypot(x, y), 3)} from π<sub>v</sub>D₅): Φ₅ ≈ ${v.toFixed(3)} (numerical)`;
  });

  function render() {
    renderer.render(scene, camera);
    const w = box.clientWidth, h = box.clientHeight, v = new THREE.Vector3();
    for (const { m, tag } of marks) {
      v.copy(m.position).project(camera);
      tag.style.left = `${((v.x + 1) / 2) * w}px`; tag.style.top = `${((1 - v.y) / 2) * h}px`;
      tag.style.display = v.z < 1 ? "block" : "none";
    }
  }
  function resize() {
    const w = box.clientWidth, h = Math.max(280, Math.min(w * 0.75, 520));
    renderer.setSize(w, h); box.style.height = h + "px"; camera.aspect = w / h; camera.updateProjectionMatrix(); render();
  }
  new ResizeObserver(resize).observe(box);
  setHeights(); resize();
}
