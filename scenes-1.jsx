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
        { num: "58", lbl: "Wilayas livrées" },
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
        { num: "58", lbl: "ولاية" },
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
        { num: "58", lbl: "Wilayas delivered" },
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
              <button className="btn-ghost">{t.cta2}</button>
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
                <div className="hero-lotus"><LotusMark size={140} color="var(--rose-500)" /></div>
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


const CollectionScene = ({ lang, onAdd, onAddProduct, onQuickView, segment, onSegmentChange, wishlist, onWishlist, onProductView }) => {
  const sceneRef = useRef(null);
  useSceneProgress(sceneRef);
  const [tab, setTab] = useState("shoes");
  const [filters, setFilters] = useState({ colors: [], sizes: [], heel: [], materials: [] });
  const [apiProducts, setApiProducts] = useState(null); // null = not loaded yet

  // Try to fetch live products from API — fall back to hardcoded PRODUCTS on failure
  useEffect(() => {
    const api = window.latinaApi;
    if (!api) return;
    const catMap = { shoes: "chaussures", bags: "sacs", access: "accessoires" };
    api.getProducts({ per_page: 40, segment: segment !== "ALL" ? segment : undefined }).then(data => {
      const items = (data.data || []).map(p => ({
        sku: p.sku,
        name: p.name_fr || p.name,
        name_ar: p.name_ar,
        name_en: p.name_en,
        price: p.effective_price ?? p.price,
        compare: p.compare_price,
        badge: p.flash_sale ? `-${p.flash_sale.discount_percent}%` : (p.is_featured ? "★" : null),
        stock: p.stock,
        sizes: (p.attributes?.sizes || []),
        colors: (p.attributes?.colors || []),
        materials: (p.attributes?.materials || []),
        heel: p.attributes?.heel_height ?? 0,
        audience: [p.segment || "ALL"],
        img: p.primary_image?.url || "assets/placeholder.jpg",
        variants: p.variants || [],
        _tab: (p.category?.slug === 'sacs' || p.category?.slug?.startsWith('sac'))
          ? "bags"
          : (p.category?.slug === 'accessoires' || p.category?.parent?.slug === 'accessoires')
          ? "access"
          : "shoes",
        _apiId: p.id,
      }));
        setApiProducts(items);
    }).catch(() => {
      setApiProducts([]);
    }).finally(() => setProductsLoading(false)); // silent fallback
  }, [segment]);


  const [productsLoading, setProductsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const t = {
    fr: { eyebrow: "La Collection", title1: "Sélection", title2: "du moment", tabs: { shoes: "Chaussures", bags: "Sacs", access: "Accessoires" }, all: "Voir tout le catalogue", filtersBtn: "Filtres", empty: "Aucun produit ne correspond à vos filtres." },
    ar: { eyebrow: "المجموعة",        title1: "اختيار",   title2: "اللحظة",     tabs: { shoes: "الأحذية",      bags: "الحقائب", access: "الإكسسوارات" }, all: "الكتالوج كامل",       filtersBtn: "تصفية",  empty: "لا توجد منتجات تطابق التصفية." },
    en: { eyebrow: "The Collection",  title1: "Selection",title2: "of the moment",tabs: { shoes: "Shoes",     bags: "Bags",    access: "Accessories" },  all: "See full catalogue",  filtersBtn: "Filters", empty: "No products match your filters." }
  }[lang];

  // Use live API products (DB-backed only — no hardcoded fallback)
  const currentProducts = useMemo(() => {
    if (!apiProducts) return [];
    return apiProducts.filter(p => p._tab === tab);
  }, [apiProducts, tab]);

  // Sizes available for the current tab (only shoes have sizes).
  const availableSizes = useMemo(() => {
    const set = new Set();
    currentProducts.forEach(p => (p.sizes || []).forEach(s => set.add(s)));
    return [...set].sort((a, b) => a - b);
  }, [currentProducts]);

  const filtered = useMemo(
    () => applyFilters(currentProducts, filters, segment),
    [currentProducts, filters, segment]
  );

  const clearFilters = () => setFilters({ colors: [], sizes: [], heel: [], materials: [] });

  const wishSet = new Set(wishlist || []);

  return (
    <section ref={sceneRef} className="scene scene-collection scene-collection-v2" id="collection" data-screen-label="03 Collection">
      <div className="container">
        <SceneMarker num="03" label="Collection" meta={`${filtered.length} / ${currentProducts.length}`} />

        <div className="reveal">
          <div className="label" style={{ marginBottom: 16 }}>{t.eyebrow}</div>
          <div className="collection-head">
            <h2>
              {t.title1} <em>{t.title2}</em>
            </h2>

            <div className="collection-controls">
              <SegmentToggle value={segment || "ALL"} onChange={onSegmentChange} lang={lang} />
              <div className="collection-tabs">
                {["shoes","bags","access"].map(k => (
                  <button key={k} className={tab === k ? "active" : ""} onClick={() => setTab(k)}>
                    {t.tabs[k]}
                  </button>
                ))}
              </div>
              <button className="filter-toggle t-mono" onClick={() => setDrawerOpen(o => !o)}>
                ☰ {t.filtersBtn}
              </button>
            </div>
          </div>
        </div>

        <div className={`collection-layout ${drawerOpen ? "drawer-open" : ""}`}>
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
              <div className="collection-empty t-body" style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
                <div style={{width:28,height:28,border:"2px solid rgba(122,69,48,.2)",borderTopColor:"var(--rose-500)",borderRadius:"50%",animation:"spin .7s linear infinite"}} />
                <span>Chargement des produits…</span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="collection-empty t-body">{t.empty}</div>
            ) : (
              <div className="collection-grid" key={`${tab}-${segment}`}>
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
      <div style={{ textAlign: "center", padding: "120px 24px 60px", background: "var(--cream-100)" }} className="reveal">
        <div className="label" style={{ marginBottom: 16 }}>{t.eyebrow}</div>
        <h2 className="display" style={{ fontSize: "clamp(40px,5.5vw,72px)", color: "var(--ink)" }}>
          <em style={{ color: "var(--rose-500)", fontStyle: "italic" }}>{t.title}</em>
        </h2>
      </div>

      <div className="segments-grid">
        <div className="segment segment-a" onClick={() => onEnterSegment?.("A")} role="button" tabIndex={0}>
          <div className="segment-content reveal">
            <div className="age">{t.a.age}<small>{t.a.small}</small></div>
            <h3>{t.a.title}</h3>
            <p>{t.a.text}</p>
            <span className="enter">{t.a.enter} →</span>
          </div>
          <div className="segment-decoration">
            <div style={{ width: "100%", height: "100%", background: "var(--cream-50)", border: "1px solid var(--rose-200)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 60px -10px rgba(122,69,48,0.15)" }}>
              <span style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--rose-500)", fontStyle: "italic" }}>Sneakers</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--ink-mute)", marginTop: 6 }}>·  TENDANCES  ·</span>
            </div>
          </div>
        </div>

        <div className="segment-divider">{t.and}</div>

        <div className="segment segment-b" onClick={() => onEnterSegment?.("B")} role="button" tabIndex={0}>
          <div className="segment-content reveal" style={{ alignItems: "flex-end", textAlign: "right", marginLeft: "auto" }}>
            <div className="age">{t.b.age}<small>{t.b.small}</small></div>
            <h3>{t.b.title}</h3>
            <p>{t.b.text}</p>
            <span className="enter">{t.b.enter} →</span>
          </div>
          <div className="segment-decoration" style={{ left: "5%", right: "auto" }}>
            <div style={{ width: "100%", height: "100%", background: "var(--cream-50)", border: "1px solid var(--rose-200)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 30px 60px -10px rgba(122,69,48,0.15)" }}>
              <span style={{ fontFamily: "var(--display)", fontSize: 18, color: "var(--rose-500)", fontStyle: "italic" }}>Escarpins</span>
              <span style={{ fontFamily: "var(--mono)", fontSize: 9, letterSpacing: "0.2em", color: "var(--ink-mute)", marginTop: 6 }}>·  CLASSIQUES  ·</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { HeroScene, ManifestoScene, CollectionScene, SegmentsScene });
