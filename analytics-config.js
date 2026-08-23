/* Google tag (gtag.js) — G-PLD6NHQNEN */
(function () {
  const id = "G-PLD6NHQNEN";
  window.VAE_GA4_ID = id;

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.insertBefore(script, document.head.firstChild);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);

  const isGithub = window.location.hostname.toLowerCase().endsWith(".github.io");
  const root = isGithub ? "/vamos-a-estudiar-espanol-espacio-de-practica/" : "/";

  /* Estatísticas próprias no Supabase. O script é leve e registra apenas depois que o navegador fica ocioso. */
  if (!document.getElementById("vae-internal-analytics")) {
    const internalAnalytics = document.createElement("script");
    internalAnalytics.id = "vae-internal-analytics";
    internalAnalytics.src = `${root}internal-analytics.js?v=20260823-1`;
    internalAnalytics.defer = true;
    document.head.appendChild(internalAnalytics);
  }

  /* Carrega os acessos públicos de Login/Cadastro sem duplicar o script. */
  if (!document.getElementById("vae-student-nav")) {
    const studentNav = document.createElement("script");
    studentNav.id = "vae-student-nav";
    studentNav.src = `${root}student-nav.js?v=20260823-1145`;
    studentNav.defer = true;
    document.head.appendChild(studentNav);
  }

  /* Conecta o formulário público da newsletter ao Supabase. */
  if (!document.getElementById("vae-newsletter-runtime")) {
    const newsletter = document.createElement("script");
    newsletter.id = "vae-newsletter-runtime";
    newsletter.src = `${root}newsletter-runtime.js?v=20260823-1455`;
    newsletter.defer = true;
    document.head.appendChild(newsletter);
  }

  function simplifyYoutubeIntro() {
    const section = document.getElementById("home-youtube-showcase");
    if (!section) return false;
    const description = section.querySelector(".home-youtube-head-copy > p:last-child");
    if (description) description.textContent = "Assista aos vídeos mais recentes do Vamos a Estudiar Español.";
    section.querySelector(".home-youtube-auto")?.remove();
    return true;
  }

  function watchYoutubeIntro() {
    if (simplifyYoutubeIntro()) return;
    const observer = new MutationObserver(() => {
      if (simplifyYoutubeIntro()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  /* Exibe os vídeos públicos mais recentes do canal abaixo das últimas aulas de gramática. */
  if (!document.getElementById("vae-home-youtube")) {
    const youtube = document.createElement("script");
    youtube.id = "vae-home-youtube";
    youtube.src = `${root}home-youtube.js?v=20260823-1725`;
    youtube.defer = true;
    youtube.addEventListener("load", watchYoutubeIntro, { once: true });
    document.head.appendChild(youtube);
  } else {
    watchYoutubeIntro();
  }
})();
