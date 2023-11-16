const Sequelize = require('sequelize');

const sequelize = new Sequelize('tara_test', 'root', 'baruna', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql',
});

// Test DB connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database established');
  } catch (error) {
    console.log('Failed to connect to database!');
  }
};
// testConnection();

module.exports = {testConnection, connect: sequelize};
