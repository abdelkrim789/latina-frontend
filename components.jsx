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
   ACT 1 — CINEMATIC OPENING v2
   Fully GSAP-orchestrated. No Three.js dependency.
   Dark-luxury aesthetic → auto-plays → fades into app.
   ============================================================ */

const BoxOpening = ({ onComplete, lang = "fr", speed = 1 }) => {
  const rootRef   = useRef(null);
  const canvasRef = useRef(null);
  const tlRef     = useRef(null);
  const psRef     = useRef({ raf: 0, particles: [], active: false });

  const copy = ({
    fr: { skip: "Passer", sub: "Une boutique pensée juste pour vous" },
    ar: { skip: "تجاوز", sub: "متجر صُمِّم خصيصاً لكِ" },
    en: { skip: "Skip",  sub: "A boutique designed just for you" }
  })[lang] || { skip: "Skip", sub: "" };

  const products = [
    { cat_fr:"CHAUSSURES", cat_ar:"أحذية",  cat_en:"SHOES",    name_fr:"Escarpins",  name_ar:"كعب عالي",   name_en:"Heels",    price:"7 900 DA", accent:"#F2C9C0" },
    { cat_fr:"SACS",       cat_ar:"حقائب",  cat_en:"BAGS",     name_fr:"Sac Soir",   name_ar:"حقيبة سهرة", name_en:"Evening Bag", price:"9 200 DA", accent:"#CB9E7F" },
    { cat_fr:"SANDALES",   cat_ar:"صنادل",  cat_en:"SANDALS",  name_fr:"Sandales",   name_ar:"صنادل",      name_en:"Sandals",  price:"6 400 DA", accent:"#E2B8A2" },
  ];

  /* Petal data — generated once, stable across re-renders */
  const petals = useMemo(() => Array.from({ length: 42 }, (_, i) => ({
    id: i,
    left:    5 + Math.random() * 90,
    delay:   Math.random() * 8,
    dur:     5 + Math.random() * 6,
    size:    8 + Math.random() * 22,
    ratio:   0.5 + Math.random() * 0.7,
    drift:   (Math.random() - 0.5) * 360,
    rot:     Math.random() * 1440 - 720,
    rotX:    Math.random() * 60 - 30,
    opacity: 0.3 + Math.random() * 0.55,
    color:   ["#F2C9C0","#E8A89A","#E2B8A2","#F9E8E1","#CB9E7F","#D4A080"][Math.floor(Math.random()*6)],
    shape:   i % 3,
  })), []);

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

  /* ── GSAP master timeline ─────────────────────────────────── */
  useEffect(() => {
    if (!rootRef.current || !window.gsap) return;
    const D = (s) => s / Math.max(0.3, speed);
    startParticles();

    gsap.set(".ci-logo-img, .ci-glow, .ci-tagline-w, .ci-rule, .ci-sub, .ci-eyebrow", {
      opacity: 0,
    });
    gsap.set(".ci-wordmark", { opacity: 0, y: 14 });
    gsap.set(".ci-logo-img", { scale: 0.55, filter: "blur(28px)" });
    gsap.set(".ci-glow", { scale: 0.3 });
    gsap.set(".ci-tagline-w", { y: 22 });
    gsap.set(".ci-rule", { scaleX: 0 });
    gsap.set(".ci-eyebrow", { y: -14 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    /* Phase 1 — Glow bloom */
    tl.to(".ci-glow",
      { opacity: 1, scale: 1, duration: D(2.2), ease: "power2.out" }, 0)

    /* Phase 2 — Logo materialises */
    .to(".ci-logo-img",
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: D(1.5), ease: "back.out(1.5)" },
      D(0.4))

    /* Phase 2b — Wordmark fades in under the mark */
    .to(".ci-wordmark",
      { opacity: 1, y: 0, duration: D(1.0), ease: "power2.out" },
      D(1.2))

    /* Phase 3 — Eyebrow label */
    .to(".ci-eyebrow",
      { opacity: 1, y: 0, duration: D(0.7), ease: "power3.out" },
      D(1.4))

    /* Phase 4 — Tagline words stagger */
    .to(".ci-tagline-w",
      { opacity: 1, y: 0, stagger: D(0.1), duration: D(0.65), ease: "back.out(1.8)" },
      D(1.7))

    /* Phase 5 — Decorative rules extend */
    .to(".ci-rule",
      { scaleX: 1, stagger: 0.04, duration: D(1.0), ease: "expo.out" },
      D(1.75))

    /* Phase 6 — Sub-tagline */
    .to(".ci-sub",
      { opacity: 1, duration: D(0.9), ease: "power2.out" },
      D(2.2))

    /* Hold on full reveal */
    .to({}, { duration: D(2.6) })

    /* Phase 8 — Exit */
    .to(".ci-wordmark",
      { opacity: 0, y: -10, duration: D(0.45), ease: "power1.in" }, "exit")
    .to(".ci-sub, .ci-eyebrow",
      { opacity: 0, duration: D(0.4), ease: "power1.in" }, "exit")
    .to(".ci-tagline-w",
      { opacity: 0, y: -12, stagger: 0.04, duration: D(0.45), ease: "power2.in" }, "exit+=0.08")
    .to(".ci-rule",
      { scaleX: 0, duration: D(0.5), ease: "expo.in" }, "exit+=0.08")
    .to(".ci-logo-img",
      { opacity: 0, scale: 1.4, filter: "blur(20px)", duration: D(0.9), ease: "power2.in" }, "exit+=0.2")
    .to(".ci-glow",
      { opacity: 0, scale: 2.5, duration: D(1.0), ease: "power2.in" }, "exit+=0.25")

    /* Final fade of bg */
    .to(".ci-bg",
      { opacity: 0, duration: D(0.9), ease: "power2.inOut" }, "exit+=0.6")
    .to(rootRef.current,
      {
        opacity: 0, duration: D(0.5), ease: "power2.inOut",
        onComplete: () => { stopParticles(); onComplete?.(); }
      }, "exit+=0.9");

    return () => { tl.kill(); stopParticles(); };
  }, [speed]);

  /* Skip handler — collapses timeline instantly */
  const skip = useCallback(() => {
    if (tlRef.current) tlRef.current.kill();
    stopParticles();
    gsap.to(rootRef.current, {
      opacity: 0, duration: 0.5, ease: "power2.inOut",
      onComplete: () => onComplete?.()
    });
  }, [onComplete]);

  const L = lang;
  const nameKey  = `name_${L}`;
  const catKey   = `cat_${L}`;

  return (
    <div ref={rootRef} className="ci-stage" aria-live="polite">
      {/* Background */}
      <div className="ci-bg" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="ci-canvas" aria-hidden="true" />

      {/* Ambient glow orb */}
      <div className="ci-glow" aria-hidden="true" />

      {/* Petal rain */}
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

        {/* Brand mark + wordmark */}
        <div className="ci-logo-wrap">
          <img
            src="assets/latina-mark.svg"
            className="ci-logo-img"
            alt="Latina"
            draggable={false}
          />
          <div className="ci-wordmark">Latina</div>
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

      {/* Skip */}
      <button className="ci-skip" onClick={skip} aria-label={copy.skip}>
        <span>{copy.skip}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                <span className="ph-label">{p.cat}</span>
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
