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

  async function checkExistingSession() {
    if (!window.VAEAuth?.isConfigured?.()) {
      setBusy(false);
      setStatus("A Área do Estudiante está sendo preparada. O cadastro será liberado assim que a autenticação estiver conectada.", "info");
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
    if (!window.VAEAuth?.isConfigured?.()) {
      setStatus("O cadastro ainda não está disponível. A autenticação está sendo configurada.", "info");
      return;
    }

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const passwordConfirm = confirmInput.value;

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
      setStatus("Para criar a conta, confirme o consentimento de uso dos dados para gerenciar seu acesso.", "error");
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
        newsletter: newsletterInput.checked
      });

      if (data?.session) {
        setStatus("Conta criada. Abrindo sua Área do Estudiante…", "success");
        window.setTimeout(() => location.replace(`${window.VAEAuth.ROOT_PATH}aluno/`), 700);
        return;
      }

      form.reset();
      setStatus("Conta criada! Confira sua caixa de entrada e clique no link de confirmação enviado para o seu e-mail.", "success");
    } catch (error) {
      setStatus(window.VAEAuth.friendlyError(error), "error");
    } finally {
      setBusy(false);
    }
  });

  installPasswordToggles();
  checkExistingSession();
})();
