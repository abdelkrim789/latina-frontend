"use strict";

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
  var lang = _ref.lang;
  var sceneRef = useRef(null);
  useSceneProgress(sceneRef);
  var t = {
    fr: {
      fid: {
        label: "La Fidélité",
        title1: "Plus vous portez",
        title2: "Latina",
        title3: ", plus elle vous remercie.",
        text: "Chaque commande compte. Chaque paire vous rapproche d'une réduction, d'un cadeau, d'un avantage exclusif. Trois paliers : Pétale, Lotus, Ambre.",
        points: "1 240 pts",
        balance: "Solde fidélité",
        reward: "Prochaine récompense — 1 800 pts",
        tiers: ["Pétale", "Lotus", "Ambre"]
      },
      con: {
        label: "Le Concours",
        title1: "Tentez votre chance.",
        title2: "Tous les mois.",
        text: "Une cliente tirée au sort chaque mois remporte une paire au choix de la collection. Une commande = une participation. Aucun frais.",
        days: "Jours",
        hrs: "Heures",
        min: "Minutes",
        sec: "Secondes",
        cta: "Participer ce mois-ci →"
      }
    },
    ar: {
      fid: {
        label: "الولاء",
        title1: "كلما ارتديتِ",
        title2: "Latina",
        title3: "، كافأتكِ أكثر.",
        text: "كل طلب يُحتسب. كل حذاء يقرّبك من تخفيض، هدية، أو ميزة حصرية. ثلاث مراتب: بتلة، لوتس، عنبر.",
        points: "1240 نقطة",
        balance: "رصيد الولاء",
        reward: "المكافأة القادمة — 1800 نقطة",
        tiers: ["بتلة", "لوتس", "عنبر"]
      },
      con: {
        label: "المسابقة",
        title1: "جربي حظك.",
        title2: "كل شهر.",
        text: "زبونة واحدة تُسحب كل شهر وتربح حذاء من اختيارها من المجموعة. طلب واحد = مشاركة. مجاناً تماماً.",
        days: "أيام",
        hrs: "ساعات",
        min: "دقائق",
        sec: "ثوان",
        cta: "شاركي هذا الشهر →"
      }
    },
    en: {
      fid: {
        label: "Loyalty",
        title1: "The more you wear",
        title2: "Latina",
        title3: ", the more she thanks you.",
        text: "Every order counts. Every pair brings you closer to a discount, a gift, an exclusive perk. Three tiers: Petal, Lotus, Amber.",
        points: "1,240 pts",
        balance: "Loyalty balance",
        reward: "Next reward — 1,800 pts",
        tiers: ["Petal", "Lotus", "Amber"]
      },
      con: {
        label: "The Contest",
        title1: "Try your luck.",
        title2: "Every month.",
        text: "One client drawn at random each month wins a pair of her choice from the collection. One order = one entry. Free of charge.",
        days: "Days",
        hrs: "Hours",
        min: "Minutes",
        sec: "Seconds",
        cta: "Enter this month →"
      }
    }
  }[lang];

  // Live countdown to end of month
  var _useState = useState(function () {
      return calc();
    }),
    _useState2 = _slicedToArray(_useState, 2),
    time = _useState2[0],
    setTime = _useState2[1];
  function calc() {
    var now = new Date();
    var end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    var diff = end - now;
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor(diff / 3600000 % 24),
      m: Math.floor(diff / 60000 % 60),
      s: Math.floor(diff / 1000 % 60)
    };
  }
  useEffect(function () {
    var i = setInterval(function () {
      return setTime(calc());
    }, 1000);
    return function () {
      return clearInterval(i);
    };
  }, []);
  var pad = function pad(n) {
    return String(n).padStart(2, "0");
  };
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
  }, t.fid.label), /*#__PURE__*/React.createElement("h3", null, t.fid.title1, " ", /*#__PURE__*/React.createElement("em", null, t.fid.title2), t.fid.title3), /*#__PURE__*/React.createElement("p", null, t.fid.text), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-widget"
  }, /*#__PURE__*/React.createElement("div", {
    className: "loyalty-row"
  }, /*#__PURE__*/React.createElement("span", null, t.fid.balance), /*#__PURE__*/React.createElement("span", {
    className: "points"
  }, t.fid.points)), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fill"
  })), /*#__PURE__*/React.createElement("div", {
    className: "loyalty-tiers"
  }, t.fid.tiers.map(function (tier) {
    return /*#__PURE__*/React.createElement("span", {
      key: tier
    }, tier);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontFamily: "var(--mono)",
      fontSize: 10,
      letterSpacing: "0.15em",
      color: "var(--rose-500)",
      textTransform: "uppercase"
    }
  }, t.fid.reward))), /*#__PURE__*/React.createElement("div", {
    className: "concours-card reveal",
    id: "concours"
  }, /*#__PURE__*/React.createElement("span", {
    className: "label"
  }, t.con.label), /*#__PURE__*/React.createElement("h3", null, t.con.title1, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, t.con.title2)), /*#__PURE__*/React.createElement("p", null, t.con.text), /*#__PURE__*/React.createElement("div", {
    className: "countdown-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "countdown-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, pad(time.d)), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t.con.days)), /*#__PURE__*/React.createElement("div", {
    className: "countdown-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, pad(time.h)), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t.con.hrs)), /*#__PURE__*/React.createElement("div", {
    className: "countdown-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, pad(time.m)), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t.con.min)), /*#__PURE__*/React.createElement("div", {
    className: "countdown-cell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "num"
  }, pad(time.s)), /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, t.con.sec))), /*#__PURE__*/React.createElement("button", {
    className: "btn-concours"
  }, t.con.cta)))));
};

/* ============================================================
   SCENE — TRUST + NEWSLETTER + FOOTER
   ============================================================ */

var TrustScene = function TrustScene(_ref2) {
  var lang = _ref2.lang;
  var sceneRef = useRef(null);
  useSceneProgress(sceneRef);
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
        tiny: "Aucun spam · Désabonnement en un clic"
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
        tiny: "بدون إزعاج · إلغاء الاشتراك بنقرة واحدة"
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
        tiny: "No spam · One-click unsubscribe"
      }
    }
  }[lang];
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
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    placeholder: t.news.placeholder
  }), /*#__PURE__*/React.createElement("button", null, t.news.cta)), /*#__PURE__*/React.createElement("div", {
    className: "tiny"
  }, t.news.tiny)))));
};
var Footer = function Footer(_ref3) {
  var lang = _ref3.lang;
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
