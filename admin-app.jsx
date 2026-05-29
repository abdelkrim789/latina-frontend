/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback, useMemo } = React;
const latinaApi = window.latinaApi;

/* ============================================================
   i18n — Arabic (default) + French
   ============================================================ */
const ADMIN_T = {
  // Nav
  'Dashboard':'لوحة التحكم','Produits':'المنتجات','Catégories':'الفئات',
  'Flash Sales':'العروض المحدودة','Inventaire':'المخزون','Commandes':'الطلبات',
  'Réservations':'الحجوزات','Échanges':'التبديلات','Clients':'العملاء',
  'Concours':'المسابقات','Coupons':'القسائم','Support':'الدعم',
  'Rapports':'التقارير','Audit':'التدقيق','Équipe':'الفريق','Plus':'المزيد',
  // Sections
  'CATALOGUE':'الكتالوج','VENTES':'المبيعات','OFFRES':'العروض',
  'GESTION':'الإدارة','SUPPORT':'الدعم',
  // Login
  'Mot de passe':'كلمة المرور','Se connecter':'تسجيل الدخول',
  'TABLEAU DE BORD':'لوحة التحكم','Identifiants incorrects':'بيانات الدخول غير صحيحة',
  // Common buttons
  'Sauvegarder':'حفظ','Enregistrer':'حفظ','Annuler':'إلغاء','Modifier':'تعديل',
  'Supprimer':'حذف','Créer':'إنشاء','Appliquer':'تطبيق','Réessayer':'إعادة المحاولة',
  'Bloquer':'حظر','Débloquer':'رفع الحظر','Tout lire':'تحديد الكل كمقروء',
  'Ouvrir':'فتح','Ajouter la note':'إضافة ملاحظة','Effacer':'مسح',
  '↺ Actualiser':'↺ تحديث','⬇ Exporter CSV':'⬇ تصدير CSV',
  '⬇ Exporter Excel':'⬇ تصدير Excel','🗄 Archiver & Purger':'🗄 أرشفة وتنظيف',
  'Enregistrement…':'جارٍ الحفظ...','+ Nouveau produit':'+ منتج جديد',
  '+ Nouveau coupon':'+ قسيمة جديدة','+ Nouvelle flash sale':'+ عرض محدود جديد',
  '+ Nouveau concours':'+ مسابقة جديدة','+ Nouveau membre':'+ عضو جديد',
  '+ Créer une réservation':'+ إنشاء حجز','Créer la réservation':'إنشاء الحجز',
  'Créer le compte':'إنشاء الحساب','Créer le produit':'إنشاء المنتج',
  '+ Ajouter une variante':'+ إضافة متغيرة','Créer la variante':'إنشاء المتغيرة',
  '✓ Finaliser l\'échange':'✓ إتمام التبديل','Annuler cet échange':'إلغاء التبديل',
  '🎲 Tirer':'🎲 السحب','📢 Annoncer':'📢 إعلان','✓ Annoncée':'✓ تم الإعلان',
  '💬 WA':'💬 واتساب','📷 Entrées':'📷 المشاركات',
  // Common labels
  'Statut':'الحالة','Date':'التاريخ','Client':'العميل','Total':'الإجمالي',
  'Wilaya':'الولاية','Produit':'المنتج','Prix':'السعر','Stock':'المخزون',
  'Actions':'الإجراءات','Nom':'الاسم','Email':'البريد الإلكتروني',
  'Téléphone':'الهاتف','Rôle':'الدور','Créé':'تاريخ الإنشاء','Type':'النوع',
  'Valeur':'القيمة','Code':'الرمز','Note':'الملاحظة','Priorité':'الأولوية',
  'Sujet':'الموضوع','Titre':'العنوان','Réduction':'الخصم','Début':'البداية',
  'Fin':'النهاية','Participants':'المشاركون','Gagnante':'الفائزة',
  'Variante':'المتغيرة','Couleur':'اللون','Taille':'المقاس','État':'الحالة',
  'Commentaire':'التعليق','Réf.':'المرجع','Durée':'المدة','Expire':'الانتهاء',
  'Tier':'الطبقة','Points':'النقاط','IP':'عنوان IP','Acteur':'المنفذ',
  'Action':'الإجراء','SKU':'SKU','Catégorie':'الفئة','Description':'الوصف',
  'Δ Qté':'Δ الكمية','Stock après':'المخزون بعد','Cible':'الهدف',
  'Qté':'الكمية','Seuil alerte':'عتبة التنبيه','Niveau':'المستوى',
  'Ajust. DA':'تعديل (دج)','Niveaux de stock':'مستويات المخزون',
  'Ancienne taille/couleur':'المقاس/اللون القديم','Nouvelle taille/couleur':'المقاس/اللون الجديد',
  // Page titles
  'Journal d\'audit':'سجل التدقيق','Support & Tickets':'الدعم والتذاكر',
  // Dashboard
  'Commandes récentes':'الطلبات الأخيرة','Bénéfice brut':'الربح الإجمالي',
  'Produits actifs':'المنتجات النشطة','Cliquer pour le détail →':'انقر للتفاصيل',
  'Actualisé à':'آخر تحديث','vs période préc.':'مقارنة بالفترة السابقة',
  // Product form
  'Nouveau produit':'منتج جديد','Informations':'المعلومات','Variantes':'المتغيرات',
  'Nom du produit':'اسم المنتج','Prix & Stock':'السعر والمخزون',
  'Prix de vente *':'سعر البيع *','Prix barré':'السعر قبل التخفيض',
  'Prix d\'achat (coût)':'سعر الشراء (التكلفة)','Stock initial':'المخزون الأولي',
  'SKU / Référence':'SKU / المرجع','Hauteur de talon':'ارتفاع الكعب',
  'Matières':'المواد','Tags':'الوسوم','Visibilité':'الظهور','Actif':'نشط',
  'Mis en avant':'مميز','Visible sur la boutique':'مرئي في المتجر',
  'Prioritaire en collection':'أولوية في المجموعة',
  'Glisser les photos ici':'اسحب الصور هنا','ou cliquer pour parcourir':'أو انقر للتصفح',
  'Non sauvegardé':'غير محفوظ','Principale':'رئيسية',
  'Rechercher un produit…':'البحث عن منتج...',
  'Enregistrer les modifications':'حفظ التعديلات',
  'Supprimer ce produit':'حذف المنتج','Définir principale':'تعيين كرئيسية',
  'Nouvelle variante':'متغيرة جديدة','Ajust. Prix (DA)':'تعديل السعر (دج)',
  // Orders
  'Détail':'التفاصيل','Passer la commande en':'تغيير الحالة إلى',
  'Livraison':'التوصيل','Frais livraison':'رسوم التوصيل',
  'Total commande':'إجمالي الطلب','Statut actuel':'الحالة الحالية',
  'Transition':'التحويل','Retour expéditeur (RTO)':'إرجاع (RTO)',
  'Frais retour courier':'رسوم إرجاع البريد',
  // Statuses
  'En attente':'قيد الانتظار','Confirmée':'مؤكدة','Active':'نشطة',
  'Expirée':'منتهية','Annulée':'ملغاة','Nouveau':'جديد','Attribué':'مُعيَّن',
  'Planifié':'مجدول','En cours':'جارٍ','Résolu':'محلول','Fermé':'مغلق',
  'Basse':'منخفضة','Normale':'عادية','Haute':'عالية','Urgent':'عاجل',
  'Inactif':'غير نشط','Rupture':'نفاد','Stock bas':'مخزون منخفض','OK':'جيد',
  'Validées':'مقبولة','Refusées':'مرفوضة',
  // Exchanges
  'Initier un échange':'بدء تبديل','Articles concernés':'المقالات المعنية',
  'Motif':'السبب','Motif de l\'échange':'سبب التبديل','Motif du refus':'سبب الرفض',
  'Sélectionné':'محدد','Variante de remplacement':'متغيرة الاستبدال',
  'Traité par':'المعالج بواسطة','Non assigné':'غير مُعيَّن',
  // Inventory
  'Historique des mouvements':'سجل الحركات',
  'RUPTURE DE STOCK':'نفاد المخزون','STOCK BAS':'مخزون منخفض','PRODUITS ACTIFS':'منتجات نشطة',
  'Aucun produit en alerte':'لا توجد تنبيهات للمخزون',
  'Aucun mouvement enregistré':'لا توجد حركات مسجلة',
  // Reports
  'Évolution du chiffre d\'affaires':'تطور رقم الأعمال',
  'Évolution des commandes':'تطور الطلبات','Top 10 Produits':'أفضل 10 منتجات',
  'Top Wilayas':'أفضل الولايات','Alertes stock':'تنبيهات المخزون',
  'Chiffre d\'affaires':'رقم الأعمال','Panier moyen':'متوسط السلة',
  'Taux de livraison':'معدل التوصيل','Livrées':'مُسلَّمة','Annulées':'ملغاة',
  'Nv. clients':'عملاء جدد','7 j':'7 أيام','30 j':'30 يوم','90 j':'90 يوم','1 an':'سنة',
  // Team
  'Membres':'الأعضاء','Rôles & Accès':'الأدوار والصلاحيات',
  'Accès complet':'وصول كامل','Accès complet à toutes les sections':'وصول كامل لجميع الأقسام',
  // Notifications
  'Notifications':'الإشعارات',
  // Support
  'Ajouter une note interne':'إضافة ملاحظة داخلية','Notes internes':'ملاحظات داخلية',
  'Feedbacks clients':'آراء العملاء','Demande':'الطلب',
  // Search
  'Recherche':'بحث','Aucun résultat pour':'لا نتائج لـ','naviguer':'التنقل','ouvrir':'فتح','fermer':'إغلاق',
  // Theme
  'Passer en mode clair':'الوضع الفاتح','Passer en mode sombre':'الوضع الداكن',
  // Profit
  'Revenu total':'إجمالي الإيرادات','Coût produits':'تكلفة المنتجات',
  'Frais RTO':'رسوم الإرجاع','Bénéfice net':'صافي الربح','Marge moy.':'متوسط الهامش',
  'Comptabilité — Bénéfice brut':'المحاسبة — الربح الإجمالي',
  'Aucune commande livrée sur cette période':'لا توجد طلبات مسلَّمة في هذه الفترة',
  'Retours expéditeur (RTO)':'الإرجاعات (RTO)',
  // Empty states
  'Aucune commande':'لا توجد طلبات','Aucun produit':'لا توجد منتجات',
  'Aucune catégorie':'لا توجد فئات','Aucun client':'لا يوجد عملاء',
  'Aucune réservation':'لا توجد حجوزات','Aucune participation':'لا توجد مشاركات',
  'Aucun échange':'لا توجد تبديلات','Aucun ticket trouvé.':'لا توجد تذاكر.',
  'Aucun produit trouvé':'لا يوجد منتج','Aucune donnée':'لا توجد بيانات',
  'Aucune donnée sur la période':'لا توجد بيانات في هذه الفترة',
  'Aucun avis reçu.':'لم يتم استلام أي تعليق.',
  'Les retours clients apparaîtront ici.':'ستظهر تعليقات العملاء هنا.',
  'Chargement…':'جارٍ التحميل...','Connecté - pas de données':'متصل - لا توجد بيانات',
  // Toast / success
  'Produit créé !':'تم إنشاء المنتج!','Produit enregistré':'تم حفظ المنتج',
  'Produit supprimé':'تم حذف المنتج','Stock mis à jour':'تم تحديث المخزون',
  'Variante enregistrée':'تم حفظ المتغيرة','Supprimée':'تم الحذف',
  'Catégorie enregistrée':'تم حفظ الفئة','Catégorie supprimée':'تم حذف الفئة',
  'Échange créé.':'تم إنشاء التبديل.','Client bloqué':'تم حظر العميل',
  'Client débloqué':'تم رفع الحظر','Points mis à jour':'تم تحديث النقاط',
  'Coupon enregistré':'تم حفظ القسيمة','Coupon désactivé':'تم تعطيل القسيمة',
  'Flash sale enregistrée':'تم حفظ العرض المحدود',
  'Réservation créée avec succès':'تم إنشاء الحجز بنجاح',
  'Réservation activée':'تم تفعيل الحجز','Réservation annulée':'تم إلغاء الحجز',
  'Participation validée':'تمت الموافقة على المشاركة',
  'Participation refusée':'تم رفض المشاركة',
  'Concours créé':'تم إنشاء المسابقة','Concours supprimé':'تم حذف المسابقة',
  'Annonce activée pour 6 heures':'تم تفعيل الإعلان لمدة 6 ساعات',
  'Droits enregistrés':'تم حفظ الصلاحيات',
  'Membre ajouté':'تمت إضافة العضو','Supprimé':'تم الحذف',
  'Export téléchargé':'تم تنزيل التصدير','Export échoué':'فشل التصدير',
  'Archive créée avec succès':'تم إنشاء الأرشيف بنجاح',
  'Erreur archivage':'خطأ في الأرشفة','Ticket mis à jour':'تم تحديث التذكرة',
  'Échange finalisé. Stock mis à jour.':'تم إتمام التبديل. تم تحديث المخزون.',
  'Échange annulé.':'تم إلغاء التبديل.',
  // Errors
  'Erreur':'خطأ','Erreur lors de la mise à jour':'خطأ في التحديث',
  'Erreur note':'خطأ في الملاحظة','Erreur de chargement':'خطأ في التحميل',
  'Valeur invalide':'قيمة غير صالحة',
  'Le nom en français est requis':'الاسم بالفرنسية مطلوب',
  'Le prix est requis':'السعر مطلوب',
  // Coupon
  'Min commande (DA)':'الحد الأدنى للطلب (دج)','Utilisations max':'الحد الأقصى للاستخدام',
  'Expire le':'ينتهي في','Utilisations':'الاستخدامات','Désactiver ce coupon':'تعطيل القسيمة',
  // Misc
  'Tous':'الكل','Pendant 6 heures ?':'لمدة 6 ساعات؟',
  'auto ✎':'ترجمة تلقائية ✎','Restauré ✓':'تمت الاستعادة ✓','Invité':'ضيف',
  'Compte enregistré':'تم حفظ الحساب','Ctrl K':'Ctrl K',
  'Nom (FR)':'الاسم (FR)','Nom (AR)':'الاسم (AR)',
  'Titre (FR)':'العنوان (FR)','Français':'الفرنسية','Arabe':'العربية','Anglais':'الإنجليزية',
  'Déconnexion':'تسجيل الخروج',
};

const LangCtx = React.createContext({ lang: 'ar', t: k => k, toggleLang: () => {} });
const useLang = () => React.useContext(LangCtx);

const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('latina-admin-lang') || 'ar');
  const t = useCallback((key) => {
    if (!key) return key;
    if (lang === 'fr') return key;
    return ADMIN_T[key] ?? key;
  }, [lang]);
  const toggleLang = useCallback(() => {
    const next = lang === 'ar' ? 'fr' : 'ar';
    setLang(next);
    localStorage.setItem('latina-admin-lang', next);
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
  return (
    <LangCtx.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangCtx.Provider>
  );
};

/* ============================================================
   ADMIN CONTEXT — carries admin user + theme down the tree
   ============================================================ */
const AdminCtx = React.createContext(null);
const useAdmin = () => React.useContext(AdminCtx);

/* ============================================================
   RBAC — role → allowed pages (dynamic, loaded from API after login)
   ============================================================ */

// Mutable map updated from /admin/roles/settings after login
let _rolePageMap = {
  'super-admin':     null,
  'support':         ['dashboard','orders','reservations','exchanges','customers','products','categories','inventory','support','audit'],
  'order-manager':   ['dashboard','orders','reservations','exchanges','customers'],
  'catalog-manager': ['dashboard','products','categories','inventory'],
  'viewer':          ['dashboard','products','orders','reservations','customers'],
};

const applyRoleSettings = (settings) => {
  if (!Array.isArray(settings)) return;
  settings.forEach(s => { _rolePageMap[s.name] = s.allowed_pages ?? null; });
};

/** Returns array of allowed page ids, or null if unrestricted */
const getAllowedPages = (admin) => {
  if (!admin) return [];
  if (admin.is_super) return null;
  const roleNames = (admin.roles || []).map(r => (typeof r === 'string' ? r : r.name));
  const pages = new Set();
  for (const rn of roleNames) {
    const allowed = _rolePageMap[rn];
    if (allowed === null || allowed === undefined) return null;
    allowed.forEach(p => pages.add(p));
  }
  return pages.size > 0 ? Array.from(pages) : ['dashboard'];
};

// Page metadata for the role configurator
const ALL_PAGES = [
  { id: 'dashboard',    label: 'Dashboard',      group: 'Général' },
  { id: 'products',     label: 'Produits',        group: 'Catalogue' },
  { id: 'categories',   label: 'Catégories',      group: 'Catalogue' },
  { id: 'flash_sales',  label: 'Flash Sales',     group: 'Catalogue' },
  { id: 'inventory',    label: 'Inventaire',      group: 'Catalogue' },
  { id: 'orders',       label: 'Commandes',       group: 'Commandes' },
  { id: 'reservations', label: 'Réservations',    group: 'Commandes' },
  { id: 'exchanges',    label: 'Échanges',        group: 'Commandes' },
  { id: 'customers',    label: 'Clients',         group: 'Clients' },
  { id: 'contests',     label: 'Concours',        group: 'Clients' },
  { id: 'support',      label: 'Support',         group: 'Support' },
  { id: 'reports',      label: 'Rapports',        group: 'Rapports' },
  { id: 'audit',        label: 'Audit',           group: 'Rapports' },
  { id: 'team',         label: 'Équipe',          group: 'Admin', sensitive: true },
];

const canAccess = (admin, pageId) => {
  const allowed = getAllowedPages(admin);
  return allowed === null || allowed.includes(pageId);
};

/* ============================================================
   TOAST
   ============================================================ */
const ToastCtx = React.createContext(null);
const useToast = () => React.useContext(ToastCtx);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((msg, type = "ok") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  return (
    <ToastCtx.Provider value={show}>
      {children}
      <div className="admin-toast-wrap">
        {toasts.map(t => (
          <div key={t.id} className={`admin-toast toast-${t.type}`}>
            {t.type === "ok" ? "✓" : t.type === "err" ? "✕" : "ℹ"} {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
};

/* ============================================================
   LOGIN
   ============================================================ */
const AdminLogin = ({ onLogin }) => {
  const { t, lang, toggleLang } = useLang();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await latinaApi.adminLogin(form.email, form.password);
      onLogin(res.admin || res.data?.admin || res.user);
    } catch (e) {
      setError(t(e.message || "Identifiants incorrects"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <div className="al-brand">
          <div className="al-logo">L</div>
          <div>
            <div className="al-title">Latina Admin</div>
            <div className="al-sub">{t('TABLEAU DE BORD')}</div>
          </div>
        </div>
        <form className="al-form" onSubmit={submit}>
          <div className="al-field">
            <label>{t('Email')}</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required placeholder="admin@latina.dz" />
          </div>
          <div className="al-field">
            <label>{t('Mot de passe')}</label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} required />
          </div>
          {error && <div className="al-err">{error}</div>}
          <button type="submit" className="al-btn" disabled={loading}>
            {loading ? <span className="admin-spinner" style={{width:16,height:16}} /> : t('Se connecter')}
          </button>
        </form>
        <button onClick={toggleLang} style={{marginTop:16,background:'none',border:'1px solid var(--border)',borderRadius:6,padding:'4px 14px',cursor:'pointer',color:'var(--text-3)',fontSize:12}}>
          {lang === 'ar' ? 'Français' : 'العربية'}
        </button>
      </div>
    </div>
  );
};

/* ============================================================
   SIDEBAR
   ============================================================ */
const SvgIcon = ({ d, children, viewBox = "0 0 24 24" }) => (
  <svg viewBox={viewBox} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {d ? <path d={d} /> : children}
  </svg>
);

const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard",    section: null,        icon: <SvgIcon><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></SvgIcon> },
  { id: "products",    label: "Produits",     section: "CATALOGUE", icon: <SvgIcon><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></SvgIcon> },
  { id: "categories",  label: "Catégories",   section: null,        icon: <SvgIcon d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/> },
  { id: "orders",      label: "Commandes",    section: "VENTES",    icon: <SvgIcon><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></SvgIcon> },
  { id: "reservations",label: "Réservations", section: null,        icon: <SvgIcon><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><polyline points="9 16 11 18 15 14"/></SvgIcon> },
  { id: "exchanges",   label: "Échanges",     section: null,        icon: <SvgIcon><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 014-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 01-4 4H3"/></SvgIcon> },
  { id: "customers",   label: "Clients",      section: null,        icon: <SvgIcon><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></SvgIcon> },
  { id: "coupons",     label: "Coupons",      section: "OFFRES",    icon: <SvgIcon><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></SvgIcon> },
  { id: "flash_sales", label: "Flash Sales",  section: null,        icon: <SvgIcon><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></SvgIcon> },
  { id: "packs",       label: "Packs",        section: null,        icon: <SvgIcon><rect x="2" y="3" width="9" height="9" rx="1"/><rect x="13" y="3" width="9" height="9" rx="1"/><rect x="2" y="14" width="9" height="9" rx="1"/><rect x="13" y="14" width="9" height="9" rx="1"/></SvgIcon> },
  { id: "contests",    label: "Concours",     section: null,        icon: <SvgIcon><polyline points="8 6 12 2 16 6"/><path d="M8 6H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-3"/><line x1="12" y1="2" x2="12" y2="15"/></SvgIcon> },
  { id: "inventory",   label: "Inventaire",   section: "GESTION",   icon: <SvgIcon><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></SvgIcon> },
  { id: "team",        label: "Équipe",       section: null,        icon: <SvgIcon><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></SvgIcon> },
  { id: "reports",     label: "Rapports",     section: null,        icon: <SvgIcon><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></SvgIcon> },
  { id: "audit",       label: "Audit",        section: null,        icon: <SvgIcon><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></SvgIcon> },
  { id: "support",     label: "Support",      section: "SUPPORT",   icon: <SvgIcon><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></SvgIcon> },
];

const ROLE_LABELS = {
  'super-admin':     'Super Admin',
  'support':         'Support',
  'order-manager':   'REP Commandes',
  'catalog-manager': 'GDS',
  'viewer':          'Lecteur',
};

/* ============================================================
   MOBILE BOTTOM NAV — thumb-friendly fixed bar for phones
   ============================================================ */
const MobileBottomNav = ({ page, setPage, admin, onMoreClick }) => {
  const { t } = useLang();
  const allowedPages = getAllowedPages(admin);
  const visibleItems = allowedPages === null
    ? NAV_ITEMS
    : NAV_ITEMS.filter(item => allowedPages.includes(item.id));
  const bottomItems = visibleItems.slice(0, 4);

  return (
    <nav className="admin-mobile-nav" aria-label="Navigation principale">
      {bottomItems.map(item => (
        <button
          key={item.id}
          className={`mob-nav-btn${page === item.id ? " active" : ""}`}
          onClick={() => setPage(item.id)}
          aria-label={t(item.label)}
        >
          <span className="mob-nav-icon">{item.icon}</span>
          <span className="mob-nav-label">{t(item.label)}</span>
        </button>
      ))}
      <button className="mob-nav-btn" onClick={onMoreClick} aria-label={t('Plus')}>
        <span className="mob-nav-icon">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </span>
        <span className="mob-nav-label">{t('Plus')}</span>
      </button>
    </nav>
  );
};

const Sidebar = ({ page, setPage, admin, onLogout, mobileOpen, onMobileClose }) => {
  const { t, lang, toggleLang } = useLang();
  const [collapsed, setCollapsed] = useState(false);
  const allowedPages = getAllowedPages(admin);
  const visibleItems = allowedPages === null
    ? NAV_ITEMS
    : NAV_ITEMS.filter(item => allowedPages.includes(item.id));
  const roleNames = (admin?.roles || []).map(r => (typeof r === 'string' ? r : r.name));
  const roleLabel = admin?.is_super
    ? 'Super Admin'
    : (ROLE_LABELS[roleNames[0]] || roleNames[0] || 'Admin');
  let lastSection = null;

  const navigate = (id) => { setPage(id); onMobileClose?.(); };

  return (
    <>
      {mobileOpen && (
        <div className="sb-mobile-overlay" onClick={onMobileClose} />
      )}
      <aside className={`admin-sidebar${collapsed ? " collapsed" : ""}${mobileOpen ? " mobile-open" : ""}`}>
        <div className="sb-brand">
          <div className="sb-logo">L</div>
          <div style={{overflow:"hidden"}}>
            <div className="sb-title">Latina</div>
            <div className="sb-subtitle">ADMIN</div>
          </div>
          <button
            className="sb-collapse-btn"
            onClick={() => setCollapsed(c => !c)}
            title={collapsed ? "›" : "‹"}
          >
            {collapsed ? "›" : "‹"}
          </button>
        </div>
        <nav className="sb-nav">
          {visibleItems.map(item => {
            const showSection = item.section && item.section !== lastSection;
            if (item.section) lastSection = item.section;
            return (
              <React.Fragment key={item.id}>
                {showSection && <div className="sb-section">{t(item.section)}</div>}
                <button
                  className={`sb-item ${page === item.id ? "active" : ""}`}
                  data-label={t(item.label)}
                  onClick={() => navigate(item.id)}
                >
                  <span className="sb-icon">{item.icon}</span>
                  <span className="sb-label">{t(item.label)}</span>
                </button>
              </React.Fragment>
            );
          })}
        </nav>
        <div className="sb-user">
          <div className="sb-avatar">{admin?.name?.[0] || "A"}</div>
          <div className="sb-user-info">
            <div className="sb-user-name">{admin?.name}</div>
            <div className="sb-user-role">{roleLabel}</div>
          </div>
          <button
            className="sb-logout"
            title={lang === 'ar' ? 'Français' : 'عربي'}
            onClick={toggleLang}
            style={{fontWeight:700, fontSize:12, letterSpacing:0}}
          >
            {lang === 'ar' ? 'FR' : 'ع'}
          </button>
          <button className="sb-logout" title={t('Déconnexion')} onClick={onLogout}>⎋</button>
        </div>
      </aside>
    </>
  );
};

/* ============================================================
   DASHBOARD
   ============================================================ */
/* ============================================================
   PROFIT LEDGER — accounting drawer opened from dashboard card
   ============================================================ */
const LEDGER_PERIODS = [{label:"7 j",days:7},{label:"30 j",days:30},{label:"90 j",days:90},{label:"1 an",days:365}];

const ProfitLedger = ({ onClose }) => {
  const [days, setDays]       = useState(30);
  const [data, setData]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const load = (d) => {
    setLoading(true);
    const to   = new Date().toISOString().slice(0,10);
    const from = new Date(Date.now()-d*86400000).toISOString().slice(0,10);
    latinaApi.admin.get(`/reports/profit?date_from=${from}&date_to=${to}`)
      .then(r => setData(r.data||r)).catch(()=>setData(null))
      .finally(()=>setLoading(false));
  };

  useEffect(()=>{ load(days); },[days]);

  const P = data||{};
  const fmt = v => Number(v||0).toLocaleString();

  const summaryStrips = [
    {label:"Revenu total",   val:`${fmt(P.total_revenue)} DA`,   color:"var(--text)"},
    {label:"Coût produits",  val:`${fmt(P.total_cost)} DA`,       color:"#F59E0B"},
    {label:"Frais RTO",      val:`− ${fmt(P.total_rto_fees||0)} DA`, color:"#EF4444"},
    {label:"Bénéfice net",   val:`${fmt(P.total_profit)} DA`,    color:"#10B981"},
    {label:"Marge moy.",     val:`${P.avg_margin||0}%`,          color:"var(--rose)"},
  ];

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e=>e.stopPropagation()}
        style={{width:"min(960px,96vw)",maxHeight:"90vh",display:"flex",flexDirection:"column",padding:0}}>

        {/* header */}
        <div className="admin-modal-head" style={{padding:"16px 20px",flexShrink:0}}>
          <div>
            <div className="admin-modal-title">Comptabilité — Bénéfice brut</div>
            <div style={{display:"flex",gap:4,marginTop:6}}>
              {LEDGER_PERIODS.map(p=>(
                <button key={p.days}
                  className={`btn btn-sm ${days===p.days?"btn-rose":"btn-ghost"}`}
                  style={{fontSize:11,padding:"2px 10px"}}
                  onClick={()=>setDays(p.days)}>{p.label}</button>
              ))}
            </div>
          </div>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        {loading ? <div className="admin-loading" style={{flex:1}}><div className="admin-spinner"/></div> : (
          <div style={{overflow:"auto",flex:1}}>

            {/* summary strip */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:1,background:"var(--border)",borderBottom:"1px solid var(--border)",flexShrink:0}}>
              {summaryStrips.map(s=>(
                <div key={s.label} style={{background:"var(--bg)",padding:"14px 18px"}}>
                  <div style={{fontSize:11,color:"var(--text-3)",marginBottom:4}}>{s.label}</div>
                  <div style={{fontSize:20,fontWeight:700,color:s.color,fontFamily:"var(--mono)"}}>{s.val}</div>
                </div>
              ))}
            </div>

            {/* orders ledger */}
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th><th>Référence</th><th>Client</th>
                    <th style={{textAlign:"right"}}>Revenu</th>
                    <th style={{textAlign:"right"}}>Coût</th>
                    <th style={{textAlign:"right"}}>Bénéfice</th>
                    <th style={{textAlign:"right"}}>Marge</th>
                    <th style={{width:28}}></th>
                  </tr>
                </thead>
                <tbody>
                  {!(P.orders||[]).length && (
                    <tr><td colSpan={8} style={{textAlign:"center",padding:28,color:"var(--text-3)"}}>
                      Aucune commande livrée sur cette période
                    </td></tr>
                  )}
                  {(P.orders||[]).map(o=>(
                    <React.Fragment key={o.id}>
                      <tr style={{cursor:"pointer"}} onClick={()=>setExpanded(expanded===o.id?null:o.id)}>
                        <td className="mono text-mute" style={{fontSize:11}}>{o.date}</td>
                        <td className="mono" style={{fontSize:12}}>{o.reference}</td>
                        <td>{o.customer}</td>
                        <td className="mono" style={{textAlign:"right"}}>{fmt(o.revenue)} DA</td>
                        <td className="mono" style={{textAlign:"right",color:"#F59E0B"}}>{fmt(o.cost)} DA</td>
                        <td className="mono" style={{textAlign:"right",fontWeight:700,color:(o.profit||0)>=0?"#10B981":"#EF4444"}}>
                          {fmt(o.profit)} DA
                        </td>
                        <td className="mono" style={{textAlign:"right",color:"var(--rose)"}}>{o.margin}%</td>
                        <td style={{textAlign:"center",fontSize:10,color:"var(--text-3)"}}>{expanded===o.id?"▲":"▼"}</td>
                      </tr>
                      {expanded===o.id && (
                        <tr>
                          <td colSpan={8} style={{padding:0,background:"var(--bg2)"}}>
                            <table style={{width:"100%",fontSize:11,borderCollapse:"collapse"}}>
                              <thead>
                                <tr style={{background:"var(--bg3)"}}>
                                  {["Produit","Qté","Prix vente","Coût unit.","Bénéfice ligne"].map(h=>(
                                    <th key={h} style={{padding:"6px 14px",textAlign:h==="Produit"?"left":"right",fontWeight:500,color:"var(--text-3)"}}>{h}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {(o.lines||[]).map((l,i)=>(
                                  <tr key={i} style={{borderTop:"1px solid var(--border)"}}>
                                    <td style={{padding:"7px 14px"}}>{l.name}</td>
                                    <td style={{padding:"7px 14px",textAlign:"right"}}>{l.qty}</td>
                                    <td style={{padding:"7px 14px",textAlign:"right",fontFamily:"var(--mono)"}}>{fmt(l.unit_price)} DA</td>
                                    <td style={{padding:"7px 14px",textAlign:"right",fontFamily:"var(--mono)",color:"#F59E0B"}}>
                                      {l.cost_price ? `${fmt(l.cost_price)} DA` : <span style={{color:"var(--text-3)"}}>—</span>}
                                    </td>
                                    <td style={{padding:"7px 14px",textAlign:"right",fontFamily:"var(--mono)",fontWeight:600,color:(l.line_profit||0)>=0?"#10B981":"#EF4444"}}>
                                      {fmt(l.line_profit)} DA
                                    </td>
                                  </tr>
                                ))}
                                {o.rto_fee > 0 && (
                                  <tr style={{borderTop:"1px solid var(--border)",background:"rgba(239,68,68,0.04)"}}>
                                    <td style={{padding:"7px 14px",color:"#EF4444",fontWeight:500}}>↩ Frais retour RTO</td>
                                    <td style={{padding:"7px 14px",textAlign:"right"}}>—</td>
                                    <td style={{padding:"7px 14px",textAlign:"right"}}>—</td>
                                    <td style={{padding:"7px 14px",textAlign:"right",fontFamily:"var(--mono)",color:"#EF4444",fontWeight:600}}>
                                      {fmt(o.rto_fee)} DA
                                    </td>
                                    <td style={{padding:"7px 14px",textAlign:"right",fontFamily:"var(--mono)",fontWeight:700,color:"#EF4444"}}>
                                      − {fmt(o.rto_fee)} DA
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* RTO losses section */}
            {(P.rto_orders||[]).length > 0 && (
              <div style={{padding:"0 0 16px"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"14px 20px 8px",borderTop:"1px solid var(--border)"}}>
                  <span style={{fontSize:13,fontWeight:600,color:"#EF4444"}}>↩ Retours expéditeur (RTO)</span>
                  <span style={{fontSize:11,color:"var(--text-3)",fontFamily:"var(--mono)"}}>
                    {(P.rto_orders||[]).length} retour{(P.rto_orders||[]).length>1?"s":""} · − {fmt(P.total_rto_fees)} DA de frais
                  </span>
                </div>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th><th>Référence</th><th>Client</th>
                        <th style={{textAlign:"right",color:"#EF4444"}}>Frais retour</th>
                        <th style={{textAlign:"right",color:"#EF4444"}}>Impact bénéfice</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(P.rto_orders||[]).map(o=>(
                        <tr key={o.id} style={{background:"rgba(239,68,68,0.03)"}}>
                          <td className="mono text-mute" style={{fontSize:11}}>{o.date}</td>
                          <td className="mono" style={{fontSize:12}}>{o.reference}</td>
                          <td>{o.customer||"—"}</td>
                          <td className="mono" style={{textAlign:"right",color:"#EF4444",fontWeight:600}}>
                            − {fmt(o.rto_fee)} DA
                          </td>
                          <td className="mono" style={{textAlign:"right",color:"#EF4444",fontWeight:700}}>
                            − {fmt(o.rto_fee)} DA
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   DASHBOARD
   ============================================================ */
const Dashboard = () => {
  const { t, lang } = useLang();
  const { admin: currentAdmin } = useAdmin();
  const [stats, setStats]               = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [refreshing, setRefreshing]     = useState(false);
  const [lastUpdated, setLastUpdated]   = useState(null);
  const [showLedger, setShowLedger]     = useState(false);

  const fetchAll = (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    const isSuper = currentAdmin?.is_super;
    const dashboardReq = latinaApi.admin.get("/reports/dashboard");
    const salesReq = isSuper
      ? latinaApi.admin.get("/reports/sales").catch(() => null)
      : Promise.resolve(null);
    Promise.all([
      dashboardReq,
      salesReq,
      latinaApi.admin.get("/orders?per_page=8&sort=created_at&dir=desc").then(r => setRecentOrders(r.data || [])).catch(() => {}),
    ]).then(([dashRes, salesRes]) => {
      const base = dashRes?.data || dashRes || {};
      const extra = salesRes?.data || salesRes || {};
      setStats({ ...base, ...extra });
    }).catch(() => {}).finally(() => {
      setLoading(false);
      setRefreshing(false);
      setLastUpdated(new Date());
    });
  };

  useEffect(() => {
    fetchAll();
    // Auto-refresh every 30 seconds so delivered orders update the balance live
    const interval = setInterval(() => fetchAll(true), 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  const S = stats || {};

  // Profit card is clickable — opens the full accounting ledger
  const statCards = [
    ...(currentAdmin?.is_super ? [{
      label: t("Bénéfice brut"), icon: "💰", accent: "#10B981", bg: "rgba(16,185,129,.1)",
      val: S.profit != null ? `${Number(S.profit).toLocaleString()} DA` : "—",
      delta: S.profit_delta,
      sub: S.revenue ? `${t('Revenu total')}: ${Number(S.revenue).toLocaleString()} DA · ${t('Marge moy.')}: ${S.avg_margin||0}%` : null,
      onClick: () => setShowLedger(true),
    }] : []),
    { label: t("Commandes"),       val: S.orders_count ?? "—",    delta: S.orders_delta,    icon: "📦", accent: "#3B82F6", bg: "rgba(59,130,246,.1)" },
    { label: t("Clients"),         val: S.customers_count ?? "—", delta: S.customers_delta, icon: "👥", accent: "#8B5CF6", bg: "rgba(139,92,246,.1)" },
    { label: t("Produits actifs"), val: S.products_count ?? "—",  delta: null,              icon: "✓",  accent: "#C68B6F", bg: "rgba(198,139,111,.1)" },
  ];

  return (
    <div>
      {showLedger && <ProfitLedger onClose={()=>setShowLedger(false)}/>}
      <div style={{display:"flex",justifyContent:"flex-end",alignItems:"center",gap:10,marginBottom:12}}>
        {lastUpdated && (
          <span style={{fontSize:11,color:"var(--text-3)"}}>
            Actualisé à {lastUpdated.toLocaleTimeString("fr-DZ",{hour:"2-digit",minute:"2-digit"})}
          </span>
        )}
        <button className="btn btn-ghost btn-sm" onClick={()=>fetchAll(true)} disabled={refreshing}
          style={{fontSize:11,padding:"4px 10px"}}>
          {refreshing ? <><span className="admin-spinner" style={{width:10,height:10}}/> …</> : "↺ Actualiser"}
        </button>
      </div>
      <div className="stats-grid">
        {statCards.map((c, i) => (
          <div key={i} className="stat-card"
            style={{"--sc-accent": c.accent, "--sc-bg": c.bg, cursor: c.onClick ? "pointer" : "default"}}
            onClick={c.onClick}>
            <div className="sc-icon-wrap">{c.icon}</div>
            <div className="sc-label">{c.label}</div>
            <div className="sc-val">{c.val}</div>
            {c.sub && <div style={{fontSize:10,color:"var(--text-3)",marginTop:2,lineHeight:1.4}}>{c.sub}</div>}
            {c.delta != null && (
              <div className={`sc-delta ${c.delta >= 0 ? "up" : "down"}`}>
                {c.delta >= 0 ? "▲" : "▼"} {Math.abs(c.delta)}% {t('vs période préc.')}
              </div>
            )}
            {i === 0 && <div style={{fontSize:10,color:"var(--text-3)",marginTop:6,opacity:.7}}>{t('Cliquer pour le détail →')}</div>}
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="ac-head"><span className="ac-title">{t('Commandes récentes')}</span></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('Réf.')}</th><th>{t('Client')}</th><th>{t('Wilaya')}</th><th>{t('Total')}</th><th>{t('Statut')}</th><th>{t('Date')}</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 && (
                <tr><td colSpan={6} style={{textAlign:"center",padding:24,color:"var(--text-3)"}}>{t('Aucune commande')}</td></tr>
              )}
              {recentOrders.map(o => (
                <tr key={o.id}>
                  <td className="mono" data-label="Référence">{o.reference}</td>
                  <td className="t-name" data-label="Client">{o.recipient_name}</td>
                  <td data-label="Wilaya">{o.wilaya?.name_fr || o.wilaya_code}</td>
                  <td className="mono" data-label="Total">{Number(o.total).toLocaleString()} DA</td>
                  <td data-label="Statut"><span className={`badge badge-${o.status}`}>{o.status}</span></td>
                  <td className="text-mute" data-label="Date">{new Date(o.created_at).toLocaleDateString("fr-DZ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   GENERIC TABLE PAGE HOOK
   ============================================================ */
const useTable = (endpoint, perPage = 15) => {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const load = useCallback(async (p = page, q = search) => {
    setLoading(true);
    try {
      const qs = `?page=${p}&per_page=${perPage}${q ? `&search=${encodeURIComponent(q)}` : ""}`;
      const res = await latinaApi.admin.get(endpoint + qs);
      setRows(res.data || res.items || res || []);
      setMeta(res.meta || null);
    } catch { setRows([]); }
    finally { setLoading(false); }
  }, [endpoint, perPage]);

  useEffect(() => { load(1, search); }, []);

  const doSearch = (q) => { setSearch(q); setPage(1); load(1, q); };
  const goPage = (p) => { setPage(p); load(p, search); };
  const reload = () => load(page, search);

  return { rows, meta, loading, page, search, doSearch, goPage, reload, setRows };
};

/* ============================================================
   PRODUCTS
   ============================================================ */
const COLOR_HEX = {noir:"#1A1A1A",blanc:"#FAFAFA",beige:"#D4B896",nude:"#E5C4AE",rose:"#E8B4B8",marron:"#6B3F2A",camel:"#B07A4E",khaki:"#7A7B53",bleu:"#2E4B6F",or:"#C9A267",argent:"#C0C0C8",perles:"#F2EAE0"};
const HEEL_BUCKETS_ADMIN = [{min:0,max:1,label:"Plat"},{min:1,max:3,label:"Bas (kitten)"},{min:3,max:6,label:"Demi-talon"},{min:6,max:9,label:"Haut"},{min:9,max:99,label:"Très haut"}];
const MATERIALS_ADMIN = [{key:"cuir",label:"Cuir"},{key:"cuir_verni",label:"Cuir verni"},{key:"daim",label:"Daim"},{key:"synthetique",label:"Synthétique"},{key:"textile",label:"Textile"},{key:"velours",label:"Velours"},{key:"satin",label:"Satin"},{key:"perles",label:"Perles"}];

const mymemory = async (text, from, to) => {
  if (!text?.trim()) return "";
  try {
    const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=${from}|${to}`);
    const d = await r.json();
    if (d.responseStatus !== 200) return "";
    const raw = d.responseData.translatedText || "";
    const parts = raw.split(/[\/|]/).map(p => p.trim()).filter(Boolean);
    if (parts.length <= 1) return raw;
    if (to === "ar") return parts.find(p => /[؀-ۿ]/.test(p)) || parts[parts.length - 1];
    return parts.find(p => /^[A-Za-zÀ-ÿ0-9\s\-'".,:;!?()]+$/.test(p)) || parts[parts.length - 1];
  } catch { return ""; }
};

const ProductModal = ({ product, onClose, onSaved }) => {
  const { t } = useLang();
  const toast = useToast();
  const [savedId, setSavedId] = useState(null);
  const effectiveId = product?.id || savedId;
  const isNew = !effectiveId;
  const [tab, setTab] = useState("form");

  const [form, setForm] = useState({
    name_fr: product?.name_fr || "",
    name_ar: product?.name_ar || "",
    name_en: product?.name_en || "",
    description_fr: product?.description_fr || "",
    description_ar: product?.description_ar || "",
    price: product?.price || "",
    compare_price: product?.compare_price || "",
    cost_price: product?.cost_price || "",
    category_id: product?.category_id || "",
    stock: product?.stock || 0,
    is_active: product?.is_active ?? true,
    is_featured: product?.is_featured ?? false,
    sku: product?.sku || "",
    tags: product?.attributes?.tags || [],
    materials: product?.attributes?.materials || [],
    heel_height: product?.attributes?.heel_height ?? "",
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const [tagInput, setTagInput] = useState("");

  // ── Auto-translate name fields ────────────────────────────────────────────
  const [xlating, setXlating] = useState({ name_fr: false, name_ar: false, name_en: false });
  const [autoFilled, setAutoFilled] = useState({ name_fr: false, name_ar: false, name_en: false });

  const handleNameBlur = async (sourceLang) => {
    const sourceKey = `name_${sourceLang}`;
    const text = form[sourceKey];
    if (!text?.trim()) return;

    const targets = [
      { lang: "fr", key: "name_fr" },
      { lang: "ar", key: "name_ar" },
      { lang: "en", key: "name_en" },
    ].filter(t => t.lang !== sourceLang && (!form[t.key]?.trim() || autoFilled[t.key]));

    if (targets.length === 0) return;

    setXlating(x => Object.fromEntries(targets.map(t => [t.key, true]).concat(Object.entries(x))));

    await Promise.all(targets.map(async (t) => {
      const translated = await mymemory(text, sourceLang, t.lang);
      if (translated) {
        set(t.key, translated);
        setAutoFilled(a => ({ ...a, [t.key]: true }));
      }
      setXlating(x => ({ ...x, [t.key]: false }));
    }));
  };

  // Images
  const [savedImages, setSavedImages] = useState([]);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const dropRef = useRef(null);

  // Variants
  const [variants, setVariants] = useState([]);
  const [loadingVariants, setLoadingVariants] = useState(false);
  const [addingVariant, setAddingVariant] = useState(false);
  const [editingVariantId, setEditingVariantId] = useState(null);
  const emptyVForm = { color: "", size: "", stock: 0, price_adjustment: 0, is_active: true };
  const [vForm, setVForm] = useState(emptyVForm);
  const setV = (k, v) => setVForm(f => ({ ...f, [k]: v }));

  // Categories
  const [categories, setCategories] = useState([]);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (effectiveId) loadSavedImages();
    latinaApi.admin.get("/categories").then(d => setCategories(Array.isArray(d) ? d : d.data || [])).catch(() => {});
  }, [effectiveId]);

  const loadSavedImages = async () => {
    if (!effectiveId) return;
    try {
      const d = await latinaApi.admin.get(`/products/${effectiveId}/media`);
      setSavedImages(Array.isArray(d) ? d : d.data || []);
    } catch {}
  };

  const loadVariants = async () => {
    if (!effectiveId) return;
    setLoadingVariants(true);
    try {
      const d = await latinaApi.admin.get(`/products/${effectiveId}/variants`);
      setVariants(Array.isArray(d) ? d : d.data || []);
    } catch {} finally { setLoadingVariants(false); }
  };

  const queueFiles = (files) => {
    const items = Array.from(files).filter(f => f.type.startsWith("image/")).map(f => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setPendingFiles(prev => [...prev, ...items]);
  };

  const removePending = (id) => setPendingFiles(prev => {
    const it = prev.find(f => f.id === id);
    if (it) URL.revokeObjectURL(it.preview);
    return prev.filter(f => f.id !== id);
  });

  const uploadPending = async (pid) => {
    if (!pendingFiles.length) return;
    setUploading(true);
    const token = localStorage.getItem("latina-admin-token");
    const root = window.LATINA_API_BASE || "http://localhost:8000/api";
    for (const item of pendingFiles) {
      try {
        const fd = new FormData();
        fd.append("image", item.file);
        await fetch(`${root}/admin/products/${pid}/media`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
          body: fd,
        });
        URL.revokeObjectURL(item.preview);
      } catch {}
    }
    setPendingFiles([]);
    setUploading(false);
    if (pid === effectiveId) loadSavedImages();
  };

  const deleteImage = async (id) => {
    if (!confirm("Supprimer cette image ?")) return;
    try { await latinaApi.admin.delete(`/media/${id}`); loadSavedImages(); }
    catch (e) { toast(e.message, "err"); }
  };

  const setPrimary = async (id) => {
    try { await latinaApi.admin.post(`/media/${id}/primary`, {}); loadSavedImages(); }
    catch (e) { toast(e.message, "err"); }
  };

  const save = async () => {
    if (!form.name_fr.trim()) { toast(t("Le nom en français est requis"), "err"); return; }
    if (!form.price) { toast(t("Le prix est requis"), "err"); return; }
    setSaving(true);
    try {
      const payload = {
        name_fr: form.name_fr, name_ar: form.name_ar, name_en: form.name_en,
        description_fr: form.description_fr, description_ar: form.description_ar,
        price: Number(form.price),
        compare_price: form.compare_price ? Number(form.compare_price) : null,
        cost_price: form.cost_price ? Number(form.cost_price) : null,
        stock: Number(form.stock),
        category_id: form.category_id ? Number(form.category_id) : null,
        is_active: form.is_active, is_featured: form.is_featured, sku: form.sku,
        attributes: {
          ...(product?.attributes || {}),
          heel_height: form.heel_height !== "" ? Number(form.heel_height) : null,
          materials: form.materials,
          tags: form.tags,
        },
      };
      if (!product?.id) {
        const res = await latinaApi.admin.post("/products", payload);
        const newId = res.id || res.data?.id;
        setSavedId(newId);
        if (newId) await uploadPending(newId);
        toast("Produit créé !", "ok");
        onSaved();
      } else {
        await latinaApi.admin.put(`/products/${product.id}`, payload);
        if (pendingFiles.length) await uploadPending(product.id);
        toast("Produit enregistré", "ok");
        onSaved();
      }
    } catch (e) { toast(e.message || "Erreur", "err"); }
    finally { setSaving(false); }
  };

  const saveVariant = async () => {
    if (!effectiveId) return;
    try {
      if (editingVariantId) {
        const res = await latinaApi.admin.put(`/variants/${editingVariantId}`, vForm);
        setVariants(vs => vs.map(v => v.id === editingVariantId ? res : v));
        setEditingVariantId(null);
      } else {
        const res = await latinaApi.admin.post(`/products/${effectiveId}/variants`, vForm);
        setVariants(vs => [...vs, res]);
        setAddingVariant(false);
      }
      setVForm(emptyVForm);
      toast("Variante enregistrée", "ok");
    } catch (e) { toast(e.message || "Erreur", "err"); }
  };

  const startEditVariant = (v) => {
    setEditingVariantId(v.id);
    setAddingVariant(false);
    setVForm({ color: v.color||"", size: v.size||"", stock: v.stock, price_adjustment: v.price_adjustment||0, is_active: v.is_active });
  };

  const deleteVariant = async (variantId) => {
    if (!confirm("Supprimer cette variante ?")) return;
    try { await latinaApi.admin.delete(`/variants/${variantId}`); setVariants(vs => vs.filter(v => v.id !== variantId)); toast("Supprimée", "ok"); }
    catch (e) { toast(e.message || "Erreur", "err"); }
  };

  // Derived
  const discountPct = form.compare_price && form.price && Number(form.compare_price) > Number(form.price)
    ? Math.round((1 - Number(form.price) / Number(form.compare_price)) * 100) : null;

  const grossProfit = form.cost_price && form.price
    ? Number(form.price) - Number(form.cost_price) : null;
  const marginPct = grossProfit != null && Number(form.price) > 0
    ? Math.round((grossProfit / Number(form.price)) * 100) : null;
  const heelLabel = form.heel_height !== ""
    ? HEEL_BUCKETS_ADMIN.find(b => Number(form.heel_height) >= b.min && Number(form.heel_height) < b.max)?.label : null;

  const allImages = [
    ...savedImages.map(i => ({ ...i, _saved: true })),
    ...pendingFiles.map(p => ({ id: p.id, url: p.preview, _saved: false, _pendingId: p.id })),
  ];
  const primaryImg = allImages.find(i => i._saved && i.is_primary) || allImages[0];

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="pm-modal" onClick={e => e.stopPropagation()}>

        {/* ── Header ── */}
        <div className="pm-header">
          <div>
            <div className="pm-header-title">
              {isNew ? t("Nouveau produit") : (form.name_fr || t("Nouveau produit"))}
            </div>
            {!isNew && form.sku && <div className="pm-header-sku">{form.sku}</div>}
          </div>
          <div className="pm-header-actions">
            {!isNew && (
              <div className="pm-tabs">
                <button className={`pm-tab ${tab==="form"?"active":""}`} onClick={() => setTab("form")}>{t("Informations")}</button>
                <button className={`pm-tab ${tab==="variants"?"active":""}`} onClick={() => { setTab("variants"); if (!variants.length) loadVariants(); }}>
                  {t("Variantes")} {variants.length > 0 && <span className="pm-tab-pill">{variants.length}</span>}
                </button>
              </div>
            )}
            <button className="pm-close" onClick={onClose}>✕</button>
          </div>
        </div>

        {/* ── Form tab ── */}
        {tab === "form" && (
          <div className="pm-body">

            {/* LEFT — image zone + visibility */}
            <div className="pm-left">
              <div className="pm-img-zone"
                ref={dropRef}
                onDragOver={e => { e.preventDefault(); dropRef.current?.classList.add("pm-drag-over"); }}
                onDragLeave={() => dropRef.current?.classList.remove("pm-drag-over")}
                onDrop={e => { e.preventDefault(); dropRef.current?.classList.remove("pm-drag-over"); queueFiles(e.dataTransfer.files); }}
              >
                {allImages.length === 0 ? (
                  <div className="pm-img-empty" onClick={() => fileRef.current?.click()}>
                    <div className="pm-img-drop-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                    <div className="pm-img-drop-label">{t('Glisser les photos ici')}</div>
                    <div className="pm-img-drop-sub">{t('ou cliquer pour parcourir')}</div>
                    <div className="pm-img-drop-hint">JPEG · PNG · WebP · max 8 Mo</div>
                  </div>
                ) : (
                  <>
                    <div className="pm-img-primary">
                      {primaryImg && <img src={window.mediaUrl(primaryImg.url)} alt="" />}
                      {primaryImg && !primaryImg._saved && (
                        <span className="pm-img-unsaved-badge">{t('Non sauvegardé')}</span>
                      )}
                      {primaryImg?._saved && primaryImg.is_primary && (
                        <span className="pm-img-primary-badge">{t('Principale')}</span>
                      )}
                    </div>
                    <div className="pm-img-thumbs">
                      {allImages.map(img => (
                        <div key={img.id} className={`pm-img-thumb ${img._saved && img.is_primary ? "is-primary" : ""} ${!img._saved ? "is-pending" : ""}`}>
                          <img src={window.mediaUrl(img.url)} alt="" />
                          <div className="pm-img-thumb-actions">
                            {img._saved && !img.is_primary && (
                              <button title="Définir principale" onClick={() => setPrimary(img.id)}>★</button>
                            )}
                            <button className="del" title="Retirer"
                              onClick={() => img._saved ? deleteImage(img.id) : removePending(img._pendingId)}>✕</button>
                          </div>
                        </div>
                      ))}
                      <div className="pm-img-thumb pm-img-add-thumb" onClick={() => fileRef.current?.click()}>
                        {uploading ? <span className="admin-spinner" style={{width:16,height:16}} /> : <span>+</span>}
                      </div>
                    </div>
                    {pendingFiles.length > 0 && (
                      <div className="pm-img-pending-notice">
                        {pendingFiles.length} photo{pendingFiles.length>1?"s":""} en attente — sauvegardée{pendingFiles.length>1?"s":""} avec le produit
                      </div>
                    )}
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" multiple style={{display:"none"}}
                  onChange={e => { if (e.target.files.length) queueFiles(e.target.files); e.target.value=""; }} />
              </div>

              {/* Visibility toggles */}
              <div className="pm-visibility">
                <div className="pm-vis-title">{t('Visibilité')}</div>
                <label className="pm-toggle-row">
                  <div className="pm-toggle-info">
                    <span className="pm-toggle-name">{t('Actif')}</span>
                    <span className="pm-toggle-sub">{t('Visible sur la boutique')}</span>
                  </div>
                  <span className="toggle-wrap">
                    <input type="checkbox" checked={form.is_active} onChange={e => set("is_active", e.target.checked)} />
                    <span className="toggle-track" />
                  </span>
                </label>
                <label className="pm-toggle-row">
                  <div className="pm-toggle-info">
                    <span className="pm-toggle-name">{t('Mis en avant')}</span>
                    <span className="pm-toggle-sub">{t('Prioritaire en collection')}</span>
                  </div>
                  <span className="toggle-wrap">
                    <input type="checkbox" checked={form.is_featured} onChange={e => set("is_featured", e.target.checked)} />
                    <span className="toggle-track" />
                  </span>
                </label>
              </div>
            </div>

            {/* RIGHT — form sections */}
            <div className="pm-right">

              {/* § 1 — Nom */}
              <div className="pm-section">
                <div className="pm-sec-head">
                  <span className="pm-sec-icon">Aa</span>
                  <span className="pm-sec-title">Nom du produit</span>
                </div>
                <div className="pm-lang-fields">
                  <div className="pm-lang-row">
                    <span className="pm-lang-flag req">FR</span>
                    <div className="pm-translate-wrap">
                      <input className="admin-input" value={form.name_fr}
                        onChange={e => { set("name_fr", e.target.value); setAutoFilled(a => ({...a, name_fr: false})); }}
                        onBlur={() => handleNameBlur("fr")}
                        placeholder="Nom en français (obligatoire)" />
                      {xlating.name_fr && <span className="pm-xl-spin" />}
                      {autoFilled.name_fr && !xlating.name_fr && (
                        <span className="pm-xl-badge" title="Traduit automatiquement — vous pouvez modifier">auto ✎</span>
                      )}
                    </div>
                  </div>
                  <div className="pm-lang-row">
                    <span className="pm-lang-flag">AR</span>
                    <div className="pm-translate-wrap">
                      <input className="admin-input" dir="rtl" value={form.name_ar}
                        onChange={e => { set("name_ar", e.target.value); setAutoFilled(a => ({...a, name_ar: false})); }}
                        onBlur={() => handleNameBlur("ar")}
                        placeholder="الاسم بالعربية (اختياري)" />
                      {xlating.name_ar && <span className="pm-xl-spin" />}
                      {autoFilled.name_ar && !xlating.name_ar && (
                        <span className="pm-xl-badge" title="Traduit automatiquement — vous pouvez modifier">auto ✎</span>
                      )}
                    </div>
                  </div>
                  <div className="pm-lang-row">
                    <span className="pm-lang-flag">EN</span>
                    <div className="pm-translate-wrap">
                      <input className="admin-input" value={form.name_en}
                        onChange={e => { set("name_en", e.target.value); setAutoFilled(a => ({...a, name_en: false})); }}
                        onBlur={() => handleNameBlur("en")}
                        placeholder="Name in English (optional)" />
                      {xlating.name_en && <span className="pm-xl-spin" />}
                      {autoFilled.name_en && !xlating.name_en && (
                        <span className="pm-xl-badge" title="Traduit automatiquement — vous pouvez modifier">auto ✎</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* § 2 — Prix & Stock */}
              <div className="pm-section">
                <div className="pm-sec-head">
                  <span className="pm-sec-icon">DA</span>
                  <span className="pm-sec-title">Prix & Stock</span>
                </div>
                <div className="pm-price-grid">
                  <div className="pm-field">
                    <label className="pm-label">Prix de vente *</label>
                    <div className="pm-input-with-unit">
                      <input className="admin-input" type="number" min={0} value={form.price}
                        onChange={e => set("price", e.target.value)} placeholder="0" />
                      <span className="pm-unit">DA</span>
                    </div>
                  </div>
                  <div className="pm-field">
                    <label className="pm-label">
                      Prix barré
                      {discountPct && <span className="pm-discount-pill">−{discountPct}%</span>}
                    </label>
                    <div className="pm-input-with-unit">
                      <input className="admin-input" type="number" min={0} value={form.compare_price}
                        onChange={e => set("compare_price", e.target.value)} placeholder="Avant promo" />
                      <span className="pm-unit">DA</span>
                    </div>
                  </div>
                  <div className="pm-field">
                    <label className="pm-label">
                      Prix d'achat (coût)
                      {marginPct != null && (
                        <span style={{marginLeft:8,fontSize:11,fontWeight:600,color:marginPct>=0?"#10B981":"#EF4444",background:marginPct>=0?"rgba(16,185,129,.12)":"rgba(239,68,68,.12)",padding:"2px 7px",borderRadius:4}}>
                          Marge {marginPct}% · +{grossProfit?.toLocaleString()} DA
                        </span>
                      )}
                    </label>
                    <div className="pm-input-with-unit">
                      <input className="admin-input" type="number" min={0} value={form.cost_price}
                        onChange={e => set("cost_price", e.target.value)} placeholder="Prix payé" />
                      <span className="pm-unit">DA</span>
                    </div>
                  </div>
                  <div className="pm-field">
                    <label className="pm-label">Stock initial *</label>
                    <input className="admin-input t-num" type="number" min={0} value={form.stock}
                      onChange={e => set("stock", e.target.value)} />
                  </div>
                  <div className="pm-field">
                    <label className="pm-label">SKU / Référence</label>
                    <input className="admin-input t-mono" value={form.sku}
                      onChange={e => set("sku", e.target.value)} placeholder="Auto-généré" />
                  </div>
                </div>
              </div>

              {/* § 3 — Catégorie */}
              <div className="pm-section">
                <div className="pm-sec-head">
                  <span className="pm-sec-icon">≡</span>
                  <span className="pm-sec-title">Catégorie</span>
                </div>
                <select className="admin-input" value={form.category_id} onChange={e => set("category_id", e.target.value)}>
                  <option value="">— Aucune catégorie —</option>
                  {categories.map(c => (
                    <React.Fragment key={c.id}>
                      <option value={c.id}>{c.name_fr}</option>
                      {(c.children || []).map(sub => (
                        <option key={sub.id} value={sub.id}>&nbsp;&nbsp;↳ {sub.name_fr}</option>
                      ))}
                    </React.Fragment>
                  ))}
                </select>
              </div>

              {/* § 4 — Description */}
              <div className="pm-section">
                <div className="pm-sec-head">
                  <span className="pm-sec-icon">¶</span>
                  <span className="pm-sec-title">Description <span className="pm-sec-opt">optionnel</span></span>
                </div>
                <div className="pm-lang-fields">
                  <div className="pm-lang-row pm-lang-row-top">
                    <span className="pm-lang-flag">FR</span>
                    <textarea className="admin-textarea" rows={3} value={form.description_fr}
                      onChange={e => set("description_fr", e.target.value)}
                      placeholder="Description en français…" />
                  </div>
                  <div className="pm-lang-row pm-lang-row-top">
                    <span className="pm-lang-flag">AR</span>
                    <textarea className="admin-textarea" rows={2} dir="rtl" value={form.description_ar}
                      onChange={e => set("description_ar", e.target.value)}
                      placeholder="الوصف بالعربية…" />
                  </div>
                </div>
              </div>

              {/* § 5 — Attributs & filtres */}
              <div className="pm-section">
                <div className="pm-sec-head">
                  <span className="pm-sec-icon">⊕</span>
                  <span className="pm-sec-title">Attributs & Filtres</span>
                </div>

                {/* Heel height */}
                <div className="pm-attr-block">
                  <div className="pm-attr-row-head">
                    <span className="pm-attr-name">Hauteur de talon</span>
                    {heelLabel && <span className="pm-attr-badge">{heelLabel}</span>}
                  </div>
                  <div className="pm-heel-wrap">
                    <input type="range" className="pm-heel-slider" min={0} max={15} step={0.5}
                      value={form.heel_height || 0}
                      onChange={e => set("heel_height", e.target.value)} />
                    <div className="pm-input-with-unit" style={{width:100,flexShrink:0}}>
                      <input className="admin-input t-num" type="number" min={0} max={25} step={0.5}
                        style={{paddingRight:30}} value={form.heel_height} placeholder="0"
                        onChange={e => set("heel_height", e.target.value)} />
                      <span className="pm-unit">cm</span>
                    </div>
                  </div>
                  <div className="pm-heel-scale">
                    {["Plat","Bas","Demi","Haut","Très haut"].map(l => <span key={l}>{l}</span>)}
                  </div>
                </div>

                {/* Materials */}
                <div className="pm-attr-block">
                  <div className="pm-attr-row-head">
                    <span className="pm-attr-name">Matières</span>
                    {form.materials.length > 0 && <span className="pm-attr-count">{form.materials.length} choisie{form.materials.length>1?"s":""}</span>}
                  </div>
                  <div className="pf-chips-wrap">
                    {MATERIALS_ADMIN.map(m => (
                      <button key={m.key} type="button"
                        className={`pf-chip ${form.materials.includes(m.key) ? "pf-chip-on" : ""}`}
                        onClick={() => set("materials", form.materials.includes(m.key)
                          ? form.materials.filter(x => x !== m.key)
                          : [...form.materials, m.key])}>
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="pm-attr-block">
                  <div className="pm-attr-row-head">
                    <span className="pm-attr-name">Tags</span>
                    <span className="pm-attr-hint-inline">pour suggestions croisées entre produits</span>
                  </div>
                  <div className="pf-tag-input">
                    {form.tags.map(tag => (
                      <span key={tag} className="pf-tag-chip">
                        {tag}
                        <button type="button" onClick={() => set("tags", form.tags.filter(t => t !== tag))}>×</button>
                      </span>
                    ))}
                    <input className="pf-tag-text" value={tagInput}
                      placeholder={form.tags.length ? "" : "ex: casual, mariage, été…"}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={e => {
                        if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
                          e.preventDefault();
                          const t = tagInput.trim().toLowerCase().replace(/,/g, "");
                          if (t && !form.tags.includes(t)) set("tags", [...form.tags, t]);
                          setTagInput("");
                        } else if (e.key === "Backspace" && !tagInput && form.tags.length) {
                          set("tags", form.tags.slice(0, -1));
                        }
                      }}
                    />
                  </div>
                  <p className="pf-hint">Entrée ou virgule pour valider</p>
                </div>
              </div>

              {/* Footer */}
              <div className="pm-footer">
                <button className="btn btn-ghost" onClick={onClose}>Annuler</button>
                <button className="btn btn-rose" onClick={save}
                  disabled={saving || !form.name_fr.trim() || !form.price}
                  title={!form.name_fr.trim() ? "Le nom en français est requis" : !form.price ? "Le prix est requis" : undefined}>
                  {saving
                    ? <><span className="admin-spinner" style={{width:13,height:13}} /> Enregistrement…</>
                    : isNew ? "Créer le produit" : "Enregistrer les modifications"}
                </button>
              </div>
              {isNew && (!form.name_fr.trim() || !form.price) && (
                <div style={{textAlign:"right",fontSize:11,color:"var(--rose)",marginTop:4,opacity:0.85}}>
                  {!form.name_fr.trim() ? "⚠ Nom en français requis" : "⚠ Prix requis"}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Variants tab ── */}
        {tab === "variants" && effectiveId && (
          <div className="pm-body pm-body-flat">
            {loadingVariants ? (
              <div style={{display:"flex",justifyContent:"center",padding:40}}><span className="admin-spinner" /></div>
            ) : (
              <>
                {variants.length > 0 && (
                  <div style={{overflowX:"auto",marginBottom:16}}>
                    <table className="admin-table">
                      <thead>
                        <tr><th>Couleur</th><th>Taille</th><th>SKU</th><th className="t-right">Stock</th><th className="t-right">Ajust. DA</th><th>État</th><th></th></tr>
                      </thead>
                      <tbody>
                        {variants.map(v => editingVariantId === v.id ? (
                          <tr key={v.id} style={{background:"var(--bg-2)"}}>
                            <td>
                              <select className="admin-input" style={{width:110}} value={vForm.color} onChange={e => setV("color", e.target.value)}>
                                <option value="">—</option>
                                {Object.keys(COLOR_HEX).map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </td>
                            <td><input className="admin-input" style={{width:70}} value={vForm.size} onChange={e => setV("size", e.target.value)} placeholder="36" /></td>
                            <td className="t-mono" style={{fontSize:11,color:"var(--text-3)"}}>{v.sku}</td>
                            <td><input className="admin-input t-num" type="number" style={{width:70}} value={vForm.stock} min={0} onChange={e => setV("stock", Number(e.target.value))} /></td>
                            <td><input className="admin-input t-num" type="number" style={{width:80}} value={vForm.price_adjustment} onChange={e => setV("price_adjustment", Number(e.target.value))} /></td>
                            <td><label className="toggle-wrap"><input type="checkbox" checked={vForm.is_active} onChange={e => setV("is_active", e.target.checked)} /><span className="toggle-track" /></label></td>
                            <td><div className="gap-row">
                              <button className="btn btn-sm btn-rose" onClick={saveVariant}>✓</button>
                              <button className="btn btn-sm btn-ghost" onClick={() => { setEditingVariantId(null); setVForm(emptyVForm); }}>✕</button>
                            </div></td>
                          </tr>
                        ) : (
                          <tr key={v.id}>
                            <td>
                              {v.color ? (
                                <span style={{display:"inline-flex",alignItems:"center",gap:6}}>
                                  <span style={{width:10,height:10,borderRadius:"50%",background:COLOR_HEX[v.color]||"#ddd",border:"1px solid rgba(0,0,0,.1)"}} />
                                  {v.color}
                                </span>
                              ) : "—"}
                            </td>
                            <td className="t-mono">{v.size||"—"}</td>
                            <td className="t-mono" style={{fontSize:10,color:"var(--text-3)"}}>{v.sku}</td>
                            <td className="t-right t-num"><span className={`stock-chip ${v.stock===0?"out":v.stock<=4?"low":"good"}`}>{v.stock}</span></td>
                            <td className="t-right t-num" style={{fontSize:12}}>{v.price_adjustment>0?`+${v.price_adjustment}`:v.price_adjustment||0} DA</td>
                            <td><span className={`badge ${v.is_active?"badge-active":"badge-inactive"}`}>{v.is_active?"Actif":"Inactif"}</span></td>
                            <td><div className="gap-row">
                              <button className="btn btn-ghost btn-sm" onClick={() => startEditVariant(v)}>✏️</button>
                              <button className="btn btn-danger btn-sm" onClick={() => deleteVariant(v.id)}>🗑</button>
                            </div></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {addingVariant ? (
                  <div style={{background:"var(--bg-2)",padding:16,borderRadius:8,marginBottom:12}}>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:12}}>Nouvelle variante</div>
                    <div className="form-row form-row-3" style={{gap:12}}>
                      <div className="pm-field"><label className="pm-label">Couleur</label>
                        <select className="admin-input" value={vForm.color} onChange={e => setV("color", e.target.value)}>
                          <option value="">— Aucune —</option>
                          {Object.keys(COLOR_HEX).map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="pm-field"><label className="pm-label">Taille</label>
                        <input className="admin-input" value={vForm.size} onChange={e => setV("size", e.target.value)} placeholder="36, 37, M, L…" />
                      </div>
                      <div className="pm-field"><label className="pm-label">Stock *</label>
                        <input className="admin-input t-num" type="number" min={0} value={vForm.stock} onChange={e => setV("stock", Number(e.target.value))} />
                      </div>
                      <div className="pm-field"><label className="pm-label">Ajust. Prix (DA)</label>
                        <input className="admin-input t-num" type="number" value={vForm.price_adjustment} onChange={e => setV("price_adjustment", Number(e.target.value))} placeholder="0" />
                      </div>
                      <div className="pm-field" style={{display:"flex",alignItems:"flex-end"}}>
                        <label className="toggle-wrap"><input type="checkbox" checked={vForm.is_active} onChange={e => setV("is_active", e.target.checked)} /><span className="toggle-track" /><span className="toggle-label">Actif</span></label>
                      </div>
                    </div>
                    <div className="gap-row" style={{marginTop:12}}>
                      <button className="btn btn-ghost btn-sm" onClick={() => { setAddingVariant(false); setVForm(emptyVForm); }}>Annuler</button>
                      <button className="btn btn-rose btn-sm" onClick={saveVariant}>Créer la variante</button>
                    </div>
                  </div>
                ) : (
                  <button className="btn btn-ghost" style={{fontSize:13}} onClick={() => { setAddingVariant(true); setEditingVariantId(null); setVForm(emptyVForm); }}>
                    + Ajouter une variante
                  </button>
                )}
                <p style={{fontSize:11,color:"var(--text-3)",marginTop:12}}>Chaque ligne = une combinaison couleur + taille avec son propre stock.</p>
              </>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

const Products = () => {
  const { t, lang } = useLang();
  const { rows, loading, search, doSearch, reload } = useTable("/products");
  const [modal, setModal] = useState(null); // null | "new" | product
  const toast = useToast();

  const deleteProduct = async (id) => {
    if (!confirm(t("Supprimer ce produit ?"))) return;
    try { await latinaApi.admin.delete(`/products/${id}`); toast(t("Produit supprimé"), "ok"); reload(); }
    catch (e) { toast(e.message, "err"); }
  };

  const adjustStock = async (product) => {
    const newStock = prompt(`${t('Stock actuel')}: ${product.stock}\n${t('Nouveau stock pour')} "${product.name_fr}":`, String(product.stock));
    if (newStock === null || newStock === "") return;
    const n = parseInt(newStock, 10);
    if (isNaN(n) || n < 0) { toast(t("Valeur invalide"), "err"); return; }
    try {
      await latinaApi.admin.post(`/products/${product.id}/stock`, { new_stock: n, note: "Ajustement admin" });
      toast(t("Stock mis à jour"), "ok"); reload();
    } catch (e) { toast(e.message, "err"); }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <div className="admin-search">
          <span className="admin-search-icon">🔍</span>
          <input placeholder={t("Rechercher un produit…")} value={search} onChange={e => doSearch(e.target.value)} />
        </div>
        <button className="btn btn-rose" onClick={() => setModal("new")}>{t('+ Nouveau produit')}</button>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>{t('Produit')}</th><th>SKU</th><th>{t('Prix')}</th><th>{t('Stock')}</th><th>{t('Statut')}</th><th style={{width:110}}></th></tr>
              </thead>
              <tbody>
                {rows.length === 0 && !loading && (
                  <tr><td colSpan={6}>
                    <div className="admin-empty">
                      <div className="admin-empty-icon">👟</div>
                      <div className="admin-empty-title">{t('Aucun produit')}</div>
                      <div className="admin-empty-sub">{lang === 'ar' ? 'أنشئ أول منتج للبدء' : 'Créez votre premier produit pour commencer'}</div>
                    </div>
                  </td></tr>
                )}
                {rows.map(p => (
                  <tr key={p.id}>
                    <td data-label={t('Produit')}>
                      <div className="t-name">{p.name_ar || p.name_fr}</div>
                      <div className="text-mute" style={{fontSize:11}}>{p.category?.name_ar || p.category?.name_fr}</div>
                    </td>
                    <td className="mono" data-label="SKU">{p.sku}</td>
                    <td className="mono" data-label={t('Prix')}>
                      {p.sale_price ? <><span className="text-rose">{Number(p.sale_price).toLocaleString()}</span> <span className="text-mute" style={{textDecoration:"line-through",fontSize:11}}>{Number(p.price).toLocaleString()}</span></> : `${Number(p.price).toLocaleString()} DA`}
                    </td>
                    <td className={`mono ${p.stock === 0 ? "text-red" : p.stock < 5 ? "text-yellow" : "text-green"}`} data-label={t('Stock')}>{p.stock}</td>
                    <td data-label={t('Statut')}><span className={`badge ${p.is_active ? "badge-active" : "badge-inactive"}`}>{t(p.is_active ? "Actif" : "Inactif")}</span></td>
                    <td data-label="">
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => setModal(p)} title={t('Modifier')}>✏️</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => adjustStock(p)} title={t('Stock')}>📦</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)} title={t('Supprimer')}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal && (
        <ProductModal
          product={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={reload}
        />
      )}
    </div>
  );
};

/* ============================================================
   CATEGORIES
   ============================================================ */
const Categories = () => {
  const { t } = useLang();
  const { rows, loading, reload } = useTable("/categories");
  const [modal, setModal] = useState(null);
  const toast = useToast();

  const [form, setForm] = useState({ name_fr: "", name_ar: "", name_en: "", slug: "" });
  const [saving, setSaving] = useState(false);

  const openNew = () => { setForm({ name_fr:"", name_ar:"", name_en:"", slug:"" }); setModal("form"); };
  const openEdit = (c) => { setForm({ name_fr: c.name_fr, name_ar: c.name_ar, name_en: c.name_en || "", slug: c.slug }); setModal(c); };

  const save = async () => {
    setSaving(true);
    try {
      if (modal === "form") await latinaApi.admin.post("/categories", form);
      else await latinaApi.admin.put(`/categories/${modal.id}`, form);
      toast("Catégorie enregistrée", "ok"); reload(); setModal(null);
    } catch (e) { toast(e.message, "err"); }
    finally { setSaving(false); }
  };

  const deleteCategory = async (c) => {
    if (!confirm(`Supprimer la catégorie "${c.name_fr}" ?`)) return;
    try { await latinaApi.admin.delete(`/categories/${c.id}`); toast("Catégorie supprimée", "ok"); reload(); }
    catch (e) { toast(e.message, "err"); }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <button className="btn btn-rose ml-auto" onClick={openNew}>+ Nouvelle catégorie</button>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Nom (FR)</th><th>Nom (AR)</th><th>Slug</th><th>Produits</th><th style={{width:96}}></th></tr></thead>
              <tbody>
                {rows.map(c => (
                  <tr key={c.id}>
                    <td className="t-name" data-label="Nom (FR)">{c.name_fr}</td>
                    <td data-label="Nom (AR)">{c.name_ar}</td>
                    <td className="mono" data-label="Slug">{c.slug}</td>
                    <td className="mono" data-label="Produits">{c.products_count ?? "—"}</td>
                    <td data-label="">
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(c)} title="Modifier">✏️</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => deleteCategory(c)} title="Supprimer">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal admin-modal-sm" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <span className="admin-modal-title">{modal === "form" ? "Nouvelle catégorie" : "Modifier catégorie"}</span>
              <button className="admin-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            {["name_fr","name_ar","name_en","slug"].map(k => (
              <div key={k} className="form-field mb-4">
                <label className="form-label">{k.replace("_"," ").toUpperCase()}</label>
                <input className="admin-input" value={form[k]} onChange={e => setForm(f => ({...f,[k]:e.target.value}))} />
              </div>
            ))}
            <div className="gap-row">
              <button className="btn btn-ghost ml-auto" onClick={() => setModal(null)}>Annuler</button>
              <button className="btn btn-rose" onClick={save} disabled={saving}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   ORDERS
   ============================================================ */
const ORDER_STATUSES = ["pending","confirmed","preparing","shipped","out_for_delivery","delivered","rto","cancelled","refunded"];
const TRANSITIONS = {
  pending: ["confirmed","cancelled"],
  confirmed: ["preparing","cancelled"],
  preparing: ["shipped"],
  shipped: ["out_for_delivery"],
  out_for_delivery: ["delivered","rto"],
};

const InitiateExchangeModal = ({ order, onClose, onCreated }) => {
  const toast = useToast();
  const lines = order.lines || [];
  const [selected,  setSelected]  = useState({});
  const [specs,     setSpecs]     = useState({});   // lineId → { variantId, size, color }
  const [reason,    setReason]    = useState('');
  const [loading,   setLoading]   = useState(false);
  const [varData,   setVarData]   = useState({});   // lineId → Variant[]
  const [varLoad,   setVarLoad]   = useState({});   // lineId → bool
  const [selColor,  setSelColor]  = useState({});   // lineId → string

  const toggleLine = id => {
    const nowOn = !selected[id];
    setSelected(s => ({ ...s, [id]: nowOn }));
    if (nowOn && !varData[id]) {
      const line = lines.find(l => l.id === id);
      if (!line?.product_id) return;
      setVarLoad(v => ({ ...v, [id]: true }));
      latinaApi.admin.get(`/products/${line.product_id}/variants`)
        .then(res => {
          const list = Array.isArray(res) ? res : [];
          setVarData(v => ({ ...v, [id]: list }));
          const colors = [...new Set(list.map(v => v.color).filter(Boolean))];
          if (colors.length) setSelColor(c => ({ ...c, [id]: colors[0] }));
        })
        .catch(() => setVarData(v => ({ ...v, [id]: [] })))
        .finally(() => setVarLoad(v => ({ ...v, [id]: false })));
    }
  };

  const pickVariant = (lineId, v) => {
    setSpecs(s => ({ ...s, [lineId]: { variantId: v.id, size: v.size, color: v.color } }));
  };

  const submit = async () => {
    const chosen = lines.filter(l => selected[l.id]);
    if (!chosen.length) { toast('Sélectionnez au moins un article.', 'err'); return; }
    if (!reason.trim()) { toast('Le motif est obligatoire.', 'err'); return; }
    setLoading(true);
    try {
      await latinaApi.admin.post('/exchanges', {
        order_id: order.id,
        reason,
        lines: chosen.map(l => ({
          order_line_id:  l.id,
          quantity:       l.quantity ?? l.qty ?? 1,
          new_variant_id: specs[l.id]?.variantId || null,
          new_size:       specs[l.id]?.size  || null,
          new_color:      specs[l.id]?.color || null,
        })),
      });
      toast('Échange créé.', 'ok');
      onCreated();
      onClose();
    } catch (e) {
      toast(e?.message || 'Erreur.', 'err');
    } finally { setLoading(false); }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={e => e.stopPropagation()}
        style={{maxWidth:600,width:'95vw',maxHeight:'92vh',display:'flex',flexDirection:'column'}}>

        {/* Header */}
        <div className="admin-modal-head" style={{flexShrink:0}}>
          <div>
            <div className="admin-modal-title">🔄 Initier un échange</div>
            <div className="text-mute" style={{fontSize:12,marginTop:2}}>Commande {order.reference}</div>
          </div>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Scrollable body */}
        <div style={{overflowY:'auto',flex:1,padding:'0 20px 20px'}}>
          <div style={{fontSize:13,color:'#0369a1',background:'#f0f9ff',border:'1px solid #bae6fd',borderRadius:7,padding:'9px 13px',margin:'12px 0 16px',lineHeight:1.5}}>
            Cochez les articles à échanger puis sélectionnez la variante de remplacement disponible.
          </div>

          {lines.map(l => {
            const on        = !!selected[l.id];
            const allVars   = varData[l.id] || [];
            const isLoading = !!varLoad[l.id];
            const spec      = specs[l.id];
            const colors    = [...new Set(allVars.map(v => v.color).filter(Boolean))];
            const multiColor = colors.length > 1;
            const curColor  = selColor[l.id] || colors[0] || null;
            const shown     = multiColor && curColor ? allVars.filter(v => v.color === curColor) : allVars;

            return (
              <div key={l.id} style={{
                borderRadius:10,
                border: on ? '2px solid #f59e0b' : '1px solid var(--border)',
                marginBottom:10,
                overflow:'hidden',
                transition:'border-color 0.15s',
              }}>
                {/* Article row */}
                <label style={{display:'flex',gap:10,alignItems:'center',cursor:'pointer',padding:'11px 14px',background: on ? '#fffbeb' : 'transparent',userSelect:'none'}}>
                  <input type="checkbox" checked={on} onChange={() => toggleLine(l.id)}
                    style={{width:17,height:17,accentColor:'#f59e0b',flexShrink:0}} />
                  {l.product?.primaryImage?.url && (
                    <img src={window.mediaUrl(l.product.primaryImage.url)} alt=""
                      style={{width:46,height:46,objectFit:'cover',borderRadius:6,border:'1px solid var(--border)',flexShrink:0}} />
                  )}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:600,fontSize:14,marginBottom:2}}>{l.product_name}</div>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      {l.size  && <span style={{background:'#e0e7ff',color:'#3730a3',borderRadius:4,padding:'1px 7px',fontSize:11,fontWeight:600}}>T.{l.size}</span>}
                      {l.color && <span style={{background:'#e0e7ff',color:'#3730a3',borderRadius:4,padding:'1px 7px',fontSize:11,fontWeight:600}}>{l.color}</span>}
                      <span style={{fontSize:12,color:'var(--text-muted)'}}>×{l.quantity ?? l.qty}</span>
                    </div>
                  </div>
                  {on && spec && (
                    <div style={{textAlign:'right',flexShrink:0,paddingLeft:4}}>
                      <div style={{fontSize:10,color:'#92400e',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.04em'}}>→ remplacement</div>
                      <div style={{fontSize:13,fontWeight:700,color:'#78350f',marginTop:1}}>
                        {spec.size ? `T.${spec.size}` : ''}{spec.color ? ` ${spec.color}` : ''}
                      </div>
                    </div>
                  )}
                </label>

                {/* Variant picker — expands when selected */}
                {on && (
                  <div style={{padding:'12px 14px 14px',background:'#fafafa',borderTop:'1px solid #fde68a'}}>
                    <div style={{fontSize:11,fontWeight:700,color:'#92400e',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>
                      Variante de remplacement
                    </div>

                    {isLoading ? (
                      <div style={{fontSize:13,color:'var(--text-muted)',padding:'6px 0'}}>Chargement…</div>
                    ) : allVars.length === 0 ? (
                      <div style={{fontSize:13,color:'#ef4444'}}>Aucune variante disponible.</div>
                    ) : (
                      <>
                        {/* Color filter tabs */}
                        {multiColor && (
                          <div style={{display:'flex',gap:6,marginBottom:10,flexWrap:'wrap'}}>
                            {colors.map(c => (
                              <button key={c}
                                onClick={() => setSelColor(s => ({ ...s, [l.id]: c }))}
                                style={{
                                  padding:'4px 13px',borderRadius:20,fontSize:12,fontWeight:600,cursor:'pointer',
                                  border: curColor === c ? '2px solid #f59e0b' : '1px solid var(--border)',
                                  background: curColor === c ? '#fef3c7' : '#fff',
                                  color: curColor === c ? '#92400e' : 'var(--text)',
                                  transition:'all 0.1s',
                                }}
                              >{c}</button>
                            ))}
                          </div>
                        )}

                        {/* Size / variant chips */}
                        <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
                          {shown.map(v => {
                            const inStock = v.stock > 0;
                            const chosen  = spec?.variantId === v.id;
                            return (
                              <button key={v.id}
                                onClick={() => inStock && pickVariant(l.id, v)}
                                disabled={!inStock}
                                title={inStock ? `Stock disponible : ${v.stock}` : 'Rupture de stock'}
                                style={{
                                  position:'relative',
                                  width:70, minHeight:72,
                                  borderRadius:9,
                                  border: chosen
                                    ? '2px solid #f59e0b'
                                    : inStock ? '1px solid #d1d5db' : '1px solid #e5e7eb',
                                  background: chosen ? '#fef3c7' : inStock ? '#fff' : '#f9fafb',
                                  cursor: inStock ? 'pointer' : 'not-allowed',
                                  opacity: inStock ? 1 : 0.5,
                                  display:'flex',flexDirection:'column',alignItems:'center',
                                  justifyContent:'center',gap:3,padding:'6px 4px',
                                  transition:'all 0.12s',
                                  boxShadow: chosen ? '0 0 0 3px #fde68a' : 'none',
                                }}
                              >
                                {/* checkmark when selected */}
                                {chosen && (
                                  <span style={{position:'absolute',top:4,right:5,fontSize:10,color:'#f59e0b',fontWeight:900}}>✓</span>
                                )}
                                {/* size label */}
                                <span style={{fontSize:15,fontWeight:800,color: chosen ? '#92400e' : inStock ? '#111' : '#9ca3af',lineHeight:1}}>
                                  {v.size || '?'}
                                </span>
                                {/* color when not grouped */}
                                {!multiColor && v.color && (
                                  <span style={{fontSize:9,color:'#6b7280',lineHeight:1,textAlign:'center'}}>{v.color}</span>
                                )}
                                {/* stock badge */}
                                <span style={{
                                  fontSize:10,fontWeight:700,lineHeight:1,
                                  padding:'2px 5px',borderRadius:4,marginTop:1,
                                  background: inStock ? '#dcfce7' : '#fee2e2',
                                  color: inStock ? '#15803d' : '#dc2626',
                                }}>
                                  {inStock ? `×${v.stock}` : 'OOS'}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {spec ? (
                          <div style={{marginTop:9,fontSize:12,color:'#15803d',fontWeight:600,display:'flex',alignItems:'center',gap:5}}>
                            <span style={{fontSize:14}}>✓</span>
                            Sélectionné : {spec.size ? `Taille ${spec.size}` : ''}{spec.color ? ` — ${spec.color}` : ''}
                          </div>
                        ) : (
                          <div style={{marginTop:9,fontSize:12,color:'#b45309'}}>
                            Cliquez sur une variante disponible pour la sélectionner.
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Reason */}
          <div style={{fontWeight:600,fontSize:13,margin:'14px 0 6px'}}>Motif de l'échange</div>
          <textarea
            className="admin-input"
            rows={3}
            style={{width:'100%',resize:'vertical',boxSizing:'border-box',fontSize:13}}
            placeholder="Ex : Mauvaise taille reçue, le client veut du 42 au lieu du 40…"
            value={reason}
            onChange={e => setReason(e.target.value)}
          />

          <div style={{display:'flex',gap:8,marginTop:16}}>
            <button className="btn btn-primary" disabled={loading} onClick={submit} style={{flex:1}}>
              {loading ? '…' : '🔄 Créer l\'échange'}
            </button>
            <button className="btn btn-ghost" onClick={onClose}>Annuler</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderDetail = ({ order, onClose, onUpdated }) => {
  const toast = useToast();
  const [transitioning, setTransitioning]   = useState(false);
  const [showExchange, setShowExchange]     = useState(false);
  const [activeExchange, setActiveExchange] = useState(null);
  const [loadingEx, setLoadingEx]           = useState(false);
  const [cancellingEx, setCancellingEx]     = useState(false);

  useEffect(() => {
    if (order.status !== 'delivered') return;
    let alive = true;
    setActiveExchange(null);
    setLoadingEx(true);
    latinaApi.admin.get(`/orders/${order.id}/active-exchange`)
      .then(res => { if (alive) setActiveExchange(res?.id ? res : null); })
      .catch(() => { if (alive) setActiveExchange(null); })
      .finally(() => { if (alive) setLoadingEx(false); });
    return () => { alive = false; };
  }, [order.id]);

  const doTransition = async (status) => {
    if (!confirm(`Passer la commande en "${status}" ?`)) return;
    setTransitioning(true);
    try {
      await latinaApi.admin.post(`/orders/${order.id}/status`, { status });
      toast(`Statut → ${status}`, "ok");
      onUpdated();
      onClose();
    } catch (e) { toast(e.message, "err"); }
    finally { setTransitioning(false); }
  };

  const allowed = TRANSITIONS[order.status] || [];

  return (
    <>
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-md" onClick={e => e.stopPropagation()}>
        <div className="admin-modal-head">
          <div>
            <div className="admin-modal-title">Commande {order.reference}</div>
            <div className="text-mute" style={{fontSize:12,marginTop:4}}>{new Date(order.created_at).toLocaleString("fr-DZ")}</div>
          </div>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="grid-2 mb-4">
          <div>
            <div className="form-label">Client</div>
            <div style={{marginTop:4}}>
              <div style={{fontWeight:500}}>{order.user?.name || order.guest_name || '—'}</div>
              <div className="mono text-mute">{order.user?.phone || order.guest_phone || '—'}</div>
              <div className="text-mute" style={{fontSize:11,marginTop:2}}>{order.user ? 'Compte enregistré' : 'Invité'}</div>
            </div>
          </div>
          <div>
            <div className="form-label">Livraison</div>
            <div style={{marginTop:4}}>{order.wilaya?.name_fr || order.wilaya_code}{order.commune && ` — ${order.commune.name_fr}`}</div>
            {order.address_line && <div className="text-mute" style={{fontSize:12}}>{order.address_line}</div>}
          </div>
        </div>

        <div className="mb-4">
          {(order.lines || []).map((l, i) => (
            <div key={i} style={{display:'flex',gap:12,padding:'10px 12px',border:'1px solid var(--border)',borderRadius:8,marginBottom:8,alignItems:'flex-start'}}>
              {l.product?.primaryImage?.url ? (
                <img src={window.mediaUrl(l.product.primaryImage.url)} alt="" style={{width:58,height:58,objectFit:'cover',borderRadius:7,border:'1px solid var(--border)',flexShrink:0}} />
              ) : (
                <div style={{width:58,height:58,borderRadius:7,background:'#f3f4f6',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,border:'1px solid var(--border)'}}>👟</div>
              )}
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontWeight:600,fontSize:14,marginBottom:2}}>{l.product_name}</div>
                {l.sku && <div style={{fontSize:11,color:'var(--text-muted)',fontFamily:'monospace',marginBottom:5}}>{l.sku}</div>}
                <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                  {l.size  && <span style={{background:'#f0f4ff',color:'#3b4fd9',borderRadius:4,padding:'2px 8px',fontSize:12,fontWeight:600}}>T. {l.size}</span>}
                  {l.color && <span style={{background:'#f0f4ff',color:'#3b4fd9',borderRadius:4,padding:'2px 8px',fontSize:12,fontWeight:600}}>{l.color}</span>}
                </div>
              </div>
              <div style={{textAlign:'right',flexShrink:0,paddingLeft:8}}>
                <div style={{fontWeight:700,fontSize:15,color:'var(--text)'}}>{Number(l.total_price || l.line_total || 0).toLocaleString()} DA</div>
                <div style={{fontSize:12,color:'var(--text-muted)',marginTop:2}}>×{l.quantity ?? l.qty}</div>
                <div style={{fontSize:11,color:'var(--text-muted)'}}>{Number(l.unit_price || 0).toLocaleString()} /u</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid-2 mb-4">
          <div className="form-field">
            <div className="form-label">Frais livraison</div>
            <div className="mono">{Number(order.shipping_fee || 0).toLocaleString()} DA</div>
          </div>
          <div className="form-field">
            <div className="form-label">Total commande</div>
            <div className="mono text-rose" style={{fontSize:16,fontWeight:600}}>{Number(order.total).toLocaleString()} DA</div>
          </div>
        </div>

        {/* RTO loss banner */}
        {order.status === 'rto' && (
          <div className="rto-loss-banner">
            <div className="rto-loss-icon">↩</div>
            <div className="rto-loss-body">
              <div className="rto-loss-title">Retour expéditeur (RTO)</div>
              <div className="rto-loss-detail">
                <span>Frais retour courier</span>
                <span className="rto-loss-amount">− {Number(order.rto_fee || 300).toLocaleString()} DA</span>
              </div>
              <div className="rto-loss-detail">
                <span>Stock</span>
                <span style={{color:'#10B981',fontWeight:600,fontFamily:'var(--mono)'}}>Restauré ✓</span>
              </div>
            </div>
          </div>
        )}

        <div className="form-field mb-4">
          <div className="form-label">Statut actuel</div>
          <div style={{marginTop:6}}><span className={`badge badge-${order.status}`}>{order.status}</span></div>
        </div>

        {allowed.length > 0 && (
          <div className="form-field">
            <div className="form-label">Transition</div>
            <div className="gap-row" style={{marginTop:6,flexWrap:"wrap"}}>
              {allowed.map(s => (
                <button key={s} className="btn btn-ghost btn-sm" onClick={() => doTransition(s)} disabled={transitioning}>
                  → {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {order.status === 'delivered' && (
          <div style={{marginTop:14,paddingTop:14,borderTop:'1px solid var(--border)'}}>
            {loadingEx ? (
              <div className="text-mute" style={{fontSize:13}}>Vérification des échanges…</div>
            ) : activeExchange ? (() => {
              const EX_CFG = {
                accepted:  { bg:'#fffbeb', border:'#f59e0b', head:'#92400e', icon:'🔄', label:'Échange en cours' },
                requested: { bg:'#eff6ff', border:'#3b82f6', head:'#1e40af', icon:'🕐', label:'Échange demandé' },
                completed: { bg:'#f0fdf4', border:'#22c55e', head:'#15803d', icon:'✅', label:'Échange complété' },
                cancelled: { bg:'#f9fafb', border:'#9ca3af', head:'#6b7280', icon:'🚫', label:'Échange annulé' },
              };
              const cfg = EX_CFG[activeExchange.status] || EX_CFG.accepted;
              const canNew    = activeExchange.status === 'completed' || activeExchange.status === 'cancelled';
              const isActive  = activeExchange.status === 'accepted' || activeExchange.status === 'requested';
              const doCancel  = async () => {
                if (!confirm('Annuler cet échange ?')) return;
                setCancellingEx(true);
                try {
                  await latinaApi.admin.post(`/exchanges/${activeExchange.id}/cancel`, {});
                  setActiveExchange(prev => prev ? { ...prev, status: 'cancelled' } : null);
                } catch (e) { toast(e?.message || 'Erreur.', 'err'); }
                finally { setCancellingEx(false); }
              };
              return (
                <div>
                  <div style={{background:cfg.bg,border:`1px solid ${cfg.border}`,borderRadius:10,padding:'12px 14px'}}>
                    {/* Header */}
                    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                      <span style={{fontSize:18,lineHeight:1}}>{cfg.icon}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,color:cfg.head,fontSize:13}}>{cfg.label}</div>
                        <div style={{fontSize:12,color:cfg.head,opacity:0.75,marginTop:1}}>{activeExchange.reason}</div>
                      </div>
                      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:4}}>
                        {activeExchange.processedBy && (
                          <div style={{fontSize:11,color:cfg.head,opacity:0.6}}>
                            par {activeExchange.processedBy.name}
                          </div>
                        )}
                        {isActive && (
                          <button
                            onClick={doCancel}
                            disabled={cancellingEx}
                            style={{fontSize:11,padding:'2px 9px',borderRadius:5,border:'1px solid #ef4444',color:'#ef4444',background:'transparent',cursor:'pointer',fontWeight:600}}
                          >
                            {cancellingEx ? '…' : 'Annuler'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Exchange lines — what's being / was sent */}
                    {(activeExchange.lines || []).length > 0 && (
                      <div style={{borderTop:`1px solid ${cfg.border}`,paddingTop:8,marginTop:4}}>
                        <div style={{fontSize:11,fontWeight:700,color:cfg.head,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:6}}>
                          {activeExchange.status === 'completed' ? 'Envoyé au client' : 'Article de remplacement'}
                        </div>
                        {activeExchange.lines.map((xl, xi) => {
                          const oldV = xl.oldVariant;
                          const newV = xl.newVariant;
                          const newSize  = newV?.size  || xl.new_size  || null;
                          const newColor = newV?.color || xl.new_color || null;
                          const oldSize  = oldV?.size  || null;
                          const oldColor = oldV?.color || null;
                          return (
                            <div key={xi} style={{display:'flex',alignItems:'center',gap:8,padding:'5px 8px',background:'rgba(255,255,255,0.6)',borderRadius:6,marginBottom:4}}>
                              <div style={{flex:1,minWidth:0}}>
                                <div style={{fontWeight:600,fontSize:13,color:'#111'}}>{xl.product?.name_fr || '—'}</div>
                                <div style={{display:'flex',alignItems:'center',gap:5,marginTop:3,flexWrap:'wrap'}}>
                                  {/* Old variant */}
                                  {(oldSize || oldColor) && (
                                    <span style={{background:'#fee2e2',color:'#b91c1c',borderRadius:4,padding:'1px 7px',fontSize:11,fontWeight:600,textDecoration:'line-through',opacity:0.8}}>
                                      {oldSize ? `T.${oldSize}` : ''}{oldColor ? ` ${oldColor}` : ''}
                                    </span>
                                  )}
                                  {(oldSize || oldColor) && <span style={{color:cfg.head,fontSize:12}}>→</span>}
                                  {/* New variant */}
                                  <span style={{background: activeExchange.status === 'completed' ? '#bbf7d0' : '#fef3c7',color: activeExchange.status === 'completed' ? '#15803d' : '#92400e',borderRadius:4,padding:'1px 7px',fontSize:11,fontWeight:700}}>
                                    {newSize ? `T.${newSize}` : ''}{newColor ? ` ${newColor}` : '—'}
                                  </span>
                                </div>
                              </div>
                              <div style={{fontSize:12,color:cfg.head,flexShrink:0}}>×{xl.quantity}</div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Allow a new exchange if this one ended */}
                  {canNew && (
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{borderColor:'#f59e0b',color:'#f59e0b',marginTop:8}}
                      onClick={e => { e.stopPropagation(); setShowExchange(true); }}
                    >
                      🔄 Nouvel échange
                    </button>
                  )}
                </div>
              );
            })() : (
              <button
                className="btn btn-ghost btn-sm"
                style={{borderColor:'#f59e0b',color:'#f59e0b'}}
                onClick={e => { e.stopPropagation(); setShowExchange(true); }}
              >
                🔄 Initier un échange
              </button>
            )}
          </div>
        )}
      </div>
    </div>
    {showExchange && (
      <InitiateExchangeModal
        order={order}
        onClose={() => setShowExchange(false)}
        onCreated={() => { onUpdated(); }}
      />
    )}
    </>
  );
};

const Orders = () => {
  const { t, lang } = useLang();
  const { rows, loading, search, doSearch, reload } = useTable("/orders");
  const [detail, setDetail] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = statusFilter ? rows.filter(o => o.status === statusFilter) : rows;

  return (
    <div>
      <div className="admin-toolbar">
        <div className="admin-search" style={{maxWidth:280}}>
          <span className="admin-search-icon">🔍</span>
          <input placeholder={lang === 'ar' ? 'المرجع، اسم العميل...' : 'Réf., nom client…'} value={search} onChange={e => doSearch(e.target.value)} />
        </div>
        <select className="admin-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">{lang === 'ar' ? 'كل الحالات' : 'Tous statuts'}</option>
          {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>{t('Réf.')}</th><th>{t('Client')}</th><th>{t('Wilaya')}</th><th>{t('Total')}</th><th>{t('Statut')}</th><th>{t('Date')}</th><th style={{width:80}}></th></tr></thead>
              <tbody>
                {filtered.length === 0 && !loading && (
                  <tr><td colSpan={7}>
                    <div className="admin-empty">
                      <div className="admin-empty-icon">📦</div>
                      <div className="admin-empty-title">{t('Aucune commande')}</div>
                      <div className="admin-empty-sub">{lang === 'ar' ? 'ستظهر طلبات عملائك هنا' : 'Les commandes de vos clients apparaîtront ici'}</div>
                    </div>
                  </td></tr>
                )}
                {filtered.map(o => (
                  <tr key={o.id} className="clickable" onClick={() => setDetail(o)}>
                    <td className="mono" data-label={t('Réf.')}>{o.reference}</td>
                    <td className="t-name" data-label={t('Client')}>{o.user?.name || o.guest_name || '—'}</td>
                    <td data-label={t('Wilaya')}>{o.wilaya?.name_ar || o.wilaya?.name_fr || o.wilaya_code}</td>
                    <td className="mono" data-label={t('Total')}>
                      {o.status === 'rto' ? (
                        <span style={{display:'flex',alignItems:'center',gap:6}}>
                          <span style={{textDecoration:'line-through',color:'var(--text-3)'}}>{Number(o.total).toLocaleString()}</span>
                          <span style={{background:'rgba(239,68,68,.1)',color:'#EF4444',border:'1px solid rgba(239,68,68,.2)',borderRadius:4,padding:'1px 6px',fontSize:11,fontWeight:700,fontFamily:'var(--mono)'}}>−{Number(o.rto_fee||300).toLocaleString()} DA</span>
                        </span>
                      ) : `${Number(o.total).toLocaleString()} DA`}
                    </td>
                    <td data-label={t('Statut')}><span className={`badge badge-${o.status}`}>{o.status}</span></td>
                    <td className="text-mute" data-label={t('Date')}>{new Date(o.created_at).toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'fr-DZ')}</td>
                    <td data-label="">
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={e => {e.stopPropagation();setDetail(o);}}>{t('Détail')}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {detail && <OrderDetail order={detail} onClose={() => setDetail(null)} onUpdated={reload} />}
    </div>
  );
};

/* ============================================================
   RESERVATIONS
   ============================================================ */
const RES_STATUS_COLORS = {
  pending:   { bg: "rgba(59,130,246,.12)",  text: "#3B82F6",  label: "En attente" },
  confirmed: { bg: "rgba(168,85,247,.12)",  text: "#A855F7",  label: "Confirmée" },
  active:    { bg: "rgba(16,185,129,.12)",  text: "#10B981",  label: "Active" },
  expired:   { bg: "rgba(156,163,175,.12)", text: "#9CA3AF",  label: "Expirée" },
  cancelled: { bg: "rgba(239,68,68,.12)",   text: "#EF4444",  label: "Annulée" },
};

const Reservations = () => {
  const { t } = useLang();
  const [rows, setRows]         = useState([]);
  const [stats, setStats]       = useState(null);
  const [loading, setLoading]   = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch]     = useState("");
  const [detail, setDetail]     = useState(null);
  const toast = useToast();

  // ── Create reservation modal ────────────────────────────────
  const [createOpen, setCreateOpen]   = useState(false);
  const [cf, setCf]                   = useState({ user_id: null, product_id: null, duration_days: 1, quantity: 1, notes: "" });
  const [clientQ, setClientQ]         = useState("");
  const [clientList, setClientList]   = useState([]);
  const [clientSelected, setClientSelected] = useState(null);
  const [productQ, setProductQ]       = useState("");
  const [productList, setProductList] = useState([]);
  const [productSelected, setProductSelected] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);

  const searchClients = async (q) => {
    if (!q.trim()) { setClientList([]); return; }
    try {
      const d = await latinaApi.admin.get(`/customers?search=${encodeURIComponent(q)}&per_page=8`);
      setClientList(d.data || d || []);
    } catch { setClientList([]); }
  };

  const searchProducts = async (q) => {
    if (!q.trim()) { setProductList([]); return; }
    try {
      const d = await latinaApi.admin.get(`/products?search=${encodeURIComponent(q)}&per_page=8`);
      setProductList(d.data || d || []);
    } catch { setProductList([]); }
  };

  const handleCreate = async () => {
    if (!cf.user_id || !cf.product_id || !cf.duration_days || !cf.quantity) {
      toast("Remplissez tous les champs obligatoires.", "err"); return;
    }
    setCreateLoading(true);
    try {
      await latinaApi.admin.post("/reservations", cf);
      toast("Réservation créée avec succès", "ok");
      setCreateOpen(false);
      setCf({ user_id: null, product_id: null, duration_days: 1, quantity: 1, notes: "" });
      setClientSelected(null); setClientQ("");
      setProductSelected(null); setProductQ("");
      load();
    } catch (e) { toast(e.message || "Erreur", "err"); }
    finally { setCreateLoading(false); }
  };

  const load = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (statusFilter) params.set("status", statusFilter);
    if (search)       params.set("search", search);
    Promise.all([
      latinaApi.admin.get(`/reservations?${params}`).then(r => setRows(r.data || r)),
      latinaApi.admin.get("/reservations/stats").then(setStats).catch(() => {}),
    ]).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [statusFilter]);
  useEffect(() => {
    const t = setTimeout(load, 350);
    return () => clearTimeout(t);
  }, [search]);

  // Auto-refresh every 60s (reservations expire in real time)
  useEffect(() => {
    const iv = setInterval(load, 60000);
    return () => clearInterval(iv);
  }, [statusFilter, search]);

  const confirm = async (r) => {
    try {
      await latinaApi.admin.post(`/reservations/${r.id}/confirm`);
      toast("Réservation activée", "ok"); load();
    } catch (e) { toast(e.message, "err"); }
  };

  const cancel = async (r) => {
    if (!window.confirm(`Annuler la réservation #${r.reference} ?`)) return;
    try {
      await latinaApi.admin.delete(`/reservations/${r.id}`);
      toast("Réservation annulée", "ok"); load();
    } catch (e) { toast(e.message, "err"); }
  };

  const buildWhatsapp = (r) => {
    const num = (window._LATINA_WHATSAPP || "").replace(/\D/g, "");
    if (!num) return null;
    const msg = `Bonjour, concernant la réservation #${r.reference}\nClient: ${r.client_name} (${r.client_phone})\nProduit: ${r.product?.name_fr}`;
    return `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div>
      {/* Stats bar */}
      {stats && (
        <div className="resv-stats-bar">
          {[
            { label: "En attente",       val: stats.pending,        color: "#3B82F6" },
            { label: "Confirmées",       val: stats.confirmed,      color: "#A855F7" },
            { label: "Actives",          val: stats.active,         color: "#10B981" },
            { label: "Expirent auj.",    val: stats.expiring_today, color: "#F59E0B" },
            { label: "Unités réservées", val: stats.total_reserved, color: "#6366F1" },
          ].map(s => (
            <div key={s.label} className="resv-stat-card">
              <div className="resv-stat-val" style={{ color: s.color }}>{s.val ?? "—"}</div>
              <div className="resv-stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Toolbar */}
      <div className="admin-toolbar">
        <div className="admin-search" style={{ maxWidth: 260 }}>
          <span className="admin-search-icon">🔍</span>
          <input placeholder="Réf., nom, téléphone…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="admin-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Tous statuts</option>
          {Object.entries(RES_STATUS_COLORS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
        <button className="btn btn-ghost btn-sm" onClick={load}>↻</button>
        <button className="btn btn-primary btn-sm" onClick={() => setCreateOpen(true)}>+ Créer une réservation</button>
      </div>

      {/* ── Create modal ──────────────────────────────────────── */}
      {createOpen && (
        <div className="modal-overlay" onClick={() => setCreateOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <span>Créer une réservation</span>
              <button className="admin-modal-close" onClick={() => setCreateOpen(false)}>✕</button>
            </div>
            <div className="admin-modal-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Client search */}
              <div className="admin-field">
                <label className="admin-label">Client *</label>
                {clientSelected ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{clientSelected.name} — {clientSelected.phone}</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setClientSelected(null); setCf(f => ({ ...f, user_id: null })); }}>✕</button>
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <input
                      className="admin-input"
                      placeholder="Nom ou téléphone du client…"
                      value={clientQ}
                      onChange={e => { setClientQ(e.target.value); searchClients(e.target.value); }}
                    />
                    {clientList.length > 0 && (
                      <ul className="admin-suggest-list">
                        {clientList.map(c => (
                          <li key={c.id} onClick={() => { setClientSelected(c); setCf(f => ({ ...f, user_id: c.id })); setClientQ(""); setClientList([]); }}>
                            <span style={{ fontWeight: 500 }}>{c.name}</span>
                            <span className="mono text-mute" style={{ fontSize: 11 }}> — {c.phone}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Product search */}
              <div className="admin-field">
                <label className="admin-label">Produit *</label>
                {productSelected ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{productSelected.name_fr} — {Number(productSelected.price).toLocaleString("fr-DZ")} DA</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setProductSelected(null); setCf(f => ({ ...f, product_id: null })); }}>✕</button>
                  </div>
                ) : (
                  <div style={{ position: "relative" }}>
                    <input
                      className="admin-input"
                      placeholder="Nom ou SKU du produit…"
                      value={productQ}
                      onChange={e => { setProductQ(e.target.value); searchProducts(e.target.value); }}
                    />
                    {productList.length > 0 && (
                      <ul className="admin-suggest-list">
                        {productList.map(p => (
                          <li key={p.id} onClick={() => { setProductSelected(p); setCf(f => ({ ...f, product_id: p.id })); setProductQ(""); setProductList([]); }}>
                            <span style={{ fontWeight: 500 }}>{p.name_fr}</span>
                            <span className="mono text-mute" style={{ fontSize: 11 }}> — {Number(p.price).toLocaleString("fr-DZ")} DA · Stock: {p.stock}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>

              {/* Duration + Quantity */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="admin-field">
                  <label className="admin-label">Durée (jours) *</label>
                  <input
                    className="admin-input"
                    type="number" min="1"
                    value={cf.duration_days}
                    onChange={e => setCf(f => ({ ...f, duration_days: Math.max(1, parseInt(e.target.value) || 1) }))}
                  />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Quantité *</label>
                  <input
                    className="admin-input"
                    type="number" min="1"
                    value={cf.quantity}
                    onChange={e => setCf(f => ({ ...f, quantity: Math.max(1, parseInt(e.target.value) || 1) }))}
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="admin-field">
                <label className="admin-label">Notes (optionnel)</label>
                <textarea
                  className="admin-input"
                  rows={2}
                  style={{ resize: "vertical" }}
                  placeholder="Accord WhatsApp, remarques…"
                  value={cf.notes}
                  onChange={e => setCf(f => ({ ...f, notes: e.target.value }))}
                />
              </div>
            </div>

            <div className="admin-modal-foot">
              <button className="btn btn-ghost" onClick={() => setCreateOpen(false)}>Annuler</button>
              <button className="btn btn-primary" onClick={handleCreate} disabled={createLoading || !cf.user_id || !cf.product_id}>
                {createLoading ? "…" : "Créer la réservation"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Réf.</th><th>Produit</th><th>Client</th>
                  <th>Durée</th><th>Expire</th><th>Statut</th><th style={{ width: 160 }}></th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr><td colSpan={7}>
                    <div className="admin-empty">
                      <div className="admin-empty-icon">📅</div>
                      <div className="admin-empty-title">Aucune réservation</div>
                      <div className="admin-empty-sub">Les réservations clients apparaîtront ici</div>
                    </div>
                  </td></tr>
                )}
                {rows.map(r => {
                  const sc = RES_STATUS_COLORS[r.status] || {};
                  const urgent = r.status === "pending" && r.hours_left <= 3;
                  const waUrl  = buildWhatsapp(r);
                  return (
                    <tr key={r.id} className={urgent ? "resv-row-urgent" : ""}>
                      <td data-label="Réf.">
                        <span className="mono text-rose" style={{ fontSize: 11 }}>{r.reference}</span>
                      </td>
                      <td data-label="Produit">
                        <div className="t-name">{r.product?.name_fr || "—"}</div>
                        <div className="text-mute" style={{ fontSize: 11 }}>{r.product?.sku}</div>
                      </td>
                      <td data-label="Client">
                        <div style={{ fontWeight: 500, fontSize: 13 }}>{r.client_name}</div>
                        <div className="mono text-mute" style={{ fontSize: 11 }}>{r.client_phone}</div>
                      </td>
                      <td data-label="Durée" className="mono">{r.duration_days}j · {r.quantity} unité{r.quantity > 1 ? "s" : ""}</td>
                      <td data-label="Expire">
                        {r.status === "expired" || r.status === "cancelled"
                          ? <span className="text-mute">—</span>
                          : <span className={urgent ? "text-rose" : r.hours_left <= 24 ? "text-yellow" : ""} style={{ fontSize: 12 }}>
                              {r.hours_left < 24 ? `${r.hours_left}h` : `${r.days_left}j`}
                            </span>
                        }
                      </td>
                      <td data-label="Statut">
                        <span className="badge" style={{ background: sc.bg, color: sc.text, border: "none" }}>{sc.label}</span>
                      </td>
                      <td data-label="">
                        <div className="row-actions" style={{ flexWrap: "wrap", gap: 6 }}>
                          {["pending", "confirmed"].includes(r.status) && (
                            <button className="btn btn-ghost btn-sm" onClick={() => confirm(r)} title="Activer la réservation">✓ Activer</button>
                          )}
                          {waUrl && (
                            <a className="btn btn-ghost btn-sm" href={waUrl} target="_blank" rel="noopener noreferrer" title="Contacter sur WhatsApp">
                              💬 WA
                            </a>
                          )}
                          <button className="btn btn-danger btn-sm" onClick={() => cancel(r)}>✕</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   CUSTOMERS
   ============================================================ */
const Customers = () => {
  const { t } = useLang();
  const { rows, loading, search, doSearch, reload } = useTable("/customers");
  const [selected, setSelected] = useState(null);
  const toast = useToast();

  const toggleBlock = async (customer) => {
    try {
      await latinaApi.admin.post(`/customers/${customer.id}/block`, { is_active: !customer.is_active });
      toast(`Client ${customer.is_active ? "bloqué" : "débloqué"}`, "ok");
      reload();
    } catch (e) { toast(e.message, "err"); }
  };

  const adjustLoyalty = async (customer) => {
    const delta = prompt(`Ajuster points fidélité de "${customer.name}"\nActuel: ${customer.loyalty_points} pts\nVariation (+100, -50) :`, "");
    if (!delta) return;
    try {
      await latinaApi.admin.post(`/customers/${customer.id}/loyalty`, { delta: Number(delta), reason: "Ajustement admin" });
      toast("Points mis à jour", "ok"); reload();
    } catch (e) { toast(e.message, "err"); }
  };

  const TIER_COLORS = { petal: "var(--rose)", lotus: "var(--purple)", amber: "var(--yellow)" };

  return (
    <div>
      <div className="admin-toolbar">
        <div className="admin-search">
          <span className="admin-search-icon">🔍</span>
          <input placeholder="Nom, téléphone, email…" value={search} onChange={e => doSearch(e.target.value)} />
        </div>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Client</th><th>Téléphone</th><th>Tier</th><th>Points</th><th>Commandes</th><th>Statut</th><th style={{width:130}}></th></tr></thead>
              <tbody>
                {rows.length === 0 && !loading && (
                  <tr><td colSpan={7}>
                    <div className="admin-empty">
                      <div className="admin-empty-icon">👥</div>
                      <div className="admin-empty-title">Aucun client</div>
                      <div className="admin-empty-sub">Les clients s'inscriront via l'application</div>
                    </div>
                  </td></tr>
                )}
                {rows.map(c => (
                  <tr key={c.id}>
                    <td className="t-name" data-label="Client">{c.name}</td>
                    <td className="mono" data-label="Téléphone">{c.phone}</td>
                    <td data-label="Tier"><span style={{color: TIER_COLORS[c.loyalty_tier] || "var(--text-2)", fontWeight:500}}>{c.loyalty_tier}</span></td>
                    <td className="mono" data-label="Points">{c.loyalty_points}</td>
                    <td className="mono" data-label="Commandes">{c.orders_count ?? "—"}</td>
                    <td data-label="Statut"><span className={`badge ${c.is_active ? "badge-active" : "badge-inactive"}`}>{c.is_active ? "Actif" : "Bloqué"}</span></td>
                    <td data-label="">
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => adjustLoyalty(c)} title="Ajuster points">🎁</button>
                        <button className={`btn btn-sm ${c.is_active ? "btn-danger" : "btn-ghost"}`} onClick={() => toggleBlock(c)}>
                          {c.is_active ? "Bloquer" : "Débloquer"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   COUPONS
   ============================================================ */
const CouponModal = ({ coupon, onClose, onSaved }) => {
  const toast = useToast();
  const isNew = !coupon?.id;
  const [form, setForm] = useState({
    code: coupon?.code || "",
    type: coupon?.type || "percent",
    value: coupon?.value || "",
    min_order: coupon?.min_order || "",
    max_uses: coupon?.max_uses || "",
    expires_at: coupon?.expires_at?.split("T")[0] || "",
    is_active: coupon?.is_active ?? true,
  });
  const [saving, setSaving] = useState(false);
  const set = (k, v) => setForm(f => ({...f, [k]: v}));

  const save = async () => {
    setSaving(true);
    try {
      if (isNew) await latinaApi.admin.post("/coupons", form);
      else await latinaApi.admin.put(`/coupons/${coupon.id}`, form);
      toast("Coupon enregistré", "ok"); onSaved(); onClose();
    } catch (e) { toast(e.message, "err"); }
    finally { setSaving(false); }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-sm" onClick={e => e.stopPropagation()}>
        <div className="admin-modal-head">
          <span className="admin-modal-title">{isNew ? "Nouveau coupon" : `Modifier — ${coupon.code}`}</span>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="form-field mb-4"><label className="form-label">Code</label><input className="admin-input" value={form.code} onChange={e => set("code", e.target.value.toUpperCase())} /></div>
        <div className="form-row form-row-2 mb-4">
          <div className="form-field">
            <label className="form-label">Type</label>
            <select className="admin-select w-full" value={form.type} onChange={e => set("type", e.target.value)}>
              <option value="percent">Pourcentage (%)</option>
              <option value="fixed">Montant fixe (DA)</option>
              <option value="free_shipping">Livraison gratuite</option>
            </select>
          </div>
          <div className="form-field"><label className="form-label">Valeur {form.type === "percent" ? "(%)" : "(DA)"}</label><input className="admin-input" type="number" value={form.value} onChange={e => set("value", e.target.value)} disabled={form.type === "free_shipping"} /></div>
        </div>
        <div className="form-row form-row-2 mb-4">
          <div className="form-field"><label className="form-label">Min commande (DA)</label><input className="admin-input" type="number" value={form.min_order} onChange={e => set("min_order", e.target.value)} /></div>
          <div className="form-field"><label className="form-label">Utilisations max</label><input className="admin-input" type="number" value={form.max_uses} onChange={e => set("max_uses", e.target.value)} /></div>
        </div>
        <div className="form-field mb-4"><label className="form-label">Expire le</label><input className="admin-input" type="date" value={form.expires_at} onChange={e => set("expires_at", e.target.value)} /></div>
        <div className="gap-row">
          <label className="toggle-wrap">
            <input type="checkbox" checked={form.is_active} onChange={e => set("is_active", e.target.checked)} />
            <span className="toggle-track" />
            <span className="toggle-label">Actif</span>
          </label>
          <div className="ml-auto gap-row">
            <button className="btn btn-ghost" onClick={onClose}>Annuler</button>
            <button className="btn btn-rose" onClick={save} disabled={saving}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Coupons = () => {
  const { t } = useLang();
  const { rows, loading, reload } = useTable("/coupons");
  const [modal, setModal] = useState(null);
  const toast = useToast();

  const del = async (id) => {
    if (!confirm("Désactiver ce coupon ?")) return;
    try { await latinaApi.admin.put(`/coupons/${id}`, { is_active: false }); toast("Coupon désactivé", "ok"); reload(); }
    catch (e) { toast(e.message, "err"); }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <button className="btn btn-rose ml-auto" onClick={() => setModal("new")}>+ Nouveau coupon</button>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Code</th><th>Type</th><th>Valeur</th><th>Utilisations</th><th>Expire</th><th>Statut</th><th style={{width:80}}></th></tr></thead>
              <tbody>
                {rows.map(c => (
                  <tr key={c.id}>
                    <td className="mono text-rose" data-label="Code">{c.code}</td>
                    <td data-label="Type">{c.type}</td>
                    <td className="mono" data-label="Valeur">{c.type === "free_shipping" ? "—" : c.type === "percent" ? `${c.value}%` : `${Number(c.value).toLocaleString()} DA`}</td>
                    <td className="mono" data-label="Utilisations">{c.uses ?? 0}{c.max_uses ? `/${c.max_uses}` : ""}</td>
                    <td className="text-mute" data-label="Expire">{c.expires_at ? new Date(c.expires_at).toLocaleDateString("fr-DZ") : "∞"}</td>
                    <td data-label="Statut"><span className={`badge ${c.is_active ? "badge-active" : "badge-inactive"}`}>{c.is_active ? "Actif" : "Inactif"}</span></td>
                    <td data-label="">
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={() => setModal(c)} title="Modifier">✏️</button>
                        <button className="btn btn-danger btn-sm" onClick={() => del(c.id)} title="Désactiver">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal && <CouponModal coupon={modal === "new" ? null : modal} onClose={() => setModal(null)} onSaved={reload} />}
    </div>
  );
};

/* ============================================================
   FLASH SALES
   ============================================================ */
const FlashSales = () => {
  const { t } = useLang();
  const { rows, loading, reload } = useTable("/flash-sales");
  const [modal, setModal] = useState(null);
  const toast = useToast();
  const [form, setForm] = useState({ title_fr:"", discount_pct:"", starts_at:"", ends_at:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const save = async () => {
    try {
      await latinaApi.admin.post("/flash-sales", form);
      toast("Flash sale enregistrée", "ok"); reload(); setModal(null);
    } catch (e) { toast(e.message, "err"); }
  };

  const openEdit = (fs) => { setForm({ title_fr: fs.title_fr, discount_pct: fs.discount_pct, starts_at: fs.starts_at?.split("T")[0]||"", ends_at: fs.ends_at?.split("T")[0]||"" }); setModal(fs); };

  return (
    <div>
      <div className="admin-toolbar">
        <button className="btn btn-rose ml-auto" onClick={() => { setForm({title_fr:"",discount_pct:"",starts_at:"",ends_at:""}); setModal({}); }}>+ Nouvelle flash sale</button>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Titre</th><th>Réduction</th><th>Début</th><th>Fin</th><th>Statut</th><th style={{width:60}}></th></tr></thead>
              <tbody>
                {rows.map(fs => {
                  const now = new Date();
                  const s = fs.starts_at ? new Date(fs.starts_at) : null;
                  const e = fs.ends_at ? new Date(fs.ends_at) : null;
                  const active = s && e && now >= s && now <= e;
                  return (
                    <tr key={fs.id}>
                      <td className="t-name" data-label="Titre">{fs.title_fr}</td>
                      <td className="mono text-rose" data-label="Réduction">{fs.discount_pct}%</td>
                      <td className="text-mute" data-label="Début">{s?.toLocaleDateString("fr-DZ")}</td>
                      <td className="text-mute" data-label="Fin">{e?.toLocaleDateString("fr-DZ")}</td>
                      <td data-label="Statut"><span className={`badge ${active ? "badge-active" : "badge-inactive"}`}>{active ? "Active" : "Inactive"}</span></td>
                      <td data-label="">
                        <div className="row-actions">
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(fs)} title="Modifier">✏️</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal !== null && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal admin-modal-sm" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <span className="admin-modal-title">{modal?.id ? "Modifier flash sale" : "Nouvelle flash sale"}</span>
              <button className="admin-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="form-field mb-4"><label className="form-label">Titre (FR)</label><input className="admin-input" value={form.title_fr} onChange={e => set("title_fr",e.target.value)} /></div>
            <div className="form-field mb-4"><label className="form-label">Réduction (%)</label><input className="admin-input" type="number" value={form.discount_pct} onChange={e => set("discount_pct",e.target.value)} /></div>
            <div className="form-row form-row-2 mb-4">
              <div className="form-field"><label className="form-label">Début</label><input className="admin-input" type="datetime-local" value={form.starts_at} onChange={e => set("starts_at",e.target.value)} /></div>
              <div className="form-field"><label className="form-label">Fin</label><input className="admin-input" type="datetime-local" value={form.ends_at} onChange={e => set("ends_at",e.target.value)} /></div>
            </div>
            <div className="gap-row">
              <button className="btn btn-ghost ml-auto" onClick={() => setModal(null)}>Annuler</button>
              <button className="btn btn-rose" onClick={save}>Enregistrer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   CONTESTS
   ============================================================ */
const CONTEST_TYPE_LABELS = { open: "Ouvert", purchase: "Commandes", photo: "Photo" };
const CONTEST_TYPE_COLORS = { open: "#10B981", purchase: "#3B82F6", photo: "#A855F7" };

const ContestEntryModal = ({ contest, onClose }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectId, setRejectId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const toast = useToast();

  const load = () => {
    setLoading(true);
    latinaApi.admin.get(`/contests/${contest.id}/entries?status=${statusFilter}`)
      .then(r => setEntries(r.data || r))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, [contest.id, statusFilter]);

  const approve = async (entry) => {
    try {
      await latinaApi.admin.post(`/contests/${contest.id}/entries/${entry.id}/approve`);
      toast("Participation validée", "ok"); load();
    } catch (e) { toast(e.message, "err"); }
  };

  const reject = async (entry) => {
    try {
      await latinaApi.admin.post(`/contests/${contest.id}/entries/${entry.id}/reject`, { reason: rejectReason || "Photo non conforme." });
      toast("Participation refusée", "ok"); setRejectId(null); setRejectReason(""); load();
    } catch (e) { toast(e.message, "err"); }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="admin-modal" style={{ maxWidth: 640, maxHeight: "80vh", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        <div className="admin-modal-head">
          <span>Participations — {contest.title_fr}</span>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>
        <div style={{ padding: "0 20px 12px", display: "flex", gap: 8 }}>
          {["pending", "approved", "rejected"].map(s => (
            <button key={s} className={`btn btn-sm ${statusFilter === s ? "btn-primary" : "btn-ghost"}`} onClick={() => setStatusFilter(s)}>
              {s === "pending" ? "En attente" : s === "approved" ? "Validées" : "Refusées"}
            </button>
          ))}
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "0 20px 20px" }}>
          {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : entries.length === 0 ? (
            <div className="admin-empty"><div className="admin-empty-icon">📭</div><div className="admin-empty-title">Aucune participation</div></div>
          ) : entries.map(entry => (
            <div key={entry.id} style={{ border: "1px solid var(--border)", borderRadius: 10, padding: 14, marginBottom: 12, background: "var(--bg-2)" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                {entry.photo_url && (
                  <a href={window.mediaUrl(entry.photo_url)} target="_blank" rel="noopener noreferrer">
                    <img src={window.mediaUrl(entry.photo_url)} alt="participation" style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8, border: "1px solid var(--border)" }} />
                  </a>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{entry.user?.name || entry.guest_name || "—"}</div>
                  <div className="mono text-mute" style={{ fontSize: 11 }}>{entry.user?.phone || entry.guest_phone || ""}</div>
                  <div style={{ fontSize: 11, marginTop: 4, color: "var(--ink-soft)" }}>{new Date(entry.created_at).toLocaleString("fr-DZ")}</div>
                  {entry.votes_count > 0 && (
                    <div style={{ marginTop: 4, fontSize: 12, color: "#EF4444", fontWeight: 600 }}>❤️ {entry.votes_count} vote{entry.votes_count > 1 ? "s" : ""}</div>
                  )}
                  {entry.rejection_reason && (
                    <div style={{ marginTop: 6, fontSize: 12, color: "#EF4444" }}>Motif : {entry.rejection_reason}</div>
                  )}
                </div>
                {entry.status === "pending" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <button className="btn btn-ghost btn-sm" style={{ color: "#10B981" }} onClick={() => approve(entry)}>✓ Valider</button>
                    <button className="btn btn-ghost btn-sm" style={{ color: "#EF4444" }} onClick={() => setRejectId(entry.id)}>✕ Refuser</button>
                  </div>
                )}
              </div>
              {rejectId === entry.id && (
                <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                  <input className="admin-input" style={{ flex: 1, fontSize: 13 }} placeholder="Motif du refus…" value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
                  <button className="btn btn-danger btn-sm" onClick={() => reject(entry)}>Confirmer</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => setRejectId(null)}>Annuler</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Contests = () => {
  const { t } = useLang();
  const { rows, loading, reload } = useTable("/contests");
  const [createOpen, setCreateOpen] = useState(false);
  const [entriesContest, setEntriesContest] = useState(null);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  const nowLocal = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  const BLANK = { type:"open", title_fr:"", title_ar:"", title_en:"", description_fr:"", description_ar:"", description_en:"", min_orders:2, starts_at: nowLocal(), ends_at:"" };
  const [form, setForm] = useState(BLANK);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const LANGS = [
    { code: "fr", mm: "fr", key: k => `${k}_fr` },
    { code: "ar", mm: "ar", key: k => `${k}_ar` },
    { code: "en", mm: "en", key: k => `${k}_en` },
  ];
  const MM_PAIR = { fr: "fr", ar: "ar", en: "en" };

  const [xlTitle, setXlTitle] = useState({ title_fr: false, title_ar: false, title_en: false });
  const [afTitle, setAfTitle] = useState({ title_fr: false, title_ar: false, title_en: false });
  const [xlDesc,  setXlDesc]  = useState({ description_fr: false, description_ar: false, description_en: false });
  const [afDesc,  setAfDesc]  = useState({ description_fr: false, description_ar: false, description_en: false });

  const handleTitleBlur = async (sourceLang) => {
    const srcKey = `title_${sourceLang}`;
    const text = form[srcKey];
    if (!text?.trim()) return;
    const targets = LANGS.filter(l => l.code !== sourceLang && (!form[`title_${l.code}`]?.trim() || afTitle[`title_${l.code}`]));
    if (!targets.length) return;
    setXlTitle(x => Object.fromEntries(targets.map(l => [`title_${l.code}`, true]).concat(Object.entries(x))));
    const results = await Promise.all(targets.map(l => mymemory(text, MM_PAIR[sourceLang], MM_PAIR[l.code]).then(t => [l.code, t])));
    const updates = {};
    const af = {};
    results.forEach(([code, translated]) => {
      if (translated) { updates[`title_${code}`] = translated; af[`title_${code}`] = true; }
    });
    setForm(f => ({ ...f, ...updates }));
    setAfTitle(a => ({ ...a, ...af }));
    setXlTitle({ title_fr: false, title_ar: false, title_en: false });
  };

  const handleDescBlur = async (sourceLang) => {
    const srcKey = `description_${sourceLang}`;
    const text = form[srcKey];
    if (!text?.trim()) return;
    const targets = LANGS.filter(l => l.code !== sourceLang && (!form[`description_${l.code}`]?.trim() || afDesc[`description_${l.code}`]));
    if (!targets.length) return;
    setXlDesc(x => Object.fromEntries(targets.map(l => [`description_${l.code}`, true]).concat(Object.entries(x))));
    const results = await Promise.all(targets.map(l => mymemory(text, MM_PAIR[sourceLang], MM_PAIR[l.code]).then(t => [l.code, t])));
    const updates = {};
    const af = {};
    results.forEach(([code, translated]) => {
      if (translated) { updates[`description_${code}`] = translated; af[`description_${code}`] = true; }
    });
    setForm(f => ({ ...f, ...updates }));
    setAfDesc(a => ({ ...a, ...af }));
    setXlDesc({ description_fr: false, description_ar: false, description_en: false });
  };

  const deleteContest = async (contest) => {
    if (!confirm(`Supprimer le concours "${contest.title_fr}" et toutes ses participations ?\nCette action est irréversible.`)) return;
    try {
      await latinaApi.admin.delete(`/contests/${contest.id}`);
      toast("Concours supprimé", "ok"); reload();
    } catch (e) { toast(e.message || "Erreur", "err"); }
  };

  const drawWinner = async (contest) => {
    if (!confirm(`Tirer au sort le gagnant du concours "${contest.title_fr}" ?`)) return;
    try {
      const res = await latinaApi.admin.post(`/contests/${contest.id}/draw`);
      const w = res.winner || res.data?.winner;
      toast(`🏆 Gagnant·e : ${w?.name || "sélectionné·e"}`, "ok");
      reload();
    } catch (e) { toast(e.message, "err"); }
  };

  const announce = async (contest) => {
    if (!confirm(`Annoncer publiquement la gagnante pendant 6 heures ?`)) return;
    try {
      await latinaApi.admin.post(`/contests/${contest.id}/announce`);
      toast("Annonce activée pour 6 heures", "ok");
      reload();
    } catch (e) { toast(e.message, "err"); }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <button className="btn btn-rose ml-auto" onClick={() => { setForm(BLANK); setCreateOpen(true); }}>+ Nouveau concours</button>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Titre (FR)</th><th>Type</th><th>Participants</th>
                  <th>Début</th><th>Fin</th><th>Gagnante</th><th style={{width:160}}></th>
                </tr>
              </thead>
              <tbody>
                {rows.map(c => {
                  const typeColor = CONTEST_TYPE_COLORS[c.type] || "#999";
                  return (
                    <tr key={c.id}>
                      <td className="t-name" data-label="Titre">{c.title_fr}</td>
                      <td data-label="Type">
                        <span className="badge" style={{ background: typeColor + "22", color: typeColor, border: "none", fontSize: 11 }}>
                          {CONTEST_TYPE_LABELS[c.type] || c.type}
                        </span>
                      </td>
                      <td className="mono" data-label="Participants">
                        {c.entries_count ?? 0}
                        {c.type === "photo" && c.pending_entries_count > 0 && (
                          <span style={{ marginLeft: 6, color: "#F59E0B", fontSize: 11 }}>({c.pending_entries_count} en attente)</span>
                        )}
                      </td>
                      <td className="text-mute" data-label="Début">{c.starts_at ? new Date(c.starts_at).toLocaleDateString("fr-DZ") : "—"}</td>
                      <td className="text-mute" data-label="Fin">{c.ends_at ? new Date(c.ends_at).toLocaleDateString("fr-DZ") : "—"}</td>
                      <td data-label="Gagnante">
                        {c.winner ? <span style={{ color: "#F59E0B", fontWeight: 600 }}>🏆 {c.winner.name}</span> : <span className="text-mute">—</span>}
                      </td>
                      <td data-label="">
                        <div className="row-actions" style={{ flexWrap: "wrap", gap: 4 }}>
                          {c.type === "photo" && (
                            <button className="btn btn-ghost btn-sm" onClick={() => setEntriesContest(c)}>📷 Entrées</button>
                          )}
                          {!c.winner && (
                            <button className="btn btn-ghost btn-sm" onClick={() => drawWinner(c)}>🎲 Tirer</button>
                          )}
                          {c.winner && !c.winner_announced_at && (
                            <button className="btn btn-ghost btn-sm" style={{ color: "#F59E0B" }} onClick={() => announce(c)}>📢 Annoncer</button>
                          )}
                          {c.winner_announced_at && (
                            <span style={{ fontSize: 11, color: "#10B981" }}>✓ Annoncée</span>
                          )}
                          <button className="btn btn-ghost btn-sm" style={{ color: "#EF4444" }} onClick={() => deleteContest(c)}>🗑</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Create modal ── */}
      {createOpen && (
        <div className="modal-overlay" onClick={() => setCreateOpen(false)}>
          <div className="admin-modal" style={{ maxWidth: 560, maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <span>Nouveau concours</span>
              <button className="admin-modal-close" onClick={() => setCreateOpen(false)}>✕</button>
            </div>
            <div className="admin-modal-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>

              {/* Type */}
              <div className="admin-field">
                <label className="admin-label">Type de concours *</label>
                <select className="admin-input" value={form.type} onChange={e => set("type", e.target.value)}>
                  <option value="open">Ouvert — toute participante</option>
                  <option value="purchase">Commandes — clients ayant passé N commandes livrées</option>
                  <option value="photo">Photo — envoi de photo à valider</option>
                </select>
              </div>

              {form.type === "purchase" && (
                <div className="admin-field">
                  <label className="admin-label">Commandes livrées minimum *</label>
                  <input className="admin-input" type="number" min="1" max="50" value={form.min_orders}
                    onChange={e => set("min_orders", parseInt(e.target.value) || 2)} />
                  <div style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 4 }}>
                    Les participantes avec plus de commandes auront plus de chances au tirage.
                  </div>
                </div>
              )}

              {/* Titles */}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10 }}>Titre du concours</div>
                <div className="admin-field" style={{ marginBottom: 10 }}>
                  <label className="admin-label">Français *</label>
                  <div className="pm-translate-wrap">
                    <input className="admin-input" placeholder="Titre en français…" value={form.title_fr}
                      onChange={e => { set("title_fr", e.target.value); setAfTitle(a => ({...a, title_fr: false})); }}
                      onBlur={() => handleTitleBlur("fr")} />
                    {xlTitle.title_fr && <span className="pm-xl-spin" />}
                    {afTitle.title_fr && !xlTitle.title_fr && <span className="pm-xl-badge" title="Traduit automatiquement">auto ✎</span>}
                  </div>
                </div>
                <div className="admin-field" style={{ marginBottom: 10 }}>
                  <label className="admin-label">Arabe <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>(optionnel)</span></label>
                  <div className="pm-translate-wrap">
                    <input className="admin-input" dir="rtl" placeholder="العنوان بالعربية…" value={form.title_ar}
                      onChange={e => { set("title_ar", e.target.value); setAfTitle(a => ({...a, title_ar: false})); }}
                      onBlur={() => handleTitleBlur("ar")} />
                    {xlTitle.title_ar && <span className="pm-xl-spin" />}
                    {afTitle.title_ar && !xlTitle.title_ar && <span className="pm-xl-badge" title="Traduit automatiquement">auto ✎</span>}
                  </div>
                </div>
                <div className="admin-field">
                  <label className="admin-label">Anglais <span style={{ color: "var(--ink-soft)", fontWeight: 400 }}>(optionnel)</span></label>
                  <div className="pm-translate-wrap">
                    <input className="admin-input" placeholder="Title in English…" value={form.title_en}
                      onChange={e => { set("title_en", e.target.value); setAfTitle(a => ({...a, title_en: false})); }}
                      onBlur={() => handleTitleBlur("en")} />
                    {xlTitle.title_en && <span className="pm-xl-spin" />}
                    {afTitle.title_en && !xlTitle.title_en && <span className="pm-xl-badge" title="Traduit automatiquement">auto ✎</span>}
                  </div>
                </div>
              </div>

              {/* Descriptions */}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)", marginBottom: 10 }}>Description <span style={{ fontWeight: 400, textTransform: "none" }}>(optionnel)</span></div>
                <div className="admin-field" style={{ marginBottom: 10 }}>
                  <label className="admin-label">Français</label>
                  <div className="pm-translate-wrap">
                    <textarea className="admin-input" rows={2} style={{ resize: "vertical" }} placeholder="Description en français…" value={form.description_fr}
                      onChange={e => { set("description_fr", e.target.value); setAfDesc(a => ({...a, description_fr: false})); }}
                      onBlur={() => handleDescBlur("fr")} />
                    {xlDesc.description_fr && <span className="pm-xl-spin" />}
                    {afDesc.description_fr && !xlDesc.description_fr && <span className="pm-xl-badge" title="Traduit automatiquement">auto ✎</span>}
                  </div>
                </div>
                <div className="admin-field" style={{ marginBottom: 10 }}>
                  <label className="admin-label">Arabe</label>
                  <div className="pm-translate-wrap">
                    <textarea className="admin-input" rows={2} dir="rtl" style={{ resize: "vertical" }} placeholder="الوصف بالعربية…" value={form.description_ar}
                      onChange={e => { set("description_ar", e.target.value); setAfDesc(a => ({...a, description_ar: false})); }}
                      onBlur={() => handleDescBlur("ar")} />
                    {xlDesc.description_ar && <span className="pm-xl-spin" />}
                    {afDesc.description_ar && !xlDesc.description_ar && <span className="pm-xl-badge" title="Traduit automatiquement">auto ✎</span>}
                  </div>
                </div>
                <div className="admin-field">
                  <label className="admin-label">Anglais</label>
                  <div className="pm-translate-wrap">
                    <textarea className="admin-input" rows={2} style={{ resize: "vertical" }} placeholder="Description in English…" value={form.description_en}
                      onChange={e => { set("description_en", e.target.value); setAfDesc(a => ({...a, description_en: false})); }}
                      onBlur={() => handleDescBlur("en")} />
                    {xlDesc.description_en && <span className="pm-xl-spin" />}
                    {afDesc.description_en && !xlDesc.description_en && <span className="pm-xl-badge" title="Traduit automatiquement">auto ✎</span>}
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div className="admin-field">
                  <label className="admin-label">Début *</label>
                  <input className="admin-input" type="datetime-local" value={form.starts_at} onChange={e => set("starts_at", e.target.value)} />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Fin *</label>
                  <input className="admin-input" type="datetime-local" value={form.ends_at} onChange={e => set("ends_at", e.target.value)} />
                </div>
              </div>

            </div>
            <div className="admin-modal-foot">
              <button className="btn btn-ghost" onClick={() => setCreateOpen(false)} disabled={saving}>Annuler</button>
              <button className="btn btn-rose" disabled={saving} onClick={async () => {
                if (saving) return;
                setSaving(true);
                try {
                  await latinaApi.admin.post("/contests", form);
                  toast("Concours créé", "ok"); reload(); setCreateOpen(false);
                } catch (e) { toast(e.message, "err"); } finally { setSaving(false); }
              }}>
                {saving ? <><span className="admin-spinner" style={{ width: 14, height: 14, marginRight: 6 }} />Création…</> : "Créer le concours"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Photo entries modal ── */}
      {entriesContest && <ContestEntryModal contest={entriesContest} onClose={() => setEntriesContest(null)} />}
    </div>
  );
};

/* ============================================================
   TEAM (Admin Users + Role Access Configurator)
   ============================================================ */
const ROLES = [
  { value: "order-manager",   label: "REP Commandes" },
  { value: "catalog-manager", label: "GDS (Gestionnaire de stock)" },
  { value: "support",         label: "Support client" },
  { value: "viewer",          label: "Lecteur" },
];

const PAGE_GROUPS = ['Général','Catalogue','Commandes','Clients','Support','Rapports','Admin'];

/* ── Role Access Configurator (super-admin only) ──────────── */
const RoleAccess = () => {
  const toast = useToast();
  const [roleSettings, setRoleSettings] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [pages, setPages] = useState(null); // null = unrestricted, array = allowed list
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    latinaApi.admin.get("/roles/settings")
      .then(d => {
        const list = Array.isArray(d) ? d : (d.data || []);
        const filtered = list.filter(r => r.name !== 'super-admin');
        setRoleSettings(filtered);
        if (filtered.length > 0 && !selectedRole) {
          const first = filtered[0];
          setSelectedRole(first.name);
          setPages(first.allowed_pages ?? null);
        }
      }).catch(() => {});
  }, []);

  const selectRole = (r) => {
    setSelectedRole(r.name);
    setPages(r.allowed_pages ? [...r.allowed_pages] : null);
    setDirty(false);
  };

  const togglePage = (pageId) => {
    if (pageId === 'dashboard') return; // dashboard is always granted
    setPages(prev => {
      if (prev === null) {
        // was unrestricted — switch to explicit list minus this page
        const all = ALL_PAGES.map(p => p.id);
        return all.filter(id => id !== pageId);
      }
      if (prev.includes(pageId)) return prev.filter(id => id !== pageId);
      return [...prev, pageId];
    });
    setDirty(true);
  };

  const save = async () => {
    setSaving(true);
    try {
      await latinaApi.admin.put(`/roles/${selectedRole}/pages`, { allowed_pages: pages });
      // update local _rolePageMap
      applyRoleSettings([{ name: selectedRole, allowed_pages: pages }]);
      setRoleSettings(rs => rs.map(r => r.name === selectedRole ? { ...r, allowed_pages: pages } : r));
      toast("Droits enregistrés", "ok");
      setDirty(false);
    } catch (e) { toast(e.message, "err"); }
    finally { setSaving(false); }
  };

  const activeRole = roleSettings.find(r => r.name === selectedRole);

  return (
    <div className="ra-layout">
      {/* Left — role list */}
      <div className="ra-sidebar">
        <div className="ra-sidebar-head">Rôles</div>
        {roleSettings.map(r => (
          <button key={r.name}
            className={`ra-role-btn ${selectedRole === r.name ? "active" : ""}`}
            onClick={() => selectRole(r)}>
            <span className="ra-role-name">{ROLE_LABELS[r.name] || r.name}</span>
            <span className="ra-role-sub">
              {r.allowed_pages === null ? "Accès complet" : `${(r.allowed_pages||[]).length} section${(r.allowed_pages||[]).length!==1?"s":""}`}
            </span>
          </button>
        ))}
      </div>

      {/* Right — page toggles */}
      {activeRole && (
        <div className="ra-main">
          <div className="ra-main-head">
            <div>
              <div className="ra-main-title">{ROLE_LABELS[selectedRole] || selectedRole}</div>
              <div className="ra-main-sub">
                {pages === null
                  ? "Accès complet à toutes les sections"
                  : `${(pages||[]).length} section${(pages||[]).length!==1?"s":""} autorisée${(pages||[]).length!==1?"s":""}`}
              </div>
            </div>
            <button className="btn btn-rose btn-sm" onClick={save} disabled={!dirty || saving}>
              {saving ? <span className="btn-spinner"/> : "Enregistrer"}
            </button>
          </div>

          {PAGE_GROUPS.map(group => {
            const groupPages = ALL_PAGES.filter(p => p.group === group);
            if (!groupPages.length) return null;
            return (
              <div key={group} className="ra-group">
                <div className="ra-group-label">{group}</div>
                <div className="ra-toggles">
                  {groupPages.map(p => {
                    const isOn = pages === null || (pages||[]).includes(p.id);
                    const locked = p.id === 'dashboard';
                    return (
                      <div key={p.id}
                        className={`ra-toggle-row ${locked ? "locked" : ""}`}
                        onClick={() => !locked && togglePage(p.id)}>
                        <div className="ra-toggle-info">
                          <span className="ra-toggle-label">{p.label}</span>
                          {p.sensitive && <span className="ra-sensitive-chip">sensible</span>}
                          {locked && <span className="ra-locked-chip">toujours actif</span>}
                        </div>
                        <div className={`ra-switch ${isOn ? "on" : "off"} ${locked ? "locked" : ""}`}>
                          <div className="ra-switch-thumb"/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* ── Team members list ────────────────────────────────────── */
const Team = ({ admin: currentAdmin }) => {
  const { t } = useLang();
  const { rows, loading, reload } = useTable("/admins");
  const [tab, setTab] = useState("members");
  const [modal, setModal] = useState(null);
  const toast = useToast();
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"order-manager" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const previewPages = useMemo(() => {
    const setting = _rolePageMap[form.role];
    if (setting === null) return null;
    return setting ? ALL_PAGES.filter(p => setting.includes(p.id)) : [];
  }, [form.role]);

  const save = async () => {
    try {
      const { role, ...rest } = form;
      await latinaApi.admin.post("/admins", { ...rest, roles: [role] });
      toast("Membre ajouté","ok"); reload(); setModal(null);
    } catch (e) { toast(e.message,"err"); }
  };

  const del = async (id) => {
    if (!confirm("Supprimer cet admin ?")) return;
    try { await latinaApi.admin.delete(`/admins/${id}`); toast("Supprimé","ok"); reload(); }
    catch(e) { toast(e.message,"err"); }
  };

  const isSuper = currentAdmin?.is_super;

  return (
    <div>
      {/* Tabs */}
      <div className="admin-tabs-bar">
        <button className={`admin-tab ${tab==="members"?"active":""}`} onClick={() => setTab("members")}>Membres</button>
        {isSuper && (
          <button className={`admin-tab ${tab==="roles"?"active":""}`} onClick={() => setTab("roles")}>Rôles &amp; Accès</button>
        )}
        {tab === "members" && (
          <button className="btn btn-rose btn-sm" style={{marginLeft:"auto"}}
            onClick={() => { setForm({name:"",email:"",password:"",role:"order-manager"}); setModal(true); }}>
            + Nouveau membre
          </button>
        )}
      </div>

      {/* Members tab */}
      {tab === "members" && (
        <div className="admin-card">
          {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Nom</th><th>Email</th><th>Rôle</th><th>Créé</th><th style={{width:90}}></th></tr></thead>
                <tbody>
                  {rows.map(a => (
                    <tr key={a.id}>
                      <td className="t-name" data-label="Nom">{a.name}</td>
                      <td className="mono" data-label="Email">{a.email}</td>
                      <td data-label="Rôle">
                        <span className={`badge ${a.is_super ? "badge-out_for_delivery" : "badge-confirmed"}`}>
                          {a.is_super ? "Super Admin" : ROLE_LABELS[a.roles?.[0]?.name] || a.roles?.[0]?.name || "—"}
                        </span>
                      </td>
                      <td className="text-mute" data-label="Créé">{new Date(a.created_at).toLocaleDateString("fr-DZ")}</td>
                      <td data-label="">
                        {!a.is_super && (
                          <div className="row-actions">
                            <button className="btn btn-danger btn-sm" onClick={() => del(a.id)}>🗑</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Roles & Access tab */}
      {tab === "roles" && isSuper && <RoleAccess />}

      {/* Add member modal */}
      {modal && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" style={{maxWidth:520}} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <span className="admin-modal-title">Nouveau membre</span>
              <button className="admin-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="form-field mb-4"><label className="form-label">Nom complet</label><input className="admin-input" value={form.name} onChange={e => set("name",e.target.value)} /></div>
            <div className="form-field mb-4"><label className="form-label">Email</label><input className="admin-input" type="email" value={form.email} onChange={e => set("email",e.target.value)} /></div>
            <div className="form-field mb-4"><label className="form-label">Mot de passe</label><input className="admin-input" type="password" value={form.password} onChange={e => set("password",e.target.value)} /></div>
            <div className="form-field mb-3">
              <label className="form-label">Rôle</label>
              <select className="admin-select w-full" value={form.role} onChange={e => set("role",e.target.value)}>
                {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            {/* Access preview */}
            <div className="ra-preview">
              <div className="ra-preview-label">Accès attribués avec ce rôle</div>
              {previewPages === null ? (
                <div className="ra-preview-full">Accès complet à toutes les sections</div>
              ) : previewPages.length === 0 ? (
                <div className="ra-preview-empty">Aucune section configurée pour ce rôle</div>
              ) : (
                <div className="ra-preview-chips">
                  {previewPages.map(p => (
                    <span key={p.id} className="ra-preview-chip">{p.label}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="gap-row" style={{marginTop:16}}>
              <button className="btn btn-ghost ml-auto" onClick={() => setModal(null)}>Annuler</button>
              <button className="btn btn-rose" onClick={save}>Créer le compte</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   REPORTS
   ============================================================ */
/* ── SVG line chart ───────────────────────────────────────── */
const LineChart = ({ data, xKey, yKey, color = "var(--rose)" }) => {
  if (!data?.length) return <p style={{textAlign:"center",color:"var(--text-3)",padding:20,fontSize:12}}>Aucune donnée sur la période</p>;
  const W=520, H=130, PL=48, PT=8, PB=28, PR=8;
  const iW=W-PL-PR, iH=H-PT-PB;
  const vals = data.map(d => Number(d[yKey])||0);
  const maxV = Math.max(...vals,1);
  const sx = i => PL + (i/Math.max(data.length-1,1))*iW;
  const sy = v => PT + iH - (v/maxV)*iH;
  const pts = vals.map((v,i) => `${sx(i)},${sy(v)}`).join(" ");
  const area = `M${sx(0)},${H-PB} ${vals.map((v,i)=>`L${sx(i)},${sy(v)}`).join(" ")} L${sx(data.length-1)},${H-PB}Z`;
  const step = Math.max(1, Math.ceil(data.length/6));
  const fmt  = v => v>=1000 ? `${Math.round(v/1000)}k` : String(v);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",display:"block"}}>
      {[0,0.5,1].map((f,i) => (
        <g key={i}>
          <line x1={PL} x2={W-PR} y1={sy(f*maxV)} y2={sy(f*maxV)} stroke="var(--border)" strokeDasharray="3 3"/>
          <text x={PL-4} y={sy(f*maxV)+4} textAnchor="end" fontSize={9} fill="var(--text-3)">{fmt(Math.round(f*maxV))}</text>
        </g>
      ))}
      <path d={area} fill={color} fillOpacity={0.12}/>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round"/>
      {vals.map((v,i) => i%step===0 ? <circle key={i} cx={sx(i)} cy={sy(v)} r={3} fill={color}/> : null)}
      {data.map((d,i) => i%step===0 ? (
        <text key={i} x={sx(i)} y={H-6} textAnchor="middle" fontSize={9} fill="var(--text-3)">{String(d[xKey]).slice(5)}</text>
      ) : null)}
    </svg>
  );
};

/* ── SVG horizontal bar chart ─────────────────────────────── */
const HBarChart = ({ data, labelKey, valueKey, color="var(--rose)", fmt=v=>Number(v).toLocaleString() }) => {
  if (!data?.length) return <p style={{textAlign:"center",color:"var(--text-3)",padding:20,fontSize:12}}>Aucune donnée</p>;
  const maxV = Math.max(...data.map(d => Number(d[valueKey])||0), 1);
  const RH=24, GAP=5, LW=120, VW=90, TW=490, BW=TW-LW-VW;
  const H = data.length*(RH+GAP);
  return (
    <svg viewBox={`0 0 ${TW} ${H}`} style={{width:"100%",display:"block"}}>
      {data.map((d,i) => {
        const bw = Math.max((Number(d[valueKey])||0)/maxV*BW, 2);
        const y  = i*(RH+GAP);
        return (
          <g key={i}>
            <text x={LW-6} y={y+RH/2+4} textAnchor="end" fontSize={11} fill="var(--text-2)">{String(d[labelKey]).slice(0,18)}</text>
            <rect x={LW} y={y} width={bw} height={RH} rx={4} fill={color} opacity={0.78}/>
            <text x={LW+bw+6} y={y+RH/2+4} fontSize={11} fill="var(--text-3)">{fmt(d[valueKey])}</text>
          </g>
        );
      })}
    </svg>
  );
};

/* ── Reports ──────────────────────────────────────────────── */
const QUICK = [{label:"7 jours",days:7},{label:"30 jours",days:30},{label:"90 jours",days:90},{label:"Cette année",days:365}];

const Reports = () => {
  const { t } = useLang();
  const [days, setDays]           = useState(30);
  const [isCustom, setIsCustom]   = useState(false);
  const [customFrom, setCustomFrom] = useState("");
  const [customTo,   setCustomTo]   = useState("");
  const [sales, setSales]         = useState(null);
  const [inv,   setInv]           = useState(null);
  const [loading, setLoading]     = useState(true);

  const fetch = (d, custom, from, to) => {
    setLoading(true);
    const todayStr = new Date().toISOString().slice(0,10);
    const f = custom && from ? from : new Date(Date.now()-d*86400000).toISOString().slice(0,10);
    const t = custom && to   ? to   : todayStr;
    Promise.all([
      latinaApi.admin.get(`/reports/sales?date_from=${f}&date_to=${t}`).then(r=>r.data||r).catch(()=>({})),
      latinaApi.admin.get("/reports/inventory").then(r=>r.data||r).catch(()=>({})),
    ]).then(([s,i])=>{setSales(s);setInv(i);}).finally(()=>setLoading(false));
  };

  useEffect(()=>{ fetch(days,false,"",""); }, []);

  const applyQuick = (d) => { setDays(d); setIsCustom(false); fetch(d,false,"",""); };
  const applyCustom = () => { if(customFrom && customTo) { setIsCustom(true); fetch(days,true,customFrom,customTo); } };

  const exportCSV = () => {
    const d=sales||{};
    const rows=[
      ["Rapport Latina — Latina Store"],
      ["Période",`${d.period?.from||""} → ${d.period?.to||""}`],
      [],
      ["RÉSUMÉ"],
      ["Chiffre d'affaires (DA)",d.revenue||0],
      ["Panier moyen (DA)",d.avg_order||0],
      ["Commandes totales",d.orders_count||0],
      ["Livrées",d.delivered_count||0],
      ["Taux de livraison",`${d.delivery_rate||0}%`],
      ["RTO",d.rto_count||0],
      ["Annulées",d.cancelled_count||0],
      ["Nouveaux clients",d.new_customers||0],
      [],
      ["TOP PRODUITS","Qté vendue","Revenu (DA)"],
      ...(d.top_products||[]).map(p=>[p.product_name,p.sold,p.revenue]),
      [],
      ["TOP WILAYAS","Commandes","Revenu (DA)"],
      ...(d.by_wilaya||[]).map(w=>[w.wilaya_code,w.orders,w.revenue]),
      [],
      ["ÉVOLUTION JOURNALIÈRE","Date","Revenu (DA)","Commandes"],
      ...(d.daily||[]).map(day=>[day.date,day.revenue,day.orders]),
    ];
    const csv=rows.map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob=new Blob(["﻿"+csv],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url;
    a.download=`rapport-latina-${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const d=sales||{}, iv=inv||{};

  const kpis=[
    {label:"Chiffre d'affaires", val:d.revenue?`${Number(d.revenue).toLocaleString()} DA`:"—", delta:d.revenue_delta, accent:"#C68B6F"},
    {label:"Panier moyen",       val:d.avg_order?`${Number(d.avg_order).toLocaleString()} DA`:"—", delta:null, accent:"#3B82F6"},
    {label:"Commandes",          val:d.orders_count??("—"), delta:d.orders_delta, accent:"#8B5CF6"},
    {label:"Taux de livraison",  val:d.delivery_rate!=null?`${d.delivery_rate}%`:"—", delta:null, accent:"#10B981"},
  ];

  return (
    <div>
      {/* toolbar */}
      <div className="admin-toolbar" style={{gap:6,flexWrap:"wrap",alignItems:"center"}}>
        {QUICK.map(p=>(
          <button key={p.days} className={`btn btn-sm ${!isCustom&&days===p.days?"btn-rose":"btn-ghost"}`}
            onClick={()=>applyQuick(p.days)}>{p.label}</button>
        ))}
        <div style={{display:"flex",gap:6,alignItems:"center",marginLeft:"auto"}}>
          <input type="date" className="admin-input" style={{width:136,height:32,padding:"0 8px",fontSize:12}}
            value={customFrom} onChange={e=>setCustomFrom(e.target.value)}/>
          <span style={{color:"var(--text-3)",fontSize:12}}>→</span>
          <input type="date" className="admin-input" style={{width:136,height:32,padding:"0 8px",fontSize:12}}
            value={customTo} onChange={e=>setCustomTo(e.target.value)}/>
          <button className="btn btn-ghost btn-sm" onClick={applyCustom}>Appliquer</button>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={exportCSV} title="Télécharger CSV">⬇ Exporter CSV</button>
      </div>

      {loading ? <div className="admin-loading"><div className="admin-spinner"/></div> : <>

        {/* KPI cards */}
        <div className="stats-grid" style={{marginBottom:16}}>
          {kpis.map((k,i)=>(
            <div key={i} className="stat-card" style={{"--sc-accent":k.accent,"--sc-bg":k.accent+"1a"}}>
              <div className="sc-label">{k.label}</div>
              <div className="sc-val" style={{fontSize:20}}>{k.val}</div>
              {k.delta!=null&&(
                <div className={`sc-delta ${k.delta>=0?"up":"down"}`}>
                  {k.delta>=0?"▲":"▼"} {Math.abs(k.delta)}% vs période préc.
                </div>
              )}
            </div>
          ))}
        </div>

        {/* order status breakdown */}
        <div className="admin-card mb-4">
          <div className="ac-head"><span className="ac-title">Détail des commandes</span>
            <span className="ac-sub text-mute" style={{fontSize:11}}>{d.period?.from} → {d.period?.to}</span>
          </div>
          <div className="ac-body" style={{display:"flex",flexWrap:"wrap",gap:0}}>
            {[
              {label:"Livrées",    val:d.delivered_count??0, color:"#10B981"},
              {label:"RTO", val:d.rto_count??0, color:"#F59E0B", sub: d.rto_fee_total ? `−${Number(d.rto_fee_total).toLocaleString()} DA` : null},
              {label:"Annulées",   val:d.cancelled_count??0, color:"#EF4444"},
              {label:"En cours",   val:Math.max(0,(d.orders_count||0)-(d.delivered_count||0)-(d.rto_count||0)-(d.cancelled_count||0)), color:"#3B82F6"},
              {label:"Nv. clients",val:d.new_customers??0,   color:"#8B5CF6"},
            ].map(s=>(
              <div key={s.label} style={{flex:"1 1 100px",textAlign:"center",padding:"16px 8px",borderRight:"1px solid var(--border)"}}>
                <div style={{fontSize:26,fontWeight:700,color:s.color,lineHeight:1}}>{s.val}</div>
                <div style={{fontSize:11,color:"var(--text-3)",marginTop:6}}>{s.label}</div>
                {s.sub && <div style={{fontSize:11,color:"#EF4444",fontFamily:"var(--mono)",marginTop:3,fontWeight:600}}>{s.sub}</div>}
              </div>
            ))}
          </div>
        </div>

        {/* revenue trend */}
        <div className="admin-card mb-4">
          <div className="ac-head"><span className="ac-title">Évolution du chiffre d'affaires</span></div>
          <div className="ac-body" style={{padding:"12px 8px 4px"}}>
            <LineChart data={d.daily||[]} xKey="date" yKey="revenue"/>
          </div>
        </div>

        {/* orders trend */}
        <div className="admin-card mb-4">
          <div className="ac-head"><span className="ac-title">Évolution des commandes</span></div>
          <div className="ac-body" style={{padding:"12px 8px 4px"}}>
            <LineChart data={d.daily||[]} xKey="date" yKey="orders" color="var(--blue)"/>
          </div>
        </div>

        {/* top products + wilayas */}
        <div className="grid-2">
          <div className="admin-card mb-4">
            <div className="ac-head">
              <span className="ac-title">Top 10 Produits</span>
              <span className="ac-sub" style={{fontSize:11,color:"var(--text-3)"}}>par revenu</span>
            </div>
            <div className="ac-body" style={{padding:"12px 8px"}}>
              <HBarChart data={d.top_products||[]} labelKey="product_name" valueKey="revenue"
                fmt={v=>`${Number(v).toLocaleString()} DA`}/>
            </div>
          </div>
          <div className="admin-card mb-4">
            <div className="ac-head">
              <span className="ac-title">Top Wilayas</span>
              <span className="ac-sub" style={{fontSize:11,color:"var(--text-3)"}}>par revenu</span>
            </div>
            <div className="ac-body" style={{padding:"12px 8px"}}>
              <HBarChart data={d.by_wilaya||[]} labelKey="wilaya_code" valueKey="revenue"
                color="var(--purple)" fmt={v=>`${Number(v).toLocaleString()} DA`}/>
            </div>
          </div>
        </div>

        {/* stock alerts */}
        <div className="admin-card mb-4">
          <div className="ac-head">
            <span className="ac-title">Alertes stock</span>
            <div style={{display:"flex",gap:16,fontSize:12}}>
              <span style={{color:"#EF4444",fontWeight:600}}>● Rupture : {iv.out_of_stock??0}</span>
              <span style={{color:"#F59E0B",fontWeight:600}}>● Seuil bas : {iv.low_stock??0}</span>
            </div>
          </div>
          {iv.low_stock_list?.length>0 ? (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Produit</th><th>SKU</th><th>Stock actuel</th><th>Seuil alerte</th></tr></thead>
                <tbody>
                  {iv.low_stock_list.map(p=>(
                    <tr key={p.id}>
                      <td>{p.name_fr}</td>
                      <td className="mono">{p.sku||"—"}</td>
                      <td className="mono" style={{color:p.stock===0?"#EF4444":"#F59E0B",fontWeight:600}}>{p.stock}</td>
                      <td className="mono text-mute">{p.low_stock_threshold}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ac-body" style={{textAlign:"center",padding:20,fontSize:12,color:"var(--text-3)"}}>
              ✓ Aucun produit en alerte
            </div>
          )}
        </div>

      </>}
    </div>
  );
};

/* ============================================================
   AUDIT LOG
   ============================================================ */
const ACTION_META = {
  'admin.login':    { label: "Connexion",          color: "var(--blue)" },
  'admin.logout':   { label: "Déconnexion",         color: "var(--text-3)" },
  'admin.created':  { label: "Admin créé",          color: "var(--green)" },
  'admin.updated':  { label: "Admin modifié",       color: "var(--yellow)" },
  'admin.deleted':  { label: "Admin supprimé",      color: "var(--red)" },
  'order.status':   { label: "Statut commande",     color: "var(--rose-l)" },
  'ticket.updated': { label: "Ticket modifié",      color: "var(--cyan)" },
  'product.created':{ label: "Produit créé",        color: "var(--green)" },
  'product.updated':{ label: "Produit modifié",     color: "var(--yellow)" },
  'product.deleted':{ label: "Produit supprimé",    color: "var(--red)" },
  'customer.blocked':{ label: "Client bloqué",      color: "var(--red)" },
  'loyalty.adjusted':{ label: "Fidélité ajustée",   color: "var(--purple)" },
};

const AuditDetail = ({ entry }) => {
  const [open, setOpen] = useState(false);
  const hasDetail = entry.old_values || entry.new_values;
  return (
    <>
      <tr style={{ cursor: hasDetail ? "pointer" : "default" }} onClick={() => hasDetail && setOpen(o => !o)}>
        <td className="mono text-mute" style={{fontSize:11}} data-label="Date">{new Date(entry.created_at).toLocaleString("fr-DZ")}</td>
        <td data-label="Acteur">
          <div style={{fontWeight:500, fontSize:13}}>{entry.actor_name || "Système"}</div>
          {entry.actor_email && <div style={{fontSize:11, color:"var(--text-3)"}}>{entry.actor_email}</div>}
        </td>
        <td data-label="Action">
          <span style={{
            color: ACTION_META[entry.action]?.color || "var(--text-2)",
            fontFamily:"var(--mono)", fontSize:11,
            background: "rgba(255,255,255,.05)", padding:"2px 7px", borderRadius:4
          }}>
            {ACTION_META[entry.action]?.label || entry.action}
          </span>
        </td>
        <td className="mono text-mute" style={{fontSize:11}} data-label="Cible">{entry.model_label || "—"}</td>
        <td className="mono text-mute" style={{fontSize:11}} data-label="IP">{entry.ip || "—"}</td>
        <td style={{fontSize:11, color:"var(--text-3)"}} data-label="">{hasDetail ? (open ? "▲" : "▼") : ""}</td>
      </tr>
      {open && hasDetail && (
        <tr>
          <td colSpan={6} style={{padding:"0 12px 12px", background:"var(--bg2)"}}>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, padding:"12px 0"}}>
              {entry.old_values && (
                <div>
                  <div style={{fontSize:10, color:"var(--text-3)", marginBottom:6, textTransform:"uppercase", letterSpacing:".5px"}}>Avant</div>
                  <pre style={{fontSize:11, color:"var(--red)", margin:0, whiteSpace:"pre-wrap", fontFamily:"var(--mono)", lineHeight:1.6}}>
                    {JSON.stringify(entry.old_values, null, 2)}
                  </pre>
                </div>
              )}
              {entry.new_values && (
                <div>
                  <div style={{fontSize:10, color:"var(--text-3)", marginBottom:6, textTransform:"uppercase", letterSpacing:".5px"}}>Après</div>
                  <pre style={{fontSize:11, color:"var(--green)", margin:0, whiteSpace:"pre-wrap", fontFamily:"var(--mono)", lineHeight:1.6}}>
                    {JSON.stringify(entry.new_values, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

const Audit = () => {
  const { t } = useLang();
  const toast = useToast();
  const { rows, loading, search, doSearch } = useTable("/audit-log", 20);
  const [exporting, setExporting]  = useState(false);
  const [archiving, setArchiving]  = useState(false);

  const exportXlsx = async () => {
    setExporting(true);
    try {
      const token = localStorage.getItem("latina-admin-token");
      const res   = await fetch(`${window.LATINA_API_BASE || "http://localhost:8000/api"}/admin/audit-log/export`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Export échoué");
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `audit_export_${new Date().toISOString().slice(0,10)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      toast("Export téléchargé", "ok");
    } catch (e) { toast(e.message || "Erreur export", "err"); }
    finally { setExporting(false); }
  };

  const archive = async () => {
    if (!confirm("Archiver et supprimer tous les journaux actuels ? Cette action est irréversible.")) return;
    setArchiving(true);
    try {
      const res = await latinaApi.admin.post("/audit-log/archive");
      toast(res.message || "Archive créée avec succès", "ok");
    } catch (e) { toast(e.message || "Erreur archivage", "err"); }
    finally { setArchiving(false); }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <div className="admin-search" style={{maxWidth:320}}>
          <span className="admin-search-icon">🔍</span>
          <input placeholder="Rechercher (action, acteur…)" value={search} onChange={e => doSearch(e.target.value)} />
        </div>
        <div style={{display:"flex", gap:8, marginLeft:"auto"}}>
          <button className="btn-secondary" onClick={exportXlsx} disabled={exporting} style={{fontSize:13}}>
            {exporting ? "Export…" : "⬇ Exporter Excel"}
          </button>
          <button className="btn-danger-outline" onClick={archive} disabled={archiving} style={{fontSize:13}}>
            {archiving ? "Archivage…" : "🗄 Archiver & Purger"}
          </button>
        </div>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr>
                <th>Date</th><th>Acteur</th><th>Action</th><th>Cible</th><th>IP</th><th style={{width:28}}></th>
              </tr></thead>
              <tbody>
                {rows.length === 0
                  ? <tr><td colSpan={6} style={{textAlign:"center", padding:32, color:"var(--text-3)"}}>Aucun événement enregistré.</td></tr>
                  : rows.map(e => <AuditDetail key={e.id} entry={e} />)
                }
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

/* ============================================================
   INVENTORY
   ============================================================ */
const Inventory = () => {
  const { t } = useLang();
  const toast = useToast();
  const [tab, setTab] = useState("stock"); // "stock" | "movements"
  const [invStats, setInvStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [movements, setMovements] = useState([]);
  const [mvMeta, setMvMeta] = useState(null);
  const [mvPage, setMvPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mvLoading, setMvLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadStock();
  }, []);

  useEffect(() => {
    if (tab === "movements") loadMovements(1);
  }, [tab]);

  const loadStock = async () => {
    setLoading(true);
    try {
      const [inv, prods] = await Promise.all([
        latinaApi.admin.get("/inventory").then(r => r.data || r).catch(() => ({})),
        latinaApi.admin.get("/products?per_page=200").then(r => r.data || r || []).catch(() => []),
      ]);
      setInvStats(inv);
      setProducts(Array.isArray(prods) ? prods : []);
    } catch {}
    finally { setLoading(false); }
  };

  const loadMovements = async (p = 1) => {
    setMvLoading(true);
    try {
      const res = await latinaApi.admin.get(`/inventory/movements?page=${p}`);
      setMovements(res.data || []);
      setMvMeta(res.meta || null);
      setMvPage(p);
    } catch {}
    finally { setMvLoading(false); }
  };

  const adjustStock = async (product) => {
    const newStock = prompt(`Stock actuel: ${product.stock}\nNouveau stock pour "${product.name_fr}":`, String(product.stock));
    if (newStock === null || newStock === "") return;
    const n = parseInt(newStock, 10);
    if (isNaN(n) || n < 0) { toast("Valeur invalide", "err"); return; }
    try {
      await latinaApi.admin.post(`/products/${product.id}/stock`, { new_stock: n, note: "Ajustement inventaire" });
      toast("Stock mis à jour", "ok");
      loadStock();
    } catch (e) { toast(e.message, "err"); }
  };

  const q = search.trim().toLowerCase();
  const filtered = products.filter(p => {
    if (!q) return true;
    return (
      p.name_fr?.toLowerCase().includes(q) ||
      p.name_ar?.toLowerCase().includes(q) ||
      p.name_en?.toLowerCase().includes(q) ||
      p.sku?.toLowerCase().includes(q) ||
      p.reference?.toLowerCase().includes(q)
    );
  });

  // Suggestions: up to 6, shown when input is active
  const suggestions = q.length >= 1
    ? products.filter(p =>
        p.name_fr?.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.reference?.toLowerCase().includes(q)
      ).slice(0, 6)
    : [];

  const getStockChip = (p) => {
    if (p.stock === 0) return <span className="stock-chip out">Rupture</span>;
    if (p.low_stock_threshold && p.stock <= p.low_stock_threshold) return <span className="stock-chip low">Stock bas</span>;
    return <span className="stock-chip good">OK</span>;
  };

  const getBarColor = (p) => {
    if (p.stock === 0) return "var(--red)";
    if (p.low_stock_threshold && p.stock <= p.low_stock_threshold) return "var(--yellow)";
    return "var(--green)";
  };

  const stats = invStats || {};

  return (
    <div>
      {/* Summary stats */}
      <div className="inv-stats-grid">
        <div className="inv-stat">
          <div className="inv-stat-icon">🔴</div>
          <div>
            <div className="inv-stat-label">RUPTURE DE STOCK</div>
            <div className={`inv-stat-val ${stats.out_of_stock > 0 ? "danger" : "ok"}`}>{stats.out_of_stock ?? "—"}</div>
          </div>
        </div>
        <div className="inv-stat">
          <div className="inv-stat-icon">🟡</div>
          <div>
            <div className="inv-stat-label">STOCK BAS</div>
            <div className={`inv-stat-val ${stats.low_stock > 0 ? "warn" : "ok"}`}>{stats.low_stock ?? "—"}</div>
          </div>
        </div>
        <div className="inv-stat">
          <div className="inv-stat-icon">📦</div>
          <div>
            <div className="inv-stat-label">PRODUITS ACTIFS</div>
            <div className="inv-stat-val ok">{stats.total_products ?? products.length}</div>
          </div>
        </div>
      </div>

      {/* Tab toggle */}
      <div className="admin-tabs">
        <button className={`admin-tab ${tab === "stock" ? "active" : ""}`} onClick={() => setTab("stock")}>
          📋 Niveaux de stock
        </button>
        <button className={`admin-tab ${tab === "movements" ? "active" : ""}`} onClick={() => setTab("movements")}>
          🔄 Historique des mouvements
        </button>
      </div>

      {tab === "stock" && (
        <div>
          <div className="admin-toolbar">
            <div className="admin-search inv-search-wrap" style={{position:"relative",flex:1}}>
              <span className="admin-search-icon">🔍</span>
              <input
                placeholder="Nom, référence SKU… (recherche partielle)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === "Escape" && setSearch("")}
                autoComplete="off"
                style={{paddingRight: search ? 32 : undefined}}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",fontSize:14,color:"var(--text-3)",lineHeight:1}}
                  title="Effacer"
                >✕</button>
              )}
              {suggestions.length > 0 && (
                <div className="inv-suggestions">
                  {suggestions.map(p => (
                    <div
                      key={p.id}
                      className="inv-suggestion-item"
                      onMouseDown={() => setSearch(p.name_fr || p.sku)}
                    >
                      <span className="inv-sug-name">{p.name_fr}</span>
                      <span className="inv-sug-sku">{p.sku}</span>
                    </div>
                  ))}
                  <div className="inv-sug-foot">
                    {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
                  </div>
                </div>
              )}
            </div>
            <button className="btn btn-ghost btn-sm" onClick={loadStock}>↻ Rafraîchir</button>
          </div>
          <div className="admin-card">
            {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Produit</th>
                      <th>SKU</th>
                      <th>Stock</th>
                      <th>Seuil alerte</th>
                      <th>Niveau</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.length === 0 && (
                      <tr><td colSpan={7} style={{textAlign:"center",padding:32,color:"var(--text-3)"}}>Aucun produit trouvé</td></tr>
                    )}
                    {filtered.map(p => {
                      const maxStock = Math.max(p.stock, (p.low_stock_threshold || 5) * 4, 10);
                      const pct = Math.min(100, Math.round((p.stock / maxStock) * 100));
                      return (
                        <tr key={p.id}>
                          <td data-label="Produit">
                            <div className="t-name">{p.name_fr}</div>
                            <div className="text-mute" style={{fontSize:11}}>{p.category?.name_fr}</div>
                          </td>
                          <td className="mono" data-label="SKU">{p.sku}</td>
                          <td className={`mono ${p.stock === 0 ? "text-red" : p.low_stock_threshold && p.stock <= p.low_stock_threshold ? "text-yellow" : "text-green"}`}
                              style={{fontSize:16,fontWeight:600}} data-label="Stock">
                            {p.stock}
                          </td>
                          <td className="mono text-mute" data-label="Seuil">{p.low_stock_threshold ?? 5}</td>
                          <td style={{minWidth:90}} data-label="Niveau">
                            <div className="inv-stock-bar">
                              <div className="inv-stock-bar-fill" style={{width:`${pct}%`, background: getBarColor(p)}} />
                            </div>
                          </td>
                          <td data-label="Statut">{getStockChip(p)}</td>
                          <td data-label="">
                            <button className="btn btn-ghost btn-sm" onClick={() => adjustStock(p)} title="Ajuster le stock">
                              ✏️ Ajuster
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === "movements" && (
        <div>
          <div className="admin-card">
            {mvLoading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
              <>
                <div className="admin-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Produit</th>
                        <th>Variante</th>
                        <th>Type</th>
                        <th>Δ Qté</th>
                        <th>Stock après</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movements.length === 0 && (
                        <tr><td colSpan={7} style={{textAlign:"center",padding:32,color:"var(--text-3)"}}>Aucun mouvement enregistré</td></tr>
                      )}
                      {movements.map(m => {
                        const cls = m.type === "in" || m.quantity_change > 0 ? "mv-type-in" : m.type === "out" ? "mv-type-out" : "mv-type-adj";
                        const sign = m.quantity_change > 0 ? "+" : "";
                        return (
                          <tr key={m.id}>
                            <td className="mono text-mute" style={{fontSize:11}} data-label="Date">{new Date(m.created_at).toLocaleString("fr-DZ")}</td>
                            <td data-label="Produit">
                              <div className="t-name">{m.product?.name_fr || "—"}</div>
                              <div className="mono text-mute" style={{fontSize:10}}>{m.product?.sku}</div>
                            </td>
                            <td className="text-mute" data-label="Variante">{m.variant ? `${m.variant.size || ""} ${m.variant.color || ""}`.trim() || "—" : "—"}</td>
                            <td data-label="Type"><span className={cls}>{m.type || "adj"}</span></td>
                            <td className={`mono ${m.quantity_change > 0 ? "text-green" : "text-red"}`} data-label="Δ Qté">
                              {sign}{m.quantity_change}
                            </td>
                            <td className="mono" data-label="Stock après">{m.stock_after}</td>
                            <td className="text-mute" style={{fontSize:12,maxWidth:200}} data-label="Note">{m.note || "—"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {mvMeta && mvMeta.last_page > 1 && (
                  <div className="admin-pagination">
                    <button className="pagination-btn" disabled={mvPage <= 1} onClick={() => loadMovements(mvPage - 1)}>‹</button>
                    <span style={{fontSize:12,color:"var(--text-3)"}}>Page {mvPage} / {mvMeta.last_page}</span>
                    <button className="pagination-btn" disabled={mvPage >= mvMeta.last_page} onClick={() => loadMovements(mvPage + 1)}>›</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   PAGE TITLES
   ============================================================ */
/* ============================================================
   SUPPORT — ticket dashboard (admin side)
   ============================================================ */
const TICKET_STATES = [
  { id:"all",         label:"Tous" },
  { id:"new",         label:"Nouveau",       cls:"tsc-new" },
  { id:"attributed",  label:"Attribué",      cls:"tsc-attributed" },
  { id:"pending",     label:"En attente",    cls:"tsc-pending" },
  { id:"planned",     label:"Planifié",      cls:"tsc-planned" },
  { id:"in_progress", label:"En cours",      cls:"tsc-in_progress" },
  { id:"resolved",    label:"Résolu",        cls:"tsc-resolved" },
  { id:"closed",      label:"Fermé",         cls:"tsc-closed" },
];

const TICKET_PRIORITIES = [
  { id:"low",    label:"Basse",    cls:"tpc-low" },
  { id:"normal", label:"Normale",  cls:"tpc-normal" },
  { id:"high",   label:"Haute",    cls:"tpc-high" },
  { id:"urgent", label:"Urgent",   cls:"tpc-urgent" },
];

const TICKET_CAT_LABELS = {
  "Commande / livraison":"Commande", "Produit défectueux":"Produit",
  "Remboursement":"Remboursement", "Compte & connexion":"Compte",
  "Programme fidélité":"Fidélité", "Autre":"Autre",
};

const TicketDetail = ({ ticket, agents, onClose, onSave }) => {
  const [status, setStatus]   = useState(ticket.status || "new");
  const [priority, setPriority] = useState(ticket.priority || "normal");
  const [agentId, setAgentId] = useState(ticket.assigned_to || "");
  const [note, setNote]       = useState("");
  const [notes, setNotes]     = useState(ticket.notes || []);
  const [saving, setSaving]   = useState(false);
  const { addToast }          = useToast();

  const handleSave = async () => {
    setSaving(true);
    try {
      await latinaApi.admin.put(`/support/tickets/${ticket.id}`, { status, priority, assigned_to: agentId || null });
      addToast("Ticket mis à jour", "success");
      onSave({ ...ticket, status, priority, assigned_to: agentId });
    } catch { addToast("Erreur lors de la mise à jour", "error"); }
    finally { setSaving(false); }
  };

  const handleNote = async () => {
    if (!note.trim()) return;
    setSaving(true);
    try {
      const res = await latinaApi.admin.post(`/support/tickets/${ticket.id}/notes`, { content: note });
      setNotes(n => [...n, res.data || { content: note, created_at: new Date().toISOString(), author: "Admin" }]);
      setNote("");
    } catch { addToast("Erreur note", "error"); }
    finally { setSaving(false); }
  };

  const stateInfo  = (id) => TICKET_STATES.find(s => s.id === id) || {};
  const prioInfo   = (id) => TICKET_PRIORITIES.find(p => p.id === id) || {};

  return (
    <div className="modal-overlay ticket-detail-modal" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth:880, width:"96vw", maxHeight:"90vh", overflow:"hidden", display:"flex", flexDirection:"column" }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <span className="ticket-ref-badge">{ticket.reference || ticket.ref}</span>
            <span className={`ticket-state-chip ${stateInfo(status).cls}`}>{stateInfo(status).label || status}</span>
            <span className={`ticket-prio-chip ${prioInfo(priority).cls}`}>{prioInfo(priority).label || priority}</span>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"20px" }}>
          <div className="ticket-detail-grid">
            {/* Main: subject + description + notes */}
            <div className="ticket-detail-main">
              <div className="ticket-section">
                <div className="ticket-section-title">Demande</div>
                <div className="ticket-message-box">
                  <div className="ticket-message-meta">{ticket.category} · {new Date(ticket.created_at).toLocaleString("fr-DZ")}</div>
                  <div className="ticket-message-meta" style={{ fontWeight:600, fontSize:14, marginBottom:6 }}>{ticket.subject}</div>
                  <div className="ticket-message-body">{ticket.description}</div>
                </div>
              </div>

              {notes.length > 0 && (
                <div className="ticket-section">
                  <div className="ticket-section-title">Notes internes</div>
                  {notes.map((n, i) => (
                    <div key={i} className="ticket-note">
                      <div className="ticket-note-meta">{n.author || "Admin"} · {n.created_at ? new Date(n.created_at).toLocaleString("fr-DZ") : ""}</div>
                      <div className="ticket-note-body">{n.content}</div>
                    </div>
                  ))}
                </div>
              )}

              <div className="ticket-section">
                <div className="ticket-section-title">Ajouter une note interne</div>
                <div className="ticket-note-composer">
                  <textarea className="ticket-note-textarea" rows={3} value={note} onChange={e => setNote(e.target.value)} placeholder="Note visible uniquement par l'équipe…" />
                  <button className="ticket-note-submit" onClick={handleNote} disabled={saving || !note.trim()}>Ajouter la note</button>
                </div>
              </div>
            </div>

            {/* Sidebar: client info + state + priority + agent */}
            <div className="ticket-detail-sidebar">
              <div className="ticket-info-card">
                <div className="ticket-info-card-title">Client</div>
                <div className="ticket-info-row"><span>Nom</span><span>{ticket.name || "—"}</span></div>
                <div className="ticket-info-row"><span>Email</span><span>{ticket.email || "—"}</span></div>
                <div className="ticket-info-row"><span>Tél.</span><span>{ticket.phone || "—"}</span></div>
                <div className="ticket-info-row"><span>Créé</span><span>{ticket.created_at ? new Date(ticket.created_at).toLocaleDateString("fr-DZ") : "—"}</span></div>
              </div>

              <div className="ticket-action-card">
                <div className="ticket-action-card-title">Statut</div>
                <div className="ticket-state-grid">
                  {TICKET_STATES.filter(s => s.id !== "all").map(s => (
                    <button key={s.id} className={`ticket-state-btn ${status === s.id ? "active" : ""}`} onClick={() => setStatus(s.id)}>{s.label}</button>
                  ))}
                </div>
              </div>

              <div className="ticket-action-card">
                <div className="ticket-action-card-title">Priorité</div>
                <div className="ticket-prio-grid">
                  {TICKET_PRIORITIES.map(p => (
                    <button key={p.id} className={`ticket-prio-btn ${priority === p.id ? "active" : ""}`} onClick={() => setPriority(p.id)}>{p.label}</button>
                  ))}
                </div>
              </div>

              <div className="ticket-action-card">
                <div className="ticket-action-card-title">Agent assigné</div>
                <select className="ticket-agent-select" value={agentId} onChange={e => setAgentId(e.target.value)}>
                  <option value="">— Non assigné —</option>
                  {(agents || []).map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>

              <button className="btn-rose" style={{ width:"100%" }} onClick={handleSave} disabled={saving}>
                {saving ? "Enregistrement…" : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Support = () => {
  const { t } = useLang();
  const [tickets, setTickets]     = useState([]);
  const [feedback, setFeedback]   = useState([]);
  const [agents, setAgents]       = useState([]);
  const [loading, setLoading]     = useState(true);
  const [stateFilter, setStateFilter] = useState("all");
  const [search, setSearch]       = useState("");
  const [detail, setDetail]       = useState(null);
  const [tab, setTab]             = useState("tickets"); // tickets | feedback
  const { addToast }              = useToast();

  const load = async () => {
    setLoading(true);
    try {
      // Load tickets and feedback in parallel; agents are secondary and won't block if they fail
      const [tRes, fRes] = await Promise.all([
        latinaApi.admin.get("/support/tickets"),
        latinaApi.admin.get("/feedback"),
      ]);
      setTickets(Array.isArray(tRes.data) ? tRes.data : tRes.data?.data || []);
      setFeedback(Array.isArray(fRes.data) ? fRes.data : fRes.data?.data || []);
    } catch { addToast("Erreur de chargement", "error"); }
    finally { setLoading(false); }
    // Agents loaded separately — failure is non-fatal (assignment just won't have a dropdown)
    latinaApi.admin.get("/support/agents")
      .then(r => setAgents(Array.isArray(r.data) ? r.data : r.data?.data || []))
      .catch(() => {});
  };

  useEffect(() => { load(); }, []);

  const stateCount = (s) => tickets.filter(t => s === "all" || t.status === s).length;

  const filtered = tickets.filter(t => {
    const matchState = stateFilter === "all" || t.status === stateFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || (t.subject||"").toLowerCase().includes(q) || (t.reference||"").toLowerCase().includes(q) || (t.name||"").toLowerCase().includes(q);
    return matchState && matchSearch;
  });

  const avgRating = feedback.length ? (feedback.reduce((s,f) => s + (f.rating||0), 0) / feedback.length).toFixed(1) : "—";
  const ratingDist = [5,4,3,2,1].map(s => ({ star:s, count: feedback.filter(f => f.rating === s).length }));

  return (
    <div>
      {/* Tab toggle */}
      <div className="modal-tabs" style={{ marginBottom:20 }}>
        <button className={`modal-tab ${tab === "tickets" ? "active" : ""}`} onClick={() => setTab("tickets")}>Tickets support</button>
        <button className={`modal-tab ${tab === "feedback" ? "active" : ""}`} onClick={() => setTab("feedback")}>Feedbacks clients</button>
      </div>

      {/* ── TICKETS TAB ─────────────────────────────── */}
      {tab === "tickets" && (
        <>
          {/* Stat cards */}
          <div className="ticket-dash-grid">
            {TICKET_STATES.map(s => (
              <div key={s.id} className={`ticket-dash-card tdc-${s.id === "all" ? "total" : s.id}`} style={{ cursor:"pointer" }} onClick={() => setStateFilter(s.id)}>
                <div className="tdc-count">{stateCount(s.id)}</div>
                <div className="tdc-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="sup-filter-bar">
            <div className="admin-search" style={{ flex:1 }}>
              <input className="admin-search-input" placeholder="Rechercher (ref, sujet, client)…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div className="sup-state-tabs">
              {TICKET_STATES.map(s => (
                <button key={s.id} className={`sup-state-tab ${stateFilter === s.id ? "active" : ""}`} onClick={() => setStateFilter(s.id)}>{s.label}</button>
              ))}
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <div className="admin-empty"><div className="admin-empty-icon">⋯</div><p>Chargement…</p></div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty"><div className="admin-empty-icon">📭</div><p>Aucun ticket trouvé.</p></div>
          ) : (
            <div className="table-wrap">
              <table className="admin-table">
                <thead><tr>
                  <th>Réf.</th><th>Sujet</th><th>Client</th><th>Catégorie</th>
                  <th>Priorité</th><th>Statut</th><th>Date</th><th></th>
                </tr></thead>
                <tbody>
                  {filtered.map(tk => {
                    const stateInfo = TICKET_STATES.find(s => s.id === tk.status) || {};
                    const prioInfo  = TICKET_PRIORITIES.find(p => p.id === tk.priority) || {};
                    return (
                      <tr key={tk.id} style={{ cursor:"pointer" }} onClick={() => setDetail(tk)}>
                        <td data-label="Réf."><span className="ticket-ref-badge">{tk.reference || tk.ref}</span></td>
                        <td data-label="Sujet">
                          <div className="ticket-subject">{tk.subject}</div>
                          {tk.description && <div className="ticket-preview">{tk.description}</div>}
                        </td>
                        <td data-label="Client">
                          <div style={{ fontWeight:500, fontSize:13 }}>{tk.name}</div>
                          <div style={{ fontSize:11, color:"var(--text-3)" }}>{tk.email}</div>
                        </td>
                        <td data-label="Catégorie"><span className="fb-cat-chip">{TICKET_CAT_LABELS[tk.category] || tk.category || "—"}</span></td>
                        <td data-label="Priorité"><span className={`ticket-prio-chip ${prioInfo.cls}`}>{prioInfo.label || tk.priority}</span></td>
                        <td data-label="Statut"><span className={`ticket-state-chip ${stateInfo.cls}`}>{stateInfo.label || tk.status}</span></td>
                        <td style={{ fontSize:11, color:"var(--text-3)" }} data-label="Date">{tk.created_at ? new Date(tk.created_at).toLocaleDateString("fr-DZ") : "—"}</td>
                        <td data-label="">
                          <div className="row-actions">
                            <button className="btn-icon" title="Ouvrir" onClick={e => { e.stopPropagation(); setDetail(tk); }}>
                              <SvgIcon d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ── FEEDBACK TAB ─────────────────────────────── */}
      {tab === "feedback" && (
        <>
          <div className="fb-summary-grid">
            <div className="fb-summary-card">
              <div className="fb-summary-val">{avgRating}</div>
              <div className="fb-summary-label">Note moyenne / 5</div>
            </div>
            <div className="fb-summary-card">
              <div className="fb-summary-val">{feedback.length}</div>
              <div className="fb-summary-label">Total avis reçus</div>
            </div>
            <div className="fb-summary-card" style={{ textAlign:"left" }}>
              {ratingDist.map(({ star, count }) => (
                <div key={star} className="fb-star-bar">
                  <span className="fb-star-count">{star}</span>
                  <div className="fb-star-track">
                    <div className="fb-star-fill" style={{ width: feedback.length ? `${(count/feedback.length)*100}%` : "0%" }} />
                  </div>
                  <span className="fb-star-pct">{feedback.length ? Math.round((count/feedback.length)*100) : 0}%</span>
                </div>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="admin-empty"><div className="admin-empty-icon">⋯</div><p>Chargement…</p></div>
          ) : feedback.length === 0 ? (
            <div className="admin-empty"><div className="admin-empty-icon">💬</div><p>Aucun avis reçu.</p><span>Les retours clients apparaîtront ici.</span></div>
          ) : (
            <div className="table-wrap">
              <table className="admin-table">
                <thead><tr>
                  <th>Note</th><th>Catégorie</th><th>Commentaire</th><th>Date</th>
                </tr></thead>
                <tbody>
                  {feedback.map((fb, i) => (
                    <tr key={fb.id || i}>
                      <td><span className="fb-stars">{"★".repeat(fb.rating || 0)}{"☆".repeat(5 - (fb.rating||0))}</span></td>
                      <td>{fb.category ? <span className="fb-cat-chip">{fb.category}</span> : "—"}</td>
                      <td><div className="fb-comment-cell">{fb.comment || "—"}</div></td>
                      <td style={{ fontSize:11, color:"var(--text-3)" }}>{fb.created_at ? new Date(fb.created_at).toLocaleDateString("fr-DZ") : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Ticket detail modal */}
      {detail && (
        <TicketDetail
          ticket={detail}
          agents={agents}
          onClose={() => setDetail(null)}
          onSave={updated => {
            setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
            setDetail(null);
          }}
        />
      )}
    </div>
  );
};

/* ============================================================
   EXCHANGES
   ============================================================ */
const EXCHANGE_STATUS_LABELS = {
  requested:  'En attente',
  accepted:   'En cours',
  rejected:   'Rejeté',
  completed:  'Finalisé',
  cancelled:  'Annulé',
};
const EXCHANGE_STATUS_COLORS = {
  requested:  '#f59e0b',
  accepted:   '#3b82f6',
  rejected:   '#ef4444',
  completed:  '#10b981',
  cancelled:  '#6b7280',
};

const ExchangeStatusBadge = ({ status }) => (
  <span style={{
    display:'inline-block', padding:'2px 10px', borderRadius:999, fontSize:12, fontWeight:600,
    background: (EXCHANGE_STATUS_COLORS[status] || '#6b7280') + '22',
    color: EXCHANGE_STATUS_COLORS[status] || '#6b7280',
  }}>{EXCHANGE_STATUS_LABELS[status] || status}</span>
);

const clientName = (ex) => ex.user?.name || ex.order?.guest_name || '—';
const clientPhone = (ex) => ex.user?.phone || ex.order?.guest_phone || null;

const ExchangeDetail = ({ exchange: initial, onClose, onUpdated }) => {
  const toast = useToast();
  const [ex, setEx] = useState(initial);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(true);

  useEffect(() => {
    setDetailLoading(true);
    latinaApi.admin.get(`/exchanges/${initial.id}`)
      .then(res => { setEx(res); setDetailLoading(false); })
      .catch(e => {
        toast(e?.message || 'Impossible de charger le détail.', 'err');
        setDetailLoading(false);
      });
  }, [initial.id]);

  const act = async (action) => {
    if (action === 'cancel' && !confirm('Annuler cet échange ?')) return;
    setLoading(true);
    try {
      const updated = await latinaApi.admin.post(`/exchanges/${ex.id}/${action}`, { note });
      setEx(updated);
      onUpdated(updated);
      const msgs = { complete: 'Échange finalisé. Stock mis à jour.', cancel: 'Échange annulé.' };
      toast(msgs[action] || 'Opération effectuée.', 'ok');
    } catch (e) {
      toast(e?.message || 'Erreur.', 'err');
    } finally { setLoading(false); }
  };

  const lines = ex.lines || [];
  const phone = clientPhone(ex);

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-md" onClick={e => e.stopPropagation()}>
        <div className="admin-modal-head">
          <div>
            <div className="admin-modal-title">Échange #{ex.id}</div>
            <div className="text-mute" style={{fontSize:12,marginTop:2}}>
              Commande <span className="mono">{ex.order?.reference || '—'}</span>
            </div>
          </div>
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        {detailLoading ? (
          <div className="admin-loading"><div className="admin-spinner"/></div>
        ) : (
          <div style={{padding:'0 20px 20px'}}>
            {/* Info strip */}
            <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}>
              <div className="admin-card" style={{flex:1,minWidth:180,padding:'10px 14px'}}>
                <div className="text-mute" style={{fontSize:11,marginBottom:3}}>CLIENT</div>
                <div style={{fontWeight:500}}>{clientName(ex)}</div>
                {phone && <div className="text-mute mono" style={{fontSize:12}}>{phone}</div>}
              </div>
              <div className="admin-card" style={{flex:1,minWidth:140,padding:'10px 14px'}}>
                <div className="text-mute" style={{fontSize:11,marginBottom:3}}>STATUT</div>
                <ExchangeStatusBadge status={ex.status} />
              </div>
              {ex.processed_by && (
                <div className="admin-card" style={{flex:1,minWidth:140,padding:'10px 14px'}}>
                  <div className="text-mute" style={{fontSize:11,marginBottom:3}}>TRAITÉ PAR</div>
                  <div style={{fontSize:13}}>{ex.processed_by?.name || '—'}</div>
                </div>
              )}
            </div>

            {/* Reason */}
            <div className="admin-card" style={{padding:'10px 14px',marginBottom:12}}>
              <div className="text-mute" style={{fontSize:11,marginBottom:3}}>MOTIF</div>
              <div>{ex.reason}</div>
            </div>

            {ex.admin_note && (
              <div style={{background:'#f59e0b11',border:'1px solid #f59e0b44',borderRadius:8,padding:'10px 14px',marginBottom:12}}>
                <div className="text-mute" style={{fontSize:11,marginBottom:3}}>NOTE ADMIN</div>
                <div>{ex.admin_note}</div>
              </div>
            )}

            {/* Lines table */}
            <div style={{fontWeight:600,fontSize:13,marginBottom:8}}>Articles concernés</div>
            <div className="admin-table-wrap" style={{marginBottom:16}}>
              <table className="admin-table">
                <thead>
                  <tr><th>Produit</th><th>Ancienne taille/couleur</th><th>Nouvelle taille/couleur</th><th>Qté</th></tr>
                </thead>
                <tbody>
                  {lines.length === 0 && (
                    <tr><td colSpan={4} style={{textAlign:'center',color:'var(--text-muted)'}}>—</td></tr>
                  )}
                  {lines.map(l => (
                    <tr key={l.id}>
                      <td>{l.product?.name_fr || l.order_line?.product_name || '—'}</td>
                      <td className="mono text-mute">
                        {l.old_variant
                          ? [l.old_variant.size, l.old_variant.color].filter(Boolean).join(' · ') || '—'
                          : '—'}
                      </td>
                      <td className="mono">
                        {[l.new_size, l.new_color].filter(Boolean).join(' · ') || <span className="text-mute">—</span>}
                      </td>
                      <td>{l.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Actions */}
            {ex.status === 'accepted' && (
              <div style={{display:'flex',flexDirection:'column',gap:10}}>
                <div style={{background:'#3b82f611',border:'1px solid #3b82f644',borderRadius:8,padding:'10px 14px',fontSize:13}}>
                  <strong>En cours.</strong> Envoyez la pièce de remplacement au client, récupérez l'ancienne,
                  puis cliquez sur <strong>Finaliser</strong>. Le stock sera automatiquement mis à jour.
                </div>
                <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                  <button className="btn btn-primary" disabled={loading} onClick={() => act('complete')}>
                    {loading ? '…' : '✓ Finaliser l\'échange'}
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    style={{borderColor:'#ef4444',color:'#ef4444'}}
                    disabled={loading}
                    onClick={() => act('cancel')}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            )}

            {ex.status === 'completed' && (
              <div style={{background:'#10b98111',border:'1px solid #10b98144',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#10b981'}}>
                ✓ Échange finalisé. Stock mis à jour automatiquement.
              </div>
            )}

            {ex.status === 'cancelled' && (
              <div style={{background:'#6b728011',border:'1px solid #6b728044',borderRadius:8,padding:'10px 14px',fontSize:13,color:'#6b7280'}}>
                ✕ Échange annulé.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Exchanges = () => {
  const { t } = useLang();
  const toast = useToast();
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [loadErr, setLoadErr]     = useState('');
  const [statusFilter, setStatus] = useState('');
  const [detail, setDetail]       = useState(null);
  const [page, setPage]           = useState(1);
  const [meta, setMeta]           = useState({});

  const load = useCallback(async (p = 1, s = statusFilter) => {
    setLoading(true); setLoadErr('');
    try {
      const params = new URLSearchParams({ page: p });
      if (s) params.set('status', s);
      const res = await latinaApi.admin.get(`/exchanges?${params}`);
      // res is the raw JSON — Laravel paginator: { data: [...], current_page, last_page, total }
      setExchanges(res.data || []);
      setMeta({ last_page: res.last_page || 1, current_page: res.current_page || 1, total: res.total || 0 });
      setPage(res.current_page || 1);
    } catch (e) {
      setLoadErr(e?.message || 'Erreur lors du chargement des échanges.');
    } finally { setLoading(false); }
  }, [statusFilter]);

  useEffect(() => { load(1, statusFilter); }, [statusFilter]);

  const STATUS_FILTERS = [
    { val: '',          label: 'Tous' },
    { val: 'accepted',  label: 'En cours' },
    { val: 'completed', label: 'Finalisés' },
    { val: 'cancelled', label: 'Annulés' },
  ];

  return (
    <div>
      <div className="admin-toolbar">
        <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
          {STATUS_FILTERS.map(f => (
            <button
              key={f.val}
              className={`btn btn-sm ${statusFilter === f.val ? 'btn-primary' : 'btn-ghost'}`}
              onClick={() => setStatus(f.val)}
            >{f.label}</button>
          ))}
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => load(page)}>↺ Actualiser</button>
      </div>

      {loadErr && (
        <div style={{background:'#ef444411',border:'1px solid #ef444444',borderRadius:8,padding:'12px 16px',marginBottom:12,fontSize:13,color:'#ef4444'}}>
          Erreur : {loadErr} — <button className="btn btn-ghost btn-sm" onClick={() => load(page)}>Réessayer</button>
        </div>
      )}

      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th><th>Commande</th><th>Client</th><th>Motif</th><th>Statut</th><th>Date</th><th style={{width:100}}></th>
                </tr>
              </thead>
              <tbody>
                {exchanges.length === 0 && !loadErr && (
                  <tr><td colSpan={7}>
                    <div className="admin-empty">
                      <div className="admin-empty-icon">🔄</div>
                      <div className="admin-empty-title">Aucun échange</div>
                      <div className="admin-empty-sub">Les échanges initiés depuis les commandes apparaîtront ici</div>
                    </div>
                  </td></tr>
                )}
                {exchanges.map(ex => (
                  <tr key={ex.id} className="clickable" onClick={() => setDetail(ex)}>
                    <td className="mono" data-label="#">{ex.id}</td>
                    <td className="mono" data-label="Commande">{ex.order?.reference || '—'}</td>
                    <td data-label="Client">{clientName(ex)}</td>
                    <td data-label="Motif" style={{maxWidth:200,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                      {ex.reason}
                    </td>
                    <td data-label="Statut"><ExchangeStatusBadge status={ex.status} /></td>
                    <td className="text-mute" data-label="Date">{new Date(ex.created_at).toLocaleDateString('fr-DZ')}</td>
                    <td>
                      <div className="row-actions">
                        <button className="btn btn-ghost btn-sm" onClick={e => {e.stopPropagation();setDetail(ex);}}>Ouvrir</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {meta.last_page > 1 && (
          <div style={{display:'flex',justifyContent:'center',gap:8,padding:'12px 0'}}>
            <button className="btn btn-ghost btn-sm" disabled={page <= 1} onClick={() => load(page-1)}>←</button>
            <span style={{lineHeight:'32px',fontSize:13}}>{page} / {meta.last_page} ({meta.total} total)</span>
            <button className="btn btn-ghost btn-sm" disabled={page >= meta.last_page} onClick={() => load(page+1)}>→</button>
          </div>
        )}
      </div>

      {detail && (
        <ExchangeDetail
          exchange={detail}
          onClose={() => setDetail(null)}
          onUpdated={updated => {
            setExchanges(prev => prev.map(e => e.id === updated.id ? { ...e, ...updated } : e));
            setDetail(prev => prev ? { ...prev, ...updated } : null);
          }}
        />
      )}
    </div>
  );
};

/* ============================================================
   PACKS — التنسيقات
   ============================================================ */
const Packs = () => {
  const { t } = useLang();
  const toast = useToast();
  const [packs, setPacks]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(null); // null | {} (new) | pack (edit)
  const [saving, setSaving]     = useState(false);
  const [productSearch, setProductSearch] = useState("");
  const [productResults, setProductResults] = useState([]);
  const [searchLoading, setSearchLoading]   = useState(false);

  const emptyForm = { name_fr:"", name_ar:"", name_en:"", description_fr:"", description_ar:"",
    price:"", compare_price:"", is_active:false, sort_order:0, items:[] };
  const [form, setForm] = useState(emptyForm);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const load = async () => {
    setLoading(true);
    try { const r = await latinaApi.admin.get("/packs"); setPacks(Array.isArray(r) ? r : r.data || []); }
    catch { toast("Erreur chargement", "err"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const searchProducts = async (q) => {
    if (!q.trim()) { setProductResults([]); return; }
    setSearchLoading(true);
    try {
      const r = await latinaApi.admin.get(`/products?search=${encodeURIComponent(q)}&per_page=10`);
      setProductResults(Array.isArray(r) ? r : r.data || []);
    } catch { setProductResults([]); }
    finally { setSearchLoading(false); }
  };

  useEffect(() => {
    const id = setTimeout(() => searchProducts(productSearch), 350);
    return () => clearTimeout(id);
  }, [productSearch]);

  const addItemToForm = (product) => {
    if (form.items.find(i => i.product_id === product.id)) return;
    set("items", [...form.items, { product_id: product.id, quantity: 1, _name: product.name_fr, _price: product.price, _img: product.primary_image?.url }]);
    setProductSearch("");
    setProductResults([]);
  };

  const removeItem = (pid) => set("items", form.items.filter(i => i.product_id !== pid));
  const setItemQty = (pid, qty) => set("items", form.items.map(i => i.product_id === pid ? { ...i, quantity: Number(qty) } : i));

  const openNew  = () => { setForm(emptyForm); setModal({}); };
  const openEdit = (p) => {
    setForm({
      name_fr: p.name_fr, name_ar: p.name_ar, name_en: p.name_en || "",
      description_fr: p.description_fr || "", description_ar: p.description_ar || "",
      price: p.price, compare_price: p.compare_price || "",
      is_active: p.is_active, sort_order: p.sort_order || 0,
      items: (p.items || []).map(i => ({
        product_id: i.product_id, quantity: i.quantity,
        _name: i.product?.name_fr, _price: i.product?.price,
        _img: i.product?.primary_image?.url,
      })),
    });
    setModal(p);
  };

  const save = async () => {
    if (!form.name_fr || !form.name_ar || !form.price) { toast("Nom (FR+AR) et prix requis", "err"); return; }
    if (!form.items.length) { toast("Ajoutez au moins un produit", "err"); return; }
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), compare_price: form.compare_price ? Number(form.compare_price) : null,
        items: form.items.map(i => ({ product_id: i.product_id, quantity: i.quantity })) };
      if (modal?.id) await latinaApi.admin.put(`/packs/${modal.id}`, payload);
      else           await latinaApi.admin.post("/packs", payload);
      toast(modal?.id ? "Pack mis à jour" : "Pack créé", "ok");
      setModal(null); load();
    } catch (e) { toast(e.message || "Erreur", "err"); }
    finally { setSaving(false); }
  };

  const toggle = async (pack) => {
    try {
      await latinaApi.admin.post(`/packs/${pack.id}/toggle`, {});
      setPacks(ps => ps.map(p => p.id === pack.id ? { ...p, is_active: !p.is_active } : p));
      toast(pack.is_active ? "Pack désactivé" : "Pack activé", "ok");
    } catch { toast("Erreur", "err"); }
  };

  const destroy = async (id) => {
    if (!confirm("Supprimer ce pack ?")) return;
    try { await latinaApi.admin.delete(`/packs/${id}`); toast("Supprimé", "ok"); load(); }
    catch { toast("Erreur", "err"); }
  };

  const totalProductPrice = form.items.reduce((s, i) => s + (i._price || 0) * i.quantity, 0);

  return (
    <div>
      <div className="admin-toolbar">
        <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>التنسيقات / Packs</h2>
        <button className="btn btn-rose ml-auto" onClick={openNew}>+ Nouveau pack</button>
      </div>

      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          packs.length === 0
            ? <div style={{ padding: 40, textAlign: "center", color: "#8A7464" }}>Aucun pack. Créez le premier.</div>
            : <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Pack</th><th>Produits</th><th>Prix pack</th><th>Économie</th><th>Statut</th><th style={{ width: 100 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {packs.map(p => {
                      const savings = p.compare_price ? p.compare_price - p.price : 0;
                      return (
                        <tr key={p.id}>
                          <td className="t-name" data-label="Pack">
                            <div style={{ fontWeight: 600 }}>{p.name_fr}</div>
                            <div style={{ fontSize: 12, color: "#8A7464" }}>{p.name_ar}</div>
                          </td>
                          <td data-label="Produits">
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                              {(p.items || []).map(item => (
                                <span key={item.id} style={{ fontSize: 12, background: "var(--cream-200)", borderRadius: 4, padding: "2px 6px" }}>
                                  {item.product?.name_fr || `P${item.product_id}`} ×{item.quantity}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="mono text-rose" data-label="Prix">{(p.price||0).toLocaleString("fr-DZ")} DA</td>
                          <td className="mono" data-label="Économie" style={{ color: savings > 0 ? "#16a34a" : "var(--ink-mute)" }}>
                            {savings > 0 ? `-${savings.toLocaleString("fr-DZ")} DA` : "—"}
                          </td>
                          <td data-label="Statut">
                            <button
                              className={`badge ${p.is_active ? "badge-active" : "badge-inactive"}`}
                              onClick={() => toggle(p)}
                              style={{ cursor: "pointer", border: "none", fontFamily: "inherit" }}
                            >
                              {p.is_active ? "Actif" : "Inactif"}
                            </button>
                          </td>
                          <td data-label="">
                            <div className="row-actions">
                              <button className="btn btn-ghost btn-sm" onClick={() => openEdit(p)} title="Modifier">✏️</button>
                              <button className="btn btn-ghost btn-sm" onClick={() => destroy(p.id)} title="Supprimer">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
        )}
      </div>

      {/* ── Create / Edit modal ── */}
      {modal !== null && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" style={{ maxWidth: 680 }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <span className="admin-modal-title">{modal?.id ? "Modifier le pack" : "Nouveau pack"}</span>
              <button className="admin-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="admin-modal-body" style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Names */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label className="admin-label">Nom FR *
                  <input className="admin-input" value={form.name_fr} onChange={e => set("name_fr", e.target.value)} placeholder="Pack Soirée" />
                </label>
                <label className="admin-label" dir="rtl">الاسم AR *
                  <input className="admin-input" value={form.name_ar} onChange={e => set("name_ar", e.target.value)} placeholder="تنسيق السهرة" />
                </label>
              </div>

              {/* Descriptions */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <label className="admin-label">Description FR
                  <textarea className="admin-input" rows={2} value={form.description_fr} onChange={e => set("description_fr", e.target.value)} placeholder="Escarpins + Sac assorti..." style={{ resize: "vertical" }} />
                </label>
                <label className="admin-label" dir="rtl">الوصف AR
                  <textarea className="admin-input" rows={2} value={form.description_ar} onChange={e => set("description_ar", e.target.value)} style={{ resize: "vertical" }} />
                </label>
              </div>

              {/* Prices */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                <label className="admin-label">Prix du pack (DA) *
                  <input className="admin-input mono" type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="15000" />
                </label>
                <label className="admin-label">Prix barré (DA)
                  <input className="admin-input mono" type="number" value={form.compare_price} onChange={e => set("compare_price", e.target.value)} placeholder={totalProductPrice || "18000"} />
                  {totalProductPrice > 0 && <span style={{ fontSize: 11, color: "#8A7464" }}>Total produits: {totalProductPrice.toLocaleString()} DA</span>}
                </label>
                <label className="admin-label">Ordre d'affichage
                  <input className="admin-input mono" type="number" min={0} value={form.sort_order} onChange={e => set("sort_order", e.target.value)} />
                </label>
              </div>

              {/* Product picker */}
              <div>
                <div className="admin-label" style={{ marginBottom: 6 }}>Produits du pack *</div>
                <div style={{ position: "relative" }}>
                  <input
                    className="admin-input"
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    placeholder="Rechercher un produit à ajouter…"
                  />
                  {(productResults.length > 0 || searchLoading) && (
                    <div style={{ position: "absolute", zIndex: 50, top: "100%", left: 0, right: 0, background: "#fff", border: "1px solid var(--cream-300)", borderRadius: 8, boxShadow: "0 4px 16px rgba(0,0,0,.1)", maxHeight: 220, overflowY: "auto" }}>
                      {searchLoading && <div style={{ padding: "10px 14px", color: "#8A7464", fontSize: 13 }}>Recherche…</div>}
                      {productResults.map(p => (
                        <div
                          key={p.id}
                          onClick={() => addItemToForm(p)}
                          style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 14px", cursor: "pointer", borderBottom: "1px solid var(--cream-200)" }}
                          onMouseEnter={e => e.currentTarget.style.background = "var(--cream-100)"}
                          onMouseLeave={e => e.currentTarget.style.background = ""}
                        >
                          {p.primary_image?.url && <img src={window.mediaUrl?.(p.primary_image.url) || p.primary_image.url} style={{ width: 32, height: 32, objectFit: "cover", borderRadius: 4 }} />}
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 13 }}>{p.name_fr}</div>
                            <div style={{ fontSize: 11, color: "#8A7464" }}>{(p.price||0).toLocaleString()} DA · SKU {p.sku}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected items */}
                {form.items.length > 0 && (
                  <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                    {form.items.map(item => (
                      <div key={item.product_id} style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--cream-100)", borderRadius: 8, padding: "6px 12px" }}>
                        {item._img && <img src={window.mediaUrl?.(item._img) || item._img} style={{ width: 36, height: 36, objectFit: "cover", borderRadius: 4 }} />}
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 13 }}>{item._name}</div>
                          <div style={{ fontSize: 11, color: "#8A7464" }}>{(item._price||0).toLocaleString()} DA / unité</div>
                        </div>
                        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}>
                          Qté
                          <input type="number" min={1} max={10} value={item.quantity}
                            onChange={e => setItemQty(item.product_id, e.target.value)}
                            style={{ width: 52, padding: "4px 8px", border: "1px solid var(--cream-300)", borderRadius: 6, fontFamily: "inherit", textAlign: "center" }} />
                        </label>
                        <button onClick={() => removeItem(item.product_id)} style={{ background: "none", border: "none", cursor: "pointer", color: "#8A7464", fontSize: 16 }}>✕</button>
                      </div>
                    ))}
                    <div style={{ fontSize: 12, color: "#8A7464", textAlign: "right" }}>
                      Total produits individuels: <strong>{totalProductPrice.toLocaleString()} DA</strong>
                      {form.price && Number(form.price) < totalProductPrice && (
                        <span style={{ color: "#16a34a", marginLeft: 8 }}>→ économie de {(totalProductPrice - Number(form.price)).toLocaleString()} DA</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Active toggle */}
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
                <input type="checkbox" checked={form.is_active} onChange={e => set("is_active", e.target.checked)} style={{ width: 16, height: 16, accentColor: "var(--rose-500)" }} />
                <span style={{ fontWeight: 600 }}>Activer immédiatement (visible côté client)</span>
              </label>
            </div>
            <div className="admin-modal-foot">
              <button className="btn btn-ghost" onClick={() => setModal(null)}>Annuler</button>
              <button className="btn btn-rose" onClick={save} disabled={saving}>{saving ? "Enregistrement…" : (modal?.id ? "Mettre à jour" : "Créer le pack")}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PAGE_TITLES_FR = {
  dashboard: "Dashboard", products: "Produits", categories: "Catégories",
  orders: "Commandes", reservations: "Réservations", customers: "Clients", coupons: "Coupons",
  flash_sales: "Flash Sales", contests: "Concours", packs: "Packs / التنسيقات",
  inventory: "Inventaire", team: "Équipe",
  reports: "Rapports", audit: "Journal d'audit",
  support: "Support & Tickets",
  exchanges: "Échanges",
};
const getPageTitle = (pageId, t) => t(PAGE_TITLES_FR[pageId] || pageId);

const PAGE_COMPONENTS = {
  dashboard: Dashboard, products: Products, categories: Categories,
  orders: Orders, reservations: Reservations, customers: Customers, coupons: Coupons,
  flash_sales: FlashSales, contests: Contests, packs: Packs,
  inventory: Inventory, team: Team,
  reports: Reports, audit: Audit,
  support: Support,
  exchanges: Exchanges,
};

/* ============================================================
   NOTIFICATION BELL
   ============================================================ */
const NotificationBell = () => {
  const [notifs, setNotifs]     = useState([]);
  const [unread, setUnread]     = useState(0);
  const [open, setOpen]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const ref                     = useRef(null);

  const load = useCallback(async () => {
    try {
      const res = await latinaApi.admin.get("/notifications");
      const data = res.data || [];
      setNotifs(Array.isArray(data) ? data : []);
      setUnread(res.unread_count ?? (Array.isArray(data) ? data.filter(n => !n.is_read).length : 0));
    } catch {}
  }, []);

  useEffect(() => {
    load();
    const iv = setInterval(load, 30000);
    return () => clearInterval(iv);
  }, [load]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const markRead = async (id) => {
    try {
      await latinaApi.admin.post(`/notifications/${id}/read`);
      setNotifs(prev => prev.map(n => n.id === id ? { ...n, is_read: true } : n));
      setUnread(u => Math.max(0, u - 1));
    } catch {}
  };

  const markAllRead = async () => {
    setLoading(true);
    try {
      await latinaApi.admin.post("/notifications/read-all");
      setNotifs(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnread(0);
    } catch {}
    finally { setLoading(false); }
  };

  const fmtTime = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    const now = new Date();
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60)    return "À l'instant";
    if (diff < 3600)  return `Il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)} h`;
    return d.toLocaleDateString("fr-DZ");
  };

  return (
    <div className="notif-bell-wrap" ref={ref}>
      <button className="notif-bell-btn" onClick={() => setOpen(o => !o)} title="Notifications">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        {unread > 0 && <span className="notif-badge">{unread > 9 ? "9+" : unread}</span>}
      </button>

      {open && (
        <div className="notif-dropdown">
          <div className="notif-head">
            <span>Notifications</span>
            {unread > 0 && (
              <button className="notif-mark-all" onClick={markAllRead} disabled={loading}>
                {loading ? "…" : "Tout lire"}
              </button>
            )}
          </div>
          <div className="notif-list">
            {notifs.length === 0 ? (
              <div className="notif-empty">Aucune notification</div>
            ) : notifs.map(n => (
              <div
                key={n.id}
                className={`notif-item notif-type-${n.type || "info"} ${n.is_read ? "read" : "unread"}`}
                onClick={() => !n.is_read && markRead(n.id)}
              >
                <div className="notif-item-title">{n.title}</div>
                {n.body && <div className="notif-item-body">{n.body}</div>}
                <div className="notif-item-time">{fmtTime(n.created_at)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   COMMAND PALETTE  (Ctrl+K)
   ============================================================ */
const CommandPalette = ({ admin, onNavigate, onClose }) => {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const allowedPages = getAllowedPages(admin);

  // Build the full command list from accessible pages
  const ALL_COMMANDS = NAV_ITEMS
    .filter(item => allowedPages === null || allowedPages.includes(item.id))
    .map(item => ({ type: "page", id: item.id, label: PAGE_TITLES_FR[item.id] || item.label, icon: item.icon, section: item.section }));

  const filtered = query.trim()
    ? ALL_COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
    : ALL_COMMANDS;

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setCursor(0); }, [query]);

  const select = (cmd) => { onNavigate(cmd.id); onClose(); };

  const onKey = (e) => {
    if (e.key === "ArrowDown")  { e.preventDefault(); setCursor(c => Math.min(c + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")    { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
    if (e.key === "Enter")      { if (filtered[cursor]) select(filtered[cursor]); }
    if (e.key === "Escape")     { onClose(); }
  };

  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-palette" onClick={e => e.stopPropagation()} onKeyDown={onKey}>
        <div className="cmd-search-wrap">
          <svg className="cmd-search-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input
            ref={inputRef}
            className="cmd-input"
            placeholder="Rechercher une page ou une action…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <kbd className="cmd-esc">Esc</kbd>
        </div>
        <div className="cmd-results">
          {filtered.length === 0 ? (
            <div className="cmd-empty">Aucun résultat pour « {query} »</div>
          ) : filtered.map((cmd, i) => (
            <button
              key={cmd.id}
              className={`cmd-item ${i === cursor ? "active" : ""}`}
              onClick={() => select(cmd)}
              onMouseEnter={() => setCursor(i)}
            >
              <span className="cmd-item-icon">{cmd.icon}</span>
              <span className="cmd-item-label">{cmd.label}</span>
              {cmd.section && <span className="cmd-item-section">{cmd.section}</span>}
              <kbd className="cmd-item-enter">↵</kbd>
            </button>
          ))}
        </div>
        <div className="cmd-footer">
          <span><kbd>↑↓</kbd> naviguer</span>
          <span><kbd>↵</kbd> ouvrir</span>
          <span><kbd>Esc</kbd> fermer</span>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ROOT APP
   ============================================================ */
const AdminApp = () => {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem("latina-admin-user") || "null"); } catch { return null; }
  });
  const [page, setPage] = useState("dashboard");
  const [theme, setTheme] = useState(() => localStorage.getItem("latina-admin-theme") || "dark");
  const [cmdOpen, setCmdOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(t => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("latina-admin-theme", next);
      return next;
    });
  };

  const loadRoleSettings = async () => {
    try {
      const data = await latinaApi.admin.get("/roles/settings");
      const list = Array.isArray(data) ? data : (data.data || []);
      applyRoleSettings(list);
    } catch {}
  };

  const handleLogin = (adminUser) => {
    setAdmin(adminUser);
    localStorage.setItem("latina-admin-user", JSON.stringify(adminUser));
    loadRoleSettings();
  };

  const handleLogout = async () => {
    try { await latinaApi.admin.post("/logout"); } catch {}
    setAdmin(null);
    localStorage.removeItem("latina-admin-user");
    localStorage.removeItem("latina-admin-token");
  };

  /* Guard: if the current page is not allowed for this role, bounce to dashboard */
  const safePage = (id) => {
    if (canAccess(admin, id)) setPage(id);
    else setPage("dashboard");
  };

  /* Ctrl+K → open command palette, intercept before browser */
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        e.stopPropagation();
        setCmdOpen(o => !o);
      }
    };
    window.addEventListener("keydown", handler, true); // capture phase beats browser
    return () => window.removeEventListener("keydown", handler, true);
  }, []);

  /* Load role settings on mount when already authenticated */
  useEffect(() => { if (admin) loadRoleSettings(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Verify token on mount and refresh admin object (roles may have changed) */
  useEffect(() => {
    if (!admin) return;
    latinaApi.admin.get("/me")
      .then(res => {
        const fresh = res.data || res;
        if (fresh?.id) {
          const updated = { ...admin, ...fresh };
          setAdmin(updated);
          localStorage.setItem("latina-admin-user", JSON.stringify(updated));
        }
      })
      .catch(() => {
        setAdmin(null);
        localStorage.removeItem("latina-admin-user");
        localStorage.removeItem("latina-admin-token");
      });
  }, []);

  /* If role changes and current page is now forbidden, reset */
  useEffect(() => {
    if (admin && !canAccess(admin, page)) setPage("dashboard");
  }, [admin]);

  if (!admin) {
    return (
      <LangProvider>
        <ToastProvider>
          <AdminLogin onLogin={handleLogin} />
        </ToastProvider>
      </LangProvider>
    );
  }

  const PageComp = PAGE_COMPONENTS[page] || Dashboard;

  return (
    <LangProvider>
      <AdminCtx.Provider value={{ admin, theme }}>
        <ToastProvider>
          <AdminAppInner
            admin={admin} theme={theme} page={page} safePage={safePage}
            mobileNavOpen={mobileNavOpen} setMobileNavOpen={setMobileNavOpen}
            handleLogout={handleLogout} toggleTheme={toggleTheme}
            cmdOpen={cmdOpen} setCmdOpen={setCmdOpen} PageComp={PageComp}
          />
        </ToastProvider>
      </AdminCtx.Provider>
    </LangProvider>
  );
};

const AdminAppInner = ({ admin, theme, page, safePage, mobileNavOpen, setMobileNavOpen, handleLogout, toggleTheme, cmdOpen, setCmdOpen, PageComp }) => {
  const { t, lang } = useLang();
  return (
    <>
      <div className={`admin-layout${theme === "light" ? " theme-light" : ""}`}>
        <Sidebar
          page={page}
          setPage={safePage}
          admin={admin}
          onLogout={handleLogout}
          mobileOpen={mobileNavOpen}
          onMobileClose={() => setMobileNavOpen(false)}
        />
        <MobileBottomNav
          page={page}
          setPage={safePage}
          admin={admin}
          onMoreClick={() => setMobileNavOpen(v => !v)}
        />
        <div className="admin-main">
          <div className="admin-topbar">
            <div className="at-left">
              <button
                className="at-mobile-menu-btn"
                onClick={() => setMobileNavOpen(v => !v)}
                aria-label="Menu"
              >
                <span /><span /><span />
              </button>
              <div className="at-breadcrumb">
                <span>Latina Admin</span>
                <span className="sep">/</span>
                <span className="at-title">{getPageTitle(page, t)}</span>
              </div>
            </div>
            <div className="at-actions">
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                title={t(theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre")}
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
              <NotificationBell />
              <div className="at-search-hint" title={t('Recherche')} onClick={() => setCmdOpen(true)} style={{cursor:"pointer"}}>
                <span>{t('Recherche')}</span>
                <span className="at-kbd">Ctrl K</span>
              </div>
              <span className="at-date">{new Date().toLocaleDateString(lang === 'ar' ? 'ar-DZ' : 'fr-DZ', {weekday:"short", day:"numeric", month:"short", year:"numeric"})}</span>
            </div>
          </div>
          <div className="admin-content">
            <PageComp admin={admin} />
          </div>
        </div>
      </div>

      {cmdOpen && (
        <CommandPalette
          admin={admin}
          onNavigate={safePage}
          onClose={() => setCmdOpen(false)}
        />
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("admin-root")).render(<AdminApp />);
