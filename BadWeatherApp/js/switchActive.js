let switchActive = (function () {

    let switchActive = (function () {
        $('.tab-active').removeClass('tab-active').addClass('tab-inactive');
        $('#now-tab').addClass('tab-active').removeClass('tab-inactive');
        $('.active-content').removeClass('active-content').addClass('inactive-content');
        $('#content-current').removeClass('inactive-content').addClass('active-content');
        $('#content-current').hide();
        $('#content-current').fadeIn(1000);
    });

    return {
        ToToday: switchActive
    };
})();
