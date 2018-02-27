var FillContent = (function() {


    var fillCurrentTab = (function(json) {
        for (var i = 0; i < 8; i += 1) {

            var currentHour = $(`#hour-${i}`);
            currentHour.html(json.list[i].dt_txt.split(' ')[1].substr(0, 5));

            var currentDate = $(`#date-${i}`);
            currentDate.html(json.list[i].dt_txt.split(' ')[0]);

            var currentWeather = $(`#weather-${i}`);
            currentWeather.html(json.list[i].weather[0].main);

            var weather = (json.list[i].weather[0].main);
            if (weather === 'Clouds') {
                $(`#icon-${i}`).attr('src', 'images/clouds.png');
            } else if (weather === 'Snow') {
                $(`#icon-${i}`).attr('src', 'images/snow.png');
            } else if (weather === 'Rain') {
                $(`#icon-${i}`).attr('src', 'images/rain.png');
            } else if (weather === 'Clear') {
                $(`#icon-${i}`).attr('src', 'images/clear.png');
            } else if (weather === 'Storm') {
                $(`#icon-${i}`).attr('src', 'images/storm.png');
            } else {
                $(`#icon-${i}`).attr('src', 'images/other.png');
            }

            var currentTemp = $(`#temp-${i}`);
            currentTemp.html((json.list[i].main.temp - 273.15).toFixed(0) + '°');

            var currentHumidity = $(`#humidity-${i}`);
            currentHumidity.html(json.list[i].main.humidity + ' %');

            var currentWind = $(`#wind-${i}`);
            currentWind.html(json.list[i].wind.speed.toFixed(0) + ' m/s');
        }

    });

    var  fillTomorrowTab = (function(json) {
        var minTemp = 1000;
        var maxTemp = -1000;
        var minTempHour = '';
        var maxTempHour = '';

        var sumTemp = 0;
        var sumHummidity = 0;
        var sumWindSpeed = 0;
        var sumWindDirection = 0;

        for (var i = 9; i <= 16; i += 1) {
            var currentMin = (parseInt(json.list[i].main.temp_min)).toFixed(0);
            if (currentMin < minTemp) {
                minTemp = currentMin;
                minTempHour = json.list[i].dt_txt.split(' ')[1].substr(0, 5);
            }
            var currentMax = (parseInt(json.list[i].main.temp_max)).toFixed(0);
            if (currentMax > maxTemp) {
                maxTemp = currentMax;
                maxTempHour = json.list[i].dt_txt.split(' ')[1].substr(0, 5);
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
        var windDir = '';
        if (337 < windDirection || windDirection <= 22) {
            windDir = 'N';
        } else if (22 < windDirection && windDirection <= 67) {
            windDir = 'NE';
        } else if (67 < windDirection && windDirection <= 112) {
            windDir = 'E';
        } else if (112 < windDirection && windDirection <= 157) {
            windDir = 'SE';
        } else if (157 < windDirection && windDirection <= 202) {
            windDir = 'S';
        } else if (202 < windDirection && windDirection <= 247) {
            windDir = 'SW';
        } else if (247 < windDirection && windDirection <= 292) {
            windDir = 'W';
        } else if (292 < windDirection && windDirection <= 337) {
            windDir = 'NW';
        }

        var minimumTemp = $('#min-temp');
        minimumTemp.html(minTemp.toFixed(0) + '°');

        var minimumHour = $('#min-temp-hour');
        minimumHour.html(' at ' + minTempHour);

        var maximumTemp = $('#max-temp');
        maximumTemp.html(maxTemp.toFixed(0) + '°');

        var maximumHour = $('#max-temp-hour');
        maximumHour.html(' at ' + maxTempHour);

        var humidityH = $('#humidity');
        humidityH.html(humidity + ' %');

        var windSpeedWind = $('#wind-speed');
        windSpeedWind.html(windSpeed + ' m/s');

        var windDirectionWind = $('#wind-direction');
        windDirectionWind.html(windDir);

        var averageTemperature = $('#av-degrees');
        averageTemperature.html(averageTemp + '°');

        var tomorrowDate = $('#date');
        tomorrowDate.html((json.list[8].dt_txt).split(' ')[0]);

        var tomorrowDay = $('#day');
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(json.list[8].dt_txt);
        var dayName = days[d.getDay()];
        tomorrowDay.html(dayName);

        var weather = (json.list[8].weather[0].main);
        if (weather === 'Clouds') {
            $('#tomorrow-icon').attr('src', 'images/clouds.png');
        } else if (weather === 'Snow') {
            $('#tomorrow-icon').attr('src', 'images/snow.png');
        } else if (weather === 'Rain') {
            $('#tomorrow-icon').attr('src', 'images/rain.png');
        } else if (weather === 'Clear') {
            $('#tomorrow-icon').attr('src', 'images/clear.png');
        } else if (weather === 'Storm') {
            $('#tomorrow-icon').attr('src', 'images/storm.png');
        } else {
            $('#tomorrow-icon').attr('src', 'images/other.png');
        }

        var tomorrowWeatherText = $('#weather-text');
        tomorrowWeatherText.html(json.list[9].weather[0].description);
    });

    var fillFiveDaysTab = (function(json) {
        var allTemps = [];
        for (var i = 0; i < 40; i += 1) {
            allTemps.push(json.list[i].main.temp);
        };

        for (let i = 0; i < 40; i += 8) {

            var day = $(`#day-${i}`);
            var d = new Date(json.list[i].dt_txt);
            var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var dayName = days[d.getDay()];
            $(day).html(dayName);

            var date5days = $(`#date${i}`);
            $(`#date${i}`).html((json.list[i].dt_txt).split(' ')[0]);

            var title5days = $(`#title${i}`);
            $(title5days).html(json.list[i].weather[0].description);

            var minTemp5Days = $(`#tempMin${i}`);
            var minT5d = 1000;
            for (let k = i; k < i + 8; k += 1) {
                if (minT5d > allTemps[k]) {
                    minT5d = allTemps[k];
                }
            }
            $(minTemp5Days).html((minT5d.toFixed(0) - 273.15).toFixed(0) + '°');

            var maxTemp5Days = $(`#tempMax${i}`);
            var maxT5d = -1000;
            for (var k = i; k < i + 8; k += 1) {
                if (maxT5d < allTemps[k]) {
                    maxT5d = allTemps[k];
                }
            }
            $(maxTemp5Days).html((maxT5d.toFixed(0) - 273.15).toFixed(0) + '°');

            var weather5days = (json.list[i].weather[0].main);
            if (weather5days === 'Clouds') {
                $(`#weather-icon${i}`).attr('src', 'images/clouds.png');
            } else if (weather5days === 'Snow') {
                $(`#weather-icon${i}`).attr('src', 'images/snow.png');
            } else if (weather5days === 'Rain') {
                $(`#weather-icon${i}`).attr('src', 'images/rain.png');
            } else if (weather5days === 'Clear') {
                $(`#weather-icon${i}`).attr('src', 'images/clear.png');
            } else if (weather5days === 'Storm') {
                $(`#weather-icon${i}`).attr('src', 'images/storm.png');
            } else {
                $(`#weather-icon${i}`).attr('src', 'images/other.png');
            }
            var wind = $(`#wind${i}`);
            var windSpeed = (json.list[i].wind.speed);
            $(wind).html(windSpeed.toFixed(0) + ' m/s');
        }

    });
    return {
       CurrentTab: fillCurrentTab,
       TomorrowTab: fillTomorrowTab,
       FiveDaysTab: fillFiveDaysTab
    };
})();
