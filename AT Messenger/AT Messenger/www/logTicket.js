var socket = io.connect('192.168.0.63:4000');
var logTicketButton = document.getElementById('logTicket');
var cat = document.getElementById('catSelect');
var selected = cat.options[cat.selectedIndex].value;
var msg = document.getElementById('message');
var errorMessage = "";

window.onload = selectInserter();
function selectInserter(){
    socket.emit('populate',{
        id : 1,
    });
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
            cat : selected,
            message : msg.value,
            id : 1,
            name : 'john',
        });
    }else{
        document.getElementById("error").innerHTML='<div class="alert alert-danger">'+
            errorMessage
        '</div>';
    }

});

function validateCat(){
    if(cat.value==""){
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
    if (msg.value === "            ") {
        errorMessage += "Please enter message <br>";
        document.getElementById("message").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("message").style.backgroundColor = "";
        return true;
    }
}