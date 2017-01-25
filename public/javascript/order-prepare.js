var wordsCount = function (evt) {
    if (evt.files) {
        var file = evt.files[0];
        if (file) {
            var resultText;
            //If uploaded file is picture, we will try to recognize the text inside
            if (file['type'].split('/')[0] == 'image') {
                //todo: test with different languages
                Tesseract.recognize(file)
                    .then(function (result) {
                        resultText = result.text;
                        //calculate number of words
                        wordsNumber = resultText.split(" ").length;
                    })
                    .catch(function (err) {
                        console.error(err);
                    });
            }
            else {
                //if uploaded file is document (doc, txt, odt and etc.)
                //todo: not supported by all browsers
                //todo: test with a very big file
                var reader = new FileReader();
                reader.onload = function (event) {
                    resultText = event.target.result;
                    //calculate number of words
                    wordsNumber = resultText.split(" ").length;
                    console.log(wordsNumber);
                    update();
                };
                reader.onerror = function (event) {
                    console.log(event);
                    resultText = '';
                };

                reader.readAsText(file);
            }

            //PDF
            /*PDFJS.getDocument( file ).then( function(pdf) {
             console.log(pdf);
             });*/
            //EXCEL No for now
            //POWER POINT No for now
        }
    }
};
//
//function update() {
//    var req = new XMLHttpRequest();
//    req.open("GET", "/order");
//    req.onreadystatechange = function () {
//        if (req.readyState == 4) {
//            document.getElementById("content").innerHTML = req.responseText;
//        }
//    }
//    req.send();
//}
