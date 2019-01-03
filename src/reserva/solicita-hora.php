<div class="col-md-5">
    <div class="col-md-3">
        <img alt="" src="" class="img-doctor img-responsive" id="img-doctor-reserva"/>
    </div>
    <div class="col-md-9" >
        <ul class="list-group reserva-lbl-info" id="doctor-info-reserva">
        </ul>
        <h3 id="hora-de-reserva">LA HORA</h3>
    </div>
</div>	
<div class="col-md-7" id='solicita-hora' style="display:block;">    
    <div class="contact-form">
        <form class="form" id="reserva-form-usuario" >
            <div class="row">
                <div class="form-group col-md-12">
                    <label for="input_rut" class="col-md-2 col-form-label">RUT</label>
                    <div class="col-md-10">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
                            <input id="input_rut" type="text" class="form-control" name="input_rut" placeholder="Rut">
                        </div>
                    </div>
                </div>
            </div>           
            <div class="row">
                <div class="form-group col-md-12">
                    <label for="input_email" class="col-md-2 col-form-label">Email</label>
                    <div class="col-md-10">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                            <input id="input_email" type="text" class="form-control" name="input_email" placeholder="Email">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="form-group col-md-12">
                    <label for="input_phone" class="col-md-2 col-form-label">Teléfono</label>
                    <div class="col-md-10">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-phone-alt"></i></span>
                            <input type="tel" class="form-control" name="input_phone" id="input_phone" placeholder="Teléfono">
                        </div>
                    </div>
                </div>
            </div>
            <div id="muestra_datos_paciente" >
                <div class="row">                
                    <div class="form-group col-md-12">
                        <label for="show_client_name" class="col-md-2 col-form-label">Paciente</label>
                        <div class="col-md-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" readonly  class="form-control" name="show_client_name" id="show_client_name" placeholder="Paciente">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="solicita_datos_paciente" style="display:none;">

                <div class="row">                
                    <div class="form-group col-md-12">
                        <label for="input_paterno" class="col-md-2 col-form-label">Apellido Paterno</label>
                        <div class="col-md-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" class="form-control" name="input_paterno" id="input_paterno" placeholder="Apellido Paterno">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="form-group col-md-12">
                        <label for="input_materno" class="col-md-2 col-form-label">Apellido Materno</label>
                        <div class="col-md-10">              
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" class="form-control" id="input_materno" name="input_materno" placeholder="Apellido Materno">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label for="input_nombres" class="col-md-2 col-form-label">Nombre</label>
                        <div class="col-md-10">                     
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" class="form-control" id="input_nombres"  name="input_nombres" placeholder="Nombre" >
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div> <!-- contiene solo campos ocultos utiles para el formulario y procesamiento
                  los valores ocultos son la fecha, la hora, el doctor
                -->
                <input type="hidden"  name="fecha" id="lafecha" />
                <input type="hidden"  name="hora" id="hora" />
                <input type="hidden"  name="id_doctor" id="id_doctor" />
                <input type="hidden"  name="id_sede" id="id_sede" />


            </div>
            <div class="row reserva-form">
                <div class="col-md-12">
                    <div class="col-md-6">
                        <input class="reset-btn" type="reset" value="CANCELAR">
                    </div>
                    <div class="col-md-6">
                        <input class="submit-btn" type="submit" id="submit_reserva_hora" value="CONFIRMAR" disabled>
                    </div>


                </div>
            </div>
        </form>
    </div>
</div>

<div id="solicita-hora-resultado" class="modal fade" role="dialog">
    <div class="modal-dialog">

        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registro de hora</h4>
            </div>
            <div class="modal-body">
                <p>Se ha enviado correo de confirmación de hora.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>

    </div>
</div>

<div id="solicita-hora-error" class="modal fade" role="dialog">
    <div class="modal-dialog">
        <!-- Modal content-->
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Registro de hora</h4>
            </div>
            <div class="modal-body">
                <p>Se ha producido un error al registrar su hora.</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
            </div>
        </div>

    </div>
</div>
