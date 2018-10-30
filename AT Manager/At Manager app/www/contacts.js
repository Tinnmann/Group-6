var socket = io.connect('192.168.0.63:4001');
window.onload = contactsLoader();
function contactsLoader(){
    socket.emit('contactsLoader');
}
socket.on('contactPopulate',function (data) {
    console.log(data);
    for(i = 0; i < data.result.length; i++){
        var div = document.createElement('div');
        div.className = 'chat container';
            var row = document.createElement('div');
            row.className = 'row';
                var imagewrap = document.createElement('div');
                    imagewrap.className = 'profilePic col-3 py-2 pr-0 d-flex justify-content-center';
                    var imagewrapinner = document.createElement('div');
                        var image =
                        // var chatname = document.createElement('div');
                        // chatname.className = 'contactName col-12 pl-0';
                        // var textnode = document.createTextNode(data.result[i]['catName']);
                        // chatname.appendChild(textnode);
                        // var chatslur = document.createElement('div');
                        // chatslur.className = 'categoryName col-12 pl-0';
                        // var textslur = document.createTextNode(data.result[i]['slur']);
                        // chatslur.appendChild(textslur);
                        // wrap1.appendChild(chatname);
                        // wrap1.appendChild(chatslur);
                        // row.appendChild(wrap1);
                        // div.appendChild(row);
                        // document.getElementById("chatContainer").appendChild(div);
    }
});