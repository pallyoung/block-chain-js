'use strict'
const crypto = require('./../utils/crypto'); 
const Address = require('./Address');

const CODE = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';


function randomInt(){
    return Math.floor(Math.random()*15)+1;
}

const SECRET_LENGTH = 32;
class Account{
    constructor(info){
        this.address = info.address;
    }
    getBalance(){
        return this.balance;
    }
    getAddress(){
        return this.address;
    }
    getAlias(){

    }
    static create(){
        let secret = new Array(SECRET_LENGTH).fill('0').map(()=>{
            let n =  randomInt();
            return  n>10?CODE[n-10]:n;
        }).join('');
        let keys = crypto.generateKeys(secret);
        let publicKey = keys.publicKey;
        let privateKey = keys.privateKey;
        let address = Address.fromPublicKey(publicKey);

        console.log(address)
        return {
            publicKey,
            privateKey,
            address
        }
    }

}
Account.create();
module.exports = Account;