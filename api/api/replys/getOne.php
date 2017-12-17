<?php
    include __DIR__ . '/../../include/core.php';
    $row = $db->query('SELECT * FROM reply WHERE id='.$args['id'].' AND store_id='.$args['store_id'])->fetchAll()[0];

    // header('Content-Type: application/json');
    
    print_r($args);
    $result = array(
        'id' => $row['id'],
        'username' => $row['username'], 
        'reply' => $row['reply'],
        'created' => $row['created'],
        'store_id' => $row['store_id']
    );
    
    echo json_encode($result);
?>
