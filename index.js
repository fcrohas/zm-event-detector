const TriggerManager = require('./trigger-manager');
const Detector = require('./detector');
const ZmApi = require('./zm-api');

const fs = require('fs')
// Prepare
const config = JSON.parse(fs.readFileSync("./config.json", 'utf8'))

//const detector = new Detector();
const triggerManager = new TriggerManager(config);
const zmApi = new ZmApi(config);

// Login before start
zmApi.login().then(
		(login) => {
			return zmApi.getEvent(34);
	}).then(
		(event) => {
			for(const frame of event.Frame) {
				zmApi.getFrame(frame.EventId,frame.FrameId).then((image) => {
					fs.writeFile('/tmp/test_'+frame.EventId+'_'+frame.FrameId+'.jpg', image, 'binary', function(err){});
				}).catch((error) => {
					console.log(error);
				});
			};
	}).catch((error) => {
		console.error(error);
	});


