/* Atualiza automaticamente os números do painel "Hoy puedes practicar". */
(function () {
  const FALLBACKS = {
    levels: 3,
    quizQuestions: 168,
    grammar: 35,
    vocabulary: 22,
    readings: 18,
    listening: 18,
    writing: 18
  };

  let lastSignature = "";

  function numberFromText(text) {
    const match = String(text || "").match(/\d+/);
    return match ? Number(match[0]) : 0;
  }

  function countBaseQuiz() {
    try {
      if (typeof quizData === "undefined") return 0;
      return Object.values(quizData).reduce((total, level) => total + (Array.isArray(level.questions) ? level.questions.length : 0), 0);
    } catch (_) {
      return 0;
    }
  }

  function countExtendedQuiz() {
    try {
      if (typeof extendedQuizActivities === "undefined") return 0;
      return Object.values(extendedQuizActivities).reduce((total, activity) => total + (Array.isArray(activity.questions) ? activity.questions.length : 0), 0);
    } catch (_) {
      return 0;
    }
  }

  function countSongQuiz() {
    try {
      if (Array.isArray(window.VAE_SONG_QUIZ_BANK)) return window.VAE_SONG_QUIZ_BANK.length;
    } catch (_) {}
    const card = document.getElementById("song-quiz-feature");
    return numberFromText(card?.dataset?.songQuizCount || "0");
  }

  function countQuizLevels() {
    try {
      if (typeof quizData !== "undefined") return Object.keys(quizData).length;
    } catch (_) {}
    return FALLBACKS.levels;
  }

  function countQuizQuestions() {
    const base = countBaseQuiz();
    const extended = countExtendedQuiz();

    const readingCards = document.querySelectorAll(".reading-test-card").length;
    const readingQuestions = readingCards ? readingCards * 6 : 0;

    const listeningCards = document.querySelectorAll(".quiz-listening-card").length;
    const listeningQuestions = listeningCards ? listeningCards * 5 : 0;

    const songQuestions = countSongQuiz();
    const total = base + extended + readingQuestions + listeningQuestions + songQuestions;
    return total || FALLBACKS.quizQuestions;
  }

  function countGrammar() {
    try {
      if (typeof grammarLessons !== "undefined" && Array.isArray(grammarLessons)) return grammarLessons.length;
    } catch (_) {}
    return FALLBACKS.grammar;
  }

  function countVocabulary() {
    try {
      if (typeof vocabularyData !== "undefined") return Object.keys(vocabularyData).length;
    } catch (_) {}
    return FALLBACKS.vocabulary;
  }

  function countReadings() {
    try {
      if (typeof readingData !== "undefined") return Object.keys(readingData).length;
    } catch (_) {}
    return FALLBACKS.readings;
  }

  function countListening() {
    const summary = [...document.querySelectorAll(".listening-expanded-summary span")]
      .find((item) => /\baudios?\b/i.test(item.textContent || ""));
    return numberFromText(summary?.textContent) || FALLBACKS.listening;
  }

  function countWriting() {
    const screen = document.getElementById("writing-screen") || document.querySelector(".writing-screen");
    if (screen) {
      const candidates = [...screen.querySelectorAll("span, p, small")];
      const summary = candidates.find((item) => /\b\d+\s+(prácticas|praticas|propuestas|actividades)\b/i.test(item.textContent || ""));
      const parsed = numberFromText(summary?.textContent);
      if (parsed >= FALLBACKS.writing) return parsed;
    }
    return FALLBACKS.writing;
  }

  function collectStats() {
    return [
      [countQuizLevels(), "niveles de quiz"],
      [countQuizQuestions(), "preguntas y actividades"],
      [countGrammar(), "lecciones de gramática"],
      [countVocabulary(), "temas de vocabulario"],
      [countReadings(), "lecturas guiadas"],
      [countListening(), "audios de escucha"],
      [countWriting(), "prácticas de escritura"]
    ];
  }

  function renderStats() {
    const panel = document.querySelector("#home-screen .hero-panel");
    if (!panel) return false;

    const stats = collectStats();
    const signature = JSON.stringify(stats);
    if (signature === lastSignature && panel.dataset.autoStats === "true") return true;
    lastSignature = signature;

    const description = [...panel.children].find((child) => child.tagName === "P" && !child.classList.contains("hero-panel-kicker"));
    panel.querySelectorAll(".hero-stat").forEach((row) => row.remove());

    stats.forEach(([value, label]) => {
      const row = document.createElement("div");
      row.className = "hero-stat";
      row.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
      if (description) panel.insertBefore(row, description);
      else panel.appendChild(row);
    });

    panel.dataset.autoStats = "true";
    return true;
  }

  function install() {
    if (!renderStats()) {
      setTimeout(install, 250);
      return;
    }

    const app = document.getElementById("app");
    if (app && !app.dataset.autoStatsObserved) {
      app.dataset.autoStatsObserved = "true";
      const observer = new MutationObserver(() => renderStats());
      observer.observe(app, { childList: true, subtree: true });
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      renderStats();
      attempts += 1;
      if (attempts >= 15) window.clearInterval(timer);
    }, 800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", install, { once: true });
  } else {
    install();
  }
})();
