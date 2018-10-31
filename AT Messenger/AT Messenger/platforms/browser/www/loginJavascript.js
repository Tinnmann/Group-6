//making a connection
var socket = io.connect('192.168.0.63:4000');

// getting dom
var username = document.getElementById('username'),
    password = document.getElementById('password'),
    login = document.getElementById('login'),
    status = 'error';

// page events
    regButton.addEventListener('click', function(){

        window.location = "layout.html";
    });

//emit event
    login.addEventListener('click',function(){
        socket.emit('login',{
            username: username.value,
            password: password.value,
        });
    });

//listen for events
    socket.on('response',function (data) {
            if(data.status == 'accepted'){
                window.location = "layout.html";
            }else{
                document.getElementById("loginError").innerHTML = 'Username Or Password Incorrect';
            }

        });
