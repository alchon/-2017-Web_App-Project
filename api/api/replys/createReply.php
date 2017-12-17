<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();

    header('Content-Type: application/json');
    
    $username = $_POST['username'];
    $password = hash('sha256', $_POST['password']);
    $contents = $_POST['contents'];
    $created = time();

    $query = "INSERT INTO reply(store_id, username, password, reply, created) VALUES(".$_POST['store_id']."'".$username."', '".$password."', '".$contents."', '".$created."')";
    $db->prepare($query);
    $db->execute();
    
    echo json_encode(array(
        'success' => true
    ));
?>
