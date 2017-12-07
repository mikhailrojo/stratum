const sha256 = require('sha256');

module.exports = function (data, difficulty, extraNonce1) {
	[
		jobId,
		previousBlockHash,
		coinb1,
		coinb2,
		merklebranch,
		version,
		nbits,
		ntime,
		cleanJob
	] = data;

	const target = nbits;
	const extraNonce2 = '00000000';
	const coinbaseHash = coinb1
		+ extraNonce1
		+ extraNonce2
		+ coinb2;

	let merkle = createMerkleTree(coinbaseHash, merklebranch);

	//version + prevhash + merkle_root + ntime + nbits + '00000000' +
	// '000000800000000000000000000000000000000000000000000000000000000000000000000000000000000080020000'
	const nonce = '00000000';
	const header = version
		+ previousBlockHash
		+ merkle
		+ ntime
		+ nbits
		+ nonce
		+ '000000800000000000000000000000000000000000000000000000000000000000000000000000000000000080020000';

	let result = doubleSha(header);
	while (result > target)  {
		result = doubleSha(header + 1);
	}


	// login, jobid, extranonce2, ntime, nonce
	return [
		"mikhailrojo",
		jobId,
		extraNonce2,
		ntime,
		nonce
	]
};

function createMerkleTree(coinbase, arr) {
	for (var i = 0, len = arr.length; i < len; i ++) {
		const hex = new Buffer(coinbase + arr[i], 'hex');
		coinbase = sha256(sha256(hex));
	}
	return changeEndianness(coinbase.toString(16));
}

function doubleSha(string) {
	const firstSha = sha256(new Buffer(string, 'hex')).digest();
	return sha256(firstSha).digest();
}

function changeEndianness(string) {
	return string;
}