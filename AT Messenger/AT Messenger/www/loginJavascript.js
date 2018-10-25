//making a connection
// var socket = io.connect('192.168.0.63:4000');

// getting dom
var username = document.getElementById('username'),
    password = document.getElementById('password'),

    login = document.getElementById('login');

//testing login

// var socket  = io.connect('10.0.0.3:3002');
//
// var btn = document.getElementById('login');
// login.addEventListener('click', function () {
//     console.log('Running');
//     alert("Working");
//     var mysql = require('mysql');
//
//     var con = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "",
//         database: "at_messengerdb"
//     });
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//     });
//
// })
// console.log('Running');
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
// });
//
// // document.getElementById('login').addEventListener("click", function () {
// //     alert("Working");
// //     // con.connect(function(err) {
// //     //     if (err) throw err;
// //     //     con.query("SELECT * FROM client", function (err, result, fields) {
// //     //         if (err) throw err;
// //     //         console.log(result);
// //     //     });
// //     // });
// // })
//
// function btnClick()
// {
//     con.connect(function(err) {
//         if (err) throw err;
//         console.log("Connected!");
//     });
//     // alert("Button working!!!");
//     // con.connect(function(err) {
//     //     if (err) throw err;
//     //     con.query("SELECT * FROM client", function (err, result, fields) {
//     //         if (err) throw err;
//     //         console.log(result);
//     //     });
//     // });
// }

//emit event
    //login page
//     login.addEventListener('click',function(){
//         socket.emit('login',{
//             username: username.value,
//             password: password.value,
//         });
//     });
//
//     //register page
// //original
// // message.addEventListener('keypress',function(){
// //     socket.emit('typing', handle.value);
// // });
// // btn.addEventListener('click',function(){
// //     socket.emit('chat',{
// //         message: message.value,
// //         handle: handle.value,
// //     });
// // });
//
// //listen for events
//     //login
//     socket.on('response',function (data) {
//             if(data.status == 'accepted'){
//                 window.location = "layout.html";
//             }else{
//                 alert('status :'+data.status + ' User :' + data.username);
//             }
//
//         });
// socket.on('chat',function(data){
//     feedback.innerHTML = "";
//     output.innerHTML += '<p><strong>' + data.handle + ': <br/></strong>' + data.message + '</p>';
// });
// socket.on('typing',function(data){
//     feedback.innerHTML = '<p><em>'+data+' is typing a message</em></p>';
// });