/* Jogo visual de falsos amigos dentro da aba Quiz. */
(function () {
  const STORAGE_KEY = "vae_false_friends_best";
  const ROUND_COUNT = 10;
  const STARTING_LIVES = 3;
  const ROUND_SECONDS = 15;

  const bank = [
    {
      word: "embarazada",
      context: "Laura está embarazada de seis meses.",
      answer: "Grávida",
      explanation: "Em espanhol, «embarazada» significa grávida. Para «embaraçada» no sentido de constrangida, é mais natural usar «avergonzada» ou «incómoda», conforme o contexto.",
      options: [
        ["Grávida", "🤰"], ["Envergonhada", "😳"], ["Cansada", "😴"], ["Com pressa", "🏃"]
      ]
    },
    {
      word: "oficina",
      context: "Trabajo en una oficina en el centro de Madrid.",
      answer: "Escritório",
      explanation: "Em espanhol, «oficina» normalmente é um escritório ou local de trabalho administrativo. «Taller» é a palavra frequente para oficina mecânica.",
      options: [
        ["Escritório", "🖥️"], ["Oficina mecânica", "🔧"], ["Cozinha", "🍳"], ["Loja", "🛍️"]
      ]
    },
    {
      word: "vaso",
      context: "Pon un poco de agua en el vaso, por favor.",
      answer: "Copo",
      explanation: "«Vaso» em espanhol é o recipiente usado para beber: copo. Um vaso de plantas é normalmente «maceta».",
      options: [
        ["Copo", "🥛"], ["Vaso de planta", "🪴"], ["Garrafa", "🍾"], ["Prato", "🍽️"]
      ]
    },
    {
      word: "apellido",
      context: "Mi nombre es Lucía y mi apellido es Torres.",
      answer: "Sobrenome",
      explanation: "«Apellido» significa sobrenome. O falso amigo é «apelido», que em espanhol costuma ser «apodo».",
      options: [
        ["Sobrenome", "🪪"], ["Apelido", "🏷️"], ["Nome do meio", "✍️"], ["Endereço", "🏠"]
      ]
    },
    {
      word: "largo",
      context: "El camino es largo, pero el paisaje es precioso.",
      answer: "Comprido",
      explanation: "Em espanhol, «largo» indica extensão ou comprimento: comprido. «Ancho» corresponde a largo no sentido de largura.",
      options: [
        ["Comprido", "📏"], ["Largo / amplo", "↔️"], ["Curto", "✂️"], ["Alto", "⬆️"]
      ]
    },
    {
      word: "exquisito",
      context: "Este postre está exquisito.",
      answer: "Delicioso",
      explanation: "Neste contexto, «exquisito» significa delicioso, excelente ou requintado. Não significa «esquisito» como em português.",
      options: [
        ["Delicioso", "🍰"], ["Esquisito", "🤨"], ["Queimado", "🔥"], ["Sem sabor", "😐"]
      ]
    },
    {
      word: "escoba",
      context: "Necesito una escoba para barrer el suelo.",
      answer: "Vassoura",
      explanation: "«Escoba» significa vassoura. «Escova», em espanhol, costuma ser «cepillo».",
      options: [
        ["Vassoura", "🧹"], ["Escova", "🪥"], ["Pano", "🧽"], ["Balde", "🪣"]
      ]
    },
    {
      word: "rato",
      context: "Espera un rato; ya vuelvo.",
      answer: "Um momento",
      explanation: "Na expressão «un rato», a palavra significa um período curto de tempo, um momento. O animal «rato» em espanhol é «ratón».",
      options: [
        ["Um momento", "⏳"], ["Um rato", "🐭"], ["Uma rota", "🗺️"], ["Uma fila", "🚶"]
      ]
    },
    {
      word: "presunto",
      context: "La policía interrogó al presunto autor del robo.",
      answer: "Suposto / alegado",
      explanation: "«Presunto» em espanhol significa suposto, presumido ou alegado. O alimento presunto é «jamón».",
      options: [
        ["Suposto / alegado", "❓"], ["Presunto (alimento)", "🥪"], ["Testemunha", "👁️"], ["Culpado condenado", "⚖️"]
      ]
    },
    {
      word: "cachorro",
      context: "El cachorro de león juega cerca de su madre.",
      answer: "Filhote",
      explanation: "Em espanhol, «cachorro» designa um filhote de determinados mamíferos. Não é simplesmente o equivalente geral de «cachorro» em português.",
      options: [
        ["Filhote", "🐾"], ["Cachorro adulto", "🐕"], ["Gato", "🐈"], ["Coelho", "🐇"]
      ]
    },
    {
      word: "borracha",
      context: "Después de beber demasiado, estaba borracha.",
      answer: "Bêbada",
      explanation: "Como adjetivo feminino, «borracha» significa bêbada. A borracha de apagar é «goma de borrar».",
      options: [
        ["Bêbada", "😵"], ["Borracha de apagar", "🧽"], ["Molhada", "💧"], ["Machucada", "🩹"]
      ]
    },
    {
      word: "carpeta",
      context: "Guarda los documentos en la carpeta azul.",
      answer: "Pasta / fichário",
      explanation: "«Carpeta» é uma pasta para documentos. O revestimento «carpete» é normalmente «moqueta» ou «alfombra», dependendo do uso regional e do contexto.",
      options: [
        ["Pasta / fichário", "📁"], ["Carpete", "🧶"], ["Caderno", "📓"], ["Envelope", "✉️"]
      ]
    },
    {
      word: "suceso",
      context: "El periódico informó sobre el suceso de ayer.",
      answer: "Acontecimento",
      explanation: "«Suceso» significa acontecimento, fato ou ocorrência. «Sucesso» em espanhol é «éxito».",
      options: [
        ["Acontecimento", "📰"], ["Sucesso", "🏆"], ["Segredo", "🤫"], ["Projeto", "📋"]
      ]
    },
    {
      word: "crianza",
      context: "La crianza de los hijos requiere tiempo y paciencia.",
      answer: "Criação / educação dos filhos",
      explanation: "«Crianza» refere-se ao processo de criar e educar filhos ou também à criação de animais, conforme o contexto. Não significa «criança».",
      options: [
        ["Criação / educação dos filhos", "👨‍👩‍👧"], ["Criança", "🧒"], ["Brincadeira", "🪁"], ["Escola", "🏫"]
      ]
    },
    {
      word: "contestar",
      context: "Voy a contestar tu mensaje después de la clase.",
      answer: "Responder",
      explanation: "Neste contexto, «contestar» significa responder. Em português, «contestar» tende a sugerir questionar ou impugnar algo.",
      options: [
        ["Responder", "💬"], ["Contestar / discordar", "🙅"], ["Apagar", "🗑️"], ["Copiar", "📋"]
      ]
    },
    {
      word: "salada",
      context: "La sopa está demasiado salada.",
      answer: "Salgada",
      explanation: "«Salada» é o feminino do adjetivo «salado»: salgada. A comida «salada» em português corresponde a «ensalada» em espanhol.",
      options: [
        ["Salgada", "🧂"], ["Salada", "🥗"], ["Doce", "🍯"], ["Fria", "🧊"]
      ]
    },
    {
      word: "taza",
      context: "Quiero una taza de café con leche.",
      answer: "Xícara",
      explanation: "«Taza» é xícara. A forma parecida com «taça» pode enganar; para taça ou cálice, o espanhol usa frequentemente «copa».",
      options: [
        ["Xícara", "☕"], ["Taça", "🏆"], ["Panela", "🍲"], ["Jarra", "🫗"]
      ]
    },
    {
      word: "fecha",
      context: "¿Cuál es la fecha de hoy?",
      answer: "Data",
      explanation: "«Fecha» como substantivo significa data. «Fecha!» em português é forma do verbo fechar, mas em espanhol o verbo é «cerrar».",
      options: [
        ["Data", "📅"], ["Fechamento", "🔒"], ["Hora", "🕒"], ["Endereço", "📍"]
      ]
    },
    {
      word: "aceite",
      context: "Añade un poco de aceite de oliva a la ensalada.",
      answer: "Óleo",
      explanation: "«Aceite» em espanhol significa óleo, especialmente óleo alimentar. Em português, «aceite» costuma se relacionar ao verbo aceitar ou à aceitação.",
      options: [
        ["Óleo", "🫒"], ["Aceitação", "✅"], ["Vinagre", "🍶"], ["Molho", "🥫"]
      ]
    },
    {
      word: "cena",
      context: "La cena estará lista a las ocho.",
      answer: "Jantar",
      explanation: "«Cena» em espanhol significa jantar ou a refeição da noite. Uma «cena» de filme em português corresponde a «escena» em espanhol.",
      options: [
        ["Jantar", "🍽️"], ["Cena de filme", "🎬"], ["Café da manhã", "🥐"], ["Festa", "🎉"]
      ]
    }
  ];

  let deck = [];
  let roundIndex = 0;
  let score = 0;
  let correctCount = 0;
  let streak = 0;
  let lives = STARTING_LIVES;
  let secondsLeft = ROUND_SECONDS;
  let timerId = null;
  let locked = false;
  let fiftyUsed = false;

  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function bestScore() {
    try { return Number(localStorage.getItem(STORAGE_KEY)) || 0; } catch (_) { return 0; }
  }

  function saveBest(value) {
    try { localStorage.setItem(STORAGE_KEY, String(value)); } catch (_) {}
  }

  function injectStyles() {
    if (document.getElementById("false-friends-game-styles")) return;
    const style = document.createElement("style");
    style.id = "false-friends-game-styles";
    style.textContent = `
      .ff-block{margin-top:44px;padding:30px;border:1px solid var(--line);border-radius:24px;background:linear-gradient(145deg,#fffdf9 0%,#fff6e7 100%);box-shadow:0 12px 34px rgba(70,40,20,.06)}
      .ff-block-head{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:24px;align-items:center}
      .ff-block-copy h2{margin:4px 0 10px;color:var(--red-dark);font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.7rem,3vw,2.35rem)}
      .ff-block-copy>p:last-child{max-width:760px;margin:0;color:var(--muted);line-height:1.7}
      .ff-block-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px}
      .ff-badge{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border-radius:999px;background:#fff;border:1px solid var(--line);color:#6d5442;font-size:.77rem;font-weight:900}
      .ff-start{min-width:170px;min-height:50px;border:0;border-radius:14px;background:var(--red);color:#fff;padding:12px 18px;font:inherit;font-weight:900;cursor:pointer;box-shadow:0 8px 20px rgba(143,29,44,.18)}
      .ff-start:hover,.ff-start:focus-visible{background:var(--red-dark);outline:3px solid rgba(143,29,44,.15)}
      .ff-best-line{margin-top:10px;color:var(--muted);font-size:.8rem;text-align:center}

      .ff-game-screen{width:min(100%,980px);margin:0 auto}
      .ff-game-top{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px;flex-wrap:wrap}
      .ff-back{min-height:44px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--red);padding:9px 13px;font:inherit;font-weight:900;cursor:pointer}
      .ff-hud{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
      .ff-hud-item{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:8px 11px;border:1px solid var(--line);border-radius:999px;background:#fff;color:#5a514a;font-size:.82rem;font-weight:900}
      .ff-arena{border:1px solid var(--line);border-radius:28px;background:rgba(255,255,255,.96);padding:clamp(20px,4vw,38px);box-shadow:0 18px 50px rgba(70,40,20,.08)}
      .ff-round-meta{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-bottom:16px;color:var(--muted);font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.08em}
      .ff-timer-track{height:9px;border-radius:99px;background:#f0e5d8;overflow:hidden;margin-bottom:26px}
      .ff-timer-bar{height:100%;width:100%;border-radius:inherit;background:linear-gradient(90deg,var(--gold),var(--red));transition:width .1s linear}
      .ff-question{text-align:center;margin-bottom:26px}
      .ff-question .eyebrow{justify-content:center}
      .ff-word{margin:4px 0 10px;color:var(--red-dark);font-family:Georgia,"Times New Roman",serif;font-size:clamp(2.4rem,7vw,4.8rem);line-height:1}
      .ff-context{margin:0 auto;max-width:720px;color:#5f5750;font-size:1rem;line-height:1.6;font-style:italic;text-align:center!important}
      .ff-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
      .ff-option{min-width:0;min-height:150px;border:2px solid #eadfcf;border-radius:20px;background:#fffaf2;padding:16px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:#3f3731;font:inherit;font-weight:900;text-align:center;cursor:pointer;transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease,background .16s ease}
      .ff-option:hover:not(:disabled),.ff-option:focus-visible:not(:disabled){transform:translateY(-3px);border-color:rgba(143,29,44,.38);box-shadow:0 10px 24px rgba(70,40,20,.08);outline:none}
      .ff-option:disabled{cursor:default}
      .ff-option.correct{border-color:#3f8f67;background:#effaf3;color:#255e43}
      .ff-option.wrong{border-color:#b6535b;background:#fff1f1;color:#7f2630}
      .ff-option.eliminated{opacity:.25;filter:grayscale(1);pointer-events:none}
      .ff-picture{font-size:clamp(2.4rem,7vw,4rem);line-height:1;filter:saturate(.9)}
      .ff-option-label{font-size:.95rem;line-height:1.25}
      .ff-tools{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:18px}
      .ff-lifeline{min-height:44px;border:1px solid rgba(143,29,44,.24);border-radius:12px;background:#fff;color:var(--red);padding:9px 13px;font:inherit;font-size:.82rem;font-weight:900;cursor:pointer}
      .ff-lifeline:disabled{opacity:.45;cursor:not-allowed}
      .ff-feedback{margin-top:20px;border-radius:18px;padding:16px 18px;background:#fff8ec;border:1px solid var(--line);color:#544a42;line-height:1.65}
      .ff-feedback strong{display:block;margin-bottom:5px;color:var(--red-dark)}
      .ff-feedback p{margin:0;text-align:left!important}
      .ff-next{width:100%;min-height:48px;margin-top:14px;border:0;border-radius:13px;background:var(--red);color:#fff;font:inherit;font-weight:900;cursor:pointer}
      .ff-result{text-align:center;padding:clamp(22px,5vw,48px)}
      .ff-result-medal{width:118px;height:118px;margin:0 auto 18px;border-radius:50%;display:grid;place-items:center;background:linear-gradient(145deg,#fff1bf,#f4c456);border:8px solid #fff;box-shadow:0 12px 28px rgba(98,67,20,.15);font-size:3.5rem}
      .ff-result h2{margin:0;color:var(--red-dark);font-family:Georgia,"Times New Roman",serif;font-size:clamp(2rem,5vw,3rem)}
      .ff-result-score{margin:10px 0 0;color:var(--red);font-size:1.35rem;font-weight:1000}
      .ff-result-text{max-width:650px;margin:14px auto 0;color:var(--muted);line-height:1.7;text-align:center!important}
      .ff-result-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:24px}
      .ff-result-actions button{min-height:46px;border-radius:13px;padding:10px 16px;font:inherit;font-weight:900;cursor:pointer}
      .ff-play-again{border:0;background:var(--red);color:#fff}
      .ff-result-back{border:1px solid var(--line);background:#fff;color:var(--red)}
      @media(max-width:720px){.ff-block{padding:22px 18px}.ff-block-head{grid-template-columns:1fr}.ff-start{width:100%}.ff-best-line{text-align:left}.ff-options{grid-template-columns:1fr 1fr}.ff-option{min-height:132px;padding:12px}.ff-arena{border-radius:22px}.ff-game-top{align-items:stretch}.ff-back{width:100%}.ff-hud{justify-content:center}}
      @media(max-width:460px){.ff-options{gap:10px}.ff-option{min-height:120px}.ff-option-label{font-size:.86rem}.ff-picture{font-size:2.6rem}.ff-round-meta{font-size:.68rem}.ff-hud{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));width:100%}.ff-hud-item{justify-content:center;min-width:0}.ff-word{font-size:2.75rem}}
    `;
    document.head.appendChild(style);
  }

  function installCard() {
    const quizBlock = document.getElementById("quiz-activities-block");
    if (!quizBlock || document.getElementById("false-friends-block")) return false;

    const section = document.createElement("section");
    section.id = "false-friends-block";
    section.className = "ff-block";
    section.setAttribute("aria-labelledby", "false-friends-title");
    section.innerHTML = `
      <div class="ff-block-head">
        <div class="ff-block-copy">
          <p class="eyebrow">Jogo visual</p>
          <h2 id="false-friends-title">Falsos amigos: ¿qué significa de verdad?</h2>
          <p>Uma palavra em espanhol, quatro respostas visuais em português. Acerte o significado antes que o tempo acabe, preserve suas vidas e construa uma sequência de acertos.</p>
          <div class="ff-block-badges" aria-label="Regras rápidas">
            <span class="ff-badge">🎯 10 rodadas</span>
            <span class="ff-badge">⏱️ 15 segundos</span>
            <span class="ff-badge">❤️ 3 vidas</span>
            <span class="ff-badge">✨ bônus por sequência</span>
          </div>
        </div>
        <div>
          <button class="ff-start" id="false-friends-start" type="button">Jogar agora →</button>
          <div class="ff-best-line" id="false-friends-best">Melhor pontuação: ${bestScore()}</div>
        </div>
      </div>
    `;
    quizBlock.insertAdjacentElement("afterend", section);
    section.querySelector("#false-friends-start")?.addEventListener("click", startGame);
    return true;
  }

  function installGameScreen() {
    if (document.getElementById("false-friends-game-screen")) return;
    const app = document.getElementById("app");
    if (!app) return;
    const screen = document.createElement("section");
    screen.id = "false-friends-game-screen";
    screen.className = "ff-game-screen hidden";
    screen.setAttribute("aria-labelledby", "ff-game-title");
    screen.innerHTML = `
      <div class="ff-game-top">
        <button class="ff-back" id="ff-back" type="button">← Voltar para Quiz</button>
        <div class="ff-hud" aria-label="Status do jogo">
          <span class="ff-hud-item">⭐ <span id="ff-score">0</span></span>
          <span class="ff-hud-item">🔥 <span id="ff-streak">0</span></span>
          <span class="ff-hud-item">❤️ <span id="ff-lives">3</span></span>
          <span class="ff-hud-item">⏱️ <span id="ff-time">15</span>s</span>
        </div>
      </div>
      <div class="ff-arena" id="ff-arena"></div>
    `;
    app.appendChild(screen);
    screen.querySelector("#ff-back")?.addEventListener("click", backToQuiz);
  }

  function hideAppScreens() {
    document.querySelectorAll("#app > section").forEach((section) => section.classList.add("hidden"));
  }

  function showGameScreen() {
    hideAppScreens();
    document.getElementById("false-friends-game-screen")?.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function backToQuiz() {
    clearTimer();
    hideAppScreens();
    document.getElementById("level-screen")?.classList.remove("hidden");
    document.querySelectorAll(".main-nav .nav-link").forEach((button) => button.classList.toggle("active", button.dataset.route === "quiz"));
    document.getElementById("false-friends-block")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function startGame() {
    deck = shuffle(bank).slice(0, ROUND_COUNT);
    roundIndex = 0;
    score = 0;
    correctCount = 0;
    streak = 0;
    lives = STARTING_LIVES;
    fiftyUsed = false;
    locked = false;
    showGameScreen();
    renderRound();
  }

  function updateHud() {
    const scoreEl = document.getElementById("ff-score");
    const streakEl = document.getElementById("ff-streak");
    const livesEl = document.getElementById("ff-lives");
    const timeEl = document.getElementById("ff-time");
    if (scoreEl) scoreEl.textContent = score;
    if (streakEl) streakEl.textContent = streak;
    if (livesEl) livesEl.textContent = lives;
    if (timeEl) timeEl.textContent = Math.max(0, Math.ceil(secondsLeft));
  }

  function clearTimer() {
    if (timerId) window.clearInterval(timerId);
    timerId = null;
  }

  function startTimer() {
    clearTimer();
    const startedAt = Date.now();
    secondsLeft = ROUND_SECONDS;
    updateTimerVisual();
    timerId = window.setInterval(() => {
      const elapsed = (Date.now() - startedAt) / 1000;
      secondsLeft = Math.max(0, ROUND_SECONDS - elapsed);
      updateTimerVisual();
      if (secondsLeft <= 0) {
        clearTimer();
        handleTimeout();
      }
    }, 100);
  }

  function updateTimerVisual() {
    updateHud();
    const bar = document.getElementById("ff-timer-bar");
    if (bar) bar.style.width = `${Math.max(0, (secondsLeft / ROUND_SECONDS) * 100)}%`;
  }

  function renderRound() {
    clearTimer();
    locked = false;
    const item = deck[roundIndex];
    const arena = document.getElementById("ff-arena");
    if (!arena || !item) return finishGame();
    secondsLeft = ROUND_SECONDS;
    updateHud();

    const options = shuffle(item.options.map(([label, picture]) => ({ label, picture })));
    arena.innerHTML = `
      <div class="ff-round-meta"><span>Rodada ${roundIndex + 1} de ${deck.length}</span><span>Escolha o significado em português</span></div>
      <div class="ff-timer-track" aria-hidden="true"><div class="ff-timer-bar" id="ff-timer-bar"></div></div>
      <div class="ff-question">
        <p class="eyebrow">Falso amigo</p>
        <h1 class="ff-word" id="ff-game-title" lang="es">${item.word}</h1>
        <p class="ff-context" lang="es">“${item.context}”</p>
      </div>
      <div class="ff-options" id="ff-options" role="group" aria-label="Alternativas de significado">
        ${options.map((option, index) => `
          <button class="ff-option" type="button" data-label="${escapeAttribute(option.label)}" aria-label="${escapeAttribute(option.label)}">
            <span class="ff-picture" aria-hidden="true">${option.picture}</span>
            <span class="ff-option-label">${option.label}</span>
          </button>
        `).join("")}
      </div>
      <div class="ff-tools">
        <button class="ff-lifeline" id="ff-fifty" type="button" ${fiftyUsed ? "disabled" : ""}>✨ 50/50 ${fiftyUsed ? "usado" : ""}</button>
      </div>
      <div id="ff-feedback" aria-live="polite"></div>
    `;

    arena.querySelectorAll(".ff-option").forEach((button) => {
      button.addEventListener("click", () => answerRound(button.dataset.label));
    });
    arena.querySelector("#ff-fifty")?.addEventListener("click", useFiftyFifty);
    startTimer();
  }

  function escapeAttribute(value) {
    return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function useFiftyFifty() {
    if (fiftyUsed || locked) return;
    fiftyUsed = true;
    const item = deck[roundIndex];
    const wrongButtons = [...document.querySelectorAll("#ff-options .ff-option")].filter((button) => button.dataset.label !== item.answer);
    shuffle(wrongButtons).slice(0, 2).forEach((button) => {
      button.classList.add("eliminated");
      button.disabled = true;
    });
    const button = document.getElementById("ff-fifty");
    if (button) {
      button.disabled = true;
      button.textContent = "✨ 50/50 usado";
    }
  }

  function answerRound(label) {
    if (locked) return;
    locked = true;
    clearTimer();
    const item = deck[roundIndex];
    const isCorrect = label === item.answer;
    const buttons = [...document.querySelectorAll("#ff-options .ff-option")];

    buttons.forEach((button) => {
      button.disabled = true;
      if (button.dataset.label === item.answer) button.classList.add("correct");
      else if (button.dataset.label === label) button.classList.add("wrong");
    });

    if (isCorrect) {
      correctCount += 1;
      streak += 1;
      const speedBonus = Math.max(0, Math.floor(secondsLeft * 8));
      const streakBonus = Math.min(100, Math.max(0, (streak - 1) * 20));
      score += 100 + speedBonus + streakBonus;
    } else {
      lives = Math.max(0, lives - 1);
      streak = 0;
    }
    updateHud();
    showFeedback(isCorrect ? "¡Muy bien!" : "Cuidado com a semelhança!", item.explanation, isCorrect);
  }

  function handleTimeout() {
    if (locked) return;
    locked = true;
    const item = deck[roundIndex];
    lives = Math.max(0, lives - 1);
    streak = 0;
    document.querySelectorAll("#ff-options .ff-option").forEach((button) => {
      button.disabled = true;
      if (button.dataset.label === item.answer) button.classList.add("correct");
    });
    updateHud();
    showFeedback("¡Tiempo!", item.explanation, false);
  }

  function showFeedback(title, explanation, success) {
    const holder = document.getElementById("ff-feedback");
    if (!holder) return;
    holder.innerHTML = `
      <div class="ff-feedback">
        <strong>${success ? "✓" : "!"} ${title}</strong>
        <p>${explanation}</p>
        <button class="ff-next" id="ff-next" type="button">${lives <= 0 || roundIndex >= deck.length - 1 ? "Ver resultado →" : "Próxima rodada →"}</button>
      </div>
    `;
    holder.querySelector("#ff-next")?.addEventListener("click", nextRound);
  }

  function nextRound() {
    if (lives <= 0 || roundIndex >= deck.length - 1) {
      finishGame();
      return;
    }
    roundIndex += 1;
    renderRound();
  }

  function finishGame() {
    clearTimer();
    const previousBest = bestScore();
    const isNewBest = score > previousBest;
    if (isNewBest) saveBest(score);
    const arena = document.getElementById("ff-arena");
    if (!arena) return;

    let medal = "🥉";
    let headline = "Bom treino!";
    if (correctCount >= 9) { medal = "🏆"; headline = "¡Experto en falsos amigos!"; }
    else if (correctCount >= 7) { medal = "🥇"; headline = "¡Excelente resultado!"; }
    else if (correctCount >= 5) { medal = "🥈"; headline = "Você está no caminho certo!"; }

    arena.innerHTML = `
      <div class="ff-result">
        <div class="ff-result-medal" aria-hidden="true">${medal}</div>
        <p class="eyebrow">Resultado do jogo</p>
        <h2>${headline}</h2>
        <p class="ff-result-score">${score} pontos · ${correctCount}/${deck.length} acertos</p>
        <p class="ff-result-text">${isNewBest ? "Novo recorde! " : ""}Os falsos amigos parecem familiares, mas podem mudar completamente o sentido de uma frase. Jogue novamente para encontrar palavras diferentes do banco de ${bank.length} desafios.</p>
        <div class="ff-result-actions">
          <button class="ff-play-again" id="ff-again" type="button">Jogar novamente</button>
          <button class="ff-result-back" id="ff-result-back" type="button">Voltar para Quiz</button>
        </div>
      </div>
    `;
    document.getElementById("false-friends-best") && (document.getElementById("false-friends-best").textContent = `Melhor pontuação: ${Math.max(previousBest, score)}`);
    arena.querySelector("#ff-again")?.addEventListener("click", startGame);
    arena.querySelector("#ff-result-back")?.addEventListener("click", backToQuiz);
  }

  function install(attempt = 0) {
    injectStyles();
    installGameScreen();
    if (!installCard() && attempt < 40) {
      window.setTimeout(() => install(attempt + 1), 150);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => install(), { once: true });
  } else {
    install();
  }
})();
