<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <title>CONFIRMACIÓN DE RESERVA HORA</title>
        <link rel="stylesheet" href="../css/font-awesome.css">
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/jquery-ui.css">
        <link rel="stylesheet" href="../css/style.css">
        <link rel="stylesheet" href="../css/reserva.css">
        <link rel="stylesheet" href="../css/search_rut.css">
        <link rel="stylesheet" href="../css/zabuto_calendar.min.css">
        <link href='http://fonts.googleapis.com/css?family=Open+Sans:600italic,400,800,700,300' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=BenchNine:300,400,700' rel='stylesheet' type='text/css'>
        <script src="../js/modernizr.js"></script>
        <link rel="stylesheet" href="../css/bootstrap-datepicker.css" />
        <!--[if lt IE 9]>
        <script src="js/html5shiv.js"></script>
        <script src="js/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <!-- header section -->
        <header class="top-header">
            <div class="container">
                <div class="row">
                    <div class="col-xs-2 header-logo">
                        <br>
                        <a href="index.html"><img src="../img/logo.png" alt="" class="img-responsive logo"></a>
                    </div>

                </div>
            </div>
        </header>

            
        <form>
            <div class="form-group">
                <label for="exampleInputEmail1">Confirmar hora</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">Conirmar la hora que ha solicitado.</small>
            </div>
            <?php
            echo  "<input type='hidden' name='key' id='key'  value='".$_GET['key']."'/>";
            ?>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>            

        <footer class="footer clearfix">
            <div class="container">
                <div class="row">
                    <div class="col-xs-6 footer-para">
                        <p>&copy;EOS All right reserved</p>
                    </div>
                    <div class="col-xs-6 text-right">
                        <a href=""><i class="fa fa-facebook"></i></a>
                        <a href=""><i class="fa fa-twitter"></i></a>
                        <a href=""><i class="fa fa-skype"></i></a>
                    </div>
                </div>
            </div>
        </footer>
        <!-- script tags
        ============================================================= -->
        <script src="../js/jquery-2.1.1.js"></script>
        <script src="../js/jquery-ui.js"></script>
        <!--<script src="js/smoothscroll.js"></script>-->
        <script src="../js/bootstrap.min.js"></script>


       
        </script>
    </body>
</html>