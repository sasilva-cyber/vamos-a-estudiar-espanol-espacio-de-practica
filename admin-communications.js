/* Painel de newsletter, campanhas e e-mails automáticos. */
(function () {
  function installStyles() {
    if (document.getElementById("admin-communications-styles")) return;
    const style = document.createElement("style");
    style.id = "admin-communications-styles";
    style.textContent = `
      .admin-comms-panel{margin-top:24px}
      .admin-comms-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;margin-bottom:18px}
      .admin-comms-head p{margin:7px 0 0;color:var(--muted);line-height:1.55}
      .admin-comms-refresh{min-height:40px;border:1px solid var(--line);border-radius:10px;background:#fff;color:var(--red-dark);padding:8px 12px;font-weight:850;cursor:pointer;white-space:nowrap}
      .admin-comms-metrics{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
      .admin-comms-metric{padding:16px;border:1px solid var(--line);border-radius:16px;background:#fff}
      .admin-comms-metric span{display:block;color:var(--muted);font-size:.74rem;font-weight:850;text-transform:uppercase;letter-spacing:.05em}
      .admin-comms-metric strong{display:block;margin-top:6px;color:var(--red-dark);font:700 1.8rem Georgia,serif}
      .admin-comms-metric small{display:block;margin-top:5px;color:var(--muted);font-size:.72rem;line-height:1.45}
      .admin-comms-automation{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:16px}
      .admin-comms-flow{padding:14px;border-radius:14px;background:#fffaf2;border:1px solid #eadcc9;color:#5c4f47;font-size:.78rem;line-height:1.5}
      .admin-comms-flow strong{display:block;color:#6e1521;margin-bottom:4px}
      .admin-comms-ready{display:inline-flex;margin-top:7px;border-radius:999px;padding:4px 8px;background:#eaf6ed;color:#2d6b45;font-size:.66rem;font-weight:900}
      .admin-comms-ready.pending{background:#fff2d6;color:#8a6317}
      .admin-comms-grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:18px;margin-top:18px}
      .admin-comms-box{padding:18px;border:1px solid var(--line);border-radius:16px;background:#fff}
      .admin-comms-box h3{margin:0;color:var(--red-dark);font:700 1.12rem Georgia,serif}
      .admin-comms-box p{margin:7px 0 14px;color:var(--muted);font-size:.78rem;line-height:1.5}
      .admin-comms-form{display:grid;gap:10px}
      .admin-comms-form label{display:grid;gap:5px;color:#3b302b;font-size:.75rem;font-weight:850}
      .admin-comms-form select,.admin-comms-form input{width:100%;min-height:43px;border:1px solid rgba(143,29,44,.20);border-radius:11px;background:#fff;padding:9px 11px;color:var(--ink)}
      .admin-comms-send{min-height:44px;border:0;border-radius:11px;background:var(--red);color:#fff;padding:10px 14px;font-weight:900;cursor:pointer}
      .admin-comms-send:disabled,.admin-comms-refresh:disabled{opacity:.6;cursor:wait}
      .admin-comms-status{margin:12px 0 0;padding:10px 12px;border-radius:11px;background:#fff7e8;border:1px solid #eedcb6;color:#6b5535;font-size:.76rem;line-height:1.5}
      .admin-comms-status.success{background:var(--success-bg);color:var(--success);border-color:rgba(45,117,84,.18)}
      .admin-comms-status.error{background:var(--error-bg);color:var(--error);border-color:rgba(164,60,60,.18)}
      .admin-comms-table-wrap{overflow:auto;border:1px solid var(--line);border-radius:13px}
      .admin-comms-table{width:100%;border-collapse:collapse;min-width:620px;background:#fff}
      .admin-comms-table th,.admin-comms-table td{padding:10px 11px;border-bottom:1px solid var(--line);text-align:left;font-size:.72rem;vertical-align:top}
      .admin-comms-table th{background:#fffaf2;color:#6e1521;font-size:.66rem;text-transform:uppercase;letter-spacing:.05em}
      .admin-comms-person strong,.admin-comms-person span{display:block}.admin-comms-person span{margin-top:3px;color:var(--muted)}
      .admin-comms-chip{display:inline-flex;border-radius:999px;padding:4px 7px;background:#f4f1ed;color:#655d57;font-size:.64rem;font-weight:850}
      .admin-comms-chip.active{background:#eaf6ed;color:#2d6b45}.admin-comms-chip.unsubscribed{background:#f5ecec;color:#8a3c45}
      .admin-comms-campaigns{margin-top:18px}.admin-comms-campaign-list{display:grid;gap:8px}.admin-comms-campaign{padding:11px 12px;border:1px solid var(--line);border-radius:12px;background:#fffaf5;font-size:.73rem;color:#5f534b}.admin-comms-campaign strong{display:block;color:#6e1521;margin-bottom:4px}
      @media(max-width:900px){.admin-comms-metrics,.admin-comms-automation{grid-template-columns:repeat(2,minmax(0,1fr))}.admin-comms-grid{grid-template-columns:1fr}}
      @media(max-width:620px){.admin-comms-head{flex-direction:column}.admin-comms-metrics,.admin-comms-automation{grid-template-columns:1fr}.admin-comms-refresh{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function installPanel() {
    if (document.getElementById("admin-communications-panel")) return document.getElementById("admin-communications-panel");
    const anchor = document.getElementById("admin-subscriptions-panel") || document.querySelector(".admin-hero");
    if (!anchor) return null;
    const section = document.createElement("section");
    section.className = "admin-panel admin-comms-panel";
    section.id = "admin-communications-panel";
    section.innerHTML = `
      <div class="admin-comms-head">
        <div><h2>Newsletter e e-mails</h2><p>Acompanhe inscrições, e-mails automáticos e avise os inscritos quando houver conteúdo novo.</p></div>
        <button class="admin-comms-refresh" id="admin-comms-refresh" type="button">Atualizar dados</button>
      </div>
      <div class="admin-comms-metrics">
        <article class="admin-comms-metric"><span>Inscritos ativos</span><strong id="admin-comms-active">—</strong><small>Recebem novidades da plataforma</small></article>
        <article class="admin-comms-metric"><span>Novos · 30 dias</span><strong id="admin-comms-new">—</strong><small>Novas inscrições no período</small></article>
        <article class="admin-comms-metric"><span>Descadastrados</span><strong id="admin-comms-unsub">—</strong><small>Optaram por não receber mais e-mails</small></article>
        <article class="admin-comms-metric"><span>E-mails enviados · 30d</span><strong id="admin-comms-sent">—</strong><small>Transacionais e newsletter registrados</small></article>
        <article class="admin-comms-metric"><span>Falhas · 30d</span><strong id="admin-comms-failed">—</strong><small>Envios que exigem atenção</small></article>
        <article class="admin-comms-metric"><span>Total histórico</span><strong id="admin-comms-total">—</strong><small>Todos os registros de newsletter</small></article>
      </div>
      <div class="admin-comms-automation" aria-label="E-mails automáticos">
        <div class="admin-comms-flow"><strong>Boas-vindas da newsletter</strong>Enviado após uma nova inscrição.<span class="admin-comms-ready" data-email-ready>Automático</span></div>
        <div class="admin-comms-flow"><strong>Boas-vindas Premium</strong>Enviado quando o Mercado Pago confirma a assinatura.<span class="admin-comms-ready" data-email-ready>Automático</span></div>
        <div class="admin-comms-flow"><strong>Cancelamento Premium</strong>Confirma o cancelamento e a data final de acesso.<span class="admin-comms-ready" data-email-ready>Automático</span></div>
      </div>
      <div class="admin-comms-grid">
        <div class="admin-comms-box">
          <h3>Avisar sobre novo conteúdo</h3>
          <p>Escolha um conteúdo já publicado. O sistema enviará um e-mail individual, com link de descadastro, para todos os inscritos ativos.</p>
          <form class="admin-comms-form" id="admin-comms-campaign-form">
            <label>Conteúdo publicado<select id="admin-comms-content" required><option value="">Carregando…</option></select></label>
            <label>Assunto do e-mail <input id="admin-comms-subject" type="text" maxlength="180" placeholder="Deixe em branco para usar o assunto automático"></label>
            <button class="admin-comms-send" id="admin-comms-send" type="submit">Enviar novidade aos inscritos →</button>
          </form>
          <p class="admin-comms-status" id="admin-comms-status" role="status" aria-live="polite">Carregando informações da newsletter…</p>
          <div class="admin-comms-campaigns"><h3>Envios recentes</h3><div class="admin-comms-campaign-list" id="admin-comms-campaign-list"></div></div>
        </div>
        <div class="admin-comms-box">
          <h3>Inscritos recentes</h3><p>Os dados abaixo são visíveis somente para a conta administrativa.</p>
          <div class="admin-comms-table-wrap"><table class="admin-comms-table"><thead><tr><th>Contato</th><th>Status</th><th>Origem</th><th>Inscrição</th><th>Boas-vindas</th></tr></thead><tbody id="admin-comms-subscribers"></tbody></table></div>
        </div>
      </div>`;
    anchor.insertAdjacentElement("afterend", section);
    return section;
  }

  function formatDate(value) {
    const date = new Date(value || "");
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(date);
  }
  function track(eventName, params = {}) { try { if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params); else if (typeof window.gtag === "function") window.gtag("event", eventName, params); } catch (_) {} }

  let dashboard = null;
  async function load() {
    const refresh = document.getElementById("admin-comms-refresh");
    const status = document.getElementById("admin-comms-status");
    if (!window.VAEAuth?.getClient || !status) return;
    if (refresh) { refresh.disabled = true; refresh.textContent = "Atualizando…"; }
    status.className = "admin-comms-status";
    status.textContent = "Atualizando newsletter e e-mails…";
    try {
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.functions.invoke("admin-communications", { body: {} });
      if (error) throw error;
      dashboard = data;
      const metrics = data?.metrics || {};
      document.getElementById("admin-comms-active").textContent = String(metrics.newsletter_active ?? 0);
      document.getElementById("admin-comms-new").textContent = String(metrics.newsletter_new_30d ?? 0);
      document.getElementById("admin-comms-unsub").textContent = String(metrics.newsletter_unsubscribed ?? 0);
      document.getElementById("admin-comms-sent").textContent = String(metrics.emails_sent_30d ?? 0);
      document.getElementById("admin-comms-failed").textContent = String(metrics.emails_failed_30d ?? 0);
      document.getElementById("admin-comms-total").textContent = String(metrics.newsletter_total ?? 0);

      document.querySelectorAll("[data-email-ready]").forEach((badge) => {
        badge.textContent = data?.email_configured ? "Automático · ativo" : "Aguardando configuração";
        badge.classList.toggle("pending", !data?.email_configured);
      });

      const select = document.getElementById("admin-comms-content");
      select.replaceChildren(new Option("Selecione um conteúdo…", ""));
      (data?.contents || []).forEach((item) => {
        const meta = [item.content_type, item.level, item.category].filter(Boolean).join(" · ");
        select.appendChild(new Option(`${item.title}${meta ? ` — ${meta}` : ""}`, item.id));
      });

      const tbody = document.getElementById("admin-comms-subscribers");
      tbody.replaceChildren();
      (data?.subscribers || []).forEach((item) => {
        const tr = document.createElement("tr");
        const person = document.createElement("td"); person.className = "admin-comms-person";
        const strong = document.createElement("strong"); strong.textContent = item.full_name || "Inscrito";
        const email = document.createElement("span"); email.textContent = item.email;
        person.append(strong, email);
        const state = document.createElement("td"); const chip = document.createElement("span"); chip.className = `admin-comms-chip ${item.status}`; chip.textContent = item.status === "active" ? "Ativo" : item.status === "unsubscribed" ? "Descadastrado" : "Bounce"; state.appendChild(chip);
        const source = document.createElement("td"); source.textContent = item.source || "—";
        const consent = document.createElement("td"); consent.textContent = formatDate(item.consent_at);
        const welcome = document.createElement("td"); welcome.textContent = item.welcome_sent_at ? formatDate(item.welcome_sent_at) : "—";
        tr.append(person, state, source, consent, welcome); tbody.appendChild(tr);
      });

      const campaigns = document.getElementById("admin-comms-campaign-list");
      campaigns.replaceChildren();
      const campaignRows = data?.campaigns || [];
      if (!campaignRows.length) { const empty = document.createElement("div"); empty.className = "admin-comms-campaign"; empty.textContent = "Nenhuma campanha enviada ainda."; campaigns.appendChild(empty); }
      campaignRows.forEach((item) => { const row = document.createElement("div"); row.className = "admin-comms-campaign"; const title = document.createElement("strong"); title.textContent = item.subject; const meta = document.createElement("span"); meta.textContent = `${item.sent_count || 0} enviados · ${item.failed_count || 0} falhas · ${formatDate(item.created_at)}`; row.append(title, meta); campaigns.appendChild(row); });

      if (data?.email_configured) { status.className = "admin-comms-status success"; status.textContent = `Newsletter pronta. ${metrics.newsletter_active || 0} inscrito(s) ativo(s).`; }
      else { status.className = "admin-comms-status"; status.textContent = "Cadastros já estão funcionando. Para enviar os e-mails personalizados, falta configurar o provedor de e-mail no Supabase."; }
      track("admin_communications_view", { newsletter_active: metrics.newsletter_active || 0 });
    } catch (error) {
      console.error("Falha ao carregar comunicações", error);
      status.className = "admin-comms-status error";
      status.textContent = "Não foi possível carregar a newsletter agora.";
    } finally {
      if (refresh) { refresh.disabled = false; refresh.textContent = "Atualizar dados"; }
    }
  }

  async function sendCampaign(event) {
    event.preventDefault();
    const select = document.getElementById("admin-comms-content");
    const subject = document.getElementById("admin-comms-subject");
    const button = document.getElementById("admin-comms-send");
    const status = document.getElementById("admin-comms-status");
    const contentId = String(select?.value || "");
    if (!contentId) { status.className = "admin-comms-status error"; status.textContent = "Selecione um conteúdo publicado."; return; }
    if (!dashboard?.email_configured) { status.className = "admin-comms-status error"; status.textContent = "O provedor de e-mail ainda não foi configurado no Supabase."; return; }
    const count = Number(dashboard?.metrics?.newsletter_active || 0);
    if (!window.confirm(`Enviar esta novidade para ${count} inscrito(s) ativo(s)?`)) return;
    button.disabled = true; button.textContent = "Enviando…"; status.className = "admin-comms-status"; status.textContent = "Preparando os e-mails personalizados…";
    try {
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.functions.invoke("newsletter-broadcast", { body: { content_id: contentId, subject: String(subject?.value || "").trim() || undefined } });
      if (error) throw error;
      status.className = data?.failed ? "admin-comms-status error" : "admin-comms-status success";
      status.textContent = `${data?.sent || 0} e-mail(s) enviado(s)${data?.failed ? ` · ${data.failed} falha(s)` : ""}.`;
      subject.value = "";
      track("admin_newsletter_broadcast", { sent: data?.sent || 0, failed: data?.failed || 0 });
      await load();
    } catch (error) {
      console.error("Falha ao enviar campanha", error);
      status.className = "admin-comms-status error"; status.textContent = "Não foi possível enviar esta novidade agora.";
    } finally { button.disabled = false; button.textContent = "Enviar novidade aos inscritos →"; }
  }

  function boot() {
    installStyles();
    const panel = installPanel();
    if (!panel) { window.setTimeout(boot, 200); return; }
    document.getElementById("admin-comms-refresh")?.addEventListener("click", load);
    document.getElementById("admin-comms-campaign-form")?.addEventListener("submit", sendCampaign);
    load();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true }); else boot();
})();
