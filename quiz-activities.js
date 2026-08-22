const extendedQuizActivities = {
  grammarBasics: {
    title: "Gramática essencial",
    level: "A1–A2",
    description: "Artigos, gênero, plural, ser/estar, hay, gustar, concordância e estruturas básicas.",
    questions: [
      { q: "Complete: “___ casa de Ana es muy bonita.”", options: ["El", "La", "Lo", "Un"], correct: "La", explanation: "Casa é um substantivo feminino singular; por isso, usa-se o artigo definido la." },
      { q: "Complete: “Carlos ___ médico.”", options: ["está", "es", "hay", "son"], correct: "es", explanation: "Para profissão ou identidade, usa-se ser: Carlos es médico." },
      { q: "Complete: “Mis libros ___ encima de la mesa.”", options: ["son", "están", "hay", "es"], correct: "están", explanation: "Para localização de algo conhecido, usa-se estar: los libros están..." },
      { q: "Complete: “En esta calle ___ dos farmacias.”", options: ["están", "son", "hay", "es"], correct: "hay", explanation: "Hay indica existência, sem concordar em número: hay dos farmacias." },
      { q: "Qual é o plural correto de “voz”?", options: ["vozes", "voces", "voz", "voceses"], correct: "voces", explanation: "Substantivos terminados em -z formam o plural com -ces: voz → voces." },
      { q: "Complete: “A Marta le ___ las películas españolas.”", options: ["gusta", "gustan", "gustas", "gusto"], correct: "gustan", explanation: "O verbo concorda com películas, que está no plural: le gustan las películas." },
      { q: "Qual combinação apresenta concordância correta?", options: ["una camisa blanco", "un coche roja", "unas casas grandes", "los mesa nuevas"], correct: "unas casas grandes", explanation: "Artigo, substantivo e adjetivo concordam no feminino plural: unas casas grandes." },
      { q: "Complete: “Yo ___ a las siete todos los días.”", options: ["me levanto", "te levantas", "se levanta", "nos levantamos"], correct: "me levanto", explanation: "Com yo e o verbo reflexivo levantarse, usa-se me levanto." },
      { q: "Complete: “Son ___ ocho y media.”", options: ["la", "las", "los", "el"], correct: "las", explanation: "Para horas no plural, usa-se son las..." },
      { q: "Qual palavra está corretamente acentuada?", options: ["cancion", "canción", "cáncion", "canción"], correct: "canción", explanation: "Canción é aguda terminada em -n e recebe tilde na sílaba tônica." }
    ]
  },
  verbs: {
    title: "Verbos e tempos",
    level: "B1–B2",
    description: "Passados, futuro, condicional e subjuntivo em contextos de uso.",
    questions: [
      { q: "Complete: “Ayer ___ una película muy buena.”", options: ["veo", "vi", "veía", "veré"], correct: "vi", explanation: "Ayer delimita uma ação concluída no passado; usa-se pretérito indefinido: vi." },
      { q: "Complete: “Cuando era niño, ___ con mis abuelos cada verano.”", options: ["viví", "vivía", "viviré", "he vivido"], correct: "vivía", explanation: "Uma situação habitual ou descritiva no passado pede o imperfecto: vivía." },
      { q: "Complete: “Espero que tú ___ mañana.”", options: ["vienes", "vendrás", "vengas", "viniste"], correct: "vengas", explanation: "Depois de espero que, usa-se o presente do subjuntivo: vengas." },
      { q: "Complete: “Si tuviera dinero, ___ por América Latina.”", options: ["viajo", "viajé", "viajaría", "viajaré"], correct: "viajaría", explanation: "A estrutura si + imperfecto de subjuntivo combina com o condicional: viajaría." },
      { q: "Complete: “Cuando llegué, ellos ya ___.”", options: ["salieron", "habían salido", "salen", "saldrán"], correct: "habían salido", explanation: "Uma ação anterior a outra ação passada é expressa pelo pluscuamperfecto: habían salido." },
      { q: "Complete: “Mañana ___ temprano para estudiar.”", options: ["me levanté", "me levantaré", "me levantaba", "me haya levantado"], correct: "me levantaré", explanation: "A frase projeta uma ação futura: me levantaré." },
      { q: "Complete: “No creo que ellos ___ la respuesta.”", options: ["saben", "sepan", "supieron", "sabrán"], correct: "sepan", explanation: "No creo que introduz dúvida ou negação de certeza, favorecendo o subjuntivo: sepan." },
      { q: "Complete: “Si lo ___ antes, te habría llamado.”", options: ["supe", "sabía", "hubiera sabido", "haya sabido"], correct: "hubiera sabido", explanation: "Uma condição irreal no passado pede si + pluscuamperfecto de subjuntivo: hubiera sabido." },
      { q: "Qual forma completa corretamente “Estoy ___ un libro”?", options: ["leyendo", "leiendo", "leído", "leer"], correct: "leyendo", explanation: "O gerúndio de leer é leyendo; estar + gerundio indica ação em desenvolvimento." },
      { q: "Complete: “Yo en tu lugar, ___ con el profesor.”", options: ["hablaré", "hablaría", "hablé", "hablara"], correct: "hablaría", explanation: "O condicional é comum para dar conselho ou apresentar uma ação hipotética: hablaría." }
    ]
  },
  pronounsPrepositions: {
    title: "Pronomes e preposições",
    level: "A2–B1",
    description: "Objetos direto e indireto, contrações, por/para, preposições de tempo e direção.",
    questions: [
      { q: "Complete: “Vi a Marta ayer y ___ saludé.”", options: ["la", "le", "lo", "se"], correct: "la", explanation: "Marta é complemento direto feminino singular: la saludé." },
      { q: "Complete: “A Juan ___ di las llaves.”", options: ["lo", "la", "le", "los"], correct: "le", explanation: "Juan é destinatário da ação e funciona como complemento indireto: le di." },
      { q: "Transforme corretamente: “Le di el libro a Ana.”", options: ["Le lo di", "Se lo di", "Lo le di", "Se le di"], correct: "Se lo di", explanation: "Antes de lo, la, los ou las, le/les transforma-se em se: se lo di." },
      { q: "Complete: “Este regalo es ___ ti.”", options: ["por", "para", "de", "hacia"], correct: "para", explanation: "Para indica destinatário: este regalo es para ti." },
      { q: "Complete: “Estudio español ___ trabajar en México.”", options: ["por", "para", "desde", "sin"], correct: "para", explanation: "Para + infinitivo expressa finalidade: para trabajar." },
      { q: "Complete: “Paseamos ___ el centro durante dos horas.”", options: ["para", "por", "hacia", "hasta"], correct: "por", explanation: "Por pode indicar percurso ou deslocamento através de um lugar: por el centro." },
      { q: "Qual contração está correta?", options: ["a el museo", "al museo", "del el museo", "en el → nel"], correct: "al museo", explanation: "Em espanhol, a + el forma al." },
      { q: "Complete: “Vengo ___ trabajo.”", options: ["de el", "del", "al", "por el"], correct: "del", explanation: "De + el forma a contração del: vengo del trabajo." },
      { q: "Complete: “La clase es ___ las nueve ___ las once.”", options: ["de / por", "desde / hasta", "para / por", "en / a"], correct: "desde / hasta", explanation: "Desde marca o ponto inicial e hasta o limite final: desde las nueve hasta las once." },
      { q: "Complete: “¿Quieres venir ___ al cine?”", options: ["conmigo", "con yo", "con mí", "por mí"], correct: "conmigo", explanation: "A forma correspondente a con + mí é comigo: conmigo." }
    ]
  },
  everydayVocabulary: {
    title: "Vocabulário cotidiano",
    level: "A1–A2",
    description: "Família, casa, transporte, alimentação, escola, corpo humano, cores e saudações.",
    questions: [
      { q: "Qual é a tradução de “sobrino”?", options: ["sobrinho", "primo", "cunhado", "neto"], correct: "sobrinho", explanation: "Sobrino significa sobrinho; sobrina significa sobrinha." },
      { q: "O que significa “nevera” em muitos países de língua espanhola?", options: ["geladeira", "forno", "pia", "mesa"], correct: "geladeira", explanation: "Nevera é uma palavra comum para geladeira/refrigerador." },
      { q: "Qual palavra significa “ônibus”?", options: ["autobús", "avión", "barco", "bicicleta"], correct: "autobús", explanation: "Autobús é uma das formas gerais para ônibus em espanhol." },
      { q: "Qual palavra significa “morango”?", options: ["fresa", "pera", "uva", "melocotón"], correct: "fresa", explanation: "Fresa corresponde a morango." },
      { q: "O que significa “desayuno”?", options: ["café da manhã", "almoço", "lanche da tarde", "jantar"], correct: "café da manhã", explanation: "Desayuno é a primeira refeição do dia: café da manhã." },
      { q: "Qual profissão corresponde a “enfermero/enfermera”?", options: ["enfermeiro/enfermeira", "engenheiro/engenheira", "professor/professora", "advogado/advogada"], correct: "enfermeiro/enfermeira", explanation: "Enfermero/enfermera corresponde a enfermeiro/enfermeira." },
      { q: "Qual parte do corpo é “rodilla”?", options: ["joelho", "cotovelo", "ombro", "tornozelo"], correct: "joelho", explanation: "Rodilla significa joelho." },
      { q: "Qual cor é “amarillo”?", options: ["amarelo", "vermelho", "roxo", "cinza"], correct: "amarelo", explanation: "Amarillo significa amarelo." },
      { q: "Qual expressão é uma despedida?", options: ["Buenos días", "Mucho gusto", "Hasta luego", "¿Cómo te llamas?"], correct: "Hasta luego", explanation: "Hasta luego é usada para se despedir, com sentido de até logo." },
      { q: "O que significa “aula” no contexto escolar em espanhol?", options: ["sala de aula", "aluno", "prova", "caderno"], correct: "sala de aula", explanation: "Aula em espanhol designa a sala de aula; clase designa a aula enquanto atividade." }
    ]
  },
  phrases: {
    title: "Compreensão de frases e expressões",
    level: "B1–B2",
    description: "Interprete construções frequentes e expressões idiomáticas em contexto.",
    questions: [
      { q: "O que significa “Tengo ganas de viajar”?", options: ["Tenho vontade de viajar", "Tenho medo de viajar", "Preciso viajar agora", "Acabei de viajar"], correct: "Tenho vontade de viajar", explanation: "Tener ganas de + infinitivo significa ter vontade de fazer algo." },
      { q: "O que significa “Acabo de llegar”?", options: ["Acabei de chegar", "Vou chegar amanhã", "Costumo chegar cedo", "Estou tentando chegar"], correct: "Acabei de chegar", explanation: "Acabar de + infinitivo indica uma ação que ocorreu há pouquíssimo tempo." },
      { q: "O que significa “Suelo estudiar por la noche”?", options: ["Costumo estudar à noite", "Comecei a estudar à noite", "Nunca estudo à noite", "Preciso estudar à noite"], correct: "Costumo estudar à noite", explanation: "Soler + infinitivo expressa hábito ou frequência habitual." },
      { q: "O que significa “Me di cuenta del error”?", options: ["Percebi o erro", "Escondi o erro", "Corrigi o erro imediatamente", "Causei o erro"], correct: "Percebi o erro", explanation: "Darse cuenta de significa perceber ou dar-se conta de algo." },
      { q: "O que significa “Echo de menos a mi familia”?", options: ["Sinto falta da minha família", "Visito minha família", "Discuto com minha família", "Moro longe da minha família"], correct: "Sinto falta da minha família", explanation: "Echar de menos significa sentir falta ou saudade." },
      { q: "O que significa “Estamos de acuerdo”?", options: ["Estamos de acordo", "Estamos cansados", "Estamos atrasados", "Estamos em dúvida"], correct: "Estamos de acordo", explanation: "Estar de acuerdo significa concordar." },
      { q: "O que significa “Se puso nervioso”?", options: ["Ficou nervoso", "Continuou nervoso", "Fingiu estar nervoso", "Deixou de ficar nervoso"], correct: "Ficou nervoso", explanation: "Ponerse + adjetivo pode indicar mudança de estado: ponerse nervioso = ficar nervoso." },
      { q: "Em “Quería salir; sin embargo, empezó a llover”, “sin embargo” expressa:", options: ["contraste", "causa", "finalidade", "explicação"], correct: "contraste", explanation: "Sin embargo introduz oposição ou contraste entre duas ideias." },
      { q: "O que significa “Quedamos a las ocho”?", options: ["Combinamos de nos encontrar às oito", "Terminamos às oito", "Dormimos até as oito", "Trabalhamos durante oito horas"], correct: "Combinamos de nos encontrar às oito", explanation: "Quedar pode significar combinar um encontro em determinado horário ou lugar." },
      { q: "O que expressa “Llevo dos años estudiando español”?", options: ["Estudo espanhol há dois anos e continuo estudando", "Estudei espanhol durante dois anos e parei", "Vou estudar espanhol por dois anos", "Comecei a estudar espanhol daqui a dois anos"], correct: "Estudo espanhol há dois anos e continuo estudando", explanation: "Llevar + período + gerundio expressa duração acumulada de uma ação ainda em curso." }
    ]
  },
  advancedChallenge: {
    title: "Desafio avançado",
    level: "C1–C2",
    description: "Subjuntivo, conectores, regência, relativos e expressões idiomáticas de nível avançado.",
    questions: [
      { q: "Complete: “Por mucho que ___, no cambiaré de opinión.”", options: ["insistes", "insistas", "insistirás", "insististe"], correct: "insistas", explanation: "Por mucho que introduz uma construção concessiva que normalmente exige subjuntivo nesse contexto." },
      { q: "Complete: “Habla como si lo ___ todo.”", options: ["sabe", "supiera", "sabrá", "supo"], correct: "supiera", explanation: "Como si introduz uma comparação hipotética e pede imperfecto de subjuntivo." },
      { q: "Complete: “No fue casualidad, ___ una decisión consciente.”", options: ["sino", "si no", "aunque", "mientras"], correct: "sino", explanation: "Depois de uma negação, sino introduz correção ou oposição: não X, mas sim Y." },
      { q: "Qual frase está de acordo com a norma-padrão?", options: ["Pienso de que llegará.", "Estoy seguro de que vendrá.", "Creo de que es verdad.", "Opino de que funciona."], correct: "Estoy seguro de que vendrá.", explanation: "Estar seguro rege a preposição de, por isso a construção é estar seguro de que." },
      { q: "Complete: “La escritora, ___ novelas fueron premiadas, dará una conferencia.”", options: ["que", "quien", "cuyas", "cuyos"], correct: "cuyas", explanation: "O relativo possessivo concorda com novelas, feminino plural: cuyas novelas." },
      { q: "No registro formal, “no obstante” tem sentido próximo de:", options: ["sin embargo", "por tanto", "además", "es decir"], correct: "sin embargo", explanation: "No obstante é um conector adversativo, próximo de sin embargo." },
      { q: "O que significa “dar algo por sentado”?", options: ["considerar algo certo sem questionar", "recusar algo imediatamente", "explicar algo em detalhes", "colocar algo por escrito"], correct: "considerar algo certo sem questionar", explanation: "Dar por sentado significa assumir algo como certo ou evidente." },
      { q: "O que significa “a duras penas”?", options: ["com muita dificuldade", "com extrema rapidez", "sem esforço algum", "de maneira improvisada"], correct: "com muita dificuldade", explanation: "A duras penas significa com grande esforço ou dificuldade." },
      { q: "Complete: “Ojalá ___ más tiempo para terminar el proyecto.”", options: ["tengo", "tenga", "tendré", "tuve"], correct: "tenga", explanation: "Ojalá introduz desejo e exige subjuntivo: ojalá tenga." },
      { q: "Complete: “Aunque ___ la verdad, no cambiaría nada.”", options: ["supiera", "sabré", "sé", "supe"], correct: "supiera", explanation: "No contexto hipotético, aunque + imperfecto de subjuntivo apresenta uma condição não afirmada como real." }
    ]
  }
};

const activityState = { key: null, index: 0, answers: [] };
const activitiesBlock = document.getElementById("quiz-activities-block");
const activityGrid = document.getElementById("activity-grid");
const activityScreen = document.getElementById("activity-screen");
const activityResultScreen = document.getElementById("activity-result-screen");
const activityTitle = document.getElementById("activity-title");
const activityBadge = document.getElementById("activity-badge");
const activityProgress = document.getElementById("activity-progress");
const activityProgressBar = document.getElementById("activity-progress-bar");
const activityQuestionNumber = document.getElementById("activity-question-number");
const activityQuestion = document.getElementById("activity-question");
const activityOptions = document.getElementById("activity-options");
const activityWarning = document.getElementById("activity-warning");
const activityNext = document.getElementById("activity-next");
const activityResultTitle = document.getElementById("activity-result-title");
const activityFinalScore = document.getElementById("activity-final-score");
const activityResultMessage = document.getElementById("activity-result-message");
const answerKeyList = document.getElementById("answer-key-list");

function hideForExtendedActivity() {
  ["home-screen","level-screen","quiz-screen","result-screen","grammar-screen","grammar-reader-screen","vocabulary-screen","vocabulary-reader-screen","readings-screen","reader-screen"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  activityScreen.classList.add("hidden");
  activityResultScreen.classList.add("hidden");
}

function renderActivityCards() {
  if (!activityGrid) return;
  activityGrid.innerHTML = "";
  Object.entries(extendedQuizActivities).forEach(([key, activity]) => {
    const card = document.createElement("article");
    card.className = "activity-card";
    card.innerHTML = `
      <div class="activity-card-top"><span class="activity-level">${activity.level}</span><span class="activity-count">${activity.questions.length} questões</span></div>
      <h3>${activity.title}</h3>
      <p>${activity.description}</p>
      <button class="secondary-button" type="button" data-start-activity="${key}">Fazer atividade</button>`;
    activityGrid.appendChild(card);
  });
  activityGrid.querySelectorAll("[data-start-activity]").forEach((button) => button.addEventListener("click", () => startExtendedActivity(button.dataset.startActivity)));
}

function startExtendedActivity(key) {
  const activity = extendedQuizActivities[key];
  if (!activity) return;
  activityState.key = key;
  activityState.index = 0;
  activityState.answers = Array(activity.questions.length).fill(null);
  hideForExtendedActivity();
  activityScreen.classList.remove("hidden");
  document.querySelectorAll(".main-nav .nav-link").forEach((button) => button.classList.toggle("active", button.dataset.route === "quiz"));
  renderExtendedQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderExtendedQuestion() {
  const activity = extendedQuizActivities[activityState.key];
  const item = activity.questions[activityState.index];
  const current = activityState.index + 1;
  const total = activity.questions.length;
  activityTitle.textContent = activity.title;
  activityBadge.textContent = activity.level;
  activityProgress.textContent = `Questão ${current} de ${total}`;
  activityQuestionNumber.textContent = String(current).padStart(2, "0");
  activityProgressBar.style.width = `${(current / total) * 100}%`;
  activityQuestion.textContent = item.q;
  activityWarning.textContent = "";
  activityOptions.innerHTML = "";
  const selected = activityState.answers[activityState.index];
  item.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = `activity-option${selected === option ? " selected" : ""}`;
    label.innerHTML = `<input type="radio" name="activity-answer" value="${index}" ${selected === option ? "checked" : ""}><span>${option}</span>`;
    label.querySelector("input").addEventListener("change", () => {
      activityState.answers[activityState.index] = option;
      activityOptions.querySelectorAll(".activity-option").forEach((el) => el.classList.remove("selected"));
      label.classList.add("selected");
      activityWarning.textContent = "";
    });
    activityOptions.appendChild(label);
  });
  activityNext.textContent = current === total ? "Finalizar e ver gabarito" : "Próxima questão";
}

function nextExtendedQuestion() {
  if (!activityState.answers[activityState.index]) {
    activityWarning.textContent = "Selecione uma alternativa antes de continuar.";
    return;
  }
  const activity = extendedQuizActivities[activityState.key];
  if (activityState.index < activity.questions.length - 1) {
    activityState.index += 1;
    renderExtendedQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    showExtendedResult();
  }
}

function showExtendedResult() {
  const activity = extendedQuizActivities[activityState.key];
  let score = 0;
  activity.questions.forEach((item, index) => {
    if (activityState.answers[index] === item.correct) score += 1;
  });
  hideForExtendedActivity();
  activityResultScreen.classList.remove("hidden");
  activityResultTitle.textContent = activity.title;
  activityFinalScore.textContent = `${score}/${activity.questions.length}`;
  const ratio = score / activity.questions.length;
  activityResultMessage.textContent = ratio === 1
    ? "¡Excelente! Você acertou todas as questões. Confira o gabarito detalhado abaixo."
    : ratio >= .8
      ? "¡Muy bien! Seu desempenho foi muito consistente. Revise abaixo apenas os pontos de dúvida."
      : ratio >= .6
        ? "¡Buen trabajo! Você tem uma boa base. Use o gabarito para consolidar os conteúdos que faltaram."
        : "Continue praticando. O gabarito detalhado abaixo mostra exatamente o que revisar antes de tentar novamente.";
  answerKeyList.innerHTML = "";
  activity.questions.forEach((item, index) => {
    const userAnswer = activityState.answers[index];
    const correct = userAnswer === item.correct;
    const review = document.createElement("article");
    review.className = `answer-review ${correct ? "correct" : "incorrect"}`;
    review.innerHTML = `
      <div class="answer-review-head"><strong>${index + 1}. ${item.q}</strong><span class="answer-review-status">${correct ? "✓ Acertou" : "✗ Revisar"}</span></div>
      <p>Sua resposta: <strong>${userAnswer}</strong></p>
      <p class="correct-answer">Gabarito: ${item.correct}</p>
      <p>${item.explanation}</p>`;
    answerKeyList.appendChild(review);
  });
  try {
    const prev = Number(localStorage.getItem(`vae-activity-best-${activityState.key}`)) || 0;
    if (score > prev) localStorage.setItem(`vae-activity-best-${activityState.key}`, String(score));
  } catch { /* armazenamento pode estar bloqueado */ }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function returnToQuizHub() {
  activityScreen.classList.add("hidden");
  activityResultScreen.classList.add("hidden");
  const levelScreen = document.getElementById("level-screen");
  if (levelScreen) levelScreen.classList.remove("hidden");
  document.querySelectorAll(".main-nav .nav-link").forEach((button) => button.classList.toggle("active", button.dataset.route === "quiz"));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("activity-back")?.addEventListener("click", returnToQuizHub);
document.getElementById("activity-next")?.addEventListener("click", nextExtendedQuestion);
document.getElementById("activity-retry")?.addEventListener("click", () => startExtendedActivity(activityState.key));
document.getElementById("activity-choose")?.addEventListener("click", returnToQuizHub);

document.querySelectorAll('[data-route]').forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.route !== "quiz") {
      activityScreen?.classList.add("hidden");
      activityResultScreen?.classList.add("hidden");
    }
  });
});

renderActivityCards();
