# Área do Estudiante — autenticação com Supabase

A infraestrutura está conectada ao projeto Supabase `clfwoywzalttkvhstsgh`.

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
- eventos de autenticação para Google Analytics;
- auditoria de segurança do Supabase sem alertas após o hardening.

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

## Fluxo de homologação antes de publicar links no menu

1. Configurar as URLs acima no painel do Supabase.
2. Mesclar a branch de homologação.
3. Criar conta em `/cadastro/`.
4. Confirmar o endereço pelo e-mail recebido.
5. Entrar em `/login/`.
6. Confirmar acesso a `/aluno/`.
7. Sair e tentar acessar `/aluno/` diretamente: deve redirecionar para `/login/`.
8. Testar “Esqueci minha senha”.
9. Depois dos testes, adicionar links visíveis de **Entrar** e **Criar conta** à navegação pública.
