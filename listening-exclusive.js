/* Atividades exclusivas de compreensão auditiva. */
(function () {
  const loading = document.getElementById("listen-loading");
  const content = document.getElementById("listen-content");
  const form = document.getElementById("listen-form");
  const questionsNode = document.getElementById("listen-questions");
  const playButton = document.getElementById("listen-play");
  const status = document.getElementById("listen-status");
  const resultNode = document.getElementById("listen-result");
  const progressBar = document.getElementById("listen-progress-bar");
  const submitButton = document.getElementById("listen-submit");
  if (!loading || !content || !form || !questionsNode || !playButton || !status || !resultNode || !submitButton) return;

  let activity = null;
  let plays = 0;
  let speaking = false;
  let progressTimer = null;
  const MAX_PLAYS = 3;

  function setStatus(message, type="info") {
    status.textContent = message;
    status.className = `listen-status ${type}`;
  }

  function track(eventName, params={}) {
    try {
      if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

  function getSpanishVoice() {
    const voices = window.speechSynthesis?.getVoices?.() || [];
    return voices.find(v => /^es(-|_)/i.test(v.lang) && /Spain|España|Castellano|Spanish/i.test(v.name))
      || voices.find(v => /^es(-|_)/i.test(v.lang))
      || null;
  }

  function estimateDuration(text, rate) {
    const words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
    const wpm = 145 * Number(rate || 1);
    return Math.max(8, Math.round((words / wpm) * 60));
  }

  function stopProgress() {
    if (progressTimer) clearInterval(progressTimer);
    progressTimer = null;
    progressBar.style.width = "0%";
  }

  function renderQuestions() {
    questionsNode.replaceChildren();
    activity.questions.forEach((q, idx) => {
      const section = document.createElement("section");
      section.className = "listen-question";
      const h = document.createElement("h3");
      h.textContent = `${idx + 1}. ${q.prompt}`;
      const options = document.createElement("div");
      options.className = "listen-options";
      q.options.forEach((option, optionIndex) => {
        const label = document.createElement("label");
        label.className = "listen-option";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = `q-${q.id}`;
        input.value = String(optionIndex);
        const span = document.createElement("span");
        span.textContent = option;
        label.append(input, span);
        options.appendChild(label);
      });
      section.append(h, options);
      questionsNode.appendChild(section);
    });
  }

  function playAudio() {
    if (!activity || speaking || plays >= MAX_PLAYS) return;
    if (!window.speechSynthesis || !window.SpeechSynthesisUtterance) {
      setStatus("Este navegador não oferece reprodução de voz. Tente Chrome, Edge ou Safari atualizado.", "error");
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activity.transcript);
    utterance.lang = "es-ES";
    utterance.rate = Number(activity.speaking_rate || 1);
    utterance.pitch = 1;
    utterance.volume = 1;
    const voice = getSpanishVoice();
    if (voice) utterance.voice = voice;

    plays += 1;
    speaking = true;
    playButton.disabled = true;
    playButton.textContent = "■";
    const estimated = estimateDuration(activity.transcript, utterance.rate);
    const started = Date.now();
    setStatus(`Reprodução ${plays} de ${MAX_PLAYS}. Escute sem ler a transcrição.`, "info");
    progressTimer = setInterval(() => {
      const pct = Math.min(96, ((Date.now() - started) / (estimated * 1000)) * 100);
      progressBar.style.width = `${pct}%`;
    }, 250);

    const finish = () => {
      speaking = false;
      stopProgress();
      progressBar.style.width = "100%";
      setTimeout(() => { progressBar.style.width = "0%"; }, 500);
      playButton.textContent = plays >= MAX_PLAYS ? "✓" : "▶";
      playButton.disabled = plays >= MAX_PLAYS;
      setStatus(plays >= MAX_PLAYS ? "Você utilizou as 3 reproduções. Agora finalize suas respostas." : `Áudio concluído. Restam ${MAX_PLAYS - plays} reproduções.`, "success");
      track("exclusive_listening_play", { level: activity.level, activity_id: activity.id, play_number: plays });
    };

    utterance.onend = finish;
    utterance.onerror = () => {
      speaking = false;
      stopProgress();
      playButton.textContent = "▶";
      playButton.disabled = false;
      setStatus("Não foi possível reproduzir o áudio neste dispositivo. Tente novamente.", "error");
    };
    window.speechSynthesis.speak(utterance);
  }

  function collectAnswers() {
    const answers = {};
    for (const q of activity.questions) {
      const checked = form.querySelector(`input[name="q-${q.id}"]:checked`);
      if (checked) answers[q.id] = Number(checked.value);
    }
    return answers;
  }

  function renderResult(result) {
    resultNode.replaceChildren();
    resultNode.classList.remove("hidden");
    const top = document.createElement("div");
    top.className = "listen-result-score";
    const ring = document.createElement("div");
    ring.className = "listen-score-ring";
    ring.textContent = `${result.score}/${result.total}`;
    const copy = document.createElement("div");
    const h2 = document.createElement("h2");
    h2.textContent = result.percentage >= 80 ? "¡Muy bien!" : result.percentage >= 60 ? "Buen trabajo" : "Sigue practicando";
    const p = document.createElement("p");
    p.textContent = `Você acertou ${result.percentage}% desta atividade de nível ${activity.level}.`;
    copy.append(h2, p);
    top.append(ring, copy);

    const review = document.createElement("div");
    review.className = "listen-answer-review";
    const detailsById = new Map((result.details || []).map(d => [String(d.question_id), d]));
    activity.questions.forEach((q, idx) => {
      const detail = detailsById.get(String(q.id));
      const item = document.createElement("div");
      item.className = `listen-review-item ${detail?.correct ? "good" : "bad"}`;
      const strong = document.createElement("strong");
      strong.textContent = `${idx + 1}. ${detail?.correct ? "Correto" : "Revisar"}`;
      const explanation = document.createElement("p");
      const correctText = q.options?.[detail?.correct_index] || "";
      explanation.textContent = `${detail?.explanation || ""}${correctText ? ` Resposta: ${correctText}.` : ""}`;
      item.append(strong, explanation);
      review.appendChild(item);
    });

    resultNode.append(top, review);
    form.querySelectorAll("input").forEach(i => i.disabled = true);
    submitButton.disabled = true;
    submitButton.textContent = "Atividade concluída";
    resultNode.scrollIntoView({ behavior:"smooth", block:"start" });
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!activity) return;
    const answers = collectAnswers();
    if (Object.keys(answers).length !== activity.questions.length) {
      setStatus("Responda todas as questões antes de corrigir a atividade.", "error");
      return;
    }
    submitButton.disabled = true;
    submitButton.textContent = "Corrigindo…";
    try {
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.rpc("submit_listening_activity", { p_activity_id: activity.id, p_answers: answers });
      if (error) throw error;
      renderResult(data);
      setStatus("Atividade corrigida. Veja o gabarito comentado abaixo.", "success");
      track("exclusive_listening_complete", { level: activity.level, activity_id: activity.id, percentage: data.percentage });
    } catch (error) {
      console.error(error);
      setStatus(window.VAEAuth.friendlyError(error), "error");
      submitButton.disabled = false;
      submitButton.textContent = "Corrigir atividade →";
    }
  });

  playButton.addEventListener("click", playAudio);

  async function boot() {
    try {
      const session = await window.VAEAuth.requireSession();
      if (!session) return;
      const id = new URLSearchParams(location.search).get("activity");
      if (!id) throw new Error("ACTIVITY_NOT_FOUND");
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.rpc("get_listening_activity", { p_activity_id: id });
      if (error) throw error;
      activity = data;
      document.getElementById("listen-title").textContent = activity.title;
      document.getElementById("listen-description").textContent = activity.description;
      document.getElementById("listen-level").textContent = activity.level;
      document.getElementById("listen-player-title").textContent = `Áudio exclusivo · Nível ${activity.level}`;
      renderQuestions();
      loading.classList.add("hidden");
      content.classList.remove("hidden");
      document.getElementById("listen-main").removeAttribute("aria-busy");
      track("exclusive_listening_view", { level: activity.level, activity_id: activity.id });
      if (window.speechSynthesis) window.speechSynthesis.getVoices();
    } catch (error) {
      console.error("Falha ao carregar atividade de escuta", error);
      loading.textContent = "Não foi possível carregar esta atividade. Volte para a Área do Estudiante e tente novamente.";
    }
  }

  window.addEventListener("beforeunload", () => { try { window.speechSynthesis?.cancel(); } catch (_) {} });
  boot();
})();