/* Roteamento por caminhos limpos para as áreas principais da plataforma. */
(function () {
  const PROJECT_ROOT = "/vamos-a-estudiar-espanol-espacio-de-practica";
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
    const withoutTrailingSlash = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
    return withoutTrailingSlash || "/";
  }

  function routePath(route) {
    const item = ROUTES[route] || ROUTES.home;
    return item.slug ? `${PROJECT_ROOT}/${item.slug}` : `${PROJECT_ROOT}/`;
  }

  function routeFromLocation() {
    const params = new URLSearchParams(window.location.search);
    if (params.has("gramatica")) return "grammar";

    const current = cleanPath(window.location.pathname);
    const root = cleanPath(PROJECT_ROOT);
    if (current === root) return "home";

    const slug = current.startsWith(`${root}/`) ? current.slice(root.length + 1) : "";
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
      if (attempt < 60) setTimeout(() => openRoute(route, attempt + 1), 100);
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
