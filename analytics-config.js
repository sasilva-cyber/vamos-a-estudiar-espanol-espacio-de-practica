/* Google Analytics + carregamento progressivo de recursos públicos. */
(function () {
  const id = "G-PLD6NHQNEN";
  window.VAE_GA4_ID = id;

  /* Mantém a fila de eventos disponível imediatamente, mas posterga o download do gtag. */
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id);

  function loadGoogleTag() {
    if (document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${id}"]`)) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
  }

  /* O Analytics não disputa banda com o conteúdo crítico da primeira tela. */
  const scheduleAnalytics = () => window.setTimeout(loadGoogleTag, 900);
  if (document.readyState === "complete") scheduleAnalytics();
  else window.addEventListener("load", scheduleAnalytics, { once: true });

  const isGithub = window.location.hostname.toLowerCase().endsWith(".github.io");
  const root = isGithub ? "/vamos-a-estudiar-espanol-espacio-de-practica/" : "/";

  function loadLocalScript(idValue, file, async = true) {
    if (document.getElementById(idValue)) return;
    const script = document.createElement("script");
    script.id = idValue;
    script.src = `${root}${file}`;
    script.async = async;
    document.head.appendChild(script);
  }

  /* Acesso Login/Cadastro é pequeno e continua disponível logo no início. */
  loadLocalScript("vae-student-nav", "student-nav.js?v=20260823-1145");

  /* Newsletter e YouTube são carregados apenas quando o visitante se aproxima das seções. */
  loadLocalScript("vae-performance-lazy", "performance-lazy.js?v=20260823-1819");
})();
