var logTicket = document.getElementById('logTicket'),
    view = document.getElementById('view');

logTicket.addEventListener('click',function(){
    logTicketsPage();
});
view.addEventListener('click',function(){
    viewTicketsPage();
});
function logTicketsPage(){
    $.ajax({
        url: 'log.html',
        datatype: 'json',
        success: function(data){
            $('#pages').html(data);
        },
        error: function(){
            $('#pages').html('error');
        }
    });
}
function viewTicketsPage(){
    $.ajax({
        url: 'view.html',
        datatype: 'json',
        success: function(data){
            $('#pages').html(data);
        },
        error: function(){
            $('#pages').html('error');
        }
    });
}