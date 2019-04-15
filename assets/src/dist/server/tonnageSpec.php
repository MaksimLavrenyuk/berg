<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    $msg = 'Добавлен';
    //$msg = 'Удален';
    $tonnageSpecID = '1';
    $tonnageSpecKm = '10';
    $tonnageSpecPrice = '100';

    $result['msg'] = $msg;
    $result['tonnageSpecID'] = $tonnageSpecID;
    $result['tonnageSpecKm'] = $tonnageSpecKm;
    $result['tonnageSpecPrice'] = $tonnageSpecPrice;

   echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>