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
register.addEventListener('click', function () {
    errorMessage = "";
    var nameError = validateName();
    var surError = validateSurname();
    var cellError = validateCell();
    var emailError = validateEmail();
    var pwError = validatePw();
    if (nameError && surError && cellError && emailError && pwError) {
        // alert(nameed.value);
        socket.emit('register', {
            name: nameed.value,
            surname: surname.value,
            cellNumber: cellNumber.value,
            email: email.value,
            password1: password1.value,
        });
    } else {
        //display the errors
        alert(errorMessage);
    }
});

//Check all fields
function validateName() {
    if (nameed.value === "") {
        errorMessage += "Please enter name\n";
        document.getElementById("name").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("name").style.backgroundColor = "";
        return true;
    }
}

function validateSurname() {
    if (surname.value === "") {
        errorMessage += "Please enter last name\n";
        document.getElementById("surname").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("surname").style.backgroundColor = "";
        return true;
    }
}

function validateCell() {
    var validCell = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (cellNumber.value.match(validCell)) {
        document.getElementById("cellNumber").style.backgroundColor = "";
        return true;
    } else {
        errorMessage += "Please enter valid cellphone number\n";
        document.getElementById("cellNumber").style.backgroundColor = "#ffaaaa";
        return false;
    }
}

function validateEmail() {
    var emailAddress = email.value;
    var valid = emailAddress.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/);
    if (emailAddress === "") {
        errorMessage += "Please enter e-mail address \n";
        document.getElementById("email").style.backgroundColor = "#ffaaaa";
        return false;
    } else if (valid !== 0) {
        errorMessage += "Invalid e-mail address \n";
        document.getElementById("email").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("email").style.backgroundColor = "";
        return true;
    }
}

function validatePw() {
    var pw1 = password1.value;
    var pw2 = password2.value;
    var validPw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (pw1 == "" && pw2 == "") {
        errorMessage += "Please make sure both password fields are filled in \n";
        document.getElementById("password1").style.backgroundColor = "#ffaaaa";
        document.getElementById("password2").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        if (pw1 != pw2) {
            errorMessage += "Passwords do not match \n";
            document.getElementById("password1").style.backgroundColor = "#ffaaaa";
            document.getElementById("password2").style.backgroundColor = "#ffaaaa";
            return false;
        } else {
            if (pw1.match(validPw)) {
                document.getElementById("password1").style.backgroundColor = "";
                document.getElementById("password2").style.backgroundColor = "";
                return true;
            }
            else{
                errorMessage += "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters \n";
                document.getElementById("password1").style.backgroundColor = "#ffaaaa";
                document.getElementById("password2").style.backgroundColor = "#ffaaaa";
                return false;
            }
        }
    }
}

//listen for events
socket.on('insertResponse', function (data) {
    if (data.status == 'inserted') {
        alert('test2');
        window.location = "index.html";
    } else {
        alert('user rejected status :' + data.status + ' User :' + data.username);
    }

});
