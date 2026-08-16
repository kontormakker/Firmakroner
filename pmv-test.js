const assert=require('assert');
const {assess,PMV_LIMIT}=require('./pmv-lib.js');
assert.equal(PMV_LIMIT,50000);

let r=assess({turnover:49999});
assert.equal(r.status,'possible'); assert.equal(r.reasons.length,0);

r=assess({turnover:50000});
assert.equal(r.status,'no'); assert.ok(r.reasons.some(x=>x.includes('50.000 kr. eller derover')));

r=assess({turnover:50001});
assert.equal(r.status,'no'); assert.ok(r.reasons.some(x=>x.includes('50.000 kr. eller derover')));

r=assess({turnover:10000,wantsVat:true});
assert.equal(r.status,'no'); assert.ok(r.reasons.some(x=>x.includes('momsregistreret')));

r=assess({turnover:10000,needsEmployees:true});
assert.equal(r.status,'no'); assert.ok(r.reasons.some(x=>x.includes('ansatte')));

r=assess({turnover:10000,buysForeignServices:true});
assert.equal(r.status,'no'); assert.ok(r.reasons.some(x=>x.includes('udlandet')));

r=assess({turnover:10000,needsNonEuTrade:true});
assert.equal(r.status,'no'); assert.ok(r.reasons.some(x=>x.includes('uden for EU')));

r=assess({turnover:70000,wantsVat:true,needsEmployees:true,buysForeignServices:true,needsNonEuTrade:true});
assert.equal(r.status,'no'); assert.equal(r.reasons.length,5);

r=assess({turnover:-100});
assert.equal(r.turnover,0); assert.equal(r.status,'possible');

console.log('pmv-test: 9/9 passed');
