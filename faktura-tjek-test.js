const assert=require('assert');
const {check}=require('./faktura-tjek-lib.js');
const allFull={date:true,number:true,seller:true,sellerVat:true,buyer:true,description:true,delivery:true,base:true,rate:true,vatAmount:true,simpleTotalVat:true};

let r=check({amount:2500,buyerRegistered:true,buyerRequestsFull:false,normalDomestic:true,fields:{date:true,number:true,seller:true,sellerVat:true,description:true,simpleTotalVat:true}});
assert.equal(r.invoiceType,'simplified'); assert.equal(r.complete,true); assert.equal(r.required.length,6);

r=check({amount:2999.99,buyerRegistered:true,buyerRequestsFull:false,normalDomestic:true,fields:{}});
assert.equal(r.invoiceType,'simplified'); assert.equal(r.missing.length,6);

r=check({amount:3000,buyerRegistered:true,buyerRequestsFull:false,normalDomestic:true,fields:allFull});
assert.equal(r.invoiceType,'full'); assert.equal(r.complete,true);

r=check({amount:1000,buyerRegistered:true,buyerRequestsFull:true,normalDomestic:true,fields:allFull});
assert.equal(r.invoiceType,'full','registered buyer request must force full invoice');

r=check({amount:5000,buyerRegistered:true,buyerRequestsFull:false,normalDomestic:true,deliveryDifferent:false,fields:{...allFull,delivery:false}});
assert.equal(r.complete,true); assert.ok(!r.required.includes('Leveringsdato, hvis den er forskellig fra fakturadato'));

r=check({amount:5000,buyerRegistered:true,buyerRequestsFull:false,normalDomestic:true,deliveryDifferent:true,fields:{...allFull,delivery:false}});
assert.equal(r.complete,false); assert.ok(r.missing.includes('Leveringsdato, hvis den er forskellig fra fakturadato'));

r=check({amount:1000,buyerRegistered:false,normalDomestic:true,fields:allFull});
assert.equal(r.supported,false);

r=check({amount:1000,buyerRegistered:true,normalDomestic:false,fields:allFull});
assert.equal(r.supported,false);

console.log('faktura-tjek-test: 8/8 passed');
