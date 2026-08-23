/* Correções mecânicas de entradas importadas e ajuste da interface do jogo. */
(function () {
  const bank = window.VAE_FALSE_FRIENDS_BANK;
  if (Array.isArray(bank)) {
    bank.forEach((item) => {
      if (item.word === "prestar" && item.answer === "empresar") item.answer = "emprestar";
      if (item.word === "sumirse" && item.answer === "afunder-se") item.answer = "afundar-se";
    });
  }

  /*
   * Evita que a apresentação resumida de "Jugando y aprendiendo"
   * permaneça visível ao mesmo tempo que a tela de níveis, partida ou
   * resultado. Na biblioteca do Quiz fica sempre apenas uma interface
   * do jogo por vez.
   */
  function isRendered(element) {
    return Boolean(
      element &&
      !element.classList.contains("hidden") &&
      element.getClientRects().length
    );
  }

  function syncFalseFriendsInterface() {
    const introBlocks = [
      ...document.querySelectorAll("#level-screen .ff-block, .level-screen .ff-block")
    ];

    if (!introBlocks.length) return;

    const detailedScreenVisible = [
      ...document.querySelectorAll(".ff-level-screen, .ff-game-screen, .ff-result-screen")
    ].some(isRendered);

    introBlocks.forEach((block) => {
      block.style.display = detailedScreenVisible ? "none" : "";
      block.setAttribute("aria-hidden", detailedScreenVisible ? "true" : "false");
    });
  }

  function installSingleGameView() {
    syncFalseFriendsInterface();

    const app = document.getElementById("app") || document.body;
    const observer = new MutationObserver(() => syncFalseFriendsInterface());
    observer.observe(app, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class", "style"]
    });

    document.addEventListener("click", () => {
      window.setTimeout(syncFalseFriendsInterface, 0);
      window.setTimeout(syncFalseFriendsInterface, 120);
    }, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installSingleGameView, { once: true });
  } else {
    installSingleGameView();
  }
})();

/* Adiciona o Blog ao menu principal, mantendo a mesma identidade visual. */
(function () {
  const BLOG_URL = "https://www.vamosaestudiarespanol.com.br/";
  let navObserver = null;

  function installBlogLink() {
    const nav = document.querySelector(".main-nav");
    if (!nav) return false;

    let blog = nav.querySelector(".nav-blog-link");
    if (!blog) {
      blog = document.createElement("a");
      blog.className = "nav-link nav-blog-link";
      blog.href = BLOG_URL;
      blog.target = "_blank";
      blog.rel = "noopener noreferrer";
      blog.textContent = "Blog";
      blog.setAttribute("aria-label", "Abrir o blog Vamos a Estudiar Español em uma nova aba");
    }

    const escucha = nav.querySelector('[data-route="listening"]');
    const grammarGroup = nav.querySelector(".grammar-nav-group");

    if (escucha) {
      escucha.insertAdjacentElement("afterend", blog);
    } else if (grammarGroup) {
      grammarGroup.insertAdjacentElement("afterend", blog);
    } else if (!blog.isConnected) {
      nav.appendChild(blog);
    }

    return true;
  }

  function install() {
    if (!installBlogLink()) {
      window.setTimeout(install, 180);
      return;
    }

    const nav = document.querySelector(".main-nav");
    if (!nav || navObserver) return;

    navObserver = new MutationObserver(() => installBlogLink());
    navObserver.observe(nav, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();