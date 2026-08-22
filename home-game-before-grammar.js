/* Mantém o jogo de Falsos Amigos imediatamente antes de "Últimas de Gramática". */
(function () {
  let observer = null;

  function placeGame() {
    const home = document.getElementById("home-screen");
    const game = document.getElementById("home-false-friends-showcase");
    const grammar = document.getElementById("home-grammar-showcase");
    if (!home || !game || !grammar) return false;

    if (game.nextElementSibling !== grammar) {
      grammar.insertAdjacentElement("beforebegin", game);
    }
    return true;
  }

  function install() {
    placeGame();

    const home = document.getElementById("home-screen");
    if (!home || observer) {
      if (!home) setTimeout(install, 200);
      return;
    }

    observer = new MutationObserver(() => placeGame());
    observer.observe(home, { childList: true, subtree: false });

    let attempts = 0;
    const timer = window.setInterval(() => {
      placeGame();
      attempts += 1;
      if (attempts >= 20) window.clearInterval(timer);
    }, 300);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
