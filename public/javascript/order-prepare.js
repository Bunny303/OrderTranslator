var wordsCount = function () {
    if (this.files) {
        var file = this.files[0];
        if (file) {
            var resultText;
            //If uploaded file is picture, we will try to recognize the text inside
            if (file['type'].split('/')[0] == 'image') {
                //todo: test with different languages
                Tesseract.recognize(file)
                    .then(function (result) {
                        resultText = result.text;
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }
            else {
                //if uploaded file is document (doc, txt, odt and etc.)
                //todo: not supported by all browsers
                //todo: test with a very big file
                var r = new FileReader();
                r.onload = function (e) {
                    var resultText = e.target.result;
                }
                r.readAsText(file);
            }

            //calculate number of words
            var wordsNumber = resultText.split(" ").length;
            console.log(wordsNumber);

            //PDF
            /*PDFJS.getDocument( file ).then( function(pdf) {
             console.log(pdf);
             });*/
            //EXCEL No for now
            //POWER POINT No for now
        }
    }
};
