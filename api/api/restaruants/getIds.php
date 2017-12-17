<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();
    $rows = $db->query('SELECT * FROM store');
    header('Content-Type: application/json');

    foreach($rows as $row) {
        $result[] = $row['ID'];
        // array('ID' => $row['ID'], 'name' => $row['name'], 'address' => $row['address_1']);
    }
    echo json_encode($result);
?>
