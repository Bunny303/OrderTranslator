const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

let requiredValidationMessage = '{PATH} is required';
let orderSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userText: {type: String, required: requiredValidationMessage},
    fromLanguage: String,
    toLanguage: String,
    qualityLevel: {type: String, required: requiredValidationMessage},
    userComment: String,
    paid: Boolean
});

let Order = mongoose.model('Order', orderSchema);