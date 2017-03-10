const fs = require('fs');
const Tesseract = require('tesseract.js');

let FileManageHelper = {
    countWords: (file, callback) => {
        let wordsCount = 0;
        let resultText;
        ////If uploaded file is picture, we will try to recognize the text inside
        //if (file['mimetype'].split('/')[0] == 'image') {
        //    //todo: test with different languages
        //    Tesseract.recognize(file.path)
        //        .then(function (result) {
        //            resultText = result.text;
        //            //calculate number of words
        //            return wordsCount = resultText.split(" ").length;
        //        })
        //        .catch(function (err) {
        //            console.error("Error:" + err);
        //        });
        //}
        //else {

        //if uploaded file is document (doc, txt, odt and etc.)
        //todo: not supported by all browsers
        //todo: test with a very big file
        fs.readFile(file.path, {encoding: 'utf-8'}, function (err, data) {
            if (!err) {
                //calculate number of words
                wordsCount = data.split(" ").length;
                callback(null, wordsCount);
            }
            else {
                console.log(err);
                callback(err);
            }

        });
        //}

        //PDF
        /*PDFJS.getDocument( file ).then( function(pdf) {
         console.log(pdf);
         });*/
        //EXCEL No for now
        //POWER POINT No for now
    }
};
module.exports = FileManageHelper;