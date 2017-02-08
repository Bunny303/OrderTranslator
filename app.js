const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const multer = require('multer');
let app = express();

let env = process.env.NODE_ENV || 'development';
let config = require('./config/config');
//let config = require('./config/config')[env];

app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(multer({dest: './uploads/'}).single('userDocument'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

require('./config/database')(config);
require('./models/User');
require('./routes')(app);
//require('./server/config/passport')();

app.listen(config.port);
console.log('Express listen on port ' + config.port);

