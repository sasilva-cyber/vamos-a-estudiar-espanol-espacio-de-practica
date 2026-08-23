/* Fluxo Premium: leitura guiada -> confirmação -> atividade. */
(function(){
  const LIBRARY={
    'lorca-la-guitarra':{
      level:'A1',genre:'Poesía guiada',title:'La guitarra',author:'Federico García Lorca',work:'Poema del cante jondo',
      intro:'Uma leitura adaptada mais extensa para reconhecer emoções, sons e imagens simples antes de responder à atividade.',
      focus:[['Observe','palavras que indicam som e emoção'],['Perceba','como um objeto pode receber características humanas'],['Procure','a ideia de tristeza que percorre o texto']],
      paragraphs:[
        'Es de noche y todo está tranquilo. En una habitación, una guitarra empieza a sonar. Al principio, el sonido es suave, pero poco a poco llena el espacio. La música parece un <span class="rg-highlight">llanto</span>, como si la guitarra pudiera sentir tristeza.',
        'La persona que escucha no ve solamente un instrumento de madera y cuerdas. Escucha una voz. Cada nota parece decir algo que no se puede explicar con palabras. La guitarra expresa una emoción profunda y convierte el silencio de la noche en música.',
        'Fuera de la habitación, la <span class="rg-highlight">madrugada</span> avanza lentamente. No hay ruido de coches ni voces de personas. Por eso, el sonido de la guitarra parece más fuerte. La noche, el silencio y la música forman una misma escena.',
        'La guitarra sigue tocando. Su <span class="rg-highlight">sonido</span> no es alegre ni rápido. Es un sonido largo, repetido y triste. El lector puede imaginar a alguien que recuerda una pérdida, una despedida o un momento difícil mientras escucha la música.',
        'En esta lectura, la guitarra recibe una característica humana: puede llorar sin tener ojos. La imagen ayuda a comprender que la poesía transforma objetos comunes en símbolos de sentimientos. La música se convierte así en una manera de expresar una tristeza que continúa durante toda la noche.'
      ],
      vocab:[['llanto','choro, pranto'],['guitarra','violão / guitarra'],['madrugada','período antes do amanhecer'],['sonido','som']],
      questions:[
        {q:'Na adaptação, o som da guitarra é comparado principalmente a…',o:['uma festa','um choro','uma conversa','uma viagem'],a:1},
        {q:'A guitarra é apresentada como se pudesse…',o:['sentir e expressar emoção','cozinhar','viajar sozinha','escrever cartas'],a:0},
        {q:'A madrugada contribui para criar um ambiente de…',o:['barulho e movimento','silêncio e solidão','humor e festa','pressa e trânsito'],a:1}
      ],source:'Adaptação didática em espanhol produzida para a plataforma a partir de temas e imagens do poema.'
    },
    'lorca-cancion-jinete':{
      level:'A2',genre:'Poesía guiada',title:'Canción del jinete',author:'Federico García Lorca',work:'Canciones',
      intro:'Uma leitura adaptada mais extensa para trabalhar deslocamento, distância e a ideia de um destino difícil de alcançar.',
      focus:[['Observe','palavras de lugar e movimento'],['Compare','o caminho conhecido com a chegada incerta'],['Identifique','como a distância influencia o tom do texto']],
      paragraphs:[
        'Un jinete viaja de noche por un camino que conduce a Córdoba. Conoce la dirección y sabe que la ciudad está delante de él, pero la siente muy <span class="rg-highlight">lejana</span>. La oscuridad hace que el camino parezca más largo de lo normal.',
        'El caballo avanza paso a paso. Alrededor hay campos, árboles y una luna grande que ilumina algunas partes del paisaje. El viajero lleva pocas cosas para el trayecto y piensa continuamente en la ciudad a la que quiere <span class="rg-highlight">llegar</span>.',
        'Aunque conoce el <span class="rg-highlight">camino</span>, el jinete no se siente seguro. Saber la ruta no significa tener la certeza de alcanzar el destino. La distancia se vuelve también una sensación interior: Córdoba está en el mapa, pero parece alejarse a medida que continúa el viaje.',
        'El movimiento del caballo contrasta con los pensamientos del viajero. El animal sigue avanzando, pero el jinete imagina que quizá nunca verá las calles de Córdoba. Esa idea transforma un viaje sencillo en una experiencia marcada por la duda y la fatalidad.',
        'La lectura presenta así una tensión entre avanzar y no llegar. El personaje no está perdido: sabe adónde va. Sin embargo, siente que existe una fuerza más grande que su voluntad. La ciudad representa un destino deseado y, al mismo tiempo, difícil de alcanzar.'
      ],
      vocab:[['lejano/a','distante'],['camino','caminho'],['jinete','cavaleiro'],['llegar','chegar']],
      questions:[
        {q:'O viajante se dirige a qual cidade?',o:['Sevilla','Madrid','Córdoba','Granada'],a:2},
        {q:'Qual contraste organiza a adaptação?',o:['Conhecer o caminho e não conseguir chegar','Dormir e acordar','Falar e escrever','Comprar e vender'],a:0},
        {q:'“Lejana” significa…',o:['próxima','distante','barulhenta','pequena'],a:1}
      ],source:'Adaptação didática em espanhol produzida para a plataforma a partir do poema.'
    },
    'lorca-baladilla-rios':{
      level:'B1',genre:'Poesía y paisaje',title:'Baladilla de los tres ríos',author:'Federico García Lorca',work:'Poema del cante jondo',
      intro:'Uma leitura adaptada mais extensa para relacionar paisagem, movimento dos rios e imagens da Andaluzia.',
      focus:[['Localize','elementos naturais da paisagem'],['Relacione','rio, vegetação e movimento'],['Perceba','o contraste entre diferentes espaços andaluzes']],
      paragraphs:[
        'La lectura comienza en un paisaje de Andalucía atravesado por ríos. El Guadalquivir avanza entre campos donde aparecen <span class="rg-highlight">naranjos</span> y olivos. El agua no es solamente parte del paisaje: funciona como una línea que conecta ciudades, cultivos y recuerdos.',
        'A medida que el río recorre el territorio, cambia también lo que vemos a su alrededor. Hay zonas de vegetación, tierras de trabajo y lugares donde el agua acompaña la vida cotidiana. El paisaje andaluz se construye mediante colores, movimientos y elementos de la naturaleza.',
        'En Granada, la imagen es diferente. Los ríos bajan desde zonas altas y frías, asociadas a la <span class="rg-highlight">nieve</span>, hasta espacios de cultivo donde aparece el <span class="rg-highlight">trigo</span>. Ese recorrido crea una sensación de descenso y transformación.',
        'Los distintos ríos permiten comparar espacios de Andalucía sin convertir la lectura en una simple descripción geográfica. Cada corriente de agua parece tener un ritmo propio y una relación especial con las ciudades y tierras que atraviesa.',
        'Por eso, el paisaje adquiere un valor cultural. Los ríos unen naturaleza, memoria e identidad regional. El lector puede imaginar que el agua transporta no solo movimiento, sino también historias, canciones y formas de vida vinculadas a Sevilla, Granada y otros lugares andaluces.'
      ],
      vocab:[['naranjo','laranjeira'],['olivo','oliveira'],['nieve','neve'],['trigo','trigo']],
      questions:[
        {q:'Quais árvores aparecem associadas ao Guadalquivir?',o:['Pinos e cedros','Naranjos e olivos','Palmeiras e cocos','Carvalhos e faias'],a:1},
        {q:'O movimento dos rios de Granada é descrito como uma passagem…',o:['da neve ao trigo','do mar ao deserto','da cidade à praia','da noite ao porto'],a:0},
        {q:'A adaptação relaciona principalmente…',o:['paisagem e identidade regional','receita e alimentação','trânsito e tecnologia','escola e trabalho'],a:0}
      ],source:'Adaptação didática em espanhol produzida para a plataforma a partir do poema.'
    },
    'lorca-romance-sonambulo':{
      level:'B2',genre:'Poesía simbólica',title:'Romance sonámbulo',author:'Federico García Lorca',work:'Romancero gitano',
      intro:'Uma leitura adaptada mais extensa para observar repetição, cor simbólica e construção de atmosfera.',
      focus:[['Observe','a insistência da cor verde'],['Interprete','como uma cor pode ultrapassar o sentido literal'],['Compare','espaços de mar e montanha']],
      paragraphs:[
        'La presencia del <span class="rg-highlight">verde</span> domina la escena desde el comienzo. No se trata simplemente de una información sobre el color de los objetos. La repetición hace que el verde se transforme en una señal que acompaña toda la lectura y modifica la percepción del paisaje.',
        'Aparecen elementos pertenecientes a espacios distintos: el mar, la montaña, ramas movidas por el viento y la figura de un caballo. La combinación no busca construir una descripción realista y ordenada. Al contrario, crea una escena fragmentada, parecida a una imagen soñada.',
        'El lector percibe que la atmósfera es hermosa y, al mismo tiempo, inquietante. Algunos elementos sugieren movimiento y libertad, mientras otros parecen inmóviles o lejanos. Esa tensión impide que el paisaje tenga un significado sencillo.',
        'El color verde puede relacionarse con vida, deseo, juventud, esperanza o incluso con una sensación de amenaza. Ninguna interpretación, por sí sola, explica toda la escena. El valor simbólico nace precisamente de la posibilidad de mantener varios sentidos abiertos.',
        'Leer este tipo de poesía exige observar relaciones, repeticiones y contrastes más que buscar una única explicación. La insistencia del verde funciona como un hilo que conecta imágenes diferentes y produce una <span class="rg-highlight">inquietud</span> que permanece incluso cuando el lector termina el texto.'
      ],
      vocab:[['rama','galho'],['mar','mar'],['montaña','montanha'],['inquietud','inquietação']],
      questions:[
        {q:'Qual elemento estrutura a adaptação?',o:['a cor verde','um relógio','uma carta','uma cidade moderna'],a:0},
        {q:'A repetição da cor produz principalmente…',o:['uma atmosfera simbólica insistente','uma regra gramatical','uma lista cronológica','uma explicação científica'],a:0},
        {q:'Quais espaços aparecem aproximados?',o:['mar e montanha','escola e hospital','praça e aeroporto','campo e fábrica'],a:0}
      ],source:'Adaptação didática em espanhol produzida para a plataforma a partir do poema.'
    },
    'lorca-la-aurora':{
      level:'C1',genre:'Poesía urbana',title:'La aurora de Nueva York',author:'Federico García Lorca',work:'Poeta en Nueva York',
      intro:'Uma leitura adaptada mais extensa para interpretar imagens urbanas densas e a inversão da ideia tradicional de amanhecer.',
      focus:[['Questione','a expectativa positiva ligada à aurora'],['Observe','imagens de sujeira e opressão'],['Interprete','a cidade como experiência humana e social']],
      paragraphs:[
        'La aurora suele asociarse con el comienzo de un nuevo día, la entrada de la luz y la posibilidad de renovación. En esta lectura, sin embargo, esa expectativa se rompe. El amanecer no llega como una promesa, sino como una presencia pesada que revela una ciudad hostil.',
        'En lugar de colores luminosos, aparecen imágenes vinculadas al <span class="rg-highlight">cieno</span>, al agua sucia y a movimientos violentos. La materia urbana parece contaminada. Lo que debería anunciar claridad produce una sensación de opacidad, deterioro y desorden.',
        'La ciudad moderna tampoco se presenta como un espacio de progreso capaz de mejorar automáticamente la vida humana. Sus estructuras, ritmos y mecanismos pueden convertir a las personas en figuras anónimas sometidas a una rutina intensa. El paisaje exterior se vuelve, por tanto, una forma de expresar malestar social.',
        'Esta inversión de la aurora permite interpretar el poema como una crítica a una modernidad marcada por desigualdad, aislamiento y <span class="rg-highlight">deshumanización</span>. La ciudad despierta, pero ese despertar no significa libertad. El día comienza dentro de un sistema que reproduce cansancio y exclusión.',
        'La fuerza de la lectura está en el contraste. Una palabra tradicionalmente positiva, “aurora”, se encuentra rodeada por signos de <span class="rg-highlight">degradación</span>. El lector debe sostener esa contradicción y comprender que el paisaje urbano funciona también como comentario sobre la experiencia humana dentro de la gran ciudad.'
      ],
      vocab:[['aurora','amanhecer'],['cieno','lama, lodo'],['degradación','degradação'],['deshumanización','desumanização']],
      questions:[
        {q:'Qual expectativa tradicional é invertida?',o:['a aurora como renovação','a noite como descanso','o campo como trabalho','o mar como viagem'],a:0},
        {q:'As imagens de lodo e sujeira reforçam uma sensação de…',o:['degradação','celebração','leveza','neutralidade'],a:0},
        {q:'A cidade é interpretada principalmente como…',o:['um espaço de desgaste e crítica','uma paisagem turística ideal','um cenário cômico','uma descrição científica'],a:0}
      ],source:'Adaptação didática em espanhol produzida para a plataforma a partir de imagens e temas do poema.'
    },
    'lorca-doncella-dialogo':{
      level:'B2',genre:'Lectura teatral',title:'La doncella, el marinero y el estudiante',author:'Federico García Lorca',work:'Diálogos',
      intro:'Uma leitura adaptada mais extensa para reconhecer ritmo de diálogo, escolha, jogo verbal e caracterização de personagens.',
      focus:[['Acompanhe','quem fala em cada momento'],['Observe','o jogo com letras e palavras'],['Perceba','como as escolhas revelam as personagens']],
      paragraphs:[
        'Una joven aparece en el centro de una pequeña escena teatral. Frente a ella están un marinero y un estudiante. No conocemos a los personajes mediante largas descripciones: los descubrimos por la manera en que hablan, preguntan, responden y reaccionan unos ante otros.',
        'El diálogo avanza con rapidez. Las frases breves producen ritmo y hacen que cada intervención parezca una respuesta inmediata a la anterior. La doncella escucha a los dos hombres y, al mismo tiempo, participa en un juego de elección que nunca resulta completamente serio.',
        'Las palabras se convierten en parte del juego. <span class="rg-highlight">Marinero</span> empieza con una letra y estudiante con otra; los nombres, las iniciales y las asociaciones verbales sirven para crear humor, expectativa y pequeñas tensiones entre los personajes.',
        'El marinero y el estudiante no se presentan de la misma forma. Cada uno intenta ocupar un lugar dentro de la conversación y llamar la atención de la joven. Sus maneras de hablar permiten imaginar temperamentos distintos, aunque la escena conserve un tono ligero y poético.',
        'En una lectura teatral, es importante prestar atención no solo a lo que se dice, sino también al turno de cada voz. Las interrupciones, preguntas y juegos de palabras construyen la acción. La relación entre los personajes surge, sobre todo, de sus <span class="rg-highlight">palabras</span> y de la tensión que el diálogo mantiene.'
      ],
      vocab:[['doncella','jovem / donzela'],['marinero','marinheiro'],['estudiante','estudante'],['quedarse con','escolher / ficar com']],
      questions:[
        {q:'A forma predominante da adaptação é…',o:['dialogada e teatral','jornalística','científica','instrucional'],a:0},
        {q:'O jogo verbal utiliza principalmente…',o:['letras e palavras','datas históricas','números romanos','cores de bandeiras'],a:0},
        {q:'A caracterização das personagens acontece sobretudo por meio…',o:['das falas','de gráficos','de notas de rodapé','de mapas'],a:0}
      ],source:'Adaptação didática em espanhol baseada no material de García Lorca preparado para a área de leitura.'
    },
    'cervantes-la-gitanilla':{
      level:'B2',genre:'Novela corta',title:'La Gitanilla',author:'Miguel de Cervantes Saavedra',work:'Novelas ejemplares',
      intro:'Uma leitura guiada adaptada mais extensa, com foco na apresentação de Preciosa e no vocabulário do espanhol clássico.',
      focus:[['Observe','como o narrador caracteriza Preciosa'],['Compare','aparência, habilidade e inteligência'],['Atenção','a palavras cujo sentido mudou no espanhol moderno']],
      paragraphs:[
        'Preciosa es presentada como una joven que destaca entre las personas de su entorno. Tiene habilidad para cantar y bailar, y su presencia despierta la atención de quienes la ven. Sin embargo, el narrador no limita su retrato a la belleza o al talento artístico.',
        'También insiste en su capacidad para hablar con inteligencia y responder con rapidez. La palabra <span class="rg-highlight">discreción</span>, frecuente en el español clásico, tiene aquí un sentido más amplio que en el uso moderno: se relaciona con prudencia, juicio, inteligencia y capacidad para actuar de manera adecuada.',
        'Cuando Preciosa llega a Madrid, su fama crece porque reúne varias cualidades que sorprenden al público. La música y la danza atraen a las personas, pero su manera de conversar produce un interés diferente. La joven no aparece como una figura puramente pasiva frente a quienes la observan.',
        'Su <span class="rg-highlight">donaire</span>, es decir, la gracia con la que habla y actúa, contribuye a construir una personalidad viva. El lector percibe que las palabras son tan importantes como la apariencia. En muchos momentos, la inteligencia verbal de Preciosa organiza la relación con los demás personajes.',
        'Al mismo tiempo, la lectura pertenece a una obra escrita en un contexto histórico muy diferente del actual. Las categorías sociales, las formas de nombrar a determinados grupos y algunas ideas del narrador reflejan valores de otra época. Por eso, es necesario distinguir entre comprender el texto y aceptar sin crítica todas sus representaciones.',
        'La lectura guiada propone observar esa doble dimensión: por un lado, la construcción literaria de una protagonista presentada como singular; por otro, las convenciones históricas presentes en la narración. Leer de manera crítica significa reconocer el valor literario de la obra y, al mismo tiempo, analizar las condiciones culturales en las que fue producida.'
      ],
      vocab:[['bailadora','dançarina'],['discreción','prudência e inteligência no uso clássico'],['donaire','graça, elegância ao agir ou falar'],['crianza','criação / educação recebida']],
      questions:[
        {q:'A adaptação caracteriza Preciosa principalmente como…',o:['habilidosa e inteligente','passiva e silenciosa','doente e isolada','sem interesse por música'],a:0},
        {q:'No contexto clássico, “discreción” se aproxima de…',o:['prudência e inteligência','medo','pressa','tristeza'],a:0},
        {q:'Qual atitude de leitura é recomendada diante das representações sociais da obra?',o:['Lê-las criticamente em seu contexto histórico','Ignorar o contexto','Considerá-las atuais sem análise','Evitar qualquer interpretação'],a:0}
      ],source:'Adaptação didática em espanhol baseada no material de “La Gitanilla” utilizado na área de leitura.'
    },
    'cervantes-casamiento-enganoso':{
      level:'C1',genre:'Novela ejemplar',title:'El casamiento engañoso',author:'Miguel de Cervantes Saavedra',work:'Novelas ejemplares',
      intro:'Uma leitura avançada adaptada mais extensa, com foco em ironia, relato pessoal e consequências do engano.',
      focus:[['Perceba','o tom irônico do narrador-personagem'],['Observe','o jogo entre casamento, cansaço e sofrimento'],['Avalie','como a experiência é reconstruída depois dos acontecimentos']],
      paragraphs:[
        'Campuzano aparece debilitado después de salir de un hospital. Al encontrarse con un conocido, su aspecto provoca preguntas. El personaje comienza entonces a explicar que su estado físico no puede separarse de una experiencia sentimental y matrimonial que terminó de manera dolorosa.',
        'Su relato no adopta un tono completamente solemne. Incluso cuando habla de sufrimiento, utiliza juegos verbales y expresiones irónicas. La proximidad entre <span class="rg-highlight">casamiento</span> y cansancio transforma la experiencia matrimonial en una fórmula amarga: aquello que debía representar unión acaba asociado al desgaste.',
        'Campuzano cuenta los acontecimientos de manera retrospectiva. Ya conoce las consecuencias y, por eso, selecciona los hechos desde el presente. El lector no recibe una versión neutral de lo ocurrido, sino una historia reconstruida por alguien que intenta comprender, justificar y también juzgar sus propias decisiones.',
        'La ironía se vuelve especialmente importante porque permite mantener dos planos a la vez. En uno aparece el dolor real del personaje; en otro, la conciencia de que su conducta tuvo elementos de ingenuidad, interés y autoengaño. El humor no elimina el sufrimiento, sino que lo vuelve más complejo.',
        'La condición de <span class="rg-highlight">convaleciente</span> de Campuzano refuerza esa relación entre cuerpo y experiencia. Las consecuencias del episodio no pertenecen solamente al pasado: siguen visibles en su presente. Su cuerpo debilitado funciona como prueba de una historia que todavía no ha terminado completamente para él.',
        'Leer el relato exige, por tanto, desconfiar de una interpretación demasiado simple. Campuzano participa en los hechos y después los narra desde su propia perspectiva. La voz combina explicación, exageración, <span class="rg-highlight">arrepentimiento</span> y autocrítica. Esa mezcla obliga al lector a preguntarse no solo qué ocurrió, sino también cómo el personaje quiere que los demás comprendan lo ocurrido.'
      ],
      vocab:[['flaqueza','fraqueza'],['traspié','tropeço'],['convaleciente','quem se recupera de uma doença'],['arrepentimiento','arrependimento']],
      questions:[
        {q:'Campuzano conta os fatos de que perspectiva?',o:['Depois de conhecer as consequências','Antes do casamento','Como narrador totalmente neutro','Como testemunha sem participação'],a:0},
        {q:'A aproximação entre casamento e cansaço produz um efeito de…',o:['ironia','descrição geográfica','explicação jurídica','neutralidade'],a:0},
        {q:'A voz de Campuzano combina principalmente…',o:['relato, humor e autocrítica','receita e instrução','notícia e estatística','mapa e cronologia'],a:0}
      ],source:'Adaptação didática em espanhol baseada no material de “El casamiento engañoso” utilizado na área de leitura.'
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