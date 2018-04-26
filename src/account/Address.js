const Hash = require('./../utils/crypto').Hash;
const Buffer = require('./../utils/buffer');
const crypto = require('./../utils/crypto');

const CODE = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

function to58(v) {
    let r = [];

}
function parse(address) {

}
function stringify(alias, balance) {

}
function fromPublicKey(pubkey) {
    let bufferWriter = Buffer.createWriter();
    let sha256ripemd160 = Hash.sha256ripemd160(pubkey).toString('hex');
    let v = '00' + sha256ripemd160;
    let sha256256 = Hash.sha256sha256(v);
    let v8 = sha256256.slice(0, 8).toString('hex');
    let v9 = sha256ripemd160 + v8;
    let i = parseInt(v9, 16) * 10;
    let address = '';
    while (i !== 0) {
        address = CODE[i % 58] + address;
        i = Math.floor(i / 58);
    }
    return address;



}
module.exports = {
    parse,
    stringify,
    fromPublicKey
}