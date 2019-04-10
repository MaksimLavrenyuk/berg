<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    //$msg = 'Добавлен';
    $msg = 'Удален';
    $productGroupName = '3БФ24';
    $productGroupID = 5;


    $result['msg'] = $msg;
    $result['productGroupName'] = $productGroupName;
    $result['productGroupID'] = $productGroupID;

   echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>