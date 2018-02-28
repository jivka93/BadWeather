$(function () {


  $('#autocomplete').autocomplete({
    autoSelectFirst: true,
    lookup: cities,
    onSelect: function (suggestion) {
      mainController.onButtonClick(suggestion.data);
      let data = JSON.parse(sessionStorage.getItem('data'));
      CreateContent.CurrentTab();
      FillContent.CurrentTab(data);
      switchActive.ToToday();
      clearContent.clear();
    }
  });
});
