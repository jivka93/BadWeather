let imageController = (function () {

    let createDeafultBackground = (function (json) {

        let hour = parseInt((json.list[0].dt_txt.split(' ')[1].substr(0, 5)).split(':')[0]);
        let weather = (json.list[0].weather[0].main);
        let morningHours = hour > 6 && hour <= 8;
        let dayHours = hour > 8 && hour <= 18;
        let eveningHours = hour > 18 && hour <= 20;
        let nightHours = hour <= 6 || hour > 20;
        
        if (morningHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', 'url(images/giphy.gif');
            };
            if (weather === 'Rain') {
                $('#body').css('background-image', 'url(images/rain/rainday.jpg');
            };
            if (weather === 'Cloud') {
                $('#body').css('background-image', 'url(images/cloud/cloudy.jpg');
            };
            if (weather === 'Clear') {
                $('#body').css('background-image', 'url(images/clear/morning1.jpg');
            };
        } else if (dayHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', 'url(images/giphy.gif');
            };
            if (weather === 'Rain') {
                $('#body').css('background-image', 'url(images/rain/rainday.jpg');
            };
            if (weather === 'Cloud') {
                $('#body').css('background-image', 'url(images/cloud/cloudy.jpg');
            };
            if (weather === 'Clear') {
                $('#body').css('background-image', 'url(images/clear/sunny.jpg');
            };
        } else if (eveningHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', 'url(images/giphy.gif');
            };
            if (weather === 'Rain') {
                $('#body').css('background-image', 'url(images/rain/rain.jpg');
            };
            if (weather === 'Cloud') {
                $('#body').css('background-image', 'url(images/cloud/cloudy.jpg');
            };
            if (weather === 'Clear') {
                $('#body').css('background-image', 'url(images/clear/evening1.jpg');
            };
        } else if (nightHours) {
            if (weather === 'Snow') {
                $('#body').css('background-image', 'url(images/giphy.gif');
            };
            if (weather === 'Rain') {
                $('#body').css('background-image', 'url(images/rain/rain.jpg');
            };
            if (weather === 'Cloud') {
                $('#body').css('background-image', 'url(images/cloud/night-cloud.jpeg');
            };
            if (weather === 'Clear') {
                $('#body').css('background-image', 'url(images/clear/night-sky5.jpg');
            };
        };
    });

    let setWeatherIcon = function (weather, i) {

        ////Changes Icons for tab "Now"

        
        if (weather === 'Clouds') {
            $(`#icon-${i}`).attr('src', 'images/clouds.png');
        } else if (weather === 'Snow') {
            $(`#icon-${i}`).attr('src', 'images/snow.png');
        } else if (weather === 'Rain') {
            $(`#icon-${i}`).attr('src', 'images/rain.png');
        } else if (weather === 'Clear') {
            $(`#icon-${i}`).attr('src', 'images/clear.png');
        } else if (weather === 'Storm') {
            $(`#icon-${i}`).attr('src', 'images/storm.png');
        } else {
            $(`#icon-${i}`).attr('src', 'images/other.png');
        };


        ////Changes Icons for tab "five-days"

        if (weather === 'Clouds') {
            $(`#weather-icon${i}`).attr('src', 'images/clouds.png');
        } else if (weather === 'Snow') {
            $(`#weather-icon${i}`).attr('src', 'images/snow.png');
        } else if (weather === 'Rain') {
            $(`#weather-icon${i}`).attr('src', 'images/rain.png');
        } else if (weather === 'Clear') {
            $(`#weather-icon${i}`).attr('src', 'images/clear.png');
        } else if (weather === 'Storm') {
            $(`#weather-icon${i}`).attr('src', 'images/storm.png');
        } else {
            $(`#weather-icon${i}`).attr('src', 'images/other.png');
        }

        if (weather === 'Clouds') {
            $('#tomorrow-icon').attr('src', 'images/clouds.png');
        } else if (weather === 'Snow') {
            $('#tomorrow-icon').attr('src', 'images/snow.png');
        } else if (weather === 'Rain') {
            $('#tomorrow-icon').attr('src', 'images/rain.png');
        } else if (weather === 'Clear') {
            $('#tomorrow-icon').attr('src', 'images/clear.png');
        } else if (weather === 'Storm') {
            $('#tomorrow-icon').attr('src', 'images/storm.png');
        } else {
            $('#tomorrow-icon').attr('src', 'images/other.png');
        }
    };
    return {
        SetBackground: createDeafultBackground,
        SetWeatherIcon: setWeatherIcon
    };
}());