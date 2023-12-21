const User = require('../../model/user');
const bcrypt = require('bcrypt');
const {generateToken} = require('../../util/token');

const loginHandler = async (request, h) => {
  const {email, password} = request.payload;

  if (!email || !password) {
    const response = h.response({
      error: 'true',
      message: 'Missing required data',
    });
    response.code(400);
    return response;
  }

  const user = await User.findOne({where: {email: email}});

  if (!user) {
    const response = h.response({
      error: 'true',
      message: 'User not found',
    });
    response.code(401);
    return response;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    const response = h.response({
      error: 'true',
      message: 'Wrong password',
    });
    response.code(401);
    return response;
  }

  const token = generateToken(user.id);

  const response = h.response({
    error: false,
    message: 'Login success',
    loginResult: {
      userId: user.dataValues.id,
      name: user.dataValues.name,
      token: token,
    },
  });
  response.code(200);
  return response;
};


module.exports = loginHandler;
