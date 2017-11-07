<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();
    $row = $db->query('SELECT * FROM store WHERE ID='.$args['id'])->fetchAll()[0];
    foreach($row as $k => $v) {
        if(!is_numeric($k))
            $result[$k] = $v;
    }
    
?>
<div>
    <? echo json_encode($result) ?>
</div>