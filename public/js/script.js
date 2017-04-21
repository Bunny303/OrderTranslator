(function () {
    const standartLevelString = 'Стандартно';
    const standartLevelPrice = 0.05;
    const highLevelPrice = 0.07;
    const duplicateTextError = "Текст и файл не могат да бъдат въведени в една поръчка"
    let qualityLevel = standartLevelString;
    let pricePerWord = standartLevelPrice;
    let wordsCount = 0;

    function calculateTotalPrice(wordsCount, pricePerWord) {
        return Number((wordsCount * pricePerWord).toFixed(2));
    }

    $("#user-document").change(function (ev) {
        let file = ev.target.files[0];
        if (file) {
            //check if there is input text already
            if (!$("#userText").val()) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    let contents = e.target.result;
                    let res = contents.split(" ");
                    wordsCount = res.length;
                    $('#words-count').text(wordsCount);
                };

                reader.readAsText(file);
            }
            else {
                $(".error-container").text(duplicateTextError);
            }
        }
    });

    $("#userText").bind('input propertychange', function () {
        //check if there is input file already
        let $uploadedDoc = $("#user-document");
        if (!$uploadedDoc.files || $uploadedDoc.files.length == 0) {
            let words = this.value.match(/\S+/g).length;
            $('#words-count').text(words);
            wordsCount = words;
            $('#total-price').text(calculateTotalPrice(wordsCount, pricePerWord));
        }
        else {
            $(".error-container").text(duplicateTextError);
        }
    });

    $("#quality-level-input").on('change', function () {
        qualityLevel = $(this).val();
        $('#quality-level').text(qualityLevel);
        if (qualityLevel == standartLevelString) {
            pricePerWord = standartLevelPrice;
        }
        else {
            pricePerWord = highLevelPrice;
        }

        $('#price-per-word').text(pricePerWord);
        $('#total-price').text(calculateTotalPrice(wordsCount, pricePerWord));
    });

    $("#btn-language").on('change', function () {
        let lang = $(this).val();

        //$('#btn-language option[value=' + lang + ']').attr('selected', 'selected');
        document.cookie = "lang=" + lang + " ; path=/";
    });
}());
