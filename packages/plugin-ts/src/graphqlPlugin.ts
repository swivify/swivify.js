import type { SwivifyPlugin } from '@swivify/core';

export function graphqlPlugin(): SwivifyPlugin {
  return {
    name: 'graphql',
    onStart: () => {
      console.log('[graphql] onStart: Setting up GraphQL server...');
      // Here you could initialize ApolloServer, load schemas, etc.
    },
    onValidateConfig: (config) => {
      if (!config.graphqlSchema) {
        return 'Missing graphqlSchema in config';
      }
      return true;
    },
  };
}
