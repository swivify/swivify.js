import type { SwivifyPlugin } from '@swivify/core';

export function authPlugin(): SwivifyPlugin {
  return {
    name: 'auth',
    onStart: () => {
      console.log('[auth] onStart: Setting up authentication...');
      // Here you could initialize auth strategies, check env vars, etc.
    },
    onConfig: (config: Record<string, any>) => {
      console.log('[auth] onConfig: Received config', config);
    },
    onValidateConfig: (config: Record<string, any>) => {
      if (!config.authSecret) {
        return 'Missing authSecret in config';
      }
      return true;
    },
  };
}
