<?php

// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular
include_once(dirname(__FILE__) . '/../global.php');
include_once(dirname(__FILE__) . '/horas_disponibles.php');

$fecha = date("Y-m-d");
if (isset($_GET["fecha"])) {
    $fecha = utf8_encode($_GET["fecha"]);
}
$hora = date("H:i:s");
if (isset($_GET["hora"])) {
    $hora = utf8_encode($_GET["hora"]);
}

$id_doctor = 1;
if (isset($_GET["idPersona"])) {
    $id_doctor = utf8_encode($_GET["idPersona"]);
}

$id_sede = 1;
if (isset($_GET["idSede"])) {
    $id_sede = utf8_encode($_GET["idSede"]);
}
if(strlen($hora) < 6)
{
    $hora = $hora.":00";
}
$date = DateTime::createFromFormat("Y-m-d H:i:s", $fecha . " " . $hora);
$rawdata = getHoursOfDay($date, $id_doctor, $id_sede);
$result = array();
for ($n = 0; $n < sizeof($rawdata); $n++) {
    $all = DateTime::createFromFormat("Y-m-d H:i:s", $rawdata[$n]);
    $time = $all->format("H:i:s");
    $date = $all->format("d-m-Y");
    array_push($result, array(0 => $rawdata, "all" => $rawdata, 1 => $time, "hora" => $time, 2 => $date, "fecha" => $date));
}
echo json_encode($result);
?>
