import type { SwivifyPlugin } from '@swivify/core';

export function fastifyPlugin(): SwivifyPlugin {
  return {
    name: 'fastify',
    onStart: () => {
      console.log('[fastify] onStart: Setting up Fastify server...');
      // Here you could initialize Fastify, register plugins, etc.
    },
    onValidateConfig: (config) => {
      if (!config.fastifyOptions) {
        return 'Missing fastifyOptions in config';
      }
      return true;
    },
  };
}
