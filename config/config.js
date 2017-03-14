let config = {
    development: {
        'port': 8000,
        'db': 'mongodb://localhost:27017/translatordb',
        'redis_host': 'localhost',
        'redis_port': 6379
    },

    production: {
        //db: process.env.MONGO_DB_CONN_STRING,
        //port: process.env.port
    }
};

module.exports = config;