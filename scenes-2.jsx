/* global React */
const { useState, useEffect, useRef } = React;

/* ============================================================
   SCENE — REWARDS (Loyalty + Concours)
   ============================================================ */

const RewardsScene = ({ lang, user, onOpenAuth }) => {
  const sceneRef = useRef(null);
  useSceneProgress(sceneRef);

  /* ── i18n ── */
  const T = {
    fr: {
      fidLabel: "La Fidélité", fidTitle1: "Plus vous portez", fidTitle2: "Latina", fidTitle3: ", plus elle vous remercie.",
      fidText: "Chaque commande compte. Chaque paire vous rapproche d'une réduction, d'un cadeau, d'un avantage exclusif.",
      fidTeaser: "Vos points vous attendent.", fidTeaserSub: "Créez votre compte gratuit et commencez à cumuler dès votre première commande.",
      fidCta: "Créer mon compte",
      points: "pts", balance: "Solde fidélité", nextTier: "pts pour atteindre",
      tiers: { petal: "🌸 Pétale", lotus: "🪷 Lotus", amber: "🌟 Ambre" },
      loyaltyInfo: "1 pt par 100 DA · 10 pts = 1 DA de réduction",
      conLabel: "Le Concours", conTitle1: "Tentez votre chance.", conTitle2: "Tous les mois.",
      conText: "Une cliente tirée au sort chaque mois remporte une paire au choix de la collection. Une commande = une participation. Gratuit.",
      days: "Jours", hrs: "Heures", min: "Min", sec: "Sec",
      enter: "Participer maintenant →", entering: "Participation…", entered: "Vous participez ✓",
      needAuth: "Se connecter pour participer →",
      entryCount: (n) => `${n} participante${n > 1 ? "s" : ""} ce mois-ci`,
      noContest: "Prochain concours bientôt",
      noContestSub: "Inscrivez-vous à la newsletter pour être notifiée en avant-première.",
      prizeLabel: "Le lot du mois",
      entryErr: "Erreur lors de la participation.",
    },
    ar: {
      fidLabel: "الولاء", fidTitle1: "كلما ارتديتِ", fidTitle2: "Latina", fidTitle3: "، كافأتكِ أكثر.",
      fidText: "كل طلب يُحتسب. كل حذاء يقرّبك من تخفيض، هدية، أو ميزة حصرية.",
      fidTeaser: "نقاطكِ في انتظاركِ.", fidTeaserSub: "أنشئي حسابًا مجانيًا وابدأي التراكم من أول طلب.",
      fidCta: "إنشاء حسابي",
      points: "نقطة", balance: "رصيد الولاء", nextTier: "نقطة للوصول إلى",
      tiers: { petal: "🌸 بتلة", lotus: "🪷 لوتس", amber: "🌟 عنبر" },
      loyaltyInfo: "1 نقطة / 100 دج · 10 نقاط = خصم 1 دج",
      conLabel: "المسابقة", conTitle1: "جربي حظك.", conTitle2: "كل شهر.",
      conText: "زبونة واحدة تُسحب كل شهر وتربح حذاء من اختيارها. طلب واحد = مشاركة. مجانًا.",
      days: "أيام", hrs: "ساعات", min: "دقائق", sec: "ثوانٍ",
      enter: "شاركي الآن →", entering: "جارٍ التسجيل…", entered: "أنتِ مشاركة ✓",
      needAuth: "تسجيل الدخول للمشاركة →",
      entryCount: (n) => `${n} مشاركة هذا الشهر`,
      noContest: "المسابقة القادمة قريبًا",
      noContestSub: "اشتركي في النشرة لتصلكِ أول إشعار.",
      prizeLabel: "جائزة الشهر",
      entryErr: "خطأ أثناء التسجيل.",
    },
    en: {
      fidLabel: "Loyalty", fidTitle1: "The more you wear", fidTitle2: "Latina", fidTitle3: ", the more she thanks you.",
      fidText: "Every order counts. Every pair brings you closer to a discount, a gift, an exclusive perk.",
      fidTeaser: "Your points are waiting.", fidTeaserSub: "Create your free account and start earning from your very first order.",
      fidCta: "Create my account",
      points: "pts", balance: "Loyalty balance", nextTier: "pts to reach",
      tiers: { petal: "🌸 Petal", lotus: "🪷 Lotus", amber: "🌟 Amber" },
      loyaltyInfo: "1 pt per 100 DA · 10 pts = 1 DA off",
      conLabel: "The Contest", conTitle1: "Try your luck.", conTitle2: "Every month.",
      conText: "One customer drawn at random each month wins a pair of her choice from the collection. One order = one entry. Free.",
      days: "Days", hrs: "Hours", min: "Min", sec: "Sec",
      enter: "Enter now →", entering: "Entering…", entered: "You're in ✓",
      needAuth: "Sign in to enter →",
      entryCount: (n) => `${n} entr${n === 1 ? "y" : "ies"} this month`,
      noContest: "Next contest coming soon",
      noContestSub: "Subscribe to our newsletter to be the first to know.",
      prizeLabel: "This month's prize",
      entryErr: "Error, please try again.",
    },
  }[lang] || {};

  const TIER_COLORS = { petal: "#C68B6F", lotus: "#9B59B6", amber: "#F59E0B" };

  /* ── Contest state ── */
  const [contest, setContest] = useState(null);
  const [contestLoading, setContestLoading] = useState(true);
  const [entering, setEntering] = useState(false);
  const [entered, setEntered] = useState(false);
  const [entryCount, setEntryCount] = useState(0);
  const [entryError, setEntryError] = useState("");

  /* ── Loyalty state ── */
  const [loyalty, setLoyalty] = useState(null);
  const [loyaltyLoading, setLoyaltyLoading] = useState(false);

  /* ── Countdown ── */
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });

  /* ── Fetch contest on mount ── */
  useEffect(() => {
    window.latinaApi.getContest()
      .then(res => {
        setContest(res.contest || null);
        setEntryCount(res.entries || 0);
        setEntered(!!res.user_entered);
      })
      .catch(() => {})
      .finally(() => setContestLoading(false));
  }, []);

  /* ── Fetch loyalty when user changes ── */
  useEffect(() => {
    if (!user) { setLoyalty(null); return; }
    setLoyaltyLoading(true);
    window.latinaApi.getLoyalty()
      .then(r => setLoyalty(r.data || r))
      .catch(() => {})
      .finally(() => setLoyaltyLoading(false));
  }, [user]);

  /* ── Countdown based on real contest end date ── */
  useEffect(() => {
    if (!contest?.ends_at) return;
    const calc = () => {
      const diff = new Date(contest.ends_at) - Date.now();
      if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
      return {
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      };
    };
    setTime(calc());
    const i = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(i);
  }, [contest?.ends_at]);

  const pad = (n) => String(n).padStart(2, "0");
  const tierPct = loyalty ? Math.min(100, loyalty.tier_progress?.pct || 0) : 0;

  const handleEnter = async () => {
    if (!user) { onOpenAuth?.(); return; }
    setEntering(true);
    setEntryError("");
    try {
      const res = await window.latinaApi.enterContest();
      setEntered(true);
      if (res.entries != null) setEntryCount(res.entries);
      else setEntryCount(c => c + 1);
    } catch (e) {
      if (e.status === 401) { onOpenAuth?.(); return; }
      if (e.data?.already_entered) { setEntered(true); return; }
      setEntryError(e.message || T.entryErr);
    } finally {
      setEntering(false);
    }
  };

  return (
    <section ref={sceneRef} className="scene scene-rewards" id="fidelite" data-screen-label="05 Rewards">
      <div className="container">
        <SceneMarker num="05" label="Rewards" meta="FIDÉLITÉ · CONCOURS" />
        <div className="rewards-grid">

          {/* ── Loyalty card ── */}
          <div className="rewards-card reveal">
            <span className="label">{T.fidLabel}</span>
            <h3>{T.fidTitle1} <em>{T.fidTitle2}</em>{T.fidTitle3}</h3>
            <p>{T.fidText}</p>

            {user && loyaltyLoading ? (
              <div className="loyalty-widget">
                <div className="loyalty-skeleton" />
                <div className="loyalty-skeleton" style={{ width: "60%", marginTop: 8 }} />
                <div className="loyalty-bar"><div className="fill" style={{ width: "0%", background: "var(--petal-200)" }} /></div>
              </div>
            ) : user && loyalty ? (
              <div className="loyalty-widget">
                <div className="loyalty-tier-badge" style={{ background: (TIER_COLORS[loyalty.tier] || "#C68B6F") + "22", color: TIER_COLORS[loyalty.tier] || "#C68B6F", border: `1px solid ${(TIER_COLORS[loyalty.tier] || "#C68B6F")}44` }}>
                  {T.tiers[loyalty.tier] || loyalty.tier}
                </div>
                <div className="loyalty-row" style={{ marginTop: 12 }}>
                  <span>{T.balance}</span>
                  <span className="points t-num">{(loyalty.points || 0).toLocaleString()} {T.points}</span>
                </div>
                <div className="loyalty-bar">
                  <div className="fill" style={{ width: `${tierPct}%`, background: TIER_COLORS[loyalty.tier] || "var(--rose-500)", transition: "width 1s ease" }} />
                </div>
                <div className="loyalty-tiers">
                  {Object.entries(T.tiers).map(([k, label]) => (
                    <span key={k} style={{ fontWeight: loyalty.tier === k ? 700 : 400, color: loyalty.tier === k ? TIER_COLORS[k] : undefined }}>
                      {label}
                    </span>
                  ))}
                </div>
                {loyalty.next_tier && (
                  <div style={{ marginTop: 10, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--rose-500)", textTransform: "uppercase" }}>
                    {loyalty.tier_progress?.needed || "—"} {T.points} {T.nextTier} {T.tiers[loyalty.next_tier] || loyalty.next_tier}
                  </div>
                )}
                <div style={{ marginTop: 6, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-soft)", textTransform: "uppercase" }}>
                  {T.loyaltyInfo}
                </div>
              </div>
            ) : (
              /* Not logged in — beautiful teaser */
              <div className="loyalty-widget loyalty-teaser">
                <div className="loyalty-teaser-inner">
                  <div className="loyalty-teaser-orbs">
                    {["🌸 Pétale", "🪷 Lotus", "🌟 Ambre"].map((tier, i) => (
                      <div key={tier} className="lto-chip" style={{ opacity: 0.3 + i * 0.25, filter: `blur(${(2 - i) * 0.5}px)` }}>{tier}</div>
                    ))}
                  </div>
                  <div className="loyalty-teaser-lock">🔒</div>
                  <p className="loyalty-teaser-title">{T.fidTeaser}</p>
                  <p className="loyalty-teaser-sub">{T.fidTeaserSub}</p>
                  <button className="btn-outline-sm" style={{ marginTop: 16, width: "100%" }} onClick={onOpenAuth}>
                    {T.fidCta}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ── Contest card ── */}
          <div className="concours-card reveal" id="concours">
            <span className="label">{T.conLabel}</span>
            <h3>{T.conTitle1}<br /><em>{T.conTitle2}</em></h3>

            {contestLoading ? (
              <div style={{ paddingTop: 24 }}>
                <div className="loyalty-skeleton" />
                <div className="loyalty-skeleton" style={{ width: "70%", marginTop: 8 }} />
                <div className="loyalty-skeleton" style={{ width: "45%", marginTop: 8 }} />
              </div>
            ) : !contest ? (
              <div className="no-contest">
                <div className="no-contest-icon">🎁</div>
                <p className="no-contest-title">{T.noContest}</p>
                <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>{T.noContestSub}</p>
              </div>
            ) : (
              <>
                <p>{T.conText}</p>

                {contest.title && (
                  <div className="contest-prize">
                    <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--rose-500)", textTransform: "uppercase" }}>
                      {T.prizeLabel}
                    </span>
                    <div className="contest-prize-name">{contest.title}</div>
                  </div>
                )}

                <div className="countdown-grid">
                  {[{ v: time.d, l: T.days }, { v: time.h, l: T.hrs }, { v: time.m, l: T.min }, { v: time.s, l: T.sec }].map(({ v, l }) => (
                    <div className="countdown-cell" key={l}>
                      <div className="num">{pad(v)}</div>
                      <div className="lbl">{l}</div>
                    </div>
                  ))}
                </div>

                {entryCount > 0 && (
                  <div className="contest-entries t-mono">{T.entryCount(entryCount)}</div>
                )}

                {entered ? (
                  <div className="btn-entered">{T.entered}</div>
                ) : (
                  <button className="btn-concours" onClick={handleEnter} disabled={entering}>
                    {entering ? T.entering : (user ? T.enter : T.needAuth)}
                  </button>
                )}

                {entryError && (
                  <div style={{ marginTop: 8, fontFamily: "var(--mono)", fontSize: 11, color: "#EF4444" }}>{entryError}</div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ============================================================
   SCENE — TRUST + NEWSLETTER + FOOTER
   ============================================================ */

const TrustScene = ({ lang }) => {
  const sceneRef = useRef(null);
  useSceneProgress(sceneRef);

  const [newsEmail, setNewsEmail] = useState("");
  const [newsStatus, setNewsStatus] = useState("idle"); // idle | loading | done | already | error

  const t = {
    fr: {
      eyebrow: "Pourquoi Latina",
      title1: "Une boutique",
      title2: "qui mérite",
      title3: "votre confiance.",
      cells: [
        { icon: <IconTruck width={28} height={28} />, h: "Livraison 58 wilayas", p: "De Tamanrasset à Annaba, partout en Algérie. Délais affichés à la commande." },
        { icon: <IconCash width={28} height={28} />, h: "Paiement à la livraison", p: "Vous payez quand vous recevez. Vous voyez avant de décider." },
        { icon: <IconReturn width={28} height={28} />, h: "Retour sous 7 jours", p: "Une pointure ne va pas ? On reprend gratuitement, sans question." },
        { icon: <IconShield width={28} height={28} />, h: "Sélection vérifiée", p: "Chaque pièce contrôlée par notre équipe avant emballage." }
      ],
      news: { title1: "Recevez les", title2: "nouveautés", title3: "en avant-première.", placeholder: "Votre adresse email", cta: "S'inscrire", tiny: "Aucun spam · Désabonnement en un clic", ok: "Merci ! Vous recevrez nos nouveautés en avant-première.", already: "Vous êtes déjà abonnée. À bientôt !", err: "Erreur, veuillez réessayer." }
    },
    ar: {
      eyebrow: "لماذا Latina",
      title1: "متجر",
      title2: "يستحق",
      title3: "ثقتك.",
      cells: [
        { icon: <IconTruck width={28} height={28} />, h: "توصيل 58 ولاية", p: "من تمنراست إلى عنابة. كل المدد معروضة عند الطلب." },
        { icon: <IconCash width={28} height={28} />, h: "الدفع عند الاستلام", p: "تدفعين عند الاستلام. ترين قبل أن تقرري." },
        { icon: <IconReturn width={28} height={28} />, h: "إرجاع خلال 7 أيام", p: "المقاس لا يناسب؟ نسترجعه مجاناً بدون أسئلة." },
        { icon: <IconShield width={28} height={28} />, h: "اختيار موثوق", p: "كل قطعة يتحقق منها فريقنا قبل التغليف." }
      ],
      news: { title1: "استلمي", title2: "الجديد", title3: "قبل الجميع.", placeholder: "بريدك الإلكتروني", cta: "اشتركي", tiny: "بدون إزعاج · إلغاء الاشتراك بنقرة واحدة", ok: "شكرًا! ستصلكِ أخبارنا.", already: "أنتِ مشتركة بالفعل.", err: "خطأ، حاولي مجددًا." }
    },
    en: {
      eyebrow: "Why Latina",
      title1: "A boutique",
      title2: "that earns",
      title3: "your trust.",
      cells: [
        { icon: <IconTruck width={28} height={28} />, h: "All 58 wilayas", p: "From Tamanrasset to Annaba — Algeria-wide. ETA shown at checkout." },
        { icon: <IconCash width={28} height={28} />, h: "Cash on delivery", p: "Pay when you receive. See before you decide." },
        { icon: <IconReturn width={28} height={28} />, h: "7-day returns", p: "Wrong size? We take it back free, no questions asked." },
        { icon: <IconShield width={28} height={28} />, h: "Vetted selection", p: "Every piece checked by our team before packing." }
      ],
      news: { title1: "Get the", title2: "newness", title3: "first.", placeholder: "Your email address", cta: "Subscribe", tiny: "No spam · One-click unsubscribe", ok: "Thank you! You'll receive our updates.", already: "You're already subscribed!", err: "Error, please try again." }
    }
  }[lang];

  const handleNewsletter = async (e) => {
    e.preventDefault();
    if (!newsEmail.trim() || newsStatus === "loading" || newsStatus === "done" || newsStatus === "already") return;
    setNewsStatus("loading");
    try {
      const res = await window.latinaApi.subscribeNewsletter(newsEmail.trim());
      setNewsStatus(res.already ? "already" : "done");
    } catch {
      setNewsStatus("error");
    }
  };

  const newsIsDone = newsStatus === "done" || newsStatus === "already";

  return (
    <section ref={sceneRef} className="scene scene-trust" data-screen-label="06 Trust">
      <div className="container">
        <SceneMarker num="06" label="Trust" meta="58 WILAYAS · COD" />
        <div className="reveal" style={{ marginBottom: 80 }}>
          <div className="label" style={{ marginBottom: 16 }}>{t.eyebrow}</div>
          <h2 className="display" style={{ fontSize: "clamp(40px,5.5vw,72px)", color: "var(--ink)", maxWidth: 760, lineHeight: 1, letterSpacing: "-0.015em" }}>
            {t.title1} <em style={{ color: "var(--rose-500)", fontStyle: "italic" }}>{t.title2}</em><br />
            {t.title3}
          </h2>
        </div>

        <div className="trust-row reveal-stagger">
          {t.cells.map((c, i) => (
            <div className="trust-cell" key={i}>
              <div className="icon">{c.icon}</div>
              <h4>{c.h}</h4>
              <p>{c.p}</p>
            </div>
          ))}
        </div>

        <div className="ws-block reveal">
          <div className="ws-block-head">
            <span className="t-mono">— { {fr:"Vérifiez votre livraison", ar:"تحققي من التوصيل", en:"Check your delivery"}[lang] }</span>
            <h3 className="t-h4">{ {fr:"Wilaya · Commune · Frais en temps réel", ar:"الولاية · البلدية · الرسوم آنياً", en:"Wilaya · Commune · Live fee"}[lang] }</h3>
          </div>
          <WilayaSelector lang={lang} />
        </div>

        <div className="newsletter reveal">
          <h2>
            {t.news.title1} <em>{t.news.title2}</em><br />
            {t.news.title3}
          </h2>
          <div className="newsletter-form">
            {newsIsDone ? (
              <div className="newsletter-ok">
                <span className="newsletter-ok-icon">✓</span>
                <span>{newsStatus === "already" ? t.news.already : t.news.ok}</span>
              </div>
            ) : (
              <form className="row" onSubmit={handleNewsletter}>
                <input
                  type="email"
                  placeholder={t.news.placeholder}
                  value={newsEmail}
                  onChange={e => { setNewsEmail(e.target.value); if (newsStatus === "error") setNewsStatus("idle"); }}
                  required
                  disabled={newsStatus === "loading"}
                />
                <button type="submit" disabled={newsStatus === "loading"}>
                  {newsStatus === "loading" ? <span className="btn-spinner" /> : t.news.cta}
                </button>
              </form>
            )}
            {newsStatus === "error" && <div style={{ marginTop: 8, fontFamily: "var(--mono)", fontSize: 11, color: "#EF4444" }}>{t.news.err}</div>}
            {!newsIsDone && <div className="tiny">{t.news.tiny}</div>}
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }) => {
  const t = {
    fr: {
      tagline: "Just for you.",
      cols: [
        { h: "Boutique", links: ["Chaussures", "Sacs", "Accessoires", "Nouveautés", "Promotions"] },
        { h: "Compte", links: ["Mon compte", "Mes commandes", "Liste de souhaits", "Programme Fidélité", "Concours"] },
        { h: "Aide", links: ["Livraison", "Retours", "Guide des tailles", "FAQ", "Contact"] }
      ],
      bottom: ["© 2026 Latina · Alger, Algérie", "Conditions · Confidentialité · Mentions"]
    },
    ar: {
      tagline: "Just for you.",
      cols: [
        { h: "المتجر", links: ["الأحذية", "الحقائب", "الإكسسوارات", "الجديد", "العروض"] },
        { h: "الحساب", links: ["حسابي", "طلباتي", "المفضلة", "برنامج الولاء", "المسابقة"] },
        { h: "المساعدة", links: ["التوصيل", "الإرجاع", "دليل المقاسات", "الأسئلة", "اتصلي بنا"] }
      ],
      bottom: ["© 2026 Latina · الجزائر العاصمة", "الشروط · الخصوصية"]
    },
    en: {
      tagline: "Just for you.",
      cols: [
        { h: "Shop", links: ["Shoes", "Bags", "Accessories", "New in", "Sale"] },
        { h: "Account", links: ["My account", "Orders", "Wishlist", "Loyalty program", "Contest"] },
        { h: "Help", links: ["Delivery", "Returns", "Size guide", "FAQ", "Contact"] }
      ],
      bottom: ["© 2026 Latina · Algiers, Algeria", "Terms · Privacy · Legal"]
    }
  }[lang];

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col footer-brand">
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <LotusMark size={36} color="var(--rose-500)" />
            <div className="brand-name">Latina</div>
          </div>
          <p>{t.tagline}</p>
        </div>
        {t.cols.map(c => (
          <div className="footer-col" key={c.h}>
            <h5>{c.h}</h5>
            <ul>
              {c.links.map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>{t.bottom[0]}</span>
        <span>{t.bottom[1]}</span>
      </div>
    </footer>
  );
};

Object.assign(window, { RewardsScene, TrustScene, Footer });
