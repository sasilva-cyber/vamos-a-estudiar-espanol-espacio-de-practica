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
    if (file.size > MAX_FILE_SIZE) return "O arquivo ultrapassa o limite de 50 MB.";
    const ext = fileExtension(file.name);
    if (!ALLOWED_MIME.has(file.type) && !ALLOWED_EXT.has(ext)) {
      return "Formato não permitido. Use PDF, MP4, MP3/M4A, JPG, PNG ou WebP.";
    }
    return "";
  }

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
      .select("id,title,description,content_type,storage_path,file_name,level,category,published,sort_order,published_at,created_at")
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
      const url = await window.VAEAuth.createSignedContentUrl(item.storage_path, 300);
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
    if (item.level) meta.appendChild(chip(item.level));
    if (item.category) meta.appendChild(chip(item.category));
    if (item.file_name) meta.appendChild(chip(item.file_name));

    const actions = document.createElement("div");
    actions.className = "admin-actions";

    const preview = document.createElement("button");
    preview.className = "admin-action";
    preview.type = "button";
    preview.textContent = "Visualizar";
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
        empty.textContent = "Nenhum conteúdo cadastrado ainda. Use o formulário ao lado para publicar o primeiro material.";
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

    if (title.length < 3) {
      setStatus("Informe um título com pelo menos 3 caracteres.", "error");
      return;
    }
    const fileError = validateFile(file);
    if (fileError) {
      setStatus(fileError, "error");
      return;
    }

    submit.disabled = true;
    submit.textContent = "Enviando…";
    setStatus("Enviando o arquivo para o armazenamento privado…", "info");

    const supabase = window.VAEAuth.getClient();
    const storagePath = `${contentType}/${Date.now()}-${randomId()}-${safeFileName(file.name)}`;

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
          published_at: published ? new Date().toISOString() : null
        })
        .select("id")
        .single();

      if (insertError) {
        await supabase.storage.from(window.VAEAuth.PRIVATE_BUCKET).remove([storagePath]);
        throw insertError;
      }

      track("admin_content_upload", { content_id: inserted?.id || "", content_type: contentType, published });
      form.reset();
      document.getElementById("admin-published").checked = false;
      setStatus(published ? "Conteúdo enviado e publicado." : "Conteúdo enviado e salvo como rascunho.", "success");
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
