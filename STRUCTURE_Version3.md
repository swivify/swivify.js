# Swivify Monorepo Structure & File Layout

This document describes the recommended folder and file structure for the Swivify project.  
Use it as a blueprint for initializing your project and for Copilot to provide code in the correct places.

---

## Root Structure

```
swivify/
├── packages/
│   ├── cli/
│   ├── core/
│   ├── plugin-ts/
│   └── create-swivify/
├── .github/
├── docs/
├── examples/
├── package.json
├── pnpm-workspace.yaml
├── README.md
├── tsconfig.base.json
└── .gitignore
```

---

## Folder/Package Details

### /packages/cli

- **Purpose:**  
  Main CLI implementation and entry point for commands (`swivify dev`, `swivify build`, etc).
- **Key files:**
  - `src/index.ts` — CLI entrypoint
  - `src/commands/` — Each CLI command as a file/module
  - `src/core/` — CLI-specific utilities
  - `src/plugins/` — Bundled plugins or plugin loader
  - `package.json` — CLI package configuration
  - `tsconfig.json` — CLI TypeScript config

---

### /packages/core

- **Purpose:**  
  Core framework logic—dev server, file watching, config loading, etc.
- **Key files:**
  - `src/index.ts` — Main framework API
  - `src/server/` — Dev server, build, and preview logic
  - `src/config/` — Config file loading/validation
  - `src/watcher/` — File watcher logic
  - `package.json`
  - `tsconfig.json`

---

### /packages/plugin-ts

- **Purpose:**  
  TypeScript plugin for the framework (optional, but recommended for modularity).
- **Key files:**
  - `src/index.ts` — Plugin implementation
  - `package.json`
  - `tsconfig.json`

---

### /packages/create-swivify

- **Purpose:**  
  Scaffolding tool for `npm create swivify@latest`.  
  Handles project creation and template copying.
- **Key files:**
  - `src/index.ts` — CLI entrypoint for scaffolding
  - `src/utils/` — Utility functions (argument parsing, prompts, etc)
  - `templates/` — Project templates (see below)
  - `package.json`
  - `tsconfig.json`

#### /packages/create-swivify/templates

- **Purpose:**  
  Contains various starter templates for user projects.
- **Templates:**
  - `/ts/` — TypeScript backend starter
  - `/express/` — Express.js backend starter
  - `/graphql/` — GraphQL backend starter
  - _Add more as needed (Fastify, Prisma, etc.)_

Each template contains:

- `package.json`
- `tsconfig.json` (for TypeScript)
- `src/` folder with minimal server code
- `.env.example`
- `README.md`

---

## Other Root Folders

### /.github

- **Purpose:**  
  GitHub-specific files (issue templates, CI/CD workflows, PR templates).

### /docs

- **Purpose:**  
  Project documentation (usage, API, guides, etc).

### /examples

- **Purpose:**  
  Example projects showcasing advanced usage, plugin authoring, etc.

---

## Root Config Files

- `package.json` — Monorepo-scripts, dev deps, and workspace config.
- `pnpm-workspace.yaml` — Declares all workspace packages for pnpm.
- `README.md` — Main project readme.
- `tsconfig.base.json` — Base TypeScript config for all packages.
- `.gitignore` — Ignore rules for all packages.

---

## Recommended Initial Files For Each Package

Each package (cli, core, plugin-ts, create-swivify):

- `package.json`
- `tsconfig.json`
- `src/index.ts` (entrypoint)

Templates (in create-swivify):

- `package.json`
- `tsconfig.json`
- `src/server.ts` (or main file)
- `.env.example`
- `README.md`

---

## Notes

- Add more plugins as `/packages/plugin-<name>/` for ecosystem growth.
- You may symlink or copy templates to `/examples/` for advanced demos.
- Each package should be published independently if necessary.
- Use consistent naming and modularization for easy Copilot and team navigation.

---

This structure is designed for modern Node.js tooling, great DX, and easy Copilot integration.  
Copy this into your repo as STRUCTURE.md or ARCHITECTURE.md for reference.
