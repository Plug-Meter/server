var express = require('express'),
    app = express(),
    request = require('request');


 app.get('/*', function(req, res){
 	console.log("REQUEST: " + req.method + " " + req.url);
    request('http://10.10.11.144' + req.url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.send(body); 
	  }
	});
  });

 app.post('/*', function(req, res){
 	console.log("REQUEST: " + req.method + " " + req.url);
    request.post('http://10.10.11.144' + req.url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.send(body); 
	  }
	});
  });

var server = app.listen(80);
console.log('Servidor Express iniciado na porta %s', server.address().port);