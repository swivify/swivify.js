# FAQ & Troubleshooting

## Frequently Asked Questions

### How do I add a new plugin?

- Create a plugin using the [Plugin API](/api/plugins).
- Add it to your `swivify.config.js` plugins array.
- Example:
  ```js
  // swivify.config.js
  import myPlugin from './plugins/myPlugin.js';
  export default {
    plugins: [myPlugin()],
  };
  ```

### How do I enable SSR?

- Use the `ssrHandler` helper from `@swivify/core`.
- See [Advanced Guides](/guide/advanced#ssr--middleware) for usage.

### How do I use custom templates?

- Place your template in `/packages/create-swivify/templates`.
- Use the CLI and select your custom template.
- See [Templates API](/api/templates).

## Troubleshooting

### Common errors and solutions

- **ESM import/export errors:** Ensure all files use ESM syntax and your Node.js version supports ESM.
- **Plugin not loading:** Check your config and plugin export. Use Inspector to verify loaded plugins.
- **HMR not working:** Make sure you run `npm run dev` and your project uses the latest template structure.
- **Database connection issues:** Check your `.env` and DB config. See template README for details.

### Debugging tips

- Use the Inspector Dashboard for live logs, API health, and error overlays.
- Run `npx swivify inspect` to launch Inspector.
- Check the Inspector's logs and error overlays for real-time feedback.

[Back to Guide](./)
