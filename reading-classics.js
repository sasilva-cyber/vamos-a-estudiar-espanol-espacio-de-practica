/* Prática Premium de leitura com clássicos em espanhol. */
(function(){
  const READINGS = [
    {
      id:'lorca-la-guitarra', level:'A1', kind:'Poesía guiada', title:'La guitarra', work:'Poema del cante jondo',
      intro:'Uma leitura curta para reconhecer imagens, substantivos e emoções básicas. O exercício trabalha compreensão literal e a personificação da guitarra.',
      excerpt:'Empieza el llanto de la guitarra. Se rompen las copas de la madrugada.',
      glossary:[['llanto','choro, pranto'],['guitarra','violão / guitarra'],['copas','taças; aqui, imagem poética'],['madrugada','período antes do amanhecer']],
      questions:[
        {q:'O que começa no primeiro verso?', options:['O canto de um pássaro','O choro da guitarra','Uma festa','Uma viagem'], a:1},
        {q:'“Madrugada” indica qual momento?', options:['Antes do amanhecer','Ao meio-dia','No fim da tarde','Depois do almoço'], a:0},
        {q:'A guitarra é apresentada como se pudesse…', options:['correr','dormir','chorar','cozinhar'], a:2}
      ]
    },
    {
      id:'lorca-cancion-jinete', level:'A2', kind:'Poesía guiada', title:'Canción del jinete', work:'Canciones',
      intro:'Uma leitura para praticar lugar, deslocamento e futuro. O poema constrói uma sensação de distância e destino inevitável.',
      excerpt:'Córdoba. Lejana y sola. Jaca negra, luna grande, y aceitunas en mi alforja. Aunque sepa los caminos, yo nunca llegaré a Córdoba.',
      glossary:[['lejana','distante'],['jaca','égua pequena / cavalo de sela'],['alforja','bolsa dupla usada em viagens'],['llegaré','chegarei']],
      questions:[
        {q:'Como Córdoba é descrita?', options:['Próxima e cheia','Lejana y sola','Clara e alegre','Pequena e verde'], a:1},
        {q:'O que o eu lírico leva na alforja?', options:['Livros','Pão','Aceitunas','Flores'], a:2},
        {q:'Qual ideia domina o final do trecho?', options:['Chegada garantida','Incerteza de horário','Impossibilidade de chegar','Desejo de voltar para casa'], a:2}
      ]
    },
    {
      id:'lorca-baladilla-rios', level:'B1', kind:'Poesía y paisaje', title:'Baladilla de los tres ríos', work:'Poema del cante jondo',
      intro:'Uma leitura de paisagem andaluza para relacionar vocabulário natural, geografia e contraste poético entre Sevilla e Granada.',
      excerpt:'El río Guadalquivir va entre naranjos y olivos. Los dos ríos de Granada bajan de la nieve al trigo.',
      glossary:[['naranjos','laranjeiras'],['olivos','oliveiras'],['nieve','neve'],['trigo','trigo']],
      questions:[
        {q:'Por quais elementos passa o Guadalquivir?', options:['Naranjos y olivos','Pinos y montañas','Casas y puentes','Rosas y trigo'], a:0},
        {q:'Os rios de Granada descem…', options:['do mar à cidade','da neve ao trigo','da noite ao dia','do bosque à praia'], a:1},
        {q:'O trecho combina principalmente…', options:['Paisagem e movimento','Humor e diálogo','Receita e instrução','Notícia e opinião'], a:0}
      ]
    },
    {
      id:'lorca-romance-sonambulo', level:'B2', kind:'Poesía simbólica', title:'Romance sonámbulo', work:'Romancero gitano',
      intro:'Uma leitura de nível intermediário-avançado para observar repetição, cor simbólica e construção de atmosfera.',
      excerpt:'Verde que te quiero verde. Verde viento. Verdes ramas. El barco sobre la mar y el caballo en la montaña.',
      glossary:[['ramas','galhos'],['mar','mar'],['caballo','cavalo'],['montaña','montanha']],
      questions:[
        {q:'Qual palavra estrutura a repetição do trecho?', options:['Mar','Verde','Caballo','Montaña'], a:1},
        {q:'Que efeito a repetição de “verde” produz?', options:['Cria uma atmosfera simbólica insistente','Explica uma regra gramatical','Indica uma lista cronológica','Elimina a ambiguidade do poema'], a:0},
        {q:'Quais dois espaços aparecem em contraste?', options:['Cidade e campo','Mar e montanha','Casa e escola','Praça e igreja'], a:1}
      ]
    },
    {
      id:'lorca-la-aurora', level:'C1', kind:'Poesía urbana', title:'La aurora de Nueva York', work:'Poeta en Nueva York',
      intro:'Uma leitura avançada para interpretar metáforas densas e o contraste entre a ideia tradicional de amanhecer e uma cidade hostil.',
      excerpt:'La aurora de Nueva York tiene cuatro columnas de cieno y un huracán de negras palomas que chapotean las aguas podridas.',
      glossary:[['aurora','amanhecer'],['cieno','lama, lodo'],['chapotear','bater / brincar na água, espirrando'],['podridas','podres']],
      questions:[
        {q:'A imagem da aurora é construída como…', options:['Luminosa e pastoral','Hostil e degradada','Romântica e doméstica','Neutra e científica'], a:1},
        {q:'“Cieno” e “aguas podridas” reforçam uma sensação de…', options:['Pureza','Celebração','Degradação','Calma'], a:2},
        {q:'O contraste central do trecho opõe…', options:['A expectativa de renovação da aurora a imagens sombrias da cidade','O campo espanhol à praia','A juventude à infância','A música ao silêncio'], a:0}
      ]
    },
    {
      id:'lorca-doncella-dialogo', level:'B2', kind:'Lectura teatral · bonus', title:'La doncella, el marinero y el estudiante', work:'Diálogos',
      intro:'Leitura bônus baseada no texto enviado para a plataforma. Aqui o foco é reconhecer ritmo de diálogo, jogo de palavras e caracterização das personagens.',
      excerpt:'A, B, C, D. ¿Con qué letra me quedaré? Marinero empieza con M, y estudiante empieza con E.',
      glossary:[['quedarse con','escolher / ficar com'],['marinero','marinheiro'],['estudiante','estudante'],['letra','letra do alfabeto']],
      questions:[
        {q:'O trecho organiza o jogo verbal a partir de…', options:['Cores','Letras do alfabeto','Horas do dia','Nomes de cidades'], a:1},
        {q:'“Marinero” é associado a qual letra?', options:['E','D','M','A'], a:2},
        {q:'A forma dialogada aproxima o texto principalmente de…', options:['Teatro','Notícia','Receita','Carta formal'], a:0}
      ]
    }
  ];

  let section=null, modal=null, active=null, progress=new Map(), activeLevel='all';

  function track(name, params={}){try{if(typeof window.vaeTrack==='function')window.vaeTrack(name,params);else if(typeof window.gtag==='function')window.gtag('event',name,params);}catch(_){}}

  async function loadProgress(){
    try{
      const session=await window.VAEAuth?.getSession?.();
      if(!session?.user?.id||!window.VAEAuth?.getClient)return;
      const supabase=window.VAEAuth.getClient();
      const {data,error}=await supabase.from('reading_classics_progress').select('reading_id,attempts,best_score,completed');
      if(error)throw error;
      progress=new Map((data||[]).map(row=>[row.reading_id,row]));
    }catch(error){console.warn('Não foi possível carregar o progresso de leitura',error);progress=new Map();}
  }

  function buildSection(){
    if(document.getElementById('reading-classics'))return document.getElementById('reading-classics');
    const listening=document.querySelector('.listening-hub');
    const libraryTitle=document.getElementById('student-library-title');
    const library=libraryTitle?.closest('section');
    const anchor=listening||library;
    if(!anchor)return null;
    const node=document.createElement('section');
    node.id='reading-classics';
    node.className='student-section reading-classics';
    node.setAttribute('data-premium-section','');
    node.setAttribute('aria-labelledby','reading-classics-title');
    node.innerHTML=`
      <div class="reading-classics-head">
        <div class="reading-classics-copy">
          <p class="student-section-kicker">Leitura exclusiva · Clásicos en español</p>
          <h2 id="reading-classics-title">Práctica de lectura con García Lorca</h2>
          <p>Leia trechos selecionados, consulte o glossário e responda atividades de compreensão organizadas por nível. Seu melhor resultado fica salvo na sua conta.</p>
        </div>
        <span class="reading-classics-badge">A1 → C1</span>
      </div>
      <div class="reading-level-filters" role="group" aria-label="Filtrar leituras por nível">
        ${['all','A1','A2','B1','B2','C1'].map(v=>`<button class="reading-level-filter${v==='all'?' active':''}" type="button" data-reading-level="${v}">${v==='all'?'Todos':v}</button>`).join('')}
      </div>
      <div class="reading-classics-grid" id="reading-classics-grid" aria-live="polite"></div>
      <div class="reading-classics-note">Seleções didáticas com foco em leitura guiada. A leitura teatral bônus foi preparada a partir do material de Federico García Lorca enviado para esta área.</div>`;
    if(listening) listening.insertAdjacentElement('afterend',node); else library?.insertAdjacentElement('beforebegin',node);
    return node;
  }

  function render(){
    if(!section)return;
    const grid=section.querySelector('#reading-classics-grid');
    if(!grid)return;
    grid.replaceChildren();
    const list=activeLevel==='all'?READINGS:READINGS.filter(r=>r.level===activeLevel);
    list.forEach(item=>{
      const p=progress.get(item.id);
      const card=document.createElement('article'); card.className='reading-classic-card';
      const top=document.createElement('div'); top.className='reading-classic-top';
      const level=document.createElement('span'); level.className='reading-classic-level'; level.textContent=item.level;
      const status=document.createElement('span'); status.className=`reading-classic-progress${p?.completed?' done':''}`; status.textContent=p?.completed?`Concluída · ${p.best_score}%`:p?`Melhor: ${p.best_score}%`:'Nova leitura';
      top.append(level,status);
      const kicker=document.createElement('p'); kicker.className='reading-classic-kicker'; kicker.textContent=item.kind;
      const title=document.createElement('h3'); title.textContent=item.title;
      const desc=document.createElement('p'); desc.textContent=item.intro;
      const meta=document.createElement('div'); meta.className='reading-classic-meta'; [item.work,'Glossário','3 questões'].forEach(v=>{const s=document.createElement('span');s.textContent=v;meta.appendChild(s);});
      const btn=document.createElement('button'); btn.className='reading-classic-action'; btn.type='button'; btn.textContent=p?.completed?'Revisar leitura →':'Ler e praticar →'; btn.addEventListener('click',()=>openReading(item));
      card.append(top,kicker,title,desc,meta,btn); grid.appendChild(card);
    });
  }

  function ensureModal(){
    if(modal)return modal;
    modal=document.createElement('div'); modal.id='reading-classics-modal'; modal.className='reading-modal'; modal.setAttribute('role','dialog'); modal.setAttribute('aria-modal','true');
    modal.innerHTML='<div class="reading-modal-shell"><div class="reading-modal-head"><div><p id="reading-modal-kicker"></p><h3 id="reading-modal-title"></h3></div><button class="reading-modal-close" type="button" aria-label="Fechar leitura">×</button></div><div class="reading-modal-body" id="reading-modal-body"></div></div>';
    document.body.appendChild(modal);
    modal.querySelector('.reading-modal-close')?.addEventListener('click',closeModal);
    modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});
    return modal;
  }

  function openReading(item){
    active=item; const m=ensureModal();
    m.querySelector('#reading-modal-kicker').textContent=`${item.level} · ${item.kind}`;
    m.querySelector('#reading-modal-title').textContent=item.title;
    const body=m.querySelector('#reading-modal-body');
    body.innerHTML=`
      <p class="reading-context">${item.intro}</p>
      <blockquote class="reading-excerpt">${item.excerpt}</blockquote>
      <small class="reading-source">Federico García Lorca · ${item.work} · trecho selecionado para prática didática</small>
      <section class="reading-glossary" aria-labelledby="reading-glossary-title"><h4 class="reading-section-title" id="reading-glossary-title">Glossário de vocabulário</h4><div class="reading-glossary-grid">${item.glossary.map(([w,m])=>`<div class="reading-glossary-item"><strong>${w}</strong><span>${m}</span></div>`).join('')}</div></section>
      <section class="reading-questions" aria-labelledby="reading-questions-title"><h4 class="reading-section-title" id="reading-questions-title">Prática de compreensão</h4>${item.questions.map((q,i)=>`<div class="reading-question"><strong>${i+1}. ${q.q}</strong><div class="reading-options">${q.options.map((o,j)=>`<label class="reading-option"><input type="radio" name="reading-q-${i}" value="${j}"><span>${o}</span></label>`).join('')}</div></div>`).join('')}</section>
      <div class="reading-submit-row"><div class="reading-result" id="reading-result">Responda às 3 questões e confira seu resultado.</div><button class="reading-submit" id="reading-submit" type="button">Corrigir atividade →</button></div>`;
    body.querySelector('#reading-submit')?.addEventListener('click',submitReading);
    m.classList.add('open'); document.body.style.overflow='hidden';
    track('premium_reading_open',{reading_id:item.id,level:item.level,title:item.title});
  }

  function closeModal(){if(!modal)return;modal.classList.remove('open');document.body.style.overflow='';active=null;}

  async function submitReading(){
    if(!active||!modal)return;
    const body=modal.querySelector('#reading-modal-body'); const result=body.querySelector('#reading-result'); const button=body.querySelector('#reading-submit');
    const answers=active.questions.map((_,i)=>body.querySelector(`input[name="reading-q-${i}"]:checked`)?.value);
    if(answers.some(v=>v===undefined)){result.textContent='Responda a todas as questões antes de corrigir.';result.className='reading-result retry';return;}
    const correct=active.questions.reduce((sum,q,i)=>sum+(Number(answers[i])===q.a?1:0),0); const score=Math.round((correct/active.questions.length)*100); const completed=score>=70;
    result.textContent=completed?`Muito bem: ${correct}/3 respostas corretas · ${score}%. Leitura concluída.`:`Você acertou ${correct}/3 · ${score}%. Revise o trecho e tente novamente.`;
    result.className=`reading-result ${completed?'success':'retry'}`;
    button.disabled=true; button.textContent='Salvando…';
    try{await saveProgress(active.id,score,completed); track('premium_reading_complete',{reading_id:active.id,level:active.level,score,completed});}
    catch(error){console.warn('Não foi possível salvar o resultado de leitura',error);} finally{button.disabled=false;button.textContent=completed?'Atividade corrigida ✓':'Tentar novamente →';render();}
  }

  async function saveProgress(readingId,score,completed){
    const session=await window.VAEAuth?.getSession?.(); const userId=session?.user?.id; if(!userId||!window.VAEAuth?.getClient)return;
    const current=progress.get(readingId)||{attempts:0,best_score:0,completed:false};
    const row={user_id:userId,reading_id:readingId,attempts:Number(current.attempts||0)+1,best_score:Math.max(Number(current.best_score||0),score),completed:Boolean(current.completed||completed),last_completed_at:(current.completed||completed)?new Date().toISOString():null,updated_at:new Date().toISOString()};
    const supabase=window.VAEAuth.getClient(); const {error}=await supabase.from('reading_classics_progress').upsert(row,{onConflict:'user_id,reading_id'}); if(error)throw error;
    progress.set(readingId,row);
  }

  function installFilters(){section.querySelectorAll('[data-reading-level]').forEach(btn=>btn.addEventListener('click',()=>{activeLevel=btn.dataset.readingLevel||'all';section.querySelectorAll('[data-reading-level]').forEach(b=>b.classList.toggle('active',b===btn));render();track('premium_reading_filter',{level:activeLevel});}));}

  async function boot(){section=buildSection();if(!section)return;installFilters();await loadProgress();render();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
