//database
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "at"
});
con.connect(function (err) {
    if (err) throw err;
// $.getScript("database.js");
    var express = require('express');
    var socket = require('socket.io');
    var manSocket = require('socket.io');

//Application setup
    var app = express();
    var server = app.listen(4000, function () {
        console.log('listening to requests on port 4000');
    });
    var Manserver = app.listen(4001, function () {
        console.log('listening to requests on port 4001');
    });
//static files
// app.use(express.static('public/'));

//socket setup
    var io = socket(server);
    var manio = manSocket(Manserver);

    io.on('connection', function (socket) {
        console.log('Client connection made', socket.id);
        //AT-Messenger
        socket.on('login', function (data) {
            var status = 'rejected',
                username = data.username,
                password = data.password;
            con.query("SELECT * FROM login WHERE email='"+ username +"' AND password='"+ password +"'", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                } else {
                    console.log("Query didn't return any results.");
                }
                socket.emit('response',{status: status, username: username ,password: password});
            });
        });

        socket.on('register', function (data) {
            var status = 'error',
                name = data.name,
                surname = data.surname,
                cellNumber = data.cellNumber,
                email = data.email,
                password1 = data.password1;

            console.log(data);
            con.query("SELECT * FROM login WHERE email='"+ username +"' AND password='"+ password +"'", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = 'user exists';
                } else {
                    var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
                    con.query(sql, function (err, result) {
                        if (err) {
                            throw err;
                        }else if(result.length){
                            status = 'inserted';
                        } else{
                            status = 'insert error';
                        }
                    });
                }
                socket.emit('insertResponse',{status: status, name: name ,email: email});
            });
        });

        socket.on('chat', function (data) {
            io.sockets.emit('chat', data);
        });

        socket.on('typing', function (data) {
            socket.broadcast.emit('typing', data);
        });

    });

    manio.on('connection', function (manSocket) {
        console.log('manager connection made', manSocket.id);
        //AT-Messenger
        manSocket.on('login', function (data) {
            var status = 'rejected',
                username = data.username,
                password = data.password;
            con.query("SELECT * FROM login WHERE email='"+ username +"' AND password='"+ password +"'", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                } else {
                    console.log("Query didn't return any results.");
                }
                socket.emit('response',{status: status, username: username ,password: password});
            });
        });

        manSocket.on('chat', function (data) {
            io.sockets.emit('chat', data);
        });

        manSocket.on('typing', function (data) {
            socket.broadcast.emit('typing', data);
        });
    });
});