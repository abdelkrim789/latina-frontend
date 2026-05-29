/* global window */
/* ============================================================
   Latina API Client

   Caching architecture (2 layers):

   L1 — In-memory Map (nanosecond reads, wiped on page refresh)
   L2 — sessionStorage (survives React re-mounts, wiped when tab closes)

   Flow for every cached GET:
     1. L1 hit?  → return immediately, zero network.
     2. L2 hit?  → return, re-warm L1 for next call.
     3. In-flight? → same Promise already running, piggyback it.
     4. Miss      → fetch, write L1 + L2, resolve all waiters.

   User-scoped keys:
     Auth-sensitive data (orders, loyalty, wishlist, profile) is keyed
     with a token fingerprint so user A's data is never served to user B
     even if they share the same browser tab.

   Invalidation:
     Write operations (POST/PUT/DELETE) call invalidate() on the
     relevant key prefixes so the next read re-fetches fresh data.

   Block detection (app.jsx):
     getMe() is intentionally NOT cached — it is the authoritative
     check used to detect if the admin has blocked the account.
   ============================================================ */

const API_BASE = window.LATINA_API_BASE || "http://localhost:8000/api";

const api = (() => {

  /* ── Token storage ─────────────────────────────────────── */
  const getToken      = ()  => localStorage.getItem("latina-token");
  const setToken      = (t) => localStorage.setItem("latina-token", t);
  const clearToken    = ()  => localStorage.removeItem("latina-token");
  const getAdminToken = ()  => localStorage.getItem("latina-admin-token");
  const setAdminToken = (t) => localStorage.setItem("latina-admin-token", t);

  /* ── TTL constants (ms) ─────────────────────────────────── */
  const TTL = {
    GEO:      24 * 3600_000, // wilayas, communes      — static data
    SHIPPING:  5 *   60_000, // shipping rates          — can change with promos
    PRODUCTS:  2 *   60_000, // product list            — balanced freshness vs. load
    PRODUCT:   5 *   60_000, // single product detail
    CATEGORY: 30 *   60_000, // categories
    REVIEW:    1 *   60_000, // review list
    CONTEST:          30_000, // current contest state
    PROFILE:   2 *   60_000, // user profile (name, tier, points)
    ORDERS:         30_000,  // order history — short so new orders appear quickly
    LOYALTY:   2 *   60_000, // loyalty balance + history
    WISHLIST:  2 *   60_000, // wishlist items
  };

  /* ── L1: in-memory cache ────────────────────────────────── */
  const _mem    = new Map(); // cacheKey -> { data, exp }

  /* ── L2: sessionStorage cache ───────────────────────────── */
  const SS_PREFIX = "lat:";

  const _ss = {
    get(key) {
      try {
        const raw = sessionStorage.getItem(SS_PREFIX + key);
        if (!raw) return null;
        const { data, exp } = JSON.parse(raw);
        if (Date.now() > exp) { sessionStorage.removeItem(SS_PREFIX + key); return null; }
        return data;
      } catch { return null; }
    },
    set(key, data, exp) {
      try {
        sessionStorage.setItem(SS_PREFIX + key, JSON.stringify({ data, exp }));
      } catch { /* sessionStorage full or disabled — L1 still works */ }
    },
    del(prefix) {
      try {
        const toRemove = [];
        for (let i = 0; i < sessionStorage.length; i++) {
          const k = sessionStorage.key(i);
          if (k && k.startsWith(SS_PREFIX + prefix)) toRemove.push(k);
        }
        toRemove.forEach(k => sessionStorage.removeItem(k));
      } catch {}
    },
  };

  /* ── In-flight deduplication ────────────────────────────── */
  const _flight = new Map(); // cacheKey -> Promise<data>

  /**
   * Returns a short fingerprint of the current user's token.
   * Used to namespace user-specific cache keys so switching accounts
   * never serves stale data from the previous session.
   */
  const _userNs = () => {
    const t = getToken();
    return t ? `u${t.slice(-8)}:` : "anon:";
  };

  /**
   * cached(key, fetcher, ttlMs, userScoped?)
   *
   * @param {string}   key        — cache key (will be prefixed with user namespace if scoped)
   * @param {Function} fetcher    — () => Promise<data>
   * @param {number}   ttlMs      — time-to-live in ms
   * @param {boolean}  userScoped — if true, key is namespaced per logged-in user
   */
  const cached = (key, fetcher, ttlMs, userScoped = false) => {
    const ckey = userScoped ? `${_userNs()}${key}` : key;
    const now  = Date.now();

    // L1 hit
    const memHit = _mem.get(ckey);
    if (memHit && now < memHit.exp) return Promise.resolve(memHit.data);

    // L2 hit → re-warm L1 and return
    const ssHit = _ss.get(ckey);
    if (ssHit !== null) {
      _mem.set(ckey, { data: ssHit, exp: now + ttlMs });
      return Promise.resolve(ssHit);
    }

    // In-flight dedup — avoid duplicate network requests
    if (_flight.has(ckey)) return _flight.get(ckey);

    const p = fetcher()
      .then(data => {
        const exp = Date.now() + ttlMs;
        _mem.set(ckey, { data, exp });
        _ss.set(ckey, data, exp);
        _flight.delete(ckey);
        return data;
      })
      .catch(err => {
        _flight.delete(ckey);
        throw err;
      });

    _flight.set(ckey, p);
    return p;
  };

  /**
   * invalidate(...prefixes)
   * Removes all L1 and L2 entries whose keys start with any given prefix.
   */
  const invalidate = (...prefixes) => {
    for (const k of _mem.keys()) {
      if (prefixes.some(p => k.startsWith(p))) _mem.delete(k);
    }
    for (const prefix of prefixes) _ss.del(prefix);
  };

  /** Wipe everything belonging to the current user — called on logout. */
  const _invalidateUser = () => invalidate(_userNs(), "anon:");

  /* ── Core fetch ─────────────────────────────────────────── */
  async function req(method, path, body = null, token = null) {
    const headers = { "Content-Type": "application/json", "Accept": "application/json" };
    const t = token || getToken();
    if (t) headers["Authorization"] = `Bearer ${t}`;
    headers["X-Lang"] = document.documentElement.lang || "fr";
    if (API_BASE.includes("ngrok")) headers["ngrok-skip-browser-warning"] = "true";

    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(`${API_BASE}${path}`, opts);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const err = new Error(data.message || data.error || "Request failed");
      err.status = res.status;
      err.data   = data;

      /* 401 on any customer route → token expired or account blocked.
         Fire a global event; App.jsx listener cleans up the session. */
      if (res.status === 401 && !path.startsWith("/admin")) {
        window.dispatchEvent(new CustomEvent("latina:auth-fail", { detail: { reason: data.message } }));
      }

      throw err;
    }
    return data;
  }

  const get  = (path, token)       => req("GET",    path, null, token);
  const post = (path, body, token)  => req("POST",   path, body, token);
  const put  = (path, body, token)  => req("PUT",    path, body, token);
  const del  = (path, token)        => req("DELETE", path, null, token);

  /* ── Geography — static data, very long TTL ─────────────── */
  const getWilayas      = ()     => cached("wilayas",          () => get("/wilayas"),                  TTL.GEO);
  const getCommunes     = (code) => cached(`communes:${code}`, () => get(`/wilayas/${code}/communes`), TTL.GEO);
  const getShippingRate = (code) => cached(`shipping:${code}`, () => get(`/shipping/${code}`),         TTL.SHIPPING);

  /* ── Catalogue — public, short-to-medium TTL ────────────── */
  const getProducts = (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return cached(`products:${qs}`, () => get(`/products${qs ? "?" + qs : ""}`), TTL.PRODUCTS);
  };
  const getProduct    = (slug) => cached(`product:${slug}`, () => get(`/products/${slug}`),       TTL.PRODUCT);
  const getRelated    = (id)   => cached(`related:${id}`,   () => get(`/products/${id}/related`), TTL.PRODUCTS);
  const getCategories = ()     => cached("categories",       () => get("/categories"),             TTL.CATEGORY);
  const getReviews    = (pid)  => cached(`reviews:${pid}`,  () => get(`/reviews/${pid}`),         TTL.REVIEW);
  const getPacks      = () => cached("packs", () => get("/packs"), 2 * 60_000);

  const getContest    = (voterToken = null) => {
    const qs   = voterToken ? `?voter_token=${encodeURIComponent(voterToken)}` : "";
    const ckey = `contest:${voterToken || "anon"}`;
    return cached(ckey, () => get(`/contest/current${qs}`), TTL.CONTEST);
  };

  /* ── Auth ───────────────────────────────────────────────── */
  const register = async (data) => {
    const res = await post("/auth/register", data);
    setToken(res.access_token);
    _invalidateUser(); // clear any anon cache
    return res;
  };

  const login = async ({ login: loginId, password } = {}) => {
    const res = await post("/auth/login", { login: loginId, password });
    setToken(res.access_token);
    _invalidateUser();
    invalidate("contest:"); // re-fetch contest with auth so user_entry is returned
    return res;
  };

  const loginGoogle = async (credential) => {
    const res = await post("/auth/google", { credential });
    setToken(res.access_token);
    _invalidateUser();
    invalidate("contest:");
    return res;
  };

  const logout = async (providedToken) => {
    const tok = providedToken || getToken(); // capture before anything clears it
    clearToken();
    _invalidateUser();
    invalidate("contest:");
    _dispatchRefresh(); // notify RewardsScene to re-fetch immediately
    try { await post("/auth/logout", null, tok); } catch {}
  };

  /**
   * getMe() — ALWAYS bypasses cache.
   * Used by App.jsx for block detection: we must get the live is_active
   * value from the server, never a cached copy.
   *
   * For showing profile data in the UI, use getProfile() instead.
   */
  const getMe = () => get("/auth/me");
  const updateProfile        = (data)           => req("PATCH", "/auth/me", data, getToken());
  const cancelRegistration   = async ()         => {
    // Deletes an incomplete Google account (no phone set yet). Logs out locally too.
    try { await req("DELETE", "/auth/cancel-registration", null, getToken()); } catch {}
    clearToken(); _invalidateUser();
  };
  const resendVerification   = ()               => req("POST", "/auth/email/resend", null, getToken());
  const forgotPassword       = (email)          => req("POST", "/auth/password/forgot", { email });
  const resetPassword        = (data)           => req("POST", "/auth/password/reset", data);

  /**
   * getProfile() — cached version of /auth/me.
   * Use this when you only need to display profile info (name, tier, points)
   * and don't need to verify account status.
   */
  const getProfile = () => cached("profile", () => get("/auth/me"), TTL.PROFILE, true);

  /* ── User-scoped data — all cached, user-namespaced ─────── */

  /** Order history — short TTL so a freshly placed order shows up quickly. */
  const getOrders  = ()    => cached("orders",       () => get("/orders"),      TTL.ORDERS, true);
  const getOrder   = (id)  => cached(`order:${id}`,  () => get(`/orders/${id}`),TTL.ORDERS, true);
  const trackOrder = (ref) => get(`/orders/track/${ref}`); // tracking always fresh

  const placeOrder = async (data, idempotencyKey = null) => {
    const token = getToken();
    const headers = { "Content-Type": "application/json", "Accept": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
    headers["X-Lang"] = document.documentElement.lang || "fr";
    if (API_BASE.includes("ngrok")) headers["ngrok-skip-browser-warning"] = "true";

    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST", headers, body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = json.message
        || (json.errors ? Object.values(json.errors).flat().join(" ") : null)
        || "Erreur lors de la commande";
      const err = new Error(msg);
      err.status = res.status; err.data = json;
      throw err;
    }
    // Invalidate order cache so AccountPage immediately shows the new order
    invalidate(`${_userNs()}orders`);
    return json;
  };

  /** Wishlist — cached; invalidated on toggle/sync. */
  const getWishlist = ()      => cached("wishlist", () => get("/wishlist"), TTL.WISHLIST, true);
  const toggleWishlist = (pid) => {
    invalidate(`${_userNs()}wishlist`);
    return post("/wishlist/toggle", { product_id: pid });
  };
  const syncWishlist = (skus) => {
    invalidate(`${_userNs()}wishlist`);
    return post("/wishlist/sync", { skus });
  };

  /** Loyalty balance + history — cached. */
  const getLoyalty = () => cached("loyalty", () => get("/loyalty"), TTL.LOYALTY, true);

  /* ── Feedback & Support ─────────────────────────────────── */
  const submitFeedback = (data)  => post("/feedback", data);
  const createTicket   = (data)  => { invalidate(`${_userNs()}my-tickets`); return post("/support/tickets", data); };
  const trackTicket    = (ref)   => get(`/support/tickets/track/${encodeURIComponent(ref)}`);
  const getMyTickets   = ()      => cached("my-tickets", () => get("/support/tickets/mine"), TTL.ORDERS, true);

  const restockAlert       = (data)      => post("/restock-alerts", data);
  const submitReview       = (pid, data) => { invalidate(`reviews:${pid}`); return post(`/reviews/${pid}`, data); };
  const checkCoupon        = (code)      => get(`/coupons/check?code=${encodeURIComponent(code)}`);
  const enterContest = () => { invalidate("contest:"); return post("/contest/enter"); };

  const enterContestPhoto = (file, guestName, guestPhone, participationToken) => {
    invalidate("contest:");
    const fd = new FormData();
    fd.append("photo", file);
    if (guestName)          fd.append("guest_name", guestName);
    if (guestPhone)         fd.append("guest_phone", guestPhone);
    if (participationToken) fd.append("participation_token", participationToken);
    const headers = { "Accept": "application/json" };
    const t = getToken();
    if (t) headers["Authorization"] = `Bearer ${t}`;
    headers["X-Lang"] = document.documentElement.lang || "fr";
    if (API_BASE.includes("ngrok")) headers["ngrok-skip-browser-warning"] = "true";
    return fetch(`${API_BASE}/contest/enter`, { method: "POST", headers, body: fd })
      .then(async r => {
        const data = await r.json().catch(() => ({}));
        if (!r.ok) { const e = new Error(data.message || "Erreur"); e.status = r.status; e.data = data; throw e; }
        return data;
      });
  };

  const voteContestEntry = (entryId, voterToken) => {
    invalidate("contest:");
    return post(`/contest/entries/${entryId}/vote`, { voter_token: voterToken });
  };
  const subscribeNewsletter = (email)    => post("/newsletter", { email });

  /* ── Reservations ──────────────────────────────────────── */
  const createReservation  = (data) => { invalidate("reservations:"); return post("/reservations", data); };
  const getMyReservations  = ()     => cached("reservations:mine", () => get("/reservations"), TTL.ORDERS, true);
  const cancelReservation  = (id)   => { invalidate("reservations:"); return req("DELETE", `/reservations/${id}`, null, getToken()); };
  const getPublicConfig    = ()     => cached("config", () => get("/config"), 60 * 60_000);
  const getNotifications   = ()     => req("GET", "/notifications", null, getToken());
  const markNotifRead      = (id)   => req("POST", `/notifications/${id}/read`, null, getToken());
  const markAllNotifsRead  = ()     => req("POST", "/notifications/read-all", null, getToken());

  /* ── Admin ──────────────────────────────────────────────── */
  const adminLogin = async (email, password) => {
    const res = await post("/admin/login", { email, password });
    setAdminToken(res.access_token);
    return res;
  };

  const adminReq = (method, path, body = null) => req(method, path, body, getAdminToken());

  /* ── Live refresh — visibility-based auto-sync ──────────── */
  //
  // Dispatches "latina:refresh" so mounted React components can
  // re-run their data-fetching effects without a page reload.
  //
  // Rules:
  //   - Only fires when the tab was hidden for ≥ 30 s (ignores quick
  //     alt-tab flickers that don't warrant a network round-trip).
  //   - Components subscribe via window.addEventListener("latina:refresh", …)
  //     and increment a local refreshTick to trigger their useEffect.
  //
  const _dispatchRefresh = (...prefixes) => {
    invalidate(...prefixes.length ? prefixes : ["contest:", "products:", "orders:", "loyalty:", "wishlist:", "reviews:", _userNs()]);
    window.dispatchEvent(new CustomEvent("latina:refresh", {
      detail: { prefixes, ts: Date.now() },
    }));
  };

  if (typeof document !== "undefined") {
    let _hiddenAt = 0;
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        _hiddenAt = Date.now();
      } else if (Date.now() - _hiddenAt > 30_000) {
        // Tab was away for 30+ seconds — data may be stale
        _dispatchRefresh();
      }
    });
  }

  /* ── Public API ─────────────────────────────────────────── */
  return {
    // geo
    getWilayas, getCommunes, getShippingRate,
    // catalogue
    getProducts, getProduct, getRelated, getCategories, getReviews, getPacks, getContest,
    // auth
    register, login, loginGoogle, logout,
    getMe, updateProfile, cancelRegistration, resendVerification, forgotPassword, resetPassword, getProfile,
    // customer
    getOrders, getOrder, trackOrder, placeOrder,
    getWishlist, toggleWishlist, syncWishlist,
    getLoyalty, restockAlert, submitReview,
    checkCoupon, enterContest, enterContestPhoto, voteContestEntry, subscribeNewsletter,
    submitFeedback, createTicket, trackTicket, getMyTickets,
    createReservation, getMyReservations, cancelReservation, getPublicConfig,
    getNotifications, markNotifRead, markAllNotifsRead,
    // admin
    adminLogin,
    admin: {
      get:    (path)       => adminReq("GET",    `/admin${path}`),
      post:   (path, body) => adminReq("POST",   `/admin${path}`, body),
      put:    (path, body) => adminReq("PUT",    `/admin${path}`, body),
      delete: (path)       => adminReq("DELETE", `/admin${path}`),
    },
    // utils
    getToken,
    isLoggedIn: () => !!getToken(),
    /**
     * invalidateCache(...prefixes)
     * Call from the admin panel after mutations that affect the storefront.
     * e.g. after updating a product: window.latinaApi.invalidateCache("products:")
     */
    invalidateCache: invalidate,
    /**
     * refresh(...prefixes)
     * Force-invalidate the given cache prefixes and signal all mounted
     * components to re-fetch. Called with no args = refresh everything.
     */
    refresh: _dispatchRefresh,
  };
})();

/**
 * mediaUrl(url)
 * Rewrites localhost/loopback image URLs to use the current page's origin.
 * Fixes mixed-content errors when the storefront is served over HTTPS
 * (e.g. via ngrok) but image URLs in the DB still point to http://localhost.
 */
window.mediaUrl = (url) => {
  if (!url || typeof url !== "string") return url;
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/.test(url)) {
    try {
      const p = new URL(url);
      return window.location.origin + p.pathname + p.search + p.hash;
    } catch { return url; }
  }
  return url;
};

window.latinaApi = api;
window.LATINA_API_BASE = API_BASE;
