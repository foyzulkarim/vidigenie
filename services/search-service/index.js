const fastify = require('fastify')({ logger: true });

const serviceName = 'Search Service';

const port = process.env.PORT || 4008;

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
