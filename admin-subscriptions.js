/* Painel administrativo de assinaturas Premium. */
(function () {
  const panel = document.getElementById("admin-subscriptions-panel");
  if (!panel) return;

  const refreshButton = document.getElementById("admin-subscriptions-refresh");
  const statusNode = document.getElementById("admin-subscriptions-status");
  const tableBody = document.getElementById("admin-subscriptions-body");
  const emptyNode = document.getElementById("admin-subscriptions-empty");
  const searchInput = document.getElementById("admin-subscriptions-search");
  const filterSelect = document.getElementById("admin-subscriptions-filter");
  const resultCount = document.getElementById("admin-subscriptions-result-count");

  const metricStudents = document.getElementById("admin-metric-students");
  const metricPremium = document.getElementById("admin-metric-premium");
  const metricRenewing = document.getElementById("admin-metric-renewing");
  const metricPending = document.getElementById("admin-metric-pending");
  const metricCancelled = document.getElementById("admin-metric-cancelled");
  const metricMrr = document.getElementById("admin-metric-mrr");

  let subscribers = [];
  let lastMetrics = null;

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params);
      else if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

  function setStatus(message, type = "info") {
    if (!statusNode) return;
    statusNode.textContent = message;
    statusNode.className = `admin-subscriptions-status ${type}`;
  }

  function formatMoney(cents, currency = "BRL") {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: currency || "BRL" }).format(Number(cents || 0) / 100);
  }

  function formatDate(value, includeTime = false) {
    const date = new Date(value || "");
    if (Number.isNaN(date.getTime())) return "—";
    const options = includeTime ? { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" } : { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("pt-BR", options).format(date);
  }

  function statusMeta(item) {
    const status = String(item.status || "inactive");
    if (item.premium_access && status === "cancelled") return { label: "Cancelada · acesso vigente", className: "cancelled-access" };
    if (["authorized", "active", "trialing"].includes(status)) return { label: item.renewing ? "Ativa" : "Ativa · sem renovação", className: "active" };
    if (status === "pending") return { label: "Pendente", className: "pending" };
    if (status === "cancelled") return { label: "Cancelada", className: "cancelled" };
    if (status === "paused") return { label: "Pausada", className: "paused" };
    return { label: "Inativa", className: "inactive" };
  }

  function subscriberMatches(item) {
    const filter = filterSelect?.value || "all";
    if (filter === "active" && !item.premium_access) return false;
    if (filter === "renewing" && !item.renewing) return false;
    if (filter === "pending" && item.status !== "pending") return false;
    if (filter === "cancelled" && item.status !== "cancelled") return false;
    if (filter === "paused" && item.status !== "paused") return false;
    const query = String(searchInput?.value || "").trim().toLowerCase();
    if (!query) return true;
    return [item.full_name, item.email, item.status].some((value) => String(value || "").toLowerCase().includes(query));
  }

  function createCell(text, className = "") {
    const td = document.createElement("td");
    if (className) td.className = className;
    td.textContent = text;
    return td;
  }

  function buildRow(item) {
    const tr = document.createElement("tr");
    const student = document.createElement("td"); student.className = "admin-subscriber-person";
    const name = document.createElement("strong"); name.textContent = item.full_name || "Estudante";
    const email = document.createElement("span"); email.textContent = item.email || "E-mail não disponível";
    student.append(name, email);
    const stateCell = document.createElement("td");
    const meta = statusMeta(item); const badge = document.createElement("span"); badge.className = `admin-subscription-badge ${meta.className}`; badge.textContent = meta.label; stateCell.appendChild(badge);
    const periodText = item.current_period_end ? (item.status === "cancelled" ? `Até ${formatDate(item.current_period_end)}` : formatDate(item.current_period_end)) : "—";
    tr.append(student, stateCell, createCell(formatMoney(item.amount_cents, item.currency), "admin-subscriber-money"), createCell(formatDate(item.started_at)), createCell(periodText), createCell(formatDate(item.updated_at, true), "admin-subscriber-updated"));
    return tr;
  }

  function renderTable() {
    if (!tableBody) return;
    const items = subscribers.filter(subscriberMatches);
    tableBody.replaceChildren();
    items.forEach((item) => tableBody.appendChild(buildRow(item)));
    if (resultCount) resultCount.textContent = items.length === 1 ? "1 registro" : `${items.length} registros`;
    if (emptyNode) {
      emptyNode.classList.toggle("hidden", items.length > 0);
      emptyNode.textContent = subscribers.length ? "Nenhuma assinatura corresponde aos filtros selecionados." : "Ainda não há assinaturas registradas na plataforma.";
    }
  }

  function renderMetrics(metrics) {
    lastMetrics = metrics || {};
    if (metricStudents) metricStudents.textContent = String(metrics?.student_accounts ?? 0);
    if (metricPremium) metricPremium.textContent = String(metrics?.premium_access ?? 0);
    if (metricRenewing) metricRenewing.textContent = String(metrics?.renewing ?? 0);
    if (metricPending) metricPending.textContent = String(metrics?.pending ?? 0);
    if (metricCancelled) metricCancelled.textContent = String(metrics?.cancelled ?? 0);
    if (metricMrr) metricMrr.textContent = formatMoney(metrics?.mrr_cents ?? 0, "BRL");
  }

  async function loadDashboard() {
    if (!window.VAEAuth?.getClient) return;
    if (refreshButton) { refreshButton.disabled = true; refreshButton.textContent = "Atualizando…"; }
    setStatus("Atualizando dados de assinaturas…", "info");
    try {
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.functions.invoke("admin-subscriptions", { body: {} });
      if (error) throw error;
      if (!data?.metrics || !Array.isArray(data?.subscribers)) throw new Error("DASHBOARD_DATA_INVALID");
      subscribers = data.subscribers; renderMetrics(data.metrics); renderTable();
      const generatedAt = formatDate(data.generated_at, true);
      setStatus(`Dados atualizados em ${generatedAt}.`, "success");
      track("admin_subscriptions_view", { premium_access: data.metrics.premium_access || 0, renewing: data.metrics.renewing || 0, pending: data.metrics.pending || 0 });
    } catch (error) {
      console.error("Falha ao carregar painel de assinaturas", error);
      setStatus("Não foi possível carregar as assinaturas agora. Confirme sua sessão administrativa e tente novamente.", "error");
      subscribers = []; renderMetrics(lastMetrics || {}); renderTable();
    } finally {
      if (refreshButton) { refreshButton.disabled = false; refreshButton.textContent = "Atualizar dados"; }
    }
  }

  refreshButton?.addEventListener("click", () => { track("admin_subscriptions_refresh"); loadDashboard(); });
  searchInput?.addEventListener("input", renderTable);
  filterSelect?.addEventListener("change", renderTable);

  async function boot() {
    try { const session = await window.VAEAuth?.getSession?.(); if (!session) return; await loadDashboard(); } catch (_) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true }); else boot();
})();

/* Painel complementar: newsletter e e-mails automáticos. */
(function () {
  if (document.getElementById("vae-admin-communications")) return;
  const script = document.createElement("script");
  script.id = "vae-admin-communications";
  const isGithub = window.location.hostname.toLowerCase().endsWith(".github.io");
  const root = isGithub ? "/vamos-a-estudiar-espanol-espacio-de-practica/" : "/";
  script.src = `${root}admin-communications.js?v=20260823-1502`;
  script.defer = true;
  document.head.appendChild(script);
})();
