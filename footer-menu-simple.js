/* Ajusta o menu "Categorias" do rodapé para Início, Quem somos e Contato. */
(function () {
  const ABOUT_URL = "quem-somos.html";
  const CONTACT_URL = "contato/";

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
    if (!document.getElementById("home-title-adjustment")) {
      const style = document.createElement("style");
      style.id = "home-title-adjustment";
      style.textContent = `
        #home-title {
          max-width: 650px;
          font-size: clamp(2rem, 4.4vw, 3.25rem);
          line-height: 1.12;
          letter-spacing: -0.02em;
          text-align: justify;
          text-justify: inter-word;
          text-align-last: left;
          hyphens: auto;
        }
        @media (max-width: 600px) {
          #home-title {
            max-width: 100%;
            font-size: clamp(1.9rem, 9vw, 2.6rem);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }

  function loadRouteQuery() {
    if (document.getElementById("route-query-loader")) return;
    const script = document.createElement("script");
    script.id = "route-query-loader";
    script.src = "route-query.js?v=20260822-2010";
    document.head.appendChild(script);
  }

  function loadGrammarDropdown() {
    if (document.getElementById("grammar-dropdown-nav-loader")) return;
    const script = document.createElement("script");
    script.id = "grammar-dropdown-nav-loader";
    script.src = "nav-grammar-dropdown.js?v=20260822-2042";
    document.head.appendChild(script);
  }

  function loadHomeGameOrder() {
    if (document.getElementById("home-game-order-loader")) return;
    const script = document.createElement("script");
    script.id = "home-game-order-loader";
    script.src = "home-game-before-grammar.js?v=20260822-2045";
    document.head.appendChild(script);
  }

  function loadHomeGameRename() {
    if (document.getElementById("home-jugando-loader")) return;
    const script = document.createElement("script");
    script.id = "home-jugando-loader";
    script.src = "home-jugando-y-aprendiendo.js?v=20260822-2053";
    script.onload = loadHomeGameOrder;
    script.onerror = loadHomeGameOrder;
    document.head.appendChild(script);
  }

  function loadHomeFalseFriends() {
    if (document.getElementById("home-false-friends-loader")) {
      loadHomeGameRename();
      return;
    }
    const script = document.createElement("script");
    script.id = "home-false-friends-loader";
    script.src = "home-falsos-amigos.js?v=20260822-2032";
    script.onload = loadHomeGameRename;
    script.onerror = loadHomeGameRename;
    document.head.appendChild(script);
  }

  function loadFalseFriendsGameCore() {
    if (document.getElementById("false-friends-game-loader")) {
      loadHomeFalseFriends();
      return;
    }
    const script = document.createElement("script");
    script.id = "false-friends-game-loader";
    script.src = "quiz-falsos-amigos.js?v=20260822-2053";
    script.onload = loadHomeFalseFriends;
    script.onerror = loadHomeFalseFriends;
    document.head.appendChild(script);
  }

  function loadFalseFriendsFixes() {
    if (document.getElementById("false-friends-fixes-loader")) {
      loadFalseFriendsGameCore();
      return;
    }
    const fixes = document.createElement("script");
    fixes.id = "false-friends-fixes-loader";
    fixes.src = "falsos-amigos-data-fixes.js?v=20260822-2053";
    fixes.onload = loadFalseFriendsGameCore;
    fixes.onerror = loadFalseFriendsGameCore;
    document.head.appendChild(fixes);
  }

  function loadFalseFriendsGame() {
    if (Array.isArray(window.VAE_FALSE_FRIENDS_BANK) && window.VAE_FALSE_FRIENDS_BANK.length) {
      loadFalseFriendsFixes();
      return;
    }
    if (document.getElementById("false-friends-data-loader")) return;
    const data = document.createElement("script");
    data.id = "false-friends-data-loader";
    data.src = "falsos-amigos-data.js?v=20260822-2053";
    data.onload = loadFalseFriendsFixes;
    data.onerror = loadFalseFriendsGameCore;
    document.head.appendChild(data);
  }

  function loadHomeStats() {
    if (document.getElementById("home-stats-auto-loader")) return;
    const script = document.createElement("script");
    script.id = "home-stats-auto-loader";
    script.src = "home-stats-auto.js?v=20260822-2037";
    document.head.appendChild(script);
  }

  function install() {
    adjustHomeTitle();
    loadGrammarDropdown();
    if (!installMenu()) {
      setTimeout(install, 200);
      return;
    }
    loadRouteQuery();
    loadFalseFriendsGame();
    loadHomeStats();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
