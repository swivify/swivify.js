# Config & Env

Swivify provides a flexible, modern configuration system inspired by Vite and best Node.js practices. You can configure your project using a `swivify.config.js` file, environment variables, and TypeScript/ESM conventions.

## Project Configuration

Create a `swivify.config.js` at your project root:

```js
// swivify.config.js
export default {
  plugins: [], // Add plugins here
  env: {
    files: ['./.env.development', './.env.shared'],
    prefix: 'MYAPP_',
  },
  // Add more config options as needed
};
```

- **plugins:** Array of Swivify plugins to load (see [Features & Plugins](./features.md)).
- **env:** Configure environment variable loading (see below).

## Environment Variables

Swivify supports loading multiple `.env` files and prefixing variables for safety and clarity. This is handled by the `loadEnv` utility in Swivify Core.

### Example Usage

```js
export default {
  env: {
    files: ['./.env', './.env.local'],
    prefix: 'SWIVIFY_',
  },
};
```

- All variables in the listed files will be loaded into `process.env`, with the prefix applied (e.g., `SWIVIFY_DB_URL`).
- You can use different `.env` files for different environments (development, production, etc.).

### Best Practices

- Never commit secrets or production credentials to your repo.
- Use `.env.example` to document required variables.
- Use prefixes to avoid conflicts in monorepos or multi-app setups.

## Accessing Config in Code

You can import your config and use it in your app:

```ts
import config from '../swivify.config.js';
console.log(config.plugins);
```

## Inspector Dashboard: Config & Env

The Inspector Dashboard displays your loaded config and environment variables for easy debugging. Sensitive values are not shown.

## Advanced: Custom Config Validation

Plugins can define their own config schemas and validation logic:

```ts
export default definePlugin({
  name: 'my-plugin',
  onValidateConfig(config) {
    if (!config.myPluginOption) return 'Missing myPluginOption';
    return true;
  },
});
```

## See Also

- [Features & Plugins](./features.md)
- [Inspector Dashboard](../inspector/)
- [API Reference: loadEnv](../api/core.md)

[Next: Recipes](./recipes.md)
