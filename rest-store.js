const express = require('express');
const morgan = require('morgan');

class RestStore {
	constructor(dbStore) {
	    this.dbStore = dbStore;
	    this.router = express.Router();
	}

	logger() {
		return morgan('combined');
	}

	findEvent(req, res) {
	   const filter = req.body;
	   this.dbStore.findEvent(filter.query, filter.start, filter.count).then((results) => {
	   	res.json(results);	
	   }).catch((err) => {
		res.status(500).json({error: err});
	   });
	}

	lastEvent(req, res) {
	   this.dbStore.getLastEvent().then((results) => {
	   	res.json(results);	
	   }).catch((err) => {
		res.status(500).json({error: err});
	   });
	}

	getRouter() {
		this.router.use(this.logger());
		this.router.post('/find', (req,res) => this.findEvent(req, res));
		this.router.post('/last', (req,res) => this.lastEvent(req, res));
		return this.router;
	}
}

module.exports = RestStore;
