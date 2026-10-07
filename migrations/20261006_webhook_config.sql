-- California Strafrechner: private department webhook storage.
-- Run with `supabase db push` or in the Supabase SQL editor.

create table if not exists public.department_webhooks (
  department text primary key check (department in ('LAPD','LASD','CHP','USMS','USBP','CDFW')),
  ticket_webhook_url text,
  report_webhook_url text,
  updated_at timestamptz not null default now(),
  constraint ticket_webhook_is_discord check (
    ticket_webhook_url is null or ticket_webhook_url ~ '^https://(discord(app)?\.com)/api/webhooks/[0-9]+/[A-Za-z0-9._-]+/?$'
  ),
  constraint report_webhook_is_discord check (
    report_webhook_url is null or report_webhook_url ~ '^https://(discord(app)?\.com)/api/webhooks/[0-9]+/[A-Za-z0-9._-]+/?$'
  )
);

alter table public.department_webhooks enable row level security;
revoke all on public.department_webhooks from anon, authenticated;

insert into public.department_webhooks (department)
values ('LAPD'),('LASD'),('CHP'),('USMS'),('USBP'),('CDFW')
on conflict (department) do nothing;

create or replace function public.set_webhook_updated_at()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists department_webhooks_updated_at on public.department_webhooks;
create trigger department_webhooks_updated_at
before update on public.department_webhooks
for each row execute function public.set_webhook_updated_at();

