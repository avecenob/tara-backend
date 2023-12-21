const loginHandler = require('./handler/auth/login');
const registerHandler = require('./handler/auth/register');
const getTouristAttractionsHandler = require(
    './handler/touristAttractions/touristAttractions');
const setUserPreferencesHandler = require(
    './handler/user/userPreferences');
const routes = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return {
        message: 'API is up and running!',
      };
    },
  },
  {
    method: 'GET',
    path: '/test-auth',
    options: {
      auth: 'jwt_auth',
    },
    handler: () => {
      return {
        message: 'Authentication strategy is working as expected!',
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
    method: 'POST',
    path: '/tourist-attractions/{city}',
    options: {
      auth: 'jwt_auth',
    },
    handler: getTouristAttractionsHandler,
  },
  {
    method: 'POST',
    path: '/users/user-preferences',
    options: {
      auth: 'jwt_auth',
    },
    handler: setUserPreferencesHandler,
  },
];

module.exports = routes;
