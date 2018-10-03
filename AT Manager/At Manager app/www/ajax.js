//button variables
var admin = document.getElementById('admin'),
    chats = document.getElementById('chats'),
    calender = document.getElementById('calender');
//click events
    admin.addEventListener('click',function(){
        adminPage();
    });
    chats.addEventListener('click',function(){
        chatsPage();
    });
    calender.addEventListener('click',function(){
        calenderPage();
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
