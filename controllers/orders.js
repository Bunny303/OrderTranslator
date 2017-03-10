const FileManageHelper = require('../helpers/FileManageHelper');
const async = require('async');

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

        //if we have file uploaded we should save it and count the words
        //todo: counting the words should be done only in one place, now it's done on front-end and on back-end
        let wordsCount = 0;

        console.log(this);
        async.parallel([
            function (callback) {
                if (file) {
                    //save file into database


                    //count words
                    FileManageHelper.countWords(file, callback);
                }
            },
            function (callback) { //if we have text input from user we should save it into file, save file into database and count the words

                //save settings for the order into database
                callback();
            }
        ], function (err, results) {
            if (err) {
                console.log(err);
            }

            res.render('order-create', {wordsCount: results[0]});
        });


    },

    prepareDocument: (req, res) => {
        res.render('document-upload');
    }
};
module.exports = OrdersController;