const { Darknet } = require('darknet');
const decode = require('image-decode');
const fs = require('fs');

class Detector {
	constructor() {
		const names = fs.readFileSync('./darknet/coco.names', 'utf8')
		// Init
		this.darknet = new Darknet({
		    weights: './darknet/yolov3-tiny.weights',
		    config: './darknet/yolov3-tiny.cfg',
		    names: names.split('\n')
		});
	}

	detect(image) {
		// Detect
		const decoded = decode(image);
		const img = {b:decoded.data, h: decoded.height, w: decoded.width, c: 4};
		return this.darknet.detect(img,{thresh:0.1, hier_thresh:0.4, nms:0.5});
	}
}

module.exports = Detector;
