const loginHandler = require('./handler/loginHandler');
const registerHandler = require('./handler/registerHandler');
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return {
        message: 'Hello, Wolrd!',
      };
    },
  },
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler,
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
  },
  {
    method: 'GET',
    path: '/home',
    options: {
      auth: 'jwt_auth',
    },
    handler: () => {
      return {
        message: 'Hello, World!',
      };
    },
  },
];

module.exports = routes;
