var view

$(document).ready(function(){

    view = new TaskView(new TaskDAO());
    view.init();
    
    $('#new').on('click', function(){
        // using the attribute data-modal to identify for what modal the button references
        modal = $(this).attr('data-modal');
        // creating the individual event attached to click over button
        $('#'+modal+'.modal').modal(
            'show'
        );
        $('#addFormTask').find('input[name="method"]').val('add');
    });

    $('cancelDel').on('click', function(){
        $('#modal2.modal').modal(
            'hide'
        );
    });


});

$('#listToDo').on('click','[data-modal="modal2"]', function(){
    // using the attribute data-modal to identify for what modal the button references
    modal = $(this).attr('data-modal');
    // creating the individual event attached to click over button
    $('#'+modal+'.modal').modal(
        'show'
    );

    $('#delid').attr('value',$(this).attr('data-key'));
});
$('#listToDo').on('click','[data-modal="modal5"]', function(){
    // using the attribute data-modal to identify for what modal the button references
    modal = $(this).attr('data-modal');

    id = $('#'+$(this).attr('data-key'));
    console.log($(this).attr('data-key'));
    // creating the individual event attached to click over button
    $('#'+modal+'.modal').modal(
        'show'
    );
    $('#modFormTask').find('input[name="key"]').val($(this).attr('data-key').trim());
    $('#modFormTask').find('input[name="title"]').val(id.find('#title-task').text().trim());
    $('#modFormTask').find('textarea[name="description"]').val(id.find('#description-task').text().trim());
});

$('#listDoing').on('click','[data-modal="modal2"]', function(){
    // using the attribute data-modal to identify for what modal the button references
    modal = $(this).attr('data-modal');
    // creating the individual event attached to click over button
    $('#'+modal+'.modal').modal(
        'show'
    );

    $('#delid').attr('value',$(this).attr('data-key'));
});
$('#listDoing').on('click','[data-modal="modal5"]', function(){
    // using the attribute data-modal to identify for what modal the button references
    modal = $(this).attr('data-modal');

    id = $('#'+$(this).attr('data-key'));

    // creating the individual event attached to click over button
    $('#'+modal+'.modal').modal(
        'show'
    );
    $('#modFormTask').find('input[name="key"]').val($(this).attr('data-key').trim());
    $('#modFormTask').find('input[name="title"]').val(id.find('#title-task').text().trim());
    $('#modFormTask').find('textarea[name="description"]').val(id.find('#description-task').text().trim());
});
$('#listDone').on('click','[data-modal="modal2"]', function(){
    // using the attribute data-modal to identify for what modal the button references
    modal = $(this).attr('data-modal');
    // creating the individual event attached to click over button
    $('#'+modal+'.modal').modal(
        'show'
    );

    $('#delid').attr('value',$(this).attr('data-key'));
});
$('#listDone').on('click','[data-modal="modal5"]', function(){
    // using the attribute data-modal to identify for what modal the button references
    modal = $(this).attr('data-modal');

    id = $('#'+$(this).attr('data-key'));

    // creating the individual event attached to click over button
    $('#'+modal+'.modal').modal(
        'show'
    );
    $('#modFormTask').find('input[name="key"]').val($(this).attr('data-key').trim());
    $('#modFormTask').find('input[name="title"]').val(id.find('#title-task').text().trim());
    $('#modFormTask').find('textarea[name="description"]').val(id.find('#description-task').text().trim());
});


$('#listToDo').on('click','[data-status="toDoing"]', function () {

    id = $('#' + $(this).attr('data-key'));

    view.nextStatus($(this).attr('data-key'), id.find('#title-task').text().trim(),
        id.find('#description-task').text().trim(), 'Doing', 'listToDo', 'listDoing');

});

$('#listDoing').on('click','[data-status="toToDo"]', function () {

    id = $('#' + $(this).attr('data-key'));

    view.nextStatus($(this).attr('data-key'), id.find('#title-task').text().trim(),
        id.find('#description-task').text().trim(), 'ToDo', 'listDoing', 'listToDo');

});

$('#listDoing').on('click', '[data-status="toDone"]',function () {

    id = $('#' + $(this).attr('data-key'));

    view.nextStatus($(this).attr('data-key'), id.find('#title-task').text().trim(),
        id.find('#description-task').text().trim(), 'Done', 'listDoing', 'listDone');

});

$('#listDone').on('click','[data-status="toDoingfromDone"]',function () {

    id = $('#' + $(this).attr('data-key'));

    view.nextStatus($(this).attr('data-key'), id.find('#title-task').text().trim(),
        id.find('#description-task').text().trim(), 'Doing', 'listDone', 'listDoing');

});

$('#newTask').click(function () {
    $('#addFormTask').submit();
});

$('#modifyTask').click(function () {
    $('#modFormTask').submit();
})