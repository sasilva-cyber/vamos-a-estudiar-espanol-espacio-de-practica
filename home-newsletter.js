/* Newsletter da página inicial, integrada entre o jogo visual e Últimas de Gramática. */
(function () {
  const FORM_ACTION = "https://formsubmit.co/contato.vamosaestudiarespanol@gmail.com";
  const ROOT_PATH = location.hostname.toLowerCase().endsWith(".github.io")
    ? "/vamos-a-estudiar-espanol-espacio-de-practica/"
    : "/";
  const RETURN_URL = `${location.origin}${ROOT_PATH}#newsletter-enviado`;
  let observer = null;

  function injectStyles() {
    if (document.getElementById("home-newsletter-styles")) return;

    const style = document.createElement("style");
    style.id = "home-newsletter-styles";
    style.textContent = `
      .home-newsletter {
        width: auto;
        max-width: none;
        margin: 34px 0 0;
        padding: 30px clamp(20px,4vw,34px) 26px;
        box-sizing: border-box;
        border: 1px solid var(--line);
        border-radius: 26px;
        background: rgba(255,255,255,.74);
        box-shadow: 0 12px 36px rgba(70,40,20,.055);
      }

      .home-newsletter-inner {
        display: grid;
        grid-template-columns: minmax(0,1.08fr) minmax(320px,.92fr);
        gap: clamp(30px,5vw,58px);
        align-items: center;
      }

      .home-newsletter-copy {
        min-width: 0;
        text-align: left;
      }

      .home-newsletter-copy .eyebrow {
        justify-content: flex-start;
      }

      .home-newsletter-copy h2 {
        margin: 4px 0 12px;
        color: var(--red-dark);
        font-family: Georgia,"Times New Roman",serif;
        font-size: clamp(1.65rem,3.4vw,2.35rem);
        line-height: 1.12;
      }

      .home-newsletter-lead {
        max-width: 650px;
        margin: 0;
        color: var(--muted);
        line-height: 1.7;
        text-align: left !important;
      }

      .home-newsletter-promise {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin: 17px 0 0 !important;
        padding: 8px 12px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: rgba(255,255,255,.72);
        color: #6d5442;
        font-size: .8rem;
        font-weight: 800;
        line-height: 1.35;
        text-align: left !important;
      }

      .home-newsletter-promise strong {
        color: var(--red-dark);
      }

      .home-newsletter-signup {
        min-width: 0;
        display: grid;
        grid-template-columns: 64px minmax(0,1fr);
        gap: 16px;
        align-items: center;
      }

      .home-newsletter-icon {
        width: 64px;
        height: 64px;
        display: grid;
        place-items: center;
        border: 6px solid #fff;
        border-radius: 50%;
        background: linear-gradient(145deg,#fff8ec 0%,#f7e7dc 52%,#f1d7d7 100%);
        box-shadow: 0 8px 24px rgba(88,45,24,.11);
        color: var(--red-dark);
        font-size: 1.7rem;
      }

      .home-newsletter-form {
        min-width: 0;
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        gap: 10px;
        align-items: end;
      }

      .home-newsletter-field {
        min-width: 0;
        display: grid;
        gap: 6px;
      }

      .home-newsletter-field label {
        margin: 0;
        color: var(--muted);
        font-size: .7rem;
        font-weight: 900;
        letter-spacing: .08em;
        line-height: 1.25;
        text-align: left !important;
        text-transform: uppercase;
      }

      .home-newsletter-form input[type="email"] {
        width: 100%;
        min-height: 48px;
        margin: 0;
        padding: 11px 14px;
        border: 1px solid var(--line);
        border-radius: 10px;
        background: #fff;
        color: var(--ink);
        font: inherit;
        font-size: .94rem;
        outline: none;
        box-sizing: border-box;
        transition: border-color .16s ease, box-shadow .16s ease;
      }

      .home-newsletter-form input[type="email"]:focus {
        border-color: rgba(143,29,44,.42);
        box-shadow: 0 0 0 3px rgba(143,29,44,.08);
      }

      .home-newsletter-form button {
        min-width: 132px;
        min-height: 48px;
        margin: 0;
        padding: 11px 18px;
        border: 1px solid var(--red);
        border-radius: 13px;
        background: var(--red);
        color: #fff;
        font: inherit;
        font-size: .9rem;
        font-weight: 900;
        cursor: pointer;
        white-space: nowrap;
        transition: transform .16s ease, background .16s ease;
      }

      .home-newsletter-form button:hover,
      .home-newsletter-form button:focus-visible {
        background: var(--red-dark);
        transform: translateY(-1px);
        outline: 3px solid rgba(143,29,44,.12);
      }

      .home-newsletter-note,
      .home-newsletter-success {
        grid-column: 2;
        margin: 9px 0 0 !important;
        font-size: .76rem !important;
        line-height: 1.45 !important;
        text-align: left !important;
      }

      .home-newsletter-note { color: var(--muted); }
      .home-newsletter-success { color: #17663b; font-weight: 900; }

      .home-newsletter-honey {
        position: absolute !important;
        left: -9999px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
      }

      @media (max-width: 820px) {
        .home-newsletter-inner {
          grid-template-columns: 1fr;
          gap: 24px;
        }
        .home-newsletter-signup {
          grid-template-columns: 56px minmax(0,1fr);
        }
        .home-newsletter-icon {
          width: 56px;
          height: 56px;
        }
      }

      @media (max-width: 640px) {
        .home-newsletter {
          padding: 24px 18px;
        }
        .home-newsletter-copy,
        .home-newsletter-lead {
          text-align: left !important;
        }
        .home-newsletter-copy .eyebrow {
          justify-content: flex-start;
        }
        .home-newsletter-signup {
          grid-template-columns: 1fr;
        }
        .home-newsletter-icon {
          display: none;
        }
        .home-newsletter-form {
          grid-template-columns: 1fr;
        }
        .home-newsletter-form button {
          width: 100%;
          min-width: 0;
        }
        .home-newsletter-note,
        .home-newsletter-success {
          grid-column: 1;
        }
      }

      @media (max-width: 460px) {
        .home-newsletter {
          border-radius: 22px;
        }
        .home-newsletter-promise {
          border-radius: 14px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function showSuccess(card) {
    if (window.location.hash !== "#newsletter-enviado") return;
    const success = card.querySelector(".home-newsletter-success");
    if (success) {
      success.hidden = false;
      success.textContent = "✓ Inscrição recebida. Obrigada por acompanhar o Vamos a Estudiar Español!";
    }
    window.setTimeout(() => {
      try {
        history.replaceState(history.state, "", window.location.pathname + window.location.search);
      } catch (_) {}
    }, 200);
  }

  function placeCard(card) {
    const home = document.getElementById("home-screen");
    const game = document.getElementById("home-false-friends-showcase");
    const grammar = document.getElementById("home-grammar-showcase");
    if (!home || !card) return false;

    if (game && grammar && game.parentElement === home && grammar.parentElement === home) {
      if (game.nextElementSibling !== card || card.nextElementSibling !== grammar) {
        home.insertBefore(game, grammar);
        home.insertBefore(card, grammar);
      }
      return true;
    }

    if (grammar?.parentElement === home) {
      if (card.nextElementSibling !== grammar) home.insertBefore(card, grammar);
      return true;
    }

    if (game?.parentElement === home) {
      if (game.nextElementSibling !== card) game.insertAdjacentElement("afterend", card);
      return true;
    }

    const featureGrid = home.querySelector(".feature-grid");
    if (featureGrid && featureGrid.nextElementSibling !== card) {
      featureGrid.insertAdjacentElement("afterend", card);
      return true;
    }

    return false;
  }

  function install() {
    injectStyles();

    const home = document.getElementById("home-screen");
    if (!home) {
      window.setTimeout(install, 220);
      return;
    }

    let card = document.getElementById("home-newsletter");
    if (!card) {
      card = document.createElement("section");
      card.id = "home-newsletter";
      card.className = "home-newsletter";
      card.setAttribute("aria-labelledby", "home-newsletter-title");
      card.innerHTML = `
        <div class="home-newsletter-inner">
          <div class="home-newsletter-copy">
            <p class="eyebrow">Newsletter · Novidades</p>
            <h2 id="home-newsletter-title">Assine nossa newsletter</h2>
            <p class="home-newsletter-lead">Receba novos conteúdos, atividades e novidades do Vamos a Estudiar Español diretamente no seu e-mail.</p>
            <p class="home-newsletter-promise"><span aria-hidden="true">✓</span><strong>Prometo não enviar spam.</strong><span>Somente conteúdo que vale a pena estudar.</span></p>
          </div>

          <div class="home-newsletter-signup">
            <span class="home-newsletter-icon" aria-hidden="true">✉</span>
            <div>
              <form class="home-newsletter-form" action="${FORM_ACTION}" method="POST">
                <div class="home-newsletter-field">
                  <label for="home-newsletter-email">Seu melhor e-mail</label>
                  <input id="home-newsletter-email" type="email" name="email" autocomplete="email" inputmode="email" placeholder="seuemail@exemplo.com" required />
                </div>
                <button type="submit">Assinar →</button>
                <input type="hidden" name="_subject" value="Nova inscrição — Newsletter Vamos a Estudiar Español" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="${RETURN_URL}" />
                <input type="hidden" name="origem" value="Newsletter da página inicial" />
                <label class="home-newsletter-honey" aria-hidden="true">Não preencher<input type="text" name="_honey" tabindex="-1" autocomplete="off" /></label>
              </form>
              <p class="home-newsletter-note">Você pode deixar de receber as novidades quando quiser.</p>
              <p class="home-newsletter-success" role="status" hidden></p>
            </div>
          </div>
        </div>
      `;
      home.appendChild(card);

      card.querySelector(".home-newsletter-form")?.addEventListener("submit", () => {
        if (typeof window.vaeTrack === "function") {
          window.vaeTrack("newsletter_signup", { placement: "home" });
        }
      });
    }

    placeCard(card);
    showSuccess(card);

    if (!observer) {
      observer = new MutationObserver(() => placeCard(card));
      observer.observe(home, { childList: true, subtree: false });
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      placeCard(card);
      attempts += 1;
      if (attempts >= 24) window.clearInterval(timer);
    }, 300);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
