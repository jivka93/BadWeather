let imageController = (function () {

    let createDeafultBackground = (function (json) {

        let hour = parseInt((json.list[0].dt_txt.split(' ')[1].substr(0, 5)).split(':')[0]);
        let weather = (json.list[0].weather[0].main);
        let morningHours = hour > 6 && hour <= 8;
        let dayHours = hour > 8 && hour <= 18;
        let eveningHours = hour > 18 && hour <= 20;
        let nightHours = hour <= 6 || hour > 20;
        let city = json.city.name;
        
        if (morningHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', 'url(images/morning/Snow.gif');
            };
            if (weather === 'Rain') {
                $('#body').css('background-image', 'url(images/morning/Rain.jpg');
            };
            if (weather === 'Cloud') {
                $('#body').css('background-image', 'url(images/morning/Cloud.jpg');
            };
            if (weather === 'Clear') {
                $('#body').css('background-image', 'url(images/morning/Clear.jpg');
            };
        } else if (dayHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', 'url(images/day/Snow.gif');
            };
            if (weather === 'Rain') {
                $('#body').css('background-image', 'url(images/day/Rain.jpg');
            };
            if (weather === 'Cloud') {
                $('#body').css('background-image', 'url(images/day/Cloud.jpg');
            };
            if (weather === 'Clear') {
                $('#body').css('background-image', 'url(images/day/Clear.jpg');
            };
        } else if (eveningHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', 'url(images/evening/Snow.gif');
            };
            if (weather === 'Rain') {
                $('#body').css('background-image', 'url(images/evening/Rain.jpg');
            };
            if (weather === 'Cloud') {
                $('#body').css('background-image', 'url(images/evening/Cloud.jpg');
            };
            if (weather === 'Clear') {
                $('#body').css('background-image', 'url(images/evening/Clear.jpg');
            };
        } else if (nightHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', 'url(images/night/Snow.gif');
            };
            if (weather === 'Rain') {
                $('#body').css('background-image', 'url(images/night/Rain.jpg');
            };
            if (weather === 'Cloud') {
                $('#body').css('background-image', 'url(images/night/Cloud.jpg');
            };
            if (weather === 'Clear') {
                $('#body').css('background-image', 'url(images/night/Clear.jpg');
            };

            
        };
        if (city === 'Yakutsk') {
            $('#body').css('background-image', 'url(images/yakutsk.gif');
            $('.main-content').hide();
            $('.main-content').fadeIn(2000);
        };
    });

    let setWeatherIcon = function (weather, i) {

        debugger;
        if (weather) {
            $(`#icon-${i}`).attr('src', `images/${weather.toLowerCase()}.png`);
            $(`#weather-icon${i}`).attr('src', `images/${weather.toLowerCase()}.png`);
            $('#tomorrow-icon').attr('src', `images/${weather.toLowerCase()}.png`);
        } else {
            $(`#icon-${i}`).attr('src', 'images/other.png');
            $(`#weather-icon${i}`).attr('src', 'images/other.png');
            $('#tomorrow-icon').attr('src', 'images/other.png');
        };

    };
    return {
        SetBackground: createDeafultBackground,
        SetWeatherIcon: setWeatherIcon
    };
})();
