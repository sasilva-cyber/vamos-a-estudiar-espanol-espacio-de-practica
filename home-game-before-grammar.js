/* Mantém a ordem da home com operações pontuais, sem MutationObserver nem setInterval. */
(function () {
  if (window.__VAE_HOME_GAME_ORDER_INSTALLED__) return;
  window.__VAE_HOME_GAME_ORDER_INSTALLED__ = true;

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
    window.addEventListener("vae:home-showcase-ready", placeSections, { once: true });
    window.addEventListener("vae:home-newsletter-ready", placeSections, { once: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
  else install();
})();