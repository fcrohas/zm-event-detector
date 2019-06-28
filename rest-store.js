const express = require('express');

class RestStore extends express.Router {
	constructor() {
		super();
		this.use(function timeLog(req, res, next) {
		  console.log('Time: ', Date.now());
		  next();
		});
		this.get('/find', RestStore.find);
	}

	find(request, response) {
		
	}
}

module.exports = RestStore;
