# Vamos a Estudiar Español — Quiz, Gramática, Vocabulario e Lecturas

Aplicação educacional desenvolvida como projeto complementar à iniciativa **Vamos a Estudiar Español**, voltada ao ensino e à aprendizagem da língua espanhola.

## Demonstração online

**Acesse o projeto:** https://sasilva-cyber.github.io/vamos-a-estudiar-espanol-quiz/

**Site principal:** http://vamosaestudiarespanol.com.br/

## Sobre o projeto

A aplicação reúne quatro experiências de aprendizagem em uma mesma interface:

- **Quiz**, com níveis A1–C2, testes temáticos, atividades e gabarito detalhado;
- **Gramática**, com uma biblioteca de aulas, filtros por categoria e nível, busca, exemplos e prática rápida;
- **Vocabulario**, com campos temáticos, comparação espanhol–português e exercícios rápidos;
- **Lecturas**, com histórias em espanhol, glossário e atividades de compreensão leitora.

A plataforma também está evoluindo para uma **Área do Estudiante** autenticada com Supabase, destinada a materiais de estudo, videoaulas e conteúdos exclusivos. A autenticação usa e-mail e senha, confirmação por e-mail, recuperação de acesso e armazenamento privado protegido por políticas de segurança.

## Segurança da Área do Estudiante

- autenticação processada pelo Supabase Auth;
- perfis protegidos por Row Level Security (RLS);
- materiais exclusivos armazenados em bucket privado;
- nenhuma chave administrativa deve ser publicada no repositório;
- somente a publishable key própria para front-end é usada no navegador.

## Tecnologias utilizadas

- **HTML5**;
- **CSS3**;
- **JavaScript**;
- **Supabase Auth / PostgreSQL / Storage** para a área autenticada;
- **GitHub Pages** para publicação da aplicação web.

## Responsável pelo projeto

**Samantha Bezerra da Silva**
