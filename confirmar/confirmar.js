$().ready(function () {
    var url = window.location.toString();
    var searchParams = new URLSearchParams(window.location);
    
    var token = getParameter('key');


    $.ajax({
        type: "GET",
        url: "confirmarreservadb.php",
        data: {"token": token},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
           $.each(msg, function (index, item) {
                $("#doctor").empty();
                $("#dia").empty();
                $("#hora").empty();
                $("#sede").empty();
           
                $("#doctor").append(item.personalNombre);
                $("#dia").append(item.fecha);
                $("#hora").append(item.horaInicio);
                $("#sede").append(item.sedeNombre);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(xhr.status);
            alert(thrownError);
            alert("-- " + xhr.responseText + " --");
        }
    });
});

function getParameter(paramName) {
  var searchString = window.location.search.substring(1),
      i, val, params = searchString.split("&");

  for (i=0;i<params.length;i++) {
    val = params[i].split("=");
    if (val[0] == paramName) {
      return val[1];
    }
  }
  return null;
}
