var socket = io.connect('192.168.0.63:4000');
window.onload = chatLoader();

function chatLoader(){
    socket.emit('chatLoad',{
        id : 1,
    });
}
socket.on('chatPopulate',function (data) {
    for(i = 0; i < data.result.length; i++){
        var div = document.createElement('div');
        div.className = 'chat container';
            var row = document.createElement('div');
            row.className = 'row';
                var wrap1 = document.createElement('div');
                wrap1.className = 'col-9 p-4 my-auto';
                    var chatname = document.createElement('div');
                    chatname.className = 'contactName col-12 pl-0';
                        var textnode = document.createTextNode(data.result[i]['catName']);
                    chatname.appendChild(textnode);
                    var chatslur = document.createElement('div');
                    chatslur.className = 'categoryName col-12 pl-0';
                        var textslur = document.createTextNode(data.result[i]['slur']);
                    chatslur.appendChild(textslur);
                wrap1.appendChild(chatname);
                wrap1.appendChild(chatslur);
            row.appendChild(wrap1);
        div.appendChild(row);
    document.getElementById("chatContainer").appendChild(div);
    }
});