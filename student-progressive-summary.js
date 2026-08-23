/* Resumo da próxima atividade progressiva na Área do Estudiante. */
(function () {
  const section = document.getElementById("practice-path");
  const level = document.getElementById("practice-path-level");
  const title = document.getElementById("practice-path-title-next");
  const meta = document.getElementById("practice-path-meta");
  const action = document.getElementById("practice-path-action");
  const progressText = document.getElementById("practice-path-progress-text");
  const progressBar = document.getElementById("practice-path-progress-bar");
  if (!section || !level || !title || !meta || !action || !progressText || !progressBar) return;

  function installDashboardLayout() {
    const placement = document.getElementById("placement-summary");
    if (!placement) return;

    const rootPath = window.VAEAuth?.ROOT_PATH || (location.hostname.toLowerCase().endsWith(".github.io")
      ? "/vamos-a-estudiar-espanol-espacio-de-practica/"
      : "/");

    if (!document.getElementById("student-dashboard-layout-css")) {
      const link = document.createElement("link");
      link.id = "student-dashboard-layout-css";
      link.rel = "stylesheet";
      link.href = `${rootPath}student-dashboard-layout.css?v=20260823-1`;
      document.head.appendChild(link);
    }

    if (placement.parentElement?.classList.contains("student-dashboard-pair")) return;

    const pair = document.createElement("div");
    pair.className = "student-dashboard-pair";
    pair.setAttribute("aria-label", "Diagnóstico e prática de aprendizagem");
    placement.insertAdjacentElement("beforebegin", pair);
    pair.append(placement, section);
  }

  installDashboardLayout();

  async function boot() {
    try {
      const session = await window.VAEAuth?.getSession?.();
      if (!session) return;
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.rpc("get_practice_overview");
      if (error) throw error;

      const completed = Number(data?.completed || 0);
      const total = Math.max(0, Number(data?.total_path || 0));
      const pct = total ? Math.min(100, Math.round((completed / total) * 100)) : 0;
      progressText.textContent = total ? `${completed} de ${total} atividades concluídas` : `${completed} atividades concluídas`;
      progressBar.style.width = `${pct}%`;

      if (data?.done || !data?.next_activity) {
        section.classList.add("done");
        level.textContent = "✓";
        title.textContent = "Percurso disponível concluído";
        meta.textContent = "Você não tem nenhuma atividade inédita pendente neste momento.";
        action.textContent = "Ver percurso →";
        action.href = "atividades/";
        return;
      }

      const next = data.next_activity;
      level.textContent = next.level;
      title.textContent = next.title;
      meta.textContent = `${next.skill} · próxima atividade inédita do seu percurso`;
      action.textContent = completed ? "Continuar prática →" : "Começar prática →";
      action.href = "atividades/";
      action.addEventListener("click", () => {
        try {
          if (typeof window.gtag === "function") window.gtag("event", "progressive_practice_open", { level: next.level, activity_id: next.id });
        } catch (_) {}
      });
    } catch (error) {
      console.error("Falha ao carregar percurso progressivo", error);
      level.textContent = "!";
      title.textContent = "Atividades exclusivas";
      meta.textContent = "Não foi possível consultar sua próxima atividade agora.";
      progressText.textContent = "Tente novamente em alguns instantes.";
      action.textContent = "Abrir atividades →";
      action.href = "atividades/";
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
