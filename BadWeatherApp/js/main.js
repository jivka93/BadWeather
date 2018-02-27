var mainController = (function () {

    var onButtonClick = function (cityId) {
        var baseUrl = config.baseUrl;
        var key = config.key;
        var id = cityId;
        var url = baseUrl + id + key;
        $.get(url, onDataRetrieved);

    };

    var onDataRetrieved = function (json) {

        var cityName = $('#city-name');
        cityName.html(json.city.name);
        var countryName = $('#country-name');
        countryName.html(json.city.country);

        sessionStorage.setItem('data', JSON.stringify(json));

        CreateContent.CurrentTab();
        FillContent.CurrentTab(json);
        BackgroundController().SetBackground(json);

    };

    var onDropdownClick = function () {
        let cityId = $(this).attr('id');
        clearContent.clear();
        switchActive.ToToday();
        mainController.onButtonClick(cityId);
    };

    return {
        onButtonClick: onButtonClick,
        onDropdownClick: onDropdownClick
    };
})();
