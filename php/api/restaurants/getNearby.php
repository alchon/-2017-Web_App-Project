<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();
    $lat = $_GET['lat'];
    $lng = $_GET['lng'];
    
    $sql = 'SELECT * FROM store WHERE SQRT(POWER(ABS(lat - '.$lat.'), 2) + POWER(ABS(lng - '.$lng.'), 2)) <= 0.0008;';
    $rows = $db->query($sql);

    foreach($rows as $row) {
        array_push($result, $row['ID']);
    }
?>
<div>
    <? echo json_encode($result) ?>
</div>