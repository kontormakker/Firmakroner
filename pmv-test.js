const assert=require('assert');
const {assess,VAT_THRESHOLD}=require('./pmv-lib.js');
assert.equal(VAT_THRESHOLD,50000);

let r=assess({turnover:49999,wantsVat:false,needsEmployees:false,buysForeignServices:false});
assert.equal(r.status,'possible'); assert.equal(r.reasons.length,0);

r=assess({turnover:50000,wantsVat:false,needsEmployees:false,buysForeignServices:false});
assert.equal(r.status,'edge'); assert.equal(r.reasons.length,0); assert.equal(r.cautions.length,1);

r=assess({turnover:50001,wantsVat:false,needsEmployees:false,buysForeignServices:false});
assert.equal(r.status,'no'); assert.ok(r.reasons.some(x=>x.includes('over 50.000')));

r=assess({turnover:10000,wantsVat:true});
assert.equal(r.status,'no'); assert.ok(r.reasons.some(x=>x.includes('frivilligt momsregistreret')));

r=assess({turnover:10000,needsEmployees:true});
assert.equal(r.status,'no'); assert.ok(r.reasons.some(x=>x.includes('ansatte')));

r=assess({turnover:10000,buysForeignServices:true});
assert.equal(r.status,'no'); assert.ok(r.reasons.some(x=>x.includes('udenlandske')));

r=assess({turnover:70000,wantsVat:true,needsEmployees:true,buysForeignServices:true});
assert.equal(r.status,'no'); assert.equal(r.reasons.length,4);

r=assess({turnover:-100,wantsVat:false,needsEmployees:false,buysForeignServices:false});
assert.equal(r.turnover,0); assert.equal(r.status,'possible');

console.log('pmv-test: 8/8 passed');
