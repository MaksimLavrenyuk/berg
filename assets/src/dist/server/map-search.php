<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    $CityName = 'Москва';
    $priceKm = 10;
    $status = 'ok';
    $msg = 'Ничего найдено';

$factoryList = array(
 array(
   "factoryName" => "АЛЬТЕРНАТИВА СВД",
   "factoryСoordinates" => "57.661351, 39.817618",
   "factoryAddress" => "Ярославль, Россия, 1-й Промышленный проезд, 14",
   "factorySite" => "http://alternativa-svd.ru/",
   "factoryContacts" => array('mail@mail.com', '+79511040300', '+79511050301'),
   "productStockName" =>  array('Товарная группа №1', 'Товарная группа №2', 'Товарная группа №3')
 ),
 array(
   "factoryName" => "Пожарное оборудование НН",
   "factoryСoordinates" => "56.296983, 43.954738",
   "factoryAddress" => "Нижний Новгород, Воротынская ул., 2, офис 108, этаж 2",
   "factorySite" => "http://po112nn.ru/",
   "factoryContacts" => array('example@mail.ru', '89511050600', '+79301600301'),
   "productStockName" => array('Товарная группа №4', 'Товарная группа №5', 'Товарная группа №6')
 ),
 array(
   "factoryName" => "Металлоторг",
   "factoryСoordinates" => "54.228863, 45.220557",
   "factoryAddress" => "Россия, Республика Мордовия, Саранск, Александровское шоссе, 39, ",
   "factorySite" => "http://www.metallotorg.ru/",
   "factoryContacts" => array('+7 (917) 999-13-16'),
   "productStockName" => array('Товарная группа №7', 'Товарная группа №8', 'Товарная группа №9')
 ),
 array(
   "factoryName" => "Рязанский завод ЖБИ-6",
   "factoryСoordinates" => "54.606095, 39.696844",
   "factoryAddress" => "Россия, Рязань, улица Ленинского Комсомола, 149",
   "factorySite" => "http://www.rzgbi-6.ru/",
   "factoryContacts" => array(''),
   "productStockName" => array('Товарная группа №10', 'Товарная группа №11', 'Товарная группа №12')
 )
);

    $result['CityName'] = $CityName;
    $result['factoryList'] = $factoryList;
    $result['priceKm'] = $priceKm;
    $result['status'] = $status;
    $result['msg'] = $msg;

   echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>