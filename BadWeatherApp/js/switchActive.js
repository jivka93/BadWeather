var switchActive = (function () {

    var switchActive = (function () {
        $('.tab-active').removeClass('tab-active').addClass('tab-inactive');
        $('#now-tab').addClass('tab-active').removeClass('tab-inactive');
        $('.active-content').removeClass('active-content').addClass('inactive-content');
        $('#content-current').removeClass('inactive-content').addClass('active-content');
    });

    return {
        ToToday: switchActive
    }
}());