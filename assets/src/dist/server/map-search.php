<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    $CityName = 'Москва';
    $priceKm = 10;
    $status = 'error';
    $msg = 'Ничего найдено';

$factoryList = array(
 array(
   "factoryName" => "Завод №1",
   "factoryСoordinates" => "56.817224, 38.371901",
   "productStockName" =>  array('Товарная группа №1', 'Товарная группа №2', 'Товарная группа №3')
 ),
 array(
   "factoryName" => "Завод №2",
   "factoryСoordinates" => "55.817224, 38.371901",
   "productStockName" => array('Товарная группа №4', 'Товарная группа №5', 'Товарная группа №6')
 ),
 array(
   "factoryName" => "Завод №3",
   "factoryСoordinates" => "54.817224, 38.371901",
   "productStockName" => array('Товарная группа №7', 'Товарная группа №8', 'Товарная группа №9')
 )
);

    $result['CityName'] = $CityName;
    $result['factoryList'] = $factoryList;
    $result['priceKm'] = $priceKm;
    $result['status'] = $status;
    $result['msg'] = $msg;

   echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>