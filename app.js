const express = require('express');
let app = express();
let config = require('./config/config.js');
//let config = require('./server/config/config')[env]

//configuration
let env = process.env.NODE_ENV || 'development';
let port = process.env.PORT || '8000';
app.set('port', port);
app.set('superSecret', config.secret);


app.listen(port);
module.exports = app;
