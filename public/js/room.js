var width;
function openNav() {

  document.getElementById("mySidebar").style.width = "250px";
  $('.openbtn').css('visibility', 'hidden');
  setTimeout(function() {
  $('.main').css('margin-left', '250px');

  }, 350);

}

function closeNav() {

  document.getElementById("mySidebar").style.width = "0";
  $('.main').css('margin-left', '0');

  setTimeout(function() {
    $('.openbtn').css('visibility', 'visible');

  }, 350);

}
// Chat open and close chat with our style
function openChat() {
  document.getElementById("chatPanel").style.width = "400px";
  $('.close-chat').css('visibility', 'visible');
  setTimeout(function() {
  $('.main').css('margin-right', '250px');

  }, 350);

}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeChat() {
  document.getElementById("chatPanel").style.width = "0";
  $('.main__videos').css('margin-right', '0');
    $('.close-chat').css('visibility', 'hidden');
    $('.main').css('margin-right', '0');

}

const ProfilePop = () => {
  $("#exampleModal").modal("show");
};
const MemberPop = () => {
  $("#sidebarmembers").modal("show");
};
