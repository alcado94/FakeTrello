var view

$(document).ready(function(){

    view = new BoardView(new BoardDAO());
    view.init();


});
