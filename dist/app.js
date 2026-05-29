(() => {
  // app.jsx
  var { useState, useEffect, useRef, useCallback } = React;
  var TWEAK_DEFAULTS = (
    /*EDITMODE-BEGIN*/
    {
      "pinkIntensity": 1,
      "roseHue": 28,
      "speed": 1,
      "showOpening": true
    }
  );
  var CART_KEY = "latina-cart";
  var USER_KEY = "latina-user";
  var loadCart = () => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  };
  var saveCart = (c) => localStorage.setItem(CART_KEY, JSON.stringify(c));
  var App = () => {
    const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
    const [lang, setLang] = useState("fr");
    const [boxDone, setBoxDone] = useState(() => {
      return localStorage.getItem("latina-box-seen") === "1" && !TWEAK_DEFAULTS.showOpening ? true : false;
    });
    const [cart, setCartRaw] = useState(loadCart);
    const setCart = useCallback((updater) => {
      setCartRaw((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        saveCart(next);
        return next;
      });
    }, []);
    const cartCount = cart.reduce((s, i) => s + i.qty, 0);
    const [user, setUser] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem(USER_KEY) || "null");
      } catch {
        return null;
      }
    });
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
      const tok = localStorage.getItem("latina-token");
      forceLogout();
      window.latinaApi.logout(tok).catch(() => {
      });
    };
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
    const [flyers, setFlyers] = useState([]);
    const flyerIdRef = useRef(0);
    const [segment, setSegment] = useState("ALL");
    const [quickView, setQuickView] = useState(null);
    const [wishlist, setWishlist] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("latina-wishlist") || "[]");
      } catch {
        return [];
      }
    });
    const [recent, pushRecent] = useRecentlyViewed();
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
    useEffect(() => {
      const handler = () => forceLogout();
      window.addEventListener("latina:auth-fail", handler);
      return () => window.removeEventListener("latina:auth-fail", handler);
    }, [forceLogout]);
    useEffect(() => {
      if (!user) return;
      window.latinaApi.getMe().then((res) => {
        const fresh = res.user || res.data?.user || res;
        if (fresh?.is_active === false) {
          forceLogout();
          return;
        }
        if (fresh?.id) {
          const merged = { ...user, ...fresh };
          setUser(merged);
          localStorage.setItem(USER_KEY, JSON.stringify(merged));
        }
      }).catch(() => forceLogout());
    }, []);
    useEffect(() => {
      if (!user) return;
      const id = setInterval(() => {
        window.latinaApi.getMe().then((res) => {
          const fresh = res.user || res.data?.user || res;
          if (fresh?.is_active === false) forceLogout();
        }).catch(() => {
        });
      }, 5 * 60 * 1e3);
      return () => clearInterval(id);
    }, [user?.id, forceLogout]);
    useEffect(() => {
      if (!user) return;
      window.latinaApi.syncWishlist(wishlist).catch(() => {
      });
    }, [user]);
    useEffect(() => {
      const html = document.documentElement;
      html.lang = lang;
      html.dir = lang === "ar" ? "rtl" : "ltr";
    }, [lang]);
    const toggleWishlist = (product) => {
      setWishlist((prev) => {
        const next = prev.includes(product.sku) ? prev.filter((s) => s !== product.sku) : [...prev, product.sku];
        localStorage.setItem("latina-wishlist", JSON.stringify(next));
        if (user) window.latinaApi.toggleWishlist(product.id || product.sku).catch(() => {
        });
        return next;
      });
    };
    const openQuickView = (product, opts) => setQuickView({ product, mode: opts?.restockMode ? "restockMode" : "view" });
    const closeQuickView = () => setQuickView(null);
    const handleAddProduct = (product, variantId, variantLabel, price) => {
      const actualPrice = price || product.price || product.sale_price || 0;
      const item = {
        product_id: product.id || product._apiId,
        variant_id: variantId || product.variants?.[0]?.id,
        name: product[`name_${lang}`] || product.name_fr || product.name || product.sku,
        variant: variantLabel || null,
        price: Number(actualPrice),
        qty: 1,
        image: window.mediaUrl(product.media?.[0]?.url || product.img) || null
      };
      setCart((prev) => {
        const idx = prev.findIndex((i) => i.variant_id === item.variant_id && i.product_id === item.product_id);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
          return next;
        }
        return [...prev, item];
      });
      const cartBtn = document.querySelector(".cart-btn");
      const r = cartBtn?.getBoundingClientRect();
      const id = ++flyerIdRef.current;
      const tx = r ? r.left + 30 : window.innerWidth - 100;
      const ty = r ? r.top + 20 : 30;
      setFlyers((f) => [...f, { id, x: window.innerWidth / 2, y: window.innerHeight / 2, tx, ty, name: item.name }]);
      setTimeout(() => setFlyers((f) => f.filter((p) => p.id !== id)), 1e3);
    };
    const handleAdd = (productOrPos, pos) => {
      if (productOrPos && (productOrPos._apiId || productOrPos.id)) {
        const apiId = productOrPos._apiId || productOrPos.id;
        handleAddProduct({ id: apiId, ...productOrPos }, void 0, void 0, productOrPos.price);
        if (pos) {
          const cartBtn2 = document.querySelector(".cart-btn");
          const target2 = cartBtn2 ? cartBtn2.getBoundingClientRect() : { left: window.innerWidth - 100, top: 30 };
          const id2 = ++flyerIdRef.current;
          const name2 = productOrPos.name_fr || productOrPos.name || "";
          setFlyers((f) => [...f, { id: id2, x: pos.x, y: pos.y, tx: target2.left + 30, ty: target2.top + 20, name: name2 }]);
          setTimeout(() => setFlyers((f) => f.filter((p) => p.id !== id2)), 1e3);
        }
        return;
      }
      const { x, y, name } = productOrPos || {};
      const cartBtn = document.querySelector(".cart-btn");
      const target = cartBtn ? cartBtn.getBoundingClientRect() : { left: window.innerWidth - 100, top: 30 };
      const id = ++flyerIdRef.current;
      setFlyers((f) => [...f, { id, x, y, tx: target.left + 30, ty: target.top + 20, name }]);
      setCart((prev) => {
        const existing = prev.find((i) => i.name === name);
        if (existing) return prev.map((i) => i.name === name ? { ...i, qty: i.qty + 1 } : i);
        return [...prev, { product_id: null, variant_id: null, name, variant: null, price: 0, qty: 1, image: null }];
      });
      setTimeout(() => setFlyers((f) => f.filter((p) => p.id !== id)), 1e3);
    };
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
    useEffect(() => {
      if (!boxDone) return;
      setTimeout(() => window.LatinaAnimations?.init(), 300);
    }, [boxDone]);
    const handleBoxDone = () => {
      localStorage.setItem("latina-box-seen", "1");
      setBoxDone(true);
      requestAnimationFrame(() => {
        setTimeout(() => window.LatinaAnimations?.init(), 600);
      });
    };
    const replayOpening = () => {
      localStorage.removeItem("latina-box-seen");
      setBoxDone(false);
      window.scrollTo(0, 0);
    };
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
    return /* @__PURE__ */ React.createElement(React.Fragment, null, !boxDone && /* @__PURE__ */ React.createElement(BoxOpening, { lang, onComplete: handleBoxDone, speed: t.speed }), /* @__PURE__ */ React.createElement(ScrollProgress, null), /* @__PURE__ */ React.createElement(
      Nav,
      {
        lang,
        setLang,
        cartCount,
        hidden: !boxDone,
        user,
        onAuthOpen: () => setAuthOpen(true),
        onCartOpen: () => setCartOpen(true),
        onAccountOpen: () => setAccountOpen(true)
      }
    ), /* @__PURE__ */ React.createElement("main", { style: { opacity: boxDone ? 1 : 0, transition: "opacity 1s ease 0.4s" } }, /* @__PURE__ */ React.createElement(HeroScene, { lang, onAdd: handleAdd }), /* @__PURE__ */ React.createElement(ManifestoScene, { lang }), /* @__PURE__ */ React.createElement(CodTrustStrip, { lang }), /* @__PURE__ */ React.createElement(
      CollectionScene,
      {
        lang,
        onAdd: handleAdd,
        onAddProduct: handleAddProduct,
        onQuickView: openQuickView,
        segment,
        onSegmentChange: setSegment,
        wishlist,
        onWishlist: toggleWishlist,
        onProductView: pushRecent
      }
    ), /* @__PURE__ */ React.createElement(
      SegmentsScene,
      {
        lang,
        onEnterSegment: (seg) => {
          setSegment(seg);
          document.getElementById("collection")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    ), /* @__PURE__ */ React.createElement(RewardsScene, { lang, user, onOpenAuth: () => setAuthOpen(true) }), /* @__PURE__ */ React.createElement(TrustScene, { lang }), /* @__PURE__ */ React.createElement(RecentlyViewedStrip, { items: recent, onQuickView: openQuickView, lang }), /* @__PURE__ */ React.createElement(Footer, { lang })), quickView && /* @__PURE__ */ React.createElement(
      QuickView,
      {
        product: quickView.product,
        mode: quickView.mode,
        onClose: closeQuickView,
        onAdd: (product, variantId, variantLabel, price) => handleAddProduct(product, variantId, variantLabel, price),
        lang
      }
    ), /* @__PURE__ */ React.createElement(
      AuthModal,
      {
        lang,
        open: authOpen,
        onClose: () => {
          setAuthOpen(false);
          setAuthInitialStep(null);
          setAuthResetData(null);
        },
        onLogin: handleLogin,
        initialStep: authInitialStep,
        resetData: authResetData
      }
    ), /* @__PURE__ */ React.createElement(
      CartDrawer,
      {
        lang,
        open: cartOpen,
        onClose: () => setCartOpen(false),
        cart,
        onUpdateCart: setCart,
        onCheckout: handleCheckout,
        user
      }
    ), /* @__PURE__ */ React.createElement(
      CheckoutPage,
      {
        lang,
        open: checkoutOpen,
        onClose: () => setCheckoutOpen(false),
        cart,
        user,
        coupon: checkoutCoupon,
        onOrderPlaced: handleOrderPlaced,
        onAuthOpen: () => setAuthOpen(true),
        onQuickView: openQuickView
      }
    ), /* @__PURE__ */ React.createElement(
      AccountPage,
      {
        lang,
        open: accountOpen,
        onClose: () => setAccountOpen(false),
        user,
        onLogout: handleLogout
      }
    ), boxDone && /* @__PURE__ */ React.createElement(WhatsAppFloat, { lang }), boxDone && /* @__PURE__ */ React.createElement("div", { className: "help-fab" }, fabOpen && /* @__PURE__ */ React.createElement("div", { className: "help-fab-options" }, /* @__PURE__ */ React.createElement("button", { className: "help-fab-option", onClick: () => {
      setFabOpen(false);
      setFeedbackOpen(true);
    } }, /* @__PURE__ */ React.createElement("span", null, "\u2605"), lang === "ar" ? "\u062A\u0642\u064A\u064A\u0645" : lang === "en" ? "Feedback" : "Avis"), /* @__PURE__ */ React.createElement("button", { className: "help-fab-option", onClick: () => {
      setFabOpen(false);
      setSupportOpen(true);
    } }, /* @__PURE__ */ React.createElement("span", null, "\u{1F4AC}"), lang === "ar" ? "\u062F\u0639\u0645" : lang === "en" ? "Support" : "Support")), /* @__PURE__ */ React.createElement("button", { className: `help-fab-main ${fabOpen ? "open" : ""}`, onClick: () => setFabOpen((v) => !v) }, fabOpen ? "\u2715" : "?")), /* @__PURE__ */ React.createElement(FeedbackModal, { lang, open: feedbackOpen, onClose: () => setFeedbackOpen(false), user, onAuthOpen: () => setAuthOpen(true) }), /* @__PURE__ */ React.createElement(SupportModal, { lang, open: supportOpen, onClose: () => setSupportOpen(false), user }), flyers.map((f) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: f.id,
        className: "fly-cart",
        style: {
          left: f.x - 40,
          top: f.y - 40,
          transform: `translate(${f.tx - f.x}px, ${f.ty - f.y}px) scale(0.2)`,
          opacity: 0
        }
      },
      f.name.slice(0, 8)
    )), /* @__PURE__ */ React.createElement(TweaksPanel, { title: "Tweaks \xB7 Latina" }, /* @__PURE__ */ React.createElement(TweakSection, { label: "Palette" }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: "Intensit\xE9 rose",
        value: t.pinkIntensity,
        onChange: (v) => setTweak("pinkIntensity", v),
        options: [{ value: 0, label: "Doux" }, { value: 1, label: "P\xE9tale" }, { value: 2, label: "Chaud" }, { value: 3, label: "Terre" }]
      }
    ), /* @__PURE__ */ React.createElement(TweakSection, { label: "Mouvement" }), /* @__PURE__ */ React.createElement(TweakSlider, { label: "Vitesse animations", value: t.speed, min: 0.5, max: 2, step: 0.1, unit: "\xD7", onChange: (v) => setTweak("speed", v) }), /* @__PURE__ */ React.createElement(TweakSection, { label: "Ouverture" }), /* @__PURE__ */ React.createElement(TweakButton, { label: "\u21BB Rejouer l'animation bo\xEEte", onClick: replayOpening }), /* @__PURE__ */ React.createElement(TweakSection, { label: "Langue" }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: "Langue active",
        value: lang,
        onChange: setLang,
        options: [{ value: "fr", label: "FR" }, { value: "ar", label: "\u0639" }, { value: "en", label: "EN" }]
      }
    ), /* @__PURE__ */ React.createElement(TweakSection, { label: "Segment" }), /* @__PURE__ */ React.createElement(
      TweakRadio,
      {
        label: "Public cibl\xE9",
        value: segment,
        onChange: setSegment,
        options: [{ value: "ALL", label: "Tous" }, { value: "A", label: "12\u201430" }, { value: "B", label: "30\u201450" }]
      }
    )));
  };
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();
