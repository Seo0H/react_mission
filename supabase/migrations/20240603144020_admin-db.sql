-- user table
DROP TYPE IF EXISTS user_role CASCADE;
CREATE TYPE user_role AS ENUM('default','admin');

create table public.user (
  id uuid not null references auth.users on delete cascade,
  name text,
  email text,
  role user_role NOT NULL DEFAULT 'default',
  
  primary key (id)
);



DROP function IF EXISTS handle_new_user() CASCADE;
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.user (id, name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'email');
  return new;
end;
$$;

-- trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON public.user CASCADE;
CREATE TRIGGER on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- create policy "Individuals can create users." on public.user for
--     insert with check (auth.uid() = id);

create policy "Individuals can view their own users." on public.user for
    select using (auth.uid() = id);

create policy "Individuals can update their own users." on public.user for
    update using (auth.uid() = id);

create policy "Individuals can delete their own users." on public.user for
    delete using (auth.uid() = id);

DROP TYPE IF exists lang cascade;
CREATE TYPE lang AS ENUM('ko','en');

CREATE TABLE form (
    id SERIAL PRIMARY KEY,
    lang lang NOT NULL DEFAULT 'ko',
    title TEXT NOT NULL,
    forms JSONB NOT NULL,
    escapeValidate JSONB,
    create_user UUID REFERENCES public.user(id) ON DELETE CASCADE
);

CREATE POLICY "Admin can create form." 
ON public.form 
FOR INSERT 
WITH CHECK (
    EXISTS (
        SELECT 1 
        FROM public.user 
        WHERE public.user.id = auth.uid() 
          AND public.user.role = 'admin'
    )
);

CREATE policy "Create user can view their own form." on public.form for
    select using (auth.uid() = create_user);

CREATE policy "Create user can update their own form." on public.form for
    update using (auth.uid() = create_user);

CREATE policy "Create user can delete their own form." on public.form for
    delete using (auth.uid() = create_user);


CREATE TABLE form_answer (
    id SERIAL PRIMARY KEY,
    answer_form_id int REFERENCES public.form(id) ON DELETE CASCADE,
    answer_user UUID REFERENCES public.user(id) ON DELETE CASCADE,
    answers JSONB NOT NULL
);

ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_answer ENABLE ROW LEVEL SECURITY;
