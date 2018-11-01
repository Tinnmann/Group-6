var socket = io.connect('192.168.0.63:4001');
window.onload = test();
var send = document.getElementById('send');


function test(){
    var id = parseURLParams("www.conversation.html?id=23");
    socket.emit('converse',{
        chatId : id,
    });
}


function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms['id'][0];
}
socket.on('conversePopulate',function (data) {
    if(data.result.length> 0){
        document.getElementById("converseWrapper").innerHTML = '';
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
});

send.addEventListener('click',function(){
    var message = document.getElementById('textMessage').value;
    var id = parseURLParams("www.conversation.html?id=23");
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

});
