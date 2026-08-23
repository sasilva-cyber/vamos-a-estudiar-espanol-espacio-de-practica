/* Configuração pública da autenticação da Área do Estudiante.
 * A publishable key é própria para uso no navegador.
 * Nunca adicionar service_role, senha do banco ou segredos administrativos aqui.
 */
window.VAE_AUTH_CONFIG = Object.freeze({
  supabaseUrl: "https://clfwoywzalttkvhstsgh.supabase.co",
  supabaseAnonKey: "sb_publishable_QylDT7fw_RktIiSApbHkLA_w6PHRjmH",
  siteUrl: "https://pratica.vamosaestudiarespanol.com.br"
});

/* Carregadores leves compartilhados pelas páginas de autenticação/Área do Estudiante. */
(function(){
  const isGithub=location.hostname.toLowerCase().endsWith('.github.io');
  const root=isGithub?'/vamos-a-estudiar-espanol-espacio-de-practica/':'/';
  function load(id,src){
    if(document.getElementById(id))return;
    const script=document.createElement('script');
    script.id=id;script.src=`${root}${src}`;script.defer=true;
    document.head.appendChild(script);
  }

  load('vae-internal-analytics','internal-analytics.js?v=20260823-1');

  const pathname=isGithub&&location.pathname.startsWith('/vamos-a-estudiar-espanol-espacio-de-practica')
    ? location.pathname.slice('/vamos-a-estudiar-espanol-espacio-de-practica'.length)||'/'
    : location.pathname;

  if(pathname==='/admin/'||pathname==='/admin'){
    load('vae-admin-internal-analytics','admin-analytics.js?v=20260823-2');
  }

  if(pathname==='/aluno/'||pathname==='/aluno'){
    load('vae-student-experience','student-experience.js?v=20260823-1');
  }
})();
