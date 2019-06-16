const Darknet = require('darknet').Darknet;
const fs = require('fs');

class Detector {
	constructor() {
		const names = fs.readFileSync('./darknet/coco.names', 'utf8')
		// Init
		this.darknet = new Darknet({
		    weights: './darknet/yolov3-tiny.weights',
		    config: './darknet/yolov3-tiny.cfg',
		    names: names.split('\r\n')
		});
	}

	detect(image) {
		// Detect
		console.log(darknet.detect(image));
	}
}

module.exports = Detector;