<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();
    $rows = $db->query('SELECT ID FROM store');

    foreach($rows as $row) {
        array_push($result, $row['ID']);
    }
?>
<? echo json_encode($result) ?>
