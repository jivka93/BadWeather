const clearContent = (function () {
    const clearWeatherContent = (function () {
        $('#content-five-days').html('');
        $('#content-tomorrow').html('');
        $('#content-current').html('');
    });

    return {
        clear: clearWeatherContent
    };
})();
