/* Cliente compartilhado de autenticação da Área do Aluno. */
(function () {
  const REPOSITORY_PATH = "/vamos-a-estudiar-espanol-espacio-de-practica";
  const IS_GITHUB = location.hostname.toLowerCase().endsWith(".github.io");
  const ROOT_PATH = IS_GITHUB ? `${REPOSITORY_PATH}/` : "/";
  const config = window.VAE_AUTH_CONFIG || {};
  let client = null;

  function rootUrl(path = "") {
    const clean = String(path || "").replace(/^\/+/, "");
    return `${location.origin}${ROOT_PATH}${clean}`;
  }

  function isConfigured() {
    const url = String(config.supabaseUrl || "").trim();
    const key = String(config.supabaseAnonKey || "").trim();
    const validUrl = /^https:\/\/.+\.supabase\.co\/?$/i.test(url);
    const validKey = /^sb_publishable_[A-Za-z0-9_-]{20,}$/.test(key) || key.split(".").length === 3;
    return validUrl && validKey;
  }

  function getClient() {
    if (client) return client;
    if (!isConfigured()) throw new Error("AUTH_NOT_CONFIGURED");
    if (!window.supabase?.createClient) throw new Error("SUPABASE_SDK_UNAVAILABLE");
    client = window.supabase.createClient(
      String(config.supabaseUrl).trim().replace(/\/$/, ""),
      String(config.supabaseAnonKey).trim(),
      { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
    );
    return client;
  }

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === "function") window.vaeTrack(eventName, params);
      else if (typeof window.gtag === "function") window.gtag("event", eventName, params);
    } catch (_) {}
  }

  function friendlyError(error) {
    const message = String(error?.message || error || "").toLowerCase();
    if (message.includes("auth_not_configured")) return "O acesso de estudantes ainda está sendo configurado.";
    if (message.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
    if (message.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar.";
    if (message.includes("user already registered")) return "Este e-mail já possui uma conta.";
    if (message.includes("password should be at least")) return "A senha precisa ter pelo menos 8 caracteres.";
    if (message.includes("rate limit")) return "Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.";
    return error?.message || "Não foi possível concluir a operação. Tente novamente.";
  }

  async function signUp({ name, email, password, newsletter = false }) {
    const supabase = getClient();
    const { data, error } = await supabase.auth.signUp({
      email: String(email || "").trim(),
      password,
      options: {
        emailRedirectTo: rootUrl("login/?confirmed=1"),
        data: { full_name: String(name || "").trim(), newsletter_opt_in: Boolean(newsletter), source: "site_pratica" }
      }
    });
    if (error) throw error;
    track("sign_up", { method: "email" });
    return data;
  }

  async function signIn(email, password) {
    const supabase = getClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email: String(email || "").trim(), password });
    if (error) throw error;
    track("login", { method: "email" });
    return data;
  }

  async function signOut() {
    const supabase = getClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    track("logout", { method: "email" });
  }

  async function requestPasswordReset(email) {
    const supabase = getClient();
    const { error } = await supabase.auth.resetPasswordForEmail(String(email || "").trim(), { redirectTo: rootUrl("login/?reset=1") });
    if (error) throw error;
    track("password_reset_request", { method: "email" });
  }

  async function updatePassword(password) {
    const supabase = getClient();
    const { data, error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
    track("password_reset_complete", { method: "email" });
    return data;
  }

  async function getSession() {
    const supabase = getClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session || null;
  }

  async function requireSession() {
    const session = await getSession();
    if (!session) {
      location.replace(`${ROOT_PATH}login/?next=aluno`);
      return null;
    }
    return session;
  }

  async function getUser() {
    const supabase = getClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user || null;
  }

  function onAuthStateChange(callback) {
    return getClient().auth.onAuthStateChange(callback);
  }

  window.VAEAuth = Object.freeze({ ROOT_PATH, isConfigured, getClient, friendlyError, signUp, signIn, signOut, requestPasswordReset, updatePassword, getSession, requireSession, getUser, onAuthStateChange, rootUrl });
})();
