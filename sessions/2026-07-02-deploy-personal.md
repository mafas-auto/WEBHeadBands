---
type: session-plan
date: 2026-07-02
session_type: deploy
area: lab
status: approved
estimated_duration_min: 75
checkpoint_count: 3
tags: [session-plan, lab, deploy]
---

# Session: Deploy Webheadbands personal build (Cloudflare Pages + Railway)

## Goal

Get the stripped-down Webheadbands app live on HTTPS (Cloudflare Pages) with AI deck generation working (Railway backend), installed and playable on Filip's iPhone.

## Inputs — load these first (in order)

- `D:\LAB\Archiv\Webheadbands` — working tree, already stripped of Stripe/Supabase/Party Pass/admin-backdoor this session
- GitHub `mafas-auto/WEBHeadBands` (existing remote `origin`)
- Filip's existing paid Railway session (no new signup needed)
- Current branch is `feature/monetization` (Stripe experiment) — do not build on top of it; branch fresh from the current working tree

## Steps

### Step 1 — Branch + commit the personal build
**Do:** `git checkout -b personal/static-pwa` from the current working tree (already stripped down), stage and commit with an imperative message explaining the strip-down.
**Verify:** `git diff main...personal/static-pwa` contains only the expected changes (deletions of Stripe/Supabase/PartyPass/admin-backdoor files, HomeScreen/AIDeckScreen/App.jsx/server.js edits) — no unrelated file rewrites.
**On failure:** STOP, report the conflict, do not force anything.

### Step 2 — Push to GitHub
**Do:** `git push -u origin personal/static-pwa`.
**Verify:** branch visible via `git ls-remote origin`.
**On failure:** STOP, check remote auth/credentials.

### Step 3 — Frontend build sanity check
**Do:** `npm run build` in the repo root.
**Verify:** `dist/` builds clean, `dist/index.html` references `/assets/*.js`, not `/src/*`.
**On failure:** STOP, fix the build error before touching any deploy target.

### Step 4 — [CHECKPOINT] Cloudflare Pages
**Do:** Filip checks the Cloudflare dashboard for an existing `webheadbands` Pages project. If it exists, repoint its production branch to `personal/static-pwa`. If not, create one connected to `mafas-auto/WEBHeadBands`, build command `npm run build`, output directory `dist`, production branch `personal/static-pwa`.
**Verify:** Cloudflare shows a green build and a live `*.pages.dev` URL.
**On failure:** report the Cloudflare build log.

### Step 5 — [CHECKPOINT] Railway backend
**Do:** Filip checks for an existing Railway project for this repo, or creates one, connects `personal/static-pwa`, sets root directory to `server`.
**Verify:** Railway detects and builds the `server/` app.
**On failure:** check root-directory / monorepo detection settings.

### Step 6 — [CHECKPOINT — secrets, Filip only] Env vars in Railway
**Do:** Filip enters directly into the Railway dashboard (never via me, never via `.env` on disk): `OPENAI_API_KEY` (his own key), `ALLOWED_ORIGIN` and `CLIENT_URL` set to the Cloudflare Pages URL from Step 4.
**Verify:** `GET /health` on the Railway public URL returns `200`.
**On failure:** check Railway logs for a missing/misnamed env var.

### Step 7 — Wire frontend to backend
**Do:** Set `VITE_API_BASE_URL` as a Cloudflare Pages environment variable to the Railway public URL from Step 6, trigger a Pages rebuild.
**Verify:** rebuild succeeds.
**On failure:** check the Pages build log.

### Step 8 — Verify AI generation end-to-end
**Do:** On the live site, open AI Deck Creator and generate a deck from a real prompt.
**Verify:** a 25-card deck returns and saves to My Decks.
**On failure:** check Railway logs for the OpenAI call (rate limit, bad key, parse failure).

### Step 9 — [CHECKPOINT — Filip only] iPhone install + full test
**Do:** Filip opens the live URL in Safari on iPhone, Share → Add to Home Screen, launches from the home screen icon, grants motion permission, plays one round each with a manual custom deck and an AI-generated deck.
**Verify:** tilt reliably registers CORRECT/PASS in real gameplay.
**On failure:** log the specific misfire (which direction/threshold) — becomes input to a future tilt-tuning session, not fixed blind.

## Success criteria

- [ ] `personal/static-pwa` pushed, contains only the personal strip-down (no Stripe/Supabase/PartyPass/admin-backdoor)
- [ ] Live Cloudflare Pages URL serves over HTTPS, no monetization UI anywhere
- [ ] Railway backend live, `/health` returns 200
- [ ] AI deck generation works end-to-end from the live site
- [ ] Installed on Filip's iPhone home screen, tilt confirmed working in real play with both a manual deck and an AI-generated deck

## Out of scope — DO NOT touch

- Custom domain setup (default `*.pages.dev` / Railway subdomain is enough for personal use)
- Tilt-detection algorithm tuning — only becomes its own session if Step 9 finds a real problem
- Any revival of Stripe, Supabase, or Party Pass code
- `main` or `feature/monetization` branches
- Reading or writing any `.env` file — secrets go directly into the Cloudflare/Railway dashboards by Filip

## Checkpoints — pause for Filip

- Step 4: Cloudflare Pages dashboard action (account-bound)
- Step 5 + 6: Railway dashboard + entering his own `OPENAI_API_KEY` (secret, his hands only)
- Step 9: physical iPhone test (can't be automated)

## Exit conditions

- **All success criteria met** → write session log, mark `status: done`, exit
- **Discovery invalidates the plan** → STOP, write what was found to log, mark `status: aborted`, DO NOT improvise
- **Hit a checkpoint** → pause, surface the question, wait for Filip
- **Time budget exceeded** (~75 min) → STOP at end of next verifiable step, write log with remaining work

## Out-of-session notes

- Backend host decision: Railway, because Filip already has a paid session — removes the account/billing friction that made home-server+Tailscale Serve attractive for a personal toy.
- Opus/subagent dispatch was considered and rejected for this session: it's linear, account-bound, and gated on Filip's own dashboard/phone actions — no parallel or hard-reasoning work to delegate.
