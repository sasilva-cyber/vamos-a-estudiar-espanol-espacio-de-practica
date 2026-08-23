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
})();
