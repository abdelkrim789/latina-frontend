/* global React */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

/* ============================================================
   SVG ICONS — minimal, monoline
   ============================================================ */

/* Brand mark — uses the actual Latina logo SVG exported from Figma.
   The SVG has its own rose-gold colors so `color` prop is ignored;
   `size` sets the rendered height (width scales proportionally 319:178). */
const LotusMark = ({ size = 56 }) => {
  const w = Math.round(size * (319 / 178));
  return (
    <img
      src="assets/latina-mark.svg"
      width={w}
      height={size}
      alt="Latina logo mark"
      style={{ display: "block", objectFit: "contain" }}
      draggable={false}
    />
  );
};

const IconBag = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

const IconHeart = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <path d="M12 21s-7-4.5-9.5-9C0.5 8 3 4 7 4c2 0 4 1 5 3 1-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.5 12 21 12 21z" />
  </svg>
);

const IconSearch = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

const IconUser = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1-4 5-6 8-6s7 2 8 6" />
  </svg>
);

const IconTruck = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
    <path d="M2 7h11v10H2zM13 10h5l3 3v4h-8z" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
  </svg>
);

const IconCash = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
    <rect x="2" y="6" width="20" height="12" rx="1" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconShield = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
    <path d="M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-0.5 8-4 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconReturn = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}>
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
);

/* ============================================================
   PRODUCT PLACEHOLDER CARD
   ============================================================ */

const ProductCard = ({ product, onAdd, onQuickView, onWishlist, wishlisted, badge, lang = "fr" }) => {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);

  // Compute unique colors from real variant data
  const colorSwatches = useMemo(() => {
    if (!product.variants?.length) return [];
    const seen = {};
    product.variants.forEach(v => {
      if (!v.color) return;
      if (!seen[v.color]) seen[v.color] = false;
      if (v.stock > 0) seen[v.color] = true;
    });
    return Object.entries(seen).map(([color, hasStock]) => ({ color, hasStock }));
  }, [product.variants]);

  // Tilt-on-hover — tracks pointer position and applies subtle 3D rotation.
  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const ry = (px - 0.5) *  6;   // rotateY in deg
    const rx = (0.5 - py) *  4;   // rotateX in deg
    el.style.setProperty("--rx", rx.toFixed(2) + "deg");
    el.style.setProperty("--ry", ry.toFixed(2) + "deg");
  };
  const onMouseLeave = () => {
    setHover(false);
    const el = ref.current;
    if (el) { el.style.setProperty("--rx","0deg"); el.style.setProperty("--ry","0deg"); }
  };

  const handleAdd = (e) => {
    e.stopPropagation();
    const pos = ref.current
      ? (() => { const r = ref.current.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; })()
      : { x: 0, y: 0 };
    onAdd?.(product, pos);
  };
  const handleQuickView = (e) => { e.stopPropagation(); onQuickView?.(product); };
  const handleWishlist = (e) => { e.stopPropagation(); onWishlist?.(product); };

  const stock = product.stock ?? 99;
  const lowStock = stock > 0 && stock <= 4;
  const outOfStock = stock === 0;

  const labels = {
    fr: { add: "+ Panier", quick: "Aperçu rapide", wish: "Favori", low: "Plus que", remaining: "en stock", out: "Bientôt de retour", restock: "Me prévenir" },
    ar: { add: "+ السلة",  quick: "عرض سريع",      wish: "المفضلة", low: "تبقى",      remaining: "في المخزون", out: "قريباً يعود",  restock: "أعلميني" },
    en: { add: "+ Cart",   quick: "Quick view",     wish: "Wishlist",low: "Only",       remaining: "left",       out: "Back soon",    restock: "Notify me" }
  }[lang] || {};

  // Category label from _tab
  const catLabels = { shoes: {fr:"Chaussures",ar:"أحذية",en:"Shoes"}, bags: {fr:"Sacs",ar:"حقائب",en:"Bags"}, access: {fr:"Accessoires",ar:"إكسس.",en:"Acc."} };
  const catLabel = product._catLabel || catLabels[product._tab]?.[lang] || null;

  // Compare price — show only if compare > price
  const hasDiscount = product.compare && product.compare > product.price;

  // Cap color swatches at 6, show overflow count
  const visibleSwatches = colorSwatches.slice(0, 6);
  const hiddenCount = colorSwatches.length - visibleSwatches.length;

  return (
    <div
      ref={ref}
      className={`product-card pc-tilt ${hover ? "is-hover" : ""} ${outOfStock ? "is-out" : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleQuickView}
    >
      <div className="pc-tilt-inner">
        {badge && <span className={`product-badge ${typeof badge === "object" ? badge.kind || "" : ""}`}>{typeof badge === "object" ? badge.text : badge}</span>}

        <button
          type="button"
          className={`pc-wish ${wishlisted ? "on" : ""}`}
          aria-label={labels.wish}
          aria-pressed={!!wishlisted}
          onClick={handleWishlist}
        >
          <IconHeart width={14} height={14} />
        </button>

        <div className="product-image">
          {(product.img || product.image) ? (
            <img src={product.img || product.image} alt={product.name} className="pc-img" loading="lazy" />
          ) : (
            <>
              <span className="ph-label">{product.cat || catLabel}</span>
              <span className="ph-sku">SKU · {product.sku}</span>
            </>
          )}
          {outOfStock && <div className="pc-out-overlay">{labels.out}</div>}
          <button type="button" className="pc-quick" onClick={handleQuickView}>
            <IconSearch width={12} height={12} />
            <span>{labels.quick}</span>
          </button>
        </div>

        <div className="meta">
          {catLabel && <span className="pc-cat-tag">{catLabel}</span>}
          <div className="pc-name-row">
            <span className="name">{product.name}</span>
          </div>
          {visibleSwatches.length > 0 && (
            <div className="pc-colors">
              {visibleSwatches.map(({ color, hasStock }) => (
                <span
                  key={color}
                  className={`pc-color-dot${hasStock ? "" : " sold-out"}`}
                  style={{ background: COLOR_SWATCHES[color] || "#ccc" }}
                  title={color}
                />
              ))}
              {hiddenCount > 0 && <span className="pc-color-more">+{hiddenCount}</span>}
            </div>
          )}
          <div className="pc-price-row">
            <div className="pc-prices">
              <span className="price t-num">{Number(product.price).toLocaleString("fr-DZ")} DA</span>
              {hasDiscount && <span className="pc-compare t-num">{Number(product.compare).toLocaleString("fr-DZ")}</span>}
            </div>
            {lowStock && <span className="pc-low t-mono">{labels.low} {stock}</span>}
            {outOfStock ? (
              <button type="button" className="pc-restock" onClick={(e)=>{e.stopPropagation(); onQuickView?.(product, { restockMode: true });}}>
                {labels.restock} →
              </button>
            ) : (
              <button type="button" className="pc-add" onClick={handleAdd}>{labels.add}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ACT 1 — CINEMATIC OPENING v3  "BLOOM FROM NOTHING"
   Void → ink bloom → logo crystallises → name scrambles →
   petals erupt from mark → iris-close reveals the site.
   ============================================================ */

const BoxOpening = ({ onComplete, lang = "fr", speed = 1 }) => {
  const rootRef     = useRef(null);
  const canvasRef   = useRef(null);
  const tlRef       = useRef(null);
  const psRef       = useRef({ raf: 0, particles: [], active: false });
  const scramIntRef = useRef(null);

  const copy = ({
    fr: { skip: "Passer", sub: "Une boutique pensée juste pour vous" },
    ar: { skip: "تجاوز", sub: "متجر صُمِّم خصيصاً لكِ" },
    en: { skip: "Skip",  sub: "A boutique designed just for you" }
  })[lang] || { skip: "Skip", sub: "" };

  /* Scramble state — 6 chars for "LATINA" */
  const [scrambleChars, setScrambleChars] = useState(
    Array(6).fill(null).map(() => ({ char: " ", resolved: false }))
  );

  /* 14 background rain petals (reduced from 42 — more intentional) */
  const petals = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
    id: i,
    left:    5 + Math.random() * 90,
    delay:   Math.random() * 8,
    dur:     5 + Math.random() * 6,
    size:    8 + Math.random() * 22,
    ratio:   0.5 + Math.random() * 0.7,
    drift:   (Math.random() - 0.5) * 360,
    rot:     Math.random() * 1440 - 720,
    rotX:    Math.random() * 60 - 30,
    opacity: 0.15 + Math.random() * 0.28,
    color:   ["#F2C9C0","#E8A89A","#E2B8A2","#F9E8E1","#CB9E7F"][Math.floor(Math.random()*5)],
    shape:   i % 3,
  })), []);

  /* 8 bloom petals that erupt outward from the logo centre */
  const bloomPetalData = useMemo(() => Array.from({ length: 8 }, (_, i) => {
    const angle = ((i * 45) - 90) * Math.PI / 180;
    const dist  = 145;
    return {
      id:    i,
      tx:    Math.round(Math.cos(angle) * dist),
      ty:    Math.round(Math.sin(angle) * dist),
      color: ["#F2C9C0","#CB9E7F","#E2B8A2","#EFE8D8","#F9E8E1","#D4A080","#E8A89A","#F2C9C0"][i],
    };
  }), []);

  /* ── Canvas particle system (rising shimmer) ──────────────── */
  const startParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const COLS = ["#CB9E7F","#F2C9C0","#E2B8A2","#D4A080","#EFE8D8","#BB8B68"];
    const spawn = () => ({
      x:     window.innerWidth  * (0.25 + Math.random() * 0.5),
      y:     window.innerHeight * (0.5  + Math.random() * 0.15),
      vx:    (Math.random() - 0.5) * 1.0,
      vy:   -(0.4 + Math.random() * 1.8),
      size:  0.8 + Math.random() * 2.8,
      life:  1,
      decay: 0.004 + Math.random() * 0.007,
      color: COLS[Math.floor(Math.random() * COLS.length)],
      glow:  Math.random() > 0.55,
    });

    const ps = psRef.current;
    ps.active = true;
    let last = 0;

    const tick = (ts) => {
      if (!ps.active) { window.removeEventListener("resize", resize); return; }
      if (ts - last > 35) { for (let i = 0; i < 4; i++) ps.particles.push(spawn()); last = ts; }

      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      ps.particles = ps.particles.filter(p => p.life > 0);
      for (const p of ps.particles) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vy -= 0.012;
        p.life -= p.decay;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life * 0.75);
        if (p.glow) { ctx.shadowColor = p.color; ctx.shadowBlur = 10; }
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ps.raf = requestAnimationFrame(tick);
    };
    ps.raf = requestAnimationFrame(tick);
  }, []);

  const stopParticles = useCallback(() => {
    psRef.current.active = false;
    cancelAnimationFrame(psRef.current.raf);
  }, []);

  /* ── Scramble wordmark ────────────────────────────────────── */
  const clearScramble = useCallback(() => {
    if (scramIntRef.current) { clearInterval(scramIntRef.current); scramIntRef.current = null; }
    setScrambleChars(["L","A","T","I","N","A"].map(ch => ({ char: ch, resolved: true })));
  }, []);

  const startScramble = useCallback(() => {
    const target   = ["L","A","T","I","N","A"];
    const charset  = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const maxCyc   = [5, 8, 11, 14, 10, 6];
    const cycles   = [0, 0, 0, 0, 0, 0];
    const resolved = [false, false, false, false, false, false];
    setScrambleChars(target.map(() => ({
      char: charset[Math.floor(Math.random() * charset.length)], resolved: false,
    })));
    gsap.set(".ci-wordmark", { opacity: 1 });
    const interval = setInterval(() => {
      for (let i = 0; i < 6; i++) cycles[i]++;
      const next = target.map((ch, i) => {
        if (resolved[i]) return { char: ch, resolved: true };
        if (cycles[i] >= maxCyc[i]) { resolved[i] = true; return { char: ch, resolved: true }; }
        return { char: charset[Math.floor(Math.random() * charset.length)], resolved: false };
      });
      setScrambleChars(next);
      if (resolved.every(Boolean)) { clearInterval(interval); scramIntRef.current = null; }
    }, 55);
    scramIntRef.current = interval;
  }, []);

  /* ── Bloom petals erupt from logo centre ─────────────────── */
  const fireBloomPetals = useCallback(() => {
    if (!rootRef.current) return;
    rootRef.current.querySelectorAll(".ci-bloom-petal").forEach((el, i) => {
      const tx = parseFloat(el.dataset.tx);
      const ty = parseFloat(el.dataset.ty);
      gsap.set(el, { opacity: 0, x: 0, y: 0, scale: 0 });
      const bt = gsap.timeline({ delay: i * 0.07 });
      bt.to(el, { opacity: 0.88, x: tx * 0.42, y: ty * 0.42, scale: 1, duration: 0.44, ease: "power3.out" })
        .to(el, { opacity: 0, x: tx * 2.1, y: ty * 2.1 + 110, scale: 0.28, duration: 1.35, ease: "power1.in" });
    });
  }, []);

  /* ── GSAP master timeline ─────────────────────────────────── */
  useEffect(() => {
    if (!rootRef.current || !window.gsap) return;
    const D = (s) => s / Math.max(0.3, speed);
    startParticles();

    /* ── Initial states ── */
    gsap.set(rootRef.current, { clipPath: "circle(150% at 50% 45%)" });
    gsap.set(".ci-glow",      { opacity: 0, scale: 0.12 });
    gsap.set(".ci-logo-svg",  { scale: 0.80 });
    gsap.set(".ci-lp",        { opacity: 0 });
    gsap.set(".ci-wordmark",  { opacity: 0 });
    gsap.set(".ci-eyebrow",   { opacity: 0, y: -12 });
    gsap.set(".ci-tagline-w", { opacity: 0, y: 18 });
    gsap.set(".ci-rule",      { scaleX: 0 });
    gsap.set(".ci-sub",       { opacity: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    /* Phase 1 — Ink bloom: glow expands from a single warm point */
    tl.to(".ci-glow",
      { opacity: 1, scale: 1, duration: D(2.2), ease: "power2.out" }, D(0.15))

    /* Phase 2 — Logo crystallises: SVG scales in while paths stagger to opacity */
    .to(".ci-logo-svg",
      { scale: 1, duration: D(1.6), ease: "back.out(1.15)" }, D(0.65))
    .to(".ci-lp",
      { opacity: 1, stagger: 0.023, duration: D(0.26), ease: "power2.out" }, D(0.75))

    /* Phase 3 — Wordmark scrambles into place */
    .call(startScramble, [], D(2.25))

    /* Phase 4 — 8 petals erupt radially from the logo centre */
    .call(fireBloomPetals, [], D(2.85))

    /* Phase 5 — Collection eyebrow */
    .to(".ci-eyebrow",
      { opacity: 1, y: 0, duration: D(0.75), ease: "power3.out" }, D(3.25))

    /* Phase 6 — Tagline words + rules */
    .to(".ci-tagline-w",
      { opacity: 1, y: 0, stagger: D(0.11), duration: D(0.6), ease: "back.out(1.8)" }, D(3.55))
    .to(".ci-rule",
      { scaleX: 1, stagger: 0.04, duration: D(0.9), ease: "expo.out" }, D(3.6))

    /* Phase 7 — Sub copy */
    .to(".ci-sub",
      { opacity: 1, duration: D(0.8), ease: "power2.out" }, D(4.0))

    /* Hold */
    .to({}, { duration: D(2.3) })

    /* Phase 8 — Exit: content fades up, iris collapses to centre */
    .to(".ci-content",
      { opacity: 0, y: -14, duration: D(0.48), ease: "power2.in" }, "exit")
    .to(".ci-glow",
      { opacity: 0, scale: 1.9, duration: D(0.65), ease: "power2.in" }, "exit+=0.05")
    .to(rootRef.current,
      {
        clipPath: "circle(0% at 50% 45%)",
        duration: D(0.85),
        ease: "power2.inOut",
        onComplete: () => { stopParticles(); clearScramble(); onComplete?.(); },
      }, "exit+=0.18")
    .to(".ci-bg",
      { opacity: 0, duration: D(0.35), ease: "linear" }, "exit+=0.62");

    return () => { tl.kill(); stopParticles(); clearScramble(); };
  }, [speed]);

  /* Skip handler — iris-collapses immediately */
  const skip = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    stopParticles();
    clearScramble();
    gsap.to(rootRef.current, {
      clipPath: "circle(0% at 50% 45%)",
      duration: 0.55, ease: "power2.inOut",
      onComplete: () => onComplete?.(),
    });
  }, [onComplete]);

  return (
    <div ref={rootRef} className="ci-stage" aria-live="polite">
      {/* Background */}
      <div className="ci-bg" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="ci-canvas" aria-hidden="true" />

      {/* Ambient glow orb */}
      <div className="ci-glow" aria-hidden="true" />

      {/* Background petal rain (14, subtle) */}
      <div className="ci-petals" aria-hidden="true">
        {petals.map(p => (
          <span
            key={p.id}
            className={`ci-petal ci-petal-s${p.shape}`}
            style={{
              left: `${p.left}%`,
              width:  p.size,
              height: p.size * p.ratio,
              background: p.color,
              animationDelay:    `${p.delay}s`,
              animationDuration: `${p.dur}s`,
              opacity: p.opacity,
              "--pdrift": `${p.drift}px`,
              "--prot":   `${p.rot}deg`,
              "--protX":  `${p.rotX}deg`,
            }}
          />
        ))}
      </div>

      {/* Core content */}
      <div className="ci-content">

        {/* Brand mark + scramble wordmark */}
        <div className="ci-logo-wrap">

          {/* Bloom petals — erupt from logo centre via GSAP */}
          <div className="ci-bloom-wrap" aria-hidden="true">
            {bloomPetalData.map(({ id, tx, ty, color }) => (
              <span
                key={id}
                className="ci-bloom-petal"
                data-tx={`${tx}`}
                data-ty={`${ty}`}
                style={{ background: color }}
              />
            ))}
          </div>

          {/* Inline SVG — each path targeted individually by GSAP */}
          <svg className="ci-logo-svg" viewBox="0 0 319 178" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g clipPath="url(#ci-logo-clip)">
              <path className="ci-lp" d="M140.333 33.5128C142.829 29.0773 148.429 23.4804 152.338 19.9762C152.907 19.4656 153.671 19.705 154.416 19.8507C159.099 22.2782 165.799 31.4005 168.432 36.0865C168.911 36.9388 170.661 40.6461 171.185 40.907C172.197 40.337 173.38 39.9513 174.476 39.5502C177.93 38.0863 181.55 37.0511 185.256 36.4679C186.815 35.7093 194.239 35.3028 196.386 35.2657C197.001 35.2765 197.999 35.2638 198.581 35.3273C201.62 47.4488 200.147 63.324 193.712 74.416C187.434 85.2389 179 89.0422 167.394 92.114C152.707 96.0016 139.181 93.8312 125.703 86.9839C119.799 83.9845 110.29 74.3689 110.849 66.8566L110.767 66.3307C103.914 67.5326 97.1501 72.6598 93.0137 78.2194C86.9652 86.3491 87.2892 97.3693 90.4944 106.569C90.7996 107.445 92.0844 109.321 92.2069 110.046C92.1746 110.933 92.9066 111.23 92.7585 111.794C91.8694 111.619 90.8349 111.058 89.9489 110.706L89.2726 110.787C89.1517 111.186 89.1504 111.262 89.1497 111.679C87.6733 112.781 87.3262 111.182 86.7985 111.292C86.0282 110.318 84.5434 106.623 84.1457 105.357C81.5365 97.0489 82.1762 87.6089 86.0689 79.8394C91.0842 70.4859 95.0994 66.544 105.236 62.6411C106.209 62.2984 107.315 61.9762 108.307 61.6662C107.947 60.2464 107.596 58.9594 107.565 57.4926C107.421 57.053 107.298 55.637 107.199 55.124C106.313 50.5124 106.879 41.7709 108.196 37.189C108.433 36.3452 108.676 35.9732 109.36 35.4742C111.918 35.3438 118.415 35.5266 120.884 36.1981C124.158 36.2362 132.995 39.1125 135.813 41.0076L136.909 39.0955C137.139 38.2338 139.731 34.213 140.333 33.5128Z" fill="#CB9E7F"/>
              <path className="ci-lp" d="M114.607 65.9718C115.51 65.5002 121.86 66.3966 123.125 66.6069C133.948 68.4087 141.368 80.1346 147.057 88.6775C137.056 86.322 125.942 83.3581 119.747 74.448C118.793 73.0768 117.888 71.6815 116.981 70.2798C116.427 69.1188 115.318 66.9579 114.607 65.9718Z" fill="#EFE8D8"/>
              <path className="ci-lp" d="M86.0689 79.8394L86.6434 79.6034L86.9142 79.7808C86.9139 80.1203 86.9083 80.4598 86.8975 80.7991C83.0768 88.9098 82.8703 98.284 85.7624 106.752C87.6195 112.189 88.6306 109.759 89.9531 110.643L89.9489 110.706L89.2726 110.787C89.1517 111.186 89.1504 111.262 89.1497 111.679C87.6733 112.781 87.3262 111.182 86.7985 111.292C86.0282 110.318 84.5434 106.623 84.1457 105.357C81.5365 97.0489 82.1762 87.6089 86.0689 79.8394Z" fill="#BB8B68"/>
              <path className="ci-lp" d="M140.333 33.5128C142.829 29.0773 148.429 23.4804 152.338 19.9762C152.907 19.4656 153.671 19.705 154.416 19.8507C154.209 20.2623 146.543 27.4033 145.477 28.5508C143.91 30.2372 142.616 32.1665 141.375 34.099C140.974 34.8722 139.415 37.9392 139.01 38.4553C138.314 38.9596 137.794 39.6857 137.46 40.4755C137.256 40.9567 137.211 41.4778 136.715 41.4954C136.261 40.9602 136.318 41.1783 136.32 40.6302C136.767 39.9886 136.869 39.8635 136.909 39.0955C137.139 38.2338 139.731 34.213 140.333 33.5128Z" fill="#936850"/>
              <path className="ci-lp" d="M140.333 33.5129L140.652 33.5796C141.648 32.3804 143.376 29.5598 144.202 28.7875L144.619 28.8054C144.413 29.5301 141.033 33.2238 141.191 34.0795L141.375 34.099C140.974 34.8722 139.415 37.9392 139.01 38.4553C138.314 38.9596 137.794 39.6857 137.46 40.4755C137.256 40.9567 137.211 41.4778 136.715 41.4954C136.261 40.9602 136.318 41.1783 136.32 40.6302C136.767 39.9886 136.869 39.8635 136.909 39.0955C137.139 38.2338 139.731 34.213 140.333 33.5129Z" fill="#9E7658"/>
              <path className="ci-lp" d="M86.0689 79.8394C91.0842 70.4859 95.0995 66.544 105.236 62.6411C105.317 63.0429 105.469 63.618 105.328 63.9962C99.6708 65.3962 96.2933 68.7271 92.3281 72.648C89.6906 75.2559 88.5694 77.5477 86.8975 80.7991C86.9083 80.4598 86.9139 80.1203 86.9142 79.7809L86.6434 79.6034L86.0689 79.8394Z" fill="#9C6951"/>
              <path className="ci-lp" d="M120.884 36.1981C124.158 36.2362 132.995 39.1125 135.813 41.0076L136.909 39.0955C136.869 39.8635 136.767 39.9886 136.32 40.6302C136.318 41.1783 136.261 40.9602 136.715 41.4954C137.211 41.4778 137.256 40.9567 137.46 40.4755C137.794 39.6857 138.314 38.9596 139.01 38.4553C138.566 39.4788 137.423 41.5287 136.649 42.288C135.985 42.5071 134.909 41.8922 134.263 41.5983C131.362 40.3003 128.369 39.2165 125.31 38.3557C124.088 38.0235 121.774 37.6086 120.739 37.2237C120.407 36.8213 119.83 36.72 119.309 36.5604L119.862 36.5527L119.994 36.3068C120.324 36.3561 120.557 36.2729 120.884 36.1981Z" fill="#BC9176"/>
              <path className="ci-lp" d="M108.196 37.189C108.433 36.3452 108.676 35.9732 109.36 35.4742C109.376 35.9616 109.347 36.4721 109.532 36.9094C109.316 37.5163 109.076 38.2505 108.813 38.8257C107.448 46.3615 107.529 50.718 108.515 58.2768L108.344 58.4174C108.343 58.5815 108.312 59.4543 108.349 59.544C108.166 58.7376 107.894 58.2486 107.565 57.4926C107.421 57.053 107.298 55.637 107.199 55.124C106.313 50.5124 106.879 41.7709 108.196 37.189Z" fill="#8C6144"/>
              <path className="ci-lp" d="M114.433 66.0065L114.607 65.9718C115.318 66.9579 116.427 69.1188 116.981 70.2798C116.276 70.655 115.522 70.9024 115.369 71.7117C115.632 72.099 115.713 72.2165 115.885 72.6501L115.593 73.3108C115.137 73.656 115.356 73.5889 114.769 73.5512C113.22 72.7151 112.077 70.521 112.242 68.764C113.334 68.8156 114.436 66.9233 114.433 66.0065Z" fill="#D2AC93"/>
              <path className="ci-lp" d="M185.256 36.4679C186.815 35.7093 194.239 35.3028 196.386 35.2657L197.055 35.4964C196.859 35.593 196.919 35.5199 196.815 35.6796L196.636 35.3295C196.629 35.5745 196.667 35.7639 196.558 35.9381C194.649 37.1259 190.295 36.8822 188.025 37.4633C187.366 37.6321 185.238 37.947 184.576 37.9204L185.32 37.6148C183.997 37.3637 182.603 38.452 181.344 37.6699C182.254 37.2646 184.492 37.2102 185.256 36.4679Z" fill="#9E7658"/>
              <path className="ci-lp" d="M109.36 35.4741C111.918 35.3438 118.415 35.5266 120.884 36.1981C120.557 36.2729 120.324 36.3561 119.994 36.3068L119.862 36.5527L119.309 36.5604C119.83 36.72 120.407 36.8213 120.739 37.2237C118.795 37.0163 110.679 35.847 109.532 36.9094C109.347 36.4721 109.376 35.9616 109.36 35.4741Z" fill="#936850"/>
              <path className="ci-lp" d="M174.477 39.5502C177.93 38.0863 181.55 37.0511 185.256 36.4679C184.492 37.2102 182.254 37.2646 181.344 37.6699C182.603 38.452 183.997 37.3637 185.32 37.6148L184.576 37.9204C181.779 38.0499 178.709 39.2365 176.133 40.265C175.665 40.2348 175.361 40.3161 174.885 40.3226L174.477 39.5502Z" fill="#8C6144"/>
              <path className="ci-lp" d="M107.565 57.4926C107.894 58.2486 108.166 58.7376 108.349 59.544C108.312 59.4543 108.343 58.5815 108.344 58.4174L108.515 58.2768C108.732 58.7704 109.83 63.2276 109.182 63.3134C107.73 63.5055 106.827 63.3949 105.328 63.9962C105.469 63.618 105.317 63.0429 105.236 62.6411C106.209 62.2984 107.315 61.9762 108.307 61.6662C107.947 60.2464 107.596 58.9594 107.565 57.4926Z" fill="#BC9176"/>
              <path className="ci-lp" d="M171.185 40.907C172.197 40.337 173.38 39.9513 174.476 39.5502L174.885 40.3226C175.361 40.3161 175.665 40.2348 176.133 40.265C175.742 40.4548 175.21 40.7653 174.822 40.9033C173.371 41.4194 171.815 43.2069 171.185 40.907Z" fill="#936850"/>
              <path className="ci-lp" d="M110.767 66.3307C112.006 66.1805 113.184 66.0128 114.433 66.0065C114.436 66.9233 113.334 68.8156 112.242 68.764C112.052 67.6791 112.071 66.9153 110.849 66.8566L110.767 66.3307Z" fill="#F2D2B2"/>
              <path className="ci-lp" d="M112.178 40.7881C117.388 40.8901 130.011 42.3871 133.779 45.787C133.543 46.8409 133.531 48.109 133.479 49.2012C133.825 48.5966 134.835 46.692 135.313 46.4008L135.51 46.5945C135.419 47.2898 135.168 47.3906 135.016 48.1068C134.439 50.8341 134.095 53.3522 133.856 56.0062C133.637 58.4365 135.096 65.1174 134.627 66.5494C134.25 66.77 134.447 66.7194 134.016 66.7147C132.14 66.2454 130.437 65.145 128.639 64.4346C126.499 63.5889 124.006 62.9868 121.819 62.3441C119.585 61.6878 114.956 62.3353 113.197 61.5729C113.111 61.184 113.105 61.3419 113.368 60.9115C114.442 60.2405 116.761 60.5447 118.265 60.4729C116.988 60.2339 113.872 60.2876 112.459 60.2829C112.52 57.5686 112.241 54.2924 112.154 51.5397C112.068 47.9562 112.076 44.3712 112.178 40.7881Z" fill="#EFE8D8"/>
              <path className="ci-lp" d="M118.265 60.4729C123.212 60.6346 125.862 61.5179 130.415 63.5969C131.227 63.9677 133.003 65.1344 133.589 65.1868C133.887 65.7993 133.906 66.0387 134.016 66.7147C132.14 66.2454 130.437 65.145 128.639 64.4346C126.499 63.5889 124.006 62.9868 121.819 62.3441C119.585 61.6878 114.956 62.3353 113.197 61.5729C113.111 61.184 113.105 61.3419 113.368 60.9115C114.442 60.2405 116.761 60.5447 118.265 60.4729Z" fill="#BC9176"/>
              <path className="ci-lp" d="M133.479 49.2012C133.825 48.5966 134.835 46.692 135.313 46.4008L135.51 46.5945C135.419 47.2898 135.168 47.3906 135.016 48.1068C134.439 50.8341 134.095 53.3522 133.856 56.0062C133.637 58.4365 135.096 65.1174 134.627 66.5494C134.25 66.77 134.447 66.7194 134.016 66.7147C133.906 66.0387 133.887 65.7993 133.589 65.1868C132.797 60.2747 132.211 54.0687 133.479 49.2012Z" fill="#B38B64"/>
              <path className="ci-lp" d="M141.426 42.0782C142.24 40.3213 143.098 38.5537 144.138 36.9188C145.458 34.8447 151.008 27.6917 153.037 26.9828C153.4 26.8559 153.673 26.8759 154.027 27.0444C156.766 28.3493 165.203 39.7208 166.158 42.6998C166.237 42.9449 166.259 43.1222 166.194 43.3731C166.866 43.2032 166.674 43.1429 167.18 43.4143C167.381 43.8582 167.23 44.1711 167.095 44.6365C163.626 48.222 158.918 50.5066 156.581 55.4049C156.211 56.1816 154.884 58.3998 154.021 58.5258C153.919 58.1083 153.94 58.0177 153.962 57.5814C153.207 57.4551 152.241 55.3304 151.869 54.556C149.588 49.7983 145.574 47.6067 142.15 44.1405L142.035 44.0237C140.824 43.3042 141.169 43.4424 141.426 42.0782Z" fill="#EFE8D8"/>
              <path className="ci-lp" d="M166.194 43.3731C166.866 43.2032 166.674 43.1429 167.18 43.4143C167.381 43.8582 167.23 44.1711 167.095 44.6365C163.626 48.222 158.918 50.5066 156.581 55.4049C156.211 56.1816 154.884 58.3998 154.021 58.5258C153.919 58.1083 153.94 58.0177 153.962 57.5814C154.52 55.65 156.39 53.0574 157.566 51.4234C159.882 48.206 163.061 45.7418 166.194 43.3731Z" fill="#9E7658"/>
              <path className="ci-lp" d="M173.206 45.6228C179.281 42.3871 187.628 40.9445 194.486 40.4203C194.545 42.5203 194.802 44.4864 194.886 46.5496C195.07 51.1338 194.78 55.7248 194.018 60.2492C186.928 60.4689 179.867 60.9372 173.759 65.1812C174.786 58.647 174.857 53.9526 173.49 47.4405C173.512 46.649 173.42 46.3951 173.206 45.6228Z" fill="#EFE8D8"/>
              <path className="ci-lp" d="M192.064 65.7232C192.553 65.4767 192.855 65.0216 193.184 64.5997L193.323 64.6663C193.1 67.4323 190.844 73.8799 188.748 75.845C188.011 76.5367 186.964 76.5657 185.911 76.8887L185.692 76.7658C182.646 79.3367 182.572 79.9609 178.826 82.3255C178.294 83.4015 176.02 83.9103 175.801 84.2284C174.556 86.0345 175.473 86.1398 172.609 87.1006C171.592 87.442 168.937 88.2423 167.876 88.279L167.765 88.1194L168.351 87.5944C167.312 86.8367 166.167 88.0989 164.892 87.6544C164.544 87.6066 161.025 88.3727 160.403 88.4924C160.987 87.4387 161.588 86.3736 162.259 85.3632C167.703 77.1661 173.089 69.0051 183.387 66.6699C185.019 66.2998 190.835 65.1623 192.064 65.7232Z" fill="#EFE8D8"/>
              <path className="ci-lp" d="M192.064 65.7232C192.553 65.4767 192.855 65.0216 193.184 64.5997L193.323 64.6663C193.1 67.4323 190.844 73.8799 188.748 75.845C188.011 76.5367 186.964 76.5657 185.911 76.8887L185.692 76.7658C189.754 72.1917 189.737 70.8838 192.064 65.7232Z" fill="#9E7658"/>
              <path className="ci-lp" d="M178.826 82.3255C178.294 83.4015 176.02 83.9103 175.801 84.2284C174.556 86.0345 175.473 86.1398 172.609 87.1006C171.592 87.442 168.937 88.2423 167.876 88.279L167.765 88.1194L168.352 87.5944C167.312 86.8367 166.167 88.0989 164.892 87.6544C171.209 85.9481 172.939 85.3696 178.826 82.3255Z" fill="#9E7658"/>
              <path className="ci-lp" d="M158.488 81.512C158.357 80.941 158.354 75.3175 158.301 74.13C158.399 71.5772 156.331 66.2925 156.775 64.0511C157.85 58.6166 162.579 53.1431 166.762 49.6905C167.371 49.1873 167.616 48.541 168.24 48.0515C168.561 48.7218 169.047 51.1545 169.238 52.0115C169.845 50.4159 168.603 49.2886 169.103 48.3362C170.183 49.5827 170.721 57.3038 170.504 59.3514C169.694 66.992 167.618 71.1512 163.322 77.2906C161.651 79.6781 161.209 81.1779 158.999 83.636C158.461 83.1171 158.105 82.9577 157.981 82.3182C158.146 82.0471 158.315 81.7781 158.488 81.512Z" fill="#EFE8D8"/>
              <path className="ci-lp" d="M169.238 52.0115C169.845 50.4159 168.603 49.2886 169.103 48.3362C170.183 49.5827 170.721 57.3038 170.504 59.3514C169.694 66.992 167.618 71.1512 163.322 77.2906C161.651 79.6781 161.209 81.1779 158.999 83.636C158.461 83.1171 158.104 82.9577 157.981 82.3182C158.146 82.0471 158.315 81.7781 158.488 81.512C160.15 79.6336 163.38 74.5989 164.939 72.4396C168.196 67.9279 170.458 57.5114 169.238 52.0115Z" fill="#AB795C"/>
              <path className="ci-lp" d="M137.813 51.9571C138.212 51.1844 138.831 49.7534 139.51 49.3331L140.018 49.5087C143.388 51.6615 149.81 59.6135 150.668 63.6978C150.779 64.2269 150.78 65.0277 150.771 65.5913L150.766 65.778L150.936 65.6627L151.448 65.8892C151.17 68.5309 150.899 70.8988 150.738 73.5488C150.589 76.0152 150.668 81.2021 150.118 83.4671L149.877 83.3508C149.803 82.8136 149.844 81.8381 149.638 81.5586L149.313 81.6711L149.061 81.7569C147.911 81.3917 143.378 73.98 142.41 72.515C138.379 66.4157 137.162 59.1747 137.813 51.9571Z" fill="#EFE8D8"/>
              <path className="ci-lp" d="M150.766 65.778L150.936 65.6627L151.448 65.8892C151.17 68.5309 150.899 70.8988 150.738 73.5488C150.589 76.0152 150.668 81.2021 150.118 83.4671L149.877 83.3508C149.803 82.8136 149.844 81.8381 149.638 81.5586L149.313 81.6711C149.267 79.3419 149.112 76.3995 149.363 74.1415C149.665 71.4274 150.297 68.5015 150.766 65.778Z" fill="#9E7658"/>
              <path className="ci-lp" d="M141.426 42.0782C141.169 43.4424 140.824 43.3042 142.035 44.0237C141.443 44.6276 139.868 48.1573 139.852 49.0873L140.018 49.5087L139.51 49.3331C138.831 49.7534 138.212 51.1844 137.813 51.957C137.808 48.1843 138.239 47.8747 140.118 44.4793C140.608 43.5935 140.704 43.0836 141.426 42.0782Z" fill="#F2D2B2"/>
              <path className="ci-lp" d="M173.206 45.6228C173.42 46.3951 173.512 46.649 173.49 47.4405C172.494 47.5032 170.418 48.5445 169.548 48.0158C169.889 47.1521 172.284 46.1173 173.206 45.6228Z" fill="#F2D2B2"/>
              <path className="ci-lp" d="M150.771 65.5913C150.85 64.9763 150.886 64.6281 151.069 64.0313L151.289 63.8989C151.563 64.4118 151.564 65.3309 151.448 65.8892L150.936 65.6627L150.766 65.7779L150.771 65.5913Z" fill="#BC9176"/>
              <path className="ci-lp" d="M199.666 66.7453C201.079 60.6695 202.266 62.1745 206.977 64.7021C220.807 72.1282 227.256 89.4064 222.67 104.224C220.073 112.622 213.786 117.457 207.175 122.621C197.123 130.475 185.254 135.151 172.825 137.539C157.299 140.615 141.268 140.004 126.021 135.755C122.889 134.905 119.714 133.519 116.612 132.528C114.196 131.756 112.031 130.27 109.724 129.231C101.158 125.375 90.8799 120.262 86.7985 111.292C87.3262 111.182 87.6733 112.781 89.1497 111.679C89.1504 111.262 89.1517 111.186 89.2726 110.787L89.9489 110.706C90.8349 111.058 91.8694 111.619 92.7585 111.794C92.9066 111.23 92.1746 110.933 92.2069 110.046C94.6185 113.34 97.167 117.155 101.531 117.672C112.378 118.957 123.172 109.592 134.144 108.828C139.404 108.461 144.283 110.496 148.674 113.16C150.348 114.175 152.353 115.916 154.15 116.025C155.399 115.602 157.238 114.283 158.399 113.506C161.482 111.501 163.472 110.663 166.892 109.392C171.242 108.31 176.827 109.084 180.976 110.635C188.527 113.038 200.419 119.754 207.544 115.522C224.763 105.294 221.513 78.3478 204.589 69.5365C203.151 68.788 200.782 67.6895 199.666 66.7453Z" fill="#AD8265"/>
              <path className="ci-lp" d="M166.892 109.392C171.242 108.31 176.827 109.084 180.976 110.635C179.895 111.629 177.032 110.463 175.617 110.399C173.293 110.296 170.01 110.076 167.737 110.456C167.647 109.948 167.302 109.747 166.892 109.392Z" fill="#936850"/>
              <path className="ci-lp" d="M158.399 113.506C161.482 111.501 163.472 110.663 166.892 109.392C167.302 109.747 167.647 109.948 167.737 110.456C165.389 111.193 161.548 112.783 159.614 114.362C159.149 113.944 158.931 113.824 158.399 113.506Z" fill="#8C6144"/>
              <path className="ci-lp" d="M154.15 116.025C155.399 115.602 157.238 114.283 158.399 113.506C158.931 113.824 159.149 113.944 159.614 114.362C158.626 115.255 155.573 117.505 154.324 116.658C154.263 116.467 154.162 116.214 154.15 116.025Z" fill="#936850"/>
              <path className="ci-lp" d="M131.374 114.44C138.443 113.638 140.831 114.28 146.754 118.361C148.366 119.472 150.776 120.546 152.776 120.654C161.102 121.103 163.367 113.153 172.863 113.985C179.834 114.596 183.081 117.111 189.471 119.376C192.737 120.535 196.231 121.356 199.523 122.395C197.205 123.579 194.446 125.214 192.108 126.202C171.118 135.064 148.485 137.061 126.613 130.179C122.296 128.821 110.73 125.503 107.861 122.851L107.934 122.554C108.947 122.032 109.477 122.21 110.159 121.928C110.94 120.858 119.101 119.657 119.826 117.89L119.985 118.315C120.594 117.945 120.278 117.632 120.7 116.878C121.084 116.192 122.894 115.051 123.609 114.958C123.939 114.915 126.192 115.732 126.599 115.575C128.093 114.997 129.59 114.598 131.133 114.229L131.374 114.44Z" fill="#EFE8D8"/>
              <path className="ci-lp" d="M110.159 121.928C110.94 120.858 119.101 119.657 119.826 117.89L119.985 118.315C120.594 117.945 120.278 117.632 120.7 116.878C121.084 116.192 122.894 115.051 123.609 114.958C123.939 114.915 126.192 115.732 126.599 115.575C128.093 114.997 129.59 114.598 131.133 114.229L131.374 114.44C130.001 114.937 127.826 115.494 126.394 116.053C123.525 117.172 112.679 121.848 110.159 121.928Z" fill="#D2AC93"/>
              <path className="ci-lp" d="M103.69 121.006L103.94 120.966C104.998 121.366 104.76 122.311 104.565 123.223L104.742 123.438C104.96 123.417 104.992 123.36 105.19 123.237C104.274 123.578 104.072 123.735 103.273 124.317C102.914 124.565 102.893 124.555 102.44 124.538C100.979 123.498 102.643 121.651 103.69 121.006Z" fill="#BC9176"/>
              <path className="ci-lp" d="M115.131 140.013C121.243 144.971 126.759 149.642 134.215 152.365C136.652 153.255 138.976 154.394 141.533 154.989C155.208 158.176 169.489 155.929 181.449 148.525C182.203 148.058 182.918 147.51 183.639 146.976C188.31 143.52 192.642 139.628 196.636 135.412C197.846 134.136 198.818 132.572 200.245 131.491C202.564 129.665 205.474 129.033 207.951 127.462C204.94 135.173 194.879 145.284 188.125 150.236C184.353 152.968 180.303 155.292 176.041 157.17C161.352 163.618 142.908 163.094 128.721 155.718C122.337 152.4 116.582 149.041 111.554 143.813C112.308 143.106 112.163 142.906 112.695 142.323C113.221 141.748 114.316 141.078 115.008 140.53C115.02 140.361 115.033 140.322 115.083 140.164L115.131 140.013Z" fill="#9E7359"/>
              <path className="ci-lp" d="M103.338 135.124C101.655 132.929 103.585 130.572 106.02 131.422C109.885 133.969 111.898 136.884 115.131 140.013L115.083 140.164C115.033 140.322 115.02 140.361 115.008 140.53C114.316 141.078 113.221 141.748 112.695 142.323C112.163 142.906 112.308 143.106 111.554 143.813C108.353 140.888 105.927 138.628 103.338 135.124Z" fill="#BC9176"/>
              <path className="ci-lp" d="M103.338 135.124C101.655 132.929 103.585 130.572 106.02 131.422C105.304 132.255 104.658 132.795 104.017 133.593C103.611 134.098 103.96 134.559 103.338 135.124Z" fill="#9E7658"/>
            </g>
            <defs>
              <clipPath id="ci-logo-clip">
                <rect width="318.453" height="178" fill="white"/>
              </clipPath>
            </defs>
          </svg>

          {/* Scramble wordmark */}
          <div className="ci-wordmark" aria-label="Latina">
            {scrambleChars.map(({ char, resolved }, i) => (
              <span key={i} className={`ci-wchar${resolved ? " ci-wchar--done" : ""}`}>{char}</span>
            ))}
          </div>
        </div>

        {/* Eyebrow */}
        <span className="ci-eyebrow">Collection Printemps 2026</span>

        {/* Tagline */}
        <div className="ci-tagline" aria-label="Just for you">
          <span className="ci-rule ci-rule-l" aria-hidden="true" />
          {"JUST FOR YOU".split(" ").map((w, i) => (
            <span key={i} className="ci-tagline-w">{w}</span>
          ))}
          <span className="ci-rule ci-rule-r" aria-hidden="true" />
        </div>

        {/* Sub */}
        <p className="ci-sub">{copy.sub}</p>

      </div>

      {/* Skip — ghost button, barely visible */}
      <button className="ci-skip" onClick={skip} aria-label={copy.skip}>
        {copy.skip}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="m5 12 14 0M13 6l6 6-6 6"/>
        </svg>
      </button>
    </div>
  );
};

/* ============================================================
   NAV
   ============================================================ */

const IconBell = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const Nav = ({ lang, setLang, cartCount, hidden, user, onAuthOpen, onCartOpen, onAccountOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifs, setNotifs]         = useState([]);
  const [unread, setUnread]         = useState(0);
  const [notifOpen, setNotifOpen]   = useState(false);
  const notifRef                    = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Fetch notifications when logged in, poll every 30s
  useEffect(() => {
    if (!user || !window.latinaApi) { setNotifs([]); setUnread(0); return; }
    const fetchNotifs = async () => {
      try {
        const data = await window.latinaApi.getNotifications();
        setNotifs(data.data || []);
        setUnread(data.unread_count || 0);
      } catch {}
    };
    fetchNotifs();
    const interval = setInterval(fetchNotifs, 30000);
    return () => clearInterval(interval);
  }, [user]);

  // Close notification dropdown on outside click
  useEffect(() => {
    if (!notifOpen) return;
    const handler = (e) => { if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notifOpen]);

  const handleMarkAllRead = async () => {
    try { await window.latinaApi.markAllNotifsRead(); setUnread(0); setNotifs(n => n.map(x => ({ ...x, is_read: true }))); } catch {}
  };
  const handleMarkRead = async (id) => {
    try { await window.latinaApi.markNotifRead(id); setNotifs(n => n.map(x => x.id === id ? { ...x, is_read: true } : x)); setUnread(u => Math.max(0, u - 1)); } catch {}
  };

  const NOTIF_ICONS = { reservation_created: "📅", reservation_activated: "✅", reservation_cancelled: "❌", reservation_expired: "⏰" };

  const close = () => setMobileOpen(false);

  const t = {
    fr: { chaussures: "Chaussures", sacs: "Sacs", access: "Accessoires", concours: "Concours", fid: "Fidélité", panier: "Panier", login: "Connexion", account: "Mon compte" },
    ar: { chaussures: "الأحذية", sacs: "الحقائب", access: "الإكسسوارات", concours: "المسابقة", fid: "الولاء", panier: "السلة", login: "دخول", account: "حسابي" },
    en: { chaussures: "Shoes", sacs: "Bags", access: "Accessories", concours: "Contest", fid: "Loyalty", panier: "Cart", login: "Sign in", account: "Account" }
  }[lang] || {};

  const navLinks = [
    { href: "#collection", label: t.chaussures },
    { href: "#collection", label: t.sacs },
    { href: "#collection", label: t.access },
    { href: "#concours",   label: t.concours },
    { href: "#fidelite",   label: t.fid },
  ];

  return (
    <>
      <nav className={`nav ${hidden ? "hidden" : ""} ${scrolled ? "scrolled" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="nav-inner">
          <div className="nav-brand">
            <div className="logo-mark">
              <LotusMark size={44} />
            </div>
          </div>

          <div className="nav-links">
            {navLinks.map(({ href, label }) => (
              <a key={label} href={href} className="nav-link">
                <span className="nav-link-text">{label}</span>
                <span className="nav-link-line" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <div className="lang-toggle nav-lang-desktop">
              {["fr", "ar", "en"].map((l, i) => (
                <span key={l} className="lang-item">
                  {i > 0 && <span className="sep">·</span>}
                  <button className={lang === l ? "active" : ""} onClick={() => setLang(l)}>
                    {l === "fr" ? "FR" : l === "ar" ? "ع" : "EN"}
                  </button>
                </span>
              ))}
            </div>

            {user ? (
              <button className="nav-user-btn nav-auth-desktop" onClick={onAccountOpen} aria-label={t.account}>
                <IconUser width={14} height={14} />
                <span className="nav-user-name">{user.name?.split(" ")[0]}</span>
              </button>
            ) : (
              <button className="nav-login-btn nav-auth-desktop" onClick={onAuthOpen} aria-label={t.login}>
                <IconUser width={14} height={14} />
                <span>{t.login}</span>
              </button>
            )}

            {/* Notification bell — only for logged-in clients */}
            {user && (
              <div className="nav-notif-wrap" ref={notifRef}>
                <button
                  className={`nav-notif-btn${notifOpen ? " open" : ""}`}
                  aria-label="Notifications"
                  onClick={() => setNotifOpen(v => !v)}
                >
                  <IconBell width={16} height={16} />
                  {unread > 0 && <span className="nav-notif-badge">{unread > 9 ? "9+" : unread}</span>}
                </button>

                {notifOpen && (
                  <div className="nav-notif-dropdown">
                    <div className="nnd-head">
                      <span className="nnd-title">Notifications</span>
                      {unread > 0 && (
                        <button className="nnd-read-all" onClick={handleMarkAllRead}>Tout lire</button>
                      )}
                    </div>
                    {notifs.length === 0 ? (
                      <div className="nnd-empty">Aucune notification.</div>
                    ) : (
                      <div className="nnd-list">
                        {notifs.slice(0, 8).map(n => (
                          <div
                            key={n.id}
                            className={`nnd-item${n.is_read ? "" : " unread"}`}
                            onClick={() => { if (!n.is_read) handleMarkRead(n.id); }}
                          >
                            <span className="nnd-icon">{NOTIF_ICONS[n.type] || "🔔"}</span>
                            <div className="nnd-content">
                              <div className="nnd-item-title">{n.title}</div>
                              <div className="nnd-item-body">{n.body}</div>
                              <div className="nnd-item-time t-mono">{new Date(n.created_at).toLocaleDateString("fr-DZ")}</div>
                            </div>
                            {!n.is_read && <span className="nnd-dot" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            <button className="cart-btn" onClick={onCartOpen} aria-label={t.panier}>
              <IconBag width={15} height={15} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </button>

            {/* Hamburger — visible only on mobile */}
            <button
              className={`nav-hamburger ${mobileOpen ? "open" : ""}`}
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
              aria-expanded={mobileOpen}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="nav-mobile-menu" dir={lang === "ar" ? "rtl" : "ltr"}>
          <div className="nav-mobile-backdrop" onClick={close} />
          <div className="nav-mobile-content">
            <nav className="nav-mobile-links">
              {navLinks.map(({ href, label }) => (
                <a key={label} href={href} className="nav-mobile-link" onClick={close}>{label}</a>
              ))}
            </nav>
            <div className="nav-mobile-bottom">
              <div className="lang-toggle" style={{marginBottom: 16}}>
                {["fr", "ar", "en"].map((l, i) => (
                  <span key={l} className="lang-item">
                    {i > 0 && <span className="sep">·</span>}
                    <button className={lang === l ? "active" : ""} onClick={() => { setLang(l); }}>
                      {l === "fr" ? "Français" : l === "ar" ? "العربية" : "English"}
                    </button>
                  </span>
                ))}
              </div>
              {user ? (
                <button className="nav-login-btn" style={{width:"100%", justifyContent:"center"}} onClick={() => { onAccountOpen(); close(); }}>
                  <IconUser width={14} height={14} />
                  <span>{t.account}</span>
                </button>
              ) : (
                <button className="nav-login-btn" style={{width:"100%", justifyContent:"center"}} onClick={() => { onAuthOpen(); close(); }}>
                  <IconUser width={14} height={14} />
                  <span>{t.login}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* ============================================================
   v2 — STRUCTURAL PRIMITIVES
   ScrollProgress, SceneMarker, useSceneProgress
   ============================================================ */

const ScrollProgress = () => {
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const doc = document.documentElement;
      const max = (doc.scrollHeight - window.innerHeight) || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      doc.style.setProperty("--scroll-progress", p.toFixed(4));
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <div className="scroll-rail" aria-hidden="true" />;
};

const SceneMarker = ({ num, label, meta }) => (
  <div className="scene-marker" aria-hidden="true">
    <span className="num t-num">{num}</span>
    <span className="bar" />
    <span>{label}</span>
    {meta && <span className="meta t-num">{meta}</span>}
  </div>
);

// Updates --scene-progress on the section element as it scrolls through viewport.
// 0 = section just entering, 1 = section just leaving.
const useSceneProgress = (ref) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const total = r.height + vh;
      const traveled = Math.min(total, Math.max(0, vh - r.top));
      const p = traveled / total;
      el.style.setProperty("--scene-progress", p.toFixed(4));
      raf = 0;
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
};

/* ============================================================
   v2 — FILTER RAIL  (Color, Size, Heel-height, Material, Audience)
   ============================================================ */

const COLOR_SWATCHES = {
  noir: "#1A1A1A", blanc: "#FAFAFA", beige: "#D4B896", nude: "#E5C4AE",
  rose: "#E8B4B8", marron: "#6B3F2A", camel: "#B07A4E", khaki: "#7A7B53",
  bleu: "#2E4B6F", or: "#C9A267", argent: "#C0C0C8", perles: "#F2EAE0"
};

const HEEL_BUCKETS = [
  { key: "flat",      min: 0,  max: 1,  label_fr: "Plat",        label_ar: "مسطح",   label_en: "Flat" },
  { key: "low",       min: 1,  max: 3,  label_fr: "Bas",         label_ar: "منخفض",  label_en: "Low" },
  { key: "demi",      min: 3,  max: 6,  label_fr: "Demi-talon",  label_ar: "نصفي",   label_en: "Mid" },
  { key: "high",      min: 6,  max: 9,  label_fr: "Haut",        label_ar: "عالي",   label_en: "High" },
  { key: "very_high", min: 9,  max: 99, label_fr: "Très haut",   label_ar: "عالٍ جداً","label_en": "Very high" }
];

const MATERIALS = [
  { key: "cuir",        fr: "Cuir",        ar: "جلد",       en: "Leather" },
  { key: "cuir_verni",  fr: "Cuir verni",  ar: "جلد لامع",  en: "Patent" },
  { key: "daim",        fr: "Daim",        ar: "شامواه",    en: "Suede" },
  { key: "synthetique", fr: "Synthétique", ar: "صناعي",    en: "Synthetic" },
  { key: "textile",     fr: "Textile",     ar: "نسيج",      en: "Textile" },
  { key: "velours",     fr: "Velours",     ar: "مخمل",      en: "Velvet" },
  { key: "satin",       fr: "Satin",       ar: "ساتان",     en: "Satin" },
  { key: "perles",      fr: "Perles",      ar: "لؤلؤ",      en: "Pearl" }
];

const FilterRail = ({ filters, setFilters, lang = "fr", availableSizes = [], onClear, count, mobile = false }) => {
  const t = {
    fr: { title: "Filtres", color: "Couleur", size: "Taille", heel: "Hauteur talon", material: "Matière", clear: "Effacer tout", results: "résultats" },
    ar: { title: "تصفية",   color: "اللون",   size: "المقاس", heel: "ارتفاع الكعب",  material: "المادة",  clear: "مسح الكل",  results: "نتيجة" },
    en: { title: "Filters", color: "Color",   size: "Size",   heel: "Heel height",   material: "Material",clear: "Clear all", results: "results" }
  }[lang] || {};

  const [open, setOpen] = useState({ color: true, size: true, heel: false, material: false });
  const toggle = (k) => setOpen(o => ({ ...o, [k]: !o[k] }));

  const toggleArr = (key, value) => {
    const cur = filters[key] || [];
    setFilters({ ...filters, [key]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] });
  };

  const activeCount = (filters.colors?.length || 0) + (filters.sizes?.length || 0)
    + (filters.heel?.length || 0) + (filters.materials?.length || 0);

  const FrGroup = ({ id, label, active, children }) => (
    <div className={`fr-group ${open[id] ? "fr-open" : ""}`}>
      <button type="button" className="fr-group-head" onClick={() => toggle(id)}>
        <span className="fr-label t-mono">{label}</span>
        <span className="fr-group-meta">
          {active > 0 && <span className="fr-active-dot">{active}</span>}
          <span className="fr-chevron">{open[id] ? "▴" : "▾"}</span>
        </span>
      </button>
      {open[id] && <div className="fr-group-body">{children}</div>}
    </div>
  );

  return (
    <aside className={`filter-rail${mobile ? " filter-rail-mobile" : ""}`}>
      {!mobile && (
        <div className="fr-head">
          <span className="t-mono fr-title">{t.title}</span>
          <span className="t-mono fr-count t-num">{count} {t.results}</span>
        </div>
      )}

      <FrGroup id="color" label={t.color} active={filters.colors?.length || 0}>
        <div className="fr-swatches">
          {Object.entries(COLOR_SWATCHES).map(([key, hex]) => (
            <button
              key={key}
              type="button"
              className={`fr-swatch ${(filters.colors || []).includes(key) ? "on" : ""}`}
              style={{ background: hex }}
              aria-label={key}
              title={key}
              onClick={() => toggleArr("colors", key)}
            />
          ))}
        </div>
      </FrGroup>

      {availableSizes.length > 0 && (
        <FrGroup id="size" label={t.size} active={filters.sizes?.length || 0}>
          <div className="fr-chips">
            {availableSizes.map(sz => (
              <button key={sz} type="button"
                className={`fr-chip t-num ${(filters.sizes || []).includes(sz) ? "on" : ""}`}
                onClick={() => toggleArr("sizes", sz)}
              >{sz}</button>
            ))}
          </div>
        </FrGroup>
      )}

      <FrGroup id="heel" label={t.heel} active={filters.heel?.length || 0}>
        <div className="fr-chips">
          {HEEL_BUCKETS.map(b => (
            <button key={b.key} type="button"
              className={`fr-chip ${(filters.heel || []).includes(b.key) ? "on" : ""}`}
              onClick={() => toggleArr("heel", b.key)}
            >{b[`label_${lang}`] || b.label_fr}</button>
          ))}
        </div>
      </FrGroup>

      <FrGroup id="material" label={t.material} active={filters.materials?.length || 0}>
        <div className="fr-chips">
          {MATERIALS.map(m => (
            <button key={m.key} type="button"
              className={`fr-chip ${(filters.materials || []).includes(m.key) ? "on" : ""}`}
              onClick={() => toggleArr("materials", m.key)}
            >{m[lang] || m.fr}</button>
          ))}
        </div>
      </FrGroup>

      {activeCount > 0 && (
        <button type="button" className="fr-clear t-mono" onClick={onClear}>{t.clear} ✕</button>
      )}
    </aside>
  );
};

// Apply filters to a product list.
// Each active filter group is AND-ed; within a group any match passes (OR).
const applyFilters = (products, filters, segment) => {
  return products.filter(p => {
    // Segment (audience)
    if (segment && segment !== "ALL" && !(p.audience || []).includes(segment)) return false;

    // Colors — compare lower-cased to handle any case discrepancy
    if (filters.colors?.length) {
      const pColors = (p.colors || []).map(c => c.toLowerCase());
      if (!filters.colors.some(c => pColors.includes(c.toLowerCase()))) return false;
    }

    // Sizes — coerce both sides to string so "37" === 37 still matches
    if (filters.sizes?.length) {
      const pSizes = (p.sizes || []).map(String);
      if (!filters.sizes.some(s => pSizes.includes(String(s)))) return false;
    }

    // Materials — p.materials is an array (fixed from p.material singular bug)
    if (filters.materials?.length) {
      const pMaterials = (p.materials || []).map(m => m.toLowerCase());
      if (!filters.materials.some(m => pMaterials.includes(m.toLowerCase()))) return false;
    }

    // Heel height buckets
    if (filters.heel?.length) {
      const inBucket = filters.heel.some(k => {
        const b = HEEL_BUCKETS.find(x => x.key === k);
        return b && (p.heel ?? 0) >= b.min && (p.heel ?? 0) < b.max;
      });
      if (!inBucket) return false;
    }

    return true;
  });
};

/* ============================================================
   v2 — QUICK VIEW MODAL  (Aperçu rapide)
   ============================================================ */

const QuickView = ({ product, mode, onClose, onAdd, lang = "fr" }) => {
  const [color, setColor] = useState(null);
  const [size, setSize]   = useState(null);
  const [restockOk, setRestockOk] = useState(false);
  const phoneRef = useRef(null);

  // Unique colors from real variants (each entry has hasStock flag)
  const colorGroups = useMemo(() => {
    if (!product?.variants?.length) return [];
    const map = {};
    product.variants.forEach(v => {
      if (!v.color) return;
      if (!map[v.color]) map[v.color] = { color: v.color, hasStock: false };
      if (v.stock > 0) map[v.color].hasStock = true;
    });
    return Object.values(map);
  }, [product?.variants]);

  // Sizes for selected color (with per-size stock)
  const sizesForColor = useMemo(() => {
    if (!product?.variants?.length) return [];
    const source = color
      ? product.variants.filter(v => v.color === color && v.size)
      : product.variants.filter(v => v.size);
    return source.map(v => ({ size: v.size, stock: v.stock, id: v.id }));
  }, [color, product?.variants]);

  // The actual selected variant
  const selectedVariant = useMemo(() => {
    if (!product?.variants?.length) return null;
    if (color && size) return product.variants.find(v => v.color === color && v.size === size) || null;
    if (color && !sizesForColor.length) return product.variants.find(v => v.color === color) || null;
    if (size && !colorGroups.length) return product.variants.find(v => v.size === size) || null;
    return null;
  }, [color, size, product?.variants, colorGroups.length, sizesForColor.length]);

  // Effective price (base + variant price_adjustment)
  const effectivePrice = selectedVariant
    ? product.price + (selectedVariant.price_adjustment || 0)
    : product.price;

  useEffect(() => {
    if (!product) return;
    // Auto-select first available color
    const firstAvailable = colorGroups.find(g => g.hasStock) || colorGroups[0];
    setColor(firstAvailable?.color || null);
    setSize(null);
    setRestockOk(false);
    const onKey = (e) => { if (e.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [product, onClose]);

  // When color changes, reset size
  useEffect(() => { setSize(null); }, [color]);

  if (!product) return null;

  const t = {
    fr: { size:"Taille", color:"Couleur", add:"Ajouter au panier", selectSize:"Choisir une taille", details:"Détails", sku:"Référence", material:"Matière", heel:"Talon", stock:"Stock", low:"Plus que", left:"en stock", outSize:"Épuisé", restockTitle:"M'avertir au retour", restockSub:"Entrez votre numéro et nous vous envoyons un SMS dès le restock — sans spam.", restockCta:"M'alerter", restockOk:"Merci ! On vous prévient.", whatsapp:"Demander sur WhatsApp", trust:"Paiement à la livraison · Retour 7 jours" },
    ar: { size:"المقاس", color:"اللون", add:"أضيفي إلى السلة", selectSize:"اختاري المقاس", details:"التفاصيل", sku:"المرجع", material:"المادة", heel:"الكعب", stock:"المخزون", low:"تبقى", left:"في المخزون", outSize:"نفذ", restockTitle:"أعلميني عند العودة", restockSub:"أدخلي رقمك ونرسل لكِ رسالة فور توفر المنتج — بدون إزعاج.", restockCta:"أعلميني", restockOk:"شكراً! سنعلمكِ.", whatsapp:"اسألي عبر واتساب", trust:"الدفع عند الاستلام · إرجاع خلال 7 أيام" },
    en: { size:"Size", color:"Color", add:"Add to cart", selectSize:"Select a size", details:"Details", sku:"SKU", material:"Material", heel:"Heel", stock:"Stock", low:"Only", left:"left", outSize:"Sold out", restockTitle:"Notify when back", restockSub:"Drop your number — we SMS you when stock returns. No spam.", restockCta:"Notify me", restockOk:"Thanks! We'll let you know.", whatsapp:"Ask on WhatsApp", trust:"Pay on delivery · 7-day returns" }
  }[lang] || {};

  // Out-of-stock detection: prefer variant-based, fall back to product.stock
  const allVariantsOut = colorGroups.length > 0 && colorGroups.every(g => !g.hasStock);
  const out = colorGroups.length > 0 ? allVariantsOut : (product.stock ?? 1) === 0;
  const showRestock = out || mode === "restockMode";

  // Whether we need a size selection before adding
  const needsSize = sizesForColor.length > 0 && !size;
  const canAdd = !needsSize && (selectedVariant ? selectedVariant.stock > 0 : !out);

  const handleAdd = () => {
    const label = [color, size].filter(Boolean).join(" · ");
    onAdd?.(product, selectedVariant?.id, label || null, effectivePrice);
    onClose?.();
  };

  const handleRestock = async (e) => {
    e.preventDefault();
    const phone = phoneRef.current?.value?.trim();
    if (!phone) return;
    try {
      await window.latinaApi.restockAlert({
        product_id: product.id,
        variant_id: selectedVariant?.id || undefined,
        phone,
      });
    } catch {}
    setRestockOk(true);
  };

  const waMsg = encodeURIComponent(
    lang === "ar"
      ? `مرحبا، أريد معلومات عن ${product.name} (${product.sku})`
      : `Bonjour, je voudrais des infos sur ${product.name} (${product.sku})`
  );
  const waHref = `https://wa.me/213500000000?text=${waMsg}`;

  return (
    <div className="qv-backdrop" onClick={onClose}>
      <div className="qv-shell" onClick={(e) => e.stopPropagation()} dir={lang === "ar" ? "rtl" : "ltr"}>
        <button type="button" className="qv-x" aria-label="Close" onClick={onClose}>✕</button>

        <div className="qv-grid">
          <div className="qv-image">
            {product.img ? (
              <img src={product.img} alt={product.name} className="qv-img" loading="lazy" />
            ) : (
              <>
                <span className="ph-label">{product.cat}</span>
                <span className="ph-sku">SKU · {product.sku}</span>
              </>
            )}
          </div>

          <div className="qv-body">
            <div className="t-mono qv-eyebrow">{product.cat}</div>
            <h3 className="qv-title">{product.name}</h3>
            <div className="qv-price t-num">
              {effectivePrice.toLocaleString("fr-DZ")} DA
              {selectedVariant?.price_adjustment > 0 && (
                <span className="qv-price-adj t-mono">+{selectedVariant.price_adjustment.toLocaleString()} DA</span>
              )}
            </div>

            <div className="qv-trust t-mono">
              <IconShield width={12} height={12} /> {t.trust}
            </div>

            {/* Color picker — from real variants */}
            {colorGroups.length > 0 && (
              <div className="qv-row">
                <div className="qv-label t-mono">
                  {t.color}{color ? <span className="qv-sel-name"> — {color}</span> : ""}
                </div>
                <div className="qv-swatches">
                  {colorGroups.map(({ color: c, hasStock }) => (
                    <button
                      key={c}
                      type="button"
                      className={`qv-swatch ${color === c ? "on" : ""} ${!hasStock ? "qv-swatch-out" : ""}`}
                      style={{ background: COLOR_SWATCHES[c] || "#ddd" }}
                      aria-label={c}
                      aria-pressed={color === c}
                      title={!hasStock ? t.outSize : c}
                      onClick={() => setColor(c)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size picker — filtered by selected color, with per-size stock */}
            {sizesForColor.length > 0 && (
              <div className="qv-row">
                <div className="qv-label t-mono">
                  {t.size}{size ? <span className="qv-sel-name"> — {size}</span> : <span className="qv-sel-hint"> ({t.selectSize})</span>}
                </div>
                <div className="qv-sizes">
                  {sizesForColor.map(({ size: s, stock: st, id }) => (
                    <button
                      key={id}
                      type="button"
                      disabled={st === 0}
                      className={`qv-size t-num ${size === s ? "on" : ""} ${st === 0 ? "out" : st <= 4 ? "low" : ""}`}
                      onClick={() => st > 0 && setSize(s)}
                      title={st === 0 ? t.outSize : st <= 4 ? `${t.low} ${st} ${t.left}` : ""}
                    >
                      {s}
                      {st > 0 && st <= 4 && <span className="qv-size-dot" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock hint for selected variant */}
            {selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 4 && (
              <div className="qv-stock-hint t-mono">
                {t.low} {selectedVariant.stock} {t.left}
              </div>
            )}

            {/* Restock alert OR add-to-cart */}
            {showRestock ? (
              <div className="qv-restock">
                <div className="qv-label t-mono">{t.restockTitle}</div>
                <p className="t-body" style={{ color: "var(--ink-soft)", marginBottom: 12 }}>{t.restockSub}</p>
                {restockOk ? (
                  <div className="qv-restock-ok t-mono">✓ {t.restockOk}</div>
                ) : (
                  <form className="qv-restock-form" onSubmit={handleRestock}>
                    <input ref={phoneRef} type="tel" placeholder="+213 …" required pattern="[0-9 +]{8,}" />
                    <button type="submit" className="qv-cta">{t.restockCta}</button>
                  </form>
                )}
              </div>
            ) : (
              <div className="qv-actions">
                <button
                  type="button"
                  className="qv-cta qv-cta--primary"
                  disabled={!canAdd}
                  onClick={handleAdd}
                >{needsSize ? t.selectSize : t.add}</button>
                <a className="qv-cta qv-cta--whatsapp" href={waHref} target="_blank" rel="noopener noreferrer">
                  {t.whatsapp}
                </a>
              </div>
            )}

            {/* Details */}
            <div className="qv-details t-mono">
              <div><span>{t.sku}</span><span>{product.sku}</span></div>
              {product.material && <div><span>{t.material}</span><span>{(MATERIALS.find(m => m.key === product.material) || {})[lang] || product.material}</span></div>}
              {product.heel > 0 && <div><span>{t.heel}</span><span>{product.heel} cm</span></div>}
              {!out && <div><span>{t.stock}</span><span className="t-num">{product.stock}</span></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   v2 — SEGMENT TOGGLE  (A: 12-30 / B: 30-50 / ALL)
   ============================================================ */

const SegmentToggle = ({ value, onChange, lang = "fr" }) => {
  const t = {
    fr: { all: "Toutes", a: "12 — 30", b: "30 — 50", small: "ans" },
    ar: { all: "الكل",   a: "12 — 30", b: "30 — 50", small: "سنة" },
    en: { all: "All",    a: "12 — 30", b: "30 — 50", small: "y/o" }
  }[lang] || {};
  const opts = [{ k:"ALL", l:t.all }, { k:"A", l:t.a }, { k:"B", l:t.b }];
  return (
    <div className="seg-toggle" role="tablist">
      {opts.map(o => (
        <button
          key={o.k}
          role="tab"
          aria-selected={value === o.k}
          className={value === o.k ? "on" : ""}
          onClick={() => onChange(o.k)}
        >
          <span>{o.l}</span>
          {(o.k === "A" || o.k === "B") && <small>{t.small}</small>}
        </button>
      ))}
    </div>
  );
};

/* ============================================================
   v2 — WHATSAPP FLOATING HANDOFF  (always-on, bottom-left)
   ============================================================ */

const WhatsAppFloat = ({ lang = "fr", phone = "+213500000000" }) => {
  const t = {
    fr: { greet: "Bonjour ! Une question sur Latina ?", aria: "Discuter sur WhatsApp" },
    ar: { greet: "مرحبا! هل لديكِ سؤال؟",                aria: "تحدثي عبر واتساب" },
    en: { greet: "Hi! A question about Latina?",          aria: "Chat on WhatsApp" }
  }[lang] || {};
  const href = `https://wa.me/${phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(t.greet)}`;
  return (
    <a className="wa-float" href={href} target="_blank" rel="noopener noreferrer" aria-label={t.aria} dir={lang === "ar" ? "rtl" : "ltr"}>
      <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M20.5 3.5A11 11 0 0 0 4 17.6L3 21l3.5-1A11 11 0 1 0 20.5 3.5zM12 19.4a7.4 7.4 0 0 1-3.8-1l-.3-.2-2 .6.6-2-.2-.3A7.4 7.4 0 1 1 12 19.4zm4.2-5.5c-.2-.1-1.4-.7-1.6-.7s-.4-.1-.5.1l-.7.9c-.2.2-.3.2-.5 0a6 6 0 0 1-1.8-1.1 6.7 6.7 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.4-.4.2-.4c.1-.2 0-.3 0-.4l-.6-1.5c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.4 3.8 14.7 14.7 0 0 0 1.5.5 3.6 3.6 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1 0-.2-.1-.4-.2z"/>
      </svg>
      <span className="wa-bubble">{t.greet}</span>
    </a>
  );
};

/* ============================================================
   v2 — COD TRUST STRIP  (banner reinforcing pay-on-delivery)
   ============================================================ */

const CodTrustStrip = ({ lang = "fr" }) => {
  const t = {
    fr: ["Paiement à la livraison", "Retour gratuit 7 jours", "Livraison 58 wilayas", "SMS de confirmation"],
    ar: ["الدفع عند الاستلام",       "إرجاع مجاني خلال 7 أيام", "توصيل 58 ولاية",     "رسالة تأكيد"],
    en: ["Pay on delivery",           "Free returns 7 days",       "All 58 wilayas",      "SMS confirmation"]
  }[lang] || [];
  const icons = [<IconCash key="c" width={14} height={14} />, <IconReturn key="r" width={14} height={14} />, <IconTruck key="t" width={14} height={14} />, <IconShield key="s" width={14} height={14} />];
  return (
    <div className="cod-strip" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="cod-strip-track">
        {[...t, ...t].map((label, i) => (
          <span className="cod-pill t-mono" key={i}>{icons[i % icons.length]} {label}</span>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   v2 — RECENTLY VIEWED STRIP
   ============================================================ */

const useRecentlyViewed = () => {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("latina-recent") || "[]"); } catch { return []; }
  });
  const push = (product) => {
    setItems(prev => {
      const next = [product, ...prev.filter(p => p.sku !== product.sku)].slice(0, 8);
      localStorage.setItem("latina-recent", JSON.stringify(next));
      return next;
    });
  };
  return [items, push];
};

const RecentlyViewedStrip = ({ items, onAdd, onQuickView, lang = "fr" }) => {
  if (!items?.length) return null;
  const t = { fr: "Vus récemment", ar: "شوهد مؤخراً", en: "Recently viewed" }[lang] || "Recently viewed";
  return (
    <section className="recent-strip" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="container">
        <div className="recent-head">
          <span className="t-mono">— {t}</span>
        </div>
        <div className="recent-track">
          {items.map(p => (
            <div key={p.sku} className="recent-item" onClick={() => onQuickView?.(p)}>
              <div className="recent-thumb">
                {p.image
                  ? <img src={p.image} alt={p.name} loading="lazy" />
                  : <span className="ph-label">{p.cat}</span>
                }
              </div>
              <div className="recent-meta">
                <span className="recent-name">{p.name}</span>
                <span className="recent-price t-num">{p.price.toLocaleString("fr-DZ")} DA</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   v2 — WILAYA / COMMUNE SELECTOR
   Loads /data/shipping-rates.json once. Shows live shipping
   price + ETA the moment a wilaya is picked.
   Communes are seeded inline for top wilayas + a fallback
   "type your commune" for the rest until full seed lands.
   ============================================================ */

const COMMUNES_SEED = {
  16: ["Alger Centre","Bab El Oued","Bab Ezzouar","Birkhadem","Bordj El Bahri","Bordj El Kiffan","El Biar","El Harrach","El Madania","Hussein Dey","Kouba","Ouled Fayet","Reghaia","Rouiba","Said Hamdine","Sidi M'Hamed"],
  31: ["Oran Centre","Aïn El Turck","Bir El Djir","Es Senia","Hassi Bounif","Sidi El Bachir","Bethioua","Arzew","Mers El Kébir"],
  25: ["Constantine","El Khroub","Aïn Smara","Didouche Mourad","Hamma Bouziane","Zighoud Youcef"],
  9:  ["Blida","Boufarik","Chebli","El Affroun","Mouzaïa","Ouled Yaïch","Soumaa"],
  6:  ["Béjaïa","Akbou","Aokas","El Kseur","Sidi Aïch","Tichy"],
  19: ["Sétif","El Eulma","Aïn Arnat","Bougaa","Aïn Oulmène","Aïn Azel"],
  23: ["Annaba","El Bouni","El Hadjar","Sidi Amar","Berrahal","Aïn Berda"],
  15: ["Tizi Ouzou","Azazga","Boghni","Draâ Ben Khedda","Tigzirt","Larbaâ Nath Irathen"],
  35: ["Boumerdès","Bordj Menaiel","Dellys","Khemis El Khechna","Reghaïa","Thénia"],
  42: ["Tipaza","Cherchell","Hadjout","Koléa","Bou Ismaïl","Damous"]
};

const WilayaSelector = ({ lang = "fr", onChange }) => {
  const [rates, setRates] = useState(null);
  const [wilaya, setWilaya] = useState(null);
  const [delivery, setDelivery] = useState("home"); // home | stop_desk
  const [commune, setCommune] = useState("");
  const [communeId, setCommuneId] = useState(null);
  const [communeOpen, setCommuneOpen] = useState(false);
  const [communes, setCommunes] = useState([]);

  useEffect(() => {
    // Use live API
    const api = window.latinaApi;
    if (api) {
      api.getWilayas().then(data => {
        const normalized = (Array.isArray(data) ? data : data.data || []).map(w => ({
          code: w.code,
          name_fr: w.name_fr,
          name_ar: w.name_ar,
          home: w.shipping_rate?.home_fee ?? 400,
          stop_desk: w.shipping_rate?.stop_desk_fee ?? null,
          eta_days: w.shipping_rate ? `${w.shipping_rate.eta_days_min}–${w.shipping_rate.eta_days_max}` : "?",
        }));
        setRates(normalized);
      }).catch(() => {
        // Fallback to local JSON
        fetch("data/shipping-rates.json").then(r => r.json()).then(d => setRates(d.rates)).catch(() => setRates([]));
      });
    } else {
      fetch("data/shipping-rates.json").then(r => r.json()).then(d => setRates(d.rates)).catch(() => setRates([]));
    }
  }, []);

  // Load communes when wilaya changes
  useEffect(() => {
    if (!wilaya) { setCommunes([]); return; }
    const api = window.latinaApi;
    if (api) {
      api.getCommunes(wilaya.code).then(data => {
        setCommunes(Array.isArray(data) ? data : data.data || []);
      }).catch(() => setCommunes(COMMUNES_SEED[wilaya.code]?.map(n => ({ id: null, name_fr: n, name_ar: n })) || []));
    } else {
      setCommunes(COMMUNES_SEED[wilaya.code]?.map(n => ({ id: null, name_fr: n, name_ar: n })) || []);
    }
  }, [wilaya]);

  useEffect(() => {
    if (!wilaya) { onChange?.(null); return; }
    const fee = delivery === "home" ? wilaya.home : (wilaya.stop_desk ?? wilaya.home);
    onChange?.({ wilaya: wilaya.code, wilaya_code: wilaya.code, commune_id: communeId, name: wilaya.name_fr, delivery, commune, fee, eta: wilaya.eta_days });
  }, [wilaya, delivery, commune, communeId]);

  const t = {
    fr: { wilaya: "Wilaya", commune: "Commune", deliv: "Mode de livraison", home: "À domicile", desk: "Point relais", search: "Rechercher une wilaya…", commPh: "Tapez votre commune", eta: "Délai estimé", fee: "Frais de livraison", days: "jours", chooseW: "Choisissez votre wilaya", chooseC: "Choisissez votre commune" },
    ar: { wilaya: "الولاية", commune: "البلدية", deliv: "طريقة التوصيل", home: "إلى البيت", desk: "نقطة استلام", search: "ابحثي عن ولاية…", commPh: "اكتبي اسم البلدية", eta: "المدة المتوقعة", fee: "رسوم التوصيل", days: "أيام", chooseW: "اختاري الولاية", chooseC: "اختاري البلدية" },
    en: { wilaya: "Wilaya", commune: "Commune", deliv: "Delivery method", home: "Home delivery", desk: "Stop desk", search: "Search wilaya…", commPh: "Type your commune", eta: "ETA", fee: "Shipping fee", days: "days", chooseW: "Choose your wilaya", chooseC: "Choose your commune" }
  }[lang] || {};

  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const matches = (rates || []).filter(r =>
    !q || r.name_fr.toLowerCase().includes(q.toLowerCase()) || r.name_ar.includes(q) || String(r.code).startsWith(q)
  );

  const fee = wilaya ? (delivery === "home" ? wilaya.home : (wilaya.stop_desk ?? wilaya.home)) : null;

  return (
    <div className="ws" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Wilaya combo */}
      <div className="ws-row">
        <label className="ws-label t-mono">{t.wilaya}</label>
        <div className="ws-combo">
          <input
            className="ws-input"
            placeholder={wilaya ? `${String(wilaya.code).padStart(2,"0")} · ${lang === "ar" ? wilaya.name_ar : wilaya.name_fr}` : t.search}
            value={q}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          />
          {open && rates && (
            <ul className="ws-list" role="listbox">
              {matches.length === 0 && <li className="ws-empty">—</li>}
              {matches.map(r => (
                <li
                  key={r.code}
                  role="option"
                  className={wilaya?.code === r.code ? "on" : ""}
                  onMouseDown={() => { setWilaya(r); setQ(""); setCommune(""); setOpen(false); }}
                >
                  <span className="ws-code t-num">{String(r.code).padStart(2,"0")}</span>
                  <span className="ws-name">{lang === "ar" ? r.name_ar : r.name_fr}</span>
                  <span className="ws-fee t-num">{r.home} DA</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Delivery method */}
      {wilaya && (
        <div className="ws-row">
          <label className="ws-label t-mono">{t.deliv}</label>
          <div className="ws-segments">
            <button type="button" className={delivery === "home" ? "on" : ""} onClick={() => setDelivery("home")}>
              <IconTruck width={14} height={14} /> {t.home} <strong className="t-num">{wilaya.home} DA</strong>
            </button>
            <button type="button"
                    className={delivery === "stop_desk" ? "on" : ""}
                    disabled={wilaya.stop_desk == null}
                    onClick={() => setDelivery("stop_desk")}>
              <IconBag width={14} height={14} /> {t.desk} <strong className="t-num">{wilaya.stop_desk ?? "—"} DA</strong>
            </button>
          </div>
        </div>
      )}

      {/* Commune */}
      {wilaya && (
        <div className="ws-row">
          <label className="ws-label t-mono">{t.commune}</label>
          <div className="ws-combo">
            <input
              className="ws-input"
              placeholder={t.commPh}
              value={commune}
              onFocus={() => setCommuneOpen(true)}
              onBlur={() => setTimeout(() => setCommuneOpen(false), 150)}
              onChange={(e) => { setCommune(e.target.value); setCommuneOpen(true); }}
            />
            {communeOpen && communes.length > 0 && (
              <ul className="ws-list" role="listbox">
                {communes
                  .filter(c => !commune || (lang === "ar" ? c.name_ar : c.name_fr).toLowerCase().includes(commune.toLowerCase()))
                  .map(c => (
                    <li key={c.id || c.name_fr} role="option" onMouseDown={() => { setCommune(lang === "ar" ? c.name_ar : c.name_fr); setCommuneId(c.id); setCommuneOpen(false); }}>
                      {lang === "ar" ? c.name_ar : c.name_fr}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {wilaya && (
        <div className="ws-summary t-mono">
          <div><span>{t.fee}</span><span className="t-num">{fee} DA</span></div>
          <div><span>{t.eta}</span><span className="t-num">{wilaya.eta_days} {t.days.replace(/s$/, wilaya.eta_days === "1" ? "" : "s")}</span></div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   (ReservationModal removed — reservations are admin-only now)
   ============================================================ */
const _ReservationModal_REMOVED = ({ product, lang = "fr", user, onClose, whatsappNumber }) => {
  const [step, setStep]         = useState(1); // 1=form 2=confirm/whatsapp 3=done
  const [duration, setDuration] = useState(1);
  const [name, setName]         = useState(user?.name || "");
  const [phone, setPhone]       = useState(user?.phone || "");
  const [qty, setQty]           = useState(1);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [result, setResult]     = useState(null);

  const price        = product.effective_price ?? product.price ?? 0;
  const partialAmt   = duration > 1 ? Math.round(price * qty * 0.40) : 0;
  const requiresPay  = duration > 1;

  const handleDurationChange = (d) => {
    setDuration(d);
    if (d === 1) setQty(1);
  };

  const t = {
    fr: {
      title: "Réserver ce produit",
      step1: "Vos informations",
      nameLbl: "Nom complet", phoneLbl: "Téléphone",
      qtyLbl: "Quantité", durationLbl: "Durée de réservation",
      d1: "1 jour — gratuit",
      d2: "2 jours", d3: "3 jours", d4: "4 jours", d5: "5 jours",
      payNote: (amt) => `Acompte requis : ${amt.toLocaleString("fr-DZ")} DA (40%)`,
      freeNote: "Réservation gratuite — confirmez sous 24h sinon elle expire automatiquement.",
      freeQtyNote: "1 article · 1 produit par jour",
      paidQtyNote: "Max 3 articles au total sur toutes vos réservations payantes actives.",
      next: "Continuer", confirm: "Confirmer la réservation",
      whatsappBtn: "Payer via WhatsApp 💬",
      whatsappNote: "Contactez-nous sur WhatsApp pour effectuer le paiement de l'acompte, puis votre réservation sera activée.",
      doneTitle: "Réservation enregistrée !",
      doneBody: (ref, days) => `Votre réservation #${ref} est valide ${days > 1 ? `${days} jours` : "24h"}. Notre équipe vous contactera pour confirmer.`,
      close: "Fermer",
      cancel: "Annuler",
    },
    ar: {
      title: "احجزي هذا المنتج",
      step1: "معلوماتك",
      nameLbl: "الاسم الكامل", phoneLbl: "رقم الهاتف",
      qtyLbl: "الكمية", durationLbl: "مدة الحجز",
      d1: "يوم واحد — مجاني",
      d2: "يومان", d3: "3 أيام", d4: "4 أيام", d5: "5 أيام",
      payNote: (amt) => `دفعة مسبقة : ${amt.toLocaleString("fr-DZ")} دج (40%)`,
      freeNote: "حجز مجاني — أكدي طلبك خلال 24 ساعة وإلا سيُلغى تلقائياً.",
      freeQtyNote: "مقال واحد · منتج واحد في اليوم",
      paidQtyNote: "بحد أقصى 3 مقالات في مجموع حجوزاتك المدفوعة النشطة.",
      next: "التالي", confirm: "تأكيد الحجز",
      whatsappBtn: "الدفع عبر واتساب 💬",
      whatsappNote: "تواصلي معنا عبر واتساب لإتمام دفع الدفعة المسبقة، وسيتم تفعيل حجزك.",
      doneTitle: "تم تسجيل الحجز!",
      doneBody: (ref, days) => `حجزك #${ref} ساري لمدة ${days > 1 ? `${days} أيام` : "24 ساعة"}. سيتصل بك فريقنا للتأكيد.`,
      close: "إغلاق",
      cancel: "إلغاء",
    },
    en: {
      title: "Reserve this product",
      step1: "Your details",
      nameLbl: "Full name", phoneLbl: "Phone",
      qtyLbl: "Quantity", durationLbl: "Reservation duration",
      d1: "1 day — free",
      d2: "2 days", d3: "3 days", d4: "4 days", d5: "5 days",
      payNote: (amt) => `Deposit required: ${amt.toLocaleString("fr-DZ")} DA (40%)`,
      freeNote: "Free reservation — confirm within 24h or it expires automatically.",
      freeQtyNote: "1 item · 1 product per day",
      paidQtyNote: "Max 3 items total across all your active paid reservations.",
      next: "Continue", confirm: "Confirm reservation",
      whatsappBtn: "Pay via WhatsApp 💬",
      whatsappNote: "Contact us on WhatsApp to pay the deposit, then your reservation will be activated.",
      doneTitle: "Reservation registered!",
      doneBody: (ref, days) => `Your reservation #${ref} is valid for ${days > 1 ? `${days} days` : "24h"}. Our team will contact you to confirm.`,
      close: "Close",
      cancel: "Cancel",
    }
  }[lang] || {};

  const durationLabels = { 1: t.d1, 2: t.d2, 3: t.d3, 4: t.d4, 5: t.d5 };

  const buildWhatsappUrl = (ref) => {
    const num = (whatsappNumber || "").replace(/\D/g, "");
    const msg = lang === "ar"
      ? `مرحباً، أريد دفع اعتماد حجزي\nالمرجع: ${ref}\nالمنتج: ${product.name || product.name_fr}\nالمبلغ: ${partialAmt.toLocaleString("fr-DZ")} دج`
      : `Bonjour, je souhaite régler l'acompte pour ma réservation\nRéf : ${ref}\nProduit : ${product.name || product.name_fr}\nMontant : ${partialAmt.toLocaleString("fr-DZ")} DA`;
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  };

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim()) { setError("Veuillez remplir tous les champs."); return; }
    setLoading(true); setError("");
    try {
      const res = await window.latinaApi.createReservation({
        product_id: product._apiId || product.id,
        client_name: name.trim(),
        client_phone: phone.trim(),
        quantity: qty,
        duration_days: duration,
      });
      setResult(res);
      setStep(3);
    } catch (e) {
      setError(e.message || "Erreur lors de la réservation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resv-overlay" onClick={onClose}>
      <div className="resv-modal" onClick={e => e.stopPropagation()}>
        <div className="resv-header">
          <div>
            <div className="resv-title">{t.title}</div>
            <div className="resv-product-name">{product.name || product.name_fr}</div>
          </div>
          <button className="resv-close" onClick={onClose}>✕</button>
        </div>

        {step === 1 && (
          <div className="resv-body">
            {/* Duration picker */}
            <div className="resv-field">
              <label className="resv-label">{t.durationLbl}</label>
              <div className="resv-duration-grid">
                {[1,2,3,4,5].map(d => (
                  <button
                    key={d}
                    className={`resv-dur-btn${duration === d ? " active" : ""}`}
                    onClick={() => handleDurationChange(d)}
                  >
                    {durationLabels[d]}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment info */}
            <div className={`resv-pay-note ${requiresPay ? "requires-pay" : "free"}`}>
              {requiresPay ? t.payNote(partialAmt) : t.freeNote}
            </div>

            {/* Client info */}
            <div className="resv-field">
              <label className="resv-label">{t.nameLbl}</label>
              <input className="resv-input" value={name} onChange={e => setName(e.target.value)} placeholder="Fatima Zohra…" />
            </div>
            <div className="resv-field">
              <label className="resv-label">{t.phoneLbl}</label>
              <input className="resv-input" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="05XXXXXXXX" />
            </div>

            {/* Quantity — fixed at 1 for free (1-day), selector for paid */}
            {!requiresPay ? (
              <div className="resv-qty-fixed">
                <span className="resv-qty-badge">1</span>
                <span className="resv-qty-rule">{t.freeQtyNote}</span>
              </div>
            ) : (
              <div className="resv-field">
                <label className="resv-label">{t.qtyLbl}</label>
                <select className="resv-input" value={qty} onChange={e => setQty(Number(e.target.value))}>
                  {[1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <div className="resv-qty-hint">{t.paidQtyNote}</div>
              </div>
            )}

            {error && <div className="resv-error">{error}</div>}

            <div className="resv-actions">
              <button className="resv-btn-ghost" onClick={onClose}>{t.cancel}</button>
              {requiresPay ? (
                <button className="resv-btn-primary" onClick={() => setStep(2)} disabled={!name || !phone}>
                  {t.next}
                </button>
              ) : (
                <button className="resv-btn-primary" onClick={handleSubmit} disabled={loading || !name || !phone}>
                  {loading ? "…" : t.confirm}
                </button>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="resv-body">
            <div className="resv-summary-box">
              <div className="resv-summary-row"><span>{t.durationLbl}</span><strong>{duration} jours</strong></div>
              <div className="resv-summary-row"><span>{t.nameLbl}</span><strong>{name}</strong></div>
              <div className="resv-summary-row"><span>{t.phoneLbl}</span><strong>{phone}</strong></div>
              <div className="resv-summary-row"><span>{t.qtyLbl}</span><strong>{qty}</strong></div>
              <div className="resv-summary-row highlight"><span>Acompte 40%</span><strong>{partialAmt.toLocaleString("fr-DZ")} DA</strong></div>
            </div>
            <div className="resv-whatsapp-note">{t.whatsappNote}</div>
            {error && <div className="resv-error">{error}</div>}
            <div className="resv-actions">
              <button className="resv-btn-ghost" onClick={() => setStep(1)}>{t.cancel}</button>
              <button className="resv-btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? "…" : t.confirm}
              </button>
            </div>
          </div>
        )}

        {step === 3 && result && (
          <div className="resv-body resv-done">
            <div className="resv-done-icon">📅</div>
            <div className="resv-done-title">{t.doneTitle}</div>
            <div className="resv-done-body">{t.doneBody(result.reference, duration)}</div>
            {requiresPay && whatsappNumber && (
              <a
                className="resv-whatsapp-btn"
                href={buildWhatsappUrl(result.reference)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.whatsappBtn}
              </a>
            )}
            <button className="resv-btn-primary" onClick={onClose}>{t.close}</button>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, {
  LotusMark, IconBag, IconHeart, IconSearch, IconUser, IconTruck, IconCash, IconShield, IconReturn, IconBell,
  ProductCard, BoxOpening, Nav,
  ScrollProgress, SceneMarker, useSceneProgress,
  FilterRail, applyFilters, COLOR_SWATCHES, HEEL_BUCKETS, MATERIALS,
  QuickView, SegmentToggle,
  WhatsAppFloat, CodTrustStrip,
  useRecentlyViewed, RecentlyViewedStrip,
  WilayaSelector, COMMUNES_SEED,
});
