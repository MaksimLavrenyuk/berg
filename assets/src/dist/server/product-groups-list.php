<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    $msg = 'Добавлен';

$productGroupList = array(
    "Товарная группа №1", "Товарная группа №2", "Товарная группа №3", "Товарная группа №4", "Товарная группа №5"
);

    $result['msg'] = $msg;
    $result['productGroupList'] = $productGroupList;

   echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>