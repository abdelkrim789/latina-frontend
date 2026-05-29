(() => {
  // scenes-2.jsx
  var { useState, useEffect, useRef, useCallback } = React;
  var _genToken = () => Array.from({ length: 4 }, () => Math.random().toString(36).slice(2)).join("").slice(0, 32);
  var _getOrCreate = (key) => {
    let v = localStorage.getItem(key);
    if (!v) {
      v = _genToken();
      localStorage.setItem(key, v);
    }
    return v;
  };
  var WinnerAnnouncement = ({ announcement, lang, onClose }) => {
    const [timeLeft, setTimeLeft] = useState("");
    const [dismissed, setDismissed] = useState(false);
    const TW = {
      fr: { congrats: "F\xE9licitations !", sub: "Gagnante du concours", label: "\xAB", close: "Fermer", visible: "Annonce visible encore" },
      ar: { congrats: "\u062A\u0647\u0627\u0646\u064A\u0646\u0627 !", sub: "\u0627\u0644\u0641\u0627\u0626\u0632\u0629 \u0628\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629", label: "\xAB", close: "\u0625\u063A\u0644\u0627\u0642", visible: "\u0627\u0644\u0625\u0639\u0644\u0627\u0646 \u0645\u062A\u0627\u062D \u0644\u0645\u062F\u0629" },
      en: { congrats: "Congratulations!", sub: "Contest winner", label: "\xAB", close: "Close", visible: "Announcement visible for" }
    }[lang] || { congrats: "F\xE9licitations !", sub: "Gagnante", label: "\xAB", close: "Fermer", visible: "Encore" };
    const multiLang = lang === "fr" ? "\u062A\u0647\u0627\u0646\u064A\u0646\u0627 \xB7 Congratulations" : lang === "ar" ? "F\xE9licitations \xB7 Congratulations" : "F\xE9licitations \xB7 \u062A\u0647\u0627\u0646\u064A\u0646\u0627";
    useEffect(() => {
      const end = new Date(announcement.winner_announced_at).getTime() + 6 * 3600 * 1e3;
      const tick = () => {
        const diff = end - Date.now();
        if (diff <= 0) {
          onClose();
          return;
        }
        const h = Math.floor(diff / 36e5);
        const m = Math.floor(diff / 6e4 % 60);
        setTimeLeft(`${h}h ${String(m).padStart(2, "0")}m`);
      };
      tick();
      const iv = setInterval(tick, 3e4);
      return () => clearInterval(iv);
    }, [announcement.winner_announced_at]);
    const rawName = announcement.winner_name || "\u2014";
    const maskedName = rawName.split(" ").map((p, i) => i === 0 ? p : (p[0] || "") + ".").join(" ");
    const contestTitle = announcement.title || "";
    if (dismissed) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "winner-overlay", onClick: () => {
      setDismissed(true);
      onClose();
    } }, /* @__PURE__ */ React.createElement("div", { className: "winner-modal", onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("div", { className: "winner-confetti", "aria-hidden": "true" }, Array.from({ length: 24 }, (_, i) => /* @__PURE__ */ React.createElement(
      "div",
      {
        key: i,
        className: `conf-p conf-p${i % 5 + 1}`,
        style: { left: `${i * 4.2 % 92}%`, animationDelay: `${i * 0.13 % 2.5}s`, animationDuration: `${1.8 + i % 4 * 0.3}s` }
      }
    ))), /* @__PURE__ */ React.createElement("div", { className: "winner-trophy", "aria-hidden": "true" }, "\u{1F3C6}"), /* @__PURE__ */ React.createElement("div", { className: "winner-congrats" }, TW.congrats), /* @__PURE__ */ React.createElement("div", { className: "winner-multilang" }, multiLang), /* @__PURE__ */ React.createElement("div", { className: "winner-card" }, /* @__PURE__ */ React.createElement("div", { className: "winner-card-label" }, TW.sub), contestTitle && /* @__PURE__ */ React.createElement("div", { className: "winner-card-title" }, TW.label, contestTitle, "\xBB"), /* @__PURE__ */ React.createElement("div", { className: "winner-name" }, "\u2728 ", maskedName, " \u2728")), timeLeft && /* @__PURE__ */ React.createElement("div", { className: "winner-timer" }, TW.visible, " ", /* @__PURE__ */ React.createElement("strong", null, timeLeft)), /* @__PURE__ */ React.createElement("button", { className: "winner-close", onClick: () => {
      setDismissed(true);
      onClose();
    } }, TW.close, " \u2715")));
  };
  var TirageAnimation = ({ announcement, onComplete, T }) => {
    const { tied_entries = [], winner_entry_id } = announcement;
    const [currentIdx, setCurrentIdx] = useState(0);
    const [phase, setPhase] = useState("spinning");
    const [showSkip, setShowSkip] = useState(false);
    useEffect(() => {
      const t = setTimeout(() => setShowSkip(true), 2500);
      return () => clearTimeout(t);
    }, []);
    useEffect(() => {
      if (phase !== "spinning" || tied_entries.length === 0) return;
      const winnerIdx = tied_entries.findIndex((e) => e.id === winner_entry_id);
      const safeIdx = winnerIdx >= 0 ? winnerIdx : 0;
      const schedule = [50, 55, 60, 65, 70, 80, 90, 105, 125, 150, 180, 215, 260, 315, 380, 460];
      let step = 0;
      let idx = 0;
      let timer;
      const advance = () => {
        if (step >= schedule.length) {
          setCurrentIdx(safeIdx);
          setPhase("landing");
          setTimeout(onComplete, 2800);
          return;
        }
        idx = (idx + 1) % tied_entries.length;
        setCurrentIdx(idx);
        step++;
        timer = setTimeout(advance, schedule[step] || 460);
      };
      timer = setTimeout(advance, schedule[0]);
      return () => clearTimeout(timer);
    }, []);
    const skip = () => {
      const winnerIdx = tied_entries.findIndex((e) => e.id === winner_entry_id);
      setCurrentIdx(winnerIdx >= 0 ? winnerIdx : 0);
      setPhase("landing");
      setTimeout(onComplete, 2200);
    };
    const current = tied_entries[currentIdx] || {};
    const isLanding = phase === "landing";
    return /* @__PURE__ */ React.createElement("div", { style: {
      position: "fixed",
      inset: 0,
      zIndex: 9999,
      background: "rgba(0,0,0,.88)",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      padding: 24
    } }, /* @__PURE__ */ React.createElement("style", null, `
        @keyframes pulseGold {
          0%,100% { box-shadow: 0 0 24px rgba(245,158,11,.5); }
          50%      { box-shadow: 0 0 56px rgba(245,158,11,.9); }
        }
        @keyframes spinFade {
          0%   { opacity: .6; transform: scale(.97); }
          100% { opacity: 1;  transform: scale(1);   }
        }
      `), /* @__PURE__ */ React.createElement("div", { style: {
      fontFamily: "var(--mono)",
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.5)",
      marginBottom: 28,
      textAlign: "center"
    } }, T.tirageRunning), phase === "spinning" && /* @__PURE__ */ React.createElement("p", { style: {
      fontSize: 13,
      color: "rgba(255,255,255,.6)",
      textAlign: "center",
      maxWidth: 320,
      lineHeight: 1.6,
      marginBottom: 28,
      fontFamily: "var(--mono)"
    } }, T.tirageDesc), /* @__PURE__ */ React.createElement("div", { style: {
      width: 210,
      height: 270,
      borderRadius: 20,
      overflow: "hidden",
      border: isLanding ? "3px solid #F59E0B" : "2px solid rgba(255,255,255,.18)",
      animation: isLanding ? "pulseGold 1.4s ease infinite" : "spinFade .08s ease",
      transition: "border-color .3s",
      background: "#222"
    } }, current.photo_url ? /* @__PURE__ */ React.createElement(
      "img",
      {
        src: window.mediaUrl(current.photo_url),
        alt: current.name,
        key: currentIdx,
        style: { width: "100%", height: "100%", objectFit: "cover", display: "block" }
      }
    ) : /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: "100%", background: "#333" } })), /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: 700,
      minHeight: 28,
      textAlign: "center",
      color: isLanding ? "#F59E0B" : "#fff",
      transition: "color .4s"
    } }, isLanding ? `\u{1F3C6} ${current.name}` : current.name), isLanding && /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 8,
      fontSize: 13,
      color: "rgba(255,255,255,.65)",
      fontFamily: "var(--mono)",
      textAlign: "center"
    } }, T.tirageWinner), /* @__PURE__ */ React.createElement("div", { style: {
      marginTop: 10,
      fontSize: 13,
      color: "rgba(255,255,255,.45)",
      fontFamily: "var(--mono)"
    } }, "\u2764\uFE0F ", current.votes ?? 0, " vote", (current.votes ?? 0) !== 1 ? "s" : ""), showSkip && phase === "spinning" && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: skip,
        style: {
          marginTop: 28,
          background: "none",
          border: "1px solid rgba(255,255,255,.25)",
          color: "rgba(255,255,255,.5)",
          borderRadius: 20,
          padding: "6px 18px",
          fontSize: 12,
          cursor: "pointer",
          fontFamily: "var(--mono)",
          transition: "border-color .2s, color .2s"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,.5)";
          e.currentTarget.style.color = "#fff";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,.25)";
          e.currentTarget.style.color = "rgba(255,255,255,.5)";
        }
      },
      T.tirageSkip
    ));
  };
  var useCountdown = (endsAt) => {
    const pad = (n) => String(n).padStart(2, "0");
    const calc = () => {
      const diff = new Date(endsAt) - Date.now();
      if (diff <= 0) return { d: "00", h: "00", m: "00", s: "00" };
      return {
        d: pad(Math.floor(diff / 864e5)),
        h: pad(Math.floor(diff / 36e5 % 24)),
        m: pad(Math.floor(diff / 6e4 % 60)),
        s: pad(Math.floor(diff / 1e3 % 60))
      };
    };
    const [time, setTime] = useState(calc);
    useEffect(() => {
      if (!endsAt) return;
      setTime(calc());
      const iv = setInterval(() => setTime(calc()), 1e3);
      return () => clearInterval(iv);
    }, [endsAt]);
    return time;
  };
  var PhotoParticipateModal = ({ contest, participationToken, user, onClose, onSuccess, T }) => {
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [submitting, setSubmitting] = useState(false);
    const [screen, setScreen] = useState("form");
    const [error, setError] = useState("");
    const fileRef = useRef(null);
    const isAuth = !!user;
    const handleFile = (f) => {
      if (!f || !f.type.startsWith("image/")) return;
      setPhoto(f);
      setPreview(URL.createObjectURL(f));
      setError("");
    };
    const handleDrop = (e) => {
      e.preventDefault();
      handleFile(e.dataTransfer.files[0]);
    };
    const handleSubmit = async () => {
      if (!photo) {
        setError(T.photoRequired);
        return;
      }
      if (!isAuth && !name.trim()) {
        setError(T.nameRequired);
        return;
      }
      if (!isAuth && !phone.trim()) {
        setError(T.phoneRequired);
        return;
      }
      setSubmitting(true);
      setError("");
      try {
        const gName = isAuth ? null : name.trim();
        const gPhone = isAuth ? null : phone.trim();
        const res = await window.latinaApi.enterContestPhoto(photo, gName, gPhone, participationToken);
        if (res.already_entered) {
          setScreen("already");
          return;
        }
        const entry = res.user_entry || { status: "pending" };
        setScreen("success");
        onSuccess(entry);
      } catch (e) {
        if (e.data?.already_entered) {
          setScreen("already");
          return;
        }
        setError(e.message || T.entryErr);
      } finally {
        setSubmitting(false);
      }
    };
    const modalBox = (children) => /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: onClose }, /* @__PURE__ */ React.createElement(
      "div",
      {
        style: { background: "var(--cream-50)", borderRadius: 20, padding: "48px 36px", maxWidth: 420, width: "100%", textAlign: "center", position: "relative", animation: "slideUp .3s var(--ease-petal)" },
        onClick: (e) => e.stopPropagation()
      },
      children
    ));
    if (screen === "success") return modalBox(
      /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 64, marginBottom: 16 } }, "\u{1F389}"), /* @__PURE__ */ React.createElement("h3", { style: { marginBottom: 8, fontSize: 20 } }, T.successTitle), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6 } }, T.successDesc), /* @__PURE__ */ React.createElement("button", { className: "btn-concours", style: { marginTop: 24, width: "100%" }, onClick: onClose }, T.close))
    );
    if (screen === "already") return modalBox(
      /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 56, marginBottom: 16 } }, "\u{1F4CB}"), /* @__PURE__ */ React.createElement("h3", { style: { marginBottom: 8, fontSize: 20 } }, T.alreadyTitle), /* @__PURE__ */ React.createElement("p", { style: { color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6 } }, T.alreadyDesc), /* @__PURE__ */ React.createElement("button", { className: "btn-concours", style: { marginTop: 24, width: "100%" }, onClick: onClose }, T.close))
    );
    return /* @__PURE__ */ React.createElement("div", { className: "modal-backdrop", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { style: {
      background: "var(--cream-50)",
      borderRadius: 20,
      padding: "36px 32px",
      maxWidth: 500,
      width: "100%",
      position: "relative",
      animation: "slideUp .3s var(--ease-petal)",
      maxHeight: "90vh",
      overflowY: "auto"
    }, onClick: (e) => e.stopPropagation() }, /* @__PURE__ */ React.createElement("button", { className: "modal-close", onClick: onClose }, "\u2715"), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 20 } }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--rose-500)", textTransform: "uppercase" } }, T.conLabel), /* @__PURE__ */ React.createElement("h3", { style: { fontSize: 22, marginTop: 6, marginBottom: 4 } }, T.participateTitle), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--ink-soft)" } }, T.participateDesc)), isAuth ? /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, background: "var(--cream-100)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, border: "1px solid var(--border)" } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: 20 } }, "\u{1F464}"), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 14 } }, user.name), user.phone && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-soft)", fontFamily: "var(--mono)" } }, user.phone))) : /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 } }, /* @__PURE__ */ React.createElement(
      "input",
      {
        placeholder: T.namePlaceholder,
        value: name,
        onChange: (e) => {
          setName(e.target.value);
          setError("");
        },
        style: { padding: "11px 14px", borderRadius: 10, border: "1px solid var(--border)", fontSize: 14, fontFamily: "inherit", outline: "none", background: "var(--cream-50)" }
      }
    ), /* @__PURE__ */ React.createElement(
      "input",
      {
        placeholder: T.phonePlaceholder,
        value: phone,
        onChange: (e) => {
          setPhone(e.target.value);
          setError("");
        },
        type: "tel",
        style: { padding: "11px 14px", borderRadius: 10, border: "1px solid var(--border)", fontSize: 14, fontFamily: "inherit", outline: "none", background: "var(--cream-50)" }
      }
    )), /* @__PURE__ */ React.createElement(
      "div",
      {
        onDrop: handleDrop,
        onDragOver: (e) => e.preventDefault(),
        onClick: () => !preview && fileRef.current.click(),
        style: {
          border: preview ? "2px solid var(--rose-300)" : "2px dashed var(--rose-300)",
          borderRadius: 14,
          minHeight: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: preview ? "default" : "pointer",
          overflow: "hidden",
          background: preview ? "transparent" : "var(--cream-100)",
          position: "relative",
          marginBottom: 16,
          transition: "border-color .2s"
        }
      },
      preview ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("img", { src: preview, alt: "preview", style: { width: "100%", maxHeight: 260, objectFit: "cover", borderRadius: 12, display: "block" } }), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: (e) => {
            e.stopPropagation();
            setPhoto(null);
            setPreview(null);
            fileRef.current.value = "";
          },
          style: { position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,.55)", color: "#fff", border: "none", borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontFamily: "var(--mono)" }
        },
        "\u2715 ",
        T.photoChange
      )) : /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", padding: 32 } }, /* @__PURE__ */ React.createElement("div", { style: { fontSize: 44, marginBottom: 10 } }, "\u{1F4F7}"), /* @__PURE__ */ React.createElement("div", { style: { fontWeight: 600, fontSize: 15, marginBottom: 4 } }, T.photoSelect), /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "var(--ink-soft)", fontFamily: "var(--mono)" } }, T.photoDrop))
    ), /* @__PURE__ */ React.createElement("input", { ref: fileRef, type: "file", accept: "image/jpeg,image/png,image/webp", style: { display: "none" }, onChange: (e) => handleFile(e.target.files[0]) }), error && /* @__PURE__ */ React.createElement("div", { style: { fontSize: 12, color: "#EF4444", marginBottom: 12, fontFamily: "var(--mono)" } }, error), /* @__PURE__ */ React.createElement("button", { className: "btn-concours", onClick: handleSubmit, disabled: submitting, style: { width: "100%" } }, submitting ? T.entering : T.submit), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 11, color: "var(--ink-soft)", marginTop: 12, textAlign: "center", fontFamily: "var(--mono)", lineHeight: 1.6 } }, T.photoTerms)));
  };
  var PhotoVoteCard = ({ entry, voted, voterToken, user, onOpenAuth, onVote, index = 0, hero = false }) => {
    const [votes, setVotes] = useState(entry.votes);
    const [hasVoted, setHasVoted] = useState(voted);
    const [voting, setVoting] = useState(false);
    useEffect(() => {
      if (voted) setHasVoted(true);
    }, [voted]);
    useEffect(() => {
      setVotes(entry.votes);
    }, [entry.votes]);
    const [pop, setPop] = useState(false);
    const [showLoginHint, setLoginHint] = useState(false);
    const cardRef = useRef(null);
    const canvasRef = useRef(null);
    const firstName = (entry.name || "Participante").split(" ")[0];
    const BADGES = [
      { bg: "linear-gradient(135deg,#F59E0B,#B45309)", label: "\u{1F451} #1", glow: "0 0 16px rgba(245,158,11,.6)" },
      { bg: "linear-gradient(135deg,#CBD5E1,#94A3B8)", label: "\u{1F948} #2", glow: "none" },
      { bg: "linear-gradient(135deg,#C97D4B,#92532B)", label: "\u{1F949} #3", glow: "none" }
    ];
    const badge = index < 3 ? BADGES[index] : null;
    const burst = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2;
      const COLORS = ["#EF4444", "#F97316", "#EC4899", "#F43F5E", "#FBBF24", "#fff"];
      const pts = Array.from({ length: 24 }, (_, i) => ({
        angle: i / 24 * Math.PI * 2 + Math.random() * 0.25,
        speed: 2.2 + Math.random() * 3.2,
        r: 3 + Math.random() * 5,
        opacity: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        x: cx,
        y: cy
      }));
      let frame = 0;
      const tick = () => {
        ctx.clearRect(0, 0, W, H);
        pts.forEach((p) => {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          p.speed *= 0.91;
          p.opacity -= 0.032;
          if (p.opacity <= 0) return;
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
        if (++frame < 42) requestAnimationFrame(tick);
        else ctx.clearRect(0, 0, W, H);
      };
      requestAnimationFrame(tick);
    };
    const handleMouseMove = (e) => {
      const el = cardRef.current;
      if (!el) return;
      const { left, top, width, height } = el.getBoundingClientRect();
      const rx = (e.clientY - top - height / 2) / (height / 2) * -10;
      const ry = (e.clientX - left - width / 2) / (width / 2) * 10;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
      el.style.boxShadow = "0 28px 60px rgba(0,0,0,.38)";
    };
    const handleMouseLeave = () => {
      const el = cardRef.current;
      if (!el) return;
      el.style.transform = "";
      el.style.boxShadow = "0 4px 20px rgba(0,0,0,.18)";
    };
    const handleVote = async () => {
      if (hasVoted || voting) return;
      if (!user) {
        setLoginHint(true);
        setTimeout(() => setLoginHint(false), 2800);
        onOpenAuth?.();
        return;
      }
      setVoting(true);
      setPop(true);
      burst();
      setTimeout(() => setPop(false), 650);
      try {
        const res = await window.latinaApi.voteContestEntry(entry.id, voterToken);
        setVotes(res.votes);
        setHasVoted(true);
        onVote?.(entry.id);
      } catch {
      } finally {
        setVoting(false);
      }
    };
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        ref: cardRef,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        className: hero ? "gcard-hero" : "gcard",
        style: {
          position: "relative",
          overflow: "hidden",
          background: "#111",
          boxShadow: "0 4px 20px rgba(0,0,0,.18)",
          transition: "transform .18s ease, box-shadow .18s ease",
          willChange: "transform",
          animation: `cardEntrance .55s ease ${index * 65}ms both`,
          cursor: "pointer"
        }
      },
      /* @__PURE__ */ React.createElement(
        "canvas",
        {
          ref: canvasRef,
          width: 200,
          height: 200,
          style: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            zIndex: 10
          }
        }
      ),
      /* @__PURE__ */ React.createElement(
        "img",
        {
          src: entry.photo_url,
          alt: firstName,
          className: "gcard-img",
          style: {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform .5s ease"
          }
        }
      ),
      /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,.78) 0%, rgba(0,0,0,.22) 42%, transparent 66%)",
        pointerEvents: "none"
      } }),
      badge && /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        top: 11,
        left: 11,
        zIndex: 6,
        background: badge.bg,
        borderRadius: 20,
        padding: hero ? "5px 13px" : "3px 9px",
        fontSize: hero ? 13 : 11,
        fontWeight: 700,
        color: "#fff",
        fontFamily: "var(--mono)",
        letterSpacing: "0.02em",
        boxShadow: badge.glow
      } }, badge.label),
      /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 6,
        padding: hero ? "14px 16px" : "10px 12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      } }, /* @__PURE__ */ React.createElement("span", { style: {
        fontWeight: 700,
        fontSize: hero ? 16 : 13,
        color: "#fff",
        textShadow: "0 1px 6px rgba(0,0,0,.55)",
        letterSpacing: "0.01em",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: "60%"
      } }, firstName), /* @__PURE__ */ React.createElement("div", { style: { position: "relative", flexShrink: 0 } }, showLoginHint && /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        bottom: "calc(100% + 8px)",
        right: 0,
        background: "rgba(0,0,0,.92)",
        color: "#fff",
        borderRadius: 8,
        padding: "5px 11px",
        fontSize: 11,
        whiteSpace: "nowrap",
        fontFamily: "var(--mono)",
        zIndex: 30,
        pointerEvents: "none",
        backdropFilter: "blur(8px)",
        animation: "fadeIn .2s ease"
      } }, "Connectez-vous pour voter", /* @__PURE__ */ React.createElement("div", { style: {
        position: "absolute",
        bottom: -4,
        right: 14,
        width: 8,
        height: 8,
        background: "rgba(0,0,0,.92)",
        transform: "rotate(45deg)"
      } })), /* @__PURE__ */ React.createElement("button", { onClick: handleVote, disabled: hasVoted || voting, style: {
        background: hasVoted ? "linear-gradient(135deg,#EF4444,#F97316)" : "rgba(255,255,255,.18)",
        backdropFilter: "blur(12px)",
        border: hasVoted ? "none" : "1px solid rgba(255,255,255,.38)",
        borderRadius: 24,
        cursor: hasVoted ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: 5,
        color: "#fff",
        transform: pop ? "scale(1.55)" : "scale(1)",
        transition: "transform .32s cubic-bezier(.175,.885,.32,1.575), background .25s",
        padding: hero ? "6px 13px" : "5px 10px",
        boxShadow: hasVoted ? "0 2px 14px rgba(239,68,68,.48)" : "none",
        minWidth: hero ? 60 : 50
      } }, /* @__PURE__ */ React.createElement("span", { style: { fontSize: hero ? 17 : 14, lineHeight: 1 } }, hasVoted ? "\u2764\uFE0F" : "\u{1F90D}"), /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--mono)", fontSize: hero ? 13 : 11, fontWeight: 700 } }, votes))))
    );
  };
  var PhotoGallery = ({ gallery, votedIds, voterToken, user, onOpenAuth, onVote, T }) => {
    if (!gallery || gallery.length === 0) return null;
    return /* @__PURE__ */ React.createElement("div", { style: { marginTop: 80 } }, /* @__PURE__ */ React.createElement("style", null, `
        /* \u2500\u2500 animations \u2500\u2500 */
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(32px) scale(0.93); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes fadeIn    { from { opacity:0; } to { opacity:1; } }
        @keyframes glowPulse {
          0%,100% { opacity:.35; transform:scale(1);    }
          50%      { opacity:.65; transform:scale(1.12); }
        }
        @keyframes pulseGold {
          0%,100% { box-shadow:0 0 24px rgba(245,158,11,.5); }
          50%      { box-shadow:0 0 56px rgba(245,158,11,.9); }
        }

        /* \u2500\u2500 card base \u2500\u2500 */
        .gcard, .gcard-hero { border-radius: 16px; }
        .gcard-hero { border-radius: 20px; }

        /* \u2500\u2500 photo zoom on card hover (CSS-only, no JS state) \u2500\u2500 */
        .gcard:hover .gcard-img,
        .gcard-hero:hover .gcard-img { transform: scale(1.07); }

        /* \u2500\u2500 responsive gallery grid \u2500\u2500 */
        .photo-gallery-grid {
          display: grid;
          gap: 10px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 500px) {
          .photo-gallery-grid { gap: 12px; grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 860px) {
          .photo-gallery-grid { gap: 14px; grid-template-columns: repeat(4, 1fr); }
        }

        /* \u2500\u2500 hero card: spans 2 columns, wider aspect ratio \u2500\u2500 */
        .gcard-hero {
          grid-column: span 2;
          aspect-ratio: 4/3;
        }
        @media (min-width: 500px) {
          .gcard-hero { aspect-ratio: 3/2; }
        }
        @media (min-width: 860px) {
          .gcard-hero { aspect-ratio: 16/9; grid-column: span 2; }
        }

        /* \u2500\u2500 regular card aspect ratio \u2500\u2500 */
        .gcard { aspect-ratio: 3/4; }
      `), /* @__PURE__ */ React.createElement("div", { style: { textAlign: "center", marginBottom: 56, position: "relative" } }, /* @__PURE__ */ React.createElement("div", { "aria-hidden": "true", style: {
      position: "absolute",
      top: -28,
      left: "50%",
      transform: "translateX(-50%)",
      width: 360,
      height: 120,
      borderRadius: "50%",
      background: "radial-gradient(ellipse,rgba(244,63,94,.16) 0%,transparent 70%)",
      pointerEvents: "none",
      animation: "glowPulse 4.5s ease infinite"
    } }), /* @__PURE__ */ React.createElement("span", { style: {
      display: "inline-block",
      fontFamily: "var(--mono)",
      fontSize: 11,
      letterSpacing: "0.17em",
      textTransform: "uppercase",
      background: "linear-gradient(90deg,#F43F5E,#FB923C)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    } }, T.galleryLabel), /* @__PURE__ */ React.createElement("h3", { style: {
      fontSize: "clamp(22px,3.8vw,42px)",
      marginTop: 12,
      marginBottom: 10,
      lineHeight: 1.1,
      letterSpacing: "-0.03em"
    } }, T.galleryTitle), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--ink-soft)", fontFamily: "var(--mono)", marginBottom: user ? 0 : 14 } }, !user ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", { style: { color: "#EF4444" } }, "\u{1F512}"), " Connectez-vous pour voter \xB7 ", T.galleryHint) : /* @__PURE__ */ React.createElement(React.Fragment, null, "\u2764\uFE0F ", T.galleryHint)), !user && /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onOpenAuth,
        style: {
          marginTop: 14,
          background: "linear-gradient(135deg,#F43F5E 0%,#FB923C 100%)",
          border: "none",
          borderRadius: 28,
          color: "#fff",
          padding: "10px 24px",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          letterSpacing: "0.02em",
          boxShadow: "0 6px 22px rgba(244,63,94,.34)",
          transition: "transform .15s ease, box-shadow .15s ease"
        },
        onMouseEnter: (e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(244,63,94,.44)";
        },
        onMouseLeave: (e) => {
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 6px 22px rgba(244,63,94,.34)";
        }
      },
      "Se connecter pour voter \u2192"
    )), /* @__PURE__ */ React.createElement("div", { className: "photo-gallery-grid" }, gallery.map((entry, i) => /* @__PURE__ */ React.createElement(
      PhotoVoteCard,
      {
        key: entry.id,
        entry,
        voted: votedIds.includes(entry.id),
        voterToken,
        user,
        onOpenAuth,
        onVote,
        index: i,
        hero: i === 0 && gallery.length > 1
      }
    ))));
  };
  var ContestCard = ({ contest, entryCount, entered, user, onOpenAuth, T }) => {
    const [entering, setEntering] = useState(false);
    const [currentEntered, setCurrentEntered] = useState(entered);
    const [currentCount, setCurrentCount] = useState(entryCount);
    const [entryError, setEntryError] = useState("");
    const time = useCountdown(contest?.ends_at);
    const handleEnter = async () => {
      if (!user) {
        onOpenAuth?.();
        return;
      }
      setEntering(true);
      setEntryError("");
      try {
        const res = await window.latinaApi.enterContest();
        setCurrentEntered(true);
        if (res.entries != null) setCurrentCount(res.entries);
        else setCurrentCount((c) => c + 1);
      } catch (e) {
        if (e.status === 401) {
          onOpenAuth?.();
          return;
        }
        if (e.data?.already_entered) {
          setCurrentEntered(true);
          return;
        }
        if (e.data?.not_eligible) {
          setEntryError(e.data.message || T.notEligible);
          return;
        }
        setEntryError(e.message || T.entryErr);
      } finally {
        setEntering(false);
      }
    };
    return /* @__PURE__ */ React.createElement(React.Fragment, null, contest.description && /* @__PURE__ */ React.createElement("p", null, contest.description), contest.title && /* @__PURE__ */ React.createElement("div", { className: "contest-prize" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--rose-500)", textTransform: "uppercase" } }, T.prizeLabel), /* @__PURE__ */ React.createElement("div", { className: "contest-prize-name" }, contest.title)), contest.type === "purchase" && /* @__PURE__ */ React.createElement("div", { className: "contest-purchase-hint" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: "var(--rose-500)" } }, T.purchaseHint(contest.min_orders || 2))), /* @__PURE__ */ React.createElement("div", { className: "countdown-grid" }, [{ v: time.d, l: T.days }, { v: time.h, l: T.hrs }, { v: time.m, l: T.min }, { v: time.s, l: T.sec }].map(({ v, l }) => /* @__PURE__ */ React.createElement("div", { className: "countdown-cell", key: l }, /* @__PURE__ */ React.createElement("div", { className: "num" }, v), /* @__PURE__ */ React.createElement("div", { className: "lbl" }, l)))), currentCount > 0 && /* @__PURE__ */ React.createElement("div", { className: "contest-entries t-mono" }, T.entryCount(currentCount)), !currentEntered ? /* @__PURE__ */ React.createElement("button", { className: "btn-concours", onClick: handleEnter, disabled: entering }, entering ? T.entering : user ? T.enter : T.needAuth) : /* @__PURE__ */ React.createElement("div", { className: "btn-entered" }, T.entered), entryError && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontFamily: "var(--mono)", fontSize: 11, color: "#EF4444" } }, entryError));
  };
  var PhotoContestCard = ({ contest, entryCount, localEntry, onParticipate, T }) => {
    const time = useCountdown(contest?.ends_at);
    const [count, setCount] = useState(entryCount);
    useEffect(() => setCount(entryCount), [entryCount]);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, contest.description && /* @__PURE__ */ React.createElement("p", { style: { fontSize: 14, color: "var(--ink-soft)", marginBottom: 16 } }, contest.description), contest.title && /* @__PURE__ */ React.createElement("div", { className: "contest-prize" }, /* @__PURE__ */ React.createElement("span", { style: { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--rose-500)", textTransform: "uppercase" } }, T.prizeLabel), /* @__PURE__ */ React.createElement("div", { className: "contest-prize-name" }, contest.title)), /* @__PURE__ */ React.createElement("div", { className: "countdown-grid" }, [{ v: time.d, l: T.days }, { v: time.h, l: T.hrs }, { v: time.m, l: T.min }, { v: time.s, l: T.sec }].map(({ v, l }) => /* @__PURE__ */ React.createElement("div", { className: "countdown-cell", key: l }, /* @__PURE__ */ React.createElement("div", { className: "num" }, v), /* @__PURE__ */ React.createElement("div", { className: "lbl" }, l)))), count > 0 && /* @__PURE__ */ React.createElement("div", { className: "contest-entries t-mono" }, T.entryCount(count)), localEntry?.status === "pending" && /* @__PURE__ */ React.createElement("div", { className: "contest-entry-status status-pending" }, /* @__PURE__ */ React.createElement("span", null, "\u23F3"), " ", T.photoPending), localEntry?.status === "approved" && /* @__PURE__ */ React.createElement("div", { className: "contest-entry-status status-approved" }, /* @__PURE__ */ React.createElement("span", null, "\u2713"), " ", T.photoApproved), localEntry?.status === "rejected" && /* @__PURE__ */ React.createElement("div", { className: "contest-entry-status status-rejected" }, /* @__PURE__ */ React.createElement("span", null, "\u2715"), " ", T.photoRejected, /* @__PURE__ */ React.createElement("button", { className: "btn-outline-sm", style: { marginTop: 10, display: "block" }, onClick: onParticipate }, T.photoRetry)), !localEntry && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--ink-soft)", marginBottom: 14, lineHeight: 1.6 } }, T.photoInstruction), /* @__PURE__ */ React.createElement("button", { className: "btn-concours", onClick: onParticipate }, "\u{1F4F7} ", T.participate)));
  };
  var RewardsScene = ({ lang, user, onOpenAuth }) => {
    const sceneRef = useRef(null);
    useSceneProgress(sceneRef);
    const T = {
      fr: {
        fidLabel: "La Fid\xE9lit\xE9",
        fidTitle1: "Plus vous portez",
        fidTitle2: "Latina",
        fidTitle3: ", plus elle vous remercie.",
        fidText: "Chaque commande compte. Chaque paire vous rapproche d'une r\xE9duction, d'un cadeau, d'un avantage exclusif.",
        fidTeaser: "Vos points vous attendent.",
        fidTeaserSub: "Cr\xE9ez votre compte gratuit et commencez \xE0 cumuler d\xE8s votre premi\xE8re commande.",
        fidCta: "Cr\xE9er mon compte",
        points: "pts",
        balance: "Solde fid\xE9lit\xE9",
        nextTier: "pts pour atteindre",
        tiers: { petal: "\u{1F338} P\xE9tale", lotus: "\u{1FAB7} Lotus", amber: "\u{1F31F} Ambre" },
        loyaltyInfo: "1 pt par 100 DA \xB7 10 pts = 1 DA de r\xE9duction",
        conLabel: "Le Concours",
        conTitle1: "Partagez votre style.",
        conTitle2: "La meilleure photo gagne.",
        days: "Jours",
        hrs: "Heures",
        min: "Min",
        sec: "Sec",
        enter: "Participer maintenant \u2192",
        entering: "Participation\u2026",
        entered: "Vous participez \u2713",
        needAuth: "Se connecter pour participer \u2192",
        entryCount: (n) => `${n} participante${n > 1 ? "s" : ""} ce mois-ci`,
        noContest: "Prochain concours bient\xF4t",
        noContestSub: "Inscrivez-vous \xE0 la newsletter pour \xEAtre notifi\xE9e en avant-premi\xE8re.",
        prizeLabel: "Le lot du mois",
        entryErr: "Erreur lors de la participation.",
        notEligible: "Vous ne r\xE9pondez pas aux crit\xE8res pour participer.",
        purchaseHint: (n) => `Requiert ${n} commande${n > 1 ? "s" : ""} livr\xE9e${n > 1 ? "s" : ""}. Plus vous avez de commandes, plus vous avez de chances.`,
        photoInstruction: "Partagez une photo de votre produit Latina et r\xE9coltez le plus de votes \u2014 la participante avec le plus de c\u0153urs remporte le lot !",
        participate: "Participer avec ma photo \u2192",
        photoSelect: "Choisir une photo",
        photoDrop: "ou glissez-d\xE9posez ici \xB7 JPG, PNG, WEBP \xB7 max 5 Mo",
        photoChange: "Changer",
        photoPending: "Photo en cours de v\xE9rification \u23F3",
        photoApproved: "Participation valid\xE9e \u2014 r\xE9coltez des votes ! \u2713",
        photoRejected: "Photo non accept\xE9e.",
        photoRetry: "Renvoyer une photo",
        photoRequired: "Veuillez s\xE9lectionner une photo.",
        nameRequired: "Veuillez saisir votre pr\xE9nom.",
        phoneRequired: "Veuillez saisir votre num\xE9ro de t\xE9l\xE9phone.",
        participateTitle: "Participez au concours photo",
        participateDesc: "Partagez votre style Latina et laissez la communaut\xE9 voter pour vous \u{1F338}",
        namePlaceholder: "Votre pr\xE9nom",
        phonePlaceholder: "T\xE9l\xE9phone (ex: 0550 123 456)",
        submit: "Envoyer ma participation \u2192",
        successTitle: "Participation envoy\xE9e !",
        successDesc: "Notre \xE9quipe va valider votre photo sous peu. Une fois approuv\xE9e, elle appara\xEEtra dans la galerie pour recevoir des votes.",
        close: "Fermer",
        photoTerms: "Une seule participation par personne \xB7 Photo avec le produit Latina visible",
        galleryLabel: "La galerie du concours",
        galleryTitle: "Votez pour votre pr\xE9f\xE9r\xE9e",
        galleryHint: "Un vote par photo \xB7 Cliquez sur le c\u0153ur \u2764\uFE0F",
        alreadyTitle: "Participation d\xE9j\xE0 enregistr\xE9e",
        alreadyDesc: "Votre num\xE9ro de t\xE9l\xE9phone est d\xE9j\xE0 associ\xE9 \xE0 une participation en cours ou valid\xE9e pour ce concours.",
        tirageRunning: "\u2696\uFE0F Tirage au sort en cours\u2026",
        tirageDesc: "Plusieurs participantes ont le m\xEAme nombre de votes. Un tirage au sort est effectu\xE9 pour d\xE9signer la gagnante.",
        tirageWinner: "Gagnante du tirage",
        tirageSkip: "Passer l'animation"
      },
      ar: {
        fidLabel: "\u0627\u0644\u0648\u0644\u0627\u0621",
        fidTitle1: "\u0643\u0644\u0645\u0627 \u0627\u0631\u062A\u062F\u064A\u062A\u0650",
        fidTitle2: "Latina",
        fidTitle3: "\u060C \u0643\u0627\u0641\u0623\u062A\u0643\u0650 \u0623\u0643\u062B\u0631.",
        fidText: "\u0643\u0644 \u0637\u0644\u0628 \u064A\u064F\u062D\u062A\u0633\u0628. \u0643\u0644 \u062D\u0630\u0627\u0621 \u064A\u0642\u0631\u0651\u0628\u0643 \u0645\u0646 \u062A\u062E\u0641\u064A\u0636\u060C \u0647\u062F\u064A\u0629\u060C \u0623\u0648 \u0645\u064A\u0632\u0629 \u062D\u0635\u0631\u064A\u0629.",
        fidTeaser: "\u0646\u0642\u0627\u0637\u0643\u0650 \u0641\u064A \u0627\u0646\u062A\u0638\u0627\u0631\u0643\u0650.",
        fidTeaserSub: "\u0623\u0646\u0634\u0626\u064A \u062D\u0633\u0627\u0628\u064B\u0627 \u0645\u062C\u0627\u0646\u064A\u064B\u0627 \u0648\u0627\u0628\u062F\u0623\u064A \u0627\u0644\u062A\u0631\u0627\u0643\u0645 \u0645\u0646 \u0623\u0648\u0644 \u0637\u0644\u0628.",
        fidCta: "\u0625\u0646\u0634\u0627\u0621 \u062D\u0633\u0627\u0628\u064A",
        points: "\u0646\u0642\u0637\u0629",
        balance: "\u0631\u0635\u064A\u062F \u0627\u0644\u0648\u0644\u0627\u0621",
        nextTier: "\u0646\u0642\u0637\u0629 \u0644\u0644\u0648\u0635\u0648\u0644 \u0625\u0644\u0649",
        tiers: { petal: "\u{1F338} \u0628\u062A\u0644\u0629", lotus: "\u{1FAB7} \u0644\u0648\u062A\u0633", amber: "\u{1F31F} \u0639\u0646\u0628\u0631" },
        loyaltyInfo: "1 \u0646\u0642\u0637\u0629 / 100 \u062F\u062C \xB7 10 \u0646\u0642\u0627\u0637 = \u062E\u0635\u0645 1 \u062F\u062C",
        conLabel: "\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629",
        conTitle1: "\u0634\u0627\u0631\u0643\u064A \u0628\u0635\u0648\u0631\u062A\u0643.",
        conTitle2: "\u0623\u0641\u0636\u0644 \u0635\u0648\u0631\u0629 \u062A\u0641\u0648\u0632.",
        days: "\u0623\u064A\u0627\u0645",
        hrs: "\u0633\u0627\u0639\u0627\u062A",
        min: "\u062F\u0642\u0627\u0626\u0642",
        sec: "\u062B\u0648\u0627\u0646\u064D",
        enter: "\u0634\u0627\u0631\u0643\u064A \u0627\u0644\u0622\u0646 \u2192",
        entering: "\u062C\u0627\u0631\u064D \u0627\u0644\u062A\u0633\u062C\u064A\u0644\u2026",
        entered: "\u0623\u0646\u062A\u0650 \u0645\u0634\u0627\u0631\u0643\u0629 \u2713",
        needAuth: "\u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644 \u0644\u0644\u0645\u0634\u0627\u0631\u0643\u0629 \u2192",
        entryCount: (n) => `${n} \u0645\u0634\u0627\u0631\u0643\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u0647\u0631`,
        noContest: "\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629 \u0642\u0631\u064A\u0628\u064B\u0627",
        noContestSub: "\u0627\u0634\u062A\u0631\u0643\u064A \u0641\u064A \u0627\u0644\u0646\u0634\u0631\u0629 \u0644\u062A\u0635\u0644\u0643\u0650 \u0623\u0648\u0644 \u0625\u0634\u0639\u0627\u0631.",
        prizeLabel: "\u062C\u0627\u0626\u0632\u0629 \u0627\u0644\u0634\u0647\u0631",
        entryErr: "\u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u0633\u062C\u064A\u0644.",
        notEligible: "\u0644\u0627 \u062A\u0633\u062A\u0648\u0641\u064A\u0646 \u0634\u0631\u0648\u0637 \u0627\u0644\u0645\u0634\u0627\u0631\u0643\u0629.",
        purchaseHint: (n) => `\u062A\u062A\u0637\u0644\u0628 ${n} \u0637\u0644\u0628${n > 1 ? "\u0627\u062A" : ""} \u0645\u064F\u0633\u0644\u064E\u0651\u0645${n > 1 ? "\u0629" : ""}. \u0643\u0644\u0645\u0627 \u0632\u0627\u062F\u062A \u0637\u0644\u0628\u0627\u062A\u0643\u060C \u0632\u0627\u062F\u062A \u0641\u0631\u0635\u0643.`,
        photoInstruction: "\u0634\u0627\u0631\u0643\u064A \u0628\u0635\u0648\u0631\u0629 \u0645\u0646\u062A\u062C\u0643 \u0645\u0646 Latina \u0648\u0627\u062D\u0635\u0644\u064A \u0639\u0644\u0649 \u0623\u0643\u0628\u0631 \u0639\u062F\u062F \u0645\u0646 \u0627\u0644\u0623\u0635\u0648\u0627\u062A \u2014 \u0627\u0644\u0641\u0627\u0626\u0632\u0629 \u0647\u064A \u0645\u0646 \u062A\u062D\u0635\u0644 \u0639\u0644\u0649 \u0623\u0643\u062B\u0631 \u0642\u0644\u0648\u0628!",
        participate: "\u0634\u0627\u0631\u0643\u064A \u0628\u0635\u0648\u0631\u062A\u064A \u2192",
        photoSelect: "\u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629",
        photoDrop: "\u0623\u0648 \u0627\u0633\u062D\u0628\u064A \u0648\u0623\u0641\u0644\u062A\u064A \u0647\u0646\u0627",
        photoChange: "\u062A\u063A\u064A\u064A\u0631",
        photoPending: "\u0635\u0648\u0631\u062A\u0643 \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u23F3",
        photoApproved: "\u062A\u0645\u062A \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629 \u0639\u0644\u0649 \u0645\u0634\u0627\u0631\u0643\u062A\u0643 \u2014 \u0627\u062D\u0635\u0644\u064A \u0639\u0644\u0649 \u0623\u0635\u0648\u0627\u062A! \u2713",
        photoRejected: "\u0644\u0645 \u062A\u064F\u0642\u0628\u0644 \u0635\u0648\u0631\u062A\u0643.",
        photoRetry: "\u0625\u0639\u0627\u062F\u0629 \u0627\u0644\u0625\u0631\u0633\u0627\u0644",
        photoRequired: "\u064A\u0631\u062C\u0649 \u0627\u062E\u062A\u064A\u0627\u0631 \u0635\u0648\u0631\u0629.",
        nameRequired: "\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0627\u0633\u0645\u0643.",
        phoneRequired: "\u064A\u0631\u062C\u0649 \u0625\u062F\u062E\u0627\u0644 \u0631\u0642\u0645 \u0647\u0627\u062A\u0641\u0643.",
        participateTitle: "\u0634\u0627\u0631\u0643\u064A \u0641\u064A \u0645\u0633\u0627\u0628\u0642\u0629 \u0627\u0644\u0635\u0648\u0631",
        participateDesc: "\u0634\u0627\u0631\u0643\u064A \u0623\u0633\u0644\u0648\u0628\u0643 \u0645\u0639 Latina \u0648\u062F\u0639\u064A \u0627\u0644\u0645\u062C\u062A\u0645\u0639 \u064A\u0635\u0648\u062A \u0644\u0643\u0650 \u{1F338}",
        namePlaceholder: "\u0627\u0633\u0645\u0643",
        phonePlaceholder: "\u0631\u0642\u0645 \u0627\u0644\u0647\u0627\u062A\u0641",
        submit: "\u0623\u0631\u0633\u0644\u064A \u0645\u0634\u0627\u0631\u0643\u062A\u064A \u2192",
        successTitle: "\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0645\u0634\u0627\u0631\u0643\u062A\u0643!",
        successDesc: "\u0633\u064A\u0631\u0627\u062C\u0639 \u0641\u0631\u064A\u0642\u0646\u0627 \u0635\u0648\u0631\u062A\u0643 \u0642\u0631\u064A\u0628\u064B\u0627. \u0628\u0639\u062F \u0627\u0644\u0645\u0648\u0627\u0641\u0642\u0629\u060C \u0633\u062A\u0638\u0647\u0631 \u0641\u064A \u0627\u0644\u0645\u0639\u0631\u0636 \u0644\u062A\u0644\u0642\u064A \u0627\u0644\u0623\u0635\u0648\u0627\u062A.",
        close: "\u0625\u063A\u0644\u0627\u0642",
        photoTerms: "\u0645\u0634\u0627\u0631\u0643\u0629 \u0648\u0627\u062D\u062F\u0629 \u0641\u0642\u0637 \u0644\u0643\u0644 \u0634\u062E\u0635 \xB7 \u064A\u062C\u0628 \u0623\u0646 \u064A\u0638\u0647\u0631 \u0627\u0644\u0645\u0646\u062A\u062C \u0645\u0646 Latina",
        galleryLabel: "\u0645\u0639\u0631\u0636 \u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629",
        galleryTitle: "\u0635\u0648\u062A\u064A \u0644\u0645\u0641\u0636\u0644\u062A\u0643",
        galleryHint: "\u0635\u0648\u062A \u0648\u0627\u062D\u062F \u0644\u0643\u0644 \u0635\u0648\u0631\u0629 \xB7 \u0627\u0646\u0642\u0631\u064A \u0639\u0644\u0649 \u0627\u0644\u0642\u0644\u0628 \u2764\uFE0F",
        alreadyTitle: "\u0645\u0634\u0627\u0631\u0643\u062A\u0643 \u0645\u0633\u062C\u0644\u0629 \u0645\u0633\u0628\u0642\u0627\u064B",
        alreadyDesc: "\u0631\u0642\u0645 \u0647\u0627\u062A\u0641\u0643 \u0645\u0631\u062A\u0628\u0637 \u0628\u0645\u0634\u0627\u0631\u0643\u0629 \u0642\u064A\u062F \u0627\u0644\u0645\u0631\u0627\u062C\u0639\u0629 \u0623\u0648 \u0645\u0648\u0627\u0641\u0642 \u0639\u0644\u064A\u0647\u0627.",
        tirageRunning: "\u2696\uFE0F \u0627\u0644\u0633\u062D\u0628 \u062C\u0627\u0631\u064D\u2026",
        tirageDesc: "\u0639\u062F\u0629 \u0645\u0634\u0627\u0631\u0643\u0627\u062A \u062D\u0635\u0644\u062A \u0639\u0644\u0649 \u0646\u0641\u0633 \u0639\u062F\u062F \u0627\u0644\u0623\u0635\u0648\u0627\u062A. \u064A\u062A\u0645 \u0625\u062C\u0631\u0627\u0621 \u0633\u062D\u0628 \u0639\u0634\u0648\u0627\u0626\u064A \u0644\u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0641\u0627\u0626\u0632\u0629.",
        tirageWinner: "\u0627\u0644\u0641\u0627\u0626\u0632\u0629 \u0628\u0627\u0644\u0633\u062D\u0628",
        tirageSkip: "\u062A\u062E\u0637\u064A \u0627\u0644\u0631\u0633\u0648\u0645 \u0627\u0644\u0645\u062A\u062D\u0631\u0643\u0629"
      },
      en: {
        fidLabel: "Loyalty",
        fidTitle1: "The more you wear",
        fidTitle2: "Latina",
        fidTitle3: ", the more she thanks you.",
        fidText: "Every order counts. Every pair brings you closer to a discount, a gift, an exclusive perk.",
        fidTeaser: "Your points are waiting.",
        fidTeaserSub: "Create your free account and start earning from your very first order.",
        fidCta: "Create my account",
        points: "pts",
        balance: "Loyalty balance",
        nextTier: "pts to reach",
        tiers: { petal: "\u{1F338} Petal", lotus: "\u{1FAB7} Lotus", amber: "\u{1F31F} Amber" },
        loyaltyInfo: "1 pt per 100 DA \xB7 10 pts = 1 DA off",
        conLabel: "The Contest",
        conTitle1: "Share your style.",
        conTitle2: "The best photo wins.",
        days: "Days",
        hrs: "Hours",
        min: "Min",
        sec: "Sec",
        enter: "Enter now \u2192",
        entering: "Entering\u2026",
        entered: "You're in \u2713",
        needAuth: "Sign in to enter \u2192",
        entryCount: (n) => `${n} entr${n === 1 ? "y" : "ies"} this month`,
        noContest: "Next contest coming soon",
        noContestSub: "Subscribe to our newsletter to be the first to know.",
        prizeLabel: "This month's prize",
        entryErr: "Error, please try again.",
        notEligible: "You don't meet the eligibility criteria.",
        purchaseHint: (n) => `Requires ${n} delivered order${n > 1 ? "s" : ""}. More orders = more chances.`,
        photoInstruction: "Share a photo of your Latina product and collect the most votes \u2014 the entry with the most hearts wins!",
        participate: "Enter with my photo \u2192",
        photoSelect: "Choose a photo",
        photoDrop: "or drag & drop here \xB7 JPG, PNG, WEBP \xB7 max 5 MB",
        photoChange: "Change",
        photoPending: "Photo under review \u23F3",
        photoApproved: "Entry approved \u2014 collect votes! \u2713",
        photoRejected: "Photo not accepted.",
        photoRetry: "Resubmit a photo",
        photoRequired: "Please select a photo.",
        nameRequired: "Please enter your first name.",
        phoneRequired: "Please enter your phone number.",
        participateTitle: "Enter the photo contest",
        participateDesc: "Share your Latina style and let the community vote for you \u{1F338}",
        namePlaceholder: "Your first name",
        phonePlaceholder: "Phone (e.g. 0550 123 456)",
        submit: "Submit my entry \u2192",
        successTitle: "Entry submitted!",
        successDesc: "Our team will review your photo shortly. Once approved, it'll appear in the gallery to receive votes.",
        close: "Close",
        photoTerms: "One entry per person \xB7 Latina product must be visible in the photo",
        galleryLabel: "Contest gallery",
        galleryTitle: "Vote for your favourite",
        galleryHint: "One vote per photo \xB7 Click the heart \u2764\uFE0F",
        alreadyTitle: "Already entered",
        alreadyDesc: "Your phone number is already linked to a pending or approved entry for this contest.",
        tirageRunning: "\u2696\uFE0F Drawing in progress\u2026",
        tirageDesc: "Several entries share the top vote count. A random draw is being made to select the winner.",
        tirageWinner: "Draw winner",
        tirageSkip: "Skip animation"
      }
    }[lang] || {};
    const TIER_COLORS = { petal: "#C68B6F", lotus: "#9B59B6", amber: "#F59E0B" };
    const voterToken = useRef(_getOrCreate("latina_voter_token")).current;
    const [contests, setContests] = useState([]);
    const [announcement, setAnnouncement] = useState(null);
    const [showAnnounce, setShowAnnounce] = useState(false);
    const [contestLoading, setContestLoading] = useState(true);
    const [localEntries, setLocalEntries] = useState({});
    const [photoModal, setPhotoModal] = useState(null);
    const [showTirage, setShowTirage] = useState(false);
    const [loyalty, setLoyalty] = useState(null);
    const [loyaltyLoading, setLoyaltyLoading] = useState(false);
    const [refreshTick, setRefreshTick] = useState(0);
    const handleContestData = (res) => {
      setContests(res.contests || []);
      if (res.announcement) {
        setAnnouncement(res.announcement);
        const seenKey = `winner_seen_${res.announcement.contest_id}_${res.announcement.winner_announced_at}`;
        const tirageKey = `tirage_done_${res.announcement.contest_id}`;
        if (!localStorage.getItem(seenKey)) {
          if (res.announcement.was_tie && !localStorage.getItem(tirageKey)) {
            setShowTirage(true);
          } else {
            setShowAnnounce(true);
          }
        }
      }
    };
    useEffect(() => {
      const h = () => setRefreshTick((t) => t + 1);
      window.addEventListener("latina:refresh", h);
      return () => window.removeEventListener("latina:refresh", h);
    }, []);
    const hasPhotoContest = contests.some((c) => c.type === "photo");
    useEffect(() => {
      if (!hasPhotoContest) return;
      const id = setInterval(() => {
        window.latinaApi.invalidateCache("contest:");
        setRefreshTick((t) => t + 1);
      }, 2e4);
      return () => clearInterval(id);
    }, [hasPhotoContest]);
    useEffect(() => {
      let alive = true;
      if (!user) setLocalEntries({});
      window.latinaApi.getContest(voterToken).then((res) => {
        if (alive) handleContestData(res);
      }).catch(() => {
      }).finally(() => {
        if (alive) setContestLoading(false);
      });
      return () => {
        alive = false;
      };
    }, [user?.id ?? null, refreshTick]);
    useEffect(() => {
      if (!user) {
        setLoyalty(null);
        return;
      }
      setLoyaltyLoading(true);
      window.latinaApi.getLoyalty().then((r) => setLoyalty(r.data || r)).catch(() => {
      }).finally(() => setLoyaltyLoading(false));
    }, [user]);
    const tierPct = loyalty ? Math.min(100, loyalty.tier_progress?.pct || 0) : 0;
    const handleDismissAnnounce = () => {
      setShowAnnounce(false);
      if (announcement) {
        const key = `winner_seen_${announcement.contest_id}_${announcement.winner_announced_at}`;
        localStorage.setItem(key, "1");
      }
    };
    const handleTirageComplete = () => {
      if (announcement) localStorage.setItem(`tirage_done_${announcement.contest_id}`, "1");
      setShowTirage(false);
      setShowAnnounce(true);
    };
    const handleParticipateSuccess = (entry, contestId) => {
      setLocalEntries((prev) => ({ ...prev, [contestId]: entry }));
      setPhotoModal(null);
    };
    const handleVote = useCallback((entryId, contestId) => {
      setContests((prev) => prev.map(
        (c) => c.id === contestId ? { ...c, voted_ids: [...c.voted_ids || [], entryId] } : c
      ));
    }, []);
    return /* @__PURE__ */ React.createElement("section", { ref: sceneRef, className: "scene scene-rewards", id: "fidelite", "data-screen-label": "05 Rewards" }, showTirage && announcement?.was_tie && /* @__PURE__ */ React.createElement(TirageAnimation, { announcement, onComplete: handleTirageComplete, T }), showAnnounce && announcement && /* @__PURE__ */ React.createElement(WinnerAnnouncement, { announcement, lang, onClose: handleDismissAnnounce }), photoModal && /* @__PURE__ */ React.createElement(
      PhotoParticipateModal,
      {
        contest: photoModal,
        participationToken: _getOrCreate(`latina_part_${photoModal.id}`),
        user,
        onClose: () => setPhotoModal(null),
        onSuccess: (entry) => handleParticipateSuccess(entry, photoModal.id),
        T
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(SceneMarker, { num: "05", label: "Rewards", meta: "FID\xC9LIT\xC9 \xB7 CONCOURS" }), /* @__PURE__ */ React.createElement("div", { className: "rewards-grid" }, /* @__PURE__ */ React.createElement("div", { className: "rewards-card reveal" }, /* @__PURE__ */ React.createElement("span", { className: "label" }, T.fidLabel), /* @__PURE__ */ React.createElement("h3", null, T.fidTitle1, " ", /* @__PURE__ */ React.createElement("em", null, T.fidTitle2), T.fidTitle3), /* @__PURE__ */ React.createElement("p", null, T.fidText), user && loyaltyLoading ? /* @__PURE__ */ React.createElement("div", { className: "loyalty-widget" }, /* @__PURE__ */ React.createElement("div", { className: "loyalty-skeleton" }), /* @__PURE__ */ React.createElement("div", { className: "loyalty-skeleton", style: { width: "60%", marginTop: 8 } }), /* @__PURE__ */ React.createElement("div", { className: "loyalty-bar" }, /* @__PURE__ */ React.createElement("div", { className: "fill", style: { width: "0%", background: "var(--petal-200)" } }))) : user && loyalty ? /* @__PURE__ */ React.createElement("div", { className: "loyalty-widget" }, /* @__PURE__ */ React.createElement("div", { className: "loyalty-tier-badge", style: { background: (TIER_COLORS[loyalty.tier] || "#C68B6F") + "22", color: TIER_COLORS[loyalty.tier] || "#C68B6F", border: `1px solid ${TIER_COLORS[loyalty.tier] || "#C68B6F"}44` } }, T.tiers[loyalty.tier] || loyalty.tier), /* @__PURE__ */ React.createElement("div", { className: "loyalty-row", style: { marginTop: 12 } }, /* @__PURE__ */ React.createElement("span", null, T.balance), /* @__PURE__ */ React.createElement("span", { className: "points t-num" }, (loyalty.points || 0).toLocaleString(), " ", T.points)), /* @__PURE__ */ React.createElement("div", { className: "loyalty-bar" }, /* @__PURE__ */ React.createElement("div", { className: "fill", style: { width: `${tierPct}%`, background: TIER_COLORS[loyalty.tier] || "var(--rose-500)", transition: "width 1s ease" } })), /* @__PURE__ */ React.createElement("div", { className: "loyalty-tiers" }, Object.entries(T.tiers).map(([k, label]) => /* @__PURE__ */ React.createElement("span", { key: k, style: { fontWeight: loyalty.tier === k ? 700 : 400, color: loyalty.tier === k ? TIER_COLORS[k] : void 0 } }, label))), loyalty.next_tier && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 10, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--rose-500)", textTransform: "uppercase" } }, loyalty.tier_progress?.needed || "\u2014", " ", T.points, " ", T.nextTier, " ", T.tiers[loyalty.next_tier] || loyalty.next_tier), /* @__PURE__ */ React.createElement("div", { style: { marginTop: 6, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--ink-soft)", textTransform: "uppercase" } }, T.loyaltyInfo)) : /* @__PURE__ */ React.createElement("div", { className: "loyalty-widget loyalty-teaser" }, /* @__PURE__ */ React.createElement("div", { className: "loyalty-teaser-inner" }, /* @__PURE__ */ React.createElement("div", { className: "loyalty-teaser-orbs" }, ["\u{1F338} P\xE9tale", "\u{1FAB7} Lotus", "\u{1F31F} Ambre"].map((tier, i) => /* @__PURE__ */ React.createElement("div", { key: tier, className: "lto-chip", style: { opacity: 0.3 + i * 0.25, filter: `blur(${(2 - i) * 0.5}px)` } }, tier))), /* @__PURE__ */ React.createElement("div", { className: "loyalty-teaser-lock" }, "\u{1F512}"), /* @__PURE__ */ React.createElement("p", { className: "loyalty-teaser-title" }, T.fidTeaser), /* @__PURE__ */ React.createElement("p", { className: "loyalty-teaser-sub" }, T.fidTeaserSub), /* @__PURE__ */ React.createElement("button", { className: "btn-outline-sm", style: { marginTop: 16, width: "100%" }, onClick: onOpenAuth }, T.fidCta)))), /* @__PURE__ */ React.createElement("div", { className: "concours-column", id: "concours" }, contestLoading ? /* @__PURE__ */ React.createElement("div", { className: "concours-card reveal" }, /* @__PURE__ */ React.createElement("span", { className: "label" }, T.conLabel), /* @__PURE__ */ React.createElement("h3", null, T.conTitle1, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, T.conTitle2)), /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 24 } }, /* @__PURE__ */ React.createElement("div", { className: "loyalty-skeleton" }), /* @__PURE__ */ React.createElement("div", { className: "loyalty-skeleton", style: { width: "70%", marginTop: 8 } }), /* @__PURE__ */ React.createElement("div", { className: "loyalty-skeleton", style: { width: "45%", marginTop: 8 } }))) : contests.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "concours-card reveal" }, /* @__PURE__ */ React.createElement("span", { className: "label" }, T.conLabel), /* @__PURE__ */ React.createElement("h3", null, T.conTitle1, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, T.conTitle2)), /* @__PURE__ */ React.createElement("div", { className: "no-contest" }, /* @__PURE__ */ React.createElement("div", { className: "no-contest-icon" }, "\u{1F381}"), /* @__PURE__ */ React.createElement("p", { className: "no-contest-title" }, T.noContest), /* @__PURE__ */ React.createElement("p", { style: { fontSize: 13, color: "var(--ink-soft)", marginTop: 6 } }, T.noContestSub))) : contests.map((contest, idx) => {
      const localEntry = localEntries[contest.id] || contest.user_entry;
      return /* @__PURE__ */ React.createElement("div", { key: contest.id, className: "concours-card reveal" }, idx === 0 && /* @__PURE__ */ React.createElement("span", { className: "label" }, T.conLabel), idx === 0 && /* @__PURE__ */ React.createElement("h3", null, T.conTitle1, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("em", null, T.conTitle2)), contest.type === "photo" ? /* @__PURE__ */ React.createElement(
        PhotoContestCard,
        {
          contest,
          entryCount: contest.entries_count,
          localEntry,
          onParticipate: () => setPhotoModal(contest),
          T
        }
      ) : /* @__PURE__ */ React.createElement(
        ContestCard,
        {
          contest,
          entryCount: contest.entries_count,
          entered: false,
          user,
          onOpenAuth,
          T
        }
      ));
    }))), contests.filter((c) => c.type === "photo").map((contest) => /* @__PURE__ */ React.createElement(
      PhotoGallery,
      {
        key: contest.id,
        gallery: contest.gallery || [],
        votedIds: contest.voted_ids || [],
        voterToken,
        user,
        onOpenAuth,
        onVote: (entryId) => handleVote(entryId, contest.id),
        T
      }
    ))));
  };
  var TrustScene = ({ lang }) => {
    const sceneRef = useRef(null);
    useSceneProgress(sceneRef);
    const [newsEmail, setNewsEmail] = useState("");
    const [newsStatus, setNewsStatus] = useState("idle");
    const t = {
      fr: {
        eyebrow: "Pourquoi Latina",
        title1: "Une boutique",
        title2: "qui m\xE9rite",
        title3: "votre confiance.",
        cells: [
          { icon: /* @__PURE__ */ React.createElement(IconTruck, { width: 28, height: 28 }), h: "Livraison 58 wilayas", p: "De Tamanrasset \xE0 Annaba, partout en Alg\xE9rie. D\xE9lais affich\xE9s \xE0 la commande." },
          { icon: /* @__PURE__ */ React.createElement(IconCash, { width: 28, height: 28 }), h: "Paiement \xE0 la livraison", p: "Vous payez quand vous recevez. Vous voyez avant de d\xE9cider." },
          { icon: /* @__PURE__ */ React.createElement(IconReturn, { width: 28, height: 28 }), h: "Retour sous 7 jours", p: "Une pointure ne va pas ? On reprend gratuitement, sans question." },
          { icon: /* @__PURE__ */ React.createElement(IconShield, { width: 28, height: 28 }), h: "S\xE9lection v\xE9rifi\xE9e", p: "Chaque pi\xE8ce contr\xF4l\xE9e par notre \xE9quipe avant emballage." }
        ],
        news: { title1: "Recevez les", title2: "nouveaut\xE9s", title3: "en avant-premi\xE8re.", placeholder: "Votre adresse email", cta: "S'inscrire", tiny: "Aucun spam \xB7 D\xE9sabonnement en un clic", ok: "Merci ! Vous recevrez nos nouveaut\xE9s en avant-premi\xE8re.", already: "Vous \xEAtes d\xE9j\xE0 abonn\xE9e. \xC0 bient\xF4t !", err: "Erreur, veuillez r\xE9essayer." }
      },
      ar: {
        eyebrow: "\u0644\u0645\u0627\u0630\u0627 Latina",
        title1: "\u0645\u062A\u062C\u0631",
        title2: "\u064A\u0633\u062A\u062D\u0642",
        title3: "\u062B\u0642\u062A\u0643.",
        cells: [
          { icon: /* @__PURE__ */ React.createElement(IconTruck, { width: 28, height: 28 }), h: "\u062A\u0648\u0635\u064A\u0644 58 \u0648\u0644\u0627\u064A\u0629", p: "\u0645\u0646 \u062A\u0645\u0646\u0631\u0627\u0633\u062A \u0625\u0644\u0649 \u0639\u0646\u0627\u0628\u0629. \u0643\u0644 \u0627\u0644\u0645\u062F\u062F \u0645\u0639\u0631\u0648\u0636\u0629 \u0639\u0646\u062F \u0627\u0644\u0637\u0644\u0628." },
          { icon: /* @__PURE__ */ React.createElement(IconCash, { width: 28, height: 28 }), h: "\u0627\u0644\u062F\u0641\u0639 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645", p: "\u062A\u062F\u0641\u0639\u064A\u0646 \u0639\u0646\u062F \u0627\u0644\u0627\u0633\u062A\u0644\u0627\u0645. \u062A\u0631\u064A\u0646 \u0642\u0628\u0644 \u0623\u0646 \u062A\u0642\u0631\u0631\u064A." },
          { icon: /* @__PURE__ */ React.createElement(IconReturn, { width: 28, height: 28 }), h: "\u0625\u0631\u062C\u0627\u0639 \u062E\u0644\u0627\u0644 7 \u0623\u064A\u0627\u0645", p: "\u0627\u0644\u0645\u0642\u0627\u0633 \u0644\u0627 \u064A\u0646\u0627\u0633\u0628\u061F \u0646\u0633\u062A\u0631\u062C\u0639\u0647 \u0645\u062C\u0627\u0646\u0627\u064B \u0628\u062F\u0648\u0646 \u0623\u0633\u0626\u0644\u0629." },
          { icon: /* @__PURE__ */ React.createElement(IconShield, { width: 28, height: 28 }), h: "\u0627\u062E\u062A\u064A\u0627\u0631 \u0645\u0648\u062B\u0648\u0642", p: "\u0643\u0644 \u0642\u0637\u0639\u0629 \u064A\u062A\u062D\u0642\u0642 \u0645\u0646\u0647\u0627 \u0641\u0631\u064A\u0642\u0646\u0627 \u0642\u0628\u0644 \u0627\u0644\u062A\u063A\u0644\u064A\u0641." }
        ],
        news: { title1: "\u0627\u0633\u062A\u0644\u0645\u064A", title2: "\u0627\u0644\u062C\u062F\u064A\u062F", title3: "\u0642\u0628\u0644 \u0627\u0644\u062C\u0645\u064A\u0639.", placeholder: "\u0628\u0631\u064A\u062F\u0643 \u0627\u0644\u0625\u0644\u0643\u062A\u0631\u0648\u0646\u064A", cta: "\u0627\u0634\u062A\u0631\u0643\u064A", tiny: "\u0628\u062F\u0648\u0646 \u0625\u0632\u0639\u0627\u062C \xB7 \u0625\u0644\u063A\u0627\u0621 \u0627\u0644\u0627\u0634\u062A\u0631\u0627\u0643 \u0628\u0646\u0642\u0631\u0629 \u0648\u0627\u062D\u062F\u0629", ok: "\u0634\u0643\u0631\u064B\u0627! \u0633\u062A\u0635\u0644\u0643\u0650 \u0623\u062E\u0628\u0627\u0631\u0646\u0627.", already: "\u0623\u0646\u062A\u0650 \u0645\u0634\u062A\u0631\u0643\u0629 \u0628\u0627\u0644\u0641\u0639\u0644.", err: "\u062E\u0637\u0623\u060C \u062D\u0627\u0648\u0644\u064A \u0645\u062C\u062F\u062F\u064B\u0627." }
      },
      en: {
        eyebrow: "Why Latina",
        title1: "A boutique",
        title2: "that earns",
        title3: "your trust.",
        cells: [
          { icon: /* @__PURE__ */ React.createElement(IconTruck, { width: 28, height: 28 }), h: "All 58 wilayas", p: "From Tamanrasset to Annaba \u2014 Algeria-wide. ETA shown at checkout." },
          { icon: /* @__PURE__ */ React.createElement(IconCash, { width: 28, height: 28 }), h: "Cash on delivery", p: "Pay when you receive. See before you decide." },
          { icon: /* @__PURE__ */ React.createElement(IconReturn, { width: 28, height: 28 }), h: "7-day returns", p: "Wrong size? We take it back free, no questions asked." },
          { icon: /* @__PURE__ */ React.createElement(IconShield, { width: 28, height: 28 }), h: "Vetted selection", p: "Every piece checked by our team before packing." }
        ],
        news: { title1: "Get the", title2: "newness", title3: "first.", placeholder: "Your email address", cta: "Subscribe", tiny: "No spam \xB7 One-click unsubscribe", ok: "Thank you! You'll receive our updates.", already: "You're already subscribed!", err: "Error, please try again." }
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
    return /* @__PURE__ */ React.createElement("section", { ref: sceneRef, className: "scene scene-trust", "data-screen-label": "06 Trust" }, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement(SceneMarker, { num: "06", label: "Trust", meta: "58 WILAYAS \xB7 COD" }), /* @__PURE__ */ React.createElement("div", { className: "reveal", style: { marginBottom: 80 } }, /* @__PURE__ */ React.createElement("div", { className: "label", style: { marginBottom: 16 } }, t.eyebrow), /* @__PURE__ */ React.createElement("h2", { className: "display", style: { fontSize: "clamp(40px,5.5vw,72px)", color: "var(--ink)", maxWidth: 760, lineHeight: 1, letterSpacing: "-0.015em" } }, t.title1, " ", /* @__PURE__ */ React.createElement("em", { style: { color: "var(--rose-500)", fontStyle: "italic" } }, t.title2), /* @__PURE__ */ React.createElement("br", null), t.title3)), /* @__PURE__ */ React.createElement("div", { className: "trust-row reveal-stagger" }, t.cells.map((c, i) => /* @__PURE__ */ React.createElement("div", { className: "trust-cell", key: i }, /* @__PURE__ */ React.createElement("div", { className: "icon" }, c.icon), /* @__PURE__ */ React.createElement("h4", null, c.h), /* @__PURE__ */ React.createElement("p", null, c.p)))), /* @__PURE__ */ React.createElement("div", { className: "ws-block reveal" }, /* @__PURE__ */ React.createElement("div", { className: "ws-block-head" }, /* @__PURE__ */ React.createElement("span", { className: "t-mono" }, "\u2014 ", { fr: "V\xE9rifiez votre livraison", ar: "\u062A\u062D\u0642\u0642\u064A \u0645\u0646 \u0627\u0644\u062A\u0648\u0635\u064A\u0644", en: "Check your delivery" }[lang]), /* @__PURE__ */ React.createElement("h3", { className: "t-h4" }, { fr: "Wilaya \xB7 Commune \xB7 Frais en temps r\xE9el", ar: "\u0627\u0644\u0648\u0644\u0627\u064A\u0629 \xB7 \u0627\u0644\u0628\u0644\u062F\u064A\u0629 \xB7 \u0627\u0644\u0631\u0633\u0648\u0645 \u0622\u0646\u064A\u0627\u064B", en: "Wilaya \xB7 Commune \xB7 Live fee" }[lang])), /* @__PURE__ */ React.createElement(WilayaSelector, { lang })), /* @__PURE__ */ React.createElement("div", { className: "newsletter reveal" }, /* @__PURE__ */ React.createElement("h2", null, t.news.title1, " ", /* @__PURE__ */ React.createElement("em", null, t.news.title2), /* @__PURE__ */ React.createElement("br", null), t.news.title3), /* @__PURE__ */ React.createElement("div", { className: "newsletter-form" }, newsIsDone ? /* @__PURE__ */ React.createElement("div", { className: "newsletter-ok" }, /* @__PURE__ */ React.createElement("span", { className: "newsletter-ok-icon" }, "\u2713"), /* @__PURE__ */ React.createElement("span", null, newsStatus === "already" ? t.news.already : t.news.ok)) : /* @__PURE__ */ React.createElement("form", { className: "row", onSubmit: handleNewsletter }, /* @__PURE__ */ React.createElement(
      "input",
      {
        type: "email",
        placeholder: t.news.placeholder,
        value: newsEmail,
        onChange: (e) => {
          setNewsEmail(e.target.value);
          if (newsStatus === "error") setNewsStatus("idle");
        },
        required: true,
        disabled: newsStatus === "loading"
      }
    ), /* @__PURE__ */ React.createElement("button", { type: "submit", disabled: newsStatus === "loading" }, newsStatus === "loading" ? /* @__PURE__ */ React.createElement("span", { className: "btn-spinner" }) : t.news.cta)), newsStatus === "error" && /* @__PURE__ */ React.createElement("div", { style: { marginTop: 8, fontFamily: "var(--mono)", fontSize: 11, color: "#EF4444" } }, t.news.err), !newsIsDone && /* @__PURE__ */ React.createElement("div", { className: "tiny" }, t.news.tiny)))));
  };
  var Footer = ({ lang }) => {
    const t = {
      fr: {
        tagline: "Just for you.",
        cols: [
          { h: "Boutique", links: ["Chaussures", "Sacs", "Accessoires", "Nouveaut\xE9s", "Promotions"] },
          { h: "Compte", links: ["Mon compte", "Mes commandes", "Liste de souhaits", "Programme Fid\xE9lit\xE9", "Concours"] },
          { h: "Aide", links: ["Livraison", "Retours", "Guide des tailles", "FAQ", "Contact"] }
        ],
        bottom: ["\xA9 2026 Latina \xB7 Alger, Alg\xE9rie", "Conditions \xB7 Confidentialit\xE9 \xB7 Mentions"]
      },
      ar: {
        tagline: "Just for you.",
        cols: [
          { h: "\u0627\u0644\u0645\u062A\u062C\u0631", links: ["\u0627\u0644\u0623\u062D\u0630\u064A\u0629", "\u0627\u0644\u062D\u0642\u0627\u0626\u0628", "\u0627\u0644\u0625\u0643\u0633\u0633\u0648\u0627\u0631\u0627\u062A", "\u0627\u0644\u062C\u062F\u064A\u062F", "\u0627\u0644\u0639\u0631\u0648\u0636"] },
          { h: "\u0627\u0644\u062D\u0633\u0627\u0628", links: ["\u062D\u0633\u0627\u0628\u064A", "\u0637\u0644\u0628\u0627\u062A\u064A", "\u0627\u0644\u0645\u0641\u0636\u0644\u0629", "\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u0648\u0644\u0627\u0621", "\u0627\u0644\u0645\u0633\u0627\u0628\u0642\u0629"] },
          { h: "\u0627\u0644\u0645\u0633\u0627\u0639\u062F\u0629", links: ["\u0627\u0644\u062A\u0648\u0635\u064A\u0644", "\u0627\u0644\u0625\u0631\u062C\u0627\u0639", "\u062F\u0644\u064A\u0644 \u0627\u0644\u0645\u0642\u0627\u0633\u0627\u062A", "\u0627\u0644\u0623\u0633\u0626\u0644\u0629", "\u0627\u062A\u0635\u0644\u064A \u0628\u0646\u0627"] }
        ],
        bottom: ["\xA9 2026 Latina \xB7 \u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0627\u0644\u0639\u0627\u0635\u0645\u0629", "\u0627\u0644\u0634\u0631\u0648\u0637 \xB7 \u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629"]
      },
      en: {
        tagline: "Just for you.",
        cols: [
          { h: "Shop", links: ["Shoes", "Bags", "Accessories", "New in", "Sale"] },
          { h: "Account", links: ["My account", "Orders", "Wishlist", "Loyalty program", "Contest"] },
          { h: "Help", links: ["Delivery", "Returns", "Size guide", "FAQ", "Contact"] }
        ],
        bottom: ["\xA9 2026 Latina \xB7 Algiers, Algeria", "Terms \xB7 Privacy \xB7 Legal"]
      }
    }[lang];
    return /* @__PURE__ */ React.createElement("footer", { className: "footer" }, /* @__PURE__ */ React.createElement("div", { className: "footer-grid" }, /* @__PURE__ */ React.createElement("div", { className: "footer-col footer-brand" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 } }, /* @__PURE__ */ React.createElement(LotusMark, { size: 36, color: "var(--rose-500)" }), /* @__PURE__ */ React.createElement("div", { className: "brand-name" }, "Latina")), /* @__PURE__ */ React.createElement("p", null, t.tagline)), t.cols.map((c) => /* @__PURE__ */ React.createElement("div", { className: "footer-col", key: c.h }, /* @__PURE__ */ React.createElement("h5", null, c.h), /* @__PURE__ */ React.createElement("ul", null, c.links.map((l) => /* @__PURE__ */ React.createElement("li", { key: l }, /* @__PURE__ */ React.createElement("a", { href: "#" }, l))))))), /* @__PURE__ */ React.createElement("div", { className: "footer-bottom" }, /* @__PURE__ */ React.createElement("span", null, t.bottom[0]), /* @__PURE__ */ React.createElement("span", null, t.bottom[1])));
  };
  var StoryScene = ({ lang }) => {
    const sceneRef = useRef(null);
    const numberRef = useRef(null);
    const [counted, setCounted] = useState(false);
    useSceneProgress(sceneRef);
    useEffect(() => {
      const el = numberRef.current;
      if (!el || counted) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        setCounted(true);
        obs.disconnect();
        let startTs = null;
        const duration = 1600;
        const easeOut = (t2) => 1 - Math.pow(1 - t2, 3);
        const tick = (ts) => {
          if (!startTs) startTs = ts;
          const p = Math.min((ts - startTs) / duration, 1);
          el.textContent = Math.round(easeOut(p) * 22);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }, { threshold: 0.5 });
      obs.observe(el);
      return () => obs.disconnect();
    }, [counted]);
    useEffect(() => {
      const chapters = sceneRef.current?.querySelectorAll(".story-chapter");
      if (!chapters?.length) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      }, { threshold: 0.18 });
      chapters.forEach((c) => obs.observe(c));
      return () => obs.disconnect();
    }, []);
    const t = {
      fr: {
        label: "Notre histoire",
        yearsLabel: "ANS",
        sub: "de mode alg\xE9roise \u2014 une boutique qui a tenu ses promesses.",
        chapters: [
          { year: "2003", side: "left", accent: "Une femme. Une vision.", body: "Un samedi matin \xE0 Alger, la premi\xE8re vitrine a ouvert ses portes. Pas de publicit\xE9, pas de budget \u2014 juste une obsession pour la qualit\xE9 et un bouche-\xE0-oreille qui s'est embras\xE9 dans tout le quartier." },
          { year: "Les premi\xE8res ann\xE9es", side: "right", accent: "Chaque cliente connue par son pr\xE9nom.", body: "On choisissait \xE0 la main, on emballait avec soin. Chaque pi\xE8ce avait une histoire. Les clientes revenaient \u2014 pas seulement pour les chaussures, mais pour l'exp\xE9rience." },
          { year: "La bo\xEEte signature", side: "left", accent: "Parce qu'une belle pi\xE8ce m\xE9rite une belle premi\xE8re impression.", body: "La bo\xEEte Latina est n\xE9e de ce principe simple. Reconnaissable entre mille. Aujourd'hui, nos clientes la gardent longtemps apr\xE8s avoir us\xE9 les chaussures." },
          { year: "58 wilayas", side: "right", accent: "D'Alger \xE0 Tamanrasset.", body: "Ce qui a commenc\xE9 dans une rue d'Alger traverse aujourd'hui tout le pays. La m\xEAme s\xE9lection, le m\xEAme emballage, la m\xEAme promesse \u2014 peu importe o\xF9 vous \xEAtes." },
          { year: "Aujourd'hui", side: "left", accent: "22 ans plus tard \u2014 toujours la m\xEAme promesse.", body: "Des milliers de femmes \xE0 travers l'Alg\xE9rie. Des milliers de bo\xEEtes ouvertes avec sourire. Et une boutique qui n'a jamais arr\xEAt\xE9 de choisir avec soin, pour vous." }
        ]
      },
      ar: {
        label: "\u0642\u0635\u0651\u062A\u0646\u0627",
        yearsLabel: "\u0633\u0646\u0629",
        sub: "\u0645\u0646 \u0627\u0644\u0645\u0648\u0636\u0629 \u0627\u0644\u062C\u0632\u0627\u0626\u0631\u064A\u0629 \u2014 \u0645\u062A\u062C\u0631 \u0648\u0641\u0649 \u0628\u0643\u0644\u0645\u062A\u0647.",
        chapters: [
          { year: "2003", side: "right", accent: "\u0627\u0645\u0631\u0623\u0629 \u0648\u0627\u062D\u062F\u0629. \u0631\u0624\u064A\u0629 \u0648\u0627\u062D\u062F\u0629.", body: "\u0635\u0628\u0627\u062D \u0633\u0628\u062A \u0641\u064A \u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0627\u0644\u0639\u0627\u0635\u0645\u0629\u060C \u0641\u064F\u062A\u062D\u062A \u0623\u0648\u0644 \u0648\u0627\u062C\u0647\u0629. \u0644\u0627 \u0625\u0639\u0644\u0627\u0646\u0627\u062A\u060C \u0644\u0627 \u0645\u064A\u0632\u0627\u0646\u064A\u0629 \u2014 \u0641\u0642\u0637 \u0647\u0648\u0633 \u0628\u0627\u0644\u062C\u0648\u062F\u0629 \u0648\u0643\u0644\u0645\u0629 \u0634\u0641\u0647\u064A\u0629 \u0627\u0634\u062A\u0639\u0644\u062A \u0648\u0627\u0646\u062A\u0634\u0631\u062A \u0641\u064A \u0643\u0644 \u0627\u0644\u062D\u064A." },
          { year: "\u0627\u0644\u0633\u0646\u0648\u0627\u062A \u0627\u0644\u0623\u0648\u0644\u0649", side: "left", accent: "\u0643\u0644 \u0632\u0628\u0648\u0646\u0629 \u062A\u064F\u0639\u0631\u0641 \u0628\u0627\u0633\u0645\u0647\u0627.", body: "\u0643\u0646\u0651\u0627 \u0646\u062E\u062A\u0627\u0631 \u0628\u0627\u0644\u064A\u062F \u0648\u0646\u064F\u063A\u0644\u0651\u0641 \u0628\u0627\u0647\u062A\u0645\u0627\u0645. \u0643\u0644 \u0642\u0637\u0639\u0629 \u0644\u0647\u0627 \u0642\u0635\u0651\u0629. \u0627\u0644\u0632\u0628\u0648\u0646\u0627\u062A \u0639\u064F\u062F\u0646 \u2014 \u0644\u064A\u0633 \u0641\u0642\u0637 \u0644\u0644\u0623\u062D\u0630\u064A\u0629\u060C \u0628\u0644 \u0644\u0644\u062A\u062C\u0631\u0628\u0629 \u0628\u0623\u0643\u0645\u0644\u0647\u0627." },
          { year: "\u0627\u0644\u0639\u0644\u0628\u0629 \u0627\u0644\u062E\u0627\u0635\u0629", side: "right", accent: "\u0644\u0623\u0646 \u0627\u0644\u0642\u0637\u0639\u0629 \u0627\u0644\u062C\u0645\u064A\u0644\u0629 \u062A\u0633\u062A\u062D\u0642 \u0627\u0646\u0637\u0628\u0627\u0639\u0627\u064B \u0623\u0648\u0644 \u0644\u0627 \u064A\u064F\u0646\u0633\u0649.", body: "\u0648\u064F\u0644\u062F\u062A \u0639\u0644\u0628\u0629 Latina \u0645\u0646 \u0647\u0630\u0627 \u0627\u0644\u0645\u0628\u062F\u0623 \u0627\u0644\u0628\u0633\u064A\u0637. \u0644\u0627 \u062A\u064F\u0646\u0633\u0649. \u0627\u0644\u064A\u0648\u0645\u060C \u062A\u064F\u0628\u0642\u064A \u0639\u0644\u064A\u0647\u0627 \u0632\u0628\u0648\u0646\u0627\u062A\u0646\u0627 \u0637\u0648\u064A\u0644\u0627\u064B \u0628\u0639\u062F \u0623\u0646 \u062A\u0628\u0644\u0649 \u0627\u0644\u0623\u062D\u0630\u064A\u0629." },
          { year: "58 \u0648\u0644\u0627\u064A\u0629", side: "left", accent: "\u0645\u0646 \u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0625\u0644\u0649 \u062A\u0645\u0646\u0631\u0627\u0633\u062A.", body: "\u0645\u0627 \u0628\u062F\u0623 \u0641\u064A \u0634\u0627\u0631\u0639 \u0628\u0627\u0644\u062C\u0632\u0627\u0626\u0631 \u0627\u0644\u0639\u0627\u0635\u0645\u0629 \u064A\u0639\u0628\u0631 \u0627\u0644\u064A\u0648\u0645 \u0643\u0644 \u0627\u0644\u0628\u0644\u0627\u062F. \u0646\u0641\u0633 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631\u060C \u0646\u0641\u0633 \u0627\u0644\u062A\u063A\u0644\u064A\u0641\u060C \u0646\u0641\u0633 \u0627\u0644\u0648\u0639\u062F \u2014 \u0623\u064A\u0646\u0645\u0627 \u0643\u0646\u062A\u0650." },
          { year: "\u0627\u0644\u064A\u0648\u0645", side: "right", accent: ".22 \u0639\u0627\u0645\u0627\u064B \u0644\u0627\u062D\u0642\u0627\u064B \u2014 \u0646\u0641\u0633 \u0627\u0644\u0648\u0639\u062F \u062F\u0627\u0626\u0645\u0627\u064B", body: "\u0622\u0644\u0627\u0641 \u0627\u0644\u0646\u0633\u0627\u0621 \u0639\u0628\u0631 \u0627\u0644\u062C\u0632\u0627\u0626\u0631. \u0622\u0644\u0627\u0641 \u0627\u0644\u0639\u0644\u0628 \u0641\u064F\u062A\u062D\u062A \u0628\u0627\u0628\u062A\u0633\u0627\u0645\u0629. \u0648\u0645\u062A\u062C\u0631 \u0644\u0645 \u064A\u062A\u0648\u0642\u0641 \u0639\u0646 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631 \u0628\u0639\u0646\u0627\u064A\u0629\u060C \u0645\u0646 \u0623\u062C\u0644\u0643 \u0623\u0646\u062A\u0650." }
        ]
      },
      en: {
        label: "Our Story",
        yearsLabel: "YEARS",
        sub: "of Algerian fashion \u2014 a boutique that kept its word.",
        chapters: [
          { year: "2003", side: "left", accent: "One woman. One vision.", body: "A Saturday morning in Algiers, the first window opened. No advertising, no budget \u2014 just an obsession with quality and a word-of-mouth that caught fire across the entire neighbourhood." },
          { year: "The early years", side: "right", accent: "Every customer known by her first name.", body: "We hand-picked everything, wrapped with care. Every piece came with a story. Customers came back \u2014 not just for the shoes, but for the experience." },
          { year: "The signature box", side: "left", accent: "Because a beautiful piece deserves a beautiful first impression.", body: "The Latina box was born from this simple principle. Unmistakable. Today, our customers keep it long after the shoes are worn out." },
          { year: "58 wilayas", side: "right", accent: "From Algiers to Tamanrasset.", body: "What started in one Algiers street now crosses the entire country. Same curation, same packaging, same promise \u2014 wherever you are." },
          { year: "Today", side: "left", accent: "22 years later \u2014 the same promise.", body: "Thousands of women across Algeria. Thousands of boxes opened with a smile. A boutique that never stopped choosing with care, for you." }
        ]
      }
    }[lang];
    return /* @__PURE__ */ React.createElement("section", { ref: sceneRef, className: "scene scene-story", "data-screen-label": "05b Story" }, /* @__PURE__ */ React.createElement("div", { className: "story-inner" }, /* @__PURE__ */ React.createElement("div", { className: "story-header reveal" }, /* @__PURE__ */ React.createElement("div", { className: "label", style: { color: "var(--rose-400)", marginBottom: 28 } }, t.label), /* @__PURE__ */ React.createElement("div", { className: "story-hero-count" }, /* @__PURE__ */ React.createElement("span", { ref: numberRef, className: "story-big-number" }, "0"), /* @__PURE__ */ React.createElement("span", { className: "story-years-badge" }, t.yearsLabel)), /* @__PURE__ */ React.createElement("p", { className: "story-sub" }, t.sub)), /* @__PURE__ */ React.createElement("div", { className: "story-timeline" }, /* @__PURE__ */ React.createElement("div", { className: "story-vline" }), t.chapters.map((ch, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: `story-chapter story-chapter--${ch.side}` }, /* @__PURE__ */ React.createElement("div", { className: "story-dot" }), /* @__PURE__ */ React.createElement("div", { className: "story-chapter-inner" }, /* @__PURE__ */ React.createElement("div", { className: "story-chapter-year" }, ch.year), /* @__PURE__ */ React.createElement("h3", { className: "story-chapter-accent" }, '"', ch.accent, '"'), /* @__PURE__ */ React.createElement("p", { className: "story-chapter-body" }, ch.body)))))));
  };
  Object.assign(window, { RewardsScene, TrustScene, StoryScene, Footer });
})();
