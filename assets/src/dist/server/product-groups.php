<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    $msg = 'Добавлен';
    $productGroupName = '3БФ24';


    $result['msg'] = $msg;
    $result['productGroupName'] = $productGroupName;

   echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>