$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function close_hamburger_menu(){
      overlay.hide();
      trigger.removeClass('is-open');
      trigger.addClass('is-closed');
      trigger.addClass('glyphicon-menu-hamburger');
      trigger.removeClass('glyphicon-remove');
      isClosed = false;
    }

    function hamburger_cross() {
      $('#wrapper').toggleClass('toggled');

      if (isClosed) {          
        close_hamburger_menu();
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        trigger.removeClass('glyphicon-menu-hamburger');
        trigger.addClass('glyphicon-remove');
        isClosed = true;
      }
  }

  $("#page-content-wrapper").click(function(){
      if(isClosed){
        $('#wrapper').toggleClass('toggled');
        close_hamburger_menu();
      }
  });
});