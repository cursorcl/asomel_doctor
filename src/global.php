<?php
  /**
  * @file global.php
  * 
  * Archivo de definicion de variables globales.
  *
  * @author Shoto <gfarias@altavoz.net>
  * @package app
  */


  /** DRIVER, Nombre del driver de adodb para conexion a base de datos.  */
  define('DRIVER', 'mysql');

  /** DB_NAME, Nombre de base de datos.  */
  define('DB_NAME','asomel_data');

  /** DB_HOST, IP o nombre de Host de base de datos.  */
  define('DB_HOST', 'localhost');

  /** DB_PORT, Numero de puerto de base de datos.  */
  define('DB_PORT', 3306);

  /** DB_USER, Usuario de base de datos.  */
  define('DB_USER', 'asomel_cldb');

  /** DB_PWD, Password de usuario de base de datos.  */
  define('DB_PWD', 'asomel200905');

  /** DIR_SERVER, Archivo de definicion de modulos  */
  define('DIR_SERVER', $_SERVER['DOCUMENT_ROOT'].'/asomel');
  
  /** LOG4PHP_DIR, nombre de directorio de modulos  */
  define('LOG4PHP_DIR', DIR_SERVER.'/includes/logs/log4php');

  /** DIR_LOGS, nombre de directorio de modulos  */
  define('DIR_LOGS',DIR_SERVER.'/logs');
  
  /** SMARTY_DIR, directorio base de librerias de smarty  */
  define('SMARTY_DIR',DIR_SERVER.'/includes/smarty/');

  /** CLASS_LIB, directorio de clases genericas p globales  */
  define('CLASS_LIB','/classes/');
  
  /** MVC_CLASS_LIB, directorio de clases genericas p globales  */
  define('MVC_CLASS_LIB','/common/');

  /** CLASS_INCLUDES, directorio de clases genericas p globales  */
  define('CLASS_INCLUDES','/includes/');
  
  /** WEB_BASE, Archivo de definicion de modulos  */
  define('WEB_DIR_IMAGES', '../imag/');
  
  /** SMTP_IP, Ip de servidor SMTP  */
  define('SMTP_IP', 'localhost');
  
  /** NUMERO de días a presentar */
  define('NRO_DAYS', 15);
  /** DURACION de la hora de atención de un doctor */
  define('STEP_MINUTES', 15);
  date_default_timezone_set('America/Santiago')
  

?>
