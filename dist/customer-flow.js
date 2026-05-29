(() => {
  // customer-flow.jsx
  var { useState, useEffect, useRef, useCallback, useMemo } = React;
  var AuthModal = ({ lang, open, onClose, onLogin, initialStep, resetData }) => {
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
        login: "Connexion",
        register: "Cr\xE9er un compte",
        name: "Nom complet",
        loginField: "Email ou t\xE9l\xE9phone",
        phone: "T\xE9l\xE9phone (0XXXXXXXXX)",
        email: "Email (optionnel)",
        password: "Mot de passe",
        confirm: "Confirmer le mot de passe",
        loginBtn: "Se connecter",
        registerBtn: "S'inscrire",
        noAccount: "Pas encore de compte ?",
        hasAccount: "D\xE9j\xE0 un compte ?",
        joinMsg: "Rejoignez Latina et gagnez des points fid\xE9lit\xE9.",
        completeTitle: "Derni\xE8re \xE9tape",
        completeMsg: "Votre num\xE9ro de t\xE9l\xE9phone est n\xE9cessaire pour les commandes et livraisons.",
        saveBtn: "Continuer",
        verifySentTitle: "V\xE9rifiez votre email",
        verifySentMsg: (email) => `Un lien d'activation a \xE9t\xE9 envoy\xE9 \xE0 ${email}. Cliquez dessus pour activer votre compte.`,
        resendBtn: "Renvoyer l'email",
        resendOk: "Email renvoy\xE9 !",
        accessBtn: "Acc\xE9der \xE0 mon compte \u2192",
        forgotTitle: "Mot de passe oubli\xE9",
        forgotMsg: "Entrez votre adresse email et nous vous enverrons un lien pour r\xE9initialiser votre mot de passe.",
        forgotEmailPlaceholder: "Votre email",
        forgotSendBtn: "Envoyer le lien",
        forgotBack: "Retour \xE0 la connexion",
        forgotSentTitle: "Email envoy\xE9",
        forgotSentMsg: (email) => `Si l'adresse ${email} est associ\xE9e \xE0 un compte, vous recevrez un lien dans quelques minutes.`,
        forgotSentBack: "Se connecter",
        resetTitle: "Nouveau mot de passe",
        resetMsg: "Choisissez un nouveau mot de passe pour votre compte.",
        newPassword: "Nouveau mot de passe",
        confirmPassword: "Confirmer le mot de passe",
        resetBtn: "Enregistrer",
        verifiedTitle: "Email v\xE9rifi\xE9 !",
        verifiedMsg: "Votre adresse email a bien \xE9t\xE9 confirm\xE9e. Vous pouvez maintenant vous connecter.",
        verifiedLoginBtn: "Se connecter",
        forgotLink: "Mot de passe oubli\xE9 ?"
      },
      ar: {
        login: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
        register: "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628",
        name: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644",
        loginField: "\u0627\u0644\u0628\u0631\u064A\u062F \u0623\u0648 \u0627\u0644\u0647\u0627\u062A\u0641",
        phone: "\u0627\u0644\u0647\u0627\u062A\u0641 (0XXXXXXXXX)",
        email: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
        password: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
        confirm: "\u062A\u0623\u0643\u064A\u062F \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
        loginBtn: "\u062F\u062E\u0648\u0644",
        registerBtn: "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628",
        noAccount: "\u0644\u064A\u0633 \u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F",
        hasAccount: "\u0644\u062F\u064A\u0643 \u062D\u0633\u0627\u0628\u061F",
        joinMsg: "\u0627\u0646\u0636\u0645\u064A \u0625\u0644\u0649 \u0644\u0627\u062A\u064A\u0646\u0627 \u0648\u0627\u0643\u0633\u0628\u064A \u0646\u0642\u0627\u0637 \u0627\u0644\u0648\u0644\u0627\u0621.",
        completeTitle: "\u062E\u0637\u0648\u0629 \u0623\u062E\u064A\u0631\u0629",
        completeMsg: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641\u0643 \u0636\u0631\u0648\u0631\u064A \u0644\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0637\u0644\u0628\u0627\u062A \u0648\u0627\u0644\u062A\u0648\u0635\u064A\u0644.",
        saveBtn: "\u0645\u062A\u0627\u0628\u0639\u0629",
        verifySentTitle: "\u062A\u062D\u0642\u0642 \u0645\u0646 \u0628\u0631\u064A\u062F\u0643",
        verifySentMsg: (email) => `\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0631\u0627\u0628\u0637 \u0627\u0644\u062A\u0641\u0639\u064A\u0644 \u0625\u0644\u0649 ${email}. \u0627\u0646\u0642\u0631 \u0639\u0644\u064A\u0647 \u0644\u062A\u0641\u0639\u064A\u0644 \u062D\u0633\u0627\u0628\u0643.`,
        resendBtn: "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644",
        resendOk: "\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644 !",
        accessBtn: "\u0627\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649 \u062D\u0633\u0627\u0628\u064A \u2190",
        forgotTitle: "\u0646\u0633\u064A\u062A \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
        forgotMsg: "\u0623\u062F\u062E\u0644 \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A \u0648\u0633\u0646\u0631\u0633\u0644 \u0644\u0643 \u0631\u0627\u0628\u0637\u0627\u064B \u0644\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631.",
        forgotEmailPlaceholder: "\u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
        forgotSendBtn: "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u0631\u0627\u0628\u0637",
        forgotBack: "\u0627\u0644\u0639\u0648\u062F\u0629 \u0644\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
        forgotSentTitle: "\u062A\u0645 \u0627\u0644\u0625\u0631\u0633\u0627\u0644",
        forgotSentMsg: (email) => `\u0625\u0630\u0627 \u0643\u0627\u0646 ${email} \u0645\u0631\u062A\u0628\u0637\u0627\u064B \u0628\u062D\u0633\u0627\u0628\u060C \u0633\u062A\u0635\u0644\u0643 \u0631\u0633\u0627\u0644\u0629 \u0642\u0631\u064A\u0628\u0627\u064B.`,
        forgotSentBack: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
        resetTitle: "\u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u062C\u062F\u064A\u062F\u0629",
        resetMsg: "\u0627\u062E\u062A\u0631 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631 \u062C\u062F\u064A\u062F\u0629 \u0644\u062D\u0633\u0627\u0628\u0643.",
        newPassword: "\u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631 \u0627\u0644\u062C\u062F\u064A\u062F\u0629",
        confirmPassword: "\u062A\u0623\u0643\u064A\u062F \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631",
        resetBtn: "\u062D\u0641\u0638",
        verifiedTitle: "\u062A\u0645 \u0627\u0644\u062A\u062D\u0642\u0642 !",
        verifiedMsg: "\u062A\u0645 \u062A\u0623\u0643\u064A\u062F \u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A. \u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u0622\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644.",
        verifiedLoginBtn: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644",
        forgotLink: "\u0646\u0633\u064A\u062A \u0643\u0644\u0645\u0629 \u0627\u0644\u0645\u0631\u0648\u0631\u061F"
      },
      en: {
        login: "Sign In",
        register: "Create Account",
        name: "Full name",
        loginField: "Email or phone",
        phone: "Phone (0XXXXXXXXX)",
        email: "Email",
        password: "Password",
        confirm: "Confirm password",
        loginBtn: "Sign in",
        registerBtn: "Register",
        noAccount: "No account yet?",
        hasAccount: "Already have an account?",
        joinMsg: "Join Latina and earn loyalty points.",
        completeTitle: "One last step",
        completeMsg: "Your phone number is required for orders and delivery.",
        saveBtn: "Continue",
        verifySentTitle: "Check your email",
        verifySentMsg: (email) => `An activation link was sent to ${email}. Click it to activate your account.`,
        resendBtn: "Resend email",
        resendOk: "Email resent!",
        accessBtn: "Access my account \u2192",
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
        forgotLink: "Forgot password?"
      }
    }[lang] || {};
    useEffect(() => {
      if (open) {
        setError("");
        setResendSuccess(false);
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
        setStep("form");
        setProfilePhone("");
        setForgotEmail("");
        setResetPw({ password: "", confirm: "" });
        setResendSuccess(false);
        pendingUserRef.current = null;
      }
    }, [open]);
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
        setError(err.message || "Erreur Google, veuillez r\xE9essayer.");
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
        const msg = err.errors?.phone?.[0] || err.message || "Erreur, veuillez r\xE9essayer.";
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
          callback: (r) => googleCbRef.current(r)
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: "outline",
          size: "large",
          shape: "rectangular",
          width: 300,
          locale: lang === "ar" ? "ar" : lang === "en" ? "en" : "fr"
        });
        return true;
      };
      if (!init()) {
        const t = setTimeout(init, 1500);
        return () => clearTimeout(t);
      }
    }, [open, lang]);
    const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
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
        setError(err.message || "Erreur, veuillez r\xE9essayer.");
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
        setError(err.message || "Erreur, veuillez r\xE9essayer.");
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
        setError(err.message || "Erreur, veuillez r\xE9essayer.");
      } finally {
        setLoading(false);
      }
    };
    const handleResend = async () => {
      setResendSuccess(false);
      try {
        await api.resendVerification();
        setResendSuccess(true);
      } catch {
      }
    };
    if (!open) return null;
    const ModalShell = ({ children, closeable = false }) => /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: closeable ? onClose : void 0 }, /* @__PURE__ */ React.createElement("div", { className: "auth-modal", onClick: (e) => e.stopPropagation(), dir: lang === "ar" ? "rtl" : "ltr" }, closeable && /* @__PURE__ */ React.createElement("button", { className: "modal-close", onClick: onClose }, "\u2715"), /* @__PURE__ */ React.createElement("div", { className: "auth-brand" }, /* @__PURE__ */ React.createElement(LotusMark, { size: 32, color: "var(--rose-500)" }), /* @__PURE__ */ React.createElement("span", { className: "brand-name" }, "Latina")), children));
    if (step === "verify-sent") {
      return /* @__PURE__ */ React.createElement(ModalShell, { closeable: true }, /* @__PURE__ */ React.createElement("h3", { style: { margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)" } }, T.verifySentTitle), /* @__PURE__ */ React.createElement("p", { className: "auth-tagline", style: { margin: "0 0 24px" } }, T.verifySentMsg(pendingUserRef.current?.email || "")), /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "btn-primary auth-submit",
          onClick: () => {
            if (pendingUserRef.current) {
              onLogin(pendingUserRef.current);
            }
            onClose();
          },
          style: { width: "100%", marginBottom: 12 }
        },
        T.accessBtn
      ), /* @__PURE__ */ React.createElement(
        "button",
        {
          className: "auth-switch",
          style: { background: "none", border: "none", color: "var(--rose-500)", cursor: "pointer", fontSize: "var(--ts-1)", width: "100%", justifyContent: "center", marginTop: 4 },
          onClick: handleResend,
          disabled: resendSuccess
        },
        resendSuccess ? T.resendOk : T.resendBtn
      ));
    }
    if (step === "verified") {
      return /* @__PURE__ */ React.createElement(ModalShell, { closeable: true }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "8px 0 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 12 } }, "\u2709\uFE0F"), /* @__PURE__ */ React.createElement("h3", { style: { margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)", color: "#10B981" } }, T.verifiedTitle), /* @__PURE__ */ React.createElement("p", { className: "auth-tagline" }, T.verifiedMsg), /* @__PURE__ */ React.createElement("button", { className: "btn-primary auth-submit", style: { marginTop: 16, width: "100%" }, onClick: () => setStep("form") }, T.verifiedLoginBtn)));
    }
    if (step === "forgot") {
      return /* @__PURE__ */ React.createElement(ModalShell, { closeable: true }, /* @__PURE__ */ React.createElement("h3", { style: { margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)" } }, T.forgotTitle), /* @__PURE__ */ React.createElement("p", { className: "auth-tagline" }, T.forgotMsg), /* @__PURE__ */ React.createElement("form", { className: "auth-form", onSubmit: handleForgot }, /* @__PURE__ */ React.createElement("input", { type: "email", placeholder: T.forgotEmailPlaceholder, value: forgotEmail, onChange: (e) => setForgotEmail(e.target.value), required: true, autoFocus: true }), error && /* @__PURE__ */ React.createElement("div", { className: "auth-error" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-primary auth-submit", disabled: loading }, loading ? /* @__PURE__ */ React.createElement("span", { className: "btn-spinner" }) : T.forgotSendBtn)), /* @__PURE__ */ React.createElement("div", { className: "auth-switch" }, /* @__PURE__ */ React.createElement("button", { onClick: () => setStep("form") }, T.forgotBack)));
    }
    if (step === "forgot-sent") {
      return /* @__PURE__ */ React.createElement(ModalShell, { closeable: true }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "8px 0 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 12 } }, "\u{1F4E9}"), /* @__PURE__ */ React.createElement("h3", { style: { margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)" } }, T.forgotSentTitle), /* @__PURE__ */ React.createElement("p", { className: "auth-tagline" }, T.forgotSentMsg(forgotEmail)), /* @__PURE__ */ React.createElement("button", { className: "btn-primary auth-submit", style: { marginTop: 16, width: "100%" }, onClick: () => setStep("form") }, T.forgotSentBack)));
    }
    if (step === "reset") {
      return /* @__PURE__ */ React.createElement(ModalShell, { closeable: true }, /* @__PURE__ */ React.createElement("h3", { style: { margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)" } }, T.resetTitle), /* @__PURE__ */ React.createElement("p", { className: "auth-tagline" }, T.resetMsg), /* @__PURE__ */ React.createElement("form", { className: "auth-form", onSubmit: handleReset }, /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: T.newPassword, value: resetPw.password, onChange: (e) => setResetPw((p) => ({ ...p, password: e.target.value })), required: true, minLength: 8, autoFocus: true }), /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: T.confirmPassword, value: resetPw.confirm, onChange: (e) => setResetPw((p) => ({ ...p, confirm: e.target.value })), required: true, minLength: 8 }), error && /* @__PURE__ */ React.createElement("div", { className: "auth-error" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-primary auth-submit", disabled: loading }, loading ? /* @__PURE__ */ React.createElement("span", { className: "btn-spinner" }) : T.resetBtn)));
    }
    if (step === "reset-done") {
      return /* @__PURE__ */ React.createElement(ModalShell, { closeable: true }, /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: "8px 0 16px" } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 40, marginBottom: 12 } }, "\u2705"), /* @__PURE__ */ React.createElement("h3", { style: { margin: "0 0 10px", fontSize: "var(--ts-4)", fontFamily: "var(--display)", color: "#10B981" } }, lang === "ar" ? "\u062A\u0645 \u0628\u0646\u062C\u0627\u062D!" : lang === "en" ? "Done!" : "C'est fait !"), /* @__PURE__ */ React.createElement("p", { className: "auth-tagline" }, lang === "ar" ? "\u062A\u0645 \u062A\u063A\u064A\u064A\u0631 \u0643\u0644\u0645\u0629 \u0645\u0631\u0648\u0631\u0643." : lang === "en" ? "Your password has been changed." : "Votre mot de passe a bien \xE9t\xE9 modifi\xE9."), /* @__PURE__ */ React.createElement("button", { className: "btn-primary auth-submit", style: { marginTop: 16, width: "100%" }, onClick: () => setStep("form") }, T.verifiedLoginBtn)));
    }
    if (step === "complete-profile") {
      return /* @__PURE__ */ React.createElement(ModalShell, null, /* @__PURE__ */ React.createElement("h3", { style: { margin: "0 0 8px", fontSize: "var(--ts-4)", fontFamily: "var(--display)" } }, T.completeTitle), /* @__PURE__ */ React.createElement("p", { className: "auth-tagline" }, T.completeMsg), /* @__PURE__ */ React.createElement("form", { className: "auth-form", onSubmit: handleProfileSubmit }, /* @__PURE__ */ React.createElement(
        "input",
        {
          type: "tel",
          placeholder: T.phone,
          value: profilePhone,
          onChange: (e) => setProfilePhone(e.target.value),
          required: true,
          pattern: "0[5-7][0-9]{8}",
          autoFocus: true
        }
      ), error && /* @__PURE__ */ React.createElement("div", { className: "auth-error" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-primary auth-submit", disabled: loading }, loading ? /* @__PURE__ */ React.createElement("span", { className: "btn-spinner" }) : T.saveBtn)));
    }
    return /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "auth-modal", onClick: (e) => e.stopPropagation(), dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("button", { className: "modal-close", onClick: onClose }, "\u2715"), /* @__PURE__ */ React.createElement("div", { className: "auth-brand" }, /* @__PURE__ */ React.createElement(LotusMark, { size: 32, color: "var(--rose-500)" }), /* @__PURE__ */ React.createElement("span", { className: "brand-name" }, "Latina")), /* @__PURE__ */ React.createElement("div", { className: "auth-tabs" }, /* @__PURE__ */ React.createElement("button", { className: tab === "login" ? "active" : "", onClick: () => setTab("login") }, T.login), /* @__PURE__ */ React.createElement("button", { className: tab === "register" ? "active" : "", onClick: () => setTab("register") }, T.register)), tab === "register" && /* @__PURE__ */ React.createElement("p", { className: "auth-tagline" }, T.joinMsg), /* @__PURE__ */ React.createElement("form", { className: "auth-form", onSubmit: handleSubmit }, tab === "register" && /* @__PURE__ */ React.createElement("input", { type: "text", placeholder: T.name, value: form.name, onChange: (e) => set("name", e.target.value), required: true }), tab === "login" ? /* @__PURE__ */ React.createElement("input", { type: "text", placeholder: T.loginField, value: form.login, onChange: (e) => set("login", e.target.value), required: true, autoComplete: "username" }) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("input", { type: "tel", placeholder: T.phone, value: form.phone, onChange: (e) => set("phone", e.target.value), required: true, pattern: "0[5-7][0-9]{8}" }), /* @__PURE__ */ React.createElement("input", { type: "email", placeholder: T.email, value: form.email, onChange: (e) => set("email", e.target.value), required: true })), /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: T.password, value: form.password, onChange: (e) => set("password", e.target.value), required: true, minLength: 8 }), tab === "register" && /* @__PURE__ */ React.createElement("input", { type: "password", placeholder: T.confirm, value: form.confirm, onChange: (e) => set("confirm", e.target.value), required: true, minLength: 8 }), tab === "login" && /* @__PURE__ */ React.createElement("div", { style: { textAlign: lang === "ar" ? "left" : "right", marginTop: -4 } }, /* @__PURE__ */ React.createElement("button", { type: "button", onClick: () => setStep("forgot"), style: { background: "none", border: "none", color: "var(--rose-500)", cursor: "pointer", fontSize: "var(--ts-0)", textDecoration: "underline" } }, T.forgotLink)), error && /* @__PURE__ */ React.createElement("div", { className: "auth-error" }, error), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn-primary auth-submit", disabled: loading }, loading ? /* @__PURE__ */ React.createElement("span", { className: "btn-spinner" }) : tab === "login" ? T.loginBtn : T.registerBtn)), window.GOOGLE_CLIENT_ID && window.GOOGLE_CLIENT_ID !== "YOUR_GOOGLE_CLIENT_ID_HERE" && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "auth-divider" }, /* @__PURE__ */ React.createElement("span", null, lang === "ar" ? "\u0623\u0648" : lang === "en" ? "or" : "ou")), /* @__PURE__ */ React.createElement("div", { ref: googleBtnRef, className: "google-btn-wrap" })), /* @__PURE__ */ React.createElement("div", { className: "auth-switch" }, /* @__PURE__ */ React.createElement("span", null, tab === "login" ? T.noAccount : T.hasAccount), /* @__PURE__ */ React.createElement("button", { onClick: () => setTab(tab === "login" ? "register" : "login") }, tab === "login" ? T.register : T.login))));
  };
  var CartDrawer = ({ lang, open, onClose, cart, onUpdateCart, onCheckout, user }) => {
    const [couponCode, setCouponCode] = useState("");
    const [couponData, setCouponData] = useState(null);
    const [couponLoading, setCouponLoading] = useState(false);
    const [couponError, setCouponError] = useState("");
    const T = {
      fr: {
        title: "Mon Panier",
        empty: "Votre panier est vide.",
        emptyHint: "D\xE9couvrez notre collection \u2728",
        subtotal: "Sous-total",
        shipping: "Livraison",
        discount: "Remise",
        total: "Total",
        checkout: "Commander",
        applyCoupon: "Appliquer",
        couponPlaceholder: "Code promo",
        remove: "Supprimer",
        calculated: "calcul\xE9e au checkout",
        freeShipping: "Offerte",
        qty: "Qt\xE9",
        cod: "Paiement \xE0 la livraison uniquement"
      },
      ar: {
        title: "\u0633\u0644\u0629 \u0627\u0644\u062A\u0633\u0648\u0642",
        empty: "\u0633\u0644\u062A\u0643 \u0641\u0627\u0631\u063A\u0629.",
        emptyHint: "\u0627\u0643\u062A\u0634\u0641\u064A \u0645\u062C\u0645\u0648\u0639\u062A\u0646\u0627 \u2728",
        subtotal: "\u0627\u0644\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u062C\u0632\u0626\u064A",
        shipping: "\u0627\u0644\u0634\u062D\u0646",
        discount: "\u0627\u0644\u062E\u0635\u0645",
        total: "\u0627\u0644\u0645\u062C\u0645\u0648\u0639",
        checkout: "\u0637\u0644\u0628",
        applyCoupon: "\u062A\u0637\u0628\u064A\u0642",
        couponPlaceholder: "\u0643\u0648\u062F \u0627\u0644\u062E\u0635\u0645",
        remove: "\u062D\u0630\u0641",
        calculated: "\u064A\u064F\u062D\u0633\u0628 \u0639\u0646\u062F \u0627\u0644\u062F\u0641\u0639",
        freeShipping: "\u0645\u062C\u0627\u0646\u064A",
        qty: "\u0627\u0644\u0643\u0645\u064A\u0629",
        cod: "\u0627\u0644\u062F\u0641\u0639 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645 \u0641\u0642\u0637"
      },
      en: {
        title: "My Cart",
        empty: "Your cart is empty.",
        emptyHint: "Explore our collection \u2728",
        subtotal: "Subtotal",
        shipping: "Shipping",
        discount: "Discount",
        total: "Total",
        checkout: "Order now",
        applyCoupon: "Apply",
        couponPlaceholder: "Promo code",
        remove: "Remove",
        calculated: "calculated at checkout",
        freeShipping: "Free",
        qty: "Qty",
        cod: "Cash on delivery only"
      }
    }[lang] || {};
    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const calcDiscount = (coupon) => {
      if (!coupon) return 0;
      if (coupon.type === "percent") return Math.round(subtotal * coupon.value / 100);
      if (coupon.type === "fixed") return Math.min(coupon.value, subtotal);
      return 0;
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
        setCouponError("Erreur lors de la v\xE9rification.");
      } finally {
        setCouponLoading(false);
      }
    };
    const changeQty = (idx, delta) => {
      onUpdateCart((prev) => {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: Math.max(1, next[idx].qty + delta) };
        return next;
      });
    };
    const removeItem = (idx) => {
      onUpdateCart((prev) => prev.filter((_, i) => i !== idx));
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, open && /* @__PURE__ */ React.createElement("div", { className: "drawer-backdrop", onClick: onClose }), /* @__PURE__ */ React.createElement("div", { className: `cart-drawer ${open ? "open" : ""}`, dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("div", { className: "cart-drawer-head" }, /* @__PURE__ */ React.createElement("h2", { className: "t-h4" }, T.title), /* @__PURE__ */ React.createElement("button", { className: "drawer-close", onClick: onClose }, "\u2715")), cart.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "cart-empty" }, /* @__PURE__ */ React.createElement("div", { className: "cart-empty-icon" }, "\u{1F6CD}\uFE0F"), /* @__PURE__ */ React.createElement("p", null, T.empty), /* @__PURE__ */ React.createElement("p", { className: "t-mute" }, T.emptyHint)) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "cart-items" }, cart.map((item, idx) => /* @__PURE__ */ React.createElement("div", { className: "cart-item", key: idx }, /* @__PURE__ */ React.createElement("div", { className: "ci-img" }, item.image ? /* @__PURE__ */ React.createElement("img", { src: item.image, alt: item.name }) : /* @__PURE__ */ React.createElement("div", { className: "ci-img-placeholder" }, "\u{1F45F}")), /* @__PURE__ */ React.createElement("div", { className: "ci-info" }, /* @__PURE__ */ React.createElement("div", { className: "ci-name" }, item.name), item.variant && /* @__PURE__ */ React.createElement("div", { className: "ci-meta t-mono" }, item.variant), /* @__PURE__ */ React.createElement("div", { className: "ci-price t-num" }, (item.price * item.qty).toLocaleString(), " DA")), /* @__PURE__ */ React.createElement("div", { className: "ci-controls" }, /* @__PURE__ */ React.createElement("div", { className: "qty-control" }, /* @__PURE__ */ React.createElement("button", { onClick: () => changeQty(idx, -1) }, "\u2212"), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, item.qty), /* @__PURE__ */ React.createElement("button", { onClick: () => changeQty(idx, 1) }, "+")), /* @__PURE__ */ React.createElement("button", { className: "ci-remove", onClick: () => removeItem(idx) }, T.remove))))), /* @__PURE__ */ React.createElement("div", { className: "cart-coupon" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        placeholder: T.couponPlaceholder,
        value: couponCode,
        onChange: (e) => {
          setCouponCode(e.target.value);
          setCouponData(null);
          setCouponError("");
        },
        onKeyDown: (e) => e.key === "Enter" && !couponData && applyCoupon(),
        disabled: !!couponData || couponLoading
      }
    ), couponData ? /* @__PURE__ */ React.createElement("button", { className: "btn-outline-sm", onClick: () => {
      setCouponData(null);
      setCouponCode("");
    } }, "\u2715") : /* @__PURE__ */ React.createElement("button", { onClick: applyCoupon, disabled: couponLoading || !couponCode.trim(), className: "btn-outline-sm" }, couponLoading ? /* @__PURE__ */ React.createElement("span", { className: "btn-spinner" }) : T.applyCoupon)), couponData && /* @__PURE__ */ React.createElement("div", { className: "coupon-ok" }, "\u2713 ", couponData.code, couponData.type === "percent" && ` \u2014 ${couponData.value}% de r\xE9duction`, couponData.type === "fixed" && ` \u2014 ${couponData.value.toLocaleString()} DA de r\xE9duction`, couponData.type === "free_shipping" && ` \u2014 Livraison offerte`), couponError && /* @__PURE__ */ React.createElement("div", { className: "coupon-err t-mono" }, couponError), /* @__PURE__ */ React.createElement("div", { className: "cart-totals" }, /* @__PURE__ */ React.createElement("div", { className: "ct-row" }, /* @__PURE__ */ React.createElement("span", null, T.subtotal), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, subtotal.toLocaleString(), " DA")), discount > 0 && /* @__PURE__ */ React.createElement("div", { className: "ct-row ct-discount" }, /* @__PURE__ */ React.createElement("span", null, T.discount), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, "\u2212", discount.toLocaleString(), " DA")), /* @__PURE__ */ React.createElement("div", { className: "ct-row" }, /* @__PURE__ */ React.createElement("span", null, T.shipping), /* @__PURE__ */ React.createElement("span", { className: "t-mute" }, T.calculated)), /* @__PURE__ */ React.createElement("div", { className: "ct-row total" }, /* @__PURE__ */ React.createElement("span", null, T.total), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, (subtotal - discount).toLocaleString(), " DA"))), /* @__PURE__ */ React.createElement("div", { className: "cart-cod-note t-mono" }, T.cod), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "btn-primary cart-checkout-btn",
        onClick: () => onCheckout(couponData ? { ...couponData, discount } : null)
      },
      T.checkout
    ))));
  };
  var CrossSellSection = ({ cart, lang, onClose, onQuickView }) => {
    const [suggestions, setSuggestions] = useState([]);
    useEffect(() => {
      const api = window.latinaApi;
      if (!api) return;
      api.getProducts({ per_page: 40 }).then((data) => {
        const raw = data.data || [];
        const processed = raw.map((p) => {
          const catSlug = (p.category?.slug || "").toLowerCase();
          const catName = (p.category?.name_fr || "").toLowerCase();
          const parentSlug = (p.category?.parent?.slug || "").toLowerCase();
          const isBags = catSlug.startsWith("sac") || catName.includes("sac") || catSlug === "bags";
          const isAccess = catSlug.startsWith("access") || catName.includes("access") || parentSlug.startsWith("access");
          return { ...p, _tab: isBags ? "bags" : isAccess ? "access" : "shoes", _tags: p.attributes?.tags || [] };
        });
        const orderedIds = new Set(cart.map((i) => i.product_id));
        const orderedProds = processed.filter((p) => orderedIds.has(p.id));
        const orderedTabs = new Set(orderedProds.map((p) => p._tab));
        const orderedTags = new Set(orderedProds.flatMap((p) => p._tags));
        let candidates = processed.filter(
          (p) => !orderedIds.has(p.id) && !orderedTabs.has(p._tab) && p.stock > 0 && (orderedTags.size === 0 || p._tags.some((t) => orderedTags.has(t)))
        );
        if (candidates.length < 2) {
          candidates = processed.filter(
            (p) => !orderedIds.has(p.id) && !orderedTabs.has(p._tab) && p.stock > 0
          );
        }
        setSuggestions(candidates.slice(0, 4));
      }).catch(() => {
      });
    }, []);
    if (!suggestions.length) return null;
    const T = {
      fr: { eyebrow: "S\xE9lectionn\xE9s pour vous", title: "Compl\xE9tez votre look", cta: "Voir la collection" },
      ar: { eyebrow: "\u0645\u062E\u062A\u0627\u0631\u0629 \u0644\u0643\u0650", title: "\u0623\u0643\u0645\u0644\u064A \u0625\u0637\u0644\u0627\u0644\u062A\u0643", cta: "\u0639\u0631\u0636 \u0627\u0644\u0645\u062C\u0645\u0648\u0639\u0629" },
      en: { eyebrow: "Selected for you", title: "Complete your look", cta: "Browse collection" }
    }[lang] || { eyebrow: "S\xE9lectionn\xE9s pour vous", title: "Compl\xE9tez votre look", cta: "Voir la collection" };
    return /* @__PURE__ */ React.createElement("div", { className: "cs-crosssell" }, /* @__PURE__ */ React.createElement("div", { className: "cs-cx-head" }, /* @__PURE__ */ React.createElement("div", { className: "cs-cx-eyebrow" }, T.eyebrow), /* @__PURE__ */ React.createElement("div", { className: "cs-cx-title" }, T.title)), /* @__PURE__ */ React.createElement("div", { className: "cs-cx-grid" }, suggestions.map((p) => {
      const name = p[`name_${lang}`] || p.name_fr;
      const price = Number(p.effective_price ?? p.price);
      const img = window.mediaUrl(p.primary_image?.url || p.media?.[0]?.url) || null;
      const hasDiscount = p.compare_price && p.compare_price > price;
      return /* @__PURE__ */ React.createElement("div", { key: p.id, className: "cs-cx-card", onClick: () => {
        onClose();
        onQuickView?.(p);
      } }, /* @__PURE__ */ React.createElement("div", { className: "cs-cx-img" }, img ? /* @__PURE__ */ React.createElement("img", { src: img, alt: name, loading: "lazy" }) : /* @__PURE__ */ React.createElement("div", { className: "cs-cx-img-ph" }), p.is_featured && /* @__PURE__ */ React.createElement("span", { className: "cs-cx-badge" }, "\u2605"), hasDiscount && /* @__PURE__ */ React.createElement("span", { className: "cs-cx-sale-badge" }, "\u2212", Math.round((1 - price / p.compare_price) * 100), "%")), /* @__PURE__ */ React.createElement("div", { className: "cs-cx-info" }, /* @__PURE__ */ React.createElement("div", { className: "cs-cx-name" }, name), /* @__PURE__ */ React.createElement("div", { className: "cs-cx-prices" }, /* @__PURE__ */ React.createElement("span", { className: "cs-cx-price t-num" }, price.toLocaleString("fr-DZ"), " DA"), hasDiscount && /* @__PURE__ */ React.createElement("span", { className: "cs-cx-compare t-num" }, Number(p.compare_price).toLocaleString("fr-DZ")))));
    })), /* @__PURE__ */ React.createElement("button", { className: "cs-cx-cta", onClick: onClose }, T.cta, " \u2192"));
  };
  var CheckoutPage = ({ lang, open, onClose, cart, user, onOrderPlaced, coupon: couponProp = null, onAuthOpen, onQuickView }) => {
    const [step, setStep] = useState(1);
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
        step1: "Livraison",
        step2: "R\xE9capitulatif",
        step3: "Confirmation",
        name: "Nom complet",
        phone: "T\xE9l\xE9phone",
        street: "Adresse (rue, n\xB0, ...)",
        notes: "Note pour le livreur (optionnel)",
        next: "Continuer",
        back: "Retour",
        confirm: "Confirmer la commande",
        orderTotal: "Total commande",
        shipping: "Frais de livraison",
        loyaltyAvail: "Points disponibles",
        loyaltyUse: "Utiliser mes points",
        loyaltyDzd: "= {v} DA de r\xE9duction",
        thankYou: "Merci pour votre commande !",
        orderRef: "R\xE9f\xE9rence",
        trackOrder: "Suivre ma commande",
        deliveryMsg: "Vous serez contact\xE9e pour confirmer la livraison.",
        close: "Fermer",
        product: "Produit",
        qty: "Qt\xE9",
        unitPrice: "Prix unit.",
        lineTotal: "Total"
      },
      ar: {
        title: "\u0625\u062A\u0645\u0627\u0645 \u0627\u0644\u0637\u0644\u0628",
        step1: "\u0627\u0644\u062A\u0648\u0635\u064A\u0644",
        step2: "\u0645\u0644\u062E\u0635",
        step3: "\u062A\u0623\u0643\u064A\u062F",
        name: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644",
        phone: "\u0627\u0644\u0647\u0627\u062A\u0641",
        street: "\u0627\u0644\u0639\u0646\u0648\u0627\u0646",
        notes: "\u0645\u0644\u0627\u062D\u0638\u0629 \u0644\u0644\u0645\u0646\u062F\u0648\u0628 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",
        next: "\u0627\u0644\u062A\u0627\u0644\u064A",
        back: "\u0631\u062C\u0648\u0639",
        confirm: "\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0637\u0644\u0628",
        orderTotal: "\u0645\u062C\u0645\u0648\u0639 \u0627\u0644\u0637\u0644\u0628",
        shipping: "\u0631\u0633\u0648\u0645 \u0627\u0644\u0634\u062D\u0646",
        loyaltyAvail: "\u0627\u0644\u0646\u0642\u0627\u0637 \u0627\u0644\u0645\u062A\u0627\u062D\u0629",
        loyaltyUse: "\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0646\u0642\u0627\u0637\u064A",
        loyaltyDzd: "= \u062E\u0635\u0645 {v} \u062F\u062C",
        thankYou: "\u0634\u0643\u0631\u0627\u064B \u0639\u0644\u0649 \u0637\u0644\u0628\u0643!",
        orderRef: "\u0627\u0644\u0645\u0631\u062C\u0639",
        trackOrder: "\u062A\u062A\u0628\u0639 \u0637\u0644\u0628\u064A",
        deliveryMsg: "\u0633\u064A\u062A\u0645 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639\u0643 \u0644\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u062A\u0648\u0635\u064A\u0644.",
        close: "\u0625\u063A\u0644\u0627\u0642",
        product: "\u0627\u0644\u0645\u0646\u062A\u062C",
        qty: "\u0627\u0644\u0643\u0645\u064A\u0629",
        unitPrice: "\u0633\u0639\u0631 \u0627\u0644\u0648\u062D\u062F\u0629",
        lineTotal: "\u0627\u0644\u0645\u062C\u0645\u0648\u0639"
      },
      en: {
        title: "Complete Order",
        step1: "Delivery",
        step2: "Summary",
        step3: "Confirmation",
        name: "Full name",
        phone: "Phone",
        street: "Street address",
        notes: "Note for delivery (optional)",
        next: "Continue",
        back: "Back",
        confirm: "Place order",
        orderTotal: "Order total",
        shipping: "Shipping fee",
        loyaltyAvail: "Available points",
        loyaltyUse: "Use my points",
        loyaltyDzd: "= {v} DA off",
        thankYou: "Thank you for your order!",
        orderRef: "Reference",
        trackOrder: "Track my order",
        deliveryMsg: "You will be contacted to confirm delivery.",
        close: "Close",
        product: "Product",
        qty: "Qty",
        unitPrice: "Unit price",
        lineTotal: "Total"
      }
    }[lang] || {};
    useEffect(() => {
      if (open && user) {
        setAddress((a) => ({ ...a, name: user.name || "", phone: user.phone || "" }));
        window.latinaApi.getLoyalty().then((r) => setLoyaltyBalance(r.data?.points || r.points || 0)).catch(() => {
        });
      }
      if (open) {
        setStep(1);
        setError("");
        setOrder(null);
      }
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
          items: cart.filter((i) => i.product_id).map((i) => ({
            product_id: i.product_id,
            quantity: i.qty,
            variant_id: i.variant_id || void 0
          })),
          wilaya_code: Number(address.wilaya_code),
          commune_id: address.commune_id || void 0,
          address_line: address.street,
          delivery_type: "home",
          guest_name: address.name,
          guest_phone: address.phone,
          coupon_code: coupon?.code || void 0,
          loyalty_points: loyaltyRedeem || void 0,
          notes: notes || void 0
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
    return /* @__PURE__ */ React.createElement("div", { className: "checkout-overlay", dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("div", { className: "checkout-modal" }, /* @__PURE__ */ React.createElement("div", { className: "checkout-head" }, /* @__PURE__ */ React.createElement("h2", { className: "t-h4" }, T.title), /* @__PURE__ */ React.createElement("button", { className: "modal-close", onClick: onClose }, "\u2715")), /* @__PURE__ */ React.createElement("div", { className: "checkout-steps" }, steps.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: `cs-step ${step === i + 1 ? "active" : ""} ${step > i + 1 ? "done" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "cs-dot" }, step > i + 1 ? "\u2713" : i + 1), /* @__PURE__ */ React.createElement("span", null, s)))), /* @__PURE__ */ React.createElement("div", { className: "checkout-body" }, step === 1 && /* @__PURE__ */ React.createElement("div", { className: "co-step-1" }, /* @__PURE__ */ React.createElement("div", { className: "co-field-row" }, /* @__PURE__ */ React.createElement("div", { className: "co-field" }, /* @__PURE__ */ React.createElement("label", null, T.name), /* @__PURE__ */ React.createElement("input", { value: address.name, onChange: (e) => setAddress((a) => ({ ...a, name: e.target.value })), required: true })), /* @__PURE__ */ React.createElement("div", { className: "co-field" }, /* @__PURE__ */ React.createElement("label", null, T.phone), /* @__PURE__ */ React.createElement("input", { type: "tel", value: address.phone, onChange: (e) => setAddress((a) => ({ ...a, phone: e.target.value })), required: true }))), /* @__PURE__ */ React.createElement("div", { className: "co-field" }, /* @__PURE__ */ React.createElement(
      WilayaSelector,
      {
        lang,
        onChange: (val) => {
          if (!val) return;
          const { wilaya_code, commune_id, fee, eta } = val;
          setAddress((a) => ({ ...a, wilaya_code: wilaya_code || val.wilaya, commune_id: commune_id || null, shipping_fee: fee || 0, eta_days: eta || 3 }));
        }
      }
    )), /* @__PURE__ */ React.createElement("div", { className: "co-field" }, /* @__PURE__ */ React.createElement("label", null, T.street), /* @__PURE__ */ React.createElement("input", { value: address.street, onChange: (e) => setAddress((a) => ({ ...a, street: e.target.value })), required: true })), /* @__PURE__ */ React.createElement("div", { className: "co-field" }, /* @__PURE__ */ React.createElement("label", null, T.notes), /* @__PURE__ */ React.createElement("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), rows: 2 })), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "btn-primary co-next",
        disabled: !address.wilaya_code || !address.name || !address.phone || !address.street,
        onClick: () => setStep(2)
      },
      T.next
    )), step === 2 && /* @__PURE__ */ React.createElement("div", { className: "co-step-2" }, /* @__PURE__ */ React.createElement("table", { className: "co-items-table" }, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", null, T.product), /* @__PURE__ */ React.createElement("th", null, T.qty), /* @__PURE__ */ React.createElement("th", { className: "t-right" }, T.unitPrice), /* @__PURE__ */ React.createElement("th", { className: "t-right" }, T.lineTotal))), /* @__PURE__ */ React.createElement("tbody", null, cart.map((item, i) => /* @__PURE__ */ React.createElement("tr", { key: i }, /* @__PURE__ */ React.createElement("td", null, item.name, item.variant && /* @__PURE__ */ React.createElement("span", { className: "t-mute" }, " \xB7 ", item.variant)), /* @__PURE__ */ React.createElement("td", { className: "t-num" }, item.qty), /* @__PURE__ */ React.createElement("td", { className: "t-num t-right" }, item.price.toLocaleString(), " DA"), /* @__PURE__ */ React.createElement("td", { className: "t-num t-right" }, (item.price * item.qty).toLocaleString(), " DA"))))), /* @__PURE__ */ React.createElement("div", { className: "co-totals" }, /* @__PURE__ */ React.createElement("div", { className: "co-row" }, /* @__PURE__ */ React.createElement("span", null, T.orderTotal), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, subtotal.toLocaleString(), " DA")), /* @__PURE__ */ React.createElement("div", { className: "co-row" }, /* @__PURE__ */ React.createElement("span", null, T.shipping), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, address.shipping_fee.toLocaleString(), " DA")), coupon?.code && couponDiscount > 0 && /* @__PURE__ */ React.createElement("div", { className: "co-row", style: { color: "var(--rose-500)" } }, /* @__PURE__ */ React.createElement("span", null, "\u{1F3F7} ", coupon.code), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, "\u2212", couponDiscount.toLocaleString(), " DA")), coupon?.type === "free_shipping" && /* @__PURE__ */ React.createElement("div", { className: "co-row", style: { color: "var(--rose-500)" } }, /* @__PURE__ */ React.createElement("span", null, "\u{1F3F7} ", coupon.code), /* @__PURE__ */ React.createElement("span", { className: "t-mono", style: { fontSize: 11 } }, "Livraison offerte")), user && loyaltyBalance > 0 && /* @__PURE__ */ React.createElement("div", { className: "co-loyalty" }, /* @__PURE__ */ React.createElement("div", { className: "co-row" }, /* @__PURE__ */ React.createElement("span", null, T.loyaltyAvail, ": ", /* @__PURE__ */ React.createElement("strong", { className: "t-num" }, loyaltyBalance, " pts"))), /* @__PURE__ */ React.createElement("div", { className: "co-loyalty-input" }, /* @__PURE__ */ React.createElement("label", null, T.loyaltyUse), /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "number",
        min: 0,
        max: loyaltyBalance,
        step: 10,
        value: loyaltyRedeem,
        onChange: (e) => setLoyaltyRedeem(Math.min(loyaltyBalance, Math.max(0, Number(e.target.value))))
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "t-mute" }, T.loyaltyDzd.replace("{v}", loyaltyDiscount)))), /* @__PURE__ */ React.createElement("div", { className: "co-row total" }, /* @__PURE__ */ React.createElement("span", null, /* @__PURE__ */ React.createElement("strong", null, "Total")), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, /* @__PURE__ */ React.createElement("strong", null, total.toLocaleString(), " DA")))), error && /* @__PURE__ */ React.createElement("div", { className: "auth-error" }, error), /* @__PURE__ */ React.createElement("div", { className: "co-btns" }, /* @__PURE__ */ React.createElement("button", { className: "btn-outline co-back", onClick: () => setStep(1) }, T.back), /* @__PURE__ */ React.createElement("button", { className: "btn-primary co-confirm", onClick: handlePlace, disabled: loading }, loading ? /* @__PURE__ */ React.createElement("span", { className: "btn-spinner" }) : T.confirm))), step === 3 && order && /* @__PURE__ */ React.createElement("div", { className: "co-step-3" }, /* @__PURE__ */ React.createElement("div", { className: "co-success-icon" }, "\u2713"), /* @__PURE__ */ React.createElement("h3", { className: "t-h3" }, T.thankYou), /* @__PURE__ */ React.createElement("p", null, T.deliveryMsg), /* @__PURE__ */ React.createElement("div", { className: "co-ref t-mono" }, /* @__PURE__ */ React.createElement("span", null, T.orderRef, ":"), /* @__PURE__ */ React.createElement("strong", null, order.reference)), /* @__PURE__ */ React.createElement("button", { className: "btn-primary", onClick: onClose }, T.close), !user && /* @__PURE__ */ React.createElement("div", { className: "co-join-teaser" }, /* @__PURE__ */ React.createElement("div", { className: "co-join-divider" }, /* @__PURE__ */ React.createElement("span", null, { fr: "Rejoignez la communaut\xE9", ar: "\u0627\u0646\u0636\u0645\u064A \u0644\u0644\u0645\u062C\u062A\u0645\u0639", en: "Join the community" }[lang] || "Rejoignez la communaut\xE9")), /* @__PURE__ */ React.createElement("div", { className: "co-join-card" }, /* @__PURE__ */ React.createElement("p", { className: "co-join-headline" }, {
      fr: "Votre commande est en route \u2014 et ce n'est que le d\xE9but.",
      ar: "\u0637\u0644\u0628\u0643 \u0641\u064A \u0627\u0644\u0637\u0631\u064A\u0642 \u2014 \u0648\u0647\u0630\u0647 \u0645\u062C\u0631\u062F \u0627\u0644\u0628\u062F\u0627\u064A\u0629.",
      en: "Your order is on its way \u2014 and this is just the start."
    }[lang] || "Votre commande est en route \u2014 et ce n'est que le d\xE9but."), /* @__PURE__ */ React.createElement("ul", { className: "co-join-perks" }, /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", { className: "co-perk-icon" }, "\u2726"), /* @__PURE__ */ React.createElement("span", null, { fr: "Gagnez des points \xE0 chaque achat \u2014 \xE9changeables contre des r\xE9ductions", ar: "\u0627\u0643\u0633\u0628\u064A \u0646\u0642\u0627\u0637\u0627\u064B \u0645\u0639 \u0643\u0644 \u0634\u0631\u0627\u0621 \u0648\u062D\u0648\u0651\u0644\u064A\u0647\u0627 \u0644\u062E\u0635\u0648\u0645\u0627\u062A", en: "Earn loyalty points on every purchase" }[lang] || "Gagnez des points \xE0 chaque achat")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", { className: "co-perk-icon" }, "\u25C8"), /* @__PURE__ */ React.createElement("span", null, { fr: "Participez aux concours photo exclusifs de la communaut\xE9", ar: "\u0634\u0627\u0631\u0643\u064A \u0641\u064A \u0645\u0633\u0627\u0628\u0642\u0627\u062A \u0627\u0644\u0635\u0648\u0631 \u0627\u0644\u062D\u0635\u0631\u064A\u0629", en: "Enter exclusive community photo contests" }[lang] || "Participez aux concours photo")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", { className: "co-perk-icon" }, "\u25C7"), /* @__PURE__ */ React.createElement("span", null, { fr: "Suivez toutes vos commandes depuis votre espace", ar: "\u062A\u0627\u0628\u0639\u064A \u062C\u0645\u064A\u0639 \u0637\u0644\u0628\u0627\u062A\u0643 \u0645\u0646 \u062D\u0633\u0627\u0628\u0643", en: "Track all your orders from one place" }[lang] || "Suivez toutes vos commandes")), /* @__PURE__ */ React.createElement("li", null, /* @__PURE__ */ React.createElement("span", { className: "co-perk-icon" }, "\u25C9"), /* @__PURE__ */ React.createElement("span", null, { fr: "Acc\xE9dez en avant-premi\xE8re aux nouvelles collections", ar: "\u0627\u062D\u0635\u0644\u064A \u0639\u0644\u0649 \u0648\u0635\u0648\u0644 \u0645\u0628\u0643\u0631 \u0644\u0644\u0645\u062C\u0645\u0648\u0639\u0627\u062A \u0627\u0644\u062C\u062F\u064A\u062F\u0629", en: "Early access to new collections" }[lang] || "Acc\xE8s avant-premi\xE8re aux collections"))), /* @__PURE__ */ React.createElement(
      "button",
      {
        className: "btn-primary co-join-btn",
        onClick: () => {
          onClose();
          setTimeout(() => onAuthOpen?.(), 200);
        }
      },
      { fr: "Cr\xE9er mon compte \u2014 c'est gratuit", ar: "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628\u064A \u2014 \u0645\u062C\u0627\u0646\u0627\u064B", en: "Create my account \u2014 it's free" }[lang] || "Cr\xE9er mon compte \u2014 c'est gratuit"
    ), /* @__PURE__ */ React.createElement("p", { className: "co-join-later" }, { fr: "Vous pouvez aussi vous inscrire plus tard depuis le menu.", ar: "\u064A\u0645\u0643\u0646\u0643 \u0627\u0644\u062A\u0633\u062C\u064A\u0644 \u0644\u0627\u062D\u0642\u0627\u064B \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629.", en: "You can also sign up later from the menu." }[lang] || "Vous pouvez aussi vous inscrire plus tard."))), /* @__PURE__ */ React.createElement(CrossSellSection, { cart, lang, onClose, onQuickView })))));
  };
  var AccountPage = ({ lang, open, onClose, user, onLogout }) => {
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
      const h = () => setRefreshTick((t) => t + 1);
      window.addEventListener("latina:refresh", h);
      return () => window.removeEventListener("latina:refresh", h);
    }, []);
    const T = {
      fr: {
        title: "Mon Compte",
        orders: "Commandes",
        loyalty: "Fid\xE9lit\xE9",
        wishlist: "Favoris",
        reservations: "R\xE9servations",
        logout: "Se d\xE9connecter",
        noOrders: "Aucune commande.",
        hello: "Bonjour",
        points: "points",
        tier: "Niveau",
        history: "Historique des points",
        ref: "R\xE9f.",
        status: "Statut",
        date: "Date",
        total: "Total",
        pending: "En attente",
        confirmed: "Confirm\xE9e",
        preparing: "En pr\xE9paration",
        shipped: "Exp\xE9di\xE9e",
        out_for_delivery: "En cours de livraison",
        delivered: "Livr\xE9e",
        cancelled: "Annul\xE9e",
        rto: "Retourn\xE9e",
        refunded: "Rembours\xE9e",
        noWishlist: "Votre liste de favoris est vide.",
        loyaltyInfo: "1 point pour chaque 100 DA d'achat \xB7 10 points = 1 DA de r\xE9duction",
        noReservations: "Aucune r\xE9servation.",
        active: "Active",
        expired: "Expir\xE9e",
        daysLeft: (n) => n === 1 ? "1 jour restant" : `${n} jours restants`,
        hoursLeft: (n) => `${n}h restantes`,
        deposit: "Acompte (40%)",
        paymentStatus: "Paiement",
        paid: "Pay\xE9",
        payment_pending: "En attente de paiement",
        payment_none: "Gratuit",
        cancelResv: "Annuler",
        whatsappPay: "Payer via WA \u{1F4AC}",
        cancelConfirm: "Annuler cette r\xE9servation ?",
        qty: "Qt\xE9",
        duration: "Dur\xE9e",
        expires: "Expire le"
      },
      ar: {
        title: "\u062D\u0633\u0627\u0628\u064A",
        orders: "\u0627\u0644\u0637\u0644\u0628\u0627\u062A",
        loyalty: "\u0627\u0644\u0648\u0644\u0627\u0621",
        wishlist: "\u0627\u0644\u0645\u0641\u0636\u0644\u0629",
        reservations: "\u0627\u0644\u062D\u062C\u0648\u0632\u0627\u062A",
        logout: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062E\u0631\u0648\u062C",
        noOrders: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0637\u0644\u0628\u0627\u062A.",
        hello: "\u0645\u0631\u062D\u0628\u0627\u064B",
        points: "\u0646\u0642\u0637\u0629",
        tier: "\u0627\u0644\u0645\u0633\u062A\u0648\u0649",
        history: "\u0633\u062C\u0644 \u0627\u0644\u0646\u0642\u0627\u0637",
        ref: "\u0627\u0644\u0645\u0631\u062C\u0639",
        status: "\u0627\u0644\u062D\u0627\u0644\u0629",
        date: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E",
        total: "\u0627\u0644\u0645\u062C\u0645\u0648\u0639",
        pending: "\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631",
        confirmed: "\u0645\u0624\u0643\u062F",
        preparing: "\u062C\u0627\u0631 \u0627\u0644\u062A\u062D\u0636\u064A\u0631",
        shipped: "\u062A\u0645 \u0627\u0644\u0634\u062D\u0646",
        out_for_delivery: "\u0641\u064A \u0627\u0644\u0637\u0631\u064A\u0642",
        delivered: "\u062A\u0645 \u0627\u0644\u062A\u0633\u0644\u064A\u0645",
        cancelled: "\u0645\u0644\u063A\u064A",
        rto: "\u0645\u0631\u062A\u062C\u0639",
        refunded: "\u0645\u0633\u062A\u0631\u062F",
        noWishlist: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0645\u0641\u0636\u0644\u0629 \u0641\u0627\u0631\u063A\u0629.",
        loyaltyInfo: "\u0646\u0642\u0637\u0629 \u0644\u0643\u0644 100 \u062F\u062C \u0645\u0646 \u0627\u0644\u0645\u0634\u062A\u0631\u064A\u0627\u062A \xB7 10 \u0646\u0642\u0627\u0637 = \u062E\u0635\u0645 1 \u062F\u062C",
        noReservations: "\u0644\u0627 \u062A\u0648\u062C\u062F \u062D\u062C\u0648\u0632\u0627\u062A.",
        active: "\u0646\u0634\u0637",
        expired: "\u0645\u0646\u062A\u0647\u064A",
        daysLeft: (n) => `${n} \u064A\u0648\u0645 \u0645\u062A\u0628\u0642\u064A`,
        hoursLeft: (n) => `${n} \u0633\u0627\u0639\u0629 \u0645\u062A\u0628\u0642\u064A\u0629`,
        deposit: "\u0627\u0644\u062F\u0641\u0639\u0629 \u0627\u0644\u0645\u0633\u0628\u0642\u0629 (40%)",
        paymentStatus: "\u0627\u0644\u062F\u0641\u0639",
        paid: "\u0645\u062F\u0641\u0648\u0639",
        payment_pending: "\u0641\u064A \u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062F\u0641\u0639",
        payment_none: "\u0645\u062C\u0627\u0646\u064A",
        cancelResv: "\u0625\u0644\u063A\u0627\u0621",
        whatsappPay: "\u0627\u0644\u062F\u0641\u0639 \u0639\u0628\u0631 WA \u{1F4AC}",
        cancelConfirm: "\u0625\u0644\u063A\u0627\u0621 \u0647\u0630\u0627 \u0627\u0644\u062D\u062C\u0632\u061F",
        qty: "\u0627\u0644\u0643\u0645\u064A\u0629",
        duration: "\u0627\u0644\u0645\u062F\u0629",
        expires: "\u064A\u0646\u062A\u0647\u064A \u0641\u064A"
      },
      en: {
        title: "My Account",
        orders: "Orders",
        loyalty: "Loyalty",
        wishlist: "Wishlist",
        reservations: "Reservations",
        logout: "Sign out",
        noOrders: "No orders yet.",
        hello: "Hello",
        points: "points",
        tier: "Tier",
        history: "Points history",
        ref: "Ref.",
        status: "Status",
        date: "Date",
        total: "Total",
        pending: "Pending",
        confirmed: "Confirmed",
        preparing: "Preparing",
        shipped: "Shipped",
        out_for_delivery: "Out for delivery",
        delivered: "Delivered",
        cancelled: "Cancelled",
        rto: "Returned",
        refunded: "Refunded",
        noWishlist: "Your wishlist is empty.",
        loyaltyInfo: "1 point per 100 DA \xB7 10 points = 1 DA off",
        noReservations: "No reservations yet.",
        active: "Active",
        expired: "Expired",
        daysLeft: (n) => n === 1 ? "1 day left" : `${n} days left`,
        hoursLeft: (n) => `${n}h left`,
        deposit: "Deposit (40%)",
        paymentStatus: "Payment",
        paid: "Paid",
        payment_pending: "Awaiting payment",
        payment_none: "Free",
        cancelResv: "Cancel",
        whatsappPay: "Pay via WA \u{1F4AC}",
        cancelConfirm: "Cancel this reservation?",
        qty: "Qty",
        duration: "Duration",
        expires: "Expires"
      }
    }[lang] || {};
    const STATUS_COLORS = {
      pending: "#F59E0B",
      confirmed: "#3B82F6",
      preparing: "#8B5CF6",
      shipped: "#06B6D4",
      out_for_delivery: "#10B981",
      delivered: "#059669",
      cancelled: "#EF4444",
      rto: "#F97316",
      refunded: "#6B7280"
    };
    useEffect(() => {
      if (!open || !user) return;
      setLoading(true);
      const promises = [
        api.getOrders().then((r) => setOrders(r.data || r?.items || [])).catch(() => {
        }),
        api.getLoyalty().then((r) => setLoyalty(r.data || r)).catch(() => {
        }),
        api.getWishlist().then((r) => setWishlistItems(r.data || r || [])).catch(() => {
        })
      ];
      Promise.all(promises).finally(() => setLoading(false));
    }, [open, user, refreshTick]);
    useEffect(() => {
      if (!open || !user || tab !== "reservations") return;
      setReservLoading(true);
      Promise.all([
        api.getMyReservations().then((r) => setReservations(r || [])).catch(() => {
        }),
        api.getPublicConfig().then((cfg) => {
          if (cfg?.whatsapp_reservation) window._latinaWhatsapp = cfg.whatsapp_reservation;
        }).catch(() => {
        })
      ]).finally(() => setReservLoading(false));
    }, [open, user, tab]);
    const TIER_COLORS = { petal: "#C68B6F", lotus: "#9B59B6", amber: "#F59E0B" };
    const TIER_LABELS = { petal: "\u{1F338} Petal", lotus: "\u{1FAB7} Lotus", amber: "\u{1F31F} Amber" };
    if (!open) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: "account-modal", onClick: (e) => e.stopPropagation(), dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("div", { className: "account-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "account-hello t-mono" }, T.hello, ", ", /* @__PURE__ */ React.createElement("strong", null, user?.name?.split(" ")[0])), /* @__PURE__ */ React.createElement("div", { className: "account-phone t-mute" }, user?.phone)), /* @__PURE__ */ React.createElement("div", { className: "account-head-actions" }, /* @__PURE__ */ React.createElement("button", { className: "btn-outline-sm", onClick: () => {
      onLogout();
      onClose();
    } }, T.logout), /* @__PURE__ */ React.createElement("button", { className: "modal-close", onClick: onClose }, "\u2715"))), /* @__PURE__ */ React.createElement("div", { className: "account-tabs" }, ["orders", "reservations", "loyalty", "wishlist"].map((t) => /* @__PURE__ */ React.createElement("button", { key: t, className: tab === t ? "active" : "", onClick: () => setTab(t) }, T[t]))), /* @__PURE__ */ React.createElement("div", { className: "account-body" }, loading && /* @__PURE__ */ React.createElement("div", { className: "account-loading" }, "\u2026"), !loading && tab === "orders" && /* @__PURE__ */ React.createElement("div", { className: "acc-orders" }, orders.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "t-mute" }, T.noOrders) : /* @__PURE__ */ React.createElement("div", { className: "orders-list" }, orders.map((o) => /* @__PURE__ */ React.createElement("div", { key: o.id, className: "order-card" }, /* @__PURE__ */ React.createElement("div", { className: "oc-head" }, /* @__PURE__ */ React.createElement("span", { className: "oc-ref t-mono" }, o.reference), /* @__PURE__ */ React.createElement("span", { className: "oc-status", style: { background: STATUS_COLORS[o.status] + "22", color: STATUS_COLORS[o.status], border: `1px solid ${STATUS_COLORS[o.status]}44` } }, T[o.status] || o.status)), /* @__PURE__ */ React.createElement("div", { className: "oc-meta t-mute" }, /* @__PURE__ */ React.createElement("span", null, new Date(o.created_at).toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ")), /* @__PURE__ */ React.createElement("span", { className: "t-num" }, Number(o.total).toLocaleString(), " DA")), o.lines?.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "oc-items" }, o.lines.map((l, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "oc-item-chip" }, l.product_name, " \xD7", l.quantity ?? l.qty))))))), tab === "reservations" && (() => {
      const RESV_STATUS_COLOR = {
        pending: "#F59E0B",
        confirmed: "#3B82F6",
        active: "#10B981",
        expired: "#9CA3AF",
        cancelled: "#EF4444"
      };
      const PAYMENT_LABEL = { paid: T.paid, pending: T.payment_pending, none: T.payment_none };
      return /* @__PURE__ */ React.createElement("div", { className: "acc-reservations" }, reservLoading && /* @__PURE__ */ React.createElement("div", { className: "account-loading" }, "\u2026"), !reservLoading && reservations.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "t-mute" }, T.noReservations), !reservLoading && reservations.map((r) => {
        const statusColor = RESV_STATUS_COLOR[r.status] || "#9CA3AF";
        const isPaid = r.duration_days > 1;
        const payStatus = r.payment_status || "none";
        const expiresDate = r.expires_at ? new Date(r.expires_at).toLocaleDateString(lang === "ar" ? "ar-DZ" : "fr-DZ") : "\u2014";
        const daysLeft = r.days_left ?? 0;
        const hoursLeft = r.hours_left ?? 0;
        const isUrgent = ["pending", "confirmed", "active"].includes(r.status) && daysLeft === 0;
        return /* @__PURE__ */ React.createElement("div", { key: r.id, className: `resv-card${isUrgent ? " urgent" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "resv-card-head" }, /* @__PURE__ */ React.createElement("span", { className: "resv-card-ref t-mono" }, r.reference), /* @__PURE__ */ React.createElement("span", { className: "resv-card-status", style: { background: statusColor + "22", color: statusColor, border: `1px solid ${statusColor}44` } }, T[r.status] || r.status)), /* @__PURE__ */ React.createElement("div", { className: "resv-card-product" }, r.product?.name_fr || "\u2014"), /* @__PURE__ */ React.createElement("div", { className: "resv-card-meta" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "rcm-label" }, T.duration), /* @__PURE__ */ React.createElement("span", { className: "rcm-val" }, r.duration_days, "j")), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "rcm-label" }, T.qty), /* @__PURE__ */ React.createElement("span", { className: "rcm-val" }, r.quantity)), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "rcm-label" }, T.expires), /* @__PURE__ */ React.createElement("span", { className: "rcm-val t-num" }, expiresDate)), isPaid && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "rcm-label" }, T.deposit), /* @__PURE__ */ React.createElement("span", { className: "rcm-val t-num" }, Number(r.partial_amount).toLocaleString("fr-DZ"), " DA")), isPaid && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "rcm-label" }, T.paymentStatus), /* @__PURE__ */ React.createElement("span", { className: "rcm-val" }, PAYMENT_LABEL[payStatus] || payStatus))), ["pending", "confirmed", "active"].includes(r.status) && /* @__PURE__ */ React.createElement("div", { className: `resv-card-timer${isUrgent ? " urgent" : ""}` }, isUrgent ? T.hoursLeft(hoursLeft) : T.daysLeft(daysLeft)));
      }));
    })(), !loading && tab === "loyalty" && loyalty && /* @__PURE__ */ React.createElement("div", { className: "acc-loyalty" }, /* @__PURE__ */ React.createElement("div", { className: "loyalty-card-big", style: { "--tier-color": TIER_COLORS[loyalty.tier] || "#C68B6F" } }, /* @__PURE__ */ React.createElement("div", { className: "lcb-tier" }, TIER_LABELS[loyalty.tier] || loyalty.tier), /* @__PURE__ */ React.createElement("div", { className: "lcb-points" }, /* @__PURE__ */ React.createElement("span", { className: "t-num lcb-pts-num" }, loyalty.points?.toLocaleString()), /* @__PURE__ */ React.createElement("span", { className: "lcb-pts-label" }, T.points)), loyalty.next_tier && /* @__PURE__ */ React.createElement("div", { className: "lcb-progress" }, /* @__PURE__ */ React.createElement("div", { className: "lcb-track" }, /* @__PURE__ */ React.createElement("div", { className: "lcb-fill", style: { width: `${Math.min(100, loyalty.tier_progress?.pct || 0)}%` } })), /* @__PURE__ */ React.createElement("span", { className: "t-mono lcb-next" }, loyalty.tier_progress?.needed || 0, " pts \u2192 ", loyalty.next_tier)), /* @__PURE__ */ React.createElement("div", { className: "lcb-info t-mono" }, T.loyaltyInfo)), loyalty.history?.length > 0 && /* @__PURE__ */ React.createElement("div", { className: "loyalty-history" }, /* @__PURE__ */ React.createElement("div", { className: "t-h5" }, T.history), loyalty.history.map((e, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "lh-row" }, /* @__PURE__ */ React.createElement("span", { className: "lh-desc" }, e.note || e.type), /* @__PURE__ */ React.createElement("span", { className: `lh-pts t-num ${e.points > 0 ? "earn" : "spend"}` }, e.points > 0 ? "+" : "", e.points))))), !loading && tab === "wishlist" && /* @__PURE__ */ React.createElement("div", { className: "acc-wishlist" }, wishlistItems.length === 0 ? /* @__PURE__ */ React.createElement("p", { className: "t-mute" }, T.noWishlist) : /* @__PURE__ */ React.createElement("div", { className: "wl-grid" }, wishlistItems.map((p) => /* @__PURE__ */ React.createElement("div", { key: p.id, className: "wl-card" }, p.media?.[0] && /* @__PURE__ */ React.createElement("img", { src: p.media[0].url, alt: p[`name_${lang}`] || p.name_fr }), /* @__PURE__ */ React.createElement("div", { className: "wl-name" }, p[`name_${lang}`] || p.name_fr), /* @__PURE__ */ React.createElement("div", { className: "wl-price t-num" }, Number(p.price).toLocaleString(), " DA"))))))));
  };
  var OrderTracker = ({ lang, reference }) => {
    const [order, setOrder] = useState(null);
    const [ref, setRef] = useState(reference || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const T = {
      fr: {
        title: "Suivre ma commande",
        placeholder: "R\xE9f\xE9rence LAT-XXXXXX",
        track: "Suivre",
        notFound: "Commande introuvable.",
        status: "Statut",
        eta: "Livraison estim\xE9e"
      },
      ar: {
        title: "\u062A\u062A\u0628\u0639 \u0637\u0644\u0628\u064A",
        placeholder: "\u0627\u0644\u0645\u0631\u062C\u0639 LAT-XXXXXX",
        track: "\u062A\u062A\u0628\u0639",
        notFound: "\u0627\u0644\u0637\u0644\u0628 \u063A\u064A\u0631 \u0645\u0648\u062C\u0648\u062F.",
        status: "\u0627\u0644\u062D\u0627\u0644\u0629",
        eta: "\u0627\u0644\u062A\u0633\u0644\u064A\u0645 \u0627\u0644\u0645\u062A\u0648\u0642\u0639"
      },
      en: {
        title: "Track My Order",
        placeholder: "Reference LAT-XXXXXX",
        track: "Track",
        notFound: "Order not found.",
        status: "Status",
        eta: "Estimated delivery"
      }
    }[lang] || {};
    const doTrack = async () => {
      if (!ref.trim()) return;
      setLoading(true);
      setError("");
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
    const COD_STATUSES = ["pending", "confirmed", "preparing", "shipped", "out_for_delivery", "delivered"];
    const STATUS_T = {
      fr: { pending: "En attente", confirmed: "Confirm\xE9e", preparing: "En pr\xE9paration", shipped: "Exp\xE9di\xE9e", out_for_delivery: "En livraison", delivered: "Livr\xE9e" },
      ar: { pending: "\u0642\u064A\u062F \u0627\u0644\u0627\u0646\u062A\u0638\u0627\u0631", confirmed: "\u0645\u0624\u0643\u062F", preparing: "\u062C\u0627\u0631 \u0627\u0644\u062A\u062D\u0636\u064A\u0631", shipped: "\u062A\u0645 \u0627\u0644\u0634\u062D\u0646", out_for_delivery: "\u0641\u064A \u0627\u0644\u0637\u0631\u064A\u0642", delivered: "\u062A\u0645 \u0627\u0644\u062A\u0633\u0644\u064A\u0645" },
      en: { pending: "Pending", confirmed: "Confirmed", preparing: "Preparing", shipped: "Shipped", out_for_delivery: "Out for delivery", delivered: "Delivered" }
    }[lang] || {};
    const curIdx = order ? COD_STATUSES.indexOf(order.status) : -1;
    return /* @__PURE__ */ React.createElement("div", { className: "order-tracker", dir: lang === "ar" ? "rtl" : "ltr" }, /* @__PURE__ */ React.createElement("h3", { className: "t-h4" }, T.title), /* @__PURE__ */ React.createElement("div", { className: "ot-input" }, /* @__PURE__ */ React.createElement(
      "input",
      {
        value: ref,
        onChange: (e) => setRef(e.target.value),
        placeholder: T.placeholder,
        onKeyDown: (e) => e.key === "Enter" && doTrack()
      }
    ), /* @__PURE__ */ React.createElement("button", { className: "btn-primary", onClick: doTrack, disabled: loading }, loading ? "\u2026" : T.track)), error && /* @__PURE__ */ React.createElement("div", { className: "auth-error" }, error), order && /* @__PURE__ */ React.createElement("div", { className: "ot-result" }, /* @__PURE__ */ React.createElement("div", { className: "ot-progress" }, COD_STATUSES.map((s, i) => /* @__PURE__ */ React.createElement("div", { key: s, className: `ot-dot-wrap ${i <= curIdx ? "done" : ""} ${i === curIdx ? "active" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "ot-dot" }, i < curIdx ? "\u2713" : i + 1), /* @__PURE__ */ React.createElement("span", null, STATUS_T[s]), i < COD_STATUSES.length - 1 && /* @__PURE__ */ React.createElement("div", { className: "ot-line" }))))));
  };
  var FeedbackModal = ({ lang, open, onClose, user, onAuthOpen }) => {
    const [stars, setStars] = useState(0);
    const [hovered, setHovered] = useState(0);
    const [cat, setCat] = useState("");
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");
    const T = {
      fr: {
        title: "Votre avis nous importe",
        sub: "Aidez-nous \xE0 am\xE9liorer votre exp\xE9rience",
        rateLabel: "Notez votre exp\xE9rience",
        catLabel: "Domaine",
        commentLabel: "Commentaire (optionnel)",
        commentPh: "Dites-nous en plus\u2026",
        submit: "Envoyer mon avis",
        submitting: "Envoi\u2026",
        doneTitle: "Merci pour votre retour !",
        doneSub: "Votre avis a bien \xE9t\xE9 re\xE7u.",
        close: "Fermer",
        cats: ["Qualit\xE9 produit", "Livraison", "Service client", "Site web", "Prix", "Autre"],
        required: "Merci de choisir une note."
      },
      ar: {
        title: "\u0631\u0623\u064A\u0643 \u064A\u0647\u0645\u0646\u0627",
        sub: "\u0633\u0627\u0639\u062F\u0646\u0627 \u0639\u0644\u0649 \u062A\u062D\u0633\u064A\u0646 \u062A\u062C\u0631\u0628\u062A\u0643",
        rateLabel: "\u0642\u064A\u0651\u0645 \u062A\u062C\u0631\u0628\u062A\u0643",
        catLabel: "\u0627\u0644\u0645\u062C\u0627\u0644",
        commentLabel: "\u062A\u0639\u0644\u064A\u0642 (\u0627\u062E\u062A\u064A\u0627\u0631\u064A)",
        commentPh: "\u0623\u062E\u0628\u0631\u0646\u0627 \u0623\u0643\u062B\u0631\u2026",
        submit: "\u0625\u0631\u0633\u0627\u0644 \u0631\u0623\u064A\u0643",
        submitting: "\u062C\u0627\u0631\u064D \u0627\u0644\u0625\u0631\u0633\u0627\u0644\u2026",
        doneTitle: "\u0634\u0643\u0631\u0627\u064B \u0639\u0644\u0649 \u0645\u0644\u0627\u062D\u0638\u0627\u062A\u0643!",
        doneSub: "\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0631\u0623\u064A\u0643 \u0628\u0646\u062C\u0627\u062D.",
        close: "\u0625\u063A\u0644\u0627\u0642",
        cats: ["\u062C\u0648\u062F\u0629 \u0627\u0644\u0645\u0646\u062A\u062C", "\u0627\u0644\u062A\u0648\u0635\u064A\u0644", "\u062E\u062F\u0645\u0629 \u0627\u0644\u0639\u0645\u0644\u0627\u0621", "\u0627\u0644\u0645\u0648\u0642\u0639", "\u0627\u0644\u0633\u0639\u0631", "\u0623\u062E\u0631\u0649"],
        required: "\u0627\u0644\u0631\u062C\u0627\u0621 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0642\u064A\u064A\u0645."
      },
      en: {
        title: "Your feedback matters",
        sub: "Help us improve your experience",
        rateLabel: "Rate your experience",
        catLabel: "Category",
        commentLabel: "Comment (optional)",
        commentPh: "Tell us more\u2026",
        submit: "Submit feedback",
        submitting: "Sending\u2026",
        doneTitle: "Thank you for your feedback!",
        doneSub: "We have received your review.",
        close: "Close",
        cats: ["Product quality", "Delivery", "Customer service", "Website", "Pricing", "Other"],
        required: "Please choose a rating."
      }
    };
    const t = T[lang] || T.fr;
    const reset = () => {
      setStars(0);
      setHovered(0);
      setCat("");
      setComment("");
      setDone(false);
      setError("");
    };
    if (!open) return null;
    const handleSubmit = async () => {
      if (!stars) {
        setError(t.required);
        return;
      }
      setLoading(true);
      setError("");
      try {
        await window.latinaApi.submitFeedback({ rating: stars, category: cat || null, comment: comment || null, lang });
        setDone(true);
      } catch (e) {
        setError(e.message || "Erreur r\xE9seau, r\xE9essayez.");
      } finally {
        setLoading(false);
      }
    };
    const handleClose = () => {
      reset();
      onClose();
    };
    const loginWall = {
      fr: { msg: "Connectez-vous pour laisser un avis.", btn: "Se connecter" },
      ar: { msg: "\u0633\u062C\u0644\u064A \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u062A\u0631\u0643 \u062A\u0642\u064A\u064A\u0645.", btn: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644" },
      en: { msg: "Sign in to leave a review.", btn: "Sign in" }
    }[lang] || { msg: "Sign in to leave a review.", btn: "Sign in" };
    return /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: handleClose }, /* @__PURE__ */ React.createElement("div", { className: "feedback-modal", onClick: (e) => e.stopPropagation() }, !user && /* @__PURE__ */ React.createElement("div", { className: "fb-login-wall" }, /* @__PURE__ */ React.createElement("button", { className: "modal-close", onClick: handleClose }, "\u2715"), /* @__PURE__ */ React.createElement("div", { className: "fb-login-icon" }, "\u{1F512}"), /* @__PURE__ */ React.createElement("p", { className: "fb-login-msg" }, loginWall.msg), /* @__PURE__ */ React.createElement("button", { className: "fb-submit", onClick: () => {
      handleClose();
      onAuthOpen?.();
    } }, loginWall.btn)), user && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { className: "modal-close", onClick: handleClose }, "\u2715"), done ? /* @__PURE__ */ React.createElement("div", { className: "fb-success" }, /* @__PURE__ */ React.createElement("div", { className: "fb-success-icon" }, "\u2726"), /* @__PURE__ */ React.createElement("h3", null, t.doneTitle), /* @__PURE__ */ React.createElement("p", null, t.doneSub), /* @__PURE__ */ React.createElement("button", { className: "fb-submit", onClick: handleClose }, t.close)) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "fb-header" }, /* @__PURE__ */ React.createElement("h2", { className: "fb-title" }, t.title), /* @__PURE__ */ React.createElement("p", { className: "fb-sub" }, t.sub)), /* @__PURE__ */ React.createElement("div", { className: "fb-section" }, /* @__PURE__ */ React.createElement("label", { className: "fb-label" }, t.rateLabel), /* @__PURE__ */ React.createElement("div", { className: "fb-stars-row" }, [1, 2, 3, 4, 5].map((n) => /* @__PURE__ */ React.createElement(
      "button",
      {
        key: n,
        className: `fb-star ${(hovered || stars) >= n ? "active" : ""}`,
        onMouseEnter: () => setHovered(n),
        onMouseLeave: () => setHovered(0),
        onClick: () => setStars(n)
      },
      "\u2605"
    )), stars > 0 && /* @__PURE__ */ React.createElement("span", { className: "fb-star-text" }, ["", "M\xE9diocre", "Passable", "Bien", "Tr\xE8s bien", "Excellent"][stars]))), /* @__PURE__ */ React.createElement("div", { className: "fb-section" }, /* @__PURE__ */ React.createElement("label", { className: "fb-label" }, t.catLabel), /* @__PURE__ */ React.createElement("div", { className: "fb-cats" }, t.cats.map((c) => /* @__PURE__ */ React.createElement("button", { key: c, className: `fb-cat ${cat === c ? "active" : ""}`, onClick: () => setCat(c === cat ? "" : c) }, c)))), /* @__PURE__ */ React.createElement("div", { className: "fb-section" }, /* @__PURE__ */ React.createElement("label", { className: "fb-label" }, t.commentLabel), /* @__PURE__ */ React.createElement(
      "textarea",
      {
        className: "fb-textarea",
        placeholder: t.commentPh,
        maxLength: 500,
        value: comment,
        onChange: (e) => setComment(e.target.value)
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "fb-char" }, comment.length, "/500")), error && /* @__PURE__ */ React.createElement("p", { className: "fb-error" }, error), /* @__PURE__ */ React.createElement("button", { className: "fb-submit", onClick: handleSubmit, disabled: loading }, loading ? t.submitting : t.submit)))));
  };
  var TICKET_CATS = {
    fr: ["Commande / livraison", "Produit d\xE9fectueux", "Remboursement", "Compte & connexion", "Programme fid\xE9lit\xE9", "Autre"],
    ar: ["\u0627\u0644\u0637\u0644\u0628 / \u0627\u0644\u062A\u0648\u0635\u064A\u0644", "\u0645\u0646\u062A\u062C \u0645\u0639\u0637\u0648\u0628", "\u0627\u0633\u062A\u0631\u062F\u0627\u062F \u0627\u0644\u0645\u0628\u0644\u063A", "\u0627\u0644\u062D\u0633\u0627\u0628 \u0648\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644", "\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0648\u0644\u0627\u0621", "\u0623\u062E\u0631\u0649"],
    en: ["Order / delivery", "Defective product", "Refund", "Account & login", "Loyalty program", "Other"]
  };
  var SupportModal = ({ lang, open, onClose, user }) => {
    const [mode, setMode] = useState("new");
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", subject: "", category: "", priority: "normal", description: "" });
    const [ref, setRef] = useState("");
    const [trackRef, setTrackRef] = useState("");
    const [tracked, setTracked] = useState(null);
    const [trackError, setTrackError] = useState("");
    const [myTickets, setMyTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [fieldErr, setFieldErr] = useState({});
    const T = {
      fr: {
        title: "Support client",
        tabNew: "Nouveau ticket",
        tabTrack: "Suivre un ticket",
        tabMine: "Mes tickets",
        step1: "Vos coordonn\xE9es",
        step2: "Votre demande",
        step3: "Confirmation",
        name: "Nom complet",
        email: "Email",
        phone: "T\xE9l\xE9phone",
        subject: "Sujet",
        catLabel: "Cat\xE9gorie",
        prioLabel: "Priorit\xE9",
        desc: "Description d\xE9taill\xE9e",
        descPh: "D\xE9crivez votre probl\xE8me en d\xE9tail\u2026",
        prios: [{ v: "low", l: "Basse" }, { v: "normal", l: "Normale" }, { v: "high", l: "Haute" }, { v: "urgent", l: "Urgent" }],
        next: "Suivant",
        back: "Retour",
        submit: "Envoyer le ticket",
        submitting: "Envoi\u2026",
        doneTitle: "Ticket cr\xE9\xE9 avec succ\xE8s !",
        doneSub: "R\xE9f\xE9rence de votre ticket :",
        doneInfo: "Conservez cette r\xE9f\xE9rence pour suivre l'\xE9tat de votre demande.",
        close: "Fermer",
        trackLabel: "R\xE9f\xE9rence du ticket",
        trackPh: "Ex: TKT-XXXXXX",
        trackBtn: "Rechercher",
        tracking: "Recherche\u2026",
        trackNotFound: "Aucun ticket trouv\xE9 avec cette r\xE9f\xE9rence.",
        stateLabels: { new: "Nouveau", attributed: "Attribu\xE9", pending: "En attente", planned: "Planifi\xE9", in_progress: "En cours", resolved: "R\xE9solu", closed: "Ferm\xE9" },
        noTickets: "Aucun ticket ouvert.",
        req: "Champ requis"
      },
      ar: {
        title: "\u062F\u0639\u0645 \u0627\u0644\u0639\u0645\u0644\u0627\u0621",
        tabNew: "\u062A\u0630\u0643\u0631\u0629 \u062C\u062F\u064A\u062F\u0629",
        tabTrack: "\u0645\u062A\u0627\u0628\u0639\u0629 \u062A\u0630\u0643\u0631\u0629",
        tabMine: "\u062A\u0630\u0627\u0643\u0631\u064A",
        step1: "\u0628\u064A\u0627\u0646\u0627\u062A\u0643",
        step2: "\u0637\u0644\u0628\u0643",
        step3: "\u062A\u0623\u0643\u064A\u062F",
        name: "\u0627\u0644\u0627\u0633\u0645 \u0627\u0644\u0643\u0627\u0645\u0644",
        email: "\u0627\u0644\u0628\u0631\u064A\u062F \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A",
        phone: "\u0627\u0644\u0647\u0627\u062A\u0641",
        subject: "\u0627\u0644\u0645\u0648\u0636\u0648\u0639",
        catLabel: "\u0627\u0644\u0641\u0626\u0629",
        prioLabel: "\u0627\u0644\u0623\u0648\u0644\u0648\u064A\u0629",
        desc: "\u0648\u0635\u0641 \u062A\u0641\u0635\u064A\u0644\u064A",
        descPh: "\u0635\u0641 \u0645\u0634\u0643\u0644\u062A\u0643 \u0628\u0627\u0644\u062A\u0641\u0635\u064A\u0644\u2026",
        prios: [{ v: "low", l: "\u0645\u0646\u062E\u0641\u0636\u0629" }, { v: "normal", l: "\u0639\u0627\u062F\u064A\u0629" }, { v: "high", l: "\u0639\u0627\u0644\u064A\u0629" }, { v: "urgent", l: "\u0639\u0627\u062C\u0644" }],
        next: "\u0627\u0644\u062A\u0627\u0644\u064A",
        back: "\u0631\u062C\u0648\u0639",
        submit: "\u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u0630\u0643\u0631\u0629",
        submitting: "\u062C\u0627\u0631\u064D \u0627\u0644\u0625\u0631\u0633\u0627\u0644\u2026",
        doneTitle: "\u062A\u0645 \u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062A\u0630\u0643\u0631\u0629 \u0628\u0646\u062C\u0627\u062D!",
        doneSub: "\u0645\u0631\u062C\u0639 \u062A\u0630\u0643\u0631\u062A\u0643:",
        doneInfo: "\u0627\u062D\u062A\u0641\u0638 \u0628\u0647\u0630\u0627 \u0627\u0644\u0645\u0631\u062C\u0639 \u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u062D\u0627\u0644\u0629 \u0637\u0644\u0628\u0643.",
        close: "\u0625\u063A\u0644\u0627\u0642",
        trackLabel: "\u0645\u0631\u062C\u0639 \u0627\u0644\u062A\u0630\u0643\u0631\u0629",
        trackPh: "\u0645\u062B\u0627\u0644: TKT-XXXXXX",
        trackBtn: "\u0628\u062D\u062B",
        tracking: "\u062C\u0627\u0631\u064D \u0627\u0644\u0628\u062D\u062B\u2026",
        trackNotFound: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0623\u064A \u062A\u0630\u0643\u0631\u0629 \u0628\u0647\u0630\u0627 \u0627\u0644\u0645\u0631\u062C\u0639.",
        stateLabels: { new: "\u062C\u062F\u064A\u062F\u0629", attributed: "\u0645\u0646\u0633\u0648\u0628\u0629", pending: "\u0645\u0639\u0644\u0642\u0629", planned: "\u0645\u062C\u062F\u0648\u0644\u0629", in_progress: "\u062C\u0627\u0631\u064D", resolved: "\u0645\u062D\u0644\u0648\u0644\u0629", closed: "\u0645\u063A\u0644\u0642\u0629" },
        noTickets: "\u0644\u0627 \u062A\u0648\u062C\u062F \u062A\u0630\u0627\u0643\u0631 \u0645\u0641\u062A\u0648\u062D\u0629.",
        req: "\u062D\u0642\u0644 \u0645\u0637\u0644\u0648\u0628"
      },
      en: {
        title: "Customer support",
        tabNew: "New ticket",
        tabTrack: "Track ticket",
        tabMine: "My tickets",
        step1: "Contact info",
        step2: "Your request",
        step3: "Confirmation",
        name: "Full name",
        email: "Email",
        phone: "Phone",
        subject: "Subject",
        catLabel: "Category",
        prioLabel: "Priority",
        desc: "Detailed description",
        descPh: "Describe your issue in detail\u2026",
        prios: [{ v: "low", l: "Low" }, { v: "normal", l: "Normal" }, { v: "high", l: "High" }, { v: "urgent", l: "Urgent" }],
        next: "Next",
        back: "Back",
        submit: "Submit ticket",
        submitting: "Sending\u2026",
        doneTitle: "Ticket created successfully!",
        doneSub: "Your ticket reference:",
        doneInfo: "Keep this reference to track your request status.",
        close: "Close",
        trackLabel: "Ticket reference",
        trackPh: "e.g. TKT-XXXXXX",
        trackBtn: "Search",
        tracking: "Searching\u2026",
        trackNotFound: "No ticket found with this reference.",
        stateLabels: { new: "New", attributed: "Attributed", pending: "Pending", planned: "Planned", in_progress: "In progress", resolved: "Resolved", closed: "Closed" },
        noTickets: "No open tickets.",
        req: "Required field"
      }
    };
    const t = T[lang] || T.fr;
    const cats = TICKET_CATS[lang] || TICKET_CATS.fr;
    useEffect(() => {
      if (open && mode === "mine" && user) {
        window.latinaApi.getMyTickets().then((d) => setMyTickets(d.data || d || [])).catch(() => {
        });
      }
    }, [open, mode, user]);
    const reset = () => {
      setStep(1);
      setRef("");
      setTrackRef("");
      setTracked(null);
      setTrackError("");
      setError("");
      setFieldErr({});
      setForm({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "", subject: "", category: "", priority: "normal", description: "" });
    };
    if (!open) return null;
    const handleClose = () => {
      reset();
      onClose();
    };
    const setF = (k, v) => {
      setForm((p) => ({ ...p, [k]: v }));
      setFieldErr((p) => ({ ...p, [k]: "" }));
    };
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
      setLoading(true);
      setTrackError("");
      setTracked(null);
      try {
        const d = await window.latinaApi.trackTicket(trackRef.trim());
        setTracked(d.data || d);
      } catch {
        setTrackError(t.trackNotFound);
      } finally {
        setLoading(false);
      }
    };
    const handleSubmit = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await window.latinaApi.createTicket({ ...form, lang });
        setRef((res.data || res).reference || (res.data || res).ref || "TKT-??????");
        setStep(3);
      } catch (e) {
        setError(e.message || "Erreur r\xE9seau.");
      } finally {
        setLoading(false);
      }
    };
    const stateColor = (s) => ({ new: "#60A5FA", attributed: "#A78BFA", pending: "#FCD34D", planned: "#67E8F9", in_progress: "#E2B8A2", resolved: "#34D399", closed: "#9A9590" })[s] || "#9A9590";
    return /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: handleClose }, /* @__PURE__ */ React.createElement("div", { className: "support-modal", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("button", { className: "modal-close", onClick: handleClose }, "\u2715"), /* @__PURE__ */ React.createElement("h2", { className: "sup-title" }, t.title), /* @__PURE__ */ React.createElement("div", { className: "sup-tabs" }, ["new", "track", "mine"].map((m, i) => /* @__PURE__ */ React.createElement("button", { key: m, className: `sup-tab ${mode === m ? "active" : ""}`, onClick: () => {
      setMode(m);
      reset();
    } }, [t.tabNew, t.tabTrack, t.tabMine][i]))), mode === "new" && !user && /* @__PURE__ */ React.createElement("div", { className: "sup-login-wall" }, /* @__PURE__ */ React.createElement("div", { className: "fb-login-icon" }, "\u{1F512}"), /* @__PURE__ */ React.createElement("p", { className: "fb-login-msg" }, lang === "ar" ? "\u0633\u062C\u0644\u064A \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0641\u062A\u062D \u062A\u0630\u0643\u0631\u0629 \u062F\u0639\u0645." : lang === "en" ? "Sign in to open a support ticket." : "Connectez-vous pour cr\xE9er un ticket de support.")), mode === "new" && user && /* @__PURE__ */ React.createElement(React.Fragment, null, step < 3 && /* @__PURE__ */ React.createElement("div", { className: "sup-steps" }, [t.step1, t.step2].map((label, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: `sup-step ${step === i + 1 ? "active" : step > i + 1 ? "done" : ""}` }, /* @__PURE__ */ React.createElement("div", { className: "sup-step-dot" }, step > i + 1 ? "\u2713" : i + 1), /* @__PURE__ */ React.createElement("span", null, label)))), /* @__PURE__ */ React.createElement("div", { className: "sup-body" }, step === 1 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "sup-field" }, /* @__PURE__ */ React.createElement("label", { className: "sup-label" }, t.name), /* @__PURE__ */ React.createElement("input", { className: `sup-input ${fieldErr.name ? "err" : ""}`, value: form.name, onChange: (e) => setF("name", e.target.value), placeholder: t.name }), fieldErr.name && /* @__PURE__ */ React.createElement("span", { className: "sup-error" }, fieldErr.name)), /* @__PURE__ */ React.createElement("div", { className: "sup-field" }, /* @__PURE__ */ React.createElement("label", { className: "sup-label" }, t.email), /* @__PURE__ */ React.createElement("input", { className: `sup-input ${fieldErr.email ? "err" : ""}`, type: "email", value: form.email, onChange: (e) => setF("email", e.target.value), placeholder: t.email }), fieldErr.email && /* @__PURE__ */ React.createElement("span", { className: "sup-error" }, fieldErr.email)), /* @__PURE__ */ React.createElement("div", { className: "sup-field" }, /* @__PURE__ */ React.createElement("label", { className: "sup-label" }, t.phone), /* @__PURE__ */ React.createElement("input", { className: "sup-input", type: "tel", value: form.phone, onChange: (e) => setF("phone", e.target.value), placeholder: "0XXXXXXXXX" })), /* @__PURE__ */ React.createElement("div", { className: "sup-btn-row" }, /* @__PURE__ */ React.createElement("button", { className: "sup-btn-primary", onClick: () => {
      if (validateStep1()) setStep(2);
    } }, t.next))), step === 2 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "sup-field" }, /* @__PURE__ */ React.createElement("label", { className: "sup-label" }, t.subject), /* @__PURE__ */ React.createElement("input", { className: `sup-input ${fieldErr.subject ? "err" : ""}`, value: form.subject, onChange: (e) => setF("subject", e.target.value), placeholder: t.subject }), fieldErr.subject && /* @__PURE__ */ React.createElement("span", { className: "sup-error" }, fieldErr.subject)), /* @__PURE__ */ React.createElement("div", { className: "sup-field" }, /* @__PURE__ */ React.createElement("label", { className: "sup-label" }, t.catLabel), /* @__PURE__ */ React.createElement("div", { className: "sup-cat-grid" }, cats.map((c) => /* @__PURE__ */ React.createElement("button", { key: c, className: `sup-cat-btn ${form.category === c ? "active" : ""}`, onClick: () => setF("category", c) }, c)))), /* @__PURE__ */ React.createElement("div", { className: "sup-field" }, /* @__PURE__ */ React.createElement("label", { className: "sup-label" }, t.prioLabel), /* @__PURE__ */ React.createElement("div", { className: "sup-prio-row" }, t.prios.map((p) => /* @__PURE__ */ React.createElement("button", { key: p.v, className: `sup-prio-btn ${form.priority === p.v ? "active" : ""}`, onClick: () => setF("priority", p.v) }, p.l)))), /* @__PURE__ */ React.createElement("div", { className: "sup-field" }, /* @__PURE__ */ React.createElement("label", { className: "sup-label" }, t.desc), /* @__PURE__ */ React.createElement("textarea", { className: `sup-textarea ${fieldErr.description ? "err" : ""}`, rows: 4, value: form.description, onChange: (e) => setF("description", e.target.value), placeholder: t.descPh }), fieldErr.description && /* @__PURE__ */ React.createElement("span", { className: "sup-error" }, fieldErr.description)), error && /* @__PURE__ */ React.createElement("p", { className: "sup-error" }, error), /* @__PURE__ */ React.createElement("div", { className: "sup-btn-row" }, /* @__PURE__ */ React.createElement("button", { className: "sup-btn-ghost", onClick: () => setStep(1) }, t.back), /* @__PURE__ */ React.createElement("button", { className: "sup-btn-primary", onClick: () => {
      if (validateStep2()) handleSubmit();
    }, disabled: loading }, loading ? t.submitting : t.submit))), step === 3 && /* @__PURE__ */ React.createElement("div", { className: "sup-success" }, /* @__PURE__ */ React.createElement("div", { className: "sup-success-icon" }, "\u2726"), /* @__PURE__ */ React.createElement("h3", null, t.doneTitle), /* @__PURE__ */ React.createElement("p", { className: "sup-success-sub" }, t.doneSub), /* @__PURE__ */ React.createElement("div", { className: "sup-ref-badge" }, ref), /* @__PURE__ */ React.createElement("p", { className: "sup-success-info" }, t.doneInfo), /* @__PURE__ */ React.createElement("button", { className: "sup-btn-primary", onClick: handleClose }, t.close)))), mode === "track" && /* @__PURE__ */ React.createElement("div", { className: "sup-body" }, /* @__PURE__ */ React.createElement("div", { className: "sup-field" }, /* @__PURE__ */ React.createElement("label", { className: "sup-label" }, t.trackLabel), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: "8px" } }, /* @__PURE__ */ React.createElement("input", { className: "sup-input", value: trackRef, onChange: (e) => setTrackRef(e.target.value), placeholder: t.trackPh, onKeyDown: (e) => e.key === "Enter" && handleTrack() }), /* @__PURE__ */ React.createElement("button", { className: "sup-btn-primary", style: { flexShrink: 0 }, onClick: handleTrack, disabled: loading }, loading ? t.tracking : t.trackBtn)), trackError && /* @__PURE__ */ React.createElement("span", { className: "sup-error" }, trackError)), tracked && /* @__PURE__ */ React.createElement("div", { className: "sup-tracked" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } }, /* @__PURE__ */ React.createElement("span", { className: "sup-ref-badge" }, tracked.reference || tracked.ref), /* @__PURE__ */ React.createElement("span", { style: { padding: "3px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600, background: `${stateColor(tracked.status)}22`, color: stateColor(tracked.status) } }, t.stateLabels[tracked.status] || tracked.status)), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "13px", fontWeight: 600, marginBottom: "6px" } }, tracked.subject), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "12px", color: "var(--text-muted)" } }, tracked.category), tracked.created_at && /* @__PURE__ */ React.createElement("p", { style: { fontSize: "11px", color: "var(--text-muted)", marginTop: "8px" } }, "Cr\xE9\xE9 le ", new Date(tracked.created_at).toLocaleDateString()))), mode === "mine" && /* @__PURE__ */ React.createElement("div", { className: "sup-body" }, !user ? /* @__PURE__ */ React.createElement("p", { style: { textAlign: "center", color: "var(--text-muted)", padding: "24px 0" } }, "Connectez-vous pour voir vos tickets.") : myTickets.length === 0 ? /* @__PURE__ */ React.createElement("p", { style: { textAlign: "center", color: "var(--text-muted)", padding: "24px 0" } }, t.noTickets) : myTickets.map((tk) => /* @__PURE__ */ React.createElement("div", { key: tk.id || tk.reference, className: "my-ticket-row" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } }, /* @__PURE__ */ React.createElement("span", { className: "sup-ref-badge" }, tk.reference || tk.ref), /* @__PURE__ */ React.createElement("span", { style: { padding: "2px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600, background: `${stateColor(tk.status)}22`, color: stateColor(tk.status) } }, t.stateLabels[tk.status] || tk.status)), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "13px", fontWeight: 500, marginTop: "6px" } }, tk.subject), /* @__PURE__ */ React.createElement("p", { style: { fontSize: "11px", color: "var(--text-muted)", marginTop: "4px" } }, tk.category, " \xB7 ", tk.priority))))));
  };
  Object.assign(window, { AuthModal, CartDrawer, CheckoutPage, AccountPage, OrderTracker, FeedbackModal, SupportModal });
})();
