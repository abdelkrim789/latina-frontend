/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ============================================================
   AUTH MODAL — Login / Register
   ============================================================ */
const AuthModal = ({ lang, open, onClose, onLogin }) => {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", login: "", phone: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const api = window.latinaApi;

  const T = {
    fr: {
      login: "Connexion", register: "Créer un compte",
      name: "Nom complet", loginField: "Email ou téléphone",
      phone: "Téléphone (0XXXXXXXXX)", email: "Email (optionnel)",
      password: "Mot de passe", confirm: "Confirmer le mot de passe",
      loginBtn: "Se connecter", registerBtn: "S'inscrire",
      noAccount: "Pas encore de compte ?", hasAccount: "Déjà un compte ?",
      joinMsg: "Rejoignez Latina et gagnez des points fidélité.",
    },
    ar: {
      login: "تسجيل الدخول", register: "إنشاء حساب",
      name: "الاسم الكامل", loginField: "البريد أو الهاتف",
      phone: "الهاتف (0XXXXXXXXX)", email: "البريد الإلكتروني (اختياري)",
      password: "كلمة المرور", confirm: "تأكيد كلمة المرور",
      loginBtn: "دخول", registerBtn: "إنشاء حساب",
      noAccount: "ليس لديك حساب؟", hasAccount: "لديك حساب؟",
      joinMsg: "انضمي إلى لاتينا واكسبي نقاط الولاء.",
    },
    en: {
      login: "Sign In", register: "Create Account",
      name: "Full name", loginField: "Email or phone",
      phone: "Phone (0XXXXXXXXX)", email: "Email (optional)",
      password: "Password", confirm: "Confirm password",
      loginBtn: "Sign in", registerBtn: "Register",
      noAccount: "No account yet?", hasAccount: "Already have an account?",
      joinMsg: "Join Latina and earn loyalty points.",
    }
  }[lang] || {};

  useEffect(() => {
    if (open) { setError(""); setForm({ name: "", phone: "", email: "", password: "", confirm: "" }); }
  }, [open, tab]);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (tab === "register" && form.password !== form.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      let data;
      if (tab === "login") {
        data = await api.login({ login: form.login, password: form.password });
      } else {
        data = await api.register({ name: form.name, phone: form.phone, email: form.email || undefined, password: form.password });
      }
      onLogin(data.user || data.data?.user);
      onClose();
    } catch (err) {
      setError(err.message || "Erreur, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()} dir={lang === "ar" ? "rtl" : "ltr"}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="auth-brand">
          <LotusMark size={32} color="var(--rose-500)" />
          <span className="brand-name">Latina</span>
        </div>

        <div className="auth-tabs">
          <button className={tab === "login" ? "active" : ""} onClick={() => setTab("login")}>{T.login}</button>
          <button className={tab === "register" ? "active" : ""} onClick={() => setTab("register")}>{T.register}</button>
        </div>

        {tab === "register" && (
          <p className="auth-tagline">{T.joinMsg}</p>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {tab === "register" && (
            <input type="text" placeholder={T.name} value={form.name} onChange={e => set("name", e.target.value)} required />
          )}
          {tab === "login" ? (
            <input type="text" placeholder={T.loginField} value={form.login} onChange={e => set("login", e.target.value)} required autoComplete="username" />
          ) : (
            <>
              <input type="tel" placeholder={T.phone} value={form.phone} onChange={e => set("phone", e.target.value)} required pattern="0[5-7][0-9]{8}" />
              <input type="email" placeholder={T.email} value={form.email} onChange={e => set("email", e.target.value)} />
            </>
          )}
          <input type="password" placeholder={T.password} value={form.password} onChange={e => set("password", e.target.value)} required minLength={8} />
          {tab === "register" && (
            <input type="password" placeholder={T.confirm} value={form.confirm} onChange={e => set("confirm", e.target.value)} required minLength={8} />
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : (tab === "login" ? T.loginBtn : T.registerBtn)}
          </button>
        </form>

        <div className="auth-switch">
          <span>{tab === "login" ? T.noAccount : T.hasAccount}</span>
          <button onClick={() => setTab(tab === "login" ? "register" : "login")}>
            {tab === "login" ? T.register : T.login}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   CART DRAWER
   ============================================================ */
const CartDrawer = ({ lang, open, onClose, cart, onUpdateCart, onCheckout, user }) => {
  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState(null); // { code, type, value }
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponError, setCouponError] = useState("");

  const T = {
    fr: {
      title: "Mon Panier", empty: "Votre panier est vide.", emptyHint: "Découvrez notre collection ✨",
      subtotal: "Sous-total", shipping: "Livraison", discount: "Remise", total: "Total",
      checkout: "Commander", applyCoupon: "Appliquer", couponPlaceholder: "Code promo",
      remove: "Supprimer", calculated: "calculée au checkout", freeShipping: "Offerte",
      qty: "Qté", cod: "Paiement à la livraison uniquement",
    },
    ar: {
      title: "سلة التسوق", empty: "سلتك فارغة.", emptyHint: "اكتشفي مجموعتنا ✨",
      subtotal: "المجموع الجزئي", shipping: "الشحن", discount: "الخصم", total: "المجموع",
      checkout: "طلب", applyCoupon: "تطبيق", couponPlaceholder: "كود الخصم",
      remove: "حذف", calculated: "يُحسب عند الدفع", freeShipping: "مجاني",
      qty: "الكمية", cod: "الدفع عند الاستلام فقط",
    },
    en: {
      title: "My Cart", empty: "Your cart is empty.", emptyHint: "Explore our collection ✨",
      subtotal: "Subtotal", shipping: "Shipping", discount: "Discount", total: "Total",
      checkout: "Order now", applyCoupon: "Apply", couponPlaceholder: "Promo code",
      remove: "Remove", calculated: "calculated at checkout", freeShipping: "Free",
      qty: "Qty", cod: "Cash on delivery only",
    }
  }[lang] || {};

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const calcDiscount = (coupon) => {
    if (!coupon) return 0;
    if (coupon.type === "percent") return Math.round(subtotal * coupon.value / 100);
    if (coupon.type === "fixed") return Math.min(coupon.value, subtotal);
    return 0; // free_shipping handled at checkout
  };
  const discount = calcDiscount(couponData);

  const applyCoupon = async () => {
    if (!couponCode.trim() || couponLoading) return;
    setCouponLoading(true);
    setCouponError("");
    try {
      const res = await window.latinaApi.checkCoupon(couponCode.trim());
      if (res.valid) {
        setCouponData(res);
      } else {
        setCouponError(res.message || "Code invalide.");
      }
    } catch {
      setCouponError("Erreur lors de la vérification.");
    } finally {
      setCouponLoading(false);
    }
  };

  const changeQty = (idx, delta) => {
    onUpdateCart(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], qty: Math.max(1, next[idx].qty + delta) };
      return next;
    });
  };

  const removeItem = (idx) => {
    onUpdateCart(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <>
      {open && <div className="drawer-backdrop" onClick={onClose} />}
      <div className={`cart-drawer ${open ? "open" : ""}`} dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="cart-drawer-head">
          <h2 className="t-h4">{T.title}</h2>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">🛍️</div>
            <p>{T.empty}</p>
            <p className="t-mute">{T.emptyHint}</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, idx) => (
                <div className="cart-item" key={idx}>
                  <div className="ci-img">
                    {item.image ? <img src={item.image} alt={item.name} /> : <div className="ci-img-placeholder">👟</div>}
                  </div>
                  <div className="ci-info">
                    <div className="ci-name">{item.name}</div>
                    {item.variant && <div className="ci-meta t-mono">{item.variant}</div>}
                    <div className="ci-price t-num">{(item.price * item.qty).toLocaleString()} DA</div>
                  </div>
                  <div className="ci-controls">
                    <div className="qty-control">
                      <button onClick={() => changeQty(idx, -1)}>−</button>
                      <span className="t-num">{item.qty}</span>
                      <button onClick={() => changeQty(idx, +1)}>+</button>
                    </div>
                    <button className="ci-remove" onClick={() => removeItem(idx)}>{T.remove}</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-coupon">
              <input
                placeholder={T.couponPlaceholder}
                value={couponCode}
                onChange={e => { setCouponCode(e.target.value); setCouponData(null); setCouponError(""); }}
                onKeyDown={e => e.key === "Enter" && !couponData && applyCoupon()}
                disabled={!!couponData || couponLoading}
              />
              {couponData ? (
                <button className="btn-outline-sm" onClick={() => { setCouponData(null); setCouponCode(""); }}>✕</button>
              ) : (
                <button onClick={applyCoupon} disabled={couponLoading || !couponCode.trim()} className="btn-outline-sm">
                  {couponLoading ? <span className="btn-spinner" /> : T.applyCoupon}
                </button>
              )}
            </div>
            {couponData && (
              <div className="coupon-ok">
                ✓ {couponData.code}
                {couponData.type === "percent" && ` — ${couponData.value}% de réduction`}
                {couponData.type === "fixed" && ` — ${couponData.value.toLocaleString()} DA de réduction`}
                {couponData.type === "free_shipping" && ` — Livraison offerte`}
              </div>
            )}
            {couponError && <div className="coupon-err t-mono">{couponError}</div>}

            <div className="cart-totals">
              <div className="ct-row"><span>{T.subtotal}</span><span className="t-num">{subtotal.toLocaleString()} DA</span></div>
              {discount > 0 && (
                <div className="ct-row ct-discount">
                  <span>{T.discount}</span>
                  <span className="t-num">−{discount.toLocaleString()} DA</span>
                </div>
              )}
              <div className="ct-row"><span>{T.shipping}</span><span className="t-mute">{T.calculated}</span></div>
              <div className="ct-row total">
                <span>{T.total}</span>
                <span className="t-num">{(subtotal - discount).toLocaleString()} DA</span>
              </div>
            </div>

            <div className="cart-cod-note t-mono">{T.cod}</div>

            <button
              className="btn-primary cart-checkout-btn"
              onClick={() => onCheckout(couponData ? { ...couponData, discount } : null)}
            >
              {T.checkout}
            </button>
          </>
        )}
      </div>
    </>
  );
};

/* ============================================================
   CHECKOUT PAGE — 3-step wizard
   ============================================================ */
const CheckoutPage = ({ lang, open, onClose, cart, user, onOrderPlaced, coupon: couponProp = null }) => {
  const [step, setStep] = useState(1); // 1=address, 2=review, 3=confirm
  const [address, setAddress] = useState({ name: user?.name || "", phone: user?.phone || "", wilaya_code: "", commune_id: null, street: "", shipping_fee: 0, eta_days: 3 });
  const coupon = couponProp;
  const [loyaltyRedeem, setLoyaltyRedeem] = useState(0);
  const [loyaltyBalance, setLoyaltyBalance] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const T = {
    fr: {
      title: "Finaliser la commande",
      step1: "Livraison", step2: "Récapitulatif", step3: "Confirmation",
      name: "Nom complet", phone: "Téléphone", street: "Adresse (rue, n°, ...)",
      notes: "Note pour le livreur (optionnel)",
      next: "Continuer", back: "Retour", confirm: "Confirmer la commande",
      orderTotal: "Total commande", shipping: "Frais de livraison",
      loyaltyAvail: "Points disponibles", loyaltyUse: "Utiliser mes points",
      loyaltyDzd: "= {v} DA de réduction",
      thankYou: "Merci pour votre commande !",
      orderRef: "Référence", trackOrder: "Suivre ma commande",
      deliveryMsg: "Vous serez contactée pour confirmer la livraison.",
      close: "Fermer",
      product: "Produit", qty: "Qté", unitPrice: "Prix unit.", lineTotal: "Total",
    },
    ar: {
      title: "إتمام الطلب",
      step1: "التوصيل", step2: "ملخص", step3: "تأكيد",
      name: "الاسم الكامل", phone: "الهاتف", street: "العنوان",
      notes: "ملاحظة للمندوب (اختياري)",
      next: "التالي", back: "رجوع", confirm: "تأكيد الطلب",
      orderTotal: "مجموع الطلب", shipping: "رسوم الشحن",
      loyaltyAvail: "النقاط المتاحة", loyaltyUse: "استخدام نقاطي",
      loyaltyDzd: "= خصم {v} دج",
      thankYou: "شكراً على طلبك!",
      orderRef: "المرجع", trackOrder: "تتبع طلبي",
      deliveryMsg: "سيتم التواصل معك لتأكيد التوصيل.",
      close: "إغلاق",
      product: "المنتج", qty: "الكمية", unitPrice: "سعر الوحدة", lineTotal: "المجموع",
    },
    en: {
      title: "Complete Order",
      step1: "Delivery", step2: "Summary", step3: "Confirmation",
      name: "Full name", phone: "Phone", street: "Street address",
      notes: "Note for delivery (optional)",
      next: "Continue", back: "Back", confirm: "Place order",
      orderTotal: "Order total", shipping: "Shipping fee",
      loyaltyAvail: "Available points", loyaltyUse: "Use my points",
      loyaltyDzd: "= {v} DA off",
      thankYou: "Thank you for your order!",
      orderRef: "Reference", trackOrder: "Track my order",
      deliveryMsg: "You will be contacted to confirm delivery.",
      close: "Close",
      product: "Product", qty: "Qty", unitPrice: "Unit price", lineTotal: "Total",
    }
  }[lang] || {};

  useEffect(() => {
    if (open && user) {
      setAddress(a => ({ ...a, name: user.name || "", phone: user.phone || "" }));
      window.latinaApi.getLoyalty().then(r => setLoyaltyBalance(r.data?.points || r.points || 0)).catch(() => {});
    }
    if (open) { setStep(1); setError(""); setOrder(null); }
  }, [open]);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const loyaltyDiscount = Math.floor(loyaltyRedeem / 10);
  const couponDiscount = coupon?.discount || 0;
  const total = subtotal + address.shipping_fee - loyaltyDiscount - couponDiscount;

  const handlePlace = async () => {
    setLoading(true);
    setError("");
    try {
      const payload = {
        items: cart
          .filter(i => i.product_id)
          .map(i => ({
            product_id: i.product_id,
            quantity:   i.qty,
            variant_id: i.variant_id || undefined,
          })),
        wilaya_code:  Number(address.wilaya_code),
        commune_id:   address.commune_id || undefined,
        address_line: address.street,
        delivery_type: "home",
        guest_name:   address.name,
        guest_phone:  address.phone,
        coupon_code:  coupon?.code || undefined,
        loyalty_points: loyaltyRedeem || undefined,
        notes:        notes || undefined,
      };

      if (payload.items.length === 0) {
        setError("Votre panier ne contient aucun produit valide.");
        setLoading(false);
        return;
      }
      const res = await window.latinaApi.placeOrder(payload);
      const orderObj = res.order || res.data?.order || res.data || res;
      setOrder(orderObj);
      onOrderPlaced && onOrderPlaced(orderObj);
      setStep(3);
    } catch (e) {
      setError(e.message || "Erreur lors de la commande.");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  const steps = [T.step1, T.step2, T.step3];

  return (
    <div className="checkout-overlay" dir={lang === "ar" ? "rtl" : "ltr"}>
      <div className="checkout-modal">
        <div className="checkout-head">
          <h2 className="t-h4">{T.title}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {/* Step indicator */}
        <div className="checkout-steps">
          {steps.map((s, i) => (
            <div key={i} className={`cs-step ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "done" : ""}`}>
              <div className="cs-dot">{step > i + 1 ? "✓" : i + 1}</div>
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="checkout-body">
          {/* Step 1 — Address */}
          {step === 1 && (
            <div className="co-step-1">
              <div className="co-field-row">
                <div className="co-field">
                  <label>{T.name}</label>
                  <input value={address.name} onChange={e => setAddress(a => ({ ...a, name: e.target.value }))} required />
                </div>
                <div className="co-field">
                  <label>{T.phone}</label>
                  <input type="tel" value={address.phone} onChange={e => setAddress(a => ({ ...a, phone: e.target.value }))} required />
                </div>
              </div>
              <div className="co-field">
                <WilayaSelector
                  lang={lang}
                  onChange={(val) => {
                    if (!val) return;
                    const { wilaya_code, commune_id, fee, eta } = val;
                    setAddress(a => ({ ...a, wilaya_code: wilaya_code || val.wilaya, commune_id: commune_id || null, shipping_fee: fee || 0, eta_days: eta || 3 }));
                  }}
                />
              </div>
              <div className="co-field">
                <label>{T.street}</label>
                <input value={address.street} onChange={e => setAddress(a => ({ ...a, street: e.target.value }))} required />
              </div>
              <div className="co-field">
                <label>{T.notes}</label>
                <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} />
              </div>
              <button
                className="btn-primary co-next"
                disabled={!address.wilaya_code || !address.name || !address.phone || !address.street}
                onClick={() => setStep(2)}
              >{T.next}</button>
            </div>
          )}

          {/* Step 2 — Review */}
          {step === 2 && (
            <div className="co-step-2">
              <table className="co-items-table">
                <thead>
                  <tr>
                    <th>{T.product}</th>
                    <th>{T.qty}</th>
                    <th className="t-right">{T.unitPrice}</th>
                    <th className="t-right">{T.lineTotal}</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, i) => (
                    <tr key={i}>
                      <td>{item.name}{item.variant && <span className="t-mute"> · {item.variant}</span>}</td>
                      <td className="t-num">{item.qty}</td>
                      <td className="t-num t-right">{item.price.toLocaleString()} DA</td>
                      <td className="t-num t-right">{(item.price * item.qty).toLocaleString()} DA</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="co-totals">
                <div className="co-row"><span>{T.orderTotal}</span><span className="t-num">{subtotal.toLocaleString()} DA</span></div>
                <div className="co-row"><span>{T.shipping}</span><span className="t-num">{address.shipping_fee.toLocaleString()} DA</span></div>
                {coupon?.code && couponDiscount > 0 && (
                  <div className="co-row" style={{ color: "var(--rose-500)" }}>
                    <span>🏷 {coupon.code}</span>
                    <span className="t-num">−{couponDiscount.toLocaleString()} DA</span>
                  </div>
                )}
                {coupon?.type === "free_shipping" && (
                  <div className="co-row" style={{ color: "var(--rose-500)" }}>
                    <span>🏷 {coupon.code}</span>
                    <span className="t-mono" style={{ fontSize: 11 }}>Livraison offerte</span>
                  </div>
                )}

                {user && loyaltyBalance > 0 && (
                  <div className="co-loyalty">
                    <div className="co-row">
                      <span>{T.loyaltyAvail}: <strong className="t-num">{loyaltyBalance} pts</strong></span>
                    </div>
                    <div className="co-loyalty-input">
                      <label>{T.loyaltyUse}</label>
                      <input
                        type="number" min={0} max={loyaltyBalance} step={10}
                        value={loyaltyRedeem}
                        onChange={e => setLoyaltyRedeem(Math.min(loyaltyBalance, Math.max(0, Number(e.target.value))))}
                      />
                      <span className="t-mute">{T.loyaltyDzd.replace("{v}", loyaltyDiscount)}</span>
                    </div>
                  </div>
                )}

                <div className="co-row total">
                  <span><strong>Total</strong></span>
                  <span className="t-num"><strong>{total.toLocaleString()} DA</strong></span>
                </div>
              </div>

              {error && <div className="auth-error">{error}</div>}

              <div className="co-btns">
                <button className="btn-outline co-back" onClick={() => setStep(1)}>{T.back}</button>
                <button className="btn-primary co-confirm" onClick={handlePlace} disabled={loading}>
                  {loading ? <span className="btn-spinner" /> : T.confirm}
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Confirmation */}
          {step === 3 && order && (
            <div className="co-step-3">
              <div className="co-success-icon">✓</div>
              <h3 className="t-h3">{T.thankYou}</h3>
              <p>{T.deliveryMsg}</p>
              <div className="co-ref t-mono">
                <span>{T.orderRef}:</span>
                <strong>{order.reference}</strong>
              </div>
              <button className="btn-primary" onClick={onClose}>{T.close}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ACCOUNT PAGE / DRAWER
   ============================================================ */
const AccountPage = ({ lang, open, onClose, user, onLogout }) => {
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loyalty, setLoyalty] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const api = window.latinaApi;

  const T = {
    fr: {
      title: "Mon Compte", orders: "Commandes", loyalty: "Fidélité", wishlist: "Favoris",
      logout: "Se déconnecter", noOrders: "Aucune commande.", hello: "Bonjour",
      points: "points", tier: "Niveau", history: "Historique des points",
      ref: "Réf.", status: "Statut", date: "Date", total: "Total",
      pending: "En attente", confirmed: "Confirmée", preparing: "En préparation",
      shipped: "Expédiée", out_for_delivery: "En cours de livraison",
      delivered: "Livrée", cancelled: "Annulée", rto: "Retournée", refunded: "Remboursée",
      noWishlist: "Votre liste de favoris est vide.",
      loyaltyInfo: "1 point pour chaque 100 DA d'achat · 10 points = 1 DA de réduction",
    },
    ar: {
      title: "حسابي", orders: "الطلبات", loyalty: "الولاء", wishlist: "المفضلة",
      logout: "تسجيل الخروج", noOrders: "لا توجد طلبات.", hello: "مرحباً",
      points: "نقطة", tier: "المستوى", history: "سجل النقاط",
      ref: "المرجع", status: "الحالة", date: "التاريخ", total: "المجموع",
      pending: "قيد الانتظار", confirmed: "مؤكد", preparing: "جار التحضير",
      shipped: "تم الشحن", out_for_delivery: "في الطريق",
      delivered: "تم التسليم", cancelled: "ملغي", rto: "مرتجع", refunded: "مسترد",
      noWishlist: "قائمة المفضلة فارغة.",
      loyaltyInfo: "نقطة لكل 100 دج من المشتريات · 10 نقاط = خصم 1 دج",
    },
    en: {
      title: "My Account", orders: "Orders", loyalty: "Loyalty", wishlist: "Wishlist",
      logout: "Sign out", noOrders: "No orders yet.", hello: "Hello",
      points: "points", tier: "Tier", history: "Points history",
      ref: "Ref.", status: "Status", date: "Date", total: "Total",
      pending: "Pending", confirmed: "Confirmed", preparing: "Preparing",
      shipped: "Shipped", out_for_delivery: "Out for delivery",
      delivered: "Delivered", cancelled: "Cancelled", rto: "Returned", refunded: "Refunded",
      noWishlist: "Your wishlist is empty.",
      loyaltyInfo: "1 point per 100 DA · 10 points = 1 DA off",
    }
  }[lang] || {};

  const STATUS_COLORS = {
    pending: "#F59E0B", confirmed: "#3B82F6", preparing: "#8B5CF6",
    shipped: "#06B6D4", out_for_delivery: "#10B981", delivered: "#059669",
    cancelled: "#EF4444", rto: "#F97316", refunded: "#6B7280"
  };

  useEffect(() => {
    if (!open || !user) return;
    setLoading(true);
    const promises = [
      api.getOrders().then(r => setOrders(r.data || r?.items || [])).catch(() => {}),
      api.getLoyalty().then(r => setLoyalty(r.data || r)).catch(() => {}),
      api.getWishlist().then(r => setWishlistItems(r.data || r || [])).catch(() => {}),
    ];
    Promise.all(promises).finally(() => setLoading(false));
  }, [open, user]);

  const TIER_COLORS = { petal: "#C68B6F", lotus: "#9B59B6", amber: "#F59E0B" };
  const TIER_LABELS = { petal: "🌸 Petal", lotus: "🪷 Lotus", amber: "🌟 Amber" };

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="account-modal" onClick={e => e.stopPropagation()} dir={lang === "ar" ? "rtl" : "ltr"}>
        <div className="account-head">
          <div>
            <div className="account-hello t-mono">{T.hello}, <strong>{user?.name?.split(" ")[0]}</strong></div>
            <div className="account-phone t-mute">{user?.phone}</div>
          </div>
          <div className="account-head-actions">
            <button className="btn-outline-sm" onClick={() => { onLogout(); onClose(); }}>{T.logout}</button>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="account-tabs">
          {["orders", "loyalty", "wishlist"].map(t => (
            <button key={t} className={tab === t ? "active" : ""} onClick={() => setTab(t)}>
              {T[t]}
            </button>
          ))}
        </div>

        <div className="account-body">
          {loading && <div className="account-loading">…</div>}

          {/* Orders tab */}
          {!loading && tab === "orders" && (
            <div className="acc-orders">
              {orders.length === 0 ? (
                <p className="t-mute">{T.noOrders}</p>
              ) : (
                <div className="orders-list">
                  {orders.map(o => (
                    <div key={o.id} className="order-card">
                      <div className="oc-head">
                        <span className="oc-ref t-mono">{o.reference}</span>
                        <span className="oc-status" style={{ background: STATUS_COLORS[o.status] + "22", color: STATUS_COLORS[o.status], border: `1px solid ${STATUS_COLORS[o.status]}44` }}>
                          {T[o.status] || o.status}
                        </span>
                      </div>
                      <div className="oc-meta t-mute">
                        <span>{new Date(o.created_at).toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ")}</span>
                        <span className="t-num">{Number(o.total).toLocaleString()} DA</span>
                      </div>
                      {o.lines?.length > 0 && (
                        <div className="oc-items">
                          {o.lines.map((l, i) => (
                            <span key={i} className="oc-item-chip">{l.product_name} ×{l.quantity ?? l.qty}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Loyalty tab */}
          {!loading && tab === "loyalty" && loyalty && (
            <div className="acc-loyalty">
              <div className="loyalty-card-big" style={{ "--tier-color": TIER_COLORS[loyalty.tier] || "#C68B6F" }}>
                <div className="lcb-tier">{TIER_LABELS[loyalty.tier] || loyalty.tier}</div>
                <div className="lcb-points">
                  <span className="t-num lcb-pts-num">{loyalty.points?.toLocaleString()}</span>
                  <span className="lcb-pts-label">{T.points}</span>
                </div>
                {loyalty.next_tier && (
                  <div className="lcb-progress">
                    <div className="lcb-track">
                      <div className="lcb-fill" style={{ width: `${Math.min(100, loyalty.tier_progress?.pct || 0)}%` }} />
                    </div>
                    <span className="t-mono lcb-next">{loyalty.tier_progress?.needed || 0} pts → {loyalty.next_tier}</span>
                  </div>
                )}
                <div className="lcb-info t-mono">{T.loyaltyInfo}</div>
              </div>

              {loyalty.history?.length > 0 && (
                <div className="loyalty-history">
                  <div className="t-h5">{T.history}</div>
                  {loyalty.history.map((e, i) => (
                    <div key={i} className="lh-row">
                      <span className="lh-desc">{e.note || e.type}</span>
                      <span className={`lh-pts t-num ${e.points > 0 ? "earn" : "spend"}`}>{e.points > 0 ? "+" : ""}{e.points}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist tab */}
          {!loading && tab === "wishlist" && (
            <div className="acc-wishlist">
              {wishlistItems.length === 0 ? (
                <p className="t-mute">{T.noWishlist}</p>
              ) : (
                <div className="wl-grid">
                  {wishlistItems.map(p => (
                    <div key={p.id} className="wl-card">
                      {p.media?.[0] && <img src={p.media[0].url} alt={p[`name_${lang}`] || p.name_fr} />}
                      <div className="wl-name">{p[`name_${lang}`] || p.name_fr}</div>
                      <div className="wl-price t-num">{Number(p.price).toLocaleString()} DA</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   ORDER TRACKER — standalone component for tracking page
   ============================================================ */
const OrderTracker = ({ lang, reference }) => {
  const [order, setOrder] = useState(null);
  const [ref, setRef] = useState(reference || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const T = {
    fr: {
      title: "Suivre ma commande", placeholder: "Référence LAT-XXXXXX",
      track: "Suivre", notFound: "Commande introuvable.",
      status: "Statut", eta: "Livraison estimée",
    },
    ar: {
      title: "تتبع طلبي", placeholder: "المرجع LAT-XXXXXX",
      track: "تتبع", notFound: "الطلب غير موجود.",
      status: "الحالة", eta: "التسليم المتوقع",
    },
    en: {
      title: "Track My Order", placeholder: "Reference LAT-XXXXXX",
      track: "Track", notFound: "Order not found.",
      status: "Status", eta: "Estimated delivery",
    }
  }[lang] || {};

  const doTrack = async () => {
    if (!ref.trim()) return;
    setLoading(true); setError("");
    try {
      const res = await window.latinaApi.trackOrder(ref.trim());
      setOrder(res.data || res);
    } catch {
      setError(T.notFound);
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const COD_STATUSES = ["pending","confirmed","preparing","shipped","out_for_delivery","delivered"];
  const STATUS_T = {
    fr: { pending: "En attente", confirmed: "Confirmée", preparing: "En préparation", shipped: "Expédiée", out_for_delivery: "En livraison", delivered: "Livrée" },
    ar: { pending: "قيد الانتظار", confirmed: "مؤكد", preparing: "جار التحضير", shipped: "تم الشحن", out_for_delivery: "في الطريق", delivered: "تم التسليم" },
    en: { pending: "Pending", confirmed: "Confirmed", preparing: "Preparing", shipped: "Shipped", out_for_delivery: "Out for delivery", delivered: "Delivered" },
  }[lang] || {};

  const curIdx = order ? COD_STATUSES.indexOf(order.status) : -1;

  return (
    <div className="order-tracker" dir={lang === "ar" ? "rtl" : "ltr"}>
      <h3 className="t-h4">{T.title}</h3>
      <div className="ot-input">
        <input
          value={ref}
          onChange={e => setRef(e.target.value)}
          placeholder={T.placeholder}
          onKeyDown={e => e.key === "Enter" && doTrack()}
        />
        <button className="btn-primary" onClick={doTrack} disabled={loading}>
          {loading ? "…" : T.track}
        </button>
      </div>
      {error && <div className="auth-error">{error}</div>}
      {order && (
        <div className="ot-result">
          <div className="ot-progress">
            {COD_STATUSES.map((s, i) => (
              <div key={s} className={`ot-dot-wrap ${i <= curIdx ? "done" : ""} ${i === curIdx ? "active" : ""}`}>
                <div className="ot-dot">{i < curIdx ? "✓" : i + 1}</div>
                <span>{STATUS_T[s]}</span>
                {i < COD_STATUSES.length - 1 && <div className="ot-line" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { AuthModal, CartDrawer, CheckoutPage, AccountPage, OrderTracker });
