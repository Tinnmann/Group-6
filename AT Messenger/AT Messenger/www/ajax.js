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
        var id = getCookie("id");
        if (id == "") {
            window.location = 'index.html';
        } else{

        }
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

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }