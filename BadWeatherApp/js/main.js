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
    // Location:
    var cityName = $("#city-name");
    cityName.html(json.city.name);
    var countryName = $("#country-name");
    countryName.html(json.city.country);

    createCurrentTab(json);
   
    createDeafultBackground(json);
    sessionStorage.setItem("data",JSON.stringify(json));
}

// Dynamically changes the background picture
function createDeafultBackground(json){

    var hour = parseInt((json.list[0].dt_txt.split(" ")[1].substr(0, 5)).split(":")[0]);
    var weather = (json.list[0].weather[0].main);

    if(hour > 6 && hour <= 8){
        $("#body").css("background-image", "url(../images/morning.jpeg)");
       if(weather == 'Snow'){
           $("#body").css("background-image", "url(../images/giphy.gif")
       }
       if(weather =='Rain'){
           $("#body").css("background-image", "url(../images/rain.jpg")
       }
    }
    else if(hour > 8 && hour <= 18){
        $("#body").css("background-image", "url(../images/day.jpeg)");
        if(weather == 'Snow'){
            $("#body").css("background-image", "url((../images/giphy.gif")
        }
        if(weather =='Rain'){
            $("#body").css("background-image", "url(../images/rain.jpg")
        }
    }
    else if(hour > 18 && hour <= 20){
        $("#body").css("background-image", "url(../images/evening.jpeg)");
        if(weather == 'Snow'){
            $("#body").css("background-image", "url(../images/swow.jpg")
        }
        if(weather =='Rain'){
            $("#body").css("background-image", "url(../images/rain.jpg")
        }
    }
    else if(hour <= 6 || hour > 20){
        $("#body").css("background-image", "url(../images/night.png)");
        if(weather == 'Snow'){
            $("#body").css("background-image", "url(../images/swow.jpg")
        }
        if(weather =='Rain'){
            $("#body").css("background-image", "url(../images/rain.jpg")
        }
    }
}
//Active tab

$('.tab').on('click',changeContent)

function changeContent(){
    $('.tab-active').removeClass('tab-active').addClass('tab-inactive');
    $(this).addClass('tab-active').removeClass('tab-inactive');
    
    var data = JSON.parse(sessionStorage.getItem("data"));
    
    if($(this).is('#now-tab')){
        $('#content-five-days').html('');
        $('#content-tomorrow').html('');
        $('#content-current').html("");        
        createCurrentTab(data);
    }
    if($(this).is('#tomorrow-tab')){
        $('#content-current').html("");
        $('#content-tomorrow').html("");
        $('#content-five-days').html("");
        createTomorrowTab(data);
    }
    if($(this).is('#five-days-tab')){
        $('#content-current').html('');
        $('#content-tomorrow').html('');
        ///TO DO : createFiveDaysTab(data);
    }
};



// Tab Now
function createCurrentTab(json){

    // Creating
    for (var i = 0; i < 8; i +=1 ){
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

    var row = $(`
    <div class="content-tomorrow">    
        <div id="left" class="column">
            <p>Saturday</p>
            <p>2018/03/01</p>
            <p>
                <img id="tomorrow-icon" src="images/clouds.png" alt="BadWeather">
            </p>
            <p>CloudsText</p> 
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
            <p>1° at 04:00</p>
            <p>11° at 14:00</p>
            <p>75 %</p>
            <p>2.73 m/s</p>
            <p>North-West</p>
        </div>
    </div>`);

    $("#content-tomorrow").append(row);
}