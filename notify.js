const {
	getMerkleRoot,
	doubleSha,
	changeEndianness,
	convertBitconHexDifficultyToDecimal
} = require('./helper');

module.exports = function (data, difficulty, extraNonce1) {
	cl(data);
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

	let merkle = getMerkleRoot(merklebranch);

	const nonce = '00000000';
	const header = version
		+ previousBlockHash
		+ merkle
		+ ntime
		+ nbits
		+ nonce;

	let result = parseInt(`0x${doubleSha(header)}`);
	const difficultyNumber = parseInt(`0x${nbits}`);
	const targetNumber = convertBitconHexDifficultyToDecimal(difficultyNumber)
	cl('Target  => ' + targetNumber);
	cl('result  => ' + result);


	while (result > target)  {
		result = parseInt(`0x${doubleSha(header + 1)}`);
		cl('Result => ' + result );
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
