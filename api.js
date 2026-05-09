/* global window */
/* ============================================================
   Latina API Client — connects frontend to Laravel backend
   Base URL: http://localhost:8000/api
   ============================================================ */

const API_BASE = "http://localhost:8000/api";

const api = (() => {
  // Token storage
  const getToken  = ()      => localStorage.getItem("latina-token");
  const setToken  = (t)     => localStorage.setItem("latina-token", t);
  const clearToken = ()     => localStorage.removeItem("latina-token");

  const getAdminToken  = () => localStorage.getItem("latina-admin-token");
  const setAdminToken  = (t)=> localStorage.setItem("latina-admin-token", t);

  // Core fetch
  async function req(method, path, body = null, token = null) {
    const headers = { "Content-Type": "application/json", "Accept": "application/json" };
    const t = token || getToken();
    if (t) headers["Authorization"] = `Bearer ${t}`;

    const lang = document.documentElement.lang || "fr";
    headers["X-Lang"] = lang;

    const opts = { method, headers };
    if (body) opts.body = JSON.stringify(body);

    const res = await fetch(`${API_BASE}${path}`, opts);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      const err = new Error(data.message || data.error || "Request failed");
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  }

  const get  = (path, token) => req("GET",    path, null, token);
  const post = (path, body, token) => req("POST",   path, body, token);
  const put  = (path, body, token) => req("PUT",    path, body, token);
  const del  = (path, token) => req("DELETE", path, null, token);

  // ── Geography ─────────────────────────────────────────────────
  const getWilayas      = ()     => get("/wilayas");
  const getCommunes     = (code) => get(`/wilayas/${code}/communes`);
  const getShippingRate = (code) => get(`/shipping/${code}`);

  // ── Products ──────────────────────────────────────────────────
  const getProducts     = (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return get(`/products${qs ? "?" + qs : ""}`);
  };
  const getProduct      = (slug) => get(`/products/${slug}`);
  const getRelated      = (id)   => get(`/products/${id}/related`);
  const getCategories   = ()     => get("/categories");
  const getReviews      = (pid)  => get(`/reviews/${pid}`);
  const getContest      = ()     => get("/contest/current");

  // ── Auth ──────────────────────────────────────────────────────
  const register = async (data) => {
    const res = await post("/auth/register", data);
    setToken(res.access_token);
    return res;
  };

  const login = async ({ login, password } = {}) => {
    const res = await post("/auth/login", { login, password });
    setToken(res.access_token);
    return res;
  };

  const logout = async () => {
    try { await post("/auth/logout"); } catch {}
    clearToken();
  };

  const getMe = () => get("/auth/me");

  // ── Customer actions ──────────────────────────────────────────
  const getOrders   = ()    => get("/orders");
  const getOrder    = (id)  => get(`/orders/${id}`);
  const trackOrder  = (ref) => get(`/orders/track/${ref}`);

  const placeOrder  = async (data, idempotencyKey = null) => {
    const token = getToken();
    const headers = { "Content-Type": "application/json", "Accept": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (idempotencyKey) headers["Idempotency-Key"] = idempotencyKey;
    const res = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = json.message || (json.errors ? Object.values(json.errors).flat().join(" ") : null) || "Erreur lors de la commande";
      const err = new Error(msg);
      err.status = res.status;
      err.data = json;
      throw err;
    }
    return json;
  };

  const getWishlist     = ()         => get("/wishlist");
  const toggleWishlist  = (pid)      => post("/wishlist/toggle", { product_id: pid });
  const syncWishlist    = (skus)     => post("/wishlist/sync", { skus });

  const getLoyalty      = ()         => get("/loyalty");
  const restockAlert    = (data)     => post("/restock-alerts", data);
  const submitReview    = (pid, data)=> post(`/reviews/${pid}`, data);

  // ── Admin ─────────────────────────────────────────────────────
  const adminLogin  = async (email, password) => {
    const res = await post("/admin/login", { email, password });
    setAdminToken(res.access_token);
    return res;
  };

  const adminReq = (method, path, body = null) => req(method, path, body, getAdminToken());

  return {
    // geo
    getWilayas, getCommunes, getShippingRate,
    // catalog
    getProducts, getProduct, getRelated, getCategories, getReviews, getContest,
    // auth
    register, login, logout, getMe,
    // customer
    getOrders, getOrder, trackOrder, placeOrder,
    getWishlist, toggleWishlist, syncWishlist,
    getLoyalty, restockAlert, submitReview,
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
  };
})();

window.latinaApi = api;
window.LATINA_API_BASE = API_BASE;
