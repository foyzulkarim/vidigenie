require('dotenv').config();

const fastify = require('fastify')({ logger: true });
const passport = require('@fastify/passport');
const secureSession = require('@fastify/secure-session');
const GitHubStrategy = require('passport-github2').Strategy;

const serviceName = 'Auth Service';
const port = process.env.PORT || 4001;

// GitHub OAuth configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const CALLBACK_URL = 'http://localhost:4000/api/auth/github/callback';

// Register secure session
fastify.register(secureSession, {
  secret: process.env.ENCRYPTION_KEY,
  // "salt must be length 16"
  salt: '1234567890123456',
});

// Register Passport
fastify.register(passport.initialize());
fastify.register(passport.secureSession());

// Configure GitHub strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // Here you would typically find or create a user in your database
      // For this example, we'll just pass the profile along
      return done(null, profile);
    }
  )
);

// Serialize user for the session
passport.registerUserSerializer(async (user, request) => {
  console.log('registerUserSerializer user', user);
  return user.id;
});

// Deserialize user from the session
passport.registerUserDeserializer(async (id, request) => {
  // Here you would typically fetch the user from the database
  // For this example, we'll just return an object with the id
  console.log('id', id);
  return { id };
});

// Routes
fastify.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

fastify.get('/github/callback', {
  preValidation: passport.authenticate('github', { failureRedirect: '/login' }),
  handler: (req, reply) => {
    console.log('/github/callback', req.user);
    // Successful authentication, redirect home.
    reply.redirect('http://localhost:3030/login-success');
  },
});

fastify.get('/user', (req, reply) => {
  if (req.user) {
    reply.send(req.user);
  } else {
    reply.code(401).send({ error: 'Not authenticated' });
  }
});

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
