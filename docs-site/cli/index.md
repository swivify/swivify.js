# CLI Usage

Swivify provides a powerful CLI for scaffolding, development, and automation.

## Commands

- `create` — Scaffold a new project interactively
- `dev` — Start the dev server with HMR
- `build` — Build for production
- `test` — Run tests
- `inspect` — Launch Inspector Dashboard

## Options

- `--template <name>` — Use a specific template
- `--db <type>` — Select database (if supported)
- `--features <list>` — Enable features (auth, file-upload, etc.)
- `--generate-completion` — Output shell auto-completion script

## Auto-completion

Swivify CLI supports shell auto-completion. Run:

```sh
npx swivify --generate-completion
```

## Troubleshooting

- For CLI errors, run with `--debug` for verbose output.
- See [FAQ & Troubleshooting](/guide/faq) for more help.

[Back to Home](/)
