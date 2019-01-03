<?php
// Obtiene horarios de los doctores que son de una especialidad específica  en una sede en partícular

include_once(dirname(__FILE__).'/../global.php');

$fecha = new DateTime();

if( isset($_GET["fecha"]) )
{
    $fecha =  DateTime::createFromFormat("Y-m-d", $_GET["fecha"]);
    
}
$rut = "";
if( isset($_GET["rut"]) )
{
    $rut = substr(utf8_encode($_GET["rut"]), 0, -1);
}
$sql =  "SELECT * FROM reserva WHERE fecha ='".$fecha->format("Y-m-d")."' and pacienteRut ='".$rut."'";

$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

if(!$result = mysqli_query($conexion, $sql)) 
{
    $close = mysqli_close($conexion);
    die();
}

$row = mysqli_fetch_row($result);

$result = array( 'result' => 0 );
if($row !== null)
{
    $result[result] = 1;
}   
$close = mysqli_close($conexion);

echo json_encode($result);
?>