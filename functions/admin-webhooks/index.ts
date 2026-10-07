import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, departments, isAdmin, isDiscordWebhook, json } from '../_shared/security.ts';

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok',{headers:corsHeaders(req)});
  if (!isAdmin(req)) return json(req,{error:'Unauthorized'},401);
  const supabase = createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

  if (req.method === 'GET') {
    const {data,error} = await supabase.from('department_webhooks').select('department,ticket_webhook_url,report_webhook_url').order('department');
    return error ? json(req,{error:error.message},500) : json(req,{departments:data});
  }
  if (req.method !== 'POST') return json(req,{error:'Method not allowed'},405);

  const body = await req.json().catch(()=>null);
  if (!body || !departments.has(body.department)) return json(req,{error:'Invalid department'},400);
  const ticket = String(body.ticket_webhook_url || '').trim() || null;
  const report = String(body.report_webhook_url || '').trim() || null;
  if ((ticket&&!isDiscordWebhook(ticket))||(report&&!isDiscordWebhook(report))) return json(req,{error:'Invalid Discord webhook'},400);
  const {error} = await supabase.from('department_webhooks').upsert({department:body.department,ticket_webhook_url:ticket,report_webhook_url:report});
  return error ? json(req,{error:error.message},500) : json(req,{ok:true});
});

