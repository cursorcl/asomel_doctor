<?php

include_once(dirname(__FILE__) . '/utils.php');
include_once(dirname(__FILE__) . '/global.php');
if (isset($_GET["rut"])) {
    $tmp_rut = utf8_encode($_GET["rut"]);
} else {
    die();
}
if (!valiadte_rut($tmp_rut)) {
    die();
}

$dv = substr($tmp_rut, -1);
$rut = substr($tmp_rut, 0, -1);

$sql = "SELECT p.pacienteNroFicha as fileNumber, p.pacienteRut as rut, upper(p.pacienteDv) as dv, upper(p.pacienteNombre) as name, r.email as email, p.pacienteTelefono as phone FROM pacientes p, datosReserva r where trim(p.pacienteRut) = $rut and upper(p.pacienteDv)=$dv and trim(p.pacienteRut) = trim(r.pacienteRut) and upper(p.pacienteDv) = upper(r.pacienteDv)";
$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

if (!$result = mysqli_query($conexion, $sql)) {
    die();
}

$rawdata = array(); //creamos un array

$i = 0;
while ($row = mysqli_fetch_array($result)) {
    $rawdata[$i] = $row;
    $i++;
}
$close = mysqli_close($conexion);
echo json_encode($rawdata);
