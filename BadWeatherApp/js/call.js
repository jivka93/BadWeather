(function(){

$('.tab').on('click', contentController().ChangeContent);

mainController.onButtonClick('727011');

$('.dropdown-menu').on('click', 'a', mainController.onDropdownClick);
}());