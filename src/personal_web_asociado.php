<?php

include_once(dirname(__FILE__) . '/global.php');

$sql = "SELECT * FROM personal_web where pagina=2 order by nombre";
$conexion = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
mysqli_set_charset($conexion, "utf8"); //formato de datos utf8

if (!$result = mysqli_query($conexion, $sql))
{
    die();
}
$nroRows = mysqli_num_rows($result);

$image = "img/doctors/0.png";
if(file_exists("img/doctors/".$row['personalId'].".png"))
{
    $image = "img/doctors/".$row['personalId'].".png";
}

echo "<div class='row'>"."\n";  
$c = 1;
$firstime = true;

while ($row = mysqli_fetch_assoc($result)) {
    if($c  == 1 && !$firstime)
    {
        echo "</div>"."\n";
        echo "<div class='row'>"."\n";
    }
    $firstime = false;
    echo "<div class='col-md-2 single-member col-sm-4'>"."\n";
    if (($c % 2) == 0) {
        echo "  <div class='person'>"."\n";
        echo "      <img class='img-responsive' src='" . $image . "' alt='" . $row['nombre'] . "'>"."\n";
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
        echo "      <img class='img-responsive' src='" . $image . "' alt='" . $row['nombre'] . "'>"."\n";
        echo "  </div>"."\n";
    }
    echo "</div>"."\n";

    $c++;
    if($c > 6)
    {
        $c = 1;
    }
}
echo "</div>"."\n";
$close = mysqli_close($conexion);
?>