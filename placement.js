/* Teste diagnóstico de nivelamento — correção realizada no Supabase. */
(function () {
  const loading = document.getElementById("placement-loading");
  const shell = document.getElementById("placement-shell");
  const intro = document.getElementById("placement-intro");
  const test = document.getElementById("placement-test");
  const resultSection = document.getElementById("placement-result");
  const startButton = document.getElementById("placement-start");
  const previousResult = document.getElementById("placement-last");
  const progressText = document.getElementById("placement-progress-text");
  const answeredText = document.getElementById("placement-answered-text");
  const progressBar = document.getElementById("placement-progress-bar");
  const questionNumber = document.getElementById("placement-question-number");
  const questionText = document.getElementById("placement-question");
  const optionsWrap = document.getElementById("placement-options");
  const prevButton = document.getElementById("placement-prev");
  const nextButton = document.getElementById("placement-next");
  const submitStatus = document.getElementById("placement-submit-status");
  if (!loading || !shell || !intro || !test || !resultSection || !startButton) return;

  const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
  const OPTION_KEYS = ["A", "B", "C", "D"];
  const LEVEL_INFO = {
    A1: {
      title: "A1 · Iniciante",
      description: "Você demonstra domínio inicial das estruturas essenciais e está construindo a base para situações cotidianas simples.",
      recommendations: ["Consolidar presente do indicativo, ser/estar, artigos e concordância.", "Ampliar vocabulário de rotina, família, casa, alimentação e horários.", "Praticar frases curtas, perguntas básicas e leituras muito breves."]
    },
    A2: {
      title: "A2 · Básico",
      description: "Você já compreende estruturas frequentes do cotidiano e consegue lidar com situações previsíveis, mas ainda precisa ampliar autonomia e precisão.",
      recommendations: ["Revisar pretéritos, pronomes de objeto e comparações.", "Ampliar vocabulário para viagens, trabalho, estudos e experiências pessoais.", "Ler textos curtos e produzir relatos simples no passado."]
    },
    B1: {
      title: "B1 · Intermediário",
      description: "Você apresenta uma base funcional para compreender e produzir espanhol em muitos contextos cotidianos, com espaço para desenvolver nuance e fluidez.",
      recommendations: ["Aprofundar contraste entre tempos do passado e usos do subjuntivo.", "Trabalhar conectores, por/para, condicionais e perífrases verbais.", "Ler textos mais longos e escrever opiniões com justificativas."]
    },
    B2: {
      title: "B2 · Intermediário avançado",
      description: "Você lida bem com estruturas complexas e textos com maior densidade, aproximando-se de uma comunicação independente e flexível.",
      recommendations: ["Refinar subjuntivo, discurso indireto e estruturas concessivas.", "Expandir expressões idiomáticas e vocabulário abstrato.", "Praticar argumentação, síntese de textos e compreensão de implícitos."]
    },
    C1: {
      title: "C1 · Avançado",
      description: "Você demonstra domínio amplo de estruturas complexas e boa capacidade de interpretar nuances, relações discursivas e léxico menos frequente.",
      recommendations: ["Refinar regência, colocação pronominal e combinações idiomáticas.", "Explorar textos acadêmicos, ensaísticos e jornalísticos de alta complexidade.", "Trabalhar registro, precisão lexical e produção argumentativa extensa."]
    },
    C2: {
      title: "C2 · Proficiência elevada",
      description: "Seu desempenho indica domínio muito elevado do conhecimento linguístico avaliado, com boa percepção de nuances gramaticais, lexicais e discursivas.",
      recommendations: ["Manter contato frequente com variedades do espanhol e registros especializados.", "Aprimorar estilo, pragmática, ironia, implícitos e escolhas lexicais finas.", "Buscar produção oral e escrita avançada com revisão crítica e variedade de gêneros."]
    }
  };

  let questions = [];
  let answers = {};
  let currentIndex = 0;
  let startedAt = 0;
  let storageKey = "vae-placement-progress-v1";
  let submitting = false;

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params);
      else if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

  function show(section) {
    [intro, test, resultSection].forEach((node) => node.classList.add("hidden"));
    section.classList.remove("hidden");
  }

  function formatDate(value) {
    const date = new Date(value || "");
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  }

  function saveProgress() {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ answers, currentIndex, startedAt }));
    } catch (_) {}
  }

  function clearProgress() {
    try { sessionStorage.removeItem(storageKey); } catch (_) {}
  }

  function restoreProgress() {
    try {
      const raw = sessionStorage.getItem(storageKey);
      if (!raw) return false;
      const saved = JSON.parse(raw);
      if (!saved || typeof saved.answers !== "object") return false;
      answers = saved.answers || {};
      currentIndex = Math.max(0, Math.min(Number(saved.currentIndex) || 0, questions.length - 1));
      startedAt = Number(saved.startedAt) || Date.now();
      return Object.keys(answers).length > 0;
    } catch (_) {
      return false;
    }
  }

  async function loadPreviousAttempt() {
    try {
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase
        .from("placement_attempts")
        .select("estimated_level,score,total,completed_at")
        .order("completed_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (!data) return;
      const pct = data.total ? Math.round((data.score / data.total) * 100) : 0;
      previousResult.textContent = `Seu último resultado foi ${data.estimated_level}, com ${data.score}/${data.total} acertos (${pct}%), em ${formatDate(data.completed_at)}. Você pode refazer o teste quando quiser.`;
      previousResult.classList.add("show");
    } catch (error) {
      console.warn("Falha ao carregar resultado anterior", error);
    }
  }

  async function loadQuestions() {
    const supabase = window.VAEAuth.getClient();
    const { data, error } = await supabase.rpc("get_placement_questions");
    if (error) throw error;
    questions = Array.isArray(data) ? data : [];
    if (questions.length !== 30) throw new Error("QUESTION_BANK_UNAVAILABLE");
  }

  function renderQuestion() {
    const item = questions[currentIndex];
    if (!item) return;
    const answeredCount = Object.keys(answers).filter((code) => answers[code] !== undefined).length;
    const percentage = Math.round(((currentIndex + 1) / questions.length) * 100);

    progressText.textContent = `Questão ${currentIndex + 1} de ${questions.length}`;
    answeredText.textContent = `${answeredCount} respondidas`;
    progressBar.style.width = `${percentage}%`;
    questionNumber.textContent = `Questão ${String(currentIndex + 1).padStart(2, "0")}`;
    questionText.textContent = item.prompt;
    optionsWrap.replaceChildren();

    const selected = answers[item.question_code];
    const options = Array.isArray(item.options) ? item.options : [];
    options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "placement-option";
      if (selected === index) button.classList.add("selected");
      button.setAttribute("aria-pressed", selected === index ? "true" : "false");

      const key = document.createElement("span");
      key.className = "placement-option-key";
      key.textContent = OPTION_KEYS[index] || String(index + 1);

      const text = document.createElement("span");
      text.textContent = String(option);
      button.append(key, text);
      button.addEventListener("click", () => {
        answers[item.question_code] = index;
        saveProgress();
        renderQuestion();
      });
      optionsWrap.appendChild(button);
    });

    prevButton.disabled = currentIndex === 0 || submitting;
    nextButton.disabled = selected === undefined || submitting;
    nextButton.textContent = currentIndex === questions.length - 1 ? "Ver meu resultado →" : "Próxima →";
    submitStatus.textContent = "";
  }

  function startTest(fresh) {
    if (fresh) {
      answers = {};
      currentIndex = 0;
      startedAt = Date.now();
      clearProgress();
      saveProgress();
    } else if (!startedAt) {
      startedAt = Date.now();
    }
    show(test);
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
    track("placement_test_start", { resumed: fresh ? "no" : "yes", question_count: questions.length });
  }

  function createBandRow(level, data) {
    const correct = Number(data?.correct) || 0;
    const total = Number(data?.total) || 5;
    const row = document.createElement("div");
    row.className = "placement-band";

    const label = document.createElement("span");
    label.className = "placement-band-label";
    label.textContent = level;

    const trackEl = document.createElement("div");
    trackEl.className = "placement-band-track";
    const fill = document.createElement("div");
    fill.className = "placement-band-fill";
    fill.style.width = `${Math.round((correct / total) * 100)}%`;
    trackEl.appendChild(fill);

    const score = document.createElement("span");
    score.className = "placement-band-score";
    score.textContent = `${correct}/${total}`;

    row.append(label, trackEl, score);
    return row;
  }

  function renderResult(result) {
    const level = String(result?.estimated_level || "A1");
    const info = LEVEL_INFO[level] || LEVEL_INFO.A1;
    const score = Number(result?.score) || 0;
    const total = Number(result?.total) || 30;
    const percentage = Number(result?.percentage) || Math.round((score / total) * 100);

    document.getElementById("placement-result-level").textContent = level;
    document.getElementById("placement-result-title").textContent = info.title;
    document.getElementById("placement-result-description").textContent = info.description;
    document.getElementById("placement-result-score").textContent = `${score}/${total} acertos`;
    document.getElementById("placement-result-percentage").textContent = `${percentage}% no teste`;
    document.getElementById("placement-result-date").textContent = formatDate(result?.completed_at);

    const bands = document.getElementById("placement-band-list");
    bands.replaceChildren();
    LEVELS.forEach((band) => bands.appendChild(createBandRow(band, result?.band_scores?.[band])));

    const recommendations = document.getElementById("placement-recommendation-list");
    recommendations.replaceChildren();
    info.recommendations.forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      recommendations.appendChild(li);
    });

    show(resultSection);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitTest() {
    if (submitting) return;
    if (Object.keys(answers).length !== questions.length) {
      const missingIndex = questions.findIndex((q) => answers[q.question_code] === undefined);
      currentIndex = missingIndex >= 0 ? missingIndex : currentIndex;
      renderQuestion();
      submitStatus.textContent = "Responda todas as questões antes de finalizar.";
      return;
    }

    submitting = true;
    prevButton.disabled = true;
    nextButton.disabled = true;
    nextButton.textContent = "Corrigindo…";
    submitStatus.textContent = "Seu teste está sendo corrigido com segurança no servidor.";

    try {
      const durationSeconds = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.rpc("submit_placement_test", {
        p_answers: answers,
        p_duration_seconds: durationSeconds
      });
      if (error) throw error;
      clearProgress();
      track("placement_test_complete", {
        estimated_level: data?.estimated_level || "",
        score: data?.score || 0,
        total: data?.total || questions.length,
        duration_seconds: durationSeconds
      });
      renderResult(data || {});
    } catch (error) {
      console.error("Falha ao corrigir nivelamento", error);
      const message = String(error?.message || "").toLowerCase().includes("placement_incomplete")
        ? "O teste está incompleto. Revise suas respostas e tente novamente."
        : window.VAEAuth.friendlyError(error);
      submitStatus.textContent = message;
      submitting = false;
      renderQuestion();
      submitStatus.textContent = message;
    }
  }

  prevButton.addEventListener("click", () => {
    if (currentIndex <= 0 || submitting) return;
    currentIndex -= 1;
    saveProgress();
    renderQuestion();
  });

  nextButton.addEventListener("click", () => {
    if (submitting) return;
    const item = questions[currentIndex];
    if (!item || answers[item.question_code] === undefined) return;
    if (currentIndex === questions.length - 1) {
      submitTest();
      return;
    }
    currentIndex += 1;
    saveProgress();
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  startButton.addEventListener("click", () => {
    const hasSaved = Object.keys(answers).length > 0;
    startTest(!hasSaved);
  });

  document.getElementById("placement-retry")?.addEventListener("click", () => startTest(true));

  async function boot() {
    if (!window.VAEAuth?.isConfigured?.()) {
      loading.textContent = "O teste de nivelamento ainda não está disponível.";
      return;
    }

    try {
      const session = await window.VAEAuth.requireSession();
      if (!session) return;
      const user = session.user || await window.VAEAuth.getUser();
      if (!user) return;
      storageKey = `vae-placement-progress-v1-${user.id}`;

      await Promise.all([loadQuestions(), loadPreviousAttempt()]);
      const restored = restoreProgress();
      if (restored) startButton.textContent = "Continuar teste →";

      loading.classList.add("hidden");
      shell.classList.remove("hidden");
      show(intro);
      track("placement_test_view", { has_saved_progress: restored ? "yes" : "no" });
    } catch (error) {
      console.error("Falha ao abrir teste de nivelamento", error);
      loading.textContent = "Não foi possível carregar o teste agora. Atualize a página e tente novamente.";
    }
  }

  boot();
})();
