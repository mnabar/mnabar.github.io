<!-- Code to submit form and send through email (note: mostly copied) -->
<!-- Adapted from http://www.sanwebe.com/2014/04/ajax-contact-form-attachment-jquery-php -->
<?php
    include 'ChromePhp.php';
    ChromePhp::log('Hello console!');


if ($_POST)
{
    $to_email       = "sayrisays@gmail.com"; // Recipient email, Replace with own email here
	$from_email 	= "email@gmail.com"; // From email address (eg: no-reply@YOUR-DOMAIN.com)
	
    //check if its an ajax request, exit if not
    if (!isset($_SERVER['HTTP_X_REQUESTED_WITH']) AND strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {
        $output = json_encode(array( //create JSON data
            'type'=>'error',
            'text' => 'Sorry Request must be Ajax POST'
        ));
        die($output); //exit script outputting json data
    }
   
    //Sanitize input data using PHP filter_var().
    $name      = filter_var($_POST["fname"], FILTER_SANITIZE_STRING);
    $email     = filter_var($_POST["femail"], FILTER_SANITIZE_EMAIL);
    $subject   = filter_var($_POST["fsubject"], FILTER_SANITIZE_STRING);
    $message   = filter_var($_POST["fmessage"], FILTER_SANITIZE_STRING);

    // $name      = filter_var($_POST["name"], FILTER_SANITIZE_STRING);
    // $email     = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    // $subject   = filter_var($_POST["subject"], FILTER_SANITIZE_STRING);
    // $message   = filter_var($_POST["message"], FILTER_SANITIZE_STRING);
   
    //additional php validation
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)){ //email validation
        $output = json_encode(array('type'=>'error', 'text' => 'Please enter a valid email.'));
        die($output);
    }
    if (strlen($subject)<3){ //check empty subject
        $output = json_encode(array('type'=>'error', 'text' => 'Please enter a subject.'));
        die($output);
    }
    if (strlen($message)<3){ //check emtpy message
        $output = json_encode(array('type'=>'error', 'text' => 'Please enter a message.'));
        die($output);
    }
   
    //email body
    $message_body = $message."\n\n".$name."\nEmail : ".$email;

	### Attachment Preparation ###
	$file_attached = true;
	if ($file_attached) //continue if we have the file
	{
		$boundary = md5("sanwebe"); 
		
		//header
		$headers = "MIME-Version: 1.0\r\n"; 
		$headers .= "From:".$from_email."\r\n"; 
		$headers .= "Reply-To: ".$email."" . "\r\n";
		$headers .= "Content-Type: multipart/mixed; boundary = $boundary\r\n\r\n"; 

		//plain text 
		$body = "--$boundary\r\n";
		$body .= "Content-Type: text/plain; charset=ISO-8859-1\r\n";
		$body .= "Content-Transfer-Encoding: base64\r\n\r\n"; 
		$body .= chunk_split(base64_encode($message_body)); 
	
	} else {
		//proceed with PHP email.
		$headers = "From:".$from_email."\r\n".
		'Reply-To: '.$email.'' . "\n" .
		'X-Mailer: PHP/' . phpversion();
		$body = $message_body;
	}

	$send_mail = mail($to_email, $subject, $body, $headers);
   

    if(!$send_mail)
    {
        //If mail couldn't be sent output error. Check your PHP email configuration (if it ever happens)
        $output = json_encode(array('type'=>'error', 'text' => 'Could not send message! Please check your PHP mail configuration.'));
        die($output);
    } else {
        $output = json_encode(array('type'=>'message', 'text' => 'Sent! Thank you for contacting us.'.$body));
        die($output);
    }
}
?>