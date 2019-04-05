<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    $filename = 'moscowRegionCoords.txt';
    $data = file_get_contents($filename);
    $bookshelf = json_decode($data, TRUE); // Если нет TRUE то получает объект, а не массив.

    $tonnage = array(
      array(
        "tonnageName" => "20т",
        "tonnagePrice100km" => "50",
        "tonnagePrice500km" => "25",
        "tonnagePrice1000km" => "10"
      ),
      array(
        "tonnageName" => "10т",
        "tonnagePrice100km" => "25",
        "tonnagePrice500km" => "12.5",
        "tonnagePrice1000km" => "7.5"
      ),
      array(
        "tonnageName" => "5т",
        "tonnagePrice100km" => "10",
        "tonnagePrice500km" => "5",
        "tonnagePrice1000km" => "2"
      )
    );
    $status = 'ok';
    $msg = 'Ничего найдено';

    $result['CityName'] = $CityName;
    $result['tonnage'] = $tonnage;
    $result['status'] = $status;
    $result['msg'] = $msg;
    $result['bookshelf'] = $bookshelf;

   echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>