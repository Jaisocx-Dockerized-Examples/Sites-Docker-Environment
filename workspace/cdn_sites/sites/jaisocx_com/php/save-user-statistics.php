<?php
$type = (int)$_GET['type'];
$clientIp = $_SERVER['REMOTE_ADDR'];

try {
    $dbconn = pg_connect(
    "host=localhost port=6793 dbname=jaisocx-com-website user=livesitedbadmin password=YyddwYa7DdurDjehT3fPhyEsDxxvkgCbx9x"
    );
} catch (Exception $ex) {
    echo $ex->getMessage();
}

// Check if the connection is successful
if (!$dbconn) {
    die("Error: Could not connect to the database.\n");
}

$datetime = new DateTime('now');
$datetime_str = $datetime->format('Y-m-d\TH:i:s');
$month = (int)$datetime->format('m');
$year = (int)$datetime->format('Y');

// Prepare an SQL statement to insert the data into the user_statistics table
$sql = "INSERT INTO users_statistics (ip, datetime, type, month, year) VALUES ($1, $2, $3, $4, $5)";

// Execute the SQL statement with the values as parameters
$result = pg_query_params($dbconn, $sql, array($clientIp, $datetime_str, $type, $month, $year));

// Check if the query was successful
if ($result) {
    echo "Data inserted successfully.\n";
} else {
    echo "Error: Could not execute the query.\n";
}

// Close the connection to the database
pg_close($dbconn);
die();
