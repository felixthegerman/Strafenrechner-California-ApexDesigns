import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, departments, isAdmin, json, webhookKinds } from '../_shared/security.ts';

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok',{headers:corsHeaders(req)});
  if (req.method !== 'POST') return json(req,{error:'Method not allowed'},405);
  if (!isAdmin(req)) return json(req,{error:'Unauthorized'},401);
  const body = await req.json().catch(()=>null);
  if (!body || !departments.has(body.department) || !webhookKinds.has(body.kind) || typeof body.payload !== 'object') return json(req,{error:'Invalid request'},400);
  const encoded = JSON.stringify(body.payload);
  if (encoded.length > 28000) return json(req,{error:'Payload too large'},413);

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const column = body.kind === 'ticket' ? 'ticket_webhook_url' : 'report_webhook_url';
  const {data,error} = await supabase.from('department_webhooks').select(column).eq('department',body.department).single();
  if (error || !data?.[column]) return json(req,{error:'Webhook not configured'},404);
  const discord = await fetch(data[column],{method:'POST',headers:{'Content-Type':'application/json'},body:encoded});
  if (!discord.ok) return json(req,{error:`Discord HTTP ${discord.status}`,detail:(await discord.text()).slice(0,200)},502);
  return json(req,{ok:true});
});

