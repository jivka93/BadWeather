const contentController = (function () {

    const changeContent = (function () {
        $('.tab-active').removeClass('tab-active').addClass('tab-inactive');
        $(this).addClass('tab-active').removeClass('tab-inactive');

        let data = JSON.parse(sessionStorage.getItem('data'));

        const RemoveActiveContent = (function () {
            $('.active-content').removeClass('active-content').addClass('inactive-content');
        })();

        if ($(this).is('#now-tab')) {
            clearContent.clear();
            $('#content-current').removeClass('inactive-content').addClass('active-content');
            $('#content-current').hide();
            CreateContent.CurrentTab();
            FillContent.CurrentTab(data);
            $('#content-current').fadeIn(1000);
            
        };
        if ($(this).is('#tomorrow-tab')) {
            clearContent.clear();
            $('#content-tomorrow').removeClass('inactive-content').addClass('active-content');
            $('#content-tomorrow').hide();
            CreateContent.TomorrowTab();
            FillContent.TomorrowTab(data);
            $('#content-tomorrow').fadeIn(1000);
        };
        if ($(this).is('#five-days-tab')) {
            clearContent.clear();
            $('#content-five-days').removeClass('inactive-content').addClass('active-content');
            $('#content-five-days').hide();
            CreateContent.FiveDaysTab();
            FillContent.FiveDaysTab(data);
            $('#content-five-days').fadeIn(1000);
        };
        
    });
    return {
        ChangeContent: changeContent
    };
})();

