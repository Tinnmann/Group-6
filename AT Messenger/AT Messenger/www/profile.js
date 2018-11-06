var socket = io.connect('192.168.0.63:4000');
var logout = document.getElementById('logout'),
    save = document.getElementById('save'),
    pwEdit = document.getElementById('pwChange'),
    profileAddress = document.getElementById('address'),
    email = document.getElementById('email'),
    profileCell = document.getElementById('profileCell'),
    profileSurname = document.getElementById('profileSurname'),
    profileName = document.getElementById('profileName'),
    errorMessage = "";
window.onload = profileLoader();

function profileLoader() {
    socket.emit('profileLoad', {
        id: getCookie("id"),
    });
}

//Makes the password fields appear
pwEdit.addEventListener('click', function () {
    document.getElementById('pwArea').innerHTML = '';
    document.getElementById('pwField1').innerHTML =
        '<div class="col-12" style="color: #878386">enter password</div><div class="col-12"><input id="pw1" class="profileField w-100"type="password" placeholder="password" /></div>';
    document.getElementById('pwField2').innerHTML =
        '<div class="col-12" style="color: #878386">re-enter password</div><div class="col-12"><input id="pw2" class="profileField w-100" type="password" placeholder="re-enter password" /></div>';
});

//validates and saves the data in the profile window
save.addEventListener('click', function () {

    //checks if password fields are visible or not
    var passwordExists = document.getElementById('pw1');

    //runs each error check function
    errorMessage = "";
    var nameError = validateName();
    var surError = validateSurname();
    var cellError = validateCell();
    var emailError = validateEmail();
    var addressError = validateAddress();

    //if the password field is not visible
    if (!passwordExists) {

        //if there are no errors then continue to update the client details
        if (nameError && surError && cellError && emailError && addressError) {
            socket.emit('profileUpdate', {
                id: 1,
                email: email.value,
                profileAdrress: profileAddress.value,
                profileCell: profileCell.value,
                profileSurname: profileSurname.value,
                profileName: profileName.value,
            });
            //Inserts success feedback message
            document.getElementById("saveMessage").innerHTML = '<div class="alert alert-success text-center"><strong>Changes Saved</strong></div>';
        }
        else {
            document.getElementById("saveMessage").innerHTML = '<div class="alert alert-danger text-center">'+errorMessage+'</div>';
        }
    }

    //if the password field is visible
    if (passwordExists) {
        //check password for any errors
        var passwordError = validatePw();

        //if there are no errors then contine to update the client details
        if (nameError && surError && cellError && emailError && addressError && passwordError) {
            socket.emit('profileUpdate', {
                id: 1,
                email: email.value,
                profileCell: profileCell.value,
                profileAdrress: profileAddress.value,
                profileSurname: profileSurname.value,
                profileName: profileName.value,

            });

            //remove the password fields and replace it with the success message
            document.getElementById('pwArea').innerHTML = '';
            document.getElementById('pwField1').innerHTML = '';
            document.getElementById('pwField2').innerHTML = '';

            //Inserts success feedback message
            document.getElementById("pwArea").innerHTML = '<div class="alert alert-success text-center"><strong>Changes Saved</strong></div>';
            document.getElementById("saveMessage").innerHTML = '';
        }
        else{
            document.getElementById("saveMessage").innerHTML = '<div class="alert alert-danger text-center">'+errorMessage+'</div>';
        }
    }
});

//logout of app
logout.addEventListener('click', function () {
    cookieDestroy('id', getCookie("id"), -3);
    window.location = 'index.html';
});

//destroys the cookie
function cookieDestroy(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//populates the profile window
socket.on('profilePopulate', function (data) {
    profileName.value = data.result[0]['client_name'];
    profileSurname.value = data.result[0]['surname'];
    profileAddress.value = data.result[0]['address'];
    profileCell.value = data.result[0]['cell'];
    email.value = data.result[0]['email'];
});

//validates the name field
function validateName() {
    var valid = /^[a-zA-Z -]+$/;
    if (profileName.value.length > 20) {
        errorMessage += "Name must be less than 20 characters <br>";
        document.getElementById("profileName").style.backgroundColor = "#ffaaaa";
        return false;
    } else if (profileName.value === "" || !profileName.value.match(valid)) {
        errorMessage += "Please enter name <br>";
        document.getElementById("profileName").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("profileName").style.backgroundColor = "";
        return true;
    }
}

//validate the surname field
function validateSurname() {
    var valid = /^[a-zA-Z -]+$/;
    if (profileSurname.value.length > 20) {
        errorMessage += "Surname must be less than 20 characters <br>";
        document.getElementById("profileSurname").style.backgroundColor = "#ffaaaa";
        return false;
    } else if (profileSurname.value === "" || !profileSurname.value.match(valid)) {
        errorMessage += "Please enter last name <br>";
        document.getElementById("profileSurname").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("profileSurname").style.backgroundColor = "";
        return true;
    }
}

//validates the cell field
function validateCell() {
    var validCell = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    var cellNumberNoSpace = profileCell.value.split(' ').join('');
    if (cellNumberNoSpace.match(validCell)) {
        document.getElementById("profileCell").style.backgroundColor = "";
        return true;
    } else {
        errorMessage += "Please enter valid cellphone number <br>";
        document.getElementById("profileCell").style.backgroundColor = "#ffaaaa";
        return false;
    }
}

//validates the email field
function validateEmail() {
    var emailAddress = email.value;
    var valid = emailAddress.search(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/);
    if (emailAddress === "") {
        errorMessage += "Please enter e-mail address <br>";
        document.getElementById("email").style.backgroundColor = "#ffaaaa";
        return false;
    } else if (valid !== 0) {
        errorMessage += "Invalid e-mail address <br>";
        document.getElementById("email").style.backgroundColor = "#ffaaaa";
        return false;
    } else if (emailAddress.length > 50) {
        errorMessage += "email must be less than 50 characters <br>";
        document.getElementById("email").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("email").style.backgroundColor = "";
        return true;
    }
}

//validates the address field
function validateAddress() {
    if (profileAddress.value === "") {
        errorMessage += "Please enter address <br>";
        document.getElementById("address").style.backgroundColor = "#ffaaaa";
        return false;
    }
    if (profileAddress.value.length > 50) {
        errorMessage += "address must be less than 50 characters <br>";
        document.getElementById("address").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        document.getElementById("address").style.backgroundColor = "";
        return true;
    }
}

//validates the password fields
function validatePw() {
    var pw1 = document.getElementById('pw1').value;
    var pw2 = document.getElementById('pw2').value;
    var validPw = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (pw1 === "" && pw2 === "") {
        errorMessage += "Please make sure both password fields are filled in \n";
        document.getElementById("pw1").style.backgroundColor = "#ffaaaa";
        document.getElementById("pw2").style.backgroundColor = "#ffaaaa";
        return false;
    } else {
        if (pw1.length > 20) {
            errorMessage += "Passwords must be less than 20 characters <br>";
            document.getElementById("pw1").style.backgroundColor = "#ffaaaa";
            document.getElementById("pw2").style.backgroundColor = "#ffaaaa";
            return false;
        } else {
            if (pw1 != pw2) {
                errorMessage += "Passwords do not match <br>";
                document.getElementById("pw1").style.backgroundColor = "#ffaaaa";
                document.getElementById("pw2").style.backgroundColor = "#ffaaaa";
                return false;
            } else if (pw1.match(validPw)) {
                document.getElementById("pw1").style.backgroundColor = "";
                document.getElementById("pw2").style.backgroundColor = "";
                return true;
            } else {
                errorMessage += "Password must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters <br>";
                document.getElementById("pw1").style.backgroundColor = "#ffaaaa";
                document.getElementById("pw2").style.backgroundColor = "#ffaaaa";
                return false;
            }
        }
    }
}
