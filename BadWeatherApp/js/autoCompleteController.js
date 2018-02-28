$(function () {

  $('#autocomplete').autocomplete({
    autoSelectFirst: true,
    lookup: cities,
    onSelect: function (suggestion) {

      let newId = suggestion.data;

      if (variablesConfig.currentCityID !== newId) {

      mainController.onButtonClick(newId);
      let data = JSON.parse(sessionStorage.getItem('data'));
      CreateContent.CurrentTab();
      FillContent.CurrentTab(data);
      switchActive.ToToday();
      clearContent.clear();
      
      }
    }
  });
});
