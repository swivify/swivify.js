import type { SwivifyPlugin } from '@swivify/core';

export const customPlugin: SwivifyPlugin = {
  name: 'custom',
  onStart: () => {
    console.log('[custom] onStart');
  },
  onBuild: () => {
    console.log('[custom] onBuild');
  },
};
