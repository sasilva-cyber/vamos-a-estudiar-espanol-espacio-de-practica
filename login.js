/* Login e recuperação de senha da Área do Estudiante. */
(function () {
  const loginView = document.getElementById("login-view");
  const resetView = document.getElementById("reset-request-view");
  const newPasswordView = document.getElementById("new-password-view");
  if (!loginView || !resetView || !newPasswordView) return;

  const loginForm = document.getElementById("login-form");
  const resetForm = document.getElementById("reset-request-form");
  const newPasswordForm = document.getElementById("new-password-form");
  const loginStatus = document.getElementById("login-status");
  const resetStatus = document.getElementById("reset-request-status");
  const newPasswordStatus = document.getElementById("new-password-status");
  const loginSubmit = document.getElementById("login-submit");
  const resetSubmit = document.getElementById("reset-request-submit");
  const newPasswordSubmit = document.getElementById("new-password-submit");

  function setStatus(node, message, type = "info") {
    node.textContent = message;
    node.className = `auth-status show ${type}`;
  }

  function show(view) {
    [loginView, resetView, newPasswordView].forEach((item) => item.classList.add("hidden"));
    view.classList.remove("hidden");
  }

  function setButtonBusy(button, busy, idleLabel, busyLabel) {
    button.disabled = busy || !window.VAEAuth?.isConfigured?.();
    button.textContent = busy ? busyLabel : idleLabel;
  }

  function installPasswordToggle() {
    document.querySelectorAll("[data-toggle-password]").forEach((button) => {
      button.addEventListener("click", () => {
        const input = document.getElementById(button.dataset.togglePassword);
        if (!input) return;
        const showPassword = input.type === "password";
        input.type = showPassword ? "text" : "password";
        button.textContent = showPassword ? "Ocultar" : "Mostrar";
      });
    });
  }

  async function init() {
    installPasswordToggle();
    const params = new URLSearchParams(location.search);

    if (!window.VAEAuth?.isConfigured?.()) {
      setButtonBusy(loginSubmit, false, "Entrar →", "Entrando…");
      setButtonBusy(resetSubmit, false, "Enviar link de recuperação →", "Enviando…");
      setButtonBusy(newPasswordSubmit, false, "Salvar nova senha →", "Salvando…");
      setStatus(loginStatus, "A Área do Estudiante ainda não está disponível.", "info");
      return;
    }

    if (params.get("reset") === "1") {
      show(newPasswordView);
      setStatus(newPasswordStatus, "Link de recuperação reconhecido. Escolha sua nova senha.", "info");
      return;
    }

    try {
      const session = await window.VAEAuth.getSession();
      if (session) {
        location.replace(`${window.VAEAuth.ROOT_PATH}aluno/`);
        return;
      }
    } catch (_) {}

    if (params.get("confirmed") === "1") {
      setStatus(loginStatus, "E-mail confirmado. Agora você já pode entrar na sua conta.", "success");
    }

    setButtonBusy(loginSubmit, false, "Entrar →", "Entrando…");
    setButtonBusy(resetSubmit, false, "Enviar link de recuperação →", "Enviando…");
    setButtonBusy(newPasswordSubmit, false, "Salvar nova senha →", "Salvando…");
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!window.VAEAuth?.isConfigured?.()) return;
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    if (!document.getElementById("login-email").validity.valid || !password) {
      setStatus(loginStatus, "Informe seu e-mail e sua senha.", "error");
      return;
    }

    setButtonBusy(loginSubmit, true, "Entrar →", "Entrando…");
    setStatus(loginStatus, "Verificando seus dados…", "info");
    try {
      await window.VAEAuth.signIn(email, password);
      setStatus(loginStatus, "Acesso confirmado. Abrindo sua área…", "success");
      window.setTimeout(() => location.replace(`${window.VAEAuth.ROOT_PATH}aluno/`), 450);
    } catch (error) {
      setStatus(loginStatus, window.VAEAuth.friendlyError(error), "error");
      setButtonBusy(loginSubmit, false, "Entrar →", "Entrando…");
    }
  });

  document.getElementById("forgot-password").addEventListener("click", () => {
    const currentEmail = document.getElementById("login-email").value.trim();
    if (currentEmail) document.getElementById("reset-email").value = currentEmail;
    show(resetView);
  });

  document.getElementById("back-to-login").addEventListener("click", () => show(loginView));

  resetForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!window.VAEAuth?.isConfigured?.()) return;
    const input = document.getElementById("reset-email");
    if (!input.validity.valid) {
      setStatus(resetStatus, "Informe um e-mail válido.", "error");
      return;
    }

    setButtonBusy(resetSubmit, true, "Enviar link de recuperação →", "Enviando…");
    setStatus(resetStatus, "Enviando o link…", "info");
    try {
      await window.VAEAuth.requestPasswordReset(input.value.trim());
      setStatus(resetStatus, "Se existir uma conta com esse e-mail, você receberá um link de recuperação em instantes.", "success");
    } catch (error) {
      setStatus(resetStatus, window.VAEAuth.friendlyError(error), "error");
    } finally {
      setButtonBusy(resetSubmit, false, "Enviar link de recuperação →", "Enviando…");
    }
  });

  newPasswordForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!window.VAEAuth?.isConfigured?.()) return;
    const password = document.getElementById("new-password").value;
    const confirm = document.getElementById("new-password-confirm").value;

    if (password.length < 8) {
      setStatus(newPasswordStatus, "A nova senha precisa ter pelo menos 8 caracteres.", "error");
      return;
    }
    if (password !== confirm) {
      setStatus(newPasswordStatus, "As duas senhas não são iguais.", "error");
      return;
    }

    setButtonBusy(newPasswordSubmit, true, "Salvar nova senha →", "Salvando…");
    setStatus(newPasswordStatus, "Atualizando sua senha…", "info");
    try {
      await window.VAEAuth.updatePassword(password);
      setStatus(newPasswordStatus, "Senha atualizada com sucesso. Abrindo sua Área do Estudiante…", "success");
      window.setTimeout(() => location.replace(`${window.VAEAuth.ROOT_PATH}aluno/`), 650);
    } catch (error) {
      setStatus(newPasswordStatus, window.VAEAuth.friendlyError(error), "error");
      setButtonBusy(newPasswordSubmit, false, "Salvar nova senha →", "Salvando…");
    }
  });

  init();
})();
