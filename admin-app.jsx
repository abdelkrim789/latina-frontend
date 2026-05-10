/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback, useMemo } = React;
const latinaApi = window.latinaApi;

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
      setError(e.message || "Identifiants incorrects");
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
            <div className="al-sub">TABLEAU DE BORD</div>
          </div>
        </div>
        <form className="al-form" onSubmit={submit}>
          <div className="al-field">
            <label>Email</label>
            <input type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required placeholder="admin@latina.dz" />
          </div>
          <div className="al-field">
            <label>Mot de passe</label>
            <input type="password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} required />
          </div>
          {error && <div className="al-err">{error}</div>}
          <button type="submit" className="al-btn" disabled={loading}>
            {loading ? <span className="admin-spinner" style={{width:16,height:16}} /> : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
};

/* ============================================================
   SIDEBAR
   ============================================================ */
const NAV_ITEMS = [
  { id: "dashboard", icon: "📊", label: "Dashboard", section: null },
  { id: "products", icon: "👟", label: "Produits", section: "CATALOGUE" },
  { id: "categories", icon: "🗂", label: "Catégories", section: null },
  { id: "orders", icon: "📦", label: "Commandes", section: "VENTES" },
  { id: "customers", icon: "👥", label: "Clients", section: null },
  { id: "coupons", icon: "🏷", label: "Coupons", section: "OFFRES" },
  { id: "flash_sales", icon: "⚡", label: "Flash Sales", section: null },
  { id: "contests", icon: "🏆", label: "Concours", section: null },
  { id: "inventory", icon: "🏭", label: "Inventaire", section: "GESTION" },
  { id: "team", icon: "🔐", label: "Équipe", section: null },
  { id: "reports", icon: "📈", label: "Rapports", section: null },
  { id: "audit", icon: "📋", label: "Audit", section: null },
];

const Sidebar = ({ page, setPage, admin, onLogout }) => {
  let lastSection = null;
  return (
    <aside className="admin-sidebar">
      <div className="sb-brand">
        <div className="sb-logo">L</div>
        <div>
          <div className="sb-title">Latina</div>
          <div className="sb-subtitle">ADMIN</div>
        </div>
      </div>
      <nav className="sb-nav">
        {NAV_ITEMS.map(item => {
          const showSection = item.section && item.section !== lastSection;
          if (item.section) lastSection = item.section;
          return (
            <React.Fragment key={item.id}>
              {showSection && <div className="sb-section">{item.section}</div>}
              <button
                className={`sb-item ${page === item.id ? "active" : ""}`}
                onClick={() => setPage(item.id)}
              >
                <span className="sb-icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </nav>
      <div className="sb-user">
        <div className="sb-avatar">{admin?.name?.[0] || "A"}</div>
        <div className="sb-user-info">
          <div className="sb-user-name">{admin?.name}</div>
          <div className="sb-user-role">{admin?.is_super ? "Super Admin" : admin?.roles?.[0] || "Admin"}</div>
        </div>
        <button className="sb-logout" title="Déconnexion" onClick={onLogout}>⎋</button>
      </div>
    </aside>
  );
};

/* ============================================================
   DASHBOARD
   ============================================================ */
const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      latinaApi.admin.get("/reports/sales").then(r => setStats(r.data || r)).catch(() => {}),
      latinaApi.admin.get("/orders?per_page=8&sort=created_at&dir=desc").then(r => setRecentOrders(r.data || [])).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  const S = stats || {};
  const statCards = [
    { label: "Chiffre d'affaires", val: S.revenue ? `${Number(S.revenue).toLocaleString()} DA` : "—", delta: S.revenue_delta, icon: "💰" },
    { label: "Commandes", val: S.orders_count ?? "—", delta: S.orders_delta, icon: "📦" },
    { label: "Clients", val: S.customers_count ?? "—", delta: S.customers_delta, icon: "👥" },
    { label: "Produits actifs", val: S.products_count ?? "—", delta: null, icon: "👟" },
  ];

  return (
    <div>
      <div className="stats-grid">
        {statCards.map((c, i) => (
          <div key={i} className="stat-card">
            <div className="sc-label">{c.label}</div>
            <div className="sc-val">{c.val}</div>
            {c.delta != null && (
              <div className={`sc-delta ${c.delta >= 0 ? "up" : "down"}`}>
                {c.delta >= 0 ? "▲" : "▼"} {Math.abs(c.delta)}% vs mois dernier
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="admin-card">
        <div className="ac-head"><span className="ac-title">Commandes récentes</span></div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Réf.</th><th>Client</th><th>Wilaya</th><th>Total</th><th>Statut</th><th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.length === 0 && (
                <tr><td colSpan={6} style={{textAlign:"center",padding:24,color:"var(--text-3)"}}>Aucune commande</td></tr>
              )}
              {recentOrders.map(o => (
                <tr key={o.id}>
                  <td className="mono">{o.reference}</td>
                  <td className="t-name">{o.recipient_name}</td>
                  <td>{o.wilaya?.name_fr || o.wilaya_code}</td>
                  <td className="mono">{Number(o.total).toLocaleString()} DA</td>
                  <td><span className={`badge badge-${o.status}`}>{o.status}</span></td>
                  <td className="text-mute">{new Date(o.created_at).toLocaleDateString("fr-DZ")}</td>
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
const ProductModal = ({ product, onClose, onSaved }) => {
  const toast = useToast();
  const [savedProductId, setSavedProductId] = useState(null);
  const effectiveId = product?.id || savedProductId;
  const isNew = !effectiveId;
  const [tab, setTab] = useState("info"); // "info" | "images"
  const [form, setForm] = useState({
    name_fr: product?.name_fr || "",
    name_ar: product?.name_ar || "",
    name_en: product?.name_en || "",
    description_fr: product?.description_fr || "",
    description_ar: product?.description_ar || "",
    price: product?.price || "",
    compare_price: product?.compare_price || "",
    category_id: product?.category_id || "",
    stock: product?.stock || 0,
    is_active: product?.is_active ?? true,
    is_featured: product?.is_featured ?? false,
    sku: product?.sku || "",
  });
  const [saving, setSaving] = useState(false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  // Variants state
  const [variants, setVariants] = useState([]);
  const [loadingVariants, setLoadingVariants] = useState(false);
  const [addingVariant, setAddingVariant] = useState(false);
  const [editingVariantId, setEditingVariantId] = useState(null);
  const emptyVForm = { color: "", size: "", stock: 0, price_adjustment: 0, is_active: true };
  const [vForm, setVForm] = useState(emptyVForm);
  const setV = (k, v) => setVForm(f => ({ ...f, [k]: v }));

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  useEffect(() => {
    if (product?.id) loadImages(product.id);
  }, []);

  const loadImages = async (pid) => {
    const id = pid ?? effectiveId;
    if (!id) return;
    try {
      const data = await latinaApi.admin.get(`/products/${id}/media`);
      setImages(Array.isArray(data) ? data : data.data || []);
    } catch {}
  };

  const loadVariants = async (pid) => {
    const id = pid ?? effectiveId;
    if (!id) return;
    setLoadingVariants(true);
    try {
      const data = await latinaApi.admin.get(`/products/${id}/variants`);
      setVariants(Array.isArray(data) ? data : data.data || []);
    } catch {}
    finally { setLoadingVariants(false); }
  };

  const saveVariant = async () => {
    const id = effectiveId;
    if (!id) return;
    try {
      if (editingVariantId) {
        const res = await latinaApi.admin.put(`/variants/${editingVariantId}`, vForm);
        setVariants(vs => vs.map(v => v.id === editingVariantId ? res : v));
        setEditingVariantId(null);
      } else {
        const res = await latinaApi.admin.post(`/products/${id}/variants`, vForm);
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
    setVForm({ color: v.color || "", size: v.size || "", stock: v.stock, price_adjustment: v.price_adjustment || 0, is_active: v.is_active });
  };

  const deleteVariant = async (variantId) => {
    if (!confirm("Supprimer cette variante ?")) return;
    try {
      await latinaApi.admin.delete(`/variants/${variantId}`);
      setVariants(vs => vs.filter(v => v.id !== variantId));
      toast("Variante supprimée", "ok");
    } catch (e) { toast(e.message || "Erreur", "err"); }
  };

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        compare_price: form.compare_price ? Number(form.compare_price) : null,
        stock: Number(form.stock),
        category_id: form.category_id ? Number(form.category_id) : null,
      };
      if (!product?.id) {
        const res = await latinaApi.admin.post("/products", payload);
        const newId = res.id || res.data?.id;
        setSavedProductId(newId);
        toast("Produit créé ! Ajoutez des images et variantes.", "ok");
        onSaved();
        if (newId) { setTab("images"); loadImages(newId); }
        else onClose();
      } else {
        await latinaApi.admin.put(`/products/${product.id}`, payload);
        toast("Produit enregistré", "ok");
        onSaved();
      }
    } catch (e) { toast(e.message || "Erreur", "err"); }
    finally { setSaving(false); }
  };

  const uploadImage = async (file) => {
    if (!effectiveId) { toast("Enregistrez d'abord le produit", "info"); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const token = localStorage.getItem("latina-admin-token");
      const API_ROOT = window.LATINA_API_BASE || "http://localhost:8000/api";
      const res = await fetch(`${API_ROOT}/admin/products/${effectiveId}/media`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur upload");
      toast("Image ajoutée", "ok");
      loadImages();
    } catch (e) { toast(e.message, "err"); }
    finally { setUploading(false); }
  };

  const deleteImage = async (mediaId) => {
    if (!confirm("Supprimer cette image ?")) return;
    try {
      await latinaApi.admin.delete(`/media/${mediaId}`);
      toast("Image supprimée", "ok");
      loadImages();
    } catch (e) { toast(e.message, "err"); }
  };

  const setPrimary = async (mediaId) => {
    try {
      await latinaApi.admin.post(`/media/${mediaId}/primary`, {});
      toast("Image principale définie", "ok");
      loadImages();
    } catch (e) { toast(e.message, "err"); }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal admin-modal-lg" onClick={e => e.stopPropagation()}>
        <div className="admin-modal-head">
          <span className="admin-modal-title">{isNew ? "Nouveau produit" : `Modifier — ${product?.name_fr || form.name_fr}`}</span>
          {!isNew && (
            <div className="gap-row" style={{marginLeft:"auto",marginRight:12}}>
              {["info","images","variantes"].map(tKey => (
                <button key={tKey} className={`btn btn-sm ${tab===tKey?"btn-rose":"btn-ghost"}`} onClick={()=>{
                  setTab(tKey);
                  if (tKey === "variantes" && variants.length === 0) loadVariants();
                }}>
                  {tKey==="info" ? "📝 Infos" : tKey==="images" ? `🖼 Images${images.length>0?` (${images.length})`:""}` : `🎨 Variantes${variants.length>0?` (${variants.length})`:""}`}
                </button>
              ))}
            </div>
          )}
          <button className="admin-modal-close" onClick={onClose}>✕</button>
        </div>

        {tab === "info" && (
          <>
            <div className="form-row form-row-3">
              <div className="form-field"><label className="form-label">Nom (FR) *</label><input className="admin-input" value={form.name_fr} onChange={e => set("name_fr", e.target.value)} /></div>
              <div className="form-field"><label className="form-label">Nom (AR)</label><input className="admin-input" value={form.name_ar} onChange={e => set("name_ar", e.target.value)} /></div>
              <div className="form-field"><label className="form-label">Nom (EN)</label><input className="admin-input" value={form.name_en} onChange={e => set("name_en", e.target.value)} /></div>
            </div>
            <div className="form-row form-row-3">
              <div className="form-field"><label className="form-label">Prix (DA) *</label><input className="admin-input" type="number" value={form.price} onChange={e => set("price", e.target.value)} /></div>
              <div className="form-field"><label className="form-label">Prix barré (DA)</label><input className="admin-input" type="number" value={form.compare_price} onChange={e => set("compare_price", e.target.value)} placeholder="Avant promo" /></div>
              <div className="form-field"><label className="form-label">Stock *</label><input className="admin-input" type="number" value={form.stock} onChange={e => set("stock", e.target.value)} /></div>
            </div>
            <div className="form-field mb-3">
              <label className="form-label">Description (FR)</label>
              <textarea className="admin-textarea" rows={3} value={form.description_fr} onChange={e => set("description_fr", e.target.value)} />
            </div>
            <div className="form-field mb-4">
              <label className="form-label">Description (AR)</label>
              <textarea className="admin-textarea" rows={2} value={form.description_ar} onChange={e => set("description_ar", e.target.value)} />
            </div>
            <div className="gap-row" style={{flexWrap:"wrap",gap:16,marginBottom:16}}>
              <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:"var(--text-2)"}}>
                <input type="checkbox" checked={form.is_active} onChange={e => set("is_active", e.target.checked)} />
                Produit actif
              </label>
              <label style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",fontSize:13,color:"var(--text-2)"}}>
                <input type="checkbox" checked={form.is_featured} onChange={e => set("is_featured", e.target.checked)} />
                Mis en avant
              </label>
            </div>
            <div className="gap-row">
              <button className="btn btn-ghost" onClick={onClose}>Annuler</button>
              <button className="btn btn-rose ml-auto" onClick={save} disabled={saving}>
                {saving ? <span className="admin-spinner" style={{width:14,height:14}} /> : isNew ? "Créer le produit" : "Enregistrer"}
              </button>
            </div>
          </>
        )}

        {tab === "variantes" && effectiveId && (
          <div>
            {loadingVariants ? (
              <div style={{display:"flex",justifyContent:"center",padding:32}}><span className="admin-spinner" /></div>
            ) : (
              <>
                {variants.length > 0 && (
                  <div style={{overflowX:"auto",marginBottom:16}}>
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Couleur</th><th>Taille</th><th>SKU</th>
                          <th className="t-right">Stock</th><th className="t-right">Ajust.</th><th>État</th><th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {variants.map(v => editingVariantId === v.id ? (
                          <tr key={v.id} style={{background:"var(--bg-2)"}}>
                            <td>
                              <select className="admin-input" style={{width:110}} value={vForm.color} onChange={e => setV("color", e.target.value)}>
                                <option value="">—</option>
                                {["noir","blanc","beige","nude","rose","marron","camel","khaki","bleu","or","argent","perles"].map(c => <option key={c} value={c}>{c}</option>)}
                              </select>
                            </td>
                            <td><input className="admin-input" style={{width:70}} value={vForm.size} onChange={e => setV("size", e.target.value)} placeholder="36" /></td>
                            <td className="t-mono" style={{fontSize:11,color:"var(--text-3)"}}>{v.sku}</td>
                            <td><input className="admin-input t-num" type="number" style={{width:70}} value={vForm.stock} min={0} onChange={e => setV("stock", Number(e.target.value))} /></td>
                            <td><input className="admin-input t-num" type="number" style={{width:80}} value={vForm.price_adjustment} onChange={e => setV("price_adjustment", Number(e.target.value))} /></td>
                            <td>
                              <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:12}}>
                                <input type="checkbox" checked={vForm.is_active} onChange={e => setV("is_active", e.target.checked)} /> Actif
                              </label>
                            </td>
                            <td>
                              <div className="gap-row">
                                <button className="btn btn-sm btn-rose" onClick={saveVariant}>✓</button>
                                <button className="btn btn-sm btn-ghost" onClick={() => { setEditingVariantId(null); setVForm(emptyVForm); }}>✕</button>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          <tr key={v.id}>
                            <td>
                              {v.color ? (
                                <span style={{display:"inline-flex",alignItems:"center",gap:6}}>
                                  <span style={{width:10,height:10,borderRadius:"50%",background:{"noir":"#1A1A1A","blanc":"#FAFAFA","beige":"#D4B896","nude":"#E5C4AE","rose":"#E8B4B8","marron":"#6B3F2A","camel":"#B07A4E","khaki":"#7A7B53","bleu":"#2E4B6F","or":"#C9A267","argent":"#C0C0C8","perles":"#F2EAE0"}[v.color]||"#ddd",border:"1px solid rgba(0,0,0,.1)"}} />
                                  {v.color}
                                </span>
                              ) : "—"}
                            </td>
                            <td className="t-mono">{v.size || "—"}</td>
                            <td className="t-mono" style={{fontSize:10,color:"var(--text-3)"}}>{v.sku}</td>
                            <td className="t-right t-num">
                              <span className={`stock-chip ${v.stock===0?"out":v.stock<=4?"low":"good"}`}>{v.stock}</span>
                            </td>
                            <td className="t-right t-num" style={{fontSize:12}}>{v.price_adjustment>0?`+${v.price_adjustment}`:v.price_adjustment||0} DA</td>
                            <td><span className={`badge ${v.is_active?"badge-active":"badge-inactive"}`}>{v.is_active?"Actif":"Inactif"}</span></td>
                            <td>
                              <div className="gap-row">
                                <button className="btn btn-ghost btn-sm" onClick={() => startEditVariant(v)}>✏️</button>
                                <button className="btn btn-danger btn-sm" onClick={() => deleteVariant(v.id)}>🗑</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {addingVariant ? (
                  <div style={{background:"var(--bg-2)",padding:16,borderRadius:8,marginBottom:12}}>
                    <div style={{fontSize:13,fontWeight:600,marginBottom:12,color:"var(--text-1)"}}>Nouvelle variante</div>
                    <div className="form-row form-row-3" style={{gap:12}}>
                      <div className="form-field">
                        <label className="form-label">Couleur</label>
                        <select className="admin-input" value={vForm.color} onChange={e => setV("color", e.target.value)}>
                          <option value="">— Aucune —</option>
                          {["noir","blanc","beige","nude","rose","marron","camel","khaki","bleu","or","argent","perles"].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label className="form-label">Taille</label>
                        <input className="admin-input" value={vForm.size} onChange={e => setV("size", e.target.value)} placeholder="36, 37, M, L…" />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Stock *</label>
                        <input className="admin-input t-num" type="number" min={0} value={vForm.stock} onChange={e => setV("stock", Number(e.target.value))} />
                      </div>
                      <div className="form-field">
                        <label className="form-label">Ajust. Prix (DA)</label>
                        <input className="admin-input t-num" type="number" value={vForm.price_adjustment} onChange={e => setV("price_adjustment", Number(e.target.value))} placeholder="0" />
                      </div>
                      <div className="form-field" style={{justifyContent:"flex-end",display:"flex",alignItems:"flex-end"}}>
                        <label style={{display:"flex",alignItems:"center",gap:6,cursor:"pointer",fontSize:13}}>
                          <input type="checkbox" checked={vForm.is_active} onChange={e => setV("is_active", e.target.checked)} /> Actif
                        </label>
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
                <p style={{fontSize:11,color:"var(--text-3)",marginTop:12}}>Chaque ligne = une combinaison couleur + taille avec son propre stock. Laissez vide si non applicable.</p>
              </>
            )}
          </div>
        )}

        {tab === "images" && effectiveId && (
          <div>
            <div className="product-images-grid">
              {images.map(img => (
                <div key={img.id} className={`product-img-item ${img.is_primary ? "is-primary" : ""}`}>
                  <img src={img.url} alt={img.alt_fr || ""} />
                  {img.is_primary && <span className="img-primary-badge">Principale</span>}
                  <div className="img-actions">
                    {!img.is_primary && (
                      <button className="btn btn-sm btn-ghost" onClick={() => setPrimary(img.id)} title="Définir comme principale">⭐</button>
                    )}
                    <button className="btn btn-sm btn-danger" onClick={() => deleteImage(img.id)} title="Supprimer">🗑</button>
                  </div>
                </div>
              ))}
              <div
                className="product-img-upload"
                onClick={() => fileRef.current?.click()}
                style={{opacity: uploading ? 0.5 : 1, cursor: uploading ? "wait" : "pointer"}}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  style={{display:"none"}}
                  onChange={e => { if (e.target.files[0]) uploadImage(e.target.files[0]); e.target.value = ""; }}
                />
                {uploading ? <span className="admin-spinner" /> : <span style={{fontSize:32}}>+</span>}
                <span style={{fontSize:12,color:"var(--text-3)",marginTop:4}}>Ajouter une image</span>
              </div>
            </div>
            <p style={{fontSize:11,color:"var(--text-3)",marginTop:8}}>JPEG, PNG ou WebP · Max 8 Mo · Organisé dans /public/products/</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Products = () => {
  const { rows, loading, search, doSearch, reload } = useTable("/products");
  const [modal, setModal] = useState(null); // null | "new" | product
  const toast = useToast();

  const deleteProduct = async (id) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try { await latinaApi.admin.delete(`/products/${id}`); toast("Produit supprimé", "ok"); reload(); }
    catch (e) { toast(e.message, "err"); }
  };

  const adjustStock = async (product) => {
    const newStock = prompt(`Stock actuel: ${product.stock}\nNouveau stock pour "${product.name_fr}":`, String(product.stock));
    if (newStock === null || newStock === "") return;
    const n = parseInt(newStock, 10);
    if (isNaN(n) || n < 0) { toast("Valeur invalide", "err"); return; }
    try {
      await latinaApi.admin.post(`/products/${product.id}/stock`, { new_stock: n, note: "Ajustement admin" });
      toast("Stock mis à jour", "ok"); reload();
    } catch (e) { toast(e.message, "err"); }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <div className="admin-search">
          <span className="admin-search-icon">🔍</span>
          <input placeholder="Rechercher un produit…" value={search} onChange={e => doSearch(e.target.value)} />
        </div>
        <button className="btn btn-rose" onClick={() => setModal("new")}>+ Nouveau produit</button>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Produit</th><th>SKU</th><th>Prix</th><th>Stock</th><th>Statut</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {rows.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div className="t-name">{p.name_fr}</div>
                      <div className="text-mute" style={{fontSize:11}}>{p.category?.name_fr}</div>
                    </td>
                    <td className="mono">{p.sku}</td>
                    <td className="mono">
                      {p.sale_price ? <><span className="text-rose">{Number(p.sale_price).toLocaleString()}</span> <span className="text-mute" style={{textDecoration:"line-through",fontSize:11}}>{Number(p.price).toLocaleString()}</span></> : `${Number(p.price).toLocaleString()} DA`}
                    </td>
                    <td className={`mono ${p.stock === 0 ? "text-red" : p.stock < 5 ? "text-yellow" : "text-green"}`}>{p.stock}</td>
                    <td><span className={`badge ${p.is_active ? "badge-active" : "badge-inactive"}`}>{p.is_active ? "Actif" : "Inactif"}</span></td>
                    <td>
                      <div className="gap-row">
                        <button className="btn btn-ghost btn-sm" onClick={() => setModal(p)}>✏️</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => adjustStock(p)}>📦</button>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(p.id)}>🗑</button>
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

  return (
    <div>
      <div className="admin-toolbar">
        <button className="btn btn-rose ml-auto" onClick={openNew}>+ Nouvelle catégorie</button>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Nom (FR)</th><th>Nom (AR)</th><th>Slug</th><th>Produits</th><th>Actions</th></tr></thead>
              <tbody>
                {rows.map(c => (
                  <tr key={c.id}>
                    <td className="t-name">{c.name_fr}</td>
                    <td>{c.name_ar}</td>
                    <td className="mono">{c.slug}</td>
                    <td className="mono">{c.products_count ?? "—"}</td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEdit(c)}>✏️</button>
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

const OrderDetail = ({ order, onClose, onUpdated }) => {
  const toast = useToast();
  const [transitioning, setTransitioning] = useState(false);

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
            <div style={{marginTop:4}}><div>{order.recipient_name}</div><div className="mono text-mute">{order.recipient_phone}</div></div>
          </div>
          <div>
            <div className="form-label">Livraison</div>
            <div style={{marginTop:4}}>{order.wilaya?.name_fr || order.wilaya_code}{order.commune && ` — ${order.commune.name_fr}`}</div>
            {order.street_address && <div className="text-mute" style={{fontSize:12}}>{order.street_address}</div>}
          </div>
        </div>

        <table className="admin-table mb-4">
          <thead><tr><th>Produit</th><th>Variante</th><th>Qté</th><th>Prix unit.</th><th>Total</th></tr></thead>
          <tbody>
            {(order.lines || []).map((l, i) => (
              <tr key={i}>
                <td className="t-name">{l.product_name}</td>
                <td className="text-mute">{l.variant_label || "—"}</td>
                <td className="mono">{l.qty}</td>
                <td className="mono">{Number(l.unit_price).toLocaleString()} DA</td>
                <td className="mono">{Number(l.line_total).toLocaleString()} DA</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid-2 mb-4">
          <div className="form-field">
            <div className="form-label">Frais livraison</div>
            <div className="mono">{Number(order.shipping_fee || 0).toLocaleString()} DA</div>
          </div>
          <div className="form-field">
            <div className="form-label">Total</div>
            <div className="mono text-rose" style={{fontSize:16,fontWeight:600}}>{Number(order.total).toLocaleString()} DA</div>
          </div>
        </div>

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
      </div>
    </div>
  );
};

const Orders = () => {
  const { rows, loading, search, doSearch, reload } = useTable("/orders");
  const [detail, setDetail] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = statusFilter ? rows.filter(o => o.status === statusFilter) : rows;

  return (
    <div>
      <div className="admin-toolbar">
        <div className="admin-search" style={{maxWidth:280}}>
          <span className="admin-search-icon">🔍</span>
          <input placeholder="Réf., nom client…" value={search} onChange={e => doSearch(e.target.value)} />
        </div>
        <select className="admin-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">Tous statuts</option>
          {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Réf.</th><th>Client</th><th>Wilaya</th><th>Total</th><th>Statut</th><th>Date</th><th></th></tr></thead>
              <tbody>
                {filtered.map(o => (
                  <tr key={o.id} style={{cursor:"pointer"}} onClick={() => setDetail(o)}>
                    <td className="mono">{o.reference}</td>
                    <td className="t-name">{o.recipient_name}</td>
                    <td>{o.wilaya?.name_fr || o.wilaya_code}</td>
                    <td className="mono">{Number(o.total).toLocaleString()} DA</td>
                    <td><span className={`badge badge-${o.status}`}>{o.status}</span></td>
                    <td className="text-mute">{new Date(o.created_at).toLocaleDateString("fr-DZ")}</td>
                    <td><button className="btn btn-ghost btn-sm" onClick={e => {e.stopPropagation();setDetail(o);}}>Détail</button></td>
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
   CUSTOMERS
   ============================================================ */
const Customers = () => {
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
              <thead><tr><th>Client</th><th>Téléphone</th><th>Tier</th><th>Points</th><th>Commandes</th><th>Statut</th><th>Actions</th></tr></thead>
              <tbody>
                {rows.map(c => (
                  <tr key={c.id}>
                    <td className="t-name">{c.name}</td>
                    <td className="mono">{c.phone}</td>
                    <td><span style={{color: TIER_COLORS[c.loyalty_tier] || "var(--text-2)", fontWeight:500}}>{c.loyalty_tier}</span></td>
                    <td className="mono">{c.loyalty_points}</td>
                    <td className="mono">{c.orders_count ?? "—"}</td>
                    <td><span className={`badge ${c.is_active ? "badge-active" : "badge-inactive"}`}>{c.is_active ? "Actif" : "Bloqué"}</span></td>
                    <td>
                      <div className="gap-row">
                        <button className="btn btn-ghost btn-sm" onClick={() => adjustLoyalty(c)}>🎁</button>
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
          <label style={{display:"flex",gap:8,cursor:"pointer",fontSize:13,color:"var(--text-2)"}}>
            <input type="checkbox" checked={form.is_active} onChange={e => set("is_active", e.target.checked)} /> Actif
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
              <thead><tr><th>Code</th><th>Type</th><th>Valeur</th><th>Utilisations</th><th>Expire</th><th>Statut</th><th></th></tr></thead>
              <tbody>
                {rows.map(c => (
                  <tr key={c.id}>
                    <td className="mono text-rose">{c.code}</td>
                    <td>{c.type}</td>
                    <td className="mono">{c.type === "free_shipping" ? "—" : c.type === "percent" ? `${c.value}%` : `${Number(c.value).toLocaleString()} DA`}</td>
                    <td className="mono">{c.uses ?? 0}{c.max_uses ? `/${c.max_uses}` : ""}</td>
                    <td className="text-mute">{c.expires_at ? new Date(c.expires_at).toLocaleDateString("fr-DZ") : "∞"}</td>
                    <td><span className={`badge ${c.is_active ? "badge-active" : "badge-inactive"}`}>{c.is_active ? "Actif" : "Inactif"}</span></td>
                    <td className="gap-row">
                      <button className="btn btn-ghost btn-sm" onClick={() => setModal(c)}>✏️</button>
                      <button className="btn btn-danger btn-sm" onClick={() => del(c.id)}>🗑</button>
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
              <thead><tr><th>Titre</th><th>Réduction</th><th>Début</th><th>Fin</th><th>Statut</th><th></th></tr></thead>
              <tbody>
                {rows.map(fs => {
                  const now = new Date();
                  const s = fs.starts_at ? new Date(fs.starts_at) : null;
                  const e = fs.ends_at ? new Date(fs.ends_at) : null;
                  const active = s && e && now >= s && now <= e;
                  return (
                    <tr key={fs.id}>
                      <td className="t-name">{fs.title_fr}</td>
                      <td className="mono text-rose">{fs.discount_pct}%</td>
                      <td className="text-mute">{s?.toLocaleDateString("fr-DZ")}</td>
                      <td className="text-mute">{e?.toLocaleDateString("fr-DZ")}</td>
                      <td><span className={`badge ${active ? "badge-active" : "badge-inactive"}`}>{active ? "Active" : "Inactive"}</span></td>
                      <td><button className="btn btn-ghost btn-sm" onClick={() => openEdit(fs)}>✏️</button></td>
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
const Contests = () => {
  const { rows, loading, reload } = useTable("/contests");
  const [modal, setModal] = useState(null);
  const toast = useToast();
  const [form, setForm] = useState({ title_fr:"", title_ar:"", description_fr:"", starts_at:"", ends_at:"", prize_description:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const drawWinner = async (contest) => {
    if (!confirm(`Tirer au sort le gagnant du concours "${contest.title_fr}" ?`)) return;
    try {
      const res = await latinaApi.admin.post(`/contests/${contest.id}/draw`);
      const w = res.data?.winner || res.winner;
      toast(`Gagnant : ${w?.name || "sélectionné"}`, "ok");
      reload();
    } catch (e) { toast(e.message, "err"); }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <button className="btn btn-rose ml-auto" onClick={() => { setForm({title_fr:"",title_ar:"",description_fr:"",starts_at:"",ends_at:"",prize_description:""}); setModal({}); }}>+ Nouveau concours</button>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Titre</th><th>Participants</th><th>Début</th><th>Fin</th><th>Gagnant</th><th>Actions</th></tr></thead>
              <tbody>
                {rows.map(c => (
                  <tr key={c.id}>
                    <td className="t-name">{c.title_fr}</td>
                    <td className="mono">{c.entries_count ?? 0}</td>
                    <td className="text-mute">{c.starts_at ? new Date(c.starts_at).toLocaleDateString("fr-DZ") : "—"}</td>
                    <td className="text-mute">{c.ends_at ? new Date(c.ends_at).toLocaleDateString("fr-DZ") : "—"}</td>
                    <td>{c.winner ? <span className="text-green">{c.winner.name}</span> : <span className="text-mute">—</span>}</td>
                    <td className="gap-row">
                      {!c.winner && <button className="btn btn-ghost btn-sm" onClick={() => drawWinner(c)}>🎲 Tirer</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {modal !== null && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal admin-modal-md" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-head">
              <span className="admin-modal-title">Nouveau concours</span>
              <button className="admin-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="form-row form-row-2 mb-4">
              <div className="form-field"><label className="form-label">Titre (FR)</label><input className="admin-input" value={form.title_fr} onChange={e => set("title_fr",e.target.value)} /></div>
              <div className="form-field"><label className="form-label">Titre (AR)</label><input className="admin-input" value={form.title_ar} onChange={e => set("title_ar",e.target.value)} /></div>
            </div>
            <div className="form-field mb-4"><label className="form-label">Description (FR)</label><textarea className="admin-textarea" value={form.description_fr} onChange={e => set("description_fr",e.target.value)} /></div>
            <div className="form-field mb-4"><label className="form-label">Prix / Récompense</label><input className="admin-input" value={form.prize_description} onChange={e => set("prize_description",e.target.value)} /></div>
            <div className="form-row form-row-2 mb-4">
              <div className="form-field"><label className="form-label">Début</label><input className="admin-input" type="datetime-local" value={form.starts_at} onChange={e => set("starts_at",e.target.value)} /></div>
              <div className="form-field"><label className="form-label">Fin</label><input className="admin-input" type="datetime-local" value={form.ends_at} onChange={e => set("ends_at",e.target.value)} /></div>
            </div>
            <div className="gap-row">
              <button className="btn btn-ghost ml-auto" onClick={() => setModal(null)}>Annuler</button>
              <button className="btn btn-rose" onClick={async () => {
                try { await latinaApi.admin.post("/contests", form); toast("Concours créé","ok"); reload(); setModal(null); }
                catch(e) { toast(e.message,"err"); }
              }}>Créer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ============================================================
   TEAM (Admin Users)
   ============================================================ */
const ROLES = [
  { value: "order-manager", label: "Order Manager" },
  { value: "catalog-manager", label: "Catalog Manager" },
  { value: "viewer", label: "Viewer" },
];

const Team = () => {
  const { rows, loading, reload } = useTable("/admins");
  const [modal, setModal] = useState(null);
  const toast = useToast();
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"viewer" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));

  const save = async () => {
    try {
      await latinaApi.admin.post("/admins", form);
      toast("Admin créé","ok"); reload(); setModal(null);
    } catch (e) { toast(e.message,"err"); }
  };

  const del = async (id) => {
    if (!confirm("Supprimer cet admin ?")) return;
    try { await latinaApi.admin.delete(`/admins/${id}`); toast("Supprimé","ok"); reload(); }
    catch(e) { toast(e.message,"err"); }
  };

  return (
    <div>
      <div className="admin-toolbar">
        <button className="btn btn-rose ml-auto" onClick={() => { setForm({name:"",email:"",password:"",role:"viewer"}); setModal(true); }}>+ Nouvel admin</button>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Nom</th><th>Email</th><th>Rôle</th><th>Créé</th><th>Actions</th></tr></thead>
              <tbody>
                {rows.map(a => (
                  <tr key={a.id}>
                    <td className="t-name">{a.name}</td>
                    <td className="mono">{a.email}</td>
                    <td><span className={`badge ${a.is_super ? "badge-out_for_delivery" : "badge-confirmed"}`}>{a.is_super ? "Super Admin" : a.roles?.[0] || "—"}</span></td>
                    <td className="text-mute">{new Date(a.created_at).toLocaleDateString("fr-DZ")}</td>
                    <td>
                      {!a.is_super && <button className="btn btn-danger btn-sm" onClick={() => del(a.id)}>🗑 Supprimer</button>}
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
              <span className="admin-modal-title">Nouvel administrateur</span>
              <button className="admin-modal-close" onClick={() => setModal(null)}>✕</button>
            </div>
            <div className="form-field mb-4"><label className="form-label">Nom</label><input className="admin-input" value={form.name} onChange={e => set("name",e.target.value)} /></div>
            <div className="form-field mb-4"><label className="form-label">Email</label><input className="admin-input" type="email" value={form.email} onChange={e => set("email",e.target.value)} /></div>
            <div className="form-field mb-4"><label className="form-label">Mot de passe</label><input className="admin-input" type="password" value={form.password} onChange={e => set("password",e.target.value)} /></div>
            <div className="form-field mb-4">
              <label className="form-label">Rôle</label>
              <select className="admin-select w-full" value={form.role} onChange={e => set("role",e.target.value)}>
                {ROLES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
            </div>
            <div className="gap-row">
              <button className="btn btn-ghost ml-auto" onClick={() => setModal(null)}>Annuler</button>
              <button className="btn btn-rose" onClick={save}>Créer</button>
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
const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      latinaApi.admin.get("/reports/sales").then(r => r.data || r).catch(() => ({})),
      latinaApi.admin.get("/reports/inventory").then(r => r.data || r).catch(() => ({})),
    ]).then(([sales, inv]) => setData({ ...sales, ...inv })).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="admin-loading"><div className="admin-spinner" /></div>;

  const d = data || {};
  const sections = [
    {
      title: "Revenus",
      items: [
        { label: "Chiffre d'affaires total", val: d.revenue ? `${Number(d.revenue).toLocaleString()} DA` : "—" },
        { label: "Revenu ce mois", val: d.revenue_month ? `${Number(d.revenue_month).toLocaleString()} DA` : "—" },
        { label: "Panier moyen", val: d.avg_order ? `${Number(d.avg_order).toLocaleString()} DA` : "—" },
      ]
    },
    {
      title: "Commandes",
      items: [
        { label: "Total commandes", val: d.orders_count ?? "—" },
        { label: "Livrées", val: d.delivered_count ?? "—" },
        { label: "Taux de livraison", val: d.delivery_rate ? `${d.delivery_rate}%` : "—" },
        { label: "Retours (RTO)", val: d.rto_count ?? "—" },
        { label: "Annulées", val: d.cancelled_count ?? "—" },
      ]
    },
    {
      title: "Clients",
      items: [
        { label: "Total clients", val: d.customers_count ?? "—" },
        { label: "Nouveaux ce mois", val: d.new_customers ?? "—" },
        { label: "Total points fidélité", val: d.total_loyalty_points ?? "—" },
      ]
    },
    {
      title: "Produits",
      items: [
        { label: "Produits actifs", val: d.products_count ?? "—" },
        { label: "Stock total", val: d.total_stock ?? "—" },
        { label: "Ruptures de stock", val: d.out_of_stock ?? "—" },
      ]
    },
  ];

  return (
    <div>
      <div className="grid-2">
        {sections.map(s => (
          <div key={s.title} className="admin-card mb-4">
            <div className="ac-head"><span className="ac-title">{s.title}</span></div>
            <div className="ac-body">
              {s.items.map(item => (
                <div key={item.label} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid var(--border)",fontSize:13}}>
                  <span style={{color:"var(--text-3)"}}>{item.label}</span>
                  <span className="mono">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============================================================
   AUDIT LOG
   ============================================================ */
const Audit = () => {
  const { rows, loading, search, doSearch } = useTable("/audit-log", 20);

  const ACTION_COLORS = { create: "var(--green)", update: "var(--yellow)", delete: "var(--red)", login: "var(--blue)" };

  return (
    <div>
      <div className="admin-toolbar">
        <div className="admin-search" style={{maxWidth:320}}>
          <span className="admin-search-icon">🔍</span>
          <input placeholder="Rechercher dans l'audit…" value={search} onChange={e => doSearch(e.target.value)} />
        </div>
      </div>
      <div className="admin-card">
        {loading ? <div className="admin-loading"><div className="admin-spinner" /></div> : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead><tr><th>Date</th><th>Acteur</th><th>Action</th><th>Modèle</th><th>IP</th></tr></thead>
              <tbody>
                {rows.map(e => (
                  <tr key={e.id}>
                    <td className="mono text-mute" style={{fontSize:11}}>{new Date(e.created_at).toLocaleString("fr-DZ")}</td>
                    <td className="t-name">{e.actor_name || e.actor_id || "System"}</td>
                    <td><span style={{color: ACTION_COLORS[e.action] || "var(--text-2)", fontFamily:"var(--mono)", fontSize:12}}>{e.action}</span></td>
                    <td className="mono text-mute">{e.auditable_type?.split("\\").pop()} #{e.auditable_id}</td>
                    <td className="mono text-mute" style={{fontSize:11}}>{e.ip_address}</td>
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
   INVENTORY
   ============================================================ */
const Inventory = () => {
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

  const filtered = products.filter(p =>
    !search || p.name_fr?.toLowerCase().includes(search.toLowerCase()) || p.sku?.toLowerCase().includes(search.toLowerCase())
  );

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
            <div className="admin-search">
              <span className="admin-search-icon">🔍</span>
              <input placeholder="Rechercher un produit…" value={search} onChange={e => setSearch(e.target.value)} />
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
                          <td>
                            <div className="t-name">{p.name_fr}</div>
                            <div className="text-mute" style={{fontSize:11}}>{p.category?.name_fr}</div>
                          </td>
                          <td className="mono">{p.sku}</td>
                          <td className={`mono ${p.stock === 0 ? "text-red" : p.low_stock_threshold && p.stock <= p.low_stock_threshold ? "text-yellow" : "text-green"}`}
                              style={{fontSize:16,fontWeight:600}}>
                            {p.stock}
                          </td>
                          <td className="mono text-mute">{p.low_stock_threshold ?? 5}</td>
                          <td style={{minWidth:90}}>
                            <div className="inv-stock-bar">
                              <div className="inv-stock-bar-fill" style={{width:`${pct}%`, background: getBarColor(p)}} />
                            </div>
                          </td>
                          <td>{getStockChip(p)}</td>
                          <td>
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
                            <td className="mono text-mute" style={{fontSize:11}}>{new Date(m.created_at).toLocaleString("fr-DZ")}</td>
                            <td>
                              <div className="t-name">{m.product?.name_fr || "—"}</div>
                              <div className="mono text-mute" style={{fontSize:10}}>{m.product?.sku}</div>
                            </td>
                            <td className="text-mute">{m.variant ? `${m.variant.size || ""} ${m.variant.color || ""}`.trim() || "—" : "—"}</td>
                            <td><span className={cls}>{m.type || "adj"}</span></td>
                            <td className={`mono ${m.quantity_change > 0 ? "text-green" : "text-red"}`}>
                              {sign}{m.quantity_change}
                            </td>
                            <td className="mono">{m.stock_after}</td>
                            <td className="text-mute" style={{fontSize:12,maxWidth:200}}>{m.note || "—"}</td>
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
const PAGE_TITLES = {
  dashboard: "Dashboard", products: "Produits", categories: "Catégories",
  orders: "Commandes", customers: "Clients", coupons: "Coupons",
  flash_sales: "Flash Sales", contests: "Concours",
  inventory: "Inventaire", team: "Équipe",
  reports: "Rapports", audit: "Journal d'audit",
};

const PAGE_COMPONENTS = {
  dashboard: Dashboard, products: Products, categories: Categories,
  orders: Orders, customers: Customers, coupons: Coupons,
  flash_sales: FlashSales, contests: Contests,
  inventory: Inventory, team: Team,
  reports: Reports, audit: Audit,
};

/* ============================================================
   ROOT APP
   ============================================================ */
const AdminApp = () => {
  const [admin, setAdmin] = useState(() => {
    try { return JSON.parse(localStorage.getItem("latina-admin-user") || "null"); } catch { return null; }
  });
  const [page, setPage] = useState("dashboard");

  const handleLogin = (adminUser) => {
    setAdmin(adminUser);
    localStorage.setItem("latina-admin-user", JSON.stringify(adminUser));
  };

  const handleLogout = async () => {
    try { await latinaApi.admin.post("/logout"); } catch {}
    setAdmin(null);
    localStorage.removeItem("latina-admin-user");
    localStorage.removeItem("latina-admin-token");
  };

  /* Verify stored admin token on mount */
  useEffect(() => {
    if (!admin) return;
    latinaApi.admin.get("/me").catch(() => {
      setAdmin(null);
      localStorage.removeItem("latina-admin-user");
      localStorage.removeItem("latina-admin-token");
    });
  }, []);

  if (!admin) {
    return (
      <ToastProvider>
        <AdminLogin onLogin={handleLogin} />
      </ToastProvider>
    );
  }

  const PageComp = PAGE_COMPONENTS[page] || Dashboard;

  return (
    <ToastProvider>
      <div className="admin-layout">
        <Sidebar page={page} setPage={setPage} admin={admin} onLogout={handleLogout} />
        <div className="admin-main">
          <div className="admin-topbar">
            <span className="at-title">{PAGE_TITLES[page] || page}</span>
            <div className="at-actions">
              <span className="text-mute" style={{fontSize:12}}>Latina Admin · {new Date().toLocaleDateString("fr-DZ")}</span>
            </div>
          </div>
          <div className="admin-content">
            <PageComp />
          </div>
        </div>
      </div>
    </ToastProvider>
  );
};

ReactDOM.createRoot(document.getElementById("admin-root")).render(<AdminApp />);
