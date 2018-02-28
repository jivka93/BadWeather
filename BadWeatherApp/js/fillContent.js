let FillContent = (function () {

    let convertToCelsius = function (temp) {
        return temp - 273.15;
    };

    let getWindDirectionString = function (windDirection) {
        let windDirectionString = '';
        if (337 < windDirection || windDirection <= 22) {
            windDirectionString = 'N';
        } else if (22 < windDirection && windDirection <= 67) {
            windDirectionString = 'NE';
        } else if (67 < windDirection && windDirection <= 112) {
            windDirectionString = 'E';
        } else if (112 < windDirection && windDirection <= 157) {
            windDirectionString = 'SE';
        } else if (157 < windDirection && windDirection <= 202) {
            windDirectionString = 'S';
        } else if (202 < windDirection && windDirection <= 247) {
            windDirectionString = 'SW';
        } else if (247 < windDirection && windDirection <= 292) {
            windDirectionString = 'W';
        } else if (292 < windDirection && windDirection <= 337) {
            windDirectionString = 'NW';
        }
        return windDirectionString;
    };
    let getDayOfTheWeek = function (date) {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dayName = days[date.getDay()];
        return dayName;
    };
    let fillCurrentTab = (function (json) {
        for (let i = 0; i < 8; i += 1) {

            let currentHour = $(`#hour-${i}`);
            currentHour.html(json.list[i].dt_txt.split(' ')[1].substr(0, 5) + ' GMT');

            let currentDate = $(`#date-${i}`);
            currentDate.html(json.list[i].dt_txt.split(' ')[0]);

            let currentWeather = $(`#weather-${i}`);
            currentWeather.html(json.list[i].weather[0].main);

            let weather = (json.list[i].weather[0].main);
            imageController.SetWeatherIcon(weather, i);

            let currentTemp = $(`#temp-${i}`);
            let t = convertToCelsius(json.list[i].main.temp).toFixed(0) + '°';
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

    let fillTomorrowTab = (function (json) {
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


        let averageTemp = convertToCelsius(sumTemp / 8).toFixed(0);
        let humidity = (sumHummidity / 8).toFixed(0);
        let windSpeed = (sumWindSpeed / 8).toFixed(0);
        let windDirection = ((sumWindDirection / 8) % 360).toFixed(0);
        let windDir = getWindDirectionString(windDirection);

        minTemp = convertToCelsius(minTemp);
        maxTemp = convertToCelsius(maxTemp);
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
        let date = new Date(json.list[8].dt_txt);
        let dateName = getDayOfTheWeek(date);
        tomorrowDay.html(dateName);

        let weather = (json.list[8].weather[0].main);
        imageController.SetWeatherIcon(weather);

        let tomorrowWeatherText = $('#weather-text');
        tomorrowWeatherText.html(json.list[9].weather[0].description);
    });

    let fillFiveDaysTab = (function (json) {
        let allTemps = [];
        for (let i = 0; i < 40; i += 1) {
            allTemps.push(json.list[i].main.temp);
        };

        for (let i = 0; i < 40; i += 8) {

            let day = $(`#day-${i}`);
            let date = new Date(json.list[i].dt_txt);
            let dateName = getDayOfTheWeek(date);

            $(day).html(dateName);

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
            let min = convertToCelsius(minT5d).toFixed(0) + '°';
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
            let max = convertToCelsius(maxT5d).toFixed(0) + '°';
            if (max === '-0°') {
                max = '0°';
            }
            $(maxTemp5Days).html(max);

            let weather5days = (json.list[i].weather[0].main);
            imageController.SetWeatherIcon(weather5days, i);
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
