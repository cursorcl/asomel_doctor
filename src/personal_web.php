<?php

include_once(dirname(__FILE__) . '/global.php');

$sql = "SELECT * FROM personal_web where pagina=1 order by nombre";
$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

if (!$result = mysqli_query($conexion, $sql))
    die();
$i = 1;
echo "<div class='row'>"."\n";
$nroRows = mysqli_num_rows($result);
while ($row = mysqli_fetch_assoc($result)) {
    if($i % 7 == 0)
    {
        echo "<div class='row'>"."\n";
    }
    echo "<div class='col-md-2 single-member col-sm-4'>"."\n";
    if (($i % 2) == 0) {
        echo "  <div class='person'>"."\n";
        echo "      <img class='img-responsive' src='" . $row['fotografia'] . "' alt='" . $row['nombre'] . "'>"."\n";
        echo "  </div>"."\n";
        echo "  <div class='person-detail'>"."\n";
        echo "      <div class='arrow-bottom'></div>"."\n";
        echo "      <h3>" . $row['prefijo'] . "</h3>"."\n";
        echo "      <p>" . $row['actividad'] . "</p>"."\n";
        echo "      <h3>". $row['nombre'] . "</h3>"."\n";
        echo "      <p>" . $row['resumen'] . "</p>"."\n";
        echo "  </div>"."\n";
    } else {
        echo "  <div class='person-detail'>"."\n";
        echo "      <div class='arrow-top'></div>"."\n";
        echo "      <h3>" . $row['prefijo'] . "</h3>"."\n";
        echo "      <p>" . $row['actividad'] . "</p>"."\n";
        echo "      <h3>". $row['nombre'] . "</h3>"."\n";
        echo "      <p>" . $row['resumen'] . "</p>"."\n";
        echo "  </div>"."\n";
        echo "  <div class='person'>"."\n";
        echo "      <img class='img-responsive' src='" . $row['fotografia'] . "' alt='" . $row['nombre'] . "'>"."\n";
        echo "  </div>"."\n";
    }
    echo "</div>"."\n";
    

    $i = $i  + 1;
    if($i % 7 == 0)
    {
        echo "</div>"."\n";
    }    
}
if($i % 7 != 0)
{
    echo "</div>"."\n";
}    
$close = mysqli_close($conexion);
?>