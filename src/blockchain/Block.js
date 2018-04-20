'use strict'
const BlockHeader = require('./BlockHeader');
const Transaction = require('./../transaction').Transaction;


class Block {
    constructor(info){
        this.header = new BlockHeader(info.header);
        this.transactions = info.transactions;
    }
    calculateHash(){
            return this.header.calculateHash();
    }
}

module.exports = Block;