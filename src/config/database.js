require('dotenv').config({path: __dirname + '/../../.env'});
const Sequelize = require('sequelize');

/**
 * Change variables below with these values:
 * DB_HOSTNAME  = database instance IP address
 * DB_NAME      = database name
 * DB_USERNAME  = mysql user
 * DB_PASSWORD  = mysql user's password
 * DB_DIALECT   = mysql
 *
 * It is recommended to use environment variables
 */

const {
  DB_DIALECT,
  DB_HOSTNAME,
  DB_NAME,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOSTNAME,
  port: DB_PORT,
  dialect: DB_DIALECT,
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
