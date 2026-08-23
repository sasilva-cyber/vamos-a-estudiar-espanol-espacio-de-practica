/* Otimizações de carregamento da home: posterga recursos não críticos. */
(function () {
  const root = window.__VAE_ROOT__ || (location.hostname.toLowerCase().endsWith('.github.io') ? '/vamos-a-estudiar-espanol-espacio-de-practica/' : '/');

  function loadScript(id, file) {
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = `${root}${file}`;
    script.async = true;
    document.head.appendChild(script);
  }

  function deferUntilVisible(target, callback, margin = '240px 0px') {
    if (!target) return;
    let done = false;
    const run = () => {
      if (done) return;
      done = true;
      callback();
    };
    if (!('IntersectionObserver' in window)) {
      target.addEventListener('pointerdown', run, { once: true, passive: true });
      window.addEventListener('scroll', run, { once: true, passive: true });
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        run();
      }
    }, { rootMargin: margin });
    observer.observe(target);
  }

  function lazyNewsletter() {
    const form = document.querySelector('#newsletter-form, form[data-newsletter], .newsletter-form');
    const section = form?.closest('section') || form;
    if (!section) return;
    deferUntilVisible(section, () => loadScript('vae-newsletter-runtime', 'newsletter-runtime.js?v=20260823-1455'), '500px 0px');
  }

  function lazyYoutube() {
    const existing = document.getElementById('home-grammar-showcase');
    if (existing) {
      deferUntilVisible(existing, () => loadScript('vae-home-youtube', 'home-youtube.js?v=20260823-1725'), '650px 0px');
      return;
    }
    const home = document.getElementById('home-screen');
    if (!home) return;
    const observer = new MutationObserver(() => {
      const grammar = document.getElementById('home-grammar-showcase');
      if (!grammar) return;
      observer.disconnect();
      deferUntilVisible(grammar, () => loadScript('vae-home-youtube', 'home-youtube.js?v=20260823-1725'), '650px 0px');
    });
    observer.observe(home, { childList: true, subtree: true });
  }

  function start() {
    lazyNewsletter();
    lazyYoutube();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
