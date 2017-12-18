<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();

    header('Content-Type: application/json');
    
    $req = array();
    preg_match("/password=.+/",file_get_contents("php://input"),$req);
    $password = hash('sha256', str_replace('&', '', $req[0]));

    $query = $db->query("SELECT password FROM reply WHERE id=".$args['id'])->fetchAll()[0];
    echo $password + '\n';
    echo $query['password'] + '\n';
    if($query['password'] != $password) {
        echo json_encode(array(
            'success' => false,
            'error' => 'Invalid Password'
        ));
        die();
    }
    $query = "DELETE FROM reply WHERE id=".$args['id'];
    $db->prepare($query);
    $db->execute();
    
    echo json_encode(array(
        'success' => true
    ));
?>
