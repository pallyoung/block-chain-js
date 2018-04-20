'use strict'

const crypto = require('./../utils/crypto');

const buffer = require('./../utils/buffer');
 
const Hash = crypto.Hash;
class BlockHeader {
    constructor(info) {
        this.version = info.version;
        this.prevHash = info.prevHash;
        this.merkleRoot = info.merkleRoot;
        this.time = info.time;
        this.timestamp = info.time;
        this.bits = info.bits;
        this.nonce = info.nonce;
        if(info.hash!==this.hash){
            throw new Error('invalid block');
        }
    }
    get hash() {
        return Hash.sha256sha256(this.toBuffer());
    }
    toObject() {
        return {
            version: this.version,
            prevHash: this.prevHash,
            merkleRoot: this.merkleRoot,
            hash: this.hash,
            time: this.time,
            timestamp: this.timestamp,
            bits: this.bits,
            nonce: this.nonce
        }
    }
    toBuffer() {
        let bw = buffer.createWriter();
        bw.writeInt32LE(this.version);
        bw.write(this.prevHash);
        bw.write(this.merkleRoot);
        bw.writeUInt32LE(this.time);
        bw.writeUInt32LE(this.bits);
        bw.writeUInt32LE(this.nonce);
        return bw.concat();
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
}

module.exports = BlockHeader;