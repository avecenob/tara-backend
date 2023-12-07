const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');
const User = require('../model/user');

const registerHandler = async (request, h) => {
  const {
    name,
    email,
  } = request.payload;

  const isRegistered = await User.findOne({where: {email: email}});

  if (isRegistered) {
    const response = h.response({
      error: true,
      message: 'Email already registered',
    });
    response.code(400);
    return response;
  }

  const password = bcrypt.hashSync(request.payload['password'], 10);
  const id = 'user-' + nanoid(16);
  const newUser = await User.create({
    user_id: id,
    name: name,
    email: email,
    password,
  });

  const response = h.response({
    error: false,
    message: 'User created',
    id: newUser.id,
  });
  response.code(201);
  return response;
};

module.exports = registerHandler;
