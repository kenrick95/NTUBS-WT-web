$(window).load(function() {
    $(".convert-emoji").each(function() {
        var original = $(this).html();
        var converted = emojione.toImage(original);
        $(this).html(converted);
    });
    var wheel = $("#wheel");
    var rotation = Math.round(Math.random() * 720 + 720);
    var answer = null;
    TweenLite.to(wheel, 1, {rotation: "+=" + rotation, ease: Expo.easeOut});

    $("#spin-btn").click(function () {
        rotation = Math.round(Math.random() * 720 + 720);
        TweenLite.to(wheel, 5, {rotation: "+=" + rotation, ease: Expo.easeOut, onComplete: function () { 
            var tr = $("#wheel").css("transform");

            // https://css-tricks.com/get-value-of-css-rotation-through-javascript/
            var values = tr.split('(')[1].split(')')[0].split(',');
            var a = values[0], b = values[1], c = values[2], d = values[3];

            var scale = Math.sqrt(a*a + b*b);
            var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
            if (angle < 0)
                angle += 360;

            var cat = 8 - Math.floor(angle / 45);
            var pointed = $("#ws-" + cat + " > .ws-content");
            $("#main-question-display").html($(pointed).html());
            answer = {
                value: $(pointed).data("answer"),
                description: $(pointed).data("item")
            };

            $("#options").show();
            $("#backdrop").show();
        }});
    });

    $(".option").click(function () {
        var chosen = $(this).data("value");
        var correct = answer.value;
        if (chosen === correct) {
            swal("Yay", "It's a correct one!", "success");
        } else {
            swal("Nay", "It's not correct!", "error");
        }

        $("#options").hide();
        $("#backdrop").hide();
    });
});