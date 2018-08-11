<?php

// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular
include_once(dirname(__FILE__) . '/../src/global.php');

$token = "";
if (isset($_GET["token"])) {
    $token = utf8_encode($_GET["token"]);
}


$sql = "SELECT p.personalNombre, h.horaInicio, h.fecha,s.sedeNombre  FROM asomel_data.personal p, asomel_data.sedes s, asomel_data.horas_por_confirmar c, asomel_data.horas h where h.horaInicio = c.horaInicio and h.fecha = c.fecha  and  h.personalId = c.personalId and p.personalId = h.personalId and s.sedeId = h.sedeId and ";
$sql = $sql."c.token = '$token'";

$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8


if (!$result = mysqli_query($conexion, $sql))
    die();

$rawdata = array(); //creamos un array

$i = 0;
while ($row = mysqli_fetch_array($result)) {
    $rawdata[$i] = $row;    
    $i++;
}
$close = mysqli_close($conexion);


echo json_encode($rawdata);
?>


