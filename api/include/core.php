<?php
    $dbname = 'WebProject';
    $host = '127.0.0.1';
    $username = 'test_account';
    $password = 'q1w2e3r4';
    $db = new PDO("mysql:dbname=".$dbname.";host=".$host, $username, $password);
    $db->exec("SET NAMES utf8");
?>
