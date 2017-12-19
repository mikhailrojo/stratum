const version = '00000001';
const previousHash = '0000000000000000000000000000000000000000000000000000000000000000';
const merkle = '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b';
const time = 1231006505;
const difficulty = '1d00ffff';
const nonce = 2083236893;

const full = '0100000000000000000000000000000000000000000000000000000000000000000000003ba3edfd7a7b12b27ac72c3e67768f617fc81bc3888a51323a9fb8aa4b1e5e4a29ab5f49ffff001d1dac2b7c0101000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4d04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73ffffffff0100f2052a01000000434104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac00000000';

// Правильно считать difficulty!
const changeEndianness = (string) => {
        const result = [];
        let len = string.length - 2; // 'AA00FF1234';
        while (len >= 0) {
          result.push(string.substr(len, 2));
          len -=2;
        }
        return result.join('');
  
}
const convertToHex = (number) => number.toString(16);

const convertBitconHexToDecimal = (difficulty) => {
  const first2bits = difficulty >> 24;
  const lastBits = difficulty & 0x00ffffff;
  const powInt = first2bits - 3;

  return lastBits * 256 ** powInt;
}



const version1 = changeEndianness(version);
const merkle1 = changeEndianness(merkle);
const time1 = changeEndianness(convertToHex(time));
const difficulty1 = changeEndianness(difficulty);
const nonce1 = changeEndianness(convertToHex(nonce));

const result = version1 + previousHash + merkle1 + time1 + difficulty1 + nonce1;
console.log(result);
console.log(full);


