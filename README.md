# Socius

**Your AI listens. Your people should too.**

Socius is a social game, guided by Milo the golden retriever, that turns your 2040 AI agent into a bridge back to real people. Milo matches you with someone who's been there, both say yes, and you get the first line. Quests, clans and levels make reaching out a habit; rewards only count when a human replies.

## Run it

It's a static site, so no build step is needed.

- **GitHub Pages:** Settings → Pages → Deploy from a branch → `main` / `(root)`. Your site goes live at `https://<username>.github.io/socius/`.
- **Locally:** run `python3 -m http.server` in this folder, then open `http://localhost:8000`. Opening `index.html` directly also works in most browsers, but some block local fonts, so a server is safer.

## Project structure

```
socius/
├── index.html          # Page shell and markup
├── css/
│   └── styles.css      # All styles (design tokens, layout, components, responsive rules)
├── js/
│   └── app.js          # App logic: router, landing page, onboarding, play, chats, clans, coach, learn
├── api/
│   ├── milo.js         # Vercel function: Milo's OpenAI replies (key stays on the server)
│   ├── history.js      # Milo's memory: load, save, clear (Supabase)
│   └── _supabase.js    # Server-only Supabase helper
├── supabase/
│   └── schema.sql      # One table for Milo's memory, locked with row-level security
├── assets/
│   ├── fonts/          # Fredoka (wordmark), Nunito (interface), Lora (reading text)
│   ├── milo/           # Milo mascot poses
│   ├── avatars/        # 16 illustrated profile pictures
│   ├── milo-hero.webp  # Animated Milo for the landing page
│   └── milo-hero-poster.jpg
└── docs/
    └── Socius_two-pager.pdf
```

## What's inside

| Area | What it does |
|---|---|
| Landing page | Story, how it works, the six levels, FAQs, stories, short videos |
| Onboarding | Interests, old friends, join a local clan, daily energy, safety contact |
| Home | Milo's welcome, old friends who've been there, annual clan meetup |
| Play | Six levels from *Say hello* to *Host* on one path, real-life quests |
| Chats | Every conversation in one place, Milo as a guide bot, quest chats |
| Clans | Choose or create a local clan, events and RSVPs |
| Progress | Private weekly mood report, wins and areas to grow |
| Coach | Optional paid coaching, or free through a partnered college or company |
| Learn | Short videos, books recommended by Milo, quick reads |

## How the game works

- **XP:** your experience. Small quests give a little; meetups give the most.
- **Gems:** earned only when a real person replies or you meet up. They save your streak (10, then 20, 40, 80… gems).
- **Energy:** the minutes a day you choose to give your people.
- Nobody is ever rated, and both people say yes before anyone messages.

## Milo, the AI guide

Milo lives in **Chats** and always replies, in one of these ways (first available wins):

| Mode | When | Key stored where |
|---|---|---|
| Socius server (OpenAI `gpt-4o-mini`) | Deployed on Vercel with `OPENAI_API_KEY` set | Vercel environment variables only |
| Your own OpenAI key | A visitor adds one in Milo's **AI settings** | That visitor's browser only |
| Claude | When the page runs inside claude.ai | Not needed |
| Offline mode | No AI available | Not needed: a built-in listening engine |

**How Milo replies.** Every mode follows the same rules:

1. Reply to what the person just said, in the context of the whole chat. Never repeat a line.
2. Reflect the feeling, validate it, ask one gentle question or offer one tiny comfort. 2 to 4 short sentences.
3. Match the mood: soft for sad or lonely, calm for anxious, let them vent when angry, celebrate when happy.
4. Never forceful: no "you should", no lectures, no "look on the bright side".
5. Listen first. Only after a few messages may Milo offer one old friend who has been through the same thing, as an option. "No" is always fine.

**Memory.** The conversation is kept in the browser and, if Supabase is set up, on the server too, so Milo remembers across visits. Visitors are identified only by a random device id. **New chat** clears it.

**Safety:** messages about suicide, self-harm or danger never go to the AI. Milo answers right away with Tele-MANAS **14416** (free, 24/7 in India), **112**, and the user's safety contact.

### Set up on Vercel

1. **OpenAI:** Vercel → your project → **Settings → Environment Variables** → add `OPENAI_API_KEY`. Optional: `OPENAI_MODEL` (defaults to `gpt-4o-mini`).
2. **Supabase (memory):** create a project at supabase.com → **SQL Editor** → run `supabase/schema.sql`. Then in Vercel add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (Supabase → Project Settings → API).
3. Redeploy. `GET /api/milo` should return `{"configured": true, "memory": true}`.

Never commit a real key. `.env` files are git-ignored; see `.env.example`.

## Tech

Plain HTML, CSS and JavaScript with no framework and no build step, plus Vercel serverless functions in `api/` that keep the OpenAI and Supabase keys on the server. Progress is saved in the browser's `localStorage`.

## Note

Prototype for a product-design challenge on 2040 personal AI agents. People, clans, stories, partners and numbers are illustrative.
