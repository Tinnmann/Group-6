var socket = io.connect('192.168.0.63:4001');
window.onload = contactsLoader();
function contactsLoader(){
    socket.emit('contactsLoader');
}
socket.on('contactPopulate',function (data) {
    console.log(data);
    for(i = 0; i < data.result.length; i++){
        var div = document.createElement('div');
        div.className = 'chat container';
            var row = document.createElement('div');
            row.className = 'row';
                var imagewrap = document.createElement('div');
                    imagewrap.className = 'profilePic col-3 py-2 pr-0 d-flex justify-content-center';
                    var imagewrapinner = document.createElement('div');
                        var image = document.createElement("IMG");
                        image.setAttribute('src','images/ProfilePicTest.png')
                        image.className = 'img-fluid';
                    imagewrapinner.appendChild(image);
                imagewrap.appendChild(imagewrapinner);
                var namewrap = document.createElement('div');
                namewrap.className = 'col-9 my-auto';
                    var namewrapinner = document.createElement('div');
                    namewrapinner.className = 'contactName col-12 pl-0';
                        var textnodename = document.createTextNode(data.result[i]['client_name'] + '    ' + data.result[i]['surname']);
                    namewrapinner.appendChild(textnodename);
                    var emailwrapinner = document.createElement('div');
                        emailwrapinner.className = 'categoryName col-12 pl-0';
                            var textnodeemail = document.createTextNode(data.result[i]['email']);
                        emailwrapinner.appendChild(textnodeemail);
                namewrap.appendChild(namewrapinner);
                namewrap.appendChild(emailwrapinner);
            row.appendChild(imagewrap);
            row.appendChild(namewrap);
        div.appendChild(row);
    document.getElementById("wrapper").appendChild(div);
    }
});