var view

$(document).ready(function(){

    view = new BoardView(new BoardDAO());
    view.init();

    $('cancelDel').on('click', function(){
        $('#modal2.modal').modal(
            'hide'
        );
    });


});
