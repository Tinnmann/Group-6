//button variables
var tickets = document.getElementById('tickets'),
    profile = document.getElementById('profile');

//click events
    tickets.addEventListener('click',function(){
        mainPage();
        document.getElementById('profileTab').classList.remove("active");
        document.getElementById('ticketTab').classList.add("active");
    });
    profile.addEventListener('click',function(){
        profilePage();
        document.getElementById('ticketTab').classList.remove("active");
        document.getElementById('profileTab').classList.add("active");
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
