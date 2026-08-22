/* Roteamento leve por query string. Gramática usa a URL /?gramatica. */
(function () {
  const BASE_TITLE = "Vamos a Estudiar Español | Quiz, Gramática, Vocabulario e Lecturas";
  const GRAMMAR_TITLE = "Gramática | Vamos a Estudiar Español";

  function baseUrl() {
    return `${window.location.pathname}`;
  }

  function grammarUrl() {
    return `${window.location.pathname}?gramatica`;
  }

  function isGrammarUrl() {
    return new URLSearchParams(window.location.search).has("gramatica");
  }

  function setGrammarUrl(mode = "push") {
    const url = grammarUrl();
    if (`${window.location.pathname}${window.location.search}` === url) return;
    const method = mode === "replace" ? "replaceState" : "pushState";
    window.history[method]({ route: "grammar" }, "", url);
    document.title = GRAMMAR_TITLE;
  }

  function setBaseUrl(mode = "push") {
    const url = baseUrl();
    if (`${window.location.pathname}${window.location.search}` === url) return;
    const method = mode === "replace" ? "replaceState" : "pushState";
    window.history[method]({ route: "home" }, "", url);
    document.title = BASE_TITLE;
  }

  function openGrammarFromUrl() {
    const grammarButton = document.querySelector('.main-nav [data-route="grammar"]') || document.querySelector('[data-route="grammar"]');
    if (!grammarButton) return false;
    grammarButton.click();
    document.title = GRAMMAR_TITLE;
    return true;
  }

  function openHomeFromUrl() {
    const homeButton = document.querySelector('.main-nav [data-route="home"]') || document.querySelector('[data-route="home"]');
    if (!homeButton) return false;
    homeButton.click();
    document.title = BASE_TITLE;
    return true;
  }

  function syncInitialRoute(attempt = 0) {
    if (isGrammarUrl()) {
      if (!openGrammarFromUrl() && attempt < 20) {
        setTimeout(() => syncInitialRoute(attempt + 1), 150);
      }
      return;
    }
    document.title = BASE_TITLE;
  }

  document.addEventListener("click", (event) => {
    const routeTarget = event.target.closest("[data-route]");
    if (!routeTarget) return;

    const route = routeTarget.dataset.route;
    if (route === "grammar") {
      setGrammarUrl("push");
      return;
    }

    if (isGrammarUrl()) setBaseUrl("push");
  }, true);

  window.addEventListener("popstate", () => {
    if (isGrammarUrl()) {
      openGrammarFromUrl();
    } else {
      openHomeFromUrl();
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => syncInitialRoute(), { once: true });
  } else {
    syncInitialRoute();
  }
})();
