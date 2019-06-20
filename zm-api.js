const axios = require('axios');
const jsonic = require('jsonic')

class ZmApi {

	constructor(config) {
		this.config = config;
		this.zmLogin = {};
		this.baseApi = 'http://'+this.config.zmIP+':'+this.config.zmApiPort+'/zm/api';
		this.zmBase = 'http://'+this.config.zmIP+':'+this.config.zmApiPort+'/zm';
	}

	login() {
		return new Promise((resolve, reject) => { 
			axios.post(this.baseApi + '/host/login.json','user='+this.config.user+'&pass='+this.config.password).then((res) => {
				this.zmLogin = jsonic(res.data);
				console.log('zm version=', this.zmLogin.version,'api version=', this.zmLogin.apiversion);
				resolve(this.zmLogin);
			}).catch((error) => {
				reject(error);
			});
		});
	}

	getEvent(number) {
		return new Promise((resolve, reject) => { 
			axios.get(this.baseApi + '/events/'+number+'.json?'+this.zmLogin.credentials).then((res) => {
				const events = jsonic(res.data);
				//console.log('Event=', events.event.Frame[0]);
				resolve(events.event);
			})
			.catch((error) => {
				reject(error);
			});
		});
	}

	getFrame(eventId, frameId) {
		return new Promise((resolve, reject) => { 
			console.log(this.zmBase + '/index.php?view=image&fid='+frameId+'&eid='+eventId+'&show=capture&auth='+this.zmLogin.credentials);
			// axios.get(this.zmBase + '/index.php?view=image&fid='+frameId+'&eid='+eventId+'&show=capture&auth='+this.zmLogin.credentials).then((res) => {
			// 	resolve(res.data);
			// })
			// .catch((error) => {
			// 	reject(error);
			// });
		});
	}
}

module.exports = ZmApi;