// $.getScript("database.js");
var express = require('express');
var socket = require('socket.io');

//Application setup
var app = express();
var server = app.listen(3000,function(){
    console.log('listening to requests on port 3000');
});
//static files
// app.use(express.static('public/'));

//socket setup
var io = socket(server);

io.on('connection',function(socket){
    console.log('connection made', socket.id);
    //AT-Messenger
        socket.on('login',function(data){
            socket.emit('response',login(data));
        })
    //AT-manager



    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});





//database
function login(data){
    var status = 'rejected',
        username = data.username,
        userid = null;

    if(data.username == 'zane.smith1@yahoo.com' && data.password == '123'){
        status = 'accepted';
        username = data.username;
        userid = 3;

    }
    return {
        status: status,
        username: username,
        userid: userid
    };
}
