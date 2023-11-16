const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(Jwt);

  // server.auth.strategy('jwt_strategy', 'jwt', {
  //   keys: 'so_secret_keys',
  //   verify: {
  //     aud: ''
  //   }
  // });

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
