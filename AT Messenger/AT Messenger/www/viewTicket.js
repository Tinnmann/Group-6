var socket = io.connect('192.168.0.63:4000');
window.onload = chatLoader();

function chatLoader(){

    socket.emit('chatLoad',{
        id : 1,
    });
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
    $.ajax({
        url: 'conversation.html',
        type: 'GET',
        data: {id : id},
        datatype: 'json',
        success: function(data){
            $('#pages').html(data);
        },
        error: function(){
            $('#pages').html('error');
        }
    });
}