import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CircleGeometry,
  Color,
  Group,
  Line,
  LineBasicMaterial,
  LineLoop,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  QuadraticBezierCurve3,
  Scene,
  ShaderMaterial,
  TorusGeometry,
  Vector3,
  WebGLRenderer
} from 'three';
import { HUBS } from '../data/site.js';

/**
 * INBrownTown hero — "broadcast signal" scene.
 *
 * A broadcast lens hangs above a ground plane. Six light nodes sit on the
 * plane at the relative positions of the real coverage hubs (projected from
 * latitude/longitude, same data as the coverage diagram). Fine signal trails
 * rise from each hub into the lens, and now and then a brand-orange pulse
 * travels up one of them: local stories reaching a wider audience.
 *
 * Everything is procedural (no model or texture downloads) and drawn with
 * unlit materials, so there are no lights, shadows or post-processing passes.
 */

const ORANGE = new Color('#E0662A');
const WHITE = new Color('#ffffff');
const MAX_DPR = 1.75;
const ENTRANCE_S = 1.8;

const easeOut = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

/* Hub positions on the ground plane (x east, z south), centred on the hubs. */
function hubPositions() {
  const cos = Math.cos((19 * Math.PI) / 180);
  const pts = HUBS.map((hb) => ({ hub: hb, x: (hb.lon - 75.3) * 0.62 * cos, z: -(hb.lat - 19) * 0.62 }));
  return pts.map((p) => ({ ...p, v: new Vector3(p.x + 0.15, -1.55, p.z + 0.3) }));
}

/* ---------- Shaders ---------- */

const pointsVert = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uReveal;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float pulse = 0.75 + 0.25 * sin(uTime * 1.6 + aPhase);
    gl_PointSize = aSize * pulse * uPixelRatio * (9.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    vColor = aColor;
    vAlpha = uReveal;
  }
`;

const pointsFrag = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float a = pow(core, 1.6) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

const dustVert = /* glsl */ `
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixelRatio;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.y += mod(uTime * 0.06 + aPhase * 3.0, 4.0) - 2.0;
    p.x += sin(uTime * 0.3 + aPhase * 6.28) * 0.08;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = 2.2 * uPixelRatio * (6.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
    // fade at the top/bottom of the travel range
    float k = mod(uTime * 0.06 + aPhase * 3.0, 4.0) / 4.0;
    vAlpha = smoothstep(0.0, 0.15, k) * smoothstep(1.0, 0.8, k) * 0.35;
  }
`;

const dustFrag = /* glsl */ `
  uniform float uReveal;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.1, d) * vAlpha * uReveal;
    if (a < 0.01) discard;
    gl_FragColor = vec4(1.0, 0.93, 0.86, a);
  }
`;

const trailVert = /* glsl */ `
  attribute float aT;
  varying float vT;
  void main() {
    vT = aT;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const trailFrag = /* glsl */ `
  uniform float uTime;
  uniform float uOffset;
  uniform float uPeriod;
  uniform float uReveal;
  uniform vec3 uBase;
  uniform vec3 uPulse;
  varying float vT;
  void main() {
    if (vT > uReveal) discard;
    // Pulse head position: travels 0→1 during the first 35% of each period,
    // then the line rests — so pulses are occasional, not constant.
    float cycle = fract(uTime / uPeriod + uOffset);
    float head = cycle / 0.35;
    float tail = smoothstep(head - 0.22, head, vT) * (1.0 - smoothstep(head, head + 0.015, vT));
    tail *= step(cycle, 0.35);
    float base = 0.10 + 0.14 * vT;
    vec3 col = mix(uBase, uPulse, clamp(tail * 1.4, 0.0, 1.0));
    gl_FragColor = vec4(col, base + tail * 0.85);
  }
`;

const glassVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const glassFrag = /* glsl */ `
  uniform float uTime;
  uniform float uReveal;
  varying vec2 vUv;
  void main() {
    vec2 p = vUv - 0.5;
    float r = length(p) * 2.0;
    float ang = atan(p.y, p.x);
    vec3 deep = vec3(0.04, 0.07, 0.13);
    vec3 mid = vec3(0.14, 0.21, 0.33);
    vec3 col = mix(mid, deep, smoothstep(0.0, 1.0, r));
    // seven faint aperture blades
    float blades = smoothstep(0.92, 1.0, cos(ang * 7.0 + uTime * 0.15)) * smoothstep(0.35, 0.8, r) * 0.08;
    col += blades;
    // drifting highlight
    vec2 hl = p - vec2(-0.16, 0.18) - 0.03 * vec2(sin(uTime * 0.4), cos(uTime * 0.3));
    col += smoothstep(0.16, 0.0, length(hl * vec2(1.0, 1.8))) * 0.22;
    // warm rim
    col += vec3(0.88, 0.4, 0.16) * smoothstep(0.82, 1.0, r) * 0.35;
    float a = smoothstep(1.0, 0.97, r) * uReveal;
    gl_FragColor = vec4(col, a);
  }
`;

/* ---------- Builders ---------- */

function buildLens(disposables) {
  const lens = new Group();

  const basic = (color, opacity) => {
    const m = new MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false });
    m.userData.baseOpacity = opacity;
    disposables.push(m);
    return m;
  };

  const outerGeo = new TorusGeometry(1.6, 0.007, 6, 180);
  const outer = new Mesh(outerGeo, basic(WHITE, 0.2));

  // Tick ring: short radial segments like a focus scale.
  const ticks = 120;
  const tickPos = new Float32Array(ticks * 6);
  for (let i = 0; i < ticks; i++) {
    const a = (i / ticks) * Math.PI * 2;
    const r0 = 1.34, r1 = i % 10 === 0 ? 1.44 : 1.39;
    tickPos.set([Math.cos(a) * r0, Math.sin(a) * r0, 0, Math.cos(a) * r1, Math.sin(a) * r1, 0], i * 6);
  }
  const tickGeo = new BufferGeometry();
  tickGeo.setAttribute('position', new BufferAttribute(tickPos, 3));
  const tickMat = new LineBasicMaterial({ color: WHITE, transparent: true, opacity: 0.35, depthWrite: false });
  tickMat.userData.baseOpacity = 0.35;
  const tickRing = new LineSegments(tickGeo, tickMat);

  const arcGeo = new TorusGeometry(1.12, 0.02, 8, 140, Math.PI * 1.3);
  const arc = new Mesh(arcGeo, basic(ORANGE, 0.95));

  const innerGeo = new TorusGeometry(0.86, 0.01, 6, 140);
  const inner = new Mesh(innerGeo, basic(WHITE, 0.3));

  const glassGeo = new CircleGeometry(0.82, 96);
  const glassMat = new ShaderMaterial({
    vertexShader: glassVert,
    fragmentShader: glassFrag,
    uniforms: { uTime: { value: 0 }, uReveal: { value: 0 } },
    transparent: true,
    depthWrite: false
  });
  const glass = new Mesh(glassGeo, glassMat);
  glass.position.z = -0.02;

  const coreGeo = new CircleGeometry(0.075, 32);
  const core = new Mesh(coreGeo, basic(ORANGE, 1));
  core.position.z = 0.01;

  disposables.push(outerGeo, tickGeo, tickMat, arcGeo, innerGeo, glassGeo, glassMat, coreGeo);
  lens.add(glass, outer, tickRing, arc, inner, core);
  return { lens, outer, tickRing, arc, inner, glassMat };
}

function buildGround(hubs, disposables) {
  const ground = new Group();

  // Faint concentric rings on the ground plane.
  for (const r of [1.2, 2.2, 3.2]) {
    const seg = 128;
    const pos = new Float32Array(seg * 3);
    for (let i = 0; i < seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      pos.set([Math.cos(a) * r, -1.55, Math.sin(a) * r * 0.9], i * 3);
    }
    const g = new BufferGeometry();
    g.setAttribute('position', new BufferAttribute(pos, 3));
    const m = new LineBasicMaterial({ color: WHITE, transparent: true, opacity: 0.06, depthWrite: false });
    m.userData.baseOpacity = 0.06;
    disposables.push(g, m);
    ground.add(new LineLoop(g, m));
  }

  // Hub nodes.
  const n = hubs.length;
  const pos = new Float32Array(n * 3);
  const size = new Float32Array(n);
  const phase = new Float32Array(n);
  const color = new Float32Array(n * 3);
  hubs.forEach((h, i) => {
    pos.set([h.v.x, h.v.y, h.v.z], i * 3);
    size[i] = h.hub.base ? 30 : 18;
    phase[i] = i * 1.7;
    const c = h.hub.base ? ORANGE : WHITE;
    color.set([c.r, c.g, c.b], i * 3);
  });
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  g.setAttribute('aSize', new BufferAttribute(size, 1));
  g.setAttribute('aPhase', new BufferAttribute(phase, 1));
  g.setAttribute('aColor', new BufferAttribute(color, 3));
  const m = new ShaderMaterial({
    vertexShader: pointsVert,
    fragmentShader: pointsFrag,
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 }, uReveal: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending
  });
  disposables.push(g, m);
  ground.add(new Points(g, m));
  return { ground, nodeMat: m };
}

function buildTrails(hubs, target, disposables) {
  const group = new Group();
  const mats = [];
  hubs.forEach((h, i) => {
    const start = h.v;
    const mid = start.clone().lerp(target, 0.5);
    mid.y += 1.1 + Math.abs(start.x - target.x) * 0.15;
    const curve = new QuadraticBezierCurve3(start, mid, target);
    const pts = curve.getPoints(80);
    const g = new BufferGeometry().setFromPoints(pts);
    const t = new Float32Array(pts.length);
    for (let k = 0; k < pts.length; k++) t[k] = k / (pts.length - 1);
    g.setAttribute('aT', new BufferAttribute(t, 1));
    const m = new ShaderMaterial({
      vertexShader: trailVert,
      fragmentShader: trailFrag,
      uniforms: {
        uTime: { value: 0 },
        uOffset: { value: (i * 0.37) % 1 },
        uPeriod: { value: 5.5 + (i % 3) * 1.6 },
        uReveal: { value: 0 },
        uBase: { value: WHITE.clone() },
        uPulse: { value: ORANGE.clone() }
      },
      transparent: true,
      depthWrite: false
    });
    disposables.push(g, m);
    mats.push(m);
    group.add(new Line(g, m));
  });
  return { trails: group, trailMats: mats };
}

function buildDust(disposables) {
  const count = 180;
  const pos = new Float32Array(count * 3);
  const phase = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos.set([(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 4 - 0.5], i * 3);
    phase[i] = Math.random();
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  g.setAttribute('aPhase', new BufferAttribute(phase, 1));
  const m = new ShaderMaterial({
    vertexShader: dustVert,
    fragmentShader: dustFrag,
    uniforms: { uTime: { value: 0 }, uPixelRatio: { value: 1 }, uReveal: { value: 0 } },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending
  });
  disposables.push(g, m);
  return { dust: new Points(g, m), dustMat: m };
}

/* ---------- Scene ---------- */

export function createHeroScene(host, { onContextLost } = {}) {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
  renderer.setPixelRatio(dpr);
  renderer.setClearColor(0x000000, 0);

  const canvas = renderer.domElement;
  canvas.className = 'hero-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  canvas.setAttribute('tabindex', '-1');

  const scene = new Scene();
  const camera = new PerspectiveCamera(34, 1, 0.1, 50);
  const disposables = [];

  const root = new Group();
  scene.add(root);

  const hubs = hubPositions();
  const lensCenter = new Vector3(0.35, 0.75, -0.6);

  const { lens, outer, tickRing, arc, inner, glassMat } = buildLens(disposables);
  lens.position.copy(lensCenter);
  lens.rotation.set(0.12, -0.38, 0);
  const { ground, nodeMat } = buildGround(hubs, disposables);
  const { trails, trailMats } = buildTrails(hubs, lensCenter, disposables);
  const { dust, dustMat } = buildDust(disposables);
  root.add(ground, trails, lens, dust);

  const fadeables = [];
  lens.traverse((o) => o.material?.userData.baseOpacity != null && fadeables.push(o.material));
  ground.traverse((o) => o.material?.userData.baseOpacity != null && fadeables.push(o.material));

  /* ---- sizing ---- */
  const resize = () => {
    const w = host.clientWidth, h = host.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull back on taller-than-wide boxes so the lens and hubs stay framed.
    camera.position.set(0, 0.5, camera.aspect < 1 ? 8.4 / camera.aspect : 8.4);
    camera.lookAt(0, -0.15, 0);
    camera.updateProjectionMatrix();
    renderOnce();
  };
  const ro = new ResizeObserver(resize);

  /* ---- pointer parallax (desktop, fine pointer only) ---- */
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const onPointer = (e) => {
    target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };
  if (finePointer) window.addEventListener('pointermove', onPointer, { passive: true });

  /* ---- loop control ---- */
  let raf = 0;
  let last = 0;
  let elapsed = 0;
  let entrance = 0;
  let onScreen = true;
  let disposed = false;

  const update = (dt) => {
    elapsed += dt;
    entrance = Math.min(entrance + dt / ENTRANCE_S, 1);
    const e = easeOut(entrance);

    current.x += (target.x - current.x) * Math.min(dt * 2.5, 1);
    current.y += (target.y - current.y) * Math.min(dt * 2.5, 1);
    root.rotation.y = current.x * 0.12 + Math.sin(elapsed * 0.08) * 0.04;
    root.rotation.x = current.y * 0.05;

    outer.rotation.z = elapsed * 0.03;
    tickRing.rotation.z = -elapsed * 0.06;
    arc.rotation.z = elapsed * 0.22;
    inner.rotation.z = -elapsed * 0.1;
    lens.scale.setScalar(0.86 + 0.14 * e);

    for (const m of fadeables) m.opacity = m.userData.baseOpacity * e;
    glassMat.uniforms.uTime.value = elapsed;
    glassMat.uniforms.uReveal.value = e;
    nodeMat.uniforms.uTime.value = elapsed;
    nodeMat.uniforms.uReveal.value = e;
    nodeMat.uniforms.uPixelRatio.value = dpr;
    dustMat.uniforms.uTime.value = elapsed;
    dustMat.uniforms.uReveal.value = e;
    dustMat.uniforms.uPixelRatio.value = dpr;
    // Trails draw upward from the hubs during the entrance.
    const trailReveal = easeOut((entrance - 0.25) / 0.75);
    for (const m of trailMats) {
      m.uniforms.uTime.value = elapsed;
      m.uniforms.uReveal.value = trailReveal;
    }
  };

  function renderOnce() {
    if (!disposed) renderer.render(scene, camera);
  }

  const frame = (now) => {
    raf = 0;
    const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
    last = now;
    update(dt);
    renderOnce();
    schedule();
  };

  function schedule() {
    if (!raf && !disposed && onScreen && !document.hidden) raf = requestAnimationFrame(frame);
  }
  function pause() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    last = 0;
  }

  const io = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    onScreen ? schedule() : pause();
  });
  const onVisibility = () => (document.hidden ? pause() : schedule());
  document.addEventListener('visibilitychange', onVisibility);

  const onLost = (e) => {
    e.preventDefault();
    dispose();
    onContextLost?.();
  };
  canvas.addEventListener('webglcontextlost', onLost);

  function dispose() {
    if (disposed) return;
    disposed = true;
    pause();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('pointermove', onPointer);
    canvas.removeEventListener('webglcontextlost', onLost);
    for (const d of disposables) d.dispose();
    renderer.dispose();
    canvas.remove();
  }

  host.append(canvas);
  ro.observe(host);
  io.observe(host);
  resize();
  schedule();

  return { dispose };
}
