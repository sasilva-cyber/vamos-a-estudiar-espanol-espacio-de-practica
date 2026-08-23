/* Estatísticas internas do site via Supabase. Não coleta IP, e-mail nem user-agent bruto. */
(function () {
  if (window.__VAE_INTERNAL_ANALYTICS__) return;
  window.__VAE_INTERNAL_ANALYTICS__ = true;

  const PROJECT_URL = "https://clfwoywzalttkvhstsgh.supabase.co";
  const PUBLISHABLE_KEY = "sb_publishable_QylDT7fw_RktIiSApbHkLA_w6PHRjmH";
  const RPC_URL = `${PROJECT_URL}/rest/v1/rpc/record_site_pageview`;
  const REPOSITORY_PATH = "/vamos-a-estudiar-espanol-espacio-de-practica";
  const host = location.hostname.toLowerCase();

  if (host !== "pratica.vamosaestudiarespanol.com.br" && !host.endsWith(".github.io")) return;

  function uuid() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  function storedId(storage, key) {
    try {
      const current = storage.getItem(key);
      if (/^[0-9a-f-]{36}$/i.test(current || "")) return current;
      const value = uuid();
      storage.setItem(key, value);
      return value;
    } catch (_) {
      return uuid();
    }
  }

  const visitorId = storedId(localStorage, "vae_analytics_visitor_v1");
  const sessionId = storedId(sessionStorage, "vae_analytics_session_v1");

  function externalReferrer() {
    try {
      if (!document.referrer) return { host: "", source: "Direto" };
      const ref = new URL(document.referrer);
      const refHost = ref.hostname.toLowerCase().replace(/^www\./, "");
      const currentHost = location.hostname.toLowerCase().replace(/^www\./, "");
      if (!refHost || refHost === currentHost) return { host: "", source: "Direto" };
      if (refHost.includes("google.")) return { host: refHost, source: "Google" };
      if (refHost.includes("bing.com")) return { host: refHost, source: "Bing" };
      if (refHost.includes("instagram.com") || refHost.includes("l.instagram.com")) return { host: refHost, source: "Instagram" };
      if (refHost.includes("facebook.com") || refHost.includes("fb.com")) return { host: refHost, source: "Facebook" };
      if (refHost.includes("youtube.com") || refHost.includes("youtu.be")) return { host: refHost, source: "YouTube" };
      if (refHost.includes("tiktok.com")) return { host: refHost, source: "TikTok" };
      if (refHost.includes("whatsapp.com") || refHost.includes("wa.me")) return { host: refHost, source: "WhatsApp" };
      return { host: refHost.slice(0, 160), source: "Referência" };
    } catch (_) {
      return { host: "", source: "Direto" };
    }
  }

  function sessionAcquisition() {
    try {
      const raw = sessionStorage.getItem("vae_analytics_acquisition_v1");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed.source === "string") return parsed;
      }
      const value = externalReferrer();
      sessionStorage.setItem("vae_analytics_acquisition_v1", JSON.stringify(value));
      return value;
    } catch (_) {
      return externalReferrer();
    }
  }

  const acquisition = sessionAcquisition();

  function deviceCategory() {
    const ua = String(navigator.userAgent || "");
    if (/ipad|tablet|kindle|silk/i.test(ua) || (/android/i.test(ua) && !/mobile/i.test(ua))) return "Tablet";
    if (navigator.userAgentData?.mobile || /mobile|iphone|ipod|android/i.test(ua)) return "Celular";
    return "Computador";
  }

  function normalizedPath(detail) {
    let path = String(detail?.path || location.pathname || "/");
    if (host.endsWith(".github.io") && path.startsWith(REPOSITORY_PATH)) {
      path = path.slice(REPOSITORY_PATH.length) || "/";
    }
    if (!path.startsWith("/")) path = `/${path}`;
    if (path.length > 1) path = path.replace(/\/+$/, "");

    if (!detail?.path) {
      const params = new URLSearchParams(location.search);
      const safe = new URLSearchParams();
      ["reading", "activity"].forEach((key) => {
        const value = params.get(key);
        if (value && /^[A-Za-z0-9_-]{1,80}$/.test(value)) safe.set(key, value);
      });
      const query = safe.toString();
      if (query) path += `?${query}`;
    }
    return path.slice(0, 300);
  }

  function hasAuthClientScript() {
    return Array.from(document.scripts).some((script) => String(script.src || "").includes("auth-client.js"));
  }

  async function authToken() {
    if (!hasAuthClientScript()) return "";
    for (let i = 0; i < 16 && !window.VAEAuth?.getSession; i++) {
      await new Promise((resolve) => setTimeout(resolve, 60));
    }
    try {
      const session = await window.VAEAuth?.getSession?.();
      return session?.access_token || "";
    } catch (_) {
      return "";
    }
  }

  let lastKey = "";
  let lastAt = 0;

  async function record(detail) {
    const path = normalizedPath(detail);
    if (path === "/admin" || path.startsWith("/admin/")) return;

    const key = `${sessionId}:${path}`;
    const now = Date.now();
    if (key === lastKey && now - lastAt < 1800) return;
    lastKey = key;
    lastAt = now;

    const token = await authToken();
    const headers = {
      "apikey": PUBLISHABLE_KEY,
      "Authorization": `Bearer ${token || PUBLISHABLE_KEY}`,
      "Content-Type": "application/json"
    };

    const body = {
      p_visitor_id: visitorId,
      p_session_id: sessionId,
      p_path: path,
      p_page_title: String(detail?.title || document.title || "").slice(0, 200),
      p_referrer_host: acquisition.host || null,
      p_traffic_source: acquisition.source || "Direto",
      p_device_category: deviceCategory()
    };

    try {
      await fetch(RPC_URL, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        keepalive: true,
        credentials: "omit"
      });
    } catch (_) {
      /* Estatísticas nunca devem bloquear a navegação. */
    }
  }

  function schedule(detail, delay = 650) {
    const run = () => record(detail);
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(run, { timeout: 1800 });
    } else {
      window.setTimeout(run, delay);
    }
  }

  schedule(null);
  window.addEventListener("vae:routechange", (event) => schedule(event.detail, 120));
})();
