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
    regButton = document.getElementById('regButton'),
    errorMessage = "";

//emit event
    register.addEventListener('click',function(){
        errorMessage="";
        var nameError = validateName();
        var surError = validateSurname();
        var cellError = validateCell();
        var emailError = validateEmail();
        if (nameError && surError && cellError && emailError){
            //check if passwords match eachother
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
                //alert('passwords do not match' );
            }
        }
        else {
            //display the errors
            alert(errorMessage);
        }
    });

//Check all fields
function validateName(){
    if (nameed.value === ""){
        errorMessage += "Please enter name\n";
        document.getElementById("name").style.backgroundColor="#ffaaaa";
        return false;
    }
    else{
        document.getElementById("name").style.backgroundColor="";
        return true;
    }
}
        
function validateSurname(){
    if (surname.value === ""){
        errorMessage += "Please enter last name\n";
        document.getElementById("surname").style.backgroundColor="#ffaaaa";
        return false;
    }
    else{
        document.getElementById("surname").style.backgroundColor="";
        return true;
    }
}

function validateCell() {
    
}

function validateEmail() {
    var emailAddress = email.value;
    var valid = emailAddress.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/);
    if (emailAddress === "") {
        errorMessage += "Please enter e-mail address \n";
        document.getElementById("email").style.backgroundColor="#ffaaaa";
        return false;
    }
    else if (valid !== 0) {
        errorMessage += "Invalid e-mail address \n";
        document.getElementById("email").style.backgroundColor="#ffaaaa";
        return false;
    }
    else {
        document.getElementById("email").style.backgroundColor="";
        return true;
    }
}

//listen for events
    socket.on('insertResponse',function (data) {
        if(data.status == 'inserted'){
            alert('test2');
            window.location = "index.html";
        }else{
            alert('user rejected status :'+data.status + ' User :' + data.username);
        }

    });