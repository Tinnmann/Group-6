var socket = io.connect('192.168.0.63:4001');
window.onload = test();
var send = document.getElementById('send');


function test(){
    var id = getCookie("chat");
    socket.emit('converse',{
        chatId : id,
    });
}
window.setInterval(function(){
    var id = getCookie("chat");
    socket.emit('converse',{
        chatId : id,
    });
}, 10000);
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
    console.log(data);
    if(data.result.length> 0){
        document.getElementById("converseWrapper").innerHTML = '';
        document.getElementById("statusInput").innerHTML = '';
    }
    var inDiv = document.createElement('div');
    var cat = document.createElement('div');
    inDiv.innerHTML = 'Status: '+data.status+' Change :<button id="complete" type="button" class="btn btn-success">Complete</button>\n' +
        '<button id="incomplete" type="button" class="btn btn-danger">Incomplete</button>';
    cat.innerHTML = '<select id="catSelect" class="mainButton btn btn-primary">\n' +
        '            <option value="" disabled selected>'+data.cat+'</option>\n' +
        '        </select><button id="update" class="btn btn-primary w-25" style="background-color: #aabcf7;color:8192fa;text-align: center; border-left: solid white 2px">\n' +
        '            <ion-icon name="send"></ion-icon>\n' +
        '        </button>';
    document.getElementById("statusInput").appendChild(inDiv);
    document.getElementById("statusInput").appendChild(cat);
    for(i = 0; i < data.cats.length; i++){
        var option = document.createElement("option");
        option.text =data.cats[i]['type'];
        option.value = data.cats[i]['type'];
        document.getElementById('catSelect').add(option);
    }
    for(i = 0; i < data.result.length; i++){
        var div = document.createElement('div');
        if(data.result[i]['sender'] == 1){
            div.innerHTML = '<div class="row">\n' +
                '                <div class="receiver col-5 p-5">\n' +
                '                    <p>'+data.result[i]['message']+'</p>\n' +
                '                </div>\n' +
                '                <div class="col-6"></div>\n' +
                '            </div>';
        }else{
            div.innerHTML = '<div  class="row"> <div class="col"></div>\n' +
                '                <div class="sender col-6 p-5">\n' +
                '                    <p>'+data.result[i]['message']+'</p>\n' +
                '                </div> </div>';

        }
        document.getElementById("converseWrapper").appendChild(div);
    }
    document.getElementById('update').addEventListener('click',function(){
        socket.emit('updateCategory',{
            cat : document.getElementById('catSelect').value,
            id : getCookie('chat'),
        });
    });
    document.getElementById('incomplete').addEventListener('click',function(){
        statusUpdate('Incomplete');
    });
    document.getElementById('complete').addEventListener('click',function(){
        statusUpdate('Complete');
    });
    window.scrollBy(0, 10000); console.log('start');
});
function statusUpdate(stautsChange){
    socket.emit('updateCategoryStatus',{
        change : stautsChange,
        id : getCookie('chat'),
    });
    test();
}
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
    window.scrollBy(0, 10000); console.log('start');
    document.getElementById("textMessage").value = '';
});

