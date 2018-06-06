<?php

/**
 * Esta función valida que el rut ingresado sea correcto.
 * @param String $_rut El rut que se quiere validar
 * @return boolean
 */
function valiadte_rut($_rut) {

    $what = array("-", ".", " ");
    $with = array("", "", "");
    $tmp_rut = str_replace($what, $with, strtoupper(trim($_rut)));

    $dv = substr($tmp_rut, -1);
    $rut = substr($tmp_rut, 0, -1);
    $result = "-1";
    
    if (is_numeric($rut) && strlen($rut) >= 7) {
        $mult = 2;
        $sum = 0;
        $digits = intval($rut);
        while ($digits > 0) {
            $digit = $digits % 10;
            $sum = $sum + $digit * $mult;
            $digits =  floor($digits/ 10);
            $mult++;
            if ($mult > 7) {
                $mult = 2;
            }
        }
        $result = 11 - ($sum % 11);
    }

    return "$result" === $dv || ($result === 10 && $dv === "K");
}

/**
 * Obtiene solo la sección del número del rut.
 * 
 * Hay que tener en cuenta que se toma el número tal y como viene, sin hacer validaciones.
 * @param String $_rut El rut al que se le quiere extraer la primera parte.
 * @return String
 */
function get_number_rut($_rut) {

    $replace = array("-" => "", "." => "", " " => "");
    $tmp_rut = str_replace($replace, strtoupper(trim($_rut)));
    return substr($tmp_rut, 0, -1);
}

/**
 * Obtiene solo el dígito verificador.
 *
 * Hay que tener en cuenta que se toma el número tal y como viene, sin hacer validaciones.
 * @param String $_rut El rut al que se le quiere extraer el dígito verificador.
 * @return String
 */
function get_dv($_rut) {

    $replace = array("-" => "", "." => "", " " => "");
    $tmp_rut = str_replace($replace, strtoupper(trim($_rut)));

    $dv = substr($tmp_rut, -1);
    return $dv;
}

/**
 * Obtiene solo el dígito verificador.
 *
 * Hay que tener en cuenta que se toma el número tal y como viene, sin hacer validaciones.
 * @param String $_rut El rut al que se le quiere extraer el dígito verificador.
 * @return String
 */
function get_formatted_rut($_rut) {

    $what = array("-", ".", " ");
    $with = array("", "", "");
    $tmp_rut = str_replace($what, $with, strtoupper(trim($_rut)));
    $dv = substr($tmp_rut, -1);
    $rut = substr($tmp_rut, 0, -1);

    $result = "";
    if((is_numeric($rut)) && (strlen($rut) >= 7)) {
        $digits = str_split($rut);
        $n = sizeof($digits);
        $nn = 0;
        while ($n > 0) {
            $digit = $digits[$n - 1];
            if ($nn++ === 3) {
                $result = ".".$result ;
                $nn = 1;
            }        
            $result = $digit.$result;
            $n--;
        }
    }
    return $result."-".$dv;
}
