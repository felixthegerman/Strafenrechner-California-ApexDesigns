export const departments = new Set(['LAPD','LASD','CHP','USMS','USBP','CDFW']);
export const webhookKinds = new Set(['ticket','report']);

export function corsHeaders(req: Request) {
  const allowed = Deno.env.get('ALLOWED_ORIGIN') || '';
  const origin = req.headers.get('origin') || '';
  return {
    'Access-Control-Allow-Origin': origin === allowed ? origin : allowed,
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-admin-password',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Vary': 'Origin',
  };
}

export function json(req: Request, body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {status, headers:{...corsHeaders(req),'Content-Type':'application/json'}});
}

export function isAdmin(req: Request) {
  const expected = Deno.env.get('ADMIN_PASSWORD') || '';
  const supplied = req.headers.get('x-admin-password') || '';
  if (!expected || expected.length !== supplied.length) return false;
  let different = 0;
  for (let index = 0; index < expected.length; index++) different |= expected.charCodeAt(index) ^ supplied.charCodeAt(index);
  return different === 0;
}

export function isDiscordWebhook(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && ['discord.com','discordapp.com'].includes(url.hostname)
      && /^\/api\/webhooks\/\d+\/[A-Za-z0-9._-]+\/?$/.test(url.pathname);
  } catch { return false; }
}

