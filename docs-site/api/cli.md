# Swivify CLI API

## Overview

The Swivify CLI provides commands for scaffolding, development, and automation.

## Commands

- `create` — Scaffold a new project
- `dev` — Start the dev server
- `build` — Build for production
- `test` — Run tests
- `inspect` — Launch Inspector Dashboard

## Options

- `--template <name>` — Use a specific template
- `--db <type>` — Select database (if supported)
- `--features <list>` — Enable features (auth, file-upload, etc.)
- `--generate-completion` — Output shell auto-completion script

## Programmatic Usage

You can use the CLI programmatically:

```ts
import { runCLI } from '@swivify/cli';
runCLI(['create', 'my-app']);
```

[Back to API Reference](./)
