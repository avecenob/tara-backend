const registerHandler = require('./handler/registerHandler');
// const Connection = require('./config/database');
// const {nanoid} = require('nanoid');
// const User = require('./model/user');
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
    // handler: async () => {
    //   const id = 'user-' + nanoid(16);
    //   const newUser = await User.create({
    //     user_id: id,
    //     name: 'John Doe',
    //     email: 'johndoe@test.com',
    //     password: 'passwd',
    //   });
    //   if (newUser) {
    //     return {
    //       message: 'User created successfully',
    //       userId: newUser.user_id,
    //     };
    //   }
    // },
  },
];

module.exports = routes;
