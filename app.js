const express = require('express');
let app = express();
let config = require('./config/config');
//let config = require('./server/config/config')[env]
let routes = require('./routes')(app);

//configuration
let env = process.env.NODE_ENV || 'development';
let port = process.env.PORT || '8000';
app.set('port', port);
app.set('superSecret', config.secret);

// view engine setup
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(config.port);
console.log('Express listen!');

