<?php

// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular
include_once(dirname(__FILE__) . '/../global.php');
include_once(dirname(__FILE__) . '/horas_disponibles.php');

$fecha = date("Y-m-d");
if (isset($_GET["fecha"])) {
    $fecha = utf8_encode($_GET["fecha"]);
}


$id_doctor = 1;
if (isset($_GET["id_doctor"])) {
    $id_doctor = utf8_encode($_GET["id_doctor"]);
}

$hora = date("H:i:s");
if (isset($_GET["hora"])) {
    $hora = utf8_encode($_GET["hora"]);
}

$id_sede = 1;
if (isset($_GET["id_sede"])) {
    $id_sede = utf8_encode($_GET["id_sede"]);
}

$date = DateTime::createFromFormat("d/m/Y H:i:s", $fecha . " " . $hora);
$rawdata = getAllHours($date, $id_doctor, $id_sede);
$result = array();
for ($n = 0; $n < sizeof($rawdata); $n++) {
    $all = DateTime::createFromFormat("Y-m-d H:i:s", $rawdata[$n]);
    $time = $all->format("H:i:s");
    $date = $all->format("d-m-Y");
    array_push($result, array(0 => $rawdata, "all" => $rawdata, 1 => $time, "hora" => $time, 2 => $date, "fecha" => $date));
}
echo json_encode($result);
?>
