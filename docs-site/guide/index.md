# Getting Started

## Overview

Swivify is a modern Node.js backend toolkit inspired by Vite, designed to provide a fast, modular, and enjoyable development experience for building APIs, fullstack apps, and advanced server features. Swivify consists of:

- A dev server with instant startup, HMR for backend, and a modern Inspector Dashboard.
- A build system for optimized production output, using ESM and TypeScript by default.
- A powerful plugin and template system for rapid scaffolding and extensibility.

Swivify is opinionated, with sensible defaults and best practices out of the box. You can extend it with plugins, customize with config, and scaffold new projects interactively.

## Key Features

- ESM-first, TypeScript-native
- Modular templates: REST, GraphQL, Fastify, Prisma, Auth, File Upload, Fullstack, and more
- Inspector Dashboard: live API monitoring, logs, health checks, module graph, error overlays
- Plugin system with lifecycle hooks and validation
- Advanced DX: HMR, auto-completion, error overlays, VSCode extension
- Community-driven recipes and integrations (Docker, CI/CD, cloud)

## Browser & Node Support

Swivify targets Node.js 18+ and modern JavaScript features. For frontend integrations, it assumes modern browsers (ESM, import.meta, etc.).

## Scaffolding Your First Swivify Project

> **Compatibility Note:** Swivify requires Node.js 18+.

### Using npm

```sh
npm create swivify@latest
```

Follow the prompts to select your template, features, and database. You can also specify the project name and template directly:

```sh
npm create swivify@latest my-app -- --template rest
```

### Community Templates

Swivify supports official and community templates. See the [Templates Guide](./features) for more.

### Manual Installation

You can add Swivify to an existing project:

```sh
npm install swivify
```

Then create a minimal `index.ts`:

```ts
import { createApp } from '@swivify/core';

const app = createApp({
  /* ... */
});
app.listen(3000);
```

## Inspector Dashboard

Start the Inspector Dashboard for live monitoring:

```sh
npx swivify inspect
```

## CLI Usage

Swivify provides a powerful CLI for scaffolding, development, and automation:

- `create` — Scaffold a new project interactively
- `dev` — Start the dev server with HMR
- `build` — Build for production
- `test` — Run tests
- `inspect` — Launch Inspector Dashboard

See the [CLI Guide](../cli/) for full details.

## Community & Support

- Join the Swivify community for help, plugins, and discussions.
- See [Community & Contributing](../community/) for more.

---

[Next: Features & Plugins](./features)
