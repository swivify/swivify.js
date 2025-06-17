import Fastify from 'fastify';

const fastify = Fastify();

fastify.get('/', async (request, reply) => {
  return { message: 'Hello from Swivify Fastify template!' };
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
fastify.listen({ port: PORT }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server listening at ${address}`);
});
