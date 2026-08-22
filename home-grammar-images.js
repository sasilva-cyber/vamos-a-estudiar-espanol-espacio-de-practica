/* Substitui os círculos numéricos das últimas aulas de Gramática por imagens temáticas. */
(function () {
  const images = [
    "assets/grammar-home/contrastes-portugues-espanol.webp",
    "assets/grammar-home/pontuacao-interrogacao.webp",
    "assets/grammar-home/acentuacao-ortografica.webp"
  ];

  function applyImages() {
    const container = document.getElementById("home-grammar-items");
    if (!container) return false;

    const cards = [...container.querySelectorAll(".home-grammar-item")].slice(0, 3);
    cards.forEach((card, index) => {
      const circle = card.querySelector(".home-grammar-circle");
      if (!circle) return;

      circle.classList.add("home-grammar-circle-image");
      circle.innerHTML = "";

      const img = document.createElement("img");
      img.className = "home-grammar-circle-img";
      img.src = images[index] || images[0];
      img.alt = card.querySelector(".home-grammar-item-copy > strong")?.textContent?.trim() || "Gramática do espanhol";
      img.loading = "lazy";
      img.decoding = "async";
      circle.appendChild(img);
    });

    return true;
  }

  function injectStyles() {
    if (document.getElementById("home-grammar-images-styles")) return;
    const style = document.createElement("style");
    style.id = "home-grammar-images-styles";
    style.textContent = `
      .home-grammar-circle-image {
        overflow: hidden !important;
        padding: 0 !important;
        background: #fff9ed !important;
      }
      .home-grammar-circle-img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
        border-radius: 50%;
      }
    `;
    document.head.appendChild(style);
  }

  function install() {
    injectStyles();
    if (!applyImages()) {
      setTimeout(install, 250);
      return;
    }

    const container = document.getElementById("home-grammar-items");
    const observer = new MutationObserver(() => applyImages());
    observer.observe(container, { childList: true, subtree: false });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => setTimeout(install, 200), { once: true });
  } else {
    setTimeout(install, 200);
  }
})();