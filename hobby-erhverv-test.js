const assert=require('assert');
const {assess}=require('./hobby-erhverv-lib.js');

let r=assess({profitOutlook:true,systematicIncome:true,intensity:true,budget:true,skills:true,persistentSupport:false,privatePurpose:false,privateUseAssets:false,revenue:120000,relatedExpenses:80000});
assert.equal(r.signal,'business'); assert.equal(r.hobbyTaxableNet,40000); assert.equal(r.hobbyLossNoOffset,0);

r=assess({profitOutlook:false,systematicIncome:false,intensity:false,privatePurpose:true,revenue:10000,relatedExpenses:30000});
assert.equal(r.signal,'hobby'); assert.equal(r.hobbyTaxableNet,0); assert.equal(r.hobbyLossNoOffset,20000);

r=assess({profitOutlook:true,systematicIncome:true,intensity:false,privatePurpose:false,revenue:10000,relatedExpenses:8000});
assert.equal(r.signal,'mixed');

r=assess({profitOutlook:false,systematicIncome:true,intensity:true,persistentSupport:true});
assert.equal(r.signal,'hobby');

r=assess({profitOutlook:true,systematicIncome:true,intensity:true,privatePurpose:true});
assert.equal(r.signal,'mixed');

r=assess({revenue:-50,relatedExpenses:-20});
assert.equal(r.revenue,0); assert.equal(r.relatedExpenses,0); assert.equal(r.net,0);

r=assess({profitOutlook:true,systematicIncome:true,intensity:true,budget:true,skills:true,privateUseAssets:true});
assert.equal(r.signal,'business'); assert.ok(r.warnings.some(x=>x.includes('privat')));

console.log('hobby-erhverv-test: 7/7 passed');
