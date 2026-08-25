/* Newsletter pública: cadastro no Supabase + boas-vindas por e-mail. Sem observador global do DOM. */
(function () {
  const ENDPOINT = "https://clfwoywzalttkvhstsgh.supabase.co/functions/v1/newsletter-subscribe";

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params);
      else if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

  function looksLikeNewsletter(form) {
    if (!(form instanceof HTMLFormElement)) return false;
    const email = form.querySelector('input[type="email"], input[name="email"]');
    if (!email) return false;
    const action = String(form.getAttribute("action") || "").toLowerCase();
    if (action.includes("formsubmit")) return true;
    const sectionText = String(form.closest("section,article,div")?.textContent || "").toLowerCase();
    return sectionText.includes("newsletter") || sectionText.includes("novidades");
  }

  function ensureStatus(form) {
    let node = form.querySelector("[data-newsletter-status]");
    if (node) return node;
    node = document.createElement("p");
    node.dataset.newsletterStatus = "";
    node.setAttribute("role", "status");
    node.setAttribute("aria-live", "polite");
    node.style.margin = "10px 0 0";
    node.style.fontSize = ".86rem";
    node.style.lineHeight = "1.5";
    form.appendChild(node);
    return node;
  }

  function ensureHoneypot(form) {
    if (form.querySelector('input[name="website"]')) return;
    const wrapper = document.createElement("div");
    wrapper.setAttribute("aria-hidden", "true");
    wrapper.style.position = "absolute";
    wrapper.style.left = "-9999px";
    wrapper.innerHTML = '<label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label>';
    form.appendChild(wrapper);
  }

  function install(form) {
    if (!looksLikeNewsletter(form) || form.dataset.vaeNewsletterInstalled === "1") return;
    form.dataset.vaeNewsletterInstalled = "1";
    ensureHoneypot(form);
    const status = ensureStatus(form);
    const emailInput = form.querySelector('input[type="email"], input[name="email"]');
    const nameInput = form.querySelector('input[name="name"], input[name="full_name"]');
    const button = form.querySelector('button[type="submit"], input[type="submit"]');

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = String(emailInput?.value || "").trim();
      const name = String(nameInput?.value || "").trim();
      const website = String(form.querySelector('input[name="website"]')?.value || "");

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Informe um e-mail válido para assinar a newsletter.";
        status.style.color = "#8a2631";
        emailInput?.focus();
        return;
      }

      const oldLabel = button instanceof HTMLButtonElement ? button.textContent : button?.value;
      if (button) button.disabled = true;
      if (button instanceof HTMLButtonElement) button.textContent = "Inscrevendo…";
      else if (button instanceof HTMLInputElement) button.value = "Inscrevendo…";
      status.textContent = "Registrando sua inscrição…";
      status.style.color = "inherit";

      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, full_name: name, website, source: "public_site_newsletter" })
        });
        const data = await response.json().catch(() => ({}));
        if (!response.ok || !data?.ok) throw new Error(data?.error || "NEWSLETTER_SUBSCRIBE_FAILED");

        status.textContent = data?.welcome_email_sent
          ? "¡Listo! Inscrição confirmada. Enviamos uma mensagem de boas-vindas para o seu e-mail."
          : "¡Listo! Sua inscrição na newsletter foi confirmada.";
        status.style.color = "#2d7554";
        form.reset();
        track("newsletter_signup", { source: "public_site", welcome_email_sent: Boolean(data?.welcome_email_sent) });
      } catch (error) {
        console.error("Falha ao cadastrar newsletter", error);
        status.textContent = "Não foi possível concluir a inscrição agora. Tente novamente em alguns instantes.";
        status.style.color = "#8a2631";
      } finally {
        if (button) button.disabled = false;
        if (button instanceof HTMLButtonElement) button.textContent = oldLabel || "Assinar";
        else if (button instanceof HTMLInputElement) button.value = oldLabel || "Assinar";
      }
    });
  }

  function scanOnce() {
    document.querySelectorAll("form").forEach(install);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", scanOnce, { once: true });
  else scanOnce();

  /* Formulários inseridos depois são preparados apenas quando a pessoa interage com eles. */
  document.addEventListener("focusin", (event) => {
    const form = event.target?.closest?.("form");
    if (form) install(form);
  }, true);

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !looksLikeNewsletter(form) || form.dataset.vaeNewsletterInstalled === "1") return;
    event.preventDefault();
    install(form);
    queueMicrotask(() => form.requestSubmit());
  }, true);
})();