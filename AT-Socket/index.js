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
                password = data.password,
                id,
                name,
                surname;
            console.log('username : ' + username + ' password : ' + password);
            con.query("SELECT * FROM client WHERE email='"+ username +"' AND password='"+ password +"'", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                    id = result[0]['clientID'];
                    name = result[0]['client_name'];
                    surname = result[0]['surname'];
                } else {
                    console.log("Query didn't return any results.");
                }
                socket.emit('response',{status: status, username: username ,password: password,id: id, name: name, surname: surname});
            });
        });
        socket.on('register', function (data) {
            // console.log('test');
            var status = 'error default',
                name = data.name,
                surname = data.surname,
                cellNumber = data.cellNumber,
                email = data.email,
                password1 = data.password1;
            console.log(data);
            con.query("SELECT * FROM client WHERE email='"+ email +"' ", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = 'user exists';
                    socket.emit('insertResponse',{status: status});
                } else {
                    var sql = "INSERT INTO client (client_name , surname, email ,address ,password ) VALUES ('"+name+"','"+surname+"','"+email+"','"+cellNumber+"','"+password1+"')";
                    con.query(sql, function (err, result) {
                        if (err) {
                            console.log(err);
                            status = 'insert error';
                        } else{
                            status = 'inserted';
                            socket.emit('insertResponse',{status: status});
                        }
                    });
                }
            });
        });
        socket.on('populate',function(data){
            con.query("SELECT * FROM category ", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                    socket.emit('selectPopulate',{result: result});
                } else {
                    console.log("Query didn't return any results.");
                }
                // socket.emit('response',{status: status, username: username ,password: password});
            });
        });
        socket.on('log',function(data){
          var  cat = data.cat ,
              id = data.id,
              name = data.name,
            message = data.message ;
          var insertedId;
           var sql = "INSERT INTO chat (clientID , slur,catName  ,sent ) VALUES ('"+id+"','"+message+"','"+cat+"','"+name+"')";
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                } else{
                    console.log(status + "insert test 2");
                    console.log(result.insertId);
                    insertedId = result.insertId;
                    sql = "INSERT INTO message (message, chatId, sender) VALUES ('"+message+"','"+insertedId+"', '1')";
                    con.query(sql, function (err, result) {
                        if (err) {
                            console.log(err);
                            status = 'insert error';
                        } else{
                            status = 'inserted';
                            console.log(status + "insert test 2");
                            insertedId = result.insertId;
                        }
                    });
                }
            });
        });
        socket.on('chatLoad',function(data){
            var id = data.id;
            con.query("SELECT * FROM chat WHERE clientID ='"+ id +"' ORDER BY date_set DESC", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                    socket.emit('chatPopulate',{result: result});
                } else {
                    console.log("Query didn't return any results.");
                }
                // socket.emit('response',{status: status, username: username ,password: password});
            });
        });
        socket.on('profileLoad',function(data){
            var id = data.id;
            con.query("SELECT * FROM client WHERE clientID ='"+ id +"'", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                    socket.emit('profilePopulate',{result: result});
                } else {
                    console.log("Query didn't return any results.");
                }
            });
        });
        socket.on('profileUpdate',function(data){
            var id = data.id,
                email = data.email ,
                profileCell = data.profileCell ,
                profileSurname = data.profileSurname ,
                profileName = data.profileName;
            con.query("UPDATE client SET client_name  = '"+profileName+"' , surname   = '"+profileSurname+"' , email = '"+email+"' ,  address  = '"+profileCell+"' WHERE clientID = '"+id+"'", function (err, result) {
                if (err) {
                    console.log(err);
                } else{

                }
            });
        });
        socket.on('converse',function(data){
            console.log(data.chatId);
            var chatId = data.chatId;
            con.query("SELECT * FROM message WHERE chatId ='"+ chatId + "' ORDER BY msg_date_time", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                    console.log('query accepted');
                    socket.emit('conversePopulate',{result: result});
                } else {
                    console.log("Query didn't return any results.");
                    console.log(result);
                }
            });

        });
        socket.on('insertMessage',function(data){
            console.log('hello');
            console.log(data.chatId);
            var chatId = data.chatId;
            var message = data.message;
            var sql = "INSERT INTO message (message,chatID,sender) VALUES ('"+message+"','"+chatId+"', '1')";
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    status = 'insert error';
                } else{
                    status = 'inserted';
                    con.query("UPDATE chat SET slur = '"+message+"' , date_set = CURRENT_TIMESTAMP WHERE chatID  = '"+chatId+"'", function (err, result) {
                        if (err) {
                            console.log(err);
                        } else{
                            console.log('updated');
                        }
                    });
                }
            });
        });
    });

    manio.on('connection', function (manSocket) {
        console.log('manager connection made', manSocket.id);
        //AT-Messenger
        manSocket.on('manLogin', function (data) {
            var status = 'error default',
                username = data.username,
                password = data.password;
            con.query("SELECT * FROM manager WHERE email ='"+ username +"' AND password='"+ password +"'", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                } else {
                    console.log("Query didn't return any results.");
                }
                manSocket.emit('manLoginresponse',{status: status, username: username ,password: password});
            });
        });
        manSocket.on('contactsLoader',function(data){
            con.query("SELECT * FROM client ORDER BY client_name, surname, email", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                    manSocket.emit('contactPopulate',{result: result});
                } else {
                    console.log("Query didn't return any results.");
                }
                // socket.emit('response',{status: status, username: username ,password: password});
            });
        });
        manSocket.on('chatLoad',function(data){
            con.query("SELECT * FROM chat ORDER BY date_set DESC", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                    manSocket.emit('chatPopulate',{result: result});
                } else {
                    console.log("Query didn't return any results.");
                }
            });
        });
        manSocket.on('converse',function(data){
            console.log(data.chatId);
            var chatId = data.chatId;
            con.query("SELECT * FROM message WHERE chatId ='"+ chatId + "' ORDER BY msg_date_time", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                    console.log('query accepted');
                    manSocket.emit('conversePopulate',{result: result});
                } else {
                    console.log("Query didn't return any results.");
                    console.log(result);
                }
            });

        });
        manSocket.on('insertMessage',function(data){
            var chatId = data.chatId;
            var message = data.message;
            var sql = "INSERT INTO message (message,chatID,sender) VALUES ('"+message+"','"+chatId+"', '0')";
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    status = 'insert error';
                } else{
                    status = 'inserted';
                    con.query("UPDATE chat SET slur = '"+message+"' , date_set = CURRENT_TIMESTAMP WHERE chatID  = '"+chatId+"'", function (err, result) {
                        if (err) {
                            console.log(err);
                        } else{
                            console.log('updated');
                        }
                    });
                }
            });

        });
        manSocket.on('insertCal',function(data){
            console.log('insert name = ' + data.name + 'insert date = ' + data.date + 'insert time = ' + data.time);
            var name = data.name,
                date = data.date,
                time = data.time;
            var sql = "INSERT INTO calendar (custName ,setDate ,time) VALUES ('"+name+"','"+date+"', '"+time+"')";
            con.query(sql, function (err, result) {
                if (err) {
                    console.log(err);
                    status = 'insert error';
                } else{
                    status = 'inserted';
                }
            });


        });
        manSocket.on('scheduleLoad',function(data){
            console.log('insert date = ' + data.date );
            con.query("SELECT * FROM calendar WHERE setDate ='"+ data.date + "' ORDER BY setDate", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                    console.log('query accepted');
                    manSocket.emit('shedulePopulate',{result: result});
                } else {
                    console.log("Query didn't return any results.");
                    console.log(result);
                }
            });
        });
        manSocket.on('requestDays',function(data){
            console.log('insert date = ' + data.date );
            con.query("SELECT * FROM calendar ORDER BY setDate", function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else if (result.length) {
                    status = "accepted";
                    console.log('query accepted');
                    manSocket.emit('dayPopulate',{result: result});
                } else {
                    console.log("Query didn't return any results.");
                    console.log(result);
                }
            });
        });
    });
});