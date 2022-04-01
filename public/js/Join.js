var activeChatId = 0;

function joinRoom() {

  $("#joinSection").css("display","block");
  $("#buttonSection").css("display","none");
}
function createRoom() {

  $("#createSection").css("display","block");
  $("#buttonSection").css("display","none");


}
function backBtn() {
  $("#buttonSection").css("display","block");
  $("#joinSection").css("display","none");
  $("#createSection").css("display","none");
  $("#MainSection").css("display","block");

}
function createDemo() {
  location.replace("http://www.w3schools.com");
}

document.addEventListener("keypress", function(event) {
  if (event.key === "Enter")
    sendMessage();
});


function sendMessage() {

  if ($('#message-input').val() != "") {
    $('#' + activeChatId).append($('<li >').text($('#message-input').val()));
    $('#message-input').val('');
  }
}



function openChat(id) {

  $("#"+activeChatId).css("display", "none");
  var element = $('#'+id);
  activeChatId = id;
  if (element.length > 0) {
    // anchor was found containing "Item2.0" texta
    $(".MainSectionButton").css("display", "none");
    $(".MainChatSection").css("display", "block");
    $("#"+id).css("display", "block");

  } else {
    // anchor was not found containing "Item2.0" text
    var ul = document.createElement('ul');
    ul.id = id;
    ul.className = "messages";
    document.getElementById('chathistory').appendChild(ul);
    $(".MainSectionButton").css("display", "none");
    $(".MainChatSection").css("display", "block");
    $("#"+id).css("display", "block");
    alert("Created id" + ul.id);
  }


}

function backButton(){
  $(".MainChatSection").css("display","none");
  $(".MainSectionButton").css("display","block");
}
