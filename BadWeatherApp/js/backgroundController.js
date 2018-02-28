let BackgroundController = (function () {

    let createDeafultBackground = (function (json) {
      
        let hour = parseInt((json.list[0].dt_txt.split(' ')[1].substr(0, 5)).split(':')[0]);
        let weather = (json.list[0].weather[0].main);

        if (hour > 6 && hour <= 8) {
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
        } else if (hour > 8 && hour <= 18) {
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
        } else if (hour > 18 && hour <= 20) {
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
        } else if (hour <= 6 || hour > 20) {
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
    return {
        SetBackground: createDeafultBackground
    };
});
