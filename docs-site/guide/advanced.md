# Advanced Guides

## Custom Plugins

Swivify supports a powerful plugin system with full lifecycle hooks and config validation. Here’s an advanced example:

```ts
// plugin-ts/src/index.ts
import type { SwivifyPlugin } from '@swivify/core';

export function pluginTs(): SwivifyPlugin {
  return {
    name: 'plugin-ts',
    beforeStart: () => {
      console.log('[plugin-ts] Preparing environment...');
    },
    onStart: () => {
      console.log('[plugin-ts] Plugin started!');
    },
    afterStart: () => {
      console.log('[plugin-ts] Startup complete.');
    },
    onBuild: () => {
      console.log('[plugin-ts] Building TypeScript sources...');
    },
    onLoad: (context) => {
      console.log('[plugin-ts] Loading resources:', context);
    },
    onValidateConfig: (config) => {
      if (!config.tsConfigPath) return 'Missing tsConfigPath in config';
      return true;
    },
    onError: (error) => {
      console.error('[plugin-ts] Error:', error.message);
    },
  };
}
```

See the [API Reference: Plugins](/api/plugins) for all available hooks and best practices.

---

## SSR & Middleware

Swivify provides helpers for SSR and custom middleware integration:

```ts
// SSR handler helper (core)
import { ssrHandler } from '@swivify/core';

app.use(
  ssrHandler((req, res) => {
    // Your SSR logic here
    res.send(renderToString(/* ... */));
  }),
);
```

### Inspector Middleware

Monitor API hits and enable live diagnostics in your app:

**Express:**

```js
app.use((req, res, next) => {
  fetch('http://localhost:4321/__inspector/hit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ route: req.path }),
  }).catch(() => {});
  next();
});
```

**Fastify:**

```js
fastify.addHook('onRequest', async (request, reply) => {
  try {
    await fetch('http://localhost:4321/__inspector/hit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ route: request.routerPath }),
    });
  } catch {}
});
```

---

## Deployment

Swivify supports modern deployment workflows:

- **Docker:** Use the official [Docker recipe](/guide/recipes#docker) for containerization.
- **CI/CD:** Integrate with GitHub Actions or your favorite CI using [recipes](/guide/recipes#ci-cd).
- **Cloud:** Deploy to Vercel, Netlify, or your preferred provider ([cloud recipe](/guide/recipes#cloud)).
- **Static Hosting:** Build and serve your frontend with Vite, backend with Node.js.

See [Recipes](/guide/recipes) for step-by-step guides.

---

## Migration

Upgrading from a previous Swivify version? See the [Migration Guide](/guide/migration) for:

- Breaking changes and upgrade steps
- Migrating config, plugins, and templates
- Validating your setup with the Inspector Dashboard

---

[Back to Guide](./)
