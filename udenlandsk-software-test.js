const assert=require('assert');
const {calculate}=require('./udenlandsk-software-lib.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-9,`${a} != ${b}`);

let r=calculate({amount:1000,location:'eu',vatRegistered:true,businessUse:100});
close(r.reverseVat,250); close(r.deductibleVat,250); close(r.netVat,0); close(r.euBoxA,1000);

r=calculate({amount:1000,location:'eu',vatRegistered:true,businessUse:50});
close(r.reverseVat,250); close(r.deductibleVat,125); close(r.netVat,125);

r=calculate({amount:1000,location:'non-eu',vatRegistered:true,businessUse:100});
close(r.reverseVat,250); close(r.deductibleVat,250); close(r.euBoxA,0);

r=calculate({amount:1000,location:'eu',vatRegistered:false,businessUse:100});
assert.equal(r.registrationRequired,true); close(r.reverseVat,250); close(r.deductibleVat,0); close(r.netVat,250);

r=calculate({amount:1000,location:'eu',vatRegistered:false,pmv:true,businessUse:100});
assert.equal(r.pmvConversionRequired,true);

r=calculate({amount:1000,location:'eu',vatRegistered:true,businessUse:100,foreignVat:true});
assert.equal(r.invoiceProblem,true); close(r.reverseVat,0); close(r.netVat,0);

r=calculate({amount:-10,location:'wat',vatRegistered:true,businessUse:140});
close(r.amount,0); assert.equal(r.location,'eu'); assert.equal(r.businessUse,100);

console.log('udenlandsk-software-test: 7/7 passed');
