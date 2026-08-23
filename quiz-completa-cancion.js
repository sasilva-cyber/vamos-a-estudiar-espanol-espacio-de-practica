/* Quiz "Completa la canción" con canciones tradicionales y sin repetir canciones hasta completar el ciclo. */
(function () {
  const SEEN_KEY = "vae-song-quiz-seen-v1";
  const BEST_KEY = "vae-song-quiz-best-v1";
  const ROUND_COUNT = 10;

  const SONGS = [
    { id: "la-cucaracha", title: "La Cucaracha", line: "La cucaracha, la cucaracha, ya no puede", answer: "caminar", options: ["caminar", "bailar", "cantar", "volar"] },
    { id: "cielito-lindo", title: "Cielito Lindo", line: "Ay, ay, ay, ay, canta y no", answer: "llores", options: ["llores", "pares", "duermas", "corras"] },
    { id: "los-pollitos", title: "Los Pollitos Dicen", line: "Los pollitos dicen pío, pío, pío cuando tienen", answer: "hambre", options: ["hambre", "frío", "sueño", "miedo"] },
    { id: "arroz-con-leche", title: "Arroz con leche", line: "Arroz con leche, me quiero", answer: "casar", options: ["casar", "quedar", "sentar", "march ar"].map((item) => item.replace("march ar", "marchar")) },
    { id: "naranja-dulce", title: "Naranja dulce", line: "Naranja dulce, limón partido, dame un", answer: "abrazo", options: ["abrazo", "beso", "regalo", "pañuelo"] },
    { id: "muneca-azul", title: "Tengo una muñeca", line: "Tengo una muñeca vestida de", answer: "azul", options: ["azul", "rojo", "verde", "blanco"] },
    { id: "patio-casa", title: "El patio de mi casa", line: "El patio de mi casa es", answer: "particular", options: ["particular", "especial", "pequeño", "musical"] },
    { id: "debajo-boton", title: "Debajo un botón", line: "Debajo un botón, ton, ton, que encontró", answer: "Martín", options: ["Martín", "Ramón", "Tomás", "Joaquín"] },
    { id: "mambru", title: "Mambrú se fue a la guerra", line: "Mambrú se fue a la guerra, qué", answer: "dolor", options: ["dolor", "valor", "calor", "temor"] },
    { id: "que-llueva", title: "Que llueva, que llueva", line: "Que llueva, que llueva, la Virgen de la", answer: "cueva", options: ["cueva", "sierra", "aldea", "huerta"] },
    { id: "aserrin", title: "Aserrín, aserrán", line: "Aserrín, aserrán, los maderos de San", answer: "Juan", options: ["Juan", "José", "Pedro", "Miguel"] },
    { id: "pasar-barca", title: "Al pasar la barca", line: "Al pasar la barca, me dijo el", answer: "barquero", options: ["barquero", "marinero", "viajero", "pescador"] },
    { id: "elefante", title: "Un elefante se balanceaba", line: "Un elefante se balanceaba sobre la tela de una", answer: "araña", options: ["araña", "cortina", "hamaca", "ventana"] },
    { id: "cinco-lobitos", title: "Cinco lobitos", line: "Cinco lobitos tiene la", answer: "loba", options: ["loba", "oveja", "gata", "osa"] },
    { id: "anton-pirulero", title: "Antón Pirulero", line: "Antón, Antón, Antón Pirulero, cada cual atienda su", answer: "juego", options: ["juego", "turno", "canto", "puesto"] },
    { id: "cocherito", title: "El cocherito, leré", line: "El cocherito, leré, me dijo anoche, leré, que si", answer: "quería", options: ["quería", "podía", "venía", "sabía"] },
    { id: "cucu-rana", title: "Cucú cantaba la rana", line: "Cucú, cantaba la rana, cucú, debajo del", answer: "agua", options: ["agua", "puente", "árbol", "cielo"] },
    { id: "farolera", title: "La farolera", line: "La farolera tropezó y en la calle se", answer: "cayó", options: ["cayó", "sentó", "paró", "durmió"] },
    { id: "tarara", title: "La Tarara", line: "Tiene la Tarara un vestido", answer: "verde", options: ["verde", "blanco", "rojo", "negro"] },
    { id: "campana", title: "Campana sobre campana", line: "Campana sobre campana, y sobre campana", answer: "una", options: ["una", "dos", "tres", "cuatro"] },
    { id: "peces-rio", title: "Los peces en el río", line: "Pero mira cómo beben los peces en el", answer: "río", options: ["río", "mar", "lago", "pozo"] },
    { id: "chiquirritin", title: "Ay del chiquirritín", line: "Ay del chiquirritín, chiquirriquitín, metidito entre", answer: "pajas", options: ["pajas", "mantas", "flores", "ramas"] },
    { id: "vibora-mar", title: "A la víbora de la mar", line: "A la víbora de la mar, por aquí pueden", answer: "pasar", options: ["pasar", "jugar", "bailar", "cantar"] },
    { id: "dona-blanca", title: "Doña Blanca", line: "Doña Blanca está cubierta de pilares de oro y", answer: "plata", options: ["plata", "cobre", "cristal", "madera"] }
  ];

  window.VAE_SONG_QUIZ_BANK = SONGS;

  const state = { queue: [], index: 0, score: 0, answered: false };

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function readSeen() {
    try {
      const parsed = JSON.parse(localStorage.getItem(SEEN_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter((id) => SONGS.some((song) => song.id === id)) : [];
    } catch (_) {
      return [];
    }
  }

  function saveSeen(ids) {
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(ids)); } catch (_) {}
  }

  function readBest() {
    try { return Number(localStorage.getItem(BEST_KEY) || 0) || 0; } catch (_) { return 0; }
  }

  function saveBest(score) {
    const best = Math.max(readBest(), score);
    try { localStorage.setItem(BEST_KEY, String(best)); } catch (_) {}
    return best;
  }

  function buildQueue() {
    let seen = new Set(readSeen());
    const queue = [];

    while (queue.length < ROUND_COUNT) {
      let available = SONGS.filter((song) => !seen.has(song.id) && !queue.some((item) => item.id === song.id));
      if (!available.length) {
        seen = new Set();
        available = SONGS.filter((song) => !queue.some((item) => item.id === song.id));
      }
      const needed = ROUND_COUNT - queue.length;
      const chosen = shuffle(available).slice(0, needed);
      chosen.forEach((song) => {
        queue.push(song);
        seen.add(song.id);
      });
    }

    saveSeen([...seen]);
    return queue;
  }

  function hideAllAppSections(exceptId) {
    document.querySelectorAll("#app > section").forEach((section) => {
      if (section.id === exceptId) section.classList.remove("hidden");
      else section.classList.add("hidden");
    });
  }

  function returnToQuiz() {
    document.getElementById("song-quiz-screen")?.classList.add("hidden");
    const quizLibrary = document.getElementById("level-screen");
    quizLibrary?.classList.remove("hidden");
    document.querySelectorAll(".main-nav .nav-link").forEach((item) => item.classList.toggle("active", item.dataset.route === "quiz"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function injectStyles() {
    if (document.getElementById("song-quiz-styles")) return;
    const style = document.createElement("style");
    style.id = "song-quiz-styles";
    style.textContent = `
      .song-quiz-feature {
        margin: 24px 0 4px;
        padding: 22px;
        border: 1px solid var(--line, #ead8cc);
        border-radius: 20px;
        background: linear-gradient(135deg, rgba(255,255,255,.92), rgba(255,247,239,.84));
        display: grid;
        grid-template-columns: 64px minmax(0,1fr) auto;
        gap: 18px;
        align-items: center;
      }
      .song-quiz-feature-icon {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        display: grid;
        place-items: center;
        background: #fff0e8;
        color: var(--red, #981c2d);
        font-size: 1.55rem;
      }
      .song-quiz-feature-copy small {
        display: block;
        margin-bottom: 4px;
        color: var(--red, #981c2d);
        font-size: .72rem;
        font-weight: 900;
        letter-spacing: .1em;
        text-transform: uppercase;
      }
      .song-quiz-feature-copy h3 {
        margin: 0 0 7px;
        color: var(--red-dark, #74111e);
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(1.35rem,2.4vw,1.8rem);
      }
      .song-quiz-feature-copy p {
        margin: 0;
        color: var(--muted, #685d57);
        line-height: 1.6;
        text-align: left !important;
      }
      .song-quiz-feature .primary-button { white-space: nowrap; }

      .song-quiz-screen { padding-bottom: 28px; }
      .song-quiz-shell { max-width: 900px; margin: 0 auto; }
      .song-quiz-topbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 18px;
      }
      .song-quiz-badge {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        border: 1px solid var(--line, #ead8cc);
        border-radius: 999px;
        background: #fff;
        padding: 8px 12px;
        color: var(--red-dark, #74111e);
        font-size: .82rem;
        font-weight: 900;
      }
      .song-quiz-card {
        border: 1px solid var(--line, #ead8cc);
        border-radius: 24px;
        background: rgba(255,255,255,.9);
        padding: clamp(22px,4vw,36px);
        box-shadow: 0 14px 36px rgba(70,40,20,.06);
      }
      .song-quiz-meta {
        display: flex;
        justify-content: space-between;
        gap: 14px;
        margin-bottom: 16px;
        color: var(--muted, #685d57);
        font-weight: 800;
        font-size: .88rem;
      }
      .song-quiz-title {
        margin: 0 0 8px;
        color: var(--red-dark, #74111e);
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(1.55rem,3vw,2.2rem);
      }
      .song-quiz-instruction { margin: 0 0 22px; color: var(--muted, #685d57); }
      .song-quiz-line {
        margin: 0 0 26px;
        padding: 22px;
        border: 1px solid rgba(152,28,45,.14);
        border-radius: 18px;
        background: #fff8f3;
        color: #332925;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(1.25rem,2.8vw,1.75rem);
        line-height: 1.55;
        text-align: center !important;
      }
      .song-blank {
        display: inline-block;
        margin-left: .18em;
        color: var(--red, #981c2d);
        letter-spacing: .12em;
        font-weight: 900;
      }
      .song-quiz-options {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 12px;
      }
      .song-option {
        min-height: 58px;
        border: 1px solid rgba(152,28,45,.22);
        border-radius: 14px;
        background: #fff;
        color: var(--red-dark, #74111e);
        padding: 13px 16px;
        font: inherit;
        font-weight: 850;
        cursor: pointer;
        transition: transform .15s ease, border-color .15s ease, background .15s ease;
      }
      .song-option:hover:not(:disabled), .song-option:focus-visible:not(:disabled) {
        transform: translateY(-1px);
        border-color: var(--red, #981c2d);
        background: #fff8f3;
        outline: none;
      }
      .song-option.correct { background: #eef8f1; border-color: #2c7a4b; color: #1f6039; }
      .song-option.wrong { background: #fff0f0; border-color: #b64949; color: #8d2a2a; }
      .song-quiz-feedback {
        margin-top: 18px;
        padding: 15px 17px;
        border-radius: 14px;
        background: #faf4ec;
        color: #51453f;
        line-height: 1.55;
      }
      .song-quiz-feedback strong { color: var(--red-dark, #74111e); }
      .song-quiz-actions { display: flex; justify-content: flex-end; margin-top: 18px; }
      .song-quiz-result { text-align: center; }
      .song-quiz-result-score {
        width: 112px;
        height: 112px;
        margin: 20px auto;
        border: 7px solid #f1d8cf;
        border-radius: 50%;
        display: grid;
        place-items: center;
        color: var(--red-dark, #74111e);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 2rem;
        font-weight: 900;
      }
      .song-quiz-result-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 12px; margin-top: 22px; }
      @media (max-width: 720px) {
        .song-quiz-feature { grid-template-columns: 52px 1fr; }
        .song-quiz-feature > .primary-button { grid-column: 1 / -1; width: 100%; }
        .song-quiz-options { grid-template-columns: 1fr; }
      }
      @media (max-width: 520px) {
        .song-quiz-feature { grid-template-columns: 1fr; text-align: center; }
        .song-quiz-feature-icon { margin: 0 auto; }
        .song-quiz-feature-copy p { text-align: center !important; }
        .song-quiz-topbar { align-items: stretch; flex-direction: column; }
        .song-quiz-topbar .text-button { align-self: flex-start; }
        .song-quiz-card { padding: 20px 16px; }
        .song-quiz-meta { flex-direction: column; }
      }
    `;
    document.head.appendChild(style);
  }

  function ensureScreen() {
    let screen = document.getElementById("song-quiz-screen");
    if (screen) return screen;
    const app = document.getElementById("app");
    if (!app) return null;
    screen = document.createElement("section");
    screen.id = "song-quiz-screen";
    screen.className = "song-quiz-screen hidden";
    screen.setAttribute("aria-labelledby", "song-quiz-heading");
    screen.innerHTML = `
      <div class="song-quiz-shell">
        <div class="song-quiz-topbar">
          <button class="text-button" type="button" data-song-back>← Voltar para Quiz</button>
          <span class="song-quiz-badge">♫ Completa la canción</span>
        </div>
        <div id="song-quiz-content"></div>
      </div>
    `;
    app.appendChild(screen);
    screen.querySelector("[data-song-back]")?.addEventListener("click", returnToQuiz);
    return screen;
  }

  function renderQuestion() {
    const content = document.getElementById("song-quiz-content");
    const song = state.queue[state.index];
    if (!content || !song) return;
    state.answered = false;
    const best = readBest();
    const options = shuffle(song.options);
    content.innerHTML = `
      <article class="song-quiz-card">
        <div class="song-quiz-meta">
          <span>Canção ${state.index + 1} de ${state.queue.length}</span>
          <span>${state.score} acertos · Melhor: ${best}/${ROUND_COUNT}</span>
        </div>
        <p class="eyebrow">Canción tradicional</p>
        <h1 class="song-quiz-title" id="song-quiz-heading">${song.title}</h1>
        <p class="song-quiz-instruction">Escolha a palavra que completa corretamente o trecho.</p>
        <p class="song-quiz-line">“${song.line} <span class="song-blank">□□□□</span>”</p>
        <div class="song-quiz-options" role="group" aria-label="Alternativas">
          ${options.map((option) => `<button class="song-option" type="button" data-song-option="${option}">${option}</button>`).join("")}
        </div>
        <div class="song-quiz-feedback" id="song-quiz-feedback" hidden></div>
        <div class="song-quiz-actions"><button class="primary-button" id="song-quiz-next" type="button" hidden>${state.index + 1 === state.queue.length ? "Ver resultado →" : "Próxima canção →"}</button></div>
      </article>
    `;

    content.querySelectorAll("[data-song-option]").forEach((button) => {
      button.addEventListener("click", () => answerQuestion(button.dataset.songOption));
    });
    document.getElementById("song-quiz-next")?.addEventListener("click", nextQuestion);
  }

  function answerQuestion(selected) {
    if (state.answered) return;
    state.answered = true;
    const song = state.queue[state.index];
    const correct = selected === song.answer;
    if (correct) state.score += 1;

    document.querySelectorAll(".song-option").forEach((button) => {
      button.disabled = true;
      if (button.dataset.songOption === song.answer) button.classList.add("correct");
      else if (button.dataset.songOption === selected) button.classList.add("wrong");
    });

    const feedback = document.getElementById("song-quiz-feedback");
    if (feedback) {
      feedback.hidden = false;
      feedback.innerHTML = correct
        ? `<strong>¡Muy bien!</strong> A palavra que completa esta versão tradicional é <strong>${song.answer}</strong>.`
        : `<strong>Quase!</strong> Nesta versão tradicional, a palavra correta é <strong>${song.answer}</strong>.`;
    }
    const next = document.getElementById("song-quiz-next");
    if (next) next.hidden = false;
  }

  function nextQuestion() {
    if (!state.answered) return;
    state.index += 1;
    if (state.index >= state.queue.length) renderResult();
    else renderQuestion();
  }

  function renderResult() {
    const content = document.getElementById("song-quiz-content");
    if (!content) return;
    const best = saveBest(state.score);
    const seenCount = readSeen().length;
    const message = state.score >= 9 ? "¡Excelente oído y memoria!" : state.score >= 7 ? "¡Muy buen resultado!" : state.score >= 5 ? "Bom caminho: continue praticando." : "Vale a pena jogar outra rodada e reconhecer novos trechos.";
    content.innerHTML = `
      <article class="song-quiz-card song-quiz-result">
        <p class="eyebrow">Resultado</p>
        <h1 class="song-quiz-title" id="song-quiz-heading">¡Partida completada!</h1>
        <div class="song-quiz-result-score">${state.score}/${state.queue.length}</div>
        <p><strong>${message}</strong></p>
        <p>Você já percorreu ${seenCount} de ${SONGS.length} canções neste ciclo. Uma música não volta a aparecer antes de o ciclo ser completado.</p>
        <p>Melhor resultado: <strong>${best}/${ROUND_COUNT}</strong></p>
        <div class="song-quiz-result-actions">
          <button class="primary-button" type="button" data-song-replay>Jogar com outras músicas →</button>
          <button class="secondary-button" type="button" data-song-result-back>Voltar para Quiz</button>
        </div>
      </article>
    `;
    content.querySelector("[data-song-replay]")?.addEventListener("click", startGame);
    content.querySelector("[data-song-result-back]")?.addEventListener("click", returnToQuiz);
  }

  function startGame() {
    const screen = ensureScreen();
    if (!screen) return;
    state.queue = buildQueue();
    state.index = 0;
    state.score = 0;
    state.answered = false;
    hideAllAppSections("song-quiz-screen");
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function installCard() {
    const block = document.getElementById("quiz-activities-block");
    const grid = document.getElementById("activity-grid");
    if (!block || !grid) return false;
    if (document.getElementById("song-quiz-feature")) return true;

    const card = document.createElement("article");
    card.id = "song-quiz-feature";
    card.className = "song-quiz-feature";
    card.dataset.songQuizCount = String(SONGS.length);
    card.innerHTML = `
      <span class="song-quiz-feature-icon" aria-hidden="true">♫</span>
      <div class="song-quiz-feature-copy">
        <small>Quiz musical</small>
        <h3>Completa la canción</h3>
        <p>Complete trechos curtos de ${SONGS.length} canções tradicionais em espanhol. São 10 músicas por partida e nenhuma se repete antes de você percorrer todo o banco.</p>
      </div>
      <button class="primary-button" type="button" data-song-start>Empezar →</button>
    `;
    grid.insertAdjacentElement("beforebegin", card);
    card.querySelector("[data-song-start]")?.addEventListener("click", startGame);
    return true;
  }

  function installNavSafety() {
    document.querySelectorAll("[data-route]").forEach((button) => {
      if (button.dataset.songQuizBound === "true") return;
      button.dataset.songQuizBound = "true";
      button.addEventListener("click", () => document.getElementById("song-quiz-screen")?.classList.add("hidden"));
    });
  }

  function install() {
    injectStyles();
    ensureScreen();
    installNavSafety();
    if (!installCard()) {
      window.setTimeout(install, 250);
      return;
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
  else install();
})();
