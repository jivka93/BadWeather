$('.tab').on('click', changeContent);

function changeContent() {
    $('.tab-active').removeClass('tab-active').addClass('tab-inactive');
    $(this).addClass('tab-active').removeClass('tab-inactive');

    var data = JSON.parse(sessionStorage.getItem("data"));


    if ($(this).is('#now-tab')) {
        clearWeatherContent();
        $('.active-content').removeClass('active-content').addClass('inactive-content');
        $('#content-current').removeClass('inactive-content').addClass('active-content');
        createCurrentTab(data);
        fillCurrentTab(data);
    }
    if ($(this).is('#tomorrow-tab')) {
        clearWeatherContent();
        $('.active-content').removeClass('active-content').addClass('inactive-content');
        $('#content-tomorrow').removeClass('inactive-content').addClass('active-content');
        createTomorrowTab(data);
        fillTomorrowTab(data);
    }
    if ($(this).is('#five-days-tab')) {
        clearWeatherContent();
        $('.active-content').removeClass('active-content').addClass('inactive-content');
        $('#content-five-days').removeClass('inactive-content').addClass('active-content');
        createFiveDaysTab(data);
        fillFiveDaysTab(data);
    }
    if ($(this).is('#map-tab')) {
        clearWeatherContent();
        $('.active-content').removeClass('active-content').addClass('inactive-content');
        $('#content-map').removeClass('inactive-content').addClass('active-content');
        // createMapTab(data);
        // initMap();
    }
};
