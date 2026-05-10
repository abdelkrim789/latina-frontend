/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   APP — orchestrates everything
   ============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "pinkIntensity": 1,
  "roseHue": 28,
  "speed": 1,
  "showOpening": true
}/*EDITMODE-END*/;

const CART_KEY = "latina-cart";
const USER_KEY = "latina-user";

const loadCart = () => {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
};
const saveCart = (c) => localStorage.setItem(CART_KEY, JSON.stringify(c));

const App = () => {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  const [lang, setLang] = useState("fr");
  const [boxDone, setBoxDone] = useState(() => {
    return localStorage.getItem("latina-box-seen") === "1" && !TWEAK_DEFAULTS.showOpening ? true : false;
  });

  /* ── Cart ── */
  const [cart, setCartRaw] = useState(loadCart);
  const setCart = useCallback((updater) => {
    setCartRaw(prev => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveCart(next);
      return next;
    });
  }, []);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  /* ── User / Auth ── */
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY) || "null"); } catch { return null; }
  });
  const handleLogin = (u) => {
    setUser(u);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  };
  const handleLogout = async () => {
    try { await window.latinaApi.logout(); } catch {}
    setUser(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("latina-token");
  };

  /* ── Modals ── */
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [checkoutCoupon, setCheckoutCoupon] = useState(null);

  /* ── Fly-to-cart ── */
  const [flyers, setFlyers] = useState([]);
  const flyerIdRef = useRef(0);

  /* ── v2 ── */
  const [segment, setSegment] = useState("ALL");
  const [quickView, setQuickView] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("latina-wishlist") || "[]"); } catch { return []; }
  });
  const [recent, pushRecent] = useRecentlyViewed();

  /* Verify stored JWT on mount — clear stale user if token expired */
  useEffect(() => {
    if (!user) return;
    window.latinaApi.getMe().catch(() => {
      setUser(null);
      localStorage.removeItem(USER_KEY);
    });
  }, []);

  /* Sync server wishlist when user logs in */
  useEffect(() => {
    if (!user) return;
    window.latinaApi.syncWishlist(wishlist).catch(() => {});
  }, [user]);

  /* RTL direction */
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  /* Wishlist toggle — local + server */
  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const next = prev.includes(product.sku)
        ? prev.filter(s => s !== product.sku)
        : [...prev, product.sku];
      localStorage.setItem("latina-wishlist", JSON.stringify(next));
      if (user) window.latinaApi.toggleWishlist(product.id || product.sku).catch(() => {});
      return next;
    });
  };

  /* Quick-view */
  const openQuickView = (product, opts) => setQuickView({ product, mode: opts?.restockMode ? "restockMode" : "view" });
  const closeQuickView = () => setQuickView(null);

  /* Add product to cart (from QuickView / ProductCard) */
  const handleAddProduct = (product, variantId, variantLabel, price) => {
    const actualPrice = price || product.price || product.sale_price || 0;
    const item = {
      product_id: product.id || product._apiId,
      variant_id: variantId || product.variants?.[0]?.id,
      name: product[`name_${lang}`] || product.name_fr || product.name || product.sku,
      variant: variantLabel || null,
      price: Number(actualPrice),
      qty: 1,
      image: product.media?.[0]?.url || product.img || null,
    };
    setCart(prev => {
      const idx = prev.findIndex(i => i.variant_id === item.variant_id && i.product_id === item.product_id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, item];
    });
    /* Fly animation */
    const cartBtn = document.querySelector(".cart-btn");
    const r = cartBtn?.getBoundingClientRect();
    const id = ++flyerIdRef.current;
    const tx = r ? r.left + 30 : window.innerWidth - 100;
    const ty = r ? r.top + 20 : 30;
    setFlyers(f => [...f, { id, x: window.innerWidth / 2, y: window.innerHeight / 2, tx, ty, name: item.name }]);
    setTimeout(() => setFlyers(f => f.filter(p => p.id !== id)), 1000);
  };

  /* handleAdd — accepts (product, pos) from ProductCard or legacy {x,y,name} from HeroScene */
  const handleAdd = (productOrPos, pos) => {
    // New signature: productOrPos is the product object, pos is {x, y}
    if (productOrPos && (productOrPos._apiId || productOrPos.id)) {
      const apiId = productOrPos._apiId || productOrPos.id;
      handleAddProduct({ id: apiId, ...productOrPos }, undefined, undefined, productOrPos.price);
      // Fire the flying animation
      if (pos) {
        const cartBtn = document.querySelector(".cart-btn");
        const target = cartBtn ? cartBtn.getBoundingClientRect() : { left: window.innerWidth - 100, top: 30 };
        const id = ++flyerIdRef.current;
        const name = productOrPos.name_fr || productOrPos.name || '';
        setFlyers(f => [...f, { id, x: pos.x, y: pos.y, tx: target.left + 30, ty: target.top + 20, name }]);
        setTimeout(() => setFlyers(f => f.filter(p => p.id !== id)), 1000);
      }
      return;
    }
    // Legacy: productOrPos is {x, y, name}
    const { x, y, name } = productOrPos || {};
    const cartBtn = document.querySelector(".cart-btn");
    const target = cartBtn ? cartBtn.getBoundingClientRect() : { left: window.innerWidth - 100, top: 30 };
    const id = ++flyerIdRef.current;
    setFlyers(f => [...f, { id, x, y, tx: target.left + 30, ty: target.top + 20, name }]);
    setCart(prev => {
      const existing = prev.find(i => i.name === name);
      if (existing) return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { product_id: null, variant_id: null, name, variant: null, price: 0, qty: 1, image: null }];
    });
    setTimeout(() => setFlyers(f => f.filter(p => p.id !== id)), 1000);
  };

  /* Tweak CSS vars */
  useEffect(() => {
    const root = document.documentElement;
    const intensities = [
      { p100: "#FBF6F1", p200: "#F5E1DA", r400: "#C68B6F", r500: "#B97559" },
      { p100: "#FDF4F1", p200: "#F2C9C0", r400: "#C68B6F", r500: "#B97559" },
      { p100: "#FFF0EE", p200: "#EFAFA3", r400: "#B97559", r500: "#A85C44" },
      { p100: "#FBF6F1", p200: "#E8D4CA", r400: "#A05C42", r500: "#8C5A45" }
    ];
    const cfg = intensities[Math.min(3, Math.max(0, t.pinkIntensity))];
    root.style.setProperty("--petal-100", cfg.p100);
    root.style.setProperty("--petal-200", cfg.p200);
    root.style.setProperty("--speed", t.speed);
  }, [t.pinkIntensity, t.speed]);

  /* Reveal-on-scroll */
  useEffect(() => {
    if (!boxDone) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [boxDone, lang]);

  const handleBoxDone = () => { localStorage.setItem("latina-box-seen", "1"); setBoxDone(true); };
  const replayOpening = () => { localStorage.removeItem("latina-box-seen"); setBoxDone(false); window.scrollTo(0, 0); };

  const handleCheckout = (coupon) => {
    if (!user) { setCartOpen(false); setAuthOpen(true); return; }
    setCheckoutCoupon(coupon);
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderPlaced = () => {
    setCart([]);
  };

  return (
    <>
      {!boxDone && <BoxOpening lang={lang} onComplete={handleBoxDone} speed={t.speed} />}

      <ScrollProgress />
      <Nav
        lang={lang} setLang={setLang}
        cartCount={cartCount} hidden={!boxDone}
        user={user}
        onAuthOpen={() => setAuthOpen(true)}
        onCartOpen={() => setCartOpen(true)}
        onAccountOpen={() => setAccountOpen(true)}
      />

      <main style={{ opacity: boxDone ? 1 : 0, transition: "opacity 1s ease 0.4s" }}>
        <HeroScene lang={lang} onAdd={handleAdd} />
        <ManifestoScene lang={lang} />
        <CodTrustStrip lang={lang} />
        <CollectionScene
          lang={lang}
          onAdd={handleAdd}
          onAddProduct={handleAddProduct}
          onQuickView={openQuickView}
          segment={segment}
          onSegmentChange={setSegment}
          wishlist={wishlist}
          onWishlist={toggleWishlist}
          onProductView={pushRecent}
        />
        <SegmentsScene
          lang={lang}
          onEnterSegment={(seg) => {
            setSegment(seg);
            document.getElementById("collection")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
        <RewardsScene lang={lang} user={user} onOpenAuth={() => setAuthOpen(true)} />
        <TrustScene lang={lang} />
        <RecentlyViewedStrip items={recent} onQuickView={openQuickView} lang={lang} />
        <Footer lang={lang} />
      </main>

      {/* Quick-view modal */}
      {quickView && (
        <QuickView
          product={quickView.product}
          mode={quickView.mode}
          onClose={closeQuickView}
          onAdd={(product, variantId, variantLabel, price) => handleAddProduct(product, variantId, variantLabel, price)}
          lang={lang}
        />
      )}

      {/* Auth Modal */}
      <AuthModal lang={lang} open={authOpen} onClose={() => setAuthOpen(false)} onLogin={handleLogin} />

      {/* Cart Drawer */}
      <CartDrawer
        lang={lang} open={cartOpen} onClose={() => setCartOpen(false)}
        cart={cart} onUpdateCart={setCart}
        onCheckout={handleCheckout}
        user={user}
      />

      {/* Checkout */}
      <CheckoutPage
        lang={lang} open={checkoutOpen} onClose={() => setCheckoutOpen(false)}
        cart={cart} user={user} coupon={checkoutCoupon}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Account */}
      <AccountPage
        lang={lang} open={accountOpen} onClose={() => setAccountOpen(false)}
        user={user} onLogout={handleLogout}
      />

      {/* WhatsApp */}
      {boxDone && <WhatsAppFloat lang={lang} />}

      {/* Fly-to-cart particles */}
      {flyers.map(f => (
        <div
          key={f.id}
          className="fly-cart"
          style={{
            left: f.x - 40, top: f.y - 40,
            transform: `translate(${f.tx - f.x}px, ${f.ty - f.y}px) scale(0.2)`,
            opacity: 0
          }}
        >{f.name.slice(0, 8)}</div>
      ))}

      {/* Tweaks */}
      <TweaksPanel title="Tweaks · Latina">
        <TweakSection label="Palette" />
        <TweakRadio
          label="Intensité rose"
          value={t.pinkIntensity}
          onChange={v => setTweak("pinkIntensity", v)}
          options={[{ value: 0, label: "Doux" },{ value: 1, label: "Pétale" },{ value: 2, label: "Chaud" },{ value: 3, label: "Terre" }]}
        />
        <TweakSection label="Mouvement" />
        <TweakSlider label="Vitesse animations" value={t.speed} min={0.5} max={2} step={0.1} unit="×" onChange={v => setTweak("speed", v)} />
        <TweakSection label="Ouverture" />
        <TweakButton label="↻ Rejouer l'animation boîte" onClick={replayOpening} />
        <TweakSection label="Langue" />
        <TweakRadio
          label="Langue active"
          value={lang}
          onChange={setLang}
          options={[{ value: "fr", label: "FR" },{ value: "ar", label: "ع" },{ value: "en", label: "EN" }]}
        />
        <TweakSection label="Segment" />
        <TweakRadio
          label="Public ciblé"
          value={segment}
          onChange={setSegment}
          options={[{ value: "ALL", label: "Tous" },{ value: "A", label: "12—30" },{ value: "B", label: "30—50" }]}
        />
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
