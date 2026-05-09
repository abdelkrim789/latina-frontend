"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
var latinaApi = window.latinaApi;

/* ============================================================
   TOAST
   ============================================================ */
var ToastCtx = React.createContext(null);
var useToast = function useToast() {
  return React.useContext(ToastCtx);
};
var ToastProvider = function ToastProvider(_ref) {
  var children = _ref.children;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    toasts = _useState2[0],
    setToasts = _useState2[1];
  var show = useCallback(function (msg) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "ok";
    var id = Date.now();
    setToasts(function (t) {
      return [].concat(_toConsumableArray(t), [{
        id: id,
        msg: msg,
        type: type
      }]);
    });
    setTimeout(function () {
      return setToasts(function (t) {
        return t.filter(function (x) {
          return x.id !== id;
        });
      });
    }, 3500);
  }, []);
  return /*#__PURE__*/React.createElement(ToastCtx.Provider, {
    value: show
  }, children, /*#__PURE__*/React.createElement("div", {
    className: "admin-toast-wrap"
  }, toasts.map(function (t) {
    return /*#__PURE__*/React.createElement("div", {
      key: t.id,
      className: "admin-toast toast-".concat(t.type)
    }, t.type === "ok" ? "✓" : t.type === "err" ? "✕" : "ℹ", " ", t.msg);
  })));
};

/* ============================================================
   LOGIN
   ============================================================ */
var AdminLogin = function AdminLogin(_ref2) {
  var onLogin = _ref2.onLogin;
  var _useState3 = useState({
      email: "",
      password: ""
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
  var submit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(e) {
      var _res$data, res, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            e.preventDefault();
            setLoading(true);
            setError("");
            _context.p = 1;
            _context.n = 2;
            return latinaApi.adminLogin(form.email, form.password);
          case 2:
            res = _context.v;
            onLogin(res.admin || ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.admin) || res.user);
            _context.n = 4;
            break;
          case 3:
            _context.p = 3;
            _t = _context.v;
            setError(_t.message || "Identifiants incorrects");
          case 4:
            _context.p = 4;
            setLoading(false);
            return _context.f(4);
          case 5:
            return _context.a(2);
        }
      }, _callee, null, [[1, 3, 4, 5]]);
    }));
    return function submit(_x) {
      return _ref3.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-login"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-login-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "al-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "al-logo"
  }, "L"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "al-title"
  }, "Latina Admin"), /*#__PURE__*/React.createElement("div", {
    className: "al-sub"
  }, "TABLEAU DE BORD"))), /*#__PURE__*/React.createElement("form", {
    className: "al-form",
    onSubmit: submit
  }, /*#__PURE__*/React.createElement("div", {
    className: "al-field"
  }, /*#__PURE__*/React.createElement("label", null, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: form.email,
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          email: e.target.value
        });
      });
    },
    required: true,
    placeholder: "admin@latina.dz"
  })), /*#__PURE__*/React.createElement("div", {
    className: "al-field"
  }, /*#__PURE__*/React.createElement("label", null, "Mot de passe"), /*#__PURE__*/React.createElement("input", {
    type: "password",
    value: form.password,
    onChange: function onChange(e) {
      return setForm(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          password: e.target.value
        });
      });
    },
    required: true
  })), error && /*#__PURE__*/React.createElement("div", {
    className: "al-err"
  }, error), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "al-btn",
    disabled: loading
  }, loading ? /*#__PURE__*/React.createElement("span", {
    className: "admin-spinner",
    style: {
      width: 16,
      height: 16
    }
  }) : "Se connecter"))));
};

/* ============================================================
   SIDEBAR
   ============================================================ */
var NAV_ITEMS = [{
  id: "dashboard",
  icon: "📊",
  label: "Dashboard",
  section: null
}, {
  id: "products",
  icon: "👟",
  label: "Produits",
  section: "CATALOGUE"
}, {
  id: "categories",
  icon: "🗂",
  label: "Catégories",
  section: null
}, {
  id: "orders",
  icon: "📦",
  label: "Commandes",
  section: "VENTES"
}, {
  id: "customers",
  icon: "👥",
  label: "Clients",
  section: null
}, {
  id: "coupons",
  icon: "🏷",
  label: "Coupons",
  section: "OFFRES"
}, {
  id: "flash_sales",
  icon: "⚡",
  label: "Flash Sales",
  section: null
}, {
  id: "contests",
  icon: "🏆",
  label: "Concours",
  section: null
}, {
  id: "inventory",
  icon: "🏭",
  label: "Inventaire",
  section: "GESTION"
}, {
  id: "team",
  icon: "🔐",
  label: "Équipe",
  section: null
}, {
  id: "reports",
  icon: "📈",
  label: "Rapports",
  section: null
}, {
  id: "audit",
  icon: "📋",
  label: "Audit",
  section: null
}];
var Sidebar = function Sidebar(_ref4) {
  var _admin$name, _admin$roles;
  var page = _ref4.page,
    setPage = _ref4.setPage,
    admin = _ref4.admin,
    onLogout = _ref4.onLogout;
  var lastSection = null;
  return /*#__PURE__*/React.createElement("aside", {
    className: "admin-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sb-brand"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sb-logo"
  }, "L"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "sb-title"
  }, "Latina"), /*#__PURE__*/React.createElement("div", {
    className: "sb-subtitle"
  }, "ADMIN"))), /*#__PURE__*/React.createElement("nav", {
    className: "sb-nav"
  }, NAV_ITEMS.map(function (item) {
    var showSection = item.section && item.section !== lastSection;
    if (item.section) lastSection = item.section;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: item.id
    }, showSection && /*#__PURE__*/React.createElement("div", {
      className: "sb-section"
    }, item.section), /*#__PURE__*/React.createElement("button", {
      className: "sb-item ".concat(page === item.id ? "active" : ""),
      onClick: function onClick() {
        return setPage(item.id);
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "sb-icon"
    }, item.icon), /*#__PURE__*/React.createElement("span", null, item.label)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "sb-user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sb-avatar"
  }, (admin === null || admin === void 0 || (_admin$name = admin.name) === null || _admin$name === void 0 ? void 0 : _admin$name[0]) || "A"), /*#__PURE__*/React.createElement("div", {
    className: "sb-user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sb-user-name"
  }, admin === null || admin === void 0 ? void 0 : admin.name), /*#__PURE__*/React.createElement("div", {
    className: "sb-user-role"
  }, admin !== null && admin !== void 0 && admin.is_super ? "Super Admin" : (admin === null || admin === void 0 || (_admin$roles = admin.roles) === null || _admin$roles === void 0 ? void 0 : _admin$roles[0]) || "Admin")), /*#__PURE__*/React.createElement("button", {
    className: "sb-logout",
    title: "D\xE9connexion",
    onClick: onLogout
  }, "\u238B")));
};

/* ============================================================
   DASHBOARD
   ============================================================ */
var Dashboard = function Dashboard() {
  var _S$orders_count, _S$customers_count, _S$products_count;
  var _useState9 = useState(null),
    _useState0 = _slicedToArray(_useState9, 2),
    stats = _useState0[0],
    setStats = _useState0[1];
  var _useState1 = useState([]),
    _useState10 = _slicedToArray(_useState1, 2),
    recentOrders = _useState10[0],
    setRecentOrders = _useState10[1];
  var _useState11 = useState(true),
    _useState12 = _slicedToArray(_useState11, 2),
    loading = _useState12[0],
    setLoading = _useState12[1];
  useEffect(function () {
    Promise.all([latinaApi.admin.get("/reports/sales").then(function (r) {
      return setStats(r.data || r);
    })["catch"](function () {}), latinaApi.admin.get("/orders?per_page=8&sort=created_at&dir=desc").then(function (r) {
      return setRecentOrders(r.data || []);
    })["catch"](function () {})])["finally"](function () {
      return setLoading(false);
    });
  }, []);
  if (loading) return /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  }));
  var S = stats || {};
  var statCards = [{
    label: "Chiffre d'affaires",
    val: S.revenue ? "".concat(Number(S.revenue).toLocaleString(), " DA") : "—",
    delta: S.revenue_delta,
    icon: "💰"
  }, {
    label: "Commandes",
    val: (_S$orders_count = S.orders_count) !== null && _S$orders_count !== void 0 ? _S$orders_count : "—",
    delta: S.orders_delta,
    icon: "📦"
  }, {
    label: "Clients",
    val: (_S$customers_count = S.customers_count) !== null && _S$customers_count !== void 0 ? _S$customers_count : "—",
    delta: S.customers_delta,
    icon: "👥"
  }, {
    label: "Produits actifs",
    val: (_S$products_count = S.products_count) !== null && _S$products_count !== void 0 ? _S$products_count : "—",
    delta: null,
    icon: "👟"
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "stats-grid"
  }, statCards.map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "stat-card"
    }, /*#__PURE__*/React.createElement("div", {
      className: "sc-label"
    }, c.label), /*#__PURE__*/React.createElement("div", {
      className: "sc-val"
    }, c.val), c.delta != null && /*#__PURE__*/React.createElement("div", {
      className: "sc-delta ".concat(c.delta >= 0 ? "up" : "down")
    }, c.delta >= 0 ? "▲" : "▼", " ", Math.abs(c.delta), "% vs mois dernier"));
  })), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ac-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ac-title"
  }, "Commandes r\xE9centes")), /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "R\xE9f."), /*#__PURE__*/React.createElement("th", null, "Client"), /*#__PURE__*/React.createElement("th", null, "Wilaya"), /*#__PURE__*/React.createElement("th", null, "Total"), /*#__PURE__*/React.createElement("th", null, "Statut"), /*#__PURE__*/React.createElement("th", null, "Date"))), /*#__PURE__*/React.createElement("tbody", null, recentOrders.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 6,
    style: {
      textAlign: "center",
      padding: 24,
      color: "var(--text-3)"
    }
  }, "Aucune commande")), recentOrders.map(function (o) {
    var _o$wilaya;
    return /*#__PURE__*/React.createElement("tr", {
      key: o.id
    }, /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, o.reference), /*#__PURE__*/React.createElement("td", {
      className: "t-name"
    }, o.recipient_name), /*#__PURE__*/React.createElement("td", null, ((_o$wilaya = o.wilaya) === null || _o$wilaya === void 0 ? void 0 : _o$wilaya.name_fr) || o.wilaya_code), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, Number(o.total).toLocaleString(), " DA"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "badge badge-".concat(o.status)
    }, o.status)), /*#__PURE__*/React.createElement("td", {
      className: "text-mute"
    }, new Date(o.created_at).toLocaleDateString("fr-DZ")));
  }))))));
};

/* ============================================================
   GENERIC TABLE PAGE HOOK
   ============================================================ */
var useTable = function useTable(endpoint) {
  var perPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  var _useState13 = useState([]),
    _useState14 = _slicedToArray(_useState13, 2),
    rows = _useState14[0],
    setRows = _useState14[1];
  var _useState15 = useState(null),
    _useState16 = _slicedToArray(_useState15, 2),
    meta = _useState16[0],
    setMeta = _useState16[1];
  var _useState17 = useState(true),
    _useState18 = _slicedToArray(_useState17, 2),
    loading = _useState18[0],
    setLoading = _useState18[1];
  var _useState19 = useState(1),
    _useState20 = _slicedToArray(_useState19, 2),
    page = _useState20[0],
    setPage = _useState20[1];
  var _useState21 = useState(""),
    _useState22 = _slicedToArray(_useState21, 2),
    search = _useState22[0],
    setSearch = _useState22[1];
  var load = useCallback(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var p,
      q,
      qs,
      res,
      _args2 = arguments,
      _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          p = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : page;
          q = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : search;
          setLoading(true);
          _context2.p = 1;
          qs = "?page=".concat(p, "&per_page=").concat(perPage).concat(q ? "&search=".concat(encodeURIComponent(q)) : "");
          _context2.n = 2;
          return latinaApi.admin.get(endpoint + qs);
        case 2:
          res = _context2.v;
          setRows(res.data || res.items || res || []);
          setMeta(res.meta || null);
          _context2.n = 4;
          break;
        case 3:
          _context2.p = 3;
          _t2 = _context2.v;
          setRows([]);
        case 4:
          _context2.p = 4;
          setLoading(false);
          return _context2.f(4);
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[1, 3, 4, 5]]);
  })), [endpoint, perPage]);
  useEffect(function () {
    load(1, search);
  }, []);
  var doSearch = function doSearch(q) {
    setSearch(q);
    setPage(1);
    load(1, q);
  };
  var goPage = function goPage(p) {
    setPage(p);
    load(p, search);
  };
  var reload = function reload() {
    return load(page, search);
  };
  return {
    rows: rows,
    meta: meta,
    loading: loading,
    page: page,
    search: search,
    doSearch: doSearch,
    goPage: goPage,
    reload: reload,
    setRows: setRows
  };
};

/* ============================================================
   PRODUCTS
   ============================================================ */
var ProductModal = function ProductModal(_ref6) {
  var _product$is_active, _product$is_featured;
  var product = _ref6.product,
    onClose = _ref6.onClose,
    onSaved = _ref6.onSaved;
  var toast = useToast();
  var _useState23 = useState(null),
    _useState24 = _slicedToArray(_useState23, 2),
    savedProductId = _useState24[0],
    setSavedProductId = _useState24[1];
  var effectiveId = (product === null || product === void 0 ? void 0 : product.id) || savedProductId;
  var isNew = !effectiveId;
  var _useState25 = useState("info"),
    _useState26 = _slicedToArray(_useState25, 2),
    tab = _useState26[0],
    setTab = _useState26[1]; // "info" | "images"
  var _useState27 = useState({
      name_fr: (product === null || product === void 0 ? void 0 : product.name_fr) || "",
      name_ar: (product === null || product === void 0 ? void 0 : product.name_ar) || "",
      name_en: (product === null || product === void 0 ? void 0 : product.name_en) || "",
      description_fr: (product === null || product === void 0 ? void 0 : product.description_fr) || "",
      description_ar: (product === null || product === void 0 ? void 0 : product.description_ar) || "",
      price: (product === null || product === void 0 ? void 0 : product.price) || "",
      compare_price: (product === null || product === void 0 ? void 0 : product.compare_price) || "",
      category_id: (product === null || product === void 0 ? void 0 : product.category_id) || "",
      stock: (product === null || product === void 0 ? void 0 : product.stock) || 0,
      is_active: (_product$is_active = product === null || product === void 0 ? void 0 : product.is_active) !== null && _product$is_active !== void 0 ? _product$is_active : true,
      is_featured: (_product$is_featured = product === null || product === void 0 ? void 0 : product.is_featured) !== null && _product$is_featured !== void 0 ? _product$is_featured : false,
      sku: (product === null || product === void 0 ? void 0 : product.sku) || ""
    }),
    _useState28 = _slicedToArray(_useState27, 2),
    form = _useState28[0],
    setForm = _useState28[1];
  var _useState29 = useState(false),
    _useState30 = _slicedToArray(_useState29, 2),
    saving = _useState30[0],
    setSaving = _useState30[1];
  var _useState31 = useState([]),
    _useState32 = _slicedToArray(_useState31, 2),
    images = _useState32[0],
    setImages = _useState32[1];
  var _useState33 = useState(false),
    _useState34 = _slicedToArray(_useState33, 2),
    uploading = _useState34[0],
    setUploading = _useState34[1];
  var fileRef = useRef(null);
  // Variants state
  var _useState35 = useState([]),
    _useState36 = _slicedToArray(_useState35, 2),
    variants = _useState36[0],
    setVariants = _useState36[1];
  var _useState37 = useState(false),
    _useState38 = _slicedToArray(_useState37, 2),
    loadingVariants = _useState38[0],
    setLoadingVariants = _useState38[1];
  var _useState39 = useState(false),
    _useState40 = _slicedToArray(_useState39, 2),
    addingVariant = _useState40[0],
    setAddingVariant = _useState40[1];
  var _useState41 = useState(null),
    _useState42 = _slicedToArray(_useState41, 2),
    editingVariantId = _useState42[0],
    setEditingVariantId = _useState42[1];
  var emptyVForm = {
    color: "",
    size: "",
    stock: 0,
    price_adjustment: 0,
    is_active: true
  };
  var _useState43 = useState(emptyVForm),
    _useState44 = _slicedToArray(_useState43, 2),
    vForm = _useState44[0],
    setVForm = _useState44[1];
  var setV = function setV(k, v) {
    return setVForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, v));
    });
  };
  var set = function set(k, v) {
    return setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, v));
    });
  };
  useEffect(function () {
    if (product !== null && product !== void 0 && product.id) loadImages(product.id);
  }, []);
  var loadImages = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(pid) {
      var id, data, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            id = pid !== null && pid !== void 0 ? pid : effectiveId;
            if (id) {
              _context3.n = 1;
              break;
            }
            return _context3.a(2);
          case 1:
            _context3.p = 1;
            _context3.n = 2;
            return latinaApi.admin.get("/products/".concat(id, "/media"));
          case 2:
            data = _context3.v;
            setImages(Array.isArray(data) ? data : data.data || []);
            _context3.n = 4;
            break;
          case 3:
            _context3.p = 3;
            _t3 = _context3.v;
          case 4:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 3]]);
    }));
    return function loadImages(_x2) {
      return _ref7.apply(this, arguments);
    };
  }();
  var loadVariants = /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(pid) {
      var id, data, _t4;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            id = pid !== null && pid !== void 0 ? pid : effectiveId;
            if (id) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            setLoadingVariants(true);
            _context4.p = 2;
            _context4.n = 3;
            return latinaApi.admin.get("/products/".concat(id, "/variants"));
          case 3:
            data = _context4.v;
            setVariants(Array.isArray(data) ? data : data.data || []);
            _context4.n = 5;
            break;
          case 4:
            _context4.p = 4;
            _t4 = _context4.v;
          case 5:
            _context4.p = 5;
            setLoadingVariants(false);
            return _context4.f(5);
          case 6:
            return _context4.a(2);
        }
      }, _callee4, null, [[2, 4, 5, 6]]);
    }));
    return function loadVariants(_x3) {
      return _ref8.apply(this, arguments);
    };
  }();
  var saveVariant = /*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var id, res, _res, _t5;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            id = effectiveId;
            if (id) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            _context5.p = 1;
            if (!editingVariantId) {
              _context5.n = 3;
              break;
            }
            _context5.n = 2;
            return latinaApi.admin.put("/variants/".concat(editingVariantId), vForm);
          case 2:
            res = _context5.v;
            setVariants(function (vs) {
              return vs.map(function (v) {
                return v.id === editingVariantId ? res : v;
              });
            });
            setEditingVariantId(null);
            _context5.n = 5;
            break;
          case 3:
            _context5.n = 4;
            return latinaApi.admin.post("/products/".concat(id, "/variants"), vForm);
          case 4:
            _res = _context5.v;
            setVariants(function (vs) {
              return [].concat(_toConsumableArray(vs), [_res]);
            });
            setAddingVariant(false);
          case 5:
            setVForm(emptyVForm);
            toast("Variante enregistrée", "ok");
            _context5.n = 7;
            break;
          case 6:
            _context5.p = 6;
            _t5 = _context5.v;
            toast(_t5.message || "Erreur", "err");
          case 7:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 6]]);
    }));
    return function saveVariant() {
      return _ref9.apply(this, arguments);
    };
  }();
  var startEditVariant = function startEditVariant(v) {
    setEditingVariantId(v.id);
    setAddingVariant(false);
    setVForm({
      color: v.color || "",
      size: v.size || "",
      stock: v.stock,
      price_adjustment: v.price_adjustment || 0,
      is_active: v.is_active
    });
  };
  var deleteVariant = /*#__PURE__*/function () {
    var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(variantId) {
      var _t6;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.p = _context6.n) {
          case 0:
            if (confirm("Supprimer cette variante ?")) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            _context6.p = 1;
            _context6.n = 2;
            return latinaApi.admin["delete"]("/variants/".concat(variantId));
          case 2:
            setVariants(function (vs) {
              return vs.filter(function (v) {
                return v.id !== variantId;
              });
            });
            toast("Variante supprimée", "ok");
            _context6.n = 4;
            break;
          case 3:
            _context6.p = 3;
            _t6 = _context6.v;
            toast(_t6.message || "Erreur", "err");
          case 4:
            return _context6.a(2);
        }
      }, _callee6, null, [[1, 3]]);
    }));
    return function deleteVariant(_x4) {
      return _ref0.apply(this, arguments);
    };
  }();
  var save = /*#__PURE__*/function () {
    var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var payload, _res$data2, res, newId, _t7;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            setSaving(true);
            _context7.p = 1;
            payload = _objectSpread(_objectSpread({}, form), {}, {
              price: Number(form.price),
              compare_price: form.compare_price ? Number(form.compare_price) : null,
              stock: Number(form.stock),
              category_id: form.category_id ? Number(form.category_id) : null
            });
            if (product !== null && product !== void 0 && product.id) {
              _context7.n = 3;
              break;
            }
            _context7.n = 2;
            return latinaApi.admin.post("/products", payload);
          case 2:
            res = _context7.v;
            newId = res.id || ((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.id);
            setSavedProductId(newId);
            toast("Produit créé ! Ajoutez des images et variantes.", "ok");
            onSaved();
            if (newId) {
              setTab("images");
              loadImages(newId);
            } else onClose();
            _context7.n = 5;
            break;
          case 3:
            _context7.n = 4;
            return latinaApi.admin.put("/products/".concat(product.id), payload);
          case 4:
            toast("Produit enregistré", "ok");
            onSaved();
          case 5:
            _context7.n = 7;
            break;
          case 6:
            _context7.p = 6;
            _t7 = _context7.v;
            toast(_t7.message || "Erreur", "err");
          case 7:
            _context7.p = 7;
            setSaving(false);
            return _context7.f(7);
          case 8:
            return _context7.a(2);
        }
      }, _callee7, null, [[1, 6, 7, 8]]);
    }));
    return function save() {
      return _ref1.apply(this, arguments);
    };
  }();
  var uploadImage = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(file) {
      var fd, token, API_ROOT, res, data, _t8;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            if (effectiveId) {
              _context8.n = 1;
              break;
            }
            toast("Enregistrez d'abord le produit", "info");
            return _context8.a(2);
          case 1:
            setUploading(true);
            _context8.p = 2;
            fd = new FormData();
            fd.append("image", file);
            token = localStorage.getItem("latina-admin-token");
            API_ROOT = window.LATINA_API_BASE || "http://localhost:8000/api";
            _context8.n = 3;
            return fetch("".concat(API_ROOT, "/admin/products/").concat(effectiveId, "/media"), {
              method: "POST",
              headers: {
                "Authorization": "Bearer ".concat(token),
                "Accept": "application/json"
              },
              body: fd
            });
          case 3:
            res = _context8.v;
            _context8.n = 4;
            return res.json();
          case 4:
            data = _context8.v;
            if (res.ok) {
              _context8.n = 5;
              break;
            }
            throw new Error(data.message || "Erreur upload");
          case 5:
            toast("Image ajoutée", "ok");
            loadImages();
            _context8.n = 7;
            break;
          case 6:
            _context8.p = 6;
            _t8 = _context8.v;
            toast(_t8.message, "err");
          case 7:
            _context8.p = 7;
            setUploading(false);
            return _context8.f(7);
          case 8:
            return _context8.a(2);
        }
      }, _callee8, null, [[2, 6, 7, 8]]);
    }));
    return function uploadImage(_x5) {
      return _ref10.apply(this, arguments);
    };
  }();
  var deleteImage = /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(mediaId) {
      var _t9;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            if (confirm("Supprimer cette image ?")) {
              _context9.n = 1;
              break;
            }
            return _context9.a(2);
          case 1:
            _context9.p = 1;
            _context9.n = 2;
            return latinaApi.admin["delete"]("/media/".concat(mediaId));
          case 2:
            toast("Image supprimée", "ok");
            loadImages();
            _context9.n = 4;
            break;
          case 3:
            _context9.p = 3;
            _t9 = _context9.v;
            toast(_t9.message, "err");
          case 4:
            return _context9.a(2);
        }
      }, _callee9, null, [[1, 3]]);
    }));
    return function deleteImage(_x6) {
      return _ref11.apply(this, arguments);
    };
  }();
  var setPrimary = /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(mediaId) {
      var _t0;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.p = _context0.n) {
          case 0:
            _context0.p = 0;
            _context0.n = 1;
            return latinaApi.admin.post("/media/".concat(mediaId, "/primary"), {});
          case 1:
            toast("Image principale définie", "ok");
            loadImages();
            _context0.n = 3;
            break;
          case 2:
            _context0.p = 2;
            _t0 = _context0.v;
            toast(_t0.message, "err");
          case 3:
            return _context0.a(2);
        }
      }, _callee0, null, [[0, 2]]);
    }));
    return function setPrimary(_x7) {
      return _ref12.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal admin-modal-lg",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-modal-title"
  }, isNew ? "Nouveau produit" : "Modifier \u2014 ".concat((product === null || product === void 0 ? void 0 : product.name_fr) || form.name_fr)), !isNew && /*#__PURE__*/React.createElement("div", {
    className: "gap-row",
    style: {
      marginLeft: "auto",
      marginRight: 12
    }
  }, ["info", "images", "variantes"].map(function (tKey) {
    return /*#__PURE__*/React.createElement("button", {
      key: tKey,
      className: "btn btn-sm ".concat(tab === tKey ? "btn-rose" : "btn-ghost"),
      onClick: function onClick() {
        setTab(tKey);
        if (tKey === "variantes" && variants.length === 0) loadVariants();
      }
    }, tKey === "info" ? "📝 Infos" : tKey === "images" ? "\uD83D\uDDBC Images".concat(images.length > 0 ? " (".concat(images.length, ")") : "") : "\uD83C\uDFA8 Variantes".concat(variants.length > 0 ? " (".concat(variants.length, ")") : ""));
  })), /*#__PURE__*/React.createElement("button", {
    className: "admin-modal-close",
    onClick: onClose
  }, "\u2715")), tab === "info" && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "form-row form-row-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Nom (FR) *"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    value: form.name_fr,
    onChange: function onChange(e) {
      return set("name_fr", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Nom (AR)"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    value: form.name_ar,
    onChange: function onChange(e) {
      return set("name_ar", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Nom (EN)"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    value: form.name_en,
    onChange: function onChange(e) {
      return set("name_en", e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-row form-row-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Prix (DA) *"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "number",
    value: form.price,
    onChange: function onChange(e) {
      return set("price", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Prix barr\xE9 (DA)"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "number",
    value: form.compare_price,
    onChange: function onChange(e) {
      return set("compare_price", e.target.value);
    },
    placeholder: "Avant promo"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Stock *"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "number",
    value: form.stock,
    onChange: function onChange(e) {
      return set("stock", e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Description (FR)"), /*#__PURE__*/React.createElement("textarea", {
    className: "admin-textarea",
    rows: 3,
    value: form.description_fr,
    onChange: function onChange(e) {
      return set("description_fr", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Description (AR)"), /*#__PURE__*/React.createElement("textarea", {
    className: "admin-textarea",
    rows: 2,
    value: form.description_ar,
    onChange: function onChange(e) {
      return set("description_ar", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "gap-row",
    style: {
      flexWrap: "wrap",
      gap: 16,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      fontSize: 13,
      color: "var(--text-2)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: form.is_active,
    onChange: function onChange(e) {
      return set("is_active", e.target.checked);
    }
  }), "Produit actif"), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      cursor: "pointer",
      fontSize: 13,
      color: "var(--text-2)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: form.is_featured,
    onChange: function onChange(e) {
      return set("is_featured", e.target.checked);
    }
  }), "Mis en avant")), /*#__PURE__*/React.createElement("div", {
    className: "gap-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onClose
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose ml-auto",
    onClick: save,
    disabled: saving
  }, saving ? /*#__PURE__*/React.createElement("span", {
    className: "admin-spinner",
    style: {
      width: 14,
      height: 14
    }
  }) : isNew ? "Créer le produit" : "Enregistrer"))), tab === "variantes" && effectiveId && /*#__PURE__*/React.createElement("div", null, loadingVariants ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      padding: 32
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, variants.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Couleur"), /*#__PURE__*/React.createElement("th", null, "Taille"), /*#__PURE__*/React.createElement("th", null, "SKU"), /*#__PURE__*/React.createElement("th", {
    className: "t-right"
  }, "Stock"), /*#__PURE__*/React.createElement("th", {
    className: "t-right"
  }, "Ajust."), /*#__PURE__*/React.createElement("th", null, "\xC9tat"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, variants.map(function (v) {
    return editingVariantId === v.id ? /*#__PURE__*/React.createElement("tr", {
      key: v.id,
      style: {
        background: "var(--bg-2)"
      }
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("select", {
      className: "admin-input",
      style: {
        width: 110
      },
      value: vForm.color,
      onChange: function onChange(e) {
        return setV("color", e.target.value);
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "\u2014"), ["noir", "blanc", "beige", "nude", "rose", "marron", "camel", "khaki", "bleu", "or", "argent", "perles"].map(function (c) {
      return /*#__PURE__*/React.createElement("option", {
        key: c,
        value: c
      }, c);
    }))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      className: "admin-input",
      style: {
        width: 70
      },
      value: vForm.size,
      onChange: function onChange(e) {
        return setV("size", e.target.value);
      },
      placeholder: "36"
    })), /*#__PURE__*/React.createElement("td", {
      className: "t-mono",
      style: {
        fontSize: 11,
        color: "var(--text-3)"
      }
    }, v.sku), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      className: "admin-input t-num",
      type: "number",
      style: {
        width: 70
      },
      value: vForm.stock,
      min: 0,
      onChange: function onChange(e) {
        return setV("stock", Number(e.target.value));
      }
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      className: "admin-input t-num",
      type: "number",
      style: {
        width: 80
      },
      value: vForm.price_adjustment,
      onChange: function onChange(e) {
        return setV("price_adjustment", Number(e.target.value));
      }
    })), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        fontSize: 12
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: vForm.is_active,
      onChange: function onChange(e) {
        return setV("is_active", e.target.checked);
      }
    }), " Actif")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "gap-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-rose",
      onClick: saveVariant
    }, "\u2713"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-ghost",
      onClick: function onClick() {
        setEditingVariantId(null);
        setVForm(emptyVForm);
      }
    }, "\u2715")))) : /*#__PURE__*/React.createElement("tr", {
      key: v.id
    }, /*#__PURE__*/React.createElement("td", null, v.color ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: {
          "noir": "#1A1A1A",
          "blanc": "#FAFAFA",
          "beige": "#D4B896",
          "nude": "#E5C4AE",
          "rose": "#E8B4B8",
          "marron": "#6B3F2A",
          "camel": "#B07A4E",
          "khaki": "#7A7B53",
          "bleu": "#2E4B6F",
          "or": "#C9A267",
          "argent": "#C0C0C8",
          "perles": "#F2EAE0"
        }[v.color] || "#ddd",
        border: "1px solid rgba(0,0,0,.1)"
      }
    }), v.color) : "—"), /*#__PURE__*/React.createElement("td", {
      className: "t-mono"
    }, v.size || "—"), /*#__PURE__*/React.createElement("td", {
      className: "t-mono",
      style: {
        fontSize: 10,
        color: "var(--text-3)"
      }
    }, v.sku), /*#__PURE__*/React.createElement("td", {
      className: "t-right t-num"
    }, /*#__PURE__*/React.createElement("span", {
      className: "stock-chip ".concat(v.stock === 0 ? "out" : v.stock <= 4 ? "low" : "good")
    }, v.stock)), /*#__PURE__*/React.createElement("td", {
      className: "t-right t-num",
      style: {
        fontSize: 12
      }
    }, v.price_adjustment > 0 ? "+".concat(v.price_adjustment) : v.price_adjustment || 0, " DA"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "badge ".concat(v.is_active ? "badge-active" : "badge-inactive")
    }, v.is_active ? "Actif" : "Inactif")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "gap-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: function onClick() {
        return startEditVariant(v);
      }
    }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-danger btn-sm",
      onClick: function onClick() {
        return deleteVariant(v.id);
      }
    }, "\uD83D\uDDD1"))));
  })))), addingVariant ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--bg-2)",
      padding: 16,
      borderRadius: 8,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      marginBottom: 12,
      color: "var(--text-1)"
    }
  }, "Nouvelle variante"), /*#__PURE__*/React.createElement("div", {
    className: "form-row form-row-3",
    style: {
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Couleur"), /*#__PURE__*/React.createElement("select", {
    className: "admin-input",
    value: vForm.color,
    onChange: function onChange(e) {
      return setV("color", e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "\u2014 Aucune \u2014"), ["noir", "blanc", "beige", "nude", "rose", "marron", "camel", "khaki", "bleu", "or", "argent", "perles"].map(function (c) {
    return /*#__PURE__*/React.createElement("option", {
      key: c,
      value: c
    }, c);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Taille"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    value: vForm.size,
    onChange: function onChange(e) {
      return setV("size", e.target.value);
    },
    placeholder: "36, 37, M, L\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Stock *"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input t-num",
    type: "number",
    min: 0,
    value: vForm.stock,
    onChange: function onChange(e) {
      return setV("stock", Number(e.target.value));
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Ajust. Prix (DA)"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input t-num",
    type: "number",
    value: vForm.price_adjustment,
    onChange: function onChange(e) {
      return setV("price_adjustment", Number(e.target.value));
    },
    placeholder: "0"
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field",
    style: {
      justifyContent: "flex-end",
      display: "flex",
      alignItems: "flex-end"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      cursor: "pointer",
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: vForm.is_active,
    onChange: function onChange(e) {
      return setV("is_active", e.target.checked);
    }
  }), " Actif"))), /*#__PURE__*/React.createElement("div", {
    className: "gap-row",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: function onClick() {
      setAddingVariant(false);
      setVForm(emptyVForm);
    }
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose btn-sm",
    onClick: saveVariant
  }, "Cr\xE9er la variante"))) : /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    style: {
      fontSize: 13
    },
    onClick: function onClick() {
      setAddingVariant(true);
      setEditingVariantId(null);
      setVForm(emptyVForm);
    }
  }, "+ Ajouter une variante"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "var(--text-3)",
      marginTop: 12
    }
  }, "Chaque ligne = une combinaison couleur + taille avec son propre stock. Laissez vide si non applicable."))), tab === "images" && effectiveId && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "product-images-grid"
  }, images.map(function (img) {
    return /*#__PURE__*/React.createElement("div", {
      key: img.id,
      className: "product-img-item ".concat(img.is_primary ? "is-primary" : "")
    }, /*#__PURE__*/React.createElement("img", {
      src: img.url,
      alt: img.alt_fr || ""
    }), img.is_primary && /*#__PURE__*/React.createElement("span", {
      className: "img-primary-badge"
    }, "Principale"), /*#__PURE__*/React.createElement("div", {
      className: "img-actions"
    }, !img.is_primary && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-ghost",
      onClick: function onClick() {
        return setPrimary(img.id);
      },
      title: "D\xE9finir comme principale"
    }, "\u2B50"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm btn-danger",
      onClick: function onClick() {
        return deleteImage(img.id);
      },
      title: "Supprimer"
    }, "\uD83D\uDDD1")));
  }), /*#__PURE__*/React.createElement("div", {
    className: "product-img-upload",
    onClick: function onClick() {
      var _fileRef$current;
      return (_fileRef$current = fileRef.current) === null || _fileRef$current === void 0 ? void 0 : _fileRef$current.click();
    },
    style: {
      opacity: uploading ? 0.5 : 1,
      cursor: uploading ? "wait" : "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    accept: "image/jpeg,image/png,image/webp",
    style: {
      display: "none"
    },
    onChange: function onChange(e) {
      if (e.target.files[0]) uploadImage(e.target.files[0]);
      e.target.value = "";
    }
  }), uploading ? /*#__PURE__*/React.createElement("span", {
    className: "admin-spinner"
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 32
    }
  }, "+"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-3)",
      marginTop: 4
    }
  }, "Ajouter une image"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 11,
      color: "var(--text-3)",
      marginTop: 8
    }
  }, "JPEG, PNG ou WebP \xB7 Max 8 Mo \xB7 Organis\xE9 dans /public/products/"))));
};
var Products = function Products() {
  var _useTable = useTable("/products"),
    rows = _useTable.rows,
    loading = _useTable.loading,
    search = _useTable.search,
    doSearch = _useTable.doSearch,
    reload = _useTable.reload;
  var _useState45 = useState(null),
    _useState46 = _slicedToArray(_useState45, 2),
    modal = _useState46[0],
    setModal = _useState46[1]; // null | "new" | product
  var toast = useToast();
  var deleteProduct = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(id) {
      var _t1;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.p = _context1.n) {
          case 0:
            if (confirm("Supprimer ce produit ?")) {
              _context1.n = 1;
              break;
            }
            return _context1.a(2);
          case 1:
            _context1.p = 1;
            _context1.n = 2;
            return latinaApi.admin["delete"]("/products/".concat(id));
          case 2:
            toast("Produit supprimé", "ok");
            reload();
            _context1.n = 4;
            break;
          case 3:
            _context1.p = 3;
            _t1 = _context1.v;
            toast(_t1.message, "err");
          case 4:
            return _context1.a(2);
        }
      }, _callee1, null, [[1, 3]]);
    }));
    return function deleteProduct(_x8) {
      return _ref13.apply(this, arguments);
    };
  }();
  var adjustStock = /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(product) {
      var newStock, n, _t10;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.p = _context10.n) {
          case 0:
            newStock = prompt("Stock actuel: ".concat(product.stock, "\nNouveau stock pour \"").concat(product.name_fr, "\":"), String(product.stock));
            if (!(newStock === null || newStock === "")) {
              _context10.n = 1;
              break;
            }
            return _context10.a(2);
          case 1:
            n = parseInt(newStock, 10);
            if (!(isNaN(n) || n < 0)) {
              _context10.n = 2;
              break;
            }
            toast("Valeur invalide", "err");
            return _context10.a(2);
          case 2:
            _context10.p = 2;
            _context10.n = 3;
            return latinaApi.admin.post("/products/".concat(product.id, "/stock"), {
              new_stock: n,
              note: "Ajustement admin"
            });
          case 3:
            toast("Stock mis à jour", "ok");
            reload();
            _context10.n = 5;
            break;
          case 4:
            _context10.p = 4;
            _t10 = _context10.v;
            toast(_t10.message, "err");
          case 5:
            return _context10.a(2);
        }
      }, _callee10, null, [[2, 4]]);
    }));
    return function adjustStock(_x9) {
      return _ref14.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-search"
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-search-icon"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Rechercher un produit\u2026",
    value: search,
    onChange: function onChange(e) {
      return doSearch(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose",
    onClick: function onClick() {
      return setModal("new");
    }
  }, "+ Nouveau produit")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Produit"), /*#__PURE__*/React.createElement("th", null, "SKU"), /*#__PURE__*/React.createElement("th", null, "Prix"), /*#__PURE__*/React.createElement("th", null, "Stock"), /*#__PURE__*/React.createElement("th", null, "Statut"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (p) {
    var _p$category;
    return /*#__PURE__*/React.createElement("tr", {
      key: p.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "t-name"
    }, p.name_fr), /*#__PURE__*/React.createElement("div", {
      className: "text-mute",
      style: {
        fontSize: 11
      }
    }, (_p$category = p.category) === null || _p$category === void 0 ? void 0 : _p$category.name_fr)), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, p.sku), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, p.sale_price ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "text-rose"
    }, Number(p.sale_price).toLocaleString()), " ", /*#__PURE__*/React.createElement("span", {
      className: "text-mute",
      style: {
        textDecoration: "line-through",
        fontSize: 11
      }
    }, Number(p.price).toLocaleString())) : "".concat(Number(p.price).toLocaleString(), " DA")), /*#__PURE__*/React.createElement("td", {
      className: "mono ".concat(p.stock === 0 ? "text-red" : p.stock < 5 ? "text-yellow" : "text-green")
    }, p.stock), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "badge ".concat(p.is_active ? "badge-active" : "badge-inactive")
    }, p.is_active ? "Actif" : "Inactif")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "gap-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: function onClick() {
        return setModal(p);
      }
    }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: function onClick() {
        return adjustStock(p);
      }
    }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-danger btn-sm",
      onClick: function onClick() {
        return deleteProduct(p.id);
      }
    }, "\uD83D\uDDD1"))));
  }))))), modal && /*#__PURE__*/React.createElement(ProductModal, {
    product: modal === "new" ? null : modal,
    onClose: function onClose() {
      return setModal(null);
    },
    onSaved: reload
  }));
};

/* ============================================================
   CATEGORIES
   ============================================================ */
var Categories = function Categories() {
  var _useTable2 = useTable("/categories"),
    rows = _useTable2.rows,
    loading = _useTable2.loading,
    reload = _useTable2.reload;
  var _useState47 = useState(null),
    _useState48 = _slicedToArray(_useState47, 2),
    modal = _useState48[0],
    setModal = _useState48[1];
  var toast = useToast();
  var _useState49 = useState({
      name_fr: "",
      name_ar: "",
      name_en: "",
      slug: ""
    }),
    _useState50 = _slicedToArray(_useState49, 2),
    form = _useState50[0],
    setForm = _useState50[1];
  var _useState51 = useState(false),
    _useState52 = _slicedToArray(_useState51, 2),
    saving = _useState52[0],
    setSaving = _useState52[1];
  var openNew = function openNew() {
    setForm({
      name_fr: "",
      name_ar: "",
      name_en: "",
      slug: ""
    });
    setModal("form");
  };
  var openEdit = function openEdit(c) {
    setForm({
      name_fr: c.name_fr,
      name_ar: c.name_ar,
      name_en: c.name_en || "",
      slug: c.slug
    });
    setModal(c);
  };
  var save = /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
      var _t11;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            setSaving(true);
            _context11.p = 1;
            if (!(modal === "form")) {
              _context11.n = 3;
              break;
            }
            _context11.n = 2;
            return latinaApi.admin.post("/categories", form);
          case 2:
            _context11.n = 4;
            break;
          case 3:
            _context11.n = 4;
            return latinaApi.admin.put("/categories/".concat(modal.id), form);
          case 4:
            toast("Catégorie enregistrée", "ok");
            reload();
            setModal(null);
            _context11.n = 6;
            break;
          case 5:
            _context11.p = 5;
            _t11 = _context11.v;
            toast(_t11.message, "err");
          case 6:
            _context11.p = 6;
            setSaving(false);
            return _context11.f(6);
          case 7:
            return _context11.a(2);
        }
      }, _callee11, null, [[1, 5, 6, 7]]);
    }));
    return function save() {
      return _ref15.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose ml-auto",
    onClick: openNew
  }, "+ Nouvelle cat\xE9gorie")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Nom (FR)"), /*#__PURE__*/React.createElement("th", null, "Nom (AR)"), /*#__PURE__*/React.createElement("th", null, "Slug"), /*#__PURE__*/React.createElement("th", null, "Produits"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (c) {
    var _c$products_count;
    return /*#__PURE__*/React.createElement("tr", {
      key: c.id
    }, /*#__PURE__*/React.createElement("td", {
      className: "t-name"
    }, c.name_fr), /*#__PURE__*/React.createElement("td", null, c.name_ar), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, c.slug), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, (_c$products_count = c.products_count) !== null && _c$products_count !== void 0 ? _c$products_count : "—"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: function onClick() {
        return openEdit(c);
      }
    }, "\u270F\uFE0F")));
  }))))), modal && /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-overlay",
    onClick: function onClick() {
      return setModal(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal admin-modal-sm",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-modal-title"
  }, modal === "form" ? "Nouvelle catégorie" : "Modifier catégorie"), /*#__PURE__*/React.createElement("button", {
    className: "admin-modal-close",
    onClick: function onClick() {
      return setModal(null);
    }
  }, "\u2715")), ["name_fr", "name_ar", "name_en", "slug"].map(function (k) {
    return /*#__PURE__*/React.createElement("div", {
      key: k,
      className: "form-field mb-4"
    }, /*#__PURE__*/React.createElement("label", {
      className: "form-label"
    }, k.replace("_", " ").toUpperCase()), /*#__PURE__*/React.createElement("input", {
      className: "admin-input",
      value: form[k],
      onChange: function onChange(e) {
        return setForm(function (f) {
          return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, e.target.value));
        });
      }
    }));
  }), /*#__PURE__*/React.createElement("div", {
    className: "gap-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost ml-auto",
    onClick: function onClick() {
      return setModal(null);
    }
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose",
    onClick: save,
    disabled: saving
  }, "Enregistrer")))));
};

/* ============================================================
   ORDERS
   ============================================================ */
var ORDER_STATUSES = ["pending", "confirmed", "preparing", "shipped", "out_for_delivery", "delivered", "rto", "cancelled", "refunded"];
var TRANSITIONS = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["preparing", "cancelled"],
  preparing: ["shipped"],
  shipped: ["out_for_delivery"],
  out_for_delivery: ["delivered", "rto"]
};
var OrderDetail = function OrderDetail(_ref16) {
  var _order$wilaya;
  var order = _ref16.order,
    onClose = _ref16.onClose,
    onUpdated = _ref16.onUpdated;
  var toast = useToast();
  var _useState53 = useState(false),
    _useState54 = _slicedToArray(_useState53, 2),
    transitioning = _useState54[0],
    setTransitioning = _useState54[1];
  var doTransition = /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(status) {
      var _t12;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.p = _context12.n) {
          case 0:
            if (confirm("Passer la commande en \"".concat(status, "\" ?"))) {
              _context12.n = 1;
              break;
            }
            return _context12.a(2);
          case 1:
            setTransitioning(true);
            _context12.p = 2;
            _context12.n = 3;
            return latinaApi.admin.post("/orders/".concat(order.id, "/status"), {
              status: status
            });
          case 3:
            toast("Statut \u2192 ".concat(status), "ok");
            onUpdated();
            onClose();
            _context12.n = 5;
            break;
          case 4:
            _context12.p = 4;
            _t12 = _context12.v;
            toast(_t12.message, "err");
          case 5:
            _context12.p = 5;
            setTransitioning(false);
            return _context12.f(5);
          case 6:
            return _context12.a(2);
        }
      }, _callee12, null, [[2, 4, 5, 6]]);
    }));
    return function doTransition(_x0) {
      return _ref17.apply(this, arguments);
    };
  }();
  var allowed = TRANSITIONS[order.status] || [];
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal admin-modal-md",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-title"
  }, "Commande ", order.reference), /*#__PURE__*/React.createElement("div", {
    className: "text-mute",
    style: {
      fontSize: 12,
      marginTop: 4
    }
  }, new Date(order.created_at).toLocaleString("fr-DZ"))), /*#__PURE__*/React.createElement("button", {
    className: "admin-modal-close",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "grid-2 mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "Client"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("div", null, order.recipient_name), /*#__PURE__*/React.createElement("div", {
    className: "mono text-mute"
  }, order.recipient_phone))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "Livraison"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4
    }
  }, ((_order$wilaya = order.wilaya) === null || _order$wilaya === void 0 ? void 0 : _order$wilaya.name_fr) || order.wilaya_code, order.commune && " \u2014 ".concat(order.commune.name_fr)), order.street_address && /*#__PURE__*/React.createElement("div", {
    className: "text-mute",
    style: {
      fontSize: 12
    }
  }, order.street_address))), /*#__PURE__*/React.createElement("table", {
    className: "admin-table mb-4"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Produit"), /*#__PURE__*/React.createElement("th", null, "Variante"), /*#__PURE__*/React.createElement("th", null, "Qt\xE9"), /*#__PURE__*/React.createElement("th", null, "Prix unit."), /*#__PURE__*/React.createElement("th", null, "Total"))), /*#__PURE__*/React.createElement("tbody", null, (order.lines || []).map(function (l, i) {
    return /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", {
      className: "t-name"
    }, l.product_name), /*#__PURE__*/React.createElement("td", {
      className: "text-mute"
    }, l.variant_label || "—"), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, l.qty), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, Number(l.unit_price).toLocaleString(), " DA"), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, Number(l.line_total).toLocaleString(), " DA"));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "Frais livraison"), /*#__PURE__*/React.createElement("div", {
    className: "mono"
  }, Number(order.shipping_fee || 0).toLocaleString(), " DA")), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "Total"), /*#__PURE__*/React.createElement("div", {
    className: "mono text-rose",
    style: {
      fontSize: 16,
      fontWeight: 600
    }
  }, Number(order.total).toLocaleString(), " DA"))), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "Statut actuel"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "badge badge-".concat(order.status)
  }, order.status))), allowed.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-label"
  }, "Transition"), /*#__PURE__*/React.createElement("div", {
    className: "gap-row",
    style: {
      marginTop: 6,
      flexWrap: "wrap"
    }
  }, allowed.map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s,
      className: "btn btn-ghost btn-sm",
      onClick: function onClick() {
        return doTransition(s);
      },
      disabled: transitioning
    }, "\u2192 ", s);
  })))));
};
var Orders = function Orders() {
  var _useTable3 = useTable("/orders"),
    rows = _useTable3.rows,
    loading = _useTable3.loading,
    search = _useTable3.search,
    doSearch = _useTable3.doSearch,
    reload = _useTable3.reload;
  var _useState55 = useState(null),
    _useState56 = _slicedToArray(_useState55, 2),
    detail = _useState56[0],
    setDetail = _useState56[1];
  var _useState57 = useState(""),
    _useState58 = _slicedToArray(_useState57, 2),
    statusFilter = _useState58[0],
    setStatusFilter = _useState58[1];
  var filtered = statusFilter ? rows.filter(function (o) {
    return o.status === statusFilter;
  }) : rows;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-search",
    style: {
      maxWidth: 280
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-search-icon"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    placeholder: "R\xE9f., nom client\u2026",
    value: search,
    onChange: function onChange(e) {
      return doSearch(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("select", {
    className: "admin-select",
    value: statusFilter,
    onChange: function onChange(e) {
      return setStatusFilter(e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Tous statuts"), ORDER_STATUSES.map(function (s) {
    return /*#__PURE__*/React.createElement("option", {
      key: s,
      value: s
    }, s);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "R\xE9f."), /*#__PURE__*/React.createElement("th", null, "Client"), /*#__PURE__*/React.createElement("th", null, "Wilaya"), /*#__PURE__*/React.createElement("th", null, "Total"), /*#__PURE__*/React.createElement("th", null, "Statut"), /*#__PURE__*/React.createElement("th", null, "Date"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, filtered.map(function (o) {
    var _o$wilaya2;
    return /*#__PURE__*/React.createElement("tr", {
      key: o.id,
      style: {
        cursor: "pointer"
      },
      onClick: function onClick() {
        return setDetail(o);
      }
    }, /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, o.reference), /*#__PURE__*/React.createElement("td", {
      className: "t-name"
    }, o.recipient_name), /*#__PURE__*/React.createElement("td", null, ((_o$wilaya2 = o.wilaya) === null || _o$wilaya2 === void 0 ? void 0 : _o$wilaya2.name_fr) || o.wilaya_code), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, Number(o.total).toLocaleString(), " DA"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "badge badge-".concat(o.status)
    }, o.status)), /*#__PURE__*/React.createElement("td", {
      className: "text-mute"
    }, new Date(o.created_at).toLocaleDateString("fr-DZ")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: function onClick(e) {
        e.stopPropagation();
        setDetail(o);
      }
    }, "D\xE9tail")));
  }))))), detail && /*#__PURE__*/React.createElement(OrderDetail, {
    order: detail,
    onClose: function onClose() {
      return setDetail(null);
    },
    onUpdated: reload
  }));
};

/* ============================================================
   CUSTOMERS
   ============================================================ */
var Customers = function Customers() {
  var _useTable4 = useTable("/customers"),
    rows = _useTable4.rows,
    loading = _useTable4.loading,
    search = _useTable4.search,
    doSearch = _useTable4.doSearch,
    reload = _useTable4.reload;
  var _useState59 = useState(null),
    _useState60 = _slicedToArray(_useState59, 2),
    selected = _useState60[0],
    setSelected = _useState60[1];
  var toast = useToast();
  var toggleBlock = /*#__PURE__*/function () {
    var _ref18 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(customer) {
      var _t13;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.p = _context13.n) {
          case 0:
            _context13.p = 0;
            _context13.n = 1;
            return latinaApi.admin.post("/customers/".concat(customer.id, "/block"), {
              is_active: !customer.is_active
            });
          case 1:
            toast("Client ".concat(customer.is_active ? "bloqué" : "débloqué"), "ok");
            reload();
            _context13.n = 3;
            break;
          case 2:
            _context13.p = 2;
            _t13 = _context13.v;
            toast(_t13.message, "err");
          case 3:
            return _context13.a(2);
        }
      }, _callee13, null, [[0, 2]]);
    }));
    return function toggleBlock(_x1) {
      return _ref18.apply(this, arguments);
    };
  }();
  var adjustLoyalty = /*#__PURE__*/function () {
    var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(customer) {
      var delta, _t14;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.p = _context14.n) {
          case 0:
            delta = prompt("Ajuster points fid\xE9lit\xE9 de \"".concat(customer.name, "\"\nActuel: ").concat(customer.loyalty_points, " pts\nVariation (+100, -50) :"), "");
            if (delta) {
              _context14.n = 1;
              break;
            }
            return _context14.a(2);
          case 1:
            _context14.p = 1;
            _context14.n = 2;
            return latinaApi.admin.post("/customers/".concat(customer.id, "/loyalty"), {
              delta: Number(delta),
              reason: "Ajustement admin"
            });
          case 2:
            toast("Points mis à jour", "ok");
            reload();
            _context14.n = 4;
            break;
          case 3:
            _context14.p = 3;
            _t14 = _context14.v;
            toast(_t14.message, "err");
          case 4:
            return _context14.a(2);
        }
      }, _callee14, null, [[1, 3]]);
    }));
    return function adjustLoyalty(_x10) {
      return _ref19.apply(this, arguments);
    };
  }();
  var TIER_COLORS = {
    petal: "var(--rose)",
    lotus: "var(--purple)",
    amber: "var(--yellow)"
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-search"
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-search-icon"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Nom, t\xE9l\xE9phone, email\u2026",
    value: search,
    onChange: function onChange(e) {
      return doSearch(e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Client"), /*#__PURE__*/React.createElement("th", null, "T\xE9l\xE9phone"), /*#__PURE__*/React.createElement("th", null, "Tier"), /*#__PURE__*/React.createElement("th", null, "Points"), /*#__PURE__*/React.createElement("th", null, "Commandes"), /*#__PURE__*/React.createElement("th", null, "Statut"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (c) {
    var _c$orders_count;
    return /*#__PURE__*/React.createElement("tr", {
      key: c.id
    }, /*#__PURE__*/React.createElement("td", {
      className: "t-name"
    }, c.name), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, c.phone), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      style: {
        color: TIER_COLORS[c.loyalty_tier] || "var(--text-2)",
        fontWeight: 500
      }
    }, c.loyalty_tier)), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, c.loyalty_points), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, (_c$orders_count = c.orders_count) !== null && _c$orders_count !== void 0 ? _c$orders_count : "—"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "badge ".concat(c.is_active ? "badge-active" : "badge-inactive")
    }, c.is_active ? "Actif" : "Bloqué")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "gap-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: function onClick() {
        return adjustLoyalty(c);
      }
    }, "\uD83C\uDF81"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-sm ".concat(c.is_active ? "btn-danger" : "btn-ghost"),
      onClick: function onClick() {
        return toggleBlock(c);
      }
    }, c.is_active ? "Bloquer" : "Débloquer"))));
  }))))));
};

/* ============================================================
   COUPONS
   ============================================================ */
var CouponModal = function CouponModal(_ref20) {
  var _coupon$expires_at, _coupon$is_active;
  var coupon = _ref20.coupon,
    onClose = _ref20.onClose,
    onSaved = _ref20.onSaved;
  var toast = useToast();
  var isNew = !(coupon !== null && coupon !== void 0 && coupon.id);
  var _useState61 = useState({
      code: (coupon === null || coupon === void 0 ? void 0 : coupon.code) || "",
      type: (coupon === null || coupon === void 0 ? void 0 : coupon.type) || "percent",
      value: (coupon === null || coupon === void 0 ? void 0 : coupon.value) || "",
      min_order: (coupon === null || coupon === void 0 ? void 0 : coupon.min_order) || "",
      max_uses: (coupon === null || coupon === void 0 ? void 0 : coupon.max_uses) || "",
      expires_at: (coupon === null || coupon === void 0 || (_coupon$expires_at = coupon.expires_at) === null || _coupon$expires_at === void 0 ? void 0 : _coupon$expires_at.split("T")[0]) || "",
      is_active: (_coupon$is_active = coupon === null || coupon === void 0 ? void 0 : coupon.is_active) !== null && _coupon$is_active !== void 0 ? _coupon$is_active : true
    }),
    _useState62 = _slicedToArray(_useState61, 2),
    form = _useState62[0],
    setForm = _useState62[1];
  var _useState63 = useState(false),
    _useState64 = _slicedToArray(_useState63, 2),
    saving = _useState64[0],
    setSaving = _useState64[1];
  var set = function set(k, v) {
    return setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, v));
    });
  };
  var save = /*#__PURE__*/function () {
    var _ref21 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
      var _t15;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.p = _context15.n) {
          case 0:
            setSaving(true);
            _context15.p = 1;
            if (!isNew) {
              _context15.n = 3;
              break;
            }
            _context15.n = 2;
            return latinaApi.admin.post("/coupons", form);
          case 2:
            _context15.n = 4;
            break;
          case 3:
            _context15.n = 4;
            return latinaApi.admin.put("/coupons/".concat(coupon.id), form);
          case 4:
            toast("Coupon enregistré", "ok");
            onSaved();
            onClose();
            _context15.n = 6;
            break;
          case 5:
            _context15.p = 5;
            _t15 = _context15.v;
            toast(_t15.message, "err");
          case 6:
            _context15.p = 6;
            setSaving(false);
            return _context15.f(6);
          case 7:
            return _context15.a(2);
        }
      }, _callee15, null, [[1, 5, 6, 7]]);
    }));
    return function save() {
      return _ref21.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-overlay",
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal admin-modal-sm",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-modal-title"
  }, isNew ? "Nouveau coupon" : "Modifier \u2014 ".concat(coupon.code)), /*#__PURE__*/React.createElement("button", {
    className: "admin-modal-close",
    onClick: onClose
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Code"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    value: form.code,
    onChange: function onChange(e) {
      return set("code", e.target.value.toUpperCase());
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row form-row-2 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Type"), /*#__PURE__*/React.createElement("select", {
    className: "admin-select w-full",
    value: form.type,
    onChange: function onChange(e) {
      return set("type", e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "percent"
  }, "Pourcentage (%)"), /*#__PURE__*/React.createElement("option", {
    value: "fixed"
  }, "Montant fixe (DA)"), /*#__PURE__*/React.createElement("option", {
    value: "free_shipping"
  }, "Livraison gratuite"))), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Valeur ", form.type === "percent" ? "(%)" : "(DA)"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "number",
    value: form.value,
    onChange: function onChange(e) {
      return set("value", e.target.value);
    },
    disabled: form.type === "free_shipping"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-row form-row-2 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Min commande (DA)"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "number",
    value: form.min_order,
    onChange: function onChange(e) {
      return set("min_order", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Utilisations max"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "number",
    value: form.max_uses,
    onChange: function onChange(e) {
      return set("max_uses", e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Expire le"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "date",
    value: form.expires_at,
    onChange: function onChange(e) {
      return set("expires_at", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "gap-row"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 8,
      cursor: "pointer",
      fontSize: 13,
      color: "var(--text-2)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: form.is_active,
    onChange: function onChange(e) {
      return set("is_active", e.target.checked);
    }
  }), " Actif"), /*#__PURE__*/React.createElement("div", {
    className: "ml-auto gap-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost",
    onClick: onClose
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose",
    onClick: save,
    disabled: saving
  }, "Enregistrer")))));
};
var Coupons = function Coupons() {
  var _useTable5 = useTable("/coupons"),
    rows = _useTable5.rows,
    loading = _useTable5.loading,
    reload = _useTable5.reload;
  var _useState65 = useState(null),
    _useState66 = _slicedToArray(_useState65, 2),
    modal = _useState66[0],
    setModal = _useState66[1];
  var toast = useToast();
  var del = /*#__PURE__*/function () {
    var _ref22 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(id) {
      var _t16;
      return _regenerator().w(function (_context16) {
        while (1) switch (_context16.p = _context16.n) {
          case 0:
            if (confirm("Désactiver ce coupon ?")) {
              _context16.n = 1;
              break;
            }
            return _context16.a(2);
          case 1:
            _context16.p = 1;
            _context16.n = 2;
            return latinaApi.admin.put("/coupons/".concat(id), {
              is_active: false
            });
          case 2:
            toast("Coupon désactivé", "ok");
            reload();
            _context16.n = 4;
            break;
          case 3:
            _context16.p = 3;
            _t16 = _context16.v;
            toast(_t16.message, "err");
          case 4:
            return _context16.a(2);
        }
      }, _callee16, null, [[1, 3]]);
    }));
    return function del(_x11) {
      return _ref22.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose ml-auto",
    onClick: function onClick() {
      return setModal("new");
    }
  }, "+ Nouveau coupon")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Code"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "Valeur"), /*#__PURE__*/React.createElement("th", null, "Utilisations"), /*#__PURE__*/React.createElement("th", null, "Expire"), /*#__PURE__*/React.createElement("th", null, "Statut"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (c) {
    var _c$uses;
    return /*#__PURE__*/React.createElement("tr", {
      key: c.id
    }, /*#__PURE__*/React.createElement("td", {
      className: "mono text-rose"
    }, c.code), /*#__PURE__*/React.createElement("td", null, c.type), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, c.type === "free_shipping" ? "—" : c.type === "percent" ? "".concat(c.value, "%") : "".concat(Number(c.value).toLocaleString(), " DA")), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, (_c$uses = c.uses) !== null && _c$uses !== void 0 ? _c$uses : 0, c.max_uses ? "/".concat(c.max_uses) : ""), /*#__PURE__*/React.createElement("td", {
      className: "text-mute"
    }, c.expires_at ? new Date(c.expires_at).toLocaleDateString("fr-DZ") : "∞"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "badge ".concat(c.is_active ? "badge-active" : "badge-inactive")
    }, c.is_active ? "Actif" : "Inactif")), /*#__PURE__*/React.createElement("td", {
      className: "gap-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: function onClick() {
        return setModal(c);
      }
    }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
      className: "btn btn-danger btn-sm",
      onClick: function onClick() {
        return del(c.id);
      }
    }, "\uD83D\uDDD1")));
  }))))), modal && /*#__PURE__*/React.createElement(CouponModal, {
    coupon: modal === "new" ? null : modal,
    onClose: function onClose() {
      return setModal(null);
    },
    onSaved: reload
  }));
};

/* ============================================================
   FLASH SALES
   ============================================================ */
var FlashSales = function FlashSales() {
  var _useTable6 = useTable("/flash-sales"),
    rows = _useTable6.rows,
    loading = _useTable6.loading,
    reload = _useTable6.reload;
  var _useState67 = useState(null),
    _useState68 = _slicedToArray(_useState67, 2),
    modal = _useState68[0],
    setModal = _useState68[1];
  var toast = useToast();
  var _useState69 = useState({
      title_fr: "",
      discount_pct: "",
      starts_at: "",
      ends_at: ""
    }),
    _useState70 = _slicedToArray(_useState69, 2),
    form = _useState70[0],
    setForm = _useState70[1];
  var set = function set(k, v) {
    return setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, v));
    });
  };
  var save = /*#__PURE__*/function () {
    var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
      var _t17;
      return _regenerator().w(function (_context17) {
        while (1) switch (_context17.p = _context17.n) {
          case 0:
            _context17.p = 0;
            _context17.n = 1;
            return latinaApi.admin.post("/flash-sales", form);
          case 1:
            toast("Flash sale enregistrée", "ok");
            reload();
            setModal(null);
            _context17.n = 3;
            break;
          case 2:
            _context17.p = 2;
            _t17 = _context17.v;
            toast(_t17.message, "err");
          case 3:
            return _context17.a(2);
        }
      }, _callee17, null, [[0, 2]]);
    }));
    return function save() {
      return _ref23.apply(this, arguments);
    };
  }();
  var openEdit = function openEdit(fs) {
    var _fs$starts_at, _fs$ends_at;
    setForm({
      title_fr: fs.title_fr,
      discount_pct: fs.discount_pct,
      starts_at: ((_fs$starts_at = fs.starts_at) === null || _fs$starts_at === void 0 ? void 0 : _fs$starts_at.split("T")[0]) || "",
      ends_at: ((_fs$ends_at = fs.ends_at) === null || _fs$ends_at === void 0 ? void 0 : _fs$ends_at.split("T")[0]) || ""
    });
    setModal(fs);
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose ml-auto",
    onClick: function onClick() {
      setForm({
        title_fr: "",
        discount_pct: "",
        starts_at: "",
        ends_at: ""
      });
      setModal({});
    }
  }, "+ Nouvelle flash sale")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Titre"), /*#__PURE__*/React.createElement("th", null, "R\xE9duction"), /*#__PURE__*/React.createElement("th", null, "D\xE9but"), /*#__PURE__*/React.createElement("th", null, "Fin"), /*#__PURE__*/React.createElement("th", null, "Statut"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (fs) {
    var now = new Date();
    var s = fs.starts_at ? new Date(fs.starts_at) : null;
    var e = fs.ends_at ? new Date(fs.ends_at) : null;
    var active = s && e && now >= s && now <= e;
    return /*#__PURE__*/React.createElement("tr", {
      key: fs.id
    }, /*#__PURE__*/React.createElement("td", {
      className: "t-name"
    }, fs.title_fr), /*#__PURE__*/React.createElement("td", {
      className: "mono text-rose"
    }, fs.discount_pct, "%"), /*#__PURE__*/React.createElement("td", {
      className: "text-mute"
    }, s === null || s === void 0 ? void 0 : s.toLocaleDateString("fr-DZ")), /*#__PURE__*/React.createElement("td", {
      className: "text-mute"
    }, e === null || e === void 0 ? void 0 : e.toLocaleDateString("fr-DZ")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "badge ".concat(active ? "badge-active" : "badge-inactive")
    }, active ? "Active" : "Inactive")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: function onClick() {
        return openEdit(fs);
      }
    }, "\u270F\uFE0F")));
  }))))), modal !== null && /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-overlay",
    onClick: function onClick() {
      return setModal(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal admin-modal-sm",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-modal-title"
  }, modal !== null && modal !== void 0 && modal.id ? "Modifier flash sale" : "Nouvelle flash sale"), /*#__PURE__*/React.createElement("button", {
    className: "admin-modal-close",
    onClick: function onClick() {
      return setModal(null);
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Titre (FR)"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    value: form.title_fr,
    onChange: function onChange(e) {
      return set("title_fr", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "R\xE9duction (%)"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "number",
    value: form.discount_pct,
    onChange: function onChange(e) {
      return set("discount_pct", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row form-row-2 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "D\xE9but"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "datetime-local",
    value: form.starts_at,
    onChange: function onChange(e) {
      return set("starts_at", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Fin"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "datetime-local",
    value: form.ends_at,
    onChange: function onChange(e) {
      return set("ends_at", e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gap-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost ml-auto",
    onClick: function onClick() {
      return setModal(null);
    }
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose",
    onClick: save
  }, "Enregistrer")))));
};

/* ============================================================
   CONTESTS
   ============================================================ */
var Contests = function Contests() {
  var _useTable7 = useTable("/contests"),
    rows = _useTable7.rows,
    loading = _useTable7.loading,
    reload = _useTable7.reload;
  var _useState71 = useState(null),
    _useState72 = _slicedToArray(_useState71, 2),
    modal = _useState72[0],
    setModal = _useState72[1];
  var toast = useToast();
  var _useState73 = useState({
      title_fr: "",
      title_ar: "",
      description_fr: "",
      starts_at: "",
      ends_at: "",
      prize_description: ""
    }),
    _useState74 = _slicedToArray(_useState73, 2),
    form = _useState74[0],
    setForm = _useState74[1];
  var set = function set(k, v) {
    return setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, v));
    });
  };
  var drawWinner = /*#__PURE__*/function () {
    var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18(contest) {
      var _res$data3, res, w, _t18;
      return _regenerator().w(function (_context18) {
        while (1) switch (_context18.p = _context18.n) {
          case 0:
            if (confirm("Tirer au sort le gagnant du concours \"".concat(contest.title_fr, "\" ?"))) {
              _context18.n = 1;
              break;
            }
            return _context18.a(2);
          case 1:
            _context18.p = 1;
            _context18.n = 2;
            return latinaApi.admin.post("/contests/".concat(contest.id, "/draw"));
          case 2:
            res = _context18.v;
            w = ((_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.winner) || res.winner;
            toast("Gagnant : ".concat((w === null || w === void 0 ? void 0 : w.name) || "sélectionné"), "ok");
            reload();
            _context18.n = 4;
            break;
          case 3:
            _context18.p = 3;
            _t18 = _context18.v;
            toast(_t18.message, "err");
          case 4:
            return _context18.a(2);
        }
      }, _callee18, null, [[1, 3]]);
    }));
    return function drawWinner(_x12) {
      return _ref24.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose ml-auto",
    onClick: function onClick() {
      setForm({
        title_fr: "",
        title_ar: "",
        description_fr: "",
        starts_at: "",
        ends_at: "",
        prize_description: ""
      });
      setModal({});
    }
  }, "+ Nouveau concours")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Titre"), /*#__PURE__*/React.createElement("th", null, "Participants"), /*#__PURE__*/React.createElement("th", null, "D\xE9but"), /*#__PURE__*/React.createElement("th", null, "Fin"), /*#__PURE__*/React.createElement("th", null, "Gagnant"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (c) {
    var _c$entries_count;
    return /*#__PURE__*/React.createElement("tr", {
      key: c.id
    }, /*#__PURE__*/React.createElement("td", {
      className: "t-name"
    }, c.title_fr), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, (_c$entries_count = c.entries_count) !== null && _c$entries_count !== void 0 ? _c$entries_count : 0), /*#__PURE__*/React.createElement("td", {
      className: "text-mute"
    }, c.starts_at ? new Date(c.starts_at).toLocaleDateString("fr-DZ") : "—"), /*#__PURE__*/React.createElement("td", {
      className: "text-mute"
    }, c.ends_at ? new Date(c.ends_at).toLocaleDateString("fr-DZ") : "—"), /*#__PURE__*/React.createElement("td", null, c.winner ? /*#__PURE__*/React.createElement("span", {
      className: "text-green"
    }, c.winner.name) : /*#__PURE__*/React.createElement("span", {
      className: "text-mute"
    }, "\u2014")), /*#__PURE__*/React.createElement("td", {
      className: "gap-row"
    }, !c.winner && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: function onClick() {
        return drawWinner(c);
      }
    }, "\uD83C\uDFB2 Tirer")));
  }))))), modal !== null && /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-overlay",
    onClick: function onClick() {
      return setModal(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal admin-modal-md",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-modal-title"
  }, "Nouveau concours"), /*#__PURE__*/React.createElement("button", {
    className: "admin-modal-close",
    onClick: function onClick() {
      return setModal(null);
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "form-row form-row-2 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Titre (FR)"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    value: form.title_fr,
    onChange: function onChange(e) {
      return set("title_fr", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Titre (AR)"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    value: form.title_ar,
    onChange: function onChange(e) {
      return set("title_ar", e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Description (FR)"), /*#__PURE__*/React.createElement("textarea", {
    className: "admin-textarea",
    value: form.description_fr,
    onChange: function onChange(e) {
      return set("description_fr", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Prix / R\xE9compense"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    value: form.prize_description,
    onChange: function onChange(e) {
      return set("prize_description", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-row form-row-2 mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "D\xE9but"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "datetime-local",
    value: form.starts_at,
    onChange: function onChange(e) {
      return set("starts_at", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Fin"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "datetime-local",
    value: form.ends_at,
    onChange: function onChange(e) {
      return set("ends_at", e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gap-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost ml-auto",
    onClick: function onClick() {
      return setModal(null);
    }
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose",
    onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
      var _t19;
      return _regenerator().w(function (_context19) {
        while (1) switch (_context19.p = _context19.n) {
          case 0:
            _context19.p = 0;
            _context19.n = 1;
            return latinaApi.admin.post("/contests", form);
          case 1:
            toast("Concours créé", "ok");
            reload();
            setModal(null);
            _context19.n = 3;
            break;
          case 2:
            _context19.p = 2;
            _t19 = _context19.v;
            toast(_t19.message, "err");
          case 3:
            return _context19.a(2);
        }
      }, _callee19, null, [[0, 2]]);
    }))
  }, "Cr\xE9er")))));
};

/* ============================================================
   TEAM (Admin Users)
   ============================================================ */
var ROLES = [{
  value: "order-manager",
  label: "Order Manager"
}, {
  value: "catalog-manager",
  label: "Catalog Manager"
}, {
  value: "viewer",
  label: "Viewer"
}];
var Team = function Team() {
  var _useTable8 = useTable("/admins"),
    rows = _useTable8.rows,
    loading = _useTable8.loading,
    reload = _useTable8.reload;
  var _useState75 = useState(null),
    _useState76 = _slicedToArray(_useState75, 2),
    modal = _useState76[0],
    setModal = _useState76[1];
  var toast = useToast();
  var _useState77 = useState({
      name: "",
      email: "",
      password: "",
      role: "viewer"
    }),
    _useState78 = _slicedToArray(_useState77, 2),
    form = _useState78[0],
    setForm = _useState78[1];
  var set = function set(k, v) {
    return setForm(function (f) {
      return _objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, v));
    });
  };
  var save = /*#__PURE__*/function () {
    var _ref26 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
      var _t20;
      return _regenerator().w(function (_context20) {
        while (1) switch (_context20.p = _context20.n) {
          case 0:
            _context20.p = 0;
            _context20.n = 1;
            return latinaApi.admin.post("/admins", form);
          case 1:
            toast("Admin créé", "ok");
            reload();
            setModal(null);
            _context20.n = 3;
            break;
          case 2:
            _context20.p = 2;
            _t20 = _context20.v;
            toast(_t20.message, "err");
          case 3:
            return _context20.a(2);
        }
      }, _callee20, null, [[0, 2]]);
    }));
    return function save() {
      return _ref26.apply(this, arguments);
    };
  }();
  var del = /*#__PURE__*/function () {
    var _ref27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21(id) {
      var _t21;
      return _regenerator().w(function (_context21) {
        while (1) switch (_context21.p = _context21.n) {
          case 0:
            if (confirm("Supprimer cet admin ?")) {
              _context21.n = 1;
              break;
            }
            return _context21.a(2);
          case 1:
            _context21.p = 1;
            _context21.n = 2;
            return latinaApi.admin["delete"]("/admins/".concat(id));
          case 2:
            toast("Supprimé", "ok");
            reload();
            _context21.n = 4;
            break;
          case 3:
            _context21.p = 3;
            _t21 = _context21.v;
            toast(_t21.message, "err");
          case 4:
            return _context21.a(2);
        }
      }, _callee21, null, [[1, 3]]);
    }));
    return function del(_x13) {
      return _ref27.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-toolbar"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose ml-auto",
    onClick: function onClick() {
      setForm({
        name: "",
        email: "",
        password: "",
        role: "viewer"
      });
      setModal(true);
    }
  }, "+ Nouvel admin")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Nom"), /*#__PURE__*/React.createElement("th", null, "Email"), /*#__PURE__*/React.createElement("th", null, "R\xF4le"), /*#__PURE__*/React.createElement("th", null, "Cr\xE9\xE9"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (a) {
    var _a$roles;
    return /*#__PURE__*/React.createElement("tr", {
      key: a.id
    }, /*#__PURE__*/React.createElement("td", {
      className: "t-name"
    }, a.name), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, a.email), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "badge ".concat(a.is_super ? "badge-out_for_delivery" : "badge-confirmed")
    }, a.is_super ? "Super Admin" : ((_a$roles = a.roles) === null || _a$roles === void 0 ? void 0 : _a$roles[0]) || "—")), /*#__PURE__*/React.createElement("td", {
      className: "text-mute"
    }, new Date(a.created_at).toLocaleDateString("fr-DZ")), /*#__PURE__*/React.createElement("td", null, !a.is_super && /*#__PURE__*/React.createElement("button", {
      className: "btn btn-danger btn-sm",
      onClick: function onClick() {
        return del(a.id);
      }
    }, "\uD83D\uDDD1 Supprimer")));
  }))))), modal && /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-overlay",
    onClick: function onClick() {
      return setModal(null);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal admin-modal-sm",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-modal-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-modal-title"
  }, "Nouvel administrateur"), /*#__PURE__*/React.createElement("button", {
    className: "admin-modal-close",
    onClick: function onClick() {
      return setModal(null);
    }
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Nom"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    value: form.name,
    onChange: function onChange(e) {
      return set("name", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "email",
    value: form.email,
    onChange: function onChange(e) {
      return set("email", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Mot de passe"), /*#__PURE__*/React.createElement("input", {
    className: "admin-input",
    type: "password",
    value: form.password,
    onChange: function onChange(e) {
      return set("password", e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "form-field mb-4"
  }, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "R\xF4le"), /*#__PURE__*/React.createElement("select", {
    className: "admin-select w-full",
    value: form.role,
    onChange: function onChange(e) {
      return set("role", e.target.value);
    }
  }, ROLES.map(function (r) {
    return /*#__PURE__*/React.createElement("option", {
      key: r.value,
      value: r.value
    }, r.label);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gap-row"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost ml-auto",
    onClick: function onClick() {
      return setModal(null);
    }
  }, "Annuler"), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-rose",
    onClick: save
  }, "Cr\xE9er")))));
};

/* ============================================================
   REPORTS
   ============================================================ */
var Reports = function Reports() {
  var _d$orders_count, _d$delivered_count, _d$rto_count, _d$cancelled_count, _d$customers_count, _d$new_customers, _d$total_loyalty_poin, _d$products_count, _d$total_stock, _d$out_of_stock;
  var _useState79 = useState(null),
    _useState80 = _slicedToArray(_useState79, 2),
    data = _useState80[0],
    setData = _useState80[1];
  var _useState81 = useState(true),
    _useState82 = _slicedToArray(_useState81, 2),
    loading = _useState82[0],
    setLoading = _useState82[1];
  useEffect(function () {
    Promise.all([latinaApi.admin.get("/reports/sales").then(function (r) {
      return r.data || r;
    })["catch"](function () {
      return {};
    }), latinaApi.admin.get("/reports/inventory").then(function (r) {
      return r.data || r;
    })["catch"](function () {
      return {};
    })]).then(function (_ref28) {
      var _ref29 = _slicedToArray(_ref28, 2),
        sales = _ref29[0],
        inv = _ref29[1];
      return setData(_objectSpread(_objectSpread({}, sales), inv));
    })["finally"](function () {
      return setLoading(false);
    });
  }, []);
  if (loading) return /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  }));
  var d = data || {};
  var sections = [{
    title: "Revenus",
    items: [{
      label: "Chiffre d'affaires total",
      val: d.revenue ? "".concat(Number(d.revenue).toLocaleString(), " DA") : "—"
    }, {
      label: "Revenu ce mois",
      val: d.revenue_month ? "".concat(Number(d.revenue_month).toLocaleString(), " DA") : "—"
    }, {
      label: "Panier moyen",
      val: d.avg_order ? "".concat(Number(d.avg_order).toLocaleString(), " DA") : "—"
    }]
  }, {
    title: "Commandes",
    items: [{
      label: "Total commandes",
      val: (_d$orders_count = d.orders_count) !== null && _d$orders_count !== void 0 ? _d$orders_count : "—"
    }, {
      label: "Livrées",
      val: (_d$delivered_count = d.delivered_count) !== null && _d$delivered_count !== void 0 ? _d$delivered_count : "—"
    }, {
      label: "Taux de livraison",
      val: d.delivery_rate ? "".concat(d.delivery_rate, "%") : "—"
    }, {
      label: "Retours (RTO)",
      val: (_d$rto_count = d.rto_count) !== null && _d$rto_count !== void 0 ? _d$rto_count : "—"
    }, {
      label: "Annulées",
      val: (_d$cancelled_count = d.cancelled_count) !== null && _d$cancelled_count !== void 0 ? _d$cancelled_count : "—"
    }]
  }, {
    title: "Clients",
    items: [{
      label: "Total clients",
      val: (_d$customers_count = d.customers_count) !== null && _d$customers_count !== void 0 ? _d$customers_count : "—"
    }, {
      label: "Nouveaux ce mois",
      val: (_d$new_customers = d.new_customers) !== null && _d$new_customers !== void 0 ? _d$new_customers : "—"
    }, {
      label: "Total points fidélité",
      val: (_d$total_loyalty_poin = d.total_loyalty_points) !== null && _d$total_loyalty_poin !== void 0 ? _d$total_loyalty_poin : "—"
    }]
  }, {
    title: "Produits",
    items: [{
      label: "Produits actifs",
      val: (_d$products_count = d.products_count) !== null && _d$products_count !== void 0 ? _d$products_count : "—"
    }, {
      label: "Stock total",
      val: (_d$total_stock = d.total_stock) !== null && _d$total_stock !== void 0 ? _d$total_stock : "—"
    }, {
      label: "Ruptures de stock",
      val: (_d$out_of_stock = d.out_of_stock) !== null && _d$out_of_stock !== void 0 ? _d$out_of_stock : "—"
    }]
  }];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, sections.map(function (s) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.title,
      className: "admin-card mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "ac-head"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ac-title"
    }, s.title)), /*#__PURE__*/React.createElement("div", {
      className: "ac-body"
    }, s.items.map(function (item) {
      return /*#__PURE__*/React.createElement("div", {
        key: item.label,
        style: {
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 0",
          borderBottom: "1px solid var(--border)",
          fontSize: 13
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: "var(--text-3)"
        }
      }, item.label), /*#__PURE__*/React.createElement("span", {
        className: "mono"
      }, item.val));
    })));
  })));
};

/* ============================================================
   AUDIT LOG
   ============================================================ */
var Audit = function Audit() {
  var _useTable9 = useTable("/audit-log", 20),
    rows = _useTable9.rows,
    loading = _useTable9.loading,
    search = _useTable9.search,
    doSearch = _useTable9.doSearch;
  var ACTION_COLORS = {
    create: "var(--green)",
    update: "var(--yellow)",
    "delete": "var(--red)",
    login: "var(--blue)"
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-search",
    style: {
      maxWidth: 320
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-search-icon"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Rechercher dans l'audit\u2026",
    value: search,
    onChange: function onChange(e) {
      return doSearch(e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Date"), /*#__PURE__*/React.createElement("th", null, "Acteur"), /*#__PURE__*/React.createElement("th", null, "Action"), /*#__PURE__*/React.createElement("th", null, "Mod\xE8le"), /*#__PURE__*/React.createElement("th", null, "IP"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (e) {
    var _e$auditable_type;
    return /*#__PURE__*/React.createElement("tr", {
      key: e.id
    }, /*#__PURE__*/React.createElement("td", {
      className: "mono text-mute",
      style: {
        fontSize: 11
      }
    }, new Date(e.created_at).toLocaleString("fr-DZ")), /*#__PURE__*/React.createElement("td", {
      className: "t-name"
    }, e.actor_name || e.actor_id || "System"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      style: {
        color: ACTION_COLORS[e.action] || "var(--text-2)",
        fontFamily: "var(--mono)",
        fontSize: 12
      }
    }, e.action)), /*#__PURE__*/React.createElement("td", {
      className: "mono text-mute"
    }, (_e$auditable_type = e.auditable_type) === null || _e$auditable_type === void 0 ? void 0 : _e$auditable_type.split("\\").pop(), " #", e.auditable_id), /*#__PURE__*/React.createElement("td", {
      className: "mono text-mute",
      style: {
        fontSize: 11
      }
    }, e.ip_address));
  }))))));
};

/* ============================================================
   INVENTORY
   ============================================================ */
var Inventory = function Inventory() {
  var _stats$out_of_stock, _stats$low_stock, _stats$total_products;
  var toast = useToast();
  var _useState83 = useState("stock"),
    _useState84 = _slicedToArray(_useState83, 2),
    tab = _useState84[0],
    setTab = _useState84[1]; // "stock" | "movements"
  var _useState85 = useState(null),
    _useState86 = _slicedToArray(_useState85, 2),
    invStats = _useState86[0],
    setInvStats = _useState86[1];
  var _useState87 = useState([]),
    _useState88 = _slicedToArray(_useState87, 2),
    products = _useState88[0],
    setProducts = _useState88[1];
  var _useState89 = useState([]),
    _useState90 = _slicedToArray(_useState89, 2),
    movements = _useState90[0],
    setMovements = _useState90[1];
  var _useState91 = useState(null),
    _useState92 = _slicedToArray(_useState91, 2),
    mvMeta = _useState92[0],
    setMvMeta = _useState92[1];
  var _useState93 = useState(1),
    _useState94 = _slicedToArray(_useState93, 2),
    mvPage = _useState94[0],
    setMvPage = _useState94[1];
  var _useState95 = useState(true),
    _useState96 = _slicedToArray(_useState95, 2),
    loading = _useState96[0],
    setLoading = _useState96[1];
  var _useState97 = useState(false),
    _useState98 = _slicedToArray(_useState97, 2),
    mvLoading = _useState98[0],
    setMvLoading = _useState98[1];
  var _useState99 = useState(""),
    _useState100 = _slicedToArray(_useState99, 2),
    search = _useState100[0],
    setSearch = _useState100[1];
  useEffect(function () {
    loadStock();
  }, []);
  useEffect(function () {
    if (tab === "movements") loadMovements(1);
  }, [tab]);
  var loadStock = /*#__PURE__*/function () {
    var _ref30 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
      var _yield$Promise$all, _yield$Promise$all2, inv, prods, _t22;
      return _regenerator().w(function (_context22) {
        while (1) switch (_context22.p = _context22.n) {
          case 0:
            setLoading(true);
            _context22.p = 1;
            _context22.n = 2;
            return Promise.all([latinaApi.admin.get("/inventory").then(function (r) {
              return r.data || r;
            })["catch"](function () {
              return {};
            }), latinaApi.admin.get("/products?per_page=200").then(function (r) {
              return r.data || r || [];
            })["catch"](function () {
              return [];
            })]);
          case 2:
            _yield$Promise$all = _context22.v;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            inv = _yield$Promise$all2[0];
            prods = _yield$Promise$all2[1];
            setInvStats(inv);
            setProducts(Array.isArray(prods) ? prods : []);
            _context22.n = 4;
            break;
          case 3:
            _context22.p = 3;
            _t22 = _context22.v;
          case 4:
            _context22.p = 4;
            setLoading(false);
            return _context22.f(4);
          case 5:
            return _context22.a(2);
        }
      }, _callee22, null, [[1, 3, 4, 5]]);
    }));
    return function loadStock() {
      return _ref30.apply(this, arguments);
    };
  }();
  var loadMovements = /*#__PURE__*/function () {
    var _ref31 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
      var p,
        res,
        _args23 = arguments,
        _t23;
      return _regenerator().w(function (_context23) {
        while (1) switch (_context23.p = _context23.n) {
          case 0:
            p = _args23.length > 0 && _args23[0] !== undefined ? _args23[0] : 1;
            setMvLoading(true);
            _context23.p = 1;
            _context23.n = 2;
            return latinaApi.admin.get("/inventory/movements?page=".concat(p));
          case 2:
            res = _context23.v;
            setMovements(res.data || []);
            setMvMeta(res.meta || null);
            setMvPage(p);
            _context23.n = 4;
            break;
          case 3:
            _context23.p = 3;
            _t23 = _context23.v;
          case 4:
            _context23.p = 4;
            setMvLoading(false);
            return _context23.f(4);
          case 5:
            return _context23.a(2);
        }
      }, _callee23, null, [[1, 3, 4, 5]]);
    }));
    return function loadMovements() {
      return _ref31.apply(this, arguments);
    };
  }();
  var adjustStock = /*#__PURE__*/function () {
    var _ref32 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(product) {
      var newStock, n, _t24;
      return _regenerator().w(function (_context24) {
        while (1) switch (_context24.p = _context24.n) {
          case 0:
            newStock = prompt("Stock actuel: ".concat(product.stock, "\nNouveau stock pour \"").concat(product.name_fr, "\":"), String(product.stock));
            if (!(newStock === null || newStock === "")) {
              _context24.n = 1;
              break;
            }
            return _context24.a(2);
          case 1:
            n = parseInt(newStock, 10);
            if (!(isNaN(n) || n < 0)) {
              _context24.n = 2;
              break;
            }
            toast("Valeur invalide", "err");
            return _context24.a(2);
          case 2:
            _context24.p = 2;
            _context24.n = 3;
            return latinaApi.admin.post("/products/".concat(product.id, "/stock"), {
              new_stock: n,
              note: "Ajustement inventaire"
            });
          case 3:
            toast("Stock mis à jour", "ok");
            loadStock();
            _context24.n = 5;
            break;
          case 4:
            _context24.p = 4;
            _t24 = _context24.v;
            toast(_t24.message, "err");
          case 5:
            return _context24.a(2);
        }
      }, _callee24, null, [[2, 4]]);
    }));
    return function adjustStock(_x14) {
      return _ref32.apply(this, arguments);
    };
  }();
  var filtered = products.filter(function (p) {
    var _p$name_fr, _p$sku;
    return !search || ((_p$name_fr = p.name_fr) === null || _p$name_fr === void 0 ? void 0 : _p$name_fr.toLowerCase().includes(search.toLowerCase())) || ((_p$sku = p.sku) === null || _p$sku === void 0 ? void 0 : _p$sku.toLowerCase().includes(search.toLowerCase()));
  });
  var getStockChip = function getStockChip(p) {
    if (p.stock === 0) return /*#__PURE__*/React.createElement("span", {
      className: "stock-chip out"
    }, "Rupture");
    if (p.low_stock_threshold && p.stock <= p.low_stock_threshold) return /*#__PURE__*/React.createElement("span", {
      className: "stock-chip low"
    }, "Stock bas");
    return /*#__PURE__*/React.createElement("span", {
      className: "stock-chip good"
    }, "OK");
  };
  var getBarColor = function getBarColor(p) {
    if (p.stock === 0) return "var(--red)";
    if (p.low_stock_threshold && p.stock <= p.low_stock_threshold) return "var(--yellow)";
    return "var(--green)";
  };
  var stats = invStats || {};
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "inv-stats-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inv-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inv-stat-icon"
  }, "\uD83D\uDD34"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "inv-stat-label"
  }, "RUPTURE DE STOCK"), /*#__PURE__*/React.createElement("div", {
    className: "inv-stat-val ".concat(stats.out_of_stock > 0 ? "danger" : "ok")
  }, (_stats$out_of_stock = stats.out_of_stock) !== null && _stats$out_of_stock !== void 0 ? _stats$out_of_stock : "—"))), /*#__PURE__*/React.createElement("div", {
    className: "inv-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inv-stat-icon"
  }, "\uD83D\uDFE1"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "inv-stat-label"
  }, "STOCK BAS"), /*#__PURE__*/React.createElement("div", {
    className: "inv-stat-val ".concat(stats.low_stock > 0 ? "warn" : "ok")
  }, (_stats$low_stock = stats.low_stock) !== null && _stats$low_stock !== void 0 ? _stats$low_stock : "—"))), /*#__PURE__*/React.createElement("div", {
    className: "inv-stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inv-stat-icon"
  }, "\uD83D\uDCE6"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "inv-stat-label"
  }, "PRODUITS ACTIFS"), /*#__PURE__*/React.createElement("div", {
    className: "inv-stat-val ok"
  }, (_stats$total_products = stats.total_products) !== null && _stats$total_products !== void 0 ? _stats$total_products : products.length)))), /*#__PURE__*/React.createElement("div", {
    className: "admin-tabs"
  }, /*#__PURE__*/React.createElement("button", {
    className: "admin-tab ".concat(tab === "stock" ? "active" : ""),
    onClick: function onClick() {
      return setTab("stock");
    }
  }, "\uD83D\uDCCB Niveaux de stock"), /*#__PURE__*/React.createElement("button", {
    className: "admin-tab ".concat(tab === "movements" ? "active" : ""),
    onClick: function onClick() {
      return setTab("movements");
    }
  }, "\uD83D\uDD04 Historique des mouvements")), tab === "stock" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-search"
  }, /*#__PURE__*/React.createElement("span", {
    className: "admin-search-icon"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    placeholder: "Rechercher un produit\u2026",
    value: search,
    onChange: function onChange(e) {
      return setSearch(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-ghost btn-sm",
    onClick: loadStock
  }, "\u21BB Rafra\xEEchir")), /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, loading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Produit"), /*#__PURE__*/React.createElement("th", null, "SKU"), /*#__PURE__*/React.createElement("th", null, "Stock"), /*#__PURE__*/React.createElement("th", null, "Seuil alerte"), /*#__PURE__*/React.createElement("th", null, "Niveau"), /*#__PURE__*/React.createElement("th", null, "Statut"), /*#__PURE__*/React.createElement("th", null, "Actions"))), /*#__PURE__*/React.createElement("tbody", null, filtered.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 7,
    style: {
      textAlign: "center",
      padding: 32,
      color: "var(--text-3)"
    }
  }, "Aucun produit trouv\xE9")), filtered.map(function (p) {
    var _p$category2, _p$low_stock_threshol;
    var maxStock = Math.max(p.stock, (p.low_stock_threshold || 5) * 4, 10);
    var pct = Math.min(100, Math.round(p.stock / maxStock * 100));
    return /*#__PURE__*/React.createElement("tr", {
      key: p.id
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "t-name"
    }, p.name_fr), /*#__PURE__*/React.createElement("div", {
      className: "text-mute",
      style: {
        fontSize: 11
      }
    }, (_p$category2 = p.category) === null || _p$category2 === void 0 ? void 0 : _p$category2.name_fr)), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, p.sku), /*#__PURE__*/React.createElement("td", {
      className: "mono ".concat(p.stock === 0 ? "text-red" : p.low_stock_threshold && p.stock <= p.low_stock_threshold ? "text-yellow" : "text-green"),
      style: {
        fontSize: 16,
        fontWeight: 600
      }
    }, p.stock), /*#__PURE__*/React.createElement("td", {
      className: "mono text-mute"
    }, (_p$low_stock_threshol = p.low_stock_threshold) !== null && _p$low_stock_threshol !== void 0 ? _p$low_stock_threshol : 5), /*#__PURE__*/React.createElement("td", {
      style: {
        minWidth: 90
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "inv-stock-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "inv-stock-bar-fill",
      style: {
        width: "".concat(pct, "%"),
        background: getBarColor(p)
      }
    }))), /*#__PURE__*/React.createElement("td", null, getStockChip(p)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("button", {
      className: "btn btn-ghost btn-sm",
      onClick: function onClick() {
        return adjustStock(p);
      },
      title: "Ajuster le stock"
    }, "\u270F\uFE0F Ajuster")));
  })))))), tab === "movements" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "admin-card"
  }, mvLoading ? /*#__PURE__*/React.createElement("div", {
    className: "admin-loading"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-spinner"
  })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "admin-table-wrap"
  }, /*#__PURE__*/React.createElement("table", {
    className: "admin-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Date"), /*#__PURE__*/React.createElement("th", null, "Produit"), /*#__PURE__*/React.createElement("th", null, "Variante"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "\u0394 Qt\xE9"), /*#__PURE__*/React.createElement("th", null, "Stock apr\xE8s"), /*#__PURE__*/React.createElement("th", null, "Note"))), /*#__PURE__*/React.createElement("tbody", null, movements.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 7,
    style: {
      textAlign: "center",
      padding: 32,
      color: "var(--text-3)"
    }
  }, "Aucun mouvement enregistr\xE9")), movements.map(function (m) {
    var _m$product, _m$product2;
    var cls = m.type === "in" || m.quantity_change > 0 ? "mv-type-in" : m.type === "out" ? "mv-type-out" : "mv-type-adj";
    var sign = m.quantity_change > 0 ? "+" : "";
    return /*#__PURE__*/React.createElement("tr", {
      key: m.id
    }, /*#__PURE__*/React.createElement("td", {
      className: "mono text-mute",
      style: {
        fontSize: 11
      }
    }, new Date(m.created_at).toLocaleString("fr-DZ")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "t-name"
    }, ((_m$product = m.product) === null || _m$product === void 0 ? void 0 : _m$product.name_fr) || "—"), /*#__PURE__*/React.createElement("div", {
      className: "mono text-mute",
      style: {
        fontSize: 10
      }
    }, (_m$product2 = m.product) === null || _m$product2 === void 0 ? void 0 : _m$product2.sku)), /*#__PURE__*/React.createElement("td", {
      className: "text-mute"
    }, m.variant ? "".concat(m.variant.size || "", " ").concat(m.variant.color || "").trim() || "—" : "—"), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: cls
    }, m.type || "adj")), /*#__PURE__*/React.createElement("td", {
      className: "mono ".concat(m.quantity_change > 0 ? "text-green" : "text-red")
    }, sign, m.quantity_change), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, m.stock_after), /*#__PURE__*/React.createElement("td", {
      className: "text-mute",
      style: {
        fontSize: 12,
        maxWidth: 200
      }
    }, m.note || "—"));
  })))), mvMeta && mvMeta.last_page > 1 && /*#__PURE__*/React.createElement("div", {
    className: "admin-pagination"
  }, /*#__PURE__*/React.createElement("button", {
    className: "pagination-btn",
    disabled: mvPage <= 1,
    onClick: function onClick() {
      return loadMovements(mvPage - 1);
    }
  }, "\u2039"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: "var(--text-3)"
    }
  }, "Page ", mvPage, " / ", mvMeta.last_page), /*#__PURE__*/React.createElement("button", {
    className: "pagination-btn",
    disabled: mvPage >= mvMeta.last_page,
    onClick: function onClick() {
      return loadMovements(mvPage + 1);
    }
  }, "\u203A"))))));
};

/* ============================================================
   PAGE TITLES
   ============================================================ */
var PAGE_TITLES = {
  dashboard: "Dashboard",
  products: "Produits",
  categories: "Catégories",
  orders: "Commandes",
  customers: "Clients",
  coupons: "Coupons",
  flash_sales: "Flash Sales",
  contests: "Concours",
  inventory: "Inventaire",
  team: "Équipe",
  reports: "Rapports",
  audit: "Journal d'audit"
};
var PAGE_COMPONENTS = {
  dashboard: Dashboard,
  products: Products,
  categories: Categories,
  orders: Orders,
  customers: Customers,
  coupons: Coupons,
  flash_sales: FlashSales,
  contests: Contests,
  inventory: Inventory,
  team: Team,
  reports: Reports,
  audit: Audit
};

/* ============================================================
   ROOT APP
   ============================================================ */
var AdminApp = function AdminApp() {
  var _useState101 = useState(function () {
      try {
        return JSON.parse(localStorage.getItem("latina-admin-user") || "null");
      } catch (_unused6) {
        return null;
      }
    }),
    _useState102 = _slicedToArray(_useState101, 2),
    admin = _useState102[0],
    setAdmin = _useState102[1];
  var _useState103 = useState("dashboard"),
    _useState104 = _slicedToArray(_useState103, 2),
    page = _useState104[0],
    setPage = _useState104[1];
  var handleLogin = function handleLogin(adminUser) {
    setAdmin(adminUser);
    localStorage.setItem("latina-admin-user", JSON.stringify(adminUser));
  };
  var handleLogout = /*#__PURE__*/function () {
    var _ref33 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25() {
      var _t25;
      return _regenerator().w(function (_context25) {
        while (1) switch (_context25.p = _context25.n) {
          case 0:
            _context25.p = 0;
            _context25.n = 1;
            return latinaApi.admin.post("/logout");
          case 1:
            _context25.n = 3;
            break;
          case 2:
            _context25.p = 2;
            _t25 = _context25.v;
          case 3:
            setAdmin(null);
            localStorage.removeItem("latina-admin-user");
            localStorage.removeItem("latina-admin-token");
          case 4:
            return _context25.a(2);
        }
      }, _callee25, null, [[0, 2]]);
    }));
    return function handleLogout() {
      return _ref33.apply(this, arguments);
    };
  }();

  /* Verify stored admin token on mount */
  useEffect(function () {
    if (!admin) return;
    latinaApi.admin.get("/me")["catch"](function () {
      setAdmin(null);
      localStorage.removeItem("latina-admin-user");
      localStorage.removeItem("latina-admin-token");
    });
  }, []);
  if (!admin) {
    return /*#__PURE__*/React.createElement(ToastProvider, null, /*#__PURE__*/React.createElement(AdminLogin, {
      onLogin: handleLogin
    }));
  }
  var PageComp = PAGE_COMPONENTS[page] || Dashboard;
  return /*#__PURE__*/React.createElement(ToastProvider, null, /*#__PURE__*/React.createElement("div", {
    className: "admin-layout"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    page: page,
    setPage: setPage,
    admin: admin,
    onLogout: handleLogout
  }), /*#__PURE__*/React.createElement("div", {
    className: "admin-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-topbar"
  }, /*#__PURE__*/React.createElement("span", {
    className: "at-title"
  }, PAGE_TITLES[page] || page), /*#__PURE__*/React.createElement("div", {
    className: "at-actions"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-mute",
    style: {
      fontSize: 12
    }
  }, "Latina Admin \xB7 ", new Date().toLocaleDateString("fr-DZ")))), /*#__PURE__*/React.createElement("div", {
    className: "admin-content"
  }, /*#__PURE__*/React.createElement(PageComp, null)))));
};
ReactDOM.createRoot(document.getElementById("admin-root")).render(/*#__PURE__*/React.createElement(AdminApp, null));
