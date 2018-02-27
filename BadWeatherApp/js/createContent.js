var CreateContent = (function () {

    var createCurrentTab = (function () {
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

            $('#content-current').append(row);
        };
    });

    var createTomorrowTab = (function () {

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

        $('#content-tomorrow').append(row);

    });

    var createFiveDaysTab = (function () {

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
`);
            $('#content-five-days').append(col);
        };

    });

    return {
        CurrentTab: createCurrentTab,
        TomorrowTab: createTomorrowTab,
        FiveDaysTab: createFiveDaysTab
    };
})();
