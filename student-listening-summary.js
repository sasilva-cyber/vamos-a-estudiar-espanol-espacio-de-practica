/* Hub de atividades exclusivas de escuta na Área do Estudiante. */
(function () {
  function loadReadingClassicsAssets() {
    const rootPath = window.VAEAuth?.ROOT_PATH || (location.hostname.toLowerCase().endsWith(".github.io") ? "/vamos-a-estudiar-espanol-espacio-de-practica/" : "/");
    if (!document.getElementById("reading-classics-css")) {
      const link = document.createElement("link");
      link.id = "reading-classics-css";
      link.rel = "stylesheet";
      link.href = `${rootPath}reading-classics.css?v=20260823-1`;
      document.head.appendChild(link);
    }
    if (!document.getElementById("reading-classics-script")) {
      const script = document.createElement("script");
      script.id = "reading-classics-script";
      script.src = `${rootPath}reading-classics.js?v=20260823-1`;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  loadReadingClassicsAssets();

  const grid = document.getElementById("listening-level-grid");
  const status = document.getElementById("listening-hub-status");
  if (!grid || !status) return;

  const LEVEL_ORDER = ["A1","A2","B1","B2","C1"];

  function placeVideoAcademyFirst() {
    const listening = document.querySelector(".listening-hub");
    const videoAcademy = document.getElementById("video-academy");
    if (!listening || !videoAcademy) return false;
    if (videoAcademy.nextElementSibling !== listening) {
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