const fs = require('fs');
const Tesseract = require('tesseract.js')

let OrdersController = {
    create: (req, res) => {
        console.log(req.body);
        console.log(req.file);
        res.send({status: 1});
    },

    prepareDocument: (req, res) => {
        //let wordsCount = req.params['wordsCount'] || 0;
        res.render('document-upload');
    },

    fileManage: (req, res) => {
        let file = req.file;
        let wordsCount = 0;

        if (file) {
            let resultText;
            //If uploaded file is picture, we will try to recognize the text inside
            if (file['mimetype'].split('/')[0] == 'image') {
                //todo: test with different languages
                Tesseract.recognize(file.path)
                    .then(function (result) {
                        resultText = result.text;
                        //calculate number of words
                        wordsCount = resultText.split(" ").length;
                        //res.redirect('/order/' + wordsCount);
                        res.render('document-upload', {wordsCount: wordsCount})
                    })
                    .catch(function (err) {
                        console.error("Error:" + err);
                    });
            }
            else {
                //if uploaded file is document (doc, txt, odt and etc.)
                //todo: not supported by all browsers
                //todo: test with a very big file

                fs.readFile(file.path, {encoding: 'utf-8'}, function (err, data) {
                    if (!err) {
                        //calculate number of words
                        wordsCount = data.split(" ").length;
                        res.render('document-upload', {wordsCount: wordsCount});
                    }
                    else {
                        console.log(err);
                    }

                });
            }

            //PDF
            /*PDFJS.getDocument( file ).then( function(pdf) {
             console.log(pdf);
             });*/
            //EXCEL No for now
            //POWER POINT No for now
        }
        else {
            res.redirect('/order');
        }
    }

};
module.exports = OrdersController;