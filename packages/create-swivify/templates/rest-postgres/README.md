# Swivify REST + Postgres Starter

A minimal Node.js backend powered by Express, Drizzle ORM, and Swivify.

## Features

- Express.js backend
- Drizzle ORM (Postgres)
- TypeScript
- Optional: Auth, File Upload (enable via CLI)

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   # or
   pnpm install
   ```
2. Set up your Postgres database and update `.env`.
3. Run `npm run dev` to start the server.
4. Run `npm run build` to build for production.
5. Run `npm run preview` to preview the production build.

## Environment Variables

- Copy `.env.example` to `.env` and set your variables as needed.
- Set `DATABASE_URL` to your Postgres connection string.

## Customizing

- Add features (auth, file upload) via the CLI when scaffolding.
- Add more routes or models as needed.

---

Built with [Swivify](https://github.com/yourname/swivify)
