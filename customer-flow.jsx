/* global React, ReactDOM */
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ============================================================
   AUTH MODAL — Login / Register
   ============================================================ */
const AuthModal = ({ lang, open, onClose, onLogin, initialStep, resetData }) => {
  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ name: "", login: "", phone: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState("form");
  const [profilePhone, setProfilePhone] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetPw, setResetPw] = useState({ password: "", confirm: "" });
  const [resendSuccess, setResendSuccess] = useState(false);
  const api = window.latinaApi;
  const googleBtnRef = useRef(null);
  const googleCbRef = useRef(null);
  const pendingUserRef = useRef(null);

  const T = {
    fr: {
      login: "Connexion", register: "Créer un compte",
      name: "Nom complet", loginField: "Email ou téléphone",
      phone: "Téléphone (0XXXXXXXXX)", email: "Email (optionnel)",
      password: "Mot de passe", confirm: "Confirmer le mot de passe",
      loginBtn: "Se connecter", registerBtn: "S'inscrire",
      noAccount: "Pas encore de compte ?", hasAccount: "Déjà un compte ?",
      joinMsg: "Rejoignez Latina et gagnez des points fidélité.",
      completeTitle: "Dernière étape",
      completeMsg: "Votre numéro de téléphone est nécessaire pour les commandes et livraisons.",
      saveBtn: "Continuer",
      verifySentTitle: "Vérifiez votre email",
      verifySentMsg: (email) => `Un lien d'activation a été envoyé à ${email}. Cliquez dessus pour activer votre compte.`,
      resendBtn: "Renvoyer l'email",
      resendOk: "Email renvoyé !",
      accessBtn: "Accéder à mon compte →",
      forgotTitle: "Mot de passe oublié",
      forgotMsg: "Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.",
      forgotEmailPlaceholder: "Votre email",
      forgotSendBtn: "Envoyer le lien",
      forgotBack: "Retour à la connexion",
      forgotSentTitle: "Email envoyé",
      forgotSentMsg: (email) => `Si l'adresse ${email} est associée à un compte, vous recevrez un lien dans quelques minutes.`,
      forgotSentBack: "Se connecter",
      resetTitle: "Nouveau mot de passe",
      resetMsg: "Choisissez un nouveau mot de passe pour votre compte.",
      newPassword: "Nouveau mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      resetBtn: "Enregistrer",
      verifiedTitle: "Email vérifié !",
      verifiedMsg: "Votre adresse email a bien été confirmée. Vous pouvez maintenant vous connecter.",
      verifiedLoginBtn: "Se connecter",
      forgotLink: "Mot de passe oublié ?",
    },
    ar: {
      login: "تسجيل الدخول", register: "إنشاء حساب",
      name: "الاسم الكامل", loginField: "البريد أو الهاتف",
      phone: "الهاتف (0XXXXXXXXX)", email: "البريد الإلكتروني",
      password: "كلمة المرور", confirm: "تأكيد كلمة المرور",
      loginBtn: "دخول", registerBtn: "إنشاء حساب",
      noAccount: "ليس لديك حساب؟", hasAccount: "لديك حساب؟",
      joinMsg: "انضمي إلى لاتينا واكسبي نقاط الولاء.",
      completeTitle: "خطوة أخيرة",
      completeMsg: "رقم هاتفك ضروري لإتمام الطلبات والتوصيل.",
      saveBtn: "متابعة",
      verifySentTitle: "تحقق من بريدك",
      verifySentMsg: (email) => `تم إرسال رابط التفعيل إلى ${email}. انقر عليه لتفعيل حسابك.`,
      resendBtn: "إعادة الإرسال",
      resendOk: "تم الإرسال !",
      accessBtn: "الوصول إلى حسابي ←",
      forgotTitle: "نسيت كلمة المرور",
      forgotMsg: "أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور.",
      forgotEmailPlaceholder: "بريدك الإلكتروني",
      forgotSendBtn: "إرسال الرابط",
      forgotBack: "العودة لتسجيل الدخول",
      forgotSentTitle: "تم الإرسال",
      forgotSentMsg: (email) => `إذا كان ${email} مرتبطاً بحساب، ستصلك رسالة قريباً.`,
      forgotSentBack: "تسجيل الدخول",
      resetTitle: "كلمة مرور جديدة",
      resetMsg: "اختر كلمة مرور جديدة لحسابك.",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      resetBtn: "حفظ",
      verifiedTitle: "تم التحقق !",
      verifiedMsg: "تم تأكيد بريدك الإلكتروني. يمكنك الآن تسجيل الدخول.",
      verifiedLoginBtn: "تسجيل الدخول",
      forgotLink: "نسيت كلمة المرور؟",
    },
    en: {
      login: "Sign In", register: "Create Account",
      name: "Full name", loginField: "Email or phone",
      phone: "Phone (0XXXXXXXXX)", email: "Email",
      password: "Password", confirm: "Confirm password",
      loginBtn: "Sign in", registerBtn: "Register",
      noAccount: "No account yet?", hasAccount: "Already have an account?",
      joinMsg: "Join Latina and earn loyalty points.",
      completeTitle: "One last step",
      completeMsg: "Your phone number is required for orders and delivery.",
      saveBtn: "Continue",
      verifySentTitle: "Check your email",
      verifySentMsg: (email) => `An activation link was sent to ${email}. Click it to activate your account.`,
      resendBtn: "Resend email",
      resendOk: "Email resent!",
      accessBtn: "Access my account →",
      forgotTitle: "Forgot password",
      forgotMsg: "Enter your email and we'll send you a reset link.",
      forgotEmailPlaceholder: "Your email",
      forgotSendBtn: "Send reset link",
      forgotBack: "Back to sign in",
      forgotSentTitle: "Email sent",
      forgotSentMsg: (email) => `If ${email} is linked to an account, you'll receive a link shortly.`,
      forgotSentBack: "Sign in",
      resetTitle: "New password",
      resetMsg: "Choose a new password for your account.",
      newPassword: "New password",
      confirmPassword: "Confirm password",
      resetBtn: "Save",
      verifiedTitle: "Email verified!",
      verifiedMsg: "Your email address has been confirmed. You can now sign in.",
      verifiedLoginBtn: "Sign in",
      forgotLink: "Forgot password?",
    }
  }[lang] || {};

  useEffect(() => {
    if (open) {
      setError(""); setResendSuccess(false);
      setForm({ name: "", login: "", phone: "", email: "", password: "", confirm: "" });
      if (initialStep) {
        setStep(initialStep);
        if (initialStep === "reset" && resetData) {
          setForgotEmail(resetData.email || "");
        }
      } else {
        setStep("form");
      }
    } else {
      setStep("form"); setProfilePhone(""); setForgotEmail(""); setResetPw({ password: "", confirm: "" });
      setResendSuccess(false); pendingUserRef.current = null;
    }
  }, [open]);

  // Keep callback ref fresh so GSI always calls the latest version
  googleCbRef.current = async (response) => {
    setError("");
    setLoading(true);
    try {
      const data = await api.loginGoogle(response.credential);
      if (data.needs_phone) {
        pendingUserRef.current = data.user;
        setStep("complete-profile");
      } else {
        onLogin(data.user);
        onClose();
      }
    } catch (err) {
      setError(err.message || "Erreur Google, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.updateProfile({ phone: profilePhone });
      onLogin(data.user);
      onClose();
    } catch (err) {
      const msg = err.errors?.phone?.[0] || err.message || "Erreur, veuillez réessayer.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!open || !window.GOOGLE_CLIENT_ID || window.GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID_HERE") return;
    const init = () => {
      if (!window.google?.accounts?.id || !googleBtnRef.current) return false;
      window.google.accounts.id.initialize({
        client_id: window.GOOGLE_CLIENT_ID,
        callback: (r) => googleCbRef.current(r),
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        shape: "rectangular",
        width: 300,
        locale: lang === "ar" ? "ar" : lang === "en" ? "en" : "fr",
      });
      return true;
    };
    if (!init()) {
      const t = setTimeout(init, 1500);
      return () => clearTimeout(t);
    }
  }, [open, lang]);

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
        onLogin(data.user || data.data?.user);
        onClose();
      } else {
        data = await api.register({ name: form.name, phone: form.phone, email: form.email, password: form.password });
        if (data.needs_verification) {
          pendingUserRef.current = data.user || data.data?.user;
          setStep("verify-sent");
        } else {
          onLogin(data.user || data.data?.user);
          onClose();
        }
      }
    } catch (err) {
      setError(err.message || "Erreur, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.forgotPassword(forgotEmail);
      setStep("forgot-sent");
    } catch (err) {
      setError(err.message || "Erreur, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    if (resetPw.password !== resetPw.confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await api.resetPassword({ token: resetData?.token, email: forgotEmail || resetData?.email, password: resetPw.password });
      setStep("reset-done");
    } catch (err) {
      setError(err.message || "Erreur, veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendSuccess(false);
    try {
      await api.resendVerification();
      setResendSuccess(true);
    } catch {}
  };

  if (!open) return null;

  const ModalShell = ({ children, closeable = false }) => (
    <div className="modal-backdrop" onClick={closeable ? onClose : undefined}>
      <div className="auth-modal" onClick={e => e.stopPropagation()} dir={lang === "ar" ? "rtl" : "ltr"}>
        {closeable && <button className="modal-close" onClick={onClose}>✕</button>}
        <div className="auth-brand">
          <LotusMark size={32} color="var(--rose-500)" />
          <span className="brand-name">Latina</span>
        </div>
        {children}
      </div>
    </div>
  );

  if (step === "verify-sent") {
    return (
      <ModalShell closeable>
        <h3 style={{ margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)" }}>{T.verifySentTitle}</h3>
        <p className="auth-tagline" style={{ margin: "0 0 24px" }}>{T.verifySentMsg(pendingUserRef.current?.email || "")}</p>
        <button
          className="btn-primary auth-submit"
          onClick={() => { if (pendingUserRef.current) { onLogin(pendingUserRef.current); } onClose(); }}
          style={{ width: "100%", marginBottom: 12 }}
        >
          {T.accessBtn}
        </button>
        <button
          className="auth-switch" style={{ background: "none", border: "none", color: "var(--rose-500)", cursor: "pointer", fontSize: "var(--ts-1)", width: "100%", justifyContent: "center", marginTop: 4 }}
          onClick={handleResend} disabled={resendSuccess}
        >
          {resendSuccess ? T.resendOk : T.resendBtn}
        </button>
      </ModalShell>
    );
  }

  if (step === "verified") {
    return (
      <ModalShell closeable>
        <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✉️</div>
          <h3 style={{ margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)", color: "#10B981" }}>{T.verifiedTitle}</h3>
          <p className="auth-tagline">{T.verifiedMsg}</p>
          <button className="btn-primary auth-submit" style={{ marginTop: 16, width: "100%" }} onClick={() => setStep("form")}>
            {T.verifiedLoginBtn}
          </button>
        </div>
      </ModalShell>
    );
  }

  if (step === "forgot") {
    return (
      <ModalShell closeable>
        <h3 style={{ margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)" }}>{T.forgotTitle}</h3>
        <p className="auth-tagline">{T.forgotMsg}</p>
        <form className="auth-form" onSubmit={handleForgot}>
          <input type="email" placeholder={T.forgotEmailPlaceholder} value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} required autoFocus />
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : T.forgotSendBtn}
          </button>
        </form>
        <div className="auth-switch">
          <button onClick={() => setStep("form")}>{T.forgotBack}</button>
        </div>
      </ModalShell>
    );
  }

  if (step === "forgot-sent") {
    return (
      <ModalShell closeable>
        <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📩</div>
          <h3 style={{ margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)" }}>{T.forgotSentTitle}</h3>
          <p className="auth-tagline">{T.forgotSentMsg(forgotEmail)}</p>
          <button className="btn-primary auth-submit" style={{ marginTop: 16, width: "100%" }} onClick={() => setStep("form")}>
            {T.forgotSentBack}
          </button>
        </div>
      </ModalShell>
    );
  }

  if (step === "reset") {
    return (
      <ModalShell closeable>
        <h3 style={{ margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)" }}>{T.resetTitle}</h3>
        <p className="auth-tagline">{T.resetMsg}</p>
        <form className="auth-form" onSubmit={handleReset}>
          <input type="password" placeholder={T.newPassword} value={resetPw.password} onChange={e => setResetPw(p => ({ ...p, password: e.target.value }))} required minLength={8} autoFocus />
          <input type="password" placeholder={T.confirmPassword} value={resetPw.confirm} onChange={e => setResetPw(p => ({ ...p, confirm: e.target.value }))} required minLength={8} />
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : T.resetBtn}
          </button>
        </form>
      </ModalShell>
    );
  }

  if (step === "reset-done") {
    return (
      <ModalShell closeable>
        <div style={{ textAlign: "center", padding: "8px 0 16px" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
          <h3 style={{ margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)", color: "#10B981" }}>
            {lang === "ar" ? "تم بنجاح!" : lang === "en" ? "Done!" : "C'est fait !"}
          </h3>
          <p className="auth-tagline">
            {lang === "ar" ? "تم تغيير كلمة مرورك." : lang === "en" ? "Your password has been changed." : "Votre mot de passe a bien été modifié."}
          </p>
          <button className="btn-primary auth-submit" style={{ marginTop: 16, width: "100%" }} onClick={() => setStep("form")}>
            {T.verifiedLoginBtn}
          </button>
        </div>
      </ModalShell>
    );
  }

  if (step === "complete-profile") {
    return (
      <ModalShell>
          <h3 style={{ margin: "0 0 8px", fontSize: "var(--ts-4)", fontFamily: "var(--display)" }}>{T.completeTitle}</h3>
          <p className="auth-tagline">{T.completeMsg}</p>
          <form className="auth-form" onSubmit={handleProfileSubmit}>
            <input
              type="tel"
              placeholder={T.phone}
              value={profilePhone}
              onChange={e => setProfilePhone(e.target.value)}
              required
              pattern="0[5-7][0-9]{8}"
              autoFocus
            />
            {error && <div className="auth-error">{error}</div>}
            <button type="submit" className="btn-primary auth-submit" disabled={loading}>
              {loading ? <span className="btn-spinner" /> : T.saveBtn}
            </button>
          </form>
      </ModalShell>
    );
  }

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
              <input type="email" placeholder={T.email} value={form.email} onChange={e => set("email", e.target.value)} required />
            </>
          )}
          <input type="password" placeholder={T.password} value={form.password} onChange={e => set("password", e.target.value)} required minLength={8} />
          {tab === "register" && (
            <input type="password" placeholder={T.confirm} value={form.confirm} onChange={e => set("confirm", e.target.value)} required minLength={8} />
          )}

          {tab === "login" && (
            <div style={{ textAlign: lang === "ar" ? "left" : "right", marginTop: -4 }}>
              <button type="button" onClick={() => setStep("forgot")} style={{ background: "none", border: "none", color: "var(--rose-500)", cursor: "pointer", fontSize: "var(--ts-0)", textDecoration: "underline" }}>
                {T.forgotLink}
              </button>
            </div>
          )}

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? <span className="btn-spinner" /> : (tab === "login" ? T.loginBtn : T.registerBtn)}
          </button>
        </form>

        {window.GOOGLE_CLIENT_ID && window.GOOGLE_CLIENT_ID !== "YOUR_GOOGLE_CLIENT_ID_HERE" && (
          <>
            <div className="auth-divider">
              <span>{lang === "ar" ? "أو" : lang === "en" ? "or" : "ou"}</span>
            </div>
            <div ref={googleBtnRef} className="google-btn-wrap" />
          </>
        )}

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
   CROSS-SELL SECTION — shown after order confirmation
   ============================================================ */
const CrossSellSection = ({ cart, lang, onClose }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const api = window.latinaApi;
    if (!api) return;
    api.getProducts({ per_page: 40 }).then(data => {
      const raw = data.data || [];
      const processed = raw.map(p => {
        const catSlug   = (p.category?.slug || "").toLowerCase();
        const catName   = (p.category?.name_fr || "").toLowerCase();
        const parentSlug = (p.category?.parent?.slug || "").toLowerCase();
        const isBags   = catSlug.startsWith("sac") || catName.includes("sac") || catSlug === "bags";
        const isAccess = catSlug.startsWith("access") || catName.includes("access") || parentSlug.startsWith("access");
        return { ...p, _tab: isBags ? "bags" : isAccess ? "access" : "shoes", _tags: p.attributes?.tags || [] };
      });

      const orderedIds = new Set(cart.map(i => i.product_id));
      const orderedProds = processed.filter(p => orderedIds.has(p.id));
      const orderedTabs = new Set(orderedProds.map(p => p._tab));
      const orderedTags = new Set(orderedProds.flatMap(p => p._tags));

      let candidates = processed.filter(p =>
        !orderedIds.has(p.id) && !orderedTabs.has(p._tab) && p.stock > 0 &&
        (orderedTags.size === 0 || p._tags.some(t => orderedTags.has(t)))
      );

      if (candidates.length < 2) {
        candidates = processed.filter(p =>
          !orderedIds.has(p.id) && !orderedTabs.has(p._tab) && p.stock > 0
        );
      }

      setSuggestions(candidates.slice(0, 4));
    }).catch(() => {});
  }, []);

  if (!suggestions.length) return null;

  const T = {
    fr: { eyebrow: "Sélectionnés pour vous", title: "Complétez votre look", cta: "Voir la collection" },
    ar: { eyebrow: "مختارة لكِ", title: "أكملي إطلالتك", cta: "عرض المجموعة" },
    en: { eyebrow: "Selected for you", title: "Complete your look", cta: "Browse collection" },
  }[lang] || { eyebrow: "Sélectionnés pour vous", title: "Complétez votre look", cta: "Voir la collection" };

  return (
    <div className="cs-crosssell">
      <div className="cs-cx-head">
        <div className="cs-cx-eyebrow">{T.eyebrow}</div>
        <div className="cs-cx-title">{T.title}</div>
      </div>
      <div className="cs-cx-grid">
        {suggestions.map(p => {
          const name = p[`name_${lang}`] || p.name_fr;
          const price = Number(p.effective_price ?? p.price);
          const img   = p.primary_image?.url || p.media?.[0]?.url || null;
          const hasDiscount = p.compare_price && p.compare_price > price;
          return (
            <div key={p.id} className="cs-cx-card" onClick={onClose}>
              <div className="cs-cx-img">
                {img ? <img src={img} alt={name} loading="lazy" /> : <div className="cs-cx-img-ph" />}
                {p.is_featured && <span className="cs-cx-badge">★</span>}
                {hasDiscount && (
                  <span className="cs-cx-sale-badge">
                    −{Math.round((1 - price / p.compare_price) * 100)}%
                  </span>
                )}
              </div>
              <div className="cs-cx-info">
                <div className="cs-cx-name">{name}</div>
                <div className="cs-cx-prices">
                  <span className="cs-cx-price t-num">{price.toLocaleString("fr-DZ")} DA</span>
                  {hasDiscount && (
                    <span className="cs-cx-compare t-num">{Number(p.compare_price).toLocaleString("fr-DZ")}</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button className="cs-cx-cta" onClick={onClose}>{T.cta} →</button>
    </div>
  );
};

/* ============================================================
   CHECKOUT PAGE — 3-step wizard
   ============================================================ */
const CheckoutPage = ({ lang, open, onClose, cart, user, onOrderPlaced, coupon: couponProp = null, onAuthOpen }) => {
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

              {/* Guest community teaser — only shown when not logged in */}
              {!user && (
                <div className="co-join-teaser">
                  <div className="co-join-divider">
                    <span>{{fr:"Rejoignez la communauté",ar:"انضمي للمجتمع",en:"Join the community"}[lang]||"Rejoignez la communauté"}</span>
                  </div>
                  <div className="co-join-card">
                    <p className="co-join-headline">
                      {{
                        fr: "Votre commande est en route — et ce n'est que le début.",
                        ar: "طلبك في الطريق — وهذه مجرد البداية.",
                        en: "Your order is on its way — and this is just the start."
                      }[lang]||"Votre commande est en route — et ce n'est que le début."}
                    </p>
                    <ul className="co-join-perks">
                      <li>
                        <span className="co-perk-icon">✦</span>
                        <span>{{fr:"Gagnez des points à chaque achat — échangeables contre des réductions",ar:"اكسبي نقاطاً مع كل شراء وحوّليها لخصومات",en:"Earn loyalty points on every purchase"}[lang]||"Gagnez des points à chaque achat"}</span>
                      </li>
                      <li>
                        <span className="co-perk-icon">◈</span>
                        <span>{{fr:"Participez aux concours photo exclusifs de la communauté",ar:"شاركي في مسابقات الصور الحصرية",en:"Enter exclusive community photo contests"}[lang]||"Participez aux concours photo"}</span>
                      </li>
                      <li>
                        <span className="co-perk-icon">◇</span>
                        <span>{{fr:"Suivez toutes vos commandes depuis votre espace",ar:"تابعي جميع طلباتك من حسابك",en:"Track all your orders from one place"}[lang]||"Suivez toutes vos commandes"}</span>
                      </li>
                      <li>
                        <span className="co-perk-icon">◉</span>
                        <span>{{fr:"Accédez en avant-première aux nouvelles collections",ar:"احصلي على وصول مبكر للمجموعات الجديدة",en:"Early access to new collections"}[lang]||"Accès avant-première aux collections"}</span>
                      </li>
                    </ul>
                    <button
                      className="btn-primary co-join-btn"
                      onClick={() => { onClose(); setTimeout(() => onAuthOpen?.(), 200); }}
                    >
                      {{fr:"Créer mon compte — c'est gratuit",ar:"إنشاء حسابي — مجاناً",en:"Create my account — it's free"}[lang]||"Créer mon compte — c'est gratuit"}
                    </button>
                    <p className="co-join-later">
                      {{fr:"Vous pouvez aussi vous inscrire plus tard depuis le menu.",ar:"يمكنك التسجيل لاحقاً من القائمة.",en:"You can also sign up later from the menu."}[lang]||"Vous pouvez aussi vous inscrire plus tard."}
                    </p>
                  </div>
                </div>
              )}

              <CrossSellSection cart={cart} lang={lang} onClose={onClose} />
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
  const [reservations, setReservations] = useState([]);
  const [reservLoading, setReservLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);
  const api = window.latinaApi;

  useEffect(() => {
    const h = () => setRefreshTick(t => t + 1);
    window.addEventListener("latina:refresh", h);
    return () => window.removeEventListener("latina:refresh", h);
  }, []);

  const T = {
    fr: {
      title: "Mon Compte", orders: "Commandes", loyalty: "Fidélité", wishlist: "Favoris", reservations: "Réservations",
      logout: "Se déconnecter", noOrders: "Aucune commande.", hello: "Bonjour",
      points: "points", tier: "Niveau", history: "Historique des points",
      ref: "Réf.", status: "Statut", date: "Date", total: "Total",
      pending: "En attente", confirmed: "Confirmée", preparing: "En préparation",
      shipped: "Expédiée", out_for_delivery: "En cours de livraison",
      delivered: "Livrée", cancelled: "Annulée", rto: "Retournée", refunded: "Remboursée",
      noWishlist: "Votre liste de favoris est vide.",
      loyaltyInfo: "1 point pour chaque 100 DA d'achat · 10 points = 1 DA de réduction",
      noReservations: "Aucune réservation.",
      active: "Active", expired: "Expirée",
      daysLeft: (n) => n === 1 ? "1 jour restant" : `${n} jours restants`,
      hoursLeft: (n) => `${n}h restantes`,
      deposit: "Acompte (40%)", paymentStatus: "Paiement",
      paid: "Payé", payment_pending: "En attente de paiement", payment_none: "Gratuit",
      cancelResv: "Annuler", whatsappPay: "Payer via WA 💬",
      cancelConfirm: "Annuler cette réservation ?",
      qty: "Qté", duration: "Durée", expires: "Expire le",
    },
    ar: {
      title: "حسابي", orders: "الطلبات", loyalty: "الولاء", wishlist: "المفضلة", reservations: "الحجوزات",
      logout: "تسجيل الخروج", noOrders: "لا توجد طلبات.", hello: "مرحباً",
      points: "نقطة", tier: "المستوى", history: "سجل النقاط",
      ref: "المرجع", status: "الحالة", date: "التاريخ", total: "المجموع",
      pending: "قيد الانتظار", confirmed: "مؤكد", preparing: "جار التحضير",
      shipped: "تم الشحن", out_for_delivery: "في الطريق",
      delivered: "تم التسليم", cancelled: "ملغي", rto: "مرتجع", refunded: "مسترد",
      noWishlist: "قائمة المفضلة فارغة.",
      loyaltyInfo: "نقطة لكل 100 دج من المشتريات · 10 نقاط = خصم 1 دج",
      noReservations: "لا توجد حجوزات.",
      active: "نشط", expired: "منتهي",
      daysLeft: (n) => `${n} يوم متبقي`,
      hoursLeft: (n) => `${n} ساعة متبقية`,
      deposit: "الدفعة المسبقة (40%)", paymentStatus: "الدفع",
      paid: "مدفوع", payment_pending: "في انتظار الدفع", payment_none: "مجاني",
      cancelResv: "إلغاء", whatsappPay: "الدفع عبر WA 💬",
      cancelConfirm: "إلغاء هذا الحجز؟",
      qty: "الكمية", duration: "المدة", expires: "ينتهي في",
    },
    en: {
      title: "My Account", orders: "Orders", loyalty: "Loyalty", wishlist: "Wishlist", reservations: "Reservations",
      logout: "Sign out", noOrders: "No orders yet.", hello: "Hello",
      points: "points", tier: "Tier", history: "Points history",
      ref: "Ref.", status: "Status", date: "Date", total: "Total",
      pending: "Pending", confirmed: "Confirmed", preparing: "Preparing",
      shipped: "Shipped", out_for_delivery: "Out for delivery",
      delivered: "Delivered", cancelled: "Cancelled", rto: "Returned", refunded: "Refunded",
      noWishlist: "Your wishlist is empty.",
      loyaltyInfo: "1 point per 100 DA · 10 points = 1 DA off",
      noReservations: "No reservations yet.",
      active: "Active", expired: "Expired",
      daysLeft: (n) => n === 1 ? "1 day left" : `${n} days left`,
      hoursLeft: (n) => `${n}h left`,
      deposit: "Deposit (40%)", paymentStatus: "Payment",
      paid: "Paid", payment_pending: "Awaiting payment", payment_none: "Free",
      cancelResv: "Cancel", whatsappPay: "Pay via WA 💬",
      cancelConfirm: "Cancel this reservation?",
      qty: "Qty", duration: "Duration", expires: "Expires",
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
  }, [open, user, refreshTick]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch reservations + WhatsApp config when tab opens
  useEffect(() => {
    if (!open || !user || tab !== "reservations") return;
    setReservLoading(true);
    Promise.all([
      api.getMyReservations().then(r => setReservations(r || [])).catch(() => {}),
      api.getPublicConfig().then(cfg => { if (cfg?.whatsapp_reservation) window._latinaWhatsapp = cfg.whatsapp_reservation; }).catch(() => {}),
    ]).finally(() => setReservLoading(false));
  }, [open, user, tab]);

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
          {["orders", "reservations", "loyalty", "wishlist"].map(t => (
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

          {/* Reservations tab */}
          {tab === "reservations" && (() => {
            const RESV_STATUS_COLOR = {
              pending:   "#F59E0B",
              confirmed: "#3B82F6",
              active:    "#10B981",
              expired:   "#9CA3AF",
              cancelled: "#EF4444",
            };
            const PAYMENT_LABEL = { paid: T.paid, pending: T.payment_pending, none: T.payment_none };

            return (
              <div className="acc-reservations">
                {reservLoading && <div className="account-loading">…</div>}
                {!reservLoading && reservations.length === 0 && (
                  <p className="t-mute">{T.noReservations}</p>
                )}
                {!reservLoading && reservations.map(r => {
                  const statusColor = RESV_STATUS_COLOR[r.status] || "#9CA3AF";
                  const isPaid      = r.duration_days > 1;
                  const payStatus   = r.payment_status || "none";
                  const expiresDate = r.expires_at ? new Date(r.expires_at).toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ") : "—";
                  const daysLeft    = r.days_left ?? 0;
                  const hoursLeft   = r.hours_left ?? 0;
                  const isUrgent    = ["pending", "confirmed", "active"].includes(r.status) && daysLeft === 0;

                  return (
                    <div key={r.id} className={`resv-card${isUrgent ? " urgent" : ""}`}>
                      <div className="resv-card-head">
                        <span className="resv-card-ref t-mono">{r.reference}</span>
                        <span className="resv-card-status" style={{ background: statusColor + "22", color: statusColor, border: `1px solid ${statusColor}44` }}>
                          {T[r.status] || r.status}
                        </span>
                      </div>

                      <div className="resv-card-product">{r.product?.name_fr || "—"}</div>

                      <div className="resv-card-meta">
                        <div><span className="rcm-label">{T.duration}</span><span className="rcm-val">{r.duration_days}j</span></div>
                        <div><span className="rcm-label">{T.qty}</span><span className="rcm-val">{r.quantity}</span></div>
                        <div><span className="rcm-label">{T.expires}</span><span className="rcm-val t-num">{expiresDate}</span></div>
                        {isPaid && (
                          <div><span className="rcm-label">{T.deposit}</span><span className="rcm-val t-num">{Number(r.partial_amount).toLocaleString("fr-DZ")} DA</span></div>
                        )}
                        {isPaid && (
                          <div><span className="rcm-label">{T.paymentStatus}</span><span className="rcm-val">{PAYMENT_LABEL[payStatus] || payStatus}</span></div>
                        )}
                      </div>

                      {["pending", "confirmed", "active"].includes(r.status) && (
                        <div className={`resv-card-timer${isUrgent ? " urgent" : ""}`}>
                          {isUrgent ? T.hoursLeft(hoursLeft) : T.daysLeft(daysLeft)}
                        </div>
                      )}

                      {/* Actions removed — reservations are managed by admin */}
                    </div>
                  );
                })}
              </div>
            );
          })()}

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

/* ============================================================
   FEEDBACK MODAL — star rating, category, comment
   ============================================================ */
const FeedbackModal = ({ lang, open, onClose, user, onAuthOpen }) => {
  const [stars, setStars]     = useState(0);
  const [hovered, setHovered] = useState(0);
  const [cat, setCat]         = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone]       = useState(false);
  const [error, setError]     = useState("");

  const T = {
    fr: {
      title: "Votre avis nous importe",
      sub: "Aidez-nous à améliorer votre expérience",
      rateLabel: "Notez votre expérience",
      catLabel: "Domaine",
      commentLabel: "Commentaire (optionnel)",
      commentPh: "Dites-nous en plus…",
      submit: "Envoyer mon avis",
      submitting: "Envoi…",
      doneTitle: "Merci pour votre retour !",
      doneSub: "Votre avis a bien été reçu.",
      close: "Fermer",
      cats: ["Qualité produit", "Livraison", "Service client", "Site web", "Prix", "Autre"],
      required: "Merci de choisir une note.",
    },
    ar: {
      title: "رأيك يهمنا",
      sub: "ساعدنا على تحسين تجربتك",
      rateLabel: "قيّم تجربتك",
      catLabel: "المجال",
      commentLabel: "تعليق (اختياري)",
      commentPh: "أخبرنا أكثر…",
      submit: "إرسال رأيك",
      submitting: "جارٍ الإرسال…",
      doneTitle: "شكراً على ملاحظاتك!",
      doneSub: "تم استلام رأيك بنجاح.",
      close: "إغلاق",
      cats: ["جودة المنتج", "التوصيل", "خدمة العملاء", "الموقع", "السعر", "أخرى"],
      required: "الرجاء اختيار تقييم.",
    },
    en: {
      title: "Your feedback matters",
      sub: "Help us improve your experience",
      rateLabel: "Rate your experience",
      catLabel: "Category",
      commentLabel: "Comment (optional)",
      commentPh: "Tell us more…",
      submit: "Submit feedback",
      submitting: "Sending…",
      doneTitle: "Thank you for your feedback!",
      doneSub: "We have received your review.",
      close: "Close",
      cats: ["Product quality", "Delivery", "Customer service", "Website", "Pricing", "Other"],
      required: "Please choose a rating.",
    },
  };
  const t = T[lang] || T.fr;

  const reset = () => { setStars(0); setHovered(0); setCat(""); setComment(""); setDone(false); setError(""); };

  if (!open) return null;

  const handleSubmit = async () => {
    if (!stars) { setError(t.required); return; }
    setLoading(true); setError("");
    try {
      await window.latinaApi.submitFeedback({ rating: stars, category: cat || null, comment: comment || null, lang });
      setDone(true);
    } catch (e) {
      setError(e.message || "Erreur réseau, réessayez.");
    } finally { setLoading(false); }
  };

  const handleClose = () => { reset(); onClose(); };

  const loginWall = {
    fr: { msg: "Connectez-vous pour laisser un avis.", btn: "Se connecter" },
    ar: { msg: "سجلي الدخول لترك تقييم.", btn: "تسجيل الدخول" },
    en: { msg: "Sign in to leave a review.", btn: "Sign in" },
  }[lang] || { msg: "Sign in to leave a review.", btn: "Sign in" };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="feedback-modal" onClick={e => e.stopPropagation()}>
        {/* Login wall */}
        {!user && (
          <div className="fb-login-wall">
            <button className="modal-close" onClick={handleClose}>✕</button>
            <div className="fb-login-icon">🔒</div>
            <p className="fb-login-msg">{loginWall.msg}</p>
            <button className="fb-submit" onClick={() => { handleClose(); onAuthOpen?.(); }}>{loginWall.btn}</button>
          </div>
        )}
        {user && <>
        <button className="modal-close" onClick={handleClose}>✕</button>
        {done ? (
          <div className="fb-success">
            <div className="fb-success-icon">✦</div>
            <h3>{t.doneTitle}</h3>
            <p>{t.doneSub}</p>
            <button className="fb-submit" onClick={handleClose}>{t.close}</button>
          </div>
        ) : (
          <>
            <div className="fb-header">
              <h2 className="fb-title">{t.title}</h2>
              <p className="fb-sub">{t.sub}</p>
            </div>

            <div className="fb-section">
              <label className="fb-label">{t.rateLabel}</label>
              <div className="fb-stars-row">
                {[1,2,3,4,5].map(n => (
                  <button
                    key={n}
                    className={`fb-star ${(hovered || stars) >= n ? "active" : ""}`}
                    onMouseEnter={() => setHovered(n)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setStars(n)}
                  >★</button>
                ))}
                {stars > 0 && <span className="fb-star-text">{["","Médiocre","Passable","Bien","Très bien","Excellent"][stars]}</span>}
              </div>
            </div>

            <div className="fb-section">
              <label className="fb-label">{t.catLabel}</label>
              <div className="fb-cats">
                {t.cats.map(c => (
                  <button key={c} className={`fb-cat ${cat === c ? "active" : ""}`} onClick={() => setCat(c === cat ? "" : c)}>{c}</button>
                ))}
              </div>
            </div>

            <div className="fb-section">
              <label className="fb-label">{t.commentLabel}</label>
              <textarea
                className="fb-textarea"
                placeholder={t.commentPh}
                maxLength={500}
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <span className="fb-char">{comment.length}/500</span>
            </div>

            {error && <p className="fb-error">{error}</p>}
            <button className="fb-submit" onClick={handleSubmit} disabled={loading}>
              {loading ? t.submitting : t.submit}
            </button>
          </>
        )}
        </>}
      </div>
    </div>
  );
};

/* ============================================================
   SUPPORT MODAL — ticket wizard + tracker
   ============================================================ */
const TICKET_CATS = {
  fr: ["Commande / livraison", "Produit défectueux", "Remboursement", "Compte & connexion", "Programme fidélité", "Autre"],
  ar: ["الطلب / التوصيل", "منتج معطوب", "استرداد المبلغ", "الحساب وتسجيل الدخول", "برنامج الولاء", "أخرى"],
  en: ["Order / delivery", "Defective product", "Refund", "Account & login", "Loyalty program", "Other"],
};

const SupportModal = ({ lang, open, onClose, user }) => {
  const [mode, setMode]       = useState("new");    // new | track | mine
  const [step, setStep]       = useState(1);        // 1 | 2 | 3
  const [form, setForm]       = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", subject: "", category: "", priority: "normal", description: "" });
  const [ref, setRef]         = useState("");
  const [trackRef, setTrackRef] = useState("");
  const [tracked, setTracked] = useState(null);
  const [trackError, setTrackError] = useState("");
  const [myTickets, setMyTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [fieldErr, setFieldErr] = useState({});

  const T = {
    fr: {
      title: "Support client",
      tabNew: "Nouveau ticket",
      tabTrack: "Suivre un ticket",
      tabMine: "Mes tickets",
      step1: "Vos coordonnées",
      step2: "Votre demande",
      step3: "Confirmation",
      name: "Nom complet", email: "Email", phone: "Téléphone",
      subject: "Sujet", catLabel: "Catégorie", prioLabel: "Priorité",
      desc: "Description détaillée",
      descPh: "Décrivez votre problème en détail…",
      prios: [{ v:"low", l:"Basse" },{ v:"normal", l:"Normale" },{ v:"high", l:"Haute" },{ v:"urgent", l:"Urgent" }],
      next: "Suivant", back: "Retour", submit: "Envoyer le ticket", submitting: "Envoi…",
      doneTitle: "Ticket créé avec succès !",
      doneSub: "Référence de votre ticket :",
      doneInfo: "Conservez cette référence pour suivre l'état de votre demande.",
      close: "Fermer",
      trackLabel: "Référence du ticket",
      trackPh: "Ex: TKT-XXXXXX",
      trackBtn: "Rechercher",
      tracking: "Recherche…",
      trackNotFound: "Aucun ticket trouvé avec cette référence.",
      stateLabels: { new:"Nouveau", attributed:"Attribué", pending:"En attente", planned:"Planifié", in_progress:"En cours", resolved:"Résolu", closed:"Fermé" },
      noTickets: "Aucun ticket ouvert.",
      req: "Champ requis",
    },
    ar: {
      title: "دعم العملاء",
      tabNew: "تذكرة جديدة",
      tabTrack: "متابعة تذكرة",
      tabMine: "تذاكري",
      step1: "بياناتك", step2: "طلبك", step3: "تأكيد",
      name: "الاسم الكامل", email: "البريد الإلكتروني", phone: "الهاتف",
      subject: "الموضوع", catLabel: "الفئة", prioLabel: "الأولوية",
      desc: "وصف تفصيلي", descPh: "صف مشكلتك بالتفصيل…",
      prios: [{ v:"low", l:"منخفضة" },{ v:"normal", l:"عادية" },{ v:"high", l:"عالية" },{ v:"urgent", l:"عاجل" }],
      next: "التالي", back: "رجوع", submit: "إرسال التذكرة", submitting: "جارٍ الإرسال…",
      doneTitle: "تم إنشاء التذكرة بنجاح!", doneSub: "مرجع تذكرتك:",
      doneInfo: "احتفظ بهذا المرجع لمتابعة حالة طلبك.",
      close: "إغلاق",
      trackLabel: "مرجع التذكرة", trackPh: "مثال: TKT-XXXXXX", trackBtn: "بحث", tracking: "جارٍ البحث…",
      trackNotFound: "لم يتم العثور على أي تذكرة بهذا المرجع.",
      stateLabels: { new:"جديدة", attributed:"منسوبة", pending:"معلقة", planned:"مجدولة", in_progress:"جارٍ", resolved:"محلولة", closed:"مغلقة" },
      noTickets: "لا توجد تذاكر مفتوحة.",
      req: "حقل مطلوب",
    },
    en: {
      title: "Customer support",
      tabNew: "New ticket",
      tabTrack: "Track ticket",
      tabMine: "My tickets",
      step1: "Contact info", step2: "Your request", step3: "Confirmation",
      name: "Full name", email: "Email", phone: "Phone",
      subject: "Subject", catLabel: "Category", prioLabel: "Priority",
      desc: "Detailed description", descPh: "Describe your issue in detail…",
      prios: [{ v:"low", l:"Low" },{ v:"normal", l:"Normal" },{ v:"high", l:"High" },{ v:"urgent", l:"Urgent" }],
      next: "Next", back: "Back", submit: "Submit ticket", submitting: "Sending…",
      doneTitle: "Ticket created successfully!", doneSub: "Your ticket reference:",
      doneInfo: "Keep this reference to track your request status.",
      close: "Close",
      trackLabel: "Ticket reference", trackPh: "e.g. TKT-XXXXXX", trackBtn: "Search", tracking: "Searching…",
      trackNotFound: "No ticket found with this reference.",
      stateLabels: { new:"New", attributed:"Attributed", pending:"Pending", planned:"Planned", in_progress:"In progress", resolved:"Resolved", closed:"Closed" },
      noTickets: "No open tickets.",
      req: "Required field",
    },
  };
  const t = T[lang] || T.fr;
  const cats = TICKET_CATS[lang] || TICKET_CATS.fr;

  useEffect(() => {
    if (open && mode === "mine" && user) {
      window.latinaApi.getMyTickets().then(d => setMyTickets(d.data || d || [])).catch(() => {});
    }
  }, [open, mode, user]);

  const reset = () => { setStep(1); setRef(""); setTrackRef(""); setTracked(null); setTrackError(""); setError(""); setFieldErr({}); setForm({ name: user?.name||"", email: user?.email||"", phone: user?.phone||"", subject:"", category:"", priority:"normal", description:"" }); };
  if (!open) return null;
  const handleClose = () => { reset(); onClose(); };

  const setF = (k, v) => { setForm(p => ({ ...p, [k]: v })); setFieldErr(p => ({ ...p, [k]: "" })); };

  const validateStep1 = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = t.req;
    if (!form.email.trim() && !form.phone.trim()) errs.email = t.req;
    setFieldErr(errs);
    return Object.keys(errs).length === 0;
  };
  const validateStep2 = () => {
    const errs = {};
    if (!form.subject.trim()) errs.subject = t.req;
    if (!form.description.trim()) errs.description = t.req;
    setFieldErr(errs);
    return Object.keys(errs).length === 0;
  };

  const handleTrack = async () => {
    if (!trackRef.trim()) return;
    setLoading(true); setTrackError(""); setTracked(null);
    try {
      const d = await window.latinaApi.trackTicket(trackRef.trim());
      setTracked(d.data || d);
    } catch { setTrackError(t.trackNotFound); }
    finally { setLoading(false); }
  };

  const handleSubmit = async () => {
    setLoading(true); setError("");
    try {
      const res = await window.latinaApi.createTicket({ ...form, lang });
      setRef((res.data || res).reference || (res.data || res).ref || "TKT-??????");
      setStep(3);
    } catch (e) { setError(e.message || "Erreur réseau."); }
    finally { setLoading(false); }
  };

  const stateColor = (s) => ({ new:"#60A5FA", attributed:"#A78BFA", pending:"#FCD34D", planned:"#67E8F9", in_progress:"#E2B8A2", resolved:"#34D399", closed:"#9A9590" }[s] || "#9A9590");

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="support-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>✕</button>
        <h2 className="sup-title">{t.title}</h2>

        {/* Mode tabs */}
        <div className="sup-tabs">
          {["new","track","mine"].map((m, i) => (
            <button key={m} className={`sup-tab ${mode === m ? "active" : ""}`} onClick={() => { setMode(m); reset(); }}>
              {[t.tabNew, t.tabTrack, t.tabMine][i]}
            </button>
          ))}
        </div>

        {/* ── NEW TICKET ─────────────────────────────────── */}
        {mode === "new" && !user && (
          <div className="sup-login-wall">
            <div className="fb-login-icon">🔒</div>
            <p className="fb-login-msg">
              { lang === "ar" ? "سجلي الدخول لفتح تذكرة دعم." : lang === "en" ? "Sign in to open a support ticket." : "Connectez-vous pour créer un ticket de support." }
            </p>
          </div>
        )}

        {mode === "new" && user && (
          <>
            {step < 3 && (
              <div className="sup-steps">
                {[t.step1, t.step2].map((label, i) => (
                  <div key={i} className={`sup-step ${step === i+1 ? "active" : step > i+1 ? "done" : ""}`}>
                    <div className="sup-step-dot">{step > i+1 ? "✓" : i+1}</div>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="sup-body">
              {step === 1 && (
                <>
                  <div className="sup-field">
                    <label className="sup-label">{t.name}</label>
                    <input className={`sup-input ${fieldErr.name ? "err" : ""}`} value={form.name} onChange={e => setF("name", e.target.value)} placeholder={t.name} />
                    {fieldErr.name && <span className="sup-error">{fieldErr.name}</span>}
                  </div>
                  <div className="sup-field">
                    <label className="sup-label">{t.email}</label>
                    <input className={`sup-input ${fieldErr.email ? "err" : ""}`} type="email" value={form.email} onChange={e => setF("email", e.target.value)} placeholder={t.email} />
                    {fieldErr.email && <span className="sup-error">{fieldErr.email}</span>}
                  </div>
                  <div className="sup-field">
                    <label className="sup-label">{t.phone}</label>
                    <input className="sup-input" type="tel" value={form.phone} onChange={e => setF("phone", e.target.value)} placeholder="0XXXXXXXXX" />
                  </div>
                  <div className="sup-btn-row">
                    <button className="sup-btn-primary" onClick={() => { if (validateStep1()) setStep(2); }}>{t.next}</button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="sup-field">
                    <label className="sup-label">{t.subject}</label>
                    <input className={`sup-input ${fieldErr.subject ? "err" : ""}`} value={form.subject} onChange={e => setF("subject", e.target.value)} placeholder={t.subject} />
                    {fieldErr.subject && <span className="sup-error">{fieldErr.subject}</span>}
                  </div>
                  <div className="sup-field">
                    <label className="sup-label">{t.catLabel}</label>
                    <div className="sup-cat-grid">
                      {cats.map(c => (
                        <button key={c} className={`sup-cat-btn ${form.category === c ? "active" : ""}`} onClick={() => setF("category", c)}>{c}</button>
                      ))}
                    </div>
                  </div>
                  <div className="sup-field">
                    <label className="sup-label">{t.prioLabel}</label>
                    <div className="sup-prio-row">
                      {t.prios.map(p => (
                        <button key={p.v} className={`sup-prio-btn ${form.priority === p.v ? "active" : ""}`} onClick={() => setF("priority", p.v)}>{p.l}</button>
                      ))}
                    </div>
                  </div>
                  <div className="sup-field">
                    <label className="sup-label">{t.desc}</label>
                    <textarea className={`sup-textarea ${fieldErr.description ? "err" : ""}`} rows={4} value={form.description} onChange={e => setF("description", e.target.value)} placeholder={t.descPh} />
                    {fieldErr.description && <span className="sup-error">{fieldErr.description}</span>}
                  </div>
                  {error && <p className="sup-error">{error}</p>}
                  <div className="sup-btn-row">
                    <button className="sup-btn-ghost" onClick={() => setStep(1)}>{t.back}</button>
                    <button className="sup-btn-primary" onClick={() => { if (validateStep2()) handleSubmit(); }} disabled={loading}>
                      {loading ? t.submitting : t.submit}
                    </button>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="sup-success">
                  <div className="sup-success-icon">✦</div>
                  <h3>{t.doneTitle}</h3>
                  <p className="sup-success-sub">{t.doneSub}</p>
                  <div className="sup-ref-badge">{ref}</div>
                  <p className="sup-success-info">{t.doneInfo}</p>
                  <button className="sup-btn-primary" onClick={handleClose}>{t.close}</button>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── TRACK ──────────────────────────────────────── */}
        {mode === "track" && (
          <div className="sup-body">
            <div className="sup-field">
              <label className="sup-label">{t.trackLabel}</label>
              <div style={{ display:"flex", gap:"8px" }}>
                <input className="sup-input" value={trackRef} onChange={e => setTrackRef(e.target.value)} placeholder={t.trackPh} onKeyDown={e => e.key === "Enter" && handleTrack()} />
                <button className="sup-btn-primary" style={{ flexShrink:0 }} onClick={handleTrack} disabled={loading}>{loading ? t.tracking : t.trackBtn}</button>
              </div>
              {trackError && <span className="sup-error">{trackError}</span>}
            </div>

            {tracked && (
              <div className="sup-tracked">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                  <span className="sup-ref-badge">{tracked.reference || tracked.ref}</span>
                  <span style={{ padding:"3px 12px", borderRadius:"20px", fontSize:"12px", fontWeight:600, background:`${stateColor(tracked.status)}22`, color:stateColor(tracked.status) }}>
                    {t.stateLabels[tracked.status] || tracked.status}
                  </span>
                </div>
                <p style={{ fontSize:"13px", fontWeight:600, marginBottom:"6px" }}>{tracked.subject}</p>
                <p style={{ fontSize:"12px", color:"var(--text-muted)" }}>{tracked.category}</p>
                {tracked.created_at && <p style={{ fontSize:"11px", color:"var(--text-muted)", marginTop:"8px" }}>Créé le {new Date(tracked.created_at).toLocaleDateString()}</p>}
              </div>
            )}
          </div>
        )}

        {/* ── MY TICKETS ─────────────────────────────────── */}
        {mode === "mine" && (
          <div className="sup-body">
            {!user ? (
              <p style={{ textAlign:"center", color:"var(--text-muted)", padding:"24px 0" }}>Connectez-vous pour voir vos tickets.</p>
            ) : myTickets.length === 0 ? (
              <p style={{ textAlign:"center", color:"var(--text-muted)", padding:"24px 0" }}>{t.noTickets}</p>
            ) : myTickets.map(tk => (
              <div key={tk.id || tk.reference} className="my-ticket-row">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <span className="sup-ref-badge">{tk.reference || tk.ref}</span>
                  <span style={{ padding:"2px 10px", borderRadius:"12px", fontSize:"11px", fontWeight:600, background:`${stateColor(tk.status)}22`, color:stateColor(tk.status) }}>
                    {t.stateLabels[tk.status] || tk.status}
                  </span>
                </div>
                <p style={{ fontSize:"13px", fontWeight:500, marginTop:"6px" }}>{tk.subject}</p>
                <p style={{ fontSize:"11px", color:"var(--text-muted)", marginTop:"4px" }}>{tk.category} · {tk.priority}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { AuthModal, CartDrawer, CheckoutPage, AccountPage, OrderTracker, FeedbackModal, SupportModal });
