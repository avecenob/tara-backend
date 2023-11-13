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
];

module.exports = routes;
