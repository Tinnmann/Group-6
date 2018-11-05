//button variables
var body = document.getElementById("body"),
    getPg = sessionStorage.getItem("getPage");
// var page = localStorage.getItem("getPage");
var admin = document.getElementById('admin'),
    chats = document.getElementById('chats'),
    calender = document.getElementById('calender');

//Controls the line under the navbar
admin.addEventListener('click', function () {
    setAdmin();
    if(document.getElementById('chatTab').classList.contains("active")){
        unsetChat();
    }
    adminPage();
});

chats.addEventListener('click', function () {
    setChat();
    if(document.getElementById('adminTab').classList.contains("active")){
        unsetAdmin();
    }
    chatsPage();
});

calender.addEventListener('click', function () {
    calenderPage();
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

//ajax requests (loads each page)
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
    // $.ajax({
    //     url: 'calender.html',
    //     datatype: 'json',
    //     success: function(data){
    //         $('#pages').html(data);
    //     },
    //     error: function(){
    //         $('#pages').html('error');
    //     }
    // });
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
    // alert(localStorage.getItem("getPage"));
    switch (getPg) {
        case "adminPage()":
            adminPage();
            break;
        case "chatsPage()":
            chatsPage();
            break;
    }
    // if (getPg="chatsPage()")
    // {
    //     chatsPage();
    // }
    // else if (getPg="adminPage()")
    // {
    //     adminPage();
    // }
    // else
    // {
    //     calenderPage();
    // }
}

function chatPage() {
    // var page = localStorage.setItem("getPage", "chatsPage()");
    // alert("Chat works");
    sessionStorage.setItem("getPage", "chatsPage()");
    alert(sessionStorage.getItem("getPage"));
    loadLayout();
    // sessionStorage.setItem("onload","chatsPage()");
    // window.location.href='layout.html';
    // body.onload=chatsPage();
}

function admiPage() {
    // window.location.href='layout.html';
    sessionStorage.setItem("getPage", "adminPage()");
    alert(sessionStorage.getItem("getPage"));
    loadLayout();
    // alert("Admin works");
    // alert(page);
    // sessionStorage.setItem("onload","adminPage()");
    // window.location.href='layout.html';
    // body.onload=adminPage();
}

function loadLayout() {
    window.location.href = 'layout.html';
}
