// Milo chat memory: GET loads, POST appends (e.g. offline-mode messages), DELETE clears.
// Identified only by an anonymous random device id kept in the visitor's browser.
const db = require('./_supabase');

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (!db.enabled) return res.status(503).json({ error: 'memory_not_configured' });
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};
  const device = String((req.query && req.query.device) || body.device || '');
  if (!db.DEVICE_RE.test(device)) return res.status(400).json({ error: 'bad_device' });

  if (req.method === 'GET') return res.status(200).json({ messages: await db.loadHistory(device, 40) });
  if (req.method === 'POST') {
    const msgs = (Array.isArray(body.messages) ? body.messages : []).slice(-4);
    return res.status(200).json({ ok: await db.saveMessages(device, msgs) });
  }
  if (req.method === 'DELETE') return res.status(200).json({ ok: await db.clearHistory(device) });
  return res.status(405).json({ error: 'method_not_allowed' });
};
