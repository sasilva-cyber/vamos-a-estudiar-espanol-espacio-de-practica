/* Imagens da home e carregamento progressivo das áreas secundárias. */
(function () {
  const images = [
    "assets/grammar-home/contrastes-portugues-espanol.webp",
    "assets/grammar-home/pontuacao-interrogacao.webp",
    "assets/grammar-home/acentuacao-ortografica.webp"
  ];
  let routeLazyInstalled = false;

  function loadScript(id, src, onload) {
    const existing = document.getElementById(id);
    if (existing) {
      if (onload) {
        if (existing.dataset.loaded === "true") onload();
        else existing.addEventListener("load", onload, { once: true });
      }
      return existing;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.defer = true;
    script.onload = () => {
      script.dataset.loaded = "true";
      if (onload) onload();
    };
    document.head.appendChild(script);
    return script;
  }

  function applyImages() {
    const container = document.getElementById("home-grammar-items");
    if (!container) return false;
    [...container.querySelectorAll(".home-grammar-item")].slice(0, 3).forEach((card, index) => {
      const circle = card.querySelector(".home-grammar-circle");
      if (!circle || circle.querySelector("img")) return;
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
    style.textContent = `.home-grammar-circle-image{overflow:hidden!important;padding:0!important;background:#fff9ed!important}.home-grammar-circle-img{width:100%;height:100%;display:block;object-fit:cover;border-radius:50%}`;
    document.head.appendChild(style);
  }

  function installImages(attempt = 0) {
    injectStyles();
    if (!applyImages() && attempt < 30) {
      window.setTimeout(() => installImages(attempt + 1), 180);
      return;
    }
    const container = document.getElementById("home-grammar-items");
    if (container && !container.dataset.imageObserver) {
      container.dataset.imageObserver = "true";
      new MutationObserver(applyImages).observe(container, { childList: true });
    }
  }

  function loadListeningCore(onload) {
    loadScript("listening-area-loader", "listening.js?v=20260822-1816", onload);
  }

  function loadWritingCore(onload) {
    loadScript("writing-area-loader", "writing.js?v=20260822-1842", onload);
  }

  function loadListeningExtras() {
    loadListeningCore(() => {
      loadScript("listening-filters-loader", "listening-filters.js?v=20260822-1830");
      loadScript("listening-expanded-loader", "listening-expanded.js?v=20260822-1848", () => {
        loadScript("listening-expanded-fixes-loader", "listening-expanded-fixes.js?v=20260822-1848");
      });
    });
  }

  function loadWritingExtras() {
    loadWritingCore(() => loadScript("writing-search-loader", "writing-search.js?v=20260822-1859"));
  }

  function loadReadingExtras() {
    loadScript("readings-casa-loader", "readings-cuentos-casa.js?v=20260822-1856");
  }

  function installRouteLazyLoading() {
    if (routeLazyInstalled) return;
    routeLazyInstalled = true;
    const maybeLoad = (event) => {
      const target = event.target?.closest?.("[data-route]");
      const route = target?.dataset?.route;
      if (route === "listening") loadListeningExtras();
      else if (route === "writing") loadWritingExtras();
      else if (route === "readings") loadReadingExtras();
    };
    document.addEventListener("pointerover", maybeLoad, { passive: true });
    document.addEventListener("focusin", maybeLoad);
    document.addEventListener("click", maybeLoad, true);

    const path = window.location.pathname.replace(/\/+$/, "");
    if (path.endsWith("/escucha")) loadListeningExtras();
    else if (path.endsWith("/escritura")) loadWritingExtras();
    else if (path.endsWith("/lectura")) loadReadingExtras();
  }

  function loadEnhancedFooter() {
    loadScript("enhanced-footer-loader", "footer-enhanced.js?v=20260822-1906", () => {
      loadScript("footer-menu-simple-loader", "footer-menu-simple.js?v=20260823-0018");
    });
  }

  function loadResponsiveStyles() {
    if (document.getElementById("responsive-styles")) return;
    const link = document.createElement("link");
    link.id = "responsive-styles";
    link.rel = "stylesheet";
    link.href = "responsive.css?v=20260822-1840";
    document.head.appendChild(link);
  }

  function install() {
    installImages();
    loadResponsiveStyles();
    loadListeningCore();
    loadWritingCore(() => loadScript("home-writing-card-loader", "home-writing-card.js?v=20260822-1903"));
    loadEnhancedFooter();
    installRouteLazyLoading();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
  else install();
})();