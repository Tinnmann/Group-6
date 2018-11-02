window.onload = checkCookie();
function checkCookie() {
    var id = getCookie("id");
    if (id == null) {
        window.location = 'index.html';
    } else{

    }
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
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
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
                setCookie("id", data.id, 1);
                setCookie("name", data.name, 1);
                setCookie("surname", data.surname, 1);
                window.location = "layout.html";
            }else{
                document.getElementById("loginError").innerHTML = '<div class="alert alert-danger text-center"><strong>Username Or Password Incorrect</strong></div>';
            }

        });
