# Features & Plugins

Swivify is designed to be modular, extensible, and developer-friendly. Its core is built around a powerful plugin system and a set of official templates, making it easy to scaffold, extend, and customize your backend projects.

## Core Features

- **ESM-first, TypeScript-native:** All code, templates, and plugins use modern ESM and TypeScript for type safety and speed.
- **Hot Module Reload (HMR):** Instant feedback for backend changes, including routes, plugins, and config.
- **Inspector Dashboard:** Visualize your app’s modules, API endpoints, logs, and health in real time.
- **Plugin System:** Add, remove, or create plugins for authentication, DB, logging, and more.
- **Built-in Templates:** Scaffold REST, GraphQL, Fastify, Prisma, Auth, File Upload, Fullstack, and more.
- **Auto-completion & Validation:** CLI and config auto-complete, with validation for plugins and templates.

## Plugin System

Swivify’s plugin system is inspired by Vite and Fastify, but tailored for backend needs:

- **Lifecycle Hooks:** Plugins can hook into `onInit`, `onStart`, `onShutdown`, and more.
- **Config Validation:** Plugins can define and validate their own config schemas.
- **Composable:** Use multiple plugins together, with clear order and isolation.

### Example: Creating a Plugin

```ts
import { definePlugin } from '@swivify/core';

export default definePlugin({
  name: 'my-logger',
  onInit(app) {
    app.log('My Logger Plugin Initialized');
  },
});
```

### Using Plugins

```ts
import { createApp } from '@swivify/core';
import logger from './plugins/logger';

const app = createApp({
  plugins: [logger],
});
```

## Templates

Swivify comes with official templates for rapid project creation:

- **REST API** (with or without DB)
- **GraphQL**
- **Fastify**
- **Prisma**
- **Auth**
- **File Upload**
- **Fullstack** (API + frontend integration)

You can also create your own templates or use community ones. See the [Templates Guide](../api/templates.md) for more.

## Extending Swivify

- **Add Plugins:** Use the CLI or add to your config.
- **Create Plugins:** Use the plugin API to build your own features.
- **Share Plugins:** Publish to npm or the Swivify plugin registry.

## Learn More

- [Config & Env](./config.md)
- [Inspector Dashboard](../inspector/)
- [API Reference](../api/)

[Next: Config & Env](./config.md)
