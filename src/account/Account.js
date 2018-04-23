'use strict'

class Account{
    constructor(info){
        this.address;
        this.balance
    }
    getBalance(){
        return this.balance;
    }
    getAddress(){
        return this.address;
    }
}

module.exports = Account;