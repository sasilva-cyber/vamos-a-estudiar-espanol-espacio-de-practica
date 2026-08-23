/* Painel administrativo de métricas do Google Analytics 4. */
(function(){
  const panel=document.getElementById('admin-analytics-panel');
  if(!panel)return;

  const $=id=>document.getElementById(id);
  const nf=new Intl.NumberFormat('pt-BR');
  const pct=new Intl.NumberFormat('pt-BR',{style:'percent',maximumFractionDigits:1});
  let loading=false;

  function setStatus(message,type='info'){
    const el=$('admin-analytics-status');if(!el)return;
    el.textContent=message;el.className=`admin-analytics-status ${type}`;
  }
  function metric(id,value){const el=$(id);if(el)el.textContent=value;}
  function number(value){const n=Number(value||0);return Number.isFinite(n)?nf.format(n):'0';}
  function percent(value){const n=Number(value||0);return Number.isFinite(n)?pct.format(n):'—';}
  function clearMetrics(){['admin-analytics-visitors','admin-analytics-sessions','admin-analytics-views','admin-analytics-new-users','admin-analytics-realtime'].forEach(id=>metric(id,'—'));}

  async function requireAdminSession(){
    if(!window.VAEAuth?.getSession||!window.VAEAuth?.getClient)return null;
    const session=await window.VAEAuth.getSession();if(!session?.user)return null;
    const {data:profile,error}=await window.VAEAuth.getClient().from('profiles').select('role').eq('id',session.user.id).maybeSingle();
    if(error||profile?.role!=='admin')return null;
    return session;
  }

  function supabaseFunctionUrl(){
    const base=window.VAE_AUTH_CONFIG?.supabaseUrl||window.VAEAuth?.SUPABASE_URL||'';
    return base?`${base.replace(/\/$/,'')}/functions/v1/admin-analytics`:'';
  }

  function showConfig(missing=[]){
    const box=$('admin-analytics-config');if(!box)return;
    box.classList.remove('hidden');
    const list=$('admin-analytics-missing');if(list){list.replaceChildren();missing.forEach(name=>{const code=document.createElement('code');code.textContent=name;list.appendChild(code);});}
  }
  function hideConfig(){$('admin-analytics-config')?.classList.add('hidden');}

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

  function formatDate(raw){
    const s=String(raw||'');if(/^\d{8}$/.test(s)){const d=new Date(`${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6,8)}T12:00:00`);return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'2-digit'}).format(d);}return s||'—';
  }

  function renderPages(rows=[]){
    const body=$('admin-analytics-pages-body');if(!body)return;body.replaceChildren();
    if(!rows.length){body.innerHTML='<tr><td colspan="3"><div class="admin-analytics-empty">Nenhuma página encontrada.</div></td></tr>';return;}
    rows.slice(0,10).forEach(row=>{const tr=document.createElement('tr');const td1=document.createElement('td');const path=document.createElement('span');path.className='admin-analytics-path';path.textContent=row.path||'/';const title=document.createElement('span');title.className='admin-analytics-title';title.textContent=row.title||'Sem título';td1.append(path,title);const td2=document.createElement('td');td2.textContent=number(row.views);const td3=document.createElement('td');td3.textContent=number(row.users);tr.append(td1,td2,td3);body.appendChild(tr);});
  }

  function renderMiniList(hostId,rows,labelKey,valueKey){
    const host=$(hostId);if(!host)return;host.replaceChildren();
    if(!rows?.length){host.innerHTML='<div class="admin-analytics-empty">Sem dados.</div>';return;}
    const max=Math.max(1,...rows.map(r=>Number(r[valueKey]||0)));
    rows.slice(0,8).forEach(row=>{const wrap=document.createElement('div');wrap.className='admin-analytics-mini-row';const left=document.createElement('div');const strong=document.createElement('strong');strong.textContent=row[labelKey]||'Outros';const bar=document.createElement('div');bar.className='admin-analytics-bar';const fill=document.createElement('i');fill.style.width=`${Math.max(3,(Number(row[valueKey]||0)/max)*100)}%`;bar.appendChild(fill);left.append(strong,bar);const value=document.createElement('span');value.textContent=number(row[valueKey]);wrap.append(left,value);host.appendChild(wrap);});
  }

  function render(data){
    hideConfig();
    const o=data.overview||{};metric('admin-analytics-visitors',number(o.activeUsers));metric('admin-analytics-sessions',number(o.sessions));metric('admin-analytics-views',number(o.screenPageViews));metric('admin-analytics-new-users',number(o.newUsers));metric('admin-analytics-realtime',number(data.realtime?.activeUsers));
    const engagement=$('admin-analytics-engagement');if(engagement)engagement.textContent=`Taxa de engajamento: ${percent(o.engagementRate)}`;
    renderChart(data.daily||[]);renderPages(data.pages||[]);renderMiniList('admin-analytics-acquisition',data.acquisition||[],'channel','sessions');renderMiniList('admin-analytics-devices',data.devices||[],'device','users');
    const generated=data.generatedAt?new Date(data.generatedAt):null;setStatus(`Dados do Google Analytics 4 carregados${generated&&!Number.isNaN(generated.getTime())?` · atualizado às ${generated.toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}`:''}.`,'success');
  }

  async function load(){
    if(loading)return;loading=true;const refresh=$('admin-analytics-refresh');if(refresh){refresh.disabled=true;refresh.textContent='Atualizando…';}
    setStatus('Consultando o Google Analytics 4…','info');
    try{
      const session=await requireAdminSession();if(!session){setStatus('Aguardando validação da conta administrativa…','info');return;}
      const url=supabaseFunctionUrl();if(!url)throw new Error('URL do Supabase não configurada.');
      const days=Math.max(7,Math.min(90,Number($('admin-analytics-period')?.value||30)));
      const response=await fetch(`${url}?days=${days}`,{headers:{Authorization:`Bearer ${session.access_token}`,Accept:'application/json'}});
      const data=await response.json().catch(()=>({}));
      if(response.status===403)throw new Error('A função recusou o acesso: conta sem permissão administrativa.');
      if(!response.ok)throw new Error(data?.error||'Não foi possível consultar o Analytics.');
      if(data.configured===false){clearMetrics();showConfig(data.missing||[]);setStatus(data.message||'O painel está pronto, mas a conexão com o GA4 ainda precisa ser configurada.','info');return;}
      render(data);
    }catch(error){console.error('Falha no painel de Analytics',error);clearMetrics();setStatus(error?.message||'Não foi possível carregar os dados de Analytics.','error');}
    finally{loading=false;if(refresh){refresh.disabled=false;refresh.textContent='Atualizar dados';}}
  }

  $('admin-analytics-refresh')?.addEventListener('click',load);
  $('admin-analytics-period')?.addEventListener('change',load);

  async function boot(){
    for(let i=0;i<30;i++){if(window.VAEAuth?.getSession){break;}await new Promise(r=>setTimeout(r,150));}
    await load();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
