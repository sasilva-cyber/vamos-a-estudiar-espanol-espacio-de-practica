/* Paginação da Práctica de lectura: 3 cards por página. */
(function(){
  const PAGE_SIZE=3;
  let currentPage=1;
  let grid=null;
  let controls=null;
  let scheduled=false;

  function track(name,params={}){
    try{
      if(typeof window.vaeTrack==='function')window.vaeTrack(name,params);
      else if(typeof window.gtag==='function')window.gtag('event',name,params);
    }catch(_){ }
  }

  function ensureControls(){
    if(!grid)return null;
    if(controls&&controls.isConnected)return controls;
    controls=document.createElement('nav');
    controls.className='reading-pagination';
    controls.setAttribute('aria-label','Paginação das leituras');
    controls.innerHTML=`
      <button class="reading-page-btn reading-page-prev" type="button" aria-label="Página anterior">← Página anterior</button>
      <span class="reading-page-status" aria-live="polite"></span>
      <button class="reading-page-btn reading-page-next" type="button" aria-label="Próxima página">Próxima página →</button>`;
    grid.insertAdjacentElement('afterend',controls);
    controls.querySelector('.reading-page-prev')?.addEventListener('click',()=>changePage(currentPage-1));
    controls.querySelector('.reading-page-next')?.addEventListener('click',()=>changePage(currentPage+1));
    return controls;
  }

  function getCards(){
    return grid?Array.from(grid.querySelectorAll(':scope > .reading-classic-card')):[];
  }

  function renderPage(){
    scheduled=false;
    if(!grid||!grid.isConnected)return;
    const cards=getCards();
    const totalPages=Math.max(1,Math.ceil(cards.length/PAGE_SIZE));
    currentPage=Math.min(Math.max(currentPage,1),totalPages);
    const start=(currentPage-1)*PAGE_SIZE;
    const end=start+PAGE_SIZE;

    cards.forEach((card,index)=>{
      const visible=index>=start&&index<end;
      card.hidden=!visible;
      card.setAttribute('aria-hidden',visible?'false':'true');
    });

    const nav=ensureControls();
    if(!nav)return;
    nav.hidden=cards.length<=PAGE_SIZE;
    const prev=nav.querySelector('.reading-page-prev');
    const next=nav.querySelector('.reading-page-next');
    const status=nav.querySelector('.reading-page-status');
    if(prev)prev.disabled=currentPage===1;
    if(next)next.disabled=currentPage===totalPages;
    if(status)status.textContent=`Página ${currentPage} de ${totalPages}`;
  }

  function scheduleRender(){
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(renderPage);
  }

  function changePage(page){
    if(!grid)return;
    const cards=getCards();
    const totalPages=Math.max(1,Math.ceil(cards.length/PAGE_SIZE));
    const nextPage=Math.min(Math.max(page,1),totalPages);
    if(nextPage===currentPage)return;
    currentPage=nextPage;
    renderPage();
    const section=document.getElementById('reading-classics');
    section?.scrollIntoView({behavior:'smooth',block:'start'});
    track('premium_reading_page_change',{page:currentPage,total_pages:totalPages});
  }

  function attachGrid(target){
    if(!target||target===grid)return;
    grid=target;
    currentPage=1;
    const observer=new MutationObserver(()=>scheduleRender());
    observer.observe(grid,{childList:true});
    scheduleRender();
  }

  function discover(){
    const target=document.getElementById('reading-classics-grid');
    if(target)attachGrid(target);
  }

  document.addEventListener('click',event=>{
    const filter=event.target.closest?.('.reading-level-filter');
    if(!filter)return;
    currentPage=1;
    setTimeout(scheduleRender,0);
  },true);

  const pageObserver=new MutationObserver(()=>discover());
  pageObserver.observe(document.documentElement,{childList:true,subtree:true});

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',discover,{once:true});
  else discover();
})();