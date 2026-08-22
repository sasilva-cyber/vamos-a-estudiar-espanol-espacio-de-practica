const quizData = {
  basic: {
    label: "Básico",
    cefr: "A1–A2",
    questions: [
      {
        category: "Ser e estar",
        question: "Complete: “María ___ estudiante de Letras.”",
        answers: ["soy", "eres", "es", "está"],
        correct: "es",
        explanation: "Para identificar profissão, condição ou identidade, usa-se o verbo ser: “María es estudiante”.",
      },
      {
        category: "Presente",
        question: "Complete: “Nosotros ___ al museo los sábados.”",
        answers: ["vamos", "van", "vais", "voy"],
        correct: "vamos",
        explanation: "A forma de ir no presente para nosotros é “vamos”.",
      },
      {
        category: "Vocabulário",
        question: "Qual é o plural correto de “lápiz”?",
        answers: ["lápizes", "lápices", "lápizs", "lápizeses"],
        correct: "lápices",
        explanation: "Palavras terminadas em -z formam o plural trocando z por c antes de -es: lápiz → lápices.",
      },
      {
        category: "Expressões cotidianas",
        question: "O que significa “Tengo hambre”?",
        answers: ["Estou com sede", "Estou com sono", "Estou com fome", "Estou com pressa"],
        correct: "Estou com fome",
        explanation: "Em espanhol, “tener hambre” significa estar com fome.",
      },
      {
        category: "Hay / estar",
        question: "Complete: “En mi barrio ___ una farmacia nueva.”",
        answers: ["es", "está", "hay", "son"],
        correct: "hay",
        explanation: "“Hay” é usado para indicar a existência de algo: “hay una farmacia”.",
      },
      {
        category: "Verbo gustar",
        question: "Complete: “A mí me ___ el café.”",
        answers: ["gusto", "gustan", "gusta", "gustas"],
        correct: "gusta",
        explanation: "Como “el café” está no singular, usa-se “gusta”: “A mí me gusta el café”.",
      },
      {
        category: "Localização",
        question: "Complete: “Madrid ___ en España.”",
        answers: ["es", "está", "hay", "son"],
        correct: "está",
        explanation: "Para indicar localização de lugares, usa-se estar: “Madrid está en España”.",
      },
      {
        category: "Pretérito indefinido",
        question: "Complete: “Ayer ___ al cine y vi una película.”",
        answers: ["fui", "iba", "voy", "iré"],
        correct: "fui",
        explanation: "A ação foi concluída ontem; por isso, usa-se o pretérito indefinido de ir: “fui”.",
      },
      {
        category: "Horas",
        question: "Complete: “Son ___ dos de la tarde.”",
        answers: ["la", "las", "los", "el"],
        correct: "las",
        explanation: "Para dizer as horas no plural, usa-se “son las…”: “Son las dos”.",
      },
      {
        category: "Preposições",
        question: "Complete: “Me levanto ___ las siete de la mañana.”",
        answers: ["a", "en", "de", "por"],
        correct: "a",
        explanation: "Para indicar uma hora específica, emprega-se a preposição “a”: “a las siete”.",
      },
    ],
  },
  intermediate: {
    label: "Intermediário",
    cefr: "B1–B2",
    questions: [
      {
        category: "Pretérito imperfecto",
        question: "Complete: “Cuando era niño, ___ al parque todos los días.”",
        answers: ["fui", "iba", "iré", "haya ido"],
        correct: "iba",
        explanation: "Uma ação habitual no passado pede o pretérito imperfecto: “iba al parque todos los días”.",
      },
      {
        category: "Presente de subjuntivo",
        question: "Complete: “Espero que tú ___ tiempo para venir.”",
        answers: ["tienes", "tendrás", "tengas", "tuviste"],
        correct: "tengas",
        explanation: "Depois de “espero que”, usa-se subjuntivo para expressar desejo ou expectativa: “tengas”.",
      },
      {
        category: "Condicional",
        question: "Complete: “Si tuviera más tiempo, ___ contigo.”",
        answers: ["voy", "iría", "fui", "haya ido"],
        correct: "iría",
        explanation: "A estrutura hipotética “si + imperfecto de subjuntivo” combina normalmente com o condicional: “iría”.",
      },
      {
        category: "Por e para",
        question: "Complete: “Estudio español ___ trabajar en otro país.”",
        answers: ["por", "para", "desde", "hacia"],
        correct: "para",
        explanation: "“Para” expressa finalidade ou objetivo: estudar espanhol com a finalidade de trabalhar em outro país.",
      },
      {
        category: "Pronomes",
        question: "Complete: “A Marta ___ di el libro ayer.”",
        answers: ["la", "lo", "le", "se la"],
        correct: "le",
        explanation: "Marta é o complemento indireto, portanto corresponde ao pronome “le”.",
      },
      {
        category: "Conectores",
        question: "Complete: “Quería salir; ___, empezó a llover.”",
        answers: ["por eso", "además", "sin embargo", "es decir"],
        correct: "sin embargo",
        explanation: "“Sin embargo” introduz contraste: queria sair, mas começou a chover.",
      },
      {
        category: "Discurso indireto",
        question: "Complete: “Me prometió que ___ al día siguiente.”",
        answers: ["vendría", "vendrá", "vino", "venga"],
        correct: "vendría",
        explanation: "No discurso indireto no passado, o futuro em relação àquele momento pode ser expresso pelo condicional: “vendría”.",
      },
      {
        category: "Pasiva refleja",
        question: "Complete: “Ayer se ___ todas las entradas en menos de una hora.”",
        answers: ["vendió", "vendieron", "vendería", "vendía"],
        correct: "vendieron",
        explanation: "Na pasiva refleja, o verbo concorda com o sujeito plural “todas las entradas”: “se vendieron”.",
      },
      {
        category: "Relativos",
        question: "Complete: “El escritor ___ novelas leí ganó un premio.”",
        answers: ["que", "cuyo", "cuyas", "quien"],
        correct: "cuyas",
        explanation: "“Cuyas” concorda com o substantivo possuído, “novelas”, que é feminino plural.",
      },
      {
        category: "Expressões idiomáticas",
        question: "O que significa “echar de menos a alguien”?",
        answers: ["Evitar alguém", "Sentir falta de alguém", "Criticar alguém", "Encontrar alguém por acaso"],
        correct: "Sentir falta de alguém",
        explanation: "“Echar de menos” é uma expressão idiomática que significa sentir falta ou saudade.",
      },
    ],
  },
  advanced: {
    label: "Avançado",
    cefr: "C1–C2",
    questions: [
      {
        category: "Concessão e subjuntivo",
        question: "Complete: “Por mucho que ___, no cambiaré de opinión.”",
        answers: ["insistes", "insistirás", "insistas", "insististe"],
        correct: "insistas",
        explanation: "A construção concessiva “por mucho que” costuma exigir subjuntivo quando se apresenta uma circunstância sem efeito sobre o resultado.",
      },
      {
        category: "Pluscuamperfecto de subjuntivo",
        question: "Complete: “Si lo ___ antes, te lo habría dicho.”",
        answers: ["supe", "hubiera sabido", "sabría", "haya sabido"],
        correct: "hubiera sabido",
        explanation: "Uma condição irreal no passado combina “si + pluscuamperfecto de subjuntivo” com o condicional composto.",
      },
      {
        category: "Norma e regência",
        question: "Qual frase está de acordo com a norma-padrão quanto ao uso de “que / de que”?",
        answers: [
          "Pienso de que llegará temprano.",
          "Me alegro que hayas venido.",
          "Estoy seguro de que vendrá.",
          "Creo de que tienes razón.",
        ],
        correct: "Estoy seguro de que vendrá.",
        explanation: "“Estar seguro de” rege a preposição de, por isso a construção normativa é “estar seguro de que…”.",
      },
      {
        category: "Sino / si no",
        question: "Complete: “No fue un error, ___ una decisión consciente.”",
        answers: ["sino", "si no", "aunque", "excepto"],
        correct: "sino",
        explanation: "Depois de uma negação, “sino” introduz correção ou oposição: não foi um erro, mas sim uma decisão.",
      },
      {
        category: "Léxico",
        question: "O que significa “dar algo por sentado”?",
        answers: [
          "Negar algo de forma categórica",
          "Considerar algo certo sem questionar",
          "Explicar algo detalhadamente",
          "Adiar uma decisão importante",
        ],
        correct: "Considerar algo certo sem questionar",
        explanation: "“Dar por sentado” significa assumir ou considerar algo como certo sem necessidade de confirmação.",
      },
      {
        category: "Relativos possessivos",
        question: "Complete: “La investigadora, ___ artículos fueron premiados, dará una conferencia.”",
        answers: ["que", "cuyos", "cuyas", "quien"],
        correct: "cuyos",
        explanation: "O relativo possessivo concorda com o substantivo possuído “artículos”, masculino plural: “cuyos artículos”.",
      },
      {
        category: "Perífrases verbais",
        question: "O que expressa “Lleva tres años investigando este tema”?",
        answers: [
          "Uma ação futura planejada",
          "Uma ação iniciada há três anos e ainda em curso",
          "Uma ação concluída exatamente há três anos",
          "Uma obrigação que durará três anos",
        ],
        correct: "Uma ação iniciada há três anos e ainda em curso",
        explanation: "“Llevar + período + gerundio” indica duração acumulada de uma ação que continua no presente.",
      },
      {
        category: "Como si",
        question: "Complete: “Habla como si lo ___ todo.”",
        answers: ["sabe", "supiera", "sabrá", "supo"],
        correct: "supiera",
        explanation: "“Como si” introduz uma comparação hipotética e é seguido de imperfecto de subjuntivo: “como si lo supiera”.",
      },
      {
        category: "Conectores discursivos",
        question: "No registro formal, “con todo” pode funcionar com sentido próximo de:",
        answers: ["por tanto", "sin embargo", "además", "es decir"],
        correct: "sin embargo",
        explanation: "Como conector discursivo, “con todo” pode introduzir uma ressalva ou contraste, próximo de “sin embargo” ou “no obstante”.",
      },
      {
        category: "Expressões idiomáticas",
        question: "O que significa “a duras penas” em “A duras penas consiguió terminar el trabajo”?",
        answers: ["Com muita dificuldade", "Com grande entusiasmo", "Sem nenhuma ajuda", "Muito rapidamente"],
        correct: "Com muita dificuldade",
        explanation: "“A duras penas” significa com grande esforço ou dificuldade.",
      },
    ],
  },
};

const levelScreen = document.getElementById("level-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const levelButtons = [...document.querySelectorAll("[data-level]")];
const backButton = document.getElementById("back-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const chooseLevelButton = document.getElementById("choose-level-button");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const scoreLabel = document.getElementById("score");
const bestScore = document.getElementById("best-score");
const levelPill = document.getElementById("level-pill");
const category = document.getElementById("category");
const question = document.getElementById("question");
const questionNumber = document.getElementById("question-number");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackText = document.getElementById("feedback-text");
const finalScore = document.getElementById("final-score");
const resultLevel = document.getElementById("result-level");
const resultMessage = document.getElementById("result-message");
const resultDetail = document.getElementById("result-detail");

const state = {
  levelKey: null,
  questions: [],
  currentQuestion: 0,
  score: 0,
  answered: false,
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function showScreen(screen) {
  [levelScreen, quizScreen, resultScreen].forEach((item) => item.classList.add("hidden"));
  screen.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function getStoredBest(levelKey) {
  try {
    const value = Number(localStorage.getItem(`vamos-espanol-best-${levelKey}`));
    return Number.isFinite(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

function saveBest(levelKey, value) {
  try {
    const currentBest = getStoredBest(levelKey);
    if (value > currentBest) {
      localStorage.setItem(`vamos-espanol-best-${levelKey}`, String(value));
    }
  } catch {
    // O quiz continua funcionando mesmo quando o armazenamento local está bloqueado.
  }
}

function prepareQuestions(levelKey) {
  return shuffle(quizData[levelKey].questions).map((item) => ({
    ...item,
    answers: shuffle(item.answers),
  }));
}

function startLevel(levelKey) {
  const selectedLevel = quizData[levelKey];
  if (!selectedLevel) return;

  state.levelKey = levelKey;
  state.questions = prepareQuestions(levelKey);
  state.currentQuestion = 0;
  state.score = 0;
  state.answered = false;

  levelPill.textContent = `${selectedLevel.label} · ${selectedLevel.cefr}`;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const item = state.questions[state.currentQuestion];
  const selectedLevel = quizData[state.levelKey];
  const total = state.questions.length;
  const current = state.currentQuestion + 1;
  const best = getStoredBest(state.levelKey);

  state.answered = false;
  progress.textContent = `Pergunta ${current} de ${total}`;
  scoreLabel.textContent = `${state.score} ${state.score === 1 ? "ponto" : "pontos"}`;
  bestScore.textContent = best ? `Melhor: ${best}/${total}` : "Melhor: —";
  progressBar.style.width = `${(current / total) * 100}%`;
  levelPill.textContent = `${selectedLevel.label} · ${selectedLevel.cefr}`;
  category.textContent = item.category;
  questionNumber.textContent = String(current).padStart(2, "0");
  question.textContent = item.question;
  answers.innerHTML = "";
  feedback.className = "feedback hidden";
  feedbackTitle.textContent = "";
  feedbackText.textContent = "";
  nextButton.classList.add("hidden");

  const keys = ["A", "B", "C", "D"];

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";

    const key = document.createElement("span");
    key.className = "answer-key";
    key.textContent = keys[index];

    const label = document.createElement("span");
    label.textContent = answer;

    button.append(key, label);
    button.addEventListener("click", () => selectAnswer(answer, button));
    answers.appendChild(button);
  });
}

function selectAnswer(selectedAnswer, selectedButton) {
  if (state.answered) return;
  state.answered = true;

  const item = state.questions[state.currentQuestion];
  const buttons = [...answers.querySelectorAll(".answer-button")];
  const isCorrect = selectedAnswer === item.correct;

  buttons.forEach((button) => {
    button.disabled = true;
    const buttonAnswer = button.querySelector("span:last-child").textContent;
    if (buttonAnswer === item.correct) {
      button.classList.add("correct");
    }
  });

  if (isCorrect) {
    state.score += 1;
    scoreLabel.textContent = `${state.score} ${state.score === 1 ? "ponto" : "pontos"}`;
    feedbackTitle.textContent = "¡Muy bien! Respuesta correcta.";
    feedback.className = "feedback success";
  } else {
    selectedButton.classList.add("incorrect");
    feedbackTitle.textContent = `Respuesta correcta: ${item.correct}`;
    feedback.className = "feedback error";
  }

  feedbackText.textContent = item.explanation;
  nextButton.textContent = state.currentQuestion === state.questions.length - 1 ? "Ver resultado" : "Próxima pergunta";
  nextButton.classList.remove("hidden");
  nextButton.focus();
}

function nextQuestion() {
  if (!state.answered) return;

  if (state.currentQuestion < state.questions.length - 1) {
    state.currentQuestion += 1;
    renderQuestion();
    return;
  }

  showResult();
}

function showResult() {
  const selectedLevel = quizData[state.levelKey];
  const total = state.questions.length;
  const percentage = state.score / total;

  saveBest(state.levelKey, state.score);

  resultLevel.textContent = `${selectedLevel.label} · ${selectedLevel.cefr}`;
  finalScore.textContent = `${state.score}/${total}`;

  if (percentage === 1) {
    resultMessage.textContent = "¡Excelente! Você acertou todas as questões deste nível.";
    resultDetail.textContent = "Seu desempenho foi máximo. Você pode refazer o quiz com a ordem embaralhada ou avançar para outro nível.";
  } else if (percentage >= 0.8) {
    resultMessage.textContent = "¡Muy bien! Você demonstrou domínio consistente dos conteúdos praticados.";
    resultDetail.textContent = "Revise apenas os pontos em que teve dúvida e tente novamente para buscar a pontuação máxima.";
  } else if (percentage >= 0.6) {
    resultMessage.textContent = "¡Buen trabajo! Há uma boa base, com alguns conteúdos a consolidar.";
    resultDetail.textContent = "Use os feedbacks das questões como guia de revisão e refaça este nível quando quiser.";
  } else {
    resultMessage.textContent = "¡Sigue practicando! Este resultado mostra quais conteúdos merecem mais atenção.";
    resultDetail.textContent = "Releia as explicações, pratique os pontos de dificuldade e tente novamente. O objetivo aqui é aprender durante o percurso.";
  }

  showScreen(resultScreen);
}

function returnToLevels() {
  state.levelKey = null;
  state.questions = [];
  state.currentQuestion = 0;
  state.score = 0;
  state.answered = false;
  showScreen(levelScreen);
}

levelButtons.forEach((button) => {
  button.addEventListener("click", () => startLevel(button.dataset.level));
});

backButton.addEventListener("click", returnToLevels);
chooseLevelButton.addEventListener("click", returnToLevels);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", () => startLevel(state.levelKey));
