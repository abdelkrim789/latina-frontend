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
  /* Force-logout helper — single source of truth for session teardown */
  const forceLogout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("latina-token");
  }, []);

  const handleLogin = (u) => {
    setUser(u);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  };
  const handleLogout = () => {
    const tok = localStorage.getItem("latina-token"); // capture before forceLogout clears it
    forceLogout();                                     // instant: setUser(null) + clear storage
    window.latinaApi.logout(tok).catch(() => {});      // fire-and-forget: blacklist JWT on server
  };

  /* ── Modals ── */
  const [authOpen, setAuthOpen] = useState(false);
  const [authInitialStep, setAuthInitialStep] = useState(null);
  const [authResetData, setAuthResetData] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
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

  /* Detect ?verified=1 and ?action=reset URL params from email links */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("verified") === "1") {
      setAuthInitialStep("verified");
      setAuthOpen(true);
      window.history.replaceState({}, "", window.location.pathname);
    } else if (params.get("action") === "reset" && params.get("token")) {
      setAuthInitialStep("reset");
      setAuthResetData({ token: params.get("token"), email: params.get("email") || "" });
      setAuthOpen(true);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  /* Listen for global 401 events emitted by api.js (token expired / blocked) */
  useEffect(() => {
    const handler = () => forceLogout();
    window.addEventListener("latina:auth-fail", handler);
    return () => window.removeEventListener("latina:auth-fail", handler);
  }, [forceLogout]);

  /* Verify stored JWT on mount — also detects if admin blocked the account */
  useEffect(() => {
    if (!user) return;
    window.latinaApi.getMe()
      .then(res => {
        const fresh = res.user || res.data?.user || res;
        if (fresh?.is_active === false) {
          /* Account was blocked server-side — end the session immediately */
          forceLogout();
          return;
        }
        /* Refresh stored profile (name, tier, points may have changed) */
        if (fresh?.id) {
          const merged = { ...user, ...fresh };
          setUser(merged);
          localStorage.setItem(USER_KEY, JSON.stringify(merged));
        }
      })
      .catch(() => forceLogout());
  }, []);

  /* Periodic re-check every 5 min while logged in — catches blocks that happen
     mid-session without requiring the user to perform any action. */
  useEffect(() => {
    if (!user) return;
    const id = setInterval(() => {
      window.latinaApi.getMe()
        .then(res => {
          const fresh = res.user || res.data?.user || res;
          if (fresh?.is_active === false) forceLogout();
        })
        .catch(() => {});
    }, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [user?.id, forceLogout]);

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
      image: window.mediaUrl(product.media?.[0]?.url || product.img) || null,
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

  /* Init animations when box is already dismissed (returning visitor) */
  useEffect(() => {
    if (!boxDone) return;
    setTimeout(() => window.LatinaAnimations?.init(), 300);
  }, [boxDone]);

  const handleBoxDone = () => {
    localStorage.setItem("latina-box-seen", "1");
    setBoxDone(true);
    // Boot GSAP animation system after box sequence completes
    requestAnimationFrame(() => {
      setTimeout(() => window.LatinaAnimations?.init(), 600);
    });
  };
  const replayOpening = () => { localStorage.removeItem("latina-box-seen"); setBoxDone(false); window.scrollTo(0, 0); };

  /* Refresh ScrollTrigger when segment or lang changes */
  useEffect(() => {
    if (boxDone) setTimeout(() => window.LatinaAnimations?.refresh(), 200);
  }, [segment, lang, boxDone]);

  const handleCheckout = (coupon) => {
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
        <ManifestoScene lang={lang} />
        <PackScene lang={lang} onAddToCart={handleAddProduct} />
        <SegmentsScene
          lang={lang}
          onEnterSegment={(seg) => {
            setSegment(seg);
            document.getElementById("collection")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        />
        <StoryScene lang={lang} />
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
      <AuthModal
        lang={lang}
        open={authOpen}
        onClose={() => { setAuthOpen(false); setAuthInitialStep(null); setAuthResetData(null); }}
        onLogin={handleLogin}
        initialStep={authInitialStep}
        resetData={authResetData}
      />

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
        onAuthOpen={() => setAuthOpen(true)}
        onQuickView={openQuickView}
      />

      {/* Account */}
      <AccountPage
        lang={lang} open={accountOpen} onClose={() => setAccountOpen(false)}
        user={user} onLogout={handleLogout}
      />

      {/* WhatsApp */}
      {boxDone && <WhatsAppFloat lang={lang} />}

      {/* Help FAB */}
      {boxDone && (
        <div className="help-fab">
          {fabOpen && (
            <div className="help-fab-options">
              <button className="help-fab-option" onClick={() => { setFabOpen(false); setFeedbackOpen(true); }}>
                <span>★</span>
                {lang === "ar" ? "تقييم" : lang === "en" ? "Feedback" : "Avis"}
              </button>
              <button className="help-fab-option" onClick={() => { setFabOpen(false); setSupportOpen(true); }}>
                <span>💬</span>
                {lang === "ar" ? "دعم" : lang === "en" ? "Support" : "Support"}
              </button>
            </div>
          )}
          <button className={`help-fab-main ${fabOpen ? "open" : ""}`} onClick={() => setFabOpen(v => !v)}>
            {fabOpen ? "✕" : "?"}
          </button>
        </div>
      )}

      {/* Feedback Modal */}
      <FeedbackModal lang={lang} open={feedbackOpen} onClose={() => setFeedbackOpen(false)} user={user} onAuthOpen={() => setAuthOpen(true)} />

      {/* Support Modal */}
      <SupportModal lang={lang} open={supportOpen} onClose={() => setSupportOpen(false)} user={user} />

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
