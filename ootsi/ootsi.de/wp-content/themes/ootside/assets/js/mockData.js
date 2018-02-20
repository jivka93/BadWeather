window.NEU = (function (module, $) {
    "use strict";

    function MockData() {
      var root = this,
          types = [
            "THUNDERSTORM_RAIN",
            "LIGHT_RAIN",
            "MEDIUM_RAIN",
            "HEAVY_RAIN",
            "SNOW",
            "FOG",
            "DUST",
            "SUNSHINE",
            "MOON",
            "CLOUD",
            "TORNADO",
            "HIGH_WIND"
          ],
          typesLength = types.length,
          imageEndpoint = 'wp-json/posts?type=lines&filter[meta_key]=type&filter[meta_value]=',
          linesEndpoint = 'wp-json/posts?type=image&filter[meta_key]=type&filter[meta_value]=';

      this.init = function() {
        root.getData();
      };

      this.getData = function() {
        for(var i = 0;i < typesLength;i++) {
          // var imageRequest = $.get(imageEndpoint + types[i]);
          // imageRequest.done(function(data){
          //   console.log(data);
          // });

          var linesRequest = $.get(linesEndpoint + types[i]);
          linesRequest.done(function(data){
            console.log(data);
          });
        }
      };
    }

    NEU.mockData = new MockData;

    return module;
})(window.NEU || {}, window.jQuery);
