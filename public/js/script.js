(function () {
    let qualityLevel = "Стандартно";
    let pricePerWord = 0.05;
    let wordsCount = 0;
    let totalPrice = Number(((wordsCount || 0) * pricePerWord).toFixed(2));

    console.log('1111111111111', $("#user-document").length);

    $("#user-document").change(function (ev) {
        console.log('2222222222');

        var file = ev.target.files[0];
        if (file) {
            var reader = new FileReader();

            console.log('3333333333333');


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
}());
