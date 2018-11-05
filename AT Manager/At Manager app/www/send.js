var socket = io.connect('192.168.8.2:4000');
var logTicketButton = document.getElementById('logTicket');
var msg = document.getElementById('message');
var errorMessage = "";

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

logTicketButton.addEventListener('click', function(){
    errorMessage = "";
    var msgError = validateMsg();
    
    if(catError && msgError){
        socket.emit('manSend',{
            message : msg.value,
            id : getCookie('id'),
            name : getCookie('name') +' ' + getCookie('surname'),
        });
    }else{
        document.getElementById("error").innerHTML=
        '<div class="alert alert-danger">'+
            errorMessage +
        '</div>';
    }

});


function validateMsg(){
    if (msg.value === "            ") {
        errorMessage += "Please enter message <br>";
        document.getElementById("message").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("message").style.backgroundColor = "";
        return true;
    }
}