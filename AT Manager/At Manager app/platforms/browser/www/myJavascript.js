//making a connection
var socket = io.connect('10.0.0.6:4001');

// getting dom
var status = 'error',
    username = document.getElementById('usernameManager'),
    password = document.getElementById('passwordManager'),
    loginMan = document.getElementById('loginManager');

//Passing data from manager index page via the socket
loginMan.addEventListener('click', function () {
    // alert("Working!");
    socket.emit('loginMan',{
        username : username.value,
        password : password.value,
    });
});

//listen for events
//login
    socket.on('response',function (data) {
            if(data.status == 'accepted'){
                window.location = "layout.html";
            }else{
                alert('status :'+data.status + ' User :' + data.username);
            }

        });
socket.on('chat',function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': <br/></strong>' + data.message + '</p>';
});
socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>'+data+' is typing a message</em></p>';
});
