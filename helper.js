const MerkleTree = require('m-tree');
const shaLib = require('sha.js');

const sha256 = (data) => shaLib('sha256').update(data).digest();
const doubleSha = (data) => {
	const first = shaLib('sha256').update(data).digest();
	return shaLib('sha256').update(first).digest('hex');
};
const buildTree = (arr) => new MerkleTree(arr.map(i => Buffer.from(i, 'hex')), sha256, {isBitcoinTree: true});
const getMerkleRoot = (arr) => buildTree(arr).getRoot().toString('hex');
const changeEndianness = (string) => {
	const result = [];
	let len = string.length - 2;
	while (len >= 0) {
		result.push(string.substr(len, 2));
		len -= 2;
	}
	return result.join('');
};

// '18009645'
const convertBitconHexDifficultyToDecimal = (difficulty) => {
	const first2bits = difficulty >> 24;
	const lastBits = difficulty & 0x00ffffff;
	const powInt = first2bits - 3;

	return lastBits * 256 ** powInt;
}

const convertToHex = (number) => number.toString(16);


module.exports = {
	getMerkleRoot,
	doubleSha,
	changeEndianness,
	convertBitconHexDifficultyToDecimal
};
