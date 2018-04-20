'use strict'
const Block = require('./Block');

const VERSION = '1';
class BlockChain {
    constructor() {
        this.firstBlock = this.createGenesisBlock();
        this.lastBlock = this.firstBlock;

        this.difficulty = 2;
        this.miningReward = 100;
    }
    getLatestBlock() {
        return this.lastBlock
    }
    createGenesisBlock() {
        let genesisBlockInfo = {
            header:{
                version: VERSION,
                time: Date.now()
            }
        }
        return new Block(genesisBlockInfo);
    }
    createTransaction(transaction) {
        // 这里应该有一些校验!
        // 推入待处理交易数组
        this.pendingTransactions.push(transaction);
    }
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

}

module.exports = BlockChain;