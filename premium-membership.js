/* Assinatura Premium e checkout Mercado Pago. */
(function () {
  const offer = document.getElementById("premium-offer");
  const button = document.getElementById("premium-subscribe-button");
  const statusNode = document.getElementById("premium-status");
  const planBadge = document.getElementById("student-plan-badge");
  if (!offer || !button || !statusNode || !planBadge) return;

  let summary = null;

  function setStatus(message, type = "info") {
    statusNode.textContent = message;
    statusNode.className = `premium-status ${type}`;
  }

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params);
      else if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

  function activatePremium(isAdmin = false) {
    document.body.classList.add("premium-access");
    offer.classList.add("hidden");
    planBadge.textContent = isAdmin ? "★ Acesso administrativo" : "★ Premium ativo";
    planBadge.classList.remove("free-badge");
    planBadge.classList.add("premium-badge");
  }

  function activateFree(subscriptionStatus = "") {
    document.body.classList.remove("premium-access");
    offer.classList.remove("hidden");
    planBadge.textContent = subscriptionStatus === "pending" ? "Pagamento pendente" : "Plano gratuito";
    planBadge.classList.remove("premium-badge");
    planBadge.classList.add("free-badge");
    if (subscriptionStatus === "pending") {
      button.textContent = "Continuar assinatura →";
      setStatus("Sua assinatura foi iniciada. Conclua o pagamento no Mercado Pago para liberar o acesso.", "success");
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
    track("premium_checkout_start", { plan: "premium_monthly", value: 9.90, currency: "BRL" });

    try {
      const supabase = window.VAEAuth.getClient();
      const { data, error } = await supabase.functions.invoke("mercadopago-subscribe", { body: {} });
      if (error) throw error;
      if (data?.premium_access) {
        activatePremium(Boolean(data?.admin));
        return;
      }
      if (!data?.checkout_url) throw new Error("CHECKOUT_URL_UNAVAILABLE");
      window.location.assign(data.checkout_url);
    } catch (error) {
      console.error("Falha ao iniciar assinatura", error);
      setStatus("A cobrança ainda precisa ser vinculada à sua conta do Mercado Pago. Tente novamente após a ativação das credenciais.", "error");
      button.disabled = false;
      button.textContent = summary?.subscription?.status === "pending" ? "Continuar assinatura →" : "Assinar por R$ 9,90/mês →";
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
