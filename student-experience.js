/* Camada leve de experiência da Área do Estudiante. Sem chamadas extras ao banco. */
(function(){
  const $=id=>document.getElementById(id);

  function rootPath(){
    return location.hostname.toLowerCase().endsWith('.github.io')?'/vamos-a-estudiar-espanol-espacio-de-practica/':'/';
  }

  function ensureStyles(){
    if($('student-experience-css'))return;
    const link=document.createElement('link');
    link.id='student-experience-css';
    link.rel='stylesheet';
    link.href=`${rootPath()}student-experience.css?v=20260823-1`;
    document.head.appendChild(link);
  }

  function buildOverview(){
    if($('student-learning-overview'))return $('student-learning-overview');
    const hero=document.querySelector('.student-hero');
    if(!hero)return null;
    hero.classList.add('student-hero-premium');

    const section=document.createElement('section');
    section.className='student-learning-overview';
    section.id='student-learning-overview';
    section.setAttribute('aria-labelledby','student-learning-title');
    section.innerHTML=`
      <div class="student-learning-overview-head">
        <div class="student-learning-copy">
          <p class="student-learning-kicker">Seu painel de aprendizagem</p>
          <h2 id="student-learning-title">Continue avançando no seu espanhol</h2>
          <p>Veja seu momento atual, retome a próxima atividade e acesse rapidamente cada parte do seu percurso Premium.</p>
        </div>
        <aside class="student-learning-primary" aria-label="Próximo passo recomendado">
          <small>Próximo passo recomendado</small>
          <strong id="student-next-title">Preparando sua recomendação…</strong>
          <span id="student-next-description">Organizando seu percurso de estudo.</span>
          <a id="student-next-action" href="#placement-summary">Continuar estudando →</a>
        </aside>
      </div>
      <div class="student-learning-stats" aria-label="Resumo do progresso">
        <div class="student-learning-stat"><span>Nível estimado</span><strong id="student-stat-level">—</strong></div>
        <div class="student-learning-stat"><span>Prática progressiva</span><strong id="student-stat-practice">—</strong></div>
        <div class="student-learning-stat"><span>Videoaulas</span><strong id="student-stat-video">—</strong></div>
        <div class="student-learning-stat"><span>Leituras</span><strong id="student-stat-reading">—</strong></div>
      </div>
      <div class="student-quick-nav" aria-label="Acessos rápidos">
        <a class="student-quick-link" href="#video-academy"><span class="student-quick-icon" aria-hidden="true">▶</span><span class="student-quick-copy"><strong>Español desde Cero</strong><span>Retomar videoaulas</span></span></a>
        <a class="student-quick-link" href="#grammar-hub"><span class="student-quick-icon" aria-hidden="true">Ñ</span><span class="student-quick-copy"><strong>Gramática</strong><span>Explicação + prática</span></span></a>
        <a class="student-quick-link" href="#listening-hub-title"><span class="student-quick-icon" aria-hidden="true">◉</span><span class="student-quick-copy"><strong>Escuta</strong><span>Compreensão auditiva</span></span></a>
        <a class="student-quick-link" href="#reading-classics"><span class="student-quick-icon" aria-hidden="true">Aa</span><span class="student-quick-copy"><strong>Leitura</strong><span>Literatura guiada</span></span></a>
      </div>`;
    hero.insertAdjacentElement('afterend',section);
    return section;
  }

  function buildSectionNav(){
    if($('student-section-nav'))return $('student-section-nav');
    const overview=$('student-learning-overview');
    if(!overview)return null;
    const nav=document.createElement('nav');
    nav.className='student-section-nav';
    nav.id='student-section-nav';
    nav.setAttribute('aria-label','Navegação da Área do Estudiante');
    nav.innerHTML=`
      <a href="#student-learning-overview">Visão geral</a>
      <a href="#placement-summary">Diagnóstico</a>
      <a href="#practice-path">Prática</a>
      <a href="#video-academy">Videoaulas</a>
      <a href="#grammar-hub">Gramática</a>
      <a href="#listening-hub-title">Escuta</a>
      <a href="#reading-classics">Leitura</a>
      <a href="#student-library-title">Biblioteca</a>`;
    overview.insertAdjacentElement('afterend',nav);
    return nav;
  }

  function text(id,fallback='—'){
    const value=$(id)?.textContent?.trim();
    return value||fallback;
  }

  function readingSummary(){
    const cards=document.querySelectorAll('.reading-classic-card');
    if(!cards.length)return 'Em preparação';
    const done=document.querySelectorAll('.reading-classic-progress.done').length;
    return `${done}/${cards.length} concluídas`;
  }

  function chooseRecommendation(){
    const level=text('placement-summary-level','?');
    const practiceTitle=text('practice-path-title-next','');
    const practiceMeta=text('practice-path-meta','');
    const practiceSection=$('practice-path');
    const nextTitle=$('student-next-title');
    const nextDescription=$('student-next-description');
    const nextAction=$('student-next-action');
    if(!nextTitle||!nextDescription||!nextAction)return;

    if(level==='?'||level==='—'){
      nextTitle.textContent='Descubra seu nível atual';
      nextDescription.textContent='Comece pelo diagnóstico A1–C2 para orientar o restante do percurso.';
      nextAction.href='#placement-summary';
      nextAction.textContent='Fazer nivelamento →';
      return;
    }

    if(practiceSection&&!practiceSection.classList.contains('done')&&practiceTitle&&practiceTitle!=='Carregando sua próxima atividade…'){
      nextTitle.textContent=practiceTitle;
      nextDescription.textContent=practiceMeta||'Sua próxima atividade progressiva está pronta.';
      nextAction.href='#practice-path';
      nextAction.textContent='Continuar prática →';
      return;
    }

    if($('grammar-hub')){
      nextTitle.textContent='Aprofunde um ponto de gramática';
      nextDescription.textContent='Revise a teoria e teste sua compreensão com uma atividade corrigida.';
      nextAction.href='#grammar-hub';
      nextAction.textContent='Estudar gramática →';
      return;
    }

    nextTitle.textContent='Continue seu percurso Premium';
    nextDescription.textContent='Escolha uma habilidade e retome seus estudos de onde parou.';
    nextAction.href='#student-section-nav';
    nextAction.textContent='Ver meu percurso →';
  }

  function refreshSummary(){
    const level=text('placement-summary-level','—');
    const practice=text('practice-path-progress-text','—');
    const video=text('video-series-progress-text','Em preparação');
    $('student-stat-level') && ($('student-stat-level').textContent=level==='?'?'Ainda não feito':level);
    $('student-stat-practice') && ($('student-stat-practice').textContent=practice.replace(' atividades concluídas',''));
    $('student-stat-video') && ($('student-stat-video').textContent=video);
    $('student-stat-reading') && ($('student-stat-reading').textContent=readingSummary());
    chooseRecommendation();
  }

  function installSmoothAnchors(){
    document.addEventListener('click',(event)=>{
      const link=event.target.closest('.student-quick-link,.student-section-nav a,.student-learning-primary a');
      if(!link)return;
      const href=link.getAttribute('href')||'';
      if(!href.startsWith('#'))return;
      const target=document.querySelector(href);
      if(!target)return;
      event.preventDefault();
      target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
    });
  }

  function boot(){
    ensureStyles();
    if(!buildOverview())return;
    buildSectionNav();
    installSmoothAnchors();
    refreshSummary();
    [600,1400,2800,4800].forEach(delay=>window.setTimeout(refreshSummary,delay));
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
