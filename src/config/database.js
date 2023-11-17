const Sequelize = require('sequelize');

const sequelize = new Sequelize('', '', '', {
  host: '34.172.140.175',
  port: '3306',
  dialect: 'mysql',
  logging: console.log,
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

/**
 * Uncomment the code below to commence connection test
 */
// testConnection();

module.exports = {testConnection, connect: sequelize};
