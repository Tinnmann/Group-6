//making a connection
var socket = io.connect('192.168.0.63:4000');

// getting dom
var username = document.getElementById('username'),
    password = document.getElementById('password'),
    login = document.getElementById('login'),
    name = document.getElementById('name'),
    surname = document.getElementById('surname'),
    cellNumber = document.getElementById('cellNumber'),
    email = document.getElementById('email'),
    password1 = document.getElementById('password1'),
    password2 = document.getElementById('password2'),
    register = document.getElementById('register');

//emit event
    //login page
        login.addEventListener('click',function(){
            socket.emit('login',{
                username: username.value,
                password: password.value,
            });
        });
    //register page
        register.addEventListener('click',function(){
            if (password1 == password2){
                socket.emit('register',{
                    name : name.value,
                    surname : surname.value,
                    cellNumber : cellNumber.value,
                    email : email.value,
                    password1 : password1.value,
                });
            }else {
                alert("passwords do not match");
            }

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
    //Register
        socket.on('insertResponse',function (data) {
            if(data.status == 'inserted'){
                window.location = "index.html";
            }else if (data.status == 'user exists'){
                alert("user exists");
            }

        });


// socket.on('chat',function(data){
//     feedback.innerHTML = "";
//     output.innerHTML += '<p><strong>' + data.handle + ': <br/></strong>' + data.message + '</p>';
// });
// socket.on('typing',function(data){
//     feedback.innerHTML = '<p><em>'+data+' is typing a message</em></p>';
// });