import type { SwivifyPlugin } from '@swivify/core';

/**
 * Example advanced plugin using new lifecycle hooks.
 */
export function pluginTs(): SwivifyPlugin {
  return {
    name: 'plugin-ts',
    beforeStart: () => {
      console.log('[plugin-ts] beforeStart: Preparing environment...');
    },
    onStart: () => {
      console.log('[plugin-ts] onStart: Plugin started!');
    },
    afterStart: () => {
      console.log('[plugin-ts] afterStart: Startup complete.');
    },
    onBuild: () => {
      console.log('[plugin-ts] onBuild: Building TypeScript sources...');
    },
    onLoad: (context: unknown) => {
      console.log(
        '[plugin-ts] onLoad: Loading resources with context:',
        context,
      );
    },
    onValidateConfig: (config: Record<string, unknown>) => {
      if (!config.tsConfigPath) {
        return 'Missing tsConfigPath in config';
      }
      return true;
    },
    onError: (error: Error) => {
      console.error('[plugin-ts] Error:', error.message);
    },
  };
}
