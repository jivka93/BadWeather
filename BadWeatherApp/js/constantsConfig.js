const constantsConfig = (function () {

    const minTemp = 1000; //Used for comparing values for minTemp
    const maxTemp = -1000; //Used for comparing values for maxTemp

    const firstHourOfTodayIndex = 0; /// Represents the forecast for the first hour from the JSON file
    const lastHourOfTodayIndex = 8;/// Represents the forecast for the last hour of the current 24 hour window from the JSON file
    const firstHourOfTomorrowIndex = 9; /// Represents the forecast for the first hour of the next day from the JSON file
    const lastHourOfTomorrowIndex = 16; /// Represents the forecast for the last hour of the next day from the JSON file
    const lastHourOfFifthDayIndex = 40; /// Represents the forecast for the last hour of the fift day from the JSON file
    const maxIndexesForADay = 8; //Represents the number of forecasts for a day

    const windDirections  = 8; // N, S, E, W, SE, SW, NW, NE;
    
    return {
        minTemp: minTemp,
        maxTemp: maxTemp,
        firstHourOfTodayIndex: firstHourOfTodayIndex,
        lastHourOfTodayIndex: lastHourOfTodayIndex,
        firstHourOfTomorrowIndex: firstHourOfTomorrowIndex,
        lastHourOfTomorrowIndex: lastHourOfTomorrowIndex,
        lastHourOfFifthDayIndex: lastHourOfFifthDayIndex,
        windDirections: windDirections,
        maxIndexesForADay: maxIndexesForADay
    };

})();
