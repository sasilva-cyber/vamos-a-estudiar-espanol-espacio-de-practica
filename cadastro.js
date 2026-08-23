/* Cadastro da Área do Estudiante. */
(function () {
  const form = document.getElementById("signup-form");
  if (!form) return;

  const status = document.getElementById("signup-status");
  const submit = document.getElementById("signup-submit");
  const nameInput = document.getElementById("signup-name");
  const emailInput = document.getElementById("signup-email");
  const passwordInput = document.getElementById("signup-password");
  const confirmInput = document.getElementById("signup-password-confirm");
  const consentInput = document.getElementById("signup-consent");
  const newsletterInput = document.getElementById("signup-newsletter");
  const NEWSLETTER_ENDPOINT = "https://clfwoywzalttkvhstsgh.supabase.co/functions/v1/newsletter-subscribe";

  function setStatus(message, type = "info") {
    status.textContent = message;
    status.className = `auth-status show ${type}`;
  }

  function setBusy(busy) {
    submit.disabled = busy || !window.VAEAuth?.isConfigured?.();
    submit.textContent = busy ? "Criando sua conta…" : "Criar minha conta →";
  }

  function installPasswordToggles() {
    document.querySelectorAll("[data-toggle-password]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.togglePassword);
        if (!input) return;
        const show = input.type === "password";
        input.type = show ? "text" : "password";
        button.textContent = show ? "Ocultar" : "Mostrar";
      });
    });
  }

  async function subscribeNewsletter(name, email) {
    try {
      const response = await fetch(NEWSLETTER_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, full_name: name, source: "student_signup" })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data?.ok) throw new Error(data?.error || "NEWSLETTER_SUBSCRIBE_FAILED");
      try {
        if (typeof window.vaeTrack === "function") window.vaeTrack("newsletter_signup", { source: "student_signup", welcome_email_sent: Boolean(data?.welcome_email_sent) });
        else if (typeof window.gtag === "function") window.gtag("event", "newsletter_signup", { source: "student_signup", welcome_email_sent: Boolean(data?.welcome_email_sent) });
      } catch (_) {}
      return data;
    } catch (error) {
      console.warn("Conta criada, mas o cadastro da newsletter não pôde ser concluído agora.", error);
      return null;
    }
  }

  async function checkExistingSession() {
    if (!window.VAEAuth?.isConfigured?.()) {
      setBusy(false);
      setStatus("A Área do Estudiante ainda não está disponível.", "info");
      return;
    }

    try {
      const session = await window.VAEAuth.getSession();
      if (session) location.replace(`${window.VAEAuth.ROOT_PATH}aluno/`);
    } catch (_) {}
    setBusy(false);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!window.VAEAuth?.isConfigured?.()) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const passwordConfirm = confirmInput.value;
    const newsletterOptIn = Boolean(newsletterInput.checked);

    if (name.length < 2) {
      setStatus("Informe seu nome para continuar.", "error");
      nameInput.focus();
      return;
    }
    if (!emailInput.validity.valid) {
      setStatus("Informe um endereço de e-mail válido.", "error");
      emailInput.focus();
      return;
    }
    if (password.length < 8) {
      setStatus("Sua senha precisa ter pelo menos 8 caracteres.", "error");
      passwordInput.focus();
      return;
    }
    if (password !== passwordConfirm) {
      setStatus("As duas senhas não são iguais.", "error");
      confirmInput.focus();
      return;
    }
    if (!consentInput.checked) {
      setStatus("Confirme o consentimento de uso dos dados para criar sua conta.", "error");
      consentInput.focus();
      return;
    }

    setBusy(true);
    setStatus("Criando sua conta…", "info");
    try {
      const data = await window.VAEAuth.signUp({
        name,
        email,
        password,
        newsletter: newsletterOptIn
      });

      if (newsletterOptIn) await subscribeNewsletter(name, email);

      if (data?.session) {
        setStatus(newsletterOptIn ? "Conta criada. Sua newsletter também foi confirmada. Abrindo sua Área do Estudiante…" : "Conta criada. Abrindo sua Área do Estudiante…", "success");
        window.setTimeout(() => location.replace(`${window.VAEAuth.ROOT_PATH}aluno/`), 700);
        return;
      }

      form.reset();
      setStatus(newsletterOptIn ? "Conta criada! Confira seu e-mail para confirmar a conta. Sua inscrição na newsletter também foi registrada." : "Conta criada! Confira seu e-mail e clique no link de confirmação.", "success");
    } catch (error) {
      setStatus(window.VAEAuth.friendlyError(error), "error");
    } finally {
      setBusy(false);
    }
  });

  installPasswordToggles();
  checkExistingSession();
})();
