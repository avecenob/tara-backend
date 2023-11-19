const Sequelize = require('sequelize');

/**
 * Change variables below with these values:
 * DB_HOST      = database instance IP address
 * DB_NAME      = database name
 * DB_USER      = mysql user
 * DB_PASSWORD  = mysql user's password
 *
 * It is recommended to use environment variables
 */
const DB_HOST = '';
const DB_NAME = '';
const DB_USER = '';
const DB_PASSWORD = '';

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
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
