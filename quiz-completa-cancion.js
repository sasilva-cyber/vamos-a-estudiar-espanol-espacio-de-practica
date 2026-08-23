/* Quiz musical: ouvir um trecho, pausar automaticamente e completar o título sem revelar a música antes da resposta. */
(function () {
  const SEEN_KEY = "vae-song-quiz-seen-v3";
  const BEST_KEY = "vae-song-quiz-best-v3";
  const MIX_ROUNDS = 10;
  const SEGMENT_SECONDS = 7;

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
    fails: 0,
    answered: false,
    currentQuestion: null,
    previewUrl: null,
    audio: null,
    stopTimer: null,
    progressTimer: null,
    playing: false
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

  function bestKey(mode = state.mode, artist = state.artist) {
    return `${BEST_KEY}:${mode}:${artist || "all"}`;
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

  function titleWords(title) {
    return title.split(/\s+/).filter(Boolean);
  }

  function wordPool(song) {
    const source = state.mode === "artist" ? SONGS.filter((item) => item.artist === song.artist) : SONGS;
    return source.flatMap((item) => titleWords(item.title)).filter((word) => word.length > 1);
  }

  function makeQuestion(song) {
    const words = titleWords(song.title);
    if (words.length === 1) {
      const singleTitles = (state.mode === "artist" ? SONGS.filter((item) => item.artist === song.artist) : SONGS)
        .filter((item) => titleWords(item.title).length === 1 && item.id !== song.id)
        .map((item) => item.title);
      const fallback = SONGS.filter((item) => titleWords(item.title).length === 1 && item.id !== song.id).map((item) => item.title);
      return {
        prompt: "Título: ________",
        answer: song.title,
        options: shuffle([song.title, ...shuffle(singleTitles.length >= 3 ? singleTitles : fallback).slice(0, 3)])
      };
    }

    const candidates = words.map((word, index) => ({ word, index })).filter(({ word }) => word.replace(/[^\p{L}\p{N}]/gu, "").length >= 2);
    const chosen = candidates[Math.abs(song.id.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0)) % candidates.length] || { word: words[words.length - 1], index: words.length - 1 };
    const masked = [...words];
    masked[chosen.index] = "________";

    const pool = wordPool(song).filter((word) => normalize(word) !== normalize(chosen.word));
    const similar = pool.filter((word) => Math.abs(word.length - chosen.word.length) <= 3);
    const distractors = shuffle(similar.length >= 3 ? similar : pool).slice(0, 3);
    return { prompt: masked.join(" "), answer: chosen.word, options: shuffle([chosen.word, ...distractors]) };
  }

  function hideAllAppSections(exceptId) {
    document.querySelectorAll("#app > section").forEach((section) => {
      if (section.id === exceptId) section.classList.remove("hidden");
      else section.classList.add("hidden");
    });
  }

  function stopAudio() {
    if (state.stopTimer) window.clearTimeout(state.stopTimer);
    if (state.progressTimer) window.clearInterval(state.progressTimer);
    state.stopTimer = null;
    state.progressTimer = null;
    state.playing = false;
    if (state.audio) {
      try { state.audio.pause(); } catch (_) {}
      state.audio.src = "";
      state.audio = null;
    }
  }

  function returnToQuiz() {
    stopAudio();
    document.getElementById("song-quiz-screen")?.classList.add("hidden");
    document.getElementById("level-screen")?.classList.remove("hidden");
    document.querySelectorAll(".main-nav .nav-link").forEach((item) => item.classList.toggle("active", item.dataset.route === "quiz"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function jsonpSearch(term, country) {
    return new Promise((resolve) => {
      const callback = `vaeSongCb_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      const script = document.createElement("script");
      const timer = window.setTimeout(() => finish({ results: [] }), 6500);
      function finish(payload) {
        window.clearTimeout(timer);
        try { delete window[callback]; } catch (_) { window[callback] = undefined; }
        script.remove();
        resolve(payload || { results: [] });
      }
      window[callback] = finish;
      script.onerror = () => finish({ results: [] });
      script.src = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&media=music&entity=song&limit=12&country=${country}&callback=${callback}`;
      document.head.appendChild(script);
    });
  }

  function previewCacheKey(song) {
    return `vae-preview:${song.id}`;
  }

  function scoreResult(song, result) {
    const wantedTitle = normalize(song.title);
    const wantedArtist = normalize(song.artist);
    const gotTitle = normalize(result.trackName);
    const gotArtist = normalize(result.artistName);
    let score = 0;
    if (gotTitle === wantedTitle) score += 8;
    else if (gotTitle.includes(wantedTitle) || wantedTitle.includes(gotTitle)) score += 5;
    if (gotArtist === wantedArtist) score += 5;
    else if (gotArtist.includes(wantedArtist) || wantedArtist.includes(gotArtist)) score += 3;
    return score;
  }

  async function resolvePreview(song) {
    try {
      const cached = sessionStorage.getItem(previewCacheKey(song));
      if (cached === "none") return null;
      if (cached) return cached;
    } catch (_) {}

    for (const country of ["MX", "ES", "US", "BR"]) {
      const data = await jsonpSearch(`${song.artist} ${song.title}`, country);
      const candidates = (data.results || []).filter((item) => item.previewUrl);
      if (!candidates.length) continue;
      candidates.sort((a, b) => scoreResult(song, b) - scoreResult(song, a));
      const winner = candidates[0];
      if (scoreResult(song, winner) >= 5) {
        try { sessionStorage.setItem(previewCacheKey(song), winner.previewUrl); } catch (_) {}
        return winner.previewUrl;
      }
    }
    try { sessionStorage.setItem(previewCacheKey(song), "none"); } catch (_) {}
    return null;
  }

  function injectStyles() {
    if (document.getElementById("song-quiz-styles")) return;
    const style = document.createElement("style");
    style.id = "song-quiz-styles";
    style.textContent = `
      .song-quiz-feature{margin:24px 0 4px;padding:22px;border:1px solid var(--line,#ead8cc);border-radius:20px;background:linear-gradient(135deg,rgba(255,255,255,.94),rgba(255,247,239,.86));display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:18px;align-items:center}
      .song-quiz-feature-icon{width:58px;height:58px;border-radius:50%;display:grid;place-items:center;background:#fff0e8;color:var(--red,#981c2d);font-size:1.55rem}
      .song-quiz-feature-copy small,.song-kicker{display:block;margin-bottom:4px;color:var(--red,#981c2d);font-size:.72rem;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
      .song-quiz-feature-copy h3{margin:0 0 7px;color:var(--red-dark,#74111e);font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.35rem,2.4vw,1.8rem)}
      .song-quiz-feature-copy p{margin:0;color:var(--muted,#685d57);line-height:1.55;text-align:left!important}
      .song-feature-meta{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.song-feature-meta span{border:1px solid #ead8cc;background:#fff;border-radius:999px;padding:5px 9px;font-size:.72rem;font-weight:800;color:#66564f}
      .song-quiz-screen{padding-bottom:28px}.song-quiz-shell{max-width:940px;margin:0 auto}.song-quiz-topbar{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:18px}.song-quiz-badge{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--line,#ead8cc);border-radius:999px;background:#fff;padding:8px 12px;color:var(--red-dark,#74111e);font-size:.82rem;font-weight:900}
      .song-quiz-card{border:1px solid var(--line,#ead8cc);border-radius:24px;background:rgba(255,255,255,.94);padding:clamp(20px,4vw,34px);box-shadow:0 14px 36px rgba(70,40,20,.06)}
      .song-quiz-card h1,.song-quiz-card h2{color:var(--red-dark,#74111e);font-family:Georgia,"Times New Roman",serif;margin:5px 0 8px}.song-quiz-card h1{font-size:clamp(1.8rem,4vw,2.5rem)}.song-copy{color:var(--muted,#685d57);line-height:1.65;margin:0 0 18px;text-align:left!important}
      .song-artist-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:20px}.song-artist-button{border:1px solid rgba(143,29,44,.22);border-radius:15px;background:#fff;padding:15px;text-align:left;color:var(--red-dark,#74111e);font:inherit;font-weight:900;cursor:pointer}.song-artist-button span{display:block;margin-top:4px;color:#746760;font-size:.76rem;font-weight:700}.song-artist-button:hover,.song-artist-button:focus-visible{border-color:var(--red,#981c2d);background:#fff8f3;outline:none}.song-artist-button.mix{grid-column:1/-1;background:#fff7ef}
      .song-rights-note{margin:20px 0 0;padding-top:16px;border-top:1px solid #ead8cc;color:#776861;font-size:.82rem;line-height:1.55;text-align:left!important}
      .song-scoreboard{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px}.song-score-box{border-radius:13px;background:#7b2030;color:#fff;padding:9px 8px;text-align:center}.song-score-box span{display:block;font-size:.72rem;opacity:.86}.song-score-box strong{display:block;font-size:1.35rem;line-height:1.2;margin-top:3px}
      .song-progress{height:8px;background:#f0e5dc;border-radius:999px;overflow:hidden;margin:0 0 18px}.song-progress span{display:block;height:100%;background:var(--red,#981c2d);border-radius:999px;transition:width .25s ease}
      .song-player{position:relative;overflow:hidden;min-height:250px;border-radius:20px;background:linear-gradient(145deg,#5f1320,#871a2c 58%,#a42136);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:26px;color:#fff;text-align:center}
      .song-player::before{content:"";position:absolute;inset:-30%;background:radial-gradient(circle at 35% 40%,rgba(255,255,255,.12),transparent 28%),radial-gradient(circle at 70% 55%,rgba(236,181,71,.16),transparent 26%);pointer-events:none}.song-player>*{position:relative;z-index:1}.song-player-icon{width:74px;height:74px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.26);font-size:1.75rem;margin-bottom:14px}.song-player h3{margin:0 0 6px;color:#fff;font-family:inherit;font-size:1.25rem}.song-player p{margin:0;color:rgba(255,255,255,.8);font-size:.9rem;text-align:center!important}.song-play-button{margin-top:18px;border:0;border-radius:999px;background:#fff;color:#7b1727;padding:12px 22px;font:inherit;font-weight:900;cursor:pointer;min-width:180px}.song-play-button:disabled{opacity:.6;cursor:wait}
      .song-wave{display:flex;height:34px;align-items:center;gap:5px;margin-top:18px}.song-wave i{display:block;width:5px;height:12px;border-radius:999px;background:#f5c85d;opacity:.55}.song-player.playing .song-wave i{animation:songWave .75s ease-in-out infinite alternate}.song-player.playing .song-wave i:nth-child(2n){animation-delay:.12s}.song-player.playing .song-wave i:nth-child(3n){animation-delay:.25s}@keyframes songWave{to{height:32px;opacity:1}}
      .song-segment-track{height:5px;width:min(440px,86%);background:rgba(255,255,255,.2);border-radius:999px;overflow:hidden;margin-top:15px}.song-segment-track span{display:block;width:0;height:100%;background:#f5c85d;border-radius:999px}
      .song-after-pause{margin-top:20px}.song-after-pause[hidden]{display:none!important}.song-pause-label{display:flex;align-items:center;justify-content:center;gap:8px;margin:0 0 12px;color:var(--red,#981c2d);font-size:.78rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.song-title-prompt{margin:0 0 18px;padding:18px;border:1px solid rgba(143,29,44,.16);border-radius:16px;background:#fff8f3;color:#392c28;font-family:Georgia,"Times New Roman",serif;font-size:clamp(1.25rem,3vw,1.75rem);font-weight:700;text-align:center!important}.song-title-prompt .blank{color:var(--red,#981c2d);letter-spacing:.08em}
      .song-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.song-option{min-height:58px;border:1px solid rgba(143,29,44,.23);border-radius:14px;background:#fff;color:var(--red-dark,#74111e);padding:13px 16px;font:inherit;font-weight:850;cursor:pointer}.song-option:hover:not(:disabled),.song-option:focus-visible:not(:disabled){border-color:var(--red,#981c2d);background:#fff8f3;outline:none}.song-option.correct{background:#edf8f0;border-color:#398154;color:#22613b}.song-option.wrong{background:#fff0f0;border-color:#b84949;color:#8b2b2b}
      .song-feedback{margin-top:16px;padding:14px 16px;border-radius:14px;background:#faf4ec;color:#544740;line-height:1.55}.song-feedback strong{color:var(--red-dark,#74111e)}.song-feedback[hidden]{display:none!important}.song-actions{display:flex;justify-content:flex-end;gap:10px;flex-wrap:wrap;margin-top:18px}.song-result{text-align:center}.song-result .song-copy{text-align:center!important}.song-result-score{width:112px;height:112px;border-radius:50%;border:7px solid #f0d7ce;display:grid;place-items:center;margin:18px auto;color:var(--red-dark,#74111e);font-size:1.75rem;font-weight:900}
      @media(max-width:760px){.song-quiz-feature{grid-template-columns:54px 1fr}.song-quiz-feature>.primary-button{grid-column:1/-1;width:100%}.song-artist-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.song-scoreboard{grid-template-columns:repeat(2,1fr)}.song-player{min-height:220px}.song-options{grid-template-columns:1fr}}
      @media(max-width:480px){.song-artist-grid{grid-template-columns:1fr}.song-quiz-topbar{align-items:flex-start;flex-direction:column}.song-quiz-card{padding:18px}.song-player{padding:22px 16px}.song-player-icon{width:64px;height:64px}}
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
    stopAudio();
    const screen = ensureScreen();
    hideAllAppSections(screen.id);
    const content = screen.querySelector("#song-quiz-content");
    content.innerHTML = `<article class="song-quiz-card"><span class="song-kicker">Aprender español con música</span><h1>Completa la canción</h1><p class="song-copy">Escolha um artista ou use o modo mistura. Em cada rodada, você escuta uma faixa surpresa por alguns segundos. O áudio pausa automaticamente e só então aparecem as alternativas para completar o título.</p><div class="song-artist-grid"><button class="song-artist-button mix" type="button" data-song-mode="mix">♫ Modo mezcla<span>10 faixas surpresa · artista e título ocultos</span></button>${Object.keys(ARTISTS).map((artist) => `<button class="song-artist-button" type="button" data-song-artist="${artist}">${artist}<span>5 músicas · título oculto</span></button>`).join("")}</div><p class="song-rights-note">As letras completas não são exibidas. O exercício usa prévias de áudio quando disponíveis e trabalha o reconhecimento auditivo com a complementação do título da música.</p></article>`;
    content.querySelector("[data-song-mode='mix']")?.addEventListener("click", () => startGame("mix"));
    content.querySelectorAll("[data-song-artist]").forEach((button) => button.addEventListener("click", () => startGame("artist", button.dataset.songArtist)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startGame(mode, artist = null) {
    stopAudio();
    state.mode = mode;
    state.artist = artist;
    state.queue = mode === "artist" ? buildArtistQueue(artist) : buildMixedQueue();
    state.index = 0;
    state.score = 0;
    state.fails = 0;
    state.answered = false;
    renderQuestion();
  }

  function revealCompletion(message) {
    const screen = ensureScreen();
    const content = screen.querySelector("#song-quiz-content");
    const after = content.querySelector("[data-song-after-pause]");
    const status = content.querySelector("[data-song-player-status]");
    const playButton = content.querySelector("[data-song-play]");
    if (status) status.textContent = message || "Pausa! Complete agora.";
    if (after) after.hidden = false;
    if (playButton) {
      playButton.disabled = false;
      playButton.textContent = "↻ Ouvir novamente";
    }
  }

  async function playCurrentSegment() {
    if (state.playing) return;
    const song = state.queue[state.index];
    const screen = ensureScreen();
    const content = screen.querySelector("#song-quiz-content");
    const player = content.querySelector("[data-song-player]");
    const status = content.querySelector("[data-song-player-status]");
    const button = content.querySelector("[data-song-play]");
    const bar = content.querySelector("[data-song-segment-progress]");
    const after = content.querySelector("[data-song-after-pause]");
    if (!song || !button) return;

    stopAudio();
    if (after && !state.answered) after.hidden = true;
    button.disabled = true;
    button.textContent = "Carregando trecho…";
    if (status) status.textContent = "Preparando uma faixa surpresa…";
    if (bar) bar.style.width = "0%";

    const url = await resolvePreview(song);
    if (!url) {
      button.disabled = false;
      button.textContent = "Prévia indisponível";
      revealCompletion("Prévia indisponível nesta faixa. Complete pelo desafio do título.");
      return;
    }

    state.previewUrl = url;
    const audio = new Audio(url);
    state.audio = audio;
    audio.preload = "auto";

    await new Promise((resolve) => {
      let done = false;
      const finish = () => { if (done) return; done = true; resolve(); };
      audio.addEventListener("loadedmetadata", finish, { once: true });
      audio.addEventListener("canplay", finish, { once: true });
      audio.addEventListener("error", finish, { once: true });
      window.setTimeout(finish, 3500);
    });

    try {
      if (Number.isFinite(audio.duration) && audio.duration > SEGMENT_SECONDS + 7) audio.currentTime = Math.min(5, Math.max(0, audio.duration - SEGMENT_SECONDS - 1));
      else audio.currentTime = 0;
    } catch (_) {}

    try {
      await audio.play();
    } catch (_) {
      button.disabled = false;
      button.textContent = "▶ Tentar ouvir novamente";
      if (status) status.textContent = "O navegador bloqueou a reprodução. Toque novamente.";
      return;
    }

    state.playing = true;
    player?.classList.add("playing");
    button.textContent = "Ouvindo…";
    if (status) status.textContent = `Ouça com atenção. O áudio pausa em ${SEGMENT_SECONDS} segundos.`;
    const started = Date.now();
    state.progressTimer = window.setInterval(() => {
      const pct = Math.min(100, ((Date.now() - started) / (SEGMENT_SECONDS * 1000)) * 100);
      if (bar) bar.style.width = `${pct}%`;
    }, 100);

    const finishSegment = () => {
      if (!state.playing) return;
      if (state.stopTimer) window.clearTimeout(state.stopTimer);
      if (state.progressTimer) window.clearInterval(state.progressTimer);
      state.stopTimer = null;
      state.progressTimer = null;
      state.playing = false;
      try { audio.pause(); } catch (_) {}
      player?.classList.remove("playing");
      if (bar) bar.style.width = "100%";
      revealCompletion("Pausa! Agora complete o que falta.");
    };

    audio.addEventListener("ended", finishSegment, { once: true });
    state.stopTimer = window.setTimeout(finishSegment, SEGMENT_SECONDS * 1000);
  }

  function renderQuestion() {
    stopAudio();
    const screen = ensureScreen();
    hideAllAppSections(screen.id);
    const song = state.queue[state.index];
    if (!song) { renderResult(); return; }
    state.currentQuestion = makeQuestion(song);
    state.answered = false;
    const q = state.currentQuestion;
    const content = screen.querySelector("#song-quiz-content");
    const total = state.queue.length;
    const completed = state.index;
    const overallProgress = Math.round((completed / total) * 100);
    const hiddenArtist = state.mode === "mix" ? "Artista oculto" : state.artist;

    content.innerHTML = `<article class="song-quiz-card"><div class="song-scoreboard"><div class="song-score-box"><span>Pontos</span><strong>${String(state.score * 100).padStart(3,"0")}</strong></div><div class="song-score-box"><span>Faixas</span><strong>${state.index + 1}/${total}</strong></div><div class="song-score-box"><span>Acertos</span><strong>${String(state.score).padStart(2,"0")}</strong></div><div class="song-score-box"><span>Falhas</span><strong>${String(state.fails).padStart(2,"0")}</strong></div></div><div class="song-progress"><span style="width:${overallProgress}%"></span></div><div class="song-player" data-song-player><div class="song-player-icon">♫</div><h3>Faixa surpresa</h3><p data-song-player-status>${hiddenArtist === "Artista oculto" ? "O artista e o título estão escondidos." : `Artista: ${hiddenArtist} · título escondido.`}</p><button class="song-play-button" type="button" data-song-play>▶ Ouvir trecho</button><div class="song-wave" aria-hidden="true">${"<i></i>".repeat(12)}</div><div class="song-segment-track" aria-hidden="true"><span data-song-segment-progress></span></div></div><div class="song-after-pause" data-song-after-pause hidden><p class="song-pause-label">⏸ Áudio pausado · complete</p><p class="song-title-prompt">${q.prompt.replace("________", '<span class="blank">________</span>')}</p><div class="song-options">${q.options.map((option) => `<button class="song-option" type="button" data-song-option="${option.replace(/"/g,"&quot;")}">${option}</button>`).join("")}</div><div class="song-feedback" data-song-feedback hidden></div><div class="song-actions"><button class="primary-button" type="button" data-song-next hidden>Próxima →</button></div></div></article>`;

    content.querySelector("[data-song-play]")?.addEventListener("click", playCurrentSegment);
    const feedback = content.querySelector("[data-song-feedback]");
    const next = content.querySelector("[data-song-next]");
    content.querySelectorAll("[data-song-option]").forEach((button) => {
      button.addEventListener("click", () => {
        if (state.answered) return;
        state.answered = true;
        const selected = button.dataset.songOption;
        const correct = normalize(selected) === normalize(q.answer);
        if (correct) state.score += 1;
        else state.fails += 1;
        content.querySelectorAll("[data-song-option]").forEach((item) => {
          item.disabled = true;
          if (normalize(item.dataset.songOption) === normalize(q.answer)) item.classList.add("correct");
          else if (item === button && !correct) item.classList.add("wrong");
        });
        feedback.hidden = false;
        feedback.innerHTML = correct
          ? `<strong>¡Muy bien!</strong> Você completou corretamente. A faixa era <em>${song.title}</em>, de ${song.artist}.`
          : `<strong>Resposta:</strong> ${q.answer}. A faixa era <em>${song.title}</em>, de ${song.artist}.`;
        next.hidden = false;
        next.textContent = state.index === total - 1 ? "Ver resultado →" : "Próxima →";
      });
    });
    next?.addEventListener("click", () => { state.index += 1; renderQuestion(); });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderResult() {
    stopAudio();
    const screen = ensureScreen();
    const content = screen.querySelector("#song-quiz-content");
    const total = state.queue.length;
    const best = saveBest(state.score);
    content.innerHTML = `<article class="song-quiz-card song-result"><span class="song-kicker">Resultado</span><h1>¡Partida completada!</h1><div class="song-result-score">${state.score}/${total}</div><p class="song-copy">${state.score === total ? "¡Excelente! Você reconheceu todas as faixas." : state.score >= Math.ceil(total * .7) ? "Muito bom! Sua compreensão auditiva está avançando." : "Continue praticando: ouvir várias vezes ajuda a reconhecer sons, palavras e títulos."}<br><strong>Melhor pontuação neste modo: ${best}/${total}</strong></p><div class="song-actions" style="justify-content:center"><button class="primary-button" type="button" data-song-again>Jogar novamente</button><button class="secondary-button" type="button" data-song-choose>Escolher modo</button></div></article>`;
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
      card.innerHTML = `<div class="song-quiz-feature-icon" aria-hidden="true">♫</div><div class="song-quiz-feature-copy"><small>Quiz musical</small><h3>Completa la canción</h3><p>Complete trechos curtos de canções em espanhol.</p><div class="song-feature-meta"><span>21 artistas</span><span>105 músicas</span><span>áudio com pausa</span><span>sem revelar o título</span></div></div><button class="primary-button" type="button" data-song-open>Empezar →</button>`;
      activities.insertAdjacentElement("beforebegin", card);
      card.querySelector("[data-song-open]")?.addEventListener("click", renderChooser);
    }

    document.querySelectorAll(".main-nav .nav-link").forEach((nav) => nav.addEventListener("click", () => {
      if (nav.dataset.route !== "quiz") stopAudio();
    }));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", installFeature, { once: true });
  else installFeature();
})();