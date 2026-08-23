/* Hub de atividades exclusivas de escuta na Área do Estudiante. */
(function () {
  function rootPath() {
    return window.VAEAuth?.ROOT_PATH || (location.hostname.toLowerCase().endsWith(".github.io") ? "/vamos-a-estudiar-espanol-espacio-de-practica/" : "/");
  }

  function loadReadingClassicsAssets() {
    const root = rootPath();
    if (!document.getElementById("reading-classics-css")) {
      const link = document.createElement("link");
      link.id = "reading-classics-css";
      link.rel = "stylesheet";
      link.href = `${root}reading-classics.css?v=20260823-2`;
      document.head.appendChild(link);
    }
    if (!document.getElementById("reading-classics-script")) {
      const script = document.createElement("script");
      script.id = "reading-classics-script";
      script.src = `${root}reading-classics.js?v=20260823-2`;
      script.defer = true;
      document.head.appendChild(script);
    }
    if (!document.getElementById("reading-pagination-script")) {
      const pagination = document.createElement("script");
      pagination.id = "reading-pagination-script";
      pagination.src = `${root}reading-pagination.js?v=20260823-1`;
      pagination.defer = true;
      document.head.appendChild(pagination);
    }
    if (!document.getElementById("reading-guided-redirect-script")) {
      const guided = document.createElement("script");
      guided.id = "reading-guided-redirect-script";
      guided.src = `${root}reading-guided-redirect.js?v=20260823-2`;
      guided.defer = true;
      document.head.appendChild(guided);
    }
  }

  function loadGrammarAssets() {
    if (document.getElementById("student-grammar-summary-script")) return;
    const script = document.createElement("script");
    script.id = "student-grammar-summary-script";
    script.src = `${rootPath()}student-grammar-summary.js?v=20260823-1`;
    script.defer = true;
    document.head.appendChild(script);
  }

  loadReadingClassicsAssets();
  loadGrammarAssets();

  const grid = document.getElementById("listening-level-grid");
  const status = document.getElementById("listening-hub-status");
  if (!grid || !status) return;

  const LEVEL_ORDER = ["A1","A2","B1","B2","C1"];

  function placeVideoAcademyFirst() {
    const listening = document.querySelector(".listening-hub");
    const videoAcademy = document.getElementById("video-academy");
    const grammarHub = document.getElementById("grammar-hub");
    if (!listening || !videoAcademy) return false;

    if (grammarHub) {
      if (grammarHub.nextElementSibling !== listening) listening.insertAdjacentElement("beforebegin", grammarHub);
      if (videoAcademy.nextElementSibling !== grammarHub) grammarHub.insertAdjacentElement("beforebegin", videoAcademy);
    } else if (videoAcademy.nextElementSibling !== listening) {
      listening.insertAdjacentElement("beforebegin", videoAcademy);
    }
    return true;
  }

  function watchVideoAcademyOrder() {
    if (placeVideoAcademyFirst()) return;
    const studentContent = document.getElementById("student-content") || document.body;
    const observer = new MutationObserver(() => {
      if (placeVideoAcademyFirst()) observer.disconnect();
    });
    observer.observe(studentContent, { childList: true, subtree: true });
  }

  async function boot() {
    watchVideoAcademyOrder();
    try {
      const session = await window.VAEAuth?.getSession?.();
      if (!session) return;
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.rpc("list_listening_activities");
      if (error) throw error;
      const activities = Array.isArray(data) ? data : [];
      grid.replaceChildren();

      activities.sort((a,b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level));
      activities.forEach((item) => {
        const a = document.createElement("a");
        a.className = "listening-level-card";
        a.href = `escuta/?activity=${encodeURIComponent(item.id)}`;
        a.innerHTML = `<span class="listening-level-badge">${item.level}</span><strong>${item.title}</strong><small>${item.description}</small><span>Praticar escuta →</span>`;
        a.addEventListener("click", () => {
          try { if (typeof window.gtag === "function") window.gtag("event", "exclusive_listening_open", { level: item.level, activity_id: item.id }); } catch (_) {}
        });
        grid.appendChild(a);
      });
      status.textContent = activities.length ? `${activities.length} atividades exclusivas disponíveis, de A1 a C1.` : "Ainda não há atividades de escuta publicadas.";
    } catch (error) {
      console.error("Falha ao carregar hub de escuta", error);
      status.textContent = "Não foi possível carregar as atividades de escuta agora.";
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once:true });
  else boot();
})();
