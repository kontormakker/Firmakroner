const assert=require('assert');
const {assess,THRESHOLD}=require('./digital-bogfoering-lib.js');
assert.equal(THRESHOLD,300000);

let r=assess({startYear:2024,turnover2024:350000,turnover2025:400000,personOwned:true});
assert.equal(r.required2026,true); assert.equal(r.status,'required');

r=assess({startYear:2024,turnover2024:300000,turnover2025:400000,personOwned:true});
assert.equal(r.required2026,false,'exactly 300,000 does not exceed the threshold');

r=assess({startYear:2024,turnover2024:300001,turnover2025:299999,personOwned:true});
assert.equal(r.required2026,false);

r=assess({startYear:2025,turnover2024:0,turnover2025:900000,personOwned:true});
assert.equal(r.status,'not-yet'); assert.equal(r.required2026,false);

r=assess({startYear:2026,turnover2024:0,turnover2025:0,personOwned:true});
assert.equal(r.status,'not-yet');

r=assess({startYear:2023,turnover2024:310000,turnover2025:310000,personOwned:true});
assert.equal(r.required2026,true);

r=assess({startYear:2023,turnover2024:-1,turnover2025:310000,personOwned:true});
assert.equal(r.turnover2024,0); assert.equal(r.required2026,false);

r=assess({personOwned:false,startYear:2023,turnover2024:500000,turnover2025:500000});
assert.equal(r.supported,false);

console.log('digital-bogfoering-test: 9/9 passed');
