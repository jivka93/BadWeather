$(".dropdown-menu").on("click", "a", function () {
    let cityId = $(this).attr("id");
    clearWeatherContent();
    onButtonClick(cityId);
});

function clearWeatherContent() {
    $('#content-five-days').html('');
    $('#content-tomorrow').html('');
    $('#content-current').html('');
}
onButtonClick("727011");

function onButtonClick(cityId) {
    $.get(`http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=2efb9211ec2c1db3d00ea14c0d24c30d`, onDataRetrieved);

}

function onDataRetrieved(json) {
    // Location:
    var cityName = $("#city-name");
    cityName.html(json.city.name);
    var countryName = $("#country-name");
    countryName.html(json.city.country);

    createCurrentTab(json);

    createDeafultBackground(json);
    sessionStorage.setItem("data", JSON.stringify(json));
}

// Dynamically changes the background picture
function createDeafultBackground(json) { ///////// TODO : Extract css to different files and load them with JS 

    var hour = parseInt((json.list[0].dt_txt.split(" ")[1].substr(0, 5)).split(":")[0]);
    var weather = (json.list[0].weather[0].main);

    if (hour > 6 && hour <= 8) {
        $("#body").css("background-image", "url(../images/morning.jpeg)");
        if (weather == 'Snow') {
            $("#body").css("background-image", "url(../images/giphy.gif")
        }
        if (weather == 'Rain') {
            $("#body").css("background-image", "url(../images/rain.jpg")
        }
    } else if (hour > 8 && hour <= 18) {
        $("#body").css("background-image", "url(../images/day.jpeg)");
        if (weather == 'Snow') {
            $("#body").css("background-image", "url((../images/giphy.gif")
        }
        if (weather == 'Rain') {
            $("#body").css("background-image", "url(../images/rain.jpg")
        }
    } else if (hour > 18 && hour <= 20) {
        $("#body").css("background-image", "url(../images/evening.jpeg)");
        if (weather == 'Snow') {
            $("#body").css("background-image", "url(../images/swow.jpg")
        }
        if (weather == 'Rain') {
            $("#body").css("background-image", "url(../images/rain.jpg")
        }
    } else if (hour <= 6 || hour > 20) {
        $("#body").css("background-image", "url(../images/night.png)");
        if (weather == 'Snow') {
            $("#body").css("background-image", "url(../images/swow.jpg")
        }
        if (weather == 'Rain') {
            $("#body").css("background-image", "url(../images/rain.jpg")
        }
    }
}
//Active tab

$('.tab').on('click', changeContent);

function changeContent() {
    $('.tab-active').removeClass('tab-active').addClass('tab-inactive');
    $(this).addClass('tab-active').removeClass('tab-inactive');

    var data = JSON.parse(sessionStorage.getItem("data"));


    if ($(this).is('#now-tab')) {
        clearWeatherContent()
        createCurrentTab(data);
    }
    if ($(this).is('#tomorrow-tab')) {
        clearWeatherContent()
        createTomorrowTab(data);
    }
    if ($(this).is('#five-days-tab')) {
        clearWeatherContent()
        ///TO DO : createFiveDaysTab(data);
    }
};



// Tab Now
function createCurrentTab(json) {
    $('#content-current').html("");
    // Creating
    for (var i = 0; i < 8; i += 1) {
        var row = $(`
        <table id="current-weather-table">    
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
            </tr>
        </table>`);

        $("#content-current").append(row);
    }

    // Filling:
    for (var i = 0; i < 8; i += 1) {

        var currentHour = $(`#hour-${i}`);
        currentHour.html(json.list[i].dt_txt.split(" ")[1].substr(0, 5));

        var currentDate = $(`#date-${i}`);
        currentDate.html(json.list[i].dt_txt.split(" ")[0]);

        var currentWeather = $(`#weather-${i}`);
        currentWeather.html(json.list[i].weather[0].main);

        var weather = (json.list[i].weather[0].main);
        if (weather == "Clouds") {
            $(`#icon-${i}`).attr("src", "images/clouds.png");
        } else if (weather == "Snow") {
            $(`#icon-${i}`).attr("src", "images/snow.png");
        } else if (weather == "Rain") {
            $(`#icon-${i}`).attr("src", "images/rain.png");
        } else if (weather == "Clear") {
            $(`#icon-${i}`).attr("src", "images/clear.png");
        } else if (weather == "Storm") {
            $(`#icon-${i}`).attr("src", "images/storm.png");
        } else {
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
function createTomorrowTab(json) {

    var row = $(`
    <div class="content-tomorrow clearfix">    
        <div id="left" class="column">
            <p id="day"></p>
            <p id="date"></p>
            <p id="weather-icon">
                <img id="tomorrow-icon" src="images/clouds.png" alt="BadWeather">
            </p>
            <p id="weather-text">CloudsText</p> 
        </div>
        <div id="middle" class="column">
            <p>3°</p>
        </div>
        <div id="right" class="column">
            <p>Min. Temperature:</p>
            <p>Max. Temperature:</p>
            <p>Humidity: </p>
            <p>Wind Speed:</p>
            <p>Wind Direction:</p>
        </div>
        <div id="last-right" class="column">
            <p id="min-temp"></p>
            <p id="max-temp"></p>
            <p id="humidity"></p>
            <p id="wind-speed"></p>
            <p id="wind-direction"></p>
        </div>
    </div>`);

    $("#content-tomorrow").append(row);

    // Filling
    var minTemp = 1000;
    var maxTemp = -1000;

    var sumTemp = 0;
    var sumHummidity = 0;
    var sumWindSpeed = 0;
    var sumWindDirection = 0;

    for (var i = 9; i <= 16; i += 1) {
        var currentMin = (parseInt(json.list[i].main.temp_min)).toFixed(0);
        if (currentMin < minTemp) {
            minTemp = currentMin;
        }
        var currentMax = (parseInt(json.list[i].main.temp_max)).toFixed(0);
        if (currentMax > maxTemp) {
            maxTemp = currentMax;
        }
        sumTemp += parseInt(json.list[i].main.temp_max);
        sumHummidity += parseInt(json.list[i].main.humidity);
        sumWindSpeed += parseInt(json.list[i].wind.speed);
        sumWindDirection += parseInt(json.list[i].wind.deg);
    }

    minTemp -= 273.15;
    maxTemp -= 273.15;
    var averageTemp = (sumTemp / 8 - 273.15).toFixed(0);
    var humidity = (sumHummidity / 8).toFixed(0);
    var windSpeed = (sumWindSpeed / 8).toFixed(0);
    var windDirection = ((sumWindDirection / 8) % 360).toFixed(0);
    var windDir = "";
    if (337 < windDirection || windDirection <= 22) {
        windDir = "N";
    } else if (22 < windDirection && windDirection <= 67) {
        windDir = "NE";
    } else if (67 < windDirection && windDirection <= 112) {
        windDir = "E";
    } else if (112 < windDirection && windDirection <= 157) {
        windDir = "SE";
    } else if (157 < windDirection && windDirection <= 202) {
        windDir = "S";
    } else if (202 < windDirection && windDirection <= 247) {
        windDir = "SW";
    } else if (247 < windDirection && windDirection <= 292) {
        windDir = "W";
    } else if (292 < windDirection && windDirection <= 337) {
        windDir = "NW";
    }

    var minimumTemp = $(`#min-temp`);
    minimumTemp.html(minTemp.toFixed(0) + "°");

    var maximumTemp = $(`#max-temp`);
    maximumTemp.html(maxTemp.toFixed(0) + "°");

    var humidityH = $(`#humidity`);
    humidityH.html(humidity + " %");

    var windSpeedWind = $(`#wind-speed`);
    windSpeedWind.html(windSpeed + " m/s");

    var windDirectionWind = $(`#wind-direction`);
    windDirectionWind.html(windDir);

    var averageTemperature = $('#middle');
    averageTemperature.html(averageTemp + "°");

    var tomorrowDate = $('#date');
    tomorrowDate.html((json.list[8].dt_txt).split(" ")[0])

    var tomorrowDay = $('#day');
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(json.list[8].dt_txt);
    var dayName = days[d.getDay()];
    tomorrowDay.html(dayName);

    var weather = (json.list[8].weather[0].main);
    if (weather == "Clouds") {
        $(`#tomorrow-icon`).attr("src", "images/clouds.png");
    } else if (weather == "Snow") {
        $(`#tomorrow-icon`).attr("src", "images/snow.png");
    } else if (weather == "Rain") {
        $(`#tomorrow-icon`).attr("src", "images/rain.png");
    } else if (weather == "Clear") {
        $(`#tomorrow-icon`).attr("src", "images/clear.png");
    } else if (weather == "Storm") {
        $(`#tomorrow-icon`).attr("src", "images/storm.png");
    } else {
        $(`#tomorrow-icon`).attr("src", "images/other.png");
    }

    var tomorrowWeatherText = $(`#weather-text`);
    tomorrowWeatherText.html(json.list[9].weather[0].description);

}