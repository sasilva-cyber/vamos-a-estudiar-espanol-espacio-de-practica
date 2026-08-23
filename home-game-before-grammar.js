/* Mantém a ordem da home: jogo visual → newsletter → Últimas de Gramática. */
(function () {
  if (window.__VAE_HOME_GAME_ORDER_INSTALLED__) return;
  window.__VAE_HOME_GAME_ORDER_INSTALLED__ = true;

  let observer = null;

  function placeSections() {
    const home = document.getElementById("home-screen");
    const game = document.getElementById("home-false-friends-showcase");
    const newsletter = document.getElementById("home-newsletter");
    const grammar = document.getElementById("home-grammar-showcase");
    if (!home || !game || !grammar) return false;

    if (game.parentElement !== home || grammar.parentElement !== home) return false;

    const correctWithoutNewsletter = !newsletter && game.nextElementSibling === grammar;
    const correctWithNewsletter = newsletter && newsletter.parentElement === home && game.nextElementSibling === newsletter && newsletter.nextElementSibling === grammar;
    if (correctWithoutNewsletter || correctWithNewsletter) return true;

    home.insertBefore(game, grammar);
    if (newsletter?.parentElement === home) home.insertBefore(newsletter, grammar);
    return true;
  }

  function install() {
    placeSections();

    const home = document.getElementById("home-screen");
    if (!home || observer) {
      if (!home) setTimeout(install, 200);
      return;
    }

    observer = new MutationObserver(() => placeSections());
    observer.observe(home, { childList: true, subtree: false });

    let attempts = 0;
    const timer = window.setInterval(() => {
      placeSections();
      attempts += 1;
      if (attempts >= 24) window.clearInterval(timer);
    }, 300);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
