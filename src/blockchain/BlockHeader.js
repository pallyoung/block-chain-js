'use strict'

const crypto = require('crypto');

class BlockHeader{
    constructor(info){
        this.version = info.version;
        this.prevHash = info.prevHash;
        this.merkleRoot = info.merkleRoot;
        this.hash = info.hash;
        this.time = info.time;
        this.timestamp = info.time;
        this.bits = info.bits;
        this.nonce = info.nonce;
    }
    toObject(){
        return {
            version:this.version,
            prevHash:this.prevHash,
            merkleRoot:this.merkleRoot,
            hash:this.hash,
            time:this.time,
            timestamp:this.timestamp,
            bits:this.bits,
            nonce:this.nonce
        }
    }
    toString(){
        return JSON.stringify(this.toObject());
    }
}

module.exports = BlockHeader;