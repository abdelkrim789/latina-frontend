"use strict";

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
/* global React */
var _React = React,
  useState = _React.useState,
  useEffect = _React.useEffect,
  useRef = _React.useRef,
  useMemo = _React.useMemo;

/* ============================================================
   SCENE — HERO
   ============================================================ */

var HeroScene = function HeroScene(_ref) {
  var lang = _ref.lang,
    onAdd = _ref.onAdd;
  var sceneRef = useRef(null);
  useSceneProgress(sceneRef);
  var t = {
    fr: {
      eyebrow: "Nouvelle collection · Printemps 2026",
      title1: "Chaque pas,",
      title2: "une histoire",
      title3: "à porter.",
      sub: "Chaussures, sacs et accessoires pour la femme algérienne. Une boutique pensée comme un écrin — où chaque pièce arrive emballée avec soin, livrée chez vous, payée à la livraison.",
      cta1: "Découvrir la collection",
      cta2: "Notre histoire",
      stats: [{
        num: "2 400+",
        lbl: "Clientes confiantes"
      }, {
        num: "58",
        lbl: "Wilayas livrées"
      }, {
        num: "4.9",
        lbl: "Note moyenne ★"
      }],
      scroll: "Faites défiler"
    },
    ar: {
      eyebrow: "مجموعة جديدة · ربيع 2026",
      title1: "كل خطوة،",
      title2: "حكاية",
      title3: "ترتدينها.",
      sub: "أحذية، حقائب، وإكسسوارات للمرأة الجزائرية. متجر مصمم ليكون كصندوق هدية — كل قطعة مغلفة بعناية، تصلك أينما كنت، الدفع عند الاستلام.",
      cta1: "اكتشفي المجموعة",
      cta2: "قصتنا",
      stats: [{
        num: "+2400",
        lbl: "زبونة سعيدة"
      }, {
        num: "58",
        lbl: "ولاية"
      }, {
        num: "4.9",
        lbl: "تقييم ★"
      }],
      scroll: "تمريرة"
    },
    en: {
      eyebrow: "New collection · Spring 2026",
      title1: "Every step,",
      title2: "a story",
      title3: "to wear.",
      sub: "Shoes, bags and accessories for the Algerian woman. A boutique built like a jewel box — every piece wrapped with care, delivered to your door, paid on arrival.",
      cta1: "Discover the collection",
      cta2: "Our story",
      stats: [{
        num: "2,400+",
        lbl: "Happy clients"
      }, {
        num: "58",
        lbl: "Wilayas delivered"
      }, {
        num: "4.9",
        lbl: "Avg rating ★"
      }],
      scroll: "Scroll"
    }
  }[lang];
  return /*#__PURE__*/React.createElement("section", {
    ref: sceneRef,
    className: "scene scene-hero",
    id: "hero",
    "data-screen-label": "01 Hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SceneMarker, {
    num: "01",
    label: "Hero",
    meta: "LATINA \xB7 2026"
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-left reveal-stagger"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-eyebrow"
  }, t.eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "hero-title"
  }, t.title1, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, t.title2), /*#__PURE__*/React.createElement("br", null), t.title3), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, t.sub), /*#__PURE__*/React.createElement("div", {
    className: "hero-ctas"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-primary"
  }, t.cta1), /*#__PURE__*/React.createElement("button", {
    className: "btn-ghost"
  }, t.cta2)), /*#__PURE__*/React.createElement("div", {
    className: "hero-stat-grid"
  }, t.stats.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      className: "hero-stat",
      key: i
    }, /*#__PURE__*/React.createElement("div", {
      className: "num"
    }, s.num), /*#__PURE__*/React.createElement("div", {
      className: "lbl"
    }, s.lbl));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "hero-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-platter"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-lotus"
  }, /*#__PURE__*/React.createElement(LotusMark, {
    size: 140,
    color: "var(--rose-500)"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "floating-product fp-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "product-image"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ph-label"
  }, "Escarpins"), /*#__PURE__*/React.createElement("span", {
    className: "ph-sku"
  }, "SKU\xB7LT-EC-082")), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, "Aur\xE9lie Nude"), /*#__PURE__*/React.createElement("div", {
    className: "price"
  }, "7 900 DA"))), /*#__PURE__*/React.createElement("div", {
    className: "floating-product fp-2",
    style: {
      "--r": "5deg"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "product-image"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ph-label"
  }, "Sac"), /*#__PURE__*/React.createElement("span", {
    className: "ph-sku"
  }, "SKU\xB7LT-SA-014")), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, "Lila Rose"), /*#__PURE__*/React.createElement("div", {
    className: "price"
  }, "9 200 DA"))), /*#__PURE__*/React.createElement("div", {
    className: "floating-product fp-3",
    style: {
      "--r": "-3deg"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "product-image"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ph-label"
  }, "Sandales"), /*#__PURE__*/React.createElement("span", {
    className: "ph-sku"
  }, "SKU\xB7LT-SD-029")), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, "Soraya Or"), /*#__PURE__*/React.createElement("div", {
    className: "price"
  }, "6 400 DA"))))))), /*#__PURE__*/React.createElement("div", {
    className: "scroll-indicator"
  }, /*#__PURE__*/React.createElement("span", null, t.scroll), /*#__PURE__*/React.createElement("div", {
    className: "line"
  })));
};

/* ============================================================
   SCENE — MANIFESTO
   ============================================================ */

var ManifestoScene = function ManifestoScene(_ref2) {
  var lang = _ref2.lang;
  var sceneRef = useRef(null);
  useSceneProgress(sceneRef);
  var t = {
    fr: {
      eyebrow: "Just for you",
      title1: "Un soin,",
      title2: "une attention,",
      title3: "rien que pour vous.",
      line: "« Notre mission n'est pas de vendre. Elle est de gagner votre confiance, paire après paire. »",
      pillars: [{
        num: "01",
        title: "Conçu avec soin",
        text: "Chaque modèle choisi par notre équipe à Alger. Aucun envoi de masse, aucune surprise."
      }, {
        num: "02",
        title: "Emballé comme un cadeau",
        text: "Votre commande arrive dans une boîte signée Latina, prête à être offerte — ou à vous offrir."
      }, {
        num: "03",
        title: "Payez à la livraison",
        text: "Vous voyez, vous touchez, vous décidez. Le paiement se fait quand la commande est entre vos mains."
      }]
    },
    ar: {
      eyebrow: "JUST FOR YOU",
      title1: "عناية،",
      title2: "اهتمام،",
      title3: "من أجلك أنتِ فقط.",
      line: "« مهمتنا ليست البيع. مهمتنا أن نكسب ثقتك، حذاءً بعد حذاء. »",
      pillars: [{
        num: "01",
        title: "اختيار بعناية",
        text: "كل قطعة يختارها فريقنا في الجزائر العاصمة. لا شحنات جماعية، لا مفاجآت."
      }, {
        num: "02",
        title: "مغلفة كهدية",
        text: "طلبك يصلك في علبة Latina جاهزة لأن تُهدى — أو تهدي بها نفسك."
      }, {
        num: "03",
        title: "ادفعي عند الاستلام",
        text: "ترين، تلمسين، تقررين. الدفع يكون عندما يكون الطلب بين يديك."
      }]
    },
    en: {
      eyebrow: "Just for you",
      title1: "Care,",
      title2: "attention,",
      title3: "for you alone.",
      line: "“Our mission isn't to sell. It's to earn your trust, pair after pair.”",
      pillars: [{
        num: "01",
        title: "Chosen with care",
        text: "Every piece picked by our Algiers team. No mass drops, no surprises."
      }, {
        num: "02",
        title: "Wrapped like a gift",
        text: "Your order arrives in a signed Latina box — ready to be gifted, or to gift yourself."
      }, {
        num: "03",
        title: "Pay on arrival",
        text: "See it, touch it, decide. Payment happens once the order is in your hands."
      }]
    }
  }[lang];
  return /*#__PURE__*/React.createElement("section", {
    ref: sceneRef,
    className: "scene scene-manifesto",
    "data-screen-label": "02 Manifesto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SceneMarker, {
    num: "02",
    label: "Manifesto",
    meta: "JUST FOR YOU"
  }), /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "manifesto-eyebrow"
  }, /*#__PURE__*/React.createElement("span", {
    className: "line"
  }), /*#__PURE__*/React.createElement("span", {
    className: "word"
  }, t.eyebrow), /*#__PURE__*/React.createElement("span", {
    className: "line"
  })), /*#__PURE__*/React.createElement("h2", {
    className: "manifesto-title"
  }, t.title1, " ", /*#__PURE__*/React.createElement("em", null, t.title2), /*#__PURE__*/React.createElement("br", null), t.title3), /*#__PURE__*/React.createElement("p", {
    className: "manifesto-line"
  }, t.line)), /*#__PURE__*/React.createElement("div", {
    className: "manifesto-pillars reveal-stagger"
  }, t.pillars.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      className: "pillar",
      key: p.num
    }, /*#__PURE__*/React.createElement("span", {
      className: "num"
    }, p.num), /*#__PURE__*/React.createElement("div", {
      className: "pillar-title"
    }, p.title), /*#__PURE__*/React.createElement("div", {
      className: "pillar-text"
    }, p.text));
  }))));
};

/* ============================================================
   SCENE — COLLECTION
   ============================================================ */

var CollectionScene = function CollectionScene(_ref3) {
  var lang = _ref3.lang,
    onAdd = _ref3.onAdd,
    onAddProduct = _ref3.onAddProduct,
    _onQuickView = _ref3.onQuickView,
    segment = _ref3.segment,
    onSegmentChange = _ref3.onSegmentChange,
    wishlist = _ref3.wishlist,
    onWishlist = _ref3.onWishlist,
    onProductView = _ref3.onProductView;
  var sceneRef = useRef(null);
  useSceneProgress(sceneRef);
  var _useState = useState("shoes"),
    _useState2 = _slicedToArray(_useState, 2),
    tab = _useState2[0],
    setTab = _useState2[1];
  var _useState3 = useState({
      colors: [],
      sizes: [],
      heel: [],
      materials: []
    }),
    _useState4 = _slicedToArray(_useState3, 2),
    filters = _useState4[0],
    setFilters = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    apiProducts = _useState6[0],
    setApiProducts = _useState6[1]; // null = not loaded yet

  // Try to fetch live products from API — fall back to hardcoded PRODUCTS on failure
  useEffect(function () {
    var api = window.latinaApi;
    if (!api) return;
    var catMap = {
      shoes: "chaussures",
      bags: "sacs",
      access: "accessoires"
    };
    api.getProducts({
      per_page: 40,
      segment: segment !== "ALL" ? segment : undefined
    }).then(function (data) {
      var items = (data.data || []).map(function (p) {
        var _p$effective_price, _p$attributes, _p$attributes2, _p$attributes3, _p$attributes$heel_he, _p$attributes4, _p$primary_image, _p$category, _p$category2, _p$category3, _p$category4;
        return {
          sku: p.sku,
          name: p.name_fr || p.name,
          name_ar: p.name_ar,
          name_en: p.name_en,
          price: (_p$effective_price = p.effective_price) !== null && _p$effective_price !== void 0 ? _p$effective_price : p.price,
          compare: p.compare_price,
          badge: p.flash_sale ? "-".concat(p.flash_sale.discount_percent, "%") : p.is_featured ? "★" : null,
          stock: p.stock,
          sizes: ((_p$attributes = p.attributes) === null || _p$attributes === void 0 ? void 0 : _p$attributes.sizes) || [],
          colors: ((_p$attributes2 = p.attributes) === null || _p$attributes2 === void 0 ? void 0 : _p$attributes2.colors) || [],
          materials: ((_p$attributes3 = p.attributes) === null || _p$attributes3 === void 0 ? void 0 : _p$attributes3.materials) || [],
          heel: (_p$attributes$heel_he = (_p$attributes4 = p.attributes) === null || _p$attributes4 === void 0 ? void 0 : _p$attributes4.heel_height) !== null && _p$attributes$heel_he !== void 0 ? _p$attributes$heel_he : 0,
          audience: [p.segment || "ALL"],
          img: ((_p$primary_image = p.primary_image) === null || _p$primary_image === void 0 ? void 0 : _p$primary_image.url) || "assets/placeholder.jpg",
          variants: p.variants || [],
          _tab: ((_p$category = p.category) === null || _p$category === void 0 ? void 0 : _p$category.slug) === 'sacs' || (_p$category2 = p.category) !== null && _p$category2 !== void 0 && (_p$category2 = _p$category2.slug) !== null && _p$category2 !== void 0 && _p$category2.startsWith('sac') ? "bags" : ((_p$category3 = p.category) === null || _p$category3 === void 0 ? void 0 : _p$category3.slug) === 'accessoires' || ((_p$category4 = p.category) === null || _p$category4 === void 0 || (_p$category4 = _p$category4.parent) === null || _p$category4 === void 0 ? void 0 : _p$category4.slug) === 'accessoires' ? "access" : "shoes",
          _apiId: p.id
        };
      });
      setApiProducts(items);
    })["catch"](function () {
      setApiProducts([]);
    })["finally"](function () {
      return setProductsLoading(false);
    }); // silent fallback
  }, [segment]);
  var _useState7 = useState(true),
    _useState8 = _slicedToArray(_useState7, 2),
    productsLoading = _useState8[0],
    setProductsLoading = _useState8[1];
  var _useState9 = useState(false),
    _useState0 = _slicedToArray(_useState9, 2),
    drawerOpen = _useState0[0],
    setDrawerOpen = _useState0[1];
  var t = {
    fr: {
      eyebrow: "La Collection",
      title1: "Sélection",
      title2: "du moment",
      tabs: {
        shoes: "Chaussures",
        bags: "Sacs",
        access: "Accessoires"
      },
      all: "Voir tout le catalogue",
      filtersBtn: "Filtres",
      empty: "Aucun produit ne correspond à vos filtres."
    },
    ar: {
      eyebrow: "المجموعة",
      title1: "اختيار",
      title2: "اللحظة",
      tabs: {
        shoes: "الأحذية",
        bags: "الحقائب",
        access: "الإكسسوارات"
      },
      all: "الكتالوج كامل",
      filtersBtn: "تصفية",
      empty: "لا توجد منتجات تطابق التصفية."
    },
    en: {
      eyebrow: "The Collection",
      title1: "Selection",
      title2: "of the moment",
      tabs: {
        shoes: "Shoes",
        bags: "Bags",
        access: "Accessories"
      },
      all: "See full catalogue",
      filtersBtn: "Filters",
      empty: "No products match your filters."
    }
  }[lang];

  // Use live API products (DB-backed only — no hardcoded fallback)
  var currentProducts = useMemo(function () {
    if (!apiProducts) return [];
    return apiProducts.filter(function (p) {
      return p._tab === tab;
    });
  }, [apiProducts, tab]);

  // Sizes available for the current tab (only shoes have sizes).
  var availableSizes = useMemo(function () {
    var set = new Set();
    currentProducts.forEach(function (p) {
      return (p.sizes || []).forEach(function (s) {
        return set.add(s);
      });
    });
    return _toConsumableArray(set).sort(function (a, b) {
      return a - b;
    });
  }, [currentProducts]);
  var filtered = useMemo(function () {
    return applyFilters(currentProducts, filters, segment);
  }, [currentProducts, filters, segment]);
  var clearFilters = function clearFilters() {
    return setFilters({
      colors: [],
      sizes: [],
      heel: [],
      materials: []
    });
  };
  var wishSet = new Set(wishlist || []);
  return /*#__PURE__*/React.createElement("section", {
    ref: sceneRef,
    className: "scene scene-collection scene-collection-v2",
    id: "collection",
    "data-screen-label": "03 Collection"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(SceneMarker, {
    num: "03",
    label: "Collection",
    meta: "".concat(filtered.length, " / ").concat(currentProducts.length)
  }), /*#__PURE__*/React.createElement("div", {
    className: "reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 16
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("div", {
    className: "collection-head"
  }, /*#__PURE__*/React.createElement("h2", null, t.title1, " ", /*#__PURE__*/React.createElement("em", null, t.title2)), /*#__PURE__*/React.createElement("div", {
    className: "collection-controls"
  }, /*#__PURE__*/React.createElement(SegmentToggle, {
    value: segment || "ALL",
    onChange: onSegmentChange,
    lang: lang
  }), /*#__PURE__*/React.createElement("div", {
    className: "collection-tabs"
  }, ["shoes", "bags", "access"].map(function (k) {
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      className: tab === k ? "active" : "",
      onClick: function onClick() {
        return setTab(k);
      }
    }, t.tabs[k]);
  })), /*#__PURE__*/React.createElement("button", {
    className: "filter-toggle t-mono",
    onClick: function onClick() {
      return setDrawerOpen(function (o) {
        return !o;
      });
    }
  }, "\u2630 ", t.filtersBtn)))), /*#__PURE__*/React.createElement("div", {
    className: "collection-layout ".concat(drawerOpen ? "drawer-open" : "")
  }, /*#__PURE__*/React.createElement(FilterRail, {
    filters: filters,
    setFilters: setFilters,
    lang: lang,
    availableSizes: availableSizes,
    onClear: clearFilters,
    count: filtered.length
  }), /*#__PURE__*/React.createElement("div", {
    className: "collection-main"
  }, productsLoading ? /*#__PURE__*/React.createElement("div", {
    className: "collection-empty t-body",
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 28,
      border: "2px solid rgba(122,69,48,.2)",
      borderTopColor: "var(--rose-500)",
      borderRadius: "50%",
      animation: "spin .7s linear infinite"
    }
  }), /*#__PURE__*/React.createElement("span", null, "Chargement des produits\u2026")) : filtered.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "collection-empty t-body"
  }, t.empty) : /*#__PURE__*/React.createElement("div", {
    className: "collection-grid",
    key: "".concat(tab, "-").concat(segment)
  }, filtered.map(function (p) {
    return /*#__PURE__*/React.createElement(ProductCard, {
      key: p.sku || p._apiId,
      product: p,
      onAdd: onAdd,
      onQuickView: function onQuickView(prod, opts) {
        onProductView === null || onProductView === void 0 || onProductView(prod);
        _onQuickView === null || _onQuickView === void 0 || _onQuickView(prod, opts);
      },
      onWishlist: onWishlist,
      wishlisted: wishSet.has(p.sku),
      badge: p.badge,
      lang: lang
    });
  })))), /*#__PURE__*/React.createElement("div", {
    className: "collection-foot reveal"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn-secondary"
  }, t.all))));
};

/* ============================================================
   SCENE — TWO SEGMENTS
   ============================================================ */

var SegmentsScene = function SegmentsScene(_ref4) {
  var lang = _ref4.lang,
    onEnterSegment = _ref4.onEnterSegment;
  var t = {
    fr: {
      eyebrow: "Deux univers, une boutique",
      title: "Choisissez le vôtre",
      a: {
        age: "12 — 30",
        small: "ans",
        title: "Pour la jeune femme moderne",
        text: "Tendances, sneakers, sacs colorés, bijoux audacieux. Une sélection vivante, mise à jour chaque semaine.",
        enter: "Entrer dans l'univers"
      },
      b: {
        age: "30 — 50",
        small: "ans",
        title: "Pour la femme accomplie",
        text: "Pièces classiques, cuirs nobles, escarpins intemporels. La qualité avant la quantité, le détail avant le bruit.",
        enter: "Entrer dans l'univers"
      },
      and: "&"
    },
    ar: {
      eyebrow: "عالمان، متجر واحد",
      title: "اختاري عالمكِ",
      a: {
        age: "30 — 12",
        small: "سنة",
        title: "للشابة العصرية",
        text: "صيحات، أحذية رياضية، حقائب ملونة، إكسسوارات جريئة. تشكيلة حية تتجدد كل أسبوع.",
        enter: "ادخلي العالم"
      },
      b: {
        age: "50 — 30",
        small: "سنة",
        title: "للمرأة الناضجة",
        text: "قطع كلاسيكية، جلود أصيلة، كعب أنيق دائم. الجودة قبل الكمية.",
        enter: "ادخلي العالم"
      },
      and: "&"
    },
    en: {
      eyebrow: "Two worlds, one boutique",
      title: "Choose yours",
      a: {
        age: "12 — 30",
        small: "y/o",
        title: "For the modern young woman",
        text: "Trends, sneakers, bright bags, bold jewellery. A living selection, refreshed every week.",
        enter: "Enter the world"
      },
      b: {
        age: "30 — 50",
        small: "y/o",
        title: "For the accomplished woman",
        text: "Classic pieces, fine leathers, timeless heels. Quality over quantity, detail over noise.",
        enter: "Enter the world"
      },
      and: "&"
    }
  }[lang];
  return /*#__PURE__*/React.createElement("section", {
    className: "scene-segments",
    "data-screen-label": "04 Segments",
    id: "segments"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "120px 24px 60px",
      background: "var(--cream-100)"
    },
    className: "reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "label",
    style: {
      marginBottom: 16
    }
  }, t.eyebrow), /*#__PURE__*/React.createElement("h2", {
    className: "display",
    style: {
      fontSize: "clamp(40px,5.5vw,72px)",
      color: "var(--ink)"
    }
  }, /*#__PURE__*/React.createElement("em", {
    style: {
      color: "var(--rose-500)",
      fontStyle: "italic"
    }
  }, t.title))), /*#__PURE__*/React.createElement("div", {
    className: "segments-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "segment segment-a",
    onClick: function onClick() {
      return onEnterSegment === null || onEnterSegment === void 0 ? void 0 : onEnterSegment("A");
    },
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "segment-content reveal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "age"
  }, t.a.age, /*#__PURE__*/React.createElement("small", null, t.a.small)), /*#__PURE__*/React.createElement("h3", null, t.a.title), /*#__PURE__*/React.createElement("p", null, t.a.text), /*#__PURE__*/React.createElement("span", {
    className: "enter"
  }, t.a.enter, " \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "segment-decoration"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "var(--cream-50)",
      border: "1px solid var(--rose-200)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 30px 60px -10px rgba(122,69,48,0.15)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--display)",
      fontSize: 18,
      color: "var(--rose-500)",
      fontStyle: "italic"
    }
  }, "Sneakers"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 9,
      letterSpacing: "0.2em",
      color: "var(--ink-mute)",
      marginTop: 6
    }
  }, "\xB7  TENDANCES  \xB7")))), /*#__PURE__*/React.createElement("div", {
    className: "segment-divider"
  }, t.and), /*#__PURE__*/React.createElement("div", {
    className: "segment segment-b",
    onClick: function onClick() {
      return onEnterSegment === null || onEnterSegment === void 0 ? void 0 : onEnterSegment("B");
    },
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "segment-content reveal",
    style: {
      alignItems: "flex-end",
      textAlign: "right",
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "age"
  }, t.b.age, /*#__PURE__*/React.createElement("small", null, t.b.small)), /*#__PURE__*/React.createElement("h3", null, t.b.title), /*#__PURE__*/React.createElement("p", null, t.b.text), /*#__PURE__*/React.createElement("span", {
    className: "enter"
  }, t.b.enter, " \u2192")), /*#__PURE__*/React.createElement("div", {
    className: "segment-decoration",
    style: {
      left: "5%",
      right: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      background: "var(--cream-50)",
      border: "1px solid var(--rose-200)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 30px 60px -10px rgba(122,69,48,0.15)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--display)",
      fontSize: 18,
      color: "var(--rose-500)",
      fontStyle: "italic"
    }
  }, "Escarpins"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--mono)",
      fontSize: 9,
      letterSpacing: "0.2em",
      color: "var(--ink-mute)",
      marginTop: 6
    }
  }, "\xB7  CLASSIQUES  \xB7"))))));
};
Object.assign(window, {
  HeroScene: HeroScene,
  ManifestoScene: ManifestoScene,
  CollectionScene: CollectionScene,
  SegmentsScene: SegmentsScene
});
