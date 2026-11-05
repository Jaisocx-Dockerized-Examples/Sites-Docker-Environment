<?php

$request = json_decode(file_get_contents("php://input"), true);

//echo file_get_contents("php://input");
//die();

$msg = "<p>Email: " . $request['email'] . "</p>";
$msg .= "<p>Company: " . $request['company'] . "</p>";
$msg .= "<p>Name: " . $request['name'] . "</p>";
$msg .= "<p>" . $request['message'] . "</p>";

/*
header("Content-Type: application/json");
echo json_encode($request);
die();
*/

$header  = "MIME-Version: 1.0\r\n";
$header .= "Content-type: text/html; charset: utf8\r\n";

putenv("MSMTP_CONFIG=/etc/msmtp/.msmtprc");
$result = mail("info@jaisocx.com", "JAISOCX MAIL", $msg, $header);

echo json_encode(['success' => $result]);
die();
