<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    $msg = 'Добавлен';

    $factoryLink = '/factory.html';
    $factoryName = 'АЛЬТЕРНАТИВА СВД';
    $factoryAddress = 'Ярославль, Россия, 1-й Промышленный проезд, 14';
    $factorySite = 'http://xn-----7kcabgbgn6aq0cejla2afiuf2q.xn--p1ai/';
    $factoryContacts = array(
    	"example@mail.ru", "+79511050600", "+79301600301"
	);


    $result['msg'] = $msg;
    $result['factoryName'] = $factoryName;
    $result['factoryLink'] = $factoryLink;
    $result['factorySite'] = $factorySite;
    $result['factoryAddress'] = $factoryAddress;
    $result['factoryContacts'] = $factoryContacts;


   echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>