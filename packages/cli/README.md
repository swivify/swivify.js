# @swivify/cli

The main CLI for Swivify, providing commands for modern Node.js backend development.

## Features

- `swivify dev` – Start the dev server with file watching and hot reload
- `swivify build` – Bundle the app for production using esbuild
- `swivify preview` – Run the built server for preview
- Loads project config and .env automatically
- Plugin system support
- Beautiful, colored output

## Development

- Build: `npm run build`
- Test locally: `npm link` (then use `swivify` globally)
- Source: `src/index.ts`

## Usage (in a user project)

```sh
swivify dev
swivify build
swivify preview
```

## Contributing

- See the monorepo root README for architecture and roadmap.
- PRs and issues welcome!
