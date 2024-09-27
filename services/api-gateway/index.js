const Fastify = require('fastify');
const server = Fastify();
const proxy = require('@fastify/http-proxy');
/**
 * List of services
 * # Services = Total 12 services
 * ## Analytics Service : 4011
 * ## API Gateway : 4000
 * ## Auth Service : 4001
 * ## CDN Service : 4010
 * ## Metadata Service : 4005
 * ## Notification Service : 4007
 * ## Search Service : 4008
 * ## Storage Service : 4004
 * ## Streaming Service : 4009
 * ## Transcoding Service : 4006
 * ## Upload Service : 4003
 * ## User Service : 4002
 */


const services = [
  { name: 'analytics', port: 4011 },
  { name: 'auth', port: 4001 },
  { name: 'cdn', port: 4010 },
  { name: 'metadata', port: 4005 },
  { name: 'notification', port: 4007 },
  { name: 'search', port: 4008 },
  { name: 'storage', port: 4004 },
  { name: 'streaming', port: 4009 },
  { name: 'transcoding', port: 4006 },
  { name: 'upload', port: 4003 },
  { name: 'user', port: 4002 },
];

for (const service of services) {
  server.register(proxy, {
    upstream: `http://localhost:${service.port}`,
    prefix: `/${service.name}`,
    http2: false,
  });
} 

server.all('/', (req, res) => {
  res.code(404).send({ message: 'Not Found' });
});

const start = async () => {
  try {
    await server.listen({ port: 4000 });
    console.log('API Gateway is running on http://localhost:4000');
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
