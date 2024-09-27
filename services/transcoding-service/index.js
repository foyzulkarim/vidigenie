const fastify = require('fastify')({ logger: true });

const serviceName = 'Transcoding Service';

const port = process.env.PORT || 4006;

fastify.get('/health', async (req, res) => {
  return {
    service: serviceName,
    timestamp: new Date().toISOString(),
  };
});

fastify.all('/', (req, res) => {
  res.code(404).send({ message: 'Not Found', service: serviceName });
});

const start = async () => {
  try {
    await fastify.listen({ port: port });
    console.log(`${serviceName} is running on http://localhost:${port}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
  