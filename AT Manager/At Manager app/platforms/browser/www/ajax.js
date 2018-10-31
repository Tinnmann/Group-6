//button variables
var admin = document.getElementById('admin'),
    chats = document.getElementById('chats'),
    calender = document.getElementById('calender');
//click events
    admin.addEventListener('click',function(){
        adminPage();
        document.getElementById('chatTab').classList.remove("active");
        document.getElementById('calTab').classList.remove("active");
        document.getElementById('adminTab').classList.add("active");
    });
    chats.addEventListener('click',function(){
        chatsPage();
        document.getElementById('adminTab').classList.remove("active");
        document.getElementById('calTab').classList.remove("active");
        document.getElementById('chatTab').classList.add("active");
    });
    calender.addEventListener('click',function(){
        calenderPage();
        document.getElementById('adminTab').classList.remove("active");
        document.getElementById('chatTab').classList.remove("active");
        document.getElementById('calTab').classList.add("active");
    });
//ajax requests
    function chatsPage(){
        $.ajax({
            url: 'chats.html',
            datatype: 'json',
            success: function(data){
                $('#pages').html(data);
            },
            error: function(){
                $('#pages').html('error');
            }
        });
    }
    function calenderPage(){
        $.ajax({
            url: 'calender.html',
            datatype: 'json',
            success: function(data){
                $('#pages').html(data);
            },
            error: function(){
                $('#pages').html('error');
            }
        });
    }
    function adminPage(){
        $.ajax({
            url: 'admin.html',
            datatype: 'json',
            success: function(data){
                $('#pages').html(data);
            },
            error: function(){
                $('#pages').html('error');
            }
        });
    }
