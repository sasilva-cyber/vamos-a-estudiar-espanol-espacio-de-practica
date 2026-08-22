const questions = [
  {
    category: "Saudações",
    question: "Como se diz “bom dia” em espanhol?",
    answers: ["Buenas noches", "Buenos días", "Buenas tardes", "Hasta luego"],
    correct: 1,
  },
  {
    category: "Casa",
    question: "Qual palavra em espanhol significa “janela”?",
    answers: ["Puerta", "Techo", "Ventana", "Pared"],
    correct: 2,
  },
  {
    category: "Alimentação",
    question: "Qual é a tradução de “morango” para o espanhol?",
    answers: ["Fresa", "Manzana", "Naranja", "Pera"],
    correct: 0,
  },
  {
    category: "Cidade",
    question: "O que significa “calle” em português?",
    answers: ["Praça", "Rua", "Ponte", "Estação"],
    correct: 1,
  },
  {
    category: "Tempo",
    question: "Qual palavra corresponde a “ontem” em espanhol?",
    answers: ["Mañana", "Hoy", "Ayer", "Ahora"],
    correct: 2,
  },
  {
    category: "Escola",
    question: "Como se diz “caderno” em espanhol?",
    answers: ["Cuaderno", "Libro", "Lápiz", "Mochila"],
    correct: 0,
  },
  {
    category: "Viagem",
    question: "O que significa “viaje”?",
    answers: ["Passagem", "Viagem", "Bagagem", "Caminho"],
    correct: 1,
  },
  {
    category: "Família",
    question: "Qual palavra em espanhol significa “irmã”?",
    answers: ["Madre", "Hija", "Hermana", "Tía"],
    correct: 2,
  },
];

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const progress = document.getElementById("progress");
const progressBar = document.getElementById("progress-bar");
const scoreLabel = document.getElementById("score");
const category = document.getElementById("category");
const question = document.getElementById("question");
const answers = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((item) => item.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function startQuiz() {
  currentQuestion = 0;
  score = 0;
  answered = false;
  showScreen(quizScreen);
  renderQuestion();
}

function renderQuestion() {
  const item = questions[currentQuestion];
  answered = false;

  progress.textContent = `Pergunta ${currentQuestion + 1} de ${questions.length}`;
  scoreLabel.textContent = `Pontuação: ${score}`;
  progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  category.textContent = item.category;
  question.textContent = item.question;
  feedback.textContent = "";
  feedback.className = "feedback";
  nextButton.classList.add("hidden");
  answers.innerHTML = "";

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answers.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const item = questions[currentQuestion];
  const buttons = [...answers.querySelectorAll("button")];
  const isCorrect = selectedIndex === item.correct;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) {
      button.classList.add("correct");
    }
  });

  if (isCorrect) {
    score += 1;
    scoreLabel.textContent = `Pontuação: ${score}`;
    feedback.textContent = "¡Muy bien! Resposta correta.";
    feedback.classList.add("success");
  } else {
    buttons[selectedIndex].classList.add("incorrect");
    feedback.textContent = `Resposta correta: ${item.answers[item.correct]}.`;
    feedback.classList.add("error");
  }

  nextButton.textContent = currentQuestion === questions.length - 1 ? "Ver resultado" : "Próxima pergunta";
  nextButton.classList.remove("hidden");
  nextButton.focus();
}

function nextQuestion() {
  if (!answered) return;

  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  showScreen(resultScreen);
  finalScore.textContent = `${score}/${questions.length}`;

  const percentage = score / questions.length;
  if (percentage === 1) {
    resultMessage.textContent = "Excelente resultado. Você acertou todas as questões!";
  } else if (percentage >= 0.75) {
    resultMessage.textContent = "Ótimo desempenho. Seu vocabulário está muito bem encaminhado.";
  } else if (percentage >= 0.5) {
    resultMessage.textContent = "Bom começo. Revise algumas palavras e tente novamente.";
  } else {
    resultMessage.textContent = "Continue praticando. Cada tentativa ajuda a ampliar seu vocabulário.";
  }
}

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", startQuiz);
