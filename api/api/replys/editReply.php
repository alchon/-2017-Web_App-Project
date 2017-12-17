<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();

    header('Content-Type: application/json');
    
    $username = $_POST['username'];
    $password = hash('sha256', $_POST['password']);
    $contents = $_POST['contents'];
    $created = $_POST['created'];

    $query = $db->query('SELECT password FROM reply WHERE id='.$_POST['id'])->fetchAll()[0];
    if($query['password'] != $password) {
        echo json_encode(array(
            'success' => false,
            'error' => 'Invalid Password'
        ));
        die();
    }
    $query = "UPDATE reply SET reply='".$contents."' WHERE id=".$_POST['id'];
    $db->prepare($query);
    $db->execute();
    
    echo json_encode(array(
        'success' => true
    ));
?>
