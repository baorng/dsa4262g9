# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

# Interview Anxiety Assessment Tool

## Run locally

1. Install dependencies:

```bash
bun install
```

2. Add env variables in `.env.local`:

```dotenv
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_APP_URL=... # e.g. https://your-deployed-domain.com
```

3. Start dev server:

```bash
bun run dev
```

## Why the database is empty

Supabase starts empty until you create the table + RLS policies. This app writes to `public.quiz_results`, so that table must exist first.

## Initialize Supabase schema

1. Open Supabase Dashboard → SQL Editor.
2. Open `supabase/setup.sql` in this repo and paste/run it.
3. Confirm table exists: Table Editor → `quiz_results`.

After that, submit one full quiz and you should see a row appear.

## Quick verification query

Run this in SQL Editor:

```sql
select attempt_number, taken_at, dominant_type
from public.quiz_results
order by taken_at desc
limit 10;
```

## Auth redirect setup (important for email verification)

If verification emails are sending users to localhost, configure both app and Supabase auth URLs:

1. In Supabase Dashboard → Authentication → URL Configuration:
	 - Set Site URL to your deployed domain.
	 - Add Redirect URLs for both local and production, for example:
		 - `http://localhost:5173/`
		 - `https://your-deployed-domain.com/`
2. Set `VITE_APP_URL` in your deployed environment to your production URL.

The app uses `VITE_APP_URL` (or current origin fallback) as `emailRedirectTo` during sign-up.
