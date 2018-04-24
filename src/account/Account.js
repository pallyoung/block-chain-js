'use strict'
const crypto = require('./../utils/crypto'); 
const CODE = [
    'a','b','c','d','e','f','g','h',
    'i', 'j','k', 'm','n','p','q','r',
    's','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H',
    'J','K','L','M','N','P','Q','R',
    'S','T', 'U','V','W','X','Y','Z',
    '2','3','4','5','6','7','8','9'
];

function randomInt(){
    return Math.floor(Math.random()*15)+1;
}

const SECRET_LENGTH = 32;
class Account{
    constructor(address){
        this.address = address;
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
        console.log(keys);
        let address = keys.publicKey;
        secret = keys.privateKey;
        return {
            secret,
            address
        }
    }

}
Account.create();
module.exports = Account;