var socket = io.connect('172.25.41.97:4000');
window.onload = contactsLoader();
function contactsLoader(){
    socket.emit('contactsLoader');
}
socket.on('contactPopulate',function (data) {
    console.log(data);
    if(data.result.length > 0){
        document.getElementById("wrapper").innerHTML = '';
    }
    for(i = 0; i < data.result.length; i++){
        var name = data.result[i]['client_name'] + '    ' + data.result[i]['surname'];
        var div = document.createElement('div');
        div.className = 'chat container';
        div.innerHTML = '<div class="row" onclick="test('+data.result[i]['clientID']+')">' +
            '<div class="profilePic col-3 py-2 pr-0 d-flex justify-content-center">' +
                '<div>' +
                    '<img src="images/ProfilePicTest.png" class="img-fluid">' +
                '</div>' +
            '</div>' +
                '<div class="col-9 my-auto">' +
                    '<div class="contactName col-12 pl-0" ><input disabled type="text" id="name'+data.result[i]['clientID']+'" value="'+name+'" ></input></div>' +
                    '<div class="categoryName col-12 pl-0">'+data.result[i]['email']+'</div>' +
                    '<div class="categoryName col-12 pl-0">'+data.result[i]['address']+'</div>' +
                '</div>' +
            '</div>';
    document.getElementById("wrapper").appendChild(div);
    }
});

function test(id){
    setCookie("chat", id, 5);
    setCookie("clientName", document.getElementById('name'+id).value, 5);
    $.ajax({
        url: 'send.html',
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