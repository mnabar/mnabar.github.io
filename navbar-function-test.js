$(document).ready(function () {
  var trigger = $('.hamburger-button'),
     menuOpen = false;

    trigger.click(function () {
      hamburger_menu_toggle();      
    });

    function close_hamburger_menu(){
      trigger.removeClass('glyphicon-remove');
      trigger.addClass('glyphicon-menu-hamburger');
      menuOpen = false;
    }

    function hamburger_menu_toggle() {
      if (menuOpen) {          
        close_hamburger_menu();
      } else {   
        trigger.removeClass('glyphicon-menu-hamburger');
        trigger.addClass('glyphicon-remove');
        menuOpen = true;
      }
  }
  
  $("#content-wrapper").click(function() {
    if(menuOpen){
      close_hamburger_menu();
      // alert("clicked");
    }
    // alert("clicked in the wrapper");
  });
  // $('[data-toggle="offcanvas"]').click(function () {
  //       $('#wrapper').toggleClass('toggled');
  // });  
});