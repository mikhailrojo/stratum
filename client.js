const s = require('net').Socket()
const startCalculation = require('./start')
const cl = console.log

s.connect(3333, 'stratum.slushpool.com', () => {
	s.write('{"id": 1, "method": "mining.subscribe", "params": []}\n', function () {
		s.write('{"params": ["kens_1", "password"], "id": 2, "method": "mining.authorize"}\n', () => {
			cl('after authrization')
		})

	})
})

s.on('data', function (data) {
	const msgString = data.toString()
	const msgArr = msgString.split('\n').map(i => {
		try {
			return JSON.parse(i)
		} catch (e) {
			return null
		}
	}).filter(i => i)

})

function processResponse (arr) {
	arr.forEach(msg => {
		startCalculation(msg)
	});
}