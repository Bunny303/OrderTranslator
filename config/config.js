let config = {
        'secret': 'ilovefluffybunnies',
        'port': 8000,
        'db': 'mongodb://localhost:27017/translatordb'

        //production: {
        //    rootPath: rootPath,
        //    db: process.env.MONGO_DB_CONN_STRING,
        //    port: process.env.port
    };

module.exports = config;