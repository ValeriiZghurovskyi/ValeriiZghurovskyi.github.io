<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $content = file_get_contents('php://input');
    $decodedData = json_decode($content, true);

    if (!is_null($decodedData)) {

        $currentData = json_decode(file_get_contents('menuData.json'), true);
        if (!is_array($currentData)) {
            $currentData = [];
        }

        array_push($currentData, $decodedData);

        file_put_contents('menuData.json', json_encode($currentData));

        echo "Дані меню збережено успішно";
    } else {
        echo "Помилка у декодуванні даних";
    }
} else {
    echo "Недопустимий тип запиту";
}
?>
