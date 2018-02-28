const imageController = (function () {

    const createDeafultBackground = (function (json) {

        let hour = parseInt((json.list[0].dt_txt.split(' ')[1].substr(0, 5)).split(':')[0]);
        let weather = (json.list[0].weather[0].main);
        let morningHours = hour > 6 && hour <= 8;
        let dayHours = hour > 8 && hour <= 18;
        let eveningHours = hour > 18 && hour <= 20;
        let nightHours = hour <= 6 || hour > 20;
        let city = json.city.name;

        if (morningHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', `url(images/morning/${weather}.gif`);
            } else {
                $('#body').css('background-image', `url(images/morning/${weather}.jpg`);
            }

        } else if (dayHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', `url(images/day/${weather}.gif`);
            } else {
                $('#body').css('background-image', `url(images/day/${weather}.jpg`);
            }
        } else if (eveningHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', `url(images/evening/${weather}.gif`);
            } else {
                $('#body').css('background-image', `url(images/evening/${weather}.jpg`);
            }
        } else if (nightHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', `url(images/night/${weather}.gif`);
             } else {
                $('#body').css('background-image', `url(images/night/${weather}.jpg`);
            }

        };
        if (city === 'Yakutsk') {
            $('#body').css('background-image', `url(images/${city.toLowerCase()}.gif`);
            $('.main-content').hide();
            $('.main-content').fadeIn(2000);
        };
    });

    const setWeatherIcon = function (weather, i) {

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
