//const FileManageHelper = require('../helpers/FileManageHelper');
const async = require('async');
const fs = require('fs');
let Order = require('mongoose').model('Order');

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
                    //todo: counting the words should be done only in one place, now it's done on front-end and on back-end
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
                    fromLanguage: data.fromLanguage,
                    toLanguage: data.toLanguage,
                    qualityLevel: data.qualityLevel,
                    userComment: data.userComment,
                    confirm: false,
                    status: 1
                };

                Order.create(order, function (err, savedOrder) {
                    if (err) {
                        callback(err);
                    }

                    callback(null, wordsCount);
                });
            }
        ], function (err, wordsCount) {
            if (err) {
                console.log(err);
            }

            var qualityLevel = data.qualityLevel;
            //todo: use numbers instead of strings
            if (qualityLevel == 'Стандартно') {
                //todo: fix prices to be constants
                pricePerWord = 0.05;
            }
            else {
                pricePerWord = 0.07;
            }

            totalPrice = Number(pricePerWord * wordsCount).toFixed(2);

            res.render('order-create', {
                wordsCount: wordsCount,
                qualityLevel: qualityLevel,
                pricePerWord: pricePerWord,
                totalPrice: totalPrice
            });
        });


    },

    prepareDocument: (req, res) => {
        res.render('document-upload');
    },

    getUserOrders: (req, res) => {
        Order.find({userId: req.user._id}, ['sampleText', 'confirm', 'status'], function (err, data) {
            if (err) {
                console.log(err);
            }

            res.render('my-orders', {orders: data});
        });
    }
};
module.exports = OrdersController;