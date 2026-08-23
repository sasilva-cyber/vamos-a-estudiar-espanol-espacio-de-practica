/* Fluxo Premium: leitura guiada -> confirmação -> atividade. */
(function(){
  const LIBRARY={
    'lorca-la-guitarra':{
      level:'A1',genre:'Poesía guiada',title:'La guitarra',author:'Federico García Lorca',work:'Poema del cante jondo',
      intro:'Uma leitura adaptada para reconhecer emoções, sons e imagens simples antes de responder à atividade.',
      focus:[['Observe','palavras que indicam som e emoção'],['Perceba','como um objeto pode receber características humanas'],['Procure','a ideia de tristeza que percorre o texto']],
      paragraphs:[
        'Na noite silenciosa, uma guitarra começa a tocar. Seu som parece um <span class="rg-highlight">llanto</span>, como se o instrumento pudesse sentir tristeza e expressá-la por meio da música.',
        'As notas continuam e ocupam o ambiente. Quem escuta percebe que a guitarra não é apresentada apenas como um objeto: ela se transforma em uma voz que comunica uma emoção profunda.',
        'A imagem da <span class="rg-highlight">madrugada</span> reforça o clima de silêncio e solidão. A leitura convida o leitor a imaginar o som, a noite e a sensação provocada pela música.'
      ],
      vocab:[['llanto','choro, pranto'],['guitarra','violão / guitarra'],['madrugada','período antes do amanhecer'],['sonido','som']],
      questions:[
        {q:'Na adaptação, o som da guitarra é comparado principalmente a…',o:['uma festa','um choro','uma conversa','uma viagem'],a:1},
        {q:'A guitarra é apresentada como se pudesse…',o:['sentir e expressar emoção','cozinhar','viajar sozinha','escrever cartas'],a:0},
        {q:'A madrugada contribui para criar um ambiente de…',o:['barulho e movimento','silêncio e solidão','humor e festa','pressa e trânsito'],a:1}
      ],source:'Adaptação didática produzida para a plataforma a partir de temas e imagens do poema.'
    },
    'lorca-cancion-jinete':{
      level:'A2',genre:'Poesía guiada',title:'Canción del jinete',author:'Federico García Lorca',work:'Canciones',
      intro:'Uma leitura adaptada para trabalhar deslocamento, distância e a ideia de um destino difícil de alcançar.',
      focus:[['Observe','palavras de lugar e movimento'],['Compare','o caminho conhecido com a chegada incerta'],['Identifique','como a distância influencia o tom do texto']],
      paragraphs:[
        'Um viajante segue por uma estrada em direção a Córdoba. Ele conhece os caminhos e leva consigo elementos simples da viagem, mas a cidade permanece <span class="rg-highlight">lejana</span>.',
        'O cavalo avança enquanto a paisagem noturna acompanha o percurso. Mesmo sabendo para onde ir, o viajante sente que chegar não depende apenas de conhecer a rota.',
        'A ideia central é paradoxal: existe um caminho, mas a chegada parece impossível. Essa tensão entre movimento e impossibilidade dá ao texto uma sensação de destino inevitável.'
      ],
      vocab:[['lejano/a','distante'],['camino','caminho'],['jinete','cavaleiro'],['llegar','chegar']],
      questions:[
        {q:'O viajante se dirige a qual cidade?',o:['Sevilla','Madrid','Córdoba','Granada'],a:2},
        {q:'Qual contraste organiza a adaptação?',o:['Conhecer o caminho e não conseguir chegar','Dormir e acordar','Falar e escrever','Comprar e vender'],a:0},
        {q:'“Lejana” significa…',o:['próxima','distante','barulhenta','pequena'],a:1}
      ],source:'Adaptação didática produzida para a plataforma a partir do poema.'
    },
    'lorca-baladilla-rios':{
      level:'B1',genre:'Poesía y paisaje',title:'Baladilla de los tres ríos',author:'Federico García Lorca',work:'Poema del cante jondo',
      intro:'Uma leitura adaptada para relacionar paisagem, movimento dos rios e imagens da Andaluzia.',
      focus:[['Localize','elementos naturais da paisagem'],['Relacione','rio, vegetação e movimento'],['Perceba','o contraste entre diferentes espaços andaluzes']],
      paragraphs:[
        'Na paisagem andaluza, o Guadalquivir percorre terras marcadas por <span class="rg-highlight">naranjos</span> e olivos. O rio funciona como uma linha que atravessa o espaço e conecta diferentes lugares.',
        'Em Granada, outros rios descem das áreas frias em direção às zonas de cultivo. A passagem da neve ao trigo cria uma imagem de transformação da paisagem.',
        'A leitura aproxima geografia e poesia: os rios não aparecem apenas como acidentes naturais, mas como elementos que organizam memória, movimento e identidade regional.'
      ],
      vocab:[['naranjo','laranjeira'],['olivo','oliveira'],['nieve','neve'],['trigo','trigo']],
      questions:[
        {q:'Quais árvores aparecem associadas ao Guadalquivir?',o:['Pinos e cedros','Naranjos e olivos','Palmeiras e cocos','Carvalhos e faias'],a:1},
        {q:'O movimento dos rios de Granada é descrito como uma passagem…',o:['da neve ao trigo','do mar ao deserto','da cidade à praia','da noite ao porto'],a:0},
        {q:'A adaptação relaciona principalmente…',o:['paisagem e identidade regional','receita e alimentação','trânsito e tecnologia','escola e trabalho'],a:0}
      ],source:'Adaptação didática produzida para a plataforma a partir do poema.'
    },
    'lorca-romance-sonambulo':{
      level:'B2',genre:'Poesía simbólica',title:'Romance sonámbulo',author:'Federico García Lorca',work:'Romancero gitano',
      intro:'Uma leitura adaptada para observar repetição, cor simbólica e construção de atmosfera.',
      focus:[['Observe','a insistência da cor verde'],['Interprete','como uma cor pode ultrapassar o sentido literal'],['Compare','espaços de mar e montanha']],
      paragraphs:[
        'A cor <span class="rg-highlight">verde</span> domina a paisagem e reaparece de modo insistente. Ela não descreve apenas objetos: passa a funcionar como uma marca emocional e simbólica.',
        'A cena aproxima elementos que pertencem a espaços diferentes, como o mar e a montanha. Essa combinação produz uma atmosfera estranha, quase de sonho.',
        'Na leitura simbólica, o verde pode sugerir desejo, expectativa, vida ou inquietação. O mais importante não é escolher um único significado, mas perceber como a repetição modifica a sensação do leitor.'
      ],
      vocab:[['rama','galho'],['mar','mar'],['montaña','montanha'],['inquietud','inquietação']],
      questions:[
        {q:'Qual elemento estrutura a adaptação?',o:['a cor verde','um relógio','uma carta','uma cidade moderna'],a:0},
        {q:'A repetição da cor produz principalmente…',o:['uma atmosfera simbólica insistente','uma regra gramatical','uma lista cronológica','uma explicação científica'],a:0},
        {q:'Quais espaços aparecem aproximados?',o:['mar e montanha','escola e hospital','praça e aeroporto','campo e fábrica'],a:0}
      ],source:'Adaptação didática produzida para a plataforma a partir do poema.'
    },
    'lorca-la-aurora':{
      level:'C1',genre:'Poesía urbana',title:'La aurora de Nueva York',author:'Federico García Lorca',work:'Poeta en Nueva York',
      intro:'Uma leitura adaptada para interpretar imagens urbanas densas e a inversão da ideia tradicional de amanhecer.',
      focus:[['Questione','a expectativa positiva ligada à aurora'],['Observe','imagens de sujeira e opressão'],['Interprete','a cidade como experiência humana e social']],
      paragraphs:[
        'O amanhecer costuma representar começo, luz e renovação. Nesta leitura, porém, a chegada do dia aparece deformada por imagens pesadas, escuras e desagradáveis.',
        'A cidade não desperta de maneira luminosa. Ela surge marcada por <span class="rg-highlight">cieno</span>, água suja e movimentos agressivos. O contraste quebra a expectativa de uma aurora tranquila.',
        'A paisagem urbana pode ser entendida como crítica: o espaço moderno, em vez de libertar, produz sensação de desgaste e desumanização. A força do texto está justamente na oposição entre “amanhecer” e “degradação”.'
      ],
      vocab:[['aurora','amanhecer'],['cieno','lama, lodo'],['degradación','degradação'],['deshumanización','desumanização']],
      questions:[
        {q:'Qual expectativa tradicional é invertida?',o:['a aurora como renovação','a noite como descanso','o campo como trabalho','o mar como viagem'],a:0},
        {q:'As imagens de lodo e sujeira reforçam uma sensação de…',o:['degradação','celebração','leveza','neutralidade'],a:0},
        {q:'A cidade é interpretada principalmente como…',o:['um espaço de desgaste e crítica','uma paisagem turística ideal','um cenário cômico','uma descrição científica'],a:0}
      ],source:'Adaptação didática produzida para a plataforma a partir de imagens e temas do poema.'
    },
    'lorca-doncella-dialogo':{
      level:'B2',genre:'Lectura teatral',title:'La doncella, el marinero y el estudiante',author:'Federico García Lorca',work:'Diálogos',
      intro:'Uma leitura adaptada para reconhecer ritmo de diálogo, escolha, jogo verbal e caracterização de personagens.',
      focus:[['Acompanhe','quem fala em cada momento'],['Observe','o jogo com letras e palavras'],['Perceba','como as escolhas revelam as personagens']],
      paragraphs:[
        'Uma jovem se encontra diante de duas figuras: um marinheiro e um estudante. O diálogo se constrói de forma leve e teatral, com perguntas, respostas rápidas e jogos de linguagem.',
        'Em determinado momento, as próprias palavras se transformam em brincadeira: <span class="rg-highlight">marinero</span> e estudiante são associados às letras iniciais de seus nomes. O jogo verbal ajuda a construir ritmo e expectativa.',
        'Mais do que contar uma sequência de acontecimentos, a cena depende da fala. É pelo diálogo que o leitor percebe hesitação, curiosidade e a relação entre as personagens.'
      ],
      vocab:[['doncella','jovem / donzela'],['marinero','marinheiro'],['estudiante','estudante'],['quedarse con','escolher / ficar com']],
      questions:[
        {q:'A forma predominante da adaptação é…',o:['dialogada e teatral','jornalística','científica','instrucional'],a:0},
        {q:'O jogo verbal utiliza principalmente…',o:['letras e palavras','datas históricas','números romanos','cores de bandeiras'],a:0},
        {q:'A caracterização das personagens acontece sobretudo por meio…',o:['das falas','de gráficos','de notas de rodapé','de mapas'],a:0}
      ],source:'Adaptação didática baseada no material de García Lorca enviado para a área de leitura.'
    },
    'cervantes-la-gitanilla':{
      level:'B2',genre:'Novela corta',title:'La Gitanilla',author:'Miguel de Cervantes Saavedra',work:'Novelas ejemplares',
      intro:'Uma leitura guiada adaptada do arquivo enviado, com foco na apresentação de Preciosa e no vocabulário do espanhol clássico.',
      focus:[['Observe','como o narrador caracteriza Preciosa'],['Compare','aparência, habilidade e inteligência'],['Atenção','a palavras cujo sentido mudou no espanhol moderno']],
      paragraphs:[
        'Preciosa é apresentada como uma jovem que se destaca no grupo em que vive. Ela dança e canta com habilidade, mas o narrador insiste também em sua inteligência e em sua maneira cuidadosa de falar.',
        'A personagem chama atenção porque reúne qualidades que surpreendem aqueles que a observam. Sua <span class="rg-highlight">discreción</span>, no sentido clássico, aproxima-se de prudência, inteligência e capacidade de julgamento — não apenas de silêncio ou reserva.',
        'Quando Preciosa chega a Madrid, sua presença desperta curiosidade. A música, a dança e sua forma de responder às pessoas constroem uma imagem de autonomia e vivacidade.',
        'Na leitura guiada, é importante perceber que a voz do narrador pertence a outro período histórico. Algumas representações sociais do texto original devem ser lidas criticamente, considerando o contexto de produção da obra.'
      ],
      vocab:[['bailadora','dançarina'],['discreción','prudência e inteligência no uso clássico'],['donaire','graça, elegância ao agir ou falar'],['crianza','criação / educação recebida']],
      questions:[
        {q:'A adaptação caracteriza Preciosa principalmente como…',o:['habilidosa e inteligente','passiva e silenciosa','doente e isolada','sem interesse por música'],a:0},
        {q:'No contexto clássico, “discreción” se aproxima de…',o:['prudência e inteligência','medo','pressa','tristeza'],a:0},
        {q:'Qual atitude de leitura é recomendada diante das representações sociais da obra?',o:['Lê-las criticamente em seu contexto histórico','Ignorar o contexto','Considerá-las atuais sem análise','Evitar qualquer interpretação'],a:0}
      ],source:'Adaptação didática baseada no PDF “Miguel de Cervantes Saavedra - La Gitanilla.pdf” enviado à conversa.'
    },
    'cervantes-casamiento-enganoso':{
      level:'C1',genre:'Novela ejemplar',title:'El casamiento engañoso',author:'Miguel de Cervantes Saavedra',work:'Novelas ejemplares',
      intro:'Uma leitura avançada adaptada do arquivo enviado, com foco em ironia, relato pessoal e consequências do engano.',
      focus:[['Perceba','o tom irônico do narrador-personagem'],['Observe','o jogo entre casamento, cansaço e sofrimento'],['Avalie','como a experiência é reconstruída depois dos acontecimentos']],
      paragraphs:[
        'Campuzano aparece debilitado depois de sair de um hospital. Ao encontrar um conhecido, começa a explicar que sua condição está relacionada a uma experiência de casamento que terminou de maneira dolorosa.',
        'Ao contar o que aconteceu, ele mistura sofrimento físico e arrependimento. A linguagem ganha força irônica quando aproxima <span class="rg-highlight">casamiento</span> e cansancio, transformando a lembrança do matrimônio em comentário amargo sobre suas consequências.',
        'O relato é retrospectivo: Campuzano já conhece o resultado dos acontecimentos e reconstrói sua própria história a partir dessa experiência. Por isso, sua voz combina explicação, exagero, humor e autocrítica.',
        'A leitura exige atenção ao narrador: ele não é uma voz neutra. É alguém que seleciona fatos e organiza o episódio de modo a produzir um efeito sobre quem o escuta.'
      ],
      vocab:[['flaqueza','fraqueza'],['traspié','tropeço'],['convaleciente','quem se recupera de uma doença'],['arrepentimiento','arrependimento']],
      questions:[
        {q:'Campuzano conta os fatos de que perspectiva?',o:['Depois de conhecer as consequências','Antes do casamento','Como narrador totalmente neutro','Como testemunha sem participação'],a:0},
        {q:'A aproximação entre casamento e cansaço produz um efeito de…',o:['ironia','descrição geográfica','explicação jurídica','neutralidade'],a:0},
        {q:'A voz de Campuzano combina principalmente…',o:['relato, humor e autocrítica','receita e instrução','notícia e estatística','mapa e cronologia'],a:0}
      ],source:'Adaptação didática baseada no PDF “CASAMIENTO ENGAÑOSO.pdf” enviado à conversa.'
    }
  };

  const $=id=>document.getElementById(id);
  let supabase=null,user=null,item=null,progress=null;

  function track(name,params={}){try{if(typeof window.vaeTrack==='function')window.vaeTrack(name,params);else if(typeof window.gtag==='function')window.gtag('event',name,params);}catch(_){}}
  function escapeHtml(value){return String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}

  function showError(title,message){
    $('reading-guide-loading')?.classList.add('hidden');
    const box=$('reading-guide-error'); if(!box)return;
    box.innerHTML=`<h2>${escapeHtml(title)}</h2><p>${escapeHtml(message)}</p><p><a href="../">← Voltar para a Área do Estudiante</a></p>`;
    box.classList.remove('hidden'); $('reading-guide-main')?.removeAttribute('aria-busy');
  }

  async function hasPremiumAccess(){
    const [{data:profile},{data:subs}]=await Promise.all([
      supabase.from('profiles').select('role').eq('id',user.id).maybeSingle(),
      supabase.from('membership_subscriptions').select('status,current_period_end').eq('user_id',user.id).order('updated_at',{ascending:false}).limit(5)
    ]);
    if(profile?.role==='admin')return true;
    return (subs||[]).some(row=>['authorized','active','approved'].includes(String(row.status||'').toLowerCase())&&(!row.current_period_end||new Date(row.current_period_end)>new Date()));
  }

  function renderMeta(){
    $('reading-guide-eyebrow').textContent=`${item.genre} · ${item.author}`;
    $('reading-guide-title').textContent=item.title;
    $('reading-guide-intro').textContent=item.intro;
    $('reading-guide-level').textContent=item.level;
    const meta=$('reading-guide-meta'); meta.replaceChildren();
    [item.author,item.work,'Texto adaptado','Glossário'].forEach(text=>{const s=document.createElement('span');s.textContent=text;meta.appendChild(s);});
  }

  function renderReading(){
    const focus=$('reading-guide-focus'); focus.replaceChildren();
    item.focus.forEach(([label,text])=>{const div=document.createElement('div');div.className='reading-guide-focus-item';div.innerHTML=`<strong>${escapeHtml(label)}</strong><span>${escapeHtml(text)}</span>`;focus.appendChild(div);});
    const article=$('reading-guide-text'); article.innerHTML=item.paragraphs.map(p=>`<p>${p}</p>`).join('')+`<small class="reading-guide-source-note">${escapeHtml(item.source)}</small>`;
    const vocab=$('reading-guide-vocabulary-grid'); vocab.replaceChildren();
    item.vocab.forEach(([word,meaning])=>{const div=document.createElement('div');div.className='reading-guide-word';div.innerHTML=`<strong>${escapeHtml(word)}</strong><span>${escapeHtml(meaning)}</span>`;vocab.appendChild(div);});
  }

  function renderQuestions(){
    const wrap=$('reading-activity-questions');wrap.replaceChildren();
    item.questions.forEach((q,i)=>{
      const box=document.createElement('div');box.className='reading-question';
      const strong=document.createElement('strong');strong.textContent=`${i+1}. ${q.q}`;box.appendChild(strong);
      const options=document.createElement('div');options.className='reading-options';
      q.o.forEach((text,j)=>{const label=document.createElement('label');label.className='reading-option';const input=document.createElement('input');input.type='radio';input.name=`q-${i}`;input.value=String(j);const span=document.createElement('span');span.textContent=text;label.append(input,span);options.appendChild(label);});
      box.appendChild(options);wrap.appendChild(box);
    });
  }

  function unlockActivity(scroll=false){
    $('reading-step-read')?.classList.add('done');
    $('reading-step-activity')?.classList.add('active');
    $('reading-guide-status').textContent='Leitura concluída';$('reading-guide-status').classList.add('done');
    $('reading-activity-status').textContent='Liberada';$('reading-activity-status').classList.add('done');
    $('reading-activity-panel')?.classList.remove('locked');
    $('reading-activity-lock')?.classList.add('hidden');
    $('reading-activity-form')?.classList.remove('hidden');
    $('reading-guide-check').checked=true;$('reading-guide-check').disabled=true;
    const btn=$('reading-guide-complete');btn.disabled=true;btn.textContent='Leitura concluída ✓';
    $('reading-guide-confirm-help').textContent='Sua confirmação foi salva. Agora faça a atividade.';
    if(scroll)$('reading-activity-panel')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  async function markRead(){
    const btn=$('reading-guide-complete');btn.disabled=true;btn.textContent='Salvando leitura…';
    try{
      const now=new Date().toISOString();
      const {error}=await supabase.from('reading_classics_progress').upsert({user_id:user.id,reading_id:new URLSearchParams(location.search).get('reading'),read_completed_at:now,updated_at:now},{onConflict:'user_id,reading_id'});
      if(error)throw error;
      progress={...(progress||{}),read_completed_at:now};
      track('premium_guided_reading_complete',{reading_id:new URLSearchParams(location.search).get('reading'),level:item.level,title:item.title});
      unlockActivity(true);
    }catch(error){console.error(error);btn.disabled=false;btn.textContent='Concluí a leitura · liberar atividade →';$('reading-guide-confirm-help').textContent='Não foi possível salvar agora. Tente novamente.';}
  }

  async function submitActivity(event){
    event.preventDefault();
    if(!progress?.read_completed_at){$('reading-activity-result').textContent='Conclua a leitura antes de responder à atividade.';return;}
    const answers=item.questions.map((_,i)=>document.querySelector(`input[name="q-${i}"]:checked`)?.value);
    const result=$('reading-activity-result');
    if(answers.some(v=>v===undefined)){result.className='reading-activity-result retry';result.textContent='Responda a todas as questões antes de corrigir.';return;}
    const correct=item.questions.reduce((sum,q,i)=>sum+(Number(answers[i])===q.a?1:0),0);
    const score=Math.round(correct/item.questions.length*100);const completed=score>=70;
    const attempts=(progress?.attempts||0)+1;const best=Math.max(progress?.best_score||0,score);const now=new Date().toISOString();
    try{
      const {error}=await supabase.from('reading_classics_progress').upsert({user_id:user.id,reading_id:new URLSearchParams(location.search).get('reading'),attempts,best_score:best,completed:(progress?.completed||completed),last_completed_at:completed?now:(progress?.last_completed_at||null),read_completed_at:progress.read_completed_at,updated_at:now},{onConflict:'user_id,reading_id'});
      if(error)throw error;
      progress={...(progress||{}),attempts,best_score:best,completed:(progress?.completed||completed),last_completed_at:completed?now:progress?.last_completed_at};
      result.className=`reading-activity-result ${completed?'success':'retry'}`;
      result.textContent=completed?`${correct}/${item.questions.length} respostas corretas · ${score}%. Atividade concluída!`:`${correct}/${item.questions.length} respostas corretas · ${score}%. Revise o texto e tente novamente.`;
      if(completed)$('reading-guide-finish')?.classList.remove('hidden');
      track('premium_reading_complete',{reading_id:new URLSearchParams(location.search).get('reading'),level:item.level,score,completed});
    }catch(error){console.error(error);result.className='reading-activity-result retry';result.textContent='Não foi possível salvar seu resultado agora. Tente novamente.';}
  }

  async function boot(){
    if(!window.VAEAuth?.isConfigured?.()){showError('Leitura indisponível','A Área do Estudiante ainda não está configurada.');return;}
    try{
      const session=await window.VAEAuth.requireSession();if(!session)return;
      user=session.user||await window.VAEAuth.getUser();if(!user){location.replace(`${window.VAEAuth.ROOT_PATH}login/`);return;}
      supabase=window.VAEAuth.getClient();
      const readingId=new URLSearchParams(location.search).get('reading');item=LIBRARY[readingId];
      if(!item){showError('Leitura não encontrada','Volte para Práctica de lectura e escolha uma das leituras disponíveis.');return;}
      if(!(await hasPremiumAccess())){showError('Conteúdo exclusivo para assinantes','Esta leitura faz parte do plano Premium. Ative ou renove sua assinatura para continuar.');return;}
      const {data}=await supabase.from('reading_classics_progress').select('attempts,best_score,completed,last_completed_at,read_completed_at').eq('user_id',user.id).eq('reading_id',readingId).maybeSingle();progress=data||null;
      renderMeta();renderReading();renderQuestions();
      $('reading-guide-check')?.addEventListener('change',e=>{$('reading-guide-complete').disabled=!e.target.checked;});
      $('reading-guide-complete')?.addEventListener('click',markRead);
      $('reading-activity-form')?.addEventListener('submit',submitActivity);
      if(progress?.read_completed_at)unlockActivity(false);
      if(progress?.completed)$('reading-guide-finish')?.classList.remove('hidden');
      $('reading-guide-loading')?.classList.add('hidden');$('reading-guide-content')?.classList.remove('hidden');$('reading-guide-main')?.removeAttribute('aria-busy');
      track('premium_guided_reading_open',{reading_id:readingId,level:item.level,title:item.title});
    }catch(error){console.error(error);showError('Não foi possível abrir a leitura','Atualize a página e tente novamente.');}
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
