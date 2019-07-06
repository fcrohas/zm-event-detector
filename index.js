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
