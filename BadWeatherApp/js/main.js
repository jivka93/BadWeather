$(".dropdown-menu").on("click", "a", function () {
    let cityId = $(this).attr("id");
    clearWeatherContent();
    $('.tab-active').removeClass('tab-active').addClass('tab-inactive');
    $('#now-tab').addClass('tab-active').removeClass('tab-inactive');
    $('.active-content').removeClass('active-content').addClass('inactive-content');
    $('#content-current').removeClass('inactive-content').addClass('active-content');

    onButtonClick(cityId);
});

function clearWeatherContent() {
    $('#content-five-days').html('');
    $('#content-tomorrow').html('');
    $('#content-current').html('');
    $('#content-map').html('');
}
onButtonClick("727011");

function onButtonClick(cityId) {
    $.get(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=2efb9211ec2c1db3d00ea14c0d24c30d`, onDataRetrieved);

}

function onDataRetrieved(json) {
   
    var cityName = $("#city-name");
    cityName.html(json.city.name);
    var countryName = $("#country-name");
    countryName.html(json.city.country);
    
    sessionStorage.setItem("data", JSON.stringify(json));

    CreateContent.CurrentTab();
    FillContent().CurrentTab(JSON.parse(sessionStorage.getItem("data")));
    BackgroundController().SetBackground(json);
    
}