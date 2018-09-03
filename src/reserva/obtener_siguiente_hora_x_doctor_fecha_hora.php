<?php

// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular
include_once(dirname(__FILE__) . '/../global.php');
include_once(dirname(__FILE__) . '/horas_disponibles.php');

$fecha = date("Y-m-d");
//$fecha =  date("Y-m-d", strtotime("2017-12-07"));
if (isset($_GET["fecha"])) {
    $fecha = utf8_encode($_GET["fecha"]);
}
$hora = date("H:i:s");
//$hora = date("H:i:s", strtotime("08:00:00"));
if (isset($_GET["hora"])) {
    $hora = utf8_encode($_GET["hora"]);
}

$id_doctor = 0;
//$hora = date("H:i:s", strtotime("08:00:00"));
if (isset($_GET["id_doctor"])) {
    $id_doctor = utf8_encode($_GET["id_doctor"]);
}

$id_sede = 0;
//$hora = date("H:i:s", strtotime("08:00:00"));
if (isset($_GET["id_sede"])) {
    $id_sede = utf8_encode($_GET["id_sede"]);
}

$date =  DateTime::createFromFormat("Y-m-d H:i:s", $fecha." ".$hora);
$rawdata = getFirstHours($date, $id_doctor, $id_sede);
$result = array();

$all = DateTime::createFromFormat("Y-m-d H:i:s", $rawdata);
$time = $all->format("H:i:s");
$date = $all->format("d-m-Y");
$result[0] = array(0=> $rawdata, "all" => $rawdata, 1=>$time, "hora"=>$time, 2=>$date, "fecha"=>$date);
echo json_encode($result);
?>