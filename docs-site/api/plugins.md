# Plugin API

## Overview

Swivify plugins extend core functionality via lifecycle hooks and config.

## Creating a Plugin

```ts
import { definePlugin } from '@swivify/core';

export default definePlugin({
  name: 'my-plugin',
  onInit(app) {
    // ...
  },
  onStart() {
    // ...
  },
  onValidateConfig(config) {
    // ...
  },
  onError(error) {
    // ...
  },
});
```

## Lifecycle Hooks

- `onInit`
- `onStart`
- `onRestart`
- `onBuild`
- `onShutdown`
- `onValidateConfig`
- `onLoad`
- `onError`

## Validation

Plugins can validate config and provide custom options.

See [Advanced Guides](/guide/advanced#custom-plugins) for real-world examples.

[Back to API Reference](./)
