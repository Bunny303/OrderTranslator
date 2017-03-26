let config = {
    development: {
        'port': 8000,
        'db': 'mongodb://localhost:27017/translatordb',
        'redis_host': 'localhost',
        'redis_port': 6379
    },

    production: {
        db: process.env.MONGODB_URI,
        port: process.env.PORT,
        redis_host: process.env.REDISTOGO_URL,
        redis_port: process.env.redis_port
    }
};

module.exports = config;