const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "dabbest!",
  host: "localhost",
  database: "Todo",
});

module.exports = pool;
