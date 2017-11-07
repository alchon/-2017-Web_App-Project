<?php
    include '../../include/core.php';
    $result = array();
    $rows = $db->query('SELECT ID FROM ')
    foreach($rows as $row) {
        $tmp = array();
        foreach($row as $k => $v) {
            if(is_numeric($k))
                continue;
            array_push($tmp, $k . ": " . $v);
        }
        array_push($result, join($tmp, ", "));
    }
?>
<div>
    <? var_dump($restaruants); ?>
</div>