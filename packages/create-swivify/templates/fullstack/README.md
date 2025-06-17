# Swivify Fullstack Starter

A minimal fullstack project with a Swivify backend and a Vite-powered frontend (React, Vue, or Svelte).

## Features

- Express.js backend (TypeScript)
- Vite-powered frontend (React, Vue, or Svelte)
- API + UI in one project

## Getting Started

1. Scaffold your project with Swivify and select the fullstack template.
2. When prompted, choose your frontend framework (React, Vue, Svelte, ...).
3. The CLI will create two folders:
   - `backend/` (Express + TypeScript)
   - `frontend/` (Vite + your selected framework)

## Running the Project

- In one terminal, run the backend:
  ```sh
  cd backend
  npm install
  npm run dev
  ```
- In another terminal, run the frontend:
  ```sh
  cd frontend
  npm install
  npm run dev
  ```

## Communication

- The frontend can call the backend API at `http://localhost:3000` (or your backend port).
- For local development, configure Vite's `proxy` option in `vite.config.ts` to forward API requests to the backend.

## Customizing

- You can rename the `backend` and `frontend` folders during scaffolding.
- Add your own routes, models, and UI as needed.

---

Built with [Swivify](https://github.com/yourname/swivify)
