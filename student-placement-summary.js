/* Resumo do último teste de nivelamento na Área do Estudiante. */
(function () {
  const card = document.getElementById("placement-summary");
  const badge = document.getElementById("placement-summary-level");
  const status = document.getElementById("placement-summary-status");
  const cta = document.getElementById("placement-summary-cta");
  if (!card || !badge || !status || !cta) return;

  const LEVEL_LABELS = {
    A1: "Iniciante",
    A2: "Básico",
    B1: "Intermediário",
    B2: "Intermediário avançado",
    C1: "Avançado",
    C2: "Proficiência elevada"
  };

  function formatDate(value) {
    const date = new Date(value || "");
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
  }

  async function load() {
    if (!window.VAEAuth?.isConfigured?.()) return;
    try {
      const session = await window.VAEAuth.getSession();
      if (!session) return;
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase
        .from("placement_attempts")
        .select("estimated_level,score,total,completed_at")
        .order("completed_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;

      if (!data) {
        badge.textContent = "?";
        status.textContent = "Você ainda não fez o teste. São 30 questões progressivas, do A1 ao C2.";
        cta.textContent = "Descobrir meu nível →";
        return;
      }

      const percentage = data.total ? Math.round((data.score / data.total) * 100) : 0;
      badge.textContent = data.estimated_level;
      status.textContent = `${LEVEL_LABELS[data.estimated_level] || "Nível estimado"} · ${data.score}/${data.total} acertos (${percentage}%) · realizado em ${formatDate(data.completed_at)}.`;
      cta.textContent = "Refazer nivelamento →";
      card.classList.add("has-result");
    } catch (error) {
      console.warn("Não foi possível carregar o último nivelamento", error);
      status.textContent = "Faça o teste para descobrir sua faixa estimada de espanhol.";
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load, { once: true });
  else load();
})();
