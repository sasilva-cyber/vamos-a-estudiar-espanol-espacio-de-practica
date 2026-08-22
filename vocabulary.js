const vocabularyData = {
  alimentacion: {
    title: "Alimentación",
    group: "Alimentos",
    level: "A1–A2",
    description: "Vocabulário essencial para falar de refeições, alimentos e hábitos à mesa.",
    items: [["el desayuno","café da manhã"],["el almuerzo","almoço"],["la cena","jantar"],["el pan","pão"],["el arroz","arroz"],["la sopa","sopa"],["el huevo","ovo"],["el queso","queijo"],["la mantequilla","manteiga"],["el aceite","óleo/azeite"],["la sal","sal"],["el azúcar","açúcar"]],
    example: "Normalmente desayuno pan con queso y café.",
    translation: "Normalmente tomo café da manhã com pão, queijo e café."
  },
  carnesPescados: {
    title: "Carnes y pescados",
    group: "Alimentos",
    level: "A1–A2",
    description: "Nomes de carnes, peixes e formas comuns de preparo.",
    items: [["la carne de vacuno","carne bovina"],["el pollo","frango"],["el cerdo","porco"],["el jamón","presunto"],["el pescado","peixe"],["el salmón","salmão"],["el atún","atum"],["la sardina","sardinha"],["los mariscos","frutos do mar"],["a la parrilla","grelhado"],["asado/a","assado/a"],["frito/a","frito/a"]],
    example: "Prefiero el pescado a la parrilla con verduras.",
    translation: "Prefiro peixe grelhado com verduras."
  },
  comidasCondimentos: {
    title: "Comidas, condimentos y meriendas",
    group: "Alimentos",
    level: "A1–A2",
    description: "Lanches, pratos diversos e temperos úteis no cotidiano.",
    items: [["el bocadillo","sanduíche"],["la merienda","lanche"],["la hamburguesa","hambúrguer"],["la pizza","pizza"],["la pasta","massa"],["la salsa","molho"],["la pimienta","pimenta-do-reino"],["el ajo","alho"],["la cebolla","cebola"],["el vinagre","vinagre"],["el orégano","orégano"],["la mostaza","mostarda"]],
    example: "Para la merienda quiero un bocadillo con mostaza.",
    translation: "Para o lanche quero um sanduíche com mostarda."
  },
  frutas: {
    title: "Frutas",
    group: "Alimentos",
    level: "A1–A2",
    description: "Frutas frequentes em mercados, receitas e conversas do dia a dia.",
    items: [["la manzana","maçã"],["el plátano / la banana","banana"],["la naranja","laranja"],["la fresa","morango"],["la uva","uva"],["la pera","pera"],["la piña","abacaxi"],["la sandía","melancia"],["el melón","melão"],["el melocotón","pêssego"],["la cereza","cereja"],["el limón","limão"]],
    example: "Compré manzanas, uvas y una piña para el postre.",
    translation: "Comprei maçãs, uvas e um abacaxi para a sobremesa."
  },
  postres: {
    title: "Postres",
    group: "Alimentos",
    level: "A1–A2",
    description: "Vocabulário de sobremesas e doces.",
    items: [["el postre","sobremesa"],["el helado","sorvete"],["el pastel / la tarta","bolo/torta"],["el chocolate","chocolate"],["el flan","pudim/flan"],["las galletas","biscoitos"],["el caramelo","caramelo"],["la mermelada","geleia"],["la miel","mel"],["la nata","creme de leite"],["el dulce","doce"],["el churro","churro"]],
    example: "De postre vamos a pedir helado de chocolate.",
    translation: "De sobremesa vamos pedir sorvete de chocolate."
  },
  vegetales: {
    title: "Vegetales",
    group: "Alimentos",
    level: "A1–A2",
    description: "Verduras, legumes e hortaliças comuns.",
    items: [["la zanahoria","cenoura"],["el tomate","tomate"],["la lechuga","alface"],["la patata / la papa","batata"],["el pepino","pepino"],["el pimiento","pimentão"],["el brócoli","brócolis"],["la coliflor","couve-flor"],["la calabaza","abóbora"],["la espinaca","espinafre"],["los guisantes","ervilhas"],["las judías verdes","vagem"]],
    example: "La ensalada lleva lechuga, tomate y pepino.",
    translation: "A salada leva alface, tomate e pepino."
  },
  bebidas: {
    title: "Bebidas",
    group: "Alimentos",
    level: "A1–A2",
    description: "Bebidas quentes, frias e expressões úteis para pedir algo.",
    items: [["el agua","água"],["el café","café"],["el té","chá"],["la leche","leite"],["el zumo / jugo","suco"],["el refresco","refrigerante"],["el agua con gas","água com gás"],["el batido","vitamina/batida"],["el chocolate caliente","chocolate quente"],["una botella","uma garrafa"],["un vaso","um copo"],["una taza","uma xícara"]],
    example: "Quisiera un café y un vaso de agua, por favor.",
    translation: "Eu gostaria de um café e um copo de água, por favor."
  },
  transporte: {
    title: "Transporte",
    group: "Vida cotidiana",
    level: "A1–A2",
    description: "Meios de transporte, deslocamento e palavras úteis para viajar.",
    items: [["el autobús","ônibus"],["el tren","trem"],["el metro","metrô"],["el coche / auto","carro"],["la bicicleta","bicicleta"],["el avión","avião"],["el barco","barco"],["la estación","estação"],["el aeropuerto","aeroporto"],["el billete / boleto","passagem/bilhete"],["la parada","ponto/parada"],["el tráfico","trânsito"]],
    example: "Voy al trabajo en metro y vuelvo en autobús.",
    translation: "Vou ao trabalho de metrô e volto de ônibus."
  },
  saludos: {
    title: "Saludos y despedidas",
    group: "Vida cotidiana",
    level: "A1",
    description: "Cumprimentos, despedidas e fórmulas de cortesia.",
    items: [["¡Hola!","Olá!"],["Buenos días","Bom dia"],["Buenas tardes","Boa tarde"],["Buenas noches","Boa noite"],["¿Qué tal?","Como vai?"],["Mucho gusto","Prazer"],["Encantado/a","Prazer / encantado(a)"],["Hasta luego","Até logo"],["Hasta mañana","Até amanhã"],["Nos vemos","A gente se vê"],["Adiós","Tchau/adeus"],["Que tengas un buen día","Tenha um bom dia"]],
    example: "Buenos días, mucho gusto. Nos vemos mañana.",
    translation: "Bom dia, prazer. Nos vemos amanhã."
  },
  preguntasUtiles: {
    title: "Preguntas útiles",
    group: "Vida cotidiana",
    level: "A1–A2",
    description: "Perguntas essenciais para situações reais de comunicação.",
    items: [["¿Cómo te llamas?","Como você se chama?"],["¿De dónde eres?","De onde você é?"],["¿Dónde está el baño?","Onde fica o banheiro?"],["¿Cuánto cuesta?","Quanto custa?"],["¿Qué hora es?","Que horas são?"],["¿Puedes repetir?","Pode repetir?"],["¿Qué significa...?","O que significa...?"],["¿Cómo se dice...?","Como se diz...?"],["¿Hablas portugués?","Você fala português?"],["¿Me puede ayudar?","Pode me ajudar?"],["¿Hay wifi?","Tem Wi‑Fi?"],["¿A qué hora abre?","A que horas abre?"]],
    example: "Perdón, ¿me puede ayudar? ¿Dónde está la estación?",
    translation: "Com licença, pode me ajudar? Onde fica a estação?"
  },
  profesiones: {
    title: "Profesiones",
    group: "Estudio y trabajo",
    level: "A1–A2",
    description: "Profissões e formas de falar sobre ocupação profissional.",
    items: [["el/la profesor/a","professor(a)"],["el/la médico/a","médico(a)"],["el/la enfermero/a","enfermeiro(a)"],["el/la abogado/a","advogado(a)"],["el/la periodista","jornalista"],["el/la ingeniero/a","engenheiro(a)"],["el/la diseñador/a","designer"],["el/la vendedor/a","vendedor(a)"],["el/la investigador/a","pesquisador(a)"],["el/la historiador/a","historiador(a)"],["el/la programador/a","programador(a)"],["el/la gerente","gerente"]],
    example: "Mi hermana es profesora y trabaja en una universidad.",
    translation: "Minha irmã é professora e trabalha em uma universidade."
  },
  familia: {
    title: "Familia",
    group: "Personas",
    level: "A1–A2",
    description: "Parentesco e relações familiares.",
    items: [["la madre","mãe"],["el padre","pai"],["los padres","pais"],["el hermano / la hermana","irmão / irmã"],["el hijo / la hija","filho / filha"],["el abuelo / la abuela","avô / avó"],["el tío / la tía","tio / tia"],["el primo / la prima","primo / prima"],["el sobrino / la sobrina","sobrinho / sobrinha"],["el nieto / la nieta","neto / neta"],["el marido / esposo","marido"],["la mujer / esposa","esposa"]],
    example: "Mis abuelos viven cerca de mis tíos y primos.",
    translation: "Meus avós moram perto dos meus tios e primos."
  },
  estaciones: {
    title: "Estaciones del año",
    group: "Tiempo y calendario",
    level: "A1",
    description: "As quatro estações e expressões para falar do clima ao longo do ano.",
    items: [["la primavera","primavera"],["el verano","verão"],["el otoño","outono"],["el invierno","inverno"],["hace calor","faz calor"],["hace frío","faz frio"],["llueve","chove"],["nieva","neva"],["hace viento","venta / faz vento"],["está nublado","está nublado"],["hace sol","faz sol"],["la temperatura","temperatura"]],
    example: "En verano hace calor y en invierno hace más frío.",
    translation: "No verão faz calor e no inverno faz mais frio."
  },
  escuela: {
    title: "Escuela y universidad",
    group: "Estudio y trabajo",
    level: "A1–A2",
    description: "Vocabulário de escola, faculdade, aulas e materiais de estudo.",
    items: [["la escuela","escola"],["la universidad","universidade"],["el aula","sala de aula"],["la asignatura","disciplina"],["el examen","prova/exame"],["la tarea","tarefa"],["el cuaderno","caderno"],["el libro","livro"],["el bolígrafo","caneta"],["la biblioteca","biblioteca"],["el/la estudiante","estudante"],["la clase","aula"]],
    example: "Tengo un examen mañana y voy a estudiar en la biblioteca.",
    translation: "Tenho uma prova amanhã e vou estudar na biblioteca."
  },
  trabajo: {
    title: "Trabajo y ambiente profesional",
    group: "Estudio y trabajo",
    level: "A2–B1",
    description: "Vocabulário de escritório, carreira e rotina profissional.",
    items: [["el trabajo","trabalho"],["la empresa","empresa"],["la oficina","escritório"],["la reunión","reunião"],["el proyecto","projeto"],["el equipo","equipe"],["el jefe / la jefa","chefe"],["el compañero / la compañera","colega"],["el horario","horário"],["el sueldo","salário"],["la entrevista","entrevista"],["el currículum","currículo"]],
    example: "Hoy tenemos una reunión de equipo para revisar el proyecto.",
    translation: "Hoje temos uma reunião de equipe para revisar o projeto."
  },
  calendario: {
    title: "Días, meses y calendario",
    group: "Tiempo y calendario",
    level: "A1",
    description: "Dias da semana, meses e expressões básicas de data.",
    items: [["lunes","segunda-feira"],["martes","terça-feira"],["miércoles","quarta-feira"],["jueves","quinta-feira"],["viernes","sexta-feira"],["sábado","sábado"],["domingo","domingo"],["enero","janeiro"],["febrero","fevereiro"],["marzo","março"],["abril","abril"],["mayo","maio"],["junio","junho"],["julio","julho"],["agosto","agosto"],["septiembre","setembro"],["octubre","outubro"],["noviembre","novembro"],["diciembre","dezembro"]],
    example: "La clase es el lunes 12 de octubre.",
    translation: "A aula é na segunda-feira, 12 de outubro."
  },
  cuerpo: {
    title: "Partes del cuerpo humano",
    group: "Personas",
    level: "A1–A2",
    description: "Partes principais do corpo humano.",
    items: [["la cabeza","cabeça"],["el pelo","cabelo"],["la cara","rosto"],["el ojo","olho"],["la nariz","nariz"],["la boca","boca"],["el cuello","pescoço"],["el brazo","braço"],["la mano","mão"],["la pierna","perna"],["el pie","pé"],["la espalda","costas"]],
    example: "Me duele la espalda y también el cuello.",
    translation: "Minhas costas doem e também o pescoço."
  },
  describirPersona: {
    title: "Cómo describir a una persona",
    group: "Personas",
    level: "A1–A2",
    description: "Características físicas e de personalidade para descrever pessoas.",
    items: [["alto/a","alto(a)"],["bajo/a","baixo(a)"],["delgado/a","magro(a)"],["fuerte","forte"],["joven","jovem"],["mayor","mais velho(a)"],["simpático/a","simpático(a)"],["amable","gentil"],["tímido/a","tímido(a)"],["divertido/a","divertido(a)"],["serio/a","sério(a)"],["trabajador/a","trabalhador(a)"]],
    example: "Es una persona amable, divertida y muy trabajadora.",
    translation: "É uma pessoa gentil, divertida e muito trabalhadora."
  },
  colores: {
    title: "Colores",
    group: "Vida cotidiana",
    level: "A1",
    description: "Cores básicas e frequentes em descrições.",
    items: [["rojo/a","vermelho(a)"],["azul","azul"],["amarillo/a","amarelo(a)"],["verde","verde"],["negro/a","preto(a)"],["blanco/a","branco(a)"],["gris","cinza"],["marrón / café","marrom"],["rosa","rosa"],["morado/a / violeta","roxo/violeta"],["naranja","laranja"],["beige","bege"]],
    example: "La pared es blanca y el sofá es gris.",
    translation: "A parede é branca e o sofá é cinza."
  },
  casa: {
    title: "La casa",
    group: "Casa",
    level: "A1–A2",
    description: "Cômodos e espaços principais de uma casa.",
    items: [["la casa","casa"],["el piso / apartamento","apartamento"],["el salón","sala de estar"],["el dormitorio","quarto"],["la cocina","cozinha"],["el baño","banheiro"],["el comedor","sala de jantar"],["el pasillo","corredor"],["el balcón","varanda"],["el jardín","jardim"],["el garaje","garagem"],["la entrada","entrada"]],
    example: "Mi casa tiene dos dormitorios, una cocina y un balcón.",
    translation: "Minha casa tem dois quartos, uma cozinha e uma varanda."
  },
  muebles: {
    title: "Muebles",
    group: "Casa",
    level: "A1–A2",
    description: "Móveis comuns de diferentes cômodos.",
    items: [["la mesa","mesa"],["la silla","cadeira"],["el sofá","sofá"],["la cama","cama"],["el armario","guarda-roupa/armário"],["la estantería","estante"],["el escritorio","escrivaninha"],["la mesita de noche","criado-mudo"],["el sillón","poltrona"],["la cómoda","cômoda"],["el banco","banco"],["la repisa","prateleira"]],
    example: "El escritorio está al lado de la estantería.",
    translation: "A escrivaninha está ao lado da estante."
  },
  objetosCasa: {
    title: "Objetos de la casa",
    group: "Casa",
    level: "A1–A2",
    description: "Itens domésticos de cozinha, banheiro, quarto e limpeza.",
    items: [["la lámpara","lâmpada/luminária"],["la cortina","cortina"],["la alfombra","tapete"],["el espejo","espelho"],["la almohada","travesseiro"],["la sábana","lençol"],["la toalla","toalha"],["el plato","prato"],["el vaso","copo"],["el tenedor","garfo"],["la cuchara","colher"],["el cuchillo","faca"],["la sartén","frigideira"],["la olla","panela"],["la escoba","vassoura"],["la papelera","lixeira"]],
    example: "Los platos y los vasos están en el armario de la cocina.",
    translation: "Os pratos e os copos estão no armário da cozinha."
  }
};

const vocabularyScreen = document.getElementById("vocabulary-screen");
const vocabularyReaderScreen = document.getElementById("vocabulary-reader-screen");
const vocabularyGrid = document.getElementById("vocabulary-grid");
const vocabularySearch = document.getElementById("vocabulary-search");
const vocabularyFilterButtons = [...document.querySelectorAll("[data-vocabulary-filter]")];
let vocabularyFilter = "all";
let currentVocabularyId = null;
let currentPractice = [];
let currentPracticeIndex = 0;
let practiceScore = 0;

function vocabularyIsStudied(id) {
  try { return localStorage.getItem(`vae-vocabulary-${id}`) === "yes"; } catch { return false; }
}

function hideVocabularyScreens() {
  vocabularyScreen?.classList.add("hidden");
  vocabularyReaderScreen?.classList.add("hidden");
}

function hideOtherScreensForVocabulary() {
  ["home-screen","level-screen","quiz-screen","result-screen","grammar-screen","grammar-reader-screen","readings-screen","reader-screen"].forEach((id) => {
    document.getElementById(id)?.classList.add("hidden");
  });
}

function setVocabularyNavActive() {
  document.querySelectorAll(".main-nav .nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === "vocabulary");
  });
}

function showVocabularyLibrary() {
  hideOtherScreensForVocabulary();
  vocabularyReaderScreen.classList.add("hidden");
  vocabularyScreen.classList.remove("hidden");
  setVocabularyNavActive();
  renderVocabularyCards();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderVocabularyCards() {
  const query = vocabularySearch.value.trim().toLocaleLowerCase("pt-BR");
  vocabularyGrid.innerHTML = "";

  Object.entries(vocabularyData)
    .filter(([, topic]) => vocabularyFilter === "all" || topic.group === vocabularyFilter)
    .filter(([, topic]) => !query || `${topic.title} ${topic.description} ${topic.items.flat().join(" ")}`.toLocaleLowerCase("pt-BR").includes(query))
    .forEach(([id, topic]) => {
      const card = document.createElement("article");
      card.className = "vocabulary-card";
      card.innerHTML = `
        <div class="vocabulary-card-top">
          <span class="vocabulary-level">${topic.level}</span>
          <span class="vocabulary-count">${topic.items.length} termos</span>
        </div>
        <p class="vocabulary-group">${topic.group}</p>
        <h2>${topic.title}</h2>
        <p>${topic.description}</p>
        <div class="vocabulary-card-footer">
          <button class="secondary-button" type="button" data-open-vocabulary="${id}">Estudiar vocabulario</button>
          <span class="vocabulary-status">${vocabularyIsStudied(id) ? "✓ Estudiado" : ""}</span>
        </div>`;
      vocabularyGrid.appendChild(card);
    });

  if (!vocabularyGrid.children.length) {
    vocabularyGrid.innerHTML = '<p class="vocabulary-empty">Nenhum tema encontrado com esse filtro.</p>';
  }

  vocabularyGrid.querySelectorAll("[data-open-vocabulary]").forEach((button) => {
    button.addEventListener("click", () => openVocabularyTopic(button.dataset.openVocabulary));
  });
}

function openVocabularyTopic(id) {
  const topic = vocabularyData[id];
  if (!topic) return;
  currentVocabularyId = id;
  hideOtherScreensForVocabulary();
  vocabularyScreen.classList.add("hidden");
  vocabularyReaderScreen.classList.remove("hidden");
  setVocabularyNavActive();

  document.getElementById("vocabulary-reader-title").textContent = topic.title;
  document.getElementById("vocabulary-reader-meta").innerHTML = `<span>${topic.level}</span><span>${topic.group}</span><span>${topic.items.length} termos</span>`;
  document.getElementById("vocabulary-reader-description").textContent = topic.description;
  document.getElementById("vocabulary-example").innerHTML = `<strong>Ejemplo:</strong> ${topic.example}<br><span>${topic.translation}</span>`;
  document.getElementById("vocabulary-terms").innerHTML = topic.items.map(([es, pt]) => `
    <div class="vocabulary-term-row">
      <div class="vocabulary-es">${es}</div>
      <div class="vocabulary-pt">${pt}</div>
    </div>`).join("");

  const markButton = document.getElementById("vocabulary-mark-button");
  const savedNote = document.getElementById("vocabulary-saved-note");
  markButton.textContent = vocabularyIsStudied(id) ? "Estudiado ✓" : "Marcar como estudiado";
  savedNote.textContent = vocabularyIsStudied(id) ? "✓ Este tema já está marcado como estudado." : "";
  startVocabularyPractice(topic);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function shuffleVocabulary(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function startVocabularyPractice(topic) {
  const source = shuffleVocabulary(topic.items).slice(0, Math.min(5, topic.items.length));
  currentPractice = source.map(([es, pt]) => {
    const distractors = shuffleVocabulary(topic.items.filter(([, otherPt]) => otherPt !== pt)).slice(0, 3).map(([, otherPt]) => otherPt);
    return { es, correct: pt, options: shuffleVocabulary([pt, ...distractors]) };
  });
  currentPracticeIndex = 0;
  practiceScore = 0;
  renderVocabularyPractice();
}

function renderVocabularyPractice() {
  const box = document.getElementById("vocabulary-practice");
  const result = document.getElementById("vocabulary-practice-result");
  result.className = "vocabulary-practice-result hidden";
  result.textContent = "";

  if (currentPracticeIndex >= currentPractice.length) {
    box.innerHTML = `
      <p class="vocabulary-practice-finish">Você acertou <strong>${practiceScore}/${currentPractice.length}</strong>.</p>
      <button class="secondary-button" id="vocabulary-practice-restart" type="button">Practicar de nuevo</button>`;
    document.getElementById("vocabulary-practice-restart").addEventListener("click", () => startVocabularyPractice(vocabularyData[currentVocabularyId]));
    return;
  }

  const item = currentPractice[currentPracticeIndex];
  box.innerHTML = `
    <p class="vocabulary-practice-progress">${currentPracticeIndex + 1} de ${currentPractice.length}</p>
    <h3>¿Qué significa <em>${item.es}</em>?</h3>
    <div class="vocabulary-practice-options">
      ${item.options.map((option) => `<button class="vocabulary-practice-option" type="button" data-vocabulary-answer="${option.replace(/"/g, "&quot;")}">${option}</button>`).join("")}
    </div>`;

  box.querySelectorAll("[data-vocabulary-answer]").forEach((button) => {
    button.addEventListener("click", () => checkVocabularyPractice(button, item));
  });
}

function checkVocabularyPractice(button, item) {
  const selected = button.dataset.vocabularyAnswer;
  const isCorrect = selected === item.correct;
  if (isCorrect) practiceScore += 1;

  document.querySelectorAll(".vocabulary-practice-option").forEach((option) => {
    option.disabled = true;
    if (option.dataset.vocabularyAnswer === item.correct) option.classList.add("correct");
    else if (option === button) option.classList.add("incorrect");
  });

  const result = document.getElementById("vocabulary-practice-result");
  result.classList.remove("hidden", "good", "needs-work");
  result.classList.add(isCorrect ? "good" : "needs-work");
  result.innerHTML = isCorrect ? "¡Muy bien!" : `A resposta é <strong>${item.correct}</strong>.`;

  const next = document.createElement("button");
  next.className = "secondary-button vocabulary-next";
  next.type = "button";
  next.textContent = currentPracticeIndex + 1 === currentPractice.length ? "Ver resultado" : "Siguiente";
  next.addEventListener("click", () => {
    currentPracticeIndex += 1;
    renderVocabularyPractice();
  });
  result.appendChild(next);
}

vocabularySearch?.addEventListener("input", renderVocabularyCards);
vocabularyFilterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    vocabularyFilter = button.dataset.vocabularyFilter;
    vocabularyFilterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderVocabularyCards();
  });
});

document.getElementById("vocabulary-reader-back")?.addEventListener("click", showVocabularyLibrary);
document.getElementById("vocabulary-mark-button")?.addEventListener("click", () => {
  if (!currentVocabularyId) return;
  try { localStorage.setItem(`vae-vocabulary-${currentVocabularyId}`, "yes"); } catch { /* armazenamento pode estar bloqueado */ }
  document.getElementById("vocabulary-mark-button").textContent = "Estudiado ✓";
  document.getElementById("vocabulary-saved-note").textContent = "✓ Progresso salvo neste navegador.";
});

[...document.querySelectorAll('[data-route="vocabulary"]')].forEach((button) => {
  button.addEventListener("click", showVocabularyLibrary);
});

[...document.querySelectorAll("[data-route]")].forEach((button) => {
  if (button.dataset.route !== "vocabulary") button.addEventListener("click", hideVocabularyScreens);
});

renderVocabularyCards();