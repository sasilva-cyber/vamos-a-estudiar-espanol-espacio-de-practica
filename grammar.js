const grammarLessons = [
  {
    id: "fundamentos",
    title: "Gramática, morfología y sintaxis",
    level: "A1–A2",
    group: "Fundamentos",
    category: "Introducción",
    time: "8 min",
    description: "Entenda o que a gramática estuda e como morfologia e sintaxe se complementam.",
    lead: "A gramática descreve como as palavras se formam, variam e se combinam para construir unidades com sentido.",
    summary: ["Morfologia: estrutura e variação das palavras.", "Sintaxe: combinação das palavras em grupos e orações.", "Forma e função precisam ser analisadas em conjunto."],
    sections: [
      { heading: "Morfología", paragraphs: ["A morfologia observa a estrutura interna das palavras, seus morfemas e as variações de gênero, número, pessoa, tempo e modo."], examples: ["niño / niña / niños", "hablo / hablamos / hablaron"], tip: "Pergunte o que muda dentro da palavra e qual informação essa mudança acrescenta." },
      { heading: "Sintaxis", paragraphs: ["A sintaxe estuda como palavras e grupos se organizam para desempenhar funções como sujeito, predicado e complementos."], examples: ["La estudiante lee un libro.", "un libro interesante → grupo nominal"], tip: "Identifique primeiro os grupos; depois observe a função que exercem na oração." }
    ],
    check: { q: "Qual área estuda principalmente a combinação das palavras em grupos e orações?", options: ["Sintaxis", "Fonética", "Ortografía"], correct: 0, explanation: "A sintaxe analisa como as unidades se combinam e que funções exercem nas estruturas." }
  },
  {
    id: "genero",
    title: "El género gramatical",
    level: "A1–A2",
    group: "Morfología",
    category: "Género",
    time: "8 min",
    description: "Gênero de substantivos, concordância e casos que não coincidem com o português.",
    lead: "Em espanhol, o gênero é uma propriedade gramatical que se manifesta sobretudo na concordância entre substantivos, determinantes e adjetivos.",
    summary: ["Masculino e feminino são valores gramaticais.", "O gênero se revela pela concordância.", "Terminação ajuda, mas não determina todos os casos."],
    sections: [
      { heading: "Concordancia", paragraphs: ["Determinantes e adjetivos normalmente concordam com o substantivo em gênero e número."], examples: ["el libro nuevo", "la casa nueva", "las casas nuevas"], tip: "Aprenda substantivos com artigo para fixar o gênero com mais segurança." },
      { heading: "Casos especiales", paragraphs: ["Há substantivos comuns quanto ao gênero e outros cuja forma não permite prever o gênero apenas pela terminação."], examples: ["el/la estudiante", "el problema", "la mano"], tip: "Evite aplicar automaticamente regras do português a palavras formalmente parecidas." }
    ],
    check: { q: "Qual combinação apresenta concordância correta?", options: ["la problema difícil", "el problema difícil", "el mano pequeña"], correct: 1, explanation: "Problema é masculino em espanhol: el problema difícil." }
  },
  {
    id: "numero",
    title: "El número y la formación del plural",
    level: "A1–A2",
    group: "Morfología",
    category: "Número",
    time: "8 min",
    description: "Singular, plural e regras produtivas para formar plurais em espanhol.",
    lead: "O número distingue singular e plural e desencadeia concordância em determinantes, substantivos, adjetivos e verbos.",
    summary: ["Vogal + -s é um padrão frequente.", "Muitas consoantes recebem -es.", "-z passa a -ces no plural."],
    sections: [
      { heading: "Reglas generales", paragraphs: ["Em geral, palavras terminadas em vogal átona acrescentam -s; muitas terminadas em consoante acrescentam -es."], examples: ["casa → casas", "papel → papeles", "doctor → doctores"], tip: "Observe também a sílaba tônica e a grafia quando a terminação muda." },
      { heading: "Terminación en -z", paragraphs: ["As palavras terminadas em -z trocam z por c antes de -es."], examples: ["luz → luces", "voz → voces", "lápiz → lápices"], tip: "A sequência -ces é uma pista recorrente nesses plurais." }
    ],
    check: { q: "Qual é o plural de “luz”?", options: ["luzes", "luces", "luzs"], correct: 1, explanation: "A terminação -z passa a -ces: luz → luces." }
  },
  {
    id: "flexion-verbal",
    title: "La flexión verbal",
    level: "A2–B1",
    group: "Morfología",
    category: "Flexión verbal",
    time: "10 min",
    description: "Radical, vogal temática, pessoa, número, tempo e modo nas formas verbais.",
    lead: "As formas verbais condensam várias informações gramaticais ao mesmo tempo: pessoa, número, tempo e modo.",
    summary: ["O infinitivo indica a conjugação: -ar, -er, -ir.", "A desinência informa pessoa e número.", "Tempo e modo situam e modalizam a ação."],
    sections: [
      { heading: "Partes de la forma verbal", paragraphs: ["Uma forma verbal pode ser analisada em radical e segmentos flexionais. Em verbos regulares, o radical tende a permanecer estável."], examples: ["cant-o", "cant-amos", "com-emos", "viv-ieron"], tip: "Compare várias pessoas do mesmo tempo para perceber o padrão das terminações." },
      { heading: "Persona, número, tiempo y modo", paragraphs: ["A flexão permite reconhecer quem participa da ação, se o referente é singular ou plural e como o falante situa a ação no tempo e no modo."], examples: ["hablo → 1ª pessoa singular", "hablábamos → passado, 1ª pessoa plural"], tip: "Use a forma verbal para inferir o sujeito quando ele não está expresso." }
    ],
    check: { q: "Em “hablamos”, qual informação aparece na terminação -amos?", options: ["1ª pessoa do plural", "3ª pessoa do singular", "2ª pessoa do plural"], correct: 0, explanation: "-amos marca, nesse contexto, a primeira pessoa do plural." }
  },
  {
    id: "derivacion-composicion",
    title: "Derivación y composición",
    level: "B1–B2",
    group: "Morfología",
    category: "Formación de palabras",
    time: "11 min",
    description: "Prefixos, sufixos, derivação nominal/adjetival/verbal e composição.",
    lead: "O léxico se expande por processos produtivos como derivação e composição, que criam palavras relacionadas formal e semanticamente.",
    summary: ["Derivação acrescenta afixos a uma base.", "Prefixos e sufixos podem alterar significado ou categoria.", "Composição reúne bases lexicais."],
    sections: [
      { heading: "Derivación", paragraphs: ["A derivação pode formar substantivos, adjetivos e verbos a partir de outras bases, com prefixos ou sufixos."], examples: ["feliz → felicidad", "nación → nacional", "hacer → rehacer"], tip: "Observe se o afixo muda apenas o significado ou também a categoria da palavra." },
      { heading: "Composición", paragraphs: ["Na composição, duas ou mais bases se combinam para formar uma nova unidade lexical."], examples: ["sacacorchos", "paraguas", "pelirrojo"], tip: "Nem todo composto mantém um significado totalmente previsível pela soma das partes." }
    ],
    check: { q: "Qual palavra é formada por composição?", options: ["felicidad", "paraguas", "nacional"], correct: 1, explanation: "Paraguas combina duas bases e funciona como palavra composta." }
  },
  {
    id: "sustantivo",
    title: "El sustantivo: clases y funcionamiento",
    level: "A2–B1",
    group: "Sustantivos y adjetivos",
    category: "Sustantivo",
    time: "10 min",
    description: "Nomes comuns e próprios, contáveis e não contáveis, individuais e coletivos.",
    lead: "O substantivo constitui o núcleo típico do grupo nominal e pode ser classificado segundo propriedades semânticas e gramaticais.",
    summary: ["Comuns e próprios têm comportamentos diferentes.", "Contáveis admitem contagem direta.", "Coletivos podem designar conjuntos no singular."],
    sections: [
      { heading: "Comunes y propios", paragraphs: ["Os nomes próprios identificam indivíduos ou entidades particulares; os comuns designam classes de seres, objetos ou conceitos."], examples: ["Madrid / ciudad", "Ana / estudiante"], tip: "Nomes próprios costumam aparecer com maiúscula inicial." },
      { heading: "Contables, no contables y colectivos", paragraphs: ["Contáveis combinam naturalmente com numerais; não contáveis costumam ser medidos por quantificadores ou unidades. Coletivos designam grupos com forma singular."], examples: ["tres libros", "mucha agua", "el alumnado"], tip: "Compare tres libros com tres aguas: o contexto pode alterar a interpretação do substantivo." }
    ],
    check: { q: "Qual expressão apresenta um substantivo não contável em uso típico?", options: ["tres sillas", "mucha agua", "dos alumnos"], correct: 1, explanation: "Agua é normalmente não contável e aparece naturalmente com quantificadores como mucha." }
  },
  {
    id: "adjetivo",
    title: "El adjetivo: concordancia, posición y grado",
    level: "A2–B1",
    group: "Sustantivos y adjetivos",
    category: "Adjetivo",
    time: "11 min",
    description: "Adjetivos qualificativos e relacionais, posição, concordância, comparação e superlativo.",
    lead: "O adjetivo modifica o substantivo e pode classificar, qualificar ou graduar propriedades.",
    summary: ["Concorda normalmente em gênero e número.", "A posição pode alterar foco ou interpretação.", "Comparativo e superlativo expressam grau."],
    sections: [
      { heading: "Concordancia y posición", paragraphs: ["Adjetivos flexivos concordam com o substantivo. A posição antes ou depois do nome pode ter efeitos de informação, estilo ou significado."], examples: ["una casa blanca", "las casas blancas", "un viejo amigo / un amigo viejo"], tip: "Não trate a posição como totalmente livre: alguns contrastes mudam o sentido." },
      { heading: "Grado", paragraphs: ["O grau pode ser positivo, comparativo ou superlativo. Há comparativos irregulares de uso frequente."], examples: ["más alto que", "tan interesante como", "mejor / peor", "el más rápido"], tip: "Evite *más mejor*: mejor já incorpora valor comparativo." }
    ],
    check: { q: "Qual forma comparativa é normativa?", options: ["más mejor", "mejor", "más bueno que"], correct: 1, explanation: "Mejor é o comparativo irregular de bueno em muitos contextos." }
  },
  {
    id: "determinantes-pronombres",
    title: "Determinantes y pronombres",
    level: "A2–B1",
    group: "Determinantes y pronombres",
    category: "Determinantes",
    time: "10 min",
    description: "Diferença entre determinantes e pronomes e seu papel na referência nominal.",
    lead: "Determinantes acompanham o substantivo; pronomes podem ocupar o lugar de um grupo nominal e desempenhar funções sintáticas.",
    summary: ["Determinante acompanha um nome.", "Pronome pode substituir um grupo nominal.", "Artigos, demonstrativos, possessivos e quantificadores integram o sistema referencial."],
    sections: [
      { heading: "Determinantes", paragraphs: ["Determinantes delimitam ou quantificam a referência do substantivo."], examples: ["este libro", "mi casa", "dos estudiantes", "algunas preguntas"], tip: "Se a forma aparece diretamente antes do substantivo, verifique se está funcionando como determinante." },
      { heading: "Pronombres", paragraphs: ["Pronomes podem ocupar sozinhos posições típicas de grupos nominais."], examples: ["Este es mío.", "Algunos llegaron tarde.", "Ella estudia español."], tip: "A mesma forma pode ter comportamento diferente conforme venha acompanhada ou não de um substantivo." }
    ],
    check: { q: "Em “Este libro es interesante”, “este” funciona como:", options: ["determinante", "verbo", "preposição"], correct: 0, explanation: "Este acompanha e delimita o substantivo libro, portanto funciona como determinante." }
  },
  {
    id: "articulo",
    title: "El artículo: definido, indefinido y neutro",
    level: "A1–A2",
    group: "Determinantes y pronombres",
    category: "Artículo",
    time: "9 min",
    description: "El/la/los/las, un/una/unos/unas, lo neutro e contrações al/del.",
    lead: "O artigo participa da determinação do grupo nominal e ajuda a construir referência definida ou indefinida.",
    summary: ["Definidos: el, la, los, las.", "Indefinidos: un, una, unos, unas.", "Lo é neutro e não acompanha substantivo comum.", "a + el = al; de + el = del."],
    sections: [
      { heading: "Definido e indefinido", paragraphs: ["O artigo definido costuma apresentar um referente identificável; o indefinido introduz ou quantifica de forma não definida."], examples: ["La profesora llegó.", "Una profesora preguntó por ti."], tip: "A escolha depende da referência construída no contexto." },
      { heading: "Lo, al y del", paragraphs: ["Lo pode substantivar adjetivos ou estruturas; al e del são contrações regulares."], examples: ["Lo importante es practicar.", "Voy al museo.", "Vengo del trabajo."], tip: "Não use lo diante de substantivo comum: el libro, não *lo libro*." }
    ],
    check: { q: "Complete: “Voy ___ museo mañana.”", options: ["a el", "al", "del"], correct: 1, explanation: "A preposição a e o artigo el formam a contração al." }
  },
  {
    id: "pronombres-personales",
    title: "Pronombres personales y clíticos",
    level: "A2–B1",
    group: "Determinantes y pronombres",
    category: "Pronombres personales",
    time: "11 min",
    description: "Sujeito, objeto direto, objeto indireto, reflexivos e combinações como se lo.",
    lead: "Os pronomes pessoais distinguem pessoas do discurso e apresentam formas diferentes conforme a função sintática.",
    summary: ["Sujeito pode ser omitido quando a flexão verbal o identifica.", "OD: lo, la, los, las.", "OI: le, les.", "le/les + lo/la/los/las → se."],
    sections: [
      { heading: "Sujeto y complementos", paragraphs: ["Yo, tú, él/ella, nosotros e outras formas podem funcionar como sujeito. Lo/la e le/les retomam complementos."], examples: ["Trabajo aquí.", "La vi ayer.", "Le di un libro."], tip: "Diferencie o que recebe diretamente a ação de quem é destinatário ou beneficiário." },
      { heading: "Clíticos combinados", paragraphs: ["Quando le ou les aparecem antes de lo, la, los ou las, tornam-se se."], examples: ["Le di el libro → Se lo di.", "Les envié las fotos → Se las envié."], tip: "Na combinação, o indireto aparece antes do direto." }
    ],
    check: { q: "Complete: “A Marta ___ di las llaves.”", options: ["la", "le", "lo"], correct: 1, explanation: "Marta é destinatária; o pronome de complemento indireto é le." }
  },
  {
    id: "demostrativos-posesivos",
    title: "Demostrativos y posesivos",
    level: "A1–A2",
    group: "Determinantes y pronombres",
    category: "Demostrativos y posesivos",
    time: "9 min",
    description: "Este/ese/aquel e possessivos átonos e tônicos.",
    lead: "Demonstrativos localizam referentes no espaço, no discurso ou no tempo; possessivos expressam relações de posse ou pertencimento.",
    summary: ["este/ese/aquel organizam graus de distância.", "mi/tu/su antecedem normalmente o substantivo.", "mío/tuyo/suyo podem aparecer depois ou sozinhos."],
    sections: [
      { heading: "Demostrativos", paragraphs: ["As séries este, ese e aquel podem indicar proximidade ou distância relativa ao falante e ao interlocutor, além de usos discursivos."], examples: ["este libro", "esa mesa", "aquellas montañas"], tip: "Pense em três zonas: perto do falante, perto do ouvinte e distante de ambos." },
      { heading: "Posesivos", paragraphs: ["As formas átonas precedem o substantivo; as tônicas concordam com a coisa possuída."], examples: ["mi libro", "nuestra casa", "un amigo mío", "las llaves son tuyas"], tip: "Em suyo/suya, o possuidor pode precisar ser esclarecido pelo contexto." }
    ],
    check: { q: "Qual forma completa “Las llaves son ___”?", options: ["tu", "tuyas", "tuyo"], correct: 1, explanation: "A forma tônica concorda com llaves, feminino plural: tuyas." }
  },
  {
    id: "cuantificadores-numerales",
    title: "Cuantificadores y numerales",
    level: "A2–B1",
    group: "Determinantes y pronombres",
    category: "Cuantificación",
    time: "9 min",
    description: "Mucho, poco, bastante, todo, algún/ningún e numerais cardinais e ordinais.",
    lead: "Quantificadores expressam quantidade, grau ou extensão; numerais introduzem valores numéricos mais precisos.",
    summary: ["Quantificadores podem variar em gênero e número.", "Algún/ningún sofrem apócope diante de masculino singular.", "Cardinais contam; ordinais ordenam."],
    sections: [
      { heading: "Cuantificadores", paragraphs: ["Formas como mucho, poco, bastante, todo, alguno e ninguno podem acompanhar substantivos ou funcionar pronominalmente."], examples: ["muchos libros", "poca agua", "algunos llegaron", "ningún problema"], tip: "Observe se o substantivo é contável ou não contável ao escolher o quantificador." },
      { heading: "Numerales", paragraphs: ["Cardinais indicam quantidade exata; ordinais indicam posição em uma série."], examples: ["tres estudiantes", "el primer capítulo", "la segunda parte"], tip: "Primero e tercero costumam aparecer como primer/tercer antes de substantivo masculino singular." }
    ],
    check: { q: "Complete: “No tengo ___ problema.”", options: ["ninguno", "ningún", "ninguna"], correct: 1, explanation: "Diante de substantivo masculino singular, ninguno sofre apócope: ningún problema." }
  },
  {
    id: "relativos-interrogativos",
    title: "Relativos, interrogativos y exclamativos",
    level: "B1–B2",
    group: "Determinantes y pronombres",
    category: "Relativos e interrogativos",
    time: "11 min",
    description: "Que, quien, el cual, cuyo, qué, quién, cuál, cuánto e diferenças de acentuação.",
    lead: "Relativos conectam uma oração a um antecedente; interrogativos e exclamativos introduzem perguntas ou exclamações e recebem tilde.",
    summary: ["Que é o relativo mais frequente.", "Cuyo expressa posse e concorda com o nome possuído.", "Interrogativos/exclamativos levam tilde: qué, quién, cuál, cuánto."],
    sections: [
      { heading: "Relativos", paragraphs: ["Os relativos introduzem orações que caracterizam ou identificam um antecedente."], examples: ["El libro que compré...", "La autora cuyos artículos leí...", "La persona con quien hablé..."], tip: "Cuyo concorda com o substantivo que vem depois, não com o antecedente." },
      { heading: "Interrogativos y exclamativos", paragraphs: ["Qué, quién, cuál, cómo, cuándo, dónde e cuánto recebem tilde em usos interrogativos ou exclamativos, inclusive indiretos."], examples: ["¿Qué quieres?", "No sé dónde vive.", "¡Cuánto tiempo!"], tip: "Pergunta indireta também mantém a tilde: No sé qué decir." }
    ],
    check: { q: "Complete: “La investigadora, ___ artículos fueron premiados, dará una charla.”", options: ["que", "cuyos", "quien"], correct: 1, explanation: "Cuyos expressa posse e concorda com artículos, masculino plural." }
  },
  {
    id: "adverbio",
    title: "El adverbio y las locuciones adverbiales",
    level: "A2–B1",
    group: "Adverbios y enlaces",
    category: "Adverbio",
    time: "9 min",
    description: "Lugar, tempo, modo, quantidade, afirmação, negação e dúvida.",
    lead: "O advérbio modifica verbos, adjetivos, outros advérbios ou até a oração inteira, sem flexão de gênero e número.",
    summary: ["Advérbios são invariáveis.", "Podem expressar lugar, tempo, modo, quantidade e modalidade.", "Locuções adverbiais funcionam como uma unidade."],
    sections: [
      { heading: "Clases de adverbios", paragraphs: ["Entre as classes frequentes estão lugar, tempo, modo, quantidade, afirmação, negação e dúvida."], examples: ["aquí", "mañana", "bien", "muy", "sí", "no", "quizás"], tip: "Muito antes de adjetivo/advérbio é muy; diante de substantivo, costuma ser mucho/a/os/as." },
      { heading: "Locuciones", paragraphs: ["Expressões fixas de várias palavras podem desempenhar função adverbial."], examples: ["de repente", "a menudo", "sin duda", "a duras penas"], tip: "Aprenda a locução como bloco, porque seu significado pode não ser totalmente composicional." }
    ],
    check: { q: "Complete: “La película es ___ interesante.”", options: ["mucho", "muy", "mucha"], correct: 1, explanation: "Diante de adjetivo, usa-se o advérbio invariável muy." }
  },
  {
    id: "verbos-regulares-irregulares",
    title: "Verbos regulares e irregulares",
    level: "A2–B1",
    group: "Verbos",
    category: "Conjugación",
    time: "11 min",
    description: "Três conjugações e padrões de irregularidade no radical e nas terminações.",
    lead: "Verbos regulares seguem paradigmas estáveis; os irregulares alteram radical, vogais ou terminações em parte da conjugação.",
    summary: ["-ar, -er e -ir formam as três conjugações.", "Mudanças como e→ie, o→ue e e→i são frequentes.", "Alguns verbos têm formas supletivas ou muito irregulares."],
    sections: [
      { heading: "Regulares", paragraphs: ["Nos verbos regulares, o radical permanece estável e as terminações seguem o paradigma da conjugação."], examples: ["hablo, hablas, hablamos", "como, comes, comemos", "vivo, vives, vivimos"], tip: "Separe o infinitivo em radical + terminação para visualizar o paradigma." },
      { heading: "Irregulares", paragraphs: ["Irregularidades podem afetar apenas certas pessoas e tempos."], examples: ["pensar → pienso", "dormir → duermo", "pedir → pido", "ir → voy"], tip: "Estude padrões, não listas isoladas: vários verbos compartilham a mesma alternância." }
    ],
    check: { q: "Qual forma corresponde a “yo” do verbo pensar no presente?", options: ["penso", "pienso", "pensio"], correct: 1, explanation: "Pensar apresenta alternância e→ie: yo pienso." }
  },
  {
    id: "indicativo-tiempos",
    title: "Indicativo y tiempos verbales",
    level: "B1–B2",
    group: "Verbos",
    category: "Indicativo",
    time: "12 min",
    description: "Presente, passados, futuro e condicional em contraste.",
    lead: "O indicativo apresenta situações como fatos, afirmações ou conteúdos assumidos no discurso, articulando diferentes relações temporais.",
    summary: ["Indefinido: evento concluído e delimitado.", "Imperfecto: hábito, descrição ou pano de fundo.", "Perfecto relaciona passado e período de referência atual em muitos usos.", "Futuro e condicional também podem ter valores modais."],
    sections: [
      { heading: "Los pasados", paragraphs: ["A escolha entre indefinido, imperfecto e perfecto depende da perspectiva temporal e discursiva."], examples: ["Ayer fui al museo.", "Cuando era niño, iba al parque.", "Hoy he hablado con Ana."], tip: "Marcadores temporais ajudam, mas o valor aspectual da situação é decisivo." },
      { heading: "Futuro y condicional", paragraphs: ["Além de referência temporal, futuro e condicional podem expressar hipótese, probabilidade, cortesia ou consequência."], examples: ["Mañana llegaré temprano.", "Yo que tú, hablaría con ella.", "Serán las ocho."], tip: "Nem todo futuro fala apenas do futuro cronológico." }
    ],
    check: { q: "Complete: “Cuando era niño, ___ al parque todos los días.”", options: ["fui", "iba", "iré"], correct: 1, explanation: "Uma ação habitual no passado pede o imperfecto: iba." }
  },
  {
    id: "subjuntivo-modo",
    title: "Subjuntivo y modo verbal",
    level: "B1–B2",
    group: "Verbos",
    category: "Subjuntivo",
    time: "12 min",
    description: "Desejo, dúvida, avaliação, hipótese, finalidade e relações subordinadas.",
    lead: "O subjuntivo não é simplesmente um tempo verbal: é um modo associado a determinados contextos sintáticos e à atitude do falante.",
    summary: ["Desejo e influência frequentemente acionam subjuntivo.", "Dúvida, possibilidade e avaliação também podem acioná-lo.", "A relação entre oração principal e subordinada é central."],
    sections: [
      { heading: "Presente de subjuntivo", paragraphs: ["É frequente após expressões de desejo, dúvida, avaliação e finalidade, entre outros contextos."], examples: ["Espero que vengas.", "No creo que sea fácil.", "Te lo explico para que entiendas."], tip: "Procure o gatilho na oração principal e a relação semântica entre as duas orações." },
      { heading: "Imperfecto y pluscuamperfecto", paragraphs: ["Em hipóteses irreais ou relações temporais no passado, aparecem formas como tuviera e hubiera tenido."], examples: ["Si tuviera tiempo, viajaría.", "Si lo hubiera sabido, habría ido."], tip: "Em condicionais irreais, observe a correlação entre subjuntivo e condicional." }
    ],
    check: { q: "Complete: “Espero que tú ___ mañana.”", options: ["vienes", "vengas", "vendrás"], correct: 1, explanation: "Depois de espero que, o presente do subjuntivo é apropriado: vengas." }
  },
  {
    id: "formas-no-personales",
    title: "Infinitivo, gerundio, participio y perífrasis",
    level: "B1–B2",
    group: "Verbos",
    category: "Formas no personales",
    time: "11 min",
    description: "Formas não pessoais do verbo e perífrases de aspecto, obrigação e duração.",
    lead: "Infinitivo, gerúndio e particípio não marcam pessoa e número da mesma forma que os verbos finitos e participam de numerosas construções perifrásticas.",
    summary: ["Infinitivo termina em -ar, -er, -ir.", "Gerúndio expressa frequentemente desenvolvimento em perífrases.", "Particípio participa dos tempos compostos e de usos adjetivais.", "Perífrases acrescentam valores aspectuais ou modais."],
    sections: [
      { heading: "Formas no personales", paragraphs: ["O infinitivo nomeia a ação; o gerúndio aparece em construções progressivas; o particípio aparece com haber e também como adjetivo em certos contextos."], examples: ["Quiero viajar.", "Estoy leyendo.", "He terminado.", "La puerta está cerrada."], tip: "Com haber, o particípio permanece invariável: he escrito / hemos escrito." },
      { heading: "Perífrasis", paragraphs: ["Combinações de verbo auxiliar + forma não pessoal expressam início, duração, obrigação, repetição ou término."], examples: ["tener que estudiar", "seguir trabajando", "volver a intentar", "dejar de fumar"], tip: "Analise a unidade inteira: muitas perífrases têm sentido gramatical próprio." }
    ],
    check: { q: "O que expressa “Lleva dos años estudiando español”?", options: ["ação ainda em curso há dois anos", "ação concluída há dois anos", "ação futura"], correct: 0, explanation: "Llevar + período + gerundio expressa duração acumulada de uma ação em curso." }
  },
  {
    id: "preposiciones",
    title: "Preposiciones: por, para y otros valores",
    level: "A2–B1",
    group: "Adverbios y enlaces",
    category: "Preposición",
    time: "11 min",
    description: "Por/para, a/de/en/con, direção, origem, meio, causa, finalidade e tempo.",
    lead: "Preposições conectam unidades e expressam relações semânticas e sintáticas como direção, origem, causa, finalidade, meio e localização.",
    summary: ["Para costuma marcar finalidade ou destino.", "Por pode marcar causa, meio ou percurso.", "a, de e en organizam direção, origem e localização em muitos contextos."],
    sections: [
      { heading: "Por y para", paragraphs: ["Para é frequente com finalidade, destinatário e destino; por aparece com causa, meio, troca, duração aproximada e percurso."], examples: ["Estudio para trabajar.", "Lo hice por ti.", "Viajamos por tren.", "Paseamos por el centro."], tip: "Pergunte se a relação é objetivo/destino ou causa/meio/percurso." },
      { heading: "Otras preposiciones", paragraphs: ["A, de, en, con, sin, desde e hasta formam numerosas relações básicas."], examples: ["Voy a Madrid.", "Vengo de casa.", "Estoy en la oficina.", "Desde lunes hasta viernes."], tip: "Aprenda também as regências dos verbos e adjetivos frequentes." }
    ],
    check: { q: "Complete: “Estudio español ___ trabajar en otro país.”", options: ["por", "para", "desde"], correct: 1, explanation: "Para + infinitivo expressa finalidade." }
  },
  {
    id: "conjunciones-conectores",
    title: "Conjunciones, conectores e interjecciones",
    level: "B1–B2",
    group: "Adverbios y enlaces",
    category: "Conectores",
    time: "10 min",
    description: "Coordenação, subordinação, conectores discursivos e interjeições.",
    lead: "Conjunções articulam unidades sintáticas; conectores organizam relações discursivas; interjeições formam enunciados ou expressões de valor pragmático.",
    summary: ["y/e e o/u coordenam elementos.", "pero e sino expressam contraste com comportamentos diferentes.", "Conectores como sin embargo e por tanto organizam o discurso."],
    sections: [
      { heading: "Conjunciones", paragraphs: ["Conjunções podem coordenar elementos do mesmo nível ou introduzir orações subordinadas."], examples: ["Ana y Luis", "pan o arroz", "No vino, sino que llamó.", "Creo que vendrá."], tip: "E substitui y antes de som inicial /i/; u substitui o antes de som inicial /o/." },
      { heading: "Conectores e interjecciones", paragraphs: ["Conectores relacionam segmentos discursivos por contraste, consequência, adição ou reformulação. Interjeições expressam reações e atos comunicativos."], examples: ["sin embargo", "por tanto", "además", "es decir", "¡ay!", "¡hola!"], tip: "Pontuação e posição ajudam a reconhecer o papel discursivo do conector." }
    ],
    check: { q: "Qual conector introduz contraste?", options: ["sin embargo", "por tanto", "además"], correct: 0, explanation: "Sin embargo é um conector adversativo ou contrastivo." }
  },
  {
    id: "grupo-nominal",
    title: "El grupo nominal",
    level: "B1–B2",
    group: "Sintaxis simple",
    category: "Grupo nominal",
    time: "10 min",
    description: "Núcleo, determinantes, complementos do nome, aposição e funções sintáticas.",
    lead: "O grupo nominal se organiza em torno de um núcleo nominal ou pronominal e pode incluir determinantes, adjetivos e complementos.",
    summary: ["O substantivo é o núcleo típico.", "Determinantes e modificadores expandem o grupo.", "O grupo nominal pode ser sujeito, complemento ou atributo."],
    sections: [
      { heading: "Estructura", paragraphs: ["Um grupo nominal pode reunir determinantes, núcleo e modificadores de diferentes tipos."], examples: ["los nuevos libros de gramática", "mi amiga Ana", "aquellas tres casas blancas"], tip: "Localize o núcleo e depois veja quais elementos dependem dele." },
      { heading: "Funciones", paragraphs: ["Grupos nominais podem desempenhar várias funções na oração."], examples: ["La profesora llegó. → sujeto", "Compré un libro. → complemento directo", "Ana es médica. → atributo"], tip: "A função depende da relação com o verbo, não apenas da forma do grupo." }
    ],
    check: { q: "Qual é o núcleo de “los libros nuevos de español”?", options: ["los", "libros", "nuevos"], correct: 1, explanation: "Libros é o substantivo em torno do qual se organizam os demais elementos." }
  },
  {
    id: "grupos-adj-prep-adv",
    title: "Grupos adjetival, preposicional y adverbial",
    level: "B1–B2",
    group: "Sintaxis simple",
    category: "Grupos sintácticos",
    time: "10 min",
    description: "Núcleos e complementos de grupos adjetivais, preposicionais e adverbiais.",
    lead: "Além do grupo nominal, a sintaxe reconhece grupos cujo núcleo é um adjetivo ou advérbio e construções encabeçadas por preposição.",
    summary: ["Grupo adjetival tem adjetivo como núcleo.", "Grupo adverbial tem advérbio como núcleo.", "Grupo preposicional é introduzido por preposição."],
    sections: [
      { heading: "Adjetival y adverbial", paragraphs: ["Adjetivos e advérbios podem receber intensificadores e complementos."], examples: ["muy contento con el resultado", "bastante lejos de casa", "demasiado pronto"], tip: "Identifique qual palavra organiza o grupo e recebe os modificadores." },
      { heading: "Preposicional", paragraphs: ["Uma preposição introduz um termo, formando uma unidade que pode funcionar como complemento ou adjunto."], examples: ["de Madrid", "con paciencia", "para la clase", "por la mañana"], tip: "A preposição pode ser exigida por um verbo ou escolhida pelo significado circunstancial." }
    ],
    check: { q: "Qual expressão é um grupo preposicional?", options: ["muy rápido", "con paciencia", "la casa"], correct: 1, explanation: "Con paciencia é introduzido pela preposição con." }
  },
  {
    id: "sujeto-predicado",
    title: "El sujeto y el predicado",
    level: "A2–B1",
    group: "Sintaxis simple",
    category: "Sujeto",
    time: "10 min",
    description: "Concordância sujeito-verbo, sujeito expresso, omitido e posposto.",
    lead: "O sujeito se relaciona com o verbo por concordância e pode aparecer antes ou depois do predicado, ou permanecer omitido quando é recuperável.",
    summary: ["Sujeito e verbo concordam em pessoa e número.", "O sujeito pode ser tácito.", "A posição do sujeito é relativamente flexível."],
    sections: [
      { heading: "Concordancia", paragraphs: ["A concordância verbal é uma pista central para reconhecer o sujeito."], examples: ["La alumna estudia.", "Las alumnas estudian.", "Llegaron los invitados."], tip: "Não suponha que o primeiro grupo nominal seja sempre o sujeito." },
      { heading: "Sujeto tácito", paragraphs: ["O espanhol pode omitir o pronome sujeito porque a desinência verbal costuma indicar a pessoa."], examples: ["Trabajo aquí. → yo", "Llegamos temprano. → nosotros/nosotras"], tip: "Recupere o sujeito pela forma verbal e pelo contexto." }
    ],
    check: { q: "Em “Llegaron los estudiantes”, qual é o sujeito?", options: ["Llegaron", "los estudiantes", "não há sujeito"], correct: 1, explanation: "Los estudiantes concorda em plural com llegaron e funciona como sujeito posposto." }
  },
  {
    id: "complementos-verbales",
    title: "Complemento directo, indirecto y de régimen",
    level: "B1–B2",
    group: "Sintaxis simple",
    category: "Complementos verbales",
    time: "12 min",
    description: "Como distinguir CD, CI e complemento regido por preposição.",
    lead: "Os verbos selecionam complementos com diferentes relações sintáticas; reconhecer pronominalização e regência ajuda a distingui-los.",
    summary: ["CD costuma ser retomado por lo/la/los/las.", "CI costuma ser retomado por le/les.", "Complemento de regime mantém a preposição exigida pelo verbo."],
    sections: [
      { heading: "Directo e indirecto", paragraphs: ["O complemento direto se relaciona diretamente com o verbo; o indireto costuma marcar destinatário, beneficiário ou participante introduzido por a."], examples: ["Compré el libro → Lo compré.", "Di el libro a Ana → Le di el libro."], tip: "Use a substituição pronominal como diagnóstico, mas considere também variações regionais de leísmo." },
      { heading: "Complemento de régimen", paragraphs: ["Alguns verbos exigem uma preposição específica que introduz seu complemento."], examples: ["depender de algo", "confiar en alguien", "acordarse de algo"], tip: "Aprenda verbo + preposição como unidade lexical." }
    ],
    check: { q: "Em “Confío en mis compañeros”, “en mis compañeros” é:", options: ["complemento de régimen", "sujeito", "atributo"], correct: 0, explanation: "Confiar seleciona a preposição en; o grupo funciona como complemento de regime." }
  },
  {
    id: "adjuntos-circunstanciales",
    title: "Adjuntos y complementos circunstanciales",
    level: "B1–B2",
    group: "Sintaxis simple",
    category: "Adjuntos",
    time: "9 min",
    description: "Tempo, lugar, modo, causa, finalidade, instrumento e companhia.",
    lead: "Adjuntos acrescentam informação circunstancial sem serem necessariamente selecionados pelo verbo.",
    summary: ["Podem indicar tempo, lugar, modo, causa e outras circunstâncias.", "Frequentemente têm maior mobilidade na oração.", "Nem todo grupo preposicional é adjunto."],
    sections: [
      { heading: "Valores semánticos", paragraphs: ["Adjuntos podem localizar o evento ou caracterizá-lo quanto a tempo, lugar, modo, causa, instrumento, companhia e finalidade."], examples: ["Llegó ayer.", "Trabaja en casa.", "Lo hizo con cuidado.", "Viajó con Ana."], tip: "Pergunte se o verbo exige aquele complemento ou se ele apenas adiciona circunstância." },
      { heading: "Movilidad", paragraphs: ["Muitos adjuntos podem aparecer em diferentes posições sem alterar a estrutura argumental."], examples: ["Ayer fuimos al museo. / Fuimos ayer al museo."], tip: "Mobilidade é uma pista, não uma regra absoluta." }
    ],
    check: { q: "Em “Ayer estudiamos en la biblioteca”, “ayer” expressa:", options: ["tempo", "objeto direto", "atributo"], correct: 0, explanation: "Ayer funciona como adjunto temporal." }
  },
  {
    id: "atributo-predicativos",
    title: "Atributo y complementos predicativos",
    level: "B1–B2",
    group: "Sintaxis simple",
    category: "Atributo",
    time: "10 min",
    description: "Copulativos ser/estar/parecer e predicativos ligados ao sujeito ou objeto.",
    lead: "O atributo caracteriza o sujeito com verbos copulativos; complementos predicativos atribuem propriedades em construções com outros verbos.",
    summary: ["Ser, estar e parecer são copulativos centrais.", "O atributo caracteriza o sujeito.", "Predicativos podem concordar com sujeito ou complemento."],
    sections: [
      { heading: "Atributo", paragraphs: ["Com ser, estar e parecer, o atributo fornece a predicação principal sobre o sujeito."], examples: ["Ana es médica.", "La puerta está abierta.", "El examen parece difícil."], tip: "Em muitos casos, o atributo pode ser retomado por lo: Ana lo es." },
      { heading: "Predicativo", paragraphs: ["Com verbos plenos, um adjetivo ou grupo pode acrescentar uma propriedade relacionada ao sujeito ou ao objeto."], examples: ["Llegó cansada.", "Encontré la puerta abierta."], tip: "Observe com qual elemento o adjetivo concorda." }
    ],
    check: { q: "Em “La puerta está abierta”, “abierta” funciona como:", options: ["atributo", "sujeito", "complemento direto"], correct: 0, explanation: "Com estar copulativo, abierta caracteriza o sujeito la puerta e funciona como atributo." }
  },
  {
    id: "voz-impersonales",
    title: "Oraciones activas, pasivas e impersonales",
    level: "B1–B2",
    group: "Sintaxis simple",
    category: "Voz e impersonalidad",
    time: "11 min",
    description: "Voz ativa, passiva perifrástica, pasiva refleja e construções impessoais.",
    lead: "A organização entre agente, paciente e verbo pode mudar conforme a voz; outras construções não apresentam sujeito léxico.",
    summary: ["Ativa destaca o agente como sujeito.", "Passiva perifrástica usa ser + particípio.", "Pasiva refleja usa se com concordância.", "Impessoais não têm sujeito gramatical expresso."],
    sections: [
      { heading: "Activa y pasiva", paragraphs: ["Na ativa, o sujeito tende a corresponder ao agente; na passiva, o paciente ocupa a posição de sujeito."], examples: ["La empresa publicó el informe.", "El informe fue publicado por la empresa.", "Se vendieron las entradas."], tip: "Na pasiva refleja, o verbo concorda com o sujeito paciente: se vendieron las entradas." },
      { heading: "Impersonales", paragraphs: ["Há construções com verbos meteorológicos, haber e certos usos de se sem sujeito gramatical."], examples: ["Llueve.", "Hay muchas personas.", "Se vive bien aquí."], tip: "Com haber impessoal, a norma-padrão mantém o verbo no singular: había muchas personas." }
    ],
    check: { q: "Complete: “Ayer se ___ todas las entradas.”", options: ["vendió", "vendieron", "vendería"], correct: 1, explanation: "Na pasiva refleja, o verbo concorda com o sujeito plural todas las entradas: se vendieron." }
  },
  {
    id: "modalidad-negacion",
    title: "La modalidad y la negación",
    level: "B1–B2",
    group: "Sintaxis simple",
    category: "Modalidad",
    time: "10 min",
    description: "Enunciados declarativos, interrogativos, exclamativos, imperativos e estruturas negativas.",
    lead: "A modalidade relaciona o enunciado com a atitude comunicativa do falante; a negação altera a polaridade e interage com quantificadores e pronomes negativos.",
    summary: ["Declarações, perguntas, exclamações e ordens têm marcas próprias.", "No é o marcador negativo básico.", "Nadie, nada, nunca e ningún interagem com a negação."],
    sections: [
      { heading: "Modalidad", paragraphs: ["A mesma proposição pode ser apresentada como afirmação, pergunta, exclamação ou ordem por meio de entonação, pontuação e formas verbais."], examples: ["Vienes mañana.", "¿Vienes mañana?", "¡Vienes mañana!", "Ven mañana."], tip: "Observe a intenção comunicativa, não apenas a ordem das palavras." },
      { heading: "Negación", paragraphs: ["Elementos negativos podem aparecer antes ou depois do verbo. Quando aparecem depois, o no pré-verbal costuma ser necessário."], examples: ["Nadie vino.", "No vino nadie.", "Nunca lo hago. / No lo hago nunca."], tip: "A dupla marcação negativa é normal em espanhol quando o termo negativo vem depois do verbo." }
    ],
    check: { q: "Qual frase está correta?", options: ["No vino nadie.", "No nadie vino.", "Nadie no vino."], correct: 0, explanation: "Com o indefinido negativo depois do verbo, a construção normativa é No vino nadie." }
  },
  {
    id: "subordinadas-sustantivas-relativo",
    title: "Subordinadas sustantivas y de relativo",
    level: "B2–C1",
    group: "Sintaxis compleja",
    category: "Subordinación",
    time: "13 min",
    description: "Orações que funcionam como nomes e orações relativas com antecedente expresso ou implícito.",
    lead: "A subordinação permite inserir uma oração dentro de outra estrutura, desempenhando funções nominais ou modificando um antecedente.",
    summary: ["Subordinadas sustantivas podem ser sujeito ou complemento.", "Que e si são nexos frequentes.", "Relativas modificam um antecedente com que, quien, cuyo, el cual etc."],
    sections: [
      { heading: "Sustantivas", paragraphs: ["Uma subordinada substantiva pode ocupar posições típicas de um grupo nominal."], examples: ["Me alegra que estés aquí. → sujeto", "Creo que vendrá. → complemento", "No sé si viene."], tip: "Tente substituir a oração por eso para reconhecer seu comportamento nominal." },
      { heading: "Relativas", paragraphs: ["Orações relativas caracterizam um antecedente ou funcionam sem antecedente expresso em certos casos."], examples: ["El libro que compré...", "La persona con quien hablé...", "Quien llegue primero gana."], tip: "Distinga relativas especificativas, sem vírgula, e explicativas, normalmente entre vírgulas." }
    ],
    check: { q: "Em “Creo que vendrá”, “que vendrá” funciona como:", options: ["subordinada substantiva", "oração independente", "grupo adverbial"], correct: 0, explanation: "A oração subordinada completa o conteúdo de creo e desempenha função nominal." }
  },
  {
    id: "comparativas-consecutivas",
    title: "Comparativas, superlativas y consecutivas",
    level: "B2–C1",
    group: "Sintaxis compleja",
    category: "Comparación y consecuencia",
    time: "11 min",
    description: "Más/menos... que, tan... como, superlativos e construções de consequência.",
    lead: "As construções comparativas relacionam graus ou quantidades; as consecutivas expressam resultado decorrente de uma intensidade ou situação anterior.",
    summary: ["Superioridade/inferioridade: más/menos... que.", "Igualdade: tan... como; tanto... como.", "Consecutivas: tan/tanto... que e outros nexos de resultado."],
    sections: [
      { heading: "Comparación", paragraphs: ["A comparação pode relacionar qualidades, quantidades ou ações."], examples: ["Ana es más alta que Luis.", "Trabaja tanto como yo.", "Es tan interesante como el otro."], tip: "Use tan com adjetivos/advérbios e tanto com substantivos ou verbos." },
      { heading: "Consecuencia", paragraphs: ["Construções consecutivas apresentam um efeito ou resultado."], examples: ["Estaba tan cansado que se durmió.", "Había tanta gente que no entramos."], tip: "A correlação tan/tanto... que une intensidade e consequência." }
    ],
    check: { q: "Complete: “Había ___ gente que no pudimos entrar.”", options: ["tan", "tanta", "tanto"], correct: 1, explanation: "Gente é substantivo feminino singular; usa-se tanta gente que..." }
  },
  {
    id: "causales-finales-ilativas",
    title: "Construcciones causales, finales e ilativas",
    level: "B2–C1",
    group: "Sintaxis compleja",
    category: "Causa y finalidad",
    time: "11 min",
    description: "Porque, como, ya que, para que, a fin de que e conectores de consequência lógica.",
    lead: "Essas construções relacionam eventos por causa, finalidade ou inferência/consequência discursiva.",
    summary: ["Porque e ya que introduzem causas.", "Para que e a fin de que introduzem finalidade.", "Por tanto e así que introduzem consequência ou conclusão."],
    sections: [
      { heading: "Causa y finalidad", paragraphs: ["Causais explicam o motivo de uma situação; finais apresentam o objetivo perseguido."], examples: ["No fui porque estaba enfermo.", "Como llovía, nos quedamos.", "Te llamo para que vengas."], tip: "Para que costuma exigir subjuntivo quando há sujeitos diferentes." },
      { heading: "Ilativas", paragraphs: ["Conectores ilativos apresentam uma consequência, inferência ou conclusão derivada do segmento anterior."], examples: ["Está cerrado; por tanto, volveremos mañana.", "No había trenes, así que fuimos en autobús."], tip: "Diferencie causa de consequência: porque introduz a razão; por tanto introduz a conclusão." }
    ],
    check: { q: "Complete: “Te lo explico para que lo ___.”", options: ["entiendes", "entiendas", "entenderás"], correct: 1, explanation: "Para que introduz finalidade e, com sujeito diferente, pede subjuntivo: entiendas." }
  },
  {
    id: "condicionales-concesivas",
    title: "Construcciones condicionales y concesivas",
    level: "B2–C1",
    group: "Sintaxis compleja",
    category: "Condición y concesión",
    time: "12 min",
    description: "Si, como, a menos que, aunque, por mucho que e correlação de tempos.",
    lead: "Condicionais estabelecem uma condição para outra situação; concessivas apresentam um obstáculo que não impede o resultado principal.",
    summary: ["Si + presente pode combinar com presente, futuro ou imperativo.", "Hipótese irreal: si + imperfecto de subjuntivo + condicional.", "Aunque pode combinar com indicativo ou subjuntivo conforme a perspectiva."],
    sections: [
      { heading: "Condicionales", paragraphs: ["Condições reais, possíveis ou irreais usam correlações verbais diferentes."], examples: ["Si tengo tiempo, voy.", "Si tengo tiempo, iré.", "Si tuviera tiempo, iría.", "Si lo hubiera sabido, habría ido."], tip: "Depois de si condicional, não se usa futuro simples na oração introduzida por si." },
      { heading: "Concesivas", paragraphs: ["Aunque, a pesar de que e por mucho que introduzem uma circunstância que não altera o resultado principal."], examples: ["Aunque llueve, salgo.", "Aunque llueva, saldré.", "Por mucho que insistas, no cambiaré de opinión."], tip: "Indicativo tende a apresentar a informação como assumida; subjuntivo pode apresentá-la como possível, irrelevante ou não afirmada." }
    ],
    check: { q: "Complete: “Si tuviera más tiempo, ___ contigo.”", options: ["voy", "iría", "iré"], correct: 1, explanation: "A estrutura si + imperfecto de subjuntivo combina com o condicional: iría." }
  },
  {
    id: "acentuacion",
    title: "Acentuación ortográfica",
    level: "A1–A2",
    group: "Ortografía y contrastes",
    category: "Ortografía",
    time: "8 min",
    description: "Agudas, llanas, esdrújulas, hiatos e tilde diacrítica.",
    lead: "A acentuação gráfica do espanhol segue padrões regulares ligados à sílaba tônica e à terminação da palavra.",
    summary: ["Agudas: regra ligada a vogal, -n e -s.", "Llanas: regra complementar.", "Esdrújulas sempre levam tilde.", "Tilde diacrítica distingue pares como tú/tu."],
    sections: [
      { heading: "Agudas, llanas y esdrújulas", paragraphs: ["Agudas têm tonicidade final; llanas, penúltima; esdrújulas, antepenúltima."], examples: ["canción", "lápiz", "música"], tip: "Localize a sílaba tônica antes de aplicar a regra gráfica." },
      { heading: "Tilde diacrítica e hiato", paragraphs: ["A tilde pode distinguir palavras funcionais e também marcar hiato quando uma vogal fechada é tônica."], examples: ["tú / tu", "él / el", "país", "María"], tip: "A tilde diacrítica depende da função e do significado, não apenas da tonicidade." }
    ],
    check: { q: "Qual forma está corretamente acentuada?", options: ["cancion", "canción", "cáncion"], correct: 1, explanation: "Canción é aguda terminada em -n e recebe tilde." }
  },
  {
    id: "puntuacion",
    title: "Signos de puntuación e interrogación",
    level: "A1–A2",
    group: "Ortografía y contrastes",
    category: "Puntuación",
    time: "8 min",
    description: "¿? e ¡!, vírgula, ponto, dois-pontos e organização gráfica do enunciado.",
    lead: "A pontuação organiza o texto, delimita unidades e expressa valores interrogativos, exclamativos e discursivos.",
    summary: ["Perguntas usam ¿...?", "Exclamações usam ¡...!", "Vírgula não separa sujeito e verbo sem motivo estrutural.", "Dois-pontos introduzem explicações, enumerações e falas em certos contextos."],
    sections: [
      { heading: "Signos dobles", paragraphs: ["O espanhol usa sinais de abertura e fechamento em perguntas e exclamações."], examples: ["¿Cómo te llamas?", "¡Qué sorpresa!"], tip: "O sinal de abertura ajuda a indicar desde onde começa a entonação especial." },
      { heading: "Coma, punto y dos puntos", paragraphs: ["Vírgulas marcam incisos e certos conectores; o ponto fecha unidades; os dois-pontos introduzem desenvolvimento ou enumeração."], examples: ["Sin embargo, no vino.", "Compré tres cosas: pan, leche y café."], tip: "Evite vírgula entre sujeito e verbo em uma oração simples." }
    ],
    check: { q: "Qual frase está pontuada corretamente?", options: ["¿Dónde vives?", "Dónde vives?", "¿Dónde vives."], correct: 0, explanation: "Perguntas diretas em espanhol usam sinal de abertura e de fechamento." }
  },
  {
    id: "contrastes-portugues",
    title: "Contrastes português–espanhol",
    level: "A2–B1",
    group: "Ortografía y contrastes",
    category: "Contrastes",
    time: "10 min",
    description: "Heterogenéricos, heterotônicos, falsos cognatos e interferências frequentes.",
    lead: "A proximidade entre português e espanhol facilita a aprendizagem, mas também cria interferências que merecem atenção consciente.",
    summary: ["Algumas palavras mudam de gênero entre as línguas.", "A sílaba tônica pode divergir.", "Falsos cognatos têm forma semelhante e significado diferente."],
    sections: [
      { heading: "Gênero e tonicidade", paragraphs: ["Palavras formalmente semelhantes podem apresentar gênero ou tonicidade diferente entre português e espanhol."], examples: ["el viaje", "la leche", "teléfono", "academia"], tip: "Aprenda forma, gênero e pronúncia como um conjunto." },
      { heading: "Falsos cognatos", paragraphs: ["Algumas palavras semelhantes ativam significados diferentes e geram erros de interpretação."], examples: ["embarazada = grávida", "apellido = sobrenome", "oficina = escritório"], tip: "Desconfie de palavras muito parecidas quando o contexto não confirmar o significado." }
    ],
    check: { q: "O que significa “apellido”?", options: ["sobrenome", "apelido", "endereço"], correct: 0, explanation: "Apellido significa sobrenome; apelido em português corresponde a apodo em muitos contextos." }
  }
];

const grammarData = Object.fromEntries(grammarLessons.map((lesson) => [lesson.id, lesson]));
const grammarScreen = document.getElementById("grammar-screen");
const grammarReaderScreen = document.getElementById("grammar-reader-screen");
const grammarGrid = document.getElementById("grammar-grid");
let currentGrammarId = null;
let grammarCategoryFilter = "all";
let grammarLevelFilter = "all";
let grammarSearchTerm = "";

function grammarIsStudied(id) {
  try { return localStorage.getItem(`vae-grammar-${id}`) === "yes"; } catch { return false; }
}

function grammarGroups() {
  return [...new Set(grammarLessons.map((lesson) => lesson.group))];
}

function setupGrammarToolbar() {
  const toolbar = document.querySelector(".grammar-toolbar");
  if (!toolbar) return;
  toolbar.innerHTML = `
    <input class="grammar-search" id="grammar-search" type="search" placeholder="Buscar tema de gramática..." aria-label="Buscar tema de gramática" />
    <label class="grammar-select-wrap">Categoria
      <select class="grammar-select" id="grammar-category-select" aria-label="Filtrar gramática por categoria">
        <option value="all">Todas as categorias</option>
        ${grammarGroups().map((group) => `<option value="${group}">${group}</option>`).join("")}
      </select>
    </label>
    <label class="grammar-select-wrap">Nível
      <select class="grammar-select" id="grammar-level-select" aria-label="Filtrar gramática por nível">
        <option value="all">Todos os níveis</option>
        <option value="A1–A2">A1–A2</option>
        <option value="A2–B1">A2–B1</option>
        <option value="B1–B2">B1–B2</option>
        <option value="B2–C1">B2–C1</option>
      </select>
    </label>`;

  document.getElementById("grammar-search")?.addEventListener("input", (event) => {
    grammarSearchTerm = event.target.value.trim().toLocaleLowerCase("pt-BR");
    renderGrammarCards();
  });
  document.getElementById("grammar-category-select")?.addEventListener("change", (event) => {
    grammarCategoryFilter = event.target.value;
    renderGrammarCards();
  });
  document.getElementById("grammar-level-select")?.addEventListener("change", (event) => {
    grammarLevelFilter = event.target.value;
    renderGrammarCards();
  });
}

function injectGrammarEnhancementStyles() {
  const style = document.createElement("style");
  style.textContent = `
    .grammar-toolbar{display:grid;grid-template-columns:minmax(240px,1fr) minmax(200px,.55fr) minmax(170px,.4fr);align-items:end;gap:12px}
    .grammar-search,.grammar-select{width:100%;min-height:44px;border:1px solid var(--line);border-radius:12px;background:#fff;color:var(--ink);padding:10px 13px;font:inherit}
    .grammar-search:focus,.grammar-select:focus{outline:2px solid rgba(143,29,44,.15);border-color:rgba(143,29,44,.42)}
    .grammar-select-wrap{display:grid;gap:6px;color:var(--muted);font-size:.76rem;font-weight:900;letter-spacing:.04em;text-transform:uppercase}
    .grammar-select{font-weight:800;text-transform:none;letter-spacing:normal;color:var(--red-dark);cursor:pointer}
    .grammar-card-group{display:inline-flex;align-self:flex-start;margin:0 0 8px;border-radius:999px;padding:5px 9px;background:#fff6f0;color:var(--red-dark);font-size:.69rem;font-weight:900}
    .grammar-empty{grid-column:1/-1;border:1px dashed var(--line);border-radius:18px;padding:26px;color:var(--muted);text-align:center;background:rgba(255,255,255,.55)}
    @media(max-width:800px){.grammar-toolbar{grid-template-columns:1fr 1fr}.grammar-search{grid-column:1/-1}}
    @media(max-width:560px){.grammar-toolbar{grid-template-columns:1fr}.grammar-search{grid-column:auto}}
  `;
  document.head.appendChild(style);
}

function updateGrammarMetadata() {
  const sourceNote = document.querySelector(".grammar-source-note");
  if (sourceNote) {
    sourceNote.innerHTML = `<strong>Bases temáticas:</strong> SABINO, Maria de Lourdes. <em>Minimanual compacto de gramática língua espanhola: teoria e prática</em>. Rideel, 2005; e REAL ACADEMIA ESPAÑOLA; ASOCIACIÓN DE ACADEMIAS DE LA LENGUA ESPAÑOLA. <em>Nueva gramática básica de la lengua española</em>. Espasa, 2011. As aulas desta plataforma são sínteses e explicações didáticas autorais, organizadas a partir dos temas dessas obras, sem reprodução integral de textos ou exercícios.`;
  }
  document.querySelectorAll(".hero-stat").forEach((stat) => {
    const label = stat.querySelector("span");
    const number = stat.querySelector("strong");
    if (label?.textContent.includes("lecciones de gramática") && number) number.textContent = String(grammarLessons.length);
  });
}

function hideGrammarScreens() {
  grammarScreen?.classList.add("hidden");
  grammarReaderScreen?.classList.add("hidden");
}

function hideMainLearningScreensForGrammar() {
  ["home-screen", "level-screen", "quiz-screen", "result-screen", "activity-screen", "activity-result-screen", "vocabulary-screen", "vocabulary-reader-screen", "readings-screen", "reader-screen"].forEach((id) => {
    document.getElementById(id)?.classList.add("hidden");
  });
}

function setGrammarNavActive() {
  document.querySelectorAll(".main-nav .nav-link").forEach((button) => {
    button.classList.toggle("active", button.dataset.route === "grammar");
  });
}

function showGrammarLibrary() {
  hideMainLearningScreensForGrammar();
  grammarReaderScreen?.classList.add("hidden");
  grammarScreen?.classList.remove("hidden");
  setGrammarNavActive();
  renderGrammarCards();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderGrammarCards() {
  if (!grammarGrid) return;
  grammarGrid.innerHTML = "";
  const matches = grammarLessons.filter((lesson) => {
    const matchesCategory = grammarCategoryFilter === "all" || lesson.group === grammarCategoryFilter;
    const matchesLevel = grammarLevelFilter === "all" || lesson.level === grammarLevelFilter;
    const haystack = `${lesson.title} ${lesson.description} ${lesson.category} ${lesson.group} ${lesson.summary.join(" ")}`.toLocaleLowerCase("pt-BR");
    return matchesCategory && matchesLevel && (!grammarSearchTerm || haystack.includes(grammarSearchTerm));
  });

  matches.forEach((lesson) => {
    const card = document.createElement("article");
    card.className = "grammar-card";
    card.innerHTML = `
      <div class="grammar-card-top">
        <span class="grammar-level">${lesson.level}</span>
        <span class="grammar-time">${lesson.time}</span>
      </div>
      <span class="grammar-card-group">${lesson.group}</span>
      <p class="grammar-category">${lesson.category}</p>
      <h2>${lesson.title}</h2>
      <p>${lesson.description}</p>
      <div class="grammar-card-footer">
        <button class="primary-button" type="button" data-open-grammar="${lesson.id}">Estudiar</button>
        <span class="grammar-status">${grammarIsStudied(lesson.id) ? "✓ Estudiada" : ""}</span>
      </div>`;
    grammarGrid.appendChild(card);
  });

  if (!matches.length) {
    grammarGrid.innerHTML = '<p class="grammar-empty">Nenhuma aula encontrada com esses filtros.</p>';
  }

  grammarGrid.querySelectorAll("[data-open-grammar]").forEach((button) => {
    button.addEventListener("click", () => openGrammarLesson(button.dataset.openGrammar));
  });
}

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
  grammarScreen?.classList.add("hidden");
  grammarReaderScreen?.classList.remove("hidden");
  setGrammarNavActive();

  grammarReaderTitle.textContent = lesson.title;
  grammarArticleMeta.innerHTML = `<span>${lesson.level}</span><span>${lesson.group}</span><span>${lesson.category}</span><span>${lesson.time}</span>`;
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

document.getElementById("grammar-reader-back")?.addEventListener("click", showGrammarLibrary);

grammarMarkButton?.addEventListener("click", () => {
  if (!currentGrammarId) return;
  try { localStorage.setItem(`vae-grammar-${currentGrammarId}`, "yes"); } catch { /* armazenamento pode estar bloqueado */ }
  grammarMarkButton.textContent = "Estudiada ✓";
  grammarSavedNote.textContent = "✓ Progresso salvo neste navegador.";
});

document.getElementById("grammar-check-button")?.addEventListener("click", () => {
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
  if (button.dataset.route !== "grammar") button.addEventListener("click", hideGrammarScreens);
});

setupGrammarToolbar();
injectGrammarEnhancementStyles();
updateGrammarMetadata();
renderGrammarCards();