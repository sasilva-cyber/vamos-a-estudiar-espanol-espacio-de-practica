/* Adiciona Escritura como o sexto destaque da página inicial. */
(function () {
  function installWritingHomeCard() {
    const home = document.getElementById("home-screen");
    const grid = home?.querySelector(".feature-grid");
    if (!home || !grid) return false;

    if (grid.querySelector('[data-home-feature="writing"]')) return true;

    const card = document.createElement("article");
    card.className = "feature-card writing-feature";
    card.dataset.homeFeature = "writing";
    card.innerHTML = `
      <span class="feature-number">06</span>
      <p class="eyebrow">Escritura</p>
      <h2>Pratique sua escrita em espanhol</h2>
      <p>Escreva textos guiados do A1 ao C2, desenvolva vocabulário e organização das ideias e revise ortografia, gramática e estilo.</p>
      <button class="text-cta" type="button" data-route="writing">Practicar escritura →</button>
    `;

    grid.appendChild(card);
    return true;
  }

  function install() {
    if (!installWritingHomeCard()) {
      setTimeout(install, 250);
      return;
    }

    const grid = document.querySelector("#home-screen .feature-grid");
    if (!grid || grid.dataset.writingCardObserved) return;
    grid.dataset.writingCardObserved = "true";

    const observer = new MutationObserver(() => {
      if (!grid.querySelector('[data-home-feature="writing"]')) installWritingHomeCard();
    });
    observer.observe(grid, { childList: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
