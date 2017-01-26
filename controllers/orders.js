let fs = require('fs');

let OrdersController = {
    create: (req, res) => {
        res.send({status: 1});
    },

    prepare: (req, res) => {
        let wordsCount = req.params['wordsCount'] || 0;
        res.render('order-prepare', {wordsCount: wordsCount});
    },

    fileManage: (req, res) => {
        let file = req.file;
        let wordsCount = 0;

        if (file) {
            var resultText;
            //If uploaded file is picture, we will try to recognize the text inside
            if (file['mimetype'].split('/')[0] == 'image') {
                //todo: test with different languages
                Tesseract.recognize(file)
                    .then(function (result) {
                        resultText = result.text;
                        //calculate number of words
                        wordsCount = resultText.split(" ").length;
                        res.redirect('/order/' + wordsCount);
                    })
                    .catch(function (err) {
                        console.error(err);
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
                        res.redirect('/order/' + wordsCount);
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