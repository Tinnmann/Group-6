var socket = io.connect('192.168.0.63:4000');
var logout = document.getElementById('logout'),
    save = document.getElementById('save'),
    email = document.getElementById('email'),
    profileCell =  document.getElementById('profileCell'),
    profileSurname = document.getElementById('profileSurname'),
    profileName = document.getElementById('profileName');
window.onload = profileLoader();

function profileLoader(){
    socket.emit('profileLoad',{
        id : 1,
    });
}
logout.addEventListener('click',function(){
   window.location = 'index.html';
});
save.addEventListener('click',function(){
    
    socket.emit('profileUpdate',{
        id : 1,
        email : email.value,
        profileCell : profileCell.value,
        profileSurname : profileSurname.value,
        profileName : profileName.value,
    });
    
    //Inserts success feedback message
    document.getElementById("savemessage").innerHTML = "
        <div class="alert alert-success alert-dismissible fade show">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <strong>Changes Saved</strong>
        </div>";
});

socket.on('profilePopulate',function (data) {
    profileName.value = data.result[0]['client_name'];
    profileSurname.value = data.result[0]['surname'];
    profileCell.value = data.result[0]['address'];
    email.value = data.result[0]['email'];
});


<div class="alert alert-success alert-dismissible">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Success!</strong> Indicates a successful or positive action.
</div>