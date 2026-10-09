-- California Strafrechner - zentrale Webhook-Datenbank
-- Kompatibel mit PostgreSQL und dem Supabase SQL Editor.

begin;

create table if not exists public.department_webhooks (
  department varchar(8) primary key,
  ticket_webhook_url text,
  report_webhook_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint department_webhooks_department_check
    check (department in ('LAPD', 'LASD', 'CHP', 'USMS', 'USBP', 'CDFW')),

  constraint department_webhooks_ticket_url_check
    check (
      ticket_webhook_url is null
      or ticket_webhook_url ~ '^https://(discord(app)?\.com)/api/webhooks/[0-9]+/[A-Za-z0-9._-]+/?$'
    ),

  constraint department_webhooks_report_url_check
    check (
      report_webhook_url is null
      or report_webhook_url ~ '^https://(discord(app)?\.com)/api/webhooks/[0-9]+/[A-Za-z0-9._-]+/?$'
    )
);

insert into public.department_webhooks (department)
values
  ('LAPD'),
  ('LASD'),
  ('CHP'),
  ('USMS'),
  ('USBP'),
  ('CDFW')
on conflict (department) do nothing;

create or replace function public.update_department_webhook_timestamp()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists update_department_webhook_timestamp
  on public.department_webhooks;

create trigger update_department_webhook_timestamp
before update on public.department_webhooks
for each row
execute function public.update_department_webhook_timestamp();

-- Browser dürfen die geheimen Webhook-Adressen weder lesen noch verändern.
alter table public.department_webhooks enable row level security;
revoke all on table public.department_webhooks from anon, authenticated;
revoke execute on function public.update_department_webhook_timestamp() from anon, authenticated;

commit;

-- Beispiel für eine serverseitige Speicherung:
-- update public.department_webhooks
-- set ticket_webhook_url = 'https://discord.com/api/webhooks/ID/TOKEN',
--     report_webhook_url = 'https://discord.com/api/webhooks/ID/TOKEN'
-- where department = 'LAPD';

