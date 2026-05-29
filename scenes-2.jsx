/* global React */
const { useState, useEffect, useRef, useCallback } = React;

/* ── Local-storage helpers ─────────────────────────────────────── */
const _genToken = () =>
  Array.from({ length: 4 }, () => Math.random().toString(36).slice(2)).join("").slice(0, 32);

const _getOrCreate = (key) => {
  let v = localStorage.getItem(key);
  if (!v) { v = _genToken(); localStorage.setItem(key, v); }
  return v;
};

/* ============================================================
   SCENE — REWARDS (Loyalty + Concours)
   ============================================================ */

/* ── Winner Announcement Overlay ───────────────────────────────── */
const WinnerAnnouncement = ({ announcement, lang, onClose }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [dismissed, setDismissed] = useState(false);

  const TW = {
    fr: { congrats: "Félicitations !", sub: "Gagnante du concours", label: "«", close: "Fermer", visible: "Annonce visible encore" },
    ar: { congrats: "تهانينا !", sub: "الفائزة بالمسابقة", label: "«", close: "إغلاق", visible: "الإعلان متاح لمدة" },
    en: { congrats: "Congratulations!", sub: "Contest winner", label: "«", close: "Close", visible: "Announcement visible for" },
  }[lang] || { congrats: "Félicitations !", sub: "Gagnante", label: "«", close: "Fermer", visible: "Encore" };

  const multiLang = lang === "fr" ? "تهانينا · Congratulations"
                  : lang === "ar" ? "Félicitations · Congratulations"
                  : "Félicitations · تهانينا";

  useEffect(() => {
    const end = new Date(announcement.winner_announced_at).getTime() + 6 * 3600 * 1000;
    const tick = () => {
      const diff = end - Date.now();
      if (diff <= 0) { onClose(); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff / 60000) % 60);
      setTimeLeft(`${h}h ${String(m).padStart(2, "0")}m`);
    };
    tick();
    const iv = setInterval(tick, 30000);
    return () => clearInterval(iv);
  }, [announcement.winner_announced_at]);

  const rawName = announcement.winner_name || "—";
  const maskedName = rawName.split(" ").map((p, i) => i === 0 ? p : (p[0] || "") + ".").join(" ");
  const contestTitle = announcement.title || "";

  if (dismissed) return null;

  return (
    <div className="winner-overlay" onClick={() => { setDismissed(true); onClose(); }}>
      <div className="winner-modal" onClick={e => e.stopPropagation()}>
        {/* Confetti */}
        <div className="winner-confetti" aria-hidden="true">
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i}
              className={`conf-p conf-p${(i % 5) + 1}`}
              style={{ left: `${(i * 4.2) % 92}%`, animationDelay: `${(i * 0.13) % 2.5}s`, animationDuration: `${1.8 + (i % 4) * 0.3}s` }}
            />
          ))}
        </div>

        <div className="winner-trophy" aria-hidden="true">🏆</div>

        <div className="winner-congrats">{TW.congrats}</div>
        <div className="winner-multilang">{multiLang}</div>

        <div className="winner-card">
          <div className="winner-card-label">{TW.sub}</div>
          {contestTitle && <div className="winner-card-title">{TW.label}{contestTitle}»</div>}
          <div className="winner-name">✨ {maskedName} ✨</div>
        </div>

        {timeLeft && (
          <div className="winner-timer">{TW.visible} <strong>{timeLeft}</strong></div>
        )}

        <button className="winner-close" onClick={() => { setDismissed(true); onClose(); }}>
          {TW.close} ✕
        </button>
      </div>
    </div>
  );
};

/* ── Tirage animation (tie-break draw) ────────────────────────── */
const TirageAnimation = ({ announcement, onComplete, T }) => {
  const { tied_entries = [], winner_entry_id } = announcement;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase]           = useState("spinning"); // spinning | landing
  const [showSkip, setShowSkip]     = useState(false);

  /* show "skip" button after 2.5 s */
  useEffect(() => {
    const t = setTimeout(() => setShowSkip(true), 2500);
    return () => clearTimeout(t);
  }, []);

  /* build the spin schedule: rapid → slow → land */
  useEffect(() => {
    if (phase !== "spinning" || tied_entries.length === 0) return;
    const winnerIdx = tied_entries.findIndex(e => e.id === winner_entry_id);
    const safeIdx   = winnerIdx >= 0 ? winnerIdx : 0;

    // intervals in ms: start fast, slow progressively, then land
    const schedule = [50,55,60,65,70,80,90,105,125,150,180,215,260,315,380,460];
    let step = 0;
    let idx  = 0;
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
  }, []); // run once

  const skip = () => {
    const winnerIdx = tied_entries.findIndex(e => e.id === winner_entry_id);
    setCurrentIdx(winnerIdx >= 0 ? winnerIdx : 0);
    setPhase("landing");
    setTimeout(onComplete, 2200);
  };

  const current  = tied_entries[currentIdx] || {};
  const isLanding = phase === "landing";

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "rgba(0,0,0,.88)", backdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", padding: 24,
    }}>
      <style>{`
        @keyframes pulseGold {
          0%,100% { box-shadow: 0 0 24px rgba(245,158,11,.5); }
          50%      { box-shadow: 0 0 56px rgba(245,158,11,.9); }
        }
        @keyframes spinFade {
          0%   { opacity: .6; transform: scale(.97); }
          100% { opacity: 1;  transform: scale(1);   }
        }
      `}</style>

      {/* top label */}
      <div style={{
        fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.18em",
        textTransform: "uppercase", color: "rgba(255,255,255,.5)", marginBottom: 28,
        textAlign: "center",
      }}>
        {T.tirageRunning}
      </div>

      {/* desc only while spinning */}
      {phase === "spinning" && (
        <p style={{
          fontSize: 13, color: "rgba(255,255,255,.6)", textAlign: "center",
          maxWidth: 320, lineHeight: 1.6, marginBottom: 28, fontFamily: "var(--mono)",
        }}>
          {T.tirageDesc}
        </p>
      )}

      {/* photo card */}
      <div style={{
        width: 210, height: 270, borderRadius: 20, overflow: "hidden",
        border: isLanding ? "3px solid #F59E0B" : "2px solid rgba(255,255,255,.18)",
        animation: isLanding
          ? "pulseGold 1.4s ease infinite"
          : "spinFade .08s ease",
        transition: "border-color .3s",
        background: "#222",
      }}>
        {current.photo_url ? (
          <img src={window.mediaUrl(current.photo_url)} alt={current.name}
            key={currentIdx}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", background: "#333" }} />
        )}
      </div>

      {/* name */}
      <div style={{
        marginTop: 20, fontSize: 18, fontWeight: 700, minHeight: 28, textAlign: "center",
        color: isLanding ? "#F59E0B" : "#fff",
        transition: "color .4s",
      }}>
        {isLanding ? `🏆 ${current.name}` : current.name}
      </div>

      {isLanding && (
        <div style={{
          marginTop: 8, fontSize: 13, color: "rgba(255,255,255,.65)",
          fontFamily: "var(--mono)", textAlign: "center",
        }}>
          {T.tirageWinner}
        </div>
      )}

      {/* vote count */}
      <div style={{
        marginTop: 10, fontSize: 13, color: "rgba(255,255,255,.45)",
        fontFamily: "var(--mono)",
      }}>
        ❤️ {current.votes ?? 0} vote{(current.votes ?? 0) !== 1 ? "s" : ""}
      </div>

      {/* skip button */}
      {showSkip && phase === "spinning" && (
        <button onClick={skip} style={{
          marginTop: 28, background: "none",
          border: "1px solid rgba(255,255,255,.25)", color: "rgba(255,255,255,.5)",
          borderRadius: 20, padding: "6px 18px", fontSize: 12, cursor: "pointer",
          fontFamily: "var(--mono)", transition: "border-color .2s, color .2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.5)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.25)"; e.currentTarget.style.color = "rgba(255,255,255,.5)"; }}
        >
          {T.tirageSkip}
        </button>
      )}
    </div>
  );
};

/* ── Countdown timer hook ──────────────────────────────────────── */
const useCountdown = (endsAt) => {
  const pad = (n) => String(n).padStart(2, "0");
  const calc = () => {
    const diff = new Date(endsAt) - Date.now();
    if (diff <= 0) return { d: "00", h: "00", m: "00", s: "00" };
    return {
      d: pad(Math.floor(diff / 86400000)),
      h: pad(Math.floor((diff / 3600000) % 24)),
      m: pad(Math.floor((diff / 60000) % 60)),
      s: pad(Math.floor((diff / 1000) % 60)),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    if (!endsAt) return;
    setTime(calc());
    const iv = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(iv);
  }, [endsAt]);
  return time;
};

/* ── Photo participate modal ───────────────────────────────────── */
const PhotoParticipateModal = ({ contest, participationToken, user, onClose, onSuccess, T }) => {
  const [photo, setPhoto]           = useState(null);
  const [preview, setPreview]       = useState(null);
  const [name, setName]             = useState(user?.name  || "");
  const [phone, setPhone]           = useState(user?.phone || "");
  const [submitting, setSubmitting] = useState(false);
  const [screen, setScreen]         = useState("form"); // form | success | already
  const [error, setError]           = useState("");
  const fileRef = useRef(null);

  const isAuth = !!user;

  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setPhoto(f); setPreview(URL.createObjectURL(f)); setError("");
  };

  const handleDrop = (e) => { e.preventDefault(); handleFile(e.dataTransfer.files[0]); };

  const handleSubmit = async () => {
    if (!photo)                       { setError(T.photoRequired); return; }
    if (!isAuth && !name.trim())      { setError(T.nameRequired);  return; }
    if (!isAuth && !phone.trim())     { setError(T.phoneRequired); return; }
    setSubmitting(true); setError("");
    try {
      const gName  = isAuth ? null : name.trim();
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
      if (e.data?.already_entered) { setScreen("already"); return; }
      setError(e.message || T.entryErr);
    } finally {
      setSubmitting(false);
    }
  };

  const modalBox = (children) => (
    <div className="modal-backdrop" onClick={onClose}>
      <div style={{ background: "var(--cream-50)", borderRadius: 20, padding: "48px 36px", maxWidth: 420, width: "100%", textAlign: "center", position: "relative", animation: "slideUp .3s var(--ease-petal)" }}
        onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );

  if (screen === "success") return modalBox(
    <>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <h3 style={{ marginBottom: 8, fontSize: 20 }}>{T.successTitle}</h3>
      <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6 }}>{T.successDesc}</p>
      <button className="btn-concours" style={{ marginTop: 24, width: "100%" }} onClick={onClose}>{T.close}</button>
    </>
  );

  if (screen === "already") return modalBox(
    <>
      <div style={{ fontSize: 56, marginBottom: 16 }}>📋</div>
      <h3 style={{ marginBottom: 8, fontSize: 20 }}>{T.alreadyTitle}</h3>
      <p style={{ color: "var(--ink-soft)", fontSize: 14, lineHeight: 1.6 }}>{T.alreadyDesc}</p>
      <button className="btn-concours" style={{ marginTop: 24, width: "100%" }} onClick={onClose}>{T.close}</button>
    </>
  );

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div style={{
        background: "var(--cream-50)", borderRadius: 20, padding: "36px 32px",
        maxWidth: 500, width: "100%", position: "relative",
        animation: "slideUp .3s var(--ease-petal)", maxHeight: "90vh", overflowY: "auto",
      }} onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div style={{ marginBottom: 20 }}>
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--rose-500)", textTransform: "uppercase" }}>
            {T.conLabel}
          </span>
          <h3 style={{ fontSize: 22, marginTop: 6, marginBottom: 4 }}>{T.participateTitle}</h3>
          <p style={{ fontSize: 13, color: "var(--ink-soft)" }}>{T.participateDesc}</p>
        </div>

        {/* Identity — logged-in: show account badge; guest: name + phone inputs */}
        {isAuth ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--cream-100)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, border: "1px solid var(--border)" }}>
            <span style={{ fontSize: 20 }}>👤</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{user.name}</div>
              {user.phone && <div style={{ fontSize: 12, color: "var(--ink-soft)", fontFamily: "var(--mono)" }}>{user.phone}</div>}
            </div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
            <input
              placeholder={T.namePlaceholder}
              value={name}
              onChange={e => { setName(e.target.value); setError(""); }}
              style={{ padding: "11px 14px", borderRadius: 10, border: "1px solid var(--border)", fontSize: 14, fontFamily: "inherit", outline: "none", background: "var(--cream-50)" }}
            />
            <input
              placeholder={T.phonePlaceholder}
              value={phone}
              onChange={e => { setPhone(e.target.value); setError(""); }}
              type="tel"
              style={{ padding: "11px 14px", borderRadius: 10, border: "1px solid var(--border)", fontSize: 14, fontFamily: "inherit", outline: "none", background: "var(--cream-50)" }}
            />
          </div>
        )}

        {/* Photo drop zone */}
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => !preview && fileRef.current.click()}
          style={{
            border: preview ? "2px solid var(--rose-300)" : "2px dashed var(--rose-300)",
            borderRadius: 14, minHeight: 180, display: "flex", alignItems: "center",
            justifyContent: "center", cursor: preview ? "default" : "pointer",
            overflow: "hidden", background: preview ? "transparent" : "var(--cream-100)",
            position: "relative", marginBottom: 16, transition: "border-color .2s",
          }}
        >
          {preview ? (
            <>
              <img src={preview} alt="preview" style={{ width: "100%", maxHeight: 260, objectFit: "cover", borderRadius: 12, display: "block" }} />
              <button
                onClick={e => { e.stopPropagation(); setPhoto(null); setPreview(null); fileRef.current.value = ""; }}
                style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,.55)", color: "#fff", border: "none", borderRadius: 20, padding: "4px 12px", cursor: "pointer", fontSize: 12, fontFamily: "var(--mono)" }}
              >✕ {T.photoChange}</button>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: 32 }}>
              <div style={{ fontSize: 44, marginBottom: 10 }}>📷</div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{T.photoSelect}</div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", fontFamily: "var(--mono)" }}>{T.photoDrop}</div>
            </div>
          )}
        </div>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />

        {error && (
          <div style={{ fontSize: 12, color: "#EF4444", marginBottom: 12, fontFamily: "var(--mono)" }}>{error}</div>
        )}

        <button className="btn-concours" onClick={handleSubmit} disabled={submitting} style={{ width: "100%" }}>
          {submitting ? T.entering : T.submit}
        </button>

        <p style={{ fontSize: 11, color: "var(--ink-soft)", marginTop: 12, textAlign: "center", fontFamily: "var(--mono)", lineHeight: 1.6 }}>
          {T.photoTerms}
        </p>
      </div>
    </div>
  );
};

/* ── Photo vote card — editorial full-bleed ────────────────────── */
const PhotoVoteCard = ({ entry, voted, voterToken, user, onOpenAuth, onVote, index = 0, hero = false }) => {
  const [votes, setVotes]             = useState(entry.votes);
  const [hasVoted, setHasVoted]       = useState(voted);
  const [voting, setVoting]           = useState(false);

  // Sync one-way: if the server tells us this token/user already voted, lock the button
  useEffect(() => { if (voted) setHasVoted(true); }, [voted]);
  // Keep vote count in sync with server (live gallery poll)
  useEffect(() => { setVotes(entry.votes); }, [entry.votes]);
  const [pop, setPop]                 = useState(false);
  const [showLoginHint, setLoginHint] = useState(false);
  const cardRef   = useRef(null);
  const canvasRef = useRef(null);

  const firstName = (entry.name || "Participante").split(" ")[0];

  /* rank badges — top 3 only */
  const BADGES = [
    { bg: "linear-gradient(135deg,#F59E0B,#B45309)", label: "👑 #1", glow: "0 0 16px rgba(245,158,11,.6)" },
    { bg: "linear-gradient(135deg,#CBD5E1,#94A3B8)", label: "🥈 #2", glow: "none" },
    { bg: "linear-gradient(135deg,#C97D4B,#92532B)", label: "🥉 #3", glow: "none" },
  ];
  const badge = index < 3 ? BADGES[index] : null;

  /* canvas particle burst */
  const burst = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height, cx = W / 2, cy = H / 2;
    const COLORS = ["#EF4444","#F97316","#EC4899","#F43F5E","#FBBF24","#fff"];
    const pts = Array.from({ length: 24 }, (_, i) => ({
      angle: (i / 24) * Math.PI * 2 + Math.random() * 0.25,
      speed: 2.2 + Math.random() * 3.2,
      r: 3 + Math.random() * 5, opacity: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      x: cx, y: cy,
    }));
    let frame = 0;
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += Math.cos(p.angle) * p.speed; p.y += Math.sin(p.angle) * p.speed;
        p.speed *= 0.91; p.opacity -= 0.032;
        if (p.opacity <= 0) return;
        ctx.globalAlpha = p.opacity; ctx.fillStyle = p.color;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (++frame < 42) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };
    requestAnimationFrame(tick);
  };

  /* 3D magnetic tilt — fires only on mousemove (desktop); touch devices skip it */
  const handleMouseMove = (e) => {
    const el = cardRef.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const rx = ((e.clientY - top  - height / 2) / (height / 2)) * -10;
    const ry = ((e.clientX - left - width  / 2) / (width  / 2)) *  10;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
    el.style.boxShadow = "0 28px 60px rgba(0,0,0,.38)";
  };
  const handleMouseLeave = () => {
    const el = cardRef.current; if (!el) return;
    el.style.transform = ""; el.style.boxShadow = "0 4px 20px rgba(0,0,0,.18)";
  };

  const handleVote = async () => {
    if (hasVoted || voting) return;
    if (!user) {
      setLoginHint(true); setTimeout(() => setLoginHint(false), 2800);
      onOpenAuth?.(); return;
    }
    setVoting(true); setPop(true); burst();
    setTimeout(() => setPop(false), 650);
    try {
      const res = await window.latinaApi.voteContestEntry(entry.id, voterToken);
      setVotes(res.votes); setHasVoted(true); onVote?.(entry.id);
    } catch { /* silent */ } finally { setVoting(false); }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={hero ? "gcard-hero" : "gcard"}
      style={{
        position: "relative", overflow: "hidden", background: "#111",
        boxShadow: "0 4px 20px rgba(0,0,0,.18)",
        transition: "transform .18s ease, box-shadow .18s ease",
        willChange: "transform",
        animation: `cardEntrance .55s ease ${index * 65}ms both`,
        cursor: "pointer",
      }}
    >
      {/* particle burst canvas — centered over card */}
      <canvas ref={canvasRef} width={200} height={200}
        style={{ position: "absolute", top: "50%", left: "50%",
                 transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: 10 }} />

      {/* full-bleed photo */}
      <img src={entry.photo_url} alt={firstName} className="gcard-img"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block",
                 transition: "transform .5s ease" }} />

      {/* bottom-to-top gradient for legibility */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,.78) 0%, rgba(0,0,0,.22) 42%, transparent 66%)",
        pointerEvents: "none",
      }} />

      {/* rank badge — top-left */}
      {badge && (
        <div style={{
          position: "absolute", top: 11, left: 11, zIndex: 6,
          background: badge.bg, borderRadius: 20,
          padding: hero ? "5px 13px" : "3px 9px",
          fontSize: hero ? 13 : 11, fontWeight: 700, color: "#fff",
          fontFamily: "var(--mono)", letterSpacing: "0.02em",
          boxShadow: badge.glow,
        }}>
          {badge.label}
        </div>
      )}

      {/* bottom info row */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 6,
        padding: hero ? "14px 16px" : "10px 12px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{
          fontWeight: 700, fontSize: hero ? 16 : 13, color: "#fff",
          textShadow: "0 1px 6px rgba(0,0,0,.55)", letterSpacing: "0.01em",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "60%",
        }}>
          {firstName}
        </span>

        <div style={{ position: "relative", flexShrink: 0 }}>
          {showLoginHint && (
            <div style={{
              position: "absolute", bottom: "calc(100% + 8px)", right: 0,
              background: "rgba(0,0,0,.92)", color: "#fff", borderRadius: 8,
              padding: "5px 11px", fontSize: 11, whiteSpace: "nowrap",
              fontFamily: "var(--mono)", zIndex: 30, pointerEvents: "none",
              backdropFilter: "blur(8px)", animation: "fadeIn .2s ease",
            }}>
              Connectez-vous pour voter
              <div style={{ position: "absolute", bottom: -4, right: 14, width: 8, height: 8,
                            background: "rgba(0,0,0,.92)", transform: "rotate(45deg)" }} />
            </div>
          )}

          {/* glassmorphism vote pill */}
          <button onClick={handleVote} disabled={hasVoted || voting} style={{
            background: hasVoted
              ? "linear-gradient(135deg,#EF4444,#F97316)"
              : "rgba(255,255,255,.18)",
            backdropFilter: "blur(12px)",
            border: hasVoted ? "none" : "1px solid rgba(255,255,255,.38)",
            borderRadius: 24,
            cursor: hasVoted ? "default" : "pointer",
            display: "flex", alignItems: "center", gap: 5, color: "#fff",
            transform: pop ? "scale(1.55)" : "scale(1)",
            transition: "transform .32s cubic-bezier(.175,.885,.32,1.575), background .25s",
            padding: hero ? "6px 13px" : "5px 10px",
            boxShadow: hasVoted ? "0 2px 14px rgba(239,68,68,.48)" : "none",
            minWidth: hero ? 60 : 50,
          }}>
            <span style={{ fontSize: hero ? 17 : 14, lineHeight: 1 }}>{hasVoted ? "❤️" : "🤍"}</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: hero ? 13 : 11, fontWeight: 700 }}>{votes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Photo gallery ─────────────────────────────────────────────── */
const PhotoGallery = ({ gallery, votedIds, voterToken, user, onOpenAuth, onVote, T }) => {
  if (!gallery || gallery.length === 0) return null;

  return (
    <div style={{ marginTop: 80 }}>
      <style>{`
        /* ── animations ── */
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

        /* ── card base ── */
        .gcard, .gcard-hero { border-radius: 16px; }
        .gcard-hero { border-radius: 20px; }

        /* ── photo zoom on card hover (CSS-only, no JS state) ── */
        .gcard:hover .gcard-img,
        .gcard-hero:hover .gcard-img { transform: scale(1.07); }

        /* ── responsive gallery grid ── */
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

        /* ── hero card: spans 2 columns, wider aspect ratio ── */
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

        /* ── regular card aspect ratio ── */
        .gcard { aspect-ratio: 3/4; }
      `}</style>

      {/* ── header ── */}
      <div style={{ textAlign: "center", marginBottom: 56, position: "relative" }}>
        <div aria-hidden="true" style={{
          position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)",
          width: 360, height: 120, borderRadius: "50%",
          background: "radial-gradient(ellipse,rgba(244,63,94,.16) 0%,transparent 70%)",
          pointerEvents: "none", animation: "glowPulse 4.5s ease infinite",
        }} />

        <span style={{
          display: "inline-block",
          fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.17em",
          textTransform: "uppercase",
          background: "linear-gradient(90deg,#F43F5E,#FB923C)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}>
          {T.galleryLabel}
        </span>

        <h3 style={{
          fontSize: "clamp(22px,3.8vw,42px)", marginTop: 12, marginBottom: 10,
          lineHeight: 1.1, letterSpacing: "-0.03em",
        }}>
          {T.galleryTitle}
        </h3>

        <p style={{ fontSize: 13, color: "var(--ink-soft)", fontFamily: "var(--mono)", marginBottom: user ? 0 : 14 }}>
          {!user
            ? <><span style={{ color: "#EF4444" }}>🔒</span> Connectez-vous pour voter · {T.galleryHint}</>
            : <>❤️ {T.galleryHint}</>
          }
        </p>

        {!user && (
          <button onClick={onOpenAuth} style={{
            marginTop: 14,
            background: "linear-gradient(135deg,#F43F5E 0%,#FB923C 100%)",
            border: "none", borderRadius: 28, color: "#fff",
            padding: "10px 24px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", letterSpacing: "0.02em",
            boxShadow: "0 6px 22px rgba(244,63,94,.34)",
            transition: "transform .15s ease, box-shadow .15s ease",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(244,63,94,.44)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 6px 22px rgba(244,63,94,.34)"; }}
          >
            Se connecter pour voter →
          </button>
        )}
      </div>

      {/* ── editorial grid ── */}
      <div className="photo-gallery-grid">
        {gallery.map((entry, i) => (
          <PhotoVoteCard
            key={entry.id}
            entry={entry}
            voted={votedIds.includes(entry.id)}
            voterToken={voterToken}
            user={user}
            onOpenAuth={onOpenAuth}
            onVote={onVote}
            index={i}
            hero={i === 0 && gallery.length > 1}
          />
        ))}
      </div>
    </div>
  );
};

/* ── Contest card — open / purchase types ──────────────────────── */
const ContestCard = ({ contest, entryCount, entered, user, onOpenAuth, T }) => {
  const [entering, setEntering] = useState(false);
  const [currentEntered, setCurrentEntered] = useState(entered);
  const [currentCount, setCurrentCount] = useState(entryCount);
  const [entryError, setEntryError] = useState("");
  const time = useCountdown(contest?.ends_at);

  const handleEnter = async () => {
    if (!user) { onOpenAuth?.(); return; }
    setEntering(true); setEntryError("");
    try {
      const res = await window.latinaApi.enterContest();
      setCurrentEntered(true);
      if (res.entries != null) setCurrentCount(res.entries);
      else setCurrentCount(c => c + 1);
    } catch (e) {
      if (e.status === 401) { onOpenAuth?.(); return; }
      if (e.data?.already_entered) { setCurrentEntered(true); return; }
      if (e.data?.not_eligible) { setEntryError(e.data.message || T.notEligible); return; }
      setEntryError(e.message || T.entryErr);
    } finally {
      setEntering(false);
    }
  };

  return (
    <>
      {contest.description && <p>{contest.description}</p>}
      {contest.title && (
        <div className="contest-prize">
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--rose-500)", textTransform: "uppercase" }}>{T.prizeLabel}</span>
          <div className="contest-prize-name">{contest.title}</div>
        </div>
      )}
      {contest.type === "purchase" && (
        <div className="contest-purchase-hint">
          <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--rose-500)" }}>{T.purchaseHint(contest.min_orders || 2)}</span>
        </div>
      )}
      <div className="countdown-grid">
        {[{ v: time.d, l: T.days }, { v: time.h, l: T.hrs }, { v: time.m, l: T.min }, { v: time.s, l: T.sec }].map(({ v, l }) => (
          <div className="countdown-cell" key={l}><div className="num">{v}</div><div className="lbl">{l}</div></div>
        ))}
      </div>
      {currentCount > 0 && <div className="contest-entries t-mono">{T.entryCount(currentCount)}</div>}
      {!currentEntered ? (
        <button className="btn-concours" onClick={handleEnter} disabled={entering}>
          {entering ? T.entering : user ? T.enter : T.needAuth}
        </button>
      ) : (
        <div className="btn-entered">{T.entered}</div>
      )}
      {entryError && <div style={{ marginTop: 8, fontFamily: "var(--mono)", fontSize: 11, color: "#EF4444" }}>{entryError}</div>}
    </>
  );
};

/* ── Photo contest card (inside rewards-grid) ──────────────────── */
const PhotoContestCard = ({ contest, entryCount, localEntry, onParticipate, T }) => {
  const time = useCountdown(contest?.ends_at);
  const [count, setCount] = useState(entryCount);
  useEffect(() => setCount(entryCount), [entryCount]);

  return (
    <>
      {contest.description && <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 16 }}>{contest.description}</p>}

      {contest.title && (
        <div className="contest-prize">
          <span style={{ fontFamily: "var(--mono)", fontSize: 10, letterSpacing: "0.12em", color: "var(--rose-500)", textTransform: "uppercase" }}>{T.prizeLabel}</span>
          <div className="contest-prize-name">{contest.title}</div>
        </div>
      )}

      <div className="countdown-grid">
        {[{ v: time.d, l: T.days }, { v: time.h, l: T.hrs }, { v: time.m, l: T.min }, { v: time.s, l: T.sec }].map(({ v, l }) => (
          <div className="countdown-cell" key={l}><div className="num">{v}</div><div className="lbl">{l}</div></div>
        ))}
      </div>

      {count > 0 && (
        <div className="contest-entries t-mono">{T.entryCount(count)}</div>
      )}

      {/* Entry status or participate button */}
      {localEntry?.status === "pending" && (
        <div className="contest-entry-status status-pending">
          <span>⏳</span> {T.photoPending}
        </div>
      )}
      {localEntry?.status === "approved" && (
        <div className="contest-entry-status status-approved">
          <span>✓</span> {T.photoApproved}
        </div>
      )}
      {localEntry?.status === "rejected" && (
        <div className="contest-entry-status status-rejected">
          <span>✕</span> {T.photoRejected}
          <button className="btn-outline-sm" style={{ marginTop: 10, display: "block" }} onClick={onParticipate}>{T.photoRetry}</button>
        </div>
      )}
      {!localEntry && (
        <>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 14, lineHeight: 1.6 }}>{T.photoInstruction}</p>
          <button className="btn-concours" onClick={onParticipate}>📷 {T.participate}</button>
        </>
      )}
    </>
  );
};

const RewardsScene = ({ lang, user, onOpenAuth }) => {
  const sceneRef = useRef(null);
  useSceneProgress(sceneRef);

  const T = {
    fr: {
      fidLabel: "La Fidélité", fidTitle1: "Plus vous portez", fidTitle2: "Latina", fidTitle3: ", plus elle vous remercie.",
      fidText: "Chaque commande compte. Chaque paire vous rapproche d'une réduction, d'un cadeau, d'un avantage exclusif.",
      fidTeaser: "Vos points vous attendent.", fidTeaserSub: "Créez votre compte gratuit et commencez à cumuler dès votre première commande.",
      fidCta: "Créer mon compte",
      points: "pts", balance: "Solde fidélité", nextTier: "pts pour atteindre",
      tiers: { petal: "🌸 Pétale", lotus: "🪷 Lotus", amber: "🌟 Ambre" },
      loyaltyInfo: "1 pt par 100 DA · 10 pts = 1 DA de réduction",
      conLabel: "Le Concours", conTitle1: "Partagez votre style.", conTitle2: "La meilleure photo gagne.",
      days: "Jours", hrs: "Heures", min: "Min", sec: "Sec",
      enter: "Participer maintenant →", entering: "Participation…", entered: "Vous participez ✓",
      needAuth: "Se connecter pour participer →",
      entryCount: (n) => `${n} participante${n > 1 ? "s" : ""} ce mois-ci`,
      noContest: "Prochain concours bientôt",
      noContestSub: "Inscrivez-vous à la newsletter pour être notifiée en avant-première.",
      prizeLabel: "Le lot du mois",
      entryErr: "Erreur lors de la participation.",
      notEligible: "Vous ne répondez pas aux critères pour participer.",
      purchaseHint: (n) => `Requiert ${n} commande${n > 1 ? "s" : ""} livrée${n > 1 ? "s" : ""}. Plus vous avez de commandes, plus vous avez de chances.`,
      photoInstruction: "Partagez une photo de votre produit Latina et récoltez le plus de votes — la participante avec le plus de cœurs remporte le lot !",
      participate: "Participer avec ma photo →",
      photoSelect: "Choisir une photo",
      photoDrop: "ou glissez-déposez ici · JPG, PNG, WEBP · max 5 Mo",
      photoChange: "Changer",
      photoPending: "Photo en cours de vérification ⏳",
      photoApproved: "Participation validée — récoltez des votes ! ✓",
      photoRejected: "Photo non acceptée.",
      photoRetry: "Renvoyer une photo",
      photoRequired: "Veuillez sélectionner une photo.",
      nameRequired: "Veuillez saisir votre prénom.",
      phoneRequired: "Veuillez saisir votre numéro de téléphone.",
      participateTitle: "Participez au concours photo",
      participateDesc: "Partagez votre style Latina et laissez la communauté voter pour vous 🌸",
      namePlaceholder: "Votre prénom",
      phonePlaceholder: "Téléphone (ex: 0550 123 456)",
      submit: "Envoyer ma participation →",
      successTitle: "Participation envoyée !",
      successDesc: "Notre équipe va valider votre photo sous peu. Une fois approuvée, elle apparaîtra dans la galerie pour recevoir des votes.",
      close: "Fermer",
      photoTerms: "Une seule participation par personne · Photo avec le produit Latina visible",
      galleryLabel: "La galerie du concours",
      galleryTitle: "Votez pour votre préférée",
      galleryHint: "Un vote par photo · Cliquez sur le cœur ❤️",
      alreadyTitle: "Participation déjà enregistrée",
      alreadyDesc: "Votre numéro de téléphone est déjà associé à une participation en cours ou validée pour ce concours.",
      tirageRunning: "⚖️ Tirage au sort en cours…",
      tirageDesc: "Plusieurs participantes ont le même nombre de votes. Un tirage au sort est effectué pour désigner la gagnante.",
      tirageWinner: "Gagnante du tirage",
      tirageSkip: "Passer l'animation",
    },
    ar: {
      fidLabel: "الولاء", fidTitle1: "كلما ارتديتِ", fidTitle2: "Latina", fidTitle3: "، كافأتكِ أكثر.",
      fidText: "كل طلب يُحتسب. كل حذاء يقرّبك من تخفيض، هدية، أو ميزة حصرية.",
      fidTeaser: "نقاطكِ في انتظاركِ.", fidTeaserSub: "أنشئي حسابًا مجانيًا وابدأي التراكم من أول طلب.",
      fidCta: "إنشاء حسابي",
      points: "نقطة", balance: "رصيد الولاء", nextTier: "نقطة للوصول إلى",
      tiers: { petal: "🌸 بتلة", lotus: "🪷 لوتس", amber: "🌟 عنبر" },
      loyaltyInfo: "1 نقطة / 100 دج · 10 نقاط = خصم 1 دج",
      conLabel: "المسابقة", conTitle1: "شاركي بصورتك.", conTitle2: "أفضل صورة تفوز.",
      days: "أيام", hrs: "ساعات", min: "دقائق", sec: "ثوانٍ",
      enter: "شاركي الآن →", entering: "جارٍ التسجيل…", entered: "أنتِ مشاركة ✓",
      needAuth: "تسجيل الدخول للمشاركة →",
      entryCount: (n) => `${n} مشاركة هذا الشهر`,
      noContest: "المسابقة القادمة قريبًا",
      noContestSub: "اشتركي في النشرة لتصلكِ أول إشعار.",
      prizeLabel: "جائزة الشهر",
      entryErr: "خطأ أثناء التسجيل.",
      notEligible: "لا تستوفين شروط المشاركة.",
      purchaseHint: (n) => `تتطلب ${n} طلب${n > 1 ? "ات" : ""} مُسلَّم${n > 1 ? "ة" : ""}. كلما زادت طلباتك، زادت فرصك.`,
      photoInstruction: "شاركي بصورة منتجك من Latina واحصلي على أكبر عدد من الأصوات — الفائزة هي من تحصل على أكثر قلوب!",
      participate: "شاركي بصورتي →",
      photoSelect: "اختيار صورة",
      photoDrop: "أو اسحبي وأفلتي هنا",
      photoChange: "تغيير",
      photoPending: "صورتك قيد المراجعة ⏳",
      photoApproved: "تمت الموافقة على مشاركتك — احصلي على أصوات! ✓",
      photoRejected: "لم تُقبل صورتك.",
      photoRetry: "إعادة الإرسال",
      photoRequired: "يرجى اختيار صورة.",
      nameRequired: "يرجى إدخال اسمك.",
      phoneRequired: "يرجى إدخال رقم هاتفك.",
      participateTitle: "شاركي في مسابقة الصور",
      participateDesc: "شاركي أسلوبك مع Latina ودعي المجتمع يصوت لكِ 🌸",
      namePlaceholder: "اسمك",
      phonePlaceholder: "رقم الهاتف",
      submit: "أرسلي مشاركتي →",
      successTitle: "تم إرسال مشاركتك!",
      successDesc: "سيراجع فريقنا صورتك قريبًا. بعد الموافقة، ستظهر في المعرض لتلقي الأصوات.",
      close: "إغلاق",
      photoTerms: "مشاركة واحدة فقط لكل شخص · يجب أن يظهر المنتج من Latina",
      galleryLabel: "معرض المسابقة",
      galleryTitle: "صوتي لمفضلتك",
      galleryHint: "صوت واحد لكل صورة · انقري على القلب ❤️",
      alreadyTitle: "مشاركتك مسجلة مسبقاً",
      alreadyDesc: "رقم هاتفك مرتبط بمشاركة قيد المراجعة أو موافق عليها.",
      tirageRunning: "⚖️ السحب جارٍ…",
      tirageDesc: "عدة مشاركات حصلت على نفس عدد الأصوات. يتم إجراء سحب عشوائي لتحديد الفائزة.",
      tirageWinner: "الفائزة بالسحب",
      tirageSkip: "تخطي الرسوم المتحركة",
    },
    en: {
      fidLabel: "Loyalty", fidTitle1: "The more you wear", fidTitle2: "Latina", fidTitle3: ", the more she thanks you.",
      fidText: "Every order counts. Every pair brings you closer to a discount, a gift, an exclusive perk.",
      fidTeaser: "Your points are waiting.", fidTeaserSub: "Create your free account and start earning from your very first order.",
      fidCta: "Create my account",
      points: "pts", balance: "Loyalty balance", nextTier: "pts to reach",
      tiers: { petal: "🌸 Petal", lotus: "🪷 Lotus", amber: "🌟 Amber" },
      loyaltyInfo: "1 pt per 100 DA · 10 pts = 1 DA off",
      conLabel: "The Contest", conTitle1: "Share your style.", conTitle2: "The best photo wins.",
      days: "Days", hrs: "Hours", min: "Min", sec: "Sec",
      enter: "Enter now →", entering: "Entering…", entered: "You're in ✓",
      needAuth: "Sign in to enter →",
      entryCount: (n) => `${n} entr${n === 1 ? "y" : "ies"} this month`,
      noContest: "Next contest coming soon",
      noContestSub: "Subscribe to our newsletter to be the first to know.",
      prizeLabel: "This month's prize",
      entryErr: "Error, please try again.",
      notEligible: "You don't meet the eligibility criteria.",
      purchaseHint: (n) => `Requires ${n} delivered order${n > 1 ? "s" : ""}. More orders = more chances.`,
      photoInstruction: "Share a photo of your Latina product and collect the most votes — the entry with the most hearts wins!",
      participate: "Enter with my photo →",
      photoSelect: "Choose a photo",
      photoDrop: "or drag & drop here · JPG, PNG, WEBP · max 5 MB",
      photoChange: "Change",
      photoPending: "Photo under review ⏳",
      photoApproved: "Entry approved — collect votes! ✓",
      photoRejected: "Photo not accepted.",
      photoRetry: "Resubmit a photo",
      photoRequired: "Please select a photo.",
      nameRequired: "Please enter your first name.",
      phoneRequired: "Please enter your phone number.",
      participateTitle: "Enter the photo contest",
      participateDesc: "Share your Latina style and let the community vote for you 🌸",
      namePlaceholder: "Your first name",
      phonePlaceholder: "Phone (e.g. 0550 123 456)",
      submit: "Submit my entry →",
      successTitle: "Entry submitted!",
      successDesc: "Our team will review your photo shortly. Once approved, it'll appear in the gallery to receive votes.",
      close: "Close",
      photoTerms: "One entry per person · Latina product must be visible in the photo",
      galleryLabel: "Contest gallery",
      galleryTitle: "Vote for your favourite",
      galleryHint: "One vote per photo · Click the heart ❤️",
      alreadyTitle: "Already entered",
      alreadyDesc: "Your phone number is already linked to a pending or approved entry for this contest.",
      tirageRunning: "⚖️ Drawing in progress…",
      tirageDesc: "Several entries share the top vote count. A random draw is being made to select the winner.",
      tirageWinner: "Draw winner",
      tirageSkip: "Skip animation",
    },
  }[lang] || {};

  const TIER_COLORS = { petal: "#C68B6F", lotus: "#9B59B6", amber: "#F59E0B" };

  /* ── Contest tokens (stable across renders) ─── */
  const voterToken = useRef(_getOrCreate("latina_voter_token")).current;

  const [contests, setContests]             = useState([]);
  const [announcement, setAnnouncement]     = useState(null);
  const [showAnnounce, setShowAnnounce]     = useState(false);
  const [contestLoading, setContestLoading] = useState(true);
  const [localEntries, setLocalEntries]     = useState({});   // { [contestId]: entry }
  const [photoModal, setPhotoModal]         = useState(null); // contest object | null
  const [showTirage, setShowTirage]         = useState(false);
  const [loyalty, setLoyalty]               = useState(null);
  const [loyaltyLoading, setLoyaltyLoading] = useState(false);
  const [refreshTick, setRefreshTick]       = useState(0);

  /* Server is authoritative for entry status.
     - Auth users : backend returns live user_entry from DB.
     - Guests     : backend returns null → always show participate button.
     localEntry is also set optimistically right after a successful submit
     so the UI updates instantly without waiting for next cache refresh. */
  const handleContestData = (res) => {
    setContests(res.contests || []);
    if (res.announcement) {
      setAnnouncement(res.announcement);
      const seenKey   = `winner_seen_${res.announcement.contest_id}_${res.announcement.winner_announced_at}`;
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

  /* Subscribe to global refresh events (tab visibility change, admin action) */
  useEffect(() => {
    const h = () => setRefreshTick(t => t + 1);
    window.addEventListener("latina:refresh", h);
    return () => window.removeEventListener("latina:refresh", h);
  }, []);

  /* Live-poll vote counts every 20 s while any photo contest is active */
  const hasPhotoContest = contests.some(c => c.type === "photo");
  useEffect(() => {
    if (!hasPhotoContest) return;
    const id = setInterval(() => {
      window.latinaApi.invalidateCache("contest:");
      setRefreshTick(t => t + 1);
    }, 20_000);
    return () => clearInterval(id);
  }, [hasPhotoContest]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Re-run whenever auth state changes (login / logout) OR a refresh is triggered */
  useEffect(() => {
    let alive = true;
    if (!user) setLocalEntries({}); // clear optimistic entries immediately on logout
    window.latinaApi.getContest(voterToken)
      .then(res  => { if (alive) handleContestData(res); })
      .catch(() => {})
      .finally(() => { if (alive) setContestLoading(false); });
    return () => { alive = false; };
  }, [user?.id ?? null, refreshTick]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!user) { setLoyalty(null); return; }
    setLoyaltyLoading(true);
    window.latinaApi.getLoyalty()
      .then(r => setLoyalty(r.data || r))
      .catch(() => {})
      .finally(() => setLoyaltyLoading(false));
  }, [user]);

  const tierPct = loyalty ? Math.min(100, loyalty.tier_progress?.pct || 0) : 0;

  const handleDismissAnnounce = () => {
    setShowAnnounce(false);
    if (announcement) {
      const key = `winner_seen_${announcement.contest_id}_${announcement.winner_announced_at}`;
      localStorage.setItem(key, "1");
    }
  };

  /* Called when tirage animation finishes — mark it done, then show winner overlay */
  const handleTirageComplete = () => {
    if (announcement) localStorage.setItem(`tirage_done_${announcement.contest_id}`, "1");
    setShowTirage(false);
    setShowAnnounce(true);
  };

  const handleParticipateSuccess = (entry, contestId) => {
    setLocalEntries(prev => ({ ...prev, [contestId]: entry }));
    setPhotoModal(null);
  };

  const handleVote = useCallback((entryId, contestId) => {
    setContests(prev => prev.map(c =>
      c.id === contestId
        ? { ...c, voted_ids: [...(c.voted_ids || []), entryId] }
        : c
    ));
  }, []);

  return (
    <section ref={sceneRef} className="scene scene-rewards" id="fidelite" data-screen-label="05 Rewards">
      {showTirage && announcement?.was_tie && (
        <TirageAnimation announcement={announcement} onComplete={handleTirageComplete} T={T} />
      )}

      {showAnnounce && announcement && (
        <WinnerAnnouncement announcement={announcement} lang={lang} onClose={handleDismissAnnounce} />
      )}

      {photoModal && (
        <PhotoParticipateModal
          contest={photoModal}
          participationToken={_getOrCreate(`latina_part_${photoModal.id}`)}
          user={user}
          onClose={() => setPhotoModal(null)}
          onSuccess={(entry) => handleParticipateSuccess(entry, photoModal.id)}
          T={T}
        />
      )}

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

          {/* ── Contest column (one or more active contests) ── */}
          <div className="concours-column" id="concours">
            {contestLoading ? (
              <div className="concours-card reveal">
                <span className="label">{T.conLabel}</span>
                <h3>{T.conTitle1}<br /><em>{T.conTitle2}</em></h3>
                <div style={{ paddingTop: 24 }}>
                  <div className="loyalty-skeleton" />
                  <div className="loyalty-skeleton" style={{ width: "70%", marginTop: 8 }} />
                  <div className="loyalty-skeleton" style={{ width: "45%", marginTop: 8 }} />
                </div>
              </div>
            ) : contests.length === 0 ? (
              <div className="concours-card reveal">
                <span className="label">{T.conLabel}</span>
                <h3>{T.conTitle1}<br /><em>{T.conTitle2}</em></h3>
                <div className="no-contest">
                  <div className="no-contest-icon">🎁</div>
                  <p className="no-contest-title">{T.noContest}</p>
                  <p style={{ fontSize: 13, color: "var(--ink-soft)", marginTop: 6 }}>{T.noContestSub}</p>
                </div>
              </div>
            ) : contests.map((contest, idx) => {
              const localEntry = localEntries[contest.id] || contest.user_entry;
              return (
                <div key={contest.id} className="concours-card reveal">
                  {idx === 0 && <span className="label">{T.conLabel}</span>}
                  {idx === 0 && <h3>{T.conTitle1}<br /><em>{T.conTitle2}</em></h3>}
                  {contest.type === "photo" ? (
                    <PhotoContestCard
                      contest={contest}
                      entryCount={contest.entries_count}
                      localEntry={localEntry}
                      onParticipate={() => setPhotoModal(contest)}
                      T={T}
                    />
                  ) : (
                    <ContestCard
                      contest={contest}
                      entryCount={contest.entries_count}
                      entered={false}
                      user={user}
                      onOpenAuth={onOpenAuth}
                      T={T}
                    />
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Photo galleries (full width below grid, one per photo contest) ── */}
        {contests.filter(c => c.type === "photo").map(contest => (
          <PhotoGallery
            key={contest.id}
            gallery={contest.gallery || []}
            votedIds={contest.voted_ids || []}
            voterToken={voterToken}
            user={user}
            onOpenAuth={onOpenAuth}
            onVote={(entryId) => handleVote(entryId, contest.id)}
            T={T}
          />
        ))}
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
        { icon: <IconTruck width={28} height={28} />, h: "Livraison 69 wilayas", p: "De Tamanrasset à Annaba, partout en Algérie. Délais affichés à la commande." },
        { icon: <IconCash width={28} height={28} />, h: "Paiement à la livraison", p: "Vous payez quand vous recevez. Vous voyez avant de décider." },
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
        { icon: <IconTruck width={28} height={28} />, h: "توصيل 69 ولاية", p: "من تمنراست إلى عنابة. كل المدد معروضة عند الطلب." },
        { icon: <IconCash width={28} height={28} />, h: "الدفع عند الاستلام", p: "تدفعين عند الاستلام. ترين قبل أن تقرري." },
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
        { icon: <IconTruck width={28} height={28} />, h: "All 69 wilayas", p: "From Tamanrasset to Annaba — Algeria-wide. ETA shown at checkout." },
        { icon: <IconCash width={28} height={28} />, h: "Cash on delivery", p: "Pay when you receive. See before you decide." },
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
        <SceneMarker num="06" label="Trust" meta="69 WILAYAS · COD" />
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

/* ============================================================
   STORY SCENE — 22 years of Latina
   ============================================================ */
const StoryScene = ({ lang }) => {
  const sceneRef  = useRef(null);
  const numberRef = useRef(null);
  const [counted, setCounted] = useState(false);
  useSceneProgress(sceneRef);

  /* Reset counted when language changes so the counter can re-run */
  useEffect(() => { setCounted(false); }, [lang]);

  /* Count 0 → 22 when the number enters view */
  useEffect(() => {
    const el = numberRef.current;
    if (!el || counted) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setCounted(true);
      obs.disconnect();
      let startTs = null;
      const duration = 1600;
      const easeOut = t => 1 - Math.pow(1 - t, 3);
      const tick = ts => {
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

  /* Slide-in each chapter from its side as it enters the viewport.
     Re-runs on lang change because new DOM nodes are created on re-render. */
  useEffect(() => {
    const chapters = sceneRef.current?.querySelectorAll('.story-chapter');
    if (!chapters?.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -60px 0px" });
    chapters.forEach(c => obs.observe(c));
    return () => obs.disconnect();
  }, [lang]);

  const t = {
    fr: {
      label: "Notre histoire",
      yearsLabel: "ANS",
      sub: "de mode algéroise — une boutique qui a tenu ses promesses.",
      chapters: [
        { year: "2003",              side: "left",  accent: "Une femme. Une vision.", body: "Un samedi matin à Alger, la première vitrine a ouvert ses portes. Pas de publicité, pas de budget — juste une obsession pour la qualité et un bouche-à-oreille qui s'est embrasé dans tout le quartier." },
        { year: "Les premières années", side: "right", accent: "Chaque cliente connue par son prénom.", body: "On choisissait à la main, on emballait avec soin. Chaque pièce avait une histoire. Les clientes revenaient — pas seulement pour les chaussures, mais pour l'expérience." },
        { year: "La boîte signature", side: "left", accent: "Parce qu'une belle pièce mérite une belle première impression.", body: "La boîte Latina est née de ce principe simple. Reconnaissable entre mille. Aujourd'hui, nos clientes la gardent longtemps après avoir usé les chaussures." },
        { year: "69 wilayas",        side: "right", accent: "D'Alger à Tamanrasset.", body: "Ce qui a commencé dans une rue d'Alger traverse aujourd'hui tout le pays. La même sélection, le même emballage, la même promesse — peu importe où vous êtes." },
        { year: "Aujourd'hui",       side: "left",  accent: "22 ans plus tard — toujours la même promesse.", body: "Des milliers de femmes à travers l'Algérie. Des milliers de boîtes ouvertes avec sourire. Et une boutique qui n'a jamais arrêté de choisir avec soin, pour vous." },
      ]
    },
    ar: {
      label: "قصّتنا",
      yearsLabel: "سنة",
      sub: "من الموضة الجزائرية — متجر وفى بكلمته.",
      chapters: [
        { year: "2003",             side: "right", accent: "امرأة واحدة. رؤية واحدة.", body: "صباح سبت في الجزائر العاصمة، فُتحت أول واجهة. لا إعلانات، لا ميزانية — فقط هوس بالجودة وكلمة شفهية اشتعلت وانتشرت في كل الحي." },
        { year: "السنوات الأولى",  side: "left",  accent: "كل زبونة تُعرف باسمها.", body: "كنّا نختار باليد ونُغلّف باهتمام. كل قطعة لها قصّة. الزبونات عُدن — ليس فقط للأحذية، بل للتجربة بأكملها." },
        { year: "العلبة الخاصة",  side: "right", accent: "لأن القطعة الجميلة تستحق انطباعاً أول لا يُنسى.", body: "وُلدت علبة Latina من هذا المبدأ البسيط. لا تُنسى. اليوم، تُبقي عليها زبوناتنا طويلاً بعد أن تبلى الأحذية." },
        { year: "69 ولاية",        side: "left",  accent: "من الجزائر إلى تمنراست.", body: "ما بدأ في شارع بالجزائر العاصمة يعبر اليوم كل البلاد. نفس الاختيار، نفس التغليف، نفس الوعد — أينما كنتِ." },
        { year: "اليوم",           side: "right", accent: ".22 عاماً لاحقاً — نفس الوعد دائماً", body: "آلاف النساء عبر الجزائر. آلاف العلب فُتحت بابتسامة. ومتجر لم يتوقف عن الاختيار بعناية، من أجلك أنتِ." },
      ]
    },
    en: {
      label: "Our Story",
      yearsLabel: "YEARS",
      sub: "of Algerian fashion — a boutique that kept its word.",
      chapters: [
        { year: "2003",              side: "left",  accent: "One woman. One vision.", body: "A Saturday morning in Algiers, the first window opened. No advertising, no budget — just an obsession with quality and a word-of-mouth that caught fire across the entire neighbourhood." },
        { year: "The early years",   side: "right", accent: "Every customer known by her first name.", body: "We hand-picked everything, wrapped with care. Every piece came with a story. Customers came back — not just for the shoes, but for the experience." },
        { year: "The signature box", side: "left",  accent: "Because a beautiful piece deserves a beautiful first impression.", body: "The Latina box was born from this simple principle. Unmistakable. Today, our customers keep it long after the shoes are worn out." },
        { year: "69 wilayas",        side: "right", accent: "From Algiers to Tamanrasset.", body: "What started in one Algiers street now crosses the entire country. Same curation, same packaging, same promise — wherever you are." },
        { year: "Today",             side: "left",  accent: "22 years later — the same promise.", body: "Thousands of women across Algeria. Thousands of boxes opened with a smile. A boutique that never stopped choosing with care, for you." },
      ]
    }
  }[lang];

  return (
    <section ref={sceneRef} className="scene scene-story" id="our-story" data-screen-label="05b Story">
      <div className="story-inner">

        {/* ── Cinematic header ── */}
        <div className="story-header reveal">
          <div className="label" style={{ color: "var(--rose-400)", marginBottom: 28 }}>{t.label}</div>
          <div className="story-hero-count">
            <span ref={numberRef} className="story-big-number">0</span>
            <span className="story-years-badge">{t.yearsLabel}</span>
          </div>
          <p className="story-sub">{t.sub}</p>
        </div>

        {/* ── Timeline ── */}
        <div className="story-timeline">
          <div className="story-vline" />
          {t.chapters.map((ch, i) => (
            <div key={i} className={`story-chapter story-chapter--${ch.side}`}>
              <div className="story-dot" />
              <div className="story-chapter-inner">
                <div className="story-chapter-year">{ch.year}</div>
                <h3 className="story-chapter-accent">"{ch.accent}"</h3>
                <p className="story-chapter-body">{ch.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

Object.assign(window, { RewardsScene, TrustScene, StoryScene, Footer });
