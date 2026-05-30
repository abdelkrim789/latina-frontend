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
    const [selectedColor, setSelectedColor] = useState(null);
    const [slideIdx, setSlideIdx] = useState(0);
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
    const variantImageMap = useMemo(() => {
      const map = {};
      const media = product.media || [];
      const variants = product.variants || [];
      media.forEach((m) => {
        if (!m.variant_id) return;
        const v = variants.find((v2) => v2.id === m.variant_id);
        if (v && v.color) map[v.color] = m.url;
      });
      return map;
    }, [product.media, product.variants]);
    const allMediaUrls = useMemo(() => {
      const extras = (product.media || []).map((m) => m.url).filter(Boolean);
      const primary = product.img || null;
      const urls = primary ? [primary, ...extras.filter((u) => u !== primary)] : extras;
      return urls;
    }, [product.media, product.img]);
    const currentImg = selectedColor ? variantImageMap[selectedColor] || product.img || allMediaUrls[0] || null : allMediaUrls[slideIdx] || product.img || null;
    useEffect(() => {
      if (selectedColor || allMediaUrls.length <= 1) return;
      const iv = setInterval(() => setSlideIdx((i) => (i + 1) % allMediaUrls.length), 3500);
      return () => clearInterval(iv);
    }, [selectedColor, allMediaUrls.length]);
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
      ), /* @__PURE__ */ React.createElement("div", { className: "product-image" }, currentImg ? /* @__PURE__ */ React.createElement("img", { src: currentImg, alt: product.name, className: "pc-img", loading: "lazy" }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { className: "ph-label" }, product.cat || catLabel), /* @__PURE__ */ React.createElement("span", { className: "ph-sku" }, "SKU \xB7 ", product.sku)), allMediaUrls.length > 1 && !selectedColor && /* @__PURE__ */ React.createElement("div", { className: "pc-slide-dots" }, allMediaUrls.map((_, i) => /* @__PURE__ */ React.createElement(
        "span",
        {
          key: i,
          className: `pc-slide-dot${i === slideIdx ? " active" : ""}`,
          onClick: (e) => {
            e.stopPropagation();
            setSlideIdx(i);
          }
        }
      ))), outOfStock && /* @__PURE__ */ React.createElement("div", { className: "pc-out-overlay" }, labels.out), /* @__PURE__ */ React.createElement("button", { type: "button", className: "pc-quick", onClick: handleQuickView }, /* @__PURE__ */ React.createElement(IconSearch, { width: 12, height: 12 }), /* @__PURE__ */ React.createElement("span", null, labels.quick))), /* @__PURE__ */ React.createElement("div", { className: "meta" }, catLabel && /* @__PURE__ */ React.createElement("span", { className: "pc-cat-tag" }, catLabel), /* @__PURE__ */ React.createElement("div", { className: "pc-name-row" }, /* @__PURE__ */ React.createElement("span", { className: "name" }, product.name)), visibleSwatches.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "pc-colors" }, visibleSwatches.map(({ color, hasStock }) => /* @__PURE__ */ React.createElement(
        "span",
        {
          key: color,
          className: `pc-color-dot${hasStock ? "" : " sold-out"}${selectedColor === color ? " selected" : ""}`,
          style: { background: COLOR_SWATCHES[color] || "#ccc" },
          title: color,
          onClick: (e) => {
            e.stopPropagation();
            setSelectedColor((c) => c === color ? null : color);
          }
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
    const scramIntRef = useRef(null);
    const copy = {
      fr: { skip: "Passer", sub: "Une boutique pens\xE9e juste pour vous" },
      ar: { skip: "\u062A\u062C\u0627\u0648\u0632", sub: "\u0645\u062A\u062C\u0631 \u0635\u064F\u0645\u0650\u0651\u0645 \u062E\u0635\u064A\u0635\u0627\u064B \u0644\u0643\u0650" },
      en: { skip: "Skip", sub: "A boutique designed just for you" }
    }[lang] || { skip: "Skip", sub: "" };
    const [scrambleChars, setScrambleChars] = useState(
      Array(6).fill(null).map(() => ({ char: "\xA0", resolved: false }))
    );
    const petals = useMemo(() => Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90,
      delay: Math.random() * 8,
      dur: 5 + Math.random() * 6,
      size: 8 + Math.random() * 22,
      ratio: 0.5 + Math.random() * 0.7,
      drift: (Math.random() - 0.5) * 360,
      rot: Math.random() * 1440 - 720,
      rotX: Math.random() * 60 - 30,
      opacity: 0.15 + Math.random() * 0.28,
      color: ["#F2C9C0", "#E8A89A", "#E2B8A2", "#F9E8E1", "#CB9E7F"][Math.floor(Math.random() * 5)],
      shape: i % 3
    })), []);
    const bloomPetalData = useMemo(() => Array.from({ length: 8 }, (_, i) => {
      const angle = (i * 45 - 90) * Math.PI / 180;
      const dist = 145;
      return {
        id: i,
        tx: Math.round(Math.cos(angle) * dist),
        ty: Math.round(Math.sin(angle) * dist),
        color: ["#F2C9C0", "#CB9E7F", "#E2B8A2", "#EFE8D8", "#F9E8E1", "#D4A080", "#E8A89A", "#F2C9C0"][i]
      };
    }), []);
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
    const clearScramble = useCallback(() => {
      if (scramIntRef.current) {
        clearInterval(scramIntRef.current);
        scramIntRef.current = null;
      }
      setScrambleChars(["L", "A", "T", "I", "N", "A"].map((ch) => ({ char: ch, resolved: true })));
    }, []);
    const startScramble = useCallback(() => {
      const target = ["L", "A", "T", "I", "N", "A"];
      const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const maxCyc = [5, 8, 11, 14, 10, 6];
      const cycles = [0, 0, 0, 0, 0, 0];
      const resolved = [false, false, false, false, false, false];
      setScrambleChars(target.map(() => ({
        char: charset[Math.floor(Math.random() * charset.length)],
        resolved: false
      })));
      gsap.set(".ci-wordmark", { opacity: 1 });
      const interval = setInterval(() => {
        for (let i = 0; i < 6; i++) cycles[i]++;
        const next = target.map((ch, i) => {
          if (resolved[i]) return { char: ch, resolved: true };
          if (cycles[i] >= maxCyc[i]) {
            resolved[i] = true;
            return { char: ch, resolved: true };
          }
          return { char: charset[Math.floor(Math.random() * charset.length)], resolved: false };
        });
        setScrambleChars(next);
        if (resolved.every(Boolean)) {
          clearInterval(interval);
          scramIntRef.current = null;
        }
      }, 55);
      scramIntRef.current = interval;
    }, []);
    const fireBloomPetals = useCallback(() => {
      if (!rootRef.current) return;
      rootRef.current.querySelectorAll(".ci-bloom-petal").forEach((el, i) => {
        const tx = parseFloat(el.dataset.tx);
        const ty = parseFloat(el.dataset.ty);
        gsap.set(el, { opacity: 0, x: 0, y: 0, scale: 0 });
        const bt = gsap.timeline({ delay: i * 0.07 });
        bt.to(el, { opacity: 0.88, x: tx * 0.42, y: ty * 0.42, scale: 1, duration: 0.44, ease: "power3.out" }).to(el, { opacity: 0, x: tx * 2.1, y: ty * 2.1 + 110, scale: 0.28, duration: 1.35, ease: "power1.in" });
      });
    }, []);
    useEffect(() => {
      if (!rootRef.current || !window.gsap) return;
      const D = (s) => s / Math.max(0.3, speed);
      startParticles();
      gsap.set(rootRef.current, { clipPath: "circle(150% at 50% 45%)" });
      gsap.set(".ci-glow", { opacity: 0, scale: 0.12 });
      gsap.set(".ci-logo-svg", { scale: 0.8 });
      gsap.set(".ci-lp", { opacity: 0 });
      gsap.set(".ci-wordmark", { opacity: 0 });
      gsap.set(".ci-eyebrow", { opacity: 0, y: -12 });
      gsap.set(".ci-tagline-w", { opacity: 0, y: 18 });
      gsap.set(".ci-rule", { scaleX: 0 });
      gsap.set(".ci-sub", { opacity: 0 });
      const tl = gsap.timeline();
      tlRef.current = tl;
      tl.to(
        ".ci-glow",
        { opacity: 1, scale: 1, duration: D(2.2), ease: "power2.out" },
        D(0.15)
      ).to(
        ".ci-logo-svg",
        { scale: 1, duration: D(1.6), ease: "back.out(1.15)" },
        D(0.65)
      ).to(
        ".ci-lp",
        { opacity: 1, stagger: 0.023, duration: D(0.26), ease: "power2.out" },
        D(0.75)
      ).call(startScramble, [], D(2.25)).call(fireBloomPetals, [], D(2.85)).to(
        ".ci-eyebrow",
        { opacity: 1, y: 0, duration: D(0.75), ease: "power3.out" },
        D(3.25)
      ).to(
        ".ci-tagline-w",
        { opacity: 1, y: 0, stagger: D(0.11), duration: D(0.6), ease: "back.out(1.8)" },
        D(3.55)
      ).to(
        ".ci-rule",
        { scaleX: 1, stagger: 0.04, duration: D(0.9), ease: "expo.out" },
        D(3.6)
      ).to(
        ".ci-sub",
        { opacity: 1, duration: D(0.8), ease: "power2.out" },
        D(4)
      ).to({}, { duration: D(2.3) }).to(
        ".ci-content",
        { opacity: 0, y: -14, duration: D(0.48), ease: "power2.in" },
        "exit"
      ).to(
        ".ci-glow",
        { opacity: 0, scale: 1.9, duration: D(0.65), ease: "power2.in" },
        "exit+=0.05"
      ).to(
        rootRef.current,
        {
          clipPath: "circle(0% at 50% 45%)",
          duration: D(0.85),
          ease: "power2.inOut",
          onComplete: () => {
            stopParticles();
            clearScramble();
            onComplete?.();
          }
        },
        "exit+=0.18"
      ).to(
        ".ci-bg",
        { opacity: 0, duration: D(0.35), ease: "linear" },
        "exit+=0.62"
      );
      return () => {
        tl.kill();
        stopParticles();
        clearScramble();
      };
    }, [speed]);
    const skip = useCallback(() => {
      if (tlRef.current) tlRef.current.kill();
      stopParticles();
      clearScramble();
      gsap.to(rootRef.current, {
        clipPath: "circle(0% at 50% 45%)",
        duration: 0.55,
        ease: "power2.inOut",
        onComplete: () => onComplete?.()
      });
    }, [onComplete]);
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
    ))), /* @__PURE__ */ React.createElement("div", { className: "ci-content" }, /* @__PURE__ */ React.createElement("div", { className: "ci-logo-wrap" }, /* @__PURE__ */ React.createElement("div", { className: "ci-bloom-wrap", "aria-hidden": "true" }, bloomPetalData.map(({ id, tx, ty, color }) => /* @__PURE__ */ React.createElement(
      "span",
      {
        key: id,
        className: "ci-bloom-petal",
        "data-tx": `${tx}`,
        "data-ty": `${ty}`,
        style: { background: color }
      }
    ))), /* @__PURE__ */ React.createElement("svg", { className: "ci-logo-svg", viewBox: "0 0 319 178", fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true" }, /* @__PURE__ */ React.createElement("g", { clipPath: "url(#ci-logo-clip)" }, /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M140.333 33.5128C142.829 29.0773 148.429 23.4804 152.338 19.9762C152.907 19.4656 153.671 19.705 154.416 19.8507C159.099 22.2782 165.799 31.4005 168.432 36.0865C168.911 36.9388 170.661 40.6461 171.185 40.907C172.197 40.337 173.38 39.9513 174.476 39.5502C177.93 38.0863 181.55 37.0511 185.256 36.4679C186.815 35.7093 194.239 35.3028 196.386 35.2657C197.001 35.2765 197.999 35.2638 198.581 35.3273C201.62 47.4488 200.147 63.324 193.712 74.416C187.434 85.2389 179 89.0422 167.394 92.114C152.707 96.0016 139.181 93.8312 125.703 86.9839C119.799 83.9845 110.29 74.3689 110.849 66.8566L110.767 66.3307C103.914 67.5326 97.1501 72.6598 93.0137 78.2194C86.9652 86.3491 87.2892 97.3693 90.4944 106.569C90.7996 107.445 92.0844 109.321 92.2069 110.046C92.1746 110.933 92.9066 111.23 92.7585 111.794C91.8694 111.619 90.8349 111.058 89.9489 110.706L89.2726 110.787C89.1517 111.186 89.1504 111.262 89.1497 111.679C87.6733 112.781 87.3262 111.182 86.7985 111.292C86.0282 110.318 84.5434 106.623 84.1457 105.357C81.5365 97.0489 82.1762 87.6089 86.0689 79.8394C91.0842 70.4859 95.0994 66.544 105.236 62.6411C106.209 62.2984 107.315 61.9762 108.307 61.6662C107.947 60.2464 107.596 58.9594 107.565 57.4926C107.421 57.053 107.298 55.637 107.199 55.124C106.313 50.5124 106.879 41.7709 108.196 37.189C108.433 36.3452 108.676 35.9732 109.36 35.4742C111.918 35.3438 118.415 35.5266 120.884 36.1981C124.158 36.2362 132.995 39.1125 135.813 41.0076L136.909 39.0955C137.139 38.2338 139.731 34.213 140.333 33.5128Z", fill: "#CB9E7F" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M114.607 65.9718C115.51 65.5002 121.86 66.3966 123.125 66.6069C133.948 68.4087 141.368 80.1346 147.057 88.6775C137.056 86.322 125.942 83.3581 119.747 74.448C118.793 73.0768 117.888 71.6815 116.981 70.2798C116.427 69.1188 115.318 66.9579 114.607 65.9718Z", fill: "#EFE8D8" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M86.0689 79.8394L86.6434 79.6034L86.9142 79.7808C86.9139 80.1203 86.9083 80.4598 86.8975 80.7991C83.0768 88.9098 82.8703 98.284 85.7624 106.752C87.6195 112.189 88.6306 109.759 89.9531 110.643L89.9489 110.706L89.2726 110.787C89.1517 111.186 89.1504 111.262 89.1497 111.679C87.6733 112.781 87.3262 111.182 86.7985 111.292C86.0282 110.318 84.5434 106.623 84.1457 105.357C81.5365 97.0489 82.1762 87.6089 86.0689 79.8394Z", fill: "#BB8B68" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M140.333 33.5128C142.829 29.0773 148.429 23.4804 152.338 19.9762C152.907 19.4656 153.671 19.705 154.416 19.8507C154.209 20.2623 146.543 27.4033 145.477 28.5508C143.91 30.2372 142.616 32.1665 141.375 34.099C140.974 34.8722 139.415 37.9392 139.01 38.4553C138.314 38.9596 137.794 39.6857 137.46 40.4755C137.256 40.9567 137.211 41.4778 136.715 41.4954C136.261 40.9602 136.318 41.1783 136.32 40.6302C136.767 39.9886 136.869 39.8635 136.909 39.0955C137.139 38.2338 139.731 34.213 140.333 33.5128Z", fill: "#936850" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M140.333 33.5129L140.652 33.5796C141.648 32.3804 143.376 29.5598 144.202 28.7875L144.619 28.8054C144.413 29.5301 141.033 33.2238 141.191 34.0795L141.375 34.099C140.974 34.8722 139.415 37.9392 139.01 38.4553C138.314 38.9596 137.794 39.6857 137.46 40.4755C137.256 40.9567 137.211 41.4778 136.715 41.4954C136.261 40.9602 136.318 41.1783 136.32 40.6302C136.767 39.9886 136.869 39.8635 136.909 39.0955C137.139 38.2338 139.731 34.213 140.333 33.5129Z", fill: "#9E7658" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M86.0689 79.8394C91.0842 70.4859 95.0995 66.544 105.236 62.6411C105.317 63.0429 105.469 63.618 105.328 63.9962C99.6708 65.3962 96.2933 68.7271 92.3281 72.648C89.6906 75.2559 88.5694 77.5477 86.8975 80.7991C86.9083 80.4598 86.9139 80.1203 86.9142 79.7809L86.6434 79.6034L86.0689 79.8394Z", fill: "#9C6951" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M120.884 36.1981C124.158 36.2362 132.995 39.1125 135.813 41.0076L136.909 39.0955C136.869 39.8635 136.767 39.9886 136.32 40.6302C136.318 41.1783 136.261 40.9602 136.715 41.4954C137.211 41.4778 137.256 40.9567 137.46 40.4755C137.794 39.6857 138.314 38.9596 139.01 38.4553C138.566 39.4788 137.423 41.5287 136.649 42.288C135.985 42.5071 134.909 41.8922 134.263 41.5983C131.362 40.3003 128.369 39.2165 125.31 38.3557C124.088 38.0235 121.774 37.6086 120.739 37.2237C120.407 36.8213 119.83 36.72 119.309 36.5604L119.862 36.5527L119.994 36.3068C120.324 36.3561 120.557 36.2729 120.884 36.1981Z", fill: "#BC9176" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M108.196 37.189C108.433 36.3452 108.676 35.9732 109.36 35.4742C109.376 35.9616 109.347 36.4721 109.532 36.9094C109.316 37.5163 109.076 38.2505 108.813 38.8257C107.448 46.3615 107.529 50.718 108.515 58.2768L108.344 58.4174C108.343 58.5815 108.312 59.4543 108.349 59.544C108.166 58.7376 107.894 58.2486 107.565 57.4926C107.421 57.053 107.298 55.637 107.199 55.124C106.313 50.5124 106.879 41.7709 108.196 37.189Z", fill: "#8C6144" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M114.433 66.0065L114.607 65.9718C115.318 66.9579 116.427 69.1188 116.981 70.2798C116.276 70.655 115.522 70.9024 115.369 71.7117C115.632 72.099 115.713 72.2165 115.885 72.6501L115.593 73.3108C115.137 73.656 115.356 73.5889 114.769 73.5512C113.22 72.7151 112.077 70.521 112.242 68.764C113.334 68.8156 114.436 66.9233 114.433 66.0065Z", fill: "#D2AC93" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M185.256 36.4679C186.815 35.7093 194.239 35.3028 196.386 35.2657L197.055 35.4964C196.859 35.593 196.919 35.5199 196.815 35.6796L196.636 35.3295C196.629 35.5745 196.667 35.7639 196.558 35.9381C194.649 37.1259 190.295 36.8822 188.025 37.4633C187.366 37.6321 185.238 37.947 184.576 37.9204L185.32 37.6148C183.997 37.3637 182.603 38.452 181.344 37.6699C182.254 37.2646 184.492 37.2102 185.256 36.4679Z", fill: "#9E7658" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M109.36 35.4741C111.918 35.3438 118.415 35.5266 120.884 36.1981C120.557 36.2729 120.324 36.3561 119.994 36.3068L119.862 36.5527L119.309 36.5604C119.83 36.72 120.407 36.8213 120.739 37.2237C118.795 37.0163 110.679 35.847 109.532 36.9094C109.347 36.4721 109.376 35.9616 109.36 35.4741Z", fill: "#936850" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M174.477 39.5502C177.93 38.0863 181.55 37.0511 185.256 36.4679C184.492 37.2102 182.254 37.2646 181.344 37.6699C182.603 38.452 183.997 37.3637 185.32 37.6148L184.576 37.9204C181.779 38.0499 178.709 39.2365 176.133 40.265C175.665 40.2348 175.361 40.3161 174.885 40.3226L174.477 39.5502Z", fill: "#8C6144" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M107.565 57.4926C107.894 58.2486 108.166 58.7376 108.349 59.544C108.312 59.4543 108.343 58.5815 108.344 58.4174L108.515 58.2768C108.732 58.7704 109.83 63.2276 109.182 63.3134C107.73 63.5055 106.827 63.3949 105.328 63.9962C105.469 63.618 105.317 63.0429 105.236 62.6411C106.209 62.2984 107.315 61.9762 108.307 61.6662C107.947 60.2464 107.596 58.9594 107.565 57.4926Z", fill: "#BC9176" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M171.185 40.907C172.197 40.337 173.38 39.9513 174.476 39.5502L174.885 40.3226C175.361 40.3161 175.665 40.2348 176.133 40.265C175.742 40.4548 175.21 40.7653 174.822 40.9033C173.371 41.4194 171.815 43.2069 171.185 40.907Z", fill: "#936850" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M110.767 66.3307C112.006 66.1805 113.184 66.0128 114.433 66.0065C114.436 66.9233 113.334 68.8156 112.242 68.764C112.052 67.6791 112.071 66.9153 110.849 66.8566L110.767 66.3307Z", fill: "#F2D2B2" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M112.178 40.7881C117.388 40.8901 130.011 42.3871 133.779 45.787C133.543 46.8409 133.531 48.109 133.479 49.2012C133.825 48.5966 134.835 46.692 135.313 46.4008L135.51 46.5945C135.419 47.2898 135.168 47.3906 135.016 48.1068C134.439 50.8341 134.095 53.3522 133.856 56.0062C133.637 58.4365 135.096 65.1174 134.627 66.5494C134.25 66.77 134.447 66.7194 134.016 66.7147C132.14 66.2454 130.437 65.145 128.639 64.4346C126.499 63.5889 124.006 62.9868 121.819 62.3441C119.585 61.6878 114.956 62.3353 113.197 61.5729C113.111 61.184 113.105 61.3419 113.368 60.9115C114.442 60.2405 116.761 60.5447 118.265 60.4729C116.988 60.2339 113.872 60.2876 112.459 60.2829C112.52 57.5686 112.241 54.2924 112.154 51.5397C112.068 47.9562 112.076 44.3712 112.178 40.7881Z", fill: "#EFE8D8" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M118.265 60.4729C123.212 60.6346 125.862 61.5179 130.415 63.5969C131.227 63.9677 133.003 65.1344 133.589 65.1868C133.887 65.7993 133.906 66.0387 134.016 66.7147C132.14 66.2454 130.437 65.145 128.639 64.4346C126.499 63.5889 124.006 62.9868 121.819 62.3441C119.585 61.6878 114.956 62.3353 113.197 61.5729C113.111 61.184 113.105 61.3419 113.368 60.9115C114.442 60.2405 116.761 60.5447 118.265 60.4729Z", fill: "#BC9176" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M133.479 49.2012C133.825 48.5966 134.835 46.692 135.313 46.4008L135.51 46.5945C135.419 47.2898 135.168 47.3906 135.016 48.1068C134.439 50.8341 134.095 53.3522 133.856 56.0062C133.637 58.4365 135.096 65.1174 134.627 66.5494C134.25 66.77 134.447 66.7194 134.016 66.7147C133.906 66.0387 133.887 65.7993 133.589 65.1868C132.797 60.2747 132.211 54.0687 133.479 49.2012Z", fill: "#B38B64" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M141.426 42.0782C142.24 40.3213 143.098 38.5537 144.138 36.9188C145.458 34.8447 151.008 27.6917 153.037 26.9828C153.4 26.8559 153.673 26.8759 154.027 27.0444C156.766 28.3493 165.203 39.7208 166.158 42.6998C166.237 42.9449 166.259 43.1222 166.194 43.3731C166.866 43.2032 166.674 43.1429 167.18 43.4143C167.381 43.8582 167.23 44.1711 167.095 44.6365C163.626 48.222 158.918 50.5066 156.581 55.4049C156.211 56.1816 154.884 58.3998 154.021 58.5258C153.919 58.1083 153.94 58.0177 153.962 57.5814C153.207 57.4551 152.241 55.3304 151.869 54.556C149.588 49.7983 145.574 47.6067 142.15 44.1405L142.035 44.0237C140.824 43.3042 141.169 43.4424 141.426 42.0782Z", fill: "#EFE8D8" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M166.194 43.3731C166.866 43.2032 166.674 43.1429 167.18 43.4143C167.381 43.8582 167.23 44.1711 167.095 44.6365C163.626 48.222 158.918 50.5066 156.581 55.4049C156.211 56.1816 154.884 58.3998 154.021 58.5258C153.919 58.1083 153.94 58.0177 153.962 57.5814C154.52 55.65 156.39 53.0574 157.566 51.4234C159.882 48.206 163.061 45.7418 166.194 43.3731Z", fill: "#9E7658" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M173.206 45.6228C179.281 42.3871 187.628 40.9445 194.486 40.4203C194.545 42.5203 194.802 44.4864 194.886 46.5496C195.07 51.1338 194.78 55.7248 194.018 60.2492C186.928 60.4689 179.867 60.9372 173.759 65.1812C174.786 58.647 174.857 53.9526 173.49 47.4405C173.512 46.649 173.42 46.3951 173.206 45.6228Z", fill: "#EFE8D8" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M192.064 65.7232C192.553 65.4767 192.855 65.0216 193.184 64.5997L193.323 64.6663C193.1 67.4323 190.844 73.8799 188.748 75.845C188.011 76.5367 186.964 76.5657 185.911 76.8887L185.692 76.7658C182.646 79.3367 182.572 79.9609 178.826 82.3255C178.294 83.4015 176.02 83.9103 175.801 84.2284C174.556 86.0345 175.473 86.1398 172.609 87.1006C171.592 87.442 168.937 88.2423 167.876 88.279L167.765 88.1194L168.351 87.5944C167.312 86.8367 166.167 88.0989 164.892 87.6544C164.544 87.6066 161.025 88.3727 160.403 88.4924C160.987 87.4387 161.588 86.3736 162.259 85.3632C167.703 77.1661 173.089 69.0051 183.387 66.6699C185.019 66.2998 190.835 65.1623 192.064 65.7232Z", fill: "#EFE8D8" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M192.064 65.7232C192.553 65.4767 192.855 65.0216 193.184 64.5997L193.323 64.6663C193.1 67.4323 190.844 73.8799 188.748 75.845C188.011 76.5367 186.964 76.5657 185.911 76.8887L185.692 76.7658C189.754 72.1917 189.737 70.8838 192.064 65.7232Z", fill: "#9E7658" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M178.826 82.3255C178.294 83.4015 176.02 83.9103 175.801 84.2284C174.556 86.0345 175.473 86.1398 172.609 87.1006C171.592 87.442 168.937 88.2423 167.876 88.279L167.765 88.1194L168.352 87.5944C167.312 86.8367 166.167 88.0989 164.892 87.6544C171.209 85.9481 172.939 85.3696 178.826 82.3255Z", fill: "#9E7658" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M158.488 81.512C158.357 80.941 158.354 75.3175 158.301 74.13C158.399 71.5772 156.331 66.2925 156.775 64.0511C157.85 58.6166 162.579 53.1431 166.762 49.6905C167.371 49.1873 167.616 48.541 168.24 48.0515C168.561 48.7218 169.047 51.1545 169.238 52.0115C169.845 50.4159 168.603 49.2886 169.103 48.3362C170.183 49.5827 170.721 57.3038 170.504 59.3514C169.694 66.992 167.618 71.1512 163.322 77.2906C161.651 79.6781 161.209 81.1779 158.999 83.636C158.461 83.1171 158.105 82.9577 157.981 82.3182C158.146 82.0471 158.315 81.7781 158.488 81.512Z", fill: "#EFE8D8" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M169.238 52.0115C169.845 50.4159 168.603 49.2886 169.103 48.3362C170.183 49.5827 170.721 57.3038 170.504 59.3514C169.694 66.992 167.618 71.1512 163.322 77.2906C161.651 79.6781 161.209 81.1779 158.999 83.636C158.461 83.1171 158.104 82.9577 157.981 82.3182C158.146 82.0471 158.315 81.7781 158.488 81.512C160.15 79.6336 163.38 74.5989 164.939 72.4396C168.196 67.9279 170.458 57.5114 169.238 52.0115Z", fill: "#AB795C" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M137.813 51.9571C138.212 51.1844 138.831 49.7534 139.51 49.3331L140.018 49.5087C143.388 51.6615 149.81 59.6135 150.668 63.6978C150.779 64.2269 150.78 65.0277 150.771 65.5913L150.766 65.778L150.936 65.6627L151.448 65.8892C151.17 68.5309 150.899 70.8988 150.738 73.5488C150.589 76.0152 150.668 81.2021 150.118 83.4671L149.877 83.3508C149.803 82.8136 149.844 81.8381 149.638 81.5586L149.313 81.6711L149.061 81.7569C147.911 81.3917 143.378 73.98 142.41 72.515C138.379 66.4157 137.162 59.1747 137.813 51.9571Z", fill: "#EFE8D8" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M150.766 65.778L150.936 65.6627L151.448 65.8892C151.17 68.5309 150.899 70.8988 150.738 73.5488C150.589 76.0152 150.668 81.2021 150.118 83.4671L149.877 83.3508C149.803 82.8136 149.844 81.8381 149.638 81.5586L149.313 81.6711C149.267 79.3419 149.112 76.3995 149.363 74.1415C149.665 71.4274 150.297 68.5015 150.766 65.778Z", fill: "#9E7658" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M141.426 42.0782C141.169 43.4424 140.824 43.3042 142.035 44.0237C141.443 44.6276 139.868 48.1573 139.852 49.0873L140.018 49.5087L139.51 49.3331C138.831 49.7534 138.212 51.1844 137.813 51.957C137.808 48.1843 138.239 47.8747 140.118 44.4793C140.608 43.5935 140.704 43.0836 141.426 42.0782Z", fill: "#F2D2B2" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M173.206 45.6228C173.42 46.3951 173.512 46.649 173.49 47.4405C172.494 47.5032 170.418 48.5445 169.548 48.0158C169.889 47.1521 172.284 46.1173 173.206 45.6228Z", fill: "#F2D2B2" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M150.771 65.5913C150.85 64.9763 150.886 64.6281 151.069 64.0313L151.289 63.8989C151.563 64.4118 151.564 65.3309 151.448 65.8892L150.936 65.6627L150.766 65.7779L150.771 65.5913Z", fill: "#BC9176" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M199.666 66.7453C201.079 60.6695 202.266 62.1745 206.977 64.7021C220.807 72.1282 227.256 89.4064 222.67 104.224C220.073 112.622 213.786 117.457 207.175 122.621C197.123 130.475 185.254 135.151 172.825 137.539C157.299 140.615 141.268 140.004 126.021 135.755C122.889 134.905 119.714 133.519 116.612 132.528C114.196 131.756 112.031 130.27 109.724 129.231C101.158 125.375 90.8799 120.262 86.7985 111.292C87.3262 111.182 87.6733 112.781 89.1497 111.679C89.1504 111.262 89.1517 111.186 89.2726 110.787L89.9489 110.706C90.8349 111.058 91.8694 111.619 92.7585 111.794C92.9066 111.23 92.1746 110.933 92.2069 110.046C94.6185 113.34 97.167 117.155 101.531 117.672C112.378 118.957 123.172 109.592 134.144 108.828C139.404 108.461 144.283 110.496 148.674 113.16C150.348 114.175 152.353 115.916 154.15 116.025C155.399 115.602 157.238 114.283 158.399 113.506C161.482 111.501 163.472 110.663 166.892 109.392C171.242 108.31 176.827 109.084 180.976 110.635C188.527 113.038 200.419 119.754 207.544 115.522C224.763 105.294 221.513 78.3478 204.589 69.5365C203.151 68.788 200.782 67.6895 199.666 66.7453Z", fill: "#AD8265" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M166.892 109.392C171.242 108.31 176.827 109.084 180.976 110.635C179.895 111.629 177.032 110.463 175.617 110.399C173.293 110.296 170.01 110.076 167.737 110.456C167.647 109.948 167.302 109.747 166.892 109.392Z", fill: "#936850" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M158.399 113.506C161.482 111.501 163.472 110.663 166.892 109.392C167.302 109.747 167.647 109.948 167.737 110.456C165.389 111.193 161.548 112.783 159.614 114.362C159.149 113.944 158.931 113.824 158.399 113.506Z", fill: "#8C6144" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M154.15 116.025C155.399 115.602 157.238 114.283 158.399 113.506C158.931 113.824 159.149 113.944 159.614 114.362C158.626 115.255 155.573 117.505 154.324 116.658C154.263 116.467 154.162 116.214 154.15 116.025Z", fill: "#936850" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M131.374 114.44C138.443 113.638 140.831 114.28 146.754 118.361C148.366 119.472 150.776 120.546 152.776 120.654C161.102 121.103 163.367 113.153 172.863 113.985C179.834 114.596 183.081 117.111 189.471 119.376C192.737 120.535 196.231 121.356 199.523 122.395C197.205 123.579 194.446 125.214 192.108 126.202C171.118 135.064 148.485 137.061 126.613 130.179C122.296 128.821 110.73 125.503 107.861 122.851L107.934 122.554C108.947 122.032 109.477 122.21 110.159 121.928C110.94 120.858 119.101 119.657 119.826 117.89L119.985 118.315C120.594 117.945 120.278 117.632 120.7 116.878C121.084 116.192 122.894 115.051 123.609 114.958C123.939 114.915 126.192 115.732 126.599 115.575C128.093 114.997 129.59 114.598 131.133 114.229L131.374 114.44Z", fill: "#EFE8D8" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M110.159 121.928C110.94 120.858 119.101 119.657 119.826 117.89L119.985 118.315C120.594 117.945 120.278 117.632 120.7 116.878C121.084 116.192 122.894 115.051 123.609 114.958C123.939 114.915 126.192 115.732 126.599 115.575C128.093 114.997 129.59 114.598 131.133 114.229L131.374 114.44C130.001 114.937 127.826 115.494 126.394 116.053C123.525 117.172 112.679 121.848 110.159 121.928Z", fill: "#D2AC93" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M103.69 121.006L103.94 120.966C104.998 121.366 104.76 122.311 104.565 123.223L104.742 123.438C104.96 123.417 104.992 123.36 105.19 123.237C104.274 123.578 104.072 123.735 103.273 124.317C102.914 124.565 102.893 124.555 102.44 124.538C100.979 123.498 102.643 121.651 103.69 121.006Z", fill: "#BC9176" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M115.131 140.013C121.243 144.971 126.759 149.642 134.215 152.365C136.652 153.255 138.976 154.394 141.533 154.989C155.208 158.176 169.489 155.929 181.449 148.525C182.203 148.058 182.918 147.51 183.639 146.976C188.31 143.52 192.642 139.628 196.636 135.412C197.846 134.136 198.818 132.572 200.245 131.491C202.564 129.665 205.474 129.033 207.951 127.462C204.94 135.173 194.879 145.284 188.125 150.236C184.353 152.968 180.303 155.292 176.041 157.17C161.352 163.618 142.908 163.094 128.721 155.718C122.337 152.4 116.582 149.041 111.554 143.813C112.308 143.106 112.163 142.906 112.695 142.323C113.221 141.748 114.316 141.078 115.008 140.53C115.02 140.361 115.033 140.322 115.083 140.164L115.131 140.013Z", fill: "#9E7359" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M103.338 135.124C101.655 132.929 103.585 130.572 106.02 131.422C109.885 133.969 111.898 136.884 115.131 140.013L115.083 140.164C115.033 140.322 115.02 140.361 115.008 140.53C114.316 141.078 113.221 141.748 112.695 142.323C112.163 142.906 112.308 143.106 111.554 143.813C108.353 140.888 105.927 138.628 103.338 135.124Z", fill: "#BC9176" }), /* @__PURE__ */ React.createElement("path", { className: "ci-lp", d: "M103.338 135.124C101.655 132.929 103.585 130.572 106.02 131.422C105.304 132.255 104.658 132.795 104.017 133.593C103.611 134.098 103.96 134.559 103.338 135.124Z", fill: "#9E7658" })), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "ci-logo-clip" }, /* @__PURE__ */ React.createElement("rect", { width: "318.453", height: "178", fill: "white" })))), /* @__PURE__ */ React.createElement("div", { className: "ci-wordmark", "aria-label": "Latina" }, scrambleChars.map(({ char, resolved }, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: `ci-wchar${resolved ? " ci-wchar--done" : ""}` }, char)))), /* @__PURE__ */ React.createElement("span", { className: "ci-eyebrow" }, "Collection Printemps 2026"), /* @__PURE__ */ React.createElement("div", { className: "ci-tagline", "aria-label": "Just for you" }, /* @__PURE__ */ React.createElement("span", { className: "ci-rule ci-rule-l", "aria-hidden": "true" }), "JUST FOR YOU".split(" ").map((w, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "ci-tagline-w" }, w)), /* @__PURE__ */ React.createElement("span", { className: "ci-rule ci-rule-r", "aria-hidden": "true" })), /* @__PURE__ */ React.createElement("p", { className: "ci-sub" }, copy.sub)), /* @__PURE__ */ React.createElement("button", { className: "ci-skip", onClick: skip, "aria-label": copy.skip }, copy.skip, /* @__PURE__ */ React.createElement("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5" }, /* @__PURE__ */ React.createElement("path", { d: "m5 12 14 0M13 6l6 6-6 6" }))));
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
      fr: { chaussures: "Chaussures", sacs: "Sacs", access: "Accessoires", packs: "Tenues", concours: "Concours", fid: "Fid\xE9lit\xE9", panier: "Panier", login: "Connexion", account: "Mon compte" },
      ar: { chaussures: "\u0627\u0644\u0623\u062D\u0630\u064A\u0629", sacs: "\u0627\u0644\u062D\u0642\u0627\u0626\u0628", access: "\u0627\u0644\u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062A", packs: "\u0627\u0644\u062A\u0646\u0633\u064A\u0642\u0627\u062A", concours: "\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629", fid: "\u0627\u0644\u0648\u0644\u0627\u0621", panier: "\u0627\u0644\u0633\u0644\u0629", login: "\u062F\u062E\u0648\u0644", account: "\u062D\u0633\u0627\u0628\u064A" },
      en: { chaussures: "Shoes", sacs: "Bags", access: "Accessories", packs: "Sets", concours: "Contest", fid: "Loyalty", panier: "Cart", login: "Sign in", account: "Account" }
    }[lang] || {};
    const navLinks = [
      { href: "#collection", label: t.chaussures },
      { href: "#collection", label: t.sacs },
      { href: "#collection", label: t.access },
      { href: "#packs", label: t.packs, highlight: true },
      { href: "#concours", label: t.concours },
      { href: "#fidelite", label: t.fid }
    ];
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("nav", { className: `nav ${hidden ? "hidden" : ""} ${scrolled ? "scrolled" : ""}`, dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("div", { className: "nav-inner" }, /* @__PURE__ */ React.createElement("div", { className: "nav-brand" }, /* @__PURE__ */ React.createElement("div", { className: "logo-mark" }, /* @__PURE__ */ React.createElement(LotusMark, { size: 44 }))), /* @__PURE__ */ React.createElement("div", { className: "nav-links" }, navLinks.map(({ href, label, highlight }) => /* @__PURE__ */ React.createElement("a", { key: label, href, className: `nav-link${highlight ? " nav-link--highlight" : ""}` }, /* @__PURE__ */ React.createElement("span", { className: "nav-link-text" }, label), /* @__PURE__ */ React.createElement("span", { className: "nav-link-line", "aria-hidden": "true" })))), /* @__PURE__ */ React.createElement("div", { className: "nav-actions" }, /* @__PURE__ */ React.createElement("div", { className: "lang-toggle nav-lang-desktop" }, ["fr", "ar", "en"].map((l, i) => /* @__PURE__ */ React.createElement("span", { key: l, className: "lang-item" }, i > 0 && /* @__PURE__ */ React.createElement("span", { className: "sep" }, "\xB7"), /* @__PURE__ */ React.createElement("button", { className: lang === l ? "active" : "", onClick: () => setLang(l) }, l === "fr" ? "FR" : l === "ar" ? "\u0639" : "EN")))), user ? /* @__PURE__ */ React.createElement("button", { className: "nav-user-btn nav-auth-desktop", onClick: onAccountOpen, "aria-label": t.account }, /* @__PURE__ */ React.createElement(IconUser, { width: 14, height: 14 }), /* @__PURE__ */ React.createElement("span", { className: "nav-user-name" }, user.name?.split(" ")[0])) : /* @__PURE__ */ React.createElement("button", { className: "nav-login-btn nav-auth-desktop", onClick: onAuthOpen, "aria-label": t.login }, /* @__PURE__ */ React.createElement(IconUser, { width: 14, height: 14 }), /* @__PURE__ */ React.createElement("span", null, t.login)), user && /* @__PURE__ */ React.createElement("div", { className: "nav-notif-wrap", ref: notifRef }, /* @__PURE__ */ React.createElement(
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
      fr: ["Paiement \xE0 la livraison", "Livraison 69 wilayas", "S\xE9lection v\xE9rifi\xE9e", "Emballage signature"],
      ar: ["\u0627\u0644\u062F\u0641\u0639 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645", "\u062A\u0648\u0635\u064A\u0644 69 \u0648\u0644\u0627\u064A\u0629", "\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0648\u062B\u0648\u0642", "\u062A\u063A\u0644\u064A\u0641 \u0645\u0645\u064A\u0632"],
      en: ["Pay on delivery", "All 69 wilayas", "Vetted selection", "Signature packaging"]
    }[lang] || [];
    const icons = [/* @__PURE__ */ React.createElement(IconCash, { key: "c", width: 14, height: 14 }), /* @__PURE__ */ React.createElement(IconTruck, { key: "t", width: 14, height: 14 }), /* @__PURE__ */ React.createElement(IconShield, { key: "s", width: 14, height: 14 }), /* @__PURE__ */ React.createElement(IconShield, { key: "s2", width: 14, height: 14 })];
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
    return /* @__PURE__ */ React.createElement("section", { className: "recent-strip", dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "recent-head" }, /* @__PURE__ */ React.createElement("span", { className: "t-mono" }, "\u2014 ", t)), /* @__PURE__ */ React.createElement("div", { className: "recent-track" }, items.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.sku, className: "recent-item", onClick: () => onQuickView?.(p) }, /* @__PURE__ */ React.createElement("div", { className: "recent-thumb" }, p.img || p.image ? /* @__PURE__ */ React.createElement("img", { src: p.img || p.image, alt: p.name, loading: "lazy" }) : /* @__PURE__ */ React.createElement("span", { className: "ph-label" }, p.cat)), /* @__PURE__ */ React.createElement("div", { className: "recent-meta" }, /* @__PURE__ */ React.createElement("span", { className: "recent-name" }, p.name), /* @__PURE__ */ React.createElement("span", { className: "recent-price t-num" }, p.price.toLocaleString("fr-DZ"), " DA")))))));
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
