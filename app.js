var express = require('express');
var app = express();

var port;
var router;

if (process.argv.indexOf('--production') > -1) {
	port = 80;
}
else {
	port = 3000;
}

if (process.argv.indexOf('--mock') > -1) {
	router = require('./mockRouter');
	console.log("Iniciando servidor em modo mock");
}
else {
	router = require('./router');
	console.log("Iniciando servidor com Plug Meter no host " + router.ip);
}

var loadTimeout;
var interval = 15*1000;
var rede = 127.0;
var precokWh = 0.71;
var status;

app.get('/', function(req, res) {
	// TODO: Status server, status plug meter
	res.send('Server is up');
});

app.get('/custo_estimado', function(req, res){
	console.log("REQUEST: " + req.method + " " + req.url);
	router.getCustoEstimado(req, res);
});

app.get('/*', function(req, res){
	console.log("REQUEST: " + req.method + " " + req.url);
	router.forwardGet(req, res);
});

app.post('/*', function(req, res){
	console.log("REQUEST: " + req.method + " " + req.url);
	router.forwardPost(req, res);
});

function getStatus() {
	router.getStatus(function (error, response, body) {
		clearInterval(loadTimeout);
		if (!error && response.statusCode == 200) {
			status = JSON.parse(body);
			console.log(status.corrente);
			loadTimeout = setTimeout(function(){ 
				getStatus();
			}, interval);
		} else {
			console.log("getStatus failed. " + error + ". Trying again...");
			getStatus();
		} 	    
	});
}

var server = app.listen(port);
console.log('Servidor Plug Meter iniciado na porta %s', port);
getStatus();