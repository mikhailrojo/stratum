const MerkleTree = require('m-tree');
//const {sha256} = require('js-sha256');
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

module.exports = {
	getMerkleRoot,
	doubleSha,
	changeEndianness
};
