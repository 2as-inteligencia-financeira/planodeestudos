-- Planos de estudo criados por admin/mentor
create table if not exists planos (
  id          uuid primary key default gen_random_uuid(),
  nome        text not null,
  descricao   text,
  arquivo_nome text,
  conteudo    jsonb not null,   -- conteúdo parseado do .ts (EditalPlanner)
  criado_por  uuid references profiles(id) on delete set null,
  created_at  timestamptz default now()
);

alter table planos enable row level security;

create policy "Admin e mentor gerenciam planos"
  on planos for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin','mentor'))
  )
  with check (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin','mentor'))
  );

create policy "Aluno vê planos vinculados a ele"
  on planos for select
  using (
    exists (select 1 from aluno_planos where plano_id = planos.id and aluno_id = auth.uid())
  );

-- Vínculo plano ↔ aluno
create table if not exists aluno_planos (
  aluno_id    uuid references profiles(id) on delete cascade,
  plano_id    uuid references planos(id) on delete cascade,
  ativo       boolean default true,
  created_at  timestamptz default now(),
  primary key (aluno_id, plano_id)
);

alter table aluno_planos enable row level security;

create policy "Admin e mentor gerenciam vínculos"
  on aluno_planos for all
  using (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin','mentor'))
  )
  with check (
    exists (select 1 from profiles where id = auth.uid() and role in ('admin','mentor'))
  );

create policy "Aluno vê seus próprios vínculos"
  on aluno_planos for select
  using (auth.uid() = aluno_id);
