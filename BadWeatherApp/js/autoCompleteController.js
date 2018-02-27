$(function(){
    $('#autocomplete').autocomplete({
      lookup: cities,
      onSelect: function (suggestion) {
        var thehtml = '<strong>City Name:</strong> ' + cities.value + ' <br> <strong>ID:</strong> ' + cities.data;
        $('#outputcontent').html(thehtml);
      }
    });
    
    $( function() {
      $( "#tags" ).autocomplete({
        source: cities
      });
    } );
  
  });