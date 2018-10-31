var socket = io.connect('192.168.0.63:4001');
window.onload = chatLoader();

function chatLoader(){
    socket.emit('chatLoad',{
    });
}
socket.on('chatPopulate',function (data) {
    for(i = 0; i < data.result.length; i++){
        var div = document.createElement('div');
        div.className = 'chat container';
            var row = document.createElement('div');
            row.className = 'row';
                var imagewrap = document.createElement('div');
                imagewrap.className = 'profilePic col-3 py-2 pr-0 d-flex justify-content-center';
                    var imagewrapinner = document.createElement('div');
                        var image = document.createElement("IMG");
                        image.setAttribute('src','images/ProfilePicTest.png')
                        image.className = 'img-fluid';
                    imagewrapinner.appendChild(image);
                imagewrap.appendChild(imagewrapinner);
                var wrap1 = document.createElement('div');
                wrap1.className = 'col-9 p-4 my-auto';
                    var chatname = document.createElement('div');
                    chatname.className = 'contactName col-12 pl-0';
                        var textnode = document.createTextNode(data.result[i]['sent']);
                    chatname.appendChild(textnode);
                    var chatcat = document.createElement('div');
                    chatcat.className = 'categoryName col-12 pl-0';
                        var textcat = document.createTextNode(data.result[i]['catName']);
                    chatcat.appendChild(textcat);
                    var chatslur = document.createElement('div');
                    chatslur.className = 'categoryName col-12 pl-0';
                        var textslur = document.createTextNode(data.result[i]['slur']);
                    chatslur.appendChild(textslur);
                wrap1.appendChild(chatname);
                wrap1.appendChild(chatcat);
                wrap1.appendChild(chatslur);
            row.appendChild(imagewrap);
            row.appendChild(wrap1);
        div.appendChild(row);
        document.getElementById("chatContainer").appendChild(div);
    }
});
