/*
 * Configuração pública da autenticação.
 *
 * IMPORTANTE:
 * - SUPABASE_URL e SUPABASE_ANON_KEY são valores públicos do projeto web.
 * - NUNCA coloque service_role, senha de banco ou qualquer segredo administrativo aqui.
 * - Enquanto os valores estiverem vazios, as telas de autenticação permanecem em modo de preparação.
 */
window.VAE_AUTH_CONFIG = Object.freeze({
  supabaseUrl: "",
  supabaseAnonKey: "",
  siteUrl: "https://pratica.vamosaestudiarespanol.com.br"
});
