/* Destaque do jogo de falsos amigos na página inicial. */
(function () {
  const STORAGE_KEY = "vae_false_friends_best";

  function bestScore() {
    try { return Number(localStorage.getItem(STORAGE_KEY)) || 0; } catch (_) { return 0; }
  }

  function injectStyles() {
    if (document.getElementById("home-false-friends-styles")) return;
    const style = document.createElement("style");
    style.id = "home-false-friends-styles";
    style.textContent = `
      .home-ff-showcase{
        width:min(100%,980px);
        margin:34px auto;
        padding:clamp(24px,4vw,38px);
        border:1px solid var(--line);
        border-radius:28px;
        background:linear-gradient(145deg,#fffdf9 0%,#fff5e4 100%);
        box-shadow:0 14px 38px rgba(70,40,20,.07);
      }
      .home-ff-inner{
        display:grid;
        grid-template-columns:minmax(220px,.72fr) minmax(0,1.28fr);
        gap:clamp(24px,4vw,42px);
        align-items:center;
      }
      .home-ff-visual{
        min-height:220px;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:16px;
        position:relative;
      }
      .home-ff-card{
        width:128px;
        aspect-ratio:1;
        border-radius:26px;
        border:6px solid #fff;
        display:grid;
        place-items:center;
        box-shadow:0 14px 28px rgba(88,45,24,.12);
        background:#fff8ee;
        font-size:3.5rem;
      }
      .home-ff-card:first-child{transform:rotate(-7deg)}
      .home-ff-card:last-child{transform:rotate(7deg);background:#fff0f0}
      .home-ff-vs{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        width:52px;
        height:52px;
        display:grid;
        place-items:center;
        border-radius:50%;
        background:var(--red);
        color:#fff;
        border:5px solid #fff;
        font-size:.78rem;
        font-weight:1000;
        letter-spacing:.06em;
        box-shadow:0 8px 18px rgba(143,29,44,.2);
      }
      .home-ff-copy{text-align:center}
      .home-ff-copy .eyebrow{justify-content:center}
      .home-ff-copy h2{
        margin:3px 0 12px;
        color:var(--red-dark);
        font-family:Georgia,"Times New Roman",serif;
        font-size:clamp(1.8rem,3.5vw,2.7rem);
        line-height:1.08;
      }
      .home-ff-copy>p:last-of-type{
        max-width:650px;
        margin:0 auto;
        color:var(--muted);
        line-height:1.72;
        text-align:center!important;
      }
      .home-ff-badges{
        display:flex;
        justify-content:center;
        flex-wrap:wrap;
        gap:8px;
        margin-top:18px;
      }
      .home-ff-badge{
        display:inline-flex;
        align-items:center;
        gap:6px;
        padding:7px 11px;
        border:1px solid var(--line);
        border-radius:999px;
        background:#fff;
        color:#6d5442;
        font-size:.78rem;
        font-weight:900;
      }
      .home-ff-actions{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:14px;
        flex-wrap:wrap;
        margin-top:22px;
      }
      .home-ff-play{
        min-width:190px;
        min-height:50px;
        border:0;
        border-radius:14px;
        background:var(--red);
        color:#fff;
        padding:12px 20px;
        font:inherit;
        font-weight:900;
        cursor:pointer;
        box-shadow:0 9px 22px rgba(143,29,44,.18);
      }
      .home-ff-play:hover,.home-ff-play:focus-visible{
        background:var(--red-dark);
        outline:3px solid rgba(143,29,44,.14);
      }
      .home-ff-best{
        color:var(--muted);
        font-size:.82rem;
        font-weight:800;
      }
      @media(max-width:760px){
        .home-ff-inner{grid-template-columns:1fr}
        .home-ff-visual{min-height:170px}
        .home-ff-card{width:104px;font-size:2.8rem}
      }
      @media(max-width:460px){
        .home-ff-showcase{padding:22px 16px;border-radius:22px}
        .home-ff-visual{min-height:145px;gap:10px}
        .home-ff-card{width:88px;border-radius:22px;font-size:2.35rem}
        .home-ff-vs{width:46px;height:46px}
        .home-ff-play{width:100%}
        .home-ff-actions{display:grid;grid-template-columns:1fr}
        .home-ff-best{text-align:center}
      }
    `;
    document.head.appendChild(style);
  }

  function startGameFromHome() {
    const gameStart = document.getElementById("false-friends-start");
    if (gameStart) {
      gameStart.click();
      return;
    }

    const quizButton = document.querySelector('.main-nav [data-route="quiz"]') || document.querySelector('[data-route="quiz"]');
    quizButton?.click();
    setTimeout(() => document.getElementById("false-friends-start")?.click(), 250);
  }

  function install() {
    const homeScreen = document.getElementById("home-screen");
    const featureGrid = homeScreen?.querySelector(".feature-grid");
    if (!homeScreen || !featureGrid) {
      setTimeout(install, 200);
      return;
    }
    if (document.getElementById("home-false-friends-showcase")) return;

    injectStyles();

    const section = document.createElement("section");
    section.id = "home-false-friends-showcase";
    section.className = "home-ff-showcase";
    section.setAttribute("aria-labelledby", "home-ff-title");
    section.innerHTML = `
      <div class="home-ff-inner">
        <div class="home-ff-visual" aria-hidden="true">
          <div class="home-ff-card">🤰</div>
          <span class="home-ff-vs">VS</span>
          <div class="home-ff-card">😳</div>
        </div>
        <div class="home-ff-copy">
          <p class="eyebrow">Jogo visual</p>
          <h2 id="home-ff-title">Falsos amigos: ¿qué significa de verdad?</h2>
          <p>Teste palavras espanholas que parecem familiares em português, mas escondem significados diferentes. Acerte antes que o tempo acabe e construa sua melhor sequência.</p>
          <div class="home-ff-badges" aria-label="Regras rápidas do jogo">
            <span class="home-ff-badge">🎯 10 rodadas</span>
            <span class="home-ff-badge">⏱️ 15 segundos</span>
            <span class="home-ff-badge">❤️ 3 vidas</span>
            <span class="home-ff-badge">✨ bônus por sequência</span>
          </div>
          <div class="home-ff-actions">
            <button class="home-ff-play" id="home-ff-play" type="button">Jogar agora →</button>
            <span class="home-ff-best" id="home-ff-best">Melhor pontuação: ${bestScore()}</span>
          </div>
        </div>
      </div>
    `;

    featureGrid.insertAdjacentElement("beforebegin", section);
    section.querySelector("#home-ff-play")?.addEventListener("click", startGameFromHome);

    window.addEventListener("storage", () => {
      const best = document.getElementById("home-ff-best");
      if (best) best.textContent = `Melhor pontuação: ${bestScore()}`;
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once:true });
  } else {
    install();
  }
})();
