
var map;
var panorama;
var positions = [];
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
        scaleControl: true,
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
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
});

$().ready(function () {

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
});


$(document).ready(function () {
    $
    $("#my-calendar").zabuto_calendar({language: "es"});
});
function centerAt(source)
{
    var index = parseInt(source) - 1;
    map.setCenter(positions[index]);
    map.setZoom(18);
}

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
            panorama = map.getStreetView();
            $.each(msg, function (index, item) {
                $("#cmbsedes").get(0).options[$("#cmbsedes").get(0).options.length] = new Option(item.sedeNombre, item.sedeId);
                $("#cmbsedesespecialidad").get(0).options[$("#cmbsedesespecialidad").get(0).options.length] = new Option(item.sedeNombre, item.sedeId);

                var title = "<div><em>" + item.sedeNombre + "</em><br>" + item.sedeDireccion + "<p>" + item.sedeHorarioAtencion + "</p></div>";

                $("#sedes_locations").append("<button type='button' class='btn btn-secondary' onclick='centerAt(" + item.sedeId + ");'>" + item.sedeNombre + "</button>");

                var latLng = new google.maps.LatLng(item.lat, item.lon);
                var marker = new google.maps.Marker({position: latLng, map: map, title: item.sedeNombre});
                marker.setMap(map);


                positions.push(latLng);
                var infowindow = new google.maps.InfoWindow({
                    content: '<div>' + item.sedeNombre + '<br>' + item.sedeDireccion + '<p>' + item.sedeHorarioAtencion + '</p></div>'
                });

                marker.addListener('click', function () {
                    infowindow.open(marker.get('map'), marker);
                });
                map.setStreetView(panorama);
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
            url: "src/obtener_siguiente_hora_x_doctor_fecha_hora.php",
            data: {"sede": id_sede, "id_doctor": id_doctor, "fecha": fecha, "hora": hora},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#reserva-listadodoctores").empty();
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
                var hasdata = false;
                $.each(msg, function (index, item) {
                    var fechas = item.fecha.split("-");
                    var fecha = fechas[2] + "-" + fechas[1] + "-" + fechas[0];
                    var horas = item.horainicio.split(":");
                    var hora = horas[0] + ":" + horas[1];
                    var id = item.personalId + "." + fecha + "." + hora;
                    $line = $line + "<tr>";
                    $line = $line + "<td class='td-name'>" + item.personalNombre + "</td>";
                    $line = $line + "<td class='td-centered' >" + fecha + " <br>" + hora + "</td>";
                    $line = $line + "<td class='td-centered'><button type='button' class='btn btn-default hora' id='" + item.personalId + "'>VER  <span class='glyphicon glyphicon-calendar blue' aria-hidden='true'></span></button></td>";
                    $line = $line + "</tr>";
                    hasdata = true;
                });
                if (!hasdata)
                {
                    $line = $line + "<tr>";
                    $line = $line + "<td class='td-name' colspan='3'>No hay horas disponibles </td>";
                    $line = $line + "</tr>";
                }
                $line = $line + "</tbody>";
                $line = $line + "</table>";
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
    });
});

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
            url: "src/obtener_doctores_especialidad_fecha_hora.php",
            data: {"sede": sede, "especialidad": especialidad, "fecha": fecha, "hora": hora},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {
                $("#reserva-listadodoctores").empty();
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
                $.each(msg, function (index, item) {
                    var fechas = item.fecha.split("-");
                    var fecha = fechas[2] + "-" + fechas[1] + "-" + fechas[0];
                    var horas = item.horainicio.split(":");
                    var hora = horas[0] + ":" + horas[1];
                    var id = item.personalId + "." + fecha + "." + hora;
                    $line = $line + "<tr>";
                    $line = $line + "<td class='td-name'>" + item.personalNombre + "</td>";
                    $line = $line + "<td class='td-centered' >" + fecha + " <br>" + hora + "</td>";
                    $line = $line + "<td class='td-centered'><button type='button' class='btn btn-default hora' id='" + item.personalId + "'>VER  <span class='glyphicon glyphicon-calendar blue' aria-hidden='true'></span></button></td>";
                    $line = $line + "</tr>";
                });
                $line = $line + "</tbody>";
                $line = $line + "</table>";
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
    $.ajax({
        type: "GET",
        url: "src/obtener_horaslibres_doctor_sede_fecha.php",
        data: {"idSede": id_sede, "idPersona": id_doctor, "fecha": nFecha, "hora": hora},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#doctor-horas-libres").empty();
            line = "<table class='table table-bordered' id='table-hours-per-day'>";
            line = line + "<thead>";
            line = line + "<tr>";
            line = line + "<th>Hora Inicio</th>";
            line = line + "<th>Reservar</th>";
            line = line + "</tr>";
            line = line + "</thead>";
            line = line + "<tbody>";
            var exists = false;
            $.each(msg, function (index, item) {
                line = line + "<tr>";
                line = line + "<td class='td-centered' >" + item.fecha + "</td>";
                line = line + "<td class='td-centered'><button type='button' class='btn btn-default hora' id='" + item.personalId + "'>RESERVAR  <span class='glyphicon glyphicon-calendar blue' aria-hidden='true'></span></button></td>";
                line = line + "</tr>";
                exists = true;
            });
            if (exists === false)
            {
                line = line + "<tr>";
                line = line + "<td class='td-centered' colspan='2'> No hay horas disponibles para la fecha indicada</td>";
                line = line + "</tr>";
            }
            line = line + "</tbody>";
            line = line + "</table>";
            line = line + "<input type='hidden' id='id_sede' name='id_sede' value='" + id_sede + "'>";
            line = line + "<input type='hidden' id='id_doctor' name='id_doctor' value='" + id_doctor + "'>";
            line = line + "<input type='hidden' id='fecha' name='fecha' value='" + nFecha + "'>";
            line = line + "<input type='hidden' id='hora' name='hora' value='" + hora + "'>";

            $("#doctor-horas-libres").append(line);

            $("#table-hours-per-day").on('click', '.hora', function () {
                // Se va a mostrar las horas disponibles para el día seleccionado que sean mayores a la hora seleccionada.

                document.getElementById('reserva-form-doctor').style.display = "none";
                document.getElementById('reserva-form-especialidad').style.display = "none";
                document.getElementById('div-reserva-listadodoctores').style.display = "none";
                document.getElementById('reserva-presentadoctor').style.display = "none";
                document.getElementById('reserva-calendariodoctor').style.display = "none";
                document.getElementById('reserva-hora-paciente').style.display = "block";

                $('#hora-de-reserva').empty();
                $('#hora-de-reserva').append("Día: " + fecha_dia + " a las " + hora);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            alert("!! " + xhr.responseText + " !!");
        }
    });
}


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
                    $("#cmbdoctorsespecialidad").get(0).empty();
                    $("#cmbdoctorsespecialidad").get(0).options[0] = new Option("Seleccione Especialista...", "-1");
                    $.each(msg, function (index, item) {
                        $("#cmbdoctorsespecialidad").get(0).options[$("#cmbdoctorsespecialidad").get(0).options.length] = new Option(item.personalNombre, item.personalId);
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
    $("#fecha").change(function (event) {

        fecha = $(this).val();
        if (fecha && profesional)
        {
            funcHoras();
        }
    });
//    $("#cmbdoctor").change(function (event) {
//
//        profesional = $(this).val();
//        if (fecha && profesional)
//        {
//            funcHoras();
//        }
//    });
});

//function funcHoras()
//{
//    $('#horas').removeAttr('disabled');
//    $('#horas').empty();
//    $.ajax({
//        type: "GET",
//        url: "src/obtener_horaslibres_docotr_sede_fecha.php",
//        data: {"dia": fecha, "profesional": profesional},
//        contentType: "application/json; charset=utf-8",
//        dataType: "json",
//        success: function (msg) {
//            $("#horas").get(0).options.length = 0;
//            $("#horas").get(0).options[0] = new Option("Seleccione Especialista...", "-1");
//            $.each(msg, function (index, item) {
//                $("#horas").get(0).options[$("#horas").get(0).options.length] = new Option(item.personalNombre, item.personalId);
//            });
//        },
//        error: function (xhr, ajaxOptions, thrownError) {
//            alert(xhr.status);
//            alert(thrownError);
//            alert("!! " + xhr.responseText + " !!");
//        }
//    });
//}

$(document).ready(function () {
    $(document).ready(function () {
        $("#my-calendar").zabuto_calendar({language: "en"});
    });

    $("#show_calendar").click(function (event) {

        var id_sede = $("#id_sede").val();
        var id_doctor = $("#id_doctor").val();
        var fecha = $("#fecha").val();
        var hora = $("#hora").val();
        var nombre_doctor = $("#nombre_doctor").val();
        var nombre_sede = $("#nombre_sede").val();

        $.ajax({
            type: "GET",
            url: "src/obtener_dias_libres_mes.php",
            data: {"fecha": fecha, "id_doctor": id_doctor, "id_sede": id_sede, "hora": hora},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (msg) {

                var eventData = [];
                $.each(msg, function (index, item) {
                    var s = {"date": item.fecha, "badge": true, "title": ""};
                    eventData.push(s);
                });
                $("#modal-body-calendar").empty();
                $("#modal-body-calendar").append("<div id='my-calendar'></div>");
                $("#my-calendar").zabuto_calendar({
                    language: 'es',
                    cell_border: true,
                    today: true,
                    show_days: false,
                    weekstartson: 0,
                    data: eventData,
                    action: function () {
                        return myDateFunction(this.id, id_doctor, nombre_doctor, id_sede, nombre_sede);
                    },
                    nav_icon: {
                        prev: '<i class="fa fa-chevron-circle-left"></i>',
                        next: '<i class="fa fa-chevron-circle-right"></i>'
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
    var hasEvent = $("#" + id).data("hasEvent");
    if (hasEvent)
        mostrar_horas_doctor_dia(id_doctor, date, "00:00:00", nombre_doctor, id_sede, nombre_sede);
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
            $.ajax({
                type: "GET",
                url: "src/obtener_paciente_x_rut.php",
                data: {"rut": searchRut},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    var founded = false;
                    $.each(msg, function (index, item) {
                        founded = true;
                        $("#input_email").val(item.email);
                        $("#show_phone").val(item.phone);
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

$().ready(function () {
    $("#submit_reserva_hora").click(function (e) {
        // AQUI DEBO VALIDAR LOS DATOS
        e.preventDefault();
        var tmpRut = $("#input_rut").val();
        var hora = $("#hora").val();
        var fecha = $("#fecha").val();
        var id_doctor = $("#id_doctor").val();
        var email = $("#input_email").val();

        if (validate(tmpRut))
        {
            var searchRut = clean(format(tmpRut));
            $.ajax({
                type: "GET",
                url: "src/registrar_horas_para_paciente.php",
                data: {"input_rut": searchRut, "fecha": fecha, "hora": hora, "id_doctor": id_doctor, "input_email": email},
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (msg) {
                    //Aqui debo verificar que fue almacenado exitosamente o fallidamente
                    if (msg === "exito")
                    {
                        show_simple_modal("success", "Reserva de hora", "Su hora ha sido reservada exitosamente.", function (result) {
                            $("#reserva-form-usuario").submit();
                            return true;
                        });
                    } else
                    {
                        show_simple_modal("error ", "Reserva de hora", "Su hora no ha sido reservada exitosamente.", function (result) {
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






