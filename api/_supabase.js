// Tiny Supabase REST helper (server only). Keys come from Vercel env vars and never reach the browser.
const URL_ = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const enabled = Boolean(URL_ && KEY);
const DEVICE_RE = /^[a-zA-Z0-9-]{8,64}$/;

function headers(extra) {
  return { apikey: KEY, Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json', ...extra };
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
  if (!enabled) return false;
  try { const r = await fetch(`${URL_}/rest/v1/milo_messages?select=id&limit=1`, { headers: headers() }); return r.ok; } catch { return false; }
}

module.exports = { ping, enabled, loadHistory, saveMessages, clearHistory, DEVICE_RE };
