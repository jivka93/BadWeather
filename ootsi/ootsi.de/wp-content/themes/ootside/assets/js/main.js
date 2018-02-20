window.NEU = (function (module, $) {
    "use strict";

    var _IS_STATIC_SITE = false;

    // Function from David Walsh: http://davidwalsh.name/css-animation-callback
    function whichTransitionEvent(){
      var t,
          el = document.createElement("fakeelement");

      var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
      }

      for (t in transitions){
        if (el.style[t] !== undefined){
          return transitions[t];
        }
      }
    }

    var transitionEvent = whichTransitionEvent();



    var utilities = {
      convertTemp: function(kel) {
        return (kel - 273.15).toFixed(0);
      },
      getIcon: function(code, temp, sunsetTime, time) {
        var icon = "",
            phrases = [],
            grad =[];
            switch (code) {
              case 200:
              case 230:
              case 231:
              case 232:
              case 201:
              case 202:
              case 210:
              case 211:
              case 212:
              case 221:
              case 960:
              case 961:
              case 901:
                  icon = "THUNDERSTORM_RAIN";
                  grad = ["#000000","#757435"]
                  break;
              case 300:
              case 301:
              case 302:
              case 310:
              case 311:
              case 312:
              case 313:
              case 314:
              case 321:
              case 500:
                  icon = "LIGHT_RAIN";
                  grad = ["#fffffe", "#007e99"]
                  break;
              case 501:
              case 502:
              case 520:
              case 521:
              case 522:
              case 531:
                  icon = "MEDIUM_RAIN";
                  grad = ["#5ce0d2","#084899"]
                  break;
              case 503:
              case 504:
              case 502:
              case 511:
              case 906:
              case 615:
              case 606:
                  icon = "HEAVY_RAIN";
                  grad = ["#b84281","#1866cc"]
                  break;
              case 600:
              case 611:
              case 612:
              case 601:
              case 602:
              case 620:
              case 621:
              case 622:
                  icon = "SNOW";
                  grad = ["#fffffe","#32a3fc"]
                  break;
              case 701:
              case 711:
              case 721:
              case 741:
                  icon = "FOG";
                  phrases = [9,21,32]
                  grad = ["#000000","#5e8891"]
                  break;
              case 731:
              case 751:
              case 761:
              case 762:
                  icon = "DUST";
                  grad = ["#808080","#000000"]
                  break;
              case 800:
              case 904:
                 if(time < sunsetTime ){
                        icon = "SUNSHINE";
                        grad = ["#f15a24","#fcee00"]
                      } else{
                        icon = "MOON";
                        grad = ["#000000","#a64b80"]
                      }

                  break;
              case 801:
              case 802:
              case 803:
              case 804:
                  icon = "CLOUD";
                  grad = ["#000d3b","#bf5472"]
                  break;
              case 781:
              case 900:
                  icon = "TORNADO";
                  grad = ["#000d3b","#bf5472"]
                  break;
              case 951:
              case 952:
              case 953:
              case 954:
              case 955:
              case 956:
              case 771:
              case 905:
              case 957:
              case 958:
              case 959:
              case 902:
              case 962:
                  icon = "HIGH_WIND";
                  grad = ["#0b0030","#4dffc2"]
                  break;
          }

        var icon = "icon-icon_"+icon;

        return [icon,grad];
      },
      convertTime: function(unix) {
        var date = new Date(unix*1000),
            hours = date.getHours(),
            minutes = "0" + date.getMinutes(),
            seconds = "0" + date.getSeconds();
        return hours + ':' + minutes.substr(-2);
      }
    }

    function LocalWeather() {
      var imageEndpoint = 'wp-json/posts?type=image&filter[meta_key]=type&filter[meta_value]=',
          linesEndpoint = 'wp-json/posts?type=lines&filter[meta_key]=type&filter[meta_value]=',
          self = this,
          $document = $('html');

      self.init = function() {
        if (localStorage["weather-location"]) {
          self.getWeather(localStorage["weather-location"]);
        }
        else {
          self.toggleInputScreen.show();
        }
      }

      self.clearStore = function() {
        localStorage.removeItem("weather-location");
      }

      self.setStore = function(data) {
        if(typeof data === "undefined") {
          console.log('no data specified');

          return;
        }

        localStorage.setItem("weather-location", data);
      }

      self.getStore = function() {
        return localStorage.getItem("weather-location");
      }

      self.toggleInputScreen = {
        show: function() {
            $document.addClass('show-input-screen');
        },
        hide: function() {
          $('.set-up').fadeOut(200, function() {
            $document.removeClass('show-input-screen');
            $(this).removeAttr('style');
          });
        }
      }

      self.toggleForecastScreen = {
        show: function() {
          $document.addClass('has-forecast');
        },
        hide: function() {
          $document.removeClass('has-forecast');
        }
      }

      self.getWeather = function(loc) {
        if(typeof loc === "undefined") {
          console.log('no location data specified');
          return;
        }

        self.loading(true);
        $('.background').removeClass('transition-image');

        var getWeatherData = $.get( "http://api.openweathermap.org/data/2.5/weather?q="+loc+"&cnt=4&APPID=fe20cf5a62a83af7a4d32511df1b483d");
        var getForecastData = $.get( "http://api.openweathermap.org/data/2.5/forecast?q="+loc+"&cnt=4&APPID=fe20cf5a62a83af7a4d32511df1b483d");

        var hasForecast = $('html').hasClass('has-forecast');

        var setupData = function() {
          var sunsetTime;

          getWeatherData.done(function(data) {
            sunsetTime = data.sys.sunset;
            var temp = utilities.convertTemp(data.main.temp),
                time = Math.floor(Date.now() / 1000),
                parse = utilities.getIcon(data.weather[0].id, utilities.convertTemp(data.main.temp), sunsetTime, time),
                icon = parse[0].substring(10);

                $('.city span').removeClass().addClass(parse[0]);
                $('.header .city h4').html(data.name)
                $('.header .temp h3 .tempNo').html(utilities.convertTemp(data.main.temp));

                var setUpContent = function() {
                  var coldBarrier = 4,
                      hotBarrier =26,
                      gradientVal = parse[1],
                      phrases,
                      images,
                      selImage,
                      linesRequest = linesEndpoint + icon,
                      imageRequest = imageEndpoint + icon;

                  // IF STATIC SITE USE CACHED API REPONSES
                  if(_IS_STATIC_SITE) {
                    linesRequest = 'wp-json/posts.lines.' + icon + '.json';
                    imageRequest = 'wp-json/posts.image.' + icon + '.json';
                  }

                  var linesPromise = $.get(linesRequest);
                  linesPromise.done(function(data) {
                    phrases = data[0].acf.Lines;
                    var forecaseHeadingText = phrases[Math.floor(Math.random()*phrases.length)].line;
                    $('.forecast-heading').html(forecaseHeadingText);
                  });

                  var imagePromise = $.get(imageRequest);
                  imagePromise.done(function(data) {
                    selImage = data[0].acf.images[Math.floor(Math.random()*data[0].acf.images.length)].image;

                    if(time > sunsetTime ) {
                      parse[1] = ["#000000","#a64b80"];
                    }

                    $('.background')
                      .addClass('transition-image')
                      .css({'background':"url(" + selImage + ") no-repeat center, -webkit-linear-gradient(top, " + parse[1][0] + " 0%," + parse[1][1] + " 100%)"});
                  });

                };
                setUpContent();
          });

          getForecastData.done(function(data) {

            var $days =  $('.day');

            $(data.list).each(function( i, day ) {

              var innerdata = utilities.getIcon(day.weather[0].id, utilities.convertTemp(day.main.temp), sunsetTime, day.dt);

              $('.day').eq(i)
                .find('h3').html(utilities.convertTime(day.dt)).end()
                .find('.num').html(utilities.convertTemp(day.main.temp)).end()
                .find('span#icon').removeClass().addClass(innerdata[0]);
            });
          });

          $.when(getWeatherData, getForecastData).done(function(weatherData, foreCastData) {
            console.log('loaded');
            self.loading(false);
            self.toggleInputScreen.hide();
            self.toggleForecastScreen.show();
            self.setStore(loc);
          });
        }

        if(hasForecast) {
          self.toggleForecastScreen.hide();
          $('.forecast-heading').one(transitionEvent, function(event) {
            setupData();
          });
        }
        else {
          setupData();
        }
      }

      self.loading = function(isLoading) {
        if(isLoading) {
          $document.addClass('is-loading');
        }
        else {
          $document.removeClass('is-loading');
        }
      }
    }
    module.localWeather = new LocalWeather;


    var bindDomEvents = function() {
      $('.settings').on('click', function(){
        module.localWeather.toggleInputScreen.show();
        $(".location-input").val('').focus();
      });

      $('.set-up').on('click', '.close', function() {
        module.localWeather.toggleInputScreen.hide();
      });

      $(".location-input").geocomplete().bind("geocode:result", function(event, result) {
        module.localWeather.getWeather(result.formatted_address);
      });
    }

    var demonstrationMode = function() {
      var isDemoMode = true,
          duration = 15000,
          initialDuration = 15000,
          timer,
          resetTimer,
          i = 0;

      var locations = NEU.demoLocations,
          locationsCount = locations.length - 1;

      var updateLocation = function() {
        module.localWeather.setStore(locations[i]);
        module.localWeather.getWeather(locations[i]);
        if(i == locationsCount) {
          i = 0;
        }
        else {
          i++;
        }
        resetTimer(duration);
      }

      var resetTimer = function(_duration) {
        clearTimeout(timer);
        timer = setTimeout(updateLocation, _duration);
      }
      resetTimer(initialDuration);

      $(window).on('keypress mousemove', function() {
        resetTimer(initialDuration);
      });
    }

    $(function() {
    module.localWeather.init();
    bindDomEvents();
    //  demonstrationMode();
    });

    // log the endpoint responses
    //module.mockData.init();

    return module;
})(window.NEU || {}, window.jQuery);
