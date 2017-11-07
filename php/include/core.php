<?php
    $db = new PDO("mysql:dbname=".$_POST['db_name'].";host=127.0.0.1", "test_account", "q1w2e3r4");
    $db->exec("SET NAMES utf8");
?>
