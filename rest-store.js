const express = require('express');

class RestStore {
	constructor(dbStore) {
	    this.dbStore = dbStore;
	    this.router = express.Router();
	}

	logger(req, res, next) {
	    console.log('Time: ', Date.now());
	    next();
	}

	find(req, res) {
	   console.log(req);
	   this.dbStore.findEvent(req.body,0,10).then((results) => {
	   	res.json(results);	
	   }).catch((err) => {
		res.status(500).json({error: err});
	   });
		
	}

	getRouter() {
	   this.router.use(this.logger);
	   this.router.post('/find', (req,res) => this.find(req, res));
	   return this.router;
	}
}

module.exports = RestStore;
