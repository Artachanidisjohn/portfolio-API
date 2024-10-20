const { Pool } = require('pg');

// @ts-ignore
const config = require('./api/config/config');

const envConfig = process.env.NODE_ENV === 'production' ? config.production : config.development;

const pool = new Pool({
    user: envConfig.db.user,
    host: envConfig.db.options.host,
    database: envConfig.db.database,
    password: envConfig.db.password,
    port: envConfig.db.options.port,
});

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
};
