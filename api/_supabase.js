// Tiny Supabase REST helper (server only). Keys come from Vercel env vars and never reach the browser.
const URL_ = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, '').replace(/\/+$/, '');
const KEY = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
const enabled = Boolean(URL_ && KEY);
const DEVICE_RE = /^[a-zA-Z0-9-]{8,64}$/;

function headers(extra) {
  // Legacy service_role keys are JWTs (eyJ...) and go in both headers; new secret keys (sb_secret_...) go in apikey only.
  const h = { apikey: KEY, 'Content-Type': 'application/json', ...extra };
  if (KEY.startsWith('eyJ')) h.Authorization = `Bearer ${KEY}`;
  return h;
}

async function loadHistory(device, limit = 12) {
  if (!enabled || !DEVICE_RE.test(device || '')) return [];
  try {
    const r = await fetch(`${URL_}/rest/v1/milo_messages?device_id=eq.${encodeURIComponent(device)}&select=role,content,created_at&order=created_at.desc&limit=${limit}`, { headers: headers() });
    if (!r.ok) return [];
    const rows = await r.json();
    return rows.reverse().map(m => ({ role: m.role, content: m.content }));
  } catch { return []; }
}

async function saveMessages(device, msgs) {
  if (!enabled || !DEVICE_RE.test(device || '') || !msgs.length) return false;
  try {
    const rows = msgs
      .filter(m => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
      .map(m => ({ device_id: device, role: m.role, content: m.content.slice(0, 2000) }));
    if (!rows.length) return false;
    const r = await fetch(`${URL_}/rest/v1/milo_messages`, { method: 'POST', headers: headers({ Prefer: 'return=minimal' }), body: JSON.stringify(rows) });
    return r.ok;
  } catch { return false; }
}

async function clearHistory(device) {
  if (!enabled || !DEVICE_RE.test(device || '')) return false;
  try {
    const r = await fetch(`${URL_}/rest/v1/milo_messages?device_id=eq.${encodeURIComponent(device)}`, { method: 'DELETE', headers: headers() });
    return r.ok;
  } catch { return false; }
}

async function ping() {
  if (!enabled) return 'not set';
  if (!/^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(URL_)) return `SUPABASE_URL looks wrong (should be like https://abcd.supabase.co)`;
  if (/^sb_publishable_/.test(KEY)) return 'that is the publishable/anon key; use the service_role (secret) key';
  try {
    const r = await fetch(`${URL_}/rest/v1/milo_messages?select=id&limit=1`, { headers: headers() });
    if (r.ok) return 'working';
    let body = {}; try { body = await r.json(); } catch {}
    const msg = String(body.message || body.msg || body.error || '');
    if (r.status === 401 || r.status === 403) {
      if (/role|permission/i.test(msg) || KEY_ROLE() === 'anon') return 'key has no access: use the service_role key, not the anon key';
      return 'key not accepted: re-copy the service_role key';
    }
    if (body.code === 'PGRST205' || body.code === '42P01' || /does not exist|could not find the table/i.test(msg)) return 'table missing: run supabase/schema.sql in the SQL Editor';
    return `error ${r.status} ${body.code || ''} ${msg}`.trim().slice(0, 160);
  } catch { return 'cannot reach SUPABASE_URL (check the address)'; }
}
function KEY_ROLE() { try { return JSON.parse(Buffer.from(KEY.split('.')[1], 'base64').toString()).role || ''; } catch { return ''; } }

module.exports = { ping, enabled, loadHistory, saveMessages, clearHistory, DEVICE_RE };
