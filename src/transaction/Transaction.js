'use strict'
class Transaction{
    constructor(info){
        let {
            fromAddress,
            toAddress,
            amount
        } = info;
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

module.exports = Transaction;