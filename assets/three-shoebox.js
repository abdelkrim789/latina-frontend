import * as THREE from 'three';

/* ------------------------------------------------------------------ *
 *  Three.js shoebox — GSAP-driven cinematic open + fly transition.   *
 *  Just the box: base, lid (hinged), inner cavity, tissue tufts.     *
 *  No shoe, no brand plane.                                          *
 * ------------------------------------------------------------------ */

/* Procedural paper grain — used as roughness map for organic surface */
function makeGrainTexture() {
  const S = 512;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#888';
  ctx.fillRect(0, 0, S, S);
  for (let i = 0; i < 26000; i++) {
    const v = 110 + Math.random() * 80;
    ctx.fillStyle = `rgba(${v},${v},${v},${0.3 + Math.random() * 0.5})`;
    ctx.fillRect(Math.random() * S, Math.random() * S, 1, 1);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(2, 1.5);
  return tex;
}

/* Brand-on-lid texture, drawn from the SVG paths in the React LotusMark */
function makeLidTexture() {
  const W = 1280, H = 840; // matches lid X/Z aspect (2.9 / 1.9)
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Cream paper bg with slight vertical gradient
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, '#f7efe4');
  bg.addColorStop(0.5, '#f3eadd');
  bg.addColorStop(1, '#efe4d3');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Paper grain
  for (let i = 0; i < 9000; i++) {
    const a = Math.random() * 0.05;
    ctx.fillStyle = `rgba(150,110,80,${a})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
  }
  for (let i = 0; i < 60; i++) {
    ctx.strokeStyle = `rgba(120,80,55,${0.04 + Math.random() * 0.04})`;
    ctx.lineWidth = 0.4;
    const sx = Math.random() * W, sy = Math.random() * H;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + (Math.random() - 0.5) * 80, sy + (Math.random() - 0.5) * 30);
    ctx.stroke();
  }

  // Inset border
  ctx.strokeStyle = 'rgba(160,100,70,0.18)';
  ctx.lineWidth = 1.2;
  ctx.strokeRect(60, 60, W - 120, H - 120);

  // Rose-gold gradient for the brand mark
  const rose = ctx.createLinearGradient(0, H * 0.22, 0, H * 0.78);
  rose.addColorStop(0, '#d4a584');
  rose.addColorStop(0.45, '#b07a5a');
  rose.addColorStop(1, '#7d4a30');

  // Lotus, ported from React LotusMark SVG paths
  const cx = W / 2;
  const lotusCY = H * 0.30;
  const scale = 4.6;

  ctx.save();
  ctx.translate(cx, lotusCY);
  ctx.scale(scale, scale);
  ctx.translate(-32, -32);
  ctx.strokeStyle = rose;
  ctx.lineWidth = 1.6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  ctx.beginPath();
  ctx.moveTo(32, 12);
  ctx.bezierCurveTo(28, 18, 28, 26, 32, 32);
  ctx.bezierCurveTo(36, 26, 36, 18, 32, 12);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(22, 16);
  ctx.bezierCurveTo(20, 22, 22, 28, 28, 32);
  ctx.bezierCurveTo(30, 26, 28, 20, 22, 16);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(42, 16);
  ctx.bezierCurveTo(44, 22, 42, 28, 36, 32);
  ctx.bezierCurveTo(34, 26, 36, 20, 42, 16);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(16, 36);
  ctx.bezierCurveTo(20, 40, 28, 42, 32, 42);
  ctx.bezierCurveTo(36, 42, 44, 40, 48, 36);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(14, 42);
  ctx.bezierCurveTo(18, 48, 26, 50, 32, 50);
  ctx.bezierCurveTo(38, 50, 46, 48, 50, 42);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(32, 36, 14, 3, 0, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();

  // LATINA wordmark
  ctx.fillStyle = rose;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  ctx.font = '500 200px "Playfair Display", Georgia, serif';
  ctx.fillText('LATINA', cx, H * 0.62);

  // JUST FOR YOU tagline, manually letter-spaced
  ctx.font = '400 38px "Inter", "Helvetica Neue", Arial, sans-serif';
  ctx.fillStyle = '#9c6045';
  const tagline = 'JUST  FOR  YOU';
  const spacing = 16;
  const widths = [];
  for (const ch of tagline) widths.push(ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + spacing * (tagline.length - 1);
  let x = cx - total / 2;
  for (let i = 0; i < tagline.length; i++) {
    ctx.fillText(tagline[i], x + widths[i] / 2, H * 0.74);
    x += widths[i] + spacing;
  }
  // dividers flanking the tagline
  ctx.strokeStyle = '#b07a5a';
  ctx.lineWidth = 1;
  const divY = H * 0.74 - 12;
  ctx.beginPath();
  ctx.moveTo(cx - total / 2 - 90, divY);
  ctx.lineTo(cx - total / 2 - 30, divY);
  ctx.moveTo(cx + total / 2 + 30, divY);
  ctx.lineTo(cx + total / 2 + 90, divY);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 16;
  return tex;
}

/* ------------------------------------------------------------------ */
function createShoebox(container, options = {}) {
  const gsap = window.gsap;
  if (!gsap) {
    console.error('[shoebox] window.gsap not found — make sure GSAP is loaded before this module.');
  }

  const {
    creamLid = 0xf3eadd,
    creamBase = 0xe8dac4,
    onReady,
    onFlyComplete
  } = options;

  /* ---------- renderer / camera / scene ---------- */
  const scene = new THREE.Scene();
  let w = container.clientWidth || 1;
  let h = container.clientHeight || 1;

  const camera = new THREE.PerspectiveCamera(30, w / h, 0.1, 100);
  // Camera waypoints
  const camPos = { x: 3.6, y: 2.7, z: 4.4 };       // start
  const camOpen = { x: 2.7, y: 2.0, z: 3.4 };       // settled-open
  const camFly = { x: 0.0, y: 0.45, z: 1.2 };       // fly-into-box
  const lookAt = new THREE.Vector3(0, 0.05, 0);
  const lookOpen = new THREE.Vector3(0, 0.20, 0.20);
  const lookFly = new THREE.Vector3(0, 0.15, 0.25);

  camera.position.set(camPos.x, camPos.y, camPos.z);
  camera.lookAt(lookAt);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);
  Object.assign(renderer.domElement.style, {
    display: 'block', width: '100%', height: '100%'
  });

  /* ---------- lighting ---------- */
  scene.add(new THREE.HemisphereLight(0xfff5e8, 0xc7b8a0, 0.55));

  const key = new THREE.DirectionalLight(0xffffff, 1.55);
  key.position.set(4.5, 7.5, 3.2);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -3.5;
  key.shadow.camera.right = 3.5;
  key.shadow.camera.top = 3.5;
  key.shadow.camera.bottom = -3.5;
  key.shadow.bias = -0.0008;
  key.shadow.radius = 6;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xfde5cc, 0.42);
  fill.position.set(-3.5, 2.8, -1.5);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xffe6d0, 0.55);
  rim.position.set(0, 3.5, -5);
  scene.add(rim);

  // Inner box glow — animated by GSAP
  const innerGlow = new THREE.PointLight(0xffd9b2, 0, 3.5, 1.6);
  innerGlow.position.set(0, 0.3, 0);
  scene.add(innerGlow);

  /* ---------- floor (shadow catcher) ---------- */
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.ShadowMaterial({ opacity: 0.26 })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.426;
  floor.receiveShadow = true;
  scene.add(floor);

  /* ---------- materials ---------- */
  const grain = makeGrainTexture();
  const baseMat = new THREE.MeshStandardMaterial({
    color: creamBase, roughness: 0.82, metalness: 0.02, roughnessMap: grain
  });
  const lidSideMat = new THREE.MeshStandardMaterial({
    color: creamLid, roughness: 0.66, metalness: 0.02, roughnessMap: grain
  });
  const lidBottomMat = new THREE.MeshStandardMaterial({
    color: 0xe6d8c4, roughness: 0.88, metalness: 0
  });
  const innerMat = new THREE.MeshStandardMaterial({
    color: 0xd9c8b3, roughness: 0.92, metalness: 0, side: THREE.DoubleSide
  });
  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xcfbe9f, roughness: 0.92, metalness: 0, side: THREE.DoubleSide
  });
  const tissueMat = new THREE.MeshStandardMaterial({
    color: 0xfaf0e2, roughness: 0.95, metalness: 0,
    transparent: true, opacity: 0.85
  });

  const lidBrand = makeLidTexture();
  const lidTopMat = new THREE.MeshStandardMaterial({
    color: 0xffffff, roughness: 0.55, metalness: 0.04,
    map: lidBrand, roughnessMap: grain
  });

  const allFadingMats = [
    baseMat, lidSideMat, lidTopMat, lidBottomMat, innerMat, wallMat, tissueMat
  ];

  /* ---------- box base ---------- */
  const baseGeo = new THREE.BoxGeometry(2.8, 0.85, 1.8);
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.castShadow = true;
  base.receiveShadow = true;
  scene.add(base);

  /* ---------- inner cavity walls ---------- */
  const innerW = 2.66, innerD = 1.66, innerH = 0.78;
  const cavity = new THREE.Group();
  const innerFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(innerW, innerD), innerMat
  );
  innerFloor.rotation.x = -Math.PI / 2;
  innerFloor.position.y = -0.42 + 0.012;
  innerFloor.receiveShadow = true;
  cavity.add(innerFloor);

  const sideGeoLR = new THREE.PlaneGeometry(innerD, innerH);
  const wallL = new THREE.Mesh(sideGeoLR, wallMat);
  wallL.rotation.y = Math.PI / 2;
  wallL.position.set(-innerW / 2 + 0.005, 0, 0);
  wallL.receiveShadow = true;
  cavity.add(wallL);
  const wallR = wallL.clone();
  wallR.position.x = innerW / 2 - 0.005;
  wallR.rotation.y = -Math.PI / 2;
  cavity.add(wallR);

  const sideGeoFB = new THREE.PlaneGeometry(innerW, innerH);
  const wallF = new THREE.Mesh(sideGeoFB, wallMat);
  wallF.position.set(0, 0, innerD / 2 - 0.005);
  wallF.rotation.y = Math.PI;
  wallF.receiveShadow = true;
  cavity.add(wallF);
  const wallB = wallF.clone();
  wallB.position.z = -innerD / 2 + 0.005;
  wallB.rotation.y = 0;
  cavity.add(wallB);
  scene.add(cavity);

  /* ---------- tissue paper tufts ---------- */
  const tissueGroup = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const g = new THREE.IcosahedronGeometry(0.18 + Math.random() * 0.06, 0);
    const m = new THREE.Mesh(g, tissueMat);
    m.scale.set(1.1 + Math.random() * 0.4, 0.45, 0.8 + Math.random() * 0.3);
    m.position.set(
      (Math.random() - 0.5) * 2.2,
      -0.30 + Math.random() * 0.05,
      (Math.random() - 0.5) * 1.3
    );
    m.rotation.set(Math.random(), Math.random(), Math.random());
    m.castShadow = true; m.receiveShadow = true;
    tissueGroup.add(m);
  }
  scene.add(tissueGroup);

  /* ---------- hinge group + lid ---------- */
  const hinge = new THREE.Group();
  hinge.position.set(0, 0.425, -0.9);
  scene.add(hinge);

  const lidMats = [lidSideMat, lidSideMat, lidTopMat, lidBottomMat, lidSideMat, lidSideMat];
  const lidGeo = new THREE.BoxGeometry(2.9, 0.35, 1.9);
  const lid = new THREE.Mesh(lidGeo, lidMats);
  lid.position.set(0, 0.175, 0.9);
  lid.castShadow = true;
  lid.receiveShadow = true;
  hinge.add(lid);

  /* ---------- look-target Vector3 (animated by GSAP, read by lookAt) ---------- */
  const look = lookAt.clone(); // starts at idle target

  /* ---------- IDLE micro-animation (camera breath) ---------- */
  // GSAP infinite tween — yoyo sine on x/y so the camera floats while waiting
  const breathTl = gsap.timeline({ repeat: -1, yoyo: true });
  breathTl
    .to(camera.position, { x: camPos.x + 0.10, duration: 3.5, ease: 'sine.inOut' }, 0)
    .to(camera.position, { y: camPos.y + 0.06, duration: 4.2, ease: 'sine.inOut' }, 0);

  /* ---------- OPEN timeline ---------- */
  const openTl = gsap.timeline({ paused: true });
  openTl
    // Anticipation — lid leans forward 0.08rad over 0.18s, then settles back
    .to(hinge.rotation, { x: 0.08, duration: 0.18, ease: 'sine.in' }, 0)
    .to(hinge.rotation, { x: 0, duration: 0.10, ease: 'sine.out' }, 0.18)
    // Main hinge rotation — slow ramp with overshoot/settle (back.out)
    .to(hinge.rotation, { x: -1.95, duration: 1.30, ease: 'back.out(1.2)' }, 0.28)
    // Camera dolly closer + slight downward
    .to(camera.position,
        { x: camOpen.x, y: camOpen.y, z: camOpen.z, duration: 1.50, ease: 'power2.inOut' },
        0.20)
    // Look-target shifts forward slightly (so camera tilts down into box)
    .to(look,
        { x: lookOpen.x, y: lookOpen.y, z: lookOpen.z, duration: 1.50, ease: 'power2.inOut' },
        0.20)
    // Inner glow ramps up
    .to(innerGlow, { intensity: 1.6, duration: 1.0, ease: 'power2.in' }, 0.45)
    .call(() => {
      // After settle, kick off a continuous subtle sway loop
      idleSwayTl.play(0);
    });

  /* ---------- IDLE-OPEN sway (camera + glow micro-motion when held open) ---------- */
  const idleSwayTl = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
  idleSwayTl
    .to(camera.position, { x: camOpen.x + 0.05, duration: 2.2, ease: 'sine.inOut' }, 0)
    .to(camera.position, { y: camOpen.y + 0.03, duration: 2.6, ease: 'sine.inOut' }, 0)
    .to(innerGlow, { intensity: 1.85, duration: 1.4, ease: 'sine.inOut' }, 0);

  /* ---------- FLY timeline (called by parent when transitioning to main page) ---------- */
  const flyTl = gsap.timeline({
    paused: true,
    onComplete: () => { if (onFlyComplete) onFlyComplete(); }
  });
  flyTl
    .call(() => { idleSwayTl.kill(); breathTl.kill(); }, [], 0)
    // Camera dollies INTO the box opening
    .to(camera.position,
        { x: camFly.x, y: camFly.y, z: camFly.z, duration: 1.20, ease: 'power3.inOut' }, 0)
    .to(look,
        { x: lookFly.x, y: lookFly.y, z: lookFly.z, duration: 1.20, ease: 'power3.inOut' }, 0)
    // Box chrome fades out — staggered for organic feel
    .to(allFadingMats,
        { opacity: 0, duration: 0.85, ease: 'power2.in', stagger: 0.04,
          onStart: function() {
            allFadingMats.forEach(m => { m.transparent = true; });
          }
        }, 0.40)
    // Inner glow blooms hot then fades — feels like a flash handoff
    .to(innerGlow, { intensity: 4.2, duration: 0.7, ease: 'power2.in' }, 0)
    .to(innerGlow, { intensity: 0, duration: 0.5, ease: 'power2.out' }, 0.7);

  /* ---------- render loop ---------- */
  let raf;
  function render() {
    camera.lookAt(look);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(render);
  }
  raf = requestAnimationFrame(render);

  /* ---------- resize ---------- */
  const ro = new ResizeObserver(() => {
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    if (!cw || !ch) return;
    w = cw; h = ch;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  ro.observe(container);

  if (onReady) requestAnimationFrame(onReady);

  /* ---------- public API ---------- */
  let openCalled = false, flyCalled = false;
  return {
    open() {
      if (openCalled) return;
      openCalled = true;
      breathTl.kill();
      openTl.play(0);
    },
    fly() {
      if (flyCalled) return;
      flyCalled = true;
      flyTl.play(0);
    },
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      breathTl.kill();
      openTl.kill();
      idleSwayTl.kill();
      flyTl.kill();
      renderer.dispose();
      [baseMat, lidSideMat, lidTopMat, lidBottomMat, innerMat, wallMat, tissueMat]
        .forEach(m => { if (m.map) m.map.dispose(); m.dispose(); });
      tissueGroup.traverse(o => { if (o.isMesh) o.geometry.dispose(); });
      cavity.traverse(o => { if (o.isMesh) o.geometry.dispose(); });
      baseGeo.dispose(); lidGeo.dispose();
      innerFloor.geometry.dispose();
      floor.geometry.dispose();
      lidBrand.dispose();
      grain.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    }
  };
}

window.LatinaShoebox = { createShoebox };
window.dispatchEvent(new Event('latina-shoebox-ready'));
