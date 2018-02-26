$(".dropdown-menu").on("click", "a", function () {
    let cityId = $(this).attr("id");
    clearContent.clear();
    $('.tab-active').removeClass('tab-active').addClass('tab-inactive');
    $('#now-tab').addClass('tab-active').removeClass('tab-inactive');
    $('.active-content').removeClass('active-content').addClass('inactive-content');
    $('#content-current').removeClass('inactive-content').addClass('active-content');

    onButtonClick(cityId);
});


onButtonClick("727011");

function onButtonClick(cityId) {
    var baseUrl = config.baseUrl;
    var key = config.key;
    var id = cityId
    var url = baseUrl + id + key;
    $.get(url, onDataRetrieved);

}

function onDataRetrieved(json) {
   
    var cityName = $("#city-name");
    cityName.html(json.city.name);
    var countryName = $("#country-name");
    countryName.html(json.city.country);
    
    sessionStorage.setItem("data", JSON.stringify(json));

    CreateContent.CurrentTab();
    FillContent.CurrentTab(JSON.parse(sessionStorage.getItem("data")));
    BackgroundController().SetBackground(json);
    
}