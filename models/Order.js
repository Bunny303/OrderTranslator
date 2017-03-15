const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

let requiredValidationMessage = '{PATH} is required';
let orderSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userText: {type: String, required: requiredValidationMessage},
    translatedText: String,
    sampleText: String,
    fromLanguage: String,
    toLanguage: String,
    qualityLevel: {type: String, required: requiredValidationMessage},
    userComment: String,
    confirm: Boolean,
    create_dt: {type: Date, default: Date.now},
    update_dt: {type: Date, default: Date.now},
    //timestamps: { createdAt: 'created_dt', updatedAt: 'updated_dt' },
    confirm_dt: Date,
    status: {
        type: Number,
        enum: [1, 2, 3],
        default: 1
    }
});

//orderSchema.method({
//    authenticate: function (password) {
//        let inputHashedPassword = CryptoHelper.generateHashedPassword(this.salt, password);
//        if (inputHashedPassword === this.hashedPass) {
//            return true;
//        } else {
//            return false;
//        }
//    }
//});

let Order = mongoose.model('Order', orderSchema);