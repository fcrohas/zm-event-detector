const express = require('express');
const RestStore = require('./rest-store');

class WebServer {
	constructor(config) {
		this.app = express();
		this.config = config;
		this.store = new RestStore();
		this.app.use('/store', this.store);
	}

	listen() {
		this.app.listen(this.config.httpPort, function () {
			console.log('Example app listening on port 3000!')
		});
	}
}

module.exports = WebServer;
