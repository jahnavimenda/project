const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "jahnavi@2005",
  database: "form",
});

module.exports = pool;
