/* Painel administrativo de estatísticas internas do site via Supabase. */
(function(){
  const $=id=>document.getElementById(id);
  const nf=new Intl.NumberFormat('pt-BR');
  let loading=false;

  function rootPath(){
    return location.hostname.toLowerCase().endsWith('.github.io')?'/vamos-a-estudiar-espanol-espacio-de-practica/':'/';
  }

  function ensureStyles(){
    if(document.getElementById('admin-analytics-css'))return;
    const link=document.createElement('link');
    link.id='admin-analytics-css';link.rel='stylesheet';link.href=`${rootPath()}admin-analytics.css?v=20260823-2`;
    document.head.appendChild(link);
  }

  function buildPanel(){
    if($('admin-analytics-panel'))return $('admin-analytics-panel');
    const subscriptions=$('admin-subscriptions-panel');
    const adminContent=$('admin-content');
    if(!subscriptions||!adminContent)return null;

    const panel=document.createElement('section');
    panel.className='admin-analytics-panel';
    panel.id='admin-analytics-panel';
    panel.setAttribute('aria-labelledby','admin-analytics-title');
    panel.innerHTML=`
      <div class="admin-analytics-head">
        <div>
          <h2 id="admin-analytics-title">Estatísticas do site</h2>
          <p>Acompanhe os acessos diretamente pela plataforma: visitantes, sessões, visualizações, páginas mais acessadas, origem do tráfego e dispositivos.</p>
        </div>
        <div class="admin-analytics-actions">
          <select class="admin-analytics-period" id="admin-analytics-period" aria-label="Período das estatísticas">
            <option value="7">Últimos 7 dias</option>
            <option value="30" selected>Últimos 30 dias</option>
            <option value="90">Últimos 90 dias</option>
          </select>
          <button class="admin-analytics-refresh" id="admin-analytics-refresh" type="button">Atualizar dados</button>
        </div>
      </div>
      <div class="admin-analytics-source"><span class="admin-analytics-source-dot" aria-hidden="true"></span><span>Fonte: estatísticas internas da própria plataforma · Supabase</span></div>
      <div class="admin-analytics-metrics" aria-label="Resumo do tráfego">
        <article class="admin-analytics-metric"><span>Visitantes</span><strong id="admin-analytics-visitors">—</strong><small>Pessoas identificadas de forma anônima no período</small></article>
        <article class="admin-analytics-metric"><span>Sessões</span><strong id="admin-analytics-sessions">—</strong><small>Visitas iniciadas no site</small></article>
        <article class="admin-analytics-metric"><span>Visualizações</span><strong id="admin-analytics-views">—</strong><small>Páginas visualizadas</small></article>
        <article class="admin-analytics-metric"><span>Novos visitantes</span><strong id="admin-analytics-new-users">—</strong><small>Primeiro acesso registrado no período</small></article>
        <article class="admin-analytics-metric realtime"><span>Ativos agora</span><strong id="admin-analytics-realtime">—</strong><small>Atividade nos últimos 10 minutos</small></article>
      </div>
      <p class="admin-analytics-status info" id="admin-analytics-status" role="status" aria-live="polite">Preparando as estatísticas internas…</p>
      <div class="admin-analytics-grid">
        <article class="admin-analytics-card">
          <h3>Evolução das visualizações</h3>
          <p id="admin-analytics-engagement">Visualizações por dia no período selecionado.</p>
          <div class="admin-analytics-chart" id="admin-analytics-chart" aria-label="Gráfico de visualizações por dia"></div>
          <div class="admin-analytics-chart-labels" id="admin-analytics-chart-labels"></div>
        </article>
        <article class="admin-analytics-card">
          <h3>Origem dos acessos</h3>
          <p>Sessões agrupadas pela origem da primeira entrada na visita.</p>
          <div class="admin-analytics-mini-list" id="admin-analytics-acquisition"></div>
        </article>
      </div>
      <div class="admin-analytics-bottom">
        <article class="admin-analytics-card">
          <h3>Páginas mais acessadas</h3>
          <p>Conteúdos que mais receberam visualizações no período.</p>
          <div class="admin-analytics-table-wrap">
            <table class="admin-analytics-table">
              <thead><tr><th>Página</th><th>Visualizações</th><th>Visitantes</th></tr></thead>
              <tbody id="admin-analytics-pages-body"><tr><td colspan="3"><div class="admin-analytics-empty">Carregando…</div></td></tr></tbody>
            </table>
          </div>
        </article>
        <article class="admin-analytics-card">
          <h3>Dispositivos</h3>
          <p>Como os visitantes acessam a plataforma.</p>
          <div class="admin-analytics-mini-list" id="admin-analytics-devices"></div>
        </article>
        <article class="admin-analytics-card">
          <h3>Perfil dos acessos</h3>
          <p>Novos, recorrentes, autenticados e anônimos.</p>
          <div class="admin-analytics-mini-list" id="admin-analytics-profile"></div>
        </article>
      </div>`;
    subscriptions.insertAdjacentElement('beforebegin',panel);
    return panel;
  }

  function setStatus(message,type='info'){
    const el=$('admin-analytics-status');if(!el)return;
    el.textContent=message;el.className=`admin-analytics-status ${type}`;
  }
  function metric(id,value){const el=$(id);if(el)el.textContent=value;}
  function number(value){const n=Number(value||0);return Number.isFinite(n)?nf.format(n):'0';}
  function clearMetrics(){['admin-analytics-visitors','admin-analytics-sessions','admin-analytics-views','admin-analytics-new-users','admin-analytics-realtime'].forEach(id=>metric(id,'—'));}

  async function requireAdminSession(){
    if(!window.VAEAuth?.getSession||!window.VAEAuth?.getClient)return null;
    const session=await window.VAEAuth.getSession();if(!session?.user)return null;
    const {data:profile,error}=await window.VAEAuth.getClient().from('profiles').select('role').eq('id',session.user.id).maybeSingle();
    if(error||profile?.role!=='admin')return null;
    return session;
  }

  function formatDate(raw){
    const s=String(raw||'');
    if(/^\d{4}-\d{2}-\d{2}$/.test(s)){
      const [y,m,d]=s.split('-').map(Number);
      return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'2-digit'}).format(new Date(y,m-1,d,12));
    }
    return s||'—';
  }

  function renderChart(rows=[]){
    const host=$('admin-analytics-chart');const labels=$('admin-analytics-chart-labels');if(!host||!labels)return;
    host.replaceChildren();labels.replaceChildren();
    if(!rows.length){host.innerHTML='<div class="admin-analytics-empty">Ainda não há dados para o período selecionado.</div>';return;}
    const values=rows.map(r=>Number(r.views||0));const max=Math.max(1,...values);
    const w=900,h=250,padX=24,padY=20,innerW=w-padX*2,innerH=h-padY*2;
    const ns='http://www.w3.org/2000/svg';const svg=document.createElementNS(ns,'svg');svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.setAttribute('preserveAspectRatio','none');
    const grid=document.createElementNS(ns,'g');grid.setAttribute('class','admin-analytics-chart-grid');
    [0,.25,.5,.75,1].forEach(t=>{const line=document.createElementNS(ns,'line');const y=padY+innerH*t;line.setAttribute('x1',padX);line.setAttribute('x2',w-padX);line.setAttribute('y1',y);line.setAttribute('y2',y);grid.appendChild(line);});svg.appendChild(grid);
    const points=rows.map((r,i)=>{const x=padX+(rows.length===1?innerW/2:(i/(rows.length-1))*innerW);const y=padY+innerH-(Number(r.views||0)/max)*innerH;return{x,y,row:r};});
    const area=document.createElementNS(ns,'path');area.setAttribute('class','admin-analytics-chart-area');area.setAttribute('d',`M ${points[0].x} ${h-padY} `+points.map(p=>`L ${p.x} ${p.y}`).join(' ')+` L ${points[points.length-1].x} ${h-padY} Z`);svg.appendChild(area);
    const line=document.createElementNS(ns,'polyline');line.setAttribute('class','admin-analytics-chart-line');line.setAttribute('points',points.map(p=>`${p.x},${p.y}`).join(' '));svg.appendChild(line);
    points.forEach((p,i)=>{if(rows.length<=14||i%Math.ceil(rows.length/14)===0||i===rows.length-1){const c=document.createElementNS(ns,'circle');c.setAttribute('class','admin-analytics-chart-dot');c.setAttribute('cx',p.x);c.setAttribute('cy',p.y);c.setAttribute('r','4');const title=document.createElementNS(ns,'title');title.textContent=`${formatDate(p.row.date)} · ${number(p.row.views)} visualizações`;c.appendChild(title);svg.appendChild(c);}});
    host.appendChild(svg);
    const indexes=[0,Math.floor((rows.length-1)/2),rows.length-1];indexes.forEach(i=>{const span=document.createElement('span');span.textContent=formatDate(rows[i]?.date);labels.appendChild(span);});
  }

  function renderPages(rows=[]){
    const body=$('admin-analytics-pages-body');if(!body)return;body.replaceChildren();
    if(!rows.length){body.innerHTML='<tr><td colspan="3"><div class="admin-analytics-empty">Nenhuma página registrada ainda.</div></td></tr>';return;}
    rows.slice(0,10).forEach(row=>{const tr=document.createElement('tr');const td1=document.createElement('td');const path=document.createElement('span');path.className='admin-analytics-path';path.textContent=row.path||'/';const title=document.createElement('span');title.className='admin-analytics-title';title.textContent=row.title||'Sem título';td1.append(path,title);const td2=document.createElement('td');td2.textContent=number(row.views);const td3=document.createElement('td');td3.textContent=number(row.visitors);tr.append(td1,td2,td3);body.appendChild(tr);});
  }

  function renderMiniList(hostId,rows,labelKey,valueKey){
    const host=$(hostId);if(!host)return;host.replaceChildren();
    if(!rows?.length){host.innerHTML='<div class="admin-analytics-empty">Sem dados ainda.</div>';return;}
    const max=Math.max(1,...rows.map(r=>Number(r[valueKey]||0)));
    rows.slice(0,10).forEach(row=>{const wrap=document.createElement('div');wrap.className='admin-analytics-mini-row';const left=document.createElement('div');const strong=document.createElement('strong');strong.textContent=row[labelKey]||'Outros';const bar=document.createElement('div');bar.className='admin-analytics-bar';const fill=document.createElement('i');fill.style.width=`${Math.max(3,(Number(row[valueKey]||0)/max)*100)}%`;bar.appendChild(fill);left.append(strong,bar);const value=document.createElement('span');value.textContent=number(row[valueKey]);wrap.append(left,value);host.appendChild(wrap);});
  }

  function render(data){
    const o=data?.overview||{};
    metric('admin-analytics-visitors',number(o.visitors));
    metric('admin-analytics-sessions',number(o.sessions));
    metric('admin-analytics-views',number(o.views));
    metric('admin-analytics-new-users',number(o.newVisitors));
    metric('admin-analytics-realtime',number(data?.realtime?.activeVisitors));
    renderChart(data?.daily||[]);
    renderPages(data?.pages||[]);
    renderMiniList('admin-analytics-acquisition',data?.sources||[],'source','sessions');
    renderMiniList('admin-analytics-devices',data?.devices||[],'device','visitors');
    renderMiniList('admin-analytics-profile',[
      {label:'Novos visitantes',value:o.newVisitors||0},
      {label:'Visitantes recorrentes',value:o.returningVisitors||0},
      {label:'Com conta / autenticados',value:o.authenticatedVisitors||0},
      {label:'Anônimos',value:o.anonymousVisitors||0}
    ],'label','value');
    const generated=data?.generatedAt?new Date(data.generatedAt):null;
    setStatus(`Estatísticas internas carregadas${generated&&!Number.isNaN(generated.getTime())?` · atualizado às ${generated.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`:''}. A contagem começou após a instalação deste painel.`,'success');
  }

  async function load(){
    if(loading)return;loading=true;
    const refresh=$('admin-analytics-refresh');if(refresh){refresh.disabled=true;refresh.textContent='Atualizando…';}
    setStatus('Consultando as estatísticas internas do site…','info');
    try{
      const session=await requireAdminSession();if(!session){setStatus('Aguardando validação da conta administrativa…','info');return;}
      const days=Math.max(7,Math.min(90,Number($('admin-analytics-period')?.value||30)));
      const {data,error}=await window.VAEAuth.getClient().rpc('get_site_analytics',{p_days:days});
      if(error)throw error;
      render(data||{});
    }catch(error){console.error('Falha nas estatísticas internas',error);clearMetrics();setStatus('Não foi possível carregar as estatísticas agora. Atualize a página e tente novamente.','error');}
    finally{loading=false;if(refresh){refresh.disabled=false;refresh.textContent='Atualizar dados';}}
  }

  async function boot(){
    ensureStyles();
    for(let i=0;i<40&&!buildPanel();i++)await new Promise(r=>setTimeout(r,100));
    if(!$('admin-analytics-panel'))return;
    $('admin-analytics-refresh')?.addEventListener('click',load);
    $('admin-analytics-period')?.addEventListener('change',load);
    for(let i=0;i<40&&!window.VAEAuth?.getSession;i++)await new Promise(r=>setTimeout(r,100));
    await load();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
