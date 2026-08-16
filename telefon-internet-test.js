const assert=require('assert');
const {calculate,BENEFIT_2026}=require('./telefon-internet-lib.js');

assert.equal(BENEFIT_2026,3500);

let r=calculate({phoneCost:3600,internetCost:4200,includePhone:true,includeInternet:true,phonePrivate:true,homeBusiness:true,networkAccess:false,months:12,taxRate:40});
assert.equal(r.deductible,7800);
assert.equal(r.taxableBenefit,3500);
assert.equal(r.netTaxBaseEffect,4300);
assert.equal(r.estimatedTaxEffect,1720);
assert.equal(r.phoneTriggers,true);
assert.equal(r.internetTriggers,false);

r=calculate({phoneCost:0,internetCost:4200,includePhone:false,includeInternet:true,phonePrivate:false,homeBusiness:true,networkAccess:false,months:12,taxRate:40});
assert.equal(r.taxableBenefit,0);
assert.equal(r.netTaxBaseEffect,4200);

r=calculate({phoneCost:0,internetCost:4200,includePhone:false,includeInternet:true,homeBusiness:false,networkAccess:false,months:12,taxRate:40});
assert.equal(r.taxableBenefit,3500);
assert.equal(r.internetTriggers,true);

r=calculate({phoneCost:3600,internetCost:4200,includePhone:true,includeInternet:true,phonePrivate:true,homeBusiness:false,networkAccess:false,months:12,taxRate:40});
assert.equal(r.taxableBenefit,3500,'phone + internet must not double the 2026 taxable value');

r=calculate({phoneCost:3600,internetCost:0,includePhone:true,includeInternet:false,phonePrivate:true,months:6,taxRate:40});
assert.equal(r.taxableBenefit,1750);

r=calculate({phoneCost:3600,internetCost:4200,includePhone:true,includeInternet:false,phonePrivate:false,months:12,taxRate:40});
assert.equal(r.deductible,3600);
assert.equal(r.taxableBenefit,0);

r=calculate({phoneCost:-100,internetCost:NaN,includePhone:true,includeInternet:true,months:99,taxRate:140});
assert.equal(r.deductible,0);
assert.equal(r.months,12);
assert.equal(r.taxRate,100);

console.log('telefon-internet-test: 8/8 passed');
