/* Carregamento sob demanda dos módulos centrais. Nada pesado é baixado por hover/ociosidade na home. */
(function () {
  const root = window.__VAE_ROOT__ || (location.hostname.toLowerCase().endsWith('.github.io') ? '/vamos-a-estudiar-espanol-espacio-de-practica/' : '/');
  const loads = new Map();
  let replaying = false;

  function loadScript(id, file) {
    if (loads.has(id)) return loads.get(id);
    const existing = document.getElementById(id);
    if (existing?.dataset.loaded === 'true') return Promise.resolve(existing);

    const promise = new Promise((resolve, reject) => {
      const script = existing || document.createElement('script');
      const done = () => { script.dataset.loaded = 'true'; resolve(script); };
      const fail = () => { loads.delete(id); reject(new Error(`Falha ao carregar ${file}`)); };
      if (!existing) {
        script.id = id;
        script.src = root + file;
        script.async = true;
        document.head.appendChild(script);
      }
      if (script.dataset.loaded === 'true') done();
      else {
        script.addEventListener('load', done, { once:true });
        script.addEventListener('error', fail, { once:true });
      }
    });
    loads.set(id, promise);
    return promise;
  }

  function loaded(route) {
    try {
      if (route === 'grammar') return typeof grammarLessons !== 'undefined';
      if (route === 'vocabulary') return typeof vocabularyData !== 'undefined';
      if (route === 'readings') return typeof readingData !== 'undefined';
    } catch (_) {}
    return false;
  }

  function ensureModule(route) {
    if (loaded(route)) return Promise.resolve();
    if (route === 'grammar') return loadScript('grammar-core-lazy', 'grammar.js?v=20260825-perf1');
    if (route === 'vocabulary') return loadScript('vocabulary-core-lazy', 'vocabulary.js?v=20260825-perf1');
    if (route === 'readings') return loadScript('readings-core-lazy', 'readings.js?v=20260825-perf1');
    return Promise.resolve();
  }

  async function loadQuizEnhancements() {
    await Promise.allSettled([ensureModule('grammar'), ensureModule('vocabulary')]);
    await loadScript('quiz-activities-lazy', 'quiz-activities.js?v=20260825-perf1');
    window.dispatchEvent(new Event('vae:content-counts-changed'));
  }

  window.__vaeEnsureModule = ensureModule;
  window.__vaeLoadQuizExtras = loadQuizEnhancements;

  function setBusy(el, busy) {
    if (!el) return;
    el.classList.toggle('vae-route-loading', busy);
    if (busy) el.setAttribute('aria-busy', 'true');
    else el.removeAttribute('aria-busy');
  }

  document.addEventListener('click', async (event) => {
    if (replaying) return;
    const target = event.target.closest?.('[data-route]');
    const route = target?.dataset?.route;

    if (route === 'quiz') {
      loadQuizEnhancements().catch(() => {});
      return;
    }
    if (!['grammar','vocabulary','readings'].includes(route) || loaded(route)) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    setBusy(target, true);
    try {
      await ensureModule(route);
      setBusy(target, false);
      replaying = true;
      target.click();
      replaying = false;
    } catch (_) {
      setBusy(target, false);
    }
  }, true);

  function initialRoute() {
    const params = new URLSearchParams(location.search);
    let route = params.get('route');
    const path = location.pathname.replace(/\/+$/, '');
    if (!route && path.endsWith('/gramatica')) route = 'grammar';
    if (!route && path.endsWith('/vocabulario')) route = 'vocabulary';
    if (!route && path.endsWith('/lectura')) route = 'readings';
    if (!route && path.endsWith('/quiz')) route = 'quiz';

    if (route === 'quiz') {
      loadQuizEnhancements().catch(() => {});
      return;
    }
    if (!['grammar','vocabulary','readings'].includes(route)) return;

    ensureModule(route).then(() => {
      const button = document.querySelector(`.main-nav [data-route="${route}"]`) || document.querySelector(`[data-route="${route}"]`);
      if (!button) return;
      replaying = true;
      button.click();
      replaying = false;
    }).catch(() => {});
  }

  initialRoute();
})();