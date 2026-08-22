/* Testes autorais de compreensão leitora em espanhol, com gabarito ao final. */
(function () {
  const readingTests = {
    mercado: {
      title: "Una mañana en el mercado",
      level: "A1–A2",
      time: "6–8 min",
      description: "Texto curto sobre compras, rotina e alimentação.",
      text: [
        "El sábado por la mañana, Clara va al mercado del barrio con su hermano Mateo. Quieren preparar el almuerzo para toda la familia. Primero compran tomates, zanahorias y una lechuga. Después pasan por una frutería y eligen manzanas, naranjas y una piña pequeña.",
        "Mateo quiere comprar chocolate, pero Clara recuerda que en casa todavía hay un paquete. En la pescadería compran dos filetes de pescado porque su madre prefiere comer algo ligero. Antes de volver a casa, los dos se sientan en una cafetería. Clara pide un café con leche y Mateo, un zumo de naranja.",
        "Cuando llegan a casa, su padre ya está preparando arroz. Todos colaboran: Clara lava las verduras, Mateo corta la fruta y su madre prepara el pescado. A las dos, la familia se sienta a la mesa para comer junta."
      ],
      questions: [
        { q: "¿Cuándo van Clara y Mateo al mercado?", options: ["El sábado por la mañana", "El domingo por la noche", "El lunes al mediodía", "El viernes por la tarde"], correct: "El sábado por la mañana", explanation: "La primera frase indica que van al mercado el sábado por la mañana." },
        { q: "¿Por qué van al mercado?", options: ["Para preparar el almuerzo familiar", "Para comprar un regalo", "Para buscar a su padre", "Para vender frutas"], correct: "Para preparar el almuerzo familiar", explanation: "El texto dice que quieren preparar el almuerzo para toda la familia." },
        { q: "¿Qué decide NO comprar Mateo?", options: ["Chocolate", "Pescado", "Piña", "Zumo de naranja"], correct: "Chocolate", explanation: "Clara recuerda que todavía hay chocolate en casa, por eso no lo compran." },
        { q: "¿Qué bebida pide Clara en la cafetería?", options: ["Café con leche", "Zumo de naranja", "Té con limón", "Agua con gas"], correct: "Café con leche", explanation: "Clara pide un café con leche; Mateo pide un zumo de naranja." },
        { q: "¿Quién ya está preparando arroz cuando llegan a casa?", options: ["El padre", "La madre", "Mateo", "Clara"], correct: "El padre", explanation: "Al llegar, el padre ya está preparando arroz." },
        { q: "¿Qué hace Mateo para ayudar?", options: ["Corta la fruta", "Lava las verduras", "Prepara el pescado", "Cocina el arroz"], correct: "Corta la fruta", explanation: "En la preparación del almuerzo, Mateo corta la fruta." }
      ]
    },
    viaje: {
      title: "El viaje que casi no ocurre",
      level: "A2–B1",
      time: "8–10 min",
      description: "Una pequeña historia sobre un viaje, un imprevisto y una solución.",
      text: [
        "Lucía llevaba meses planeando un viaje a Córdoba con dos amigas. Habían reservado un pequeño apartamento cerca del centro histórico y querían pasar allí un fin de semana largo. El viernes, Lucía salió de casa con tiempo porque no quería perder el tren. Sin embargo, cuando llegó a la estación, descubrió que había olvidado su cartera en casa.",
        "Durante unos segundos pensó que tendría que cancelar el viaje. Su billete estaba en el teléfono, pero necesitaba un documento de identidad. Llamó a su vecino Andrés, que tenía una copia de las llaves de su piso para emergencias. Andrés encontró la cartera sobre la mesa del comedor y tomó un taxi hasta la estación.",
        "El tren salía a las 18:20 y Andrés llegó a las 18:08. Lucía pudo subir a tiempo. Ya en el vagón, escribió a sus amigas: «Esta vez he tenido suerte, pero la próxima noche prepararé todo antes de acostarme». Al final, el fin de semana fue tranquilo y visitaron la Mezquita-Catedral, varios patios y un mercado de artesanía."
      ],
      questions: [
        { q: "¿Dónde habían reservado alojamiento Lucía y sus amigas?", options: ["Cerca del centro histórico", "Junto al aeropuerto", "En una casa rural", "Dentro de la estación"], correct: "Cerca del centro histórico", explanation: "Habían reservado un pequeño apartamento cerca del centro histórico de Córdoba." },
        { q: "¿Qué había olvidado Lucía en casa?", options: ["La cartera", "El teléfono", "La maleta", "El billete de tren"], correct: "La cartera", explanation: "Al llegar a la estación, descubre que había olvidado la cartera." },
        { q: "¿Por qué necesitaba recuperar la cartera si tenía el billete en el teléfono?", options: ["Porque necesitaba un documento de identidad", "Porque debía pagar otra vez el billete", "Porque no tenía batería", "Porque sus amigas tenían su teléfono"], correct: "Porque necesitaba un documento de identidad", explanation: "El texto aclara que el billete estaba en el móvil, pero necesitaba un documento de identidad." },
        { q: "¿Cómo llegó Andrés a la estación?", options: ["En taxi", "En tren", "En autobús", "A pie"], correct: "En taxi", explanation: "Andrés tomó un taxi para llevar la cartera a la estación." },
        { q: "¿Cuántos minutos antes de la salida del tren llegó Andrés?", options: ["12 minutos", "8 minutos", "18 minutos", "20 minutos"], correct: "12 minutos", explanation: "El tren salía a las 18:20 y Andrés llegó a las 18:08: faltaban 12 minutos." },
        { q: "¿Qué decide cambiar Lucía para un próximo viaje?", options: ["Preparar todo la noche anterior", "Viajar solamente en autobús", "No volver a Córdoba", "Comprar siempre dos billetes"], correct: "Preparar todo la noche anterior", explanation: "Lucía dice que la próxima noche preparará todo antes de acostarse." }
      ]
    },
    biblioteca: {
      title: "La biblioteca que volvió a llenarse",
      level: "B1–B2",
      time: "10–12 min",
      description: "Comprensión de ideas principales, causas, consecuencias e inferencias.",
      text: [
        "Durante años, la biblioteca de un barrio de Valencia fue un lugar silencioso al que acudían principalmente estudiantes durante la época de exámenes. Aunque tenía una buena colección de libros, muchos vecinos no la consideraban un espacio para ellos. La situación comenzó a cambiar cuando el ayuntamiento amplió el horario y permitió que asociaciones del barrio propusieran actividades.",
        "Una de las primeras iniciativas fue un club de lectura intergeneracional. Jóvenes y personas mayores leían el mismo libro y se reunían cada dos semanas para comentarlo. Después aparecieron talleres de escritura, encuentros con autores locales y una pequeña asesoría digital para quienes necesitaban aprender a utilizar servicios públicos en internet.",
        "La biblioteca también reservó una sala para estudiantes que necesitaban trabajar en grupo, de modo que el resto del edificio pudiera conservar zonas silenciosas. Según la directora, el objetivo no era convertir la biblioteca en un centro de ocio, sino demostrar que el conocimiento puede circular de muchas formas. Un año después, el número de usuarios había aumentado considerablemente y, sobre todo, había cambiado su perfil: ya no acudían únicamente estudiantes, sino también familias, jubilados y trabajadores que pasaban por allí al terminar su jornada.",
        "El éxito trajo nuevos problemas. En algunas franjas horarias faltaban mesas y el personal tenía más trabajo. Aun así, la mayoría de los vecinos defendió el proyecto y pidió más recursos para mantener las actividades."
      ],
      questions: [
        { q: "¿Qué factor inició la transformación de la biblioteca?", options: ["La ampliación del horario y la participación de asociaciones", "La eliminación de todos los libros antiguos", "El cierre de las zonas de estudio", "La construcción de un cine dentro del edificio"], correct: "La ampliación del horario y la participación de asociaciones", explanation: "El cambio empieza cuando se amplía el horario y las asociaciones pueden proponer actividades." },
        { q: "¿Cuál era una característica del club de lectura?", options: ["Reunía a personas de diferentes generaciones", "Solo aceptaba estudiantes universitarios", "Se reunía todos los días", "Leía exclusivamente autores extranjeros"], correct: "Reunía a personas de diferentes generaciones", explanation: "El club era intergeneracional: participaban jóvenes y personas mayores." },
        { q: "¿Para qué se reservó una sala específica?", options: ["Para permitir el trabajo en grupo sin eliminar las zonas silenciosas", "Para guardar los libros más antiguos", "Para instalar una cafetería", "Para organizar únicamente reuniones del ayuntamiento"], correct: "Para permitir el trabajo en grupo sin eliminar las zonas silenciosas", explanation: "La sala de grupo permitió conservar otras áreas del edificio en silencio." },
        { q: "Según la directora, ¿qué quería demostrar el proyecto?", options: ["Que el conocimiento puede circular de distintas maneras", "Que las bibliotecas deben convertirse en centros comerciales", "Que los libros impresos ya no son necesarios", "Que solo los jóvenes necesitan formación digital"], correct: "Que el conocimiento puede circular de distintas maneras", explanation: "La directora afirma que el objetivo era mostrar que el conocimiento puede circular de muchas formas." },
        { q: "¿Qué cambió especialmente después de un año?", options: ["El perfil de los usuarios se volvió más diverso", "La biblioteca dejó de recibir estudiantes", "Se redujo el horario de apertura", "Se cancelaron los talleres"], correct: "El perfil de los usuarios se volvió más diverso", explanation: "Además de aumentar el número de usuarios, comenzaron a acudir familias, jubilados y trabajadores." },
        { q: "¿Qué consecuencia negativa produjo el éxito de la iniciativa?", options: ["En ciertos horarios faltaban mesas y aumentó el trabajo del personal", "Los vecinos dejaron de apoyar la biblioteca", "Desaparecieron las zonas silenciosas", "Se prohibieron las actividades culturales"], correct: "En ciertos horarios faltaban mesas y aumentó el trabajo del personal", explanation: "El texto menciona falta de mesas en algunas franjas y una mayor carga de trabajo." }
      ]
    },
    ciudad: {
      title: "Una ciudad que aprende a caminar despacio",
      level: "C1–C2",
      time: "12–15 min",
      description: "Texto argumentativo para trabajar interpretación, matices y relaciones discursivas.",
      text: [
        "Cuando una ciudad anuncia que quiere reducir el tráfico en su centro, el debate suele presentarse como una elección entre dos extremos: o se protege al peatón o se perjudica al comercio. Sin embargo, esa oposición simplifica un problema que depende de múltiples factores, entre ellos la calidad del transporte público, la distribución de los servicios y la capacidad de los barrios para ofrecer alternativas reales al automóvil.",
        "En una ciudad del norte de España, la transformación comenzó con medidas pequeñas. Algunas calles redujeron el límite de velocidad, se ampliaron las aceras y los autobuses aumentaron su frecuencia durante las horas punta. Al principio, parte de los comerciantes temía perder clientes. Dos años más tarde, un estudio municipal observó que el número de peatones había crecido y que las ventas se habían mantenido estables en la mayoría de las zonas analizadas. No todos los efectos fueron positivos: los alquileres de ciertos locales aumentaron y algunos residentes denunciaron que el barrio se estaba volviendo demasiado atractivo para negocios orientados al turismo.",
        "La experiencia sugiere que recuperar espacio para caminar no es una solución automática a los problemas urbanos. Puede mejorar la calidad del aire y favorecer encuentros cotidianos, pero también puede producir efectos inesperados si no se acompaña de políticas de vivienda, transporte y protección del comercio local. La cuestión, por tanto, no consiste únicamente en decidir cuántos coches deben circular, sino en preguntarse qué tipo de vida cotidiana quiere facilitar la ciudad y quién puede permitirse permanecer en ella.",
        "Caminar despacio, en este contexto, no significa rechazar la modernidad. Significa reconocer que la velocidad no es el único criterio para medir la eficiencia de un espacio urbano."
      ],
      questions: [
        { q: "¿Qué crítica hace el primer párrafo al debate sobre la reducción del tráfico?", options: ["Que suele plantearse mediante una oposición excesivamente simplificada", "Que nunca tiene en cuenta a los peatones", "Que se limita exclusivamente al precio de la vivienda", "Que ya existe consenso entre comerciantes y residentes"], correct: "Que suele plantearse mediante una oposición excesivamente simplificada", explanation: "El texto cuestiona la presentación del debate como una elección entre proteger al peatón o perjudicar al comercio." },
        { q: "¿Qué ocurrió con las ventas dos años después, según el estudio municipal?", options: ["Se mantuvieron estables en la mayoría de las zonas analizadas", "Desaparecieron casi por completo", "Aumentaron por igual en todas las calles", "Solo crecieron en los grandes centros comerciales"], correct: "Se mantuvieron estables en la mayoría de las zonas analizadas", explanation: "El estudio observó más peatones y ventas estables en la mayoría de las áreas estudiadas." },
        { q: "¿Qué efecto problemático se menciona junto con la mayor atracción del barrio?", options: ["El aumento del alquiler de algunos locales", "La desaparición del transporte público", "La reducción del número de peatones", "El cierre obligatorio de los comercios turísticos"], correct: "El aumento del alquiler de algunos locales", explanation: "El texto señala que aumentaron los alquileres de ciertos locales y surgieron preocupaciones por la orientación turística." },
        { q: "¿Cuál es la tesis central del tercer párrafo?", options: ["La peatonalización necesita coordinarse con otras políticas urbanas", "La reducción del tráfico resuelve por sí sola los problemas urbanos", "La vivienda no está relacionada con la transformación urbana", "La calidad del aire depende únicamente del comercio local"], correct: "La peatonalización necesita coordinarse con otras políticas urbanas", explanation: "El párrafo sostiene que recuperar espacio peatonal puede ayudar, pero requiere políticas de vivienda, transporte y protección comercial." },
        { q: "En la frase «quién puede permitirse permanecer en ella», ¿qué preocupación introduce el autor?", options: ["La posibilidad de que ciertos habitantes sean desplazados por los cambios", "La duración de los semáforos para peatones", "La cantidad de turistas que pueden entrar cada día", "La velocidad máxima de los autobuses"], correct: "La posibilidad de que ciertos habitantes sean desplazados por los cambios", explanation: "La frase vincula la transformación urbana con la capacidad económica de seguir viviendo o trabajando en la ciudad." },
        { q: "¿Qué significa «caminar despacio» en el cierre del texto?", options: ["Cuestionar que la velocidad sea el único criterio de eficiencia urbana", "Obligar a todos los habitantes a desplazarse a pie", "Rechazar cualquier innovación tecnológica", "Eliminar completamente el transporte motorizado"], correct: "Cuestionar que la velocidad sea el único criterio de eficiencia urbana", explanation: "El último párrafo define la idea como una crítica a medir la eficiencia urbana únicamente mediante la velocidad." }
      ]
    }
  };

  const app = document.getElementById("app");
  const levelScreen = document.getElementById("level-screen");
  const activitiesBlock = document.getElementById("quiz-activities-block");
  if (!app || !levelScreen || !activitiesBlock || document.getElementById("reading-tests-block")) return;

  let currentTestKey = null;

  function updateHomeStats() {
    document.querySelectorAll(".hero-stat").forEach((stat) => {
      const label = stat.querySelector("span")?.textContent.trim();
      const value = stat.querySelector("strong");
      if (!value) return;
      if (label === "preguntas y actividades") value.textContent = "114";
      if (label === "lecciones de gramática" && typeof grammarLessons !== "undefined") value.textContent = String(grammarLessons.length);
    });
  }

  function injectStyles() {
    const style = document.createElement("style");
    style.id = "reading-tests-styles";
    style.textContent = `
      .reading-tests-block{margin-top:42px;padding-top:34px;border-top:1px solid var(--line)}
      .reading-tests-heading{max-width:780px;margin-bottom:22px}.reading-tests-heading h2{margin-bottom:10px}.reading-tests-heading>p:last-child{color:var(--muted);line-height:1.7;text-align:justify}
      .reading-tests-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
      .reading-test-card{border:1px solid var(--line);border-radius:22px;background:rgba(255,255,255,.94);padding:22px;box-shadow:0 10px 28px rgba(70,40,20,.055);display:flex;flex-direction:column;min-height:245px}
      .reading-test-card-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px}.reading-test-level{padding:6px 10px;border-radius:999px;background:var(--gold-soft);color:#6b4a0d;font-weight:900;font-size:.75rem}.reading-test-time{color:var(--muted);font-size:.78rem;font-weight:800}
      .reading-test-card h3{margin:0 0 10px;color:var(--red-dark);font-family:Georgia,"Times New Roman",serif;font-size:1.45rem}.reading-test-card p{margin:0 0 20px;color:var(--muted);line-height:1.6;text-align:justify}.reading-test-card .secondary-button{margin-top:auto;align-self:flex-start}
      .reading-test-screen,.reading-test-result-screen{max-width:1040px;margin:0 auto}.reading-test-toolbar{display:flex;justify-content:space-between;align-items:center;gap:16px;margin-bottom:20px}.reading-test-badge{padding:7px 11px;border-radius:999px;background:var(--gold-soft);color:#6b4a0d;font-size:.78rem;font-weight:900}
      .reading-test-layout{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:24px;align-items:start}.reading-test-passage,.reading-test-form-card,.reading-test-result-card{border:1px solid var(--line);border-radius:26px;background:rgba(255,255,255,.96);box-shadow:var(--shadow)}
      .reading-test-passage{padding:clamp(24px,4vw,38px);position:sticky;top:18px}.reading-test-passage .eyebrow{margin-bottom:12px}.reading-test-passage h1{font-size:clamp(1.9rem,4vw,2.8rem);margin-bottom:20px}.reading-test-passage p{color:var(--ink);line-height:1.85;margin:0 0 17px;text-align:justify;hyphens:auto}.reading-test-passage-meta{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px}.reading-test-passage-meta span{padding:6px 9px;border-radius:999px;background:#fff8e7;color:var(--red-dark);font-size:.75rem;font-weight:800}
      .reading-test-form-card{padding:clamp(22px,4vw,34px)}.reading-question{padding:0 0 24px;margin:0 0 24px;border-bottom:1px solid var(--line)}.reading-question:last-of-type{border-bottom:0}.reading-question h3{margin:0 0 13px;color:var(--ink);font-size:1.03rem;line-height:1.5}.reading-options{display:grid;gap:9px}.reading-option{display:flex;gap:10px;align-items:flex-start;padding:11px 12px;border:1px solid #e6dacb;border-radius:13px;background:#fffdfa;cursor:pointer;line-height:1.45}.reading-option:hover{border-color:rgba(143,29,44,.38);background:#fff8f3}.reading-option input{margin-top:3px;accent-color:var(--red)}.reading-test-warning{min-height:22px;margin:10px 0;color:var(--error);font-weight:800;font-size:.88rem}.reading-test-submit{margin-top:4px}
      .reading-test-result-card{padding:clamp(26px,5vw,46px)}.reading-result-summary{display:flex;align-items:center;gap:20px;margin:22px 0 30px}.reading-result-score{width:112px;height:112px;flex:0 0 112px;border-radius:50%;display:grid;place-items:center;background:var(--red);color:#fff;font-family:Georgia,"Times New Roman",serif;font-size:1.8rem;font-weight:900}.reading-result-message{color:var(--muted);line-height:1.7;text-align:justify}.reading-answer-key{display:grid;gap:13px}.reading-review{border:1px solid var(--line);border-left:4px solid var(--success);border-radius:14px;padding:15px 16px;background:#fff}.reading-review.incorrect{border-left-color:var(--error)}.reading-review h3{font-size:.98rem;margin:0 0 9px;color:var(--ink);line-height:1.45}.reading-review p{margin:4px 0;color:var(--muted);line-height:1.55;text-align:justify}.reading-review .reading-correct-answer{color:var(--success);font-weight:800}.reading-result-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}.reading-result-actions .primary-button{margin-top:0}
      @media(max-width:800px){.reading-test-layout{grid-template-columns:1fr}.reading-test-passage{position:static}.reading-tests-grid{grid-template-columns:1fr}}
      @media(max-width:560px){.reading-test-toolbar{align-items:flex-start;flex-direction:column}.reading-result-summary{align-items:flex-start;flex-direction:column}.reading-result-actions>*{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function buildLibraryBlock() {
    const block = document.createElement("section");
    block.id = "reading-tests-block";
    block.className = "reading-tests-block";
    block.innerHTML = `
      <div class="reading-tests-heading">
        <p class="eyebrow">Comprensión lectora</p>
        <h2>Lee un texto en español y responde las preguntas</h2>
        <p>Escolha um nível, leia o texto completo e responda ao exercício de compreensão. A pontuação e o gabarito comentado aparecem somente no final.</p>
      </div>
      <div class="reading-tests-grid">
        ${Object.entries(readingTests).map(([key,test])=>`
          <article class="reading-test-card">
            <div class="reading-test-card-top"><span class="reading-test-level">${test.level}</span><span class="reading-test-time">${test.time}</span></div>
            <h3>${test.title}</h3>
            <p>${test.description}</p>
            <button class="secondary-button" type="button" data-reading-test="${key}">Hacer test de lectura</button>
          </article>`).join("")}
      </div>`;
    activitiesBlock.insertAdjacentElement("afterend", block);
    block.querySelectorAll("[data-reading-test]").forEach((button)=>button.addEventListener("click",()=>openReadingTest(button.dataset.readingTest)));
  }

  function buildScreens() {
    const screen = document.createElement("section");
    screen.id = "reading-test-screen";
    screen.className = "reading-test-screen hidden";
    screen.innerHTML = `
      <div class="reading-test-toolbar"><button class="text-button" id="reading-test-back" type="button">← Voltar para Quiz</button><span class="reading-test-badge" id="reading-test-badge"></span></div>
      <div class="reading-test-layout">
        <article class="reading-test-passage"><p class="eyebrow">Texto para lectura</p><h1 id="reading-test-title"></h1><div class="reading-test-passage-meta" id="reading-test-meta"></div><div id="reading-test-text"></div></article>
        <article class="reading-test-form-card"><p class="eyebrow">Ejercicio</p><h2>Comprueba tu comprensión</h2><form id="reading-test-form"></form><div class="reading-test-warning" id="reading-test-warning" role="status"></div><button class="primary-button reading-test-submit" id="reading-test-submit" type="button">Finalizar y ver gabarito</button></article>
      </div>`;
    app.appendChild(screen);

    const result = document.createElement("section");
    result.id = "reading-test-result-screen";
    result.className = "reading-test-result-screen hidden";
    result.innerHTML = `
      <article class="reading-test-result-card">
        <p class="eyebrow">Comprensión lectora · resultado</p><h1 id="reading-result-title"></h1>
        <div class="reading-result-summary"><div class="reading-result-score" id="reading-result-score"></div><p class="reading-result-message" id="reading-result-message"></p></div>
        <h2>Gabarito comentado</h2><div class="reading-answer-key" id="reading-answer-key"></div>
        <div class="reading-result-actions"><button class="primary-button" id="reading-test-retry" type="button">Refazer este teste</button><button class="secondary-button" id="reading-test-choose" type="button">Escolher outro texto</button></div>
      </article>`;
    app.appendChild(result);

    document.getElementById("reading-test-back").addEventListener("click", returnToQuiz);
    document.getElementById("reading-test-submit").addEventListener("click", submitReadingTest);
    document.getElementById("reading-test-retry").addEventListener("click", ()=>openReadingTest(currentTestKey));
    document.getElementById("reading-test-choose").addEventListener("click", returnToQuiz);
  }

  function hideAllScreens() {
    ["home-screen","level-screen","quiz-screen","result-screen","activity-screen","activity-result-screen","grammar-screen","grammar-reader-screen","vocabulary-screen","vocabulary-reader-screen","readings-screen","reader-screen","reading-test-screen","reading-test-result-screen"].forEach((id)=>document.getElementById(id)?.classList.add("hidden"));
  }

  function setQuizNav() {
    document.querySelectorAll(".main-nav .nav-link").forEach((button)=>button.classList.toggle("active",button.dataset.route==="quiz"));
  }

  function openReadingTest(key) {
    const test = readingTests[key];
    if (!test) return;
    currentTestKey = key;
    hideAllScreens();
    setQuizNav();
    document.getElementById("reading-test-screen").classList.remove("hidden");
    document.getElementById("reading-test-badge").textContent = `${test.level} · ${test.questions.length} questões`;
    document.getElementById("reading-test-title").textContent = test.title;
    document.getElementById("reading-test-meta").innerHTML = `<span>${test.level}</span><span>${test.time}</span><span>${test.questions.length} preguntas</span>`;
    document.getElementById("reading-test-text").innerHTML = test.text.map((p)=>`<p>${p}</p>`).join("");
    document.getElementById("reading-test-warning").textContent = "";
    document.getElementById("reading-test-form").innerHTML = test.questions.map((item,index)=>`
      <fieldset class="reading-question"><legend class="hidden">Pergunta ${index+1}</legend><h3>${index+1}. ${item.q}</h3><div class="reading-options">
      ${item.options.map((option,optIndex)=>`<label class="reading-option"><input type="radio" name="reading-q-${index}" value="${optIndex}"><span>${option}</span></label>`).join("")}
      </div></fieldset>`).join("");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function submitReadingTest() {
    const test = readingTests[currentTestKey];
    if (!test) return;
    const answers = [];
    for (let i=0;i<test.questions.length;i+=1) {
      const checked = document.querySelector(`input[name="reading-q-${i}"]:checked`);
      if (!checked) {
        document.getElementById("reading-test-warning").textContent = `Responda todas as questões antes de finalizar. Falta a questão ${i+1}.`;
        checked?.focus();
        return;
      }
      answers.push(test.questions[i].options[Number(checked.value)]);
    }

    let score = 0;
    test.questions.forEach((item,index)=>{if(answers[index]===item.correct)score+=1;});
    hideAllScreens();
    setQuizNav();
    document.getElementById("reading-test-result-screen").classList.remove("hidden");
    document.getElementById("reading-result-title").textContent = test.title;
    document.getElementById("reading-result-score").textContent = `${score}/${test.questions.length}`;
    const ratio = score/test.questions.length;
    document.getElementById("reading-result-message").textContent = ratio===1 ? "¡Excelente! Você compreendeu todos os detalhes do texto." : ratio>=.8 ? "¡Muy bien! Sua compreensão foi muito consistente. Use o gabarito para revisar apenas os detalhes que passaram despercebidos." : ratio>=.6 ? "¡Buen trabajo! Você identificou as ideias principais, mas vale reler os trechos relacionados às respostas incorretas." : "Releia o texto com calma e observe personagens, marcadores temporais, relações de causa e consequência e palavras que mudam o sentido do argumento.";
    document.getElementById("reading-answer-key").innerHTML = test.questions.map((item,index)=>{
      const ok=answers[index]===item.correct;
      return `<article class="reading-review ${ok?"":"incorrect"}"><h3>${index+1}. ${item.q}</h3><p>Sua resposta: <strong>${answers[index]}</strong></p><p class="reading-correct-answer">Gabarito: ${item.correct}</p><p>${item.explanation}</p></article>`;
    }).join("");
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function returnToQuiz() {
    document.getElementById("reading-test-screen")?.classList.add("hidden");
    document.getElementById("reading-test-result-screen")?.classList.add("hidden");
    levelScreen.classList.remove("hidden");
    setQuizNav();
    setTimeout(()=>document.getElementById("reading-tests-block")?.scrollIntoView({behavior:"smooth",block:"start"}),60);
  }

  document.querySelectorAll('[data-route]').forEach((button)=>button.addEventListener("click",()=>{
    document.getElementById("reading-test-screen")?.classList.add("hidden");
    document.getElementById("reading-test-result-screen")?.classList.add("hidden");
  }));

  injectStyles();
  buildLibraryBlock();
  buildScreens();
  updateHomeStats();
})();