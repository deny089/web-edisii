# EDISII Website

Website company profile `EDISII` built with `Next.js`, `TypeScript`, and `Tailwind CSS`.

## Scope

- Public website with modular sections:
  - About
  - Collaboration
  - Event
  - Certificate
  - Office
- Admin dashboard for artwork certificate management
- Mobile-first `/cert-art` verification page

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- SQLite via `better-sqlite3`

## Run Locally

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Lint:

```bash
npm run lint
```

Type-check:

```bash
npx tsc --noEmit
```

## Main Routes

- `/`
  Public company profile website
- `/admin`
  Admin dashboard for artwork CRUD
- `/cert-art?code=<publicCode>`
  Artwork verification page

## Admin Artwork Storage

Artwork data is stored in local SQLite:

- `data/admin.sqlite`

Automatic backup snapshot is also generated:

- `data/artworks.backup.json`

The backup JSON is updated automatically whenever artwork data is:

- created
- updated
- deleted

## Artwork URL Strategy

Each artwork has:

- internal numeric `id`
- public 8-character `publicCode`

Public verification URL uses the public code:

```txt
/cert-art?code=kwpAZT8b
```

This means:

- admin/internal flow can still use numeric IDs
- public URLs do not expose sequential IDs directly

## Notes

- Public site is currently static and not connected to admin-managed content yet
- Admin CRUD is already persisted locally for development
- Current local SQLite approach is suitable for development and small internal use, but not ideal as final production persistence on Vercel

#cek commit