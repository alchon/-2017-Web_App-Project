<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();

    header('Content-Type: application/json');
    
    $password = hash('sha256', $_POST['password']);

    $query = $db->query("SELECT password FROM reply WHERE id=".$_POST['id'])->fetchAll()[0];
    if($query['password'] != $password) {
        echo json_encode(array(
            'success' => false,
            'error' => 'Invalid Password'
        ));
        die();
    }
    $query = "DELETE FROM reply WHERE id=".$_POST['id'];
    $db->prepare($query);
    $db->execute();
    
    echo json_encode(array(
        'success' => true
    ));
?>
