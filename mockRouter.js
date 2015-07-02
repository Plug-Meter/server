module.exports = {
	meterTimeout: 5000,
	IPPlugMeter: '10.10.11.144',
	fakeRelayStatus: 'ON',
	fakeCustoEstimado: 1.50,
	fakeCorrente: 0.5,
	fakeStatus: function() {
		return '{ "corrente": ' + this.fakeCorrente + ', "rele": "' + this.fakeRelayStatus + '" }'
	},

	forwardGet: function(req, res) {
		if (req.url === '/') {
			res.send(this.fakeStatus());
		}
		else if (req.url === '/current') {
			res.send('' + this.fakeCorrente);
		}
		else if (req.url === '/relay') {
			res.send(this.fakeRelayStatus);
		}
		else {
			res.statusCode = 404;
			res.send('');
		}
	},

	forwardPost: function(req, res) {
		if (req.url === '/on') {
			this.fakeRelayStatus = 'ON';
			res.send(this.fakeRelayStatus);
		}
		else if (req.url === '/off') {
			this.fakeRelayStatus = 'OFF';
			res.send(this.fakeRelayStatus);
		}
		else {
			res.statusCode = 404;
			res.send('');
		}
	},

	getCustoEstimado: function(req, res) {
		res.send('' + this.fakeCustoEstimado);
	},

	getStatus: function(callback) {
		callback(null, { statusCode: 200 }, this.fakeStatus());
	}
};