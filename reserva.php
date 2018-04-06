<section class="reserva" id="reserva">
    <div class="container" id="creserva">
        <div class="row">
            <div class="reserva-caption clearfix">
                <div class="reserva-heading text-center">
                    <h2>Reserva de Horas</h2>
                </div>
                <div class="container" id="container-radios">
                    <div class="row">
                        <div class="col-lg-6 col-lg-offset-3 text-center">
                            <form>
                                <label class="radio-inline active" >
                                    <input type="radio"  name="optradio" value="xdoctor" checked="">Búsqueda por Doctor
                                </label>
                                <label class="radio-inline">
                                    <input type="radio"  name="optradio" value="xespecialidad" >Búsqueda por Especialidad
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-md-5 col-md-offset-4 reserva-form" id="reserva-form-doctor">
                    <form class="form" id="selectmode">
                        <div class="form-group">
                            <select class="form-control selectpicker" id="cmbsedes">
                                <option value="" disabled selected hidden>Seleccione Centro Médico...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control selectpicker" id="cmbdoctor" data-live-search="true" disabled>
                                <option value="" disabled selected hidden>Seleccione Especialista...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input class="submit-btn" type="submit" value="BUSCAR" id="btnsubmitdoctor" disabled>
                            <input class="submit-btn" type="submit" value="INICIO">
                        </div>
                    </form>
                </div>
                <div class="col-md-5 col-md-offset-4 reserva-form" style="display:none;" id="reserva-form-especialidad">
                    <form class="form" id="selectespecialidad">
                        <div class="form-group">
                            <select class="form-control selectpicker" id="cmbsedesespecialidad">
                                <option value="" disabled selected hidden>Seleccione Centro Médico...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <select class="form-control selectpicker" id="cmbespecialidad" disabled>
                                <option value="" disabled selected hidden>Seleccione Centro Especialidad...</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <input class="submit-btn" type="submit" value="BUSCAR" id="btnsubmitespecialidad" disabled>
                            <input class="submit-btn" type="submit" value="INICIO">
                        </div>
                    </form>
                </div>	
                <div class="col-md-5 col-md-offset-4 reserva-form" style="display:none;" id="div-reserva-listadodoctores">
                    <!-- 
                            Aquí se llena la lista de doctores con su primera hora disponible 
                            Cada línea tiene un botón submit para que llame al div de presentación doctor
                    -->
                    <div class="list-group" id="reserva-listadodoctores">
                    </div>
                    <!--<ul class="list-group" id="reserva-listadodoctores">
                    </ul>-->							
                </div>	
                <div class="col-md-12 reserva-form" style="display:none;" id="reserva-presentadoctor">
                    <!-- 
                            Se presenta la información del doctor seleccionado. 
                            Presenta la lista de horas dispobibles para la primera hora en adelante.
                            Además tiene un botón para presentar le calendario de disponibilidades para el doctor.
                    -->						    
                    <div class="col-md-12">

                        <div class="col-md-5">
                            <div class="row">
                                <div class="col-md-3">
                                    <img alt="" src="" class="img-doctor img-responsive" id="img_doctor"/>
                                </div>
                                <div class="col-md-9" >
                                    <ul class="list-group reserva-lbl-info" id="doctor-info">
                                    </ul>
                                </div>
                            </div>
                            <div class="row">
                                <input class="submit-btn" type="submit" value="CALENDARIO" id="show_calendar">
                                <input class='submit-btn' type='submit' value='INICIO'>;
                            </div>
                        </div>
                        <div class="col-md-7">
                            <!-- se presentan las horas dispobibles del doctor para ese dia -->
                            <div class="col-md-12 lbl-info" id="doctor-horas-libres">

                            </div>
                        </div>

                        <div class="row">


                            <div class="modal fade" id="myModal" role="dialog">
                                <div class="modal-dialog">

                                    <!-- Modal content-->
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Seleccione Día</h4>
                                        </div>
                                        <div class="modal-body" id="modal-body-calendar">
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>

                                </div>
                            </div>                            


                        </div>	
                        <div class="col-md-12 reserva-form" style="display:none;" id="reserva-calendariodoctor">
                            <!-- 
                                    Se presenta el calendario con las horas disponibles para el doctor seleccionado.
                            -->
                        </div>	
                    </div>
                </div>

                <div id="reserva-hora-paciente" style="display:none;" class="col-md-12 reserva-forms" >
                    <!-- 
                            Se presenta la información del doctor seleccionado. 
                            Presenta la lista de horas dispobibles para la primera hora en adelante.
                            Además tiene un botón para presentar le calendario de disponibilidades para el doctor.
                    -->	
                    <?php include "src/reserva/solicita-hora.php"; ?>


                </div>
            </div>
            </section>
