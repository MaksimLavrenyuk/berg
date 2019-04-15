<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    $msg = 'Добавлен';
    $tonnageID = '1';
    $tonnageName = '10';
    $tonnageLink = '/tonnage.html';

    $result['msg'] = $msg;
    $result['tonnageID'] = $tonnageID;
    $result['tonnageName'] = $tonnageName;
    $result['tonnageLink'] = $tonnageLink;

   echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>