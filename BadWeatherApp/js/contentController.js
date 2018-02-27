var contentController = (function () {

    var changeContent = (function () {
        $('.tab-active').removeClass('tab-active').addClass('tab-inactive');
        $(this).addClass('tab-active').removeClass('tab-inactive');

        var data = JSON.parse(sessionStorage.getItem('data'));

        var RemoveActiveContent = (function () {
            $('.active-content').removeClass('active-content').addClass('inactive-content');
        });

        if ($(this).is('#now-tab')) {
            clearContent.clear();
            RemoveActiveContent();
            $('#content-current').removeClass('inactive-content').addClass('active-content');
            CreateContent.CurrentTab();
            FillContent.CurrentTab(data);
        };
        if ($(this).is('#tomorrow-tab')) {
            clearContent.clear();
            RemoveActiveContent();
            $('#content-tomorrow').removeClass('inactive-content').addClass('active-content');
            CreateContent.TomorrowTab();
            FillContent.TomorrowTab(data);
        };
        if ($(this).is('#five-days-tab')) {
            clearContent.clear();
            RemoveActiveContent();
            $('#content-five-days').removeClass('inactive-content').addClass('active-content');
            CreateContent.FiveDaysTab();
            FillContent.FiveDaysTab(data);
        };
        
    });
    return {
        ChangeContent: changeContent
    };
});

