const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

let requiredValidationMessage = '{PATH} is required';
let orderSchema = mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    userText: {type: String, required: requiredValidationMessage},
    translatedText: String,
    sampleText: String,
    wordsCount: Number,
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

//orderSchema.pre('save', function (next) {
//    var self = this;
//
//    Order.findOne({_id: this.id}, 'userId', function (err, result) {
//        if (err) {
//            next(err);
//        }
//        else {
//            if (result && result.userId.toString() != self.userId.toString()) {
//                var err = new Error('NO PERMISSIONS');
//                next(err);
//            }
//            else {
//                //if there is no result then order is not created yet
//                //or in cas eof update user id is the same as logged user id
//                next();
//            }
//        }
//    });
//});

//orderSchema.pre('update', function() {
//    this.update({},{ $set: { update_dt: new Date() } });
//});

let Order = mongoose.model('Order', orderSchema);