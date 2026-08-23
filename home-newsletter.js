/* Newsletter compacta da página inicial. */
(function () {
  const FORM_ACTION = "https://formsubmit.co/contato.vamosaestudiarespanol@gmail.com";
  const RETURN_URL = "https://sasilva-cyber.github.io/vamos-a-estudiar-espanol-espacio-de-practica/#newsletter-enviado";

  function injectStyles() {
    if (document.getElementById("home-newsletter-styles")) return;

    const style = document.createElement("style");
    style.id = "home-newsletter-styles";
    style.textContent = `
      .home-newsletter {
        width: 100%;
        margin-top: 24px;
        padding: 20px 22px;
        border: 1px solid rgba(143,29,44,.18);
        border-radius: 20px;
        background: rgba(255,255,255,.68);
        box-shadow: 0 10px 28px rgba(93,50,34,.055);
      }

      .home-newsletter-head {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        margin-bottom: 14px;
      }

      .home-newsletter-icon {
        flex: 0 0 auto;
        width: 42px;
        height: 42px;
        display: grid;
        place-items: center;
        border-radius: 50%;
        background: #fff3ee;
        color: var(--red-dark, #7d1422);
        font-size: 1.2rem;
      }

      .home-newsletter-kicker {
        display: block;
        margin-bottom: 4px;
        color: var(--red, #981c2d);
        font-size: .74rem;
        font-weight: 900;
        letter-spacing: .12em;
        text-transform: uppercase;
      }

      .home-newsletter h2 {
        margin: 0 0 5px;
        color: var(--red-dark, #74111e);
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(1.28rem, 2.1vw, 1.55rem);
        line-height: 1.12;
      }

      .home-newsletter-copy p {
        margin: 0;
        color: var(--muted, #685d57);
        font-size: .96rem;
        line-height: 1.55;
        text-align: left !important;
      }

      .home-newsletter-form {
        display: grid;
        grid-template-columns: minmax(0,1fr) auto;
        gap: 12px;
        align-items: end;
      }

      .home-newsletter-field {
        min-width: 0;
        display: grid;
        gap: 6px;
      }

      .home-newsletter-field label {
        margin: 0;
        color: #342b27;
        font-size: .86rem;
        font-weight: 700;
        line-height: 1.25;
        text-align: left !important;
      }

      .home-newsletter-form input[type="email"] {
        width: 100%;
        min-height: 48px;
        margin: 0;
        padding: 12px 15px;
        border: 1px solid rgba(143,29,44,.22);
        border-radius: 13px;
        background: #fff;
        color: #2f2723;
        font: inherit;
        font-size: .95rem;
        outline: none;
        box-sizing: border-box;
        transition: border-color .16s ease, box-shadow .16s ease;
      }

      .home-newsletter-form input[type="email"]:focus {
        border-color: var(--red, #981c2d);
        box-shadow: 0 0 0 3px rgba(152,28,45,.09);
      }

      .home-newsletter-form button {
        min-width: 142px;
        min-height: 48px;
        margin: 0;
        padding: 12px 19px;
        border: 1px solid var(--red, #981c2d);
        border-radius: 13px;
        background: var(--red, #981c2d);
        color: #fff;
        font: inherit;
        font-size: .92rem;
        font-weight: 800;
        cursor: pointer;
        white-space: nowrap;
        transition: transform .16s ease, filter .16s ease;
      }

      .home-newsletter-form button:hover,
      .home-newsletter-form button:focus-visible {
        filter: brightness(.94);
        transform: translateY(-1px);
      }

      .home-newsletter-note,
      .home-newsletter-success {
        margin: 9px 0 0 !important;
        font-size: .78rem !important;
        line-height: 1.45 !important;
        text-align: left !important;
      }

      .home-newsletter-note { color: var(--muted, #766a63); }
      .home-newsletter-success { color: #17663b; font-weight: 800; }

      .home-newsletter-honey {
        position: absolute !important;
        left: -9999px !important;
        width: 1px !important;
        height: 1px !important;
        overflow: hidden !important;
      }

      @media (max-width: 640px) {
        .home-newsletter { padding: 18px; margin-top: 20px; }
        .home-newsletter-head { gap: 11px; }
        .home-newsletter-form { grid-template-columns: 1fr; }
        .home-newsletter-form button { width: 100%; min-width: 0; }
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

  function install() {
    injectStyles();

    const homeCopy = document.querySelector("#home-screen .home-copy");
    const actions = homeCopy?.querySelector(".hero-actions");
    if (!homeCopy || !actions) {
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
        <div class="home-newsletter-head">
          <span class="home-newsletter-icon" aria-hidden="true">✉</span>
          <div class="home-newsletter-copy">
            <span class="home-newsletter-kicker">Newsletter</span>
            <h2 id="home-newsletter-title">Assine nossa newsletter</h2>
            <p>Receba novos conteúdos em seu e-mail. Prometo não enviar spam.</p>
          </div>
        </div>

        <form class="home-newsletter-form" action="${FORM_ACTION}" method="POST">
          <div class="home-newsletter-field">
            <label for="home-newsletter-email">Seu e-mail</label>
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
        <p class="home-newsletter-note">Cadastre apenas o e-mail em que deseja receber as novidades.</p>
        <p class="home-newsletter-success" role="status" hidden></p>
      `;
      actions.insertAdjacentElement("afterend", card);
    }

    showSuccess(card);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
