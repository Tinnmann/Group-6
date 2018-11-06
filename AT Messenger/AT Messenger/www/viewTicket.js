var socket = io.connect('192.168.0.63:4000');
window.onload = chatLoader();

function chatLoader(){

    socket.emit('chatLoad',{
        id : getCookie("id"),
    });
}
window.setInterval(function(){
    socket.emit('chatLoad',{
        id : getCookie("id"),
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
socket.on('chatPopulate',function (data) {
    console.log(data);
    if(data.result.length > 0){
        document.getElementById("chatContainer").innerHTML = '';
    }
    for(i = 0; i < data.result.length; i++){
        var div = document.createElement('div');
        div.className = 'chat container';
        div.innerHTML = '<div class="row" onclick="test('+ data.result[i]['chatID'] + ')">\n' +
            '            <div class="col-9 p-4 my-auto">\n' +
            '                <div class="contactName col-12 pl-0">\n' +
            data.result[i]['catName'] +
            '                </div>\n' +
            '                <div class="categoryName col-12 pl-0">\n' +
            data.result[i]['slur'] +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>';
    document.getElementById("chatContainer").appendChild(div);
    }
});
function test(id){
    setCookie("chat", id, 5);
    $.ajax({
        url: 'conversation.html',
        datatype: 'json',
        success: function(data){
            $('#pages').html(data);
        },
        error: function(){
            $('#pages').html('error');
        }
    });
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}