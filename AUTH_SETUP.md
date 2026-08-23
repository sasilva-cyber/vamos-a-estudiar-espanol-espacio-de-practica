# Área do Estudiante — configuração de autenticação

A interface de Cadastro, Login e Área do Estudiante está preparada para Supabase Auth.

## Segurança

O repositório é público. Portanto:

- `SUPABASE_URL` e a chave pública `anon` podem ser usadas no front-end;
- **nunca** publicar `service_role`, senha do banco, token administrativo ou qualquer segredo;
- materiais exclusivos não devem ser adicionados como arquivos públicos do GitHub;
- PDFs, áudios e outros arquivos restritos devem ficar em um bucket **privado** no Supabase Storage;
- a autorização deve ser aplicada no backend por RLS/policies, e não apenas escondendo botões no JavaScript.

## 1. Supabase Auth

Ativar autenticação por e-mail e senha e manter confirmação de e-mail habilitada.

URLs autorizadas sugeridas:

- Site URL: `https://pratica.vamosaestudiarespanol.com.br`
- Redirect: `https://pratica.vamosaestudiarespanol.com.br/login/`
- Redirect: `https://pratica.vamosaestudiarespanol.com.br/aluno/`
- Opcional para homologação no GitHub Pages: `https://sasilva-cyber.github.io/vamos-a-estudiar-espanol-espacio-de-practica/**`

Depois de criar o projeto, preencher `auth-config.js` somente com os valores públicos:

```js
window.VAE_AUTH_CONFIG = Object.freeze({
  supabaseUrl: "https://SEU-PROJETO.supabase.co",
  supabaseAnonKey: "SUA_CHAVE_PUBLICA_ANON",
  siteUrl: "https://pratica.vamosaestudiarespanol.com.br"
});
```

## 2. Perfil do estudante

Estrutura recomendada:

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  newsletter_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);
```

Um trigger pode criar o perfil automaticamente a partir de `auth.users.raw_user_meta_data` após o cadastro.

## 3. Materiais exclusivos

Criar bucket privado, por exemplo `student-materials`.

A política mínima deve permitir leitura apenas para usuários autenticados. Se futuramente houver planos gratuitos/premium, a política deverá validar também o nível de acesso do estudante.

Não disponibilizar URL pública permanente para materiais privados. Preferir downloads autenticados ou signed URLs de curta duração.

## 4. Eventos Analytics preparados

O front-end registra, quando o Analytics está disponível:

- `sign_up`
- `login`
- `logout`
- `password_reset_request`
- `password_reset_complete`
- `student_area_view`

## 5. Antes de publicar

1. Criar/conectar projeto Supabase.
2. Configurar Auth e redirects.
3. Aplicar schema e RLS.
4. Preencher apenas URL + anon key em `auth-config.js`.
5. Testar cadastro real, confirmação de e-mail, login, recuperação, sessão expirada e logout.
6. Testar diretamente o acesso a `/aluno/` sem sessão.
7. Somente então adicionar links de Cadastro/Login à navegação pública e mesclar a branch na `main`.
