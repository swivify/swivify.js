# Swivify Core API

## Overview

Swivify Core provides the foundational plugin system, utilities, and configuration for all Swivify projects.

## Main Exports

- `createApp`
- `definePlugin`
- `loadConfig`
- `useFeature`
- `loadPlugins`
- `runHook`
- `validatePluginsConfig`
- `loadEnv`
- `startHMR`
- `ssrHandler`

## Usage

```ts
import { createApp, definePlugin, ssrHandler } from '@swivify/core';

const app = createApp({
  /* ... */
});
app.use(
  definePlugin({
    name: 'my-plugin',
    onStart() {
      /* ... */
    },
  }),
);
app.use(
  ssrHandler((req, res) => {
    /* SSR logic */
  }),
);
```

## Plugin System

- Lifecycle hooks: `onInit`, `onStart`, `onRestart`, `onBuild`, `onShutdown`, `onValidateConfig`, `onLoad`, `onError`
- Plugin validation and config

## Utilities

- Path aliases
- ESM-first helpers
- TypeScript types
- HMR/live reload helpers

[Back to API Reference](./)
