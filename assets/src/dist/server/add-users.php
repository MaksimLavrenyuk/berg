<?php
    header("Content-Type: text/html; charset=utf-8");
    mb_internal_encoding('UTF-8');

    //$msg = 'Добавлен';
    $msg = 'Удален';
    $userName = 'Иван';
    $userSecondName = 'Иванов';
    $usersEmail = 'example@example.com';
    $usersPassword = '123456';
    $UserID = '1';

    $result['msg'] = $msg;
    $result['userName'] = $userName;
    $result['userSecondName'] = $userSecondName;
    $result['usersEmail'] = $usersEmail;
    $result['usersPassword'] = $usersPassword;
    $result['UserID'] = $UserID;

   echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>