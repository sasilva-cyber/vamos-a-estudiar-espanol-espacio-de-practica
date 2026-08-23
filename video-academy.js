/* Experiência de videoaulas Premium com séries, episódios e progresso individual. */
(function () {
  const SERIES_SLUG = "espanol-desde-cero";
  const SERIES_TITLE = "Español desde Cero";
  let root = null;
  let lessons = [];
  let progressMap = new Map();
  let activeLesson = null;
  let activeVideo = null;
  let saveTimer = null;
  let lastSavedSecond = -1;

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params);
      else if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

  function minutes(seconds) {
    const value = Number(seconds || 0);
    if (!value) return "";
    return `${Math.max(1, Math.round(value / 60))} min`;
  }

  function lessonNumber(item, index) {
    return String(item.episode_number || index + 1).padStart(2, "0");
  }

  function percentFor(item) {
    const progress = progressMap.get(String(item.id));
    if (!progress) return 0;
    if (progress.completed) return 100;
    const duration = Number(progress.duration_seconds || item.duration_seconds || 0);
    return duration > 0 ? Math.min(99, Math.round((Number(progress.watched_seconds || 0) / duration) * 100)) : 0;
  }

  function buildRoot() {
    if (document.getElementById("video-academy")) return document.getElementById("video-academy");
    const libraryTitle = document.getElementById("student-library-title");
    const librarySection = libraryTitle?.closest("section");
    const listeningSection = document.querySelector(".listening-hub");
    const anchor = listeningSection || librarySection;
    if (!anchor) return null;

    const section = document.createElement("section");
    section.className = "student-section video-academy";
    section.id = "video-academy";
    section.setAttribute("data-premium-section", "");
    section.setAttribute("aria-labelledby", "video-academy-title");
    section.innerHTML = `
      <div class="video-academy-head">
        <div class="video-academy-copy">
          <p class="student-section-kicker">Videoaulas exclusivas · Série 01</p>
          <h2 id="video-academy-title">Español desde Cero</h2>
          <p>Uma série guiada para construir sua base no espanhol desde os primeiros contatos com o idioma. As aulas ficam organizadas em sequência, e seu progresso é salvo automaticamente para você continuar de onde parou.</p>
          <div class="video-academy-meta" aria-label="Características da série">
            <span class="video-academy-chip"><strong>A1</strong> ponto de partida</span>
            <span class="video-academy-chip">▶ Videoaulas em sequência</span>
            <span class="video-academy-chip">✓ Progresso individual salvo</span>
            <span class="video-academy-chip">🔒 Conteúdo Premium</span>
          </div>
        </div>
        <aside class="video-series-cover" aria-label="Capa da série Español desde Cero">
          <p class="video-series-label">Vamos a Estudiar Español · Original</p>
          <h3>Español<br>desde Cero</h3>
          <p>Construa uma base segura, aula por aula, e avance com clareza desde o nível inicial.</p>
          <div class="video-series-progress">
            <div class="video-series-progress-top"><span id="video-series-progress-text">Carregando progresso…</span><span>Seu percurso</span></div>
            <div class="video-series-progress-track"><div class="video-series-progress-bar" id="video-series-progress-bar"></div></div>
          </div>
        </aside>
      </div>
      <div class="video-academy-toolbar">
        <h3>Aulas da série</h3>
        <span class="video-academy-count" id="video-academy-count">Carregando…</span>
      </div>
      <div class="video-lesson-list" id="video-lesson-list" aria-live="polite"></div>`;

    if (librarySection) librarySection.insertAdjacentElement("beforebegin", section);
    else anchor.insertAdjacentElement("afterend", section);
    return section;
  }

  function ensureRoot() {
    root = document.getElementById("video-academy") || buildRoot();
    return root;
  }

  function ensureModal() {
    let modal = document.getElementById("video-player-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "video-player-modal";
    modal.className = "video-player-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Reprodutor de videoaula");
    modal.innerHTML = `
      <div class="video-player-shell">
        <div class="video-player-stage">
          <button class="video-player-close" type="button" aria-label="Fechar videoaula">×</button>
          <video id="video-player" controls playsinline preload="metadata"></video>
        </div>
        <div class="video-player-info">
          <div><h3 id="video-player-title">Videoaula</h3><p id="video-player-description"></p></div>
          <div class="video-player-progress"><span id="video-player-progress">Progresso salvo automaticamente</span><small class="video-player-status" id="video-player-status"></small></div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector(".video-player-close")?.addEventListener("click", closePlayer);
    modal.addEventListener("click", (event) => { if (event.target === modal) closePlayer(); });
    document.addEventListener("keydown", (event) => { if (event.key === "Escape" && modal.classList.contains("open")) closePlayer(); });
    activeVideo = modal.querySelector("#video-player");
    activeVideo?.addEventListener("loadedmetadata", restorePosition);
    activeVideo?.addEventListener("timeupdate", scheduleSave);
    activeVideo?.addEventListener("ended", () => saveProgress(true));
    return modal;
  }

  async function loadProgress() {
    if (!window.VAEAuth?.getClient || !lessons.length) {
      progressMap = new Map();
      return;
    }
    try {
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase
        .from("video_watch_progress")
        .select("content_id,watched_seconds,duration_seconds,completed,last_watched_at")
        .in("content_id", lessons.map((item) => item.id));
      if (error) throw error;
      progressMap = new Map((data || []).map((row) => [String(row.content_id), row]));
    } catch (error) {
      console.warn("Não foi possível carregar o progresso das videoaulas", error);
      progressMap = new Map();
    }
  }

  function seriesStats() {
    const total = lessons.length;
    const completed = lessons.filter((item) => progressMap.get(String(item.id))?.completed).length;
    return { total, completed, overall: total ? Math.round((completed / total) * 100) : 0 };
  }

  function buildLesson(item, index) {
    const progress = progressMap.get(String(item.id));
    const completed = Boolean(progress?.completed);
    const percent = percentFor(item);
    const article = document.createElement("article");
    article.className = `video-lesson${completed ? " completed" : ""}`;

    const number = document.createElement("div");
    number.className = "video-lesson-number";
    number.textContent = completed ? "✓" : lessonNumber(item, index);

    const copy = document.createElement("div");
    copy.className = "video-lesson-copy";
    const top = document.createElement("div");
    top.className = "video-lesson-topline";
    const kicker = document.createElement("span");
    kicker.className = "video-lesson-kicker";
    kicker.textContent = `Aula ${lessonNumber(item, index)}`;
    const state = document.createElement("span");
    state.className = `video-lesson-status${completed ? " done" : ""}`;
    state.textContent = completed ? "Concluída" : percent > 0 ? `${percent}% assistido` : "Nova";
    top.append(kicker, state);

    const title = document.createElement("h4");
    title.textContent = String(item.title || "Videoaula");
    const description = document.createElement("p");
    description.textContent = String(item.description || "Videoaula exclusiva da série Español desde Cero.");
    const meta = document.createElement("div");
    meta.className = "video-lesson-meta";
    [item.level, minutes(item.duration_seconds), item.category].filter(Boolean).forEach((value) => {
      const span = document.createElement("span");
      span.textContent = String(value);
      meta.appendChild(span);
    });
    const trackNode = document.createElement("div");
    trackNode.className = "video-lesson-progress-track";
    const bar = document.createElement("div");
    bar.className = "video-lesson-progress-bar";
    bar.style.width = `${percent}%`;
    trackNode.appendChild(bar);
    copy.append(top, title, description, meta, trackNode);

    const button = document.createElement("button");
    button.className = "video-lesson-action";
    button.type = "button";
    button.textContent = completed ? "Assistir novamente →" : percent > 0 ? "Continuar aula →" : "Assistir aula →";
    button.addEventListener("click", () => openPlayer(item, button));
    article.append(number, copy, button);
    return article;
  }

  function render() {
    if (!ensureRoot()) return;
    const stats = seriesStats();
    const count = root.querySelector("#video-academy-count");
    const progressText = root.querySelector("#video-series-progress-text");
    const progressBar = root.querySelector("#video-series-progress-bar");
    const list = root.querySelector("#video-lesson-list");
    if (count) count.textContent = stats.total === 1 ? "1 aula publicada" : `${stats.total} aulas publicadas`;
    if (progressText) progressText.textContent = stats.total ? `${stats.completed} de ${stats.total} concluídas` : "Série em preparação";
    if (progressBar) progressBar.style.width = `${stats.overall}%`;
    if (!list) return;
    list.replaceChildren();

    if (!lessons.length) {
      const empty = document.createElement("div");
      empty.className = "video-academy-empty";
      empty.innerHTML = `<strong>Español desde Cero está chegando.</strong>As primeiras videoaulas ainda estão sendo preparadas. Quando forem publicadas pela administração, aparecerão aqui automaticamente.`;
      list.appendChild(empty);
      return;
    }

    const modules = new Map();
    lessons.forEach((item) => {
      const moduleName = item.module_title || "Comece por aqui";
      if (!modules.has(moduleName)) modules.set(moduleName, []);
      modules.get(moduleName).push(item);
    });
    let globalIndex = 0;
    modules.forEach((items, moduleName) => {
      const heading = document.createElement("div");
      heading.className = "video-module-title";
      heading.textContent = moduleName;
      list.appendChild(heading);
      items.forEach((item) => list.appendChild(buildLesson(item, globalIndex++)));
    });
  }

  async function openPlayer(item, button) {
    const original = button.textContent;
    button.disabled = true;
    button.textContent = "Preparando aula…";
    try {
      const signedUrl = await window.VAEAuth.createSignedContentUrl(item.storage_path, 7200);
      activeLesson = item;
      lastSavedSecond = -1;
      const modal = ensureModal();
      const title = modal.querySelector("#video-player-title");
      const desc = modal.querySelector("#video-player-description");
      const status = modal.querySelector("#video-player-status");
      const progressLabel = modal.querySelector("#video-player-progress");
      if (title) title.textContent = item.title;
      if (desc) desc.textContent = item.description || `${SERIES_TITLE} · Aula ${item.episode_number || ""}`;
      if (status) status.textContent = "Acesso protegido por link temporário.";
      if (progressLabel) progressLabel.textContent = percentFor(item) ? `Continuando do seu progresso · ${percentFor(item)}%` : "Progresso salvo automaticamente";
      activeVideo.src = signedUrl;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      activeVideo.play().catch(() => {});
      track("premium_video_open", { content_id: item.id, series: item.series_slug || SERIES_SLUG, episode: item.episode_number || null });
    } catch (error) {
      console.error("Falha ao abrir videoaula", error);
      window.alert(window.VAEAuth?.friendlyError?.(error) || "Não foi possível abrir a videoaula agora.");
    } finally {
      button.disabled = false;
      button.textContent = original;
    }
  }

  function restorePosition() {
    if (!activeLesson || !activeVideo) return;
    const progress = progressMap.get(String(activeLesson.id));
    const saved = Number(progress?.watched_seconds || 0);
    const duration = Number(activeVideo.duration || 0);
    if (!progress?.completed && saved > 5 && duration > saved + 5) activeVideo.currentTime = saved;
  }

  function scheduleSave() {
    if (!activeVideo || !activeLesson || activeVideo.paused) return;
    const second = Math.floor(activeVideo.currentTime || 0);
    if (second < 0 || second === lastSavedSecond || second % 10 !== 0) return;
    lastSavedSecond = second;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => saveProgress(false), 250);
  }

  async function saveProgress(forceComplete) {
    if (!activeLesson || !activeVideo || !window.VAEAuth?.getClient) return;
    const current = Math.max(0, Math.floor(activeVideo.currentTime || 0));
    const duration = Math.max(0, Math.floor(activeVideo.duration || activeLesson.duration_seconds || 0));
    const completed = Boolean(forceComplete || (duration > 0 && current / duration >= .9));
    try {
      const session = await window.VAEAuth.getSession();
      const userId = session?.user?.id;
      if (!userId) return;
      const supabase = window.VAEAuth.getClient();
      const { error } = await supabase.from("video_watch_progress").upsert({
        user_id: userId,
        content_id: activeLesson.id,
        watched_seconds: completed ? duration || current : current,
        duration_seconds: duration,
        completed,
        completed_at: completed ? new Date().toISOString() : null,
        last_watched_at: new Date().toISOString()
      }, { onConflict: "user_id,content_id" });
      if (error) throw error;
      progressMap.set(String(activeLesson.id), { content_id: activeLesson.id, watched_seconds: completed ? duration || current : current, duration_seconds: duration, completed, last_watched_at: new Date().toISOString() });
      const label = document.getElementById("video-player-progress");
      if (label) label.textContent = completed ? "Aula concluída ✓" : `Progresso salvo · ${duration ? Math.min(99, Math.round((current / duration) * 100)) : 0}%`;
      if (completed) track("premium_video_complete", { content_id: activeLesson.id, series: activeLesson.series_slug || SERIES_SLUG });
    } catch (error) {
      console.warn("Falha ao salvar progresso da videoaula", error);
    }
  }

  async function closePlayer() {
    const modal = document.getElementById("video-player-modal");
    if (!modal?.classList.contains("open")) return;
    clearTimeout(saveTimer);
    await saveProgress(false);
    if (activeVideo) {
      activeVideo.pause();
      activeVideo.removeAttribute("src");
      activeVideo.load();
    }
    modal.classList.remove("open");
    document.body.style.overflow = "";
    activeLesson = null;
    render();
  }

  async function setContents(allContents) {
    lessons = (Array.isArray(allContents) ? allContents : [])
      .filter((item) => item.content_type === "video" && (item.series_slug === SERIES_SLUG || item.series_title === SERIES_TITLE))
      .sort((a, b) => (Number(a.episode_number || 9999) - Number(b.episode_number || 9999)) || (Number(a.sort_order || 0) - Number(b.sort_order || 0)));
    await loadProgress();
    render();
  }

  async function loadFromDatabase() {
    if (!window.VAEAuth?.getClient) return;
    try {
      const session = await window.VAEAuth.getSession();
      if (!session) return;
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase
        .from("exclusive_contents")
        .select("id,title,description,content_type,storage_path,file_name,level,category,sort_order,published_at,series_slug,series_title,module_title,episode_number,duration_seconds")
        .eq("published", true)
        .eq("content_type", "video")
        .eq("series_slug", SERIES_SLUG)
        .order("episode_number", { ascending: true, nullsFirst: false })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      await setContents(data || []);
    } catch (error) {
      console.warn("Não foi possível carregar a série de videoaulas", error);
      lessons = [];
      render();
    }
  }

  window.VAEVideoAcademy = Object.freeze({ setContents, render, refresh: loadFromDatabase });

  function boot() {
    ensureRoot();
    render();
    loadFromDatabase();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
