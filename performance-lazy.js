/* Otimizações de carregamento da home: posterga recursos não críticos. */
(function () {
  const root = window.__VAE_ROOT__ || (location.hostname.toLowerCase().endsWith('.github.io') ? '/vamos-a-estudiar-espanol-espacio-de-practica/' : '/');

  function loadScript(id, file, onload) {
    const existing = document.getElementById(id);
    if (existing) {
      if (typeof onload === 'function') {
        if (existing.dataset.loaded === 'true') onload();
        else existing.addEventListener('load', onload, { once: true });
      }
      return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.src = `${root}${file}`;
    script.async = true;
    script.addEventListener('load', () => {
      script.dataset.loaded = 'true';
      if (typeof onload === 'function') onload();
    }, { once: true });
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

  function simplifyYoutubeIntro() {
    const section = document.getElementById('home-youtube-showcase');
    if (!section) return;
    const description = section.querySelector('.home-youtube-head-copy > p:last-child');
    if (description) description.textContent = 'Assista aos vídeos mais recentes do Vamos a Estudiar Español.';
    section.querySelector('.home-youtube-auto')?.remove();
  }

  function lazyNewsletter() {
    const form = document.querySelector('#newsletter-form, form[data-newsletter], .newsletter-form');
    const section = form?.closest('section') || form;
    if (!section) return;
    deferUntilVisible(section, () => loadScript('vae-newsletter-runtime', 'newsletter-runtime.js?v=20260823-1455'), '500px 0px');
  }

  function loadYoutube() {
    loadScript('vae-home-youtube', 'home-youtube.js?v=20260823-1725', simplifyYoutubeIntro);
  }

  function lazyYoutube() {
    const existing = document.getElementById('home-grammar-showcase');
    if (existing) {
      deferUntilVisible(existing, loadYoutube, '650px 0px');
      return;
    }
    const home = document.getElementById('home-screen');
    if (!home) return;
    const observer = new MutationObserver(() => {
      const grammar = document.getElementById('home-grammar-showcase');
      if (!grammar) return;
      observer.disconnect();
      deferUntilVisible(grammar, loadYoutube, '650px 0px');
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
