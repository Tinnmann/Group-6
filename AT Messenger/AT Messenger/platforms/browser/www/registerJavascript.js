//making a connection
var socket = io.connect('192.168.0.63:4000');

// getting dom
var nameed = document.getElementById('name'),
    surname = document.getElementById('surname'),
    cellNumber = document.getElementById('cellNumber'),
    email = document.getElementById('email'),
    password1 = document.getElementById('password1'),
    password2 = document.getElementById('password2'),
    register = document.getElementById('register'),
    regButton = document.getElementById('regButton');

//emit event
    register.addEventListener('click',function(){

        if(password1.value == password2.value){
            // alert(nameed.value);
            socket.emit('register',{
                name : nameed.value,
                surname : surname.value,
                cellNumber : cellNumber.value,
                email : email.value,
                password1 : password1.value,
            });
        } else {
            alert('passwords do not match' );
        }
    });

//listen for events
    socket.on('insertResponse',function (data) {
        if(data.status == 'inserted'){
            alert('test2');
            window.location = "index.html";
        }else{
            alert('user rejected status :'+data.status + ' User :' + data.username);
        }

    });