/* Assinatura Premium, checkout e cancelamento Mercado Pago. */
(function () {
  const PREMIUM_PRICE = 19.90;
  const PREMIUM_PRICE_LABEL = "R$ 19,90";

  function ensureManagementUi() {
    const offer = document.getElementById("premium-offer");
    if (!offer) return;

    if (!document.getElementById("premium-management-styles")) {
      const style = document.createElement("style");
      style.id = "premium-management-styles";
      style.textContent = `
        .premium-management.hidden{display:none!important}
        .premium-management-grid{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(260px,.6fr);gap:24px;align-items:stretch}
        .premium-management h2{margin:4px 0 10px;color:#6e1521;font-size:clamp(1.45rem,2.7vw,2rem)}
        .premium-management-copy{margin:0;color:#514842;line-height:1.65}
        .premium-management-card{border:1px solid rgba(143,29,44,.16);border-radius:18px;padding:22px;background:#fffaf3;display:flex;flex-direction:column;gap:12px}
        .premium-management-state{display:inline-flex;width:max-content;border-radius:999px;padding:6px 10px;font-size:.78rem;font-weight:850}
        .premium-management-state.active{background:#e8f6ed;color:#216239}.premium-management-state.cancelled{background:#f3eee9;color:#6c5a4d}
        .premium-management-date-label{font-size:.78rem;text-transform:uppercase;letter-spacing:.07em;color:#7a6b62;font-weight:800}
        .premium-management-date{font-size:1.08rem;color:#3f3732}
        .premium-cancel-button{margin-top:auto;border:1px solid #b65b66;border-radius:11px;padding:11px 14px;background:#fff;color:#8f1d2c;font:inherit;font-weight:850;cursor:pointer}
        .premium-cancel-button:hover{background:#fff4f5}.premium-cancel-button.hidden{display:none!important}
        .premium-management-feedback{margin:14px 0 0;padding:11px 13px;border-radius:11px;background:#f6f1ea;color:#5d514a;font-size:.9rem;line-height:1.5}
        .premium-management-feedback.success{background:#edf8f0;color:#285e39}.premium-management-feedback.error{background:#fff0f0;color:#8a2631}
        .premium-cancel-dialog{width:min(520px,calc(100vw - 32px));border:0;border-radius:20px;padding:0;box-shadow:0 24px 70px rgba(43,28,22,.28)}
        .premium-cancel-dialog::backdrop{background:rgba(35,25,22,.5)}
        .premium-cancel-dialog-inner{padding:26px}.premium-cancel-dialog h2{margin:0 0 10px;color:#6e1521}.premium-cancel-dialog p{margin:0;color:#554b45;line-height:1.6}
        .premium-cancel-dialog-actions{display:flex;gap:10px;justify-content:flex-end;margin-top:22px;flex-wrap:wrap}
        .premium-dialog-keep,.premium-dialog-confirm{border-radius:11px;padding:11px 14px;font:inherit;font-weight:850;cursor:pointer}
        .premium-dialog-keep{border:1px solid #d9cfc7;background:#fff;color:#4c433e}.premium-dialog-confirm{border:1px solid #8f1d2c;background:#8f1d2c;color:#fff}
        .premium-dialog-confirm:disabled,.premium-dialog-keep:disabled{opacity:.6;cursor:wait}
        @media(max-width:760px){.premium-management-grid{grid-template-columns:1fr}.premium-cancel-dialog-actions{flex-direction:column-reverse}.premium-dialog-keep,.premium-dialog-confirm{width:100%}}
      `;
      document.head.appendChild(style);
    }

    if (!document.getElementById("premium-management")) {
      const section = document.createElement("section");
      section.className = "student-section premium-management hidden";
      section.id = "premium-management";
      section.setAttribute("data-premium-section", "");
      section.setAttribute("aria-labelledby", "premium-management-title");
      section.innerHTML = `
        <div class="premium-management-grid">
          <div>
            <p class="student-section-kicker">Minha assinatura</p>
            <h2 id="premium-management-title">Sua assinatura Premium</h2>
            <p class="premium-management-copy" id="premium-management-text">Gerencie sua assinatura mensal.</p>
            <p class="premium-management-feedback" id="premium-management-feedback" role="status" aria-live="polite"></p>
          </div>
          <aside class="premium-management-card" aria-label="Detalhes da assinatura">
            <span class="premium-management-state active" id="premium-management-status">Ativa</span>
            <span class="premium-management-date-label" id="premium-management-date-label">Próxima renovação</span>
            <strong class="premium-management-date" id="premium-management-date">—</strong>
            <button class="premium-cancel-button" id="premium-cancel-button" type="button">Cancelar renovação automática</button>
          </aside>
        </div>`;
      offer.insertAdjacentElement("afterend", section);
    }

    if (!document.getElementById("premium-cancel-dialog")) {
      const dialog = document.createElement("dialog");
      dialog.className = "premium-cancel-dialog";
      dialog.id = "premium-cancel-dialog";
      dialog.innerHTML = `
        <div class="premium-cancel-dialog-inner">
          <p class="student-section-kicker">Gerenciar assinatura</p>
          <h2>Cancelar renovação automática?</h2>
          <p id="premium-cancel-dialog-text">Ao confirmar, não haverá nova cobrança.</p>
          <div class="premium-cancel-dialog-actions">
            <button class="premium-dialog-keep" id="premium-cancel-keep" type="button">Manter assinatura</button>
            <button class="premium-dialog-confirm" id="premium-cancel-confirm" type="button">Confirmar cancelamento</button>
          </div>
        </div>`;
      document.body.appendChild(dialog);
    }
  }

  ensureManagementUi();

  const offer = document.getElementById("premium-offer");
  const button = document.getElementById("premium-subscribe-button");
  const statusNode = document.getElementById("premium-status");
  const planBadge = document.getElementById("student-plan-badge");
  const management = document.getElementById("premium-management");
  const managementTitle = document.getElementById("premium-management-title");
  const managementText = document.getElementById("premium-management-text");
  const managementStatus = document.getElementById("premium-management-status");
  const managementDateLabel = document.getElementById("premium-management-date-label");
  const managementDate = document.getElementById("premium-management-date");
  const cancelButton = document.getElementById("premium-cancel-button");
  const cancelDialog = document.getElementById("premium-cancel-dialog");
  const cancelDialogText = document.getElementById("premium-cancel-dialog-text");
  const cancelConfirm = document.getElementById("premium-cancel-confirm");
  const cancelKeep = document.getElementById("premium-cancel-keep");
  const managementFeedback = document.getElementById("premium-management-feedback");
  if (!offer || !button || !statusNode || !planBadge) return;

  let summary = null;

  function setStatus(message, type = "info") {
    statusNode.textContent = message;
    statusNode.className = `premium-status ${type}`;
  }

  function setManagementFeedback(message, type = "info") {
    if (!managementFeedback) return;
    managementFeedback.textContent = message;
    managementFeedback.className = `premium-management-feedback ${type}`;
  }

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params);
      else if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

  function formatDate(value) {
    const date = new Date(value || "");
    if (Number.isNaN(date.getTime())) return "—";
    return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric" }).format(date);
  }

  function renderManagement(current, isAdmin = false) {
    if (!management) return;
    if (isAdmin) {
      management.classList.add("hidden");
      return;
    }

    const subscription = current?.subscription || {};
    const status = String(subscription.status || "");
    const cancelledWithAccess = status === "cancelled" && Boolean(current?.premium_access);
    const active = Boolean(current?.premium_access) && ["active", "authorized", "trialing"].includes(status);

    if (!active && !cancelledWithAccess) {
      management.classList.add("hidden");
      return;
    }

    management.classList.remove("hidden");
    const endDate = subscription.current_period_end || null;

    if (cancelledWithAccess) {
      managementTitle.textContent = "Assinatura cancelada";
      managementText.textContent = endDate
        ? `A renovação automática foi interrompida. Seu acesso Premium continua até ${formatDate(endDate)}.`
        : "A renovação automática foi interrompida.";
      managementStatus.textContent = "Cancelada · sem novas cobranças";
      managementStatus.className = "premium-management-state cancelled";
      managementDateLabel.textContent = "Acesso Premium até";
      managementDate.textContent = formatDate(endDate);
      cancelButton?.classList.add("hidden");
      setManagementFeedback("Seu histórico e progresso permanecem salvos.", "success");
      return;
    }

    managementTitle.textContent = "Sua assinatura Premium";
    managementText.textContent = "Gerencie sua assinatura mensal. Você pode cancelar a renovação automática quando quiser.";
    managementStatus.textContent = "Ativa";
    managementStatus.className = "premium-management-state active";
    managementDateLabel.textContent = endDate ? "Próxima renovação" : "Cobrança";
    managementDate.textContent = endDate ? formatDate(endDate) : `Mensal · ${PREMIUM_PRICE_LABEL}`;
    cancelButton?.classList.remove("hidden");
    setManagementFeedback("O cancelamento interrompe apenas as próximas cobranças; o período já pago continua disponível até o vencimento.");
  }

  function activatePremium(isAdmin = false) {
    document.body.classList.add("premium-access");
    offer.classList.add("hidden");
    const subscription = summary?.subscription || {};
    const cancelledWithAccess = subscription.status === "cancelled" && Boolean(summary?.premium_access);
    if (isAdmin) planBadge.textContent = "★ Acesso administrativo";
    else if (cancelledWithAccess && subscription.current_period_end) planBadge.textContent = `★ Premium até ${new Intl.DateTimeFormat("pt-BR").format(new Date(subscription.current_period_end))}`;
    else planBadge.textContent = "★ Premium ativo";
    planBadge.classList.remove("free-badge");
    planBadge.classList.add("premium-badge");
    renderManagement(summary, isAdmin);
  }

  function activateFree(subscriptionStatus = "") {
    document.body.classList.remove("premium-access");
    offer.classList.remove("hidden");
    management?.classList.add("hidden");
    planBadge.textContent = subscriptionStatus === "pending" ? "Pagamento pendente" : "Plano gratuito";
    planBadge.classList.remove("premium-badge");
    planBadge.classList.add("free-badge");

    if (subscriptionStatus === "pending") {
      button.textContent = "Continuar assinatura →";
      setStatus(`O plano Premium agora custa ${PREMIUM_PRICE_LABEL}/mês. Ao continuar, um checkout pendente com valor anterior será substituído automaticamente.`, "info");
    } else if (subscriptionStatus === "cancelled") {
      button.textContent = `Assinar novamente por ${PREMIUM_PRICE_LABEL}/mês →`;
      setStatus("Sua assinatura anterior foi encerrada. Você pode iniciar uma nova assinatura quando quiser.", "info");
    } else {
      button.textContent = `Assinar por ${PREMIUM_PRICE_LABEL}/mês →`;
      setStatus("Pagamento processado com segurança pelo Mercado Pago.", "info");
    }
  }

  async function loadSummary() {
    const supabase = window.VAEAuth.getClient();
    const { data, error } = await supabase.rpc("get_membership_summary");
    if (error) throw error;
    summary = data || {};
    const isAdmin = summary.role === "admin";
    if (isAdmin || summary.premium_access) activatePremium(isAdmin);
    else activateFree(summary.subscription?.status || "");
    return summary;
  }

  async function startCheckout() {
    button.disabled = true;
    button.textContent = "Abrindo Mercado Pago…";
    setStatus("Preparando sua assinatura segura…");
    track("premium_checkout_start", { plan: "premium_monthly", value: PREMIUM_PRICE, currency: "BRL" });

    try {
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.functions.invoke("mercadopago-subscribe", { body: {} });
      if (error) throw error;
      if (data?.premium_access) {
        await loadSummary();
        return;
      }
      if (!data?.checkout_url) throw new Error("CHECKOUT_URL_UNAVAILABLE");
      window.location.assign(data.checkout_url);
    } catch (error) {
      console.error("Falha ao iniciar assinatura", error);
      setStatus("Não foi possível abrir o Mercado Pago agora. Aguarde um instante e tente novamente.", "error");
      button.disabled = false;
      const status = summary?.subscription?.status || "";
      button.textContent = status === "pending" ? "Continuar assinatura →" : status === "cancelled" ? `Assinar novamente por ${PREMIUM_PRICE_LABEL}/mês →` : `Assinar por ${PREMIUM_PRICE_LABEL}/mês →`;
    }
  }

  function openCancelDialog() {
    if (!cancelDialog) return;
    const endDate = summary?.subscription?.current_period_end;
    cancelDialogText.textContent = endDate
      ? `Ao confirmar, não haverá nova cobrança. Seu acesso Premium continuará até ${formatDate(endDate)}.`
      : "Ao confirmar, a renovação automática será interrompida e não haverá nova cobrança.";
    if (typeof cancelDialog.showModal === "function") cancelDialog.showModal();
    else cancelDialog.setAttribute("open", "");
    track("premium_cancel_dialog_open", { plan: "premium_monthly" });
  }

  function closeCancelDialog() {
    if (!cancelDialog) return;
    if (typeof cancelDialog.close === "function") cancelDialog.close();
    else cancelDialog.removeAttribute("open");
  }

  async function cancelSubscription() {
    if (!cancelConfirm || !cancelKeep) return;
    cancelConfirm.disabled = true;
    cancelKeep.disabled = true;
    cancelConfirm.textContent = "Cancelando…";
    setManagementFeedback("Confirmando o cancelamento com o Mercado Pago…");
    track("premium_cancel_confirm", { plan: "premium_monthly" });

    try {
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.functions.invoke("mercadopago-cancel-subscription", { body: {} });
      if (error) throw error;
      closeCancelDialog();
      await loadSummary();
      const accessUntil = data?.access_until || summary?.subscription?.current_period_end;
      setManagementFeedback(accessUntil
        ? `Cancelamento concluído. Seu acesso Premium permanece ativo até ${formatDate(accessUntil)} e não haverá nova cobrança.`
        : "Cancelamento concluído. Não haverá nova cobrança.", "success");
      track("premium_subscription_cancelled", { plan: "premium_monthly" });
    } catch (error) {
      console.error("Falha ao cancelar assinatura", error);
      setManagementFeedback("Não foi possível cancelar a assinatura agora. Nenhuma alteração foi feita; tente novamente em alguns minutos.", "error");
    } finally {
      cancelConfirm.disabled = false;
      cancelKeep.disabled = false;
      cancelConfirm.textContent = "Confirmar cancelamento";
    }
  }

  async function confirmReturn() {
    const params = new URLSearchParams(location.search);
    if (params.get("assinatura") !== "retorno") return;
    setStatus("Confirmando sua assinatura com o Mercado Pago…");
    track("premium_checkout_return", { plan: "premium_monthly" });

    for (let attempt = 0; attempt < 6; attempt += 1) {
      try {
        const current = await loadSummary();
        if (current?.premium_access || current?.role === "admin") {
          track("premium_access_activated", { plan: "premium_monthly" });
          const clean = new URL(location.href);
          clean.searchParams.delete("assinatura");
          history.replaceState({}, "", clean.pathname + clean.search + clean.hash);
          return;
        }
      } catch (_) {}
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
    activateFree(summary?.subscription?.status || "pending");
    setStatus("O pagamento foi enviado para confirmação. Se acabou de assinar, aguarde alguns instantes e atualize a página.", "success");
  }

  button.addEventListener("click", startCheckout);
  cancelButton?.addEventListener("click", openCancelDialog);
  cancelKeep?.addEventListener("click", closeCancelDialog);
  cancelConfirm?.addEventListener("click", cancelSubscription);
  cancelDialog?.addEventListener("click", (event) => {
    if (event.target === cancelDialog) closeCancelDialog();
  });

  async function boot() {
    try {
      const session = await window.VAEAuth?.getSession?.();
      if (!session) return;
      await loadSummary();
      await confirmReturn();
    } catch (error) {
      console.warn("Não foi possível consultar a assinatura", error);
      activateFree();
      setStatus("Não foi possível consultar seu plano agora. Atualize a página e tente novamente.", "error");
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();