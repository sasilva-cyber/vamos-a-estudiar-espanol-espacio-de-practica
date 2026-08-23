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

/* Carrega Escucha, filtros e a biblioteca ampliada com 18 áudios. */
(function loadListeningArea() {
  if (document.getElementById("listening-area-loader")) return;

  const script = document.createElement("script");
  script.id = "listening-area-loader";
  script.src = "listening.js?v=20260822-1816";
  script.onload = () => {
    if (!document.getElementById("listening-filters-loader")) {
      const filters = document.createElement("script");
      filters.id = "listening-filters-loader";
      filters.src = "listening-filters.js?v=20260822-1830";
      document.head.appendChild(filters);
    }

    if (!document.getElementById("listening-expanded-loader")) {
      const expanded = document.createElement("script");
      expanded.id = "listening-expanded-loader";
      expanded.src = "listening-expanded.js?v=20260822-1848";
      expanded.onload = () => {
        if (document.getElementById("listening-expanded-fixes-loader")) return;
        const fixes = document.createElement("script");
        fixes.id = "listening-expanded-fixes-loader";
        fixes.src = "listening-expanded-fixes.js?v=20260822-1848";
        document.head.appendChild(fixes);
      };
      document.head.appendChild(expanded);
    }
  };
  document.head.appendChild(script);
})();

/* Carrega a área Escritura en español e o pesquisador da biblioteca. */
(function loadWritingArea() {
  if (document.getElementById("writing-area-loader")) return;
  const script = document.createElement("script");
  script.id = "writing-area-loader";
  script.src = "writing.js?v=20260822-1842";
  script.onload = () => {
    if (!document.getElementById("writing-search-loader")) {
      const search = document.createElement("script");
      search.id = "writing-search-loader";
      search.src = "writing-search.js?v=20260822-1859";
      document.head.appendChild(search);
    }

    if (!document.getElementById("home-writing-card-loader")) {
      const homeCard = document.createElement("script");
      homeCard.id = "home-writing-card-loader";
      homeCard.src = "home-writing-card.js?v=20260822-1903";
      document.head.appendChild(homeCard);
    }
  };
  document.head.appendChild(script);
})();

/* Amplia a biblioteca de Lecturas com práticas baseadas em Cuentos para quedarse en casa. */
(function loadReadingsCasa() {
  if (document.getElementById("readings-casa-loader")) return;
  const script = document.createElement("script");
  script.id = "readings-casa-loader";
  script.src = "readings-cuentos-casa.js?v=20260822-1856";
  document.head.appendChild(script);
})();

/* Carrega o rodapé ampliado com categorias e redes sociais. */
(function loadEnhancedFooter() {
  if (document.getElementById("enhanced-footer-loader")) return;
  const script = document.createElement("script");
  script.id = "enhanced-footer-loader";
  script.src = "footer-enhanced.js?v=20260822-1906";
  script.onload = () => {
    if (document.getElementById("footer-menu-simple-loader")) return;
    const menu = document.createElement("script");
    menu.id = "footer-menu-simple-loader";
    menu.src = "footer-menu-simple.js?v=20260822-2053";
    document.head.appendChild(menu);
  };
  document.head.appendChild(script);
})();

/* Amplia a aba Quiz com testes de compreensão auditiva A1-C2. */
(function loadQuizListening() {
  if (document.getElementById("quiz-listening-loader")) return;
  const script = document.createElement("script");
  script.id = "quiz-listening-loader";
  script.src = "quiz-listening.js?v=20260822-1920";
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