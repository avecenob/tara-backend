const {DataTypes} = require('sequelize');
const Connection = require('../config/database');

const dbConnection = Connection.connect;

const User = dbConnection.define('user', {
  id: {
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
  tourism_preferences: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

(async () => {
  await User.sync({alter: true});
})();

module.exports = User;
