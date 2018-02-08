<?php

include_once(dirname(__FILE__).'/global.php');
if( isset($_GET["dia"]) )
{
    $dia = utf8_encode($_GET["dia"]);
}

if( isset($_GET["profesional"]) )
{
    $profesional = utf8_encode($_GET["profesional"]);
}

$sql = "SELECT idHora, horaInicio FROM horas where idProfesional=".$profesional." and fecha='".$dia."'";
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