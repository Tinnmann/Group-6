window.onload = sessionChecker();
function sessionChecker(){

}
//making a connection
var socket = io.connect('172.25.41.97:4001');

// getting dom
var username = document.getElementById('username'),
    password = document.getElementById('password'),
    login = document.getElementById('login');

//emit event
    //login page
    login.addEventListener('click',function(){
        alert("Working");
        socket.emit('manLogin',{
            username: username.value,
            password: password.value,
        });
    });

//listen for events
    //login
socket.on('manLoginresponse',function (data) {
    if(data.status == 'accepted'){
        window.location = "layout.html";
    }else{
        document.getElementById("loginError").innerHTML = 'Username Or Password Incorrect';
    }

});
