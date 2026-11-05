<?php

require_once "./Db.php";

$db = new Db();

?>


<!-- DOMAIN -->
<?php
echo $db->getConfigSpecMarkup_Domain();
?>







<!-- JWT -->
<?php
echo $db->getConfigSpecMarkup_Jwt();
?>








<!-- ALIAS -->
<?php
echo $db->getConfigSpecMarkup_Alias();