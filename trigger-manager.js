const net = require('net');
const axios = require('axios');
const jsonic = require('jsonic')

class TriggerManager {

	constructor(config) {
		this.config = config;
		this.zm = net.connect(config.zmTriggerPort, config.zmIP);
		this.zm.on('error', this.onError);
		this.zm.on('data', this.onData);
		this.zmLogin = {};
		this.baseApi = 'http://'+this.config.zmIP+':'+this.config.zmApiPort+'/zm/api';
	}

	login(callback) {
		return axios.post(this.baseApi + '/host/login.json','user='+this.config.user+'&pass='+this.config.password).then((res) => {
			this.zmLogin = jsonic(res.data);
			console.log('zm version=', this.zmLogin.version,'api version=', this.zmLogin.apiversion);
			callback();
		}).catch((error) => {
			console.error(error);
		});
	}

	getEvent(number) {
		axios.get(this.baseApi + '/events/'+number+'.json?'+this.zmLogin.credentials).then((res) => {
			const event = jsonic(res.data);
			console.log('Event=', event.event.Frame[0]);
		})
		.catch((error) => {
			console.error(error);
		});
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