var express = require('express'),
    app = express(),
    request = require('request');


 app.get('/', function(req, res){
    request('http://www.google.com', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.send(body); 
	  }
	});
  });


var server = app.listen(80);
console.log('Servidor Express iniciado na porta %s', server.address().port);