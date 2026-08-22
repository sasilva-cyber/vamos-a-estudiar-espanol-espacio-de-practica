/* Rodapé ampliado com categorias e redes sociais do Vamos a Estudiar Español. */
(function () {
  const socialLinks = [
    { label: "Instagram", short: "IG", href: "https://www.instagram.com/vamosaestudiarespanol" },
    { label: "YouTube", short: "YT", href: "https://www.youtube.com/@vamosaestudiarespanol" },
    { label: "Facebook", short: "FB", href: "https://www.facebook.com/vamosaestudiarespanol" },
    { label: "Spotify", short: "SP", href: "https://creators.spotify.com/pod/show/vamosaestudiarespanol" }
  ];

  const categories = [
    ["Inicio", "home"],
    ["Quiz", "quiz"],
    ["Gramática", "grammar"],
    ["Vocabulario", "vocabulary"],
    ["Escucha", "listening"],
    ["Lecturas", "readings"],
    ["Escritura", "writing"]
  ];

  function injectStyles() {
    if (document.getElementById("enhanced-footer-styles")) return;
    const style = document.createElement("style");
    style.id = "enhanced-footer-styles";
    style.textContent = `
      .site-footer-enhanced {
        width: 100% !important;
        max-width: none !important;
        margin: 26px 0 0 !important;
        padding: 0 !important;
        background: #6e1521;
        color: #fff8ef;
        text-align: left !important;
        border-top: 6px solid var(--gold);
      }
      .site-footer-inner {
        width: min(1120px, calc(100% - 36px));
        margin: 0 auto;
        padding: 44px 0 28px;
        display: grid;
        grid-template-columns: minmax(250px,1.25fr) minmax(180px,.8fr) minmax(220px,.85fr);
        gap: 42px;
      }
      .site-footer-brand {
        max-width: 420px;
      }
      .site-footer-logo {
        display: flex;
        align-items: center;
        gap: 13px;
        margin-bottom: 18px;
      }
      .site-footer-mark {
        width: 48px;
        height: 48px;
        border-radius: 14px;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        background: #fff8ef;
        color: var(--red-dark);
        font: 900 1.7rem Georgia, "Times New Roman", serif;
      }
      .site-footer-logo strong {
        display: block;
        color: #fff;
        font: 800 1.35rem/1.15 Georgia, "Times New Roman", serif;
      }
      .site-footer-logo span:last-child {
        display: block;
        margin-top: 4px;
        color: #f3d9ce;
        font-size: .78rem;
      }
      .site-footer-description {
        margin: 0 !important;
        max-width: 390px;
        color: #f3d9ce !important;
        font-size: .9rem !important;
        line-height: 1.7 !important;
        text-align: left !important;
      }
      .site-footer-heading {
        margin: 2px 0 15px;
        color: #fff;
        font: 800 1.05rem Georgia, "Times New Roman", serif;
      }
      .site-footer-menu {
        display: grid;
        gap: 5px;
      }
      .site-footer-menu button {
        width: max-content;
        max-width: 100%;
        min-height: 36px;
        border: 0;
        background: transparent;
        color: #f3d9ce;
        padding: 5px 0;
        text-align: left;
        font: inherit;
        font-size: .88rem;
        font-weight: 700;
        cursor: pointer;
      }
      .site-footer-menu button:hover,
      .site-footer-menu button:focus-visible {
        color: #fff;
        text-decoration: underline;
        outline: none;
      }
      .site-footer-socials {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 10px;
      }
      .site-footer-social {
        min-height: 46px;
        border: 1px solid rgba(255,255,255,.19);
        border-radius: 12px;
        background: rgba(255,255,255,.06);
        color: #fff;
        padding: 9px 10px;
        display: flex;
        align-items: center;
        gap: 9px;
        text-decoration: none;
        font-size: .82rem;
        font-weight: 800;
        transition: background .15s ease, border-color .15s ease, transform .15s ease;
      }
      .site-footer-social:hover,
      .site-footer-social:focus-visible {
        background: rgba(255,255,255,.12);
        border-color: rgba(255,255,255,.35);
        transform: translateY(-1px);
        outline: none;
      }
      .site-footer-social-icon {
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        flex: 0 0 auto;
        background: #fff8ef;
        color: var(--red-dark);
        font-size: .64rem;
        font-weight: 900;
        letter-spacing: .03em;
      }
      .site-footer-site-link {
        display: inline-flex;
        margin-top: 18px;
        color: #fff;
        font-size: .85rem;
        font-weight: 900;
        text-decoration: none;
      }
      .site-footer-site-link:hover,
      .site-footer-site-link:focus-visible {
        text-decoration: underline;
        outline: none;
      }
      .site-footer-bottom {
        border-top: 1px solid rgba(255,255,255,.14);
      }
      .site-footer-bottom-inner {
        width: min(1120px, calc(100% - 36px));
        margin: 0 auto;
        min-height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        color: #e8cfc6;
        font-size: .78rem;
      }
      .site-footer-bottom-inner p {
        margin: 0 !important;
        color: inherit !important;
        text-align: left !important;
      }
      .site-footer-top {
        border: 0;
        background: transparent;
        color: #fff;
        padding: 7px 0;
        font: inherit;
        font-weight: 900;
        cursor: pointer;
      }
      .site-footer-top:hover,
      .site-footer-top:focus-visible {
        text-decoration: underline;
        outline: none;
      }
      @media (max-width: 820px) {
        .site-footer-inner {
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .site-footer-brand {
          grid-column: 1 / -1;
          max-width: 600px;
        }
      }
      @media (max-width: 600px) {
        .site-footer-inner,
        .site-footer-bottom-inner {
          width: min(100% - 24px,1120px);
        }
        .site-footer-inner {
          grid-template-columns: 1fr;
          padding: 34px 0 24px;
          gap: 28px;
        }
        .site-footer-brand {
          grid-column: auto;
        }
        .site-footer-socials {
          grid-template-columns: 1fr 1fr;
        }
        .site-footer-bottom-inner {
          min-height: 84px;
          padding: 15px 0;
          align-items: flex-start;
          flex-direction: column;
          justify-content: center;
        }
      }
      @media (max-width: 390px) {
        .site-footer-socials {
          grid-template-columns: 1fr;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function goToRoute(route) {
    const headerButton = document.querySelector(`.main-nav [data-route="${route}"]`);
    if (headerButton) {
      headerButton.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const anyRoute = document.querySelector(`[data-route="${route}"]`);
    if (anyRoute) {
      anyRoute.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function installFooter() {
    const footer = document.querySelector("body > footer");
    if (!footer) return false;

    injectStyles();
    footer.className = "site-footer-enhanced";
    footer.innerHTML = `
      <div class="site-footer-inner">
        <section class="site-footer-brand" aria-label="Sobre o projeto">
          <div class="site-footer-logo">
            <span class="site-footer-mark" aria-hidden="true">Ñ</span>
            <span>
              <strong>Vamos a Estudiar Español</strong>
              <span>¡Aprende, practica y avanza!</span>
            </span>
          </div>
          <p class="site-footer-description">Um espaço de prática para estudantes de espanhol, com quiz, gramática, vocabulário, compreensão auditiva, leituras e escrita guiada do A1 ao C2.</p>
          <a class="site-footer-site-link" href="http://vamosaestudiarespanol.com.br/" target="_blank" rel="noopener noreferrer">Visitar site principal →</a>
        </section>

        <nav aria-label="Categorias do site">
          <h2 class="site-footer-heading">Categorias</h2>
          <div class="site-footer-menu">
            ${categories.map(([label, route]) => `<button type="button" data-footer-route="${route}">${label}</button>`).join("")}
          </div>
        </nav>

        <section aria-labelledby="footer-social-title">
          <h2 class="site-footer-heading" id="footer-social-title">Redes sociais</h2>
          <div class="site-footer-socials">
            ${socialLinks.map((social) => `
              <a class="site-footer-social" href="${social.href}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${social.label}">
                <span class="site-footer-social-icon" aria-hidden="true">${social.short}</span>
                <span>${social.label}</span>
              </a>
            `).join("")}
          </div>
        </section>
      </div>

      <div class="site-footer-bottom">
        <div class="site-footer-bottom-inner">
          <p>© ${new Date().getFullYear()} Vamos a Estudiar Español · Projeto educacional de prática da língua espanhola.</p>
          <button class="site-footer-top" type="button" id="site-footer-top">Voltar ao topo ↑</button>
        </div>
      </div>
    `;

    footer.querySelectorAll("[data-footer-route]").forEach((button) => {
      button.addEventListener("click", () => goToRoute(button.dataset.footerRoute));
    });

    footer.querySelector("#site-footer-top")?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    return true;
  }

  function install() {
    if (!installFooter()) setTimeout(install, 200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
