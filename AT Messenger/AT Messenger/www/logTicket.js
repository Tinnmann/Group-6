var socket = io.connect('192.168.0.63:4000');
var logTicketButton = document.getElementById('logTicket');
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
    var cat = document.getElementById('catSelect'),
        selected = cat.options[cat.selectedIndex].value,
        message = document.getElementById('message');
    if(message.value != '' && selected != 'Select Category' ){socket.emit('log',{
        cat : selected,
        message : message.value,
        id : 1,
        name : 'john',
    });
    }else{
        
    }

});