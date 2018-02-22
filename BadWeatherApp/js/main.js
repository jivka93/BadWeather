function onDataRetrieved(json){
    console.log(json);
    var cityName = $("#city-name");
    cityName.html(json.city.name);
    var countryName = $("#country-name");
    countryName.html(json.city.country);

}

function onButtonClick(cityId) {
//  $.get(`http://api.openweathermap.org/data/2.5/forecast?q=London,us&appid=2efb9211ec2c1db3d00ea14c0d24c30d`, onDataRetrieved);
//  $.get(`http://samples.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=b6907d289e10d714a6e88b30761fae22`, onDataRetrieved);
    $.get(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=2efb9211ec2c1db3d00ea14c0d24c30d`, onDataRetrieved);
}

// $(".dropdown-menu").children().on("click", function(){
//     let $this = $(this);
//     // let cityId = $this.html();
    
//     onButtonClick(cityId);
// });

$(".dropdown-menu").on("click", "a", function(){
    let cityId = $(this).attr("id");
    console.log(cityId);
    onButtonClick(cityId);
});

