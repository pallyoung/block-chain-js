const Hash = require('./../utils/crypto').Hash;
const Buffer = require('./../utils/buffer');
const crypto = require('./../utils/crypto');

const CODE = [
    '2','3','4','5','6','7','8','9',
    'a','b','c','d','e','f','g','h',
    'i', 'j','k', 'm','n','p','q','r',
    's','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H',
    'J','K','L','M','N','P','Q','R',
    'S','T', 'U','V','W','X','Y','Z'
];

function parse(address){

}
function stringify(alias,balance){

}
function fromPublicKey(pubkey){
    let bufferWriter = Buffer.createWriter();
    let sha256ripemd160 = Hash.sha256ripemd160(pubkey).toString('hex');
    let v = '00'+sha256ripemd160;
    let sha256256 = Hash.sha256sha256(v);
    let v8 = sha256256.slice(0,8).toString('hex');
    let v9 = sha256ripemd160+v8;
    return crypto.hex2base64(v9);

}
module.exports = {
    parse,
    stringify,
    fromPublicKey
}