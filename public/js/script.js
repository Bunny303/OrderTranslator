(function () {
    const standartLevelString = 'Стандартно';
    const standartLevelPrice = 0.05;
    const highLevelPrice = 0.07;
    let qualityLevel = standartLevelString;
    let pricePerWord = standartLevelPrice;
    let wordsCount = 0;

    function calculateTotalPrice(wordsCount, pricePerWord) {
        return Number((wordsCount * pricePerWord).toFixed(2));
    }

    $("#user-document").change(function (ev) {
        var file = ev.target.files[0];
        if (file) {
            var reader = new FileReader();

            reader.onload = function (e) {
                var contents = e.target.result;
                var res = contents.split(" ");
                wordsCount = res.length;
                $('#words-count').text(wordsCount);
            };

            reader.readAsText(file);

            //disable text input
            // $("#userText").attr("disabled", true);
        }
        else {
            // $("#userText").attr("disabled", false);
        }
    });

    $("#userText").bind('input propertychange', function () {
        var words = this.value.match(/\S+/g).length;
        $('#words-count').text(words);
        wordsCount = words;
        $('#total-price').text(calculateTotalPrice(wordsCount, pricePerWord));

        //disable file input, because user can input text or file, but not both of them
        //$("#user-document").prop("disabled", true);
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
}());
