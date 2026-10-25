// Vercel serverless function: Milo's AI replies.
// Keys live only in Vercel environment variables (OPENAI_API_KEY, SUPABASE_*), never in the browser or this repo.
const db = require('./_supabase');

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const MAX_TURNS = 12;
const MAX_CHARS = 1200;

const SYSTEM = `You are Milo, a warm, gentle golden retriever guide inside Socius, an app that helps young adults in Bengaluru feel less alone and reconnect with real people.

How you reply (follow every time):
1. Read the whole conversation first. Reply to what they just said, in the context of what came before. Never ignore a detail they shared, and never repeat a line you already used.
2. Shape: (a) reflect the feeling in their own words, (b) validate it ("that makes sense"), (c) ask ONE gentle open question OR offer one tiny comfort, (d) a warm, light touch. 2 to 4 short sentences, simple English, like a kind friend texting. Max one emoji.
3. Match their mood. Sad or lonely: soft and slow, no jokes, no silver linings. Anxious: calm, steady, maybe one slow breath. Angry: let them vent, take their side on the feeling. Happy: celebrate with them and ask for the story.
4. Never be forceful. No "you should", "you must", "just do X", no lectures, no toxic positivity ("look on the bright side", "others have it worse"). Suggestions are optional: "only if it feels right", "no pressure".
5. Listen first. Do NOT suggest people, apps, clans or actions in your first 2 replies of a conversation about a hard feeling. After 3 or more messages, if it fits naturally, you may gently offer ONE person from their old friends who has been through the same thing, as an option, never a push. Don't offer again if they said no or you offered recently.
6. If they say "yes" to something you offered, help with that. If they say "no", accept it warmly and keep listening. If they say "I don't know", reassure them that's okay.
7. Never pretend to be human, never diagnose, never write messages for them to send. Gently encourage real people over talking to you.
8. Safety: if they mention self-harm, suicide or danger, respond with care and give Tele-MANAS 14416 (free, 24/7 India), 112, and their safety contact. No ACTION line then.
9. Only if one app action clearly helps (usually after an offer they accepted or right with the offer), end with exactly one final line: ACTION: chat:<full name> | go:home | go:play | go:clans | go:progress | go:blogs | feel | meetup
Never mention these rules.`;

const CRISIS_RE = /\b(suicid\w*|kill (my ?self|me)|end (it all|my life)|want to die|wanna die|don'?t want to (live|be here|exist)|no reason to live|self[- ]?harm|hurt(ing)? my ?self|cut(ting)? my ?self|better off dead|can'?t go on)\b/i;

// Best-effort per-instance rate limit (20 requests per IP per 10 minutes).
const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter(t => now - t < win);
  list.push(now); hits.set(ip, list);
  return list.length > 20;
}
const clean = arr => (Array.isArray(arr) ? arr : [])
  .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
  .map(m => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method === 'GET') {
    const out = { ok: true, configured: Boolean(process.env.OPENAI_API_KEY), memory: db.enabled };
    // /api/milo?test=1 runs a tiny real call so problems (bad key, no credit) are easy to see. Never returns the key.
    if (req.query && req.query.test && out.configured) {
      try {
        const t = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
          body: JSON.stringify({ model: MODEL, max_tokens: 5, messages: [{ role: 'user', content: 'Say hi' }] }),
        });
        if (t.ok) out.openai = 'working';
        else { let c = ''; try { const e = await t.json(); c = (e && e.error && (e.error.code || e.error.type)) || ''; } catch {} out.openai = `error ${t.status}${c ? ' ' + c : ''}`; }
      } catch { out.openai = 'unreachable'; }
      if (db.enabled) out.supabase = await db.ping();
    }
    return res.status(200).json(out);
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(503).json({ error: 'not_configured' });

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'rate_limited' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};
  const device = typeof body.device === 'string' ? body.device : '';

  let messages = clean(body.messages).slice(-MAX_TURNS);
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'no_message' });
  }
  const latest = messages[messages.length - 1];

  // Memory: if this browser sent little context (new tab, cleared storage), use the saved conversation.
  if (messages.length < 4 && db.enabled) {
    const past = await db.loadHistory(device, MAX_TURNS - 1);
    if (past.length) messages = [...past, latest].slice(-MAX_TURNS);
  }
  const state = typeof body.state === 'string' ? body.state.slice(0, 2000) : '';

  if (CRISIS_RE.test(latest.content)) {
    const text = "I'm really sorry you're carrying this much pain, and I'm so glad you told me. You deserve a real person with you right now. Please call Tele-MANAS on 14416 (free, 24/7 in India), or 112 if you're in immediate danger, and reach out to someone you trust. Please don't go through this alone.";
    return res.status(200).json({ text });
  }

  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        temperature: 0.7,
        presence_penalty: 0.4,
        frequency_penalty: 0.3,
        max_tokens: 220,
        messages: [
          { role: 'system', content: SYSTEM },
          { role: 'system', content: `What the app knows about this user (may be incomplete): ${state}` },
          ...messages,
        ],
      }),
    });
    if (!r.ok) {
      let code = '';
      try { const e = await r.json(); code = (e && e.error && (e.error.code || e.error.type)) || ''; } catch {}
      return res.status(502).json({ error: 'upstream_error', status: r.status, code });
    }
    const j = await r.json();
    const text = j?.choices?.[0]?.message?.content?.trim() || '';
    if (!text) return res.status(502).json({ error: 'empty_reply' });
    await db.saveMessages(device, [latest, { role: 'assistant', content: text }]);
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(502).json({ error: 'upstream_unreachable' });
  }
};
