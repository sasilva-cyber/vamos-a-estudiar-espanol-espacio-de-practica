/* Métricas opcionais via Google Analytics 4. Não envia dados enquanto VAE_GA4_ID estiver vazio. */
(function () {
  const id = String(window.VAE_GA4_ID || "").trim();
  if (!/^G-[A-Z0-9]+$/i.test(id)) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  window.gtag("js", new Date());
  window.gtag("config", id, {
    send_page_view: false,
    anonymize_ip: true
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  function pageView(detail) {
    const path = detail?.path || `${location.pathname}${location.search}`;
    const title = detail?.title || document.title;
    window.gtag("event", "page_view", {
      page_title: title,
      page_location: location.href,
      page_path: path
    });
  }

  window.addEventListener("vae:routechange", (event) => pageView(event.detail));
  pageView();

  window.vaeTrack = function (eventName, params) {
    if (!eventName) return;
    window.gtag("event", String(eventName), params || {});
  };
})();
