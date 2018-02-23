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

    createDeafultBackground(json);
}

// Dynamically changes the background picture
function createDeafultBackground(json){

    var hour = parseInt((json.list[0].dt_txt.split(" ")[1].substr(0, 5)).split(":")[0]);

    if(hour > 6 && hour <= 8){
        $("#body").css("background-image", "url(../images/morning.jpeg)");
    }
    else if(hour > 8 && hour <= 18){
        $("#body").css("background-image", "url(../images/day.jpeg)");
    }
    else if(hour > 18 && hour <= 20){
        $("#body").css("background-image", "url(../images/evening.jpeg)");
    }
    else if(hour <= 6 || hour > 20){
        $("#body").css("background-image", "url(../images/night.png)");
    }
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
                <img class="icon-weather" id="icon-${i}" src="images/clouds.png" alt="BadWeather">
            </div>
            <div class="weather smaller-text" id="weather-${i}" ></div>
        </td>
        <td class="temperature td">
            <div class="degrees bigger-text" id="temp-${i}" ></div>
            <div class="smaller-text">temperature</div>
        </td>
        <td class="humidity td">
            <div class="humidity bigger-text" id="humidity-${i}" ></div>
            <div class="smaller-text">humidity</div>
        </td>
        <td class="wind td">
            <div class="wind-speed bigger-text" id="wind-${i}" ></div>
            <div class="smaller-text">wind speed</div>
        </td>
        </tr>`);

        $("#current-weather-table").append(row);
    }

    // Filling:
    for (var i = 0; i < 8; i +=1 ){

        var currentHour = $(`#hour-${i}`);
        currentHour.html(json.list[i].dt_txt.split(" ")[1].substr(0, 5));

        var currentDate = $(`#date-${i}`);
        currentDate.html(json.list[i].dt_txt.split(" ")[0]);
         
        var currentWeather = $(`#weather-${i}`);
        currentWeather.html(json.list[i].weather[0].main);

        var weather = (json.list[i].weather[0].main);
        if (weather == "Clouds"){
            $(`#icon-${i}`).attr("src", "images/clouds.png");
        }
        else if (weather == "Snow"){
            $(`#icon-${i}`).attr("src", "images/snow.png");
        }
        else if (weather == "Rain"){
            $(`#icon-${i}`).attr("src", "images/rain.png");
        }
        else if (weather == "Clear"){
            $(`#icon-${i}`).attr("src", "images/clear.png");
        }
        else if (weather == "Storm"){
            $(`#icon-${i}`).attr("src", "images/storm.png");
        }
        else{
            $(`#icon-${i}`).attr("src", "images/other.png");
        }

        var currentTemp = $(`#temp-${i}`);
        currentTemp.html((json.list[i].main.temp - 273.15).toFixed(0) + "°");

        var currentHumidity = $(`#humidity-${i}`);
        currentHumidity.html(json.list[i].main.humidity + " %");

        var currentWind = $(`#wind-${i}`);
        currentWind.html(json.list[i].wind.speed + " m/s");
    }

}

// Tab Tomorrow
function createTomorrowTab(json){

    // Creating
        var row = $(` 
        
        <div class="part" id="tomorrow-left-big-part">
        LEFT
    </div>
    <div class="part" id="tomorrow-right-big-part">
        RIGHT
    </div>
        


        <tr class="content-row" id="row${i}">
        <td class="time td">
            <div class="hour bigger-text" id="hour-${i}" ></div>
            <div class="date smaller-text" id="date-${i}" ></div>
        </td>
        <td class="weather td">
            <div class="weather-icon">
                <img class="icon-weather" id="icon-${i}" src="images/clouds.png" alt="BadWeather">
            </div>
            <div class="weather smaller-text" id="weather-${i}" ></div>
        </td>
        <td class="temperature td">
            <div class="degrees bigger-text" id="temp-${i}" ></div>
            <div class="smaller-text">temperature</div>
        </td>
        <td class="humidity td">
            <div class="humidity bigger-text" id="humidity-${i}" ></div>
            <div class="smaller-text">humidity</div>
        </td>
        <td class="wind td">
            <div class="wind-speed bigger-text" id="wind-${i}" ></div>
            <div class="smaller-text">wind speed</div>
        </td>
        </tr>`);

        $("#current-weather-table").append(row);


    // Filling:
        var currentHour = $(`#hour-${i}`);
        currentHour.html(json.list[i].dt_txt.split(" ")[1].substr(0, 5));

        var currentDate = $(`#date-${i}`);
        currentDate.html(json.list[i].dt_txt.split(" ")[0]);
         
        var currentWeather = $(`#weather-${i}`);
        currentWeather.html(json.list[i].weather[0].main);

        var weather = (json.list[i].weather[0].main);
        if (weather == "Clouds"){
            $(`#icon-${i}`).attr("src", "images/clouds.png");
        }
        else if (weather == "Snow"){
            $(`#icon-${i}`).attr("src", "images/snow.png");
        }
        else if (weather == "Rain"){
            $(`#icon-${i}`).attr("src", "images/rain.png");
        }
        else if (weather == "Clear"){
            $(`#icon-${i}`).attr("src", "images/clear.png");
        }
        else if (weather == "Storm"){
            $(`#icon-${i}`).attr("src", "images/storm.png");
        }
        else{
            $(`#icon-${i}`).attr("src", "images/other.png");
        }

        var currentTemp = $(`#temp-${i}`);
        currentTemp.html((json.list[i].main.temp - 273.15).toFixed(0) + "°");

        var currentHumidity = $(`#humidity-${i}`);
        currentHumidity.html(json.list[i].main.humidity + " %");

        var currentWind = $(`#wind-${i}`);
        currentWind.html(json.list[i].wind.speed + " m/s");

}