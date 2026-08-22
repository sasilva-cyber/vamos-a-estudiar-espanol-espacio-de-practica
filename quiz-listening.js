/* Quiz de comprensión auditiva dentro da aba Quiz — níveis A1 a C2. */
(function () {
  const audioTests = [
    {
      id: "qa-a1",
      level: "A1",
      title: "La rutina de Pablo",
      focus: "Rutina, horarios y lugares",
      audio: "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/d7a8c955-2828-4555-a2e2-9ae2cbd9d073.mp3",
      transcript: "Hola, soy Pablo. Vivo con mis padres y mi hermana en un piso pequeño. Cada mañana desayuno leche, fruta y pan. A las ocho salgo de casa y voy a la universidad en metro. Mis clases terminan a la una. Por la tarde estudio en la biblioteca y, cuando vuelvo a casa, preparo la cena con mi hermana.",
      questions: [
        { q: "¿Con quién vive Pablo?", options: ["Con sus padres y su hermana", "Con sus abuelos", "Con dos amigos", "Solo"], correct: 0, explanation: "Pablo dice que vive con sus padres y su hermana." },
        { q: "¿Qué desayuna cada mañana?", options: ["Leche, fruta y pan", "Café y galletas", "Huevos y arroz", "Té y queso"], correct: 0, explanation: "En el audio menciona leche, fruta y pan." },
        { q: "¿Cómo va a la universidad?", options: ["En metro", "En autobús", "A pie", "En bicicleta"], correct: 0, explanation: "Pablo explica que va a la universidad en metro." },
        { q: "¿A qué hora terminan sus clases?", options: ["A la una", "A las ocho", "A las doce", "A las cinco"], correct: 0, explanation: "Sus clases terminan a la una." },
        { q: "¿Qué hace por la tarde?", options: ["Estudia en la biblioteca", "Trabaja en una cafetería", "Va al mercado", "Hace deporte"], correct: 0, explanation: "Por la tarde estudia en la biblioteca." }
      ]
    },
    {
      id: "qa-a2",
      level: "A2",
      title: "Una visita el sábado",
      focus: "Planes, compras y secuencia de acciones",
      audio: "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/538a1ff1-8c49-4b37-aa76-f13cc69c52d1.mp3",
      transcript: "Este sábado Marta quiere visitar a su abuela, que vive en otra ciudad. Ha comprado un billete de autobús para las nueve y media de la mañana. Antes de salir, necesita pasar por la panadería porque su abuela le pidió pan y unas galletas. Si llega temprano, comerán juntas y después pasearán por el centro.",
      questions: [
        { q: "¿A quién quiere visitar Marta?", options: ["A su abuela", "A su profesora", "A una amiga", "A su hermana"], correct: 0, explanation: "Marta quiere visitar a su abuela." },
        { q: "¿A qué hora sale su autobús?", options: ["A las nueve y media", "A las ocho", "A las diez y media", "A las once"], correct: 0, explanation: "El billete es para las nueve y media de la mañana." },
        { q: "¿Dónde tiene que pasar antes de salir?", options: ["Por la panadería", "Por la farmacia", "Por el banco", "Por el mercado"], correct: 0, explanation: "Necesita pasar por la panadería." },
        { q: "¿Qué le pidió su abuela?", options: ["Pan y galletas", "Fruta y café", "Una tarta", "Un libro"], correct: 0, explanation: "Su abuela le pidió pan y unas galletas." },
        { q: "¿Qué harán después de comer?", options: ["Pasearán por el centro", "Irán al cine", "Volverán en tren", "Visitarán un museo"], correct: 0, explanation: "Después de comer, pasearán por el centro." }
      ]
    },
    {
      id: "qa-b1",
      level: "B1",
      title: "El nuevo trabajo de Diego",
      focus: "Trabajo, adaptación y experiencias",
      audio: "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/a3e07f8d-c436-4083-a508-842b61e8e3a7.mp3",
      transcript: "Cuando Diego empezó su nuevo trabajo, pensó que tardaría semanas en adaptarse. Sin embargo, sus compañeros lo ayudaron desde el primer día. La empresa trabaja con clientes de varios países y por eso las reuniones suelen ser en español e inglés. Diego todavía se pone nervioso al hablar, pero cada semana participa más y toma notas de las expresiones que no conoce.",
      questions: [
        { q: "¿Qué pensó Diego al empezar su nuevo trabajo?", options: ["Que tardaría semanas en adaptarse", "Que dejaría el trabajo enseguida", "Que trabajaría solo", "Que no tendría reuniones"], correct: 0, explanation: "Al principio pensó que necesitaría semanas para adaptarse." },
        { q: "¿Qué hicieron sus compañeros?", options: ["Lo ayudaron desde el primer día", "Le cambiaron el horario", "Le dieron vacaciones", "Le pidieron que trabajara solo"], correct: 0, explanation: "Sus compañeros lo ayudaron desde el primer día." },
        { q: "¿Por qué las reuniones suelen ser en español e inglés?", options: ["Porque la empresa tiene clientes de varios países", "Porque Diego es profesor", "Porque todos viven en Londres", "Porque solo trabajan por internet"], correct: 0, explanation: "La empresa trabaja con clientes de varios países." },
        { q: "¿Cómo se siente Diego cuando habla?", options: ["Todavía se pone nervioso", "Se enfada", "Se aburre", "Se queda en silencio siempre"], correct: 0, explanation: "El audio señala que todavía se pone nervioso al hablar." },
        { q: "¿Qué hace con las expresiones que no conoce?", options: ["Toma notas", "Las ignora", "Las elimina", "Las traduce durante la reunión"], correct: 0, explanation: "Diego toma notas de las expresiones desconocidas." }
      ]
    },
    {
      id: "qa-b2",
      level: "B2",
      title: "Movilidad urbana",
      focus: "Argumentos, contraste y soluciones",
      audio: "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/6f172b41-0977-4186-ad55-b70efba7ad71.mp3",
      transcript: "En los últimos años, muchas ciudades han creado más carriles bici para reducir el tráfico y la contaminación. La medida suele recibir apoyo, aunque también genera críticas entre quienes consideran que se han eliminado demasiadas plazas de aparcamiento. Los expertos señalan que el cambio funciona mejor cuando se acompaña de transporte público frecuente y calles seguras para peatones.",
      questions: [
        { q: "¿Cuál es uno de los objetivos de crear más carriles bici?", options: ["Reducir el tráfico y la contaminación", "Aumentar el precio del transporte", "Eliminar las aceras", "Construir más aparcamientos"], correct: 0, explanation: "El audio relaciona los carriles bici con la reducción del tráfico y la contaminación." },
        { q: "¿Qué crítica se menciona?", options: ["Se han eliminado demasiadas plazas de aparcamiento", "Hay demasiados autobuses", "Las bicicletas son demasiado caras", "Faltan carreteras entre ciudades"], correct: 0, explanation: "Algunas personas critican la pérdida de plazas de aparcamiento." },
        { q: "¿Qué función cumple «aunque» en el discurso?", options: ["Introduce un contraste", "Expresa una causa", "Indica una condición", "Marca una consecuencia"], correct: 0, explanation: "«Aunque» contrapone el apoyo a la medida con las críticas que también recibe." },
        { q: "Según los expertos, ¿cuándo funciona mejor el cambio?", options: ["Cuando se combina con transporte público frecuente y calles seguras", "Cuando se prohíbe caminar", "Cuando se eliminan los autobuses", "Cuando solo circulan coches"], correct: 0, explanation: "Los expertos destacan el transporte público frecuente y la seguridad peatonal." },
        { q: "¿Qué tipo de discurso predomina?", options: ["Informativo con argumentos", "Una receta", "Una conversación familiar", "Una narración fantástica"], correct: 0, explanation: "Presenta una medida urbana, posiciones distintas y condiciones para que funcione." }
      ]
    },
    {
      id: "qa-c1",
      level: "C1",
      title: "Teletrabajo y modelos híbridos",
      focus: "Matices, ventajas, límites y conclusión",
      audio: "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/c527836e-f6f9-43c7-b9a5-d09a2cf8633d.mp3",
      transcript: "El teletrabajo ha transformado la manera en que muchas personas organizan su vida cotidiana. Para algunos, trabajar desde casa facilita la concentración y reduce el tiempo perdido en desplazamientos. Para otros, la ausencia de contacto presencial puede generar aislamiento. Por eso, algunas empresas están adoptando modelos híbridos que intentan combinar autonomía, colaboración y bienestar.",
      questions: [
        { q: "¿Qué cambio general se atribuye al teletrabajo?", options: ["Ha transformado la organización de la vida cotidiana", "Ha eliminado todos los desplazamientos", "Ha reducido el uso de tecnología", "Ha acabado con el trabajo presencial"], correct: 0, explanation: "La idea inicial es que el teletrabajo ha transformado la organización cotidiana." },
        { q: "¿Qué ventaja se menciona para algunas personas?", options: ["Mayor concentración y menos tiempo de desplazamiento", "Más reuniones presenciales", "Menos autonomía", "Mayor aislamiento"], correct: 0, explanation: "Se señalan la concentración y la reducción de los desplazamientos como ventajas." },
        { q: "¿Qué riesgo se presenta?", options: ["El aislamiento", "La falta de internet en todas las empresas", "El exceso de transporte público", "La reducción del salario"], correct: 0, explanation: "La ausencia de contacto presencial puede generar aislamiento." },
        { q: "¿Qué función cumple «Por eso»?", options: ["Introduce una consecuencia o respuesta", "Añade un ejemplo sin relación", "Niega lo anterior", "Expresa una duda"], correct: 0, explanation: "Conecta las ventajas y problemas mencionados con la adopción de modelos híbridos." },
        { q: "¿Qué intenta equilibrar el modelo híbrido?", options: ["Autonomía, colaboración y bienestar", "Velocidad, salario y turismo", "Competencia, ocio y transporte", "Silencio, distancia y jerarquía"], correct: 0, explanation: "El cierre menciona explícitamente autonomía, colaboración y bienestar." }
      ]
    },
    {
      id: "qa-c2",
      level: "C2",
      title: "Velocidad, información y conocimiento",
      focus: "Tesis, abstracción e interpretación crítica",
      audio: "https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/81f76158-53ff-4de7-afc8-ce9bd86630da.mp3",
      transcript: "La rapidez con la que circula la información ha modificado no solo nuestros hábitos de lectura, sino también nuestras expectativas sobre el conocimiento. Tener acceso inmediato a miles de fuentes no garantiza comprenderlas ni evaluarlas con criterio. De ahí que la alfabetización contemporánea exija comparar perspectivas, reconocer incertidumbres y resistir la tentación de confundir velocidad con profundidad.",
      questions: [
        { q: "¿Qué sostiene el audio sobre el acceso a muchas fuentes?", options: ["No garantiza comprensión ni evaluación crítica", "Garantiza conocimiento profundo", "Hace innecesaria la lectura", "Elimina la incertidumbre"], correct: 0, explanation: "El acceso inmediato no garantiza comprender ni evaluar la información con criterio." },
        { q: "¿Qué ha cambiado además de los hábitos de lectura?", options: ["Las expectativas sobre el conocimiento", "La estructura de todas las bibliotecas", "La duración de los libros", "La gramática de las lenguas"], correct: 0, explanation: "También se han modificado nuestras expectativas sobre el conocimiento." },
        { q: "¿Qué expresa «De ahí que»?", options: ["Una consecuencia derivada de lo anterior", "Una oposición total", "Una enumeración casual", "Una cita textual"], correct: 0, explanation: "La expresión introduce una conclusión derivada de las ideas anteriores." },
        { q: "¿Qué capacidades exige la alfabetización contemporánea?", options: ["Comparar perspectivas y reconocer incertidumbres", "Memorizar todas las fuentes", "Leer cada vez más rápido", "Evitar cualquier punto de vista diferente"], correct: 0, explanation: "Se pide comparar perspectivas, reconocer incertidumbres y evaluar con criterio." },
        { q: "¿Cuál es la advertencia final?", options: ["No confundir velocidad con profundidad", "No utilizar fuentes digitales", "No leer textos breves", "No comparar perspectivas"], correct: 0, explanation: "El cierre advierte contra confundir velocidad con profundidad." }
      ]
    }
  ];

  let activeTest = null;
  let questionIndex = 0;
  let answers = [];

  function injectStyles() {
    if (document.getElementById("quiz-listening-styles")) return;
    const style = document.createElement("style");
    style.id = "quiz-listening-styles";
    style.textContent = `
      .quiz-listening-block{margin-top:44px;padding-top:36px;border-top:1px solid var(--line)}
      .quiz-listening-heading{max-width:780px;margin-bottom:22px}
      .quiz-listening-heading p:last-child{color:var(--muted);line-height:1.7;margin:12px 0 0}
      .quiz-listening-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}
      .quiz-listening-card{border:1px solid var(--line);border-radius:20px;background:rgba(255,255,255,.95);padding:20px;display:flex;flex-direction:column;min-height:225px;box-shadow:0 10px 30px rgba(70,40,20,.05)}
      .quiz-listening-card-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:15px}
      .quiz-listening-level{display:inline-flex;border-radius:999px;background:var(--gold-soft);color:#6b4a0d;padding:6px 10px;font-size:.74rem;font-weight:900}
      .quiz-listening-status{color:var(--success);font-size:.75rem;font-weight:900;min-height:18px}
      .quiz-listening-card h3{margin:0 0 10px;color:var(--red-dark);font:800 1.25rem/1.15 Georgia,'Times New Roman',serif}
      .quiz-listening-card p{margin:0;color:var(--muted);line-height:1.58;font-size:.9rem}
      .quiz-listening-card button{margin-top:auto;align-self:flex-start}
      .quiz-audio-screen{max-width:900px;margin:0 auto}
      .quiz-audio-toolbar{display:flex;justify-content:space-between;gap:18px;align-items:center;margin-bottom:18px}
      .quiz-audio-panel{border:1px solid var(--line);border-radius:24px;background:rgba(255,255,255,.96);box-shadow:var(--shadow);padding:clamp(22px,5vw,40px)}
      .quiz-audio-meta{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 20px}
      .quiz-audio-meta span{border-radius:999px;background:#fff4ef;color:var(--red-dark);padding:6px 10px;font-size:.76rem;font-weight:800}
      .quiz-audio-player{margin:20px 0 24px;padding:16px;border:1px solid var(--line);border-radius:16px;background:#fffaf3}
      .quiz-audio-player audio{width:100%;display:block}
      .quiz-audio-tip{margin:9px 0 0;color:var(--muted);font-size:.8rem;line-height:1.5}
      .quiz-audio-progress{display:flex;justify-content:space-between;gap:12px;color:var(--muted);font-size:.8rem;font-weight:800;margin-bottom:10px}
      .quiz-audio-question{margin:22px 0 14px;color:var(--ink);font:800 clamp(1.3rem,3vw,1.75rem)/1.25 Georgia,'Times New Roman',serif}
      .quiz-audio-options{display:grid;gap:10px}
      .quiz-audio-option{display:flex;gap:10px;align-items:flex-start;border:1px solid #e2d6c6;border-radius:14px;background:#fffdfa;padding:13px 14px;cursor:pointer}
      .quiz-audio-option:hover{border-color:rgba(143,29,44,.35)}
      .quiz-audio-option input{margin-top:3px}
      .quiz-audio-actions{display:flex;justify-content:flex-end;margin-top:18px}
      .quiz-audio-warning{min-height:20px;margin-top:9px;color:var(--error);font-size:.82rem;font-weight:800}
      .quiz-audio-result{margin-top:22px}
      .quiz-audio-score{display:inline-flex;align-items:center;justify-content:center;min-width:92px;height:92px;border-radius:50%;background:var(--gold-soft);color:var(--red-dark);font:900 1.5rem Georgia,'Times New Roman',serif;margin:12px 0 16px}
      .quiz-audio-review{display:grid;gap:12px;margin-top:20px}
      .quiz-audio-review-item{border:1px solid var(--line);border-radius:14px;background:#fff;padding:14px}
      .quiz-audio-review-item.good{border-left:4px solid var(--success)}
      .quiz-audio-review-item.bad{border-left:4px solid var(--error)}
      .quiz-audio-review-item strong{display:block;margin-bottom:7px;color:var(--ink)}
      .quiz-audio-review-item p{margin:4px 0;color:var(--muted);line-height:1.5;font-size:.88rem}
      .quiz-audio-transcript{margin-top:18px;border:1px solid var(--line);border-radius:14px;background:#fff9ef;padding:15px;color:var(--muted);line-height:1.7}
      .quiz-audio-transcript p{margin:0}
      @media(max-width:900px){.quiz-listening-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:620px){.quiz-listening-grid{grid-template-columns:1fr}.quiz-audio-toolbar{align-items:flex-start;flex-direction:column}.quiz-audio-actions .primary-button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function completed(id) {
    try { return localStorage.getItem(`vae-quiz-listening-${id}`) === "done"; } catch { return false; }
  }

  function renderCards() {
    const grid = document.getElementById("quiz-listening-grid");
    if (!grid) return;
    grid.innerHTML = audioTests.map((test) => `
      <article class="quiz-listening-card">
        <div class="quiz-listening-card-top">
          <span class="quiz-listening-level">${test.level}</span>
          <span class="quiz-listening-status">${completed(test.id) ? "✓ Completado" : ""}</span>
        </div>
        <h3>${test.title}</h3>
        <p>${test.focus}</p>
        <p style="margin-top:8px;font-size:.78rem;font-weight:800;color:var(--red)">5 preguntas · audio sin transcripción durante el test</p>
        <button class="secondary-button" type="button" data-start-audio-quiz="${test.id}">Empezar test →</button>
      </article>
    `).join("");
  }

  function installBlock() {
    const levelScreen = document.getElementById("level-screen");
    const activities = document.getElementById("quiz-activities-block");
    if (!levelScreen || !activities) return false;
    if (document.getElementById("quiz-listening-block")) return true;

    const block = document.createElement("section");
    block.id = "quiz-listening-block";
    block.className = "quiz-listening-block";
    block.innerHTML = `
      <div class="quiz-listening-heading">
        <p class="eyebrow">Comprensión auditiva</p>
        <h2>Escucha, interpreta y responde</h2>
        <p>Seis tests de audio, uno por nivel del A1 al C2. Escucha el audio tantas veces como necesites, responde cinco preguntas y consulta la transcripción solo después de finalizar.</p>
      </div>
      <div class="quiz-listening-grid" id="quiz-listening-grid"></div>
    `;
    activities.insertAdjacentElement("afterend", block);
    renderCards();
    return true;
  }

  function installScreen() {
    const app = document.getElementById("app");
    if (!app) return false;
    if (document.getElementById("quiz-audio-screen")) return true;

    const screen = document.createElement("section");
    screen.id = "quiz-audio-screen";
    screen.className = "quiz-audio-screen hidden";
    screen.innerHTML = `
      <div class="quiz-audio-toolbar">
        <button class="text-button" id="quiz-audio-back" type="button">← Volver a Quiz</button>
        <span class="level-pill" id="quiz-audio-level">A1</span>
      </div>
      <article class="quiz-audio-panel" id="quiz-audio-panel"></article>
    `;
    app.appendChild(screen);

    screen.querySelector("#quiz-audio-back").addEventListener("click", returnToQuiz);
    return true;
  }

  function hideMainScreens() {
    document.querySelectorAll("#app > section").forEach((section) => section.classList.add("hidden"));
  }

  function returnToQuiz() {
    document.getElementById("quiz-audio-screen")?.classList.add("hidden");
    const quizButton = document.querySelector('.main-nav [data-route="quiz"]') || document.querySelector('[data-route="quiz"]');
    if (quizButton) quizButton.click();
    else document.getElementById("level-screen")?.classList.remove("hidden");
    renderCards();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openTest(id) {
    activeTest = audioTests.find((item) => item.id === id);
    if (!activeTest) return;
    questionIndex = 0;
    answers = new Array(activeTest.questions.length).fill(null);
    hideMainScreens();
    const screen = document.getElementById("quiz-audio-screen");
    screen?.classList.remove("hidden");
    const level = document.getElementById("quiz-audio-level");
    if (level) level.textContent = activeTest.level;
    document.querySelectorAll(".main-nav .nav-link").forEach((button) => button.classList.toggle("active", button.dataset.route === "quiz"));
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderQuestion() {
    if (!activeTest) return;
    const panel = document.getElementById("quiz-audio-panel");
    const item = activeTest.questions[questionIndex];
    const selected = answers[questionIndex];
    panel.innerHTML = `
      <p class="eyebrow">Test de escucha · ${activeTest.level}</p>
      <h1 style="font-size:clamp(2rem,5vw,3.2rem)">${activeTest.title}</h1>
      <div class="quiz-audio-meta"><span>${activeTest.focus}</span><span>5 preguntas</span><span>Gabarito al final</span></div>
      <div class="quiz-audio-player">
        <audio controls preload="metadata" src="${activeTest.audio}"></audio>
        <p class="quiz-audio-tip">Consejo: intenta responder sin leer ninguna transcripción. Puedes repetir el audio antes de avanzar.</p>
      </div>
      <div class="quiz-audio-progress"><span>Pregunta ${questionIndex + 1} de ${activeTest.questions.length}</span><span>Comprensión auditiva</span></div>
      <div class="progress-track" aria-hidden="true"><div class="progress-bar" style="width:${((questionIndex + 1) / activeTest.questions.length) * 100}%"></div></div>
      <h2 class="quiz-audio-question">${item.q}</h2>
      <div class="quiz-audio-options">
        ${item.options.map((option, index) => `
          <label class="quiz-audio-option">
            <input type="radio" name="quiz-audio-answer" value="${index}" ${selected === index ? "checked" : ""} />
            <span>${option}</span>
          </label>
        `).join("")}
      </div>
      <div class="quiz-audio-warning" id="quiz-audio-warning"></div>
      <div class="quiz-audio-actions">
        <button class="primary-button" id="quiz-audio-next" type="button">${questionIndex === activeTest.questions.length - 1 ? "Finalizar y ver resultado" : "Siguiente pregunta"}</button>
      </div>
    `;

    panel.querySelectorAll('input[name="quiz-audio-answer"]').forEach((input) => {
      input.addEventListener("change", () => {
        answers[questionIndex] = Number(input.value);
        const warning = document.getElementById("quiz-audio-warning");
        if (warning) warning.textContent = "";
      });
    });

    panel.querySelector("#quiz-audio-next")?.addEventListener("click", () => {
      if (answers[questionIndex] === null) {
        const warning = document.getElementById("quiz-audio-warning");
        if (warning) warning.textContent = "Selecciona una respuesta antes de continuar.";
        return;
      }
      if (questionIndex < activeTest.questions.length - 1) {
        questionIndex += 1;
        renderQuestion();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        renderResult();
      }
    });
  }

  function renderResult() {
    if (!activeTest) return;
    const panel = document.getElementById("quiz-audio-panel");
    const score = activeTest.questions.reduce((total, item, index) => total + (answers[index] === item.correct ? 1 : 0), 0);
    try { localStorage.setItem(`vae-quiz-listening-${activeTest.id}`, "done"); } catch { /* localStorage pode não estar disponível */ }

    const percent = Math.round((score / activeTest.questions.length) * 100);
    const message = percent === 100 ? "¡Excelente comprensión!" : percent >= 80 ? "¡Muy buen trabajo!" : percent >= 60 ? "Buen progreso. Revisa los detalles." : "Vuelve a escuchar el audio y repite el test.";

    panel.innerHTML = `
      <p class="eyebrow">Resultado · Comprensión auditiva</p>
      <h1 style="font-size:clamp(2rem,5vw,3.2rem)">${activeTest.title}</h1>
      <div class="quiz-audio-result">
        <div class="quiz-audio-score">${score}/5</div>
        <h2>${message}</h2>
        <p style="color:var(--muted);line-height:1.7">Agora você pode conferir cada resposta, ler a explicação e, somente depois do teste, abrir a transcrição completa do áudio.</p>
        <div class="quiz-audio-review">
          ${activeTest.questions.map((item, index) => {
            const ok = answers[index] === item.correct;
            const userAnswer = item.options[answers[index]];
            const correctAnswer = item.options[item.correct];
            return `
              <article class="quiz-audio-review-item ${ok ? "good" : "bad"}">
                <strong>${index + 1}. ${item.q}</strong>
                <p><b>Tu respuesta:</b> ${userAnswer}</p>
                <p><b>Respuesta correcta:</b> ${correctAnswer}</p>
                <p>${item.explanation}</p>
              </article>
            `;
          }).join("")}
        </div>
        <button class="secondary-button" id="quiz-audio-show-transcript" type="button" style="margin-top:18px">Mostrar transcripción</button>
        <div class="quiz-audio-transcript hidden" id="quiz-audio-transcript"><p>${activeTest.transcript}</p></div>
        <div class="writing-actions" style="margin-top:18px">
          <button class="primary-button" id="quiz-audio-retry" type="button">Repetir este test</button>
          <button class="secondary-button" id="quiz-audio-choose" type="button">Elegir otro nivel</button>
        </div>
      </div>
    `;

    panel.querySelector("#quiz-audio-show-transcript")?.addEventListener("click", (event) => {
      const transcript = panel.querySelector("#quiz-audio-transcript");
      transcript?.classList.toggle("hidden");
      event.currentTarget.textContent = transcript?.classList.contains("hidden") ? "Mostrar transcripción" : "Ocultar transcripción";
    });
    panel.querySelector("#quiz-audio-retry")?.addEventListener("click", () => openTest(activeTest.id));
    panel.querySelector("#quiz-audio-choose")?.addEventListener("click", returnToQuiz);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const start = event.target.closest("[data-start-audio-quiz]");
      if (start) {
        event.preventDefault();
        openTest(start.dataset.startAudioQuiz);
        return;
      }
      const route = event.target.closest("[data-route]");
      if (route && document.getElementById("quiz-audio-screen") && !document.getElementById("quiz-audio-screen").classList.contains("hidden")) {
        document.getElementById("quiz-audio-screen").classList.add("hidden");
      }
    });
  }

  function install() {
    injectStyles();
    if (!installBlock() || !installScreen()) {
      setTimeout(install, 250);
      return;
    }
    renderCards();
    bindEvents();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install, { once: true });
  else install();
})();
