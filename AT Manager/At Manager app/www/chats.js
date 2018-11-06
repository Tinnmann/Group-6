var socket = io.connect('192.168.8.2:4001');
window.onload = chatLoader();

function chatLoader(){
    socket.emit('chatLoad',{
    });
}
window.setInterval(function(){
    socket.emit('chatLoad',{
        id : getCookie("id"),
    });
}, 10000);
socket.on('chatPopulate',function (data) {
    if(data.result.length> 0){
        document.getElementById("chatContainer").innerHTML = '';
    }
    for(i = 0; i < data.result.length; i++){
        var div = document.createElement('div');
        div.className = 'chat container';
        div.id = data.result[i]['chatID'];
        div.innerHTML = '<div class="row" onclick="test('+ data.result[i]['chatID'] + ')">\n' +
            '            <div class="profilePic col-3 py-2 pr-0 d-flex justify-content-center">\n' +
            '                <div>\n' +
            '                    <img class="img-fluid" src="images/ProfilePicTest.png">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-9 my-auto">\n' +
            '                <div class="contactName col-12 pl-0">\n' +
                                data.result[i]['sent'] +
            '                </div>\n' +
            '                <div class="contactName col-12 pl-0">\n' +
            'status : ' +data.result[i]['status'] +
            '                </div>\n' +
            '                <div class="categoryName col-12 pl-0">\n' +
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
