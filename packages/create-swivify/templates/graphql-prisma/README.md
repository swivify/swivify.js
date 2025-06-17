# Swivify GraphQL + Prisma Starter

A minimal Node.js backend powered by Apollo Server, Prisma, and Swivify.

## Features

- Apollo Server (GraphQL)
- Prisma ORM (SQLite/Postgres/MySQL)
- TypeScript
- Optional: Auth, File Upload (enable via CLI)

## Getting Started

1. Install dependencies:
   ```sh
   npm install
   # or
   pnpm install
   ```
2. Set up the database:
   ```sh
   npx prisma migrate dev --name init
   # or
   pnpm prisma migrate dev --name init
   ```
3. Run `npm run dev` to start the server.
4. Run `npm run build` to build for production.
5. Run `npm run preview` to preview the production build.

## Environment Variables

- Copy `.env.example` to `.env` and set your variables as needed.
- Change the `DATABASE_URL` in `.env` for Postgres, MySQL, or SQLite.

## Database Provider

- Default is SQLite. To use Postgres or MySQL, update `provider` in `prisma/schema.prisma` and `DATABASE_URL`.

## Customizing

- Add features (auth, file upload) via the CLI when scaffolding.
- Add more resolvers or models as needed.

---

Built with [Swivify](https://github.com/yourname/swivify)
