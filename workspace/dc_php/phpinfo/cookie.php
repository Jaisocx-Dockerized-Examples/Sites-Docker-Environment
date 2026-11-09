<?php

header('Content-Type: application/json');

/** Setting cookies here 
 * Domain: cached-listing.jaisocx.com
*/
header("Set-Cookie: admin=ri5h5bfaqjrneutva929pn1nh6; expires=Wed, 31-Dec-2025 11:25:59 GMT; path=/; domain=cached-listing.jaisocx.com", false);
header("Set-Cookie: form_field=123; expires=Wed, 31-Dec-2025 11:25:59 GMT; Max-Age=31536000; path=/; domain=cached-listing.jaisocx.com; SameSite=Lax", false);
header("Set-Cookie: another_cookie=456; expires=Wed, 31-Dec-2025 11:25:59 GMT; Max-Age=31536000; path=/; domain=cached-listing.jaisocx.com; SameSite=Lax", false);

$outputArray = [
    'message' => 'Hello World!',
];

echo json_encode($outputArray, JSON_PRETTY_PRINT);

exit;
