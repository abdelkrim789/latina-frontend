"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/* global React, ReactDOM */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useCallback = _React.useCallback;

/* ============================================================
   APP — orchestrates everything
   ============================================================ */

var TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "pinkIntensity": 1,
  "roseHue": 28,
  "speed": 1,
  "showOpening": true
} /*EDITMODE-END*/;
var CART_KEY = "latina-cart";
var USER_KEY = "latina-user";
var loadCart = function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch (_unused) {
    return [];
  }
};
var saveCart = function saveCart(c) {
  return localStorage.setItem(CART_KEY, JSON.stringify(c));
};
var App = function App() {
  var _useTweaks = useTweaks(TWEAK_DEFAULTS),
    _useTweaks2 = _slicedToArray(_useTweaks, 2),
    t = _useTweaks2[0],
    setTweak = _useTweaks2[1];
  var _useState = useState("fr"),
    _useState2 = _slicedToArray(_useState, 2),
    lang = _useState2[0],
    setLang = _useState2[1];
  var _useState3 = useState(function () {
      return localStorage.getItem("latina-box-seen") === "1" && !TWEAK_DEFAULTS.showOpening ? true : false;
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    boxDone = _useState4[0],
    setBoxDone = _useState4[1];

  /* ── Cart ── */
  var _useState5 = useState(loadCart),
    _useState6 = _slicedToArray(_useState5, 2),
    cart = _useState6[0],
    setCartRaw = _useState6[1];
  var setCart = useCallback(function (updater) {
    setCartRaw(function (prev) {
      var next = typeof updater === "function" ? updater(prev) : updater;
      saveCart(next);
      return next;
    });
  }, []);
  var cartCount = cart.reduce(function (s, i) {
    return s + i.qty;
  }, 0);

  /* ── User / Auth ── */
  var _useState7 = useState(function () {
      try {
        return JSON.parse(localStorage.getItem(USER_KEY) || "null");
      } catch (_unused2) {
        return null;
      }
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    user = _useState8[0],
    setUser = _useState8[1];
  var handleLogin = function handleLogin(u) {
    setUser(u);
    localStorage.setItem(USER_KEY, JSON.stringify(u));
  };
  var handleLogout = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            _context.p = 0;
            _context.n = 1;
            return window.latinaApi.logout();
          case 1:
            _context.n = 3;
            break;
          case 2:
            _context.p = 2;
            _t = _context.v;
          case 3:
            setUser(null);
            localStorage.removeItem(USER_KEY);
            localStorage.removeItem("latina-token");
          case 4:
            return _context.a(2);
        }
      }, _callee, null, [[0, 2]]);
    }));
    return function handleLogout() {
      return _ref.apply(this, arguments);
    };
  }();

  /* ── Modals ── */
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    authOpen = _useState0[0],
    setAuthOpen = _useState0[1];
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    cartOpen = _useState10[0],
    setCartOpen = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    checkoutOpen = _useState12[0],
    setCheckoutOpen = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    accountOpen = _useState14[0],
    setAccountOpen = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    checkoutCoupon = _useState16[0],
    setCheckoutCoupon = _useState16[1];

  /* ── Fly-to-cart ── */
  var _useState17 = useState([]),
    _useState18 = _slicedToArray(_useState17, 2),
    flyers = _useState18[0],
    setFlyers = _useState18[1];
  var flyerIdRef = useRef(0);

  /* ── v2 ── */
  var _useState19 = useState("ALL"),
    _useState20 = _slicedToArray(_useState19, 2),
    segment = _useState20[0],
    setSegment = _useState20[1];
  var _useState21 = useState(null),
    _useState22 = _slicedToArray(_useState21, 2),
    quickView = _useState22[0],
    setQuickView = _useState22[1];
  var _useState23 = useState(function () {
      try {
        return JSON.parse(localStorage.getItem("latina-wishlist") || "[]");
      } catch (_unused4) {
        return [];
      }
    }),
    _useState24 = _slicedToArray(_useState23, 2),
    wishlist = _useState24[0],
    setWishlist = _useState24[1];
  var _useRecentlyViewed = useRecentlyViewed(),
    _useRecentlyViewed2 = _slicedToArray(_useRecentlyViewed, 2),
    recent = _useRecentlyViewed2[0],
    pushRecent = _useRecentlyViewed2[1];

  /* Verify stored JWT on mount — clear stale user if token expired */
  useEffect(function () {
    if (!user) return;
    window.latinaApi.getMe()["catch"](function () {
      setUser(null);
      localStorage.removeItem(USER_KEY);
    });
  }, []);

  /* Sync server wishlist when user logs in */
  useEffect(function () {
    if (!user) return;
    window.latinaApi.syncWishlist(wishlist)["catch"](function () {});
  }, [user]);

  /* RTL direction */
  useEffect(function () {
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  /* Wishlist toggle — local + server */
  var toggleWishlist = function toggleWishlist(product) {
    setWishlist(function (prev) {
      var next = prev.includes(product.sku) ? prev.filter(function (s) {
        return s !== product.sku;
      }) : [].concat(_toConsumableArray(prev), [product.sku]);
      localStorage.setItem("latina-wishlist", JSON.stringify(next));
      if (user) window.latinaApi.toggleWishlist(product.id || product.sku)["catch"](function () {});
      return next;
    });
  };

  /* Quick-view */
  var openQuickView = function openQuickView(product, opts) {
    return setQuickView({
      product: product,
      mode: opts !== null && opts !== void 0 && opts.restockMode ? "restockMode" : "view"
    });
  };
  var closeQuickView = function closeQuickView() {
    return setQuickView(null);
  };

  /* Add product to cart (from QuickView / ProductCard) */
  var handleAddProduct = function handleAddProduct(product, variantId, variantLabel, price) {
    var _product$variants, _product$media;
    var actualPrice = price || product.price || product.sale_price || 0;
    var item = {
      product_id: product.id || product._apiId,
      variant_id: variantId || ((_product$variants = product.variants) === null || _product$variants === void 0 || (_product$variants = _product$variants[0]) === null || _product$variants === void 0 ? void 0 : _product$variants.id),
      name: product["name_".concat(lang)] || product.name_fr || product.name || product.sku,
      variant: variantLabel || null,
      price: Number(actualPrice),
      qty: 1,
      image: ((_product$media = product.media) === null || _product$media === void 0 || (_product$media = _product$media[0]) === null || _product$media === void 0 ? void 0 : _product$media.url) || product.img || null
    };
    setCart(function (prev) {
      var idx = prev.findIndex(function (i) {
        return i.variant_id === item.variant_id && i.product_id === item.product_id;
      });
      if (idx >= 0) {
        var next = _toConsumableArray(prev);
        next[idx] = _objectSpread(_objectSpread({}, next[idx]), {}, {
          qty: next[idx].qty + 1
        });
        return next;
      }
      return [].concat(_toConsumableArray(prev), [item]);
    });
    /* Fly animation */
    var cartBtn = document.querySelector(".cart-btn");
    var r = cartBtn === null || cartBtn === void 0 ? void 0 : cartBtn.getBoundingClientRect();
    var id = ++flyerIdRef.current;
    var tx = r ? r.left + 30 : window.innerWidth - 100;
    var ty = r ? r.top + 20 : 30;
    setFlyers(function (f) {
      return [].concat(_toConsumableArray(f), [{
        id: id,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        tx: tx,
        ty: ty,
        name: item.name
      }]);
    });
    setTimeout(function () {
      return setFlyers(function (f) {
        return f.filter(function (p) {
          return p.id !== id;
        });
      });
    }, 1000);
  };

  /* handleAdd — accepts (product, pos) from ProductCard or legacy {x,y,name} from HeroScene */
  var handleAdd = function handleAdd(productOrPos, pos) {
    // New signature: productOrPos is the product object, pos is {x, y}
    if (productOrPos && (productOrPos._apiId || productOrPos.id)) {
      var apiId = productOrPos._apiId || productOrPos.id;
      handleAddProduct(_objectSpread({
        id: apiId
      }, productOrPos), undefined, undefined, productOrPos.price);
      // Fire the flying animation
      if (pos) {
        var _cartBtn = document.querySelector(".cart-btn");
        var _target = _cartBtn ? _cartBtn.getBoundingClientRect() : {
          left: window.innerWidth - 100,
          top: 30
        };
        var _id = ++flyerIdRef.current;
        var _name = productOrPos.name_fr || productOrPos.name || '';
        setFlyers(function (f) {
          return [].concat(_toConsumableArray(f), [{
            id: _id,
            x: pos.x,
            y: pos.y,
            tx: _target.left + 30,
            ty: _target.top + 20,
            name: _name
          }]);
        });
        setTimeout(function () {
          return setFlyers(function (f) {
            return f.filter(function (p) {
              return p.id !== _id;
            });
          });
        }, 1000);
      }
      return;
    }
    // Legacy: productOrPos is {x, y, name}
    var _ref2 = productOrPos || {},
      x = _ref2.x,
      y = _ref2.y,
      name = _ref2.name;
    var cartBtn = document.querySelector(".cart-btn");
    var target = cartBtn ? cartBtn.getBoundingClientRect() : {
      left: window.innerWidth - 100,
      top: 30
    };
    var id = ++flyerIdRef.current;
    setFlyers(function (f) {
      return [].concat(_toConsumableArray(f), [{
        id: id,
        x: x,
        y: y,
        tx: target.left + 30,
        ty: target.top + 20,
        name: name
      }]);
    });
    setCart(function (prev) {
      var existing = prev.find(function (i) {
        return i.name === name;
      });
      if (existing) return prev.map(function (i) {
        return i.name === name ? _objectSpread(_objectSpread({}, i), {}, {
          qty: i.qty + 1
        }) : i;
      });
      return [].concat(_toConsumableArray(prev), [{
        product_id: null,
        variant_id: null,
        name: name,
        variant: null,
        price: 0,
        qty: 1,
        image: null
      }]);
    });
    setTimeout(function () {
      return setFlyers(function (f) {
        return f.filter(function (p) {
          return p.id !== id;
        });
      });
    }, 1000);
  };

  /* Tweak CSS vars */
  useEffect(function () {
    var root = document.documentElement;
    var intensities = [{
      p100: "#FBF6F1",
      p200: "#F5E1DA",
      r400: "#C68B6F",
      r500: "#B97559"
    }, {
      p100: "#FDF4F1",
      p200: "#F2C9C0",
      r400: "#C68B6F",
      r500: "#B97559"
    }, {
      p100: "#FFF0EE",
      p200: "#EFAFA3",
      r400: "#B97559",
      r500: "#A85C44"
    }, {
      p100: "#FBF6F1",
      p200: "#E8D4CA",
      r400: "#A05C42",
      r500: "#8C5A45"
    }];
    var cfg = intensities[Math.min(3, Math.max(0, t.pinkIntensity))];
    root.style.setProperty("--petal-100", cfg.p100);
    root.style.setProperty("--petal-200", cfg.p200);
    root.style.setProperty("--speed", t.speed);
  }, [t.pinkIntensity, t.speed]);

  /* Reveal-on-scroll */
  useEffect(function () {
    if (!boxDone) return;
    var observer = new IntersectionObserver(function (entries) {
      return entries.forEach(function (e) {
        if (e.isIntersecting) e.target.classList.add("in");
      });
    }, {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px"
    });
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(function (el) {
      return observer.observe(el);
    });
    return function () {
      return observer.disconnect();
    };
  }, [boxDone, lang]);
  var handleBoxDone = function handleBoxDone() {
    localStorage.setItem("latina-box-seen", "1");
    setBoxDone(true);
  };
  var replayOpening = function replayOpening() {
    localStorage.removeItem("latina-box-seen");
    setBoxDone(false);
    window.scrollTo(0, 0);
  };
  var handleCheckout = function handleCheckout(coupon) {
    if (!user) {
      setCartOpen(false);
      setAuthOpen(true);
      return;
    }
    setCheckoutCoupon(coupon);
    setCartOpen(false);
    setCheckoutOpen(true);
  };
  var handleOrderPlaced = function handleOrderPlaced() {
    setCart([]);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, !boxDone && /*#__PURE__*/React.createElement(BoxOpening, {
    lang: lang,
    onComplete: handleBoxDone,
    speed: t.speed
  }), /*#__PURE__*/React.createElement(ScrollProgress, null), /*#__PURE__*/React.createElement(Nav, {
    lang: lang,
    setLang: setLang,
    cartCount: cartCount,
    hidden: !boxDone,
    user: user,
    onAuthOpen: function onAuthOpen() {
      return setAuthOpen(true);
    },
    onCartOpen: function onCartOpen() {
      return setCartOpen(true);
    },
    onAccountOpen: function onAccountOpen() {
      return setAccountOpen(true);
    }
  }), /*#__PURE__*/React.createElement("main", {
    style: {
      opacity: boxDone ? 1 : 0,
      transition: "opacity 1s ease 0.4s"
    }
  }, /*#__PURE__*/React.createElement(HeroScene, {
    lang: lang,
    onAdd: handleAdd
  }), /*#__PURE__*/React.createElement(ManifestoScene, {
    lang: lang
  }), /*#__PURE__*/React.createElement(CodTrustStrip, {
    lang: lang
  }), /*#__PURE__*/React.createElement(CollectionScene, {
    lang: lang,
    onAdd: handleAdd,
    onAddProduct: handleAddProduct,
    onQuickView: openQuickView,
    segment: segment,
    onSegmentChange: setSegment,
    wishlist: wishlist,
    onWishlist: toggleWishlist,
    onProductView: pushRecent
  }), /*#__PURE__*/React.createElement(SegmentsScene, {
    lang: lang,
    onEnterSegment: function onEnterSegment(seg) {
      var _document$getElementB;
      setSegment(seg);
      (_document$getElementB = document.getElementById("collection")) === null || _document$getElementB === void 0 || _document$getElementB.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }), /*#__PURE__*/React.createElement(RewardsScene, {
    lang: lang
  }), /*#__PURE__*/React.createElement(TrustScene, {
    lang: lang
  }), /*#__PURE__*/React.createElement(RecentlyViewedStrip, {
    items: recent,
    onQuickView: openQuickView,
    lang: lang
  }), /*#__PURE__*/React.createElement(Footer, {
    lang: lang
  })), quickView && /*#__PURE__*/React.createElement(QuickView, {
    product: quickView.product,
    mode: quickView.mode,
    onClose: closeQuickView,
    onAdd: function onAdd(product, variantId, variantLabel, price) {
      return handleAddProduct(product, variantId, variantLabel, price);
    },
    lang: lang
  }), /*#__PURE__*/React.createElement(AuthModal, {
    lang: lang,
    open: authOpen,
    onClose: function onClose() {
      return setAuthOpen(false);
    },
    onLogin: handleLogin
  }), /*#__PURE__*/React.createElement(CartDrawer, {
    lang: lang,
    open: cartOpen,
    onClose: function onClose() {
      return setCartOpen(false);
    },
    cart: cart,
    onUpdateCart: setCart,
    onCheckout: handleCheckout,
    user: user
  }), /*#__PURE__*/React.createElement(CheckoutPage, {
    lang: lang,
    open: checkoutOpen,
    onClose: function onClose() {
      return setCheckoutOpen(false);
    },
    cart: cart,
    user: user,
    coupon: checkoutCoupon,
    onOrderPlaced: handleOrderPlaced
  }), /*#__PURE__*/React.createElement(AccountPage, {
    lang: lang,
    open: accountOpen,
    onClose: function onClose() {
      return setAccountOpen(false);
    },
    user: user,
    onLogout: handleLogout
  }), boxDone && /*#__PURE__*/React.createElement(WhatsAppFloat, {
    lang: lang
  }), flyers.map(function (f) {
    return /*#__PURE__*/React.createElement("div", {
      key: f.id,
      className: "fly-cart",
      style: {
        left: f.x - 40,
        top: f.y - 40,
        transform: "translate(".concat(f.tx - f.x, "px, ").concat(f.ty - f.y, "px) scale(0.2)"),
        opacity: 0
      }
    }, f.name.slice(0, 8));
  }), /*#__PURE__*/React.createElement(TweaksPanel, {
    title: "Tweaks \xB7 Latina"
  }, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Palette"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Intensit\xE9 rose",
    value: t.pinkIntensity,
    onChange: function onChange(v) {
      return setTweak("pinkIntensity", v);
    },
    options: [{
      value: 0,
      label: "Doux"
    }, {
      value: 1,
      label: "Pétale"
    }, {
      value: 2,
      label: "Chaud"
    }, {
      value: 3,
      label: "Terre"
    }]
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Mouvement"
  }), /*#__PURE__*/React.createElement(TweakSlider, {
    label: "Vitesse animations",
    value: t.speed,
    min: 0.5,
    max: 2,
    step: 0.1,
    unit: "\xD7",
    onChange: function onChange(v) {
      return setTweak("speed", v);
    }
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Ouverture"
  }), /*#__PURE__*/React.createElement(TweakButton, {
    label: "\u21BB Rejouer l'animation bo\xEEte",
    onClick: replayOpening
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Langue"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Langue active",
    value: lang,
    onChange: setLang,
    options: [{
      value: "fr",
      label: "FR"
    }, {
      value: "ar",
      label: "ع"
    }, {
      value: "en",
      label: "EN"
    }]
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Segment"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Public cibl\xE9",
    value: segment,
    onChange: setSegment,
    options: [{
      value: "ALL",
      label: "Tous"
    }, {
      value: "A",
      label: "12—30"
    }, {
      value: "B",
      label: "30—50"
    }]
  })));
};
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
