const assert=require('assert');
const {calculate}=require('./reklame-repraesentation-lib.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);

let r=calculate({amount:1250,vatRate:25,vatRegistered:true,type:'advertising'});
close(r.vatDeduction,250); close(r.incomeTaxDeduction,1000);

r=calculate({amount:1250,vatRate:25,vatRegistered:false,type:'advertising'});
close(r.vatDeduction,0); close(r.incomeTaxDeduction,1250);

r=calculate({amount:500,vatRate:25,vatRegistered:true,type:'restaurant',businessConnection:true});
close(r.vatDeduction,100); close(r.deductibleExpenseBase,400); close(r.incomeTaxDeduction,100);

r=calculate({amount:500,vatRate:25,vatRegistered:false,type:'restaurant',businessConnection:true});
close(r.vatDeduction,0); close(r.incomeTaxDeduction,125);

r=calculate({amount:500,vatRate:25,vatRegistered:true,type:'restaurant',businessConnection:false});
close(r.vatDeduction,0); close(r.incomeTaxDeduction,125);

r=calculate({amount:500,vatRate:25,vatRegistered:true,type:'representation'});
close(r.vatDeduction,0); close(r.incomeTaxDeduction,125);

r=calculate({amount:-100,vatRate:25,vatRegistered:true,type:'advertising'});
close(r.gross,0); close(r.incomeTaxDeduction,0);

console.log('reklame-repraesentation-test: 7/7 passed');
