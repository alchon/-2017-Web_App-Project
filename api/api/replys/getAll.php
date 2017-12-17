<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();
    $rows = $db->query('SELECT * FROM reply WHERE store_id='.$args['store_id']);

    header('Content-Type: application/json');
    
    foreach($rows as $row) {
        $pushRow = array(
            'id' => $row['id'],
            'username' => $row['username'], 
            'reply' => $row['reply'],
            'created' => $row['created'],
            'store_id' => $row['store_id']
        );
        array_push($result, $pushRow);
    }
    echo json_encode($result);
?>
