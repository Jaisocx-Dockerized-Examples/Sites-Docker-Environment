<?php

header("Content-Type: application/json; charset=UTF-8");

$arr = [
    'Greeting' => 'Hello World!',
];

echo json_encode($arr, JSON_PRETTY_PRINT);

exit;
