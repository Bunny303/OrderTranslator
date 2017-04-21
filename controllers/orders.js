const async = require('async');
const fs = require('fs');
let Order = require('mongoose').model('Order');
const path = require('path');
const standartLevelString = 'Стандартно';
const standartLevelPrice = 0.05;
const highLevelPrice = 0.07;
const errorConfig = require('../config/errors');
const langHelperer = require('../helpers/LanguageHelper');
const stringsConfig = require('../config/strings');

let OrdersController = {
    create: (req, res) => {
        let data, file;

        //if redirectBody exist it means that request comes after login required
        if (req.session.redirectBody) {
            data = req.session.redirectBody;
            delete req.session.redirectBody;
        }
        else {
            data = req.body;
        }
        //if redirectFile exist it means that request comes after login required
        if (req.session.redirectFile) {
            file = req.session.redirectFile;
            delete req.session.redirectFile;
        }
        else {
            file = req.file;
        }

        //if we have file uploaded we should save text into db and count the words
        async.waterfall([
            function (callback) {
                var wordsCount;
                if (file) {

                    //check file size
                    if (file.size > (16 * 1024 * 1024)) {
                        return callback(new Error(errorConfig.oversizeFile));
                    }

                    //check file type
                    let allowedExt = ['.txt', '.doc', '.docx', '.odt', '.rtf'];
                    let ext = path.extname(file.originalname);

                    if (allowedExt.indexOf(ext) == -1) {
                        return callback(new Error(errorConfig.notSupportedFileType));
                    }

                    //todo: counting the words probably should be done only in one place, now it's done on front-end and on back-end
                    fs.readFile(file.path, {encoding: 'utf-8'}, function (err, data) {
                        if (err) {
                            callback(err);
                        }
                        wordsCount = data.split(" ").length;
                        callback(null, data, wordsCount);
                    });
                }
                //if we have text input from user we should save it into database and count the words
                else if (data.userText) {
                    //todo: check if formatting of text is kept
                    var userText = data.userText
                    wordsCount = userText.match(/\S+/g).length;
                    callback(null, userText, wordsCount);
                }
                else {
                    callback(new Error('No text uploaded'));
                }
            },
            function (userText, wordsCount, callback) {
                //save order into database
                var order = {
                    userId: req.user._id,
                    userText: userText,
                    sampleText: userText.substr(0, 100),
                    toLanguage: data.toLanguage,
                    qualityLevel: data.qualityLevel,
                    userComment: data.userComment,
                    confirm: false,
                    status: 1,
                    wordsCount: wordsCount
                };

                Order.create(order, function (err, savedOrder) {
                    if (err) {
                        callback(err);
                    }

                    callback(null, wordsCount, savedOrder._id);
                });
            }
        ], function (err, wordsCount, orderId) {
            if (err) {
                return res.render('document-upload', {error: err.message});
            }

            let qualityLevel = data.qualityLevel;
            let pricePerWord;
            //todo: use numbers instead of strings
            //todo: extract function, DRY!!!
            if (qualityLevel == standartLevelString) {
                //todo: fix prices to be constants
                pricePerWord = standartLevelPrice;
            }
            else {
                pricePerWord = highLevelPrice;
            }

            let totalPrice = Number(pricePerWord * wordsCount).toFixed(2);

            res.render('order-create', {
                wordsCount: wordsCount,
                qualityLevel: qualityLevel,
                pricePerWord: pricePerWord,
                totalPrice: totalPrice,
                orderId: orderId
            });
        });
    },

    prepareDocument: (req, res) => {
        let lang = langHelperer.getLanguage(req.cookies);
        res.render('document-upload', {
            navStr: stringsConfig.navigation[lang],
            contentStr: stringsConfig.documentUpload[lang],
            orderDisplayStr: stringsConfig.oderDisplay[lang],
            'qualityLevel': standartLevelString,
            'pricePerWord': standartLevelPrice,
            'wordsCount': 0,
            'totalPrice': 0,
            'active': 'new-order'
        });
    },

    getUserOrders: (req, res) => {
        Order.find({userId: req.user._id}, ['sampleText', 'confirm', 'status'], function (err, data) {
            if (err) {
                console.log(err);
            }

            let lang = langHelperer.getLanguage(req.cookies);
            res.render('my-orders', {orders: data, active: 'my-orders', navStr: stringsConfig.navigation[lang]});
        });
    },

    viewOrder: (req, res) => {
        Order.findOne({'_id': req.params.id}, function (err, order) {
            if (err) {
                console.log(err);
            }

            //todo: make generic function that checks permissions
            //todo: throws error if there is not req.user
            if (order.userId.toString() != req.user._id.toString()) {
                res.render('custom-error-page', {message: 'No permissions'});
            }
            else {
                let pricePerWord;
                if (order.qualityLevel == standartLevelString) {
                    //todo: fix prices to be constants
                    pricePerWord = standartLevelPrice;
                }
                else {
                    pricePerWord = highLevelPrice;
                }

                let totalPrice = Number(pricePerWord * order.wordsCount).toFixed(2);

                res.render('order-view', {order: order, pricePerWord: pricePerWord, totalPrice: totalPrice});
            }
        });
    },

    deleteOrder: (req, res) => {
        Order.findOne({'_id': req.params.id}, ['userId'], function (err, order) {
            if (err) {
                console.log(err);
            }

            //todo: make generic function that checks permissions
            if (order.userId.toString() != req.user._id.toString()) {
                res.render('custom-error-page', {message: 'No permissions'});
            }
            else {
                //delete order
                order.remove();
                res.redirect('/my-orders');
            }
        });
    },

    payOrder: (req, res) => {
        Order.findOne({'_id': req.params.id}, function (err, order) {
            if (err) {
                console.log(err);
            }

            //todo: make generic function that checks permissions
            if (order.userId.toString() != req.user._id.toString()) {
                res.render('custom-error-page', {message: 'No permissions'});
            }
            else {
                //change status and pay
                order.confirm = true;
                order.save(function (err, updatedOrder) {
                    if (err) {
                        console.log(err);
                    }

                    res.render('order-view', {order: updatedOrder});
                });
            }
        });
    }
};
module.exports = OrdersController;