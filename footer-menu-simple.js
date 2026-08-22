/* Ajusta o menu "Categorias" do rodapé para Início, Quem somos e Contato. */
(function () {
  const ABOUT_URL = "quem-somos.html";
  const CONTACT_URL = "https://www.vamosaestudiarespanol.com.br/p/contato.html";

  function installMenu() {
    const footer = document.querySelector(".site-footer-enhanced");
    const menu = footer?.querySelector(".site-footer-menu");
    if (!footer || !menu) return false;

    menu.innerHTML = `
      <button type="button" data-footer-home>Início</button>
      <button type="button" data-footer-external="${ABOUT_URL}">Quem somos</button>
      <button type="button" data-footer-external="${CONTACT_URL}">Contato</button>
    `;

    menu.querySelector("[data-footer-home]")?.addEventListener("click", () => {
      const homeButton = document.querySelector('.main-nav [data-route="home"]') || document.querySelector('[data-route="home"]');
      homeButton?.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    menu.querySelectorAll("[data-footer-external]").forEach((button) => {
      button.addEventListener("click", () => {
        const url = button.dataset.footerExternal;
        if (url) window.open(url, "_blank", "noopener,noreferrer");
      });
    });

    return true;
  }

  function loadRouteQuery() {
    if (document.getElementById("route-query-loader")) return;
    const script = document.createElement("script");
    script.id = "route-query-loader";
    script.src = "route-query.js?v=20260822-1931";
    document.head.appendChild(script);
  }

  function install() {
    if (!installMenu()) {
      setTimeout(install, 200);
      return;
    }
    loadRouteQuery();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
