/* global React */
const { useState, useEffect, useRef, useMemo } = React;

/* ============================================================
   SCENE — HERO
   ============================================================ */

const HeroScene = ({ lang, onAdd }) => {
  const sceneRef = useRef(null);
  useSceneProgress(sceneRef);
  const t = {
    fr: {
      eyebrow: "Nouvelle collection · Printemps 2026",
      title1: "Chaque pas,",
      title2: "une histoire",
      title3: "à porter.",
      sub: "Chaussures, sacs et accessoires pour la femme algérienne. Une boutique pensée comme un écrin — où chaque pièce arrive emballée avec soin, livrée chez vous, payée à la livraison.",
      cta1: "Découvrir la collection",
      cta2: "Notre histoire",
      stats: [
        { num: "2 400+", lbl: "Clientes confiantes" },
        { num: "69", lbl: "Wilayas livrées" },
        { num: "4.9", lbl: "Note moyenne ★" }
      ],
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
      stats: [
        { num: "+2400", lbl: "زبونة سعيدة" },
        { num: "69", lbl: "ولاية" },
        { num: "4.9", lbl: "تقييم ★" }
      ],
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
      stats: [
        { num: "2,400+", lbl: "Happy clients" },
        { num: "69", lbl: "Wilayas delivered" },
        { num: "4.9", lbl: "Avg rating ★" }
      ],
      scroll: "Scroll"
    }
  }[lang];

  return (
    <section ref={sceneRef} className="scene scene-hero" id="hero" data-screen-label="01 Hero">
      <div className="container">
        <SceneMarker num="01" label="Hero" meta="LATINA · 2026" />
        <div className="hero-grid">
          <div className="hero-left reveal-stagger">
            <div className="hero-eyebrow">{t.eyebrow}</div>
            <h1 className="hero-title">
              {t.title1}<br />
              <em>{t.title2}</em><br />
              {t.title3}
            </h1>
            <p className="hero-sub">{t.sub}</p>
            <div className="hero-ctas">
              <button className="btn-primary">{t.cta1}</button>
              <button className="btn-ghost" onClick={() => document.getElementById('our-story')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>{t.cta2}</button>
            </div>
            <div className="hero-stat-grid">
              {t.stats.map((s, i) => (
                <div className="hero-stat" key={i}>
                  <div className="num">{s.num}</div>
                  <div className="lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-stage">
              <div className="hero-platter">
                <div className="hero-lotus"><LotusMark size={120} /></div>
              </div>
              <div className="floating-product fp-1">
                <div className="product-image">
                  <span className="ph-label">Escarpins</span>
                  <span className="ph-sku">SKU·LT-EC-082</span>
                </div>
                <div className="meta">
                  <div className="name">Aurélie Nude</div>
                  <div className="price">7 900 DA</div>
                </div>
              </div>
              <div className="floating-product fp-2" style={{ "--r": "5deg" }}>
                <div className="product-image">
                  <span className="ph-label">Sac</span>
                  <span className="ph-sku">SKU·LT-SA-014</span>
                </div>
                <div className="meta">
                  <div className="name">Lila Rose</div>
                  <div className="price">9 200 DA</div>
                </div>
              </div>
              <div className="floating-product fp-3" style={{ "--r": "-3deg" }}>
                <div className="product-image">
                  <span className="ph-label">Sandales</span>
                  <span className="ph-sku">SKU·LT-SD-029</span>
                </div>
                <div className="meta">
                  <div className="name">Soraya Or</div>
                  <div className="price">6 400 DA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>{t.scroll}</span>
        <div className="line" />
      </div>
    </section>
  );
};

/* ============================================================
   SCENE — MANIFESTO
   ============================================================ */

const ManifestoScene = ({ lang }) => {
  const sceneRef = useRef(null);
  useSceneProgress(sceneRef);
  const t = {
    fr: {
      eyebrow: "Just for you",
      title1: "Un soin,",
      title2: "une attention,",
      title3: "rien que pour vous.",
      line: "« Notre mission n'est pas de vendre. Elle est de gagner votre confiance, paire après paire. »",
      pillars: [
        { num: "01", title: "Conçu avec soin", text: "Chaque modèle choisi par notre équipe à Alger. Aucun envoi de masse, aucune surprise." },
        { num: "02", title: "Emballé comme un cadeau", text: "Votre commande arrive dans une boîte signée Latina, prête à être offerte — ou à vous offrir." },
        { num: "03", title: "Payez à la livraison", text: "Vous voyez, vous touchez, vous décidez. Le paiement se fait quand la commande est entre vos mains." }
      ]
    },
    ar: {
      eyebrow: "JUST FOR YOU",
      title1: "عناية،",
      title2: "اهتمام،",
      title3: "من أجلك أنتِ فقط.",
      line: "« مهمتنا ليست البيع. مهمتنا أن نكسب ثقتك، حذاءً بعد حذاء. »",
      pillars: [
        { num: "01", title: "اختيار بعناية", text: "كل قطعة يختارها فريقنا في الجزائر العاصمة. لا شحنات جماعية، لا مفاجآت." },
        { num: "02", title: "مغلفة كهدية", text: "طلبك يصلك في علبة Latina جاهزة لأن تُهدى — أو تهدي بها نفسك." },
        { num: "03", title: "ادفعي عند الاستلام", text: "ترين، تلمسين، تقررين. الدفع يكون عندما يكون الطلب بين يديك." }
      ]
    },
    en: {
      eyebrow: "Just for you",
      title1: "Care,",
      title2: "attention,",
      title3: "for you alone.",
      line: "“Our mission isn't to sell. It's to earn your trust, pair after pair.”",
      pillars: [
        { num: "01", title: "Chosen with care", text: "Every piece picked by our Algiers team. No mass drops, no surprises." },
        { num: "02", title: "Wrapped like a gift", text: "Your order arrives in a signed Latina box — ready to be gifted, or to gift yourself." },
        { num: "03", title: "Pay on arrival", text: "See it, touch it, decide. Payment happens once the order is in your hands." }
      ]
    }
  }[lang];

  return (
    <section ref={sceneRef} className="scene scene-manifesto" data-screen-label="02 Manifesto">
      <div className="container">
        <SceneMarker num="02" label="Manifesto" meta="JUST FOR YOU" />
        <div className="reveal">
          <div className="manifesto-eyebrow">
            <span className="line" />
            <span className="word">{t.eyebrow}</span>
            <span className="line" />
          </div>
          <h2 className="manifesto-title">
            {t.title1} <em>{t.title2}</em><br />
            {t.title3}
          </h2>
          <p className="manifesto-line">{t.line}</p>
        </div>
        <div className="manifesto-pillars reveal-stagger">
          {t.pillars.map((p) => (
            <div className="pillar" key={p.num}>
              <span className="num">{p.num}</span>
              <div className="pillar-title">{p.title}</div>
              <div className="pillar-text">{p.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SCENE — COLLECTION
   ============================================================ */


const CollectionScene = ({ lang, onAdd, onAddProduct, onQuickView, segment, onSegmentChange, wishlist, onWishlist, onProductView, user }) => {
  const sceneRef = useRef(null);
  useSceneProgress(sceneRef);
  const [tab, setTab]                     = useState("shoes");
  const [filters, setFilters]             = useState({ colors: [], sizes: [], heel: [], materials: [] });
  const [sort, setSort]                   = useState("newest");
  const [search, setSearch]               = useState("");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [apiProducts, setApiProducts]     = useState(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [refreshTick, setRefreshTick]         = useState(0);

  useEffect(() => {
    const h = () => setRefreshTick(t => t + 1);
    window.addEventListener("latina:refresh", h);
    return () => window.removeEventListener("latina:refresh", h);
  }, []);

  useEffect(() => {
    const api = window.latinaApi;
    if (!api) return;
    api.getProducts({ per_page: 40, segment: segment !== "ALL" ? segment : undefined }).then(data => {
      const items = (data.data || []).map(p => {
        const vs = p.variants || [];
        const variantColors = [...new Set(vs.map(v => v.color).filter(Boolean))];
        const variantSizes  = [...new Set(vs.map(v => String(v.size)).filter(s => s && s !== "undefined" && s !== "null"))];
        const catSlug   = (p.category?.slug || "").toLowerCase();
        const catName   = (p.category?.name_fr || p.category?.name || "").toLowerCase();
        const parentSlug = (p.category?.parent?.slug || "").toLowerCase();
        const isBags    = catSlug.startsWith("sac") || catName.includes("sac") || catSlug === "bags";
        const isAccess  = catSlug.startsWith("access") || catName.includes("access") || parentSlug.startsWith("access");
        const _tab      = isBags ? "bags" : isAccess ? "access" : "shoes";
        return {
          sku: p.sku,
          name: p.name_fr || p.name,
          name_ar: p.name_ar,
          name_en: p.name_en,
          price: p.effective_price ?? p.price,
          compare: p.compare_price,
          badge: p.flash_sale ? `-${p.flash_sale.discount_percent}%` : (p.is_featured ? "★" : null),
          stock: p.stock,
          colors: variantColors.length ? variantColors : (p.attributes?.colors || []),
          sizes: variantSizes.length ? variantSizes : (p.attributes?.sizes || []).map(String),
          materials: (p.attributes?.materials || []),
          heel: p.attributes?.heel_height ?? 0,
          audience: [p.segment || "ALL"],
          img: window.mediaUrl(p.primary_image?.url) || null,
          variants: vs,
          _tab,
          _apiId: p.id,
          _catLabel: p.category?.name_fr || null,
        };
      });
      setApiProducts(items);
    }).catch(() => {
      setApiProducts([]);
    }).finally(() => setProductsLoading(false));
  }, [segment, refreshTick]); // eslint-disable-line react-hooks/exhaustive-deps

  const t = {
    fr: {
      eyebrow: "La Collection", title1: "Sélection", title2: "du moment",
      tabs: { shoes: "Chaussures", bags: "Sacs", access: "Accessoires" },
      all: "Voir tout le catalogue",
      filtersBtn: "Filtres", empty: "Aucun résultat.",
      searchPlaceholder: "Rechercher…",
      sortNewest: "Récent", sortPriceAsc: "Prix ↑", sortPriceDesc: "Prix ↓",
      showResults: "Voir", clearAll: "Tout effacer",
      size: "T.", color: "Couleur",
    },
    ar: {
      eyebrow: "المجموعة", title1: "اختيار", title2: "اللحظة",
      tabs: { shoes: "الأحذية", bags: "الحقائب", access: "الإكسسوارات" },
      all: "الكتالوج كامل",
      filtersBtn: "تصفية", empty: "لا توجد نتائج.",
      searchPlaceholder: "ابحثي…",
      sortNewest: "الأحدث", sortPriceAsc: "السعر ↑", sortPriceDesc: "السعر ↓",
      showResults: "عرض", clearAll: "مسح الكل",
      size: "مق.", color: "لون",
    },
    en: {
      eyebrow: "The Collection", title1: "Selection", title2: "of the moment",
      tabs: { shoes: "Shoes", bags: "Bags", access: "Accessories" },
      all: "See full catalogue",
      filtersBtn: "Filters", empty: "No results.",
      searchPlaceholder: "Search…",
      sortNewest: "Newest", sortPriceAsc: "Price ↑", sortPriceDesc: "Price ↓",
      showResults: "Show", clearAll: "Clear all",
      size: "Sz.", color: "Color",
    },
  }[lang] || {};

  const tabShort = {
    fr: { shoes: "Chaus.", bags: "Sacs", access: "Access." },
    ar: { shoes: "أحذية",  bags: "حقائب", access: "إكسس." },
    en: { shoes: "Shoes",  bags: "Bags",  access: "Accry." },
  }[lang];

  const currentProducts = useMemo(() => {
    if (!apiProducts) return [];
    return apiProducts.filter(p => p._tab === tab);
  }, [apiProducts, tab]);

  const availableSizes = useMemo(() => {
    const set = new Set();
    currentProducts.forEach(p => (p.sizes || []).forEach(s => set.add(s)));
    return [...set].sort((a, b) => Number(a) - Number(b));
  }, [currentProducts]);

  const filtered = useMemo(() => {
    let result = applyFilters(currentProducts, filters, segment);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        (p.name || "").toLowerCase().includes(q) ||
        (p.name_ar || "").toLowerCase().includes(q) ||
        (p.name_en || "").toLowerCase().includes(q) ||
        (p.sku || "").toLowerCase().includes(q)
      );
    }
    if (sort === "price-asc")  return [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [currentProducts, filters, segment, search, sort]);

  const toggleFilter = (key, value) => {
    const cur = filters[key] || [];
    setFilters({ ...filters, [key]: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] });
  };

  const clearFilters = () => { setFilters({ colors: [], sizes: [], heel: [], materials: [] }); setSearch(""); };

  const activeFilterCount = (filters.colors?.length || 0) + (filters.sizes?.length || 0)
    + (filters.heel?.length || 0) + (filters.materials?.length || 0);

  const wishSet = new Set(wishlist || []);

  return (
    <>
    <section ref={sceneRef} className="scene scene-collection scene-collection-v2" id="collection" data-screen-label="03 Collection">
      <div className="container">
        <SceneMarker num="03" label="Collection" meta={`${filtered.length} / ${currentProducts.length}`} />

        <div className="reveal">
          <div className="label" style={{ marginBottom: 16 }}>{t.eyebrow}</div>
          <div className="collection-head">
            <h2>{t.title1} <em>{t.title2}</em></h2>
            <div className="collection-controls">
              <SegmentToggle value={segment || "ALL"} onChange={onSegmentChange} lang={lang} />
              <div className="collection-tabs">
                {["shoes","bags","access"].map(k => {
                  const tabCount = (apiProducts || []).filter(p => p._tab === k).length;
                  return (
                    <button key={k} className={tab === k ? "active" : ""} onClick={() => { setTab(k); setSearch(""); setFilters({ colors:[], sizes:[], heel:[], materials:[] }); }}>
                      <span className="tab-label-full">{t.tabs[k]}</span>
                      <span className="tab-label-short">{tabShort[k]}</span>
                      {!productsLoading && tabCount > 0 && <span className="tab-count">{tabCount}</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── Sticky action bar: search + sort + mobile filter btn ── */}
        <div className="coll-action-bar">
          <div className="coll-search-wrap">
            <svg className="coll-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input
              className="coll-search-input"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="coll-search-clear" onClick={() => setSearch("")}>✕</button>}
          </div>

          <select className="coll-sort-select" value={sort} onChange={e => setSort(e.target.value)}>
            <option value="newest">{t.sortNewest}</option>
            <option value="price-asc">{t.sortPriceAsc}</option>
            <option value="price-desc">{t.sortPriceDesc}</option>
          </select>

          <button className="coll-filter-btn" onClick={() => setMobileFilterOpen(true)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
            {t.filtersBtn}
            {activeFilterCount > 0 && <span className="coll-filter-count">{activeFilterCount}</span>}
          </button>
        </div>

        {/* ── Active filter chips ── */}
        {(activeFilterCount > 0 || search) && (
          <div className="coll-active-chips">
            {search && (
              <button className="fc-chip fc-chip-search" onClick={() => setSearch("")}>
                🔍 «{search}» ✕
              </button>
            )}
            {(filters.colors || []).map(c => (
              <button key={c} className="fc-chip" onClick={() => toggleFilter("colors", c)}>
                <span className="fc-swatch" style={{ background: COLOR_SWATCHES[c] || "#ccc" }} />
                {c} ✕
              </button>
            ))}
            {(filters.sizes || []).map(s => (
              <button key={s} className="fc-chip" onClick={() => toggleFilter("sizes", s)}>
                {t.size}{s} ✕
              </button>
            ))}
            {(filters.heel || []).map(h => {
              const b = HEEL_BUCKETS.find(x => x.key === h);
              return <button key={h} className="fc-chip" onClick={() => toggleFilter("heel", h)}>{b?.[`label_${lang}`] || h} ✕</button>;
            })}
            {(filters.materials || []).map(m => {
              const mat = MATERIALS.find(x => x.key === m);
              return <button key={m} className="fc-chip" onClick={() => toggleFilter("materials", m)}>{mat?.[lang] || m} ✕</button>;
            })}
            {(activeFilterCount > 0 || search) && (
              <button className="fc-chip fc-clear-all" onClick={clearFilters}>{t.clearAll}</button>
            )}
          </div>
        )}

        <div className="collection-layout">
          <FilterRail
            filters={filters}
            setFilters={setFilters}
            lang={lang}
            availableSizes={availableSizes}
            onClear={clearFilters}
            count={filtered.length}
          />

          <div className="collection-main">
            {productsLoading ? (
              <div className="collection-empty">
                <div className="coll-spinner" />
                <span className="t-body">Chargement…</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="collection-empty">
                <div className="coll-empty-icon">⊘</div>
                <p className="t-body">{t.empty}</p>
                <button className="btn-outline-sm" onClick={clearFilters}>{t.clearAll}</button>
              </div>
            ) : (
              <div className="collection-grid" key={`${tab}-${segment}-${sort}`}>
                {filtered.map(p => (
                  <ProductCard
                    key={p.sku || p._apiId}
                    product={p}
                    onAdd={onAdd}
                    onQuickView={(prod, opts) => { onProductView?.(prod); onQuickView?.(prod, opts); }}
                    onWishlist={onWishlist}
                    wishlisted={wishSet.has(p.sku)}
                    badge={p.badge}
                    lang={lang}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="collection-foot reveal">
          <button className="btn-secondary">{t.all}</button>
        </div>
      </div>
    </section>

    {/* ── Mobile filter bottom sheet ── */}
    {mobileFilterOpen && (
      <div className="mfs-overlay" onClick={() => setMobileFilterOpen(false)}>
        <div className="mfs-sheet" onClick={e => e.stopPropagation()}>
          <div className="mfs-handle" />
          <div className="mfs-head">
            <span className="mfs-title t-mono">{t.filtersBtn}</span>
            <button className="mfs-close" onClick={() => setMobileFilterOpen(false)}>✕</button>
          </div>
          <div className="mfs-body">
            <FilterRail
              filters={filters}
              setFilters={setFilters}
              lang={lang}
              availableSizes={availableSizes}
              onClear={clearFilters}
              count={filtered.length}
              mobile
            />
          </div>
          <div className="mfs-foot">
            <button className="btn-primary" style={{ width: "100%" }} onClick={() => setMobileFilterOpen(false)}>
              {t.showResults} {filtered.length} {lang === "ar" ? "منتج" : lang === "en" ? "items" : "articles"}
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

/* ============================================================
   SCENE — TWO SEGMENTS
   ============================================================ */

const SegmentsScene = ({ lang, onEnterSegment }) => {
  const t = {
    fr: {
      eyebrow: "Deux univers, une boutique",
      title: "Choisissez le vôtre",
      a: { age: "12 — 30", small: "ans", title: "Pour la jeune femme moderne", text: "Tendances, sneakers, sacs colorés, bijoux audacieux. Une sélection vivante, mise à jour chaque semaine.", enter: "Entrer dans l'univers" },
      b: { age: "30 — 50", small: "ans", title: "Pour la femme accomplie", text: "Pièces classiques, cuirs nobles, escarpins intemporels. La qualité avant la quantité, le détail avant le bruit.", enter: "Entrer dans l'univers" },
      and: "&"
    },
    ar: {
      eyebrow: "عالمان، متجر واحد",
      title: "اختاري عالمكِ",
      a: { age: "30 — 12", small: "سنة", title: "للشابة العصرية", text: "صيحات، أحذية رياضية، حقائب ملونة، إكسسوارات جريئة. تشكيلة حية تتجدد كل أسبوع.", enter: "ادخلي العالم" },
      b: { age: "50 — 30", small: "سنة", title: "للمرأة الناضجة", text: "قطع كلاسيكية، جلود أصيلة، كعب أنيق دائم. الجودة قبل الكمية.", enter: "ادخلي العالم" },
      and: "&"
    },
    en: {
      eyebrow: "Two worlds, one boutique",
      title: "Choose yours",
      a: { age: "12 — 30", small: "y/o", title: "For the modern young woman", text: "Trends, sneakers, bright bags, bold jewellery. A living selection, refreshed every week.", enter: "Enter the world" },
      b: { age: "30 — 50", small: "y/o", title: "For the accomplished woman", text: "Classic pieces, fine leathers, timeless heels. Quality over quantity, detail over noise.", enter: "Enter the world" },
      and: "&"
    }
  }[lang];

  return (
    <section className="scene-segments" data-screen-label="04 Segments" id="segments">
      <div style={{ textAlign: "center", padding: "100px 24px 52px" }} className="reveal">
        <div className="label" style={{ marginBottom: 14 }}>{t.eyebrow}</div>
        <h2 className="display" style={{ fontSize: "clamp(38px,5vw,68px)" }}>
          <em>{t.title}</em>
        </h2>
      </div>

      <div className="segments-grid">
        <div className="segment segment-a" onClick={() => onEnterSegment?.("A")} role="button" tabIndex={0}
          onKeyDown={e => e.key === "Enter" && onEnterSegment?.("A")}>
          <div className="age">{t.a.age}</div>
          <div className="segment-content reveal">
            <h3>{t.a.title}</h3>
            <p>{t.a.text}</p>
            <span className="enter">{t.a.enter} →</span>
          </div>
          <div className="segment-decoration">
            <div className="seg-deco-inner">
              <div className="seg-deco-line" />
              <span className="seg-deco-label">Sneakers</span>
              <span className="seg-deco-sub">· Tendances ·</span>
              <div className="seg-deco-line" />
            </div>
          </div>
        </div>

        <div className="segment-divider">{t.and}</div>

        <div className="segment segment-b" onClick={() => onEnterSegment?.("B")} role="button" tabIndex={0}
          onKeyDown={e => e.key === "Enter" && onEnterSegment?.("B")}>
          <div className="age">{t.b.age}</div>
          <div className="segment-content reveal">
            <h3>{t.b.title}</h3>
            <p>{t.b.text}</p>
            <span className="enter">{t.b.enter} →</span>
          </div>
          <div className="segment-decoration">
            <div className="seg-deco-inner">
              <div className="seg-deco-line" />
              <span className="seg-deco-label">Escarpins</span>
              <span className="seg-deco-sub">· Classiques ·</span>
              <div className="seg-deco-line" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { HeroScene, ManifestoScene, CollectionScene, SegmentsScene });
