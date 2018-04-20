'use strict'
const BlockHeader = require('./BlockHeader');
const Transaction = require('./../transaction').Transaction;


class Block {
    constructor(info){
        this.header = new BlockHeader(info.header);
        this.transactions = info.transactions;
    }
    calculateHash(){
            return 
    }
    toObject(){
        return {
            header:this.header.toObject(),
            transactions:this.transactions
        }
    }
    toString(){
        return JSON.stringify(this.toObject())
    }
}

module.exports = Block;