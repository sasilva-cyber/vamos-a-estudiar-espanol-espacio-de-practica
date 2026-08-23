/* Eventos de engajamento para a tag oficial do Google Analytics 4. */
(function () {
  const id = String(window.VAE_GA4_ID || "").trim();
  if (!/^G-[A-Z0-9]+$/i.test(id) || typeof window.gtag !== "function") return;

  const context = {
    quizLevel: null,
    activityId: null,
    falseFriendsLevel: null,
    songMode: null,
    songArtist: null
  };
  const sent = new Map();
  let initialRouteEventSkipped = false;

  function track(eventName, params) {
    if (!eventName) return;
    window.gtag("event", String(eventName), params || {});
  }

  window.vaeTrack = track;

  function pageView(detail) {
    const path = detail?.path || `${location.pathname}${location.search}`;
    const title = detail?.title || document.title;
    track("page_view", {
      page_title: title,
      page_location: location.href,
      page_path: path
    });
  }

  function parseScore(value) {
    const match = String(value || "").match(/(\d+)\s*\/\s*(\d+)/);
    return match ? { score: Number(match[1]), total: Number(match[2]) } : {};
  }

  function visible(selector) {
    const el = document.querySelector(selector);
    return !!el && !el.classList.contains("hidden") && !el.hidden;
  }

  function once(key, ttl = 1200) {
    const now = Date.now();
    const previous = sent.get(key) || 0;
    if (now - previous < ttl) return false;
    sent.set(key, now);
    return true;
  }

  function trackStandardQuizComplete() {
    if (!visible("#result-screen")) return;
    const parsed = parseScore(document.getElementById("final-score")?.textContent);
    const level = document.getElementById("result-level")?.textContent?.trim() || context.quizLevel || "unknown";
    const key = `quiz_complete:${level}:${parsed.score ?? "x"}:${parsed.total ?? "x"}`;
    if (!once(key, 4000)) return;
    track("quiz_complete", { quiz_type: "level", level, ...parsed });
  }

  function trackActivityComplete() {
    if (!visible("#activity-result-screen")) return;
    const parsed = parseScore(document.getElementById("activity-final-score")?.textContent);
    const activityId = context.activityId || "unknown";
    const key = `activity_complete:${activityId}:${parsed.score ?? "x"}:${parsed.total ?? "x"}`;
    if (!once(key, 4000)) return;
    track("activity_complete", { activity_id: activityId, ...parsed });
  }

  function trackFalseFriendsComplete() {
    if (!visible("#ff-result-screen")) return;
    const parsed = parseScore(document.getElementById("ff-result-score")?.textContent);
    const level = context.falseFriendsLevel || document.getElementById("ff-hud-level")?.textContent?.trim() || "unknown";
    const key = `false_friends_complete:${level}:${parsed.score ?? "x"}:${parsed.total ?? "x"}`;
    if (!once(key, 4000)) return;
    track("false_friends_complete", { level, ...parsed });
  }

  function trackSongComplete() {
    const result = document.querySelector("#song-quiz-content .song-result");
    if (!result) return;
    const parsed = parseScore(result.querySelector(".song-result-score")?.textContent);
    const mode = context.songMode || "unknown";
    const artist = context.songArtist || "all";
    const key = `song_quiz_complete:${mode}:${artist}:${parsed.score ?? "x"}:${parsed.total ?? "x"}`;
    if (!once(key, 4000)) return;
    track("song_quiz_complete", { mode, artist, ...parsed });
  }

  function afterAction(check) {
    window.setTimeout(check, 0);
    window.setTimeout(check, 120);
  }

  document.addEventListener("click", (event) => {
    const target = event.target.closest?.("button, a, [data-route]");
    if (!target) return;

    if (target.matches("[data-level]")) {
      context.quizLevel = target.dataset.level || target.textContent?.trim() || "unknown";
      track("quiz_start", { quiz_type: "level", level: context.quizLevel });
      return;
    }
    if (target.matches("[data-start-activity]")) {
      context.activityId = target.dataset.startActivity || "unknown";
      track("activity_start", { activity_id: context.activityId });
      return;
    }
    if (target.matches("[data-ff-level]")) {
      context.falseFriendsLevel = target.dataset.ffLevel || "unknown";
      track("false_friends_start", { level: context.falseFriendsLevel });
      return;
    }
    if (target.matches("[data-song-mode]")) {
      context.songMode = target.dataset.songMode || "mix";
      context.songArtist = null;
      track("song_quiz_start", { mode: context.songMode, artist: "all" });
      return;
    }
    if (target.matches("[data-song-artist]")) {
      context.songMode = "artist";
      context.songArtist = target.dataset.songArtist || "unknown";
      track("song_quiz_start", { mode: "artist", artist: context.songArtist });
      return;
    }
    if (target.matches("[data-song-again]")) {
      track("song_quiz_restart", { mode: context.songMode || "unknown", artist: context.songArtist || "all" });
      return;
    }
    if (target.id === "restart-button") {
      track("quiz_restart", { quiz_type: "level", level: context.quizLevel || "unknown" });
      return;
    }
    if (target.id === "activity-retry") {
      track("activity_restart", { activity_id: context.activityId || "unknown" });
      return;
    }
    if (target.id === "ff-retry") {
      track("false_friends_restart", { level: context.falseFriendsLevel || "unknown" });
      return;
    }
    if (target.id === "next-button") {
      afterAction(trackStandardQuizComplete);
      return;
    }
    if (target.id === "activity-next") {
      afterAction(trackActivityComplete);
      return;
    }
    if (target.id === "ff-next") {
      afterAction(trackFalseFriendsComplete);
      return;
    }
    if (target.matches("[data-song-next]")) afterAction(trackSongComplete);
  }, true);

  window.addEventListener("vae:routechange", (event) => {
    // O gtag('config') da tag oficial já envia a visualização inicial.
    // Ignoramos o primeiro routechange para evitar pageview duplicado na abertura.
    if (!initialRouteEventSkipped) {
      initialRouteEventSkipped = true;
      return;
    }
    pageView(event.detail);
  });
})();
