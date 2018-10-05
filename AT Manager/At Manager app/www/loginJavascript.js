//making a connection
var socket = io.connect('192.168.0.63:4000');

// getting dom
var username = document.getElementById('username'),
    password = document.getElementById('password'),

    login = document.getElementById('login');

//emit event
    //login page
    login.addEventListener('click',function(){
        socket.emit('login',{
            username: username.value,
            password: password.value,
        });
    });

    //register page
//original
// message.addEventListener('keypress',function(){
//     socket.emit('typing', handle.value);
// });
// btn.addEventListener('click',function(){
//     socket.emit('chat',{
//         message: message.value,
//         handle: handle.value,
//     });
// });


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