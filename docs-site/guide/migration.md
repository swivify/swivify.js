# Migration Guide

## Upgrading from v2/v3

Swivify v3+ introduces a modern ESM-first, TypeScript-based architecture, a new plugin system, and improved template/config structure. To upgrade:

### Key Breaking Changes

- **ESM & TypeScript:** All packages and templates now use ESM and TypeScript. Update your imports/exports and ensure your Node.js version supports ESM.
- **Plugin System:** Plugins now use a unified lifecycle API (`onStart`, `onBuild`, `onRestart`, etc.). See [API Reference: Plugins](/api/plugins).
- **Config File:** The config file is now `swivify.config.js` (ESM or CJS supported). Plugins are loaded from the `plugins` array.
- **Templates:** All templates are modular, with interactive CLI for DB/feature selection. See [Getting Started](/guide/) and [Templates](/api/templates).
- **Inspector Dashboard:** Enhanced with live API monitoring, health checks, and error overlays.

### How to Migrate Templates and Plugins

- **Templates:**
  - Use the new CLI to scaffold projects. Migrate custom code into the new structure.
  - Update environment files and scripts as shown in the new template READMEs.
- **Plugins:**
  - Refactor plugins to use the new lifecycle hooks and config validation.
  - Example:
    ```ts
    export function myPlugin(): SwivifyPlugin {
      return {
        name: 'my-plugin',
        onStart: () => {
          /* ... */
        },
        onValidateConfig: (config) => {
          /* ... */
        },
      };
    }
    ```
- **Config:**
  - Move config to `swivify.config.js` and export as ESM/CJS.
  - List plugins in the `plugins` array.

### Validating Your Migration

- Use the Inspector Dashboard to check config, plugin loading, API health, and logs.
- Run `npm run dev` and verify HMR, SSR, and plugin hooks work as expected.

## Changelog

See [ROADMAP_Version3.md](/ROADMAP_Version3.md), [ROADMAP_Version4.md](/ROADMAP_Version4.md), and [ROADMAP_Version5.md](/ROADMAP_Version5.md) for detailed changes and planned features.

[Back to Guide](./)
