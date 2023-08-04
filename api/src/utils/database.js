const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'timekeeper',
  // password: '123Platon456.',
  // database: 'id21111726_timekeeper',
});

module.exports = pool;
