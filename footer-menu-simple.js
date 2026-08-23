/* Ajusta o rodapé e carrega recursos pesados apenas quando o visitante realmente abre o Quiz. */
(function () {
  const ABOUT_URL = "quem-somos.html";
  const CONTACT_URL = "contato/";
  let quizExtrasRequested = false;

  function appendScript(id, src, onload) {
    const existing = document.getElementById(id);
    if (existing) {
      if (onload && existing.dataset.loaded === "true") onload();
      return existing;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.defer = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      if (onload) onload();
    };
    document.head.appendChild(script);
    return script;
  }

  function installMenu() {
    const footer = document.querySelector(".site-footer-enhanced");
    const menu = footer?.querySelector(".site-footer-menu");
    if (!footer || !menu) return false;

    menu.innerHTML = `
      <button type="button" data-footer-home>Início</button>
      <button type="button" data-footer-external="${ABOUT_URL}">Quem somos</button>
      <button type="button" data-footer-external="${CONTACT_URL}">Contato</button>
    `;

    menu.querySelector("[data-footer-home]")?.addEventListener("click", () => {
      const homeButton = document.querySelector('.main-nav [data-route="home"]') || document.querySelector('[data-route="home"]');
      homeButton?.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    menu.querySelectorAll("[data-footer-external]").forEach((button) => {
      button.addEventListener("click", () => {
        const url = button.dataset.footerExternal;
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      });
    });
    return true;
  }

  function adjustHomeTitle() {
    if (document.getElementById("home-title-adjustment")) return;
    const style = document.createElement("style");
    style.id = "home-title-adjustment";
    style.textContent = `#home-title{text-align:justify;text-justify:inter-word;text-align-last:left;hyphens:auto}`;
    document.head.appendChild(style);
  }

  function loadHomeTypography() {
    if (document.getElementById("home-typography-styles")) return;
    const link = document.createElement("link");
    link.id = "home-typography-styles";
    link.rel = "stylesheet";
    link.href = "home-typography.css?v=20260823-0018";
    document.head.appendChild(link);
  }

  function loadGrammarDropdown() {
    appendScript("grammar-dropdown-nav-loader", "nav-grammar-dropdown.js?v=20260822-2042");
  }

  function loadHomeGameOrder() {
    appendScript("home-game-order-loader", "home-game-before-grammar.js?v=20260822-2045");
  }

  function loadHomeGameLayout() {
    appendScript("home-jugando-layout-loader", "home-jugando-layout.js?v=20260822-2109", loadHomeGameOrder);
  }

  function loadHomeGameRename() {
    appendScript("home-jugando-loader", "home-jugando-y-aprendiendo.js?v=20260822-2109", loadHomeGameLayout);
  }

  function loadHomeFalseFriends() {
    appendScript("home-false-friends-loader", "home-falsos-amigos.js?v=20260823-0018", loadHomeGameRename);
  }

  function loadFalseFriendsGameCore() {
    appendScript("false-friends-game-loader", "quiz-falsos-amigos.js?v=20260822-2053");
  }

  function loadFalseFriendsFixes() {
    appendScript("false-friends-fixes-loader", "falsos-amigos-data-fixes.js?v=20260822-2053", loadFalseFriendsGameCore);
  }

  function loadFalseFriendsGame() {
    if (Array.isArray(window.VAE_FALSE_FRIENDS_BANK) && window.VAE_FALSE_FRIENDS_BANK.length) {
      loadFalseFriendsFixes();
      return;
    }
    appendScript("false-friends-data-loader", "falsos-amigos-data.js?v=20260822-2053", loadFalseFriendsFixes);
  }

  function loadSongQuizCore() {
    appendScript("complete-song-quiz-loader", "quiz-completa-cancion.js?v=20260823-0004");
  }

  function loadSongQuiz() {
    appendScript("song-extra-artists-loader", "quiz-musica-extra-artistas.js?v=20260823-0004", loadSongQuizCore);
  }

  function loadQuizExtras() {
    if (quizExtrasRequested) return;
    quizExtrasRequested = true;
    loadFalseFriendsGame();
    loadSongQuiz();
    appendScript("reading-tests-loader", "reading-tests.js?v=20260822-1750");
    appendScript("quiz-listening-loader", "quiz-listening.js?v=20260822-1920");
  }

  function installQuizLazyLoading() {
    const maybeLoad = (event) => {
      const target = event.target?.closest?.('[data-route="quiz"], #home-ff-play');
      if (target) loadQuizExtras();
    };
    document.addEventListener("pointerover", maybeLoad, { passive: true });
    document.addEventListener("focusin", maybeLoad);
    document.addEventListener("click", maybeLoad, true);

    const path = window.location.pathname.replace(/\/+$/, "");
    if (path.endsWith("/quiz")) loadQuizExtras();
  }

  function loadHomeStats() {
    appendScript("home-stats-auto-loader", "home-stats-auto.js?v=20260823-0018");
  }

  function install(attempt = 0) {
    adjustHomeTitle();
    loadHomeTypography();
    loadGrammarDropdown();
    loadHomeFalseFriends();
    loadHomeStats();
    installQuizLazyLoading();

    if (!installMenu() && attempt < 40) {
      window.setTimeout(() => install(attempt + 1), 150);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => install(), { once: true });
  else install();
})();