var socket = io.connect('192.168.0.63:4000');
var logTicketButton = document.getElementById('logTicket');
var cat = document.getElementById('catSelect');
var selected = cat.options[cat.selectedIndex].value;
var msg = document.getElementById('message');
var errorMessage = "";

window.onload = selectInserter();
function selectInserter(){
    msg.value = '';
    socket.emit('populate',{
        id : 1,
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
socket.on('selectPopulate',function (data) {
    var cat = document.getElementById('catSelect');

    for(i = 0; i < data.result.length; i++){
        var option = document.createElement("option");
        option.text =data.result[i]['type'];
        option.value = data.result[i]['type'];
        cat.add(option);
    }
});

logTicketButton.addEventListener('click', function(){
    errorMessage = "";
    
    var catError = validateCat();
    var msgError = validateMsg();
    
    if(catError && msgError){
        socket.emit('log',{
            cat : cat.value,
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

function validateCat(){
    if(cat.value ==""){
        errorMessage += "Please select category<br>";
        document.getElementById("catSelect").style.backgroundColor = "#ffaaaa";
        return false;
    }
    else{
        document.getElementById("catSelect").style.backgroundColor = "";
        return true;
    }
}

function validateMsg(){
    if (msg.value == "") {
        errorMessage += "Please enter message <br>";
        document.getElementById("message").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("message").style.backgroundColor = "";
        return true;
    }
}