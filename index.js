const TriggerManager = require('./trigger-manager');
const Detector = require('./detector');
const ZmApi = require('./zm-api');
const Store = require('./store');
const ImageProcessor = require('./image-processor');
const WebServer = require('./web-server');

const fs = require('fs');
const Path = require('path');
// Prepare
const config = JSON.parse(fs.readFileSync("./config.json", 'utf8'))
const imageProcessor = new ImageProcessor();
const detector = new Detector(imageProcessor);
const zmApi = new ZmApi(config);
const store = new Store(config);
const webServer = new WebServer(config,store);

const triggerManager = new TriggerManager(config, 
							{ api: zmApi, 
							  detector: detector,
							  store: store });

// Connect to store then serve page
store.connect().then((client) => {
	return triggerManager.connect();
}).then(() => {
	return zmApi.login();
}).then(() => {
	webServer.listen();
}).catch((err) => {
	console.log('Stop with error :', err);
});
// Login before start
/*.then(
		(login) => {
			return store.connect();
	}).then(
		(client) => {
	   	        return zmApi.getEvent(34);
	}).then(
		(event) => {
			for(const frame of event.Frame) {
				zmApi.getFrame(frame.EventId,frame.FrameId).then((image) => {
					const events = detector.detect(image);
			           	// maps events with id
           				let count = 0;
           				const objects = events.map( obj => {
						return new Promise((resolve, reject) => {
				                	obj._id = frame.EventId + '_' + frame.FrameId + '_' + count;
				                	count++;
				                	obj.eventId = frame.EventId;
				                	obj.frameId = frame.FrameId;
							imageProcessor.crop(image, obj.box).then((data) => {
							   obj.img = data;
							   resolve(obj);
							}).catch((err)=> {
							   reject(err);
							});
						});
				        });
					
					Promise.all(objects).then((results) => {
					  store.addEvents(results).then((result) => {
					     console.log(result);
					  }).catch((err) => {
					     console.log(err);
					  });
					}).catch((err) => {
					  console.log(err);
					});
				}).catch((error) => {
					console.log(error);
				});
			};
	}).catch((error) => {
		console.error(error);
	});
*/

