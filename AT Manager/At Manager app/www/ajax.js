//button variables
var body = document.getElementById("body"),
    getPg = sessionStorage.getItem("getPage");
var admin = document.getElementById('admin'),
    logout = document.getElementById('logout'),
    chats = document.getElementById('chats'),
    calender = document.getElementById('calender');
window.onload = sessionChecker();

function sessionChecker() {
    var id = getCookie("id");
    if (id == "") {
        window.location = 'index.html';
    } else {
        chatsPage();
    }

}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//click events
admin.addEventListener('click', function () {
    setAdmin();
    if (document.getElementById('chatTab').classList.contains("active")) {
        unsetChat();
    }
    adminPage();
});
chats.addEventListener('click', function () {
    setChat();
    if (document.getElementById('adminTab').classList.contains("active")) {
        unsetAdmin();
    }
    chatsPage();
});
calender.addEventListener('click', function () {
    calenderPage();
});
logout.addEventListener('click', function () {
    cookieDestroy('id', getCookie("id"), -3);
    window.location = 'index.html';
});

//Sets and unsets the line on the bottom of each tab
function setAdmin() {
    document.getElementById('adminTab').classList.add("active");
}

function unsetAdmin() {
    document.getElementById('adminTab').classList.remove("active");
}

function setChat() {
    document.getElementById('chatTab').classList.add("active");
}

function unsetChat() {
    document.getElementById('chatTab').classList.remove("active");
}

//ajax requests
function chatsPage() {
    $.ajax({
        url: 'chats.html',
        datatype: 'json',
        success: function (data) {
            $('#pages').html(data);
        },
        error: function () {
            $('#pages').html('error');
        }
    });
}

function calenderPage() {
    window.location.href = 'calender.html';
}

function adminPage() {
    $.ajax({
        url: 'admin.html',
        datatype: 'json',
        success: function (data) {
            $('#pages').html(data);
        },
        error: function () {
            $('#pages').html('error');
        }
    });
}

function loadPage() {
    switch (getPg) {
        case "adminPage()":
            adminPage();
            break;
        case "chatsPage()":
            chatsPage();
            break;
    }
}

function chatPage() {
    sessionStorage.setItem("getPage", "chatsPage()");
    sessionStorage.getItem("getPage");
    loadLayout();
}

function admiPage() {
    sessionStorage.setItem("getPage", "adminPage()");
    sessionStorage.getItem("getPage");
    loadLayout();
}

function loadLayout() {
    window.location.href = 'layout.html';
}

function cookieDestroy(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function classDestroy(x, y) {
    if (x.classList.contains("active")) {
        x.classList.remove("active");
    }
    if (y.classList.contains("active")) {
        y.classList.remove("active");
    }
}
