(() => {
  // components.jsx
  var { useState, useEffect, useRef, useMemo, useCallback } = React;
  var LotusMark = ({ size = 56 }) => {
    const w = Math.round(size * (319 / 178));
    return /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "assets/latina-mark.svg",
        width: w,
        height: size,
        alt: "Latina logo mark",
        style: { display: "block", objectFit: "contain" },
        draggable: false
      }
    );
  };
  var IconBag = (p) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", ...p }, /* @__PURE__ */ React.createElement("path", { d: "M5 8h14l-1 12H6L5 8z" }), /* @__PURE__ */ React.createElement("path", { d: "M9 8V6a3 3 0 0 1 6 0v2" }));
  var IconHeart = (p) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", ...p }, /* @__PURE__ */ React.createElement("path", { d: "M12 21s-7-4.5-9.5-9C0.5 8 3 4 7 4c2 0 4 1 5 3 1-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.5 12 21 12 21z" }));
  var IconSearch = (p) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", ...p }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "7" }), /* @__PURE__ */ React.createElement("path", { d: "m20 20-3.5-3.5" }));
  var IconUser = (p) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", ...p }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "8", r: "4" }), /* @__PURE__ */ React.createElement("path", { d: "M4 21c1-4 5-6 8-6s7 2 8 6" }));
  var IconTruck = (p) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.4", ...p }, /* @__PURE__ */ React.createElement("path", { d: "M2 7h11v10H2zM13 10h5l3 3v4h-8z" }), /* @__PURE__ */ React.createElement("circle", { cx: "6", cy: "18", r: "2" }), /* @__PURE__ */ React.createElement("circle", { cx: "17", cy: "18", r: "2" }));
  var IconCash = (p) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.4", ...p }, /* @__PURE__ */ React.createElement("rect", { x: "2", y: "6", width: "20", height: "12", rx: "1" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "3" }));
  var IconShield = (p) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.4", ...p }, /* @__PURE__ */ React.createElement("path", { d: "M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-0.5 8-4 8-9V6z" }), /* @__PURE__ */ React.createElement("path", { d: "m9 12 2 2 4-4" }));
  var IconReturn = (p) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.4", ...p }, /* @__PURE__ */ React.createElement("path", { d: "M3 12a9 9 0 0 1 15-6.7L21 8" }), /* @__PURE__ */ React.createElement("path", { d: "M21 3v5h-5" }), /* @__PURE__ */ React.createElement("path", { d: "M21 12a9 9 0 0 1-15 6.7L3 16" }), /* @__PURE__ */ React.createElement("path", { d: "M3 21v-5h5" }));
  var ProductCard = ({ product, onAdd, onQuickView, onWishlist, wishlisted, badge, lang = "fr" }) => {
    const ref = useRef(null);
    const [hover, setHover] = useState(false);
    const colorSwatches = useMemo(() => {
      if (!product.variants?.length) return [];
      const seen = {};
      product.variants.forEach((v) => {
        if (!v.color) return;
        if (!seen[v.color]) seen[v.color] = false;
        if (v.stock > 0) seen[v.color] = true;
      });
      return Object.entries(seen).map(([color, hasStock]) => ({ color, hasStock }));
    }, [product.variants]);
    const onMouseMove = (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const ry = (px - 0.5) * 6;
      const rx = (0.5 - py) * 4;
      el.style.setProperty("--rx", rx.toFixed(2) + "deg");
      el.style.setProperty("--ry", ry.toFixed(2) + "deg");
    };
    const onMouseLeave = () => {
      setHover(false);
      const el = ref.current;
      if (el) {
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      }
    };
    const handleAdd = (e) => {
      e.stopPropagation();
      const pos = ref.current ? (() => {
        const r = ref.current.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      })() : { x: 0, y: 0 };
      onAdd?.(product, pos);
    };
    const handleQuickView = (e) => {
      e.stopPropagation();
      onQuickView?.(product);
    };
    const handleWishlist = (e) => {
      e.stopPropagation();
      onWishlist?.(product);
    };
    const stock = product.stock ?? 99;
    const lowStock = stock > 0 && stock <= 4;
    const outOfStock = stock === 0;
    const labels = {
      fr: { add: "+ Panier", quick: "Aper\xE7u rapide", wish: "Favori", low: "Plus que", remaining: "en stock", out: "Bient\xF4t de retour", restock: "Me pr\xE9venir" },
      ar: { add: "+ \u0627\u0644\u0633\u0644\u0629", quick: "\u0639\u0631\u0636 \u0633\u0631\u064A\u0639", wish: "\u0627\u0644\u0645\u0641\u0636\u0644\u0629", low: "\u062A\u0628\u0642\u0649", remaining: "\u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646", out: "\u0642\u0631\u064A\u0628\u0627\u064B \u064A\u0639\u0648\u062F", restock: "\u0623\u0639\u0644\u0645\u064A\u0646\u064A" },
      en: { add: "+ Cart", quick: "Quick view", wish: "Wishlist", low: "Only", remaining: "left", out: "Back soon", restock: "Notify me" }
    }[lang] || {};
    const catLabels = { shoes: { fr: "Chaussures", ar: "\u0623\u062D\u0630\u064A\u0629", en: "Shoes" }, bags: { fr: "Sacs", ar: "\u062D\u0642\u0627\u0626\u0628", en: "Bags" }, access: { fr: "Accessoires", ar: "\u0625\u0643\u0633\u0633.", en: "Acc." } };
    const catLabel = product._catLabel || catLabels[product._tab]?.[lang] || null;
    const hasDiscount = product.compare && product.compare > product.price;
    const visibleSwatches = colorSwatches.slice(0, 6);
    const hiddenCount = colorSwatches.length - visibleSwatches.length;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        ref,
        className: `product-card pc-tilt ${hover ? "is-hover" : ""} ${outOfStock ? "is-out" : ""}`,
        onMouseEnter: () => setHover(true),
        onMouseMove,
        onMouseLeave,
        onClick: handleQuickView
      },
      /* @__PURE__ */ React.createElement("div", { className: "pc-tilt-inner" }, badge && /* @__PURE__ */ React.createElement("span", { className: `product-badge ${typeof badge === "object" ? badge.kind || "" : ""}` }, typeof badge === "object" ? badge.text : badge), /* @__PURE__ */ React.createElement(
        "button",
        {
          type: "button",
          className: `pc-wish ${wishlisted ? "on" : ""}`,
          "aria-label": labels.wish,
          "aria-pressed": !!wishlisted,
          onClick: handleWishlist
        },
        /* @__PURE__ */ React.createElement(IconHeart, { width: 14, height: 14 })
      ), /* @__PURE__ */ React.createElement("div", { className: "product-image" }, product.img || product.image ? /* @__PURE__ */ React.createElement("img", { src: product.img || product.image, alt: product.name, className: "pc-img", loading: "lazy" }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "ph-label" }, product.cat || catLabel), /* @__PURE__ */ React.createElement("span", { className: "ph-sku" }, "SKU \xB7 ", product.sku)), outOfStock && /* @__PURE__ */ React.createElement("div", { className: "pc-out-overlay" }, labels.out), /* @__PURE__ */ React.createElement("button", { type: "button", className: "pc-quick", onClick: handleQuickView }, /* @__PURE__ */ React.createElement(IconSearch, { width: 12, height: 12 }), /* @__PURE__ */ React.createElement("span", null, labels.quick))), /* @__PURE__ */ React.createElement("div", { className: "meta" }, catLabel && /* @__PURE__ */ React.createElement("span", { className: "pc-cat-tag" }, catLabel), /* @__PURE__ */ React.createElement("div", { className: "pc-name-row" }, /* @__PURE__ */ React.createElement("span", { className: "name" }, product.name)), visibleSwatches.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "pc-colors" }, visibleSwatches.map(({ color, hasStock }) => /* @__PURE__ */ React.createElement(
        "span",
        {
          key: color,
          className: `pc-color-dot${hasStock ? "" : " sold-out"}`,
          style: { background: COLOR_SWATCHES[color] || "#ccc" },
          title: color
        }
      )), hiddenCount > 0 && /* @__PURE__ */ React.createElement("span", { className: "pc-color-more" }, "+", hiddenCount)), /* @__PURE__ */ React.createElement("div", { className: "pc-price-row" }, /* @__PURE__ */ React.createElement("div", { className: "pc-prices" }, /* @__PURE__ */ React.createElement("span", { className: "price t-num" }, Number(product.price).toLocaleString("fr-DZ"), " DA"), hasDiscount && /* @__PURE__ */ React.createElement("span", { className: "pc-compare t-num" }, Number(product.compare).toLocaleString("fr-DZ"))), lowStock && /* @__PURE__ */ React.createElement("span", { className: "pc-low t-mono" }, labels.low, " ", stock), outOfStock ? /* @__PURE__ */ React.createElement("button", { type: "button", className: "pc-restock", onClick: (e) => {
        e.stopPropagation();
        onQuickView?.(product, { restockMode: true });
      } }, labels.restock, " \u2192") : /* @__PURE__ */ React.createElement("button", { type: "button", className: "pc-add", onClick: handleAdd }, labels.add))))
    );
  };
  var BoxOpening = ({ onComplete, lang = "fr", speed = 1 }) => {
    const rootRef = useRef(null);
    const canvasRef = useRef(null);
    const tlRef = useRef(null);
    const psRef = useRef({ raf: 0, particles: [], active: false });
    const copy = {
      fr: { skip: "Passer", sub: "Une boutique pens\xE9e juste pour vous" },
      ar: { skip: "\u062A\u062C\u0627\u0648\u0632", sub: "\u0645\u062A\u062C\u0631 \u0635\u064F\u0645\u0650\u0651\u0645 \u062E\u0635\u064A\u0635\u0627\u064B \u0644\u0643\u0650" },
      en: { skip: "Skip", sub: "A boutique designed just for you" }
    }[lang] || { skip: "Skip", sub: "" };
    const products = [
      { cat_fr: "CHAUSSURES", cat_ar: "\u0623\u062D\u0630\u064A\u0629", cat_en: "SHOES", name_fr: "Escarpins", name_ar: "\u0643\u0639\u0628 \u0639\u0627\u0644\u064A", name_en: "Heels", price: "7 900 DA", accent: "#F2C9C0" },
      { cat_fr: "SACS", cat_ar: "\u062D\u0642\u0627\u0626\u0628", cat_en: "BAGS", name_fr: "Sac Soir", name_ar: "\u062D\u0642\u064A\u0628\u0629 \u0633\u0647\u0631\u0629", name_en: "Evening Bag", price: "9 200 DA", accent: "#CB9E7F" },
      { cat_fr: "SANDALES", cat_ar: "\u0635\u0646\u0627\u062F\u0644", cat_en: "SANDALS", name_fr: "Sandales", name_ar: "\u0635\u0646\u0627\u062F\u0644", name_en: "Sandals", price: "6 400 DA", accent: "#E2B8A2" }
    ];
    const petals = useMemo(() => Array.from({ length: 42 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 8,
      dur: 5 + Math.random() * 6,
      size: 8 + Math.random() * 22,
      ratio: 0.5 + Math.random() * 0.7,
      drift: (Math.random() - 0.5) * 360,
      rot: Math.random() * 1440 - 720,
      rotX: Math.random() * 60 - 30,
      opacity: 0.3 + Math.random() * 0.55,
      color: ["#F2C9C0", "#E8A89A", "#E2B8A2", "#F9E8E1", "#CB9E7F", "#D4A080"][Math.floor(Math.random() * 6)],
      shape: i % 3
    })), []);
    const startParticles = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const resize = () => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
      };
      resize();
      window.addEventListener("resize", resize);
      const COLS = ["#CB9E7F", "#F2C9C0", "#E2B8A2", "#D4A080", "#EFE8D8", "#BB8B68"];
      const spawn = () => ({
        x: window.innerWidth * (0.25 + Math.random() * 0.5),
        y: window.innerHeight * (0.5 + Math.random() * 0.15),
        vx: (Math.random() - 0.5) * 1,
        vy: -(0.4 + Math.random() * 1.8),
        size: 0.8 + Math.random() * 2.8,
        life: 1,
        decay: 4e-3 + Math.random() * 7e-3,
        color: COLS[Math.floor(Math.random() * COLS.length)],
        glow: Math.random() > 0.55
      });
      const ps = psRef.current;
      ps.active = true;
      let last = 0;
      const tick = (ts) => {
        if (!ps.active) {
          window.removeEventListener("resize", resize);
          return;
        }
        if (ts - last > 35) {
          for (let i = 0; i < 4; i++) ps.particles.push(spawn());
          last = ts;
        }
        ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
        ps.particles = ps.particles.filter((p) => p.life > 0);
        for (const p of ps.particles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy -= 0.012;
          p.life -= p.decay;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life * 0.75);
          if (p.glow) {
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
          }
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
    useEffect(() => {
      if (!rootRef.current || !window.gsap) return;
      const D = (s) => s / Math.max(0.3, speed);
      startParticles();
      gsap.set(".ci-logo-img, .ci-glow, .ci-tagline-w, .ci-rule, .ci-sub, .ci-eyebrow", {
        opacity: 0
      });
      gsap.set(".ci-wordmark", { opacity: 0, y: 14 });
      gsap.set(".ci-logo-img", { scale: 0.55, filter: "blur(28px)" });
      gsap.set(".ci-glow", { scale: 0.3 });
      gsap.set(".ci-tagline-w", { y: 22 });
      gsap.set(".ci-rule", { scaleX: 0 });
      gsap.set(".ci-eyebrow", { y: -14 });
      const tl = gsap.timeline();
      tlRef.current = tl;
      tl.to(
        ".ci-glow",
        { opacity: 1, scale: 1, duration: D(2.2), ease: "power2.out" },
        0
      ).to(
        ".ci-logo-img",
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: D(1.5), ease: "back.out(1.5)" },
        D(0.4)
      ).to(
        ".ci-wordmark",
        { opacity: 1, y: 0, duration: D(1), ease: "power2.out" },
        D(1.2)
      ).to(
        ".ci-eyebrow",
        { opacity: 1, y: 0, duration: D(0.7), ease: "power3.out" },
        D(1.4)
      ).to(
        ".ci-tagline-w",
        { opacity: 1, y: 0, stagger: D(0.1), duration: D(0.65), ease: "back.out(1.8)" },
        D(1.7)
      ).to(
        ".ci-rule",
        { scaleX: 1, stagger: 0.04, duration: D(1), ease: "expo.out" },
        D(1.75)
      ).to(
        ".ci-sub",
        { opacity: 1, duration: D(0.9), ease: "power2.out" },
        D(2.2)
      ).to({}, { duration: D(2.6) }).to(
        ".ci-wordmark",
        { opacity: 0, y: -10, duration: D(0.45), ease: "power1.in" },
        "exit"
      ).to(
        ".ci-sub, .ci-eyebrow",
        { opacity: 0, duration: D(0.4), ease: "power1.in" },
        "exit"
      ).to(
        ".ci-tagline-w",
        { opacity: 0, y: -12, stagger: 0.04, duration: D(0.45), ease: "power2.in" },
        "exit+=0.08"
      ).to(
        ".ci-rule",
        { scaleX: 0, duration: D(0.5), ease: "expo.in" },
        "exit+=0.08"
      ).to(
        ".ci-logo-img",
        { opacity: 0, scale: 1.4, filter: "blur(20px)", duration: D(0.9), ease: "power2.in" },
        "exit+=0.2"
      ).to(
        ".ci-glow",
        { opacity: 0, scale: 2.5, duration: D(1), ease: "power2.in" },
        "exit+=0.25"
      ).to(
        ".ci-bg",
        { opacity: 0, duration: D(0.9), ease: "power2.inOut" },
        "exit+=0.6"
      ).to(
        rootRef.current,
        {
          opacity: 0,
          duration: D(0.5),
          ease: "power2.inOut",
          onComplete: () => {
            stopParticles();
            onComplete?.();
          }
        },
        "exit+=0.9"
      );
      return () => {
        tl.kill();
        stopParticles();
      };
    }, [speed]);
    const skip = useCallback(() => {
      if (tlRef.current) tlRef.current.kill();
      stopParticles();
      gsap.to(rootRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => onComplete?.()
      });
    }, [onComplete]);
    const L = lang;
    const nameKey = `name_${L}`;
    const catKey = `cat_${L}`;
    return /* @__PURE__ */ React.createElement("div", { ref: rootRef, className: "ci-stage", "aria-live": "polite" }, /* @__PURE__ */ React.createElement("div", { className: "ci-bg" }), /* @__PURE__ */ React.createElement("canvas", { ref: canvasRef, className: "ci-canvas", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "ci-glow", "aria-hidden": "true" }), /* @__PURE__ */ React.createElement("div", { className: "ci-petals", "aria-hidden": "true" }, petals.map((p) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: p.id,
        className: `ci-petal ci-petal-s${p.shape}`,
        style: {
          left: `${p.left}%`,
          width: p.size,
          height: p.size * p.ratio,
          background: p.color,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.dur}s`,
          opacity: p.opacity,
          "--pdrift": `${p.drift}px`,
          "--prot": `${p.rot}deg`,
          "--protX": `${p.rotX}deg`
        }
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "ci-content" }, /* @__PURE__ */ React.createElement("div", { className: "ci-logo-wrap" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: "assets/latina-mark.svg",
        className: "ci-logo-img",
        alt: "Latina",
        draggable: false
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "ci-wordmark" }, "Latina")), /* @__PURE__ */ React.createElement("span", { className: "ci-eyebrow" }, "Collection Printemps 2026"), /* @__PURE__ */ React.createElement("div", { className: "ci-tagline", "aria-label": "Just for you" }, /* @__PURE__ */ React.createElement("span", { className: "ci-rule ci-rule-l", "aria-hidden": "true" }), "JUST FOR YOU".split(" ").map((w, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "ci-tagline-w" }, w)), /* @__PURE__ */ React.createElement("span", { className: "ci-rule ci-rule-r", "aria-hidden": "true" })), /* @__PURE__ */ React.createElement("p", { className: "ci-sub" }, copy.sub)), /* @__PURE__ */ React.createElement("button", { className: "ci-skip", onClick: skip, "aria-label": copy.skip }, /* @__PURE__ */ React.createElement("span", null, copy.skip), /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }, /* @__PURE__ */ React.createElement("path", { d: "m5 12 14 0M13 6l6 6-6 6" }))));
  };
  var IconBell = (p) => /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", ...p }, /* @__PURE__ */ React.createElement("path", { d: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" }), /* @__PURE__ */ React.createElement("path", { d: "M13.73 21a2 2 0 0 1-3.46 0" }));
  var Nav = ({ lang, setLang, cartCount, hidden, user, onAuthOpen, onCartOpen, onAccountOpen }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [notifs, setNotifs] = useState([]);
    const [unread, setUnread] = useState(0);
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef(null);
    useEffect(() => {
      const onScroll = () => setScrolled(window.scrollY > 40);
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => {
      document.body.style.overflow = mobileOpen ? "hidden" : "";
      return () => {
        document.body.style.overflow = "";
      };
    }, [mobileOpen]);
    useEffect(() => {
      if (!user || !window.latinaApi) {
        setNotifs([]);
        setUnread(0);
        return;
      }
      const fetchNotifs = async () => {
        try {
          const data = await window.latinaApi.getNotifications();
          setNotifs(data.data || []);
          setUnread(data.unread_count || 0);
        } catch {
        }
      };
      fetchNotifs();
      const interval = setInterval(fetchNotifs, 3e4);
      return () => clearInterval(interval);
    }, [user]);
    useEffect(() => {
      if (!notifOpen) return;
      const handler = (e) => {
        if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [notifOpen]);
    const handleMarkAllRead = async () => {
      try {
        await window.latinaApi.markAllNotifsRead();
        setUnread(0);
        setNotifs((n) => n.map((x) => ({ ...x, is_read: true })));
      } catch {
      }
    };
    const handleMarkRead = async (id) => {
      try {
        await window.latinaApi.markNotifRead(id);
        setNotifs((n) => n.map((x) => x.id === id ? { ...x, is_read: true } : x));
        setUnread((u) => Math.max(0, u - 1));
      } catch {
      }
    };
    const NOTIF_ICONS = { reservation_created: "\u{1F4C5}", reservation_activated: "\u2705", reservation_cancelled: "\u274C", reservation_expired: "\u23F0" };
    const close = () => setMobileOpen(false);
    const t = {
      fr: { chaussures: "Chaussures", sacs: "Sacs", access: "Accessoires", concours: "Concours", fid: "Fid\xE9lit\xE9", panier: "Panier", login: "Connexion", account: "Mon compte" },
      ar: { chaussures: "\u0627\u0644\u0623\u062D\u0630\u064A\u0629", sacs: "\u0627\u0644\u062D\u0642\u0627\u0626\u0628", access: "\u0627\u0644\u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062A", concours: "\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629", fid: "\u0627\u0644\u0648\u0644\u0627\u0621", panier: "\u0627\u0644\u0633\u0644\u0629", login: "\u062F\u062E\u0648\u0644", account: "\u062D\u0633\u0627\u0628\u064A" },
      en: { chaussures: "Shoes", sacs: "Bags", access: "Accessories", concours: "Contest", fid: "Loyalty", panier: "Cart", login: "Sign in", account: "Account" }
    }[lang] || {};
    const navLinks = [
      { href: "#collection", label: t.chaussures },
      { href: "#collection", label: t.sacs },
      { href: "#collection", label: t.access },
      { href: "#concours", label: t.concours },
      { href: "#fidelite", label: t.fid }
    ];
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("nav", { className: `nav ${hidden ? "hidden" : ""} ${scrolled ? "scrolled" : ""}`, dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("div", { className: "nav-inner" }, /* @__PURE__ */ React.createElement("div", { className: "nav-brand" }, /* @__PURE__ */ React.createElement("div", { className: "logo-mark" }, /* @__PURE__ */ React.createElement(LotusMark, { size: 44 }))), /* @__PURE__ */ React.createElement("div", { className: "nav-links" }, navLinks.map(({ href, label }) => /* @__PURE__ */ React.createElement("a", { key: label, href, className: "nav-link" }, /* @__PURE__ */ React.createElement("span", { className: "nav-link-text" }, label), /* @__PURE__ */ React.createElement("span", { className: "nav-link-line", "aria-hidden": "true" })))), /* @__PURE__ */ React.createElement("div", { className: "nav-actions" }, /* @__PURE__ */ React.createElement("div", { className: "lang-toggle nav-lang-desktop" }, ["fr", "ar", "en"].map((l, i) => /* @__PURE__ */ React.createElement("span", { key: l, className: "lang-item" }, i > 0 && /* @__PURE__ */ React.createElement("span", { className: "sep" }, "\xB7"), /* @__PURE__ */ React.createElement("button", { className: lang === l ? "active" : "", onClick: () => setLang(l) }, l === "fr" ? "FR" : l === "ar" ? "\u0639" : "EN")))), user ? /* @__PURE__ */ React.createElement("button", { className: "nav-user-btn nav-auth-desktop", onClick: onAccountOpen, "aria-label": t.account }, /* @__PURE__ */ React.createElement(IconUser, { width: 14, height: 14 }), /* @__PURE__ */ React.createElement("span", { className: "nav-user-name" }, user.name?.split(" ")[0])) : /* @__PURE__ */ React.createElement("button", { className: "nav-login-btn nav-auth-desktop", onClick: onAuthOpen, "aria-label": t.login }, /* @__PURE__ */ React.createElement(IconUser, { width: 14, height: 14 }), /* @__PURE__ */ React.createElement("span", null, t.login)), user && /* @__PURE__ */ React.createElement("div", { className: "nav-notif-wrap", ref: notifRef }, /* @__PURE__ */ React.createElement(
      "button",
      {
        className: `nav-notif-btn${notifOpen ? " open" : ""}`,
        "aria-label": "Notifications",
        onClick: () => setNotifOpen((v) => !v)
      },
      /* @__PURE__ */ React.createElement(IconBell, { width: 16, height: 16 }),
      unread > 0 && /* @__PURE__ */ React.createElement("span", { className: "nav-notif-badge" }, unread > 9 ? "9+" : unread)
    ), notifOpen && /* @__PURE__ */ React.createElement("div", { className: "nav-notif-dropdown" }, /* @__PURE__ */ React.createElement("div", { className: "nnd-head" }, /* @__PURE__ */ React.createElement("span", { className: "nnd-title" }, "Notifications"), unread > 0 && /* @__PURE__ */ React.createElement("button", { className: "nnd-read-all", onClick: handleMarkAllRead }, "Tout lire")), notifs.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "nnd-empty" }, "Aucune notification.") : /* @__PURE__ */ React.createElement("div", { className: "nnd-list" }, notifs.slice(0, 8).map((n) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: n.id,
        className: `nnd-item${n.is_read ? "" : " unread"}`,
        onClick: () => {
          if (!n.is_read) handleMarkRead(n.id);
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "nnd-icon" }, NOTIF_ICONS[n.type] || "\u{1F514}"),
      /* @__PURE__ */ React.createElement("div", { className: "nnd-content" }, /* @__PURE__ */ React.createElement("div", { className: "nnd-item-title" }, n.title), /* @__PURE__ */ React.createElement("div", { className: "nnd-item-body" }, n.body), /* @__PURE__ */ React.createElement("div", { className: "nnd-item-time t-mono" }, new Date(n.created_at).toLocaleDateString("fr-DZ"))),
      !n.is_read && /* @__PURE__ */ React.createElement("span", { className: "nnd-dot" })
    ))))), /* @__PURE__ */ React.createElement("button", { className: "cart-btn", onClick: onCartOpen, "aria-label": t.panier }, /* @__PURE__ */ React.createElement(IconBag, { width: 15, height: 15 }), cartCount > 0 && /* @__PURE__ */ React.createElement("span", { className: "cart-count" }, cartCount)), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: `nav-hamburger ${mobileOpen ? "open" : ""}`,
        onClick: () => setMobileOpen((v) => !v),
        "aria-label": "Menu",
        "aria-expanded": mobileOpen
      },
      /* @__PURE__ */ React.createElement("span", null),
      /* @__PURE__ */ React.createElement("span", null),
      /* @__PURE__ */ React.createElement("span", null)
    )))), mobileOpen && /* @__PURE__ */ React.createElement("div", { className: "nav-mobile-menu", dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("div", { className: "nav-mobile-backdrop", onClick: close }), /* @__PURE__ */ React.createElement("div", { className: "nav-mobile-content" }, /* @__PURE__ */ React.createElement("nav", { className: "nav-mobile-links" }, navLinks.map(({ href, label }) => /* @__PURE__ */ React.createElement("a", { key: label, href, className: "nav-mobile-link", onClick: close }, label))), /* @__PURE__ */ React.createElement("div", { className: "nav-mobile-bottom" }, /* @__PURE__ */ React.createElement("div", { className: "lang-toggle", style: { marginBottom: 16 } }, ["fr", "ar", "en"].map((l, i) => /* @__PURE__ */ React.createElement("span", { key: l, className: "lang-item" }, i > 0 && /* @__PURE__ */ React.createElement("span", { className: "sep" }, "\xB7"), /* @__PURE__ */ React.createElement("button", { className: lang === l ? "active" : "", onClick: () => {
      setLang(l);
    } }, l === "fr" ? "Fran\xE7ais" : l === "ar" ? "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" : "English")))), user ? /* @__PURE__ */ React.createElement("button", { className: "nav-login-btn", style: { width: "100%", justifyContent: "center" }, onClick: () => {
      onAccountOpen();
      close();
    } }, /* @__PURE__ */ React.createElement(IconUser, { width: 14, height: 14 }), /* @__PURE__ */ React.createElement("span", null, t.account)) : /* @__PURE__ */ React.createElement("button", { className: "nav-login-btn", style: { width: "100%", justifyContent: "center" }, onClick: () => {
      onAuthOpen();
      close();
    } }, /* @__PURE__ */ React.createElement(IconUser, { width: 14, height: 14 }), /* @__PURE__ */ React.createElement("span", null, t.login))))));
  };
  var ScrollProgress = () => {
    useEffect(() => {
      let raf = 0;
      const tick = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - window.innerHeight || 1;
        const p = Math.min(1, Math.max(0, window.scrollY / max));
        doc.style.setProperty("--scroll-progress", p.toFixed(4));
        raf = 0;
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      return () => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        if (raf) cancelAnimationFrame(raf);
      };
    }, []);
    return /* @__PURE__ */ React.createElement("div", { className: "scroll-rail", "aria-hidden": "true" });
  };
  var SceneMarker = ({ num, label, meta }) => /* @__PURE__ */ React.createElement("div", { className: "scene-marker", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("span", { className: "num t-num" }, num), /* @__PURE__ */ React.createElement("span", { className: "bar" }), /* @__PURE__ */ React.createElement("span", null, label), meta && /* @__PURE__ */ React.createElement("span", { className: "meta t-num" }, meta));
  var useSceneProgress = (ref) => {
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
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(tick);
      };
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
  var COLOR_SWATCHES = {
    noir: "#1A1A1A",
    blanc: "#FAFAFA",
    beige: "#D4B896",
    nude: "#E5C4AE",
    rose: "#E8B4B8",
    marron: "#6B3F2A",
    camel: "#B07A4E",
    khaki: "#7A7B53",
    bleu: "#2E4B6F",
    or: "#C9A267",
    argent: "#C0C0C8",
    perles: "#F2EAE0"
  };
  var HEEL_BUCKETS = [
    { key: "flat", min: 0, max: 1, label_fr: "Plat", label_ar: "\u0645\u0633\u0637\u062D", label_en: "Flat" },
    { key: "low", min: 1, max: 3, label_fr: "Bas", label_ar: "\u0645\u0646\u062E\u0641\u0636", label_en: "Low" },
    { key: "demi", min: 3, max: 6, label_fr: "Demi-talon", label_ar: "\u0646\u0635\u0641\u064A", label_en: "Mid" },
    { key: "high", min: 6, max: 9, label_fr: "Haut", label_ar: "\u0639\u0627\u0644\u064A", label_en: "High" },
    { key: "very_high", min: 9, max: 99, label_fr: "Tr\xE8s haut", label_ar: "\u0639\u0627\u0644\u064D \u062C\u062F\u0627\u064B", "label_en": "Very high" }
  ];
  var MATERIALS = [
    { key: "cuir", fr: "Cuir", ar: "\u062C\u0644\u062F", en: "Leather" },
    { key: "cuir_verni", fr: "Cuir verni", ar: "\u062C\u0644\u062F \u0644\u0627\u0645\u0639", en: "Patent" },
    { key: "daim", fr: "Daim", ar: "\u0634\u0627\u0645\u0648\u0627\u0647", en: "Suede" },
    { key: "synthetique", fr: "Synth\xE9tique", ar: "\u0635\u0646\u0627\u0639\u064A", en: "Synthetic" },
    { key: "textile", fr: "Textile", ar: "\u0646\u0633\u064A\u062C", en: "Textile" },
    { key: "velours", fr: "Velours", ar: "\u0645\u062E\u0645\u0644", en: "Velvet" },
    { key: "satin", fr: "Satin", ar: "\u0633\u0627\u062A\u0627\u0646", en: "Satin" },
    { key: "perles", fr: "Perles", ar: "\u0644\u0624\u0644\u0624", en: "Pearl" }
  ];
  var FilterRail = ({ filters, setFilters, lang = "fr", availableSizes = [], onClear, count, mobile = false }) => {
    const t = {
      fr: { title: "Filtres", color: "Couleur", size: "Taille", heel: "Hauteur talon", material: "Mati\xE8re", clear: "Effacer tout", results: "r\xE9sultats" },
      ar: { title: "\u062A\u0635\u0641\u064A\u0629", color: "\u0627\u0644\u0644\u0648\u0646", size: "\u0627\u0644\u0645\u0642\u0627\u0633", heel: "\u0627\u0631\u062A\u0641\u0627\u0639 \u0627\u0644\u0643\u0639\u0628", material: "\u0627\u0644\u0645\u0627\u062F\u0629", clear: "\u0645\u0633\u062D \u0627\u0644\u0643\u0644", results: "\u0646\u062A\u064A\u062C\u0629" },
      en: { title: "Filters", color: "Color", size: "Size", heel: "Heel height", material: "Material", clear: "Clear all", results: "results" }
    }[lang] || {};
    const [open, setOpen] = useState({ color: true, size: true, heel: false, material: false });
    const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }));
    const toggleArr = (key, value) => {
      const cur = filters[key] || [];
      setFilters({ ...filters, [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] });
    };
    const activeCount = (filters.colors?.length || 0) + (filters.sizes?.length || 0) + (filters.heel?.length || 0) + (filters.materials?.length || 0);
    const FrGroup = ({ id, label, active, children }) => /* @__PURE__ */ React.createElement("div", { className: `fr-group ${open[id] ? "fr-open" : ""}` }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "fr-group-head", onClick: () => toggle(id) }, /* @__PURE__ */ React.createElement("span", { className: "fr-label t-mono" }, label), /* @__PURE__ */ React.createElement("span", { className: "fr-group-meta" }, active > 0 && /* @__PURE__ */ React.createElement("span", { className: "fr-active-dot" }, active), /* @__PURE__ */ React.createElement("span", { className: "fr-chevron" }, open[id] ? "\u25B4" : "\u25BE"))), open[id] && /* @__PURE__ */ React.createElement("div", { className: "fr-group-body" }, children));
    return /* @__PURE__ */ React.createElement("aside", { className: `filter-rail${mobile ? " filter-rail-mobile" : ""}` }, !mobile && /* @__PURE__ */ React.createElement("div", { className: "fr-head" }, /* @__PURE__ */ React.createElement("span", { className: "t-mono fr-title" }, t.title), /* @__PURE__ */ React.createElement("span", { className: "t-mono fr-count t-num" }, count, " ", t.results)), /* @__PURE__ */ React.createElement(FrGroup, { id: "color", label: t.color, active: filters.colors?.length || 0 }, /* @__PURE__ */ React.createElement("div", { className: "fr-swatches" }, Object.entries(COLOR_SWATCHES).map(([key, hex]) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key,
        type: "button",
        className: `fr-swatch ${(filters.colors || []).includes(key) ? "on" : ""}`,
        style: { background: hex },
        "aria-label": key,
        title: key,
        onClick: () => toggleArr("colors", key)
      }
    )))), availableSizes.length > 0 && /* @__PURE__ */ React.createElement(FrGroup, { id: "size", label: t.size, active: filters.sizes?.length || 0 }, /* @__PURE__ */ React.createElement("div", { className: "fr-chips" }, availableSizes.map((sz) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: sz,
        type: "button",
        className: `fr-chip t-num ${(filters.sizes || []).includes(sz) ? "on" : ""}`,
        onClick: () => toggleArr("sizes", sz)
      },
      sz
    )))), /* @__PURE__ */ React.createElement(FrGroup, { id: "heel", label: t.heel, active: filters.heel?.length || 0 }, /* @__PURE__ */ React.createElement("div", { className: "fr-chips" }, HEEL_BUCKETS.map((b) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: b.key,
        type: "button",
        className: `fr-chip ${(filters.heel || []).includes(b.key) ? "on" : ""}`,
        onClick: () => toggleArr("heel", b.key)
      },
      b[`label_${lang}`] || b.label_fr
    )))), /* @__PURE__ */ React.createElement(FrGroup, { id: "material", label: t.material, active: filters.materials?.length || 0 }, /* @__PURE__ */ React.createElement("div", { className: "fr-chips" }, MATERIALS.map((m) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: m.key,
        type: "button",
        className: `fr-chip ${(filters.materials || []).includes(m.key) ? "on" : ""}`,
        onClick: () => toggleArr("materials", m.key)
      },
      m[lang] || m.fr
    )))), activeCount > 0 && /* @__PURE__ */ React.createElement("button", { type: "button", className: "fr-clear t-mono", onClick: onClear }, t.clear, " \u2715"));
  };
  var applyFilters = (products, filters, segment) => {
    return products.filter((p) => {
      if (segment && segment !== "ALL" && !(p.audience || []).includes(segment)) return false;
      if (filters.colors?.length) {
        const pColors = (p.colors || []).map((c) => c.toLowerCase());
        if (!filters.colors.some((c) => pColors.includes(c.toLowerCase()))) return false;
      }
      if (filters.sizes?.length) {
        const pSizes = (p.sizes || []).map(String);
        if (!filters.sizes.some((s) => pSizes.includes(String(s)))) return false;
      }
      if (filters.materials?.length) {
        const pMaterials = (p.materials || []).map((m) => m.toLowerCase());
        if (!filters.materials.some((m) => pMaterials.includes(m.toLowerCase()))) return false;
      }
      if (filters.heel?.length) {
        const inBucket = filters.heel.some((k) => {
          const b = HEEL_BUCKETS.find((x) => x.key === k);
          return b && (p.heel ?? 0) >= b.min && (p.heel ?? 0) < b.max;
        });
        if (!inBucket) return false;
      }
      return true;
    });
  };
  var QuickView = ({ product, mode, onClose, onAdd, lang = "fr" }) => {
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [restockOk, setRestockOk] = useState(false);
    const phoneRef = useRef(null);
    const colorGroups = useMemo(() => {
      if (!product?.variants?.length) return [];
      const map = {};
      product.variants.forEach((v) => {
        if (!v.color) return;
        if (!map[v.color]) map[v.color] = { color: v.color, hasStock: false };
        if (v.stock > 0) map[v.color].hasStock = true;
      });
      return Object.values(map);
    }, [product?.variants]);
    const sizesForColor = useMemo(() => {
      if (!product?.variants?.length) return [];
      const source = color ? product.variants.filter((v) => v.color === color && v.size) : product.variants.filter((v) => v.size);
      return source.map((v) => ({ size: v.size, stock: v.stock, id: v.id }));
    }, [color, product?.variants]);
    const selectedVariant = useMemo(() => {
      if (!product?.variants?.length) return null;
      if (color && size) return product.variants.find((v) => v.color === color && v.size === size) || null;
      if (color && !sizesForColor.length) return product.variants.find((v) => v.color === color) || null;
      if (size && !colorGroups.length) return product.variants.find((v) => v.size === size) || null;
      return null;
    }, [color, size, product?.variants, colorGroups.length, sizesForColor.length]);
    const effectivePrice = selectedVariant ? product.price + (selectedVariant.price_adjustment || 0) : product.price;
    useEffect(() => {
      if (!product) return;
      const firstAvailable = colorGroups.find((g) => g.hasStock) || colorGroups[0];
      setColor(firstAvailable?.color || null);
      setSize(null);
      setRestockOk(false);
      const onKey = (e) => {
        if (e.key === "Escape") onClose?.();
      };
      document.addEventListener("keydown", onKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }, [product, onClose]);
    useEffect(() => {
      setSize(null);
    }, [color]);
    if (!product) return null;
    const t = {
      fr: { size: "Taille", color: "Couleur", add: "Ajouter au panier", selectSize: "Choisir une taille", details: "D\xE9tails", sku: "R\xE9f\xE9rence", material: "Mati\xE8re", heel: "Talon", stock: "Stock", low: "Plus que", left: "en stock", outSize: "\xC9puis\xE9", restockTitle: "M'avertir au retour", restockSub: "Entrez votre num\xE9ro et nous vous envoyons un SMS d\xE8s le restock \u2014 sans spam.", restockCta: "M'alerter", restockOk: "Merci ! On vous pr\xE9vient.", whatsapp: "Demander sur WhatsApp", trust: "Paiement \xE0 la livraison \xB7 Retour 7 jours" },
      ar: { size: "\u0627\u0644\u0645\u0642\u0627\u0633", color: "\u0627\u0644\u0644\u0648\u0646", add: "\u0623\u0636\u064A\u0641\u064A \u0625\u0644\u0649 \u0627\u0644\u0633\u0644\u0629", selectSize: "\u0627\u062E\u062A\u0627\u0631\u064A \u0627\u0644\u0645\u0642\u0627\u0633", details: "\u0627\u0644\u062A\u0641\u0627\u0635\u064A\u0644", sku: "\u0627\u0644\u0645\u0631\u062C\u0639", material: "\u0627\u0644\u0645\u0627\u062F\u0629", heel: "\u0627\u0644\u0643\u0639\u0628", stock: "\u0627\u0644\u0645\u062E\u0632\u0648\u0646", low: "\u062A\u0628\u0642\u0649", left: "\u0641\u064A \u0627\u0644\u0645\u062E\u0632\u0648\u0646", outSize: "\u0646\u0641\u0630", restockTitle: "\u0623\u0639\u0644\u0645\u064A\u0646\u064A \u0639\u0646\u062F \u0627\u0644\u0639\u0648\u062F\u0629", restockSub: "\u0623\u062F\u062E\u0644\u064A \u0631\u0642\u0645\u0643 \u0648\u0646\u0631\u0633\u0644 \u0644\u0643\u0650 \u0631\u0633\u0627\u0644\u0629 \u0641\u0648\u0631 \u062A\u0648\u0641\u0631 \u0627\u0644\u0645\u0646\u062A\u062C \u2014 \u0628\u062F\u0648\u0646 \u0625\u0632\u0639\u0627\u062C.", restockCta: "\u0623\u0639\u0644\u0645\u064A\u0646\u064A", restockOk: "\u0634\u0643\u0631\u0627\u064B! \u0633\u0646\u0639\u0644\u0645\u0643\u0650.", whatsapp: "\u0627\u0633\u0623\u0644\u064A \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628", trust: "\u0627\u0644\u062F\u0641\u0639 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \xB7 \u0625\u0631\u062C\u0627\u0639 \u062E\u0644\u0627\u0644 7 \u0623\u064A\u0627\u0645" },
      en: { size: "Size", color: "Color", add: "Add to cart", selectSize: "Select a size", details: "Details", sku: "SKU", material: "Material", heel: "Heel", stock: "Stock", low: "Only", left: "left", outSize: "Sold out", restockTitle: "Notify when back", restockSub: "Drop your number \u2014 we SMS you when stock returns. No spam.", restockCta: "Notify me", restockOk: "Thanks! We'll let you know.", whatsapp: "Ask on WhatsApp", trust: "Pay on delivery \xB7 7-day returns" }
    }[lang] || {};
    const allVariantsOut = colorGroups.length > 0 && colorGroups.every((g) => !g.hasStock);
    const out = colorGroups.length > 0 ? allVariantsOut : (product.stock ?? 1) === 0;
    const showRestock = out || mode === "restockMode";
    const needsSize = sizesForColor.length > 0 && !size;
    const canAdd = !needsSize && (selectedVariant ? selectedVariant.stock > 0 : !out);
    const handleAdd = () => {
      const label = [color, size].filter(Boolean).join(" \xB7 ");
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
          variant_id: selectedVariant?.id || void 0,
          phone
        });
      } catch {
      }
      setRestockOk(true);
    };
    const waMsg = encodeURIComponent(
      lang === "ar" ? `\u0645\u0631\u062D\u0628\u0627\u060C \u0623\u0631\u064A\u062F \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0639\u0646 ${product.name} (${product.sku})` : `Bonjour, je voudrais des infos sur ${product.name} (${product.sku})`
    );
    const waHref = `https://wa.me/213500000000?text=${waMsg}`;
    return /* @__PURE__ */ React.createElement("div", { className: "qv-backdrop", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "qv-shell", onClick: (e) => e.stopPropagation(), dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: "qv-x", "aria-label": "Close", onClick: onClose }, "\u2715"), /* @__PURE__ */ React.createElement("div", { className: "qv-grid" }, /* @__PURE__ */ React.createElement("div", { className: "qv-image" }, product.img ? /* @__PURE__ */ React.createElement("img", { src: product.img, alt: product.name, className: "qv-img", loading: "lazy" }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "ph-label" }, product.cat), /* @__PURE__ */ React.createElement("span", { className: "ph-sku" }, "SKU \xB7 ", product.sku))), /* @__PURE__ */ React.createElement("div", { className: "qv-body" }, /* @__PURE__ */ React.createElement("div", { className: "t-mono qv-eyebrow" }, product.cat), /* @__PURE__ */ React.createElement("h3", { className: "qv-title" }, product.name), /* @__PURE__ */ React.createElement("div", { className: "qv-price t-num" }, effectivePrice.toLocaleString("fr-DZ"), " DA", selectedVariant?.price_adjustment > 0 && /* @__PURE__ */ React.createElement("span", { className: "qv-price-adj t-mono" }, "+", selectedVariant.price_adjustment.toLocaleString(), " DA")), /* @__PURE__ */ React.createElement("div", { className: "qv-trust t-mono" }, /* @__PURE__ */ React.createElement(IconShield, { width: 12, height: 12 }), " ", t.trust), colorGroups.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "qv-row" }, /* @__PURE__ */ React.createElement("div", { className: "qv-label t-mono" }, t.color, color ? /* @__PURE__ */ React.createElement("span", { className: "qv-sel-name" }, " \u2014 ", color) : ""), /* @__PURE__ */ React.createElement("div", { className: "qv-swatches" }, colorGroups.map(({ color: c, hasStock }) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: c,
        type: "button",
        className: `qv-swatch ${color === c ? "on" : ""} ${!hasStock ? "qv-swatch-out" : ""}`,
        style: { background: COLOR_SWATCHES[c] || "#ddd" },
        "aria-label": c,
        "aria-pressed": color === c,
        title: !hasStock ? t.outSize : c,
        onClick: () => setColor(c)
      }
    )))), sizesForColor.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "qv-row" }, /* @__PURE__ */ React.createElement("div", { className: "qv-label t-mono" }, t.size, size ? /* @__PURE__ */ React.createElement("span", { className: "qv-sel-name" }, " \u2014 ", size) : /* @__PURE__ */ React.createElement("span", { className: "qv-sel-hint" }, " (", t.selectSize, ")")), /* @__PURE__ */ React.createElement("div", { className: "qv-sizes" }, sizesForColor.map(({ size: s, stock: st, id }) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: id,
        type: "button",
        disabled: st === 0,
        className: `qv-size t-num ${size === s ? "on" : ""} ${st === 0 ? "out" : st <= 4 ? "low" : ""}`,
        onClick: () => st > 0 && setSize(s),
        title: st === 0 ? t.outSize : st <= 4 ? `${t.low} ${st} ${t.left}` : ""
      },
      s,
      st > 0 && st <= 4 && /* @__PURE__ */ React.createElement("span", { className: "qv-size-dot" })
    )))), selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 4 && /* @__PURE__ */ React.createElement("div", { className: "qv-stock-hint t-mono" }, t.low, " ", selectedVariant.stock, " ", t.left), showRestock ? /* @__PURE__ */ React.createElement("div", { className: "qv-restock" }, /* @__PURE__ */ React.createElement("div", { className: "qv-label t-mono" }, t.restockTitle), /* @__PURE__ */ React.createElement("p", { className: "t-body", style: { color: "var(--ink-soft)", marginBottom: 12 } }, t.restockSub), restockOk ? /* @__PURE__ */ React.createElement("div", { className: "qv-restock-ok t-mono" }, "\u2713 ", t.restockOk) : /* @__PURE__ */ React.createElement("form", { className: "qv-restock-form", onSubmit: handleRestock }, /* @__PURE__ */ React.createElement("input", { ref: phoneRef, type: "tel", placeholder: "+213 \u2026", required: true, pattern: "[0-9 +]{8,}" }), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "qv-cta" }, t.restockCta))) : /* @__PURE__ */ React.createElement("div", { className: "qv-actions" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: "qv-cta qv-cta--primary",
        disabled: !canAdd,
        onClick: handleAdd
      },
      needsSize ? t.selectSize : t.add
    ), /* @__PURE__ */ React.createElement("a", { className: "qv-cta qv-cta--whatsapp", href: waHref, target: "_blank", rel: "noopener noreferrer" }, t.whatsapp)), /* @__PURE__ */ React.createElement("div", { className: "qv-details t-mono" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, t.sku), /* @__PURE__ */ React.createElement("span", null, product.sku)), product.material && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, t.material), /* @__PURE__ */ React.createElement("span", null, (MATERIALS.find((m) => m.key === product.material) || {})[lang] || product.material)), product.heel > 0 && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, t.heel), /* @__PURE__ */ React.createElement("span", null, product.heel, " cm")), !out && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, t.stock), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, product.stock)))))));
  };
  var SegmentToggle = ({ value, onChange, lang = "fr" }) => {
    const t = {
      fr: { all: "Toutes", a: "12 \u2014 30", b: "30 \u2014 50", small: "ans" },
      ar: { all: "\u0627\u0644\u0643\u0644", a: "12 \u2014 30", b: "30 \u2014 50", small: "\u0633\u0646\u0629" },
      en: { all: "All", a: "12 \u2014 30", b: "30 \u2014 50", small: "y/o" }
    }[lang] || {};
    const opts = [{ k: "ALL", l: t.all }, { k: "A", l: t.a }, { k: "B", l: t.b }];
    return /* @__PURE__ */ React.createElement("div", { className: "seg-toggle", role: "tablist" }, opts.map((o) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: o.k,
        role: "tab",
        "aria-selected": value === o.k,
        className: value === o.k ? "on" : "",
        onClick: () => onChange(o.k)
      },
      /* @__PURE__ */ React.createElement("span", null, o.l),
      (o.k === "A" || o.k === "B") && /* @__PURE__ */ React.createElement("small", null, t.small)
    )));
  };
  var WhatsAppFloat = ({ lang = "fr", phone = "+213500000000" }) => {
    const t = {
      fr: { greet: "Bonjour ! Une question sur Latina ?", aria: "Discuter sur WhatsApp" },
      ar: { greet: "\u0645\u0631\u062D\u0628\u0627! \u0647\u0644 \u0644\u062F\u064A\u0643\u0650 \u0633\u0624\u0627\u0644\u061F", aria: "\u062A\u062D\u062F\u062B\u064A \u0639\u0628\u0631 \u0648\u0627\u062A\u0633\u0627\u0628" },
      en: { greet: "Hi! A question about Latina?", aria: "Chat on WhatsApp" }
    }[lang] || {};
    const href = `https://wa.me/${phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(t.greet)}`;
    return /* @__PURE__ */ React.createElement("a", { className: "wa-float", href, target: "_blank", rel: "noopener noreferrer", "aria-label": t.aria, dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "22", height: "22", fill: "currentColor", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("path", { d: "M20.5 3.5A11 11 0 0 0 4 17.6L3 21l3.5-1A11 11 0 1 0 20.5 3.5zM12 19.4a7.4 7.4 0 0 1-3.8-1l-.3-.2-2 .6.6-2-.2-.3A7.4 7.4 0 1 1 12 19.4zm4.2-5.5c-.2-.1-1.4-.7-1.6-.7s-.4-.1-.5.1l-.7.9c-.2.2-.3.2-.5 0a6 6 0 0 1-1.8-1.1 6.7 6.7 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.4-.4.2-.4c.1-.2 0-.3 0-.4l-.6-1.5c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.4 3.8 14.7 14.7 0 0 0 1.5.5 3.6 3.6 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1 0-.2-.1-.4-.2z" })), /* @__PURE__ */ React.createElement("span", { className: "wa-bubble" }, t.greet));
  };
  var CodTrustStrip = ({ lang = "fr" }) => {
    const t = {
      fr: ["Paiement \xE0 la livraison", "Retour gratuit 7 jours", "Livraison 58 wilayas", "SMS de confirmation"],
      ar: ["\u0627\u0644\u062F\u0641\u0639 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645", "\u0625\u0631\u062C\u0627\u0639 \u0645\u062C\u0627\u0646\u064A \u062E\u0644\u0627\u0644 7 \u0623\u064A\u0627\u0645", "\u062A\u0648\u0635\u064A\u0644 58 \u0648\u0644\u0627\u064A\u0629", "\u0631\u0633\u0627\u0644\u0629 \u062A\u0623\u0643\u064A\u062F"],
      en: ["Pay on delivery", "Free returns 7 days", "All 58 wilayas", "SMS confirmation"]
    }[lang] || [];
    const icons = [/* @__PURE__ */ React.createElement(IconCash, { key: "c", width: 14, height: 14 }), /* @__PURE__ */ React.createElement(IconReturn, { key: "r", width: 14, height: 14 }), /* @__PURE__ */ React.createElement(IconTruck, { key: "t", width: 14, height: 14 }), /* @__PURE__ */ React.createElement(IconShield, { key: "s", width: 14, height: 14 })];
    return /* @__PURE__ */ React.createElement("div", { className: "cod-strip", dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("div", { className: "cod-strip-track" }, [...t, ...t].map((label, i) => /* @__PURE__ */ React.createElement("span", { className: "cod-pill t-mono", key: i }, icons[i % icons.length], " ", label))));
  };
  var useRecentlyViewed = () => {
    const [items, setItems] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("latina-recent") || "[]");
      } catch {
        return [];
      }
    });
    const push = (product) => {
      setItems((prev) => {
        const next = [product, ...prev.filter((p) => p.sku !== product.sku)].slice(0, 8);
        localStorage.setItem("latina-recent", JSON.stringify(next));
        return next;
      });
    };
    return [items, push];
  };
  var RecentlyViewedStrip = ({ items, onAdd, onQuickView, lang = "fr" }) => {
    if (!items?.length) return null;
    const t = { fr: "Vus r\xE9cemment", ar: "\u0634\u0648\u0647\u062F \u0645\u0624\u062E\u0631\u0627\u064B", en: "Recently viewed" }[lang] || "Recently viewed";
    return /* @__PURE__ */ React.createElement("section", { className: "recent-strip", dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "recent-head" }, /* @__PURE__ */ React.createElement("span", { className: "t-mono" }, "\u2014 ", t)), /* @__PURE__ */ React.createElement("div", { className: "recent-track" }, items.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.sku, className: "recent-item", onClick: () => onQuickView?.(p) }, /* @__PURE__ */ React.createElement("div", { className: "recent-thumb" }, /* @__PURE__ */ React.createElement("span", { className: "ph-label" }, p.cat)), /* @__PURE__ */ React.createElement("div", { className: "recent-meta" }, /* @__PURE__ */ React.createElement("span", { className: "recent-name" }, p.name), /* @__PURE__ */ React.createElement("span", { className: "recent-price t-num" }, p.price.toLocaleString("fr-DZ"), " DA")))))));
  };
  var COMMUNES_SEED = {
    16: ["Alger Centre", "Bab El Oued", "Bab Ezzouar", "Birkhadem", "Bordj El Bahri", "Bordj El Kiffan", "El Biar", "El Harrach", "El Madania", "Hussein Dey", "Kouba", "Ouled Fayet", "Reghaia", "Rouiba", "Said Hamdine", "Sidi M'Hamed"],
    31: ["Oran Centre", "A\xEFn El Turck", "Bir El Djir", "Es Senia", "Hassi Bounif", "Sidi El Bachir", "Bethioua", "Arzew", "Mers El K\xE9bir"],
    25: ["Constantine", "El Khroub", "A\xEFn Smara", "Didouche Mourad", "Hamma Bouziane", "Zighoud Youcef"],
    9: ["Blida", "Boufarik", "Chebli", "El Affroun", "Mouza\xEFa", "Ouled Ya\xEFch", "Soumaa"],
    6: ["B\xE9ja\xEFa", "Akbou", "Aokas", "El Kseur", "Sidi A\xEFch", "Tichy"],
    19: ["S\xE9tif", "El Eulma", "A\xEFn Arnat", "Bougaa", "A\xEFn Oulm\xE8ne", "A\xEFn Azel"],
    23: ["Annaba", "El Bouni", "El Hadjar", "Sidi Amar", "Berrahal", "A\xEFn Berda"],
    15: ["Tizi Ouzou", "Azazga", "Boghni", "Dra\xE2 Ben Khedda", "Tigzirt", "Larba\xE2 Nath Irathen"],
    35: ["Boumerd\xE8s", "Bordj Menaiel", "Dellys", "Khemis El Khechna", "Regha\xEFa", "Th\xE9nia"],
    42: ["Tipaza", "Cherchell", "Hadjout", "Kol\xE9a", "Bou Isma\xEFl", "Damous"]
  };
  var WilayaSelector = ({ lang = "fr", onChange }) => {
    const [rates, setRates] = useState(null);
    const [wilaya, setWilaya] = useState(null);
    const [delivery, setDelivery] = useState("home");
    const [commune, setCommune] = useState("");
    const [communeId, setCommuneId] = useState(null);
    const [communeOpen, setCommuneOpen] = useState(false);
    const [communes, setCommunes] = useState([]);
    useEffect(() => {
      const api = window.latinaApi;
      if (api) {
        api.getWilayas().then((data) => {
          const normalized = (Array.isArray(data) ? data : data.data || []).map((w) => ({
            code: w.code,
            name_fr: w.name_fr,
            name_ar: w.name_ar,
            home: w.shipping_rate?.home_fee ?? 400,
            stop_desk: w.shipping_rate?.stop_desk_fee ?? null,
            eta_days: w.shipping_rate ? `${w.shipping_rate.eta_days_min}\u2013${w.shipping_rate.eta_days_max}` : "?"
          }));
          setRates(normalized);
        }).catch(() => {
          fetch("data/shipping-rates.json").then((r) => r.json()).then((d) => setRates(d.rates)).catch(() => setRates([]));
        });
      } else {
        fetch("data/shipping-rates.json").then((r) => r.json()).then((d) => setRates(d.rates)).catch(() => setRates([]));
      }
    }, []);
    useEffect(() => {
      if (!wilaya) {
        setCommunes([]);
        return;
      }
      const api = window.latinaApi;
      if (api) {
        api.getCommunes(wilaya.code).then((data) => {
          setCommunes(Array.isArray(data) ? data : data.data || []);
        }).catch(() => setCommunes(COMMUNES_SEED[wilaya.code]?.map((n) => ({ id: null, name_fr: n, name_ar: n })) || []));
      } else {
        setCommunes(COMMUNES_SEED[wilaya.code]?.map((n) => ({ id: null, name_fr: n, name_ar: n })) || []);
      }
    }, [wilaya]);
    useEffect(() => {
      if (!wilaya) {
        onChange?.(null);
        return;
      }
      const fee2 = delivery === "home" ? wilaya.home : wilaya.stop_desk ?? wilaya.home;
      onChange?.({ wilaya: wilaya.code, wilaya_code: wilaya.code, commune_id: communeId, name: wilaya.name_fr, delivery, commune, fee: fee2, eta: wilaya.eta_days });
    }, [wilaya, delivery, commune, communeId]);
    const t = {
      fr: { wilaya: "Wilaya", commune: "Commune", deliv: "Mode de livraison", home: "\xC0 domicile", desk: "Point relais", search: "Rechercher une wilaya\u2026", commPh: "Tapez votre commune", eta: "D\xE9lai estim\xE9", fee: "Frais de livraison", days: "jours", chooseW: "Choisissez votre wilaya", chooseC: "Choisissez votre commune" },
      ar: { wilaya: "\u0627\u0644\u0648\u0644\u0627\u064A\u0629", commune: "\u0627\u0644\u0628\u0644\u062F\u064A\u0629", deliv: "\u0637\u0631\u064A\u0642\u0629 \u0627\u0644\u062A\u0648\u0635\u064A\u0644", home: "\u0625\u0644\u0649 \u0627\u0644\u0628\u064A\u062A", desk: "\u0646\u0642\u0637\u0629 \u0627\u0633\u062A\u0644\u0627\u0645", search: "\u0627\u0628\u062D\u062B\u064A \u0639\u0646 \u0648\u0644\u0627\u064A\u0629\u2026", commPh: "\u0627\u0643\u062A\u0628\u064A \u0627\u0633\u0645 \u0627\u0644\u0628\u0644\u062F\u064A\u0629", eta: "\u0627\u0644\u0645\u062F\u0629 \u0627\u0644\u0645\u062A\u0648\u0642\u0639\u0629", fee: "\u0631\u0633\u0648\u0645 \u0627\u0644\u062A\u0648\u0635\u064A\u0644", days: "\u0623\u064A\u0627\u0645", chooseW: "\u0627\u062E\u062A\u0627\u0631\u064A \u0627\u0644\u0648\u0644\u0627\u064A\u0629", chooseC: "\u0627\u062E\u062A\u0627\u0631\u064A \u0627\u0644\u0628\u0644\u062F\u064A\u0629" },
      en: { wilaya: "Wilaya", commune: "Commune", deliv: "Delivery method", home: "Home delivery", desk: "Stop desk", search: "Search wilaya\u2026", commPh: "Type your commune", eta: "ETA", fee: "Shipping fee", days: "days", chooseW: "Choose your wilaya", chooseC: "Choose your commune" }
    }[lang] || {};
    const [q, setQ] = useState("");
    const [open, setOpen] = useState(false);
    const matches = (rates || []).filter(
      (r) => !q || r.name_fr.toLowerCase().includes(q.toLowerCase()) || r.name_ar.includes(q) || String(r.code).startsWith(q)
    );
    const fee = wilaya ? delivery === "home" ? wilaya.home : wilaya.stop_desk ?? wilaya.home : null;
    return /* @__PURE__ */ React.createElement("div", { className: "ws", dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("div", { className: "ws-row" }, /* @__PURE__ */ React.createElement("label", { className: "ws-label t-mono" }, t.wilaya), /* @__PURE__ */ React.createElement("div", { className: "ws-combo" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "ws-input",
        placeholder: wilaya ? `${String(wilaya.code).padStart(2, "0")} \xB7 ${lang === "ar" ? wilaya.name_ar : wilaya.name_fr}` : t.search,
        value: q,
        onFocus: () => setOpen(true),
        onBlur: () => setTimeout(() => setOpen(false), 150),
        onChange: (e) => {
          setQ(e.target.value);
          setOpen(true);
        }
      }
    ), open && rates && /* @__PURE__ */ React.createElement("ul", { className: "ws-list", role: "listbox" }, matches.length === 0 && /* @__PURE__ */ React.createElement("li", { className: "ws-empty" }, "\u2014"), matches.map((r) => /* @__PURE__ */ React.createElement(
      "li",
      {
        key: r.code,
        role: "option",
        className: wilaya?.code === r.code ? "on" : "",
        onMouseDown: () => {
          setWilaya(r);
          setQ("");
          setCommune("");
          setOpen(false);
        }
      },
      /* @__PURE__ */ React.createElement("span", { className: "ws-code t-num" }, String(r.code).padStart(2, "0")),
      /* @__PURE__ */ React.createElement("span", { className: "ws-name" }, lang === "ar" ? r.name_ar : r.name_fr),
      /* @__PURE__ */ React.createElement("span", { className: "ws-fee t-num" }, r.home, " DA")
    ))))), wilaya && /* @__PURE__ */ React.createElement("div", { className: "ws-row" }, /* @__PURE__ */ React.createElement("label", { className: "ws-label t-mono" }, t.deliv), /* @__PURE__ */ React.createElement("div", { className: "ws-segments" }, /* @__PURE__ */ React.createElement("button", { type: "button", className: delivery === "home" ? "on" : "", onClick: () => setDelivery("home") }, /* @__PURE__ */ React.createElement(IconTruck, { width: 14, height: 14 }), " ", t.home, " ", /* @__PURE__ */ React.createElement("strong", { className: "t-num" }, wilaya.home, " DA")), /* @__PURE__ */ React.createElement(
      "button",
      {
        type: "button",
        className: delivery === "stop_desk" ? "on" : "",
        disabled: wilaya.stop_desk == null,
        onClick: () => setDelivery("stop_desk")
      },
      /* @__PURE__ */ React.createElement(IconBag, { width: 14, height: 14 }),
      " ",
      t.desk,
      " ",
      /* @__PURE__ */ React.createElement("strong", { className: "t-num" }, wilaya.stop_desk ?? "\u2014", " DA")
    ))), wilaya && /* @__PURE__ */ React.createElement("div", { className: "ws-row" }, /* @__PURE__ */ React.createElement("label", { className: "ws-label t-mono" }, t.commune), /* @__PURE__ */ React.createElement("div", { className: "ws-combo" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "ws-input",
        placeholder: t.commPh,
        value: commune,
        onFocus: () => setCommuneOpen(true),
        onBlur: () => setTimeout(() => setCommuneOpen(false), 150),
        onChange: (e) => {
          setCommune(e.target.value);
          setCommuneOpen(true);
        }
      }
    ), communeOpen && communes.length > 0 && /* @__PURE__ */ React.createElement("ul", { className: "ws-list", role: "listbox" }, communes.filter((c) => !commune || (lang === "ar" ? c.name_ar : c.name_fr).toLowerCase().includes(commune.toLowerCase())).map((c) => /* @__PURE__ */ React.createElement("li", { key: c.id || c.name_fr, role: "option", onMouseDown: () => {
      setCommune(lang === "ar" ? c.name_ar : c.name_fr);
      setCommuneId(c.id);
      setCommuneOpen(false);
    } }, lang === "ar" ? c.name_ar : c.name_fr))))), wilaya && /* @__PURE__ */ React.createElement("div", { className: "ws-summary t-mono" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, t.fee), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, fee, " DA")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", null, t.eta), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, wilaya.eta_days, " ", t.days.replace(/s$/, wilaya.eta_days === "1" ? "" : "s")))));
  };
  Object.assign(window, {
    LotusMark,
    IconBag,
    IconHeart,
    IconSearch,
    IconUser,
    IconTruck,
    IconCash,
    IconShield,
    IconReturn,
    IconBell,
    ProductCard,
    BoxOpening,
    Nav,
    ScrollProgress,
    SceneMarker,
    useSceneProgress,
    FilterRail,
    applyFilters,
    COLOR_SWATCHES,
    HEEL_BUCKETS,
    MATERIALS,
    QuickView,
    SegmentToggle,
    WhatsAppFloat,
    CodTrustStrip,
    useRecentlyViewed,
    RecentlyViewedStrip,
    WilayaSelector,
    COMMUNES_SEED
  });
})();
