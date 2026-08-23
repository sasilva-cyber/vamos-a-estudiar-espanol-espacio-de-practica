/* Quiz musical com 21 artistas, 5 músicas por artista e progressão sem repetição. */
(function () {
  const SEEN_KEY = "vae-song-quiz-seen-v2";
  const BEST_KEY = "vae-song-quiz-best-v2";
  const MIX_ROUNDS = 10;

  const ARTISTS = {
    "TINI": ["Miénteme", "La Triple T", "Cupido", "Carne y Hueso", "Bar"],
    "Aitana": ["Teléfono", "Vas a quedarte", "En el coche", "Los Ángeles", "Las Babys"],
    "Lali": ["Disciplina", "Soy", "Ego", "Boomerang", "N5"],
    "Thalía": ["Piel Morena", "Amor a la Mexicana", "Equivocada", "No Me Enseñaste", "Arrasando"],
    "Alejandro Sanz": ["Corazón Partío", "Amiga Mía", "Cuando Nadie Me Ve", "No Es lo Mismo", "Desde Cuándo"],
    "Shakira": ["Estoy Aquí", "Ciega, Sordomuda", "Inevitable", "Suerte", "Antología"],
    "RBD": ["Sálvame", "Rebelde", "Sólo Quédate en Silencio", "Este Corazón", "Ser o Parecer"],
    "Anahí": ["Mi Delirio", "Quiero", "Me Hipnotizas", "Alérgico", "Dividida"],
    "Maite Perroni": ["Tú y Yo", "Adicta", "Vas a Querer Volver", "Loca", "Como Yo Te Quiero"],
    "Dulce María": ["Inevitable", "Ya No", "Rompecorazones", "No Sé Llorar", "Antes Que Ver el Sol"],
    "Calle 13": ["Atrévete-te-te", "Latinoamérica", "No Hay Nadie Como Tú", "Muerte en Hawái", "La Vuelta al Mundo"],
    "Belinda": ["Ángel", "Bella Traición", "Luz Sin Gravedad", "Dopamina", "Egoísta"],
    "María Becerra": ["Automático", "Ojalá", "Corazón Vacío", "Mi Debilidad", "Piscina"],
    "Danna Paola": ["Mala Fama", "Oye Pablo", "Sodio", "Calla Tú", "A un Beso"],
    "Rosalía": ["Malamente", "Pienso en Tu Mirá", "Di Mi Nombre", "Despechá", "Saoko"],
    "Sofía Reyes": ["Marte", "Casualidad", "Idiota", "Mal de Amores", "Mujer"],
    "Anitta": ["Envolver", "Medicina", "Downtown", "Machika", "La Loto"],
    "Enrique Iglesias": ["Bailando", "Súbeme la Radio", "Duele el Corazón", "Cuando Me Enamoro", "El Perdón"],
    "Pablo Alborán": ["Solamente Tú", "Saturno", "Prometo", "Recuérdame", "Quién"],
    "Bad Bunny": ["Tití Me Preguntó", "Moscow Mule", "Callaíta", "Yonaguni", "Ojitos Lindos"],
    "Maluma": ["Felices los 4", "Hawái", "Borro Cassette", "Sobrio", "Corazón"]
  };

  function slugify(value) {
    return String(value)
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  const SONGS = Object.entries(ARTISTS).flatMap(([artist, titles]) =>
    titles.map((title) => ({ id: `${slugify(artist)}--${slugify(title)}`, artist, title }))
  );
  window.VAE_SONG_QUIZ_BANK = SONGS;

  const state = { mode: "mix", artist: null, queue: [], index: 0, score: 0, answered: false };

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
    } catch (_) { return []; }
  }

  function saveSeen(ids) {
    try { localStorage.setItem(SEEN_KEY, JSON.stringify(ids)); } catch (_) {}
  }

  function bestKey(mode, artist) {
    return `${BEST_KEY}:${mode}:${artist || "all"}`;
  }

  function readBest(mode = state.mode, artist = state.artist) {
    try { return Number(localStorage.getItem(bestKey(mode, artist)) || 0) || 0; } catch (_) { return 0; }
  }

  function saveBest(score) {
    const best = Math.max(readBest(), score);
    try { localStorage.setItem(bestKey(state.mode, state.artist), String(best)); } catch (_) {}
    return best;
  }

  function buildMixedQueue() {
    let seen = new Set(readSeen());
    const queue = [];
    while (queue.length < MIX_ROUNDS) {
      let available = SONGS.filter((song) => !seen.has(song.id) && !queue.some((item) => item.id === song.id));
      if (!available.length) {
        seen = new Set();
        available = SONGS.filter((song) => !queue.some((item) => item.id === song.id));
      }
      const chosen = shuffle(available).slice(0, MIX_ROUNDS - queue.length);
      chosen.forEach((song) => { queue.push(song); seen.add(song.id); });
    }
    saveSeen([...seen]);
    return queue;
  }

  function buildArtistQueue(artist) {
    return shuffle(SONGS.filter((song) => song.artist === artist));
  }

  function cleanWord(value) {
    return String(value).replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, "");
  }

  function makeQuestion(song) {
    const words = song.title.split(/\s+/);
    const stop = new Set(["a", "al", "de", "del", "el", "en", "la", "las", "lo", "los", "me", "mi", "no", "o", "que", "sin", "te", "tu", "tú", "un", "una", "y"]);
    const candidates = words
      .map((word, index) => ({ index, value: cleanWord(word) }))
      .filter((item) => item.value.length >= 3 && !stop.has(item.value.toLowerCase()) && !/^\d+$/.test(item.value));

    if (words.length > 1 && candidates.length) {
      const target = candidates[candidates.length - 1];
      const answer = target.value;
      const displayWords = [...words];
      displayWords[target.index] = "□□□□";
      const sameArtistWords = SONGS.filter((item) => item.artist === song.artist && item.id !== song.id)
        .flatMap((item) => item.title.split(/\s+/).map(cleanWord))
        .filter((word) => word.length >= 3 && word.toLowerCase() !== answer.toLowerCase());
      const globalWords = SONGS.flatMap((item) => item.title.split(/\s+/).map(cleanWord))
        .filter((word) => word.length >= 3 && word.toLowerCase() !== answer.toLowerCase());
      const distractors = [...new Set(shuffle([...sameArtistWords, ...globalWords]))].slice(0, 3);
      return { prompt: displayWords.join(" "), answer, options: shuffle([answer, ...distractors]) };
    }

    const sameArtistTitles = SONGS.filter((item) => item.artist === song.artist && item.id !== song.id).map((item) => item.title);
    const globalTitles = SONGS.filter((item) => item.id !== song.id).map((item) => item.title);
    const distractors = [...new Set(shuffle([...sameArtistTitles, ...globalTitles]))].slice(0, 3);
    return { prompt: "□□□□", answer: song.title, options: shuffle([song.title, ...distractors]) };
  }

  function listenUrl(song) {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${song.artist} ${song.title} audio oficial`)}`;
  }

  function hideAllAppSections(exceptId) {
    document.querySelectorAll("#app > section").forEach((section) => {
      section.classList.toggle("hidden", section.id !== exceptId);
    });
  }

  function returnToQuiz() {
    document.getElementById("song-quiz-screen")?.classList.add("hidden");
    document.getElementById("level-screen")?.classList.remove("hidden");
    document.querySelectorAll(".main-nav .nav-link").forEach((item) => item.classList.toggle("active", item.dataset.route === "quiz"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function injectStyles() {
    if (document.getElementById("song-quiz-styles")) return;
    const style = document.createElement("style");
    style.id = "song-quiz-styles";
    style.textContent = `
      .song-quiz-feature{margin:24px 0 4px;padding:22px;border:1px solid var(--line,#ead8cc);border-radius:20px;background:linear-gradient(135deg,rgba(255,255,255,.94),rgba(255,247,239,.86));display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:18px;align-items:center}
      .song-quiz-feature-icon{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:#fff0e8;color:var(--red,#981c2d);font-size:1.55rem}
      .song-quiz-feature-copy small,.song-kicker{display:block;margin-bottom:4px;color:var(--red,#981c2d);font-size:.72rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
      .song-quiz-feature-copy h3,.song-quiz-card h1,.song-quiz-card h2{margin:0;color:var(--red-dark,#74111e);font-family:Georgia,"Times New Roman",serif}
      .song-quiz-feature-copy h3{font-size:clamp(1.35rem,2.4vw,1.8rem);margin-bottom:7px}.song-quiz-feature-copy p{margin:0;color:var(--muted,#685d57);line-height:1.6;text-align:left!important}
      .song-feature-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:9px}.song-feature-meta span,.song-quiz-badge{border:1px solid var(--line,#ead8cc);border-radius:999px;background:#fff;padding:6px 10px;color:#665950;font-size:.76rem;font-weight:800}
      .song-quiz-screen{padding-bottom:30px}.song-quiz-shell{max-width:980px;margin:0 auto}.song-quiz-topbar{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-bottom:18px}.song-quiz-badge{display:inline-flex;align-items:center}
      .song-quiz-card{border:1px solid var(--line,#ead8cc);border-radius:24px;background:rgba(255,255,255,.92);padding:clamp(22px,4vw,36px);box-shadow:0 14px 36px rgba(70,40,20,.06)}
      .song-quiz-card h1{font-size:clamp(1.9rem,4vw,2.8rem);margin-bottom:10px}.song-quiz-card h2{font-size:clamp(1.45rem,3vw,2rem);margin-bottom:10px}.song-copy{color:var(--muted,#685d57);line-height:1.65;margin:0 0 22px;text-align:left!important}
      .song-rights-note{margin:18px 0 0;padding:13px 15px;border-radius:14px;background:#fff8f3;color:#6b5b53;font-size:.86rem;line-height:1.55;text-align:left!important}
      .song-artist-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px;margin-top:18px}.song-artist-button{min-height:64px;border:1px solid rgba(152,28,45,.2);border-radius:14px;background:#fff;padding:12px 14px;text-align:left;color:var(--red-dark,#74111e);font:inherit;font-weight:850;cursor:pointer}.song-artist-button span{display:block;margin-top:3px;color:var(--muted,#685d57);font-size:.75rem;font-weight:700}.song-artist-button:hover,.song-artist-button:focus-visible{border-color:var(--red,#981c2d);background:#fff8f3;outline:none}.song-artist-button.mix{grid-column:1/-1;background:#8f1d2c;color:#fff}.song-artist-button.mix span{color:#f8dfe3}
      .song-quiz-meta{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px;color:var(--muted,#685d57);font-size:.88rem;font-weight:800}.song-progress{height:8px;border-radius:999px;background:#f0e5dc;overflow:hidden;margin-bottom:24px}.song-progress>span{display:block;height:100%;background:var(--red,#981c2d);transition:width .2s ease}
      .song-listen-row{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;margin:0 0 18px}.song-listen-link{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(152,28,45,.24);border-radius:12px;background:#fff;color:var(--red,#981c2d);padding:10px 14px;font-weight:850;text-decoration:none!important}.song-listen-link:hover{background:#fff6f1}.song-artist-name{color:var(--red-dark,#74111e);font-weight:900}
      .song-title-prompt{margin:0 0 24px;padding:24px;border:1px solid rgba(152,28,45,.14);border-radius:18px;background:#fff8f3;text-align:center!important;color:#322723;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.35rem,3vw,2rem);font-weight:700;letter-spacing:.01em}.song-title-prompt .blank{color:var(--red,#981c2d);letter-spacing:.12em}
      .song-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.song-option{min-height:58px;border:1px solid rgba(152,28,45,.22);border-radius:14px;background:#fff;color:var(--red-dark,#74111e);padding:13px 16px;font:inherit;font-weight:850;cursor:pointer}.song-option:hover:not(:disabled){background:#fff8f3;border-color:var(--red,#981c2d)}.song-option.correct{background:#eef8f1;border-color:#2c7a4b;color:#1f6039}.song-option.wrong{background:#fff0f0;border-color:#b64949;color:#8d2a2a}
      .song-feedback{margin-top:18px;padding:15px 17px;border-radius:14px;background:#faf4ec;color:#51453f;line-height:1.55;text-align:left!important}.song-feedback strong{color:var(--red-dark,#74111e)}.song-actions{display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap;margin-top:18px}.song-result{text-align:center}.song-result-score{width:118px;height:118px;margin:20px auto;border:7px solid #f1d8cf;border-radius:50%;display:grid;place-items:center;color:var(--red-dark,#74111e);font-family:Georgia,"Times New Roman",serif;font-size:1.9rem;font-weight:900}
      @media(max-width:760px){.song-quiz-feature{grid-template-columns:54px 1fr}.song-quiz-feature>.primary-button{grid-column:1/-1;width:100%}.song-artist-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.song-options{grid-template-columns:1fr}}
      @media(max-width:480px){.song-quiz-feature{grid-template-columns:1fr;text-align:center}.song-quiz-feature-icon{margin:auto}.song-quiz-feature-copy p{text-align:center!important}.song-feature-meta{justify-content:center}.song-artist-grid{grid-template-columns:1fr}.song-quiz-topbar{align-items:stretch;flex-direction:column}.song-quiz-topbar .text-button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function ensureScreen() {
    let screen = document.getElementById("song-quiz-screen");
    if (screen) return screen;
    screen = document.createElement("section");
    screen.id = "song-quiz-screen";
    screen.className = "song-quiz-screen hidden";
    screen.innerHTML = `<div class="song-quiz-shell"><div class="song-quiz-topbar"><button class="text-button" type="button" data-song-back>← Voltar para Quiz</button><span class="song-quiz-badge">♫ Completa la canción</span></div><div id="song-quiz-content"></div></div>`;
    document.getElementById("app")?.appendChild(screen);
    screen.querySelector("[data-song-back]")?.addEventListener("click", returnToQuiz);
    return screen;
  }

  function renderChooser() {
    const screen = ensureScreen();
    hideAllAppSections(screen.id);
    const content = screen.querySelector("#song-quiz-content");
    content.innerHTML = `<article class="song-quiz-card"><span class="song-kicker">Aprender español con música</span><h1>Completa la canción</h1><p class="song-copy">Escolha um artista para jogar com suas 5 músicas ou use o modo mistura para receber 10 canções diferentes. No modo mistura, uma música só volta a aparecer depois que o ciclo das 105 canções for percorrido.</p><div class="song-artist-grid"><button class="song-artist-button mix" type="button" data-song-mode="mix">♫ Modo mezcla<span>10 canciones · 21 artistas · sin repeticiones</span></button>${Object.keys(ARTISTS).map((artist) => `<button class="song-artist-button" type="button" data-song-artist="${artist}">${artist}<span>5 canciones</span></button>`).join("")}</div><p class="song-rights-note">Para respeitar direitos autorais, esta atividade não reproduz letras completas. Você pode abrir a busca da música para escutá-la e, no quiz, completar o título ou reconhecer a palavra que falta.</p></article>`;
    content.querySelector("[data-song-mode='mix']")?.addEventListener("click", () => startGame("mix"));
    content.querySelectorAll("[data-song-artist]").forEach((button) => button.addEventListener("click", () => startGame("artist", button.dataset.songArtist)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startGame(mode, artist = null) {
    state.mode = mode;
    state.artist = artist;
    state.queue = mode === "artist" ? buildArtistQueue(artist) : buildMixedQueue();
    state.index = 0;
    state.score = 0;
    state.answered = false;
    renderQuestion();
  }

  function renderQuestion() {
    const screen = ensureScreen();
    hideAllAppSections(screen.id);
    const song = state.queue[state.index];
    if (!song) { renderResult(); return; }
    const question = makeQuestion(song);
    const content = screen.querySelector("#song-quiz-content");
    const total = state.queue.length;
    const progress = Math.round((state.index / total) * 100);
    content.innerHTML = `<article class="song-quiz-card"><div class="song-quiz-meta"><span>${state.mode === "artist" ? song.artist : "Modo mezcla"}</span><span>${state.index + 1}/${total} · ${state.score} acertos · Melhor ${readBest()}</span></div><div class="song-progress"><span style="width:${progress}%"></span></div><span class="song-kicker">Escucha, reconoce y completa</span><h2>${song.artist}</h2><p class="song-copy">Escute a música, se quiser, e complete corretamente o título.</p><div class="song-listen-row"><span class="song-artist-name">♫ ${song.artist}</span><a class="song-listen-link" href="${listenUrl(song)}" target="_blank" rel="noopener noreferrer">▶ Escuchar canción ↗</a></div><p class="song-title-prompt">${question.prompt.replace("□□□□", '<span class="blank">□□□□</span>')}</p><div class="song-options">${question.options.map((option) => `<button class="song-option" type="button" data-song-option="${option.replace(/"/g, "&quot;")}">${option}</button>`).join("")}</div><div class="song-feedback" data-song-feedback hidden></div><div class="song-actions"><button class="primary-button" type="button" data-song-next hidden>Próxima →</button></div></article>`;

    const feedback = content.querySelector("[data-song-feedback]");
    const next = content.querySelector("[data-song-next]");
    content.querySelectorAll("[data-song-option]").forEach((button) => {
      button.addEventListener("click", () => {
        if (state.answered) return;
        state.answered = true;
        const selected = button.dataset.songOption;
        const correct = selected === question.answer;
        if (correct) state.score += 1;
        content.querySelectorAll("[data-song-option]").forEach((item) => {
          item.disabled = true;
          if (item.dataset.songOption === question.answer) item.classList.add("correct");
          else if (item === button && !correct) item.classList.add("wrong");
        });
        feedback.hidden = false;
        feedback.innerHTML = correct ? `<strong>¡Muy bien!</strong> A música é <em>${song.title}</em>, de ${song.artist}.` : `<strong>Resposta:</strong> ${question.answer}. A música é <em>${song.title}</em>, de ${song.artist}.`;
        next.hidden = false;
        next.textContent = state.index === total - 1 ? "Ver resultado →" : "Próxima →";
      });
    });
    next.addEventListener("click", () => { state.index += 1; state.answered = false; renderQuestion(); });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderResult() {
    const screen = ensureScreen();
    const content = screen.querySelector("#song-quiz-content");
    const total = state.queue.length;
    const best = saveBest(state.score);
    content.innerHTML = `<article class="song-quiz-card song-result"><span class="song-kicker">Resultado</span><h1>¡Partida completada!</h1><div class="song-result-score">${state.score}/${total}</div><p class="song-copy" style="text-align:center!important">${state.score === total ? "¡Excelente! Reconheceu todas as músicas." : state.score >= Math.ceil(total * .7) ? "Muito bom! Continue treinando com música em espanhol." : "Continue praticando: o próximo ciclo traz novas músicas."}<br><strong>Melhor pontuação neste modo: ${best}/${total}</strong></p><div class="song-actions" style="justify-content:center"><button class="primary-button" type="button" data-song-again>Jogar novamente</button><button class="secondary-button" type="button" data-song-choose>Escolher artista</button></div></article>`;
    content.querySelector("[data-song-again]")?.addEventListener("click", () => startGame(state.mode, state.artist));
    content.querySelector("[data-song-choose]")?.addEventListener("click", renderChooser);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function installFeature() {
    injectStyles();
    ensureScreen();
    const activities = document.getElementById("quiz-activities-block");
    if (!activities) { setTimeout(installFeature, 250); return; }
    let card = document.getElementById("song-quiz-feature");
    if (!card) {
      card = document.createElement("section");
      card.id = "song-quiz-feature";
      card.className = "song-quiz-feature";
      card.dataset.songQuizCount = String(SONGS.length);
      card.innerHTML = `<div class="song-quiz-feature-icon" aria-hidden="true">♫</div><div class="song-quiz-feature-copy"><small>Quiz musical</small><h3>Completa la canción</h3><p>Complete trechos curtos de canções em espanhol.</p><div class="song-feature-meta"><span>21 artistas</span><span>105 canciones</span><span>5 por artista</span><span>sin repeticiones</span></div></div><button class="primary-button" type="button" data-song-open>Empezar →</button>`;
      activities.insertAdjacentElement("beforebegin", card);
      card.querySelector("[data-song-open]")?.addEventListener("click", renderChooser);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installFeature, { once: true });
  else installFeature();
})();
