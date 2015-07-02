module.exports = {
	meterTimeout: 5000,
	IPPlugMeter: '10.10.11.144',

	forwardGet: function(req, res) {
		res.send("Fake get response!");
	},

	forwardPost: function(req, res) {
		res.send("Fake post response!");
	},

	getCustoEstimado: function(req, res) {
		res.send("0.50");
	},

	getStatus: function(callback) {
		callback(null, { statusCode: 200 }, '{ "corrente": 0.05 }');
	}
};