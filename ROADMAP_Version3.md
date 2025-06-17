# Swivify - Actionable Development Roadmap

A fast, modern dev experience for Node.js apps.

---

## 🧱 Phase 1: Foundation (Core Dev Server)

- [x] **Initialize the project**
  - Prompt: “Create a new Node.js project using pnpm (or npm) with TypeScript or ESM support. Initialize Git.”
- [x] **Set up CLI**
  - Prompt: “Build CLI with commander or cac; add commands: dev, build, preview.”
  - Prompt: “Support project config file: project.config.js or .ts.”
- [x] **Implement file watcher**
  - Prompt: “Use chokidar to watch source files. On change, restart or rerun the Node.js app.”
  - Prompt: “If using TS/ESM, recompile on file change.”
- [x] **Serve the Node app**
  - Prompt: “Launch target entry (src/server.ts) as a forked process or in-memory. Restart on changes.”
- [x] **Dev CLI experience**
  - Prompt: “Ensure ‘dev’ command watches & reloads; ‘build’ bundles via esbuild; ‘preview’ runs built version.”
  - Prompt: “Show logs and errors in a clean, user-friendly way.”

---

## ⚙️ Phase 2: Build System Integration

- [x] **Integrate esbuild or rollup**
  - Prompt: “Bundle the app for production using esbuild or rollup. Output to dist/.”
  - Prompt: “Support externalizing dependencies (node_modules).”
- [x] **TypeScript support**
  - Prompt: “Transpile .ts files using esbuild. Detect tsconfig.json and support tsconfig-paths (optional).”
- [x] **Environment variables**
  - Prompt: “Add .env file support via dotenv. Inject process.env safely.”

---

## 🔌 Phase 3: Plugin System

- [x] **Design plugin API**
  - Prompt: “Implement plugin API with lifecycle hooks: onStart, onBuild, onRestart. Load plugins from config file.”
- [x] **Plugin hooks**
  - Prompt: “Allow plugins to transform source, inject middleware, customize server, or modify build.”

---

## 🚀 Phase 4: Dev UX & Tooling

- [x] **Logging system**
  - Prompt: “Use chalk or colorette for colored output. Format errors and stack traces for clarity.”
- [x] **Live reload UI**
  - Prompt: “Optionally integrate WebSocket for browser reload (SSR scenarios). Provide reload messages or CLI indicators.”
- [x] **Config auto-reload**
  - Prompt: “Restart dev server when config file changes.”
- [x] **Project templates**
  - Prompt: “Add create-swivify-app CLI. Scaffold boilerplates for Express, Fastify, GraphQL, etc.”
- [x] **Create a create-swivify package**
  - Prompt: “Build a CLI published as create-swivify for npm create swivify@latest scaffolding.”
- [x] **Add templates for ts, express, graphql, etc.**
  - Prompt: “Organize starter templates in a templates/ folder. Support --template <name> argument.”
- [x] **Support project creation via npm create swivify@latest [dir] -- --template <name>**
  - Prompt: “Parse directory and template argument, copy template, install deps, print next steps.”
  -

---

## 📦 Phase 5: Package & Ecosystem

- [x] **Publish CLI**
  - Prompt: “Package CLI as npm bin (swivify). Support swivify dev, swivify build, etc.”
- [x] **Monorepo (optional)**
  - Prompt: “If splitting into sub-packages, use pnpm workspaces/turborepo. Structure as /packages/core, /packages/cli, /packages/plugin-ts, etc.”
- [x] **Publish on npm**
  - Prompt: “Publish as swivify or @yourname/devkit. Use semantic versioning.”
- [x] **Write documentation**
  - Prompt: “Document getting started, CLI reference, plugin API, and example projects.”

---

## 🔎 Phase 6: Testing, Linting, & Type Safety (Recommended Early)

- [x] **Testing**
  - Prompt: “Integrate test runner (Vitest or Jest). Add CLI support: swivify test. Support watch mode.”
- [x] **Linting & formatting**
  - Prompt: “Recommend or pre-integrate ESLint/Prettier. Optionally auto-run before build.”
- [x] **TypeScript DX**
  - Prompt: “Enable fast, non-blocking type checking (separate process, like tsc --noEmit). Show type errors in CLI.”

---

## 💡 Phase 7: Advanced & Optional

- [x] **Routing & middleware conventions**
  - Prompt: “Auto-register routes from a routes/ folder. Provide default middleware (logging, error handler, CORS).”
- [x] **Monorepo/workspace compatibility**
  - Prompt: “Ensure smooth operation in monorepo environments.”
- [x] **Deployment integration**
  - Prompt: “Add plugins or recipes for Docker, Vercel, AWS Lambda, etc.”
- [x] **Security best practices**
  - Prompt: “Document and encourage secure defaults: helmet, rate limiting, .env safety.”
- [x] **Error overlays**
  - Prompt: “Display pretty error overlays or outputs in the terminal.”
- [x] **SSR/frontend, VSCode extension, debug dashboard**
  - Prompt: “Defer to post-MVP or as plugins.”

---

# 🏁 Next Steps

- Use these prompts as issue titles or checklists for contributors.
- Start with Phase 1 and iterate.
