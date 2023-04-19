function diasFaltantes(fecha) {
    // Convertir el argumento a fecha
    fecha = new Date(fecha);
    var rpta = {}

    var hoy = new Date();
    var diferencia = fecha.getTime() - hoy.getTime();
    var dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  
    // Verificar si la fecha ya pasó o es hoy
    if (dias < 0) {
      rpta.diasFaltantes = 'La fecha ya pasó';
    } else {
      rpta.diasFaltantes = dias;
    }
    return rpta
}
  
module.exports.diasFaltantes= diasFaltantes