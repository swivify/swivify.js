# Swivify – Roadmap Version 5 (Template, Plugin, and DX Expansion)

## 🟢 High Priority (Start Here: Easy to Import/Build)

- [x] **Template Expansion**

  - [x] Add GraphQL backend starter template (Apollo Server, TypeGraphQL, or Mercurius).
  - [x] Add Fastify backend starter template (with TypeScript).
  - [x] Add Express+Prisma template (Postgres, MySQL, SQLite support).
  - [x] Add GraphQL+Prisma template (showing DB integration).
  - [x] Add REST+MongoDB template (Mongoose or Typegoose).
  - [x] Add REST+Postgres template (pg or Drizzle ORM).
  - [x] Add template for authentication (JWT, session, etc.).
  - [x] Add template for file uploads (Multer, Fastify multipart, etc.).
  - [x] Add minimal fullstack template (API + Vite frontend, optional).

- [x] **Template System Improvements**

  - [x] Allow user to select DB (Postgres, MySQL, SQLite, MongoDB) when scaffolding.
  - [x] Allow user to select features (auth, file upload, etc.) interactively.
  - [x] Document all templates with clear README and usage.

- [x] **Plugin System Expansion**
  - [x] Expand plugin API (lifecycle hooks: onStart, onBuild, onReload, onShutdown).
  - [x] Add official plugins:
    - [x] TypeScript plugin (already present, improve docs/examples)
    - [x] Prisma plugin (auto-integrate Prisma workflows)
    - [x] GraphQL plugin (auto-register resolvers, schema, etc.)
    - [x] Fastify plugin (auto-register routes, hooks)
    - [x] Auth plugin (JWT/session helpers)
    - [x] Env plugin (env validation, safe exposure)
  - [x] Add plugin loader and plugin config schema validation.
  - [x] Document plugin authoring and usage.

---

## 🟡 Medium Priority (DX, Ecosystem, and Recipes)

- [x] **Recipe/Integration CLI**

  - [x] Add `swivify add <integration>` command (e.g., `swivify add prisma`, `swivify add docker`, `swivify add github-actions`).
  - [x] Provide official recipes for Docker, CI/CD, and cloud deployment.

- [x] **Example Projects**

  - [x] Add advanced usage and plugin authoring examples in `/examples`.
  - [x] Add real-world project examples (monorepo, SSR, etc.).

- [x] **Config & Env Improvements**
  - [x] Support multiple config file names/extensions.
  - [x] Auto-load `.env`, `.env.local`, etc., with variable prefixing.

---

## 🟠 Advanced (Inspector, HMR, SSR, Ecosystem)

- [x] **Inspector Dashboard**

  - [x] Build a web-based dashboard for project status, plugins, logs, and module graph.
  - [x] Expose API endpoints for dashboard data.
  - [x] **Distribute Inspector as a dependency/CLI**

- [x] **Granular HMR & Live Reload**

  - [x] Implement hot module reload for server code.
  - [x] Add browser reload for SSR/fullstack templates.

- [x] **SSR & Middleware Support**

  - [x] Add helpers for SSR and custom middleware injection.

- [x] **Plugin Ecosystem**

  - [x] Build a simple plugin registry/marketplace page.

- [x] **CLI Auto-Completion**

  - [x] Generate shell completion scripts for CLI.

- [x] **Error Overlays**
  - [x] Show pretty error overlays in CLI and browser.

---

## 🟣 Nice-to-Have / Community

- [x] **Security Best Practices**

  - [x] Document and encourage secure defaults (helmet, rate limiting, .env safety).

- [x] **Official Docs & Guides**

  - [x] Write advanced guides for plugins, SSR, deployment, and recipes.

- [x] **VSCode Extension**
  - [x] (Optional) Start a VSCode extension for Swivify DX.

---

## 🏁 Suggested Order of Implementation

1. Import and document new templates (GraphQL, Fastify, DBs, Auth, etc.)
2. Expand plugin system and add official plugins
3. Improve template system for feature/DB selection
4. Add recipes/integrations and example projects
5. Config/env improvements
6. Inspector dashboard
7. Granular HMR/live reload
8. SSR/middleware helpers
9. Plugin registry/marketplace
10. CLI auto-completion and error overlays
11. Docs, security, and (optionally) VSCode extension

---

This roadmap gives you a clear, prioritized path: start with templates and plugins, then move to DX/recipes, and finally tackle advanced features like the dashboard and HMR.
