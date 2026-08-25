/* Newsletter da home: instalação única, sem MutationObserver e sem setInterval. */
(function () {
  const FORM_ACTION = "https://formsubmit.co/contato.vamosaestudiarespanol@gmail.com";

  function injectStyles() {
    if (document.getElementById("home-newsletter-styles")) return;
    const style = document.createElement("style");
    style.id = "home-newsletter-styles";
    style.textContent = `
      .home-newsletter{margin:34px 0 0;padding:30px clamp(20px,4vw,34px);border:1px solid var(--line);border-radius:26px;background:rgba(255,255,255,.78);box-shadow:0 12px 36px rgba(70,40,20,.055)}
      .home-newsletter-inner{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(300px,.92fr);gap:clamp(28px,5vw,54px);align-items:center}
      .home-newsletter-copy h2{margin:4px 0 12px;color:var(--red-dark);font:700 clamp(1.65rem,3.4vw,2.35rem)/1.12 Georgia,"Times New Roman",serif}.home-newsletter-copy>p:last-child{margin:0;color:var(--muted);line-height:1.65}
      .home-newsletter-form{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;align-items:end}.home-newsletter-field{display:grid;gap:6px}.home-newsletter-field label{color:var(--muted);font-size:.7rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.home-newsletter-form input[type=email]{width:100%;min-height:48px;padding:11px 14px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--ink);font:inherit;box-sizing:border-box}.home-newsletter-form button{min-height:48px;padding:11px 18px;border:1px solid var(--red);border-radius:13px;background:var(--red);color:#fff;font:inherit;font-weight:900;cursor:pointer}.home-newsletter-note{grid-column:1/-1;margin:8px 0 0;color:var(--muted);font-size:.76rem;line-height:1.45}
      @media(max-width:760px){.home-newsletter-inner{grid-template-columns:1fr;gap:22px}.home-newsletter-form{grid-template-columns:1fr}.home-newsletter-form button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function install() {
    const home = document.getElementById("home-screen");
    if (!home || document.getElementById("home-newsletter")) return;
    injectStyles();

    const card = document.createElement("section");
    card.id = "home-newsletter";
    card.className = "home-newsletter";
    card.setAttribute("aria-labelledby", "home-newsletter-title");
    card.innerHTML = `
      <div class="home-newsletter-inner">
        <div class="home-newsletter-copy">
          <p class="eyebrow">Newsletter · Novidades</p>
          <h2 id="home-newsletter-title">Assine nossa newsletter</h2>
          <p>Receba novos conteúdos, atividades e novidades do Vamos a Estudiar Español diretamente no seu e-mail.</p>
        </div>
        <form class="home-newsletter-form" action="${FORM_ACTION}" method="POST">
          <div class="home-newsletter-field"><label for="home-newsletter-email">Seu melhor e-mail</label><input id="home-newsletter-email" type="email" name="email" autocomplete="email" inputmode="email" placeholder="seuemail@exemplo.com" required></div>
          <button type="submit">Assinar →</button>
          <p class="home-newsletter-note">Sem spam. Você pode deixar de receber as novidades quando quiser.</p>
        </form>`;

    const grammar = document.getElementById("home-grammar-showcase");
    const featureGrid = home.querySelector(".feature-grid");
    if (grammar?.parentElement === home) home.insertBefore(card, grammar);
    else if (featureGrid) featureGrid.insertAdjacentElement("afterend", card);
    else home.appendChild(card);

    window.dispatchEvent(new Event("vae:home-newsletter-ready"));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once:true });
  else install();
})();