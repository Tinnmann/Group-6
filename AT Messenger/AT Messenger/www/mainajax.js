var logTicket = document.getElementById('logTicket'),
    view = document.getElementById('view');

//takes the user to the log ticket page
logTicket.addEventListener('click',function(){
    logTicketsPage();
});

//takes the user to the view ticket page
view.addEventListener('click',function(){
    viewTicketsPage();
});

//loads the log ticket page
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

//loads the tickets pages
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