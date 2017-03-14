const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

let requiredValidationMessage = '{PATH} is required';
let orderSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userText: {type: String, required: requiredValidationMessage},
    sampleText: String,
    fromLanguage: String,
    toLanguage: String,
    qualityLevel: {type: String, required: requiredValidationMessage},
    userComment: String,
    confirm: Boolean,
    create_dt: {type: Date, default: Date.now},
    update_dt: {type: Date, default: Date.now},
    confirm_dt: Date,
    status: {
        type: Number,
        enum: [1, 2, 3],
        default: 1
    }
});

let Order = mongoose.model('Order', orderSchema);