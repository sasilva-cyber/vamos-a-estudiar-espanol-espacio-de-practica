/* Percurso automático de atividades exclusivas: uma atividade concluída nunca volta para o mesmo aluno. */
(function () {
  const main = document.getElementById("practice-main");
  const loading = document.getElementById("practice-loading");
  const content = document.getElementById("practice-content");
  const finished = document.getElementById("practice-finished");
  const form = document.getElementById("practice-form");
  const questionsNode = document.getElementById("practice-questions");
  const status = document.getElementById("practice-status");
  const submit = document.getElementById("practice-submit");
  const resultNode = document.getElementById("practice-result");
  if (!main || !loading || !content || !finished || !form || !questionsNode || !status || !submit || !resultNode) return;

  let payload = null;

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params);
      else if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

  function setStatus(message, type = "info") {
    status.textContent = message;
    status.className = `practice-status ${type}`;
  }

  function renderQuestions() {
    questionsNode.replaceChildren();
    payload.questions.forEach((question, index) => {
      const section = document.createElement("section");
      section.className = "practice-question";

      const title = document.createElement("h3");
      title.textContent = `${index + 1}. ${question.prompt}`;
      const options = document.createElement("div");
      options.className = "practice-options";

      question.options.forEach((option, optionIndex) => {
        const label = document.createElement("label");
        label.className = "practice-option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `q-${question.id}`;
        input.value = String(optionIndex);
        const text = document.createElement("span");
        text.textContent = option;
        label.append(input, text);
        options.appendChild(label);
      });

      section.append(title, options);
      questionsNode.appendChild(section);
    });
  }

  function collectAnswers() {
    const answers = {};
    payload.questions.forEach((question) => {
      const checked = form.querySelector(`input[name="q-${question.id}"]:checked`);
      if (checked) answers[question.id] = Number(checked.value);
    });
    return answers;
  }

  function renderResult(result) {
    resultNode.replaceChildren();
    resultNode.classList.remove("hidden");

    const top = document.createElement("div");
    top.className = "practice-result-top";
    const score = document.createElement("div");
    score.className = "practice-score";
    score.textContent = `${result.score}/${result.total}`;
    const copy = document.createElement("div");
    const title = document.createElement("h2");
    title.textContent = result.percentage >= 80 ? "¡Excelente!" : result.percentage >= 60 ? "Buen trabajo" : "Seguimos avanzando";
    const text = document.createElement("p");
    text.textContent = `Você acertou ${result.percentage}% da atividade de nível ${result.level}. Ela já foi registrada como concluída e não aparecerá novamente.`;
    copy.append(title, text);
    top.append(score, copy);

    const review = document.createElement("div");
    review.className = "practice-review";
    const details = new Map((result.details || []).map((item) => [String(item.question_id), item]));
    payload.questions.forEach((question, index) => {
      const detail = details.get(String(question.id));
      const item = document.createElement("div");
      item.className = `practice-review-item ${detail?.correct ? "good" : "bad"}`;
      const strong = document.createElement("strong");
      strong.textContent = `${index + 1}. ${detail?.correct ? "Correto" : "Revisar"}`;
      const explanation = document.createElement("p");
      const correctText = question.options?.[detail?.correct_index] || "";
      explanation.textContent = `${detail?.explanation || ""}${correctText ? ` Resposta correta: ${correctText}.` : ""}`;
      item.append(strong, explanation);
      review.appendChild(item);
    });

    const next = document.createElement("a");
    next.className = "practice-next-button";
    next.href = "./";
    next.textContent = "Receber próxima atividade →";
    next.addEventListener("click", (event) => {
      event.preventDefault();
      location.replace(location.pathname);
    });

    resultNode.append(top, review, next);
    form.querySelectorAll("input").forEach((input) => { input.disabled = true; });
    submit.disabled = true;
    submit.textContent = "Atividade concluída";
    resultNode.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!payload?.activity) return;
    const answers = collectAnswers();
    if (Object.keys(answers).length !== payload.questions.length) {
      setStatus("Responda todas as questões antes de concluir a atividade.", "error");
      return;
    }

    submit.disabled = true;
    submit.textContent = "Corrigindo…";
    setStatus("Registrando sua atividade e preparando a correção…", "info");

    try {
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.rpc("submit_practice_activity", {
        p_activity_id: payload.activity.id,
        p_answers: answers
      });
      if (error) throw error;
      renderResult(data);
      setStatus("Atividade concluída. Seu progresso foi salvo e esta atividade não será oferecida novamente.", "success");
      track("progressive_practice_complete", {
        activity_id: payload.activity.id,
        level: payload.activity.level,
        percentage: data.percentage
      });
    } catch (error) {
      console.error("Falha ao concluir atividade progressiva", error);
      const message = String(error?.message || "").toLowerCase();
      if (message.includes("already completed") || message.includes("not the next available")) {
        setStatus("Esta atividade já saiu do seu percurso. Atualize para receber a próxima atividade disponível.", "error");
      } else {
        setStatus(window.VAEAuth.friendlyError(error), "error");
      }
      submit.disabled = false;
      submit.textContent = "Concluir atividade →";
    }
  });

  async function boot() {
    try {
      const session = await window.VAEAuth.requireSession();
      if (!session) return;
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.rpc("get_next_practice_activity");
      if (error) throw error;
      payload = data;
      loading.classList.add("hidden");
      main.removeAttribute("aria-busy");

      if (payload?.done) {
        finished.classList.remove("hidden");
        track("progressive_practice_path_complete", { starting_level: payload?.progress?.starting_level || "" });
        return;
      }

      document.getElementById("practice-title").textContent = payload.activity.title;
      document.getElementById("practice-description").textContent = payload.activity.description;
      document.getElementById("practice-level").textContent = `Nível ${payload.activity.level}`;
      document.getElementById("practice-skill").textContent = payload.activity.skill;
      const progress = payload.progress || {};
      document.getElementById("practice-progress-label").textContent = `${Number(progress.completed || 0) + 1}ª atividade do percurso`;
      renderQuestions();
      content.classList.remove("hidden");
      track("progressive_practice_view", { activity_id: payload.activity.id, level: payload.activity.level });
    } catch (error) {
      console.error("Falha ao carregar atividade progressiva", error);
      loading.textContent = "Não foi possível carregar sua próxima atividade. Volte à Área do Estudiante e tente novamente.";
      main.removeAttribute("aria-busy");
    }
  }

  window.addEventListener("pageshow", (event) => {
    if (event.persisted) location.reload();
  });

  boot();
})();
