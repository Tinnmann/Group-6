//database
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "at"
});
con.connect(function(err) {
    if (err) throw err;
function loginCheck($username, $password){
    var status = 'rejected',
        username = $username,
        password = $password;
        con.query("SELECT * FROM login WHERE email = '"+$username+ "' AND password ='" + $password + "'", function (err, result, fields) {
            if (err) {

            }else{
                 status = 'accepted';
                 username = result[0].email;
                 password = result[0].password;
            }

            // return [result1: status,];
        });
}


// $.getScript("database.js");
var express = require('express');
var socket = require('socket.io');

//Application setup
var app = express();
var server = app.listen(4000,function(){
    console.log('listening to requests on port 4000');
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
        });
    //AT-manager



    socket.on('chat',function(data){
        io.sockets.emit('chat',data);
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});






function login(data){
    // var results = loginCheck(data.username , data.password);
    // console.log(results);
    console.log(data.username + data.password);
    if(data.username == 'zane' && data.password == 123 ){
        return{ status: 'accepted',
                username: 'zane',
                password: 123
        };
    }
}

});