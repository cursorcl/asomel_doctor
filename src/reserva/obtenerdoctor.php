<?php
// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular

include_once(dirname(__FILE__).'/../global.php');

$fecha = date("Y-m-d");

if( isset($_GET["fecha"]) )
{
    $fecha = utf8_encode($_GET["fecha"]);
}
$hora = date("H:i:s");
if( isset($_GET["hora"]) )
{
    $hora = utf8_encode($_GET["hora"]);
}
$sql =  "SELECT distinct personalId, personalNombre, fecha, horainicio, sedeId FROM view_listado_horas_libres WHERE fecha >='".$fecha."' and hora >'".$hora."'";
if( isset($_GET["doctor"]) )
{
    $doctor = utf8_encode($_GET["doctor"]);
	$sql = $sql. " and personalId=".$doctor;
}
if( isset($_GET["sede"]) )
{
    $sede = utf8_encode($_GET["sede"]);
	$sql = $sql. " and sede=".$sede;
}


$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

if(!$result = mysqli_query($conexion, $sql)) die();

$rawdata = array(); //creamos un array

$i=0;
while($row = mysqli_fetch_array($result))
{
	$rawdata[$i] = $row;
	$i++;
}
$close = mysqli_close($conexion);
echo json_encode($rawdata);
?>