# Vamos a Estudiar Español — Quiz, Gramática, Vocabulario e Lecturas

Aplicação educacional desenvolvida como projeto complementar à iniciativa **Vamos a Estudiar Español**, voltada ao ensino e à aprendizagem da língua espanhola.

## Demonstração online

**Acesse o projeto:** https://sasilva-cyber.github.io/vamos-a-estudiar-espanol-quiz/

**Site principal:** http://vamosaestudiarespanol.com.br/

## Sobre o projeto

A aplicação reúne quatro experiências de aprendizagem em uma mesma interface:

- **Quiz**, com níveis A1–C2, testes temáticos, simulados e gabarito detalhado;
- **Gramática**, com aulas curtas, exemplos, sínteses e prática rápida;
- **Vocabulario**, com campos temáticos, comparação espanhol–português e exercícios rápidos;
- **Lecturas**, com histórias em espanhol, glossário e atividades de compreensão leitora.

A identidade visual utiliza a letra **Ñ**, tipografia editorial e uma paleta em vermelho, dourado e tons quentes.

## Quiz e testes

A área **Quiz** possui duas formas de prática.

### Quiz por níveis

- **Básico — A1–A2**;
- **Intermediário — B1–B2**;
- **Avançado — C1–C2**.

São 30 questões, com 10 perguntas por nível, ordem embaralhada, feedback explicativo depois de cada resposta, pontuação, progresso e registro local da melhor pontuação.

### Testes e atividades com gabarito final

Foram adicionadas 6 atividades temáticas com 10 questões cada, totalizando mais 60 itens:

- **Gramática essencial — A1–A2**;
- **Verbos e tempos — B1–B2**;
- **Pronomes e preposições — A2–B1**;
- **Vocabulário cotidiano — A1–A2**;
- **Compreensão de frases e expressões — B1–B2**;
- **Desafio avançado — C1–C2**.

Nessas atividades, a correção não é mostrada durante o teste. Ao final, o estudante recebe pontuação e um **gabarito detalhado**, com sua resposta, a alternativa correta e uma explicação para cada questão.

O projeto passa, assim, a reunir **90 questões e atividades** na área de prática avaliativa.

As faixas A1–C2 são utilizadas como referência pedagógica de dificuldade. Os testes não substituem um exame oficial de proficiência.

## Gramática del español

A seção **Gramática** foi organizada como uma biblioteca de estudo para estudantes brasileiros, com explicações em português, exemplos em espanhol, resumo dos pontos-chave, uma atividade rápida de verificação e opção de marcar cada aula como estudada.

A versão atual possui 12 aulas:

- Acentuación ortográfica;
- Los artículos: el, la, lo, un, una;
- Pronombres personales;
- Sustantivos: género y plural;
- Verbos regulares e irregulares;
- Indicativo, subjuntivo e tempos do passado;
- Los numerales;
- Adjetivos: concordância, posição e comparação;
- Pronombres relativos;
- Por, para e outras preposições;
- Heterotónicos, heterogenéricos e falsos cognatos;
- Signos de puntuación e interrogativos.

A organização temática foi desenvolvida a partir de **SABINO, Maria de Lourdes. _Minimanual compacto de gramática língua espanhola: teoria e prática_. 1. ed. São Paulo: Rideel, 2005**. Os textos publicados na aplicação são sínteses e explicações didáticas originais: a obra é utilizada como referência temática, sem reprodução integral de seu conteúdo ou de seus exercícios.

## Vocabulario por temas

A seção **Vocabulario** reúne 22 campos temáticos com termos em espanhol, equivalentes em português, frase de exemplo e uma prática de cinco questões gerada a partir do próprio conjunto de palavras.

Temas disponíveis:

- Alimentación;
- Carnes y pescados;
- Comidas, condimentos y meriendas;
- Frutas;
- Postres;
- Vegetales;
- Bebidas;
- Transporte;
- Saludos y despedidas;
- Preguntas útiles;
- Profesiones;
- Familia;
- Estaciones del año;
- Escuela y universidad;
- Trabajo y ambiente profesional;
- Días, meses y calendario;
- Partes del cuerpo humano;
- Cómo describir a una persona;
- Colores;
- La casa;
- Muebles;
- Objetos de la casa.

A biblioteca permite busca por palavra ou tema, filtros por área e marcação local dos conteúdos estudados.

## Biblioteca de Lecturas

A seção **Lecturas** foi criada para desenvolver compreensão escrita em espanhol. Cada leitura apresenta nível sugerido, tempo aproximado, texto didático, glossário e perguntas de compreensão.

Leituras disponíveis nesta versão:

- **Ricitos de Oro y los tres osos** — A1–A2;
- **Los tres cerditos** — A1–A2;
- **Caperucita Roja** — A1–A2;
- **La paloma y la hormiga** — A2–B1.

Os textos são adaptações didáticas originais de narrativas tradicionais em domínio público. O progresso de leitura pode ser marcado e salvo localmente no navegador.

## Funcionalidades

- menu com **Inicio**, **Quiz**, **Gramática**, **Vocabulario** e **Lecturas**;
- três quizzes por nível com feedback imediato;
- seis testes temáticos com gabarito apenas no final;
- 90 questões e atividades na área avaliativa;
- gabarito detalhado com resposta do aluno, resposta correta e explicação;
- registro local de melhores resultados;
- biblioteca com 12 aulas de gramática e filtro por nível;
- explicações, exemplos, dicas e prática rápida em cada aula;
- biblioteca de vocabulário com 22 temas;
- busca por tema ou palavra e filtros por área;
- prática rápida de vocabulário em cada tema;
- marcação de conteúdos estudados;
- biblioteca de histórias com filtro por nível;
- glossário de vocabulário em cada leitura;
- atividade de compreensão ao final de cada história;
- marcação de leitura concluída;
- interface responsiva para computador e dispositivos móveis;
- navegação por teclado e atributos básicos de acessibilidade.

## Tecnologias utilizadas

- **HTML5** — estrutura semântica;
- **CSS3** — identidade visual e responsividade;
- **JavaScript** — lógica do quiz, navegação, bibliotecas, atividades e persistência local;
- **GitHub Pages** — publicação da aplicação na web.

## Estrutura do projeto

```text
vamos-a-estudiar-espanol-quiz/
├── index.html
├── style.css
├── script.js
├── quiz-activities.css
├── quiz-activities.js
├── readings.css
├── readings.js
├── grammar.css
├── grammar.js
├── vocabulary.css
├── vocabulary.js
├── .nojekyll
└── README.md
```

## Próximas evoluções

- adicionar simulados cumulativos com maior número de questões;
- criar filtros de testes por nível e conteúdo;
- adicionar novas aulas de gramática e exercícios de revisão;
- ampliar o vocabulário e criar revisão por palavras favoritas;
- adicionar novas leituras e filtros pedagógicos;
- desenvolver acompanhamento de progresso mais detalhado;
- ampliar testes de acessibilidade e usabilidade.

Entre as leituras planejadas estão adaptações didáticas de **Pinocho**, **El gato con botas** e **Aladino y el Genio de la lámpara**. Para obras com situação autoral específica, como **El Principito**, a proposta é trabalhar com resumo didático original e atividades, sem reproduzir traduções comerciais.

## Responsável pelo projeto

**Samantha Bezerra da Silva**