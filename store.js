const MongoClient = require('mongodb').MongoClient;

class Store {
   constructor(config) {
      this.config = config;
      this.url = this.config.mongoUrl;
   }

   connect() {
      return new Promise( (resolve, reject) => {
        MongoClient.connect( this.url, { useNewUrlParser: true }).then( (client) => {
	   this.db = client;
	   resolve(client);
	   console.log('Connected to database');
        }).catch((err) => {
	   reject(err);
	   console.log('Not connected to database:', err);
	});
      }); 
   }

   close() {
      if (this.db) {
	 this.db.close();
      }
   }

   addEvents(objects) {
      return new Promise( (resolve, reject) => {
	if (this.db) {
	   const eventCollection = this.db.collection('events');
	   eventCollection.insertMany(objects, (err, result) => {
	     if(!err) {
	   	console.log('events inserted');
		resolve(result);
		eventCollection.save();
	     } else {
		reject(err);
	     }
	   });
	} else {
	  reject('Not connected');
	}
      });
   }

}

module.exports = Store;
