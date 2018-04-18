'use strict'

class BlockHeader{
    constructor(info){
        this.version = info.version;
        this.prevHash = info.prevHash;
        this.merkleRoot = info.merkleRoot;
        this.time = info.time;
        this.timestamp = info.time;
        this.bits = info.bits;
        this.nonce = info.nonce;
    }
}

module.exports = BlockHeader;