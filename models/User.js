const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {type: String, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    salt: String,
    hashedPass: String,
    roles: [String]
});

let User = mongoose.model('User', userSchema);