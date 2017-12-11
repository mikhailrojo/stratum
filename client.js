const s = require('net').Socket();
const cl = console.log;

s.connect(3333, 'stratum.slushpool.com', () => {
	s.write('{"id": 1, "method": "mining.subscribe", "params": []}\n');
});

s.on('data', function(data){
	try {
		const msgString = data.toString();
		const msg = msgString.split('\n')
		// const msg = JSON.parse(msgString);
		 cl(msg);
	}
	catch (e) {
		cl(e);
	}
});

