var mainController = (function () {

    let onButtonClick = function (cityId) {
        const baseUrl = config.baseUrl;
        const key = config.key;
        const id = cityId;
        const url = baseUrl + id + key;
        $.get(url, onDataRetrieved);

    };

    let onDataRetrieved = function (json) {
        let cityName = $('#city-name');
        cityName.html(json.city.name);
        let countryName = $('#country-name');
        countryName.html(json.city.country);

        sessionStorage.setItem('data', JSON.stringify(json));

        CreateContent.CurrentTab();
        FillContent.CurrentTab(json);
        BackgroundController().SetBackground(json);

    };

    let onDropdownClick = function () {
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
