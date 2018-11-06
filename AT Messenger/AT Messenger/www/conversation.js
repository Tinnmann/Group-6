var socket = io.connect('192.168.0.63:4000');
window.onload = test();
var send = document.getElementById('send');

window.setInterval(function(){
    var id = getCookie("chat");
    socket.emit('converse',{
        chatId : id,
    });
}, 5000);

function test(){
    document.getElementById("textMessage").value = '';
    var id = getCookie("chat");
    socket.emit('converse',{
        chatId : id,
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

socket.on('conversePopulate',function (data) {
    if(data.result.length> 0){
        document.getElementById("converseWrapper").innerHTML = '';
        document.getElementById("statusInput").innerHTML = '';
    }
    var inDiv = document.createElement('div');
    inDiv.innerHTML = 'Status: '+data.status+' Change :<button id="complete" type="button" class="btn btn-success">Complete</button>\n' +
        '<button id="incomplete" type="button" class="btn btn-danger">Incomplete</button>';
    document.getElementById("statusInput").appendChild(inDiv);
    for(i = 0; i < data.result.length; i++){
        var div = document.createElement('div');
        if(data.result[i]['sender'] == 0){
            div.innerHTML = '<div class="row">\n' +
                '                <div class="receiver col-5 p-3">\n' +
                '                    <p>'+data.result[i]['message']+'</p>\n' +
                '                </div>\n' +
                '                <div class="col-6"></div>\n' +
                '            </div>';
        }else{
            div.innerHTML = '<div  class="row"> <div class="col"></div>\n' +
                '                <div class="sender col-6 p-3">\n' +
                '                    <p>'+data.result[i]['message']+'</p>\n' +
                '                </div> </div>';

        }
        document.getElementById("converseWrapper").appendChild(div);

    }
    document.getElementById('incomplete').addEventListener('click',function(){
        statusUpdate('Incomplete');
    });
    document.getElementById('complete').addEventListener('click',function(){
        statusUpdate('Complete');
    });
    // var last = data.result[data.result.length-1]['messageID'];
    setCookie("last", last, 5);
    window.scrollBy(0, 1000); console.log('start');
});

send.addEventListener('click',function(){
    var message = document.getElementById('textMessage').value;
    var id = getCookie("chat");
    if(message != ''){
        socket.emit('insertMessage',{
            chatId : id,
            message : message,
        });
        var div = document.createElement('div');
        div.innerHTML = '<div  class="row"> <div class="col"></div>\n' +
            '                <div class="sender col-6 p-5">\n' +
            '                    <p>'+message+'</p>\n' +
            '                </div> </div>';
        document.getElementById("converseWrapper").appendChild(div);

    }
    document.getElementById("textMessage").value = '';

});
function statusUpdate(stautsChange){
    socket.emit('updateCategoryStatus',{
        change : stautsChange,
        id : getCookie('chat'),
    });
    test();
}