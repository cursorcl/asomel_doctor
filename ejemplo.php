<?php
include_once(dirname(__FILE__).'/src/global.php');
include_once(dirname(__FILE__).'/src/reserva/horas_disponibles.php');

$date = new DateTime();
echo getAllHours($date, 383, 1);