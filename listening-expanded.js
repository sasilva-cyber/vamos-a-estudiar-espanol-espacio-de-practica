/* Escucha ampliada — 18 áudios (3 por nível), filtros, paginação, quiz e ditado. */
(function () {
  const Q = (q, options, correct, explanation) => ({ q, options, correct, explanation });

  const items = [
    {
      id:'a1-rutina',level:'A1',order:1,title:'La rutina de Pablo',focus:'Rutina, familia y horarios',description:'Informaciones explícitas sobre un día cotidiano.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/d7a8c955-2828-4555-a2e2-9ae2cbd9d073.mp3',
      transcript:'Hola, soy Pablo. Vivo con mis padres y mi hermana en un piso pequeño. Cada mañana desayuno leche, fruta y pan. A las ocho salgo de casa y voy a la universidad en metro. Mis clases terminan a la una. Por la tarde estudio en la biblioteca y, cuando vuelvo a casa, preparo la cena con mi hermana.',
      dictation:'Cada mañana desayuno leche, fruta y pan.',
      questions:[
        Q('¿Con quién vive Pablo?',['Con sus padres y su hermana','Con dos amigos','Solo','Con sus abuelos'],0,'Pablo dice que vive con sus padres y su hermana.'),
        Q('¿Cómo va a la universidad?',['En metro','En autobús','A pie','En bicicleta'],0,'Dice que va a la universidad en metro.'),
        Q('¿A qué hora terminan sus clases?',['A la una','A las ocho','A las cinco','A las doce'],0,'Sus clases terminan a la una.'),
        Q('¿Qué hace por la tarde?',['Estudia en la biblioteca','Trabaja en una cafetería','Va al mercado','Hace deporte'],0,'Por la tarde estudia en la biblioteca.')
      ]
    },
    {
      id:'a1-cafeteria',level:'A1',order:2,title:'En la cafetería',focus:'Comida, bebida, precios y pedidos',description:'Escucha un pedido sencillo y localiza datos concretos.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/8c81ae16-64f2-4705-b3ec-d45ecd3546b4.mp3',
      transcript:'Buenos días. Quiero un café con leche y una tostada con tomate, por favor. La camarera pregunta si prefiero el café grande o pequeño. Elijo uno pequeño y también pido un vaso de agua. Todo cuesta cinco euros con veinte. Pago con tarjeta y me siento cerca de la ventana.',
      dictation:'Quiero un café con leche y una tostada con tomate.',
      questions:[
        Q('¿Qué pide para comer?',['Una tostada con tomate','Un bocadillo','Una ensalada','Un pastel'],0,'Pide una tostada con tomate.'),
        Q('¿Cómo quiere el café?',['Pequeño','Grande','Frío','Sin leche'],0,'Elige un café pequeño.'),
        Q('¿Cuánto cuesta todo?',['Cinco euros con veinte','Cuatro euros','Seis euros con cincuenta','Tres euros'],0,'El total es cinco euros con veinte.'),
        Q('¿Cómo paga?',['Con tarjeta','En efectivo','Con una aplicación','No paga'],0,'Dice que paga con tarjeta.')
      ]
    },
    {
      id:'a1-barrio',level:'A1',order:3,title:'Mi barrio',focus:'Casa, lugares y ubicación',description:'Práctica de lugares cercanos y descripción básica.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/ce138fb3-891e-432c-835a-97bf1266b804.mp3',
      transcript:'Vivo en una casa pequeña en un barrio tranquilo. Mi habitación está al lado del baño y enfrente de la cocina. Cerca de casa hay una farmacia, un supermercado y un parque. Los sábados camino hasta la panadería con mi perro. Me gusta mi barrio porque todo está cerca y las calles son silenciosas.',
      dictation:'Cerca de casa hay una farmacia, un supermercado y un parque.',
      questions:[
        Q('¿Cómo es el barrio?',['Tranquilo','Muy ruidoso','Industrial','Turístico'],0,'La persona dice que vive en un barrio tranquilo.'),
        Q('¿Dónde está la habitación?',['Al lado del baño','Dentro de la cocina','Junto al parque','Encima del supermercado'],0,'La habitación está al lado del baño.'),
        Q('¿Qué lugar NO se menciona cerca de casa?',['Un hospital','Una farmacia','Un supermercado','Un parque'],0,'Se mencionan farmacia, supermercado y parque, no hospital.'),
        Q('¿Con quién va a la panadería?',['Con su perro','Con su hermana','Con un amigo','Solo'],0,'Los sábados camina a la panadería con su perro.')
      ]
    },
    {
      id:'a2-visita',level:'A2',order:1,title:'Una visita el sábado',focus:'Planes, compras y secuencia',description:'Comprende planes futuros y detalles cotidianos.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/538a1ff1-8c49-4b37-aa76-f13cc69c52d1.mp3',
      transcript:'Este sábado Marta quiere visitar a su abuela, que vive en otra ciudad. Ha comprado un billete de autobús para las nueve y media de la mañana. Antes de salir, necesita pasar por la panadería porque su abuela le pidió pan y unas galletas. Si llega temprano, comerán juntas y después pasearán por el centro.',
      dictation:'Ha comprado un billete de autobús para las nueve y media.',
      questions:[
        Q('¿A quién quiere visitar Marta?',['A su abuela','A una amiga','A su profesora','A su hermana'],0,'Marta quiere visitar a su abuela.'),
        Q('¿A qué hora sale el autobús?',['A las nueve y media','A las ocho','A las diez y media','A las once'],0,'El billete es para las nueve y media.'),
        Q('¿Dónde debe pasar antes de salir?',['Por la panadería','Por la farmacia','Por el banco','Por el mercado'],0,'Necesita pasar por la panadería.'),
        Q('¿Qué harán después de comer?',['Pasearán por el centro','Irán al cine','Volverán en tren','Harán compras'],0,'Después pasearán por el centro.')
      ]
    },
    {
      id:'a2-domingo',level:'A2',order:2,title:'Un domingo fuera de casa',focus:'Planes alternativos y clima',description:'Escucha opciones y reconoce condiciones sencillas.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/63b31b8c-b6d9-4fe0-b2ab-5ce6c7c29394.mp3',
      transcript:'El domingo Ana y Sergio quieren pasar el día fuera de casa. Por la mañana irán a un mercadillo y después comerán en un restaurante cerca del río. Si hace buen tiempo, alquilarán bicicletas por la tarde. Si llueve, visitarán un museo. Por la noche volverán en tren porque ninguno de los dos quiere conducir.',
      dictation:'Si llueve, visitarán un museo.',
      questions:[
        Q('¿Adónde irán por la mañana?',['A un mercadillo','A una biblioteca','A la estación','A un concierto'],0,'Primero irán a un mercadillo.'),
        Q('¿Dónde comerán?',['En un restaurante cerca del río','En casa','En el museo','En la estación'],0,'Comerán en un restaurante cerca del río.'),
        Q('¿Qué harán si hace buen tiempo?',['Alquilarán bicicletas','Irán al cine','Volverán a casa','Tomarán un taxi'],0,'Si hace buen tiempo, alquilarán bicicletas.'),
        Q('¿Cómo volverán por la noche?',['En tren','En coche','En bicicleta','En autobús'],0,'Volverán en tren.')
      ]
    },
    {
      id:'a2-estacion',level:'A2',order:3,title:'En la estación',focus:'Horarios, retrasos y viaje',description:'Localiza números, tiempos y acciones en una estación.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/cbce67fd-efa3-4dad-a0f6-6610f1f6750e.mp3',
      transcript:'Raúl llega a la estación cuarenta minutos antes de la salida de su tren. Mira el panel y descubre que el tren a Sevilla tiene diez minutos de retraso. Compra una botella de agua y espera junto al andén cuatro. Cuando anuncian el embarque, guarda el billete en el teléfono y busca el vagón número seis.',
      dictation:'El tren a Sevilla tiene diez minutos de retraso.',
      questions:[
        Q('¿Cuánto antes llega Raúl?',['Cuarenta minutos','Diez minutos','Una hora','Veinte minutos'],0,'Llega cuarenta minutos antes.'),
        Q('¿Qué problema tiene el tren?',['Tiene diez minutos de retraso','Está cancelado','Sale antes','Cambia de ciudad'],0,'El panel indica diez minutos de retraso.'),
        Q('¿Junto a qué andén espera?',['Al cuatro','Al seis','Al diez','Al uno'],0,'Espera junto al andén cuatro.'),
        Q('¿Qué vagón busca?',['El seis','El cuatro','El diez','El ocho'],0,'Busca el vagón número seis.')
      ]
    },
    {
      id:'b1-trabajo',level:'B1',order:1,title:'El nuevo trabajo de Diego',focus:'Adaptación y contexto profesional',description:'Comprende una experiencia laboral y su evolución.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/a3e07f8d-c436-4083-a508-842b61e8e3a7.mp3',
      transcript:'Cuando Diego empezó su nuevo trabajo, pensó que tardaría semanas en adaptarse. Sin embargo, sus compañeros lo ayudaron desde el primer día. La empresa trabaja con clientes de varios países y por eso las reuniones suelen ser en español e inglés. Diego todavía se pone nervioso al hablar, pero cada semana participa más y toma notas de las expresiones que no conoce.',
      dictation:'Sus compañeros lo ayudaron desde el primer día.',
      questions:[
        Q('¿Qué pensó Diego al empezar?',['Que tardaría semanas en adaptarse','Que dejaría el trabajo','Que trabajaría solo','Que no tendría reuniones'],0,'Creía que necesitaría semanas para adaptarse.'),
        Q('¿Qué hicieron sus compañeros?',['Lo ayudaron','Le cambiaron de empresa','Le dieron vacaciones','Lo ignoraron'],0,'Lo ayudaron desde el primer día.'),
        Q('¿Por qué usan español e inglés?',['Porque tienen clientes de varios países','Porque Diego es profesor','Porque viven en Londres','Porque no usan internet'],0,'La empresa trabaja con clientes internacionales.'),
        Q('¿Qué hace con las expresiones desconocidas?',['Toma notas','Las evita','Las traduce en voz alta','Las borra'],0,'Toma notas de las expresiones que no conoce.')
      ]
    },
    {
      id:'b1-curso',level:'B1',order:2,title:'Un curso intensivo',focus:'Aprendizaje y progreso personal',description:'Identifica propósito, dificultad y estrategia de aprendizaje.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/76dc40b7-0d22-4b14-b681-361981b7fda2.mp3',
      transcript:'Marina se apuntó a un curso intensivo de español porque quiere solicitar una beca en Madrid. Las clases son tres veces por semana y combinan conversación, gramática y comprensión auditiva. Al principio le costaba entender a los profesores cuando hablaban rápido, pero ahora escucha podcasts cada mañana y nota que reconoce más expresiones.',
      dictation:'Ahora escucha podcasts cada mañana.',
      questions:[
        Q('¿Por qué estudia español Marina?',['Quiere solicitar una beca en Madrid','Quiere cambiar de trabajo','Va a abrir una tienda','Quiere ser profesora'],0,'Su objetivo es solicitar una beca en Madrid.'),
        Q('¿Cuántas veces por semana tiene clase?',['Tres','Dos','Cinco','Una'],0,'Las clases son tres veces por semana.'),
        Q('¿Qué le resultaba difícil al principio?',['Entender cuando hablaban rápido','Escribir su nombre','Leer números','Llegar a clase'],0,'Le costaba entender a los profesores cuando hablaban rápido.'),
        Q('¿Qué estrategia usa ahora?',['Escucha podcasts cada mañana','Ve películas sin sonido','Memoriza diccionarios','Evita escuchar español'],0,'Ahora escucha podcasts cada mañana.')
      ]
    },
    {
      id:'b1-vivienda',level:'B1',order:3,title:'Un problema en el piso',focus:'Problemas, reclamaciones y consecuencia',description:'Escucha una situación doméstica y sigue la evolución del problema.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/7ff5dff2-2e1e-4a23-883b-e2876c2f0db4.mp3',
      transcript:'Hace dos semanas, Tomás encontró una humedad en la pared de su dormitorio. Avisó al propietario del piso, pero nadie fue a revisarla. Ayer la mancha era más grande y empezó a caer pintura. Tomás volvió a llamar y explicó que temía que el problema empeorara. El propietario prometió enviar a un técnico el viernes por la mañana.',
      dictation:'El propietario prometió enviar a un técnico el viernes por la mañana.',
      questions:[
        Q('¿Qué encontró Tomás?',['Una humedad en la pared','Una ventana rota','Un problema eléctrico','Una puerta abierta'],0,'Encontró una humedad en la pared del dormitorio.'),
        Q('¿Qué ocurrió después?',['La mancha creció y cayó pintura','El problema desapareció','Cambió de piso inmediatamente','Llegó un técnico ese día'],0,'La mancha aumentó y empezó a caer pintura.'),
        Q('¿Por qué volvió a llamar?',['Temía que empeorara','Quería pagar el alquiler','Había perdido las llaves','Necesitaba un mueble'],0,'Le preocupaba que el problema empeorase.'),
        Q('¿Cuándo irá el técnico?',['El viernes por la mañana','El lunes por la noche','Ese mismo día','El domingo'],0,'El propietario prometió enviarlo el viernes por la mañana.')
      ]
    },
    {
      id:'b2-movilidad',level:'B2',order:1,title:'Movilidad urbana',focus:'Argumentos, contraste y soluciones',description:'Texto informativo con posiciones contrapuestas.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/6f172b41-0977-4186-ad55-b70efba7ad71.mp3',
      transcript:'En los últimos años, muchas ciudades han creado más carriles bici para reducir el tráfico y la contaminación. La medida suele recibir apoyo, aunque también genera críticas entre quienes consideran que se han eliminado demasiadas plazas de aparcamiento. Los expertos señalan que el cambio funciona mejor cuando se acompaña de transporte público frecuente y calles seguras para peatones.',
      dictation:'La medida suele recibir apoyo, aunque también genera críticas.',
      questions:[
        Q('¿Qué objetivo tienen los carriles bici?',['Reducir tráfico y contaminación','Crear más aparcamientos','Eliminar aceras','Aumentar precios'],0,'Se relacionan con la reducción del tráfico y la contaminación.'),
        Q('¿Qué crítica se menciona?',['La pérdida de plazas de aparcamiento','La falta de aeropuertos','El precio de las bicicletas','La ausencia de carreteras'],0,'Algunas personas critican que se eliminan plazas de aparcamiento.'),
        Q('¿Qué función tiene «aunque»?',['Introduce contraste','Expresa causa','Marca condición','Enumera'],0,'Aunque contrapone apoyo y críticas.'),
        Q('¿Qué recomiendan los expertos?',['Combinar la medida con buen transporte y calles seguras','Prohibir caminar','Eliminar autobuses','Usar solo coches'],0,'Destacan transporte público frecuente y seguridad peatonal.')
      ]
    },
    {
      id:'b2-semana',level:'B2',order:2,title:'La semana laboral de cuatro días',focus:'Opiniones, ventajas y límites',description:'Escucha argumentos a favor y reservas sobre una propuesta laboral.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/3f6b9c8b-712c-4c63-ae07-fcd5b61ede56.mp3',
      transcript:'En una encuesta reciente, varios trabajadores afirmaron que preferirían una semana laboral de cuatro días si pudieran mantener el mismo salario. Quienes apoyan la medida creen que reducir una jornada podría mejorar el descanso y la productividad. Sin embargo, algunas empresas temen que sea difícil mantener el ritmo de trabajo en sectores con atención continua al público. Los especialistas señalan que el resultado depende de cómo se reorganizan las tareas y de si se reducen reuniones innecesarias.',
      dictation:'El resultado depende de cómo se reorganizan las tareas.',
      questions:[
        Q('¿Qué condición aparece en la preferencia de los trabajadores?',['Mantener el mismo salario','Trabajar desde casa','Tener más reuniones','Cambiar de empresa'],0,'La preferencia se plantea si conservan el mismo salario.'),
        Q('¿Qué posible ventaja se menciona?',['Mejor descanso y productividad','Más desplazamientos','Más reuniones','Menos vacaciones'],0,'Los defensores citan descanso y productividad.'),
        Q('¿Qué preocupa a algunas empresas?',['Mantener el ritmo en servicios continuos','La falta de ordenadores','El exceso de vacaciones de verano','La reducción del transporte'],0,'Temen dificultades en sectores con atención continua.'),
        Q('¿De qué depende el resultado según especialistas?',['De reorganizar tareas y reducir reuniones innecesarias','Solo de trabajar más horas','De bajar salarios','De cerrar oficinas'],0,'El audio vincula el éxito con reorganización y reducción de reuniones.')
      ]
    },
    {
      id:'b2-museos',level:'B2',order:3,title:'Tecnología en los museos',focus:'Beneficios, riesgos y equilibrio',description:'Comprende una valoración equilibrada sobre recursos digitales.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/881ab4d2-bbd5-4422-9e65-e949bef3f59f.mp3',
      transcript:'Cada vez más museos incorporan recursos digitales para enriquecer la visita. Algunas instituciones ofrecen aplicaciones con mapas interactivos, explicaciones en varios idiomas y reconstrucciones virtuales de obras dañadas o incompletas. Estas herramientas pueden facilitar el acceso a la información, pero también existe el riesgo de que el visitante preste más atención a la pantalla que a las piezas expuestas. Por eso, muchos especialistas recomiendan utilizar la tecnología como apoyo y no como sustituto de la observación directa.',
      dictation:'La tecnología debe funcionar como apoyo y no como sustituto.',
      questions:[
        Q('¿Para qué incorporan recursos digitales algunos museos?',['Para enriquecer la visita','Para eliminar las obras','Para sustituir a todos los guías','Para cerrar salas'],0,'El objetivo mencionado es enriquecer la visita.'),
        Q('¿Qué recurso se menciona?',['Mapas interactivos','Juegos deportivos','Billetes de avión','Cursos de cocina'],0,'Se mencionan aplicaciones con mapas interactivos.'),
        Q('¿Qué riesgo existe?',['Mirar más la pantalla que las obras','Perder el transporte público','Leer demasiados libros','Comprar más entradas'],0,'Puede desplazarse la atención hacia la pantalla.'),
        Q('¿Qué recomiendan los especialistas?',['Usar la tecnología como apoyo','Eliminar toda tecnología','Observar solo pantallas','Evitar explicaciones'],0,'La recomiendan como apoyo, no sustitución.')
      ]
    },
    {
      id:'c1-teletrabajo',level:'C1',order:1,title:'Teletrabajo y modelos híbridos',focus:'Matices, ventajas y límites',description:'Discurso argumentativo breve con puntos de vista relacionados.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/c527836e-f6f9-43c7-b9a5-d09a2cf8633d.mp3',
      transcript:'El teletrabajo ha transformado la manera en que muchas personas organizan su vida cotidiana. Para algunos, trabajar desde casa facilita la concentración y reduce el tiempo perdido en desplazamientos. Para otros, la ausencia de contacto presencial puede generar aislamiento. Por eso, algunas empresas están adoptando modelos híbridos que intentan combinar autonomía, colaboración y bienestar.',
      dictation:'La ausencia de contacto presencial puede generar aislamiento.',
      questions:[
        Q('¿Qué cambio general se atribuye al teletrabajo?',['Ha transformado la organización cotidiana','Ha eliminado todo trabajo presencial','Ha reducido el uso de tecnología','Ha acabado con los desplazamientos'],0,'Se afirma que ha transformado la organización de la vida cotidiana.'),
        Q('¿Qué ventaja se menciona?',['Más concentración y menos desplazamientos','Más reuniones presenciales','Menos autonomía','Mayor aislamiento'],0,'Se citan concentración y reducción de desplazamientos.'),
        Q('¿Qué riesgo aparece?',['El aislamiento','La falta de ordenadores en todas las empresas','El turismo','La inflación'],0,'La falta de contacto presencial puede generar aislamiento.'),
        Q('¿Qué busca el modelo híbrido?',['Equilibrar autonomía, colaboración y bienestar','Eliminar oficinas','Aumentar desplazamientos','Reducir el descanso'],0,'El cierre menciona esos tres elementos.')
      ]
    },
    {
      id:'c1-clima',level:'C1',order:2,title:'Ciudades frente al calor',focus:'Planificación, clima y desigualdad',description:'Interpreta relaciones entre medidas técnicas y equidad urbana.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/87ea5035-f608-4e2f-8a3a-ff27c0f82f88.mp3',
      transcript:'Las ciudades que quieren adaptarse a veranos más calurosos están revisando el diseño de sus calles. Plantar árboles, recuperar superficies permeables y crear zonas de sombra puede reducir la temperatura en determinados espacios públicos. No obstante, estas intervenciones no producen los mismos efectos en todos los barrios. Si las inversiones se concentran solo en las zonas más céntricas, las desigualdades ambientales pueden aumentar. Por eso, la planificación climática exige combinar criterios técnicos con decisiones sobre equidad territorial.',
      dictation:'La planificación climática exige combinar criterios técnicos con equidad territorial.',
      questions:[
        Q('¿Qué medidas se mencionan para reducir el calor?',['Árboles, superficies permeables y sombra','Más aparcamientos y asfalto','Menos transporte público','Edificios sin ventanas'],0,'El audio enumera árboles, superficies permeables y zonas de sombra.'),
        Q('¿Qué matiz introduce «No obstante»?',['Las medidas no benefician igual a todos los barrios','Las medidas siempre fracasan','El calor ha desaparecido','No existen desigualdades'],0,'Introduce una limitación a los beneficios generales.'),
        Q('¿Qué puede ocurrir si la inversión se concentra en el centro?',['Aumentar las desigualdades ambientales','Eliminar el calor en toda la ciudad','Reducir los precios de vivienda','Cerrar parques'],0,'La concentración territorial puede aumentar desigualdades.'),
        Q('¿Qué conclusión propone el audio?',['Combinar técnica y equidad territorial','Invertir solo en el centro','Eliminar árboles','Evitar planificación'],0,'La planificación debe integrar criterios técnicos y de equidad.')
      ]
    },
    {
      id:'c1-autoria',level:'C1',order:3,title:'IA y autoría',focus:'Originalidad, responsabilidad y creación',description:'Comprende una reflexión sobre tecnología y criterio humano.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/55b1bb5c-fdec-4d0e-9d43-a8ebc44b9b34.mp3',
      transcript:'La inteligencia artificial generativa ha reabierto una discusión antigua sobre la autoría. Cuando una herramienta participa en la producción de un texto, una imagen o una melodía, no basta con preguntar quién pulsó el botón. También importa quién definió la intención, seleccionó los materiales, evaluó los resultados y asumió la responsabilidad final. La tecnología puede ampliar posibilidades creativas, pero también obliga a precisar qué entendemos por originalidad, colaboración y criterio humano.',
      dictation:'También importa quién asumió la responsabilidad final.',
      questions:[
        Q('¿Qué debate ha reabierto la IA generativa?',['El de la autoría','El del transporte público','El del turismo rural','El de la alimentación'],0,'El audio presenta explícitamente una discusión sobre autoría.'),
        Q('¿Por qué no basta preguntar quién pulsó el botón?',['Porque intervienen intención, selección, evaluación y responsabilidad','Porque la tecnología no produce nada','Porque todas las obras son anónimas','Porque solo importa la velocidad'],0,'Se amplían los criterios relevantes más allá de una acción técnica.'),
        Q('¿Qué puede hacer la tecnología según el audio?',['Ampliar posibilidades creativas','Eliminar toda creatividad','Resolver definitivamente la autoría','Sustituir el criterio'],0,'Se afirma que puede ampliar posibilidades creativas.'),
        Q('¿Qué obliga a precisar?',['Originalidad, colaboración y criterio humano','Precios y salarios','Horarios y vacaciones','Transporte y vivienda'],0,'Esos conceptos aparecen en la conclusión.')
      ]
    },
    {
      id:'c2-informacion',level:'C2',order:1,title:'Velocidad, información y conocimiento',focus:'Abstracción, tesis e interpretación crítica',description:'Ideas abstractas y relaciones implícitas en un discurso académico.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/81f76158-53ff-4de7-afc8-ce9bd86630da.mp3',
      transcript:'La rapidez con la que circula la información ha modificado no solo nuestros hábitos de lectura, sino también nuestras expectativas sobre el conocimiento. Tener acceso inmediato a miles de fuentes no garantiza comprenderlas ni evaluarlas con criterio. De ahí que la alfabetización contemporánea exija comparar perspectivas, reconocer incertidumbres y resistir la tentación de confundir velocidad con profundidad.',
      dictation:'Tener acceso inmediato a miles de fuentes no garantiza comprenderlas.',
      questions:[
        Q('¿Qué no garantiza el acceso a muchas fuentes?',['Comprensión ni evaluación crítica','Acceso técnico','Mayor velocidad','Diversidad de formatos'],0,'El audio niega que el acceso garantice comprender y evaluar con criterio.'),
        Q('¿Qué ha cambiado además de los hábitos de lectura?',['Las expectativas sobre el conocimiento','La gramática de las lenguas','La duración de todos los libros','La arquitectura de bibliotecas'],0,'También cambian las expectativas sobre el conocimiento.'),
        Q('¿Qué introduce «De ahí que»?',['Una consecuencia','Una cita','Una enumeración casual','Una oposición absoluta'],0,'Introduce una conclusión derivada de lo anterior.'),
        Q('¿Cuál es la advertencia final?',['No confundir velocidad con profundidad','No usar fuentes digitales','No leer textos breves','No comparar perspectivas'],0,'El cierre contrapone velocidad y profundidad.')
      ]
    },
    {
      id:'c2-memoria',level:'C2',order:2,title:'Memoria colectiva y símbolos',focus:'Memoria, interpretación y conflicto social',description:'Escucha una reflexión conceptual con cambios de perspectiva temporal.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/8e4e10f6-1a89-4318-8346-fa0785def9fe.mp3',
      transcript:'La memoria colectiva no funciona como un archivo neutral en el que cada acontecimiento ocupa un lugar fijo. Las sociedades recuerdan, olvidan y reinterpretan el pasado desde las necesidades del presente. Un monumento, por ejemplo, puede haber sido concebido como símbolo de orgullo y, décadas después, convertirse en objeto de controversia. Esa transformación no borra automáticamente su historia; revela que el significado público de los símbolos depende de disputas, contextos y nuevas sensibilidades.',
      dictation:'Las sociedades recuerdan, olvidan y reinterpretan el pasado.',
      questions:[
        Q('¿Cómo caracteriza el audio la memoria colectiva?',['Como un proceso de reinterpretación, no un archivo neutral','Como un archivo fijo e inmutable','Como una lista de fechas','Como una memoria individual'],0,'La primera frase rechaza la idea de archivo neutral.'),
        Q('¿Desde dónde se reinterpreta el pasado?',['Desde necesidades del presente','Solo desde documentos antiguos','Desde un único punto de vista','Sin influencia social'],0,'El presente condiciona el recuerdo y la reinterpretación.'),
        Q('¿Qué ejemplo ilustra el cambio de significado?',['Un monumento que pasa del orgullo a la controversia','Un libro que cambia de idioma','Una calle que se alarga','Un museo que abre'],0,'Se usa el ejemplo de un monumento.'),
        Q('¿De qué depende el significado público de los símbolos?',['De disputas, contextos y sensibilidades','Solo de su material','Solo de la intención original','De su precio'],0,'La conclusión enumera esos factores.')
      ]
    },
    {
      id:'c2-incertidumbre',level:'C2',order:3,title:'Ciencia e incertidumbre',focus:'Evidencia, cautela y precisión',description:'Interpreta una argumentación sobre límites del conocimiento y retórica.',
      audio:'https://storage.googleapis.com/adm--audio-playback--7d--public/mcp-preview/f5ef2772-5cbf-4aa7-9519-0e4e5f6ba656.mp3',
      transcript:'En contextos de incertidumbre, exigir respuestas absolutamente seguras puede resultar paradójicamente menos riguroso que aceptar los límites del conocimiento disponible. La investigación científica avanza precisamente porque distingue entre evidencia sólida, hipótesis plausibles y cuestiones todavía abiertas. Comunicar esa incertidumbre no equivale a debilidad argumentativa; al contrario, puede ser una forma de precisión. El problema aparece cuando la cautela se interpreta como ignorancia o cuando la seguridad retórica sustituye a la calidad de las pruebas.',
      dictation:'Comunicar la incertidumbre puede ser una forma de precisión.',
      questions:[
        Q('¿Qué paradoja plantea el inicio?',['Exigir certeza absoluta puede ser menos riguroso','La ciencia nunca duda','Toda hipótesis es verdadera','La incertidumbre elimina la evidencia'],0,'Se contrapone certeza absoluta con aceptación rigurosa de límites.'),
        Q('¿Qué distingue la investigación científica?',['Evidencia sólida, hipótesis plausibles y cuestiones abiertas','Solo hechos totalmente seguros','Opiniones personales y rumores','Certeza y error sin matices'],0,'El audio presenta esos tres grados.'),
        Q('¿Cómo se interpreta aquí comunicar incertidumbre?',['Como una posible forma de precisión','Como falta de conocimiento','Como fracaso metodológico','Como retórica vacía'],0,'Se afirma que puede ser una forma de precisión.'),
        Q('¿Cuándo aparece el problema final?',['Cuando la seguridad retórica sustituye a la calidad de las pruebas','Cuando se reconocen límites','Cuando se distinguen hipótesis','Cuando se comunica cautela'],0,'El cierre critica sustituir evidencia por seguridad retórica.')
      ]
    }
  ];

  const PAGE_SIZE = 6;
  let level = 'all';
  let query = '';
  let page = 1;
  let current = null;

  const completed = id => { try { return localStorage.getItem(`vae-listening-expanded-${id}`)==='yes'; } catch { return false; } };
  const markCompleted = id => { try { localStorage.setItem(`vae-listening-expanded-${id}`,'yes'); } catch {} };

  function injectStyles(){
    if(document.getElementById('listening-expanded-styles')) return;
    const s=document.createElement('style');s.id='listening-expanded-styles';s.textContent=`
      .listening-expanded-screen,.listening-expanded-reader{width:100%}.listening-expanded-hero{max-width:860px;margin-bottom:24px}.listening-expanded-hero h1{margin-bottom:16px}.listening-expanded-summary{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.listening-expanded-summary span{border-radius:999px;background:#fff4ef;color:var(--red-dark);padding:7px 11px;font-size:.78rem;font-weight:900}.listening-expanded-toolbar{display:grid;grid-template-columns:minmax(0,1fr) minmax(190px,260px);gap:12px;align-items:end;border:1px solid var(--line);border-radius:18px;background:rgba(255,255,255,.78);padding:16px;margin-bottom:10px}.listening-expanded-field{display:grid;gap:6px}.listening-expanded-field span{font-size:.7rem;font-weight:900;letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}.listening-expanded-field input,.listening-expanded-field select{width:100%;min-height:46px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--ink);padding:10px 13px;font:inherit}.listening-expanded-meta{display:flex;justify-content:space-between;gap:12px;color:var(--muted);font-size:.82rem;font-weight:800;margin:10px 2px 20px}.listening-expanded-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.listening-expanded-card{min-height:280px;border:1px solid var(--line);border-radius:22px;background:rgba(255,255,255,.95);padding:22px;display:flex;flex-direction:column;box-shadow:0 10px 30px rgba(70,40,20,.055)}.listening-expanded-card-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:16px}.listening-expanded-level{border-radius:999px;background:var(--gold-soft);color:#6b4a0d;padding:6px 10px;font-size:.75rem;font-weight:900}.listening-expanded-number{font-size:.75rem;color:var(--muted);font-weight:900}.listening-expanded-card h2{font-size:1.45rem;margin-bottom:10px}.listening-expanded-card p{color:var(--muted);line-height:1.58;margin:0 0 12px}.listening-expanded-focus{font-size:.8rem!important;color:var(--red)!important;font-weight:800}.listening-expanded-card-footer{margin-top:auto;display:flex;align-items:center;justify-content:space-between;gap:10px}.listening-expanded-status{color:var(--success);font-size:.75rem;font-weight:900}.listening-expanded-pagination{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px;margin:28px 0 6px}.listening-expanded-page{min-width:170px;text-align:center!important;color:var(--muted);font-size:.84rem;font-weight:800}.listening-expanded-empty{grid-column:1/-1;text-align:center!important;color:var(--muted);padding:28px}.listening-expanded-reader{max-width:980px;margin:0 auto}.listening-expanded-back{margin-bottom:14px}.listening-expanded-reader-head{margin-bottom:20px}.listening-expanded-reader-meta{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.listening-expanded-reader-meta span{border-radius:999px;background:#fff4ef;color:var(--red-dark);padding:6px 10px;font-size:.76rem;font-weight:850}.listening-expanded-player,.listening-expanded-practice{border:1px solid var(--line);border-radius:22px;background:rgba(255,255,255,.96);padding:22px;box-shadow:0 10px 30px rgba(70,40,20,.05);margin-bottom:20px}.listening-expanded-player audio{width:100%;margin:12px 0}.listening-expanded-controls{display:flex;flex-wrap:wrap;gap:8px}.listening-expanded-controls button{margin:0}.listening-expanded-transcript{margin-top:14px;padding:14px;border-left:4px solid var(--gold);border-radius:0 12px 12px 0;background:#fff9eb;color:var(--muted);line-height:1.7}.listening-expanded-question{padding:18px 0;border-bottom:1px solid #f0e7da}.listening-expanded-question:last-child{border-bottom:0}.listening-expanded-question h3{margin:0 0 12px;color:var(--ink);font:800 1.04rem/1.45 Georgia,'Times New Roman',serif}.listening-expanded-options{display:grid;gap:8px}.listening-expanded-option{display:flex;gap:9px;align-items:flex-start;border:1px solid var(--line);border-radius:12px;background:#fffdfa;padding:11px 12px;color:var(--muted);cursor:pointer}.listening-expanded-option input{margin-top:3px;accent-color:var(--red)}.listening-expanded-result{margin-top:16px;border-radius:15px;padding:15px;background:#fff8e7;color:var(--ink)}.listening-expanded-result.good{background:var(--success-bg);color:var(--success)}.listening-expanded-result.needs-work{background:var(--error-bg);color:var(--error)}.listening-expanded-review{display:grid;gap:10px;margin-top:14px}.listening-expanded-review-item{border:1px solid var(--line);border-radius:12px;background:#fff;padding:12px;color:var(--muted)}.listening-expanded-review-item strong{color:var(--ink)}.listening-expanded-review-item p{margin:6px 0 0;line-height:1.5}.listening-expanded-dictation{margin-top:20px;border-top:1px solid var(--line);padding-top:20px}.listening-expanded-dictation textarea{width:100%;min-height:100px;border:1px solid var(--line);border-radius:14px;padding:13px;font:inherit;line-height:1.55;margin:10px 0}.listening-expanded-dictation-actions{display:flex;flex-wrap:wrap;gap:8px}.listening-expanded-feedback{margin-top:10px;font-weight:800}.listening-expanded-note{color:var(--muted);font-size:.78rem;line-height:1.5;margin-top:14px}
      @media(max-width:1000px){.listening-expanded-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:700px){.listening-expanded-toolbar{grid-template-columns:1fr}.listening-expanded-grid{grid-template-columns:1fr}.listening-expanded-card-footer{align-items:stretch;flex-direction:column}.listening-expanded-card-footer button{width:100%}.listening-expanded-meta{flex-direction:column}.listening-expanded-pagination{display:grid;grid-template-columns:1fr 1fr}.listening-expanded-page{grid-column:1/-1;grid-row:1;min-width:0}.listening-expanded-pagination button{width:100%}.listening-expanded-controls button,.listening-expanded-dictation-actions button{flex:1 1 150px}}
      @media(max-width:480px){.listening-expanded-player,.listening-expanded-practice,.listening-expanded-card{padding:17px}.listening-expanded-reader-meta{gap:6px}.listening-expanded-controls button,.listening-expanded-dictation-actions button{width:100%;flex-basis:100%}input,select,textarea{font-size:16px}}
    `;document.head.appendChild(s);
  }

  function injectScreens(){
    const app=document.getElementById('app');if(!app||document.getElementById('listening-expanded-screen'))return;
    const lib=document.createElement('section');lib.id='listening-expanded-screen';lib.className='listening-expanded-screen hidden';lib.innerHTML=`
      <div class="listening-expanded-hero"><p class="eyebrow">Escucha en español</p><h1>Entrena tu comprensión auditiva</h1><p class="hero-text">Practica con 18 audios graduados: tres actividades para cada nivel, desde A1 hasta C2. Escucha primero sin transcripción, responde el quiz, revisa el gabarito y termina con un dictado.</p><div class="listening-expanded-summary"><span>18 audios</span><span>3 por nivel</span><span>72 preguntas</span><span>6 dictados</span></div></div>
      <div class="listening-expanded-toolbar"><label class="listening-expanded-field"><span>Buscar actividad</span><input id="listening-expanded-search" type="search" placeholder="Ej.: trabajo, ciudad, viaje, tecnología…" /></label><label class="listening-expanded-field"><span>Nivel</span><select id="listening-expanded-level"><option value="all">Todos los niveles</option><option>A1</option><option>A2</option><option>B1</option><option>B2</option><option>C1</option><option>C2</option></select></label></div>
      <div class="listening-expanded-meta"><span id="listening-expanded-count"></span><span>6 actividades por página</span></div><div class="listening-expanded-grid" id="listening-expanded-grid"></div><nav class="listening-expanded-pagination" id="listening-expanded-pagination" aria-label="Paginación de Escucha"></nav>`;
    const reader=document.createElement('section');reader.id='listening-expanded-reader';reader.className='listening-expanded-reader hidden';reader.innerHTML=`
      <button class="text-button listening-expanded-back" id="listening-expanded-back" type="button">← Volver a Escucha</button><div class="listening-expanded-reader-head"><p class="eyebrow">Comprensión auditiva</p><h1 id="listening-expanded-title"></h1><div class="listening-expanded-reader-meta" id="listening-expanded-reader-meta"></div><p class="hero-text" id="listening-expanded-description"></p></div>
      <section class="listening-expanded-player"><h2>1. Escucha</h2><p>Intenta escuchar al menos dos veces antes de abrir la transcripción.</p><audio id="listening-expanded-audio" controls preload="metadata"></audio><div class="listening-expanded-controls"><button class="secondary-button" type="button" data-rate="0.75">0,75×</button><button class="secondary-button" type="button" data-rate="1">1×</button><button class="secondary-button" type="button" data-rate="1.25">1,25×</button><button class="secondary-button" id="listening-expanded-restart" type="button">↻ Repetir</button><button class="secondary-button" id="listening-expanded-transcript-toggle" type="button">Mostrar transcripción</button></div><div class="listening-expanded-transcript hidden" id="listening-expanded-transcript"></div><p class="listening-expanded-note">Audio con voz sintética creado para práctica didáctica.</p></section>
      <section class="listening-expanded-practice"><h2>2. Quiz de audio</h2><form id="listening-expanded-form"></form><button class="primary-button" id="listening-expanded-submit" type="button">Corregir respuestas</button><div class="listening-expanded-result hidden" id="listening-expanded-result"></div><div class="listening-expanded-dictation"><h2>3. Dictado</h2><p>Escucha la frase y escríbela en español. Puedes usar velocidad normal o lenta.</p><div class="listening-expanded-dictation-actions"><button class="secondary-button" id="listening-expanded-dictation-play" type="button">▶ Escuchar frase</button><button class="secondary-button" id="listening-expanded-dictation-slow" type="button">▶ Más lento</button></div><textarea id="listening-expanded-dictation-input" lang="es" spellcheck="true" placeholder="Escribe aquí la frase que escuchas…"></textarea><button class="secondary-button" id="listening-expanded-dictation-check" type="button">Corregir dictado</button><div class="listening-expanded-feedback" id="listening-expanded-dictation-feedback"></div></div></section>`;
    app.appendChild(lib);app.appendChild(reader);
  }

  function hideAll(){document.querySelectorAll('#app > section').forEach(s=>s.classList.add('hidden'));}
  function activate(){document.querySelectorAll('.main-nav .nav-link').forEach(b=>b.classList.toggle('active',b.dataset.route==='listening'));}
  function filtered(){const q=query.trim().toLocaleLowerCase('es');return items.filter(x=>(level==='all'||x.level===level)&&(!q||`${x.title} ${x.focus} ${x.description} ${x.transcript}`.toLocaleLowerCase('es').includes(q)));}

  function renderLibrary(){
    const grid=document.getElementById('listening-expanded-grid');if(!grid)return;const matches=filtered();const pages=Math.max(1,Math.ceil(matches.length/PAGE_SIZE));if(page>pages)page=pages;const start=(page-1)*PAGE_SIZE;const slice=matches.slice(start,start+PAGE_SIZE);
    document.getElementById('listening-expanded-count').textContent=`${matches.length} ${matches.length===1?'audio encontrado':'audios encontrados'}`;
    grid.innerHTML=slice.length?slice.map(x=>`<article class="listening-expanded-card"><div class="listening-expanded-card-top"><span class="listening-expanded-level">${x.level}</span><span class="listening-expanded-number">Audio ${x.order}/3</span></div><h2>${x.title}</h2><p>${x.description}</p><p class="listening-expanded-focus">${x.focus}</p><div class="listening-expanded-card-footer"><button class="secondary-button" type="button" data-open-listening-expanded="${x.id}">Escuchar y practicar</button><span class="listening-expanded-status">${completed(x.id)?'✓ Completado':''}</span></div></article>`).join(''):'<p class="listening-expanded-empty">No hay audios que coincidan con esta búsqueda.</p>';
    grid.querySelectorAll('[data-open-listening-expanded]').forEach(b=>b.addEventListener('click',()=>openItem(b.dataset.openListeningExpanded)));
    const nav=document.getElementById('listening-expanded-pagination');if(matches.length<=PAGE_SIZE){nav.innerHTML='';nav.hidden=true;}else{nav.hidden=false;nav.innerHTML=`<button class="secondary-button" id="listening-expanded-prev" type="button" ${page===1?'disabled':''}>← Página anterior</button><span class="listening-expanded-page">Página ${page} de ${pages} · ${matches.length} audios</span><button class="secondary-button" id="listening-expanded-next" type="button" ${page===pages?'disabled':''}>Página siguiente →</button>`;document.getElementById('listening-expanded-prev')?.addEventListener('click',()=>{if(page>1){page--;renderLibrary();document.getElementById('listening-expanded-screen')?.scrollIntoView({behavior:'smooth',block:'start'});}});document.getElementById('listening-expanded-next')?.addEventListener('click',()=>{if(page<pages){page++;renderLibrary();document.getElementById('listening-expanded-screen')?.scrollIntoView({behavior:'smooth',block:'start'});}});}
  }

  function showLibrary(){hideAll();document.getElementById('listening-expanded-screen')?.classList.remove('hidden');activate();renderLibrary();window.scrollTo({top:0,behavior:'smooth'});}
  function renderQuestions(x){document.getElementById('listening-expanded-form').innerHTML=x.questions.map((q,i)=>`<div class="listening-expanded-question"><h3>${i+1}. ${q.q}</h3><div class="listening-expanded-options">${q.options.map((o,j)=>`<label class="listening-expanded-option"><input type="radio" name="lex-q-${i}" value="${j}"/><span>${o}</span></label>`).join('')}</div></div>`).join('');}
  function openItem(id){const x=items.find(i=>i.id===id);if(!x)return;current=x;hideAll();document.getElementById('listening-expanded-reader')?.classList.remove('hidden');activate();document.getElementById('listening-expanded-title').textContent=x.title;document.getElementById('listening-expanded-reader-meta').innerHTML=`<span>Nivel ${x.level}</span><span>Audio ${x.order}/3</span><span>${x.focus}</span><span>4 preguntas + dictado</span>`;document.getElementById('listening-expanded-description').textContent=x.description;const a=document.getElementById('listening-expanded-audio');a.src=x.audio;a.playbackRate=1;document.getElementById('listening-expanded-transcript').textContent=x.transcript;document.getElementById('listening-expanded-transcript').classList.add('hidden');document.getElementById('listening-expanded-transcript-toggle').textContent='Mostrar transcripción';renderQuestions(x);const r=document.getElementById('listening-expanded-result');r.className='listening-expanded-result hidden';r.innerHTML='';document.getElementById('listening-expanded-dictation-input').value='';document.getElementById('listening-expanded-dictation-feedback').textContent='';window.scrollTo({top:0,behavior:'smooth'});}

  function correctQuiz(){if(!current)return;const answers=current.questions.map((_,i)=>{const n=document.querySelector(`input[name="lex-q-${i}"]:checked`);return n?Number(n.value):null;});const r=document.getElementById('listening-expanded-result');if(answers.some(v=>v===null)){r.className='listening-expanded-result needs-work';r.textContent='Responde las 4 preguntas antes de corregir.';return;}let score=0;const review=current.questions.map((q,i)=>{const ok=answers[i]===q.correct;if(ok)score++;return `<div class="listening-expanded-review-item"><strong>${ok?'✓':'✗'} ${i+1}. ${q.q}</strong><p><b>Tu respuesta:</b> ${q.options[answers[i]]}</p><p><b>Respuesta correcta:</b> ${q.options[q.correct]}</p><p>${q.explanation}</p></div>`;}).join('');r.className=`listening-expanded-result ${score>=3?'good':'needs-work'}`;r.innerHTML=`<strong>Resultado: ${score}/4</strong><p>${score===4?'¡Excelente comprensión!':score===3?'¡Muy bien! Repite el audio para afianzar detalles.':'Escucha de nuevo y después compara con la transcripción.'}</p><div class="listening-expanded-review">${review}</div>`;markCompleted(current.id);renderLibrary();}
  const norm=t=>t.trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[¿?¡!.,;:«»“”\"]/g,'').replace(/\s+/g,' ');
  function playDictation(rate){if(!current)return;if(!('speechSynthesis' in window)){document.getElementById('listening-expanded-dictation-feedback').textContent='Tu navegador no ofrece voz para el dictado.';return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(current.dictation);u.lang='es-ES';u.rate=rate;speechSynthesis.speak(u);}
  function checkDictation(){if(!current)return;const input=document.getElementById('listening-expanded-dictation-input').value;const f=document.getElementById('listening-expanded-dictation-feedback');if(!input.trim()){f.textContent='Escribe la frase antes de corregir.';return;}const ok=norm(input)===norm(current.dictation);f.innerHTML=ok?'✓ ¡Muy bien! La frase coincide.':`Revisa tu dictado. <strong>Respuesta esperada:</strong> ${current.dictation}`;f.style.color=ok?'var(--success)':'var(--error)';}

  function bind(){
    document.addEventListener('click',e=>{const r=e.target.closest('[data-route="listening"]');if(r){e.preventDefault();setTimeout(showLibrary,0);}const other=e.target.closest('[data-route]');if(other&&other.dataset.route!=='listening'){document.getElementById('listening-expanded-screen')?.classList.add('hidden');document.getElementById('listening-expanded-reader')?.classList.add('hidden');window.speechSynthesis?.cancel?.();}});
    document.getElementById('listening-expanded-search')?.addEventListener('input',e=>{query=e.target.value;page=1;renderLibrary();});
    document.getElementById('listening-expanded-level')?.addEventListener('change',e=>{level=e.target.value;page=1;renderLibrary();});
    document.getElementById('listening-expanded-back')?.addEventListener('click',showLibrary);
    document.querySelectorAll('[data-rate]').forEach(b=>b.addEventListener('click',()=>{document.getElementById('listening-expanded-audio').playbackRate=Number(b.dataset.rate||1);}));
    document.getElementById('listening-expanded-restart')?.addEventListener('click',()=>{const a=document.getElementById('listening-expanded-audio');a.currentTime=0;a.play();});
    document.getElementById('listening-expanded-transcript-toggle')?.addEventListener('click',()=>{const t=document.getElementById('listening-expanded-transcript');const hidden=t.classList.toggle('hidden');document.getElementById('listening-expanded-transcript-toggle').textContent=hidden?'Mostrar transcripción':'Ocultar transcripción';});
    document.getElementById('listening-expanded-submit')?.addEventListener('click',correctQuiz);
    document.getElementById('listening-expanded-dictation-play')?.addEventListener('click',()=>playDictation(.95));
    document.getElementById('listening-expanded-dictation-slow')?.addEventListener('click',()=>playDictation(.72));
    document.getElementById('listening-expanded-dictation-check')?.addEventListener('click',checkDictation);
  }

  function install(){injectStyles();injectScreens();renderLibrary();bind();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();