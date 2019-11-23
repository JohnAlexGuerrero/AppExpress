const { Pool } = require("pg")
// Coloca aquí tus credenciales
const pool = new Pool({
  user: 'postgres',
  host: "127.0.0.1",
  database: "store",
  password: 'postgrest',
  port: 5433,
});

module.exports = pool;