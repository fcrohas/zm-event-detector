const TriggerManager = require('./trigger-manager');
const Detector = require('./detector');
const ZmApi = require('./zm-api');

const fs = require('fs');
const Path = require('path');
// Prepare
const config = JSON.parse(fs.readFileSync("./config.json", 'utf8'))

const detector = new Detector();
const triggerManager = new TriggerManager(config);
const zmApi = new ZmApi(config);

// Login before start
zmApi.login().then(
		(login) => {
	   	        return zmApi.getEvent(75);
	}).then(
		(event) => {
			for(const frame of event.Frame) {
				zmApi.getFrame(frame.EventId,frame.FrameId).then((image) => {
					detector.detect(image);
				}).catch((error) => {
					console.log(error);
				});
			};
	}).catch((error) => {
		console.error(error);
	});


