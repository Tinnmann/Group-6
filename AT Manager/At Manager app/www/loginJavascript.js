
//making a connection
var socket = io.connect('192.168.8.2:4001');

// getting dom
var username = document.getElementById('username'),
    password = document.getElementById('password'),
    login = document.getElementById('login');

//emit event
    //login page
    login.addEventListener('click',function(){
        socket.emit('manLogin',{
            username: username.value,
            password: password.value,
        });
    });

//listen for events
    //login
socket.on('manLoginresponse',function (data) {
    if(data.status == 'accepted'){
        setCookie("id", data.username, 1);
        window.location = "layout.html";
    }else{
        document.getElementById("loginError").innerHTML = '<div class="alert alert-danger text-center"><strong>Username Or Password Incorrect</strong></div>';
    }

});

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}