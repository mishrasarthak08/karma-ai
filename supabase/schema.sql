create table karma_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  task text,
  status text default 'pending',
  due_date date default current_date
);

create table karma_memory (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  event text,
  emotion text,
  timestamp timestamptz default now()
);

create table karma_score (
  user_id uuid references auth.users,
  date date default current_date,
  score integer
);
