let FillContent = (function() {


    let fillCurrentTab = (function(json) {
        for (let i = 0; i < 8; i += 1) {

            let currentHour = $(`#hour-${i}`);
            currentHour.html(json.list[i].dt_txt.split(' ')[1].substr(0, 5) + ' GMT');

            let currentDate = $(`#date-${i}`);
            currentDate.html(json.list[i].dt_txt.split(' ')[0]);

            let currentWeather = $(`#weather-${i}`);
            currentWeather.html(json.list[i].weather[0].main);

            let weather = (json.list[i].weather[0].main);
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

            let currentTemp = $(`#temp-${i}`);
            let t = (json.list[i].main.temp - 273.15).toFixed(0) + '°';
            if (t === '-0°') {
                t = '0°';
            }
            currentTemp.html(t);

            let currentHumidity = $(`#humidity-${i}`);
            currentHumidity.html(json.list[i].main.humidity + ' %');

            let currentWind = $(`#wind-${i}`);
            currentWind.html(json.list[i].wind.speed.toFixed(0) + ' m/s');
        }

    });

    let  fillTomorrowTab = (function(json) {
        let minTemp = 1000;
        let maxTemp = -1000;
        let minTempHour = '';
        let maxTempHour = '';

        let sumTemp = 0;
        let sumHummidity = 0;
        let sumWindSpeed = 0;
        let sumWindDirection = 0;

        for (let i = 9; i <= 16; i += 1) {
            let currentMin = (parseInt(json.list[i].main.temp_min)).toFixed(0);
            if (currentMin < minTemp) {
                minTemp = currentMin;
                minTempHour = json.list[i].dt_txt.split(' ')[1].substr(0, 5);
            }
            let currentMax = (parseInt(json.list[i].main.temp_max)).toFixed(0);
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
        let averageTemp = (sumTemp / 8 - 273.15).toFixed(0);
        let humidity = (sumHummidity / 8).toFixed(0);
        let windSpeed = (sumWindSpeed / 8).toFixed(0);
        let windDirection = ((sumWindDirection / 8) % 360).toFixed(0);
        let windDir = '';
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

        let minimumTemp = $('#min-temp');
        let n = minTemp.toFixed(0) + '°';
        if (n === '-0°') {
            n = '0°';
        }
        minimumTemp.html(n);

        let minimumHour = $('#min-temp-hour');
        minimumHour.html(' at ' + minTempHour);

        let maximumTemp = $('#max-temp');
        let x = maxTemp.toFixed(0) + '°';
        if (x === '-0°') {
            x = '0°';
        }
        maximumTemp.html(x);

        let maximumHour = $('#max-temp-hour');
        maximumHour.html(' at ' + maxTempHour);

        let humidityH = $('#humidity');
        humidityH.html(humidity + ' %');

        let windSpeedWind = $('#wind-speed');
        windSpeedWind.html(windSpeed + ' m/s');

        let windDirectionWind = $('#wind-direction');
        windDirectionWind.html(windDir);

        let averageTemperature = $('#av-degrees');
        let a = averageTemp + '°';
        if (a === '-0°') {
            a = '0°';
        }
        averageTemperature.html(a);

        let tomorrowDate = $('#date');
        tomorrowDate.html((json.list[8].dt_txt).split(' ')[0]);

        let tomorrowDay = $('#day');
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let d = new Date(json.list[8].dt_txt);
        let dayName = days[d.getDay()];
        tomorrowDay.html(dayName);

        let weather = (json.list[8].weather[0].main);
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

        let tomorrowWeatherText = $('#weather-text');
        tomorrowWeatherText.html(json.list[9].weather[0].description);
    });

    let fillFiveDaysTab = (function(json) {
        let allTemps = [];
        for (let i = 0; i < 40; i += 1) {
            allTemps.push(json.list[i].main.temp);
        };

        for (let i = 0; i < 40; i += 8) {
            
            let day = $(`#day-${i}`);
            let d = new Date(json.list[i].dt_txt);
            let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let dayName = days[d.getDay()];
            $(day).html(dayName);

            let date5days = $(`#date${i}`);
            $(`#date${i}`).html((json.list[i].dt_txt).split(' ')[0]);

            let title5days = $(`#title${i}`);
            $(title5days).html(json.list[i].weather[0].description);

            let minTemp5Days = $(`#tempMin${i}`);
            let minT5d = 1000;
            for (let k = i; k < i + 8; k += 1) {
                if (minT5d > allTemps[k]) {
                    minT5d = allTemps[k];
                }
            }
            let min = (minT5d.toFixed(0) - 273.15).toFixed(0) + '°';
            if (min === '-0°') {
                min = '0°';
            }
            $(minTemp5Days).html(min);

            let maxTemp5Days = $(`#tempMax${i}`);
            let maxT5d = -1000;
            for (let k = i; k < i + 8; k += 1) {
                if (maxT5d < allTemps[k]) {
                    maxT5d = allTemps[k];
                }
            }
            let max = (maxT5d.toFixed(0) - 273.15).toFixed(0) + '°';
            if (max === '-0°') {
                max = '0°';
            }
            $(maxTemp5Days).html(max);

            let weather5days = (json.list[i].weather[0].main);
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
            let wind = $(`#wind${i}`);
            let windSpeed = (json.list[i].wind.speed);
            $(wind).html(windSpeed.toFixed(0) + ' m/s');
        }

    });
    return {
       CurrentTab: fillCurrentTab,
       TomorrowTab: fillTomorrowTab,
       FiveDaysTab: fillFiveDaysTab
    };
})();
