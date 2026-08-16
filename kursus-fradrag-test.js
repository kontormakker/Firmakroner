const assert=require('assert');
const {assess}=require('./kursus-fradrag-lib.js');

let r=assess({cost:12000,directRelation:true,maintainsKnowledge:true,newQualification:false,newIncomeArea:false,privateCharacter:false});
assert.equal(r.status,'possible');
assert.equal(r.deductibleEstimate,12000);

r=assess({cost:12000,directRelation:true,maintainsKnowledge:true,newQualification:true});
assert.equal(r.status,'no'); assert.equal(r.deductibleEstimate,0);

r=assess({cost:12000,directRelation:true,maintainsKnowledge:false,newIncomeArea:true});
assert.equal(r.status,'no');

r=assess({cost:12000,directRelation:true,maintainsKnowledge:true,privateCharacter:true});
assert.equal(r.status,'no');

r=assess({cost:12000,directRelation:false,maintainsKnowledge:true});
assert.equal(r.status,'uncertain'); assert.equal(r.deductibleEstimate,null);

r=assess({cost:12000,directRelation:true,maintainsKnowledge:false});
assert.equal(r.status,'uncertain');

r=assess({cost:-50,directRelation:true,maintainsKnowledge:true});
assert.equal(r.cost,0); assert.equal(r.deductibleEstimate,0);

console.log('kursus-fradrag-test: 7/7 passed');
