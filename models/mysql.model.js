var mysql = require('mysql2');
//const config = require('../config/db.config');

var conn = mysql.createConnection({
  host: process.env.HOST, // Replace with your host name
  user: process.env.USER,      // Replace with your database username
  password: process.env.PASSWORD,      // Replace with your database password
  database: process.env.DATABASE // // Replace with your database Name
}).promise();
var pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
}).promise()

pool.on('connection', function(connection) {
  console.log(`Connected to MySql db: ${process.env.DATABASE}`);
});

pool.on('error', function(err) {
  console.log('Data Base Error: ' + err);
  throw err;
});

module.exports = pool;