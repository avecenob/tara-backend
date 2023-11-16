const {DataTypes} = require('sequelize');
const Connection = require('../config/database');

const dbConnection = Connection.connect;

const User = dbConnection.define('user', {
  user_id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

(async () => {
  await User.sync({alter: true});
})();

module.exports = User;
// console.log(module.exports);
