
var map;
var panorama;
var positions = [];
var heading = [];
var icons = ['http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'];
var fecha;
var profesional;

function initMap() {
    var myOptions = {
        center: new google.maps.LatLng(-33.0492733, -71.6160225),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        panControl: true,
        mapTypeControl: true,
        panControlOptions: {
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.LARGE,
            position: google.maps.ControlPosition.RIGHT_CENTER
        },
        scaleControl: true
    };

    map = new google.maps.Map(document.getElementById("map"), myOptions);
    panorama = map.getStreetView();
    //map.setStreetView(panorama);

}

$().ready(function () {
    $.ajax({
        type: "POST",
        url: "src/doctors.php",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#cmbdoctor").get(0).options.length = 0;
            $("#cmbdoctor").get(0).options[0] = new Option("Seleccione Especialista...", "-1");

            $.each(msg, function (index, item) {
                $("#cmbdoctor").get(0).options[$("#cmbdoctor").get(0).options.length] = new Option(item.personalNombre, item.personalId);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            alert("-- " + xhr.responseText + " --");
        }
    });
    $.ajax({
        type: "POST",
        url: "src/especialidad.php",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#cmbespecialidad").get(0).options.length = 0;
            $("#cmbespecialidad").get(0).options[0] = new Option("Seleccione Especialidad...", "-1");

            $.each(msg, function (index, item) {
                $("#cmbespecialidad").get(0).options[$("#cmbespecialidad").get(0).options.length] = new Option(item.especialidadNombre, item.especialidadId);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            alert("-- " + xhr.responseText + " --");
        }
    });
    $("#my-calendar").zabuto_calendar({language: "es"});
});

function centerAt(source)
{
    var index = parseInt(source);
//    var pov = panorama.getPov();
//    pov.heading = heading[index];
//    panorama.setPov(pov);
//    panorama.setPosition({lat: positions[index].lat, lng: positions[index].lon});
    map.setCenter(positions[index]);
    map.setZoom(18);
}

// Obtierne listado de sedes.
$().ready(function () {

    $.ajax({
        type: "POST",
        url: "src/sedes.php",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#cmbsedes").get(0).options.length = 0;
            $("#cmbsedes").get(0).options[0] = new Option("Seleccione Centro Médico...", "-1");
            $("#cmbsedesespecialidad").get(0).options.length = 0;
            $("#cmbsedesespecialidad").get(0).options[0] = new Option("Seleccione Centro Médico...", "-1");
            var bounds = new google.maps.LatLngBounds();

            $.each(msg, function (index, item) {
                $("#cmbsedes").get(0).options[$("#cmbsedes").get(0).options.length] = new Option(item.sedeNombre, item.sedeId);
                $("#cmbsedesespecialidad").get(0).options[$("#cmbsedesespecialidad").get(0).options.length] = new Option(item.sedeNombre, item.sedeId);

                var title = "<div><em>" + item.sedeNombre + "</em><br>" + item.sedeDireccion + "<p>" + item.sedeHorarioAtencion + "</p></div>";

                $("#sedes_locations").append("<button type='button' class='btn btn-secondary' onclick='centerAt(" + item.sedeId + ");'>" + item.sedeNombre + "</button>");

                var latLng = new google.maps.LatLng(item.lat, item.lon);
                var marker = new google.maps.Marker({position: latLng, map: map, title: item.sedeNombre});
                marker.setIcon(icons[item.sedeId - 1]);
                marker.setMap(map);
                positions[item.sedeId] = latLng;
                heading[item.sedeId] = item.heading;
                var infowindow = new google.maps.InfoWindow({
                    content: '<div>' + item.sedeNombre + '<br>' + item.sedeDireccion + '<p>' + item.sedeHorarioAtencion + '</p></div>'
                });
                marker.addListener('click', function () {
                    infowindow.open(marker.get('map'), marker);
                });
                bounds.extend(marker.position);
            });
            map.fitBounds(bounds);
            $('[data-toggle="tooltip"]').tooltip();

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            alert("-- " + xhr.responseText + " --");
        }
    });
});

// Evento de selección del radio button de Profesional-Especialidad
$(document).ready(function () {
    $('input[type=radio][name=optradio]').change(function () {
        if (this.value === 'xdoctor') {
            document.getElementById('reserva-form-especialidad').style.display = "none";
            document.getElementById('reserva-form-doctor').style.display = "block";
        } else if (this.value === 'xespecialidad') {
            document.getElementById('reserva-form-doctor').style.display = "none";
            document.getElementById('reserva-form-especialidad').style.display = "block";
        }
        document.getElementById('div-reserva-listadodoctores').style.display = "none";
        document.getElementById('reserva-presentadoctor').style.display = "none";
        document.getElementById('reserva-calendariodoctor').style.display = "none";
        document.getElementById('reserva-hora-paciente').style.display = "none";

    });
});

// Evento de cambio de sede.
$(document).ready(function () {
    $("#cmbsedes").change(function (event) {
        var selected = $(this).val();
        if (selected !== -1)
        {
            $('#cmbdoctor').removeAttr('disabled');
        } else
        {
            $('#cmbdoctor').attr('disabled', 'disabled');
            $('#btnsubmitdoctor').attr('disabled', 'disabled');
        }
    });
    $("#cmbdoctor").change(function (event) {
        var selected = $(this).val();
        if (selected !== -1)
        {
            $('#btnsubmitdoctor').removeAttr('disabled');
        } else
        {
            $('#btnsubmitdoctor').attr('disabled', 'disabled');
        }
    });


    $("#cmbsedesespecialidad").change(function (event) {
        var selected = $(this).val();
        if (selected !== -1)
        {
            $('#cmbespecialidad').removeAttr('disabled');
        } else
        {
            $('#cmbespecialidad').attr('disabled', 'disabled');
            $('#btnsubmitespecialidad').attr('disabled', 'disabled');
        }
    });
    $("#cmbespecialidad").change(function (event) {
        var selected = $(this).val();
        if (selected !== -1)
        {
            $('#btnsubmitespecialidad').removeAttr('disabled');
        } else
        {
            $('#btnsubmitespecialidad').attr('disabled', 'disabled');
        }
    });
});

//Obtiene las horas de un doctor y una sede
$(document).ready(function () {
    $("#btnsubmitdoctor").click(function (e) {
        e.preventDefault();
        var id_doctor = $('#cmbdoctor').val();
        var nombre_doctor = $('#cmbdoctor option:selected').text();
        var id_sede = $('#cmbsedes').val();
        var nombre_sede = $('#cmbsedes option:selected').text();
        var d = new Date();
        var fecha = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        var hora = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);
        $.ajax({
            type: "GET",
            url: "src/reserva/obtener_siguiente_hora_x_doctor_fecha_hora.php",
            data: {"id_sede": id_sede, "id_doctor": id_doctor, "fecha": fecha, "hora": hora},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#reserva-listadodoctores").empty();
                //Aqui debo agregar todos los doctores en el UL reserva-listadodoctores
                $line = "<p>NO SE HA ENCONRADO HORAS DISPONIBLES.</p>"
                var hasdata = false;
                $.each(msg, function (index, item) {

                    if (hasdata === false)
                    {
                        hasdata = true;
                        line = "<table class='table table-bordered' id='table-hours'>";
                        line = line + "<thead >";
                        line = line + "<tr>";
                        line = line + "<th>Profesional</th>";
                        line = line + "<th>Siguiente Hora</th>";
                        line = line + "<th>Agenda</th>";
                        line = line + "</tr>";
                        line = line + "</thead>";
                        line = line + "<tbody>";
                    }
                    line = line + "<tr>";
                    line = line + "<td class='td-name'>" + nombre_doctor + "</td>";
                    line = line + "<td class='td-centered' >" + item["fecha"] + "<br> " + item["hora"] + "</td>";
                    line = line + "<td class='td-centered'><button type='button' class='btn btn-default hora' id='" + id_doctor + "'>VER  <span class='glyphicon glyphicon-calendar blue' aria-hidden='true'></span></button></td>";
                    line = line + "</tr>";

                });
                if (hasdata === true)
                {
                    line = line + "</tbody>";
                    line = line + "</table>";
                }
                $("#reserva-listadodoctores").append(line);
                document.getElementById('reserva-form-doctor').style.display = "none";
                document.getElementById('reserva-form-especialidad').style.display = "none";
                document.getElementById('div-reserva-listadodoctores').style.display = "block";
                document.getElementById('reserva-presentadoctor').style.display = "none";
                document.getElementById('reserva-calendariodoctor').style.display = "none";
                document.getElementById('reserva-hora-paciente').style.display = "none";
                $("#table-hours").on('click', '.hora', function () {
                    // Se va a mostrar las horas disponibles para el día seleccionado que sean mayores a la hora seleccionada.
                    var currentRow = $(this).closest("tr");
                    var texto = currentRow.find("td:eq(1)").text().split(" ");
                    var dia = texto[0];
                    var hora = texto[1];
                    var doc = currentRow.find("td:eq(0)").text();
                    var id = this.id;
                    var idSede = $('#cmbsedes').val();
                    mostrar_horas_doctor_dia(id, dia, hora, doc, idSede, nombre_sede);
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
                alert("!! " + xhr.responseText + " !!");
            }
        });
    }
    );
});

// Obtiene las horas de una sede y una especialidad.
$(document).ready(function () {
    $("button").click(function () {
        e.preventDefault();
        alert(this.id);
    });
    $("#btnsubmitespecialidad").click(function (e) {
        e.preventDefault();
        var especialidad = $('#cmbespecialidad').val();
        var sede = $('#cmbsedesespecialidad').val();
        var nombre_sede = $('#cmbsedesespecialidad option:selected').text();

        var d = new Date();
        var fecha = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        var hora = ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2);

        $.ajax({
            type: "GET",
            url: "src/reserva/obtener_doctores_especialidad_fecha_hora.php",
            data: {"sede": sede, "especialidad": especialidad, "fecha": fecha, "hora": hora},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#reserva-listadodoctores").empty();
                var founded = false;
                $line = "<p>NO SE HA ENCONTRADO HORAS DISPONIBLES.</p>";
                $.each(msg, function (index, item) {
                    if (founded === false)
                    {
                        founded = true;
                        //Aqui debo agregar todos los doctores en el UL reserva-listadodoctores
                        $line = "<table class='table table-bordered' id='table-hours'>";
                        $line = $line + "<thead >";
                        $line = $line + "<tr>";
                        $line = $line + "<th>Profesional</th>";
                        $line = $line + "<th>Siguiente Hora</th>";
                        $line = $line + "<th>Agenda</th>";
                        $line = $line + "</tr>";
                        $line = $line + "</thead>";
                        $line = $line + "<tbody>";
                    }
                    var fecha = item.fecha;
                    var hora = item.hora.substring(0, 5);
                    var id = item.personalId + "." + fecha + "." + hora;
                    $line = $line + "<tr>";
                    $line = $line + "<td class='td-name'>" + item.personalNombre + "</td>";
                    $line = $line + "<td class='td-centered' >" + fecha + " <br>" + hora + "</td>";
                    $line = $line + "<td class='td-centered'><button type='button' class='btn btn-default hora' id='" + item.personalId + "'>VER  <span class='glyphicon glyphicon-calendar blue' aria-hidden='true'></span></button></td>";
                    $line = $line + "</tr>";
                });
                if (founded === true)
                {
                    $line = $line + "</tbody>";
                    $line = $line + "</table>";
                }
                $("#reserva-listadodoctores").append($line);
                document.getElementById('reserva-form-doctor').style.display = "none";
                document.getElementById('reserva-form-especialidad').style.display = "none";
                document.getElementById('div-reserva-listadodoctores').style.display = "block";
                document.getElementById('reserva-presentadoctor').style.display = "none";
                document.getElementById('reserva-calendariodoctor').style.display = "none";
                document.getElementById('reserva-hora-paciente').style.display = "none";

                $("#table-hours").on('click', '.hora', function () {
                    // Se va a mostrar las horas disponibles para el día seleccionado que sean mayores a la hora seleccionada.
                    var currentRow = $(this).closest("tr");
                    var texto = currentRow.find("td:eq(1)").text().split(" ");
                    var dia = texto[0];
                    var hora = texto[1];
                    var doc = currentRow.find("td:eq(0)").text();
                    var id = this.id;
                    var idSede = $('#cmbsedesespecialidad').val();

                    $("#id_sede").val(idSede);
                    $("#id_doctor").val(id);
                    $("#lafecha").val(dia);
                    mostrar_horas_doctor_dia(id, dia, hora, doc, idSede, nombre_sede);

                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
                alert("!! " + xhr.responseText + " !!");
            }
        });
    });
});
/**
 * Muestra la información de horas disponibles de un doctor, 
 * para el día indicado, desde la hora en adelante.
 * 
 * Esta funcion es llamada cuando 
 * 1) Se ha seleccionado un doctor y una sede
 * 2) Se ha escogido una especialidad, una sede y luego un doctor y una hora.
 * 
 * @param {type} id_doctor Identificador del codigo del doctor.
 * @param {type} fecha_dia La fecha correspodiente al día de la reserva.
 * @param {type} hora La hora de inicio para buscar las horas en adelante.
 * @param {type} nombre_doctor Nombre del doctor.
 * @param {type} id_sede Identificador de la sede en la que se busca la hora
 * @param {type} nombre_sede Nombre de la sede en la que se busca la hora
 * @returns {undefined}
 */
function mostrar_horas_doctor_dia(id_doctor, fecha_dia, hora, nombre_doctor, id_sede, nombre_sede)
{
    mostrar_horas_disponibles(id_doctor, fecha_dia, hora, id_sede);
    mostrar_informacion_doctor(id_doctor, nombre_doctor, nombre_sede);

    document.getElementById('reserva-form-doctor').style.display = "none";
    document.getElementById('reserva-form-especialidad').style.display = "none";
    document.getElementById('div-reserva-listadodoctores').style.display = "none";
    document.getElementById('reserva-presentadoctor').style.display = "block";
    document.getElementById('reserva-calendariodoctor').style.display = "none";
    document.getElementById('reserva-hora-paciente').style.display = "none";
}

/**
 * Establece la informacion asociada al doctor incluyendo su fotografia. Las fotografias están almacenadas por código de doctor.
 * @param {type} id_doctor Identidicador del doctor.
 * @param {type} nombre_doctor Nombre del doctor.
 * @param {type} nombre_sede Nombre de la sede.
 * @returns {undefined}
 */
function mostrar_informacion_doctor(id_doctor, nombre_doctor, nombre_sede)
{
    $("#img_doctor").attr('src', 'img/doctors/' + id_doctor + ".png");
    $("#img_doctor").attr('alt', nombre_doctor);
    $("#doctor-info").empty();
    line = "<li class='list-group-item active'> Especialidad: " + $('#cmbespecialidad option:selected').text() + "</li>";
    line = line + "<li class='list-group-item'> Profesional: " + nombre_doctor + "</li>";
    line = line + "<li class='list-group-item'> Sede: " + nombre_sede + "</li>";

    line = line + "<input type='hidden' id='nombre_sede' name='nombre_sede' value='" + nombre_sede + "'>";
    line = line + "<input type='hidden' id='nombre_doctor' name='nombre_doctor' value='" + nombre_doctor + "'>";

    $("#doctor-info").append(line);


    $("#doctor-info-reserva").empty();
    $("#img-doctor-reserva").attr('src', 'img/doctors/' + id_doctor + ".png");
    $("#img-doctor-reserva").attr('alt', nombre_doctor);
    $("#doctor-info-reserva").append(line);
}

/**
 * Presenta las horas libres del doctor para el dia y a partir de la hora indicada
 * @param {type} id_doctor Identificador del doctor para el que se buscan las horas.
 * @param {type} fecha_dia Día para el que se buscan las horas.
 * @param {type} hora La hora en adelante para buscar las horas.
 * @param {type} id_sede Identificador de la sede en la que se buscan las horas.
 * @returns {undefined}
 */
function mostrar_horas_disponibles(id_doctor, fecha_dia, hora, id_sede)
{
    var pFechas = fecha_dia.split("-");
    var nFecha = pFechas[2] + "-" + pFechas[1] + "-" + pFechas[0];
    $("#id_sede").val(id_sede);
    $("#id_doctor").val(id_doctor);
    $("#hora").val(hora);
    $("#lafecha").val(nFecha);
    $.ajax({
        type: "GET",
        url: "src/reserva/obtener_horaslibres_doctor_sede_fecha.php",
        data: {"idSede": id_sede, "idPersona": id_doctor, "fecha": nFecha, "hora": hora},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#diahora").empty();
            $("#diahora").append(fecha_dia);
            var exists = false;
            $("#cmbhoras").empty();

            $.each(msg, function (index, item) {
                $("#cmbhoras").append("<option value='" + item["fecha"] + " " + item["hora"] + "'>" + item["hora"] + "</option>");
                if (exists === false)
                {
                    $("#hora").val(item["hora"]);
                }
                exists = true;
            });
            if (exists === false)
            {
                $("#cmbhoras").empty();
                $("#cmbhoras").append("<option>No hay horas disponibles...</option>")
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            alert("!! " + xhr.responseText + " !!");
        }
    });
}

//Ejecuta clic =  antiguo clic de tabla
$(document).ready(function () {
    $("#btnreservar").click(function (e) {
        document.getElementById('reserva-form-doctor').style.display = "none";
        document.getElementById('reserva-form-especialidad').style.display = "none";
        document.getElementById('div-reserva-listadodoctores').style.display = "none";
        document.getElementById('reserva-presentadoctor').style.display = "none";
        document.getElementById('reserva-calendariodoctor').style.display = "none";
        document.getElementById('reserva-hora-paciente').style.display = "block";

        $('#hora-de-reserva').empty();
        $('#hora-de-reserva').append("Día: " + $("#diahora").text() + " a las " + $("#cmbhoras").find('option:selected').text());
    });

    $("#cmbhoras").change(function () {
        $("#hora").val($("#cmbhoras").find('option:selected').text());
    });
});

$(document).ready(function () {
    $("#cmbespecialidad").change(function (event) {

        var selected = $(this).val();
        if (selected !== -1)
        {
            $('#cmbdoctorsespecialidad').removeAttr('disabled');
            $('#fechaespecialidad').removeAttr('disabled');
            $('#horasespecialidad').removeAttr('disabled');
            $('#cmbdoctorsespecialidad').empty();
            $.ajax({
                type: "GET",
                url: "src/especialidaddoctor.php",
                data: {"id": selected},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    $("#cmbdoctorsespecialidad").empty();
                    $("#cmbdoctorsespecialidad").append($('<option>', {value: -1, text: 'Seleccione Especialista...'}));
                    $.each(msg, function (index, item) {
                        $("#cmbdoctorsespecialidad").append($('<option>', {value: item.personalId, text: item.personalNombre}));
                    });
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                    alert("!! " + xhr.responseText + " !!");
                }
            });
        } else
        {
            $('#cmbdoctorsespecialidad').attr('disabled', 'disabled');
            $('#fechaespecialidad').attr('disabled', 'disabled');
            $('#horasespecialidad').attr('disabled', 'disabled');
        }
    });
});


$(document).ready(function () {
    $("#lafecha").change(function (event) {

        fecha = $(this).val();
        if (fecha && profesional)
        {
            funcHoras();
        }
    });
});


$(document).ready(function () {
    $("#show_calendar").click(function (event) {

        var id_sede = $("#id_sede").val();
        var id_doctor = $("#id_doctor").val();
        var fecha = $("#lafecha").val();
        fecha = new moment(fecha).format("DD-MM-YYYY");
        var hora = $("#hora").val();
        var nombre_doctor = $("#nombre_doctor").val();
        var nombre_sede = $("#nombre_sede").val();

        $.ajax({
            type: "GET",
            url: "src/reserva/obtener_dias_libres_mes.php",
            data: {"fecha": fecha, "id_doctor": id_doctor, "id_sede": id_sede, "hora": hora},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                var eventData = [];
                $.each(msg, function (index, item) {
                    var f = new moment(item.fecha, "DD-MM-YYYY").format("YYYY-MM-DD");
                    var s = {"date": f, "badge": true, "title": ""};
                    eventData.push(s);
                });
                var now = new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var month2show = now.getDate() > 15 ? 1 : 0;

                $("#modal-body-calendar").empty();
                $("#modal-body-calendar").append("<div id='my-calendar'></div>");
                $("#my-calendar").zabuto_calendar({
                    language: "es",
                    year: year,
                    month: month,
                    show_previous: false,
                    show_next: month2show,
                    today: true,
                    show_days: true,
                    data: eventData,
                    action: function () {
                        return myDateFunction(this.id, id_doctor, nombre_doctor, id_sede, nombre_sede);
                    }
                });
                $('#myModal').modal('show');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status);
                alert(thrownError);
                alert("!! " + xhr.responseText + " !!");
            }
        });



    });
});

function myDateFunction(id, id_doctor, nombre_doctor, id_sede, nombre_sede) {
    var date = $("#" + id).data("date");
    var pFechas = date.split("-");
    var nFecha = pFechas[2] + "-" + pFechas[1] + "-" + pFechas[0];
    var hasEvent = $("#" + id).data("hasEvent");
    if (hasEvent)
    {
        mostrar_horas_doctor_dia(id_doctor, nFecha, "00:00:00", nombre_doctor, id_sede, nombre_sede);
    }

    $('#myModal').modal('hide');
    return true;
}


/**
 * Asociamos el evento de perdidad de foco del rut en el formulario de reserva.
 * 
 * Una vez que se pierde el foco, se hace lo siguiente:
 * 1) Se valida y formatea el rut correspondiente.
 * 2) Una vez validado se busca en la base de datos.
 * 3) Si se encuentra se llenan los datos asociados.
 * 4) No se encuentra, se habilita formulario que pide los datos del paciente.
 */
$().ready(function () {
    $("#input_rut").focusout(function () {
        var tmpRut = $("#input_rut").val();
        if (validate(tmpRut))
        {
            $("#input_rut").val(format(tmpRut))
            var searchRut = clean(format(tmpRut));
            var fecha = $("#lafecha").val();

            $.ajax({
                type: "GET",
                url: "src/reserva/validate_rut_only_one_hour.php",
                data: {"rut": searchRut, "fecha": fecha},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    
                    if (msg['result'] === 0)
                    {
                        $.ajax({
                            type: "GET",
                            url: "src/reserva/obtener_paciente_x_rut.php",
                            data: {"rut": searchRut},
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (msg) {
                                var founded = false;
                                $.each(msg, function (index, item) {
                                    founded = true;
                                    $("#input_email").val(item.email);
                                    $("#input_phone").val(item.phone);
                                    $("#show_client_name").val(item.name);
                                });
                                if (!founded)
                                {
                                    document.getElementById('muestra_datos_paciente').style.display = "none";
                                    document.getElementById('solicita_datos_paciente').style.display = "block";

                                } else {
                                    document.getElementById('muestra_datos_paciente').style.display = "block";
                                    document.getElementById('solicita_datos_paciente').style.display = "none";
                                }
                                
                                $('#submit_reserva_hora').removeAttr('disabled');
                                
                            },
                            error: function (xhr, ajaxOptions, thrownError) {
                                alert(xhr.status);
                                alert(thrownError);
                                alert("!! " + xhr.responseText + " !!");
                            }
                        });
                    } else
                    {
                        $('#submit_reserva_hora').attr('disabled', 'disabled');
                        show_simple_modal("error", "Más de una reserva el día de hoy", function () {
                            return "La persona indicada ya tiene reserva el día de hoy. Solo una reserva al día.";
                        });
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {

                }
            });






        }
    }
    );
});

$('#contact-form-reserva').on('submit', function (event) {
    e.preventDefault();
    var name = $("#contact-name").val();
    var email = $("#contact-email").val();
    var phone = $("#contact-phone").val();
    var text = $("#contact-text").val();
    var message = $("#contact-message").val();
    $.ajax({
        type: 'POST',
        data: {"name": name, "email": email, "phone": phone, "text": text, "message": message},
        url: 'src/send_email.php',
        success: function (data) {
            //alert(data);
        }
    });
});

$().ready(function () {
    $("#submit_reserva_hora").click(function (e) {
        // AQUI DEBO VALIDAR LOS DATOS
        e.preventDefault();
        // campos ocultos
        var parametros = [];
        var hora = $("#hora").val();
        var fecha = $("#lafecha").val();
        var id_doctor = $("#id_doctor").val();
        // atributos que siempre están visibles
        var tmpRut = $("#input_rut").val();
        var email = $("#input_email").val();
        var input_phone = $("#input_phone").val();
        var id_sede = $("#id_sede").val();

        var input_paterno = "";
        var input_materno = "";
        var input_nombres = "";
        if ($('#solicita_datos_paciente').css('display') !== 'none')
        {
            // atributos que solo están visibles cuando el rut no es cliente.
            input_paterno = $("#input_paterno").val();
            input_materno = $("#input_materno").val();
            input_nombres = $("#input_nombres").val();
        }

        if (validate(tmpRut))
        {
            var searchRut = clean(format(tmpRut));
            parametros = {"input_rut": searchRut, "fecha": fecha, "hora": hora, "id_doctor": id_doctor, "input_email": email, "input_phone": input_phone, "id_sede": id_sede};
            if (input_paterno !== "")
            {
                parametros["input_paterno"] = input_paterno;
                parametros["input_materno"] = input_materno;
                parametros["input_nombres"] = input_nombres;
            }
            $.ajax({
                type: "GET",
                url: "src/reserva/registrar_horas_para_paciente.php",
                data: parametros,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    //Aqui debo verificar que fue almacenado exitosamente o fallidamente

                    if (msg["resultado"] === "exito")
                    {
                        show_simple_modal("success", "Reserva de hora", "Se ha enviado correo a " + email + " para confirmar hora.", function (result) {
                            $("#reserva-form-usuario").submit();
                            return true;
                        });
                    } else
                    {
                        show_simple_modal("error ", "Reserva de hora", "No se ha podido reservar su hora.", function (result) {
                            $("#reserva-form-usuario").submit();
                            return true;
                        });
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                    alert("!! " + xhr.responseText + " !!");
                }
            });

        }

    }
    );

});

function show_simple_modal(type, title, text, callback)
{
    modal({
        type: type, //Type of Modal Box (alert | confirm | prompt | success | warning | error | info | inverted | primary)
        title: title, //Modal Title
        text: text, //Modal HTML Content
        size: 'normal', //Modal Size (normal | large | small)
        buttons: [{
                text: 'OK', //Button Text
                val: 'ok', //Button Value
                eKey: true, //Enter Keypress
                addClass: 'btn-light-blue', //Button Classes (btn-large | btn-small | btn-green | btn-light-green | btn-purple | btn-orange | btn-pink | btn-turquoise | btn-blue | btn-light-blue | btn-light-red | btn-red | btn-yellow | btn-white | btn-black | btn-rounded | btn-circle | btn-square | btn-disabled)
                onClick: function (dialog) {
                    return true;
                }
            }, ],
        center: true, //Center Modal Box?
        autoclose: false, //Auto Close Modal Box?
        callback: callback, //Callback Function after close Modal (ex: function(result){alert(result); return true;})
        onShow: function (r) {}, //After show Modal function
        closeClick: true, //Close Modal on click near the box
        closable: true, //If Modal is closable
        theme: 'atlant', //Modal Custom Theme (xenon | atlant | reseted)
        animate: false, //Slide animation
        background: 'rgba(0,0,0,0.35)', //Background Color, it can be null
        zIndex: 1050, //z-index
        buttonText: {
            ok: 'OK',
            yes: 'SI',
            cancel: 'CANCELAR'
        },
        template: '<div class="modal-box"><div class="modal-inner"><div class="modal-title"><a class="modal-close-btn"></a></div><div class="modal-text"></div><div class="modal-buttons"></div></div></div>',
        _classes: {
            box: '.modal-box',
            boxInner: ".modal-inner",
            title: '.modal-title',
            content: '.modal-text',
            buttons: '.modal-buttons',
            closebtn: '.modal-close-btn'
        }
    });

}






