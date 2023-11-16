const {nanoid} = require('nanoid');
const bcrypt = require('bcrypt');
const User = require('../model/user');
// const Connection = require('../config/database');

const registerHandler = async (request, h) => {
  const {
    name,
    email,
  } = request.payload;

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
