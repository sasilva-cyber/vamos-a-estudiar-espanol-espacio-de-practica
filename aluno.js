/* Proteção, dados e biblioteca privada da Área do Estudiante. */
(function () {
  function loadVideoAcademyAssets() {
    const rootPath = window.VAEAuth?.ROOT_PATH || "/";
    if (!document.getElementById("video-academy-css")) {
      const link = document.createElement("link");
      link.id = "video-academy-css";
      link.rel = "stylesheet";
      link.href = `${rootPath}video-academy.css?v=20260823-2`;
      document.head.appendChild(link);
    }
    if (!document.getElementById("video-academy-script")) {
      const script = document.createElement("script");
      script.id = "video-academy-script";
      script.src = `${rootPath}video-academy.js?v=20260823-1`;
      script.defer = true;
      document.head.appendChild(script);
    }
  }

  loadVideoAcademyAssets();

  const main = document.getElementById("student-main");
  const loading = document.getElementById("student-loading");
  const content = document.getElementById("student-content");
  const libraryGrid = document.getElementById("student-library-grid");
  const libraryStatus = document.getElementById("student-library-status");
  const libraryCount = document.getElementById("student-library-count");
  if (!main || !loading || !content) return;

  let exclusiveContents = [];
  let activeFilter = "all";

  const TYPE_META = {
    material: { icon: "📚", kicker: "Material", action: "Abrir material →" },
    video: { icon: "▶", kicker: "Videoaula", action: "Assistir aula →" },
    activity: { icon: "✦", kicker: "Atividade", action: "Abrir atividade →" }
  };

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params);
      else if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

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

  function setLibraryStatus(message, type = "info") {
    if (!libraryStatus) return;
    libraryStatus.textContent = message;
    libraryStatus.className = `student-library-status ${type}`;
  }

  function createMetaChip(text) {
    const span = document.createElement("span");
    span.className = "student-content-meta-chip";
    span.textContent = text;
    return span;
  }

  async function openExclusiveContent(item, button) {
    const originalLabel = button.textContent;
    const popup = window.open("about:blank", "_blank");
    if (popup) {
      try { popup.opener = null; } catch (_) {}
      popup.document.title = "Preparando conteúdo…";
      popup.document.body.innerHTML = '<p style="font-family:system-ui;padding:24px">Preparando acesso seguro…</p>';
    }

    button.disabled = true;
    button.textContent = "Preparando acesso…";
    setLibraryStatus("Gerando um acesso temporário e seguro ao conteúdo…", "info");

    try {
      const signedUrl = await window.VAEAuth.createSignedContentUrl(item.storage_path, 300);
      track("exclusive_content_open", {
        content_id: item.id,
        content_type: item.content_type,
        content_title: item.title
      });
      if (popup && !popup.closed) popup.location.replace(signedUrl);
      else window.location.assign(signedUrl);
      setLibraryStatus("Conteúdo aberto. O link temporário expira automaticamente.", "success");
    } catch (error) {
      if (popup && !popup.closed) popup.close();
      setLibraryStatus(window.VAEAuth.friendlyError(error), "error");
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  }

  function buildContentCard(item) {
    const meta = TYPE_META[item.content_type] || TYPE_META.material;
    const article = document.createElement("article");
    article.className = "student-card student-content-card";
    article.dataset.contentType = item.content_type;

    const icon = document.createElement("span");
    icon.className = "student-card-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = meta.icon;

    const kicker = document.createElement("p");
    kicker.className = "student-card-kicker";
    kicker.textContent = meta.kicker;

    const title = document.createElement("h3");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description || "Conteúdo exclusivo para estudantes cadastrados.";

    const metaRow = document.createElement("div");
    metaRow.className = "student-content-meta";
    if (item.level) metaRow.appendChild(createMetaChip(item.level));
    if (item.category) metaRow.appendChild(createMetaChip(item.category));
    if (item.file_name) metaRow.appendChild(createMetaChip(item.file_name));

    const button = document.createElement("button");
    button.className = "student-card-action student-content-open";
    button.type = "button";
    button.textContent = meta.action;
    button.addEventListener("click", () => openExclusiveContent(item, button));

    article.append(icon, kicker, title, description);
    if (metaRow.childElementCount) article.appendChild(metaRow);
    article.appendChild(button);
    return article;
  }

  function filteredContents() {
    if (activeFilter === "all") return exclusiveContents;
    return exclusiveContents.filter((item) => item.content_type === activeFilter);
  }

  function renderLibrary() {
    if (!libraryGrid) return;
    const items = filteredContents();
    libraryGrid.replaceChildren();

    document.querySelectorAll("[data-content-filter]").forEach((button) => {
      const active = button.dataset.contentFilter === activeFilter;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (libraryCount) {
      const total = exclusiveContents.length;
      libraryCount.textContent = total === 1 ? "1 conteúdo disponível" : `${total} conteúdos disponíveis`;
    }

    if (!exclusiveContents.length) {
      setLibraryStatus("Ainda não há materiais publicados. Quando um PDF, vídeo ou atividade for liberado, ele aparecerá aqui automaticamente.", "empty");
      return;
    }

    if (!items.length) {
      setLibraryStatus("Ainda não há conteúdos publicados nesta categoria.", "empty");
      return;
    }

    items.forEach((item) => libraryGrid.appendChild(buildContentCard(item)));
    const label = items.length === 1 ? "1 conteúdo encontrado." : `${items.length} conteúdos encontrados.`;
    setLibraryStatus(`${label} Os arquivos são liberados por links temporários de 5 minutos.`, "success");
  }

  function installLibraryFilters() {
    document.querySelectorAll("[data-content-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.contentFilter || "all";
        track("exclusive_content_filter", { filter: activeFilter });
        renderLibrary();
      });
    });
  }

  async function loadLibrary() {
    if (!libraryGrid) return;
    setLibraryStatus("Carregando conteúdos exclusivos…", "info");
    try {
      exclusiveContents = await window.VAEAuth.listExclusiveContent();
      renderLibrary();
    } catch (error) {
      console.error("Falha ao carregar biblioteca exclusiva", error);
      setLibraryStatus("Não foi possível carregar a biblioteca agora. Atualize a página e tente novamente.", "error");
    }
  }

  async function boot() {
    if (!window.VAEAuth?.isConfigured?.()) {
      loading.textContent = "A Área do Estudiante ainda não está disponível.";
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

      track("student_area_view", { access_type: "authenticated" });
      installLibraryFilters();
      await loadLibrary();
      window.VAEVideoAcademy?.refresh?.();
    } catch (error) {
      console.error("Falha ao validar sessão da Área do Estudiante", error);
      location.replace(`${window.VAEAuth.ROOT_PATH}login/`);
    }
  }

  document.getElementById("student-logout")?.addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    button.textContent = "Saindo…";
    try { await window.VAEAuth.signOut(); } catch (_) {}
    location.replace(`${window.VAEAuth.ROOT_PATH}login/`);
  });

  boot();
})();
