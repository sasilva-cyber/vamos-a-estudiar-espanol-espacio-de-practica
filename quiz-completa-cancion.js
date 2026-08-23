/* Quiz musical: o estudante ouve uma prévia e adivinha a música sem ver o título antes de responder. */
(function () {
  const SEEN_KEY = "vae-song-quiz-seen-v3";
  const BEST_KEY = "vae-song-quiz-best-v3";
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

  function normalize(value) {
    return String(value || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  const SONGS = Object.entries(ARTISTS).flatMap(([artist, titles]) =>
    titles.map((title) => ({ id: `${slugify(artist)}--${slugify(title)}`, artist, title }))
  );

  window.VAE_SONG_QUIZ_BANK = SONGS;

  const state = {
    mode: "mix",
    artist: null,
    queue: [],
    index: 0,
    score: 0,
    answered: false,
    previewToken: 0
  };

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

  function bestKey() {
    return `${BEST_KEY}:${state.mode}:${state.artist || "all"}`;
  }

  function readBest() {
    try { return Number(localStorage.getItem(bestKey()) || 0) || 0; } catch (_) { return 0; }
  }

  function saveBest(score) {
    const best = Math.max(readBest(), score);
    try { localStorage.setItem(bestKey(), String(best)); } catch (_) {}
    return best;
  }

  function buildMixedQueue() {
    let seen = new Set(readSeen());
    let available = SONGS.filter((song) => !seen.has(song.id));

    if (available.length < MIX_ROUNDS) {
      seen = new Set();
      available = [...SONGS];
    }

    const chosen = shuffle(available).slice(0, MIX_ROUNDS);
    chosen.forEach((song) => seen.add(song.id));
    saveSeen([...seen]);
    return chosen;
  }

  function buildArtistQueue(artist) {
    return shuffle(SONGS.filter((song) => song.artist === artist));
  }

  function makeOptions(song) {
    const pool = state.mode === "artist"
      ? SONGS.filter((item) => item.artist === song.artist && item.id !== song.id)
      : SONGS.filter((item) => item.id !== song.id);
    return shuffle([song, ...shuffle(pool).slice(0, 3)]).map((item) => item.title);
  }

  function hideAllAppSections(exceptId) {
    document.querySelectorAll("#app > section").forEach((section) => {
      if (section.id === exceptId) section.classList.remove("hidden");
      else section.classList.add("hidden");
    });
  }

  function returnToQuiz() {
    state.previewToken += 1;
    document.querySelector("#song-quiz-screen audio")?.pause();
    document.getElementById("song-quiz-screen")?.classList.add("hidden");
    document.getElementById("level-screen")?.classList.remove("hidden");
    document.querySelectorAll(".main-nav .nav-link").forEach((item) => item.classList.toggle("active", item.dataset.route === "quiz"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function injectStyles() {
    if (document.getElementById("song-quiz-styles-v3")) return;
    document.getElementById("song-quiz-styles")?.remove();
    const style = document.createElement("style");
    style.id = "song-quiz-styles-v3";
    style.textContent = `
      .song-quiz-feature{margin:24px 0 4px;padding:22px;border:1px solid var(--line,#ead8cc);border-radius:20px;background:linear-gradient(135deg,rgba(255,255,255,.94),rgba(255,247,239,.86));display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:18px;align-items:center}
      .song-quiz-feature-icon{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:#fff0e8;color:var(--red,#981c2d);font-size:1.55rem}
      .song-quiz-feature-copy small,.song-kicker{display:block;margin-bottom:5px;color:var(--red,#981c2d);font-size:.72rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
      .song-quiz-feature-copy h3,.song-quiz-card h1,.song-quiz-card h2{margin:0 0 7px;color:var(--red-dark,#74111e);font-family:Georgia,"Times New Roman",serif}
      .song-quiz-feature-copy h3{font-size:clamp(1.35rem,2.4vw,1.8rem)}
      .song-quiz-feature-copy p,.song-copy{margin:0;color:var(--muted,#685d57);line-height:1.6;text-align:left!important}
      .song-feature-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:11px}.song-feature-meta span{border:1px solid #ead8cc;border-radius:999px;background:#fff;padding:5px 9px;font-size:.72rem;font-weight:800;color:#6d5147}
      .song-quiz-screen{padding-bottom:30px}.song-quiz-shell{max-width:930px;margin:0 auto}.song-quiz-topbar{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:18px}.song-quiz-badge{border:1px solid #ead8cc;border-radius:999px;background:#fff;padding:8px 12px;color:#74111e;font-size:.82rem;font-weight:900}
      .song-quiz-card{border:1px solid var(--line,#ead8cc);border-radius:24px;background:rgba(255,255,255,.94);padding:clamp(22px,4vw,36px);box-shadow:0 14px 36px rgba(70,40,20,.06)}
      .song-quiz-card h1{font-size:clamp(1.8rem,3vw,2.45rem)}.song-quiz-card h2{font-size:clamp(1.55rem,2.7vw,2.1rem)}
      .song-artist-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:11px;margin-top:24px}.song-artist-button{min-height:70px;border:1px solid rgba(152,28,45,.2);border-radius:15px;background:#fff;color:#74111e;padding:12px;font:inherit;font-weight:900;cursor:pointer;text-align:left}.song-artist-button span{display:block;margin-top:5px;color:#806e65;font-size:.74rem;font-weight:700}.song-artist-button:hover{border-color:#981c2d;background:#fff8f3}.song-artist-button.mix{grid-column:1/-1;background:#fff8f3}
      .song-rights-note{margin:22px 0 0;padding-top:16px;border-top:1px solid #eee0d5;color:#806e65;font-size:.82rem;line-height:1.55;text-align:left!important}
      .song-quiz-meta{display:flex;justify-content:space-between;gap:12px;margin-bottom:12px;color:#6f625c;font-size:.84rem;font-weight:850}.song-progress{height:7px;background:#f1e7df;border-radius:999px;overflow:hidden;margin-bottom:24px}.song-progress span{display:block;height:100%;background:#a21e32;border-radius:inherit}
      .mystery-track{margin:22px 0;padding:22px;border:1px solid rgba(152,28,45,.15);border-radius:18px;background:#fff8f3;text-align:center}.mystery-icon{width:70px;height:70px;margin:0 auto 10px;border-radius:50%;display:grid;place-items:center;background:#fff;color:#981c2d;font-size:1.8rem;border:1px solid #edd6cd}.mystery-track strong{display:block;color:#74111e;font-size:1.05rem}.mystery-track span{display:block;margin-top:5px;color:#76645b;font-size:.84rem}
      .preview-loader{margin:16px 0 0;color:#76645b;font-size:.86rem}.preview-audio{width:min(100%,560px);margin-top:17px}.preview-error{margin:16px auto 0;max-width:560px;padding:12px 14px;border-radius:12px;background:#fff;color:#8a4c36;font-size:.84rem;line-height:1.5}
      .song-question{margin:24px 0 14px;text-align:center!important;color:#342925;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.25rem,2.5vw,1.65rem);font-weight:700}.song-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.song-option{min-height:58px;border:1px solid rgba(152,28,45,.22);border-radius:14px;background:#fff;color:#74111e;padding:13px 16px;font:inherit;font-weight:850;cursor:pointer}.song-option:hover:not(:disabled){border-color:#981c2d;background:#fff8f3}.song-option.correct{background:#eef8f1;border-color:#2c7a4b;color:#1f6039}.song-option.wrong{background:#fff0f0;border-color:#b64949;color:#8d2a2a}
      .song-feedback{margin-top:18px;padding:15px 17px;border-radius:14px;background:#faf4ec;color:#51453f;line-height:1.55}.song-feedback strong{color:#74111e}.song-actions{display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap;margin-top:18px}.song-result{text-align:center}.song-result .song-copy{text-align:center!important}.song-result-score{width:112px;height:112px;margin:20px auto;border:7px solid #f1d8cf;border-radius:50%;display:grid;place-items:center;color:#74111e;font:900 1.85rem Georgia,serif}
      @media(max-width:760px){.song-quiz-feature{grid-template-columns:52px minmax(0,1fr)}.song-quiz-feature>.primary-button{grid-column:1/-1;width:100%}.song-artist-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:520px){.song-artist-grid,.song-options{grid-template-columns:1fr}.song-quiz-meta{flex-direction:column}.song-quiz-topbar{align-items:flex-start;flex-direction:column}.song-quiz-card{padding:20px}.song-quiz-feature{grid-template-columns:1fr}.song-quiz-feature-icon{display:none}}
    `;
    document.head.appendChild(style);
  }

  function ensureScreen() {
    let screen = document.getElementById("song-quiz-screen");
    if (screen) return screen;
    screen = document.createElement("section");
    screen.id = "song-quiz-screen";
    screen.className = "screen song-quiz-screen hidden";
    screen.innerHTML = `<div class="song-quiz-shell"><div class="song-quiz-topbar"><button class="secondary-button" type="button" data-song-back>← Voltar para Quiz</button><span class="song-quiz-badge">♫ Completa la canción</span></div><div id="song-quiz-content"></div></div>`;
    document.getElementById("app")?.appendChild(screen);
    screen.querySelector("[data-song-back]")?.addEventListener("click", returnToQuiz);
    return screen;
  }

  function renderChooser() {
    state.previewToken += 1;
    document.querySelector("#song-quiz-screen audio")?.pause();
    const screen = ensureScreen();
    hideAllAppSections(screen.id);
    const content = screen.querySelector("#song-quiz-content");
    content.innerHTML = `<article class="song-quiz-card"><span class="song-kicker">Aprender español con música</span><h1>Completa la canción</h1><p class="song-copy">Ouça a prévia sem ver o título da música. Depois escolha, entre quatro opções, qual canção está tocando.</p><div class="song-artist-grid"><button class="song-artist-button mix" type="button" data-song-mode="mix">♫ Modo mezcla<span>10 faixas surpresa · 21 artistas · sem repetir até completar o ciclo</span></button>${Object.keys(ARTISTS).map((artist) => `<button class="song-artist-button" type="button" data-song-artist="${artist}">${artist}<span>5 músicas · título escondido durante a rodada</span></button>`).join("")}</div><p class="song-rights-note">As prévias de áudio são carregadas de um catálogo externo e podem variar por região. O título e o artista da faixa do modo mistura só são revelados depois da resposta.</p></article>`;
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

  function jsonpSearch(song, token) {
    return new Promise((resolve) => {
      const callback = `vaeSongPreview_${Date.now()}_${Math.floor(Math.random() * 100000)}`;
      const timeout = window.setTimeout(() => finish(null), 9000);
      let script;
      function finish(value) {
        window.clearTimeout(timeout);
        try { delete window[callback]; } catch (_) { window[callback] = undefined; }
        script?.remove();
        if (token !== state.previewToken) return resolve(null);
        resolve(value);
      }
      window[callback] = (payload) => {
        const results = Array.isArray(payload?.results) ? payload.results : [];
        const targetTitle = normalize(song.title);
        const targetArtist = normalize(song.artist);
        const exact = results.find((item) => normalize(item.trackName) === targetTitle && normalize(item.artistName).includes(targetArtist.split(" ")[0]));
        const close = exact || results.find((item) => normalize(item.artistName).includes(targetArtist.split(" ")[0])) || results[0];
        finish(close?.previewUrl || null);
      };
      script = document.createElement("script");
      script.src = `https://itunes.apple.com/search?term=${encodeURIComponent(`${song.artist} ${song.title}`)}&entity=song&media=music&limit=8&callback=${callback}`;
      script.onerror = () => finish(null);
      document.head.appendChild(script);
    });
  }

  async function loadPreview(song, token) {
    try {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(`${song.artist} ${song.title}`)}&entity=song&media=music&limit=8`;
      const response = await fetch(url, { mode: "cors" });
      if (response.ok) {
        const payload = await response.json();
        const results = Array.isArray(payload?.results) ? payload.results : [];
        const targetTitle = normalize(song.title);
        const targetArtist = normalize(song.artist);
        const exact = results.find((item) => normalize(item.trackName) === targetTitle && normalize(item.artistName).includes(targetArtist.split(" ")[0]));
        const close = exact || results.find((item) => normalize(item.artistName).includes(targetArtist.split(" ")[0])) || results[0];
        if (token === state.previewToken && close?.previewUrl) return close.previewUrl;
      }
    } catch (_) {}
    return jsonpSearch(song, token);
  }

  async function renderQuestion() {
    state.previewToken += 1;
    const token = state.previewToken;
    const screen = ensureScreen();
    hideAllAppSections(screen.id);
    const song = state.queue[state.index];
    if (!song) { renderResult(); return; }

    const options = makeOptions(song);
    const total = state.queue.length;
    const progress = Math.round((state.index / total) * 100);
    const content = screen.querySelector("#song-quiz-content");
    content.innerHTML = `<article class="song-quiz-card"><div class="song-quiz-meta"><span>${state.mode === "artist" ? `Artista escolhido: ${state.artist}` : "Faixa e artista surpresa"}</span><span>${state.index + 1}/${total} · ${state.score} acertos · Melhor ${readBest()}</span></div><div class="song-progress"><span style="width:${progress}%"></span></div><span class="song-kicker">Escucha y adivina</span><h2>¿Qué canción está sonando?</h2><p class="song-copy">O título da faixa permanece escondido até você responder.</p><div class="mystery-track"><div class="mystery-icon">♫</div><strong>Faixa surpresa ${state.index + 1}</strong><span>${state.mode === "artist" ? "Você sabe o artista, mas não a música." : "Artista e música escondidos."}</span><div class="preview-loader" data-preview-loader>Carregando prévia de áudio…</div><audio class="preview-audio" data-preview-audio controls preload="none" hidden></audio><div class="preview-error" data-preview-error hidden>Não foi possível carregar a prévia desta faixa na sua região. Você pode pular esta pergunta sem perder ponto.</div></div><p class="song-question">Escolha o título correto:</p><div class="song-options">${options.map((option) => `<button class="song-option" type="button" data-song-option="${option.replace(/"/g, "&quot;")}" disabled>${option}</button>`).join("")}</div><div class="song-feedback" data-song-feedback hidden></div><div class="song-actions"><button class="secondary-button" type="button" data-song-skip hidden>Pular faixa →</button><button class="primary-button" type="button" data-song-next hidden>Próxima →</button></div></article>`;

    const audio = content.querySelector("[data-preview-audio]");
    const loader = content.querySelector("[data-preview-loader]");
    const error = content.querySelector("[data-preview-error]");
    const skip = content.querySelector("[data-song-skip]");
    const next = content.querySelector("[data-song-next]");
    const feedback = content.querySelector("[data-song-feedback]");
    const optionButtons = [...content.querySelectorAll("[data-song-option]")];

    const previewUrl = await loadPreview(song, token);
    if (token !== state.previewToken || !document.body.contains(content)) return;

    loader.hidden = true;
    if (previewUrl) {
      audio.src = previewUrl;
      audio.hidden = false;
      optionButtons.forEach((button) => { button.disabled = false; });
      try { await audio.play(); } catch (_) {}
    } else {
      error.hidden = false;
      skip.hidden = false;
    }

    optionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (state.answered) return;
        state.answered = true;
        audio.pause();
        const selected = button.dataset.songOption;
        const correct = selected === song.title;
        if (correct) state.score += 1;

        optionButtons.forEach((item) => {
          item.disabled = true;
          if (item.dataset.songOption === song.title) item.classList.add("correct");
          else if (item === button && !correct) item.classList.add("wrong");
        });

        feedback.hidden = false;
        feedback.innerHTML = correct
          ? `<strong>¡Muy bien!</strong> Era <em>${song.title}</em>, de ${song.artist}.`
          : `<strong>Resposta:</strong> <em>${song.title}</em>, de ${song.artist}.`;
        next.hidden = false;
        next.textContent = state.index === total - 1 ? "Ver resultado →" : "Próxima →";
      });
    });

    skip.addEventListener("click", () => {
      state.index += 1;
      state.answered = false;
      renderQuestion();
    });

    next.addEventListener("click", () => {
      state.index += 1;
      state.answered = false;
      renderQuestion();
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderResult() {
    state.previewToken += 1;
    document.querySelector("#song-quiz-screen audio")?.pause();
    const screen = ensureScreen();
    const content = screen.querySelector("#song-quiz-content");
    const total = state.queue.length;
    const best = saveBest(state.score);
    content.innerHTML = `<article class="song-quiz-card song-result"><span class="song-kicker">Resultado</span><h1>¡Partida completada!</h1><div class="song-result-score">${state.score}/${total}</div><p class="song-copy">${state.score === total ? "¡Excelente! Reconheceu todas as faixas." : state.score >= Math.ceil(total * .7) ? "Muito bom! Seu reconhecimento auditivo está avançando." : "Continue praticando: ouvir várias vezes ajuda a reconhecer pronúncia, ritmo e vocabulário."}<br><strong>Melhor pontuação neste modo: ${best}/${total}</strong></p><div class="song-actions" style="justify-content:center"><button class="primary-button" type="button" data-song-again>Jogar novamente</button><button class="secondary-button" type="button" data-song-choose>Escolher modo/artista</button></div></article>`;
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
      activities.insertAdjacentElement("beforebegin", card);
    }

    card.dataset.songQuizCount = String(SONGS.length);
    card.innerHTML = `<div class="song-quiz-feature-icon" aria-hidden="true">♫</div><div class="song-quiz-feature-copy"><small>Quiz musical</small><h3>Completa la canción</h3><p>Complete trechos curtos de canções em espanhol.</p><div class="song-feature-meta"><span>21 artistas</span><span>105 músicas</span><span>5 por artista</span><span>título escondido</span></div></div><button class="primary-button" type="button" data-song-open>Empezar →</button>`;
    card.querySelector("[data-song-open]")?.addEventListener("click", renderChooser);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installFeature, { once: true });
  else installFeature();
})();
