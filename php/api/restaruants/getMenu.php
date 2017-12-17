<?php
    include __DIR__ . '/../../include/core.php';
    $result = array(
        'store' => array(),
        'menus' => array()
    );
    $row = $db->query('SELECT * FROM store WHERE ID='.$args['id'])->fetchAll()[0];
    $menus = $db->query('SELECT * FROM menu WHERE ID='.$args['id']);
    header('Content-Type: application/json');
    
    foreach($row as $k => $v) {
        if(!is_numeric($k))
            $result['store'][$k] = $v;
    }
    foreach($menus as $menu) {
        $pushMenu = array(
            'name' => $menu['name'],
            'price' => $menu['price'],
            'note' => $menu['note']
        );
        array_push($result['menus'], $pushMenu);
    }
?>
<? echo json_encode($result) ?>
 