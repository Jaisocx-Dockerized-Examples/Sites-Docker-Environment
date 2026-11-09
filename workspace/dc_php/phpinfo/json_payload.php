<?php
//ini_set('display_errors', 1);
//ini_set('display_startup_errors', 1);
//error_reporting(E_ALL);
//ini_set('error_reporting', E_ALL);
ini_set( 'default_charset', 'UTF-8' );
header('Content-Type: application/json; charset=UTF-8');

header("Set-Cookie: admin=ri5h5bfaqjrneutva929pn1nh6; expires=Mon, 25-Mar-2024 11:25:59 GMT; path=/; domain=dev.jaisocx.com", false);
header("Set-Cookie: form_field=123; expires=Mon, 25-Mar-2024 11:25:59 GMT; Max-Age=31536000; path=/; domain=localhost; SameSite=Lax", false);
header("Set-Cookie: another_cookie=456; expires=Mon, 25-Mar-2024 11:25:59 GMT; Max-Age=31536000; path=/; domain=localhost; SameSite=Lax", false);


$json = [];

$json['GLOBALS'] = $GLOBALS;

$jsonPayload = file_get_contents("php://input");
$json['payload_raw'] = $jsonPayload;

$decodedPayload = json_decode($jsonPayload, true);
$json['json_decode_err_msg'] = json_last_error_msg();

$json['payload_pretty'] = $decodedPayload;

$json['headers'] = getallheaders();

echo json_encode($json, JSON_PRETTY_PRINT);

exit;
