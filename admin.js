/* Painel administrativo da biblioteca exclusiva. */
(function () {
  const loading = document.getElementById("admin-loading");
  const content = document.getElementById("admin-content");
  const denied = document.getElementById("admin-denied");
  const form = document.getElementById("admin-upload-form");
  const status = document.getElementById("admin-status");
  const list = document.getElementById("admin-content-list");
  const count = document.getElementById("admin-content-count");
  const submit = document.getElementById("admin-submit");
  if (!loading || !content || !denied || !form || !status || !list || !submit) return;

  const MAX_FILE_SIZE = 50 * 1024 * 1024;
  const ALLOWED_MIME = new Set([
    "application/pdf",
    "video/mp4",
    "audio/mpeg",
    "audio/mp4",
    "image/jpeg",
    "image/png",
    "image/webp"
  ]);
  const ALLOWED_EXT = new Set(["pdf", "mp4", "mp3", "m4a", "jpg", "jpeg", "png", "webp"]);
  const TYPE_LABEL = { material: "Material", video: "Videoaula", activity: "Atividade" };
  const DEFAULT_SERIES = "Español desde Cero";
  const DEFAULT_MODULE = "Módulo 1 · Primeiros passos";

  let adminUser = null;

  function setStatus(message, type = "info") {
    status.textContent = message;
    status.className = `admin-status ${type}`;
  }

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params);
      else if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

  function safeFileName(name) {
    const normalized = String(name || "arquivo")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
    return normalized || "arquivo";
  }

  function slugify(value) {
    return String(value || "serie")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "serie";
  }

  function randomId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID();
    return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function fileExtension(name) {
    const parts = String(name || "").toLowerCase().split(".");
    return parts.length > 1 ? parts.pop() : "";
  }

  function validateFile(file) {
    if (!file) return "Selecione um arquivo para enviar.";
    if (file.size > MAX_FILE_SIZE) return "O arquivo ultrapassa o limite atual de 50 MB do projeto Supabase.";
    const ext = fileExtension(file.name);
    if (!ALLOWED_MIME.has(file.type) && !ALLOWED_EXT.has(ext)) {
      return "Formato não permitido. Use PDF, MP4, MP3/M4A, JPG, PNG ou WebP.";
    }
    return "";
  }

  function installVideoFields() {
    if (document.getElementById("admin-video-fields")) return;
    const category = document.getElementById("admin-category")?.closest(".admin-field");
    const typeSelect = document.getElementById("admin-type");
    const fileInput = document.getElementById("admin-file");
    if (!category || !typeSelect || !fileInput) return;

    const wrapper = document.createElement("div");
    wrapper.className = "admin-video-fields";
    wrapper.id = "admin-video-fields";
    wrapper.innerHTML = `
      <div class="admin-video-head">
        <div><h3>Organização da videoaula</h3><p>As aulas são agrupadas automaticamente em séries e módulos na Área do Estudiante.</p></div>
        <span class="admin-video-badge">Série Premium</span>
      </div>
      <div class="admin-field">
        <label for="admin-series-title">Série</label>
        <input class="admin-input" id="admin-series-title" type="text" value="Español desde Cero" placeholder="Ex.: Español desde Cero" />
      </div>
      <div class="admin-field">
        <label for="admin-module-title">Módulo</label>
        <input class="admin-input" id="admin-module-title" type="text" value="Módulo 1 · Primeiros passos" placeholder="Ex.: Módulo 1 · Primeiros passos" />
      </div>
      <div class="admin-row">
        <div class="admin-field">
          <label for="admin-episode-number">Número da aula</label>
          <input class="admin-input" id="admin-episode-number" type="number" min="1" step="1" value="1" />
        </div>
        <div class="admin-field">
          <label for="admin-duration-minutes">Duração aproximada</label>
          <input class="admin-input" id="admin-duration-minutes" type="number" min="1" step="1" placeholder="Minutos" />
        </div>
      </div>
      <div class="admin-video-limit"><strong>Upload na própria plataforma:</strong> envie o arquivo em MP4. O projeto está no plano Free do Supabase e o limite atual é 50 MB por vídeo. Prefira exportação otimizada para web.</div>`;
    category.insertAdjacentElement("afterend", wrapper);

    const originalAccept = fileInput.getAttribute("accept") || "";
    const note = fileInput.closest(".admin-field")?.nextElementSibling;

    function syncVideoFields() {
      const isVideo = typeSelect.value === "video";
      wrapper.classList.toggle("show", isVideo);
      fileInput.setAttribute("accept", isVideo ? ".mp4,video/mp4" : originalAccept);
      if (note?.classList.contains("admin-note")) {
        note.textContent = isVideo
          ? "Videoaulas: MP4 de até 50 MB. O vídeo ficará no Storage privado e será reproduzido por link temporário para assinantes Premium."
          : "Limite atual: 50 MB por arquivo. Formatos aceitos: PDF, MP4, MP3/M4A, JPG, PNG e WebP.";
      }
    }
    typeSelect.addEventListener("change", syncVideoFields);
    syncVideoFields();
  }

  installVideoFields();

  async function requireAdmin() {
    const session = await window.VAEAuth.requireSession();
    if (!session) return null;
    const user = session.user || await window.VAEAuth.getUser();
    if (!user) return null;

    const supabase = window.VAEAuth.getClient();
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role,full_name")
      .eq("id", user.id)
      .single();
    if (error) throw error;
    if (profile?.role !== "admin") return null;
    adminUser = user;
    document.getElementById("admin-user-email").textContent = user.email || "Administrador";
    return { user, profile };
  }

  async function fetchContents() {
    const supabase = window.VAEAuth.getClient();
    const { data, error } = await supabase
      .from("exclusive_contents")
      .select("id,title,description,content_type,storage_path,file_name,level,category,published,sort_order,published_at,created_at,series_slug,series_title,module_title,episode_number,duration_seconds")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return Array.isArray(data) ? data : [];
  }

  function chip(text) {
    const span = document.createElement("span");
    span.className = "admin-chip";
    span.textContent = text;
    return span;
  }

  async function previewItem(item, button) {
    const popup = window.open("about:blank", "_blank");
    if (popup) {
      try { popup.opener = null; } catch (_) {}
      popup.document.body.innerHTML = '<p style="font-family:system-ui;padding:24px">Preparando visualização segura…</p>';
    }
    const old = button.textContent;
    button.disabled = true;
    button.textContent = "Abrindo…";
    try {
      const url = await window.VAEAuth.createSignedContentUrl(item.storage_path, item.content_type === "video" ? 7200 : 300);
      if (popup && !popup.closed) popup.location.replace(url);
      else location.assign(url);
    } catch (error) {
      if (popup && !popup.closed) popup.close();
      setStatus(window.VAEAuth.friendlyError(error), "error");
    } finally {
      button.disabled = false;
      button.textContent = old;
    }
  }

  async function togglePublication(item, button) {
    const supabase = window.VAEAuth.getClient();
    const next = !item.published;
    button.disabled = true;
    try {
      const { error } = await supabase
        .from("exclusive_contents")
        .update({ published: next, published_at: next ? new Date().toISOString() : null })
        .eq("id", item.id);
      if (error) throw error;
      track("admin_content_publish_toggle", { content_id: item.id, published: next });
      setStatus(next ? "Conteúdo publicado com sucesso." : "Conteúdo movido para rascunho.", "success");
      await renderContents();
    } catch (error) {
      setStatus(window.VAEAuth.friendlyError(error), "error");
      button.disabled = false;
    }
  }

  async function deleteItem(item, button) {
    if (!window.confirm(`Excluir definitivamente “${item.title}”?`)) return;
    const supabase = window.VAEAuth.getClient();
    button.disabled = true;
    try {
      const { error: rowError } = await supabase.from("exclusive_contents").delete().eq("id", item.id);
      if (rowError) throw rowError;
      const { error: storageError } = await supabase.storage.from(window.VAEAuth.PRIVATE_BUCKET).remove([item.storage_path]);
      if (storageError) {
        setStatus("O registro foi excluído, mas o arquivo precisa ser removido manualmente do Storage.", "error");
      } else {
        setStatus("Conteúdo e arquivo excluídos.", "success");
      }
      track("admin_content_delete", { content_id: item.id, content_type: item.content_type });
      await renderContents();
    } catch (error) {
      setStatus(window.VAEAuth.friendlyError(error), "error");
      button.disabled = false;
    }
  }

  function buildItem(item) {
    const article = document.createElement("article");
    article.className = "admin-item";

    const top = document.createElement("div");
    top.className = "admin-item-top";
    const titleWrap = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = item.title;
    const description = document.createElement("p");
    description.textContent = item.description || "Sem descrição.";
    titleWrap.append(title, description);

    const state = document.createElement("span");
    state.className = `admin-state ${item.published ? "published" : "draft"}`;
    state.textContent = item.published ? "Publicado" : "Rascunho";
    top.append(titleWrap, state);

    const meta = document.createElement("div");
    meta.className = "admin-item-meta";
    meta.appendChild(chip(TYPE_LABEL[item.content_type] || item.content_type));
    if (item.series_title) meta.appendChild(chip(item.series_title));
    if (item.module_title) meta.appendChild(chip(item.module_title));
    if (item.episode_number) meta.appendChild(chip(`Aula ${String(item.episode_number).padStart(2, "0")}`));
    if (item.duration_seconds) meta.appendChild(chip(`${Math.max(1, Math.round(item.duration_seconds / 60))} min`));
    if (item.level) meta.appendChild(chip(item.level));
    if (item.category) meta.appendChild(chip(item.category));
    if (item.file_name) meta.appendChild(chip(item.file_name));

    const actions = document.createElement("div");
    actions.className = "admin-actions";

    const preview = document.createElement("button");
    preview.className = "admin-action";
    preview.type = "button";
    preview.textContent = item.content_type === "video" ? "Assistir" : "Visualizar";
    preview.addEventListener("click", () => previewItem(item, preview));

    const publish = document.createElement("button");
    publish.className = "admin-action primary";
    publish.type = "button";
    publish.textContent = item.published ? "Despublicar" : "Publicar";
    publish.addEventListener("click", () => togglePublication(item, publish));

    const remove = document.createElement("button");
    remove.className = "admin-action danger";
    remove.type = "button";
    remove.textContent = "Excluir";
    remove.addEventListener("click", () => deleteItem(item, remove));

    actions.append(preview, publish, remove);
    article.append(top, meta, actions);
    return article;
  }

  async function renderContents() {
    list.replaceChildren();
    try {
      const items = await fetchContents();
      if (count) count.textContent = items.length === 1 ? "1 conteúdo" : `${items.length} conteúdos`;
      if (!items.length) {
        const empty = document.createElement("div");
        empty.className = "admin-empty";
        empty.textContent = "Nenhum conteúdo cadastrado ainda. Use o formulário ao lado para publicar o primeiro material ou videoaula.";
        list.appendChild(empty);
        return;
      }
      items.forEach((item) => list.appendChild(buildItem(item)));
    } catch (error) {
      const empty = document.createElement("div");
      empty.className = "admin-empty";
      empty.textContent = "Não foi possível carregar os conteúdos agora.";
      list.appendChild(empty);
      setStatus(window.VAEAuth.friendlyError(error), "error");
    }
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!adminUser) return;

    const title = document.getElementById("admin-title").value.trim();
    const description = document.getElementById("admin-description").value.trim();
    const contentType = document.getElementById("admin-type").value;
    const level = document.getElementById("admin-level").value.trim();
    const category = document.getElementById("admin-category").value.trim();
    const file = document.getElementById("admin-file").files[0];
    const published = document.getElementById("admin-published").checked;

    const seriesTitle = contentType === "video" ? (document.getElementById("admin-series-title")?.value.trim() || DEFAULT_SERIES) : null;
    const seriesSlug = contentType === "video" ? slugify(seriesTitle) : null;
    const moduleTitle = contentType === "video" ? (document.getElementById("admin-module-title")?.value.trim() || DEFAULT_MODULE) : null;
    const episodeNumber = contentType === "video" ? Number.parseInt(document.getElementById("admin-episode-number")?.value || "1", 10) : null;
    const durationMinutes = contentType === "video" ? Number.parseInt(document.getElementById("admin-duration-minutes")?.value || "0", 10) : 0;
    const durationSeconds = durationMinutes > 0 ? durationMinutes * 60 : null;

    if (title.length < 3) {
      setStatus("Informe um título com pelo menos 3 caracteres.", "error");
      return;
    }
    if (contentType === "video" && (!Number.isInteger(episodeNumber) || episodeNumber < 1)) {
      setStatus("Informe um número de aula válido para organizar a série.", "error");
      return;
    }
    const fileError = validateFile(file);
    if (fileError) {
      setStatus(fileError, "error");
      return;
    }
    if (contentType === "video" && fileExtension(file.name) !== "mp4") {
      setStatus("Para videoaulas, envie um arquivo MP4 otimizado para web.", "error");
      return;
    }

    submit.disabled = true;
    submit.textContent = contentType === "video" ? "Enviando videoaula…" : "Enviando…";
    setStatus(contentType === "video" ? "Enviando a videoaula para o armazenamento privado…" : "Enviando o arquivo para o armazenamento privado…", "info");

    const supabase = window.VAEAuth.getClient();
    const prefix = contentType === "video" ? `video/${seriesSlug}/aula-${String(episodeNumber).padStart(2, "0")}` : contentType;
    const storagePath = `${prefix}/${Date.now()}-${randomId()}-${safeFileName(file.name)}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from(window.VAEAuth.PRIVATE_BUCKET)
        .upload(storagePath, file, { cacheControl: "3600", upsert: false, contentType: file.type || undefined });
      if (uploadError) throw uploadError;

      const { data: inserted, error: insertError } = await supabase
        .from("exclusive_contents")
        .insert({
          title,
          description,
          content_type: contentType,
          storage_path: storagePath,
          file_name: file.name,
          level: level || null,
          category: category || null,
          published,
          published_at: published ? new Date().toISOString() : null,
          series_slug: seriesSlug,
          series_title: seriesTitle,
          module_title: moduleTitle,
          episode_number: episodeNumber,
          duration_seconds: durationSeconds,
          sort_order: contentType === "video" ? episodeNumber : 0
        })
        .select("id")
        .single();

      if (insertError) {
        await supabase.storage.from(window.VAEAuth.PRIVATE_BUCKET).remove([storagePath]);
        throw insertError;
      }

      track("admin_content_upload", {
        content_id: inserted?.id || "",
        content_type: contentType,
        published,
        series: seriesSlug || "",
        episode: episodeNumber || null
      });
      form.reset();
      document.getElementById("admin-published").checked = false;
      if (document.getElementById("admin-series-title")) document.getElementById("admin-series-title").value = DEFAULT_SERIES;
      if (document.getElementById("admin-module-title")) document.getElementById("admin-module-title").value = DEFAULT_MODULE;
      if (document.getElementById("admin-episode-number")) document.getElementById("admin-episode-number").value = "1";
      document.getElementById("admin-type").dispatchEvent(new Event("change"));
      setStatus(published
        ? (contentType === "video" ? "Videoaula enviada e publicada na série." : "Conteúdo enviado e publicado.")
        : (contentType === "video" ? "Videoaula enviada e salva como rascunho." : "Conteúdo enviado e salvo como rascunho."), "success");
      await renderContents();
    } catch (error) {
      setStatus(window.VAEAuth.friendlyError(error), "error");
    } finally {
      submit.disabled = false;
      submit.textContent = "Enviar conteúdo →";
    }
  });

  async function boot() {
    if (!window.VAEAuth?.isConfigured?.()) {
      loading.textContent = "A autenticação ainda não está disponível.";
      return;
    }

    try {
      const access = await requireAdmin();
      loading.classList.add("hidden");
      if (!access) {
        denied.classList.remove("hidden");
        return;
      }
      content.classList.remove("hidden");
      track("admin_content_area_view", { role: "admin" });
      await renderContents();
    } catch (error) {
      console.error("Falha ao validar acesso administrativo", error);
      loading.classList.add("hidden");
      denied.classList.remove("hidden");
    }
  }

  boot();
})();
