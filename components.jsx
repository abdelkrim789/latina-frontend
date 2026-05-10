/* global React */
const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   SVG ICONS — minimal, monoline
   ============================================================ */

const LotusMark = ({ size = 56, color = "currentColor" }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {/* Center petal */}
    <path d="M32 12 C 28 18, 28 26, 32 32 C 36 26, 36 18, 32 12 Z" />
    {/* Side petals */}
    <path d="M22 16 C 20 22, 22 28, 28 32 C 30 26, 28 20, 22 16 Z" />
    <path d="M42 16 C 44 22, 42 28, 36 32 C 34 26, 36 20, 42 16 Z" />
    {/* Bowl */}
    <path d="M16 36 C 20 40, 28 42, 32 42 C 36 42, 44 40, 48 36" />
    <path d="M14 42 C 18 48, 26 50, 32 50 C 38 50, 46 48, 50 42" />
    <ellipse cx="32" cy="36" rx="14" ry="3" />
  </svg>
);

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
          {(product.img || product.image) && (
            <img src={product.img || product.image} alt={product.name} className="pc-img" loading="lazy" />
          )}
          <span className="ph-label">{product.cat}</span>
          <span className="ph-sku">SKU · {product.sku}</span>
          {/* Hover-revealed quick-view chip */}
          <button type="button" className="pc-quick" onClick={handleQuickView}>
            <IconSearch width={12} height={12} />
            <span>{labels.quick}</span>
          </button>
        </div>

        <div className="meta">
          <div className="row">
            <span className="name">{product.name}</span>
            {lowStock && <span className="pc-low t-mono">{labels.low} {stock} {labels.remaining}</span>}
            {outOfStock && <span className="pc-out t-mono">{labels.out}</span>}
          </div>
          {colorSwatches.length > 0 && (
            <div className="pc-colors">
              {colorSwatches.map(({ color, hasStock }) => (
                <span
                  key={color}
                  className={`pc-color-dot${hasStock ? "" : " sold-out"}`}
                  style={{ background: COLOR_SWATCHES[color] || "#ccc" }}
                  title={color}
                />
              ))}
            </div>
          )}
          <div className="row">
            <span className="price t-num">{product.price.toLocaleString("fr-DZ")} DA</span>
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
   ACT 1 — CINEMATIC BOX OPENING
   ============================================================ */

const ShoeboxStage = ({ opened, flying, onOpen }) => {
  const stageRef = useRef(null);
  const sceneRef = useRef(null);
  const openedRef = useRef(opened);
  const flyingRef = useRef(flying);
  openedRef.current = opened;
  flyingRef.current = flying;

  useEffect(() => {
    if (!stageRef.current) return;
    let cancelled = false;

    const init = () => {
      if (cancelled) return;
      if (!window.LatinaShoebox || !stageRef.current) {
        requestAnimationFrame(init);
        return;
      }
      sceneRef.current = window.LatinaShoebox.createShoebox(stageRef.current, {});
      if (openedRef.current) sceneRef.current.open();
      if (flyingRef.current) sceneRef.current.fly();
    };

    if (window.LatinaShoebox) init();
    else window.addEventListener("latina-shoebox-ready", init, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("latina-shoebox-ready", init);
      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (opened && sceneRef.current) sceneRef.current.open();
  }, [opened]);

  useEffect(() => {
    if (flying && sceneRef.current) sceneRef.current.fly();
  }, [flying]);

  return (
    <div
      ref={stageRef}
      className={`shoebox-stage ${opened ? "opened" : ""} ${flying ? "flying" : ""}`}
      onClick={onOpen}
    />
  );
};

const BoxOpening = ({ onComplete, lang = "fr", speed = 1 }) => {
  const [opened, setOpened] = useState(false);
  const [flying, setFlying] = useState(false);
  const [dismissing, setDismissing] = useState(false);
  const [skipReady, setSkipReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSkipReady(true), 2000 / speed);
    return () => clearTimeout(t);
  }, [speed]);

  const open = () => {
    if (opened) return;
    setOpened(true);
    // smoother, slightly faster staging for opening → fly → dismiss
    setTimeout(() => setFlying(true), 2000 / speed);
    setTimeout(() => setDismissing(true), 3200 / speed);
    setTimeout(() => onComplete?.(), 4200 / speed);
  };

  const skip = () => {
    setDismissing(true);
    // respect speed setting when skipping
    setTimeout(() => onComplete?.(), Math.max(500, 1000 / speed));
  };

  // Generate petals once
  const petals = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      key: i,
      tx: (Math.random() - 0.5) * 600,
      ty: -100 - Math.random() * 400,
      tr: (Math.random() - 0.5) * 720,
      delay: Math.random() * 0.8,
      size: 8 + Math.random() * 14,
      color: ["#F2C9C0", "#E8A89A", "#E2B8A2", "#F9E8E1"][Math.floor(Math.random() * 4)]
    })), []);

  const copy = {
    fr: { tap: "Cliquez pour ouvrir", skip: "Passer l'intro", tagline: "JUST FOR YOU" },
    ar: { tap: "اضغطي للفتح", skip: "تجاوز", tagline: "JUST FOR YOU" },
    en: { tap: "Tap to open", skip: "Skip intro", tagline: "JUST FOR YOU" }
  }[lang] || { tap: "Tap to open", skip: "Skip", tagline: "JUST FOR YOU" };

  return (
    <div className={`act-one ${dismissing ? "dismissing" : ""}`}>
      <div className="bg-glow" />

      <div className="box-wrap">
        <div className="box-floor-shadow" />
        <ShoeboxStage opened={opened} flying={flying} onOpen={open} />
      </div>

      {/* Click prompt */}
      {!opened && (
        <div className="click-prompt">
          <span className="dot" />
          <span>{copy.tap}</span>
          <span className="dot" />
        </div>
      )}

      {/* Emerging products */}
      <div className="emerging-product p1">
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(155deg, #FEFAF6, #F9E8E1)", border: "1px solid #E2B8A2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 30px 60px -10px rgba(122,69,48,0.3)" }}>
          <span style={{ fontFamily: "var(--display)", fontSize: 14, color: "var(--rose-500)" }}>Escarpins</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--ink-mute)" }}>NUDE 38</span>
        </div>
      </div>
      <div className="emerging-product p2">
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(155deg, #F9E8E1, #FEFAF6)", border: "1px solid #E2B8A2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 30px 60px -10px rgba(122,69,48,0.3)" }}>
          <span style={{ fontFamily: "var(--display)", fontSize: 14, color: "var(--rose-500)" }}>Sac à main</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--ink-mute)" }}>ROSE</span>
        </div>
      </div>
      <div className="emerging-product p3">
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(155deg, #FEFAF6, #F2C9C0)", border: "1px solid #E2B8A2", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 30px 60px -10px rgba(122,69,48,0.3)" }}>
          <span style={{ fontFamily: "var(--display)", fontSize: 14, color: "var(--rose-500)" }}>Sandales</span>
          <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--ink-mute)" }}>OR · 37</span>
        </div>
      </div>

      {/* Petal particles */}
      {petals.map(p => (
        <div
          key={p.key}
          className="petal"
          style={{
            left: "50%", top: "50%",
            width: p.size, height: p.size,
            background: p.color,
            animationDelay: `${p.delay + 0.4}s`,
            "--tx": `${p.tx}px`,
            "--ty": `${p.ty}px`,
            "--tr": `${p.tr}deg`
          }}
        />
      ))}

      {/* Skip */}
      {skipReady && !opened && (
        <div className="skip-hint">
          <div className="countdown" />
          <button
            onClick={skip}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--mono)", fontSize: 10,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "var(--ink-mute)"
            }}
          >
            {copy.skip} →
          </button>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   NAV
   ============================================================ */

const Nav = ({ lang, setLang, cartCount, hidden, user, onAuthOpen, onCartOpen, onAccountOpen }) => {
  const t = {
    fr: { chaussures: "Chaussures", sacs: "Sacs", access: "Accessoires", concours: "Concours", fid: "Fidélité", panier: "Panier", login: "Connexion", account: "Mon compte" },
    ar: { chaussures: "الأحذية", sacs: "الحقائب", access: "الإكسسوارات", concours: "المسابقة", fid: "الولاء", panier: "السلة", login: "دخول", account: "حسابي" },
    en: { chaussures: "Shoes", sacs: "Bags", access: "Accessories", concours: "Contest", fid: "Loyalty", panier: "Cart", login: "Sign in", account: "Account" }
  }[lang] || {};

  return (
    <nav className={`nav ${hidden ? "hidden" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="nav-brand">
        <div className="logo-mark"><LotusMark size={28} color="var(--rose-500)" /></div>
        <span className="brand-name">Latina</span>
      </div>
      <div className="nav-links">
        <a href="#collection">{t.chaussures}</a>
        <a href="#collection">{t.sacs}</a>
        <a href="#collection">{t.access}</a>
        <a href="#concours">{t.concours}</a>
        <a href="#fidelite">{t.fid}</a>
      </div>
      <div className="nav-actions">
        <div className="lang-toggle">
          <button className={lang === "fr" ? "active" : ""} onClick={() => setLang("fr")}>FR</button>
          <span className="sep">·</span>
          <button className={lang === "ar" ? "active" : ""} onClick={() => setLang("ar")}>ع</button>
          <span className="sep">·</span>
          <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
        </div>
        {user ? (
          <button className="nav-user-btn" onClick={onAccountOpen}>
            <IconUser width={13} height={13} />
            <span className="nav-user-name">{user.name?.split(" ")[0]}</span>
          </button>
        ) : (
          <button className="nav-login-btn" onClick={onAuthOpen}>
            <IconUser width={13} height={13} /> {t.login}
          </button>
        )}
        <button className="cart-btn" onClick={onCartOpen}>
          <IconBag width={14} height={14} />
          <span>{t.panier}{cartCount > 0 && ` (${cartCount})`}</span>
        </button>
      </div>
    </nav>
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

const FilterRail = ({ filters, setFilters, lang = "fr", availableSizes = [], onClear, count }) => {
  const t = {
    fr: { title: "Filtres", color: "Couleur", size: "Taille", heel: "Hauteur talon", material: "Matière", clear: "Effacer", results: "résultats" },
    ar: { title: "تصفية",   color: "اللون",   size: "المقاس", heel: "ارتفاع الكعب",  material: "المادة",  clear: "مسح",     results: "نتيجة" },
    en: { title: "Filters", color: "Color",   size: "Size",   heel: "Heel height",   material: "Material",clear: "Clear",  results: "results" }
  }[lang] || {};

  const toggleArr = (key, value) => {
    const cur = filters[key] || [];
    setFilters({ ...filters, [key]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] });
  };

  return (
    <aside className="filter-rail">
      <div className="fr-head">
        <span className="t-mono fr-title">{t.title}</span>
        <span className="t-mono fr-count t-num">{count} {t.results}</span>
      </div>

      {/* Color */}
      <div className="fr-group">
        <div className="fr-label t-mono">{t.color}</div>
        <div className="fr-swatches">
          {Object.entries(COLOR_SWATCHES).map(([key, hex]) => (
            <button
              key={key}
              type="button"
              className={`fr-swatch ${(filters.colors || []).includes(key) ? "on" : ""}`}
              style={{ background: hex }}
              aria-label={key}
              aria-pressed={(filters.colors || []).includes(key)}
              onClick={() => toggleArr("colors", key)}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      {availableSizes.length > 0 && (
        <div className="fr-group">
          <div className="fr-label t-mono">{t.size}</div>
          <div className="fr-chips">
            {availableSizes.map(sz => (
              <button
                key={sz}
                type="button"
                className={`fr-chip t-num ${(filters.sizes || []).includes(sz) ? "on" : ""}`}
                onClick={() => toggleArr("sizes", sz)}
              >{sz}</button>
            ))}
          </div>
        </div>
      )}

      {/* Heel */}
      <div className="fr-group">
        <div className="fr-label t-mono">{t.heel}</div>
        <div className="fr-chips">
          {HEEL_BUCKETS.map(b => (
            <button
              key={b.key}
              type="button"
              className={`fr-chip ${(filters.heel || []).includes(b.key) ? "on" : ""}`}
              onClick={() => toggleArr("heel", b.key)}
            >{b[`label_${lang}`] || b.label_fr}</button>
          ))}
        </div>
      </div>

      {/* Material */}
      <div className="fr-group">
        <div className="fr-label t-mono">{t.material}</div>
        <div className="fr-chips">
          {MATERIALS.map(m => (
            <button
              key={m.key}
              type="button"
              className={`fr-chip ${(filters.materials || []).includes(m.key) ? "on" : ""}`}
              onClick={() => toggleArr("materials", m.key)}
            >{m[lang] || m.fr}</button>
          ))}
        </div>
      </div>

      <button type="button" className="fr-clear t-mono" onClick={onClear}>{t.clear} ✕</button>
    </aside>
  );
};

// Apply filters to a product list (matches if any selected value matches).
const applyFilters = (products, filters, segment) => {
  return products.filter(p => {
    if (segment && segment !== "ALL" && !(p.audience || []).includes(segment)) return false;
    if (filters.colors?.length && !filters.colors.some(c => (p.colors || []).includes(c))) return false;
    if (filters.sizes?.length  && !filters.sizes.some(s  => (p.sizes  || []).includes(s)))  return false;
    if (filters.materials?.length && !filters.materials.includes(p.material)) return false;
    if (filters.heel?.length) {
      const inBucket = filters.heel.some(k => {
        const b = HEEL_BUCKETS.find(x => x.key === k);
        return b && p.heel >= b.min && p.heel < b.max;
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

Object.assign(window, {
  LotusMark, IconBag, IconHeart, IconSearch, IconUser, IconTruck, IconCash, IconShield, IconReturn,
  ProductCard, BoxOpening, Nav,
  ScrollProgress, SceneMarker, useSceneProgress,
  FilterRail, applyFilters, COLOR_SWATCHES, HEEL_BUCKETS, MATERIALS,
  QuickView, SegmentToggle,
  WhatsAppFloat, CodTrustStrip,
  useRecentlyViewed, RecentlyViewedStrip,
  WilayaSelector, COMMUNES_SEED
});
