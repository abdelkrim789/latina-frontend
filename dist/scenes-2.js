"use strict";

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
/* global React */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef;

/* ============================================================
   SCENE — REWARDS (Loyalty + Concours)
   ============================================================ */

var RewardsScene = function RewardsScene(_ref) {
  var _loyalty$tier_progres, _loyalty$tier_progres2;
  var lang = _ref.lang,
    user = _ref.user,
    onOpenAuth = _ref.onOpenAuth;
  var sceneRef = useRef(null);
  useSceneProgress(sceneRef);

  /* ── i18n ── */
  var T = {
    fr: {
      fidLabel: "La Fidélité",
      fidTitle1: "Plus vous portez",
      fidTitle2: "Latina",
      fidTitle3: ", plus elle vous remercie.",
      fidText: "Chaque commande compte. Chaque paire vous rapproche d'une réduction, d'un cadeau, d'un avantage exclusif.",
      fidTeaser: "Vos points vous attendent.",
      fidTeaserSub: "Créez votre compte gratuit et commencez à cumuler dès votre première commande.",
      fidCta: "Créer mon compte",
      points: "pts",
      balance: "Solde fidélité",
      nextTier: "pts pour atteindre",
      tiers: {
        petal: "🌸 Pétale",
        lotus: "🪷 Lotus",
        amber: "🌟 Ambre"
      },
      loyaltyInfo: "1 pt par 100 DA · 10 pts = 1 DA de réduction",
      conLabel: "Le Concours",
      conTitle1: "Tentez votre chance.",
      conTitle2: "Tous les mois.",
      conText: "Une cliente tirée au sort chaque mois remporte une paire au choix de la collection. Une commande = une participation. Gratuit.",
      days: "Jours",
      hrs: "Heures",
      min: "Min",
      sec: "Sec",
      enter: "Participer maintenant →",
      entering: "Participation…",
      entered: "Vous participez ✓",
      needAuth: "Se connecter pour participer →",
      entryCount: function entryCount(n) {
        return "".concat(n, " participante").concat(n > 1 ? "s" : "", " ce mois-ci");
      },
      noContest: "Prochain concours bientôt",
      noContestSub: "Inscrivez-vous à la newsletter pour être notifiée en avant-première.",
      prizeLabel: "Le lot du mois",
      entryErr: "Erreur lors de la participation."
    },
    ar: {
      fidLabel: "الولاء",
      fidTitle1: "كلما ارتديتِ",
      fidTitle2: "Latina",
      fidTitle3: "، كافأتكِ أكثر.",
      fidText: "كل طلب يُحتسب. كل حذاء يقرّبك من تخفيض، هدية، أو ميزة حصرية.",
      fidTeaser: "نقاطكِ في انتظاركِ.",
      fidTeaserSub: "أنشئي حسابًا مجانيًا وابدأي التراكم من أول طلب.",
      fidCta: "إنشاء حسابي",
      points: "نقطة",
      balance: "رصيد الولاء",
      nextTier: "نقطة للوصول إلى",
      tiers: {
        petal: "🌸 بتلة",
        lotus: "🪷 لوتس",
        amber: "🌟 عنبر"
      },
      loyaltyInfo: "1 نقطة / 100 دج · 10 نقاط = خصم 1 دج",
      conLabel: "المسابقة",
      conTitle1: "جربي حظك.",
      conTitle2: "كل شهر.",
      conText: "زبونة واحدة تُسحب كل شهر وتربح حذاء من اختيارها. طلب واحد = مشاركة. مجانًا.",
      days: "أيام",
      hrs: "ساعات",
      min: "دقائق",
      sec: "ثوانٍ",
      enter: "شاركي الآن →",
      entering: "جارٍ التسجيل…",
      entered: "أنتِ مشاركة ✓",
      needAuth: "تسجيل الدخول للمشاركة →",
      entryCount: function entryCount(n) {
        return "".concat(n, " \u0645\u0634\u0627\u0631\u0643\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631");
      },
      noContest: "المسابقة القادمة قريبًا",
      noContestSub: "اشتركي في النشرة لتصلكِ أول إشعار.",
      prizeLabel: "جائزة الشهر",
      entryErr: "خطأ أثناء التسجيل."
    },
    en: {
      fidLabel: "Loyalty",
      fidTitle1: "The more you wear",
      fidTitle2: "Latina",
      fidTitle3: ", the more she thanks you.",
      fidText: "Every order counts. Every pair brings you closer to a discount, a gift, an exclusive perk.",
      fidTeaser: "Your points are waiting.",
      fidTeaserSub: "Create your free account and start earning from your very first order.",
      fidCta: "Create my account",
      points: "pts",
      balance: "Loyalty balance",
      nextTier: "pts to reach",
      tiers: {
        petal: "🌸 Petal",
        lotus: "🪷 Lotus",
        amber: "🌟 Amber"
      },
      loyaltyInfo: "1 pt per 100 DA · 10 pts = 1 DA off",
      conLabel: "The Contest",
      conTitle1: "Try your luck.",
      conTitle2: "Every month.",
      conText: "One customer drawn at random each month wins a pair of her choice from the collection. One order = one entry. Free.",
      days: "Days",
      hrs: "Hours",
      min: "Min",
      sec: "Sec",
      enter: "Enter now →",
      entering: "Entering…",
      entered: "You're in ✓",
      needAuth: "Sign in to enter →",
      entryCount: function entryCount(n) {
        return "".concat(n, " entr").concat(n === 1 ? "y" : "ies", " this month");
      },
      noContest: "Next contest coming soon",
      noContestSub: "Subscribe to our newsletter to be the first to know.",
      prizeLabel: "This month's prize",
      entryErr: "Error, please try again."
    }
  }[lang] || {};
  var TIER_COLORS = {
    petal: "#C68B6F",
    lotus: "#9B59B6",
    amber: "#F59E0B"
  };

  /* ── Contest state ── */
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    contest = _useState2[0],
    setContest = _useState2[1];
  var _useState3 = useState(true),
    _useState4 = _slicedToArray(_useState3, 2),
    contestLoading = _useState4[0],
    setContestLoading = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    entering = _useState6[0],
    setEntering = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    entered = _useState8[0],
    setEntered = _useState8[1];
  var _useState9 = useState(0),
    _useState0 = _slicedToArray(_useState9, 2),
    entryCount = _useState0[0],
    setEntryCount = _useState0[1];
  var _useState1 = useState(""),
    _useState10 = _slicedToArray(_useState1, 2),
    entryError = _useState10[0],
    setEntryError = _useState10[1];

  /* ── Loyalty state ── */
  var _useState11 = useState(null),
    _useState12 = _slicedToArray(_useState11, 2),
    loyalty = _useState12[0],
    setLoyalty = _useState12[1];
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    loyaltyLoading = _useState14[0],
    setLoyaltyLoading = _useState14[1];

  /* ── Countdown ── */
  var _useState15 = useState({
      d: 0,
      h: 0,
      m: 0,
      s: 0
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    time = _useState16[0],
    setTime = _useState16[1];

  /* ── Fetch contest on mount ── */
  useEffect(function () {
    window.latinaApi.getContest().then(function (res) {
      setContest(res.contest || null);
      setEntryCount(res.entries || 0);
      setEntered(!!res.user_entered);
    })["catch"](function () {})["finally"](function () {
      return setContestLoading(false);
    });
  }, []);

  /* ── Fetch loyalty when user changes ── */
  useEffect(function () {
    if (!user) {
      setLoyalty(null);
      return;
    }
    setLoyaltyLoading(true);
    window.latinaApi.getLoyalty().then(function (r) {
      return setLoyalty(r.data || r);
    })["catch"](function () {})["finally"](function () {
      return setLoyaltyLoading(false);
    });
  }, [user]);

  /* ── Countdown based on real contest end date ── */
  useEffect(function () {
    if (!(contest !== null && contest !== void 0 && contest.ends_at)) return;
    var calc = function calc() {
      var diff = new Date(contest.ends_at) - Date.now();
      if (diff <= 0) return {
        d: 0,
        h: 0,
        m: 0,
        s: 0
      };
      return {
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000 % 24),
        m: Math.floor(diff / 60000 % 60),
        s: Math.floor(diff / 1000 % 60)
      };
    };
    setTime(calc());
    var i = setInterval(function () {
      return setTime(calc());
    }, 1000);
    return function () {
      return clearInterval(i);
    };
  }, [contest === null || contest === void 0 ? void 0 : contest.ends_at]);
  var pad = function pad(n) {
    return String(n).padStart(2, "0");
  };
  var tierPct = loyalty ? Math.min(100, ((_loyalty$tier_progres = loyalty.tier_progress) === null || _loyalty$tier_progres === void 0 ? void 0 : _loyalty$tier_progres.pct) || 0) : 0;
  var handleEnter = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var res, _e$data, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (user) {
              _context.n = 1;
              break;
            }
            onOpenAuth === null || onOpenAuth === void 0 || onOpenAuth();
            return _context.a(2);
          case 1:
            setEntering(true);
            setEntryError("");
            _context.p = 2;
            _context.n = 3;
            return window.latinaApi.enterContest();
          case 3:
            res = _context.v;
            setEntered(true);
            if (res.entries != null) setEntryCount(res.entries);else setEntryCount(function (c) {
              return c + 1;
            });
            _context.n = 7;
            break;
          case 4:
            _context.p = 4;
            _t = _context.v;
            if (!(_t.status === 401)) {
              _context.n = 5;
              break;
            }
            onOpenAuth === null || onOpenAuth === void 0 || onOpenAuth();
            return _context.a(2);
          case 5:
            if (!((_e$data = _t.data) !== null && _e$data !== void 0 && _e$data.already_entered)) {
              _context.n = 6;
              break;
            }
            setEntered(true);
            return _context.a(2);
          case 6:
            setEntryError(_t.message || T.entryErr);
          case 7:
            _context.p = 7;
            setEntering(false);
            return _context.f(7);
          case 8:
            return _context.a(2);
        }
      }, _callee, null, [[2, 4, 7, 8]]);
    }));
    return function handleEnter() {
      return _ref2.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("section", {
    ref: sceneRef,
    className: "scene scene-rewards",
    id: "fidelite",
    "data-screen-label": "05 Rewards"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SceneMarker, {
    num: "05",
    label: "Rewards",
    meta: "FID\xC9LIT\xC9 \xB7 CONCOURS"
  }), /*#__PURE__*/React.createElement("div", {
    className: "rewards-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rewards-card reveal"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, T.fidLabel), /*#__PURE__*/React.createElement("h3", null, T.fidTitle1, " ", /*#__PURE__*/React.createElement("em", null, T.fidTitle2), T.fidTitle3), /*#__PURE__*/React.createElement("p", null, T.fidText), user && loyaltyLoading ? /*#__PURE__*/React.createElement("div", {
    className: "loyalty-widget"
  }, /*#__PURE__*/React.createElement("div", {
    className: "loyalty-skeleton"
  }), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-skeleton",
    style: {
      width: "60%",
      marginTop: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fill",
    style: {
      width: "0%",
      background: "var(--petal-200)"
    }
  }))) : user && loyalty ? /*#__PURE__*/React.createElement("div", {
    className: "loyalty-widget"
  }, /*#__PURE__*/React.createElement("div", {
    className: "loyalty-tier-badge",
    style: {
      background: (TIER_COLORS[loyalty.tier] || "#C68B6F") + "22",
      color: TIER_COLORS[loyalty.tier] || "#C68B6F",
      border: "1px solid ".concat(TIER_COLORS[loyalty.tier] || "#C68B6F", "44")
    }
  }, T.tiers[loyalty.tier] || loyalty.tier), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-row",
    style: {
      marginTop: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, T.balance), /*#__PURE__*/React.createElement("span", {
    className: "points t-num"
  }, (loyalty.points || 0).toLocaleString(), " ", T.points)), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fill",
    style: {
      width: "".concat(tierPct, "%"),
      background: TIER_COLORS[loyalty.tier] || "var(--rose-500)",
      transition: "width 1s ease"
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-tiers"
  }, Object.entries(T.tiers).map(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      k = _ref4[0],
      label = _ref4[1];
    return /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        fontWeight: loyalty.tier === k ? 700 : 400,
        color: loyalty.tier === k ? TIER_COLORS[k] : undefined
      }
    }, label);
  })), loyalty.next_tier && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontFamily: "var(--mono)",
      fontSize: 10,
      letterSpacing: "0.12em",
      color: "var(--rose-500)",
      textTransform: "uppercase"
    }
  }, ((_loyalty$tier_progres2 = loyalty.tier_progress) === null || _loyalty$tier_progres2 === void 0 ? void 0 : _loyalty$tier_progres2.needed) || "—", " ", T.points, " ", T.nextTier, " ", T.tiers[loyalty.next_tier] || loyalty.next_tier), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      fontFamily: "var(--mono)",
      fontSize: 10,
      letterSpacing: "0.1em",
      color: "var(--ink-soft)",
      textTransform: "uppercase"
    }
  }, T.loyaltyInfo)) :
  /*#__PURE__*/
  /* Not logged in — beautiful teaser */
  React.createElement("div", {
    className: "loyalty-widget loyalty-teaser"
  }, /*#__PURE__*/React.createElement("div", {
    className: "loyalty-teaser-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "loyalty-teaser-orbs"
  }, ["🌸 Pétale", "🪷 Lotus", "🌟 Ambre"].map(function (tier, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: tier,
      className: "lto-chip",
      style: {
        opacity: 0.3 + i * 0.25,
        filter: "blur(".concat((2 - i) * 0.5, "px)")
      }
    }, tier);
  })), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-teaser-lock"
  }, "\uD83D\uDD12"), /*#__PURE__*/React.createElement("p", {
    className: "loyalty-teaser-title"
  }, T.fidTeaser), /*#__PURE__*/React.createElement("p", {
    className: "loyalty-teaser-sub"
  }, T.fidTeaserSub), /*#__PURE__*/React.createElement("button", {
    className: "btn-outline-sm",
    style: {
      marginTop: 16,
      width: "100%"
    },
    onClick: onOpenAuth
  }, T.fidCta)))), /*#__PURE__*/React.createElement("div", {
    className: "concours-card reveal",
    id: "concours"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, T.conLabel), /*#__PURE__*/React.createElement("h3", null, T.conTitle1, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, T.conTitle2)), contestLoading ? /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "loyalty-skeleton"
  }), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-skeleton",
    style: {
      width: "70%",
      marginTop: 8
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-skeleton",
    style: {
      width: "45%",
      marginTop: 8
    }
  })) : !contest ? /*#__PURE__*/React.createElement("div", {
    className: "no-contest"
  }, /*#__PURE__*/React.createElement("div", {
    className: "no-contest-icon"
  }, "\uD83C\uDF81"), /*#__PURE__*/React.createElement("p", {
    className: "no-contest-title"
  }, T.noContest), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--ink-soft)",
      marginTop: 6
    }
  }, T.noContestSub)) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, T.conText), contest.title && /*#__PURE__*/React.createElement("div", {
    className: "contest-prize"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 10,
      letterSpacing: "0.12em",
      color: "var(--rose-500)",
      textTransform: "uppercase"
    }
  }, T.prizeLabel), /*#__PURE__*/React.createElement("div", {
    className: "contest-prize-name"
  }, contest.title)), /*#__PURE__*/React.createElement("div", {
    className: "countdown-grid"
  }, [{
    v: time.d,
    l: T.days
  }, {
    v: time.h,
    l: T.hrs
  }, {
    v: time.m,
    l: T.min
  }, {
    v: time.s,
    l: T.sec
  }].map(function (_ref5) {
    var v = _ref5.v,
      l = _ref5.l;
    return /*#__PURE__*/React.createElement("div", {
      className: "countdown-cell",
      key: l
    }, /*#__PURE__*/React.createElement("div", {
      className: "num"
    }, pad(v)), /*#__PURE__*/React.createElement("div", {
      className: "lbl"
    }, l));
  })), entryCount > 0 && /*#__PURE__*/React.createElement("div", {
    className: "contest-entries t-mono"
  }, T.entryCount(entryCount)), entered ? /*#__PURE__*/React.createElement("div", {
    className: "btn-entered"
  }, T.entered) : /*#__PURE__*/React.createElement("button", {
    className: "btn-concours",
    onClick: handleEnter,
    disabled: entering
  }, entering ? T.entering : user ? T.enter : T.needAuth), entryError && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: "var(--mono)",
      fontSize: 11,
      color: "#EF4444"
    }
  }, entryError))))));
};

/* ============================================================
   SCENE — TRUST + NEWSLETTER + FOOTER
   ============================================================ */

var TrustScene = function TrustScene(_ref6) {
  var lang = _ref6.lang;
  var sceneRef = useRef(null);
  useSceneProgress(sceneRef);
  var _useState17 = useState(""),
    _useState18 = _slicedToArray(_useState17, 2),
    newsEmail = _useState18[0],
    setNewsEmail = _useState18[1];
  var _useState19 = useState("idle"),
    _useState20 = _slicedToArray(_useState19, 2),
    newsStatus = _useState20[0],
    setNewsStatus = _useState20[1]; // idle | loading | done | already | error

  var t = {
    fr: {
      eyebrow: "Pourquoi Latina",
      title1: "Une boutique",
      title2: "qui mérite",
      title3: "votre confiance.",
      cells: [{
        icon: /*#__PURE__*/React.createElement(IconTruck, {
          width: 28,
          height: 28
        }),
        h: "Livraison 58 wilayas",
        p: "De Tamanrasset à Annaba, partout en Algérie. Délais affichés à la commande."
      }, {
        icon: /*#__PURE__*/React.createElement(IconCash, {
          width: 28,
          height: 28
        }),
        h: "Paiement à la livraison",
        p: "Vous payez quand vous recevez. Vous voyez avant de décider."
      }, {
        icon: /*#__PURE__*/React.createElement(IconReturn, {
          width: 28,
          height: 28
        }),
        h: "Retour sous 7 jours",
        p: "Une pointure ne va pas ? On reprend gratuitement, sans question."
      }, {
        icon: /*#__PURE__*/React.createElement(IconShield, {
          width: 28,
          height: 28
        }),
        h: "Sélection vérifiée",
        p: "Chaque pièce contrôlée par notre équipe avant emballage."
      }],
      news: {
        title1: "Recevez les",
        title2: "nouveautés",
        title3: "en avant-première.",
        placeholder: "Votre adresse email",
        cta: "S'inscrire",
        tiny: "Aucun spam · Désabonnement en un clic",
        ok: "Merci ! Vous recevrez nos nouveautés en avant-première.",
        already: "Vous êtes déjà abonnée. À bientôt !",
        err: "Erreur, veuillez réessayer."
      }
    },
    ar: {
      eyebrow: "لماذا Latina",
      title1: "متجر",
      title2: "يستحق",
      title3: "ثقتك.",
      cells: [{
        icon: /*#__PURE__*/React.createElement(IconTruck, {
          width: 28,
          height: 28
        }),
        h: "توصيل 58 ولاية",
        p: "من تمنراست إلى عنابة. كل المدد معروضة عند الطلب."
      }, {
        icon: /*#__PURE__*/React.createElement(IconCash, {
          width: 28,
          height: 28
        }),
        h: "الدفع عند الاستلام",
        p: "تدفعين عند الاستلام. ترين قبل أن تقرري."
      }, {
        icon: /*#__PURE__*/React.createElement(IconReturn, {
          width: 28,
          height: 28
        }),
        h: "إرجاع خلال 7 أيام",
        p: "المقاس لا يناسب؟ نسترجعه مجاناً بدون أسئلة."
      }, {
        icon: /*#__PURE__*/React.createElement(IconShield, {
          width: 28,
          height: 28
        }),
        h: "اختيار موثوق",
        p: "كل قطعة يتحقق منها فريقنا قبل التغليف."
      }],
      news: {
        title1: "استلمي",
        title2: "الجديد",
        title3: "قبل الجميع.",
        placeholder: "بريدك الإلكتروني",
        cta: "اشتركي",
        tiny: "بدون إزعاج · إلغاء الاشتراك بنقرة واحدة",
        ok: "شكرًا! ستصلكِ أخبارنا.",
        already: "أنتِ مشتركة بالفعل.",
        err: "خطأ، حاولي مجددًا."
      }
    },
    en: {
      eyebrow: "Why Latina",
      title1: "A boutique",
      title2: "that earns",
      title3: "your trust.",
      cells: [{
        icon: /*#__PURE__*/React.createElement(IconTruck, {
          width: 28,
          height: 28
        }),
        h: "All 58 wilayas",
        p: "From Tamanrasset to Annaba — Algeria-wide. ETA shown at checkout."
      }, {
        icon: /*#__PURE__*/React.createElement(IconCash, {
          width: 28,
          height: 28
        }),
        h: "Cash on delivery",
        p: "Pay when you receive. See before you decide."
      }, {
        icon: /*#__PURE__*/React.createElement(IconReturn, {
          width: 28,
          height: 28
        }),
        h: "7-day returns",
        p: "Wrong size? We take it back free, no questions asked."
      }, {
        icon: /*#__PURE__*/React.createElement(IconShield, {
          width: 28,
          height: 28
        }),
        h: "Vetted selection",
        p: "Every piece checked by our team before packing."
      }],
      news: {
        title1: "Get the",
        title2: "newness",
        title3: "first.",
        placeholder: "Your email address",
        cta: "Subscribe",
        tiny: "No spam · One-click unsubscribe",
        ok: "Thank you! You'll receive our updates.",
        already: "You're already subscribed!",
        err: "Error, please try again."
      }
    }
  }[lang];
  var handleNewsletter = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
      var res, _t2;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            e.preventDefault();
            if (!(!newsEmail.trim() || newsStatus === "loading" || newsStatus === "done" || newsStatus === "already")) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2);
          case 1:
            setNewsStatus("loading");
            _context2.p = 2;
            _context2.n = 3;
            return window.latinaApi.subscribeNewsletter(newsEmail.trim());
          case 3:
            res = _context2.v;
            setNewsStatus(res.already ? "already" : "done");
            _context2.n = 5;
            break;
          case 4:
            _context2.p = 4;
            _t2 = _context2.v;
            setNewsStatus("error");
          case 5:
            return _context2.a(2);
        }
      }, _callee2, null, [[2, 4]]);
    }));
    return function handleNewsletter(_x) {
      return _ref7.apply(this, arguments);
    };
  }();
  var newsIsDone = newsStatus === "done" || newsStatus === "already";
  return /*#__PURE__*/React.createElement("section", {
    ref: sceneRef,
    className: "scene scene-trust",
    "data-screen-label": "06 Trust"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SceneMarker, {
    num: "06",
    label: "Trust",
    meta: "58 WILAYAS \xB7 COD"
  }), /*#__PURE__*/React.createElement("div", {
    className: "reveal",
    style: {
      marginBottom: 80
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 16
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "display",
    style: {
      fontSize: "clamp(40px,5.5vw,72px)",
      color: "var(--ink)",
      maxWidth: 760,
      lineHeight: 1,
      letterSpacing: "-0.015em"
    }
  }, t.title1, " ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: "var(--rose-500)",
      fontStyle: "italic"
    }
  }, t.title2), /*#__PURE__*/React.createElement("br", null), t.title3)), /*#__PURE__*/React.createElement("div", {
    className: "trust-row reveal-stagger"
  }, t.cells.map(function (c, i) {
    return /*#__PURE__*/React.createElement("div", {
      className: "trust-cell",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "icon"
    }, c.icon), /*#__PURE__*/React.createElement("h4", null, c.h), /*#__PURE__*/React.createElement("p", null, c.p));
  })), /*#__PURE__*/React.createElement("div", {
    className: "ws-block reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "ws-block-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-mono"
  }, "\u2014 ", {
    fr: "Vérifiez votre livraison",
    ar: "تحققي من التوصيل",
    en: "Check your delivery"
  }[lang]), /*#__PURE__*/React.createElement("h3", {
    className: "t-h4"
  }, {
    fr: "Wilaya · Commune · Frais en temps réel",
    ar: "الولاية · البلدية · الرسوم آنياً",
    en: "Wilaya · Commune · Live fee"
  }[lang])), /*#__PURE__*/React.createElement(WilayaSelector, {
    lang: lang
  })), /*#__PURE__*/React.createElement("div", {
    className: "newsletter reveal"
  }, /*#__PURE__*/React.createElement("h2", null, t.news.title1, " ", /*#__PURE__*/React.createElement("em", null, t.news.title2), /*#__PURE__*/React.createElement("br", null), t.news.title3), /*#__PURE__*/React.createElement("div", {
    className: "newsletter-form"
  }, newsIsDone ? /*#__PURE__*/React.createElement("div", {
    className: "newsletter-ok"
  }, /*#__PURE__*/React.createElement("span", {
    className: "newsletter-ok-icon"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", null, newsStatus === "already" ? t.news.already : t.news.ok)) : /*#__PURE__*/React.createElement("form", {
    className: "row",
    onSubmit: handleNewsletter
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: t.news.placeholder,
    value: newsEmail,
    onChange: function onChange(e) {
      setNewsEmail(e.target.value);
      if (newsStatus === "error") setNewsStatus("idle");
    },
    required: true,
    disabled: newsStatus === "loading"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: newsStatus === "loading"
  }, newsStatus === "loading" ? /*#__PURE__*/React.createElement("span", {
    className: "btn-spinner"
  }) : t.news.cta)), newsStatus === "error" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: "var(--mono)",
      fontSize: 11,
      color: "#EF4444"
    }
  }, t.news.err), !newsIsDone && /*#__PURE__*/React.createElement("div", {
    className: "tiny"
  }, t.news.tiny)))));
};
var Footer = function Footer(_ref8) {
  var lang = _ref8.lang;
  var t = {
    fr: {
      tagline: "Just for you.",
      cols: [{
        h: "Boutique",
        links: ["Chaussures", "Sacs", "Accessoires", "Nouveautés", "Promotions"]
      }, {
        h: "Compte",
        links: ["Mon compte", "Mes commandes", "Liste de souhaits", "Programme Fidélité", "Concours"]
      }, {
        h: "Aide",
        links: ["Livraison", "Retours", "Guide des tailles", "FAQ", "Contact"]
      }],
      bottom: ["© 2026 Latina · Alger, Algérie", "Conditions · Confidentialité · Mentions"]
    },
    ar: {
      tagline: "Just for you.",
      cols: [{
        h: "المتجر",
        links: ["الأحذية", "الحقائب", "الإكسسوارات", "الجديد", "العروض"]
      }, {
        h: "الحساب",
        links: ["حسابي", "طلباتي", "المفضلة", "برنامج الولاء", "المسابقة"]
      }, {
        h: "المساعدة",
        links: ["التوصيل", "الإرجاع", "دليل المقاسات", "الأسئلة", "اتصلي بنا"]
      }],
      bottom: ["© 2026 Latina · الجزائر العاصمة", "الشروط · الخصوصية"]
    },
    en: {
      tagline: "Just for you.",
      cols: [{
        h: "Shop",
        links: ["Shoes", "Bags", "Accessories", "New in", "Sale"]
      }, {
        h: "Account",
        links: ["My account", "Orders", "Wishlist", "Loyalty program", "Contest"]
      }, {
        h: "Help",
        links: ["Delivery", "Returns", "Size guide", "FAQ", "Contact"]
      }],
      bottom: ["© 2026 Latina · Algiers, Algeria", "Terms · Privacy · Legal"]
    }
  }[lang];
  return /*#__PURE__*/React.createElement("footer", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-col footer-brand"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(LotusMark, {
    size: 36,
    color: "var(--rose-500)"
  }), /*#__PURE__*/React.createElement("div", {
    className: "brand-name"
  }, "Latina")), /*#__PURE__*/React.createElement("p", null, t.tagline)), t.cols.map(function (c) {
    return /*#__PURE__*/React.createElement("div", {
      className: "footer-col",
      key: c.h
    }, /*#__PURE__*/React.createElement("h5", null, c.h), /*#__PURE__*/React.createElement("ul", null, c.links.map(function (l) {
      return /*#__PURE__*/React.createElement("li", {
        key: l
      }, /*#__PURE__*/React.createElement("a", {
        href: "#"
      }, l));
    })));
  })), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, /*#__PURE__*/React.createElement("span", null, t.bottom[0]), /*#__PURE__*/React.createElement("span", null, t.bottom[1])));
};
Object.assign(window, {
  RewardsScene: RewardsScene,
  TrustScene: TrustScene,
  Footer: Footer
});
