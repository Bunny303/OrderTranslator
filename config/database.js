let mongoose = require('mongoose');

//default mongoose promises are deprecated, so we use built-in promises
mongoose.Promise = global.Promise;

let configdb = (config) => {
    mongoose.connect(config.db);
    let db = mongoose.connection;

    db.once('open', err => {
        if (err) {
            console.log(err)
        }
        console.log('MongoDB up and running!')
    });

    db.on('error', err => console.log('Database error: ' + err));
};

module.exports = configdb;