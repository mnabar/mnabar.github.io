// Dynamic styling for navigation bar

function validate() {
	if ($('#name').val().length > 0 && 
		$('#subject').val().length > 0 && 
		$('#email').val().length > 0 && 
		$('#message').val().length > 0) {

		$('input[type=submit]').prop("disabled", false);
	} else {
		$('input[type=submit]').prop("disabled", true);
	}
}

// Submit form
// Adapted from http://www.sanwebe.com/2014/04/ajax-contact-form-attachment-jquery-php
$(document).ready(function() {
	validate();
	$('#name, #subject, #email, #message').change(validate);

    $("#send").click(function() {
    	console.log("clicked the send button");
	    var proceed = true;
        //simple validation at client's end
        //loop through each field and we simply change border color to red for invalid fields		
		$("#submission input[required], #submission textarea[required]").each(function(){
			$(this).css('border-color',''); 
			if(!$.trim($(this).val())){ //if this field is empty 
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag
			}
			//check invalid email
			var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
			if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
				$(this).css('border-color','red'); //change border color to red   
				proceed = false; //set do not proceed flag				
			}	
		});
       
        if(proceed) //everything looks good! proceed...
        {
        	console.log("checked the form");
           //data to be sent to server         
            var m_data = new FormData();    
            m_data.append( 'name', $('input[name=name]').val());
            m_data.append( 'email', $('input[name=email]').val());
            m_data.append( 'subject', $('input[name=subject]').val());
			m_data.append( 'message', $('textarea[name=message]').val());

			var name = $('input[name=name]').val();
			var email = $('input[name=email]').val();
			var subject = $('input[name=subject]').val();
			var message = $('textarea[name=message]').val();
			 
			console.log(name +"\n"+ email +"\n"+ subject +"\n"+ message);

			console.log(m_data);
            //instead of $.post() we are using $.ajax()
            //that's because $.ajax() has more options and flexibility
  			$.ajax({
              url: 'submission.php',
              type: 'POST',
              data:{
              	fname: name,
              	femail: email,
              	fsubject: subject,
              	fmessage: message
              },
              success: function(response){
                 alert(response);
              }
            });

    //         $.ajax({
    //           url: 'submission.php',
    //           data: m_data,
    //           processData: false,
    //           contentType: false,
    //           type: 'POST',
    //           dataType:'json',
    //           success: function(response){
    //              //load json data from server and output message     
 			// 	if (response.type == 'error') { //load json data from server and output message     
				// 	// output = '<div class="error">'+response.text+'</div>';
				// 	console.log(response.text);
				// } else {
				//     // output = '<div class="success">'+response.text+'</div>';
				//     console.log(response.text);
				// }
    //           }
    //         });

            console.log("php should have been called???");

        	$(function() {
				$("#dialog-success").dialog({
					minWidth:600,
					minHeight:300,
					maxWidth:800,
					maxHeight:300,
					modal:true,
					dialogClass: "no-close",
					buttons: [{
					    text: "OK",
					    click: function() {
					    	$( this ).dialog( "close" );
					    }
					}]
				});
			});
        }
    });
});
