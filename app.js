const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
let app = express();
let routes = require('./routes')(app);

//configuration
let env = process.env.NODE_ENV || 'development';
let config = require('./config/config');
//let config = require('./config/config')[env]
app.set('port', config.port);
//app.set('superSecret', config.secret);
//app.use(express.static(config.rootPath + 'public'))
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(config.port);
console.log('Express listen on port ' + config.port);

