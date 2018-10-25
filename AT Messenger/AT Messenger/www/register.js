var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//making a connection
var socket = io.connect('10.0.0.3:3002');

// getting dom
var name = document.getElementById('name'),
    surname = document.getElementById('name'),
    cell_number = document.getElementById('cell number'),
    email = document.getElementById('email'),
    address = document.getElementById('address'),
    password = document.getElementById('password1'),
    confirmpwd = document.getElementById('password2'),

    login = document.getElementById('register');

//emit event
//login page
login.addEventListener('click',function(){
    socket.emit('login',{
        username: username.value,
        password: password.value,
    });
});