const express = require('express');
const RestStore = require('./rest-store');

class WebServer {
	constructor(config,store) {
		this.app = express();
		this.config = config;
		this.store = new RestStore(store);
		this.app.use('/store', this.store.getRouter());
	}

	listen() {
		this.app.listen(this.config.httpPort, () => {
			console.log('Listening on port '+this.config.httpPort+'!')
		});
	}
}

module.exports = WebServer;
