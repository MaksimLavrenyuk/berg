<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    $filename = 'moscowRegionCoords.txt';
    $data = file_get_contents($filename);
    $bookshelf = json_decode($data, TRUE); // Если нет TRUE то получает объект, а не массив.

    $tonnage = array(
        array(
            "tonnageName" => "20",
            "tonnageTariff" => array(
                "50" => "119",
                "300" => "126",
                "400" => "130",
                "500" => "100",
                "700" => "90"
                )
        ),
        array(
            "tonnageName" => "10",
            "tonnageTariff" => array(
                "50" => "119",
                "300" => "126",
                "400" => "130",
                "500" => "100",
                "700" => "90"
            )
        ),
       array(
            "tonnageName" => "5",
            "tonnageTariff" => array(
                "50" => "119",
                "300" => "126",
                "400" => "130",
                "500" => "100",
                "700" => "90"
            )
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