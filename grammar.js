const grammarData = {
  acentuacion: {
    title: "Acentuación ortográfica",
    level: "A1–A2",
    category: "Ortografía",
    time: "7 min",
    description: "Entenda agudas, llanas, esdrújulas, tilde diacrítica e a relação entre acento e sílaba tônica.",
    lead: "A tilde em espanhol marca a sílaba tônica segundo regras relativamente regulares. Aprender a identificar o tipo de palavra torna a acentuação muito mais previsível.",
    summary: ["Agudas: atenção às terminações em vogal, -n e -s.", "Llanas: regra complementar às agudas.", "Esdrújulas: sempre recebem tilde.", "Monossílabos normalmente não recebem tilde; há casos diacríticos."],
    sections: [
      { heading: "Agudas, llanas e esdrújulas", paragraphs: ["Nas palavras agudas, a força recai na última sílaba. Elas recebem tilde quando terminam em vogal, n ou s. Nas llanas, a força recai na penúltima sílaba; recebem tilde quando terminam em consoante diferente de n ou s. As esdrújulas têm a tonicidade na antepenúltima sílaba e são sempre acentuadas."], examples: ["canción → aguda terminada em -n", "lápiz → llana terminada em consoante diferente de -n/-s", "música → esdrújula"], tip: "Primeiro localize a sílaba tônica; depois observe a terminação da palavra." },
      { heading: "Tilde diacrítica", paragraphs: ["Alguns monossílabos recebem tilde para diferenciar funções e significados. É o caso de pares como tú/tu, él/el, sí/si, té/te e más/mas."], examples: ["Tú estudias español. / Tu cuaderno está aquí.", "Él vive en Madrid. / El libro es nuevo.", "Quiero más café. / Es pequeño, mas cómodo."], tip: "A tilde diacrítica não depende da tonicidade: ela diferencia palavras graficamente iguais com funções diferentes." },
      { heading: "Ditongo, tritongo e hiato", paragraphs: ["A obra também organiza o estudo da acentuação junto à combinação de vogais. Quando uma vogal fraca tônica recebe tilde, a sequência pode deixar de formar ditongo, criando um hiato."], examples: ["ciudad → ditongo", "país → hiato", "María → hiato"], tip: "Observe especialmente i e u quando recebem a tonicidade." }
    ],
    check: { q: "Qual forma está corretamente acentuada?", options: ["cancion", "canción", "cáncion"], correct: 1, explanation: "canción é aguda terminada em -n, por isso recebe tilde." }
  },
  articulos: {
    title: "Los artículos: el, la, lo, un, una",
    level: "A1–A2",
    category: "Morfología",
    time: "8 min",
    description: "Revise artigos definidos, indefinidos, o neutro lo, contrações e a regra de eufonia.",
    lead: "Os artigos em espanhol indicam gênero e número, mas há usos que merecem atenção especial para falantes de português, sobretudo lo, al e del.",
    summary: ["Definidos: el, la, los, las.", "Indefinidos: un, una, unos, unas.", "Lo é neutro e não acompanha substantivo comum.", "As contrações regulares são al e del."],
    sections: [
      { heading: "Definidos e indefinidos", paragraphs: ["Os artigos definidos acompanham referentes identificáveis: el libro, la casa, los estudiantes, las clases. Os indefinidos introduzem referentes não identificados ou apresentados pela primeira vez: un libro, una profesora."], examples: ["La clase empieza a las ocho.", "Compré un diccionario nuevo."], tip: "Não traduza mecanicamente cada artigo do português: alguns contextos omitem artigo em espanhol." },
      { heading: "O artigo neutro lo", paragraphs: ["Lo não tem gênero masculino: é uma forma neutra. Pode substantivar qualidades, ideias ou estruturas inteiras."], examples: ["Lo importante es practicar.", "No entiendo lo que dices.", "Me sorprendió lo rápido que terminó."], tip: "Evite usar lo diante de substantivos: o correto é el libro, não lo libro." },
      { heading: "Al, del e eufonia", paragraphs: ["A + el forma al; de + el forma del. Além disso, substantivos femininos singulares iniciados por a- ou ha- tônicos podem aparecer com el para evitar choque sonoro, mantendo o gênero feminino."], examples: ["Voy al museo.", "Vengo del trabajo.", "El agua fría / las aguas frías."], tip: "A mudança de artigo em el agua não transforma agua em substantivo masculino." }
    ],
    check: { q: "Complete: “Mañana voy ___ cine con Ana.”", options: ["a el", "al", "del"], correct: 1, explanation: "A preposição a + o artigo el formam a contração al." }
  },
  pronombres: {
    title: "Pronombres personales",
    level: "A1–A2",
    category: "Pronombres",
    time: "9 min",
    description: "Pronomes sujeito, tratamentos, objetos direto e indireto e colocação básica dos pronomes.",
    lead: "O espanhol frequentemente omite o pronome sujeito, mas usa intensamente pronomes complemento. Entender a função sintática ajuda a escolher entre lo, la, le, los, las e les.",
    summary: ["Sujeitos: yo, tú, él/ella, nosotros, vosotros, ellos/ellas.", "Usted/ustedes são formas de tratamento.", "Objeto direto: lo, la, los, las.", "Objeto indireto: le, les; diante de lo/la/los/las, vira se."],
    sections: [
      { heading: "Sujeito e formas de tratamento", paragraphs: ["Como a conjugação costuma identificar a pessoa verbal, o pronome sujeito pode ser omitido. Tú é informal. Usted expressa tratamento formal. Em grande parte da América, ustedes é usado também em contextos informais no plural; o vos aparece em várias regiões hispano-americanas."], examples: ["Trabajo en una escuela. → o sujeito yo fica implícito.", "¿Cómo se llama usted?", "¿Ustedes quieren café?"], tip: "O uso de tú, vos, vosotros e ustedes varia de acordo com a região e o grau de formalidade." },
      { heading: "Complemento direto e indireto", paragraphs: ["O objeto direto recebe diretamente a ação do verbo e costuma ser retomado por lo, la, los ou las. O objeto indireto indica destinatário ou beneficiário e costuma ser retomado por le ou les."], examples: ["Compré el libro y lo leí ayer.", "Vi a Marta y la saludé.", "A Marta le compré un regalo."], tip: "Pergunte: o que/quem recebe a ação diretamente? E para quem ou a quem a ação é destinada?" },
      { heading: "Se lo, se la, se los, se las", paragraphs: ["Quando le ou les aparecem antes de lo, la, los ou las, transformam-se em se."], examples: ["Le di el libro. → Se lo di.", "Les envié las fotos. → Se las envié."], tip: "A ordem é primeiro o complemento indireto, depois o direto." }
    ],
    check: { q: "Complete: “A Marta ___ compré un regalo.”", options: ["la", "le", "lo"], correct: 1, explanation: "Marta é destinatária da ação; portanto, funciona como complemento indireto e pede le." }
  },
  sustantivos: {
    title: "Sustantivos: género y plural",
    level: "A1–A2",
    category: "Morfología",
    time: "7 min",
    description: "Formação de gênero e plural, além de substantivos cujo gênero pode surpreender brasileiros.",
    lead: "O substantivo nomeia seres, objetos, lugares e ideias. Em espanhol, varia em gênero e número, mas nem sempre coincide com o gênero da palavra equivalente em português.",
    summary: ["Substantivos variam em gênero e número.", "Muitos plurais acrescentam -s ou -es.", "Palavras terminadas em -z formam plural em -ces.", "Há substantivos com gênero diferente do português."],
    sections: [
      { heading: "Gênero", paragraphs: ["Muitas terminações ajudam a reconhecer o gênero, mas não funcionam como regra absoluta. Por isso, aprender o substantivo junto com seu artigo é uma estratégia eficiente."], examples: ["el libro", "la mesa", "el mensaje", "la costumbre"], tip: "Memorize artigo + substantivo, especialmente quando o gênero difere do português." },
      { heading: "Formação do plural", paragraphs: ["Em geral, palavras terminadas em vogal recebem -s. Muitas palavras terminadas em consoante recebem -es. Quando o singular termina em -z, o plural troca z por c antes de -es."], examples: ["casa → casas", "papel → papeles", "voz → voces", "luz → luces"], tip: "A mudança z → c aparece antes do -es do plural." },
      { heading: "Casos especiais", paragraphs: ["Alguns substantivos admitem mais de um gênero em determinados usos, e outros alteram o significado conforme o número ou o contexto."], examples: ["el mar / la mar", "el arte moderno / las artes"], tip: "Casos especiais devem ser aprendidos no contexto, não apenas por terminação." }
    ],
    check: { q: "Qual é o plural correto de “voz”?", options: ["vozes", "voces", "vozês"], correct: 1, explanation: "Palavras terminadas em -z formam o plural com -ces: voz → voces." }
  },
  verbos: {
    title: "Verbos regulares e irregulares",
    level: "A2–B1",
    category: "Verbos",
    time: "10 min",
    description: "Conjugações em -ar, -er e -ir e os principais padrões de irregularidade verbal.",
    lead: "A conjugação espanhola se organiza em três grupos principais. Depois de dominar as terminações regulares, fica mais fácil reconhecer padrões de irregularidade.",
    summary: ["Três conjugações: -ar, -er e -ir.", "Irregularidades podem afetar radical e terminações.", "Padrões frequentes: e→ie, o→ue, e→i.", "Algumas formas irregulares precisam ser memorizadas."],
    sections: [
      { heading: "As três conjugações", paragraphs: ["Os infinitivos terminam em -ar, -er ou -ir. Verbos regulares conservam o radical e recebem terminações previsíveis."], examples: ["hablar → hablo, hablas, habla", "comer → como, comes, come", "vivir → vivo, vives, vive"], tip: "Separe radical e terminação: habl-ar, com-er, viv-ir." },
      { heading: "Mudanças no radical", paragraphs: ["Vários verbos alteram uma vogal do radical em parte da conjugação. Entre os padrões frequentes estão e→ie, o→ue e e→i."], examples: ["pensar → pienso", "dormir → duermo", "pedir → pido"], tip: "O padrão irregular costuma repetir-se em outros verbos da mesma família." },
      { heading: "Formas não pessoais", paragraphs: ["Infinitivo, gerúndio e particípio também fazem parte do sistema verbal. Algumas formas são irregulares e aparecem com muita frequência."], examples: ["hacer → hecho", "volver → vuelto", "dormir → durmiendo"], tip: "Ao estudar um verbo irregular, registre também seu gerúndio e particípio quando forem irregulares." }
    ],
    check: { q: "Complete: “Yo ___ español todos los días.”", options: ["estudio", "estudias", "estudia"], correct: 0, explanation: "Com yo, o presente de estudiar é estudio." }
  },
  tiempos: {
    title: "Indicativo, subjuntivo e tempos do passado",
    level: "B1–B2",
    category: "Verbos",
    time: "11 min",
    description: "Diferenças de perspectiva entre indicativo e subjuntivo e contraste entre passados frequentes.",
    lead: "Os modos verbais mostram como o falante apresenta a informação. O indicativo tende a apresentar fatos como reais ou objetivos; o subjuntivo aparece em contextos de desejo, dúvida, hipótese, avaliação e outras relações de não afirmação direta.",
    summary: ["Indicativo: fatos apresentados como reais ou objetivos.", "Subjuntivo: desejo, dúvida, hipótese e contextos subordinados específicos.", "Indefinido: ação concluída e delimitada no passado.", "Imperfecto: hábito, descrição e desenvolvimento no passado."],
    sections: [
      { heading: "Indicativo", paragraphs: ["O presente do indicativo pode falar do momento atual, hábitos, fatos gerais e até planos futuros. No passado, diferentes tempos organizam a relação entre ação, duração e referência temporal."], examples: ["Trabajo por la mañana.", "Mañana salgo temprano.", "Ayer fui al museo."], tip: "Não escolha o tempo apenas pela tradução em português; observe o valor temporal no contexto." },
      { heading: "Indefinido, perfecto e imperfecto", paragraphs: ["O indefinido apresenta uma ação concluída e delimitada. O pretérito perfecto relaciona um fato passado a um período ainda percebido como atual. O imperfecto descreve hábitos, cenários e ações em desenvolvimento no passado."], examples: ["Ayer terminé el informe.", "Hoy he hablado con Ana.", "Cuando era niño, jugaba en la plaza."], tip: "Marcadores temporais como ayer, hoy e cuando era... ajudam a perceber a perspectiva do falante." },
      { heading: "Subjuntivo", paragraphs: ["O presente do subjuntivo aparece, entre outros contextos, depois de expressões de desejo, avaliação, dúvida e possibilidade, além de imperativos negativos."], examples: ["Espero que tengas tiempo.", "Quizás venga mañana.", "No hables tan rápido."], tip: "O subjuntivo não é apenas um 'tempo': é um modo que expressa a atitude do falante diante da ação." }
    ],
    check: { q: "Complete: “Ayer ___ al museo con mis amigos.”", options: ["voy", "fui", "vaya"], correct: 1, explanation: "Ayer apresenta uma ação concluída no passado; fui é pretérito indefinido de ir." }
  },
  numerales: {
    title: "Los numerales",
    level: "A1–A2",
    category: "Determinantes",
    time: "6 min",
    description: "Cardinais, ordinais e a apócope de uno diante de substantivos masculinos.",
    lead: "Os numerais podem funcionar como determinantes ou pronomes. Pequenas mudanças de forma, como uno → un, são muito frequentes no espanhol cotidiano.",
    summary: ["Cardinais indicam quantidade.", "Ordinais indicam ordem.", "Uno vira un antes de substantivo masculino singular.", "Numerais podem aparecer sem substantivo quando o referente está claro."],
    sections: [
      { heading: "Cardinais", paragraphs: ["Os numerais cardinais expressam quantidade e podem acompanhar um substantivo ou substituí-lo quando o contexto já identifica o referente."], examples: ["Tengo tres libros.", "Los tres son interesantes."], tip: "Treine números em contextos reais: preços, idade, horários, datas e endereços." },
      { heading: "Uno e apócope", paragraphs: ["Uno perde a vogal final antes de um substantivo masculino singular."], examples: ["un libro", "veintiún estudiantes", "una profesora"], tip: "Diante de substantivo feminino, mantém-se una." },
      { heading: "Ordinais", paragraphs: ["Os ordinais indicam posição em uma sequência e concordam em gênero e número quando funcionam como adjetivos."], examples: ["la primera clase", "el segundo capítulo"], tip: "Primeiro identifique se o numeral indica quantidade ou posição." }
    ],
    check: { q: "Complete: “Tengo ___ libro nuevo.”", options: ["uno", "un", "una"], correct: 1, explanation: "Uno sofre apócope antes de substantivo masculino singular: un libro." }
  },
  adjetivos: {
    title: "Adjetivos: concordância, posição e comparação",
    level: "A2–B1",
    category: "Morfología",
    time: "9 min",
    description: "Concordância, apócope, posição do adjetivo e estruturas de comparação.",
    lead: "O adjetivo qualifica ou determina o substantivo e normalmente concorda com ele em gênero e número. Sua posição também pode mudar a ênfase — e, em alguns casos, o sentido.",
    summary: ["Adjetivos concordam em gênero e número.", "Gran, buen e mal são formas apocopadas frequentes.", "A posição pode alterar ênfase ou significado.", "Comparações usam más/menos... que e tan... como."],
    sections: [
      { heading: "Concordância", paragraphs: ["O adjetivo acompanha o substantivo em gênero e número. Quando qualifica substantivos de gêneros diferentes, o plural masculino pode funcionar como forma de concordância do conjunto."], examples: ["una casa blanca", "unos zapatos nuevos", "un libro y una revista nuevos"], tip: "Leia o substantivo antes de escolher a forma do adjetivo." },
      { heading: "Apócope", paragraphs: ["Alguns adjetivos perdem parte da forma diante de determinados substantivos. Grande vira gran diante de substantivo singular; bueno e malo tornam-se buen e mal diante de substantivo masculino singular."], examples: ["un gran escritor", "un buen día", "un mal ejemplo"], tip: "Compare a posição: un buen libro, pero un libro bueno." },
      { heading: "Comparação", paragraphs: ["Superioridade e inferioridade usam más/menos... que. Igualdade pode usar tan... como. Há comparativos irregulares muito frequentes, como mejor, peor, mayor e menor."], examples: ["Ana es más alta que Luis.", "Este curso es tan útil como aquel.", "Hoy estoy mejor."], tip: "Evite formas como más bueno quando o contexto pede mejor." }
    ],
    check: { q: "Complete: “Carlos es un ___ amigo.”", options: ["bueno", "buen", "buena"], correct: 1, explanation: "Bueno sofre apócope antes de substantivo masculino singular: buen amigo." }
  },
  relativos: {
    title: "Pronombres relativos",
    level: "B1–B2",
    category: "Pronombres",
    time: "8 min",
    description: "Que, quien, el que, el cual e cuyo para conectar informações sem repetir o antecedente.",
    lead: "Os relativos ligam orações e retomam um antecedente. Eles tornam o texto mais fluido e permitem acrescentar informação sem repetir substantivos.",
    summary: ["Que é invariável e muito frequente.", "Quien refere-se a pessoas e varia em número.", "El que/el cual têm formas de gênero e número.", "Cuyo expressa relação de posse."],
    sections: [
      { heading: "Que e quien", paragraphs: ["Que pode retomar pessoas ou coisas e é invariável. Quien refere-se a pessoas e tem plural quienes."], examples: ["La película que vimos fue excelente.", "La profesora que llegó es argentina.", "Los alumnos, quienes ya terminaron, pueden salir."], tip: "Observe se o antecedente é pessoa, coisa ou ideia e se há preposição antes do relativo." },
      { heading: "El que e el cual", paragraphs: ["Essas formas possuem variação de gênero e número e aparecem especialmente quando há preposição ou quando se busca maior clareza."], examples: ["La razón por la que vine.", "El tema sobre el cual hablamos."], tip: "A preposição pertence à relação sintática: por la que, con el que, sobre el cual." },
      { heading: "Cuyo", paragraphs: ["Cuyo estabelece uma relação de posse e concorda com o substantivo possuído, não com o possuidor."], examples: ["La autora cuyos libros leí dará una charla.", "El alumno cuya madre es médica llegó temprano."], tip: "Pergunte: 'de quem é o substantivo que vem depois?' e faça a concordância com esse substantivo." }
    ],
    check: { q: "Complete: “La profesora ___ llegó temprano es chilena.”", options: ["que", "cuyo", "lo cual"], correct: 0, explanation: "Que retoma diretamente o antecedente la profesora e funciona como sujeito de llegó." }
  },
  preposiciones: {
    title: "Por, para e outras preposições",
    level: "B1–B2",
    category: "Preposiciones",
    time: "10 min",
    description: "Causa, finalidade, direção, percurso, tempo, meio e outros valores de por e para.",
    lead: "Por e para não correspondem a uma única tradução em português. A escolha depende da relação que o falante estabelece: causa, finalidade, direção, percurso, prazo, meio ou troca.",
    summary: ["Por pode marcar causa, percurso, meio, duração e troca.", "Para pode marcar finalidade, destinatário, direção, prazo e ponto de vista.", "O contexto decide a preposição.", "Memorizar blocos de uso é mais eficiente que traduzir palavra por palavra."],
    sections: [
      { heading: "Causa e finalidade", paragraphs: ["Por pode introduzir a causa ou a motivação. Para costuma indicar finalidade ou destinatário."], examples: ["Lo hice por amistad.", "Estudio español para trabajar en otro país.", "Este regalo es para Ana."], tip: "Pergunte 'por quê?' para a causa e 'para quê?' para a finalidade." },
      { heading: "Percurso e direção", paragraphs: ["Por pode indicar o espaço percorrido; para aponta uma direção ou destino projetado."], examples: ["Caminamos por el centro.", "Salimos para Madrid mañana."], tip: "Por acompanha o caminho; para aponta para onde se vai." },
      { heading: "Tempo, meio e troca", paragraphs: ["Por pode marcar duração aproximada, meio de transporte/comunicação e troca. Para pode marcar um prazo ou referência futura, além de opinião ou ponto de vista."], examples: ["Hablamos por teléfono.", "Cambié mi asiento por otro.", "El informe es para el lunes.", "Para mí, esta opción es mejor."], tip: "Crie cartões de estudo por valor semântico: causa, finalidade, meio, direção, prazo, opinião." }
    ],
    check: { q: "Complete: “Estudio español ___ trabajar en turismo.”", options: ["por", "para", "desde"], correct: 1, explanation: "Trabalhar em turismo é a finalidade do estudo, por isso usa-se para." }
  },
  contrastes: {
    title: "Heterotónicos, heterogenéricos e falsos cognatos",
    level: "A2–B1",
    category: "Léxico",
    time: "9 min",
    description: "Diferenças de tonicidade, gênero e significado entre espanhol e português.",
    lead: "A proximidade entre português e espanhol ajuda, mas também cria armadilhas. Alguns vocábulos parecem familiares e, justamente por isso, exigem atenção especial.",
    summary: ["Heterotónicos: tonicidade diferente do português.", "Heterogenéricos: gênero gramatical diferente.", "Heterosemânticos: forma parecida, significado diferente.", "Aprenda sempre com artigo, pronúncia e contexto."],
    sections: [
      { heading: "Heterotónicos", paragraphs: ["São palavras semelhantes nas duas línguas, mas cuja sílaba tônica não coincide. A diferença afeta a pronúncia e, às vezes, a presença da tilde."], examples: ["teléfono × telefone", "micrófono × microfone", "límite × limite", "océano × oceano"], tip: "Leia essas palavras em voz alta e marque visualmente a sílaba tônica." },
      { heading: "Heterogenéricos", paragraphs: ["Algumas palavras mudam de gênero quando passamos do português para o espanhol."], examples: ["la leche × o leite", "la sangre × o sangue", "el mensaje × a mensagem", "el puente × a ponte"], tip: "Memorize o substantivo espanhol sempre junto com el ou la." },
      { heading: "Heterosemânticos", paragraphs: ["São os chamados falsos cognatos: palavras parecidas na forma, mas com significado diferente."], examples: ["embarazada = grávida", "apellido = sobrenome", "oficina = escritório", "vaso = copo", "polvo = pó"], tip: "Antes de confiar na semelhança gráfica, confirme o significado no contexto." }
    ],
    check: { q: "Em espanhol, “embarazada” significa:", options: ["embaraçada", "grávida", "envergonhada"], correct: 1, explanation: "Embarazada significa grávida; é um falso cognato frequente para falantes de português." }
  },
  puntuacion: {
    title: "Signos de puntuación e interrogativos",
    level: "A1–A2",
    category: "Ortografía",
    time: "6 min",
    description: "Interrogação e exclamação invertidas, diéresis e palavras interrogativas com tilde.",
    lead: "A pontuação espanhola possui marcas visuais muito características, especialmente os sinais de abertura ¿ e ¡, que fazem parte da escrita normativa das perguntas e exclamações.",
    summary: ["Perguntas usam ¿ ... ?.", "Exclamações usam ¡ ... !.", "A diéresis aparece em güe/güi quando o u é pronunciado.", "Interrogativos e exclamativos recebem tilde em usos próprios."],
    sections: [
      { heading: "Sinais de abertura", paragraphs: ["As frases interrogativas e exclamativas usam sinal no início e no fim. Isso ajuda o leitor a reconhecer a entonação desde o começo da frase."], examples: ["¿Dónde vives?", "¡Qué sorpresa!", "Hola, ¿cómo estás?"], tip: "No teclado do celular, mantenha pressionado ? ou ! para acessar ¿ e ¡ em muitos sistemas." },
      { heading: "Diéresis", paragraphs: ["A diéresis sobre o u indica que essa vogal deve ser pronunciada nos grupos güe e güi."], examples: ["pingüino", "vergüenza", "lingüística"], tip: "Compare guerra, em que o u não é pronunciado, com pingüino, em que a diéresis sinaliza a pronúncia." },
      { heading: "Interrogativos e exclamativos", paragraphs: ["Palavras como qué, cuál, cómo, cuándo, cuánto, dónde e quién recebem tilde quando funcionam como interrogativos ou exclamativos, inclusive em perguntas indiretas."], examples: ["¿Qué quieres?", "No sé dónde vive.", "¡Cuánto tiempo!"], tip: "A pergunta indireta não precisa de ¿?, mas mantém a tilde do interrogativo." }
    ],
    check: { q: "Qual frase está pontuada corretamente?", options: ["Como estás?", "¿Cómo estás?", "¿Como estás?"], correct: 1, explanation: "Perguntas diretas usam ¿ e ?, e cómo recebe tilde em uso interrogativo." }
  }
};

const grammarScreen = document.getElementById("grammar-screen");
const grammarReaderScreen = document.getElementById("grammar-reader-screen");
const grammarGrid = document.getElementById("grammar-grid");
const grammarFilterButtons = [...document.querySelectorAll("[data-grammar-filter]")];
let grammarFilter = "all";
let currentGrammarId = null;

function grammarIsStudied(id) {
  try { return localStorage.getItem(`vae-grammar-${id}`) === "yes"; } catch { return false; }
}

function hideGrammarScreens() {
  grammarScreen.classList.add("hidden");
  grammarReaderScreen.classList.add("hidden");
}

function hideMainLearningScreensForGrammar() {
  ["home-screen", "level-screen", "quiz-screen", "result-screen", "readings-screen", "reader-screen"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
}

function setGrammarNavActive() {
  document.querySelectorAll(".main-nav .nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === "grammar");
  });
}

function showGrammarLibrary() {
  hideMainLearningScreensForGrammar();
  grammarReaderScreen.classList.add("hidden");
  grammarScreen.classList.remove("hidden");
  setGrammarNavActive();
  renderGrammarCards();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderGrammarCards() {
  grammarGrid.innerHTML = "";
  Object.entries(grammarData)
    .filter(([, lesson]) => grammarFilter === "all" || lesson.level === grammarFilter)
    .forEach(([id, lesson]) => {
      const card = document.createElement("article");
      card.className = "grammar-card";
      card.innerHTML = `
        <div class="grammar-card-top">
          <span class="grammar-level">${lesson.level}</span>
          <span class="grammar-time">${lesson.time}</span>
        </div>
        <p class="grammar-category">${lesson.category}</p>
        <h2>${lesson.title}</h2>
        <p>${lesson.description}</p>
        <div class="grammar-card-footer">
          <button class="primary-button" type="button" data-open-grammar="${id}">Estudiar</button>
          <span class="grammar-status">${grammarIsStudied(id) ? "✓ Estudiada" : ""}</span>
        </div>`;
      grammarGrid.appendChild(card);
    });

  grammarGrid.querySelectorAll("[data-open-grammar]").forEach((button) => {
    button.addEventListener("click", () => openGrammarLesson(button.dataset.openGrammar));
  });
}

grammarFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    grammarFilter = button.dataset.grammarFilter;
    grammarFilterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderGrammarCards();
  });
});

const grammarReaderTitle = document.getElementById("grammar-reader-title");
const grammarArticleMeta = document.getElementById("grammar-article-meta");
const grammarLead = document.getElementById("grammar-lead");
const grammarArticleBody = document.getElementById("grammar-article-body");
const grammarSummaryList = document.getElementById("grammar-summary-list");
const grammarMarkButton = document.getElementById("grammar-mark-button");
const grammarSavedNote = document.getElementById("grammar-saved-note");
const grammarCheckQuestion = document.getElementById("grammar-check-question");
const grammarCheckOptions = document.getElementById("grammar-check-options");
const grammarCheckResult = document.getElementById("grammar-check-result");

function openGrammarLesson(id) {
  const lesson = grammarData[id];
  if (!lesson) return;
  currentGrammarId = id;
  hideMainLearningScreensForGrammar();
  grammarScreen.classList.add("hidden");
  grammarReaderScreen.classList.remove("hidden");
  setGrammarNavActive();

  grammarReaderTitle.textContent = lesson.title;
  grammarArticleMeta.innerHTML = `<span>${lesson.level}</span><span>${lesson.category}</span><span>${lesson.time}</span>`;
  grammarLead.textContent = lesson.lead;
  grammarSummaryList.innerHTML = lesson.summary.map((item) => `<li>${item}</li>`).join("");
  grammarSavedNote.textContent = grammarIsStudied(id) ? "✓ Esta aula já está marcada como estudada." : "";
  grammarMarkButton.textContent = grammarIsStudied(id) ? "Estudiada ✓" : "Marcar como estudiada";

  grammarArticleBody.innerHTML = "";
  lesson.sections.forEach((section) => {
    const block = document.createElement("section");
    block.className = "grammar-section";

    const heading = document.createElement("h2");
    heading.textContent = section.heading;
    block.appendChild(heading);

    section.paragraphs.forEach((text) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = text;
      block.appendChild(paragraph);
    });

    if (section.examples?.length) {
      const examples = document.createElement("div");
      examples.className = "grammar-example-list";
      section.examples.forEach((text) => {
        const example = document.createElement("div");
        example.className = "grammar-example";
        example.textContent = text;
        examples.appendChild(example);
      });
      block.appendChild(examples);
    }

    if (section.tip) {
      const tip = document.createElement("div");
      tip.className = "grammar-tip";
      tip.textContent = `Dica: ${section.tip}`;
      block.appendChild(tip);
    }

    grammarArticleBody.appendChild(block);
  });

  renderGrammarCheck(lesson.check);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderGrammarCheck(check) {
  grammarCheckQuestion.textContent = check.q;
  grammarCheckOptions.innerHTML = check.options.map((option, index) => `
    <label class="grammar-check-option">
      <input type="radio" name="grammar-check" value="${index}" />
      <span>${option}</span>
    </label>`).join("");
  grammarCheckResult.className = "grammar-check-result hidden";
  grammarCheckResult.textContent = "";
}

document.getElementById("grammar-reader-back").addEventListener("click", showGrammarLibrary);

grammarMarkButton.addEventListener("click", () => {
  if (!currentGrammarId) return;
  try { localStorage.setItem(`vae-grammar-${currentGrammarId}`, "yes"); } catch { /* armazenamento pode estar bloqueado */ }
  grammarMarkButton.textContent = "Estudiada ✓";
  grammarSavedNote.textContent = "✓ Progresso salvo neste navegador.";
});

document.getElementById("grammar-check-button").addEventListener("click", () => {
  if (!currentGrammarId) return;
  const selected = grammarCheckOptions.querySelector('input[name="grammar-check"]:checked');
  const lesson = grammarData[currentGrammarId];
  grammarCheckResult.classList.remove("hidden", "good", "needs-work");

  if (!selected) {
    grammarCheckResult.classList.add("needs-work");
    grammarCheckResult.textContent = "Escolha uma alternativa antes de comprobar.";
    return;
  }

  const isCorrect = Number(selected.value) === lesson.check.correct;
  grammarCheckResult.classList.add(isCorrect ? "good" : "needs-work");
  grammarCheckResult.textContent = `${isCorrect ? "¡Muy bien!" : "Revise este ponto."} ${lesson.check.explanation}`;
});

[...document.querySelectorAll('[data-route="grammar"]')].forEach((button) => {
  button.addEventListener("click", showGrammarLibrary);
});

[...document.querySelectorAll("[data-route]")].forEach((button) => {
  if (button.dataset.route !== "grammar") {
    button.addEventListener("click", hideGrammarScreens);
  }
});

renderGrammarCards();
