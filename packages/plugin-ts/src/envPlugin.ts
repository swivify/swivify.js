import type { SwivifyPlugin } from '@swivify/core';

export function envPlugin(): SwivifyPlugin {
  return {
    name: 'env',
    onStart: () => {
      console.log('[env] onStart: Loading environment variables...');
      // Here you could load .env files, validate env vars, etc.
    },
    onValidateConfig: (config) => {
      if (!config.env || typeof config.env !== 'object') {
        return 'Missing or invalid env config';
      }
      return true;
    },
  };
}
