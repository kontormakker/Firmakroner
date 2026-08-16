const assert=require('assert');
const {assess}=require('./arbejdstoej-lib.js');

let r=assess({cost:6000,special:true,privateSuitable:false,extraCost:4000,documented:true});
assert.equal(r.status,'possible'); assert.equal(r.deductible,4000);

r=assess({cost:6000,special:false,privateSuitable:false,extraCost:4000,documented:true});
assert.equal(r.status,'no'); assert.equal(r.deductible,0);

r=assess({cost:6000,special:true,privateSuitable:true,extraCost:4000,documented:true});
assert.equal(r.status,'no');

r=assess({cost:6000,special:true,privateSuitable:false,extraCost:0,documented:true});
assert.equal(r.status,'no');

r=assess({cost:6000,special:true,privateSuitable:false,extraCost:4000,documented:false});
assert.equal(r.status,'possible'); assert.equal(r.deductible,null);

r=assess({cost:3000,special:true,privateSuitable:false,extraCost:9000,documented:true});
assert.equal(r.deductible,3000,'estimated deductible cannot exceed purchase cost');

r=assess({cost:-100,special:true,privateSuitable:false,extraCost:-50,documented:true});
assert.equal(r.cost,0); assert.equal(r.extraCost,0); assert.equal(r.deductible,0);

console.log('arbejdstoej-test: 7/7 passed');
