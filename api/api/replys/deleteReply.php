<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();

    header('Content-Type: application/json');
    
    $req = array();
    preg_match('/password=.+&?/', file_get_contents("php://input"), $req);
    $password = str_replace('&', '', str_replace('password=', '', $req[0]));
    $password = hash('sha256', $password);

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
