// Example Swivify config using all official plugins
import { prismaPlugin } from './packages/plugin-ts/src/prismaPlugin.js';
import { authPlugin } from './packages/plugin-ts/src/authPlugin.js';
import { envPlugin } from './packages/plugin-ts/src/envPlugin.js';
import { graphqlPlugin } from './packages/plugin-ts/src/graphqlPlugin.js';
import { fastifyPlugin } from './packages/plugin-ts/src/fastifyPlugin.js';

export default {
    databaseUrl: process.env.DATABASE_URL,
    authSecret: process.env.AUTH_SECRET,
    env: process.env, // or custom env config
    graphqlSchema: './schema.graphql',
    fastifyOptions: {},
    plugins: [
        prismaPlugin(),
        authPlugin(),
        envPlugin(),
        graphqlPlugin(),
        fastifyPlugin(),
    ],
};
