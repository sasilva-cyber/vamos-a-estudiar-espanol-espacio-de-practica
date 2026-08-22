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

/* Carrega a área Escucha en español e, depois dela, os filtros da biblioteca. */
(function loadListeningArea() {
  if (document.getElementById("listening-area-loader")) return;

  const script = document.createElement("script");
  script.id = "listening-area-loader";
  script.src = "listening.js?v=20260822-1816";
  script.onload = () => {
    if (document.getElementById("listening-filters-loader")) return;
    const filters = document.createElement("script");
    filters.id = "listening-filters-loader";
    filters.src = "listening-filters.js?v=20260822-1830";
    document.head.appendChild(filters);
  };
  document.head.appendChild(script);
})();

/* Carrega a área Escritura en español. */
(function loadWritingArea() {
  if (document.getElementById("writing-area-loader")) return;
  const script = document.createElement("script");
  script.id = "writing-area-loader";
  script.src = "writing.js?v=20260822-1842";
  document.head.appendChild(script);
})();

/* Carrega por último a camada responsiva global para celulares e tablets. */
(function loadResponsiveStyles() {
  if (document.getElementById("responsive-styles")) return;
  const link = document.createElement("link");
  link.id = "responsive-styles";
  link.rel = "stylesheet";
  link.href = "responsive.css?v=20260822-1840";
  document.head.appendChild(link);
})();