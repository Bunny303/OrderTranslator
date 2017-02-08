const mongoose = require('mongoose');
const CryptoHelper = require('../helpers/CryptoHelper');

let requiredValidationMessage = '{PATH} is required';
let userSchema = mongoose.Schema({
    username: {type: String, unique: true, required: requiredValidationMessage},
    firstName: {type: String, required: requiredValidationMessage},
    lastName: {type: String, required: requiredValidationMessage},
    salt: String,
    hashedPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function (password) {
        let inputHashedPassword = CryptoHelper.generateHashedPassword(this.salt, password);
        if (inputHashedPassword === this.hashedPass) {
            return true;
        } else {
            return false;
        }
    }
});

let User = mongoose.model('User', userSchema);