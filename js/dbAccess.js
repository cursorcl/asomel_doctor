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

        mostrar_horas_doctor_dia(id_doctor, fecha, hora, nombre_doctor, id_sede, nombre_sede);
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
            url: "src/obtenerdoctores.php",
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

                $("#table-hours").on('click', '.hora', function () {
                    // get the current row
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
    line = line + "<li class='list-group-item'> Sede: " + nombre_sede;
    +"</li>";

    $("#doctor-info").append(line);
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
            $("#reserva-doctor-content").empty();
            line = "<table class='table table-bordered' id='table-hours-per-day'>";
            line = line + "<thead>";
            line = line + "<tr>";
            line = line + "<th>Hora Inicio</th>";
            line = line + "<th>Reservar</th>";
            line = line + "</tr>";
            line = line + "</thead>";
            line = line + "<tbody>";
            $.each(msg, function (index, item) {
                line = line + "<tr>";
                line = line + "<td class='td-centered' >" + item.horainicio + "</td>";
                line = line + "<td class='td-centered'><button type='button' class='btn btn-default hora' id='" + item.personalId + "'>RESERVAR  <span class='glyphicon glyphicon-calendar blue' aria-hidden='true'></span></button></td>";
                line = line + "</tr>";
            });
            line = line + "</tbody>";
            line = line + "</table>";

            $("#doctor-horas-libres").append(line);
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
                    $("#cmbdoctorsespecialidad").get(0).options.length = 0;
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
    $("#cmbdoctor").change(function (event) {

        profesional = $(this).val();
        if (fecha && profesional)
        {
            funcHoras();
        }
    });
});

function funcHoras()
{
    $('#horas').removeAttr('disabled');
    $('#horas').empty();
    $.ajax({
        type: "GET",
        url: "src/horas.php",
        data: {"dia": fecha, "profesional": profesional},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            $("#horas").get(0).options.length = 0;
            $("#horas").get(0).options[0] = new Option("Seleccione Especialista...", "-1");
            $.each(msg, function (index, item) {
                $("#horas").get(0).options[$("#horas").get(0).options.length] = new Option(item.personalNombre, item.personalId);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            alert("!! " + xhr.responseText + " !!");
        }
    });
}

//$("#selectmode").ajaxSubmit({url: 'src/server.php', type: 'post'})

