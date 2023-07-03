require('dotenv').config();
const mysql = require("mysql2/promise");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

pool.getConnection()
  .then(result => {
    console.log('Connected to the MySQL server.');
  })
  .catch(err => {
    console.error('Error connecting to the MySQL server:', err);
  })

module.exports = pool;