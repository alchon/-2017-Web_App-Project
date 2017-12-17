<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();
    $rows = $db->query('SELECT * FROM store WHERE name LIKE "%'.$_POST['query'].'%" OR branch LIKE "%'. $_POST['query'] . '%" OR sub_branch LIKE "%'. $_POST['query'] . '%"');
    header('Content-Type: application/json');

    foreach($rows as $row) {
        $result[] = array('ID' => $row['ID'], 'name' => $row['name'], 'address' => $row['address_1']);
    }
?>
<? echo json_encode($result) ?>
