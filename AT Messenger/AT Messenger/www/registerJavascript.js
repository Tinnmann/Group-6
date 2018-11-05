//making a connection
var socket = io.connect('192.168.0.63:4000');

// getting dom
var nameed = document.getElementById('name'),
    surname = document.getElementById('surname'),
    cellNumber = document.getElementById('cellNumber'),
    email = document.getElementById('email'),
    address = document.getElementById('address'),
    password1 = document.getElementById('password1'),
    password2 = document.getElementById('password2'),
    register = document.getElementById('register'),
    regButton = document.getElementById('regButton'),
    errorMessage = "";

//emit event
register.addEventListener('click', function () {

    //runs each validation function
    errorMessage = "";
    var nameError = validateName();
    var surError = validateSurname();
    var cellError = validateCell();
    var emailError = validateEmail();
    var addressError = validateAddress();
    var pwError = validatePw();

    //checks if all fields are correct
    if (nameError && surError && cellError && emailError && addressError && pwError) {
        var cellNumberNoSpace = cellNumber.value.split(' ').join('');
        socket.emit('register', {
            name: nameed.value,
            surname: surname.value,
            address: address.value,
            cellNumber: cellNumberNoSpace,
            email: email.value,
            password1: password1.value,
        });
    }
    if (!nameError || !surError || !cellError || !emailError || !addressError || !pwError) {
        //Inserts error feedback message
        document.getElementById("regError").innerHTML = '<div class="alert alert-danger text-center"><strong>' + errorMessage + '</strong></div>';
    }
});

//checks the name field
function validateName() {
    var valid = /^[a-zA-Z -]+$/;
    if (nameed.value.length > 20) {
        errorMessage += "Name must be less than 20 characters <br>";
        document.getElementById("name").style.backgroundColor = "#ffaaaa";
        return false;
    } else if (nameed.value === "" || !nameed.value.match(valid)) {
        errorMessage += "Please enter name <br>";
        document.getElementById("name").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("name").style.backgroundColor = "";
        return true;
    }
}

//checks the surname field
function validateSurname() {
    var valid = /^[a-zA-Z -]+$/;
    if (surname.value.length > 20) {
        errorMessage += "Surname must be less than 20 characters <br>";
        document.getElementById("surname").style.backgroundColor = "#ffaaaa";
        return false;
    } else if (surname.value === "" || !surname.value.match(valid)) {
        errorMessage += "Please enter last name <br>";
        document.getElementById("surname").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("surname").style.backgroundColor = "";
        return true;
    }
}

//checks the cell field
function validateCell() {
    var validCell = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var cellNumberNoSpace = cellNumber.value.split(' ').join('');
    if (cellNumberNoSpace.match(validCell)) {
        document.getElementById("cellNumber").style.backgroundColor = "";
        return true;
    } else {
        errorMessage += "Please enter valid cellphone number <br>";
        document.getElementById("cellNumber").style.backgroundColor = "#ffaaaa";
        return false;
    }
}

//checks the email field
function validateEmail() {
    var emailAddress = email.value;
    var valid = emailAddress.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/);
    if (emailAddress === "") {
        errorMessage += "Please enter e-mail address <br>";
        document.getElementById("email").style.backgroundColor = "#ffaaaa";
        return false;
    } else if (valid !== 0) {
        errorMessage += "Invalid e-mail address \n";
        document.getElementById("email").style.backgroundColor = "#ffaaaa";
        return false;
    } else if (emailAddress.length > 50) {
        errorMessage += "email must be less than 50 characters <br>";
        document.getElementById("surname").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("email").style.backgroundColor = "";
        return true;
    }
}

//checks the address field
function validateAddress() {
    if (address.value === "") {
        errorMessage += "Please enter address <br>";
        document.getElementById("address").style.backgroundColor = "#ffaaaa";
        return false;
    }
    if (address.value.length > 50) {
        errorMessage += "address must be less than 50 characters <br>";
        document.getElementById("address").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("address").style.backgroundColor = "";
        return true;
    }
}

//checks the password fields
function validatePw() {
    var pw1 = password1.value;
    var pw2 = password2.value;
    var validPw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (pw1 === "" && pw2 === "") {
        errorMessage += "Please make sure both password fields are filled in <br>";
        document.getElementById("password1").style.backgroundColor = "#ffaaaa";
        document.getElementById("password2").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        if (pw1 != pw2) {
            errorMessage += "Passwords do not match <br>";
            document.getElementById("password1").style.backgroundColor = "#ffaaaa";
            document.getElementById("password2").style.backgroundColor = "#ffaaaa";
            return false;
        } else {
            if (pw1.length > 20) {
                errorMessage += "Passwords must be less than 20 characters <br>";
                document.getElementById("password1").style.backgroundColor = "#ffaaaa";
                document.getElementById("password2").style.backgroundColor = "#ffaaaa";
                return false;
            } else if (pw1.match(validPw)) {
                document.getElementById("password1").style.backgroundColor = "";
                document.getElementById("password2").style.backgroundColor = "";
                return true;
            } else {
                errorMessage += "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters <br>";
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
        window.location = "index.html";
    } else {
        alert('user exists');
    }

});
