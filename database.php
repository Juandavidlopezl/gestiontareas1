<?php

$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'to_do_list';

$conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);

?>
