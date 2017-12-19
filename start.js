const notify = require('./notify');
let difficulty = 1;
let extraNonce1 = '';
let nonceLength = 4;
let isAuthorized = false;

module.exports = function (data) {
	const {method, result, id, error, params} = data;
	if (id === 1 && !error) { // first msg with extranonce1
		extraNonce1 = result[1];
		nonceLength = result[2];
	}
	if (!error && id === 2 && result) { // we are authorized
		isAuthorized = true;
	}
	switch (method) {
		case 'mining.set_difficulty': {
			difficulty = params[0];
			break;
		}
		case 'mining.notify': {
			const notifyMe = notify(params, difficulty, extraNonce1);
			cl(notifyMe); // [ 'mikhailrojo', '129d7f', '00000000', '5a391363', '00000000' ]
			break;
		}
	}
}