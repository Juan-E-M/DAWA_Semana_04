var http = require('http'),
    fs = require('fs');
var parser = require('./parser_var.js'),
    horas1 = require('./horas.js'),
    diasFaltantes = require('./diasFaltantes.js');
var p = parser.parse_vars;
var datos = parser.batman;
var formatos = horas1.horas;

var rutas = {
    '/inicio': 'inicio.html',
    '/galeria': 'fotos.html',
    '/': 'form.html'
};

http.createServer(function(req, res) {
    var ruta = req.url;

    if (ruta in rutas) {
        var archivo = rutas[ruta];
        fs.readFile('./' + archivo, function(err, html) {
            if (err) {
                throw err;
            }

            var html_string = html.toString();

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

            res.writeHead(200, {'Content-type': 'text/html'});
            res.write(html_string);
            res.end();
        });
    } else {
        res.writeHead(404, {'Content-type': 'text/plain'});
        res.write('Error 404: Archivo no encontrado');
        res.end();
    }
}).listen(8080);
