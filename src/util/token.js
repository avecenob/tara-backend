require('dotenv').config({path: __dirname + '/../../.env'});
const Jwt = require('@hapi/jwt');
const {
  JWT_SECRET,
  JWT_AUDIENCE,
  JWT_ISSUER,
  JWT_ALGORITHM,
} = process.env;

const generateToken = (user) => {
  const token = Jwt.token.generate({
    aud: JWT_AUDIENCE,
    iss: JWT_ISSUER,
    user: user,
  },
  {
    key: JWT_SECRET,
    algorithm: JWT_ALGORITHM,
  },
  {
    ttlSec: 14400,
  });

  return token;
};

const validateToken = (artifacts, request, h) => {
  let isValid;

  if (artifacts.decoded.payload.aud === JWT_AUDIENCE) {
    isValid = true;
  } else {
    isValid = false;
  }

  return {
    isValid,
    credentials: {user: artifacts.decoded.payload.user},
  };
};

module.exports = {generateToken, validateToken};
