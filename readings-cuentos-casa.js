/* Ampliação de Lecturas com práticas didáticas baseadas em "Cuentos para quedarse en casa", de Eloy Moreno. */
(function () {
  if (typeof readingData === "undefined" || typeof renderReadingCards !== "function") return;

  const sourceLabel = "Práctica didáctica basada en el cuento homónimo de Eloy Moreno, incluido en el ebook gratuito Cuentos para quedarse en casa. Se ofrece una síntesis original para estudiantes de español, sin reproducir íntegramente el texto fuente.";

  const newReadings = {
    pulsera_casa: {
      title: "La pulsera",
      level: "A2–B1",
      time: "6 min",
      theme: "Familia, gratitud y generosidad",
      description: "Uma prática sobre afeto, gratidão e o valor simbólico de um presente.",
      intro: sourceLabel,
      paragraphs: [
        "Una niña observa durante varios días una pulsera de oro en el escaparate de una joyería. Quiere regalársela a su madre por su cumpleaños, porque está muy agradecida por todo el esfuerzo que ella hace para ayudarla con los estudios.",
        "Cuando entra en la tienda, reúne todo lo que ha conseguido ahorrar: monedas, un pequeño billete y algunos objetos de poco valor material. El joyero comprende enseguida que la niña no puede pagar el precio real de la joya, pero también entiende la importancia que aquel regalo tiene para ella.",
        "Al día siguiente, la madre regresa a la joyería preocupada. Sabe que su hija no tenía dinero suficiente para comprar una pulsera de oro y piensa que debe existir algún error.",
        "El joyero no le revela una cantidad concreta. Le explica que la niña pagó el precio más alto que podía pagar una persona: entregó todo lo que tenía. El relato invita a pensar en la diferencia entre precio, valor y generosidad."
      ],
      glossary: [["joyería", "loja onde se vendem joias"], ["escaparate", "vitrine de uma loja"], ["ahorrar", "guardar dinheiro para usar no futuro"], ["regalo", "presente"], ["valor", "importância ou significado de algo"]],
      comprehension: [
        { q: "¿Por qué quiere la niña comprar la pulsera?", options: ["Para agradecer a su madre", "Para venderla después", "Para usarla en la escuela"], correct: 0 },
        { q: "¿Qué comprende el joyero sobre la niña?", options: ["Que el regalo tiene un gran valor emocional", "Que quiere engañarlo", "Que no conoce a su madre"], correct: 0 },
        { q: "¿Por qué vuelve la madre a la joyería?", options: ["Porque duda de que su hija pudiera pagar la joya", "Porque quiere comprar otra pulsera", "Porque perdió el paquete"], correct: 0 },
        { q: "¿Qué idea central propone la historia?", options: ["El valor de un gesto no depende solo de su precio", "Las joyas siempre son necesarias", "Ahorrar es más importante que agradecer"], correct: 0 }
      ]
    },
    rosa_sapo_casa: {
      title: "La rosa y el sapo",
      level: "B1–B2",
      time: "7 min",
      theme: "Amistad, apariencia y dependencia",
      description: "Uma leitura sobre aparência, amizade e aquilo que só percebemos quando perdemos.",
      intro: sourceLabel,
      paragraphs: [
        "Una rosa y un sapo crecen juntos en un jardín y durante mucho tiempo mantienen una amistad muy cercana. El sapo visita a la rosa, conversa con ella y permanece a su lado mientras ambos comparten el paso de las estaciones.",
        "Con el tiempo, la rosa empieza a sentirse orgullosa de su belleza. Piensa que la presencia del sapo espanta a quienes se acercan para admirarla y termina pidiéndole que se vaya a otra parte del jardín.",
        "Meses después, el sapo vuelve a visitarla y descubre que la rosa está marchita. Los insectos han dañado sus pétalos y su tallo. La rosa no comprende por qué antes eso no ocurría.",
        "Entonces el sapo le hace ver que él se alimentaba de los insectos que podían perjudicarla. La rosa había juzgado su presencia por la apariencia y no había reconocido la ayuda que recibía."
      ],
      glossary: [["sapo", "anfíbio semelhante ao sapo"], ["marchita", "que perdeu frescor e vigor"], ["pétalos", "partes coloridas de uma flor"], ["espantar", "afastar ou assustar"], ["apariencia", "aspecto exterior"]],
      comprehension: [
        { q: "¿Por qué la rosa pide al sapo que se vaya?", options: ["Porque cree que su aspecto aleja a los visitantes", "Porque el sapo destruye sus pétalos", "Porque quiere abandonar el jardín"], correct: 0 },
        { q: "¿Qué descubre el sapo meses después?", options: ["Que la rosa está muy dañada", "Que la rosa se ha convertido en árbol", "Que el jardín ha desaparecido"], correct: 0 },
        { q: "¿Qué función cumplía el sapo sin que la rosa lo valorara?", options: ["Se comía los insectos que podían dañarla", "Regaba las flores cada mañana", "Atraía a más visitantes"], correct: 0 },
        { q: "¿Qué contraste sostiene el cuento?", options: ["Apariencia frente a utilidad y amistad", "Invierno frente a verano", "Riqueza frente a pobreza"], correct: 0 }
      ]
    },
    circo_casa: {
      title: "Las entradas del circo",
      level: "A2–B1",
      time: "4 min",
      theme: "Honestidad y ejemplo",
      description: "Uma história breve sobre honestidade e o exemplo que os adultos oferecem às crianças.",
      intro: sourceLabel,
      paragraphs: [
        "Una madre lleva a su hija al circo para celebrar su cumpleaños. En la taquilla descubre que existe un precio diferente para adultos y para niños pequeños.",
        "Aunque la hija podría pasar por una niña menor, la madre pide dos entradas de adulto. El vendedor se sorprende porque ella podría haber pagado menos sin que él notara la verdadera edad de la niña.",
        "La madre reconoce que el vendedor probablemente no se habría dado cuenta. Sin embargo, explica que su hija sí habría sabido que estaban mintiendo.",
        "La escena muestra que la honestidad no depende únicamente de que alguien descubra el engaño, sino también del ejemplo que damos y de la coherencia con nuestros propios valores."
      ],
      glossary: [["taquilla", "bilheteria"], ["entrada", "bilhete de acesso"], ["ahorrarse", "deixar de gastar uma quantia"], ["darse cuenta", "perceber"], ["honestidad", "qualidade de agir com verdade e correção"]],
      comprehension: [
        { q: "¿Adónde van la madre y su hija?", options: ["Al circo", "Al teatro", "A una tienda"], correct: 0 },
        { q: "¿Qué hace la madre en la taquilla?", options: ["Paga la tarifa que corresponde", "Dice una edad falsa", "Se va sin comprar entradas"], correct: 0 },
        { q: "¿Qué destaca la respuesta de la madre?", options: ["Que su hija sabría si ella mentía", "Que el vendedor debía regalarle una entrada", "Que el circo era demasiado caro"], correct: 0 },
        { q: "¿Cuál es el tema principal?", options: ["La honestidad y el ejemplo", "La publicidad del circo", "La edad de los artistas"], correct: 0 }
      ]
    },
    estrellas_mar_casa: {
      title: "Las estrellas de mar",
      level: "A2–B1",
      time: "5 min",
      theme: "Acción individual y solidaridad",
      description: "Uma leitura sobre o valor de pequenas ações diante de problemas muito grandes.",
      intro: sourceLabel,
      paragraphs: [
        "Después de una noche difícil en el mar, miles de estrellas quedan sobre la arena de una playa. Un hombre que camina por allí piensa que es imposible salvarlas a todas y continúa su paseo con tristeza.",
        "Más adelante ve a una niña que corre continuamente entre la arena y el agua. Ella recoge estrellas y las devuelve al mar una por una para evitar que mueran.",
        "El hombre le dice que su esfuerzo parece inútil porque hay demasiadas estrellas y nunca podrá rescatarlas a todas.",
        "La niña lanza otra estrella al agua y responde con una idea sencilla: para esa estrella concreta, su acción sí ha cambiado todo. El cuento pone el foco en el impacto real de los pequeños gestos."
      ],
      glossary: [["orilla", "parte onde a água encontra a terra"], ["arena", "areia"], ["rescatar", "salvar de uma situação de perigo"], ["esfuerzo", "energia dedicada a conseguir algo"], ["impacto", "efeito ou consequência"]],
      comprehension: [
        { q: "¿Qué encuentra el hombre en la playa?", options: ["Miles de estrellas de mar", "Muchos barcos", "Una red abandonada"], correct: 0 },
        { q: "¿Qué hace la niña?", options: ["Devuelve estrellas al mar", "Las recoge para venderlas", "Construye figuras con arena"], correct: 0 },
        { q: "¿Por qué el hombre considera inútil el esfuerzo?", options: ["Porque piensa que no podrá salvarlas a todas", "Porque cree que las estrellas saben nadar solas", "Porque la playa está cerrada"], correct: 0 },
        { q: "¿Qué enseñanza transmite la respuesta de la niña?", options: ["Una acción pequeña puede ser decisiva para alguien", "Solo vale la pena actuar si podemos resolver todo", "Los problemas grandes no tienen solución"], correct: 0 }
      ]
    },
    zapatos_afortunado_casa: {
      title: "Los zapatos del hombre afortunado",
      level: "B1–B2",
      time: "7 min",
      theme: "Felicidad, riqueza y expectativas",
      description: "Uma história sobre felicidade e a distância entre possuir muito e sentir-se satisfeito.",
      intro: sourceLabel,
      paragraphs: [
        "Un rey poderoso posee riqueza, prestigio y comodidades, pero no consigue sentirse feliz. Desesperado, pide ayuda y promete una gran recompensa a quien encuentre una solución.",
        "Un sabio propone buscar a una persona completamente satisfecha con su vida y llevar al rey los zapatos de ese individuo. Los consejeros recorren el reino, pero descubren que todas las personas con las que hablan tienen alguna preocupación o deseo insatisfecho.",
        "Finalmente encuentran a un campesino humilde que, a pesar de tener muy poco, parece vivir con alegría y serenidad. Los mensajeros creen que por fin han encontrado la respuesta que buscaban.",
        "Sin embargo, aparece una paradoja: el hombre feliz es tan pobre que ni siquiera tiene zapatos. El relato cuestiona la idea de que bienestar y felicidad dependan necesariamente de la riqueza material."
      ],
      glossary: [["reino", "território governado por um rei"], ["consejeros", "pessoas que aconselham uma autoridade"], ["satisfecho", "contente com aquilo que tem"], ["campesino", "trabalhador do campo"], ["paradoja", "situação aparentemente contraditória"]],
      comprehension: [
        { q: "¿Qué problema tiene el rey?", options: ["No consigue ser feliz", "Ha perdido su reino", "No tiene consejeros"], correct: 0 },
        { q: "¿Qué aconseja buscar el sabio?", options: ["A una persona plenamente feliz", "Un tesoro escondido", "Un médico extranjero"], correct: 0 },
        { q: "¿Qué descubren al encontrar al campesino?", options: ["Que es feliz pero no tiene zapatos", "Que es rico y poderoso", "Que se niega a hablar"], correct: 0 },
        { q: "¿Qué cuestiona principalmente el cuento?", options: ["La relación automática entre riqueza y felicidad", "La utilidad de los zapatos", "La organización de los reinos"], correct: 0 }
      ]
    },
    halcon_casa: {
      title: "El halcón que no volaba",
      level: "B1–B2",
      time: "6 min",
      theme: "Cambio, miedo y zona de confort",
      description: "Uma metáfora sobre aquilo que nos mantém parados e a necessidade de enfrentar mudanças.",
      intro: sourceLabel,
      paragraphs: [
        "Un rey adquiere varios halcones famosos por su capacidad de vuelo. Casi todos se adaptan rápidamente, pero uno permanece inmóvil sobre la misma rama y se niega a volar.",
        "Entrenadores y habitantes del reino prueban diferentes métodos para animarlo. Le ofrecen comida, música y atención, pero nada consigue que abandone su lugar habitual.",
        "Una anciana observa la situación y afirma que puede resolver el problema. Poco después, el rey ve sorprendido que el halcón está finalmente volando.",
        "La mujer explica que simplemente cortó la rama que sostenía al animal. La imagen funciona como una metáfora sobre la seguridad, el miedo al cambio y las circunstancias que a veces nos obligan a descubrir capacidades que no utilizábamos."
      ],
      glossary: [["halcón", "ave de rapina"], ["rama", "parte de uma árvore que sai do tronco"], ["inmóvil", "sem se mover"], ["animar", "incentivar"], ["sostener", "manter ou apoiar algo"]],
      comprehension: [
        { q: "¿Qué diferencia a uno de los halcones?", options: ["No quiere abandonar su rama", "No sabe comer", "No puede ver"], correct: 0 },
        { q: "¿Qué ocurre con los primeros intentos de ayudarlo?", options: ["No funcionan", "Funcionan inmediatamente", "Asustan a todos los halcones"], correct: 0 },
        { q: "¿Cómo logra la anciana que vuele?", options: ["Elimina la rama que lo sostenía", "Le enseña una canción", "Lo lleva a otra ciudad"], correct: 0 },
        { q: "¿Qué puede simbolizar la rama?", options: ["Una seguridad que impide avanzar", "Una recompensa económica", "La amistad entre animales"], correct: 0 }
      ]
    },
    manzanos_casa: {
      title: "El hombre que plantaba manzanos",
      level: "A2–B1",
      time: "4 min",
      theme: "Generosidad y legado",
      description: "Uma leitura curta sobre pensar além do próprio benefício imediato.",
      intro: sourceLabel,
      paragraphs: [
        "Un hombre muy mayor prepara la tierra de su jardín para plantar varios manzanos. Su vecino lo observa y no entiende por qué alguien de tanta edad dedica tiempo a árboles que tardarán años en dar frutos.",
        "El vecino le pregunta si realmente espera vivir lo suficiente para comer las futuras manzanas. El anciano responde con tranquilidad que probablemente no.",
        "Entonces añade que durante toda su vida comió frutas de árboles que otras personas habían plantado antes que él.",
        "La historia presenta la idea del legado: algunas acciones tienen sentido aunque sus beneficios lleguen más tarde y sean disfrutados por otras personas."
      ],
      glossary: [["manzano", "árvore que produz maçãs"], ["semillas", "sementes"], ["vecino", "pessoa que mora perto"], ["fruto", "parte de uma planta que pode ser alimento"], ["legado", "algo que deixamos para outras pessoas"]],
      comprehension: [
        { q: "¿Qué está haciendo el anciano?", options: ["Plantando manzanos", "Vendiendo frutas", "Construyendo una casa"], correct: 0 },
        { q: "¿Qué duda tiene el vecino?", options: ["Si el anciano llegará a comer esas manzanas", "Si los árboles necesitan agua", "Si el jardín pertenece al rey"], correct: 0 },
        { q: "¿Qué recuerda el anciano?", options: ["Que él comió frutos de árboles plantados por otros", "Que nunca le gustaron las manzanas", "Que quiere vender el terreno"], correct: 0 },
        { q: "¿Qué valor destaca la historia?", options: ["Pensar en quienes vendrán después", "Buscar siempre un beneficio inmediato", "Evitar proyectos a largo plazo"], correct: 0 }
      ]
    },
    raton_casa: {
      title: "El ratón",
      level: "B1–B2",
      time: "7 min",
      theme: "Miedo, identidad y cambio interior",
      description: "Uma narrativa sobre a diferença entre mudar por fora e transformar aquilo que sentimos por dentro.",
      intro: sourceLabel,
      paragraphs: [
        "Un ratón vive dominado por el miedo a los gatos. Un mago siente compasión por él y acepta transformarlo en gato para que pueda vivir sin esa amenaza.",
        "Durante un tiempo parece feliz, pero pronto empieza a esconderse de los perros. El mago vuelve a ayudarlo y lo transforma en un perro fuerte.",
        "El problema reaparece de otra forma: ahora el animal teme a las personas y vuelve a refugiarse en cualquier lugar donde se sienta protegido.",
        "El mago concluye que cambiar la apariencia no ha cambiado el miedo profundo del personaje. Por eso lo convierte de nuevo en ratón y le explica que ninguna transformación externa será suficiente mientras su manera de enfrentarse al miedo siga siendo la misma."
      ],
      glossary: [["roedor", "animal do grupo dos ratos"], ["acurrucado", "encolhido sobre si mesmo"], ["transformar", "mudar de forma ou condição"], ["refugiarse", "proteger-se em um lugar seguro"], ["apariencia", "aspecto exterior"]],
      comprehension: [
        { q: "¿Qué miedo tiene el ratón al principio?", options: ["A los gatos", "A los pájaros", "Al agua"], correct: 0 },
        { q: "¿Qué ocurre después de transformarse en gato?", options: ["Empieza a temer a los perros", "Pierde todos sus miedos", "Se convierte en mago"], correct: 0 },
        { q: "¿Por qué el mago lo convierte de nuevo en ratón?", options: ["Porque entiende que el problema es interior", "Porque necesita otro animal", "Porque el hechizo era temporal"], correct: 0 },
        { q: "¿Qué oposición estructura el relato?", options: ["Cambio externo frente a transformación interior", "Campo frente a ciudad", "Trabajo frente a descanso"], correct: 0 }
      ]
    },
    nino_pudo_casa: {
      title: "El niño que pudo hacerlo",
      level: "A2–B1",
      time: "5 min",
      theme: "Confianza y límites",
      description: "Uma leitura sobre confiança, urgência e crenças que podem limitar a ação.",
      intro: sourceLabel,
      paragraphs: [
        "Dos niños están jugando sobre un lago helado cuando el hielo se rompe y uno cae al agua. Su amigo pide ayuda, pero nadie llega inmediatamente.",
        "Sin esperar, el niño busca una piedra y golpea el hielo con todas sus fuerzas hasta conseguir abrir un espacio. Finalmente logra sacar a su compañero del agua.",
        "Cuando llegan los adultos, muchos se sorprenden de que un niño tan pequeño haya podido romper una capa tan gruesa de hielo.",
        "Un anciano ofrece una explicación simbólica: el niño actuó sin tener a nadie cerca diciéndole que era imposible. El cuento invita a reflexionar sobre cómo las expectativas ajenas pueden influir en lo que creemos capaces de hacer."
      ],
      glossary: [["helado", "congelado pelo frio"], ["romper", "quebrar"], ["grieta", "abertura ou rachadura"], ["rescatar", "salvar de um perigo"], ["capaz", "que tem habilidade para fazer algo"]],
      comprehension: [
        { q: "¿Qué accidente ocurre en el lago?", options: ["Un niño cae al agua", "Se pierde una piedra", "Llega una tormenta"], correct: 0 },
        { q: "¿Cómo actúa su amigo?", options: ["Golpea el hielo hasta abrirlo", "Se marcha a casa", "Espera sin hacer nada"], correct: 0 },
        { q: "¿Qué sorprende a los adultos?", options: ["La fuerza y determinación del niño", "La profundidad del lago", "La presencia del anciano"], correct: 0 },
        { q: "¿Qué sugiere el final?", options: ["Las creencias limitantes pueden influir en nuestras acciones", "Los niños nunca sienten miedo", "Siempre debemos actuar sin ayuda"], correct: 0 }
      ]
    },
    felicidad_intensa_casa: {
      title: "La felicidad intensa",
      level: "B1–B2",
      time: "7 min",
      theme: "Felicidad, pérdida y percepción",
      description: "Uma narrativa sobre como a sensação de felicidade pode depender de contraste e perspectiva.",
      intro: sourceLabel,
      paragraphs: [
        "Una mujer recorre distintos lugares buscando una experiencia de felicidad absoluta. Está dispuesta a entregar todos sus ahorros a quien consiga mostrársela.",
        "Un día conoce a un hombre que parece sabio. Cuando ella explica su búsqueda y le muestra la bolsa con el dinero, él la toma y sale corriendo. La mujer cree que ha sido engañada y pasa horas desesperada intentando recuperarla.",
        "Al final del día vuelve al lugar donde conoció al hombre y encuentra la bolsa intacta junto a él. Comprueba que todo el dinero sigue allí y siente una enorme alegría.",
        "El hombre le pregunta si ahora se siente feliz. La experiencia plantea que muchas veces valoramos algo con más intensidad cuando imaginamos que lo hemos perdido."
      ],
      glossary: [["ahorros", "dinheiro guardado"], ["impostor", "pessoa que finge ser quem não é"], ["recuperar", "voltar a obter algo perdido"], ["intacta", "sem danos ou perdas"], ["perspectiva", "modo de perceber uma situação"]],
      comprehension: [
        { q: "¿Qué busca la mujer?", options: ["Sentir una felicidad completa", "Comprar una casa", "Encontrar un nuevo trabajo"], correct: 0 },
        { q: "¿Qué hace el hombre con la bolsa?", options: ["Se la lleva temporalmente", "La destruye", "La entrega a otra persona"], correct: 0 },
        { q: "¿Qué siente la mujer cuando recupera el dinero?", options: ["Una alegría muy intensa", "Indiferencia", "Enfado con todo el pueblo"], correct: 0 },
        { q: "¿Qué relación explora la historia?", options: ["Pérdida, recuperación y percepción de la felicidad", "Trabajo y educación", "Viajes y turismo"], correct: 0 }
      ]
    },
    rana_escorpion_casa: {
      title: "La rana y el escorpión",
      level: "B1–B2",
      time: "8 min",
      theme: "Naturaleza, confianza y decisiones",
      description: "Uma leitura que contrapõe comportamento, confiança e escolha moral.",
      intro: sourceLabel,
      paragraphs: [
        "Una rana ayuda habitualmente a otros animales a cruzar un lago. Un día, un escorpión le pide que lo lleve sobre su espalda porque no sabe nadar.",
        "La rana duda porque teme ser picada. El escorpión argumenta que hacerlo sería absurdo, ya que si la rana muriera ambos se hundirían. Finalmente ella acepta ayudarlo.",
        "Durante el trayecto, el escorpión termina picándola. Más tarde, otra persona intenta salvar al mismo animal y también recibe una picadura, pero decide buscar otra forma de rescatarlo sin abandonar su intención.",
        "El cuento contrapone dos afirmaciones sobre la naturaleza: el escorpión justifica su conducta diciendo que no puede evitarla, mientras la mujer defiende que ayudar también forma parte de su propia manera de ser."
      ],
      glossary: [["aguijón", "parte pontiaguda usada por alguns animais para picar"], ["fiarse", "confiar"], ["ahogarse", "morrer ou estar em perigo por falta de ar na água"], ["rescatar", "salvar"], ["naturaleza", "características próprias de um ser"]],
      comprehension: [
        { q: "¿Por qué la rana duda en ayudar al escorpión?", options: ["Teme que la pique", "No sabe nadar", "Quiere irse del lago"], correct: 0 },
        { q: "¿Qué argumento usa el escorpión para convencerla?", options: ["Que si la pica ambos corren peligro", "Que puede volar", "Que conoce otro camino"], correct: 0 },
        { q: "¿Qué hace la mujer al final?", options: ["Busca una forma segura de salvar al escorpión", "Lo abandona inmediatamente", "Lo lleva a su casa"], correct: 0 },
        { q: "¿Qué contraste plantea el desenlace?", options: ["Dos maneras de entender la propia naturaleza", "Dos tipos de lagos", "Dos formas de viajar"], correct: 0 }
      ]
    },
    regalo_casa: {
      title: "El Regalo",
      level: "A2–B1",
      time: "4 min",
      theme: "Esfuerzo, afecto y significado",
      description: "Uma história breve sobre o esforço que pode transformar um objeto simples em algo valioso.",
      intro: sourceLabel,
      paragraphs: [
        "En el cumpleaños de una maestra, una niña se acerca para entregarle una pequeña flor. La profesora se sorprende porque sabe que esa flor no crece cerca de la escuela.",
        "La alumna explica que fue a buscarla a una zona alejada, junto a un lago. Para conseguirla tuvo que caminar una larga distancia y dedicar varias horas.",
        "La maestra se emociona y le dice que no era necesario hacer un esfuerzo tan grande por un regalo.",
        "La niña responde que precisamente ese esfuerzo también forma parte del regalo. La historia propone que el significado de un presente incluye tiempo, intención y dedicación."
      ],
      glossary: [["maestra", "professora"], ["flor", "flor"], ["alejado", "distante"], ["esfuerzo", "energia e dedicação para realizar algo"], ["detalle", "gesto de cuidado ou atenção"]],
      comprehension: [
        { q: "¿Qué recibe la maestra?", options: ["Una flor", "Un libro", "Una pulsera"], correct: 0 },
        { q: "¿Por qué la profesora se sorprende?", options: ["Porque la flor viene de un lugar lejano", "Porque no es su cumpleaños", "Porque la niña no la conoce"], correct: 0 },
        { q: "¿Qué considera la niña parte del regalo?", options: ["El esfuerzo de ir a buscar la flor", "El precio de la flor", "La caja donde la lleva"], correct: 0 },
        { q: "¿Qué idea principal transmite el cuento?", options: ["El valor de un regalo puede estar en la dedicación", "Los regalos deben ser caros", "Las flores siempre deben comprarse"], correct: 0 }
      ]
    },
    tazon_madera_casa: {
      title: "El tazón de madera",
      level: "B1–B2",
      time: "8 min",
      theme: "Familia, vejez y empatía",
      description: "Uma leitura sobre o tratamento dado aos idosos e a força do exemplo dentro da família.",
      intro: sourceLabel,
      paragraphs: [
        "Un anciano se muda a casa de su hijo porque ya no puede vivir solo. Con la edad, sus movimientos son más lentos y durante las comidas derrama agua, deja caer cubiertos y necesita más tiempo para comer.",
        "Su hijo y su nuera empiezan a impacientarse. Finalmente deciden que el abuelo coma solo en otra habitación y le dan un tazón de madera para evitar que rompa la vajilla.",
        "El nieto observa la situación. Un día, sus padres lo encuentran trabajando con dos trozos de madera. Cuando le preguntan qué está haciendo, responde que prepara los recipientes que ellos usarán cuando sean mayores.",
        "La respuesta del niño hace que los adultos comprendan el ejemplo que estaban dando. A partir de ese momento, la familia vuelve a comer junta."
      ],
      glossary: [["anciano", "pessoa idosa"], ["cubiertos", "talheres"], ["derramar", "deixar um líquido sair do recipiente"], ["nuera", "esposa do filho"], ["vajilla", "conjunto de pratos, copos e recipientes de mesa"]],
      comprehension: [
        { q: "¿Por qué el anciano se muda con su hijo?", options: ["Porque necesita ayuda", "Porque quiere vender la casa del hijo", "Porque busca trabajo"], correct: 0 },
        { q: "¿Qué decisión toma la familia durante las comidas?", options: ["Separarlo de la mesa familiar", "Comprar un restaurante", "Dejar de cenar"], correct: 0 },
        { q: "¿Qué construye el nieto?", options: ["Tazones para el futuro de sus padres", "Una mesa nueva", "Un juguete para el abuelo"], correct: 0 },
        { q: "¿Qué provoca el cambio final?", options: ["Los adultos reconocen el ejemplo que daban", "El abuelo decide irse", "La familia compra nuevos muebles"], correct: 0 }
      ]
    },
    futuro_casa: {
      title: "El futuro",
      level: "B1–B2",
      time: "4 min",
      theme: "Tiempo, afecto y memoria",
      description: "Uma leitura breve e poética sobre o futuro entendido como conjunto de momentos compartilhados.",
      intro: sourceLabel,
      paragraphs: [
        "Una niña pregunta qué es el futuro. La persona que la acompaña intenta responder y piensa primero en el tiempo: la tarde, la noche, el día siguiente y todo lo que todavía no ha ocurrido.",
        "Después comprende que hablar del futuro también significa imaginar experiencias compartidas: juegos, viajes, miedos, risas, abrazos, secretos y aprendizajes.",
        "El futuro deja de aparecer como una idea abstracta y se convierte en una suma de momentos que aún están por vivir.",
        "Cuando la niña repite la pregunta, la respuesta final se vuelve afectiva: el futuro no se define solo por el calendario, sino por la persona con quien se espera compartir lo que vendrá."
      ],
      glossary: [["futuro", "tempo que ainda virá"], ["compartir", "dividir uma experiência com alguém"], ["cosquillas", "cócegas"], ["abrazos", "abraços"], ["momento", "instante ou período breve"]],
      comprehension: [
        { q: "¿Qué pregunta inicia la reflexión?", options: ["Qué es el futuro", "Qué es la memoria", "Qué es la escuela"], correct: 0 },
        { q: "¿Cómo se describe después el futuro?", options: ["Como momentos y experiencias por compartir", "Como una fecha exacta", "Como un lugar lejano"], correct: 0 },
        { q: "¿Qué tono tiene principalmente el texto?", options: ["Reflexivo y afectivo", "Técnico y científico", "Publicitario"], correct: 0 },
        { q: "¿Qué cambia entre la primera y la última idea?", options: ["Se pasa del tiempo abstracto a una relación personal", "Se pasa del presente al pasado", "Se abandona completamente la idea de futuro"], correct: 0 }
      ]
    }
  };

  Object.entries(newReadings).forEach(([id, story]) => { readingData[id] = story; });

  let currentPage = 1;
  const PAGE_SIZE = 6;
  let searchTerm = "";

  function injectReadingExpansionStyles() {
    if (document.getElementById("readings-casa-styles")) return;
    const style = document.createElement("style");
    style.id = "readings-casa-styles";
    style.textContent = `
      .reading-source-note{margin:0 0 20px;padding:14px 16px;border:1px dashed rgba(143,29,44,.22);border-radius:16px;background:rgba(255,255,255,.62);color:var(--muted);font-size:.86rem;line-height:1.6}
      .reading-source-note strong{color:var(--red-dark)}
      .reading-search-wrap{flex:1 1 250px;display:grid;gap:5px}.reading-search-wrap span{font-size:.7rem;font-weight:900;text-transform:uppercase;letter-spacing:.07em;color:var(--muted)}.reading-search{width:100%;min-height:44px;border:1px solid var(--line);border-radius:12px;background:#fff;padding:10px 12px;font:inherit;color:var(--ink)}.reading-search:focus{outline:2px solid rgba(143,29,44,.14);border-color:rgba(143,29,44,.4)}
      .reading-pagination{margin:28px 0 8px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:12px}.reading-pagination .secondary-button{margin:0}.reading-pagination-status{min-width:190px;text-align:center!important;color:var(--muted);font-size:.86rem;font-weight:800}.reading-pagination button:disabled{opacity:.42;cursor:not-allowed}
      @media(max-width:720px){.reading-toolbar{align-items:stretch!important}.reading-search-wrap{width:100%}.filter-group{width:100%}.reading-pagination{display:grid;grid-template-columns:1fr 1fr}.reading-pagination-status{grid-column:1/-1;grid-row:1;min-width:0}.reading-pagination button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function setupReadingToolbar() {
    const screen = document.getElementById("readings-screen");
    const heading = screen?.querySelector(".readings-heading");
    const toolbar = screen?.querySelector(".reading-toolbar");
    const grid = document.getElementById("reading-grid");
    if (!screen || !heading || !toolbar || !grid) return;

    const heroText = heading.querySelector(".hero-text");
    if (heroText) heroText.textContent = "Leia no seu ritmo, consulte o glossário e responda às perguntas de compreensão. A biblioteca reúne adaptações didáticas autorais de contos tradicionais e novas práticas baseadas em Cuentos para quedarse en casa, de Eloy Moreno.";

    if (!document.getElementById("reading-source-note")) {
      const note = document.createElement("div");
      note.id = "reading-source-note";
      note.className = "reading-source-note";
      note.innerHTML = "<strong>Fonte das novas práticas:</strong> Eloy Moreno, <em>Cuentos para quedarse en casa</em> (edição digital gratuita de 17 de março de 2020). As atividades abaixo usam sínteses didáticas originais e não reproduzem integralmente os contos do ebook.";
      heading.insertAdjacentElement("afterend", note);
    }

    toolbar.innerHTML = `
      <label class="reading-search-wrap"><span>Buscar lectura</span><input id="reading-search-expanded" class="reading-search" type="search" placeholder="Buscar por título o tema…" autocomplete="off"></label>
      <div><span style="display:block;margin-bottom:7px;font-size:.7rem;font-weight:900;text-transform:uppercase;letter-spacing:.07em;color:var(--muted)">Nivel</span><div class="filter-group" id="reading-filter-expanded" role="group" aria-label="Nivel de las lecturas">
        <button class="filter-button active" type="button" data-reading-expanded-filter="all">Todos</button>
        <button class="filter-button" type="button" data-reading-expanded-filter="A1–A2">A1–A2</button>
        <button class="filter-button" type="button" data-reading-expanded-filter="A2–B1">A2–B1</button>
        <button class="filter-button" type="button" data-reading-expanded-filter="B1–B2">B1–B2</button>
      </div></div>`;

    if (!document.getElementById("reading-pagination")) {
      const pagination = document.createElement("nav");
      pagination.id = "reading-pagination";
      pagination.className = "reading-pagination";
      pagination.setAttribute("aria-label", "Paginación de lecturas");
      grid.insertAdjacentElement("afterend", pagination);
    }

    document.getElementById("reading-search-expanded")?.addEventListener("input", (e) => {
      searchTerm = e.target.value.trim().toLocaleLowerCase("es");
      currentPage = 1;
      renderReadingCards();
    });

    document.querySelectorAll("[data-reading-expanded-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        readingFilter = button.dataset.readingExpandedFilter;
        currentPage = 1;
        document.querySelectorAll("[data-reading-expanded-filter]").forEach((b) => b.classList.toggle("active", b === button));
        renderReadingCards();
      });
    });

    const coming = screen.querySelector(".coming-soon");
    if (coming) coming.remove();
  }

  renderReadingCards = function () {
    const grid = document.getElementById("reading-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const matches = Object.entries(readingData).filter(([, story]) => {
      const levelMatch = readingFilter === "all" || story.level === readingFilter;
      const haystack = `${story.title} ${story.theme} ${story.description}`.toLocaleLowerCase("es");
      return levelMatch && (!searchTerm || haystack.includes(searchTerm));
    });

    const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
    if (currentPage > totalPages) currentPage = totalPages;
    const start = (currentPage - 1) * PAGE_SIZE;
    const pageStories = matches.slice(start, start + PAGE_SIZE);

    if (!pageStories.length) {
      grid.innerHTML = '<p class="reading-empty">No se encontraron lecturas con estos filtros.</p>';
    } else {
      pageStories.forEach(([id, story]) => {
        const card = document.createElement("article");
        card.className = "reading-card";
        card.innerHTML = `
          <div class="reading-card-top"><span class="story-level">${story.level}</span><span class="story-time">${story.time} de lectura</span></div>
          <p class="eyebrow" style="margin-bottom:8px">${story.theme}</p>
          <h2>${story.title}</h2>
          <p>${story.description}</p>
          <div class="reading-card-footer"><button class="primary-button" type="button" data-open-story="${id}">Leer y practicar</button><span class="read-status">${isStoryRead(id) ? "✓ Leída" : ""}</span></div>`;
        grid.appendChild(card);
      });
      grid.querySelectorAll("[data-open-story]").forEach((button) => button.addEventListener("click", () => openStory(button.dataset.openStory)));
    }

    const pagination = document.getElementById("reading-pagination");
    if (!pagination) return;
    if (matches.length <= PAGE_SIZE) {
      pagination.hidden = true;
      pagination.innerHTML = "";
    } else {
      pagination.hidden = false;
      pagination.innerHTML = `<button class="secondary-button" id="reading-prev" type="button" ${currentPage === 1 ? "disabled" : ""}>← Página anterior</button><span class="reading-pagination-status">Página ${currentPage} de ${totalPages} · ${matches.length} lecturas</span><button class="secondary-button" id="reading-next" type="button" ${currentPage === totalPages ? "disabled" : ""}>Página siguiente →</button>`;
      document.getElementById("reading-prev")?.addEventListener("click", () => { if (currentPage > 1) { currentPage--; renderReadingCards(); document.querySelector(".reading-toolbar")?.scrollIntoView({ behavior: "smooth", block: "start" }); } });
      document.getElementById("reading-next")?.addEventListener("click", () => { if (currentPage < totalPages) { currentPage++; renderReadingCards(); document.querySelector(".reading-toolbar")?.scrollIntoView({ behavior: "smooth", block: "start" }); } });
    }
  };

  injectReadingExpansionStyles();
  setupReadingToolbar();
  renderReadingCards();
})();
