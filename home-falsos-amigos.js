/* Destaque do jogo Jugando y aprendiendo na página inicial. */
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
        width:auto;
        max-width:none;
        margin:34px 0 0;
        padding:30px clamp(20px,4vw,34px) 26px;
        box-sizing:border-box;
        border:1px solid var(--line);
        border-radius:26px;
        background:rgba(255,255,255,.74);
        box-shadow:0 12px 36px rgba(70,40,20,.055);
      }
      .home-ff-inner{
        display:grid;
        grid-template-columns:minmax(210px,.72fr) minmax(0,1.28fr);
        gap:clamp(26px,4vw,46px);
        align-items:center;
      }
      .home-ff-visual{
        min-height:205px;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:14px;
        position:relative;
      }
      .home-ff-card{
        width:118px;
        aspect-ratio:1;
        border-radius:50%;
        border:7px solid #fff;
        display:grid;
        place-items:center;
        box-shadow:0 8px 24px rgba(88,45,24,.11);
        background:linear-gradient(145deg,#fff8ec 0%,#f7e7dc 52%,#f1d7d7 100%);
        font-size:3.2rem;
      }
      .home-ff-card:first-child{transform:rotate(-6deg)}
      .home-ff-card:last-child{transform:rotate(6deg)}
      .home-ff-vs{
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%,-50%);
        width:48px;
        height:48px;
        display:grid;
        place-items:center;
        border-radius:50%;
        background:var(--red);
        color:#fff;
        border:5px solid #fff;
        font-size:.74rem;
        font-weight:1000;
        letter-spacing:.06em;
        box-shadow:0 8px 18px rgba(143,29,44,.16);
      }
      .home-ff-copy{text-align:left}
      .home-ff-copy .eyebrow{justify-content:flex-start}
      .home-ff-copy h2{
        margin:4px 0 12px;
        color:var(--red-dark);
        font-family:Georgia,"Times New Roman",serif;
        font-size:clamp(1.65rem,3.4vw,2.35rem);
        line-height:1.12;
      }
      .home-ff-copy>p:last-of-type{
        max-width:720px;
        margin:0;
        color:var(--muted);
        line-height:1.7;
        text-align:justify!important;
        text-justify:inter-word;
      }
      .home-ff-badges{
        display:flex;
        justify-content:flex-start;
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
        justify-content:flex-start;
        gap:14px;
        flex-wrap:wrap;
        margin-top:22px;
      }
      .home-ff-play{
        min-width:185px;
        min-height:48px;
        border:0;
        border-radius:13px;
        background:var(--red);
        color:#fff;
        padding:12px 20px;
        font:inherit;
        font-weight:900;
        cursor:pointer;
      }
      .home-ff-play:hover,.home-ff-play:focus-visible{
        background:var(--red-dark);
        outline:3px solid rgba(143,29,44,.14);
      }
      .home-ff-best{color:var(--muted);font-size:.82rem;font-weight:800}
      @media(max-width:760px){
        .home-ff-showcase{padding:24px 18px}
        .home-ff-inner{grid-template-columns:1fr}
        .home-ff-visual{min-height:170px}
        .home-ff-card{width:104px;font-size:2.8rem}
        .home-ff-copy{text-align:center}
        .home-ff-copy .eyebrow,.home-ff-badges,.home-ff-actions{justify-content:center}
        .home-ff-copy>p:last-of-type{margin:0 auto;text-align:left!important}
      }
      @media(max-width:460px){
        .home-ff-showcase{border-radius:22px}
        .home-ff-visual{min-height:145px;gap:10px}
        .home-ff-card{width:88px;font-size:2.35rem}
        .home-ff-vs{width:44px;height:44px}
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
          <p class="eyebrow">Juego visual · Falsos amigos</p>
          <h2 id="home-ff-title">Jugando y aprendiendo</h2>
          <p>Avance por níveis, reconheça falsos amigos entre o espanhol e o português e amplie seu vocabulário enquanto joga.</p>
          <div class="home-ff-badges" aria-label="Regras rápidas do jogo">
            <span class="home-ff-badge">🎮 10 níveis</span>
            <span class="home-ff-badge">📚 676 correspondências</span>
            <span class="home-ff-badge">❤️ 3 vidas</span>
            <span class="home-ff-badge">🔓 progresso salvo</span>
          </div>
          <div class="home-ff-actions">
            <button class="home-ff-play" id="home-ff-play" type="button">Jugar y aprender →</button>
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
