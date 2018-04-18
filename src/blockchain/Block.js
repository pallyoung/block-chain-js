'use strict'
var BlockHeader = require('./BlockHeader');
var Transaction = require('./../transaction').Transaction;
class Block {
    constructor(){
        this.header = new BlockHeader();
        this.transactions = new Transaction();
    }
}

module.exports = Block;