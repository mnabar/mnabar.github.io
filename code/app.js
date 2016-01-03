
$(document).ready(function () {
	var $contactForm = $('#contact-form');
	var $sending = '<div class="alert alert-info" role="alert"> Sending message...</div>';
	
	var $sent = '<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Message sent.</div>';
	
	var $error = '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Uh oh! </strong>  Something went wrong.  Try submitting the form again, or shoot us an email at <a href="mailto:captains@chicagoraas.com?" target="_top">captains@chicagoraas.com</a>.</div>';

	$contactForm.submit(function(e) {
		e.preventDefault();
		$.ajax({
			url: '//formspree.io/captains@chicagoraas.com',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function() {
				if($('.alert').length > 0){
					$contactForm.find('.alert').replaceWith($sending);
				} else {
					$contactForm.prepend($sending);
				}
			},
			success: function(data) {
				
				if($('.alert').length > 0){
					$contactForm.find('.alert').replaceWith($sent);
				} else {
					$contactForm.prepend($sent);
				}

				clearForm();
			},
			error: function(err) {
				if($('.alert').length > 0){
					$contactForm.find('.alert').replaceWith($error);
				} else {
					$contactForm.prepend($error);
				}
			}
		});
	});

	function clearForm(){
		$('.form-control').val('');
	}

});