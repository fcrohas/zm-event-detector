const net = require('net');

class TriggerManager {

	constructor(config, context) {
		this.config = config;
		this.connected = false;
		this.context = context;
		this.states = [];
	}

	connect() {
		return new Promise( (resolve, reject) => {
			this.zm = net.connect(this.config.zmTriggerPort, this.config.zmIP, () => {
				this.connected = true;
				resolve();
			});
			this.zm.on('error', (ex) => {
				if (!this.connected) {
					reject();
				} else {
					console.log('Connection to Zoneminder error ', ex);
				}
			});
			this.zm.on('data', (data) => this.onData(data));
		});
	}

	onData(data) {
		console.log(data.toString('utf8'));
		const datas = data.toString('utf8').split('|');
		const monitorId = datas[0];
		const status = datas[1];
		const timestamp = datas[2];
		const eventId = datas[3];
		console.log('monitorId=',monitorId, 'status=',status, 'timestamp=',new Date(timestamp), 'eventId=', eventId);
		if (this.states[eventId] == undefined) {
			this.states[eventId] = status;
		} else if (this.states[eventId] != status ) {
			this.context.api.getEvent(eventId).then((event) => this.processFrames(event, timestamp));
			this.states[eventId] = status;
		}
	}

	processFrames( event, timestamp) {
		const filtered = event.Frame.filter( f => f.Type == 'Alarm');
		for(const frame of filtered) {
			this.context.api.getFrame(frame.EventId,frame.FrameId).then((image) => {
				const eventObjects = this.context.detector.detect(image);
	           		// maps events with id
   				const objects = this.context.detector.processObjects(image, eventObjects, timestamp, frame);
				Promise.all(objects).then((results) => {
				  this.context.store.addEvents(results).then((result) => {
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
	}
}

module.exports = TriggerManager;
