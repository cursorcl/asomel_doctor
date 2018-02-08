<?php

include_once(dirname(__FILE__).'/global.php');

$sql = "select p.personalId as personalId, p.personalNombre as personalNombre from personal p join especialidadDoctor e where (p.personalId = e.personalId)";
if( isset($_GET["id"]) )
{
    $id = utf8_encode($_GET["id"]);
    $sql = $sql." and e.especialidadId = ".$id;
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