var clearContent = (function () {
    var clearWeatherContent = (function () {
        $('#content-five-days').html('');
        $('#content-tomorrow').html('');
        $('#content-current').html('');
        $('#content-map').html('');
    });

    return {
        clear: clearWeatherContent
    };
})();
