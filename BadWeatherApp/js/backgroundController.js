var BackgroundController = (function () {

    var createDeafultBackground = (function (json) { ///////// TODO : Extract css to different files for diff cases and load them with JS 

        var hour = parseInt((json.list[0].dt_txt.split(" ")[1].substr(0, 5)).split(":")[0]);
        var weather = (json.list[0].weather[0].main);

        if (hour > 6 && hour <= 8) {
            $("#body").css("background-image", "url(../images/morning.jpeg)");
            if (weather == 'Snow') {
                $("#body").css("background-image", "url(../images/giphy.gif")
            };
            if (weather == 'Rain') {
                $("#body").css("background-image", "url(../images/rain.jpg")
            };
        } else if (hour > 8 && hour <= 18) {
            $("#body").css("background-image", "url(../images/day.jpeg)");
            if (weather == 'Snow') {
                $("#body").css("background-image", "url((../images/giphy.gif")
            };
            if (weather == 'Rain') {
                $("#body").css("background-image", "url(../images/rain.jpg")
            };
        } else if (hour > 18 && hour <= 20) {
            $("#body").css("background-image", "url(../images/evening.jpeg)");
            if (weather == 'Snow') {
                $("#body").css("background-image", "url(../images/swow.jpg")
            };
            if (weather == 'Rain') {
                $("#body").css("background-image", "url(../images/rain.jpg")
            };
        } else if (hour <= 6 || hour > 20) {
            $("#body").css("background-image", "url(../images/night.png)");
            if (weather == 'Snow') {
                $("#body").css("background-image", "url(../images/swow.jpg")
            };
            if (weather == 'Rain') {
                $("#body").css("background-image", "url(../images/rain.jpg")
            };
        };
    });
    return{
        SetBackground : createDeafultBackground
    }
});