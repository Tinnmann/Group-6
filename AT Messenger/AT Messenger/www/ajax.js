//button variables
var tickets = document.getElementById('tickets'),
    profile = document.getElementById('profile'),
    logTicket = document.getElementById('logTicket'),
    view = document.getElementById('view');
//click events
    tickets.addEventListener('click',function(){
        mainPage();
    });
    profile.addEventListener('click',function(){
        profilePage();
    });
    logTicket.addEventListener('click',function(){
        logTicketsPage();
    });
    view.addEventListener('click',function(){
        viewTicketsPage();
    });
//ajax requests
    function mainPage(){
        $.ajax({
            url: 'main.html',
            datatype: 'json',
            success: function(data){
                $('#pages').html(data);
            },
            error: function(){
                $('#pages').html('error');
            }
        });
    }

    function profilePage(){
        $.ajax({
            url: 'profile.html',
            datatype: 'json',
            success: function(data){
                $('#pages').html(data);
            },
            error: function(){
                $('#pages').html('error');
            }
        });
    }
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