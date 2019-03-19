<?php

	header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

	$CityName = 'Москва';
	
	$result['CityName'] = $CityName;

    echo json_encode($result, JSON_UNESCAPED_UNICODE);

?>