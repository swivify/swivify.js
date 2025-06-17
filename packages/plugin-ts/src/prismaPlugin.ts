import type { SwivifyPlugin } from '@swivify/core';

export function prismaPlugin(): SwivifyPlugin {
  return {
    name: 'prisma',
    onStart: () => {
      console.log('[prisma] onStart: Checking for schema.prisma...');
      // Here you could check for schema.prisma, run migrations, etc.
    },
    onBuild: () => {
      console.log('[prisma] onBuild: Generating Prisma client...');
      // Here you could run `prisma generate`
    },
    onValidateConfig: (config) => {
      if (!config.databaseUrl) {
        return 'Missing databaseUrl in config';
      }
      return true;
    },
  };
}
