-- Perfil do aluno
create table if not exists profiles (
  id         uuid references auth.users primary key,
  nome       text not null,
  email      text,
  objetivo   text,
  horas_dia  int default 3,
  role       text default 'aluno',
  mentor_id  uuid references profiles(id),
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Aluno vê e edita o próprio perfil"
  on profiles for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Mentor vê perfis dos seus alunos"
  on profiles for select
  using (auth.uid() = mentor_id);

-- Progresso do cronograma
create table if not exists progresso (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id) on delete cascade,
  concurso_id text not null,
  data        date not null,
  feito       boolean default true,
  updated_at  timestamptz default now(),
  unique(user_id, concurso_id, data)
);

alter table progresso enable row level security;

create policy "Aluno vê e edita o próprio progresso"
  on progresso for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Mentor vê progresso dos seus alunos"
  on progresso for select
  using (
    auth.uid() in (
      select mentor_id from profiles where id = user_id
    )
  );

-- Histórico de correções de discursiva
create table if not exists correcoes (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references profiles(id) on delete cascade,
  tema_id     text not null,
  nota_final  int not null,
  resposta    text,
  resultado   jsonb,
  created_at  timestamptz default now()
);

alter table correcoes enable row level security;

create policy "Aluno vê e insere suas correções"
  on correcoes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Mentor vê correções dos seus alunos"
  on correcoes for select
  using (
    auth.uid() in (
      select mentor_id from profiles where id = user_id
    )
  );

-- Vínculo mentor-aluno (fase 2)
create table if not exists mentor_alunos (
  mentor_id   uuid references profiles(id) on delete cascade,
  aluno_id    uuid references profiles(id) on delete cascade,
  concurso_id text,
  created_at  timestamptz default now(),
  primary key (mentor_id, aluno_id)
);

alter table mentor_alunos enable row level security;

create policy "Mentor gerencia seus alunos"
  on mentor_alunos for all
  using (auth.uid() = mentor_id)
  with check (auth.uid() = mentor_id);
