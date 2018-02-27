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
<div class="col-md-7">    
    <div class="contact-form">
        <form class="form" id="reserva-form-usuario" method="post">
            <div class="row">
                <div class="form-group col-md-12">
                    <label for="inputRut" class="col-md-2 col-form-label">RUT</label>
                    <div class="col-md-10">
                        <div class="input-group">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>
                            <input id="inputRut" type="text" class="form-control" name="inputRut" placeholder="Rut">
                        </div>
                    </div>
                </div>
            </div>           
            <div id="muestra_datos_paciente" >
                <div class="row">
                    <div class="form-group col-md-12">
                        <label for="show_email" class="col-md-2 col-form-label">Email</label>
                        <div class="col-md-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                <input id="show_email" type="text" class="form-control" name="show_email" placeholder="Email" disabled>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label for="show_phone" class="col-md-2 col-form-label">Teléfono</label>
                        <div class="col-md-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-phone-alt"></i></span>
                                <input type="tel" class="form-control" name="show_phone" id="show_phone" placeholder="Teléfono" disabled>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">                
                    <div class="form-group col-md-12">
                        <label for="show_client_name" class="col-md-2 col-form-label">Paciente</label>
                        <div class="col-md-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" class="form-control" name="show_client_name" id="show_client_name" placeholder="Paciente" disabled>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="solicita_datos_paciente" style="display:none;">
                <div class="row">
                    <div class="form-group col-md-12">
                        <label for="inputEmail" class="col-md-2 col-form-label">Email</label>
                        <div class="col-md-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
                                <input id="email" type="text" class="form-control" name="inputEmail" placeholder="Email">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label for="inputPhone" class="col-md-2 col-form-label">Teléfono</label>
                        <div class="col-md-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-phone-alt"></i></span>
                                <input type="tel" class="form-control" name="inputPhone" id="inputPhone" placeholder="Teléfono">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">                
                    <div class="form-group col-md-12">
                        <label for="paterno" class="col-md-2 col-form-label">Apellido Paterno</label>
                        <div class="col-md-10">
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" class="form-control" name="paterno" id="paterno" placeholder="Apellido Paterno">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">

                    <div class="form-group col-md-12">
                        <label for="materno" class="col-md-2 col-form-label">Apellido Materno</label>
                        <div class="col-md-10">              
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" class="form-control" id="materno" placeholder="Apellido Materno">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label for="nombres" class="col-md-2 col-form-label">Nombre</label>
                        <div class="col-md-10">                     
                            <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                                <input type="text" class="form-control" id="nombres" placeholder="Nombre">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="col-md-6">
                        <input class="reset-btn" type="reset" value="CANCELAR">
                    </div>
                    <div class="col-md-6">
                        <input class="submit-btn" type="submit" value="CONFIRMAR">
                    </div>


                </div>
            </div>
        </form>
    </div>
</div>