require('dotenv').config({path: __dirname + '../.env'});
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const routes = require('./routes');
const {validateToken} = require('./util/token');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(Jwt);

  server.auth.strategy('jwt_auth', 'jwt', {
    keys: process.env.JWT_SECRET,
    verify: {
      aud: process.env.JWT_AUDIENCE,
      iss: process.env.JWT_ISSUER,
      sub: false,
      maxAgeSec: 14400,
    },
    validate: validateToken,
  });

  server.route(routes);

  await server.start();

  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`Server is running on ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
