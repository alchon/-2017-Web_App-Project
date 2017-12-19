<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();

    header('Content-Type: application/json');
    
    $req = array();
    
    $password = json_decode(file_get_contents("php://input"))['password'];
    $password = hash('sha256', $password);

    echo $password;

    $query = $db->query("SELECT password FROM reply WHERE id=".$args['id'])->fetchAll()[0];
    if($query['password'] != $password) {
        echo json_encode(array(
            'success' => false,
            'error' => 'Invalid Password'
        ));
        die();
    }
    $query = "DELETE FROM reply WHERE id=".$args['id'];
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    echo json_encode(array(
        'success' => true
    ));
?>
