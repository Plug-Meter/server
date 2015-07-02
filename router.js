var request = require('request');

module.exports = {
	meterTimeout: 5000,
	ip: '10.10.11.144',

	forwardGet: function(req, res) {
		request({ url: 'http://' + this.ip + req.url, timeout: this.meterTimeout }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.send(body); 
			}
			else if (!error && response.statusCode != 200) {
				res.send('Error ' + response.statusCode);
			}
			else {
				res.send(error);
			}
		});
	},

	forwardPost: function(req, res) {
		request.post({ url: 'http://' + this.ip + req.url, timeout: this.meterTimeout }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				res.send(body); 
			}
			else if (!error && response.statusCode != 200) {
				res.send('Error ' + response.statusCode);
			}
			else {
				res.send(error);
			}
		});
	},

	getCustoEstimado: function(req, res) {
		request({ url: 'http://' + this.ip + '/current', timeout: this.meterTimeout }, function (error, response, body) {
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
				res.send(error);
			}
		});
	},

	getStatus: function(callback) {
		request({ url: 'http://' + this.ip + "/", timeout: this.meterTimeout }, callback);
	}
};