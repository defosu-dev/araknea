# Araknea — stories beyond chat.

Araknea is an open-source platform for publishing and reading translations of light novels, manga, comics, and other serialized content.

It was built as an alternative to Telegram channels used by translation teams — which lack proper reading UX, chapter navigation, and monetization tools.

---

## Two Products, One Codebase

### Araknea Lite

A single-tenant web app deployed separately for each translation team. The team gets their own instance, rebranded under their name. The primary access channel is a **Telegram Mini App** — the app is registered as a bot and opens inside Telegram, while remaining accessible via browser as well.

### Araknea Platform

A multi-tenant platform hosted centrally, where multiple teams can publish their content. Includes a content catalog, multi-language UI, and PWA support with offline reading.

The difference between Lite and Platform is **configuration, not separate codebases**.

---

## Key Features

- **Multiple translations** — one work can have several translations, even in the same language
- **Flexible access model** — Public, Scheduled, Early Access, and Private chapters
- **External monetization** — Patreon and Boosty integration, no payment processing
- **Team roles** — Owner, Admin, Editor, Translator, Viewer
- **Telegram Mini App** — native Telegram experience via `@twa-dev/sdk`
- **Auth** — Telegram, email/password, OAuth

---

## Tech Stack

- Next.js (App Router)
- Prisma ORM + PostgreSQL
- Tailwind CSS
- Zustand
- Zod
- NextAuth.js
- @twa-dev/sdk

---

## Infrastructure

**MVP:** Vercel + Supabase (PostgreSQL only, no Supabase SDK)

**Later:** Hetzner VPS + Cloudflare DNS + self-hosted PostgreSQL

---

## Status

MVP (Araknea Lite) is in active development.
