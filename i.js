const stratum = require('stratum');
const client = stratum.Client.$create();
const notify = require('./notify');

client.on('error', function(socket, err){
	socket.destroy();
	console.log('Connection closed with error: ', err);
	process.exit(1);
});
client.on('mining.error', function(msg, socket){
	console.log(msg);
});

let difficulty = 1;
let nonce1 = '';
let nonceLength = 4;

client.on('mining', function(data, socket, type){
	switch (data.method) {
		case 'set_difficulty':
			difficulty = data.params;
			break;
		case 'notify':
			const result = notify(data.params, nonce1, difficulty);
			socket.stratumSubmit(...result);
			break;
		default:
			if (!socket.authorized){
				console.log('Asking for authorization');
				socket.stratumAuthorize('mikhailrojo','654321qq');
			} else {
				console.log('We are authorized');
				if (Array.isArray(data.result)) {
					nonce1 = data.result[1];
					nonceLength = data.result[2];
				}
			}
	}
});

client.connect({
	host: 'stratum.slushpool.com',
	port: 3333
}).then(function (socket){

	socket.stratumSubscribe().then(
		function(socket){
			console.log('Start!');
		},
		function(error){
			console.log('Error');
			console.log(error);
		}
	);
});

// https://slushpool.com/help/topic/stratum-protocol/