-- user table
DROP TYPE IF EXISTS user_role CASCADE;
DROP TABLE IF EXISTS public.user CASCADE;

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

create policy "Individuals can delete their own users." ON public.user FOR
    delete using (auth.uid() = id);

DROP TYPE IF exists lang cascade;
DROP TABLE IF EXISTS public.form CASCADE;

CREATE TYPE lang AS ENUM('ko','en');

CREATE TABLE form (
    id SERIAL PRIMARY KEY,
    lang lang NOT NULL DEFAULT 'ko',
    title TEXT NOT NULL,
    forms JSONB NOT NULL,
    escapeValidate JSONB,
    create_user UUID REFERENCES public.user(id) ON DELETE CASCADE
);


CREATE POLICY "관리자는 폼을 생성할 수 있습니다." 
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

CREATE policy "사용자는 자신이 만든 폼을 볼 수 있습니다." on public.form for
    select using (auth.uid() = create_user);

CREATE policy "사용자는 자신이 만든 폼을 업데이트할 수 있습니다." on public.form for
    update using (auth.uid() = create_user);

CREATE policy "사용자는 자신이 만든 폼을 삭제할 수 있습니다." on public.form for
    delete using (auth.uid() = create_user);

DROP TABLE IF EXISTS public.form_answer CASCADE;

CREATE TABLE form_answer (
    id SERIAL PRIMARY KEY,
    answer_form_id int REFERENCES public.form(id) ON DELETE CASCADE,
    answer_user UUID REFERENCES public.user(id) ON DELETE CASCADE,
    answers JSONB NOT NULL
);

ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_answer ENABLE ROW LEVEL SECURITY;

-- form insert 시 user id 삽입하는 트리거 함수 생성
CREATE OR REPLACE FUNCTION public.set_create_user()
RETURNS TRIGGER
language plpgsql
security definer set search_path = ''
AS $$
BEGIN
  NEW.create_user := auth.uid();
  RETURN NEW;
END;
$$;

-- 기존 트리거가 있을 경우 삭제
DROP TRIGGER IF EXISTS before_insert_set_create_user ON public.form;

-- 새로운 트리거 생성
CREATE TRIGGER before_insert_set_create_user
BEFORE INSERT ON public.form
FOR EACH ROW
EXECUTE FUNCTION public.set_create_user();
