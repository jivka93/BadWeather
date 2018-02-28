const FillContent = (function () {

    const convertToCelsius = function (temp) {
        return temp - 273.15;
    };
    const getWindDirectionString = function (windDirection) {
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
    const getDayOfTheWeek = function (date) {
        let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let dayName = days[date.getDay()];
        return dayName;
    };

    const parseToValidNumber = function(t) {
        if (t === '-0°') {
            t = '0°';
        }
        return t;
    };

    const fillCurrentTab = (function (json) {
        
        for (let i = variablesConfig.firstHourOfTodayIndex; i < variablesConfig.lastHourOfTodayIndex; i += 1) {

            let currentHour = $(`#hour-${i}`);
            currentHour.html(json.list[i].dt_txt.split(' ')[1].substr(0, 5) + ' GMT');

            let currentDate = $(`#date-${i}`);
            currentDate.html(json.list[i].dt_txt.split(' ')[0]);

            let currentWeather = $(`#weather-${i}`);
            currentWeather.html(json.list[i].weather[0].main);

            let weather = (json.list[i].weather[0].main);
            imageController.SetWeatherIcon(weather, i);

            let currentTemp = $(`#temp-${i}`);
            let tempToConvert = convertToCelsius(json.list[i].main.temp).toFixed(0) + '°';
            tempToConvert = parseToValidNumber(tempToConvert);
            currentTemp.html(tempToConvert);

            let currentHumidity = $(`#humidity-${i}`);
            currentHumidity.html(json.list[i].main.humidity + ' %');

            let currentWind = $(`#wind-${i}`);
            currentWind.html(json.list[i].wind.speed.toFixed(0) + ' m/s');
        }

    });

    const fillTomorrowTab = (function (json) {
        let minTemp = variablesConfig.minTemp;
        let maxTemp = variablesConfig.maxTemp;
        let minTempHour = '';
        let maxTempHour = '';

        let sumTemp = 0;
        let sumHummidity = 0;
        let sumWindSpeed = 0;
        let sumWindDirection = 0;

        for (let i = variablesConfig.firstHourOfTomorrowIndex; i <= variablesConfig.lastHourOfTomorrowIndex; i += 1) {
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


        let averageTemp = convertToCelsius(sumTemp / variablesConfig.windDirections).toFixed(0);
        let humidity = (sumHummidity / variablesConfig.windDirections).toFixed(0);
        let windSpeed = (sumWindSpeed / variablesConfig.windDirections).toFixed(0);
        let windDirection = ((sumWindDirection / variablesConfig.windDirections) % 360).toFixed(0);
        let windDir = getWindDirectionString(windDirection);

        minTemp = convertToCelsius(minTemp);
        maxTemp = convertToCelsius(maxTemp);
        let minimumTemp = $('#min-temp');
        let minTempToConvert = minTemp.toFixed(0) + '°';
        minTempToConvert = parseToValidNumber(minTempToConvert);
        minimumTemp.html(minTempToConvert);

        let minimumHour = $('#min-temp-hour');
        minimumHour.html(' at ' + minTempHour);

        let maximumTemp = $('#max-temp');
        let maxTempToConvert = maxTemp.toFixed(0) + '°';
        maxTempToConvert = parseToValidNumber(maxTempToConvert);
        maximumTemp.html(maxTempToConvert);

        let maximumHour = $('#max-temp-hour');
        maximumHour.html(' at ' + maxTempHour);

        let humidityH = $('#humidity');
        humidityH.html(humidity + ' %');

        let windSpeedWind = $('#wind-speed');
        windSpeedWind.html(windSpeed + ' m/s');

        let windDirectionWind = $('#wind-direction');
        windDirectionWind.html(windDir);

        let averageTemperature = $('#av-degrees');
        let averageTempToConvert = averageTemp + '°';
        averageTempToConvert = parseToValidNumber(averageTempToConvert);
        averageTemperature.html(averageTempToConvert);

        let tomorrowDate = $('#date');
        tomorrowDate.html((json.list[variablesConfig.firstHourOfTomorrowIndex].dt_txt).split(' ')[0]);

        let tomorrowDay = $('#day');
        let date = new Date(json.list[variablesConfig.firstHourOfTomorrowIndex].dt_txt);
        let dateName = getDayOfTheWeek(date);
        tomorrowDay.html(dateName);

        let weather = (json.list[variablesConfig.firstHourOfTomorrowIndex].weather[0].main);
        imageController.SetWeatherIcon(weather);

        let tomorrowWeatherText = $('#weather-text');
        tomorrowWeatherText.html(json.list[variablesConfig.firstHourOfTomorrowIndex].weather[0].description);
    });

    const fillFiveDaysTab = (function (json) {
        let allTemps = [];
        for (let i = variablesConfig.firstHourOfTodayIndex; i < variablesConfig.lastHourOfFifthDayIndex; i += 1) {
            allTemps.push(json.list[i].main.temp);
        };

        for (let i = variablesConfig.firstHourOfTodayIndex; i < variablesConfig.lastHourOfFifthDayIndex; i += 8) {

            let day = $(`#day-${i}`);
            let date = new Date(json.list[i].dt_txt);
            let dateName = getDayOfTheWeek(date);

            $(day).html(dateName);

            let date5days = $(`#date${i}`);
            $(`#date${i}`).html((json.list[i].dt_txt).split(' ')[0]);

            let title5days = $(`#title${i}`);
            $(title5days).html(json.list[i].weather[0].description);

            let minTemp5Days = $(`#tempMin${i}`);
            let minTemp = variablesConfig.minTemp;
            for (let k = i; k < i + variablesConfig.maxIndexesForADay; k += 1) {
                if (minTemp > allTemps[k]) {
                    minTemp = allTemps[k];
                }
            }
            let min = convertToCelsius(minTemp).toFixed(0) + '°';
            min = parseToValidNumber(min);
            $(minTemp5Days).html(min);

            let maxTemp5Days = $(`#tempMax${i}`);
            let maxTemp = variablesConfig.maxTemp;
            for (let k = i; k < i + variablesConfig.maxIndexesForADay; k += 1) {
                if (maxTemp < allTemps[k]) {
                    maxTemp = allTemps[k];
                }
            }
            let max = convertToCelsius(maxTemp).toFixed(0) + '°';
            max = parseToValidNumber(max);
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
