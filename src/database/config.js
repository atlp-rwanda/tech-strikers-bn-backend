const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "andela",
  host: "localhost",
  database: "barefootnomad_db",
  password: "andela2020",
  port: "5432"
});


module.exports = pool;