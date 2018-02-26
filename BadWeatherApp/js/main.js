///TODO : Extract functions in different files.


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
function createDeafultBackground(json) { ///////// TODO : Extract css to different files for diff cases and load them with JS 

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
        clearWeatherContent();
        $('.active-content').removeClass('active-content').addClass('inactive-content');
        $('#content-current').removeClass('inactive-content').addClass('active-content');
        createCurrentTab(data);
    }
    if ($(this).is('#tomorrow-tab')) {
        clearWeatherContent();
        $('.active-content').removeClass('active-content').addClass('inactive-content');
        $('#content-tomorrow').removeClass('inactive-content').addClass('active-content');
        createTomorrowTab(data);
    }
    if ($(this).is('#five-days-tab')) {
        clearWeatherContent();
        $('.active-content').removeClass('active-content').addClass('inactive-content');
        $('#content-five-days').removeClass('inactive-content').addClass('active-content');
        createFiveDaysTab(data);
    }
    if ($(this).is('#map')) {
        clearWeatherContent();
        $('.active-content').removeClass('active-content').addClass('inactive-content');
        // $('#map').removeClass('inactive-content').addClass('active-content');
        // createFiveDaysTab(data);
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
            <p id="av-degrees"></p>
            <p>Average temperature</p>
        </div>
        <div id="right" class="column">
            <p>Min. Temperature:</p>
            <p>Max. Temperature:</p>
            <p>Humidity: </p>
            <p>Wind Speed:</p>
            <p>Wind Direction:</p>
        </div>
        <div id="last-right" class="column">
            <p class="line" id="min-temp"></p>
            <p class="line" id="min-temp-hour"></p>
            <br/>
            <p class="line" id="max-temp"></p>
            <p class="line" id="max-temp-hour"></p>
            <p id="humidity"></p>
            <p id="wind-speed"></p>
            <p id="wind-direction"></p>
        </div>
    </div>`);

    $("#content-tomorrow").append(row);

    // Filling
    var minTemp = 1000;
    var maxTemp = -1000;
    var minTempHour = "";
    var maxTempHour = "";

    var sumTemp = 0;
    var sumHummidity = 0;
    var sumWindSpeed = 0;
    var sumWindDirection = 0;

    for (var i = 9; i <= 16; i += 1) {
        var currentMin = (parseInt(json.list[i].main.temp_min)).toFixed(0);
        if (currentMin < minTemp) {
            minTemp = currentMin;
            minTempHour = json.list[i].dt_txt.split(" ")[1].substr(0, 5);
        }
        var currentMax = (parseInt(json.list[i].main.temp_max)).toFixed(0);
        if (currentMax > maxTemp) {
            maxTemp = currentMax;
            maxTempHour = json.list[i].dt_txt.split(" ")[1].substr(0, 5);
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

    var minimumHour = $(`#min-temp-hour`);
    minimumHour.html(" at " + minTempHour);

    var maximumTemp = $(`#max-temp`);
    maximumTemp.html(maxTemp.toFixed(0) + "°");

    var maximumHour = $(`#max-temp-hour`);
    maximumHour.html(" at " + maxTempHour);

    var humidityH = $(`#humidity`);
    humidityH.html(humidity + " %");

    var windSpeedWind = $(`#wind-speed`);
    windSpeedWind.html(windSpeed + " m/s");

    var windDirectionWind = $(`#wind-direction`);
    windDirectionWind.html(windDir);

    var averageTemperature = $('#av-degrees');
    averageTemperature.html(averageTemp + "°");

    var tomorrowDate = $('#date');
    tomorrowDate.html((json.list[8].dt_txt).split(" ")[0]);

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

function createFiveDaysTab(json) {
    // Creating
    var allTemps = [];
    for (var i = 0; i < 40; i += 1) {
        allTemps.push(json.list[i].main.temp);
    }
    for (var i = 0; i < 40; i += 8) {
        var col = $(`
        
    <div id="day${i}" class="tab-five-days listdays">
        <div class="day" id="day-${i}"></div>
        <div class="date" id="date${i}"></div>
        <div class="weather-icon-5days" >
            <img id="weather-icon${i}"class="days-icon" src="images/clouds.png" alt="BadWeather">
        </div>
        <div class="title" id="title${i}"></div>
        <div class="temp" id="temperature${i}">
            <div class="temp-min" id="tempMin${i}"></div>/
            <div class="temp-max" id="tempMax${i}"></div>
        </div>
        <div class="wind" id ="wind${i}"></div>
    </div> 
    
  `)

        $("#content-five-days").append(col);
    }

    for (var i = 0; i < 40; i += 8) {

        var day = $(`#day-${i}`);
        var d = new Date(json.list[i].dt_txt);
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dayName = days[d.getDay()];
        $(day).html(dayName);

        var date5days = $(`#date${i}`);
        $(`#date${i}`).html((json.list[i].dt_txt).split(" ")[0]);

        var title5days = $(`#title${i}`);
        $(title5days).html(json.list[i].weather[0].description);

        var minTemp5Days = $(`#tempMin${i}`);
        var minT5d = 1000;
        for (var k = i; k < i + 8; k += 1) {
            if (minT5d > allTemps[k]) {
                minT5d = allTemps[k];
            }
        }
        $(minTemp5Days).html((minT5d.toFixed(0) - 273.15).toFixed(0)+'°');

        var maxTemp5Days = $(`#tempMax${i}`);
        var maxT5d = -1000;
        for (var k = i; k < i + 8; k += 1) {
            if (maxT5d < allTemps[k]) { 
                maxT5d = allTemps[k];
            }
        }
        $(maxTemp5Days).html((maxT5d.toFixed(0) - 273.15).toFixed(0)+'°');

        var weather5days = (json.list[i].weather[0].main);
        if (weather5days == "Clouds") {
            $(`#weather-icon${i}`).attr("src", "images/clouds.png");
        } else if (weather5days == "Snow") {
            $(`#weather-icon${i}`).attr("src", "images/snow.png");
        } else if (weather5days == "Rain") {
            $(`#weather-icon${i}`).attr("src", "images/rain.png");
        } else if (weather5days == "Clear") {
            $(`#weather-icon${i}`).attr("src", "images/clear.png");
        } else if (weather5days == "Storm") {
            $(`#weather-icon${i}`).attr("src", "images/storm.png");
        } else {
            $(`#weather-icon${i}`).attr("src", "images/other.png");
        }
        var wind = $(`#wind${i}`);
        var windSpeed = (json.list[i].wind.speed);
        $(wind).html(windSpeed.toFixed(0)+" m/s");
    }
}