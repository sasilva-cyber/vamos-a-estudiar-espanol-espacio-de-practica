/* Proteção e dados da Área do Estudiante. */
(function () {
  const main = document.getElementById("student-main");
  const loading = document.getElementById("student-loading");
  const content = document.getElementById("student-content");
  if (!main || !loading || !content) return;

  function initials(name, email) {
    const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return String(email || "Ñ").slice(0, 1).toUpperCase();
  }

  function firstName(name) {
    return String(name || "").trim().split(/\s+/).filter(Boolean)[0] || "estudiante";
  }

  function memberSince(dateValue) {
    const date = new Date(dateValue || "");
    if (Number.isNaN(date.getTime())) return "Membro da comunidade";
    return `Membro desde ${new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric" }).format(date)}`;
  }

  async function boot() {
    if (!window.VAEAuth?.isConfigured?.()) {
      loading.textContent = "A Área do Estudiante ainda está sendo configurada.";
      main.removeAttribute("aria-busy");
      return;
    }

    try {
      const session = await window.VAEAuth.requireSession();
      if (!session) return;
      const user = session.user || await window.VAEAuth.getUser();
      if (!user) {
        location.replace(`${window.VAEAuth.ROOT_PATH}login/`);
        return;
      }

      const name = user.user_metadata?.full_name || "";
      const email = user.email || "";
      document.getElementById("student-name").textContent = firstName(name);
      document.getElementById("student-email").textContent = email;
      document.getElementById("student-avatar").textContent = initials(name, email);
      document.getElementById("student-member-since").textContent = memberSince(user.created_at);

      loading.classList.add("hidden");
      content.classList.remove("hidden");
      main.removeAttribute("aria-busy");

      try {
        if (typeof window.gtag === "function") window.gtag("event", "student_area_view", { access_type: "authenticated" });
      } catch (_) {}
    } catch (error) {
      console.error("Falha ao validar sessão da Área do Estudiante", error);
      location.replace(`${window.VAEAuth.ROOT_PATH}login/`);
    }
  }

  document.getElementById("student-logout")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "Saindo…";
    try {
      await window.VAEAuth.signOut();
    } catch (_) {}
    location.replace(`${window.VAEAuth.ROOT_PATH}login/`);
  });

  boot();
})();
