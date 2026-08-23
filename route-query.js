/* Roteamento por caminhos limpos, compatível com GitHub Pages e domínio personalizado. */
(function () {
  const REPOSITORY_PATH = "/vamos-a-estudiar-espanol-espacio-de-practica";
  const IS_GITHUB_HOST = window.location.hostname.toLowerCase().endsWith(".github.io");
  const PROJECT_ROOT = IS_GITHUB_HOST ? REPOSITORY_PATH : "";

  const ROUTES = {
    home: { slug: "", title: "Vamos a Estudiar Español | Quiz, Gramática, Vocabulario e Lecturas" },
    quiz: { slug: "quiz", title: "Quiz | Vamos a Estudiar Español" },
    grammar: { slug: "gramatica", title: "Gramática | Vamos a Estudiar Español" },
    vocabulary: { slug: "vocabulario", title: "Vocabulario | Vamos a Estudiar Español" },
    readings: { slug: "lectura", title: "Lecturas | Vamos a Estudiar Español" },
    listening: { slug: "escucha", title: "Escucha | Vamos a Estudiar Español" },
    writing: { slug: "escritura", title: "Escritura | Vamos a Estudiar Español" }
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

  function routeFromLocation() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("gramatica")) return "grammar";
    const legacyRoute = params.get("route");
    if (legacyRoute && ROUTES[legacyRoute]) return legacyRoute;

    const current = cleanPath(window.location.pathname);
    const root = cleanPath(PROJECT_ROOT || "/");
    if (current === root) return "home";

    let slug = "";
    if (PROJECT_ROOT) {
      slug = current.startsWith(`${root}/`) ? current.slice(root.length + 1) : "";
    } else {
      slug = current.replace(/^\/+/, "");
    }

    const match = Object.entries(ROUTES).find(([, item]) => item.slug === slug);
    return match ? match[0] : "home";
  }

  function canonicalize(route, mode = "replace") {
    const target = routePath(route);
    const current = `${window.location.pathname}${window.location.search}`;
    if (current === target) {
      document.title = (ROUTES[route] || ROUTES.home).title;
      return;
    }

    const method = mode === "push" ? "pushState" : "replaceState";
    window.history[method]({ route }, "", target);
    document.title = (ROUTES[route] || ROUTES.home).title;
  }

  function findRouteButton(route) {
    return document.querySelector(`.main-nav [data-route="${route}"]`) ||
      document.querySelector(`[data-route="${route}"]`);
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
    document.title = (ROUTES[route] || ROUTES.home).title;
    return true;
  }

  function syncFromAddress() {
    const route = routeFromLocation();
    canonicalize(route, "replace");
    openRoute(route);
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
    openRoute(route);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", syncFromAddress, { once: true });
  } else {
    syncFromAddress();
  }
})();
