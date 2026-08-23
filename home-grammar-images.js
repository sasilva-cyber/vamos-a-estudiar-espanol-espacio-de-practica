/* Home leve: imagens, menu e módulos secundários sob demanda. */
(function () {
  const images = [
    "assets/grammar-home/contrastes-portugues-espanol.webp",
    "assets/grammar-home/pontuacao-interrogacao.webp",
    "assets/grammar-home/acentuacao-ortografica.webp"
  ];
  const root = window.__VAE_ROOT__ || (location.hostname.toLowerCase().endsWith('.github.io') ? '/vamos-a-estudiar-espanol-espacio-de-practica/' : '/');
  const promises = new Map();
  let replaying = false;

  function loadScript(id, file) {
    if (promises.has(id)) return promises.get(id);
    const existing = document.getElementById(id);
    if (existing?.dataset.loaded === 'true') return Promise.resolve(existing);
    const p = new Promise((resolve) => {
      const script = existing || document.createElement('script');
      const done = () => { script.dataset.loaded = 'true'; resolve(script); };
      if (!existing) {
        script.id = id;
        script.src = root + file;
        script.async = true;
        document.head.appendChild(script);
      }
      if (script.dataset.loaded === 'true') return done();
      script.addEventListener('load', done, { once:true });
      script.addEventListener('error', done, { once:true });
    });
    promises.set(id, p);
    return p;
  }

  function ensureNavButton(route, label, beforeRoute) {
    const nav = document.querySelector('.main-nav');
    if (!nav || nav.querySelector(`[data-route="${route}"]`)) return;
    const button = document.createElement('button');
    button.className = 'nav-link';
    button.type = 'button';
    button.dataset.route = route;
    button.textContent = label;
    nav.insertBefore(button, beforeRoute ? nav.querySelector(`[data-route="${beforeRoute}"]`) : null);
  }

  function ensureHeroButton(route, label, beforeRoute) {
    const actions = document.querySelector('#home-screen .hero-actions');
    if (!actions || actions.querySelector(`[data-route="${route}"]`)) return;
    const button = document.createElement('button');
    button.className = 'secondary-button';
    button.type = 'button';
    button.dataset.route = route;
    button.textContent = label;
    actions.insertBefore(button, beforeRoute ? actions.querySelector(`[data-route="${beforeRoute}"]`) : null);
  }

  function removeBlogFromMenu() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;

    nav.querySelectorAll('a, button, [data-route]').forEach((item) => {
      const route = (item.dataset?.route || '').trim().toLowerCase();
      const label = (item.textContent || '').trim().toLowerCase();
      const href = (item.getAttribute?.('href') || '').trim().toLowerCase();
      if (route === 'blog' || label === 'blog' || /(^|\/)blog(?:\/|$)/.test(href)) {
        item.remove();
      }
    });
  }

  function watchNavForBlog() {
    const nav = document.querySelector('.main-nav');
    if (!nav) return;
    removeBlogFromMenu();
    if (nav.dataset.vaeNoBlogObserver === '1') return;
    nav.dataset.vaeNoBlogObserver = '1';
    new MutationObserver(removeBlogFromMenu).observe(nav, { childList: true, subtree: true });
  }

  function ensureLightShell() {
    ensureNavButton('listening', 'Escucha', 'readings');
    ensureNavButton('writing', 'Escritura', 'readings');
    ensureHeroButton('listening', 'Practicar escucha', 'readings');
    ensureHeroButton('writing', 'Practicar escritura', 'readings');
    removeBlogFromMenu();
  }

  function applyGrammarImages() {
    const container = document.getElementById('home-grammar-items');
    if (!container) return false;
    [...container.querySelectorAll('.home-grammar-item')].slice(0,3).forEach((card,index) => {
      const circle = card.querySelector('.home-grammar-circle');
      if (!circle || circle.querySelector('img')) return;
      circle.classList.add('home-grammar-circle-image');
      circle.textContent = '';
      const img = document.createElement('img');
      img.className = 'home-grammar-circle-img';
      img.src = images[index] || images[0];
      img.alt = card.querySelector('.home-grammar-item-copy > strong')?.textContent?.trim() || 'Gramática do espanhol';
      img.loading = 'lazy';
      img.decoding = 'async';
      circle.appendChild(img);
    });
    return true;
  }

  function injectImageStyles() {
    if (document.getElementById('home-grammar-images-styles')) return;
    const style = document.createElement('style');
    style.id = 'home-grammar-images-styles';
    style.textContent = '.home-grammar-circle-image{overflow:hidden!important;padding:0!important;background:#fff9ed!important}.home-grammar-circle-img{width:100%;height:100%;display:block;object-fit:cover;border-radius:50%}';
    document.head.appendChild(style);
  }

  async function loadListening() {
    await loadScript('listening-area-loader', 'listening.js?v=20260823-0225');
    loadScript('listening-filters-loader', 'listening-filters.js?v=20260823-0225');
    await loadScript('listening-expanded-loader', 'listening-expanded.js?v=20260823-0225');
    loadScript('listening-expanded-fixes-loader', 'listening-expanded-fixes.js?v=20260823-0225');
  }

  async function loadWriting() {
    await loadScript('writing-area-loader', 'writing.js?v=20260823-0225');
    loadScript('writing-search-loader', 'writing-search.js?v=20260823-0225');
    loadScript('home-writing-card-loader', 'home-writing-card.js?v=20260823-0225');
  }

  async function loadReadingExpansion() {
    await loadScript('readings-casa-loader', 'readings-cuentos-casa.js?v=20260823-0225');
  }

  async function loadRoute(route) {
    if (route === 'listening') return loadListening();
    if (route === 'writing') return loadWriting();
    if (route === 'readings') return loadReadingExpansion();
  }

  function routeReady(route) {
    if (route === 'listening') return !!document.getElementById('listening-screen');
    if (route === 'writing') return !!document.getElementById('writing-screen') || !!document.querySelector('.writing-screen');
    return true;
  }

  function installRouteGate() {
    document.addEventListener('click', async (event) => {
      if (replaying) return;
      const target = event.target.closest?.('[data-route]');
      const route = target?.dataset?.route;
      if (!['listening','writing','readings'].includes(route)) return;
      if (routeReady(route)) {
        if (route === 'readings') loadReadingExpansion();
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
      target.classList.add('vae-route-loading');
      target.setAttribute('aria-busy','true');
      await loadRoute(route);
      target.classList.remove('vae-route-loading');
      target.removeAttribute('aria-busy');
      replaying = true;
      target.click();
      replaying = false;
    }, true);

    const prefetch = (event) => {
      const target = event.target.closest?.('[data-route]');
      const route = target?.dataset?.route;
      if (['listening','writing','readings'].includes(route)) loadRoute(route);
    };
    document.addEventListener('pointerover', prefetch, { passive:true });
    document.addEventListener('focusin', prefetch);
  }

  function openInitialLazyRoute() {
    const params = new URLSearchParams(location.search);
    let route = params.get('route');
    const path = location.pathname.replace(/\/+$/, '');
    if (!route && path.endsWith('/escucha')) route = 'listening';
    if (!route && path.endsWith('/escritura')) route = 'writing';
    if (!route && path.endsWith('/lectura')) route = 'readings';
    if (!['listening','writing','readings'].includes(route)) return;
    loadRoute(route).then(() => {
      const button = document.querySelector(`.main-nav [data-route="${route}"]`) || document.querySelector(`[data-route="${route}"]`);
      if (!button) return;
      replaying = true;
      button.click();
      replaying = false;
    });
  }

  function installImages(attempt=0) {
    injectImageStyles();
    if (!applyGrammarImages() && attempt < 28) return setTimeout(() => installImages(attempt+1), 220);
    const container = document.getElementById('home-grammar-items');
    if (container && !container.dataset.vaeImageObserver) {
      container.dataset.vaeImageObserver = '1';
      new MutationObserver(applyGrammarImages).observe(container,{childList:true});
    }
  }

  function loadHomeShowcaseNearViewport() {
    const target = document.querySelector('#home-screen .feature-grid');
    if (!target || typeof window.__vaeLoadQuizExtras !== 'function') return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      window.__vaeLoadQuizExtras().then(() => installImages()).catch(() => {});
    };
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        start();
      }
    }, { rootMargin: '180px 0px' });
    observer.observe(target);
  }

  function installHomeNewsletter() {
    loadScript('home-newsletter-loader', 'home-newsletter.js?v=20260823-1042');
    loadScript('home-game-order-loader', 'home-game-before-grammar.js?v=20260823-1042');
  }

  function install() {
    ensureLightShell();
    watchNavForBlog();
    installRouteGate();
    injectImageStyles();
    installHomeNewsletter();
    loadScript('grammar-dropdown-nav-loader', 'nav-grammar-dropdown.js?v=20260823-0225');
    openInitialLazyRoute();
    loadHomeShowcaseNearViewport();

    const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1400));
    idle(() => {
      loadScript('enhanced-footer-loader', 'footer-enhanced.js?v=20260823-0225')
        .then(() => loadScript('footer-menu-simple-loader', 'footer-menu-simple.js?v=20260823-0225'));
    }, { timeout: 3500 });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once:true });
  else install();
})();
