/* Roteamento por caminhos limpos, compatível com GitHub Pages e domínio personalizado, com SEO por rota. */
(function () {
  const REPOSITORY_PATH = "/vamos-a-estudiar-espanol-espacio-de-practica";
  const IS_GITHUB_HOST = window.location.hostname.toLowerCase().endsWith(".github.io");
  const PROJECT_ROOT = IS_GITHUB_HOST ? REPOSITORY_PATH : "";
  const PUBLIC_ORIGIN = IS_GITHUB_HOST
    ? `${window.location.origin}${REPOSITORY_PATH}`
    : "https://pratica.vamosaestudiarespanol.com.br";

  const ROUTES = {
    home: { slug: "", title: "Vamos a Estudiar Español | Pratique espanhol online", description: "Pratique espanhol gratuitamente com quizzes, gramática, vocabulário, compreensão auditiva, escrita, leituras e jogos educativos." },
    quiz: { slug: "quiz", title: "Quiz de Espanhol | Vamos a Estudiar Español", description: "Teste seu espanhol do A1 ao C2 com quizzes, simulados, compreensão auditiva, falsos amigos e atividades interativas." },
    grammar: { slug: "gramatica", title: "Gramática de Espanhol | Vamos a Estudiar Español", description: "Estude gramática espanhola com explicações em português, exemplos, filtros por nível e atividades de revisão." },
    vocabulary: { slug: "vocabulario", title: "Vocabulário de Espanhol | Vamos a Estudiar Español", description: "Amplie seu vocabulário em espanhol por temas com exemplos, tradução para português e prática interativa." },
    readings: { slug: "lectura", title: "Leituras em Espanhol | Vamos a Estudiar Español", description: "Leia textos em espanhol com glossário, nível indicado e perguntas de compreensão para desenvolver leitura e vocabulário." },
    listening: { slug: "escucha", title: "Compreensão Auditiva em Espanhol | Vamos a Estudiar Español", description: "Treine compreensão auditiva em espanhol com áudios, perguntas, transcrições e atividades do A1 ao C2." },
    writing: { slug: "escritura", title: "Escrita em Espanhol | Vamos a Estudiar Español", description: "Pratique escrita em espanhol com propostas guiadas, metas de palavras, conectores e ferramentas de revisão." }
  };

  let syncingRoute = false;

  function cleanPath(pathname) {
    const path = String(pathname || "/");
    const withoutTrailingSlash = path.length > 1 ? path.replace(/\/+$/, "") : path;
    return withoutTrailingSlash || "/";
  }

  function routePath(route) {
    const item = ROUTES[route] || ROUTES.home;
    if (!PROJECT_ROOT) return item.slug ? `/${item.slug}` : "/";
    return item.slug ? `${PROJECT_ROOT}/${item.slug}` : `${PROJECT_ROOT}/`;
  }

  function publicUrl(route) {
    const item = ROUTES[route] || ROUTES.home;
    return item.slug ? `${PUBLIC_ORIGIN}/${item.slug}` : `${PUBLIC_ORIGIN}/`;
  }

  function routeFromLocation() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("gramatica")) return "grammar";
    const legacyRoute = params.get("route");
    if (legacyRoute && ROUTES[legacyRoute]) return legacyRoute;

    const current = cleanPath(window.location.pathname);
    const root = cleanPath(PROJECT_ROOT || "/");
    if (current === root) return "home";

    let slug = "";
    if (PROJECT_ROOT) slug = current.startsWith(`${root}/`) ? current.slice(root.length + 1) : "";
    else slug = current.replace(/^\/+/, "");

    const match = Object.entries(ROUTES).find(([, item]) => item.slug === slug);
    return match ? match[0] : "home";
  }

  function ensureMeta(selector, attrs) {
    let node = document.head.querySelector(selector);
    if (!node) {
      node = document.createElement("meta");
      Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
      document.head.appendChild(node);
    }
    return node;
  }

  function ensureCanonical() {
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    return link;
  }

  function ensureManifest() {
    if (document.head.querySelector('link[rel="manifest"]')) return;
    const link = document.createElement("link");
    link.rel = "manifest";
    link.href = IS_GITHUB_HOST ? `${REPOSITORY_PATH}/site.webmanifest` : "/site.webmanifest";
    document.head.appendChild(link);
  }

  function updateStructuredData() {
    let script = document.getElementById("vae-structured-data");
    if (!script) {
      script = document.createElement("script");
      script.id = "vae-structured-data";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "WebSite", "@id": `${PUBLIC_ORIGIN}/#website`, "url": `${PUBLIC_ORIGIN}/`, "name": "Vamos a Estudiar Español — Espaço de Prática", "inLanguage": ["pt-BR", "es"] },
        { "@type": "EducationalOrganization", "@id": `${PUBLIC_ORIGIN}/#organization`, "name": "Vamos a Estudiar Español", "url": "https://www.vamosaestudiarespanol.com.br/", "sameAs": ["https://www.instagram.com/vamosaestudiarespanol", "https://www.facebook.com/vamosaestudiarespanol", "https://www.tiktok.com/@vamosaestudiarespanol", "https://youtube.com/@vamosaestudiarespanol"] }
      ]
    });
  }

  function updateSEO(route) {
    const item = ROUTES[route] || ROUTES.home;
    const url = publicUrl(route);
    document.title = item.title;

    ensureMeta('meta[name="description"]', { name: "description" }).setAttribute("content", item.description);
    ensureMeta('meta[name="robots"]', { name: "robots" }).setAttribute("content", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");

    const values = [
      ['meta[property="og:title"]', { property: "og:title" }, item.title],
      ['meta[property="og:description"]', { property: "og:description" }, item.description],
      ['meta[property="og:url"]', { property: "og:url" }, url],
      ['meta[property="og:type"]', { property: "og:type" }, "website"],
      ['meta[property="og:site_name"]', { property: "og:site_name" }, "Vamos a Estudiar Español"],
      ['meta[property="og:locale"]', { property: "og:locale" }, "pt_BR"],
      ['meta[name="twitter:card"]', { name: "twitter:card" }, "summary"],
      ['meta[name="twitter:title"]', { name: "twitter:title" }, item.title],
      ['meta[name="twitter:description"]', { name: "twitter:description" }, item.description]
    ];
    values.forEach(([selector, attrs, content]) => ensureMeta(selector, attrs).setAttribute("content", content));

    ensureCanonical().href = url;
    ensureManifest();
    updateStructuredData();
    window.dispatchEvent(new CustomEvent("vae:routechange", { detail: { route, title: item.title, path: routePath(route), url } }));
  }

  function canonicalize(route, mode = "replace") {
    const target = routePath(route);
    const current = `${window.location.pathname}${window.location.search}`;
    if (current !== target) {
      const method = mode === "push" ? "pushState" : "replaceState";
      window.history[method]({ route }, "", target);
    }
    updateSEO(route);
  }

  function findRouteButton(route) {
    return document.querySelector(`.main-nav [data-route="${route}"]`) || document.querySelector(`[data-route="${route}"]`);
  }

  function openRoute(route, attempt = 0) {
    const button = findRouteButton(route);
    if (!button) {
      if (attempt < 60) window.setTimeout(() => openRoute(route, attempt + 1), 100);
      return false;
    }
    syncingRoute = true;
    button.click();
    syncingRoute = false;
    return true;
  }

  function syncFromAddress() {
    const route = routeFromLocation();
    canonicalize(route, "replace");
    openRoute(route);
  }

  function loadAnalyticsRuntime() {
    if (document.getElementById("vae-analytics-config")) return;
    const root = IS_GITHUB_HOST ? `${REPOSITORY_PATH}/` : "/";
    const config = document.createElement("script");
    config.id = "vae-analytics-config";
    config.src = `${root}analytics-config.js?v=20260825-perf1`;
    config.onload = () => {
      const analytics = document.createElement("script");
      analytics.id = "vae-analytics-runtime";
      analytics.src = `${root}analytics.js?v=20260823-1022`;
      analytics.defer = true;
      document.head.appendChild(analytics);
    };
    document.head.appendChild(config);
  }

  document.addEventListener("click", (event) => {
    if (syncingRoute) return;
    const target = event.target.closest("[data-route]");
    if (!target) return;
    const route = target.dataset.route;
    if (!ROUTES[route]) return;
    canonicalize(route, "push");
  }, true);

  window.addEventListener("popstate", () => {
    const route = routeFromLocation();
    updateSEO(route);
    openRoute(route);
  });

  loadAnalyticsRuntime();

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", syncFromAddress, { once: true });
  else syncFromAddress();
})();