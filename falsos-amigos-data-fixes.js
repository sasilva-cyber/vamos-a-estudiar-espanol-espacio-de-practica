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