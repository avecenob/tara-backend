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
];

module.exports = routes;
