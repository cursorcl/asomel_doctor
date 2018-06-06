<?php

$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["phone"];
$message = $_POST["message"];
$msg = "<html><body>De:".$name. "<br>Fono:".$phone."<br><br>".wordwrap($message, 70)."</body></html>";
$headers = "From: " . $name . " < " . $email . " >\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=iso-8859-1\r\n";

// send email
mail("contacto@asomel.cl","[".$name."] Contacto",$msg, $headers);
