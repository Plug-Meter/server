var express = require('express'),
    app = express(),
    request = require('request');

var IPPlugMeter = '10.10.11.144';
var rede = 127.0;
var precokWh = 0.71;

 app.get('/custo_estimado', function(req, res){
 	console.log("REQUEST: " + req.method + " " + req.url);
    request('http://' + IPPlugMeter + '/current', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var current = parseFloat(body);
	  	var potencia = rede * current;
	  	var custo_estimado = (potencia / 1000) * precokWh;
	    res.send("" + custo_estimado);
	  }
	  else if (!error && response.statusCode != 200) {
	  	res.send('Error ' + response.statusCode);
	  }
	  else {
	  	res.send('Error' + error);
	  }
	});
  });

 app.get('/*', function(req, res){
 	console.log("REQUEST: " + req.method + " " + req.url);
    request('http://' + IPPlugMeter + req.url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.send(body); 
	  }
	  else if (!error && response.statusCode != 200) {
	  	res.send('Error ' + response.statusCode);
	  }
	  else {
	  	res.send('Error ' + error);
	  }
	});
  });

 app.post('/*', function(req, res){
 	console.log("REQUEST: " + req.method + " " + req.url);
    request.post('http://' + IPPlugMeter + req.url, function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.send(body); 
	  }
	  else if (!error && response.statusCode != 200) {
	  	res.send('Error ' + response.statusCode);
	  }
	  else {
	  	res.send('Error ' + error);
	  }
	});
  });

var server = app.listen(80);
console.log('Servidor Express iniciado na porta %s', server.address().port);