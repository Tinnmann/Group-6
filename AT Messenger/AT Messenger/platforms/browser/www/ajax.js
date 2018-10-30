//button variables
var tickets = document.getElementById('tickets'),
    profile = document.getElementById('profile');

//click events
    tickets.addEventListener('click',function(){
        mainPage();
    });
    profile.addEventListener('click',function(){
        profilePage();
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
