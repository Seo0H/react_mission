CREATE DOMAIN user_role_domain AS user_role
DEFAULT 'default';

create table public.user (
  id uuid not null references auth.users on delete cascade,
  name text,
  email text,
  role user_role_domain NOT NULL,
  
  primary key (id)
);

alter table public.user enable row level security;

-- inserts a row into public.profiles
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
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create policy "Individuals can create users." on public.user for
    insert with check (auth.uid() = id);

create policy "Individuals can view their own users." on public.user for
    select using (auth.uid() = id);

create policy "Individuals can update their own users." on public.user for
    update using (auth.uid() = id);

create policy "Individuals can delete their own users." on public.user for
    delete using (auth.uid() = id);