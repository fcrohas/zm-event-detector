const net = require('net');

class TriggerManager {

	constructor(config) {
		this.config = config;
		this.zm = net.connect(config.zmTriggerPort, config.zmIP);
		this.zm.on('error', this.onError);
		this.zm.on('data', this.onData);
	}

	onError(ex) {
		console.log('Connection to Zoneminder error ', ex);
	}

	onData(data) {
		console.log(data.toString('utf8'));
		const datas = data.toString('utf8').split('|');
		const monitorId = datas[0];
		const status = datas[1];
		const timestamp = datas[2];
		const eventId = datas[3];
		console.log('monitorId=',monitorId, 'status=',status, 'timestamp=',new Date(timestamp), 'eventId=', eventId);

	}
}

module.exports = TriggerManager;