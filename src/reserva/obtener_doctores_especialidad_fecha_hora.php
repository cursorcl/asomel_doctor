<?php
// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular
include_once(dirname(__FILE__).'/../global.php');
include_once(dirname(__FILE__) . '/horas_disponibles.php');

$fecha = date("Y-m-d");
//$fecha =  date("Y-m-d", strtotime("2017-12-07"));
if( isset($_GET["fecha"]) )
{
    $fecha = utf8_encode($_GET["fecha"]);
}
$hora = date("H:i:s");
//$hora = date("H:i:s", strtotime("08:00:00"));
if( isset($_GET["hora"]) )
{
    $hora = utf8_encode($_GET["hora"]);
}
$especialidad = "1";
if( isset($_GET["especialidad"]) )
{
    $especialidad = utf8_encode($_GET["especialidad"]);
}
$sede = "1";
if( isset($_GET["sede"]) )
{
    $sede = utf8_encode($_GET["sede"]);
}

$sql =  "SELECT distinct p.personalId, p.personalNombre from  personal p, especialidadDoctor e, eos_horariobase b where  e.especialidadId = $especialidad and e.personalId = p.personalId and p.personalId = b.personalId and b.sedeId = $sede" ;
$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

if(!$result = mysqli_query($conexion, $sql)) die();

$rawdata = array(); //creamos un array
$returnResult =  array();


$date =  DateTime::createFromFormat("Y-m-d H:i:s", $fecha." ".$hora);
$i=0;
while($row = mysqli_fetch_array($result))
{
    $id_doctor = $row['personalId'];
    
    
    $rawdata = getFirstHours($date, $id_doctor, $sede);
    $all = DateTime::createFromFormat("Y-m-d H:i:s", $rawdata);
    $timeLocal = $all->format("H:i:s");
    $dateLocal = $all->format("d-m-Y");
    array_push($returnResult, array(0=> $rawdata, "all" => $rawdata, 1=>$timeLocal, "hora"=>$timeLocal, 2=>$dateLocal, "fecha"=>$dateLocal, 3=>$row['personalNombre'], "personalNombre"=>$row['personalNombre'], 4=>$row['personalId'], "personalId"=>$row['personalId']));
	$i++;
}
$close = mysqli_close($conexion);

echo json_encode($returnResult);
