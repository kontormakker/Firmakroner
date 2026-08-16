const assert=require('assert');
const {assess}=require('./hjemmekontor-lib.js');

let r=assess({privatePossible:true,exclusiveBusiness:true,mainWorkplace:true,normalHours:true,equipmentCost:10000,businessUse:50});
assert.equal(r.roomStatus,'unlikely');
assert.equal(r.equipmentDeduction,5000);

r=assess({privatePossible:false,exclusiveBusiness:false,mainWorkplace:true,normalHours:true,equipmentCost:10000,businessUse:100});
assert.equal(r.roomStatus,'unlikely');
assert.equal(r.equipmentDeduction,10000);

r=assess({privatePossible:false,exclusiveBusiness:true,mainWorkplace:true,normalHours:true,equipmentCost:0,businessUse:100});
assert.equal(r.roomStatus,'possible');

r=assess({privatePossible:false,exclusiveBusiness:true,mainWorkplace:false,normalHours:true});
assert.equal(r.roomStatus,'weak');

r=assess({privatePossible:false,exclusiveBusiness:true,mainWorkplace:true,normalHours:false});
assert.equal(r.roomStatus,'weak');

r=assess({equipmentCost:-100,businessUse:150});
assert.equal(r.equipmentCost,0);
assert.equal(r.businessUse,100);
assert.equal(r.equipmentDeduction,0);

r=assess({equipmentCost:8000,businessUse:-10});
assert.equal(r.businessUse,0);
assert.equal(r.equipmentDeduction,0);

console.log('hjemmekontor-test: 7/7 passed');
