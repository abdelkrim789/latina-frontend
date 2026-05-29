(() => {
  // scenes-1.jsx
  var { useState, useEffect, useRef, useMemo } = React;
  var HeroScene = ({ lang, onAdd }) => {
    const sceneRef = useRef(null);
    useSceneProgress(sceneRef);
    const t = {
      fr: {
        eyebrow: "Nouvelle collection \xB7 Printemps 2026",
        title1: "Chaque pas,",
        title2: "une histoire",
        title3: "\xE0 porter.",
        sub: "Chaussures, sacs et accessoires pour la femme alg\xE9rienne. Une boutique pens\xE9e comme un \xE9crin \u2014 o\xF9 chaque pi\xE8ce arrive emball\xE9e avec soin, livr\xE9e chez vous, pay\xE9e \xE0 la livraison.",
        cta1: "D\xE9couvrir la collection",
        cta2: "Notre histoire",
        cta3: "\u2726 Voir nos tenues exclusives",
        stats: [
          { num: "2 400+", lbl: "Clientes confiantes" },
          { num: "69", lbl: "Wilayas livr\xE9es" },
          { num: "4.9", lbl: "Note moyenne \u2605" }
        ],
        scroll: "Faites d\xE9filer"
      },
      ar: {
        eyebrow: "\u0645\u062C\u0645\u0648\u0639\u0629 \u062C\u062F\u064A\u062F\u0629 \xB7 \u0631\u0628\u064A\u0639 2026",
        title1: "\u0643\u0644 \u062E\u0637\u0648\u0629\u060C",
        title2: "\u062D\u0643\u0627\u064A\u0629",
        title3: "\u062A\u0631\u062A\u062F\u064A\u0646\u0647\u0627.",
        sub: "\u0623\u062D\u0630\u064A\u0629\u060C \u062D\u0642\u0627\u0626\u0628\u060C \u0648\u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062A \u0644\u0644\u0645\u0631\u0623\u0629 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A\u0629. \u0645\u062A\u062C\u0631 \u0645\u0635\u0645\u0645 \u0644\u064A\u0643\u0648\u0646 \u0643\u0635\u0646\u062F\u0648\u0642 \u0647\u062F\u064A\u0629 \u2014 \u0643\u0644 \u0642\u0637\u0639\u0629 \u0645\u063A\u0644\u0641\u0629 \u0628\u0639\u0646\u0627\u064A\u0629\u060C \u062A\u0635\u0644\u0643 \u0623\u064A\u0646\u0645\u0627 \u0643\u0646\u062A\u060C \u0627\u0644\u062F\u0641\u0639 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645.",
        cta1: "\u0627\u0643\u062A\u0634\u0641\u064A \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629",
        cta2: "\u0642\u0635\u062A\u0646\u0627",
        cta3: "\u2726 \u0627\u0643\u062A\u0634\u0641\u064A \u062A\u0646\u0633\u064A\u0642\u0627\u062A\u0646\u0627 \u0627\u0644\u062D\u0635\u0631\u064A\u0629",
        stats: [
          { num: "+2400", lbl: "\u0632\u0628\u0648\u0646\u0629 \u0633\u0639\u064A\u062F\u0629" },
          { num: "69", lbl: "\u0648\u0644\u0627\u064A\u0629" },
          { num: "4.9", lbl: "\u062A\u0642\u064A\u064A\u0645 \u2605" }
        ],
        scroll: "\u062A\u0645\u0631\u064A\u0631\u0629"
      },
      en: {
        eyebrow: "New collection \xB7 Spring 2026",
        title1: "Every step,",
        title2: "a story",
        title3: "to wear.",
        sub: "Shoes, bags and accessories for the Algerian woman. A boutique built like a jewel box \u2014 every piece wrapped with care, delivered to your door, paid on arrival.",
        cta1: "Discover the collection",
        cta2: "Our story",
        cta3: "\u2726 See our exclusive sets",
        stats: [
          { num: "2,400+", lbl: "Happy clients" },
          { num: "69", lbl: "Wilayas delivered" },
          { num: "4.9", lbl: "Avg rating \u2605" }
        ],
        scroll: "Scroll"
      }
    }[lang];
    return /* @__PURE__ */ React.createElement("section", { ref: sceneRef, className: "scene scene-hero", id: "hero", "data-screen-label": "01 Hero" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(SceneMarker, { num: "01", label: "Hero", meta: "LATINA \xB7 2026" }), /* @__PURE__ */ React.createElement("div", { className: "hero-grid" }, /* @__PURE__ */ React.createElement("div", { className: "hero-left reveal-stagger" }, /* @__PURE__ */ React.createElement("div", { className: "hero-eyebrow" }, t.eyebrow), /* @__PURE__ */ React.createElement("h1", { className: "hero-title" }, t.title1, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, t.title2), /* @__PURE__ */ React.createElement("br", null), t.title3), /* @__PURE__ */ React.createElement("p", { className: "hero-sub" }, t.sub), /* @__PURE__ */ React.createElement("div", { className: "hero-ctas" }, /* @__PURE__ */ React.createElement("button", { className: "btn-primary", onClick: () => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth", block: "start" }) }, t.cta1), /* @__PURE__ */ React.createElement("button", { className: "btn-ghost", onClick: () => document.getElementById("our-story")?.scrollIntoView({ behavior: "smooth", block: "start" }) }, t.cta2)), /* @__PURE__ */ React.createElement("button", { className: "hero-packs-pill", onClick: () => document.getElementById("packs")?.scrollIntoView({ behavior: "smooth", block: "start" }) }, t.cta3), /* @__PURE__ */ React.createElement("div", { className: "hero-stat-grid" }, t.stats.map((s, i) => /* @__PURE__ */ React.createElement("div", { className: "hero-stat", key: i }, /* @__PURE__ */ React.createElement("div", { className: "num" }, s.num), /* @__PURE__ */ React.createElement("div", { className: "lbl" }, s.lbl))))), /* @__PURE__ */ React.createElement("div", { className: "hero-right" }, /* @__PURE__ */ React.createElement("div", { className: "hero-stage" }, /* @__PURE__ */ React.createElement("div", { className: "hero-platter" }, /* @__PURE__ */ React.createElement("div", { className: "hero-lotus" }, /* @__PURE__ */ React.createElement(LotusMark, { size: 120 }))), /* @__PURE__ */ React.createElement("div", { className: "floating-product fp-1" }, /* @__PURE__ */ React.createElement("div", { className: "product-image" }, /* @__PURE__ */ React.createElement("span", { className: "ph-label" }, "Escarpins"), /* @__PURE__ */ React.createElement("span", { className: "ph-sku" }, "SKU\xB7LT-EC-082")), /* @__PURE__ */ React.createElement("div", { className: "meta" }, /* @__PURE__ */ React.createElement("div", { className: "name" }, "Aur\xE9lie Nude"), /* @__PURE__ */ React.createElement("div", { className: "price" }, "7 900 DA"))), /* @__PURE__ */ React.createElement("div", { className: "floating-product fp-2", style: { "--r": "5deg" } }, /* @__PURE__ */ React.createElement("div", { className: "product-image" }, /* @__PURE__ */ React.createElement("span", { className: "ph-label" }, "Sac"), /* @__PURE__ */ React.createElement("span", { className: "ph-sku" }, "SKU\xB7LT-SA-014")), /* @__PURE__ */ React.createElement("div", { className: "meta" }, /* @__PURE__ */ React.createElement("div", { className: "name" }, "Lila Rose"), /* @__PURE__ */ React.createElement("div", { className: "price" }, "9 200 DA"))), /* @__PURE__ */ React.createElement("div", { className: "floating-product fp-3", style: { "--r": "-3deg" } }, /* @__PURE__ */ React.createElement("div", { className: "product-image" }, /* @__PURE__ */ React.createElement("span", { className: "ph-label" }, "Sandales"), /* @__PURE__ */ React.createElement("span", { className: "ph-sku" }, "SKU\xB7LT-SD-029")), /* @__PURE__ */ React.createElement("div", { className: "meta" }, /* @__PURE__ */ React.createElement("div", { className: "name" }, "Soraya Or"), /* @__PURE__ */ React.createElement("div", { className: "price" }, "6 400 DA"))))))), /* @__PURE__ */ React.createElement("div", { className: "scroll-indicator" }, /* @__PURE__ */ React.createElement("span", null, t.scroll), /* @__PURE__ */ React.createElement("div", { className: "line" })));
  };
  var ManifestoScene = ({ lang }) => {
    const sceneRef = useRef(null);
    useSceneProgress(sceneRef);
    const t = {
      fr: {
        eyebrow: "Just for you",
        title1: "Un soin,",
        title2: "une attention,",
        title3: "rien que pour vous.",
        line: "\xAB Notre mission n'est pas de vendre. Elle est de gagner votre confiance, paire apr\xE8s paire. \xBB",
        pillars: [
          { num: "01", title: "Con\xE7u avec soin", text: "Chaque mod\xE8le choisi par notre \xE9quipe \xE0 Alger. Aucun envoi de masse, aucune surprise." },
          { num: "02", title: "Emball\xE9 comme un cadeau", text: "Votre commande arrive dans une bo\xEEte sign\xE9e Latina, pr\xEAte \xE0 \xEAtre offerte \u2014 ou \xE0 vous offrir." },
          { num: "03", title: "Payez \xE0 la livraison", text: "Vous voyez, vous touchez, vous d\xE9cidez. Le paiement se fait quand la commande est entre vos mains." }
        ]
      },
      ar: {
        eyebrow: "JUST FOR YOU",
        title1: "\u0639\u0646\u0627\u064A\u0629\u060C",
        title2: "\u0627\u0647\u062A\u0645\u0627\u0645\u060C",
        title3: "\u0645\u0646 \u0623\u062C\u0644\u0643 \u0623\u0646\u062A\u0650 \u0641\u0642\u0637.",
        line: "\xAB \u0645\u0647\u0645\u062A\u0646\u0627 \u0644\u064A\u0633\u062A \u0627\u0644\u0628\u064A\u0639. \u0645\u0647\u0645\u062A\u0646\u0627 \u0623\u0646 \u0646\u0643\u0633\u0628 \u062B\u0642\u062A\u0643\u060C \u062D\u0630\u0627\u0621\u064B \u0628\u0639\u062F \u062D\u0630\u0627\u0621. \xBB",
        pillars: [
          { num: "01", title: "\u0627\u062E\u062A\u064A\u0627\u0631 \u0628\u0639\u0646\u0627\u064A\u0629", text: "\u0643\u0644 \u0642\u0637\u0639\u0629 \u064A\u062E\u062A\u0627\u0631\u0647\u0627 \u0641\u0631\u064A\u0642\u0646\u0627 \u0641\u064A \u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0627\u0644\u0639\u0627\u0635\u0645\u0629. \u0644\u0627 \u0634\u062D\u0646\u0627\u062A \u062C\u0645\u0627\u0639\u064A\u0629\u060C \u0644\u0627 \u0645\u0641\u0627\u062C\u0622\u062A." },
          { num: "02", title: "\u0645\u063A\u0644\u0641\u0629 \u0643\u0647\u062F\u064A\u0629", text: "\u0637\u0644\u0628\u0643 \u064A\u0635\u0644\u0643 \u0641\u064A \u0639\u0644\u0628\u0629 Latina \u062C\u0627\u0647\u0632\u0629 \u0644\u0623\u0646 \u062A\u064F\u0647\u062F\u0649 \u2014 \u0623\u0648 \u062A\u0647\u062F\u064A \u0628\u0647\u0627 \u0646\u0641\u0633\u0643." },
          { num: "03", title: "\u0627\u062F\u0641\u0639\u064A \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645", text: "\u062A\u0631\u064A\u0646\u060C \u062A\u0644\u0645\u0633\u064A\u0646\u060C \u062A\u0642\u0631\u0631\u064A\u0646. \u0627\u0644\u062F\u0641\u0639 \u064A\u0643\u0648\u0646 \u0639\u0646\u062F\u0645\u0627 \u064A\u0643\u0648\u0646 \u0627\u0644\u0637\u0644\u0628 \u0628\u064A\u0646 \u064A\u062F\u064A\u0643." }
        ]
      },
      en: {
        eyebrow: "Just for you",
        title1: "Care,",
        title2: "attention,",
        title3: "for you alone.",
        line: "\u201COur mission isn't to sell. It's to earn your trust, pair after pair.\u201D",
        pillars: [
          { num: "01", title: "Chosen with care", text: "Every piece picked by our Algiers team. No mass drops, no surprises." },
          { num: "02", title: "Wrapped like a gift", text: "Your order arrives in a signed Latina box \u2014 ready to be gifted, or to gift yourself." },
          { num: "03", title: "Pay on arrival", text: "See it, touch it, decide. Payment happens once the order is in your hands." }
        ]
      }
    }[lang];
    return /* @__PURE__ */ React.createElement("section", { ref: sceneRef, className: "scene scene-manifesto", "data-screen-label": "02 Manifesto" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(SceneMarker, { num: "02", label: "Manifesto", meta: "JUST FOR YOU" }), /* @__PURE__ */ React.createElement("div", { className: "reveal" }, /* @__PURE__ */ React.createElement("div", { className: "manifesto-eyebrow" }, /* @__PURE__ */ React.createElement("span", { className: "line" }), /* @__PURE__ */ React.createElement("span", { className: "word" }, t.eyebrow), /* @__PURE__ */ React.createElement("span", { className: "line" })), /* @__PURE__ */ React.createElement("h2", { className: "manifesto-title" }, t.title1, " ", /* @__PURE__ */ React.createElement("em", null, t.title2), /* @__PURE__ */ React.createElement("br", null), t.title3), /* @__PURE__ */ React.createElement("p", { className: "manifesto-line" }, t.line)), /* @__PURE__ */ React.createElement("div", { className: "manifesto-pillars reveal-stagger" }, t.pillars.map((p) => /* @__PURE__ */ React.createElement("div", { className: "pillar", key: p.num }, /* @__PURE__ */ React.createElement("span", { className: "num" }, p.num), /* @__PURE__ */ React.createElement("div", { className: "pillar-title" }, p.title), /* @__PURE__ */ React.createElement("div", { className: "pillar-text" }, p.text))))));
  };
  var CollectionScene = ({ lang, onAdd, onAddProduct, onQuickView, segment, onSegmentChange, wishlist, onWishlist, onProductView, user }) => {
    const sceneRef = useRef(null);
    useSceneProgress(sceneRef);
    const [tab, setTab] = useState("shoes");
    const [filters, setFilters] = useState({ colors: [], sizes: [], heel: [], materials: [] });
    const [sort, setSort] = useState("newest");
    const [search, setSearch] = useState("");
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [apiProducts, setApiProducts] = useState(null);
    const [productsLoading, setProductsLoading] = useState(true);
    const [refreshTick, setRefreshTick] = useState(0);
    useEffect(() => {
      const h = () => setRefreshTick((t2) => t2 + 1);
      window.addEventListener("latina:refresh", h);
      return () => window.removeEventListener("latina:refresh", h);
    }, []);
    useEffect(() => {
      const api = window.latinaApi;
      if (!api) return;
      api.getProducts({ per_page: 40, segment: segment !== "ALL" ? segment : void 0 }).then((data) => {
        const items = (data.data || []).map((p) => {
          const vs = p.variants || [];
          const variantColors = [...new Set(vs.map((v) => v.color).filter(Boolean))];
          const variantSizes = [...new Set(vs.map((v) => String(v.size)).filter((s) => s && s !== "undefined" && s !== "null"))];
          const catSlug = (p.category?.slug || "").toLowerCase();
          const catName = (p.category?.name_fr || p.category?.name || "").toLowerCase();
          const parentSlug = (p.category?.parent?.slug || "").toLowerCase();
          const isBags = catSlug.startsWith("sac") || catName.includes("sac") || catSlug === "bags";
          const isAccess = catSlug.startsWith("access") || catName.includes("access") || parentSlug.startsWith("access");
          const _tab = isBags ? "bags" : isAccess ? "access" : "shoes";
          return {
            sku: p.sku,
            name: p.name_fr || p.name,
            name_ar: p.name_ar,
            name_en: p.name_en,
            price: p.effective_price ?? p.price,
            compare: p.compare_price,
            badge: p.flash_sale ? `-${p.flash_sale.discount_percent}%` : p.is_featured ? "\u2605" : null,
            stock: p.stock,
            colors: variantColors.length ? variantColors : p.attributes?.colors || [],
            sizes: variantSizes.length ? variantSizes : (p.attributes?.sizes || []).map(String),
            materials: p.attributes?.materials || [],
            heel: p.attributes?.heel_height ?? 0,
            audience: [p.segment || "ALL"],
            img: window.mediaUrl(p.primary_image?.url) || null,
            variants: vs,
            _tab,
            _apiId: p.id,
            _catLabel: p.category?.name_fr || null
          };
        });
        setApiProducts(items);
      }).catch(() => {
        setApiProducts([]);
      }).finally(() => setProductsLoading(false));
    }, [segment, refreshTick]);
    const t = {
      fr: {
        eyebrow: "La Collection",
        title1: "S\xE9lection",
        title2: "du moment",
        tabs: { shoes: "Chaussures", bags: "Sacs", access: "Accessoires" },
        all: "Voir tout le catalogue",
        filtersBtn: "Filtres",
        empty: "Aucun r\xE9sultat.",
        searchPlaceholder: "Rechercher\u2026",
        sortNewest: "R\xE9cent",
        sortPriceAsc: "Prix \u2191",
        sortPriceDesc: "Prix \u2193",
        showResults: "Voir",
        clearAll: "Tout effacer",
        size: "T.",
        color: "Couleur"
      },
      ar: {
        eyebrow: "\u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629",
        title1: "\u0627\u062E\u062A\u064A\u0627\u0631",
        title2: "\u0627\u0644\u0644\u062D\u0638\u0629",
        tabs: { shoes: "\u0627\u0644\u0623\u062D\u0630\u064A\u0629", bags: "\u0627\u0644\u062D\u0642\u0627\u0626\u0628", access: "\u0627\u0644\u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062A" },
        all: "\u0627\u0644\u0643\u062A\u0627\u0644\u0648\u062C \u0643\u0627\u0645\u0644",
        filtersBtn: "\u062A\u0635\u0641\u064A\u0629",
        empty: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C.",
        searchPlaceholder: "\u0627\u0628\u062D\u062B\u064A\u2026",
        sortNewest: "\u0627\u0644\u0623\u062D\u062F\u062B",
        sortPriceAsc: "\u0627\u0644\u0633\u0639\u0631 \u2191",
        sortPriceDesc: "\u0627\u0644\u0633\u0639\u0631 \u2193",
        showResults: "\u0639\u0631\u0636",
        clearAll: "\u0645\u0633\u062D \u0627\u0644\u0643\u0644",
        size: "\u0645\u0642.",
        color: "\u0644\u0648\u0646"
      },
      en: {
        eyebrow: "The Collection",
        title1: "Selection",
        title2: "of the moment",
        tabs: { shoes: "Shoes", bags: "Bags", access: "Accessories" },
        all: "See full catalogue",
        filtersBtn: "Filters",
        empty: "No results.",
        searchPlaceholder: "Search\u2026",
        sortNewest: "Newest",
        sortPriceAsc: "Price \u2191",
        sortPriceDesc: "Price \u2193",
        showResults: "Show",
        clearAll: "Clear all",
        size: "Sz.",
        color: "Color"
      }
    }[lang] || {};
    const tabShort = {
      fr: { shoes: "Chaus.", bags: "Sacs", access: "Access." },
      ar: { shoes: "\u0623\u062D\u0630\u064A\u0629", bags: "\u062D\u0642\u0627\u0626\u0628", access: "\u0625\u0643\u0633\u0633." },
      en: { shoes: "Shoes", bags: "Bags", access: "Accry." }
    }[lang];
    const currentProducts = useMemo(() => {
      if (!apiProducts) return [];
      return apiProducts.filter((p) => p._tab === tab);
    }, [apiProducts, tab]);
    const availableSizes = useMemo(() => {
      const set = /* @__PURE__ */ new Set();
      currentProducts.forEach((p) => (p.sizes || []).forEach((s) => set.add(s)));
      return [...set].sort((a, b) => Number(a) - Number(b));
    }, [currentProducts]);
    const filtered = useMemo(() => {
      let result = applyFilters(currentProducts, filters, segment);
      if (search.trim()) {
        const q = search.toLowerCase();
        result = result.filter(
          (p) => (p.name || "").toLowerCase().includes(q) || (p.name_ar || "").toLowerCase().includes(q) || (p.name_en || "").toLowerCase().includes(q) || (p.sku || "").toLowerCase().includes(q)
        );
      }
      if (sort === "price-asc") return [...result].sort((a, b) => a.price - b.price);
      if (sort === "price-desc") return [...result].sort((a, b) => b.price - a.price);
      return result;
    }, [currentProducts, filters, segment, search, sort]);
    const toggleFilter = (key, value) => {
      const cur = filters[key] || [];
      setFilters({ ...filters, [key]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] });
    };
    const clearFilters = () => {
      setFilters({ colors: [], sizes: [], heel: [], materials: [] });
      setSearch("");
    };
    const activeFilterCount = (filters.colors?.length || 0) + (filters.sizes?.length || 0) + (filters.heel?.length || 0) + (filters.materials?.length || 0);
    const wishSet = new Set(wishlist || []);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", { ref: sceneRef, className: "scene scene-collection scene-collection-v2", id: "collection", "data-screen-label": "03 Collection" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(SceneMarker, { num: "03", label: "Collection", meta: `${filtered.length} / ${currentProducts.length}` }), /* @__PURE__ */ React.createElement("div", { className: "reveal" }, /* @__PURE__ */ React.createElement("div", { className: "label", style: { marginBottom: 16 } }, t.eyebrow), /* @__PURE__ */ React.createElement("div", { className: "collection-head" }, /* @__PURE__ */ React.createElement("h2", null, t.title1, " ", /* @__PURE__ */ React.createElement("em", null, t.title2)), /* @__PURE__ */ React.createElement("div", { className: "collection-controls" }, /* @__PURE__ */ React.createElement(SegmentToggle, { value: segment || "ALL", onChange: onSegmentChange, lang }), /* @__PURE__ */ React.createElement("div", { className: "collection-tabs" }, ["shoes", "bags", "access"].map((k) => {
      const tabCount = (apiProducts || []).filter((p) => p._tab === k).length;
      return /* @__PURE__ */ React.createElement("button", { key: k, className: tab === k ? "active" : "", onClick: () => {
        setTab(k);
        setSearch("");
        setFilters({ colors: [], sizes: [], heel: [], materials: [] });
      } }, /* @__PURE__ */ React.createElement("span", { className: "tab-label-full" }, t.tabs[k]), /* @__PURE__ */ React.createElement("span", { className: "tab-label-short" }, tabShort[k]), !productsLoading && tabCount > 0 && /* @__PURE__ */ React.createElement("span", { className: "tab-count" }, tabCount));
    }))))), /* @__PURE__ */ React.createElement("div", { className: "coll-action-bar" }, /* @__PURE__ */ React.createElement("div", { className: "coll-search-wrap" }, /* @__PURE__ */ React.createElement("svg", { className: "coll-search-icon", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("circle", { cx: "11", cy: "11", r: "8" }), /* @__PURE__ */ React.createElement("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })), /* @__PURE__ */ React.createElement(
      "input",
      {
        className: "coll-search-input",
        placeholder: t.searchPlaceholder,
        value: search,
        onChange: (e) => setSearch(e.target.value)
      }
    ), search && /* @__PURE__ */ React.createElement("button", { className: "coll-search-clear", onClick: () => setSearch("") }, "\u2715")), /* @__PURE__ */ React.createElement("select", { className: "coll-sort-select", value: sort, onChange: (e) => setSort(e.target.value) }, /* @__PURE__ */ React.createElement("option", { value: "newest" }, t.sortNewest), /* @__PURE__ */ React.createElement("option", { value: "price-asc" }, t.sortPriceAsc), /* @__PURE__ */ React.createElement("option", { value: "price-desc" }, t.sortPriceDesc)), /* @__PURE__ */ React.createElement("button", { className: "coll-filter-btn", onClick: () => setMobileFilterOpen(true) }, /* @__PURE__ */ React.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React.createElement("line", { x1: "4", y1: "6", x2: "20", y2: "6" }), /* @__PURE__ */ React.createElement("line", { x1: "8", y1: "12", x2: "16", y2: "12" }), /* @__PURE__ */ React.createElement("line", { x1: "11", y1: "18", x2: "13", y2: "18" })), t.filtersBtn, activeFilterCount > 0 && /* @__PURE__ */ React.createElement("span", { className: "coll-filter-count" }, activeFilterCount))), (activeFilterCount > 0 || search) && /* @__PURE__ */ React.createElement("div", { className: "coll-active-chips" }, search && /* @__PURE__ */ React.createElement("button", { className: "fc-chip fc-chip-search", onClick: () => setSearch("") }, "\u{1F50D} \xAB", search, "\xBB \u2715"), (filters.colors || []).map((c) => /* @__PURE__ */ React.createElement("button", { key: c, className: "fc-chip", onClick: () => toggleFilter("colors", c) }, /* @__PURE__ */ React.createElement("span", { className: "fc-swatch", style: { background: COLOR_SWATCHES[c] || "#ccc" } }), c, " \u2715")), (filters.sizes || []).map((s) => /* @__PURE__ */ React.createElement("button", { key: s, className: "fc-chip", onClick: () => toggleFilter("sizes", s) }, t.size, s, " \u2715")), (filters.heel || []).map((h) => {
      const b = HEEL_BUCKETS.find((x) => x.key === h);
      return /* @__PURE__ */ React.createElement("button", { key: h, className: "fc-chip", onClick: () => toggleFilter("heel", h) }, b?.[`label_${lang}`] || h, " \u2715");
    }), (filters.materials || []).map((m) => {
      const mat = MATERIALS.find((x) => x.key === m);
      return /* @__PURE__ */ React.createElement("button", { key: m, className: "fc-chip", onClick: () => toggleFilter("materials", m) }, mat?.[lang] || m, " \u2715");
    }), (activeFilterCount > 0 || search) && /* @__PURE__ */ React.createElement("button", { className: "fc-chip fc-clear-all", onClick: clearFilters }, t.clearAll)), /* @__PURE__ */ React.createElement("div", { className: "collection-layout" }, /* @__PURE__ */ React.createElement(
      FilterRail,
      {
        filters,
        setFilters,
        lang,
        availableSizes,
        onClear: clearFilters,
        count: filtered.length
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "collection-main" }, productsLoading ? /* @__PURE__ */ React.createElement("div", { className: "collection-empty" }, /* @__PURE__ */ React.createElement("div", { className: "coll-spinner" }), /* @__PURE__ */ React.createElement("span", { className: "t-body" }, "Chargement\u2026")) : filtered.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "collection-empty" }, /* @__PURE__ */ React.createElement("div", { className: "coll-empty-icon" }, "\u2298"), /* @__PURE__ */ React.createElement("p", { className: "t-body" }, t.empty), /* @__PURE__ */ React.createElement("button", { className: "btn-outline-sm", onClick: clearFilters }, t.clearAll)) : /* @__PURE__ */ React.createElement("div", { className: "collection-grid", key: `${tab}-${segment}-${sort}` }, filtered.map((p) => /* @__PURE__ */ React.createElement(
      ProductCard,
      {
        key: p.sku || p._apiId,
        product: p,
        onAdd,
        onQuickView: (prod, opts) => {
          onProductView?.(prod);
          onQuickView?.(prod, opts);
        },
        onWishlist,
        wishlisted: wishSet.has(p.sku),
        badge: p.badge,
        lang
      }
    ))))), /* @__PURE__ */ React.createElement("div", { className: "collection-foot reveal" }, /* @__PURE__ */ React.createElement("button", { className: "btn-secondary" }, t.all)))), mobileFilterOpen && /* @__PURE__ */ React.createElement("div", { className: "mfs-overlay", onClick: () => setMobileFilterOpen(false) }, /* @__PURE__ */ React.createElement("div", { className: "mfs-sheet", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "mfs-handle" }), /* @__PURE__ */ React.createElement("div", { className: "mfs-head" }, /* @__PURE__ */ React.createElement("span", { className: "mfs-title t-mono" }, t.filtersBtn), /* @__PURE__ */ React.createElement("button", { className: "mfs-close", onClick: () => setMobileFilterOpen(false) }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "mfs-body" }, /* @__PURE__ */ React.createElement(
      FilterRail,
      {
        filters,
        setFilters,
        lang,
        availableSizes,
        onClear: clearFilters,
        count: filtered.length,
        mobile: true
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "mfs-foot" }, /* @__PURE__ */ React.createElement("button", { className: "btn-primary", style: { width: "100%" }, onClick: () => setMobileFilterOpen(false) }, t.showResults, " ", filtered.length, " ", lang === "ar" ? "\u0645\u0646\u062A\u062C" : lang === "en" ? "items" : "articles")))));
  };
  var SegmentsScene = ({ lang, onEnterSegment }) => {
    const t = {
      fr: {
        eyebrow: "Deux univers, une boutique",
        title: "Choisissez le v\xF4tre",
        a: { age: "12 \u2014 30", small: "ans", title: "Pour la jeune femme moderne", text: "Tendances, sneakers, sacs color\xE9s, bijoux audacieux. Une s\xE9lection vivante, mise \xE0 jour chaque semaine.", enter: "Entrer dans l'univers" },
        b: { age: "30 \u2014 50", small: "ans", title: "Pour la femme accomplie", text: "Pi\xE8ces classiques, cuirs nobles, escarpins intemporels. La qualit\xE9 avant la quantit\xE9, le d\xE9tail avant le bruit.", enter: "Entrer dans l'univers" },
        and: "&"
      },
      ar: {
        eyebrow: "\u0639\u0627\u0644\u0645\u0627\u0646\u060C \u0645\u062A\u062C\u0631 \u0648\u0627\u062D\u062F",
        title: "\u0627\u062E\u062A\u0627\u0631\u064A \u0639\u0627\u0644\u0645\u0643\u0650",
        a: { age: "30 \u2014 12", small: "\u0633\u0646\u0629", title: "\u0644\u0644\u0634\u0627\u0628\u0629 \u0627\u0644\u0639\u0635\u0631\u064A\u0629", text: "\u0635\u064A\u062D\u0627\u062A\u060C \u0623\u062D\u0630\u064A\u0629 \u0631\u064A\u0627\u0636\u064A\u0629\u060C \u062D\u0642\u0627\u0626\u0628 \u0645\u0644\u0648\u0646\u0629\u060C \u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062A \u062C\u0631\u064A\u0626\u0629. \u062A\u0634\u0643\u064A\u0644\u0629 \u062D\u064A\u0629 \u062A\u062A\u062C\u062F\u062F \u0643\u0644 \u0623\u0633\u0628\u0648\u0639.", enter: "\u0627\u062F\u062E\u0644\u064A \u0627\u0644\u0639\u0627\u0644\u0645" },
        b: { age: "50 \u2014 30", small: "\u0633\u0646\u0629", title: "\u0644\u0644\u0645\u0631\u0623\u0629 \u0627\u0644\u0646\u0627\u0636\u062C\u0629", text: "\u0642\u0637\u0639 \u0643\u0644\u0627\u0633\u064A\u0643\u064A\u0629\u060C \u062C\u0644\u0648\u062F \u0623\u0635\u064A\u0644\u0629\u060C \u0643\u0639\u0628 \u0623\u0646\u064A\u0642 \u062F\u0627\u0626\u0645. \u0627\u0644\u062C\u0648\u062F\u0629 \u0642\u0628\u0644 \u0627\u0644\u0643\u0645\u064A\u0629.", enter: "\u0627\u062F\u062E\u0644\u064A \u0627\u0644\u0639\u0627\u0644\u0645" },
        and: "&"
      },
      en: {
        eyebrow: "Two worlds, one boutique",
        title: "Choose yours",
        a: { age: "12 \u2014 30", small: "y/o", title: "For the modern young woman", text: "Trends, sneakers, bright bags, bold jewellery. A living selection, refreshed every week.", enter: "Enter the world" },
        b: { age: "30 \u2014 50", small: "y/o", title: "For the accomplished woman", text: "Classic pieces, fine leathers, timeless heels. Quality over quantity, detail over noise.", enter: "Enter the world" },
        and: "&"
      }
    }[lang];
    return /* @__PURE__ */ React.createElement("section", { className: "scene-segments", "data-screen-label": "04 Segments", id: "segments" }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "100px 24px 52px" }, className: "reveal" }, /* @__PURE__ */ React.createElement("div", { className: "label", style: { marginBottom: 14 } }, t.eyebrow), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(38px,5vw,68px)" } }, /* @__PURE__ */ React.createElement("em", null, t.title))), /* @__PURE__ */ React.createElement("div", { className: "segments-grid" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "segment segment-a",
        onClick: () => onEnterSegment?.("A"),
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => e.key === "Enter" && onEnterSegment?.("A")
      },
      /* @__PURE__ */ React.createElement("div", { className: "age" }, t.a.age),
      /* @__PURE__ */ React.createElement("div", { className: "segment-content reveal" }, /* @__PURE__ */ React.createElement("h3", null, t.a.title), /* @__PURE__ */ React.createElement("p", null, t.a.text), /* @__PURE__ */ React.createElement("span", { className: "enter" }, t.a.enter, " \u2192")),
      /* @__PURE__ */ React.createElement("div", { className: "segment-decoration" }, /* @__PURE__ */ React.createElement("div", { className: "seg-deco-inner" }, /* @__PURE__ */ React.createElement("div", { className: "seg-deco-line" }), /* @__PURE__ */ React.createElement("span", { className: "seg-deco-label" }, "Sneakers"), /* @__PURE__ */ React.createElement("span", { className: "seg-deco-sub" }, "\xB7 Tendances \xB7"), /* @__PURE__ */ React.createElement("div", { className: "seg-deco-line" })))
    ), /* @__PURE__ */ React.createElement("div", { className: "segment-divider" }, t.and), /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "segment segment-b",
        onClick: () => onEnterSegment?.("B"),
        role: "button",
        tabIndex: 0,
        onKeyDown: (e) => e.key === "Enter" && onEnterSegment?.("B")
      },
      /* @__PURE__ */ React.createElement("div", { className: "age" }, t.b.age),
      /* @__PURE__ */ React.createElement("div", { className: "segment-content reveal" }, /* @__PURE__ */ React.createElement("h3", null, t.b.title), /* @__PURE__ */ React.createElement("p", null, t.b.text), /* @__PURE__ */ React.createElement("span", { className: "enter" }, t.b.enter, " \u2192")),
      /* @__PURE__ */ React.createElement("div", { className: "segment-decoration" }, /* @__PURE__ */ React.createElement("div", { className: "seg-deco-inner" }, /* @__PURE__ */ React.createElement("div", { className: "seg-deco-line" }), /* @__PURE__ */ React.createElement("span", { className: "seg-deco-label" }, "Escarpins"), /* @__PURE__ */ React.createElement("span", { className: "seg-deco-sub" }, "\xB7 Classiques \xB7"), /* @__PURE__ */ React.createElement("div", { className: "seg-deco-line" })))
    )));
  };
  Object.assign(window, { HeroScene, ManifestoScene, CollectionScene, SegmentsScene });
})();
