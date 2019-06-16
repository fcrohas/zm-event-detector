const TriggerManager = require('./trigger-manager');
const Detector = require('./detector');
const fs = require('fs')
// Prepare
const config = JSON.parse(fs.readFileSync("./config.json", 'utf8'))

const detector = new Detector();
const triggerManager = new TriggerManager(config.zmIP, config.zmPort);

