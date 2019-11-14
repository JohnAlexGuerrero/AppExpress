const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'store',
    password: 'postgrest',
    port: 5432,
});

module.exports = pool;