//making a connection
var socket = io.connect('192.168.8.2:3000');

// getting dom
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//emit event
message.addEventListener('keypress',function(){
    socket.emit('typing', handle.value)
});
btn.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: handle.value,
    });
});


//listen for events
socket.on('chat',function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': <br/></strong>' + data.message + '</p>';
});
socket.on('typing',function(data){
    feedback.innerHTML = '<p><em>'+data+' is typing a message</em></p>'
});