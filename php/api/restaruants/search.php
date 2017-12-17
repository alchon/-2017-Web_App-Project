<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();
    $rows = $db->query('SELECT * FROM store WHERE name LIKE "%'.$_POST['query'].'%" OR branch LIKE "%'. $_POST['query'] . '%" OR sub_branch LIKE "%'. $_POST['query'] . '%"');
    header('Content-Type: application/json');

    foreach($rows as $row) {
        $result[] = $row['ID'];
    }
?>
<? echo json_encode($result) ?>
