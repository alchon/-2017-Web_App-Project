<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();

    header('Content-Type: application/json');
    
    $store_id = intval($_POST['store_id']);
    $username = $_POST['username'];
    $password = $_POST['password'];
    $password = hash('sha256', $password);
    $contents = $_POST['contents'];
    $created = time();

    $query = "INSERT INTO reply(store_id, username, password, reply, created) VALUES(:store_id, :username, :password, :reply, :created)";
        
    $stmt = $db->prepare($query);
    $stmt->bindValue(':store_id', $store_id);
    $stmt->bindValue(':username', $username);
    $stmt->bindValue(':password', $_password);
    $stmt->bindValue(':reply', $contents);
    $stmt->bindValue(':created', $created);

    $stmt->debugDumpParams();
    
    $result = array(
        'success' => $stmt->execute()
    );
    $stmt->closeCursor();
    
    if(!$result['success']) {
        $result['err_code'] = $stmt->errorCode();
        $result['err_info'] = $stmt->errorInfo();
    }
    echo json_encode($result);
?>
