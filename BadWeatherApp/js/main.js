$(".dropdown-menu").on("click", "a", function(){
    let cityId = $(this).attr("id");
    $("#current-weather-table").html("");
    onButtonClick(cityId);
});

onButtonClick("727011");

function onButtonClick(cityId) {
    $.get(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=2efb9211ec2c1db3d00ea14c0d24c30d`, onDataRetrieved);
}


function onDataRetrieved(json){
    console.log(json);

    // Location:
    var cityName = $("#city-name");
    cityName.html(json.city.name);
    var countryName = $("#country-name");
    countryName.html(json.city.country);

createCurrentTab(json);

}


// Tab Now
function createCurrentTab(json){


        // Creating
    for (var i = 0; i < 8; i +=1 ){

        var row = $(`    
        <tr class="content-row" id="row${i}">
        <td class="time td">
            <div class="hour bigger-text" id="hour-${i}" ></div>
            <div class="date smaller-text" id="date-${i}" ></div>
        </td>
        <td class="weather td">
            <div class="weather-icon">
                <img class="icon-weather" id="icon-${i}" src="images/cloud.png" alt="BadWeather">
            </div>
            <div class="weather smaller-text" id="weather-${i}" ></div>
        </td>
        <td class="temperature td">
            <div class="degrees bigger-text" id="temp-${i}" ></div>
            <div class="smaller-text">temperature</div>
        </td>
        <td class="wind td">
            <div class="wind-speed bigger-text" id="wind-${i}" ></div>
            <div class="smaller-text">wind speed</div>
        </td>
        </tr>`)

        $("#current-weather-table").append(row);
    }

        // Filling:
    for (var i = 0; i < 8; i +=1 ){

        var currentHour = $(`#hour-${i}`);
        currentHour.html(json.list[i].dt_txt.split(" ")[1].substr(0, 5));

        var currentDate = $(`#date-${i}`);
        currentDate.html(json.list[i].dt_txt.split(" ")[0]);

        var currentIcon = $(`#icon-${i}`);

        
        var currentWeather = $(`#weather-${i}`);
        currentWeather.html(json.list[i].weather[0].main);

        var currentTemp = $(`#temp-${i}`);
        currentTemp.html((json.list[i].main.temp - 273.15).toFixed(0));

        var currentWind = $(`#wind-${i}`);
        currentWind.html(json.list[i].wind.speed + "m/s");

    }
}