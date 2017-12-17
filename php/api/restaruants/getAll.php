<?php
    include __DIR__ . '/../../include/core.php';
    $result = array();
    $rows = $db->query('SELECT * FROM store NATURAL JOIN store_html');

    header('Content-Type: application/json');
    
    foreach($rows as $row) {
        $pushRow = array(
            'ID' => $row['ID'], 
            'name' => $row['name'], 
            'address_1' => $row['address_1'], 
            'address_2' => $row['address_2'], 
            'tel' => $row['tel'], 
            'branch' => $row['branch'], 
            'sub_branch' => $row['sub_branch'], 
            'lat' => $row['lat'], 
            'lng' => $row['lng'], 
            'x' => $row['x'], 
            'y' => $row['y'],
            'is_rotated' => false
        );
        if($row['rotate_x'] != null) {
            $pushRow['is_rotated'] = true;
            $pushRow['rx'] = $row['rotate_x'];
            $pushRow['ry'] = $row['rotate_y'];
        }
        array_push($result, $pushRow);
    }
    echo json_encode($result);
?>
