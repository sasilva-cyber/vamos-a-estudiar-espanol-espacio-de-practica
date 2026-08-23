/* Exibe o atalho de administração apenas para perfis admin. */
(function () {
  async function revealAdminLink() {
    const link = document.getElementById("student-admin-link");
    if (!link || !window.VAEAuth?.isConfigured?.()) return;

    try {
      const user = await window.VAEAuth.getUser();
      if (!user) return;
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      if (error) throw error;
      if (data?.role === "admin") link.classList.remove("hidden");
    } catch (error) {
      console.warn("Não foi possível verificar o atalho administrativo.", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", revealAdminLink, { once: true });
  } else {
    revealAdminLink();
  }
})();
