/* Últimos vídeos gratuitos do canal, carregados automaticamente via Supabase. */
(function () {
  const root = window.__VAE_ROOT__ || (location.hostname.toLowerCase().endsWith('.github.io') ? '/vamos-a-estudiar-espanol-espacio-de-practica/' : '/');
  const API_URL = 'https://clfwoywzalttkvhstsgh.supabase.co/functions/v1/youtube-latest';
  const CHANNEL_URL = 'https://www.youtube.com/@vamosaestudiarespanol';
  let section = null;
  let loading = false;
  let loaded = false;

  function track(eventName, params = {}) {
    try {
      if (typeof window.vaeTrack === 'function') window.vaeTrack(eventName, params);
      else if (typeof window.gtag === 'function') window.gtag('event', eventName, params);
    } catch (_) {}
  }

  function loadStyles() {
    if (document.getElementById('home-youtube-css')) return;
    const link = document.createElement('link');
    link.id = 'home-youtube-css';
    link.rel = 'stylesheet';
    link.href = `${root}home-youtube.css?v=20260823-1612`;
    document.head.appendChild(link);
  }

  function formatDate(value) {
    const date = new Date(value || '');
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date).replace('.', '');
  }

  function skeletons() {
    return Array.from({ length: 3 }, () => '<div class="home-youtube-skeleton" aria-hidden="true"><div class="home-youtube-skeleton-media"></div><div class="home-youtube-skeleton-copy"></div></div>').join('');
  }

  function ensureModal() {
    let modal = document.getElementById('home-youtube-modal');
    if (modal) return modal;
    modal = document.createElement('div');
    modal.id = 'home-youtube-modal';
    modal.className = 'home-youtube-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Vídeo do YouTube');
    modal.innerHTML = `
      <div class="home-youtube-modal-shell">
        <div class="home-youtube-modal-stage">
          <button class="home-youtube-close" type="button" aria-label="Fechar vídeo">×</button>
          <iframe id="home-youtube-frame" title="Vídeo do Vamos a Estudiar Español" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
        <div class="home-youtube-modal-info">
          <h3 id="home-youtube-modal-title">Vídeo</h3>
          <a id="home-youtube-modal-link" href="${CHANNEL_URL}" target="_blank" rel="noopener noreferrer">Abrir no YouTube →</a>
        </div>
      </div>`;
    document.body.appendChild(modal);
    const close = () => closeModal();
    modal.querySelector('.home-youtube-close')?.addEventListener('click', close);
    modal.addEventListener('click', (event) => { if (event.target === modal) close(); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('open')) close(); });
    return modal;
  }

  function openModal(video) {
    const modal = ensureModal();
    const frame = modal.querySelector('#home-youtube-frame');
    const title = modal.querySelector('#home-youtube-modal-title');
    const link = modal.querySelector('#home-youtube-modal-link');
    if (title) title.textContent = video.title || 'Vídeo';
    if (link) link.href = video.url || CHANNEL_URL;
    if (frame) frame.src = `${video.embed_url || ''}${String(video.embed_url || '').includes('?') ? '&' : '?'}autoplay=1`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    track('youtube_video_open', { video_id: video.id || '', video_title: video.title || '', location: 'home' });
  }

  function closeModal() {
    const modal = document.getElementById('home-youtube-modal');
    if (!modal) return;
    const frame = modal.querySelector('#home-youtube-frame');
    if (frame) frame.removeAttribute('src');
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function createSection(grammarSection) {
    if (document.getElementById('home-youtube-showcase')) return document.getElementById('home-youtube-showcase');
    section = document.createElement('section');
    section.id = 'home-youtube-showcase';
    section.className = 'home-youtube-showcase';
    section.setAttribute('aria-labelledby', 'home-youtube-title');
    section.innerHTML = `
      <div class="home-youtube-head">
        <div class="home-youtube-head-copy">
          <p class="eyebrow">No YouTube · Conteúdo gratuito</p>
          <h2 id="home-youtube-title">Continue aprendendo em vídeo</h2>
          <p>Assista às publicações mais recentes do Vamos a Estudiar Español. Esta seleção se atualiza automaticamente quando um novo vídeo é publicado no canal.</p>
        </div>
        <span class="home-youtube-auto"><span class="home-youtube-auto-dot" aria-hidden="true"></span>Atualização automática</span>
      </div>
      <div class="home-youtube-grid" id="home-youtube-grid" aria-live="polite">${skeletons()}</div>
      <div class="home-youtube-footer">
        <a class="home-youtube-channel" href="${CHANNEL_URL}" target="_blank" rel="noopener noreferrer">Ver todos os vídeos no YouTube →</a>
      </div>`;
    grammarSection.insertAdjacentElement('afterend', section);
    section.querySelector('.home-youtube-channel')?.addEventListener('click', () => track('youtube_channel_click', { location: 'home' }));
    track('youtube_section_view', { location: 'home' });
    return section;
  }

  function renderVideos(videos) {
    if (!section) return;
    const grid = section.querySelector('#home-youtube-grid');
    if (!grid) return;
    if (!Array.isArray(videos) || !videos.length) {
      grid.innerHTML = '<div class="home-youtube-state"><strong>Nenhum vídeo encontrado agora.</strong>Você ainda pode acessar o canal diretamente pelo botão abaixo.</div>';
      return;
    }

    grid.replaceChildren();
    videos.slice(0, 3).forEach((video, index) => {
      const article = document.createElement('article');
      article.className = 'home-youtube-card';

      const thumb = document.createElement('button');
      thumb.className = 'home-youtube-thumb';
      thumb.type = 'button';
      thumb.setAttribute('aria-label', `Assistir ${video.title}`);
      const img = document.createElement('img');
      img.src = video.thumbnail_url;
      img.alt = video.title || 'Miniatura do vídeo';
      img.loading = 'lazy';
      img.decoding = 'async';
      const play = document.createElement('span');
      play.className = 'home-youtube-play';
      play.setAttribute('aria-hidden', 'true');
      play.textContent = '▶';
      thumb.append(img, play);
      if (index === 0) {
        const latest = document.createElement('span');
        latest.className = 'home-youtube-new';
        latest.textContent = 'Mais recente';
        thumb.appendChild(latest);
      }
      thumb.addEventListener('click', () => openModal(video));

      const copy = document.createElement('div');
      copy.className = 'home-youtube-card-copy';
      const kicker = document.createElement('p');
      kicker.className = 'home-youtube-kicker';
      kicker.textContent = 'YouTube · Gratuito';
      const title = document.createElement('h3');
      title.textContent = video.title || 'Vídeo';
      const date = document.createElement('span');
      date.className = 'home-youtube-date';
      date.textContent = video.published_at ? `Publicado em ${formatDate(video.published_at)}` : 'Conteúdo gratuito';
      const actions = document.createElement('div');
      actions.className = 'home-youtube-actions';
      const watch = document.createElement('button');
      watch.className = 'home-youtube-watch';
      watch.type = 'button';
      watch.textContent = 'Assistir aqui →';
      watch.addEventListener('click', () => openModal(video));
      const external = document.createElement('a');
      external.className = 'home-youtube-external';
      external.href = video.url || CHANNEL_URL;
      external.target = '_blank';
      external.rel = 'noopener noreferrer';
      external.textContent = 'YouTube ↗';
      external.addEventListener('click', () => track('youtube_video_external_click', { video_id: video.id || '', location: 'home' }));
      actions.append(watch, external);
      copy.append(kicker, title, date, actions);
      article.append(thumb, copy);
      grid.appendChild(article);
    });
  }

  function renderError() {
    if (!section) return;
    const grid = section.querySelector('#home-youtube-grid');
    if (!grid) return;
    grid.innerHTML = '<div class="home-youtube-state"><strong>Não foi possível carregar os vídeos agora.</strong>A seção tenta novamente automaticamente quando a página é recarregada.<br><button class="home-youtube-retry" type="button">Tentar novamente</button></div>';
    grid.querySelector('.home-youtube-retry')?.addEventListener('click', () => loadVideos(true));
  }

  async function loadVideos(force = false) {
    if (loading || (loaded && !force)) return;
    loading = true;
    if (force) {
      loaded = false;
      const grid = section?.querySelector('#home-youtube-grid');
      if (grid) grid.innerHTML = skeletons();
    }
    try {
      const response = await fetch(API_URL, { method: 'GET', headers: { Accept: 'application/json' } });
      if (!response.ok) throw new Error(`youtube ${response.status}`);
      const data = await response.json();
      renderVideos(data?.videos || []);
      loaded = true;
    } catch (error) {
      console.warn('Falha ao carregar vídeos do YouTube', error);
      renderError();
      track('youtube_section_error', { location: 'home' });
    } finally {
      loading = false;
    }
  }

  function observeLoad() {
    if (!section) return;
    if (!('IntersectionObserver' in window)) return void loadVideos();
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        loadVideos();
      }
    }, { rootMargin: '220px 0px' });
    observer.observe(section);
  }

  function installWhenGrammarExists() {
    const grammar = document.getElementById('home-grammar-showcase');
    if (grammar) {
      loadStyles();
      createSection(grammar);
      observeLoad();
      return true;
    }
    return false;
  }

  function install() {
    if (!document.getElementById('home-screen')) return;
    if (installWhenGrammarExists()) return;
    const home = document.getElementById('home-screen');
    if (!home) return;
    const observer = new MutationObserver(() => {
      if (installWhenGrammarExists()) observer.disconnect();
    });
    observer.observe(home, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
})();
