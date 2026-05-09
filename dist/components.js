"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* global React */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useMemo = _React.useMemo;

/* ============================================================
   SVG ICONS — minimal, monoline
   ============================================================ */

var LotusMark = function LotusMark(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 56 : _ref$size,
    _ref$color = _ref.color,
    color = _ref$color === void 0 ? "currentColor" : _ref$color;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 64 64",
    width: size,
    height: size,
    fill: "none",
    stroke: color,
    strokeWidth: "1.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M32 12 C 28 18, 28 26, 32 32 C 36 26, 36 18, 32 12 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 16 C 20 22, 22 28, 28 32 C 30 26, 28 20, 22 16 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M42 16 C 44 22, 42 28, 36 32 C 34 26, 36 20, 42 16 Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 36 C 20 40, 28 42, 32 42 C 36 42, 44 40, 48 36"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 42 C 18 48, 26 50, 32 50 C 38 50, 46 48, 50 42"
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "32",
    cy: "36",
    rx: "14",
    ry: "3"
  }));
};
var IconBag = function IconBag(p) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M5 8h14l-1 12H6L5 8z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 8V6a3 3 0 0 1 6 0v2"
  }));
};
var IconHeart = function IconHeart(p) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 21s-7-4.5-9.5-9C0.5 8 3 4 7 4c2 0 4 1 5 3 1-2 3-3 5-3 4 0 6.5 4 4.5 8C19 16.5 12 21 12 21z"
  }));
};
var IconSearch = function IconSearch(p) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m20 20-3.5-3.5"
  }));
};
var IconUser = function IconUser(p) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5"
  }, p), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "8",
    r: "4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M4 21c1-4 5-6 8-6s7 2 8 6"
  }));
};
var IconTruck = function IconTruck(p) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M2 7h11v10H2zM13 10h5l3 3v4h-8z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "18",
    r: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "17",
    cy: "18",
    r: "2"
  }));
};
var IconCash = function IconCash(p) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, p), /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "6",
    width: "20",
    height: "12",
    rx: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }));
};
var IconShield = function IconShield(p) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-0.5 8-4 8-9V6z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  }));
};
var IconReturn = function IconReturn(p) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4"
  }, p), /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 0 1 15-6.7L21 8"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 3v5h-5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M21 12a9 9 0 0 1-15 6.7L3 16"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M3 21v-5h5"
  }));
};

/* ============================================================
   PRODUCT PLACEHOLDER CARD
   ============================================================ */

var ProductCard = function ProductCard(_ref2) {
  var _product$stock;
  var product = _ref2.product,
    onAdd = _ref2.onAdd,
    onQuickView = _ref2.onQuickView,
    onWishlist = _ref2.onWishlist,
    wishlisted = _ref2.wishlisted,
    badge = _ref2.badge,
    _ref2$lang = _ref2.lang,
    lang = _ref2$lang === void 0 ? "fr" : _ref2$lang;
  var ref = useRef(null);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    hover = _useState2[0],
    setHover = _useState2[1];

  // Compute unique colors from real variant data
  var colorSwatches = useMemo(function () {
    var _product$variants;
    if (!((_product$variants = product.variants) !== null && _product$variants !== void 0 && _product$variants.length)) return [];
    var seen = {};
    product.variants.forEach(function (v) {
      if (!v.color) return;
      if (!seen[v.color]) seen[v.color] = false;
      if (v.stock > 0) seen[v.color] = true;
    });
    return Object.entries(seen).map(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 2),
        color = _ref4[0],
        hasStock = _ref4[1];
      return {
        color: color,
        hasStock: hasStock
      };
    });
  }, [product.variants]);

  // Tilt-on-hover — tracks pointer position and applies subtle 3D rotation.
  var onMouseMove = function onMouseMove(e) {
    var el = ref.current;
    if (!el) return;
    var r = el.getBoundingClientRect();
    var px = (e.clientX - r.left) / r.width;
    var py = (e.clientY - r.top) / r.height;
    var ry = (px - 0.5) * 6; // rotateY in deg
    var rx = (0.5 - py) * 4; // rotateX in deg
    el.style.setProperty("--rx", rx.toFixed(2) + "deg");
    el.style.setProperty("--ry", ry.toFixed(2) + "deg");
  };
  var onMouseLeave = function onMouseLeave() {
    setHover(false);
    var el = ref.current;
    if (el) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
  };
  var handleAdd = function handleAdd(e) {
    e.stopPropagation();
    var pos = ref.current ? function () {
      var r = ref.current.getBoundingClientRect();
      return {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2
      };
    }() : {
      x: 0,
      y: 0
    };
    onAdd === null || onAdd === void 0 || onAdd(product, pos);
  };
  var handleQuickView = function handleQuickView(e) {
    e.stopPropagation();
    onQuickView === null || onQuickView === void 0 || onQuickView(product);
  };
  var handleWishlist = function handleWishlist(e) {
    e.stopPropagation();
    onWishlist === null || onWishlist === void 0 || onWishlist(product);
  };
  var stock = (_product$stock = product.stock) !== null && _product$stock !== void 0 ? _product$stock : 99;
  var lowStock = stock > 0 && stock <= 4;
  var outOfStock = stock === 0;
  var labels = {
    fr: {
      add: "+ Panier",
      quick: "Aperçu rapide",
      wish: "Favori",
      low: "Plus que",
      remaining: "en stock",
      out: "Bientôt de retour",
      restock: "Me prévenir"
    },
    ar: {
      add: "+ السلة",
      quick: "عرض سريع",
      wish: "المفضلة",
      low: "تبقى",
      remaining: "في المخزون",
      out: "قريباً يعود",
      restock: "أعلميني"
    },
    en: {
      add: "+ Cart",
      quick: "Quick view",
      wish: "Wishlist",
      low: "Only",
      remaining: "left",
      out: "Back soon",
      restock: "Notify me"
    }
  }[lang] || {};
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: "product-card pc-tilt ".concat(hover ? "is-hover" : "", " ").concat(outOfStock ? "is-out" : ""),
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onClick: handleQuickView
  }, /*#__PURE__*/React.createElement("div", {
    className: "pc-tilt-inner"
  }, badge && /*#__PURE__*/React.createElement("span", {
    className: "product-badge ".concat(badge.kind || "")
  }, badge.text), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pc-wish ".concat(wishlisted ? "on" : ""),
    "aria-label": labels.wish,
    "aria-pressed": !!wishlisted,
    onClick: handleWishlist
  }, /*#__PURE__*/React.createElement(IconHeart, {
    width: 14,
    height: 14
  })), /*#__PURE__*/React.createElement("div", {
    className: "product-image"
  }, (product.img || product.image) && /*#__PURE__*/React.createElement("img", {
    src: product.img || product.image,
    alt: product.name,
    className: "pc-img",
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ph-label"
  }, product.cat), /*#__PURE__*/React.createElement("span", {
    className: "ph-sku"
  }, "SKU \xB7 ", product.sku), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pc-quick",
    onClick: handleQuickView
  }, /*#__PURE__*/React.createElement(IconSearch, {
    width: 12,
    height: 12
  }), /*#__PURE__*/React.createElement("span", null, labels.quick))), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, product.name), lowStock && /*#__PURE__*/React.createElement("span", {
    className: "pc-low t-mono"
  }, labels.low, " ", stock, " ", labels.remaining), outOfStock && /*#__PURE__*/React.createElement("span", {
    className: "pc-out t-mono"
  }, labels.out)), colorSwatches.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "pc-colors"
  }, colorSwatches.map(function (_ref5) {
    var color = _ref5.color,
      hasStock = _ref5.hasStock;
    return /*#__PURE__*/React.createElement("span", {
      key: color,
      className: "pc-color-dot".concat(hasStock ? "" : " sold-out"),
      style: {
        background: COLOR_SWATCHES[color] || "#ccc"
      },
      title: color
    });
  })), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "price t-num"
  }, product.price.toLocaleString("fr-DZ"), " DA"), outOfStock ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pc-restock",
    onClick: function onClick(e) {
      e.stopPropagation();
      onQuickView === null || onQuickView === void 0 || onQuickView(product, {
        restockMode: true
      });
    }
  }, labels.restock, " \u2192") : /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "pc-add",
    onClick: handleAdd
  }, labels.add)))));
};

/* ============================================================
   ACT 1 — CINEMATIC BOX OPENING
   ============================================================ */

var ShoeboxStage = function ShoeboxStage(_ref6) {
  var opened = _ref6.opened,
    flying = _ref6.flying,
    onOpen = _ref6.onOpen;
  var stageRef = useRef(null);
  var sceneRef = useRef(null);
  var openedRef = useRef(opened);
  var flyingRef = useRef(flying);
  openedRef.current = opened;
  flyingRef.current = flying;
  useEffect(function () {
    if (!stageRef.current) return;
    var cancelled = false;
    var _init = function init() {
      if (cancelled) return;
      if (!window.LatinaShoebox || !stageRef.current) {
        requestAnimationFrame(_init);
        return;
      }
      sceneRef.current = window.LatinaShoebox.createShoebox(stageRef.current, {});
      if (openedRef.current) sceneRef.current.open();
      if (flyingRef.current) sceneRef.current.fly();
    };
    if (window.LatinaShoebox) _init();else window.addEventListener("latina-shoebox-ready", _init, {
      once: true
    });
    return function () {
      cancelled = true;
      window.removeEventListener("latina-shoebox-ready", _init);
      if (sceneRef.current) {
        sceneRef.current.dispose();
        sceneRef.current = null;
      }
    };
  }, []);
  useEffect(function () {
    if (opened && sceneRef.current) sceneRef.current.open();
  }, [opened]);
  useEffect(function () {
    if (flying && sceneRef.current) sceneRef.current.fly();
  }, [flying]);
  return /*#__PURE__*/React.createElement("div", {
    ref: stageRef,
    className: "shoebox-stage ".concat(opened ? "opened" : "", " ").concat(flying ? "flying" : ""),
    onClick: onOpen
  });
};
var BoxOpening = function BoxOpening(_ref7) {
  var onComplete = _ref7.onComplete,
    _ref7$lang = _ref7.lang,
    lang = _ref7$lang === void 0 ? "fr" : _ref7$lang,
    _ref7$speed = _ref7.speed,
    speed = _ref7$speed === void 0 ? 1 : _ref7$speed;
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    opened = _useState4[0],
    setOpened = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    flying = _useState6[0],
    setFlying = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    dismissing = _useState8[0],
    setDismissing = _useState8[1];
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    skipReady = _useState0[0],
    setSkipReady = _useState0[1];
  useEffect(function () {
    var t = setTimeout(function () {
      return setSkipReady(true);
    }, 2000 / speed);
    return function () {
      return clearTimeout(t);
    };
  }, [speed]);
  var open = function open() {
    if (opened) return;
    setOpened(true);
    // smoother, slightly faster staging for opening → fly → dismiss
    setTimeout(function () {
      return setFlying(true);
    }, 2000 / speed);
    setTimeout(function () {
      return setDismissing(true);
    }, 3200 / speed);
    setTimeout(function () {
      return onComplete === null || onComplete === void 0 ? void 0 : onComplete();
    }, 4200 / speed);
  };
  var skip = function skip() {
    setDismissing(true);
    // respect speed setting when skipping
    setTimeout(function () {
      return onComplete === null || onComplete === void 0 ? void 0 : onComplete();
    }, Math.max(500, 1000 / speed));
  };

  // Generate petals once
  var petals = useMemo(function () {
    return Array.from({
      length: 18
    }, function (_, i) {
      return {
        key: i,
        tx: (Math.random() - 0.5) * 600,
        ty: -100 - Math.random() * 400,
        tr: (Math.random() - 0.5) * 720,
        delay: Math.random() * 0.8,
        size: 8 + Math.random() * 14,
        color: ["#F2C9C0", "#E8A89A", "#E2B8A2", "#F9E8E1"][Math.floor(Math.random() * 4)]
      };
    });
  }, []);
  var copy = {
    fr: {
      tap: "Cliquez pour ouvrir",
      skip: "Passer l'intro",
      tagline: "JUST FOR YOU"
    },
    ar: {
      tap: "اضغطي للفتح",
      skip: "تجاوز",
      tagline: "JUST FOR YOU"
    },
    en: {
      tap: "Tap to open",
      skip: "Skip intro",
      tagline: "JUST FOR YOU"
    }
  }[lang] || {
    tap: "Tap to open",
    skip: "Skip",
    tagline: "JUST FOR YOU"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "act-one ".concat(dismissing ? "dismissing" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "box-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "box-floor-shadow"
  }), /*#__PURE__*/React.createElement(ShoeboxStage, {
    opened: opened,
    flying: flying,
    onOpen: open
  })), !opened && /*#__PURE__*/React.createElement("div", {
    className: "click-prompt"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, copy.tap), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  })), /*#__PURE__*/React.createElement("div", {
    className: "emerging-product p1"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "linear-gradient(155deg, #FEFAF6, #F9E8E1)",
      border: "1px solid #E2B8A2",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      boxShadow: "0 30px 60px -10px rgba(122,69,48,0.3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--display)",
      fontSize: 14,
      color: "var(--rose-500)"
    }
  }, "Escarpins"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 9,
      letterSpacing: "0.15em",
      color: "var(--ink-mute)"
    }
  }, "NUDE 38"))), /*#__PURE__*/React.createElement("div", {
    className: "emerging-product p2"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "linear-gradient(155deg, #F9E8E1, #FEFAF6)",
      border: "1px solid #E2B8A2",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      boxShadow: "0 30px 60px -10px rgba(122,69,48,0.3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--display)",
      fontSize: 14,
      color: "var(--rose-500)"
    }
  }, "Sac \xE0 main"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 9,
      letterSpacing: "0.15em",
      color: "var(--ink-mute)"
    }
  }, "ROSE"))), /*#__PURE__*/React.createElement("div", {
    className: "emerging-product p3"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "linear-gradient(155deg, #FEFAF6, #F2C9C0)",
      border: "1px solid #E2B8A2",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      boxShadow: "0 30px 60px -10px rgba(122,69,48,0.3)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--display)",
      fontSize: 14,
      color: "var(--rose-500)"
    }
  }, "Sandales"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 9,
      letterSpacing: "0.15em",
      color: "var(--ink-mute)"
    }
  }, "OR \xB7 37"))), petals.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.key,
      className: "petal",
      style: {
        left: "50%",
        top: "50%",
        width: p.size,
        height: p.size,
        background: p.color,
        animationDelay: "".concat(p.delay + 0.4, "s"),
        "--tx": "".concat(p.tx, "px"),
        "--ty": "".concat(p.ty, "px"),
        "--tr": "".concat(p.tr, "deg")
      }
    });
  }), skipReady && !opened && /*#__PURE__*/React.createElement("div", {
    className: "skip-hint"
  }, /*#__PURE__*/React.createElement("div", {
    className: "countdown"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: skip,
    style: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontFamily: "var(--mono)",
      fontSize: 10,
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "var(--ink-mute)"
    }
  }, copy.skip, " \u2192")));
};

/* ============================================================
   NAV
   ============================================================ */

var Nav = function Nav(_ref8) {
  var _user$name;
  var lang = _ref8.lang,
    setLang = _ref8.setLang,
    cartCount = _ref8.cartCount,
    hidden = _ref8.hidden,
    user = _ref8.user,
    onAuthOpen = _ref8.onAuthOpen,
    onCartOpen = _ref8.onCartOpen,
    onAccountOpen = _ref8.onAccountOpen;
  var t = {
    fr: {
      chaussures: "Chaussures",
      sacs: "Sacs",
      access: "Accessoires",
      concours: "Concours",
      fid: "Fidélité",
      panier: "Panier",
      login: "Connexion",
      account: "Mon compte"
    },
    ar: {
      chaussures: "الأحذية",
      sacs: "الحقائب",
      access: "الإكسسوارات",
      concours: "المسابقة",
      fid: "الولاء",
      panier: "السلة",
      login: "دخول",
      account: "حسابي"
    },
    en: {
      chaussures: "Shoes",
      sacs: "Bags",
      access: "Accessories",
      concours: "Contest",
      fid: "Loyalty",
      panier: "Cart",
      login: "Sign in",
      account: "Account"
    }
  }[lang] || {};
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav ".concat(hidden ? "hidden" : ""),
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-mark"
  }, /*#__PURE__*/React.createElement(LotusMark, {
    size: 28,
    color: "var(--rose-500)"
  })), /*#__PURE__*/React.createElement("span", {
    className: "brand-name"
  }, "Latina")), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#collection"
  }, t.chaussures), /*#__PURE__*/React.createElement("a", {
    href: "#collection"
  }, t.sacs), /*#__PURE__*/React.createElement("a", {
    href: "#collection"
  }, t.access), /*#__PURE__*/React.createElement("a", {
    href: "#concours"
  }, t.concours), /*#__PURE__*/React.createElement("a", {
    href: "#fidelite"
  }, t.fid)), /*#__PURE__*/React.createElement("div", {
    className: "nav-actions"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lang-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: lang === "fr" ? "active" : "",
    onClick: function onClick() {
      return setLang("fr");
    }
  }, "FR"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("button", {
    className: lang === "ar" ? "active" : "",
    onClick: function onClick() {
      return setLang("ar");
    }
  }, "\u0639"), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("button", {
    className: lang === "en" ? "active" : "",
    onClick: function onClick() {
      return setLang("en");
    }
  }, "EN")), user ? /*#__PURE__*/React.createElement("button", {
    className: "nav-user-btn",
    onClick: onAccountOpen
  }, /*#__PURE__*/React.createElement(IconUser, {
    width: 13,
    height: 13
  }), /*#__PURE__*/React.createElement("span", {
    className: "nav-user-name"
  }, (_user$name = user.name) === null || _user$name === void 0 ? void 0 : _user$name.split(" ")[0])) : /*#__PURE__*/React.createElement("button", {
    className: "nav-login-btn",
    onClick: onAuthOpen
  }, /*#__PURE__*/React.createElement(IconUser, {
    width: 13,
    height: 13
  }), " ", t.login), /*#__PURE__*/React.createElement("button", {
    className: "cart-btn",
    onClick: onCartOpen
  }, /*#__PURE__*/React.createElement(IconBag, {
    width: 14,
    height: 14
  }), /*#__PURE__*/React.createElement("span", null, t.panier, cartCount > 0 && " (".concat(cartCount, ")")))));
};

/* ============================================================
   v2 — STRUCTURAL PRIMITIVES
   ScrollProgress, SceneMarker, useSceneProgress
   ============================================================ */

var ScrollProgress = function ScrollProgress() {
  useEffect(function () {
    var raf = 0;
    var tick = function tick() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight || 1;
      var p = Math.min(1, Math.max(0, window.scrollY / max));
      doc.style.setProperty("--scroll-progress", p.toFixed(4));
      raf = 0;
    };
    var onScroll = function onScroll() {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return function () {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    className: "scroll-rail",
    "aria-hidden": "true"
  });
};
var SceneMarker = function SceneMarker(_ref9) {
  var num = _ref9.num,
    label = _ref9.label,
    meta = _ref9.meta;
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-marker",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num t-num"
  }, num), /*#__PURE__*/React.createElement("span", {
    className: "bar"
  }), /*#__PURE__*/React.createElement("span", null, label), meta && /*#__PURE__*/React.createElement("span", {
    className: "meta t-num"
  }, meta));
};

// Updates --scene-progress on the section element as it scrolls through viewport.
// 0 = section just entering, 1 = section just leaving.
var useSceneProgress = function useSceneProgress(ref) {
  useEffect(function () {
    var el = ref.current;
    if (!el) return;
    var raf = 0;
    var tick = function tick() {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight || 1;
      var total = r.height + vh;
      var traveled = Math.min(total, Math.max(0, vh - r.top));
      var p = traveled / total;
      el.style.setProperty("--scene-progress", p.toFixed(4));
      raf = 0;
    };
    var onScroll = function onScroll() {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    window.addEventListener("resize", onScroll);
    return function () {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
};

/* ============================================================
   v2 — FILTER RAIL  (Color, Size, Heel-height, Material, Audience)
   ============================================================ */

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
var HEEL_BUCKETS = [{
  key: "flat",
  min: 0,
  max: 1,
  label_fr: "Plat",
  label_ar: "مسطح",
  label_en: "Flat"
}, {
  key: "low",
  min: 1,
  max: 3,
  label_fr: "Bas",
  label_ar: "منخفض",
  label_en: "Low"
}, {
  key: "demi",
  min: 3,
  max: 6,
  label_fr: "Demi-talon",
  label_ar: "نصفي",
  label_en: "Mid"
}, {
  key: "high",
  min: 6,
  max: 9,
  label_fr: "Haut",
  label_ar: "عالي",
  label_en: "High"
}, {
  key: "very_high",
  min: 9,
  max: 99,
  label_fr: "Très haut",
  label_ar: "عالٍ جداً",
  "label_en": "Very high"
}];
var MATERIALS = [{
  key: "cuir",
  fr: "Cuir",
  ar: "جلد",
  en: "Leather"
}, {
  key: "cuir_verni",
  fr: "Cuir verni",
  ar: "جلد لامع",
  en: "Patent"
}, {
  key: "daim",
  fr: "Daim",
  ar: "شامواه",
  en: "Suede"
}, {
  key: "synthetique",
  fr: "Synthétique",
  ar: "صناعي",
  en: "Synthetic"
}, {
  key: "textile",
  fr: "Textile",
  ar: "نسيج",
  en: "Textile"
}, {
  key: "velours",
  fr: "Velours",
  ar: "مخمل",
  en: "Velvet"
}, {
  key: "satin",
  fr: "Satin",
  ar: "ساتان",
  en: "Satin"
}, {
  key: "perles",
  fr: "Perles",
  ar: "لؤلؤ",
  en: "Pearl"
}];
var FilterRail = function FilterRail(_ref0) {
  var filters = _ref0.filters,
    setFilters = _ref0.setFilters,
    _ref0$lang = _ref0.lang,
    lang = _ref0$lang === void 0 ? "fr" : _ref0$lang,
    _ref0$availableSizes = _ref0.availableSizes,
    availableSizes = _ref0$availableSizes === void 0 ? [] : _ref0$availableSizes,
    onClear = _ref0.onClear,
    count = _ref0.count;
  var t = {
    fr: {
      title: "Filtres",
      color: "Couleur",
      size: "Taille",
      heel: "Hauteur talon",
      material: "Matière",
      clear: "Effacer",
      results: "résultats"
    },
    ar: {
      title: "تصفية",
      color: "اللون",
      size: "المقاس",
      heel: "ارتفاع الكعب",
      material: "المادة",
      clear: "مسح",
      results: "نتيجة"
    },
    en: {
      title: "Filters",
      color: "Color",
      size: "Size",
      heel: "Heel height",
      material: "Material",
      clear: "Clear",
      results: "results"
    }
  }[lang] || {};
  var toggleArr = function toggleArr(key, value) {
    var cur = filters[key] || [];
    setFilters(_objectSpread(_objectSpread({}, filters), {}, _defineProperty({}, key, cur.includes(value) ? cur.filter(function (v) {
      return v !== value;
    }) : [].concat(_toConsumableArray(cur), [value]))));
  };
  return /*#__PURE__*/React.createElement("aside", {
    className: "filter-rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-mono fr-title"
  }, t.title), /*#__PURE__*/React.createElement("span", {
    className: "t-mono fr-count t-num"
  }, count, " ", t.results)), /*#__PURE__*/React.createElement("div", {
    className: "fr-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-label t-mono"
  }, t.color), /*#__PURE__*/React.createElement("div", {
    className: "fr-swatches"
  }, Object.entries(COLOR_SWATCHES).map(function (_ref1) {
    var _ref10 = _slicedToArray(_ref1, 2),
      key = _ref10[0],
      hex = _ref10[1];
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      type: "button",
      className: "fr-swatch ".concat((filters.colors || []).includes(key) ? "on" : ""),
      style: {
        background: hex
      },
      "aria-label": key,
      "aria-pressed": (filters.colors || []).includes(key),
      onClick: function onClick() {
        return toggleArr("colors", key);
      }
    });
  }))), availableSizes.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "fr-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-label t-mono"
  }, t.size), /*#__PURE__*/React.createElement("div", {
    className: "fr-chips"
  }, availableSizes.map(function (sz) {
    return /*#__PURE__*/React.createElement("button", {
      key: sz,
      type: "button",
      className: "fr-chip t-num ".concat((filters.sizes || []).includes(sz) ? "on" : ""),
      onClick: function onClick() {
        return toggleArr("sizes", sz);
      }
    }, sz);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fr-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-label t-mono"
  }, t.heel), /*#__PURE__*/React.createElement("div", {
    className: "fr-chips"
  }, HEEL_BUCKETS.map(function (b) {
    return /*#__PURE__*/React.createElement("button", {
      key: b.key,
      type: "button",
      className: "fr-chip ".concat((filters.heel || []).includes(b.key) ? "on" : ""),
      onClick: function onClick() {
        return toggleArr("heel", b.key);
      }
    }, b["label_".concat(lang)] || b.label_fr);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "fr-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fr-label t-mono"
  }, t.material), /*#__PURE__*/React.createElement("div", {
    className: "fr-chips"
  }, MATERIALS.map(function (m) {
    return /*#__PURE__*/React.createElement("button", {
      key: m.key,
      type: "button",
      className: "fr-chip ".concat((filters.materials || []).includes(m.key) ? "on" : ""),
      onClick: function onClick() {
        return toggleArr("materials", m.key);
      }
    }, m[lang] || m.fr);
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "fr-clear t-mono",
    onClick: onClear
  }, t.clear, " \u2715"));
};

// Apply filters to a product list (matches if any selected value matches).
var applyFilters = function applyFilters(products, filters, segment) {
  return products.filter(function (p) {
    var _filters$colors, _filters$sizes, _filters$materials, _filters$heel;
    if (segment && segment !== "ALL" && !(p.audience || []).includes(segment)) return false;
    if ((_filters$colors = filters.colors) !== null && _filters$colors !== void 0 && _filters$colors.length && !filters.colors.some(function (c) {
      return (p.colors || []).includes(c);
    })) return false;
    if ((_filters$sizes = filters.sizes) !== null && _filters$sizes !== void 0 && _filters$sizes.length && !filters.sizes.some(function (s) {
      return (p.sizes || []).includes(s);
    })) return false;
    if ((_filters$materials = filters.materials) !== null && _filters$materials !== void 0 && _filters$materials.length && !filters.materials.includes(p.material)) return false;
    if ((_filters$heel = filters.heel) !== null && _filters$heel !== void 0 && _filters$heel.length) {
      var inBucket = filters.heel.some(function (k) {
        var b = HEEL_BUCKETS.find(function (x) {
          return x.key === k;
        });
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

var QuickView = function QuickView(_ref11) {
  var _product$stock2;
  var product = _ref11.product,
    mode = _ref11.mode,
    onClose = _ref11.onClose,
    onAdd = _ref11.onAdd,
    _ref11$lang = _ref11.lang,
    lang = _ref11$lang === void 0 ? "fr" : _ref11$lang;
  var _useState1 = useState(null),
    _useState10 = _slicedToArray(_useState1, 2),
    color = _useState10[0],
    setColor = _useState10[1];
  var _useState11 = useState(null),
    _useState12 = _slicedToArray(_useState11, 2),
    size = _useState12[0],
    setSize = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    restockOk = _useState14[0],
    setRestockOk = _useState14[1];
  var phoneRef = useRef(null);

  // Unique colors from real variants (each entry has hasStock flag)
  var colorGroups = useMemo(function () {
    var _product$variants2;
    if (!(product !== null && product !== void 0 && (_product$variants2 = product.variants) !== null && _product$variants2 !== void 0 && _product$variants2.length)) return [];
    var map = {};
    product.variants.forEach(function (v) {
      if (!v.color) return;
      if (!map[v.color]) map[v.color] = {
        color: v.color,
        hasStock: false
      };
      if (v.stock > 0) map[v.color].hasStock = true;
    });
    return Object.values(map);
  }, [product === null || product === void 0 ? void 0 : product.variants]);

  // Sizes for selected color (with per-size stock)
  var sizesForColor = useMemo(function () {
    var _product$variants3;
    if (!(product !== null && product !== void 0 && (_product$variants3 = product.variants) !== null && _product$variants3 !== void 0 && _product$variants3.length)) return [];
    var source = color ? product.variants.filter(function (v) {
      return v.color === color && v.size;
    }) : product.variants.filter(function (v) {
      return v.size;
    });
    return source.map(function (v) {
      return {
        size: v.size,
        stock: v.stock,
        id: v.id
      };
    });
  }, [color, product === null || product === void 0 ? void 0 : product.variants]);

  // The actual selected variant
  var selectedVariant = useMemo(function () {
    var _product$variants4;
    if (!(product !== null && product !== void 0 && (_product$variants4 = product.variants) !== null && _product$variants4 !== void 0 && _product$variants4.length)) return null;
    if (color && size) return product.variants.find(function (v) {
      return v.color === color && v.size === size;
    }) || null;
    if (color && !sizesForColor.length) return product.variants.find(function (v) {
      return v.color === color;
    }) || null;
    if (size && !colorGroups.length) return product.variants.find(function (v) {
      return v.size === size;
    }) || null;
    return null;
  }, [color, size, product === null || product === void 0 ? void 0 : product.variants, colorGroups.length, sizesForColor.length]);

  // Effective price (base + variant price_adjustment)
  var effectivePrice = selectedVariant ? product.price + (selectedVariant.price_adjustment || 0) : product.price;
  useEffect(function () {
    if (!product) return;
    // Auto-select first available color
    var firstAvailable = colorGroups.find(function (g) {
      return g.hasStock;
    }) || colorGroups[0];
    setColor((firstAvailable === null || firstAvailable === void 0 ? void 0 : firstAvailable.color) || null);
    setSize(null);
    setRestockOk(false);
    var onKey = function onKey(e) {
      if (e.key === "Escape") onClose === null || onClose === void 0 || onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return function () {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [product, onClose]);

  // When color changes, reset size
  useEffect(function () {
    setSize(null);
  }, [color]);
  if (!product) return null;
  var t = {
    fr: {
      size: "Taille",
      color: "Couleur",
      add: "Ajouter au panier",
      selectSize: "Choisir une taille",
      details: "Détails",
      sku: "Référence",
      material: "Matière",
      heel: "Talon",
      stock: "Stock",
      low: "Plus que",
      left: "en stock",
      outSize: "Épuisé",
      restockTitle: "M'avertir au retour",
      restockSub: "Entrez votre numéro et nous vous envoyons un SMS dès le restock — sans spam.",
      restockCta: "M'alerter",
      restockOk: "Merci ! On vous prévient.",
      whatsapp: "Demander sur WhatsApp",
      trust: "Paiement à la livraison · Retour 7 jours"
    },
    ar: {
      size: "المقاس",
      color: "اللون",
      add: "أضيفي إلى السلة",
      selectSize: "اختاري المقاس",
      details: "التفاصيل",
      sku: "المرجع",
      material: "المادة",
      heel: "الكعب",
      stock: "المخزون",
      low: "تبقى",
      left: "في المخزون",
      outSize: "نفذ",
      restockTitle: "أعلميني عند العودة",
      restockSub: "أدخلي رقمك ونرسل لكِ رسالة فور توفر المنتج — بدون إزعاج.",
      restockCta: "أعلميني",
      restockOk: "شكراً! سنعلمكِ.",
      whatsapp: "اسألي عبر واتساب",
      trust: "الدفع عند الاستلام · إرجاع خلال 7 أيام"
    },
    en: {
      size: "Size",
      color: "Color",
      add: "Add to cart",
      selectSize: "Select a size",
      details: "Details",
      sku: "SKU",
      material: "Material",
      heel: "Heel",
      stock: "Stock",
      low: "Only",
      left: "left",
      outSize: "Sold out",
      restockTitle: "Notify when back",
      restockSub: "Drop your number — we SMS you when stock returns. No spam.",
      restockCta: "Notify me",
      restockOk: "Thanks! We'll let you know.",
      whatsapp: "Ask on WhatsApp",
      trust: "Pay on delivery · 7-day returns"
    }
  }[lang] || {};

  // Out-of-stock detection: prefer variant-based, fall back to product.stock
  var allVariantsOut = colorGroups.length > 0 && colorGroups.every(function (g) {
    return !g.hasStock;
  });
  var out = colorGroups.length > 0 ? allVariantsOut : ((_product$stock2 = product.stock) !== null && _product$stock2 !== void 0 ? _product$stock2 : 1) === 0;
  var showRestock = out || mode === "restockMode";

  // Whether we need a size selection before adding
  var needsSize = sizesForColor.length > 0 && !size;
  var canAdd = !needsSize && (selectedVariant ? selectedVariant.stock > 0 : !out);
  var handleAdd = function handleAdd() {
    var label = [color, size].filter(Boolean).join(" · ");
    onAdd === null || onAdd === void 0 || onAdd(product, selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.id, label || null, effectivePrice);
    onClose === null || onClose === void 0 || onClose();
  };
  var handleRestock = function handleRestock(e) {
    var _phoneRef$current;
    e.preventDefault();
    var phone = (_phoneRef$current = phoneRef.current) === null || _phoneRef$current === void 0 || (_phoneRef$current = _phoneRef$current.value) === null || _phoneRef$current === void 0 ? void 0 : _phoneRef$current.trim();
    if (!phone) return;
    var alerts = JSON.parse(localStorage.getItem("latina-restock") || "[]");
    alerts.push({
      sku: product.sku,
      phone: phone,
      ts: Date.now()
    });
    localStorage.setItem("latina-restock", JSON.stringify(alerts));
    setRestockOk(true);
  };
  var waMsg = encodeURIComponent(lang === "ar" ? "\u0645\u0631\u062D\u0628\u0627\u060C \u0623\u0631\u064A\u062F \u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0639\u0646 ".concat(product.name, " (").concat(product.sku, ")") : "Bonjour, je voudrais des infos sur ".concat(product.name, " (").concat(product.sku, ")"));
  var waHref = "https://wa.me/213500000000?text=".concat(waMsg);
  return /*#__PURE__*/React.createElement("div", {
    className: "qv-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "qv-shell",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "qv-x",
    "aria-label": "Close",
    onClick: onClose
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    className: "qv-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qv-image"
  }, product.img ? /*#__PURE__*/React.createElement("img", {
    src: product.img,
    alt: product.name,
    className: "qv-img",
    loading: "lazy"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "ph-label"
  }, product.cat), /*#__PURE__*/React.createElement("span", {
    className: "ph-sku"
  }, "SKU \xB7 ", product.sku))), /*#__PURE__*/React.createElement("div", {
    className: "qv-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-mono qv-eyebrow"
  }, product.cat), /*#__PURE__*/React.createElement("h3", {
    className: "qv-title"
  }, product.name), /*#__PURE__*/React.createElement("div", {
    className: "qv-price t-num"
  }, effectivePrice.toLocaleString("fr-DZ"), " DA", (selectedVariant === null || selectedVariant === void 0 ? void 0 : selectedVariant.price_adjustment) > 0 && /*#__PURE__*/React.createElement("span", {
    className: "qv-price-adj t-mono"
  }, "+", selectedVariant.price_adjustment.toLocaleString(), " DA")), /*#__PURE__*/React.createElement("div", {
    className: "qv-trust t-mono"
  }, /*#__PURE__*/React.createElement(IconShield, {
    width: 12,
    height: 12
  }), " ", t.trust), colorGroups.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "qv-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qv-label t-mono"
  }, t.color, color ? /*#__PURE__*/React.createElement("span", {
    className: "qv-sel-name"
  }, " \u2014 ", color) : ""), /*#__PURE__*/React.createElement("div", {
    className: "qv-swatches"
  }, colorGroups.map(function (_ref12) {
    var c = _ref12.color,
      hasStock = _ref12.hasStock;
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      type: "button",
      className: "qv-swatch ".concat(color === c ? "on" : "", " ").concat(!hasStock ? "qv-swatch-out" : ""),
      style: {
        background: COLOR_SWATCHES[c] || "#ddd"
      },
      "aria-label": c,
      "aria-pressed": color === c,
      title: !hasStock ? t.outSize : c,
      onClick: function onClick() {
        return setColor(c);
      }
    });
  }))), sizesForColor.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "qv-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qv-label t-mono"
  }, t.size, size ? /*#__PURE__*/React.createElement("span", {
    className: "qv-sel-name"
  }, " \u2014 ", size) : /*#__PURE__*/React.createElement("span", {
    className: "qv-sel-hint"
  }, " (", t.selectSize, ")")), /*#__PURE__*/React.createElement("div", {
    className: "qv-sizes"
  }, sizesForColor.map(function (_ref13) {
    var s = _ref13.size,
      st = _ref13.stock,
      id = _ref13.id;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      type: "button",
      disabled: st === 0,
      className: "qv-size t-num ".concat(size === s ? "on" : "", " ").concat(st === 0 ? "out" : st <= 4 ? "low" : ""),
      onClick: function onClick() {
        return st > 0 && setSize(s);
      },
      title: st === 0 ? t.outSize : st <= 4 ? "".concat(t.low, " ").concat(st, " ").concat(t.left) : ""
    }, s, st > 0 && st <= 4 && /*#__PURE__*/React.createElement("span", {
      className: "qv-size-dot"
    }));
  }))), selectedVariant && selectedVariant.stock > 0 && selectedVariant.stock <= 4 && /*#__PURE__*/React.createElement("div", {
    className: "qv-stock-hint t-mono"
  }, t.low, " ", selectedVariant.stock, " ", t.left), showRestock ? /*#__PURE__*/React.createElement("div", {
    className: "qv-restock"
  }, /*#__PURE__*/React.createElement("div", {
    className: "qv-label t-mono"
  }, t.restockTitle), /*#__PURE__*/React.createElement("p", {
    className: "t-body",
    style: {
      color: "var(--ink-soft)",
      marginBottom: 12
    }
  }, t.restockSub), restockOk ? /*#__PURE__*/React.createElement("div", {
    className: "qv-restock-ok t-mono"
  }, "\u2713 ", t.restockOk) : /*#__PURE__*/React.createElement("form", {
    className: "qv-restock-form",
    onSubmit: handleRestock
  }, /*#__PURE__*/React.createElement("input", {
    ref: phoneRef,
    type: "tel",
    placeholder: "+213 \u2026",
    required: true,
    pattern: "[0-9 +]{8,}"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "qv-cta"
  }, t.restockCta))) : /*#__PURE__*/React.createElement("div", {
    className: "qv-actions"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "qv-cta qv-cta--primary",
    disabled: !canAdd,
    onClick: handleAdd
  }, needsSize ? t.selectSize : t.add), /*#__PURE__*/React.createElement("a", {
    className: "qv-cta qv-cta--whatsapp",
    href: waHref,
    target: "_blank",
    rel: "noopener noreferrer"
  }, t.whatsapp)), /*#__PURE__*/React.createElement("div", {
    className: "qv-details t-mono"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, t.sku), /*#__PURE__*/React.createElement("span", null, product.sku)), product.material && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, t.material), /*#__PURE__*/React.createElement("span", null, (MATERIALS.find(function (m) {
    return m.key === product.material;
  }) || {})[lang] || product.material)), product.heel > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, t.heel), /*#__PURE__*/React.createElement("span", null, product.heel, " cm")), !out && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, t.stock), /*#__PURE__*/React.createElement("span", {
    className: "t-num"
  }, product.stock)))))));
};

/* ============================================================
   v2 — SEGMENT TOGGLE  (A: 12-30 / B: 30-50 / ALL)
   ============================================================ */

var SegmentToggle = function SegmentToggle(_ref14) {
  var value = _ref14.value,
    onChange = _ref14.onChange,
    _ref14$lang = _ref14.lang,
    lang = _ref14$lang === void 0 ? "fr" : _ref14$lang;
  var t = {
    fr: {
      all: "Toutes",
      a: "12 — 30",
      b: "30 — 50",
      small: "ans"
    },
    ar: {
      all: "الكل",
      a: "12 — 30",
      b: "30 — 50",
      small: "سنة"
    },
    en: {
      all: "All",
      a: "12 — 30",
      b: "30 — 50",
      small: "y/o"
    }
  }[lang] || {};
  var opts = [{
    k: "ALL",
    l: t.all
  }, {
    k: "A",
    l: t.a
  }, {
    k: "B",
    l: t.b
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "seg-toggle",
    role: "tablist"
  }, opts.map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: o.k,
      role: "tab",
      "aria-selected": value === o.k,
      className: value === o.k ? "on" : "",
      onClick: function onClick() {
        return onChange(o.k);
      }
    }, /*#__PURE__*/React.createElement("span", null, o.l), (o.k === "A" || o.k === "B") && /*#__PURE__*/React.createElement("small", null, t.small));
  }));
};

/* ============================================================
   v2 — WHATSAPP FLOATING HANDOFF  (always-on, bottom-left)
   ============================================================ */

var WhatsAppFloat = function WhatsAppFloat(_ref15) {
  var _ref15$lang = _ref15.lang,
    lang = _ref15$lang === void 0 ? "fr" : _ref15$lang,
    _ref15$phone = _ref15.phone,
    phone = _ref15$phone === void 0 ? "+213500000000" : _ref15$phone;
  var t = {
    fr: {
      greet: "Bonjour ! Une question sur Latina ?",
      aria: "Discuter sur WhatsApp"
    },
    ar: {
      greet: "مرحبا! هل لديكِ سؤال؟",
      aria: "تحدثي عبر واتساب"
    },
    en: {
      greet: "Hi! A question about Latina?",
      aria: "Chat on WhatsApp"
    }
  }[lang] || {};
  var href = "https://wa.me/".concat(phone.replace(/[^\d]/g, ""), "?text=").concat(encodeURIComponent(t.greet));
  return /*#__PURE__*/React.createElement("a", {
    className: "wa-float",
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": t.aria,
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "22",
    height: "22",
    fill: "currentColor",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20.5 3.5A11 11 0 0 0 4 17.6L3 21l3.5-1A11 11 0 1 0 20.5 3.5zM12 19.4a7.4 7.4 0 0 1-3.8-1l-.3-.2-2 .6.6-2-.2-.3A7.4 7.4 0 1 1 12 19.4zm4.2-5.5c-.2-.1-1.4-.7-1.6-.7s-.4-.1-.5.1l-.7.9c-.2.2-.3.2-.5 0a6 6 0 0 1-1.8-1.1 6.7 6.7 0 0 1-1.2-1.5c-.1-.2 0-.3.1-.4l.4-.4.2-.4c.1-.2 0-.3 0-.4l-.6-1.5c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.4 3.8 14.7 14.7 0 0 0 1.5.5 3.6 3.6 0 0 0 1.6.1 2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1 0-.2-.1-.4-.2z"
  })), /*#__PURE__*/React.createElement("span", {
    className: "wa-bubble"
  }, t.greet));
};

/* ============================================================
   v2 — COD TRUST STRIP  (banner reinforcing pay-on-delivery)
   ============================================================ */

var CodTrustStrip = function CodTrustStrip(_ref16) {
  var _ref16$lang = _ref16.lang,
    lang = _ref16$lang === void 0 ? "fr" : _ref16$lang;
  var t = {
    fr: ["Paiement à la livraison", "Retour gratuit 7 jours", "Livraison 58 wilayas", "SMS de confirmation"],
    ar: ["الدفع عند الاستلام", "إرجاع مجاني خلال 7 أيام", "توصيل 58 ولاية", "رسالة تأكيد"],
    en: ["Pay on delivery", "Free returns 7 days", "All 58 wilayas", "SMS confirmation"]
  }[lang] || [];
  var icons = [/*#__PURE__*/React.createElement(IconCash, {
    key: "c",
    width: 14,
    height: 14
  }), /*#__PURE__*/React.createElement(IconReturn, {
    key: "r",
    width: 14,
    height: 14
  }), /*#__PURE__*/React.createElement(IconTruck, {
    key: "t",
    width: 14,
    height: 14
  }), /*#__PURE__*/React.createElement(IconShield, {
    key: "s",
    width: 14,
    height: 14
  })];
  return /*#__PURE__*/React.createElement("div", {
    className: "cod-strip",
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cod-strip-track"
  }, [].concat(_toConsumableArray(t), _toConsumableArray(t)).map(function (label, i) {
    return /*#__PURE__*/React.createElement("span", {
      className: "cod-pill t-mono",
      key: i
    }, icons[i % icons.length], " ", label);
  })));
};

/* ============================================================
   v2 — RECENTLY VIEWED STRIP
   ============================================================ */

var useRecentlyViewed = function useRecentlyViewed() {
  var _useState15 = useState(function () {
      try {
        return JSON.parse(localStorage.getItem("latina-recent") || "[]");
      } catch (_unused) {
        return [];
      }
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    items = _useState16[0],
    setItems = _useState16[1];
  var push = function push(product) {
    setItems(function (prev) {
      var next = [product].concat(_toConsumableArray(prev.filter(function (p) {
        return p.sku !== product.sku;
      }))).slice(0, 8);
      localStorage.setItem("latina-recent", JSON.stringify(next));
      return next;
    });
  };
  return [items, push];
};
var RecentlyViewedStrip = function RecentlyViewedStrip(_ref17) {
  var items = _ref17.items,
    onAdd = _ref17.onAdd,
    onQuickView = _ref17.onQuickView,
    _ref17$lang = _ref17.lang,
    lang = _ref17$lang === void 0 ? "fr" : _ref17$lang;
  if (!(items !== null && items !== void 0 && items.length)) return null;
  var t = {
    fr: "Vus récemment",
    ar: "شوهد مؤخراً",
    en: "Recently viewed"
  }[lang] || "Recently viewed";
  return /*#__PURE__*/React.createElement("section", {
    className: "recent-strip",
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "recent-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-mono"
  }, "\u2014 ", t)), /*#__PURE__*/React.createElement("div", {
    className: "recent-track"
  }, items.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.sku,
      className: "recent-item",
      onClick: function onClick() {
        return onQuickView === null || onQuickView === void 0 ? void 0 : onQuickView(p);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "recent-thumb"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ph-label"
    }, p.cat)), /*#__PURE__*/React.createElement("div", {
      className: "recent-meta"
    }, /*#__PURE__*/React.createElement("span", {
      className: "recent-name"
    }, p.name), /*#__PURE__*/React.createElement("span", {
      className: "recent-price t-num"
    }, p.price.toLocaleString("fr-DZ"), " DA")));
  }))));
};

/* ============================================================
   v2 — WILAYA / COMMUNE SELECTOR
   Loads /data/shipping-rates.json once. Shows live shipping
   price + ETA the moment a wilaya is picked.
   Communes are seeded inline for top wilayas + a fallback
   "type your commune" for the rest until full seed lands.
   ============================================================ */

var COMMUNES_SEED = {
  16: ["Alger Centre", "Bab El Oued", "Bab Ezzouar", "Birkhadem", "Bordj El Bahri", "Bordj El Kiffan", "El Biar", "El Harrach", "El Madania", "Hussein Dey", "Kouba", "Ouled Fayet", "Reghaia", "Rouiba", "Said Hamdine", "Sidi M'Hamed"],
  31: ["Oran Centre", "Aïn El Turck", "Bir El Djir", "Es Senia", "Hassi Bounif", "Sidi El Bachir", "Bethioua", "Arzew", "Mers El Kébir"],
  25: ["Constantine", "El Khroub", "Aïn Smara", "Didouche Mourad", "Hamma Bouziane", "Zighoud Youcef"],
  9: ["Blida", "Boufarik", "Chebli", "El Affroun", "Mouzaïa", "Ouled Yaïch", "Soumaa"],
  6: ["Béjaïa", "Akbou", "Aokas", "El Kseur", "Sidi Aïch", "Tichy"],
  19: ["Sétif", "El Eulma", "Aïn Arnat", "Bougaa", "Aïn Oulmène", "Aïn Azel"],
  23: ["Annaba", "El Bouni", "El Hadjar", "Sidi Amar", "Berrahal", "Aïn Berda"],
  15: ["Tizi Ouzou", "Azazga", "Boghni", "Draâ Ben Khedda", "Tigzirt", "Larbaâ Nath Irathen"],
  35: ["Boumerdès", "Bordj Menaiel", "Dellys", "Khemis El Khechna", "Reghaïa", "Thénia"],
  42: ["Tipaza", "Cherchell", "Hadjout", "Koléa", "Bou Ismaïl", "Damous"]
};
var WilayaSelector = function WilayaSelector(_ref18) {
  var _wilaya$stop_desk2, _wilaya$stop_desk3;
  var _ref18$lang = _ref18.lang,
    lang = _ref18$lang === void 0 ? "fr" : _ref18$lang,
    onChange = _ref18.onChange;
  var _useState17 = useState(null),
    _useState18 = _slicedToArray(_useState17, 2),
    rates = _useState18[0],
    setRates = _useState18[1];
  var _useState19 = useState(null),
    _useState20 = _slicedToArray(_useState19, 2),
    wilaya = _useState20[0],
    setWilaya = _useState20[1];
  var _useState21 = useState("home"),
    _useState22 = _slicedToArray(_useState21, 2),
    delivery = _useState22[0],
    setDelivery = _useState22[1]; // home | stop_desk
  var _useState23 = useState(""),
    _useState24 = _slicedToArray(_useState23, 2),
    commune = _useState24[0],
    setCommune = _useState24[1];
  var _useState25 = useState(null),
    _useState26 = _slicedToArray(_useState25, 2),
    communeId = _useState26[0],
    setCommuneId = _useState26[1];
  var _useState27 = useState(false),
    _useState28 = _slicedToArray(_useState27, 2),
    communeOpen = _useState28[0],
    setCommuneOpen = _useState28[1];
  var _useState29 = useState([]),
    _useState30 = _slicedToArray(_useState29, 2),
    communes = _useState30[0],
    setCommunes = _useState30[1];
  useEffect(function () {
    // Use live API
    var api = window.latinaApi;
    if (api) {
      api.getWilayas().then(function (data) {
        var normalized = (Array.isArray(data) ? data : data.data || []).map(function (w) {
          var _w$shipping_rate$home, _w$shipping_rate, _w$shipping_rate$stop, _w$shipping_rate2;
          return {
            code: w.code,
            name_fr: w.name_fr,
            name_ar: w.name_ar,
            home: (_w$shipping_rate$home = (_w$shipping_rate = w.shipping_rate) === null || _w$shipping_rate === void 0 ? void 0 : _w$shipping_rate.home_fee) !== null && _w$shipping_rate$home !== void 0 ? _w$shipping_rate$home : 400,
            stop_desk: (_w$shipping_rate$stop = (_w$shipping_rate2 = w.shipping_rate) === null || _w$shipping_rate2 === void 0 ? void 0 : _w$shipping_rate2.stop_desk_fee) !== null && _w$shipping_rate$stop !== void 0 ? _w$shipping_rate$stop : null,
            eta_days: w.shipping_rate ? "".concat(w.shipping_rate.eta_days_min, "\u2013").concat(w.shipping_rate.eta_days_max) : "?"
          };
        });
        setRates(normalized);
      })["catch"](function () {
        // Fallback to local JSON
        fetch("data/shipping-rates.json").then(function (r) {
          return r.json();
        }).then(function (d) {
          return setRates(d.rates);
        })["catch"](function () {
          return setRates([]);
        });
      });
    } else {
      fetch("data/shipping-rates.json").then(function (r) {
        return r.json();
      }).then(function (d) {
        return setRates(d.rates);
      })["catch"](function () {
        return setRates([]);
      });
    }
  }, []);

  // Load communes when wilaya changes
  useEffect(function () {
    if (!wilaya) {
      setCommunes([]);
      return;
    }
    var api = window.latinaApi;
    if (api) {
      api.getCommunes(wilaya.code).then(function (data) {
        setCommunes(Array.isArray(data) ? data : data.data || []);
      })["catch"](function () {
        var _COMMUNES_SEED$wilaya;
        return setCommunes(((_COMMUNES_SEED$wilaya = COMMUNES_SEED[wilaya.code]) === null || _COMMUNES_SEED$wilaya === void 0 ? void 0 : _COMMUNES_SEED$wilaya.map(function (n) {
          return {
            id: null,
            name_fr: n,
            name_ar: n
          };
        })) || []);
      });
    } else {
      var _COMMUNES_SEED$wilaya2;
      setCommunes(((_COMMUNES_SEED$wilaya2 = COMMUNES_SEED[wilaya.code]) === null || _COMMUNES_SEED$wilaya2 === void 0 ? void 0 : _COMMUNES_SEED$wilaya2.map(function (n) {
        return {
          id: null,
          name_fr: n,
          name_ar: n
        };
      })) || []);
    }
  }, [wilaya]);
  useEffect(function () {
    var _wilaya$stop_desk;
    if (!wilaya) {
      onChange === null || onChange === void 0 || onChange(null);
      return;
    }
    var fee = delivery === "home" ? wilaya.home : (_wilaya$stop_desk = wilaya.stop_desk) !== null && _wilaya$stop_desk !== void 0 ? _wilaya$stop_desk : wilaya.home;
    onChange === null || onChange === void 0 || onChange({
      wilaya: wilaya.code,
      wilaya_code: wilaya.code,
      commune_id: communeId,
      name: wilaya.name_fr,
      delivery: delivery,
      commune: commune,
      fee: fee,
      eta: wilaya.eta_days
    });
  }, [wilaya, delivery, commune, communeId]);
  var t = {
    fr: {
      wilaya: "Wilaya",
      commune: "Commune",
      deliv: "Mode de livraison",
      home: "À domicile",
      desk: "Point relais",
      search: "Rechercher une wilaya…",
      commPh: "Tapez votre commune",
      eta: "Délai estimé",
      fee: "Frais de livraison",
      days: "jours",
      chooseW: "Choisissez votre wilaya",
      chooseC: "Choisissez votre commune"
    },
    ar: {
      wilaya: "الولاية",
      commune: "البلدية",
      deliv: "طريقة التوصيل",
      home: "إلى البيت",
      desk: "نقطة استلام",
      search: "ابحثي عن ولاية…",
      commPh: "اكتبي اسم البلدية",
      eta: "المدة المتوقعة",
      fee: "رسوم التوصيل",
      days: "أيام",
      chooseW: "اختاري الولاية",
      chooseC: "اختاري البلدية"
    },
    en: {
      wilaya: "Wilaya",
      commune: "Commune",
      deliv: "Delivery method",
      home: "Home delivery",
      desk: "Stop desk",
      search: "Search wilaya…",
      commPh: "Type your commune",
      eta: "ETA",
      fee: "Shipping fee",
      days: "days",
      chooseW: "Choose your wilaya",
      chooseC: "Choose your commune"
    }
  }[lang] || {};
  var _useState31 = useState(""),
    _useState32 = _slicedToArray(_useState31, 2),
    q = _useState32[0],
    setQ = _useState32[1];
  var _useState33 = useState(false),
    _useState34 = _slicedToArray(_useState33, 2),
    open = _useState34[0],
    setOpen = _useState34[1];
  var matches = (rates || []).filter(function (r) {
    return !q || r.name_fr.toLowerCase().includes(q.toLowerCase()) || r.name_ar.includes(q) || String(r.code).startsWith(q);
  });
  var fee = wilaya ? delivery === "home" ? wilaya.home : (_wilaya$stop_desk2 = wilaya.stop_desk) !== null && _wilaya$stop_desk2 !== void 0 ? _wilaya$stop_desk2 : wilaya.home : null;
  return /*#__PURE__*/React.createElement("div", {
    className: "ws",
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-row"
  }, /*#__PURE__*/React.createElement("label", {
    className: "ws-label t-mono"
  }, t.wilaya), /*#__PURE__*/React.createElement("div", {
    className: "ws-combo"
  }, /*#__PURE__*/React.createElement("input", {
    className: "ws-input",
    placeholder: wilaya ? "".concat(String(wilaya.code).padStart(2, "0"), " \xB7 ").concat(lang === "ar" ? wilaya.name_ar : wilaya.name_fr) : t.search,
    value: q,
    onFocus: function onFocus() {
      return setOpen(true);
    },
    onBlur: function onBlur() {
      return setTimeout(function () {
        return setOpen(false);
      }, 150);
    },
    onChange: function onChange(e) {
      setQ(e.target.value);
      setOpen(true);
    }
  }), open && rates && /*#__PURE__*/React.createElement("ul", {
    className: "ws-list",
    role: "listbox"
  }, matches.length === 0 && /*#__PURE__*/React.createElement("li", {
    className: "ws-empty"
  }, "\u2014"), matches.map(function (r) {
    return /*#__PURE__*/React.createElement("li", {
      key: r.code,
      role: "option",
      className: (wilaya === null || wilaya === void 0 ? void 0 : wilaya.code) === r.code ? "on" : "",
      onMouseDown: function onMouseDown() {
        setWilaya(r);
        setQ("");
        setCommune("");
        setOpen(false);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "ws-code t-num"
    }, String(r.code).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
      className: "ws-name"
    }, lang === "ar" ? r.name_ar : r.name_fr), /*#__PURE__*/React.createElement("span", {
      className: "ws-fee t-num"
    }, r.home, " DA"));
  })))), wilaya && /*#__PURE__*/React.createElement("div", {
    className: "ws-row"
  }, /*#__PURE__*/React.createElement("label", {
    className: "ws-label t-mono"
  }, t.deliv), /*#__PURE__*/React.createElement("div", {
    className: "ws-segments"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: delivery === "home" ? "on" : "",
    onClick: function onClick() {
      return setDelivery("home");
    }
  }, /*#__PURE__*/React.createElement(IconTruck, {
    width: 14,
    height: 14
  }), " ", t.home, " ", /*#__PURE__*/React.createElement("strong", {
    className: "t-num"
  }, wilaya.home, " DA")), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: delivery === "stop_desk" ? "on" : "",
    disabled: wilaya.stop_desk == null,
    onClick: function onClick() {
      return setDelivery("stop_desk");
    }
  }, /*#__PURE__*/React.createElement(IconBag, {
    width: 14,
    height: 14
  }), " ", t.desk, " ", /*#__PURE__*/React.createElement("strong", {
    className: "t-num"
  }, (_wilaya$stop_desk3 = wilaya.stop_desk) !== null && _wilaya$stop_desk3 !== void 0 ? _wilaya$stop_desk3 : "—", " DA")))), wilaya && /*#__PURE__*/React.createElement("div", {
    className: "ws-row"
  }, /*#__PURE__*/React.createElement("label", {
    className: "ws-label t-mono"
  }, t.commune), /*#__PURE__*/React.createElement("div", {
    className: "ws-combo"
  }, /*#__PURE__*/React.createElement("input", {
    className: "ws-input",
    placeholder: t.commPh,
    value: commune,
    onFocus: function onFocus() {
      return setCommuneOpen(true);
    },
    onBlur: function onBlur() {
      return setTimeout(function () {
        return setCommuneOpen(false);
      }, 150);
    },
    onChange: function onChange(e) {
      setCommune(e.target.value);
      setCommuneOpen(true);
    }
  }), communeOpen && communes.length > 0 && /*#__PURE__*/React.createElement("ul", {
    className: "ws-list",
    role: "listbox"
  }, communes.filter(function (c) {
    return !commune || (lang === "ar" ? c.name_ar : c.name_fr).toLowerCase().includes(commune.toLowerCase());
  }).map(function (c) {
    return /*#__PURE__*/React.createElement("li", {
      key: c.id || c.name_fr,
      role: "option",
      onMouseDown: function onMouseDown() {
        setCommune(lang === "ar" ? c.name_ar : c.name_fr);
        setCommuneId(c.id);
        setCommuneOpen(false);
      }
    }, lang === "ar" ? c.name_ar : c.name_fr);
  })))), wilaya && /*#__PURE__*/React.createElement("div", {
    className: "ws-summary t-mono"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, t.fee), /*#__PURE__*/React.createElement("span", {
    className: "t-num"
  }, fee, " DA")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", null, t.eta), /*#__PURE__*/React.createElement("span", {
    className: "t-num"
  }, wilaya.eta_days, " ", t.days.replace(/s$/, wilaya.eta_days === "1" ? "" : "s")))));
};
Object.assign(window, {
  LotusMark: LotusMark,
  IconBag: IconBag,
  IconHeart: IconHeart,
  IconSearch: IconSearch,
  IconUser: IconUser,
  IconTruck: IconTruck,
  IconCash: IconCash,
  IconShield: IconShield,
  IconReturn: IconReturn,
  ProductCard: ProductCard,
  BoxOpening: BoxOpening,
  Nav: Nav,
  ScrollProgress: ScrollProgress,
  SceneMarker: SceneMarker,
  useSceneProgress: useSceneProgress,
  FilterRail: FilterRail,
  applyFilters: applyFilters,
  COLOR_SWATCHES: COLOR_SWATCHES,
  HEEL_BUCKETS: HEEL_BUCKETS,
  MATERIALS: MATERIALS,
  QuickView: QuickView,
  SegmentToggle: SegmentToggle,
  WhatsAppFloat: WhatsAppFloat,
  CodTrustStrip: CodTrustStrip,
  useRecentlyViewed: useRecentlyViewed,
  RecentlyViewedStrip: RecentlyViewedStrip,
  WilayaSelector: WilayaSelector,
  COMMUNES_SEED: COMMUNES_SEED
});
