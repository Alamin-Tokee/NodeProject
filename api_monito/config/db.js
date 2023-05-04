const mysql = require('mysql');
const util = require('util');
const colors = require('colors');
require('dotenv').config();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  // port: process.env.DB_PORT,
  user: process.env.DB_USER_NM,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});
// promise wrapper to enable async await with MYSQL
connection.query = util.promisify(connection.query).bind(connection);

// connect to the database
connection.connect(function (err) {
  if (err) {
    console.log(
      colors.blue.bold(`error connecting:  + ${err.stack}`)
    );
    return;
  }
  console.log(
    colors.blue.bold(`connected as... + ${connection.threadId}`)
  );
});

module.exports = connection;
