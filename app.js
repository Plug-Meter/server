var express = require('express'),
    app = express(),
    request = require('request');

var loadTimeout;
var interval = 15*1000;
var IPPlugMeter = '10.10.11.144';
var rede = 127.0;
var precokWh = 0.71;
var status;

 app.get('/custo_estimado', function(req, res){
 	console.log("REQUEST: " + req.method + " " + req.url);
    request('http://' + IPPlugMeter + '/current', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	var current = parseFloat(body);
	  	var custo_estimado = 0;
	  	if (!isNaN(current)) {
	  		var potencia = rede * current;
	  		custo_estimado = (potencia / 1000) * precokWh;
	  	} else {
	  		custo_estimado = "ERRO LEITURA";
	  	}
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

 function getStatus() {
 	request('http://' + IPPlugMeter + "/", function (error, response, body) {
    	clearInterval(loadTimeout);
 		if (!error && response.statusCode == 200) {
	    	status = JSON.parse(body);
	    	console.log(status.corrente);
	    	loadTimeout = setTimeout(function(){ 
	    		getStatus();
	    	}, interval);
		} else {
			getStatus();
		} 	    
    });
 }

var server = app.listen(80);
console.log('Servidor Express iniciado na porta %s', server.address().port);
getStatus();