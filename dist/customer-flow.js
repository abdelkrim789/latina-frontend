"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
/* global React, ReactDOM */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useCallback = _React.useCallback,
  useMemo = _React.useMemo;

/* ============================================================
   AUTH MODAL — Login / Register
   ============================================================ */
var AuthModal = function AuthModal(_ref) {
  var lang = _ref.lang,
    open = _ref.open,
    onClose = _ref.onClose,
    onLogin = _ref.onLogin;
  var _useState = useState("login"),
    _useState2 = _slicedToArray(_useState, 2),
    tab = _useState2[0],
    setTab = _useState2[1];
  var _useState3 = useState({
      name: "",
      login: "",
      phone: "",
      email: "",
      password: "",
      confirm: ""
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    form = _useState4[0],
    setForm = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    loading = _useState6[0],
    setLoading = _useState6[1];
  var _useState7 = useState(""),
    _useState8 = _slicedToArray(_useState7, 2),
    error = _useState8[0],
    setError = _useState8[1];
  var api = window.latinaApi;
  var T = {
    fr: {
      login: "Connexion",
      register: "Créer un compte",
      name: "Nom complet",
      loginField: "Email ou téléphone",
      phone: "Téléphone (0XXXXXXXXX)",
      email: "Email (optionnel)",
      password: "Mot de passe",
      confirm: "Confirmer le mot de passe",
      loginBtn: "Se connecter",
      registerBtn: "S'inscrire",
      noAccount: "Pas encore de compte ?",
      hasAccount: "Déjà un compte ?",
      joinMsg: "Rejoignez Latina et gagnez des points fidélité."
    },
    ar: {
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      name: "الاسم الكامل",
      loginField: "البريد أو الهاتف",
      phone: "الهاتف (0XXXXXXXXX)",
      email: "البريد الإلكتروني (اختياري)",
      password: "كلمة المرور",
      confirm: "تأكيد كلمة المرور",
      loginBtn: "دخول",
      registerBtn: "إنشاء حساب",
      noAccount: "ليس لديك حساب؟",
      hasAccount: "لديك حساب؟",
      joinMsg: "انضمي إلى لاتينا واكسبي نقاط الولاء."
    },
    en: {
      login: "Sign In",
      register: "Create Account",
      name: "Full name",
      loginField: "Email or phone",
      phone: "Phone (0XXXXXXXXX)",
      email: "Email (optional)",
      password: "Password",
      confirm: "Confirm password",
      loginBtn: "Sign in",
      registerBtn: "Register",
      noAccount: "No account yet?",
      hasAccount: "Already have an account?",
      joinMsg: "Join Latina and earn loyalty points."
    }
  }[lang] || {};
  useEffect(function () {
    if (open) {
      setError("");
      setForm({
        name: "",
        phone: "",
        email: "",
        password: "",
        confirm: ""
      });
    }
  }, [open, tab]);
  var set = function set(k, v) {
    return setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, v));
    });
  };
  var handleSubmit = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var _data$data, data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            setError("");
            if (!(tab === "register" && form.password !== form.confirm)) {
              _context.n = 1;
              break;
            }
            setError("Les mots de passe ne correspondent pas.");
            return _context.a(2);
          case 1:
            setLoading(true);
            _context.p = 2;
            if (!(tab === "login")) {
              _context.n = 4;
              break;
            }
            _context.n = 3;
            return api.login({
              login: form.login,
              password: form.password
            });
          case 3:
            data = _context.v;
            _context.n = 6;
            break;
          case 4:
            _context.n = 5;
            return api.register({
              name: form.name,
              phone: form.phone,
              email: form.email || undefined,
              password: form.password
            });
          case 5:
            data = _context.v;
          case 6:
            onLogin(data.user || ((_data$data = data.data) === null || _data$data === void 0 ? void 0 : _data$data.user));
            onClose();
            _context.n = 8;
            break;
          case 7:
            _context.p = 7;
            _t = _context.v;
            setError(_t.message || "Erreur, veuillez réessayer.");
          case 8:
            _context.p = 8;
            setLoading(false);
            return _context.f(8);
          case 9:
            return _context.a(2);
        }
      }, _callee, null, [[2, 7, 8, 9]]);
    }));
    return function handleSubmit(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "auth-modal",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, "\u2715"), /*#__PURE__*/React.createElement("div", {
    className: "auth-brand"
  }, /*#__PURE__*/React.createElement(LotusMark, {
    size: 32,
    color: "var(--rose-500)"
  }), /*#__PURE__*/React.createElement("span", {
    className: "brand-name"
  }, "Latina")), /*#__PURE__*/React.createElement("div", {
    className: "auth-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: tab === "login" ? "active" : "",
    onClick: function onClick() {
      return setTab("login");
    }
  }, T.login), /*#__PURE__*/React.createElement("button", {
    className: tab === "register" ? "active" : "",
    onClick: function onClick() {
      return setTab("register");
    }
  }, T.register)), tab === "register" && /*#__PURE__*/React.createElement("p", {
    className: "auth-tagline"
  }, T.joinMsg), /*#__PURE__*/React.createElement("form", {
    className: "auth-form",
    onSubmit: handleSubmit
  }, tab === "register" && /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: T.name,
    value: form.name,
    onChange: function onChange(e) {
      return set("name", e.target.value);
    },
    required: true
  }), tab === "login" ? /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: T.loginField,
    value: form.login,
    onChange: function onChange(e) {
      return set("login", e.target.value);
    },
    required: true,
    autoComplete: "username"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    type: "tel",
    placeholder: T.phone,
    value: form.phone,
    onChange: function onChange(e) {
      return set("phone", e.target.value);
    },
    required: true,
    pattern: "0[5-7][0-9]{8}"
  }), /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: T.email,
    value: form.email,
    onChange: function onChange(e) {
      return set("email", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: T.password,
    value: form.password,
    onChange: function onChange(e) {
      return set("password", e.target.value);
    },
    required: true,
    minLength: 8
  }), tab === "register" && /*#__PURE__*/React.createElement("input", {
    type: "password",
    placeholder: T.confirm,
    value: form.confirm,
    onChange: function onChange(e) {
      return set("confirm", e.target.value);
    },
    required: true,
    minLength: 8
  }), error && /*#__PURE__*/React.createElement("div", {
    className: "auth-error"
  }, error), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn-primary auth-submit",
    disabled: loading
  }, loading ? /*#__PURE__*/React.createElement("span", {
    className: "btn-spinner"
  }) : tab === "login" ? T.loginBtn : T.registerBtn)), /*#__PURE__*/React.createElement("div", {
    className: "auth-switch"
  }, /*#__PURE__*/React.createElement("span", null, tab === "login" ? T.noAccount : T.hasAccount), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      return setTab(tab === "login" ? "register" : "login");
    }
  }, tab === "login" ? T.register : T.login))));
};

/* ============================================================
   CART DRAWER
   ============================================================ */
var CartDrawer = function CartDrawer(_ref3) {
  var lang = _ref3.lang,
    open = _ref3.open,
    onClose = _ref3.onClose,
    cart = _ref3.cart,
    onUpdateCart = _ref3.onUpdateCart,
    onCheckout = _ref3.onCheckout,
    user = _ref3.user;
  var _useState9 = useState(""),
    _useState0 = _slicedToArray(_useState9, 2),
    couponCode = _useState0[0],
    setCouponCode = _useState0[1];
  var _useState1 = useState(false),
    _useState10 = _slicedToArray(_useState1, 2),
    couponApplied = _useState10[0],
    setCouponApplied = _useState10[1];
  var T = {
    fr: {
      title: "Mon Panier",
      empty: "Votre panier est vide.",
      emptyHint: "Découvrez notre collection ✨",
      subtotal: "Sous-total",
      shipping: "Livraison",
      discount: "Remise",
      total: "Total",
      checkout: "Commander",
      applyCoupon: "Appliquer",
      couponPlaceholder: "Code promo",
      remove: "Supprimer",
      calculated: "calculée au checkout",
      freeShipping: "Offerte",
      qty: "Qté",
      cod: "Paiement à la livraison uniquement"
    },
    ar: {
      title: "سلة التسوق",
      empty: "سلتك فارغة.",
      emptyHint: "اكتشفي مجموعتنا ✨",
      subtotal: "المجموع الجزئي",
      shipping: "الشحن",
      discount: "الخصم",
      total: "المجموع",
      checkout: "طلب",
      applyCoupon: "تطبيق",
      couponPlaceholder: "كود الخصم",
      remove: "حذف",
      calculated: "يُحسب عند الدفع",
      freeShipping: "مجاني",
      qty: "الكمية",
      cod: "الدفع عند الاستلام فقط"
    },
    en: {
      title: "My Cart",
      empty: "Your cart is empty.",
      emptyHint: "Explore our collection ✨",
      subtotal: "Subtotal",
      shipping: "Shipping",
      discount: "Discount",
      total: "Total",
      checkout: "Order now",
      applyCoupon: "Apply",
      couponPlaceholder: "Promo code",
      remove: "Remove",
      calculated: "calculated at checkout",
      freeShipping: "Free",
      qty: "Qty",
      cod: "Cash on delivery only"
    }
  }[lang] || {};
  var subtotal = cart.reduce(function (s, i) {
    return s + i.price * i.qty;
  }, 0);
  var applyCoupon = function applyCoupon() {
    if (!couponCode.trim()) return;
    setCouponApplied(true);
  };
  var changeQty = function changeQty(idx, delta) {
    onUpdateCart(function (prev) {
      var next = _toConsumableArray(prev);
      next[idx] = _objectSpread(_objectSpread({}, next[idx]), {}, {
        qty: Math.max(1, next[idx].qty + delta)
      });
      return next;
    });
  };
  var removeItem = function removeItem(idx) {
    onUpdateCart(function (prev) {
      return prev.filter(function (_, i) {
        return i !== idx;
      });
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, open && /*#__PURE__*/React.createElement("div", {
    className: "drawer-backdrop",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "cart-drawer ".concat(open ? "open" : ""),
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cart-drawer-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-h4"
  }, T.title), /*#__PURE__*/React.createElement("button", {
    className: "drawer-close",
    onClick: onClose
  }, "\u2715")), cart.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "cart-empty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "cart-empty-icon"
  }, "\uD83D\uDECD\uFE0F"), /*#__PURE__*/React.createElement("p", null, T.empty), /*#__PURE__*/React.createElement("p", {
    className: "t-mute"
  }, T.emptyHint)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "cart-items"
  }, cart.map(function (item, idx) {
    return /*#__PURE__*/React.createElement("div", {
      className: "cart-item",
      key: idx
    }, /*#__PURE__*/React.createElement("div", {
      className: "ci-img"
    }, item.image ? /*#__PURE__*/React.createElement("img", {
      src: item.image,
      alt: item.name
    }) : /*#__PURE__*/React.createElement("div", {
      className: "ci-img-placeholder"
    }, "\uD83D\uDC5F")), /*#__PURE__*/React.createElement("div", {
      className: "ci-info"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ci-name"
    }, item.name), item.variant && /*#__PURE__*/React.createElement("div", {
      className: "ci-meta t-mono"
    }, item.variant), /*#__PURE__*/React.createElement("div", {
      className: "ci-price t-num"
    }, (item.price * item.qty).toLocaleString(), " DA")), /*#__PURE__*/React.createElement("div", {
      className: "ci-controls"
    }, /*#__PURE__*/React.createElement("div", {
      className: "qty-control"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return changeQty(idx, -1);
      }
    }, "\u2212"), /*#__PURE__*/React.createElement("span", {
      className: "t-num"
    }, item.qty), /*#__PURE__*/React.createElement("button", {
      onClick: function onClick() {
        return changeQty(idx, +1);
      }
    }, "+")), /*#__PURE__*/React.createElement("button", {
      className: "ci-remove",
      onClick: function onClick() {
        return removeItem(idx);
      }
    }, T.remove)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "cart-coupon"
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: T.couponPlaceholder,
    value: couponCode,
    onChange: function onChange(e) {
      setCouponCode(e.target.value);
      setCouponApplied(false);
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && applyCoupon();
    },
    disabled: couponApplied
  }), /*#__PURE__*/React.createElement("button", {
    onClick: applyCoupon,
    disabled: couponApplied || !couponCode.trim(),
    className: "btn-outline-sm"
  }, T.applyCoupon)), couponApplied && /*#__PURE__*/React.createElement("div", {
    className: "coupon-ok"
  }, "\u2713 ", couponCode, " \u2014 ", T.appliedAtCheckout || "appliqué au checkout"), /*#__PURE__*/React.createElement("div", {
    className: "cart-totals"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ct-row"
  }, /*#__PURE__*/React.createElement("span", null, T.subtotal), /*#__PURE__*/React.createElement("span", {
    className: "t-num"
  }, subtotal.toLocaleString(), " DA")), /*#__PURE__*/React.createElement("div", {
    className: "ct-row"
  }, /*#__PURE__*/React.createElement("span", null, T.shipping), /*#__PURE__*/React.createElement("span", {
    className: "t-mute"
  }, T.calculated)), /*#__PURE__*/React.createElement("div", {
    className: "ct-row total"
  }, /*#__PURE__*/React.createElement("span", null, T.total), /*#__PURE__*/React.createElement("span", {
    className: "t-num"
  }, subtotal.toLocaleString(), " DA"))), /*#__PURE__*/React.createElement("div", {
    className: "cart-cod-note t-mono"
  }, T.cod), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary cart-checkout-btn",
    onClick: function onClick() {
      return onCheckout(couponApplied ? {
        code: couponCode
      } : null);
    }
  }, T.checkout))));
};

/* ============================================================
   CHECKOUT PAGE — 3-step wizard
   ============================================================ */
var CheckoutPage = function CheckoutPage(_ref4) {
  var lang = _ref4.lang,
    open = _ref4.open,
    onClose = _ref4.onClose,
    cart = _ref4.cart,
    user = _ref4.user,
    onOrderPlaced = _ref4.onOrderPlaced,
    _ref4$coupon = _ref4.coupon,
    couponProp = _ref4$coupon === void 0 ? null : _ref4$coupon;
  var _useState11 = useState(1),
    _useState12 = _slicedToArray(_useState11, 2),
    step = _useState12[0],
    setStep = _useState12[1]; // 1=address, 2=review, 3=confirm
  var _useState13 = useState({
      name: (user === null || user === void 0 ? void 0 : user.name) || "",
      phone: (user === null || user === void 0 ? void 0 : user.phone) || "",
      wilaya_code: "",
      commune_id: null,
      street: "",
      shipping_fee: 0,
      eta_days: 3
    }),
    _useState14 = _slicedToArray(_useState13, 2),
    address = _useState14[0],
    setAddress = _useState14[1];
  var coupon = couponProp;
  var _useState15 = useState(0),
    _useState16 = _slicedToArray(_useState15, 2),
    loyaltyRedeem = _useState16[0],
    setLoyaltyRedeem = _useState16[1];
  var _useState17 = useState(0),
    _useState18 = _slicedToArray(_useState17, 2),
    loyaltyBalance = _useState18[0],
    setLoyaltyBalance = _useState18[1];
  var _useState19 = useState(""),
    _useState20 = _slicedToArray(_useState19, 2),
    notes = _useState20[0],
    setNotes = _useState20[1];
  var _useState21 = useState(false),
    _useState22 = _slicedToArray(_useState21, 2),
    loading = _useState22[0],
    setLoading = _useState22[1];
  var _useState23 = useState(""),
    _useState24 = _slicedToArray(_useState23, 2),
    error = _useState24[0],
    setError = _useState24[1];
  var _useState25 = useState(null),
    _useState26 = _slicedToArray(_useState25, 2),
    order = _useState26[0],
    setOrder = _useState26[1];
  var T = {
    fr: {
      title: "Finaliser la commande",
      step1: "Livraison",
      step2: "Récapitulatif",
      step3: "Confirmation",
      name: "Nom complet",
      phone: "Téléphone",
      street: "Adresse (rue, n°, ...)",
      notes: "Note pour le livreur (optionnel)",
      next: "Continuer",
      back: "Retour",
      confirm: "Confirmer la commande",
      orderTotal: "Total commande",
      shipping: "Frais de livraison",
      loyaltyAvail: "Points disponibles",
      loyaltyUse: "Utiliser mes points",
      loyaltyDzd: "= {v} DA de réduction",
      thankYou: "Merci pour votre commande !",
      orderRef: "Référence",
      trackOrder: "Suivre ma commande",
      deliveryMsg: "Vous serez contactée pour confirmer la livraison.",
      close: "Fermer",
      product: "Produit",
      qty: "Qté",
      unitPrice: "Prix unit.",
      lineTotal: "Total"
    },
    ar: {
      title: "إتمام الطلب",
      step1: "التوصيل",
      step2: "ملخص",
      step3: "تأكيد",
      name: "الاسم الكامل",
      phone: "الهاتف",
      street: "العنوان",
      notes: "ملاحظة للمندوب (اختياري)",
      next: "التالي",
      back: "رجوع",
      confirm: "تأكيد الطلب",
      orderTotal: "مجموع الطلب",
      shipping: "رسوم الشحن",
      loyaltyAvail: "النقاط المتاحة",
      loyaltyUse: "استخدام نقاطي",
      loyaltyDzd: "= خصم {v} دج",
      thankYou: "شكراً على طلبك!",
      orderRef: "المرجع",
      trackOrder: "تتبع طلبي",
      deliveryMsg: "سيتم التواصل معك لتأكيد التوصيل.",
      close: "إغلاق",
      product: "المنتج",
      qty: "الكمية",
      unitPrice: "سعر الوحدة",
      lineTotal: "المجموع"
    },
    en: {
      title: "Complete Order",
      step1: "Delivery",
      step2: "Summary",
      step3: "Confirmation",
      name: "Full name",
      phone: "Phone",
      street: "Street address",
      notes: "Note for delivery (optional)",
      next: "Continue",
      back: "Back",
      confirm: "Place order",
      orderTotal: "Order total",
      shipping: "Shipping fee",
      loyaltyAvail: "Available points",
      loyaltyUse: "Use my points",
      loyaltyDzd: "= {v} DA off",
      thankYou: "Thank you for your order!",
      orderRef: "Reference",
      trackOrder: "Track my order",
      deliveryMsg: "You will be contacted to confirm delivery.",
      close: "Close",
      product: "Product",
      qty: "Qty",
      unitPrice: "Unit price",
      lineTotal: "Total"
    }
  }[lang] || {};
  useEffect(function () {
    if (open && user) {
      setAddress(function (a) {
        return _objectSpread(_objectSpread({}, a), {}, {
          name: user.name || "",
          phone: user.phone || ""
        });
      });
      window.latinaApi.getLoyalty().then(function (r) {
        var _r$data;
        return setLoyaltyBalance(((_r$data = r.data) === null || _r$data === void 0 ? void 0 : _r$data.points) || r.points || 0);
      })["catch"](function () {});
    }
    if (open) {
      setStep(1);
      setError("");
      setOrder(null);
    }
  }, [open]);
  var subtotal = cart.reduce(function (s, i) {
    return s + i.price * i.qty;
  }, 0);
  var loyaltyDiscount = Math.floor(loyaltyRedeem / 10);
  var total = subtotal + address.shipping_fee - loyaltyDiscount;
  var handlePlace = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var _res$data, payload, res, orderObj, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            setLoading(true);
            setError("");
            _context2.p = 1;
            payload = {
              items: cart.filter(function (i) {
                return i.product_id;
              }).map(function (i) {
                return {
                  product_id: i.product_id,
                  quantity: i.qty,
                  variant_id: i.variant_id || undefined
                };
              }),
              wilaya_code: Number(address.wilaya_code),
              commune_id: address.commune_id || undefined,
              address_line: address.street,
              delivery_type: "home",
              guest_name: address.name,
              guest_phone: address.phone,
              coupon_code: (coupon === null || coupon === void 0 ? void 0 : coupon.code) || undefined,
              loyalty_points: loyaltyRedeem || undefined,
              notes: notes || undefined
            };
            if (!(payload.items.length === 0)) {
              _context2.n = 2;
              break;
            }
            setError("Votre panier ne contient aucun produit valide.");
            setLoading(false);
            return _context2.a(2);
          case 2:
            _context2.n = 3;
            return window.latinaApi.placeOrder(payload);
          case 3:
            res = _context2.v;
            orderObj = res.order || ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.order) || res.data || res;
            setOrder(orderObj);
            onOrderPlaced && onOrderPlaced(orderObj);
            setStep(3);
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            setError(_t2.message || "Erreur lors de la commande.");
          case 5:
            _context2.p = 5;
            setLoading(false);
            return _context2.f(5);
          case 6:
            return _context2.a(2);
        }
      }, _callee2, null, [[1, 4, 5, 6]]);
    }));
    return function handlePlace() {
      return _ref5.apply(this, arguments);
    };
  }();
  if (!open) return null;
  var steps = [T.step1, T.step2, T.step3];
  return /*#__PURE__*/React.createElement("div", {
    className: "checkout-overlay",
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "checkout-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "checkout-head"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "t-h4"
  }, T.title), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "checkout-steps"
  }, steps.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "cs-step ".concat(step === i + 1 ? "active" : "", " ").concat(step > i + 1 ? "done" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "cs-dot"
    }, step > i + 1 ? "✓" : i + 1), /*#__PURE__*/React.createElement("span", null, s));
  })), /*#__PURE__*/React.createElement("div", {
    className: "checkout-body"
  }, step === 1 && /*#__PURE__*/React.createElement("div", {
    className: "co-step-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "co-field-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "co-field"
  }, /*#__PURE__*/React.createElement("label", null, T.name), /*#__PURE__*/React.createElement("input", {
    value: address.name,
    onChange: function onChange(e) {
      return setAddress(function (a) {
        return _objectSpread(_objectSpread({}, a), {}, {
          name: e.target.value
        });
      });
    },
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "co-field"
  }, /*#__PURE__*/React.createElement("label", null, T.phone), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    value: address.phone,
    onChange: function onChange(e) {
      return setAddress(function (a) {
        return _objectSpread(_objectSpread({}, a), {}, {
          phone: e.target.value
        });
      });
    },
    required: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "co-field"
  }, /*#__PURE__*/React.createElement(WilayaSelector, {
    lang: lang,
    onChange: function onChange(val) {
      if (!val) return;
      var wilaya_code = val.wilaya_code,
        commune_id = val.commune_id,
        fee = val.fee,
        eta = val.eta;
      setAddress(function (a) {
        return _objectSpread(_objectSpread({}, a), {}, {
          wilaya_code: wilaya_code || val.wilaya,
          commune_id: commune_id || null,
          shipping_fee: fee || 0,
          eta_days: eta || 3
        });
      });
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "co-field"
  }, /*#__PURE__*/React.createElement("label", null, T.street), /*#__PURE__*/React.createElement("input", {
    value: address.street,
    onChange: function onChange(e) {
      return setAddress(function (a) {
        return _objectSpread(_objectSpread({}, a), {}, {
          street: e.target.value
        });
      });
    },
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "co-field"
  }, /*#__PURE__*/React.createElement("label", null, T.notes), /*#__PURE__*/React.createElement("textarea", {
    value: notes,
    onChange: function onChange(e) {
      return setNotes(e.target.value);
    },
    rows: 2
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary co-next",
    disabled: !address.wilaya_code || !address.name || !address.phone || !address.street,
    onClick: function onClick() {
      return setStep(2);
    }
  }, T.next)), step === 2 && /*#__PURE__*/React.createElement("div", {
    className: "co-step-2"
  }, /*#__PURE__*/React.createElement("table", {
    className: "co-items-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, T.product), /*#__PURE__*/React.createElement("th", null, T.qty), /*#__PURE__*/React.createElement("th", {
    className: "t-right"
  }, T.unitPrice), /*#__PURE__*/React.createElement("th", {
    className: "t-right"
  }, T.lineTotal))), /*#__PURE__*/React.createElement("tbody", null, cart.map(function (item, i) {
    return /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", null, item.name, item.variant && /*#__PURE__*/React.createElement("span", {
      className: "t-mute"
    }, " \xB7 ", item.variant)), /*#__PURE__*/React.createElement("td", {
      className: "t-num"
    }, item.qty), /*#__PURE__*/React.createElement("td", {
      className: "t-num t-right"
    }, item.price.toLocaleString(), " DA"), /*#__PURE__*/React.createElement("td", {
      className: "t-num t-right"
    }, (item.price * item.qty).toLocaleString(), " DA"));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "co-totals"
  }, /*#__PURE__*/React.createElement("div", {
    className: "co-row"
  }, /*#__PURE__*/React.createElement("span", null, T.orderTotal), /*#__PURE__*/React.createElement("span", {
    className: "t-num"
  }, subtotal.toLocaleString(), " DA")), /*#__PURE__*/React.createElement("div", {
    className: "co-row"
  }, /*#__PURE__*/React.createElement("span", null, T.shipping), /*#__PURE__*/React.createElement("span", {
    className: "t-num"
  }, address.shipping_fee.toLocaleString(), " DA")), (coupon === null || coupon === void 0 ? void 0 : coupon.code) && /*#__PURE__*/React.createElement("div", {
    className: "co-row",
    style: {
      color: "var(--rose-500)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFF7 ", coupon.code), /*#__PURE__*/React.createElement("span", {
    className: "t-mono",
    style: {
      fontSize: 12
    }
  }, "appliqu\xE9")), user && loyaltyBalance > 0 && /*#__PURE__*/React.createElement("div", {
    className: "co-loyalty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "co-row"
  }, /*#__PURE__*/React.createElement("span", null, T.loyaltyAvail, ": ", /*#__PURE__*/React.createElement("strong", {
    className: "t-num"
  }, loyaltyBalance, " pts"))), /*#__PURE__*/React.createElement("div", {
    className: "co-loyalty-input"
  }, /*#__PURE__*/React.createElement("label", null, T.loyaltyUse), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: 0,
    max: loyaltyBalance,
    step: 10,
    value: loyaltyRedeem,
    onChange: function onChange(e) {
      return setLoyaltyRedeem(Math.min(loyaltyBalance, Math.max(0, Number(e.target.value))));
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "t-mute"
  }, T.loyaltyDzd.replace("{v}", loyaltyDiscount)))), /*#__PURE__*/React.createElement("div", {
    className: "co-row total"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Total")), /*#__PURE__*/React.createElement("span", {
    className: "t-num"
  }, /*#__PURE__*/React.createElement("strong", null, total.toLocaleString(), " DA")))), error && /*#__PURE__*/React.createElement("div", {
    className: "auth-error"
  }, error), /*#__PURE__*/React.createElement("div", {
    className: "co-btns"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-outline co-back",
    onClick: function onClick() {
      return setStep(1);
    }
  }, T.back), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary co-confirm",
    onClick: handlePlace,
    disabled: loading
  }, loading ? /*#__PURE__*/React.createElement("span", {
    className: "btn-spinner"
  }) : T.confirm))), step === 3 && order && /*#__PURE__*/React.createElement("div", {
    className: "co-step-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "co-success-icon"
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
    className: "t-h3"
  }, T.thankYou), /*#__PURE__*/React.createElement("p", null, T.deliveryMsg), /*#__PURE__*/React.createElement("div", {
    className: "co-ref t-mono"
  }, /*#__PURE__*/React.createElement("span", null, T.orderRef, ":"), /*#__PURE__*/React.createElement("strong", null, order.reference)), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: onClose
  }, T.close)))));
};

/* ============================================================
   ACCOUNT PAGE / DRAWER
   ============================================================ */
var AccountPage = function AccountPage(_ref6) {
  var _user$name, _loyalty$points, _loyalty$tier_progres, _loyalty$tier_progres2, _loyalty$history;
  var lang = _ref6.lang,
    open = _ref6.open,
    onClose = _ref6.onClose,
    user = _ref6.user,
    onLogout = _ref6.onLogout;
  var _useState27 = useState("orders"),
    _useState28 = _slicedToArray(_useState27, 2),
    tab = _useState28[0],
    setTab = _useState28[1];
  var _useState29 = useState([]),
    _useState30 = _slicedToArray(_useState29, 2),
    orders = _useState30[0],
    setOrders = _useState30[1];
  var _useState31 = useState(null),
    _useState32 = _slicedToArray(_useState31, 2),
    loyalty = _useState32[0],
    setLoyalty = _useState32[1];
  var _useState33 = useState([]),
    _useState34 = _slicedToArray(_useState33, 2),
    wishlistItems = _useState34[0],
    setWishlistItems = _useState34[1];
  var _useState35 = useState(false),
    _useState36 = _slicedToArray(_useState35, 2),
    loading = _useState36[0],
    setLoading = _useState36[1];
  var api = window.latinaApi;
  var T = {
    fr: {
      title: "Mon Compte",
      orders: "Commandes",
      loyalty: "Fidélité",
      wishlist: "Favoris",
      logout: "Se déconnecter",
      noOrders: "Aucune commande.",
      hello: "Bonjour",
      points: "points",
      tier: "Niveau",
      history: "Historique des points",
      ref: "Réf.",
      status: "Statut",
      date: "Date",
      total: "Total",
      pending: "En attente",
      confirmed: "Confirmée",
      preparing: "En préparation",
      shipped: "Expédiée",
      out_for_delivery: "En cours de livraison",
      delivered: "Livrée",
      cancelled: "Annulée",
      rto: "Retournée",
      refunded: "Remboursée",
      noWishlist: "Votre liste de favoris est vide.",
      loyaltyInfo: "1 point pour chaque 100 DA d'achat · 10 points = 1 DA de réduction"
    },
    ar: {
      title: "حسابي",
      orders: "الطلبات",
      loyalty: "الولاء",
      wishlist: "المفضلة",
      logout: "تسجيل الخروج",
      noOrders: "لا توجد طلبات.",
      hello: "مرحباً",
      points: "نقطة",
      tier: "المستوى",
      history: "سجل النقاط",
      ref: "المرجع",
      status: "الحالة",
      date: "التاريخ",
      total: "المجموع",
      pending: "قيد الانتظار",
      confirmed: "مؤكد",
      preparing: "جار التحضير",
      shipped: "تم الشحن",
      out_for_delivery: "في الطريق",
      delivered: "تم التسليم",
      cancelled: "ملغي",
      rto: "مرتجع",
      refunded: "مسترد",
      noWishlist: "قائمة المفضلة فارغة.",
      loyaltyInfo: "نقطة لكل 100 دج من المشتريات · 10 نقاط = خصم 1 دج"
    },
    en: {
      title: "My Account",
      orders: "Orders",
      loyalty: "Loyalty",
      wishlist: "Wishlist",
      logout: "Sign out",
      noOrders: "No orders yet.",
      hello: "Hello",
      points: "points",
      tier: "Tier",
      history: "Points history",
      ref: "Ref.",
      status: "Status",
      date: "Date",
      total: "Total",
      pending: "Pending",
      confirmed: "Confirmed",
      preparing: "Preparing",
      shipped: "Shipped",
      out_for_delivery: "Out for delivery",
      delivered: "Delivered",
      cancelled: "Cancelled",
      rto: "Returned",
      refunded: "Refunded",
      noWishlist: "Your wishlist is empty.",
      loyaltyInfo: "1 point per 100 DA · 10 points = 1 DA off"
    }
  }[lang] || {};
  var STATUS_COLORS = {
    pending: "#F59E0B",
    confirmed: "#3B82F6",
    preparing: "#8B5CF6",
    shipped: "#06B6D4",
    out_for_delivery: "#10B981",
    delivered: "#059669",
    cancelled: "#EF4444",
    rto: "#F97316",
    refunded: "#6B7280"
  };
  useEffect(function () {
    if (!open || !user) return;
    setLoading(true);
    var promises = [api.getOrders().then(function (r) {
      return setOrders(r.data || (r === null || r === void 0 ? void 0 : r.items) || []);
    })["catch"](function () {}), api.getLoyalty().then(function (r) {
      return setLoyalty(r.data || r);
    })["catch"](function () {}), api.getWishlist().then(function (r) {
      return setWishlistItems(r.data || r || []);
    })["catch"](function () {})];
    Promise.all(promises)["finally"](function () {
      return setLoading(false);
    });
  }, [open, user]);
  var TIER_COLORS = {
    petal: "#C68B6F",
    lotus: "#9B59B6",
    amber: "#F59E0B"
  };
  var TIER_LABELS = {
    petal: "🌸 Petal",
    lotus: "🪷 Lotus",
    amber: "🌟 Amber"
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "modal-backdrop",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "account-modal",
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "account-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "account-hello t-mono"
  }, T.hello, ", ", /*#__PURE__*/React.createElement("strong", null, user === null || user === void 0 || (_user$name = user.name) === null || _user$name === void 0 ? void 0 : _user$name.split(" ")[0])), /*#__PURE__*/React.createElement("div", {
    className: "account-phone t-mute"
  }, user === null || user === void 0 ? void 0 : user.phone)), /*#__PURE__*/React.createElement("div", {
    className: "account-head-actions"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-outline-sm",
    onClick: function onClick() {
      onLogout();
      onClose();
    }
  }, T.logout), /*#__PURE__*/React.createElement("button", {
    className: "modal-close",
    onClick: onClose
  }, "\u2715"))), /*#__PURE__*/React.createElement("div", {
    className: "account-tabs"
  }, ["orders", "loyalty", "wishlist"].map(function (t) {
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      className: tab === t ? "active" : "",
      onClick: function onClick() {
        return setTab(t);
      }
    }, T[t]);
  })), /*#__PURE__*/React.createElement("div", {
    className: "account-body"
  }, loading && /*#__PURE__*/React.createElement("div", {
    className: "account-loading"
  }, "\u2026"), !loading && tab === "orders" && /*#__PURE__*/React.createElement("div", {
    className: "acc-orders"
  }, orders.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "t-mute"
  }, T.noOrders) : /*#__PURE__*/React.createElement("div", {
    className: "orders-list"
  }, orders.map(function (o) {
    var _o$lines;
    return /*#__PURE__*/React.createElement("div", {
      key: o.id,
      className: "order-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "oc-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "oc-ref t-mono"
    }, o.reference), /*#__PURE__*/React.createElement("span", {
      className: "oc-status",
      style: {
        background: STATUS_COLORS[o.status] + "22",
        color: STATUS_COLORS[o.status],
        border: "1px solid ".concat(STATUS_COLORS[o.status], "44")
      }
    }, T[o.status] || o.status)), /*#__PURE__*/React.createElement("div", {
      className: "oc-meta t-mute"
    }, /*#__PURE__*/React.createElement("span", null, new Date(o.created_at).toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ")), /*#__PURE__*/React.createElement("span", {
      className: "t-num"
    }, Number(o.total).toLocaleString(), " DA")), ((_o$lines = o.lines) === null || _o$lines === void 0 ? void 0 : _o$lines.length) > 0 && /*#__PURE__*/React.createElement("div", {
      className: "oc-items"
    }, o.lines.map(function (l, i) {
      var _l$quantity;
      return /*#__PURE__*/React.createElement("span", {
        key: i,
        className: "oc-item-chip"
      }, l.product_name, " \xD7", (_l$quantity = l.quantity) !== null && _l$quantity !== void 0 ? _l$quantity : l.qty);
    })));
  }))), !loading && tab === "loyalty" && loyalty && /*#__PURE__*/React.createElement("div", {
    className: "acc-loyalty"
  }, /*#__PURE__*/React.createElement("div", {
    className: "loyalty-card-big",
    style: {
      "--tier-color": TIER_COLORS[loyalty.tier] || "#C68B6F"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lcb-tier"
  }, TIER_LABELS[loyalty.tier] || loyalty.tier), /*#__PURE__*/React.createElement("div", {
    className: "lcb-points"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-num lcb-pts-num"
  }, (_loyalty$points = loyalty.points) === null || _loyalty$points === void 0 ? void 0 : _loyalty$points.toLocaleString()), /*#__PURE__*/React.createElement("span", {
    className: "lcb-pts-label"
  }, T.points)), loyalty.next_tier && /*#__PURE__*/React.createElement("div", {
    className: "lcb-progress"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lcb-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lcb-fill",
    style: {
      width: "".concat(Math.min(100, ((_loyalty$tier_progres = loyalty.tier_progress) === null || _loyalty$tier_progres === void 0 ? void 0 : _loyalty$tier_progres.pct) || 0), "%")
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "t-mono lcb-next"
  }, ((_loyalty$tier_progres2 = loyalty.tier_progress) === null || _loyalty$tier_progres2 === void 0 ? void 0 : _loyalty$tier_progres2.needed) || 0, " pts \u2192 ", loyalty.next_tier)), /*#__PURE__*/React.createElement("div", {
    className: "lcb-info t-mono"
  }, T.loyaltyInfo)), ((_loyalty$history = loyalty.history) === null || _loyalty$history === void 0 ? void 0 : _loyalty$history.length) > 0 && /*#__PURE__*/React.createElement("div", {
    className: "loyalty-history"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-h5"
  }, T.history), loyalty.history.map(function (e, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "lh-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "lh-desc"
    }, e.note || e.type), /*#__PURE__*/React.createElement("span", {
      className: "lh-pts t-num ".concat(e.points > 0 ? "earn" : "spend")
    }, e.points > 0 ? "+" : "", e.points));
  }))), !loading && tab === "wishlist" && /*#__PURE__*/React.createElement("div", {
    className: "acc-wishlist"
  }, wishlistItems.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "t-mute"
  }, T.noWishlist) : /*#__PURE__*/React.createElement("div", {
    className: "wl-grid"
  }, wishlistItems.map(function (p) {
    var _p$media;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      className: "wl-card"
    }, ((_p$media = p.media) === null || _p$media === void 0 ? void 0 : _p$media[0]) && /*#__PURE__*/React.createElement("img", {
      src: p.media[0].url,
      alt: p["name_".concat(lang)] || p.name_fr
    }), /*#__PURE__*/React.createElement("div", {
      className: "wl-name"
    }, p["name_".concat(lang)] || p.name_fr), /*#__PURE__*/React.createElement("div", {
      className: "wl-price t-num"
    }, Number(p.price).toLocaleString(), " DA"));
  }))))));
};

/* ============================================================
   ORDER TRACKER — standalone component for tracking page
   ============================================================ */
var OrderTracker = function OrderTracker(_ref7) {
  var lang = _ref7.lang,
    reference = _ref7.reference;
  var _useState37 = useState(null),
    _useState38 = _slicedToArray(_useState37, 2),
    order = _useState38[0],
    setOrder = _useState38[1];
  var _useState39 = useState(reference || ""),
    _useState40 = _slicedToArray(_useState39, 2),
    ref = _useState40[0],
    setRef = _useState40[1];
  var _useState41 = useState(false),
    _useState42 = _slicedToArray(_useState41, 2),
    loading = _useState42[0],
    setLoading = _useState42[1];
  var _useState43 = useState(""),
    _useState44 = _slicedToArray(_useState43, 2),
    error = _useState44[0],
    setError = _useState44[1];
  var T = {
    fr: {
      title: "Suivre ma commande",
      placeholder: "Référence LAT-XXXXXX",
      track: "Suivre",
      notFound: "Commande introuvable.",
      status: "Statut",
      eta: "Livraison estimée"
    },
    ar: {
      title: "تتبع طلبي",
      placeholder: "المرجع LAT-XXXXXX",
      track: "تتبع",
      notFound: "الطلب غير موجود.",
      status: "الحالة",
      eta: "التسليم المتوقع"
    },
    en: {
      title: "Track My Order",
      placeholder: "Reference LAT-XXXXXX",
      track: "Track",
      notFound: "Order not found.",
      status: "Status",
      eta: "Estimated delivery"
    }
  }[lang] || {};
  var doTrack = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var res, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            if (ref.trim()) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            setLoading(true);
            setError("");
            _context3.p = 2;
            _context3.n = 3;
            return window.latinaApi.trackOrder(ref.trim());
          case 3:
            res = _context3.v;
            setOrder(res.data || res);
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t3 = _context3.v;
            setError(T.notFound);
            setOrder(null);
          case 5:
            _context3.p = 5;
            setLoading(false);
            return _context3.f(5);
          case 6:
            return _context3.a(2);
        }
      }, _callee3, null, [[2, 4, 5, 6]]);
    }));
    return function doTrack() {
      return _ref8.apply(this, arguments);
    };
  }();
  var COD_STATUSES = ["pending", "confirmed", "preparing", "shipped", "out_for_delivery", "delivered"];
  var STATUS_T = {
    fr: {
      pending: "En attente",
      confirmed: "Confirmée",
      preparing: "En préparation",
      shipped: "Expédiée",
      out_for_delivery: "En livraison",
      delivered: "Livrée"
    },
    ar: {
      pending: "قيد الانتظار",
      confirmed: "مؤكد",
      preparing: "جار التحضير",
      shipped: "تم الشحن",
      out_for_delivery: "في الطريق",
      delivered: "تم التسليم"
    },
    en: {
      pending: "Pending",
      confirmed: "Confirmed",
      preparing: "Preparing",
      shipped: "Shipped",
      out_for_delivery: "Out for delivery",
      delivered: "Delivered"
    }
  }[lang] || {};
  var curIdx = order ? COD_STATUSES.indexOf(order.status) : -1;
  return /*#__PURE__*/React.createElement("div", {
    className: "order-tracker",
    dir: lang === "ar" ? "rtl" : "ltr"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "t-h4"
  }, T.title), /*#__PURE__*/React.createElement("div", {
    className: "ot-input"
  }, /*#__PURE__*/React.createElement("input", {
    value: ref,
    onChange: function onChange(e) {
      return setRef(e.target.value);
    },
    placeholder: T.placeholder,
    onKeyDown: function onKeyDown(e) {
      return e.key === "Enter" && doTrack();
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn-primary",
    onClick: doTrack,
    disabled: loading
  }, loading ? "…" : T.track)), error && /*#__PURE__*/React.createElement("div", {
    className: "auth-error"
  }, error), order && /*#__PURE__*/React.createElement("div", {
    className: "ot-result"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ot-progress"
  }, COD_STATUSES.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: s,
      className: "ot-dot-wrap ".concat(i <= curIdx ? "done" : "", " ").concat(i === curIdx ? "active" : "")
    }, /*#__PURE__*/React.createElement("div", {
      className: "ot-dot"
    }, i < curIdx ? "✓" : i + 1), /*#__PURE__*/React.createElement("span", null, STATUS_T[s]), i < COD_STATUSES.length - 1 && /*#__PURE__*/React.createElement("div", {
      className: "ot-line"
    }));
  }))));
};
Object.assign(window, {
  AuthModal: AuthModal,
  CartDrawer: CartDrawer,
  CheckoutPage: CheckoutPage,
  AccountPage: AccountPage,
  OrderTracker: OrderTracker
});
