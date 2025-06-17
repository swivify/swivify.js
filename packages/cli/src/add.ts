#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import readline from 'readline';

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      rl.close();
      resolve(ans);
    }),
  );
}

async function main() {
  const integrations = ['auth', 'prisma', 'graphql', 'env', 'fastify'];
  const integration =
    process.argv[2] ||
    (await prompt(`Which integration to add? (${integrations.join(', ')}): `));
  if (!integrations.includes(integration)) {
    console.error(`Unknown integration: ${integration}`);
    process.exit(1);
  }

  // Example: Add Auth integration
  if (integration === 'auth') {
    // 1. Install dependencies (user should run: npm install ...)
    console.log(
      'To enable Auth, you may want to install packages like jsonwebtoken, bcrypt, etc.',
    );
    // 2. Update swivify.config.js
    const configPath = path.resolve(process.cwd(), 'swivify.config.js');
    if (fs.existsSync(configPath)) {
      let configContent = fs.readFileSync(configPath, 'utf-8');
      if (!configContent.includes('authPlugin')) {
        configContent = configContent.replace(
          /plugins: \[/,
          'plugins: [\n    authPlugin(),',
        );
        fs.writeFileSync(configPath, configContent, 'utf-8');
        console.log('Added authPlugin() to plugins in swivify.config.js');
      } else {
        console.log('authPlugin() already present in config.');
      }
    } else {
      console.error('swivify.config.js not found in this directory.');
    }
    // 3. Scaffold example route (optional)
    const routesDir = path.resolve(process.cwd(), 'src', 'routes');
    if (!fs.existsSync(routesDir)) fs.mkdirSync(routesDir, { recursive: true });
    const authRoutePath = path.join(routesDir, 'auth.ts');
    if (!fs.existsSync(authRoutePath)) {
      fs.writeFileSync(
        authRoutePath,
        `import { Router } from 'express';\n\nconst router = Router();\n\nrouter.post('/login', (req, res) => {\n  // Dummy login logic\n  res.json({ token: 'fake-jwt-token' });\n});\n\nexport default router;\n`,
      );
      console.log('Scaffolded src/routes/auth.ts');
    } else {
      console.log('src/routes/auth.ts already exists.');
    }
    console.log('Auth integration complete!');
    return;
  }

  // Example: Add Prisma integration
  if (integration === 'prisma') {
    console.log(
      'To enable Prisma, you may want to install @prisma/client and prisma.',
    );
    const configPath = path.resolve(process.cwd(), 'swivify.config.js');
    if (fs.existsSync(configPath)) {
      let configContent = fs.readFileSync(configPath, 'utf-8');
      if (!configContent.includes('prismaPlugin')) {
        configContent = configContent.replace(
          /plugins: \[/,
          'plugins: [\n    prismaPlugin(),',
        );
        fs.writeFileSync(configPath, configContent, 'utf-8');
        console.log('Added prismaPlugin() to plugins in swivify.config.js');
      } else {
        console.log('prismaPlugin() already present in config.');
      }
    } else {
      console.error('swivify.config.js not found in this directory.');
    }
    // Scaffold example Prisma schema
    const prismaDir = path.resolve(process.cwd(), 'prisma');
    if (!fs.existsSync(prismaDir)) fs.mkdirSync(prismaDir, { recursive: true });
    const schemaPath = path.join(prismaDir, 'schema.prisma');
    if (!fs.existsSync(schemaPath)) {
      fs.writeFileSync(
        schemaPath,
        `// Example Prisma schema\nmodel User {\n  id    Int     @id @default(autoincrement())\n  email String  @unique\n  name  String?\n}\n`,
      );
      console.log('Scaffolded prisma/schema.prisma');
    } else {
      console.log('prisma/schema.prisma already exists.');
    }
    console.log('Prisma integration complete!');
    return;
  }

  // Example: Add GraphQL integration
  if (integration === 'graphql') {
    console.log(
      'To enable GraphQL, you may want to install apollo-server and graphql.',
    );
    const configPath = path.resolve(process.cwd(), 'swivify.config.js');
    if (fs.existsSync(configPath)) {
      let configContent = fs.readFileSync(configPath, 'utf-8');
      if (!configContent.includes('graphqlPlugin')) {
        configContent = configContent.replace(
          /plugins: \[/,
          'plugins: [\n    graphqlPlugin(),',
        );
        fs.writeFileSync(configPath, configContent, 'utf-8');
        console.log('Added graphqlPlugin() to plugins in swivify.config.js');
      } else {
        console.log('graphqlPlugin() already present in config.');
      }
    } else {
      console.error('swivify.config.js not found in this directory.');
    }
    // Scaffold example GraphQL schema
    const schemaPath = path.resolve(process.cwd(), 'schema.graphql');
    if (!fs.existsSync(schemaPath)) {
      fs.writeFileSync(
        schemaPath,
        `type User {\n  id: ID!\n  email: String!\n  name: String\n}\ntype Query {\n  users: [User!]!\n}\ntype Mutation {\n  createUser(email: String!, name: String): User!\n}\n`,
      );
      console.log('Scaffolded schema.graphql');
    } else {
      console.log('schema.graphql already exists.');
    }
    console.log('GraphQL integration complete!');
    return;
  }

  // Example: Add Env integration
  if (integration === 'env') {
    console.log('To enable Env, you may want to install dotenv.');
    const configPath = path.resolve(process.cwd(), 'swivify.config.js');
    if (fs.existsSync(configPath)) {
      let configContent = fs.readFileSync(configPath, 'utf-8');
      if (!configContent.includes('envPlugin')) {
        configContent = configContent.replace(
          /plugins: \[/,
          'plugins: [\n    envPlugin(),',
        );
        fs.writeFileSync(configPath, configContent, 'utf-8');
        console.log('Added envPlugin() to plugins in swivify.config.js');
      } else {
        console.log('envPlugin() already present in config.');
      }
    } else {
      console.error('swivify.config.js not found in this directory.');
    }
    // Scaffold example .env file
    const envPath = path.resolve(process.cwd(), '.env.example');
    if (!fs.existsSync(envPath)) {
      fs.writeFileSync(
        envPath,
        `# Example environment variables\nDATABASE_URL=\nAUTH_SECRET=\n`,
      );
      console.log('Scaffolded .env.example');
    } else {
      console.log('.env.example already exists.');
    }
    console.log('Env integration complete!');
    return;
  }

  // Example: Add Fastify integration
  if (integration === 'fastify') {
    console.log('To enable Fastify, you may want to install fastify.');
    const configPath = path.resolve(process.cwd(), 'swivify.config.js');
    if (fs.existsSync(configPath)) {
      let configContent = fs.readFileSync(configPath, 'utf-8');
      if (!configContent.includes('fastifyPlugin')) {
        configContent = configContent.replace(
          /plugins: \[/,
          'plugins: [\n    fastifyPlugin(),',
        );
        fs.writeFileSync(configPath, configContent, 'utf-8');
        console.log('Added fastifyPlugin() to plugins in swivify.config.js');
      } else {
        console.log('fastifyPlugin() already present in config.');
      }
    } else {
      console.error('swivify.config.js not found in this directory.');
    }
    // Scaffold example Fastify server
    const srcDir = path.resolve(process.cwd(), 'src');
    if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true });
    const fastifyPath = path.join(srcDir, 'fastify-server.ts');
    if (!fs.existsSync(fastifyPath)) {
      fs.writeFileSync(
        fastifyPath,
        `import Fastify from 'fastify';\n\nconst fastify = Fastify();\n\nfastify.get('/', async (request, reply) => {\n  return { hello: 'world' };\n});\n\nfastify.listen({ port: 3000 }, (err, address) => {\n  if (err) throw err;\n  console.log('Fastify server running at', address);\n});\n`,
      );
      console.log('Scaffolded src/fastify-server.ts');
    } else {
      console.log('src/fastify-server.ts already exists.');
    }
    console.log('Fastify integration complete!');
    return;
  }
}

main();
