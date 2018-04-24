const crypto = require('crypto');
const Hash = {}

Hash.sha1 = function(buf) {
  return crypto.createHash('sha1').update(buf).digest();
};

Hash.sha1.blocksize = 512;

Hash.sha256 = function(buf) {
  return crypto.createHash('sha256').update(buf).digest();
};

Hash.sha256.blocksize = 512;

Hash.sha256sha256 = function(buf) {
  return Hash.sha256(Hash.sha256(buf));
};

Hash.ripemd160 = function(buf) {
  return crypto.createHash('ripemd160').update(buf).digest();
};

Hash.sha256ripemd160 = function(buf) {
  return Hash.ripemd160(Hash.sha256(buf));
};

Hash.sha512 = function(buf) {
  return crypto.createHash('sha512').update(buf).digest();
};

Hash.sha512.blocksize = 1024;

Hash.hmac = function(hashf, data, key) {

  let blocksize = hashf.blocksize / 8;

  if (key.length > blocksize) {
    key = hashf(key);
  } else if (key < blocksize) {
    let fill = Buffer.alloc(blocksize);
    fill.fill(0);
    key.copy(fill);
    key = fill;
  }

  let o_key = Buffer.alloc(blocksize);
  o_key.fill(0x5c);

  let i_key = Buffer.alloc(blocksize);
  i_key.fill(0x36);

  let o_key_pad = Buffer.alloc(blocksize);
  let i_key_pad = Buffer.alloc(blocksize);
  for (let i = 0; i < blocksize; i++) {
    o_key_pad[i] = o_key[i] ^ key[i];
    i_key_pad[i] = i_key[i] ^ key[i];
  }

  return hashf(Buffer.concat([o_key_pad, hashf(Buffer.concat([i_key_pad, data]))]));
};

Hash.sha256hmac = function(data, key) {
  return Hash.hmac(Hash.sha256, data, key);
};

Hash.sha512hmac = function(data, key) {
  return Hash.hmac(Hash.sha512, data, key);
};

function generateKeys(privateKey){
    const ecdh = crypto.createECDH('secp256k1');
    if(privateKey){
        ecdh.setPrivateKey(privateKey,'hex')
    }else{
        ecdh.generateKeys();
    }
    return {
        privateKey:ecdh.getPrivateKey('hex'),
        publicKey:ecdh.getPublicKey('hex')
    }
}
function hex2base64(v){
    const ecdh = crypto.createECDH('secp256k1');
    ecdh.setPrivateKey(v,'hex')
    return ecdh.getPrivateKey('base64');
}
function sign(secret){

}
module.exports = {
    Hash,
    generateKeys,
    hex2base64
}