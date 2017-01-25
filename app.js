const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
//var upload = multer({ dest: 'uploads/' })
let app = express();


//configuration
let env = process.env.NODE_ENV || 'development';
let config = require('./config/config');
//let config = require('./config/config')[env]
app.set('port', config.port);
app.use(express.static(path.join(__dirname, 'public')));
//app.set('superSecret', config.secret);
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({dest: './uploads/'}).single('userDocument'));

let routes = require('./routes')(app);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.listen(config.port);
console.log('Express listen on port ' + config.port);

