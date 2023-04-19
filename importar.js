var http = require('http'),
    fs = require('fs');
    parser = require('./parser_var.js'),
    horas1 = require('./horas.js'),
    diasFaltantes = require('./diasFaltantes.js')
    p = parser.parse_vars;
    datos = parser.batman;
    formatos = horas1.horas;

http.createServer(function(req, res) {
    fs.readFile('./form.html', function(err, html){
        var html_string= html.toString();

        var respuesta = p(req),
        parametros = respuesta['parametros'],
        valores =respuesta['valores'];

        for(var i=0; i<parametros.length; i++){
            var html_string = html_string.replace('{'+parametros[i]+'}', valores[i]);
            if (parametros[i] == 'fecha'){
                var cantidad = diasFaltantes.diasFaltantes(valores[i])
                html_string = html_string.replace('{diasFaltantes}',cantidad.diasFaltantes)
            }
        }

        html_string = html_string.replace('{identidad}', datos.identidad);
        html_string = html_string.replace('{poder}', datos.poder);
        html_string = html_string.replace('{hora12}', formatos.hora12);
        html_string = html_string.replace('{hora24}', formatos.hora24);

        res.writeHead(200, {'Content-type': 'text'});
        res.write(html_string);
        res.end();

    });
}).listen(8080);