# Área do Estudiante — autenticação com Supabase

A infraestrutura já está conectada ao projeto Supabase `clfwoywzalttkvhstsgh`.

## Implementado

- Supabase Auth por e-mail e senha no front-end;
- tabela `public.profiles` vinculada a `auth.users`;
- criação automática de perfil após cadastro;
- RLS para o estudante ler e atualizar apenas o próprio perfil;
- coluna `role` protegida contra alteração pelo navegador;
- bucket privado `materiais-exclusivos`;
- leitura do bucket apenas por usuários autenticados;
- funções internas de trigger sem permissão de execução via API;
- cadastro, login, recuperação de senha, logout e proteção de `/aluno/`;
- eventos de autenticação para Google Analytics.

## Segurança

O repositório é público. A `supabaseUrl` e a chave `sb_publishable_...` são próprias para uso no navegador. Nunca publicar `service_role`, senha do banco ou outros segredos administrativos.

Materiais exclusivos devem permanecer no bucket privado do Supabase Storage, nunca no repositório GitHub público.

## Configuração de URLs do Supabase Auth

No painel do Supabase, em **Authentication → URL Configuration**, usar:

- Site URL: `https://pratica.vamosaestudiarespanol.com.br`
- Redirect URL: `https://pratica.vamosaestudiarespanol.com.br/login/**`
- Redirect URL: `https://pratica.vamosaestudiarespanol.com.br/aluno/**`
- Para homologação no GitHub Pages: `https://sasilva-cyber.github.io/vamos-a-estudiar-espanol-espacio-de-practica/**`

Manter confirmação de e-mail habilitada em Authentication → Providers → Email.

## Fluxo de teste antes de publicar no menu

1. Criar conta em `/cadastro/`.
2. Confirmar o endereço pelo e-mail recebido.
3. Entrar em `/login/`.
4. Confirmar acesso a `/aluno/`.
5. Sair e tentar acessar `/aluno/` diretamente: deve redirecionar para `/login/`.
6. Testar “Esqueci minha senha”.
7. Depois dos testes, adicionar links visíveis de **Entrar** e **Criar conta** à navegação pública.
