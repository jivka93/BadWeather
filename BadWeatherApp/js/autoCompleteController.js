$(function () {


  $('#autocomplete').autocomplete({
    lookup: cities,
    onSelect: function (suggestion) {
      mainController.onButtonClick(suggestion.data);
      var data = JSON.parse(sessionStorage.getItem("data"));
      CreateContent.CurrentTab();
      FillContent.CurrentTab(data);
      switchActive.ToToday();
      clearContent.clear();
    }
  });



});