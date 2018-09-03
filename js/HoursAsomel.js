class HoursAsomel {

    constructor(value) {
        this.data = value;
    }

    /**
     * Obtiene listado de fechas y horas desde el dìa hsta  hoy + nroDays dìas cada step minutos.
     * @param {type} first Fecha de inicio
     * @param {type} last Fecha final
     * @param {type} step rango de tiempo en minutos
     * @returns {Array|HoursAsomel.obtainHours.fechas}
     */
    obtainHours(first, last, step)
    {
        var fechas = new Array();
        var day = new moment(first);
        while (day.isBefore(last))
        {
            fechas.push(new moment(day));
            day = day.add(step, 'minutes');
        }
        return fechas;
    }
    /**
     * Obtiene listado de fechas y horas desde el dìa hsta  hoy + 15 dìas cada 15 minutos.
     * @returns {Array|HoursAsomel.hourss.fechas}
     */
    hour()
    {
        return this.hours(15);
    }
    /**
     * Obtiene listado de fechas y horas desde el dìa hsta  hoy + nroDays dìas cada 15 minutos.
     * @param {type} nroDays número de días en adelante para obtener las fechas y horas con pasos por defecto.
     * @returns {Array|HoursAsomel.hourss.fechas}
     */
    hours(nroDays)
    {
        return this.hourss(new Date(), nroDays, 15);
    }

    hourss(dt, nroDays, step)
    {
        var n;
        var fechas = new Array();
        for (n = 0; n < nroDays; n++)
        {
            var day = moment(dt);
            day = day.add(n, 'day');
            var d = day.day();
            var i = 0;
            for (i = 0; i < this.data.length; i++) {
                var reg = this.data[i];
                if (parseInt(reg.dia) === d) {
                    var first = moment(day.format("YYYY-MM-DD") + " " + reg.inicio, "YYYY-MM-DD HH:mm:ss");
                    var last = moment(day.format("YY YY-MM-DD") + " " + reg.fin, "YYYY-MM-DD HH:mm:ss");
                    var item = this.obtainHours(first, last, step);
                    var m = 0;
                    for (m = 0; m < item.length; m++)
                    {
                        fechas.push(item[m]);
                    }
                }
            }
        }
        return fechas;
    }
}
