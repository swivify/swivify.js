# Swivify Monorepo - Commands & Usage Reference

This file documents all available commands and their usage for the Swivify monorepo, including CLI, core, and create-swivify tools.

---

## Root-level Commands (run from project root)

### Lint all code

```
npm run lint
```

### Format all code

```
npm run format
```

---

## CLI Package (`packages/cli`)

### Build CLI

```
cd packages/cli
npm run build
```

### Type-check CLI

```
npm run typecheck
```

### Run CLI in dev mode (TypeScript, hot reload)

```
npm run dev
```

### CLI Usage (after build, from root or as installed bin)

```
node packages/cli/dist/index.js <command>
# or if installed globally:
swivify <command>
```

#### CLI Commands

- `swivify dev` — Start dev server with file watching and hot reload
- `swivify build` — Bundle the app for production
- `swivify preview` — Preview the production build

---

## Core Package (`packages/core`)

### Build core

```
cd packages/core
npm run build
```

### Type-check core

```
npm run typecheck
```

### Run tests

```
npm test
```

---

## create-swivify (Project Scaffolding Tool)

### Usage (from root, after build or install)

```
cd packages/create-swivify
node dist/index.js
# or if published:
npx create-swivify
```

#### Interactive Prompts

- Choose template (TypeScript, Express, etc.)
- Enter project name
- Scaffolded project will be created in the target directory

---

## Example: Scaffold a new project

```
npx create-swivify my-app
# or
node packages/create-swivify/dist/index.js my-app
```

---

## Notes

- All commands can be run from their respective package directories.
- For monorepo scripts, always check `package.json` in each package for available scripts.
- CLI commands (`swivify`) are available after building or installing the CLI package.
- For more advanced usage, see the README files in each package.

npm run build --workspaces

node ../packages/cli/dist/add.js auth

node ../packages/cli/dist/add.js prisma

node ../packages/cli/dist/add.js graphql

node ../packages/cli/dist/add.js env

node ../packages/cli/dist/add.js fastify
