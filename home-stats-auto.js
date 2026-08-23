/* Atualiza os números do painel "Hoy puedes practicar" sem observar cada mutação da página. */
(function () {
  const FALLBACKS = {
    levels: 3,
    baseQuiz: 30,
    extendedQuiz: 60,
    readingQuiz: 24,
    listeningQuiz: 30,
    songQuiz: 145,
    grammar: 35,
    vocabulary: 22,
    readings: 18,
    listening: 18,
    writing: 18
  };

  function safeLength(value, fallback) {
    return Array.isArray(value) ? value.length : fallback;
  }

  function countBaseQuiz() {
    try {
      if (typeof quizData === "undefined") return FALLBACKS.baseQuiz;
      return Object.values(quizData).reduce((total, level) => total + safeLength(level.questions, 0), 0) || FALLBACKS.baseQuiz;
    } catch (_) { return FALLBACKS.baseQuiz; }
  }

  function countExtendedQuiz() {
    try {
      if (typeof extendedQuizActivities === "undefined") return FALLBACKS.extendedQuiz;
      return Object.values(extendedQuizActivities).reduce((total, activity) => total + safeLength(activity.questions, 0), 0) || FALLBACKS.extendedQuiz;
    } catch (_) { return FALLBACKS.extendedQuiz; }
  }

  function countSongQuiz() {
    try {
      if (Array.isArray(window.VAE_SONG_QUIZ_BANK) && window.VAE_SONG_QUIZ_BANK.length) return window.VAE_SONG_QUIZ_BANK.length;
    } catch (_) {}
    return FALLBACKS.songQuiz;
  }

  function countGrammar() {
    try {
      return typeof grammarLessons !== "undefined" && Array.isArray(grammarLessons) ? grammarLessons.length : FALLBACKS.grammar;
    } catch (_) { return FALLBACKS.grammar; }
  }

  function countVocabulary() {
    try {
      return typeof vocabularyData !== "undefined" ? Object.keys(vocabularyData).length : FALLBACKS.vocabulary;
    } catch (_) { return FALLBACKS.vocabulary; }
  }

  function countReadings() {
    try {
      const base = typeof readingData !== "undefined" ? Object.keys(readingData).length : 0;
      return Math.max(base, FALLBACKS.readings);
    } catch (_) { return FALLBACKS.readings; }
  }

  function collectStats() {
    const quizTotal = countBaseQuiz() + countExtendedQuiz() + FALLBACKS.readingQuiz + FALLBACKS.listeningQuiz + countSongQuiz();
    return [
      [FALLBACKS.levels, "niveles de quiz"],
      [quizTotal, "preguntas y actividades"],
      [countGrammar(), "lecciones de gramática"],
      [countVocabulary(), "temas de vocabulario"],
      [countReadings(), "lecturas guiadas"],
      [FALLBACKS.listening, "audios de escucha"],
      [FALLBACKS.writing, "prácticas de escritura"]
    ];
  }

  function renderStats() {
    const panel = document.querySelector("#home-screen .hero-panel");
    if (!panel) return false;

    const description = [...panel.children].find((child) => child.tagName === "P" && !child.classList.contains("hero-panel-kicker"));
    panel.querySelectorAll(".hero-stat").forEach((row) => row.remove());

    collectStats().forEach(([value, label]) => {
      const row = document.createElement("div");
      row.className = "hero-stat";
      row.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
      if (description) panel.insertBefore(row, description);
      else panel.appendChild(row);
    });

    panel.dataset.autoStats = "true";
    return true;
  }

  function install(attempt = 0) {
    if (!renderStats() && attempt < 20) {
      window.setTimeout(() => install(attempt + 1), 100);
      return;
    }

    const refresh = () => renderStats();
    window.addEventListener("vae:content-counts-changed", refresh);
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(refresh, { timeout: 2500 });
    } else {
      window.setTimeout(refresh, 1500);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => install(), { once: true });
  else install();
})();