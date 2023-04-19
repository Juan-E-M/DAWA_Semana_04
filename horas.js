function horas() {
    // Obtener la hora actual en formato de 12 horas
    const date = new Date();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours %= 12;
    hours = hours || 12;
    const formattedTime12 = `${hours}:${
      minutes < 10 ? "0" + minutes : minutes
    } ${ampm}`;
  
    // Obtener la hora actual en formato de 24 horas
    const formattedTime24 = `${date.getHours()}:${
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    }`;
  
    return{
      hora12: formattedTime12,
      hora24: formattedTime24
    }
  }
  
  module.exports.horas= horas()