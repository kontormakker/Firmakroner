const assert=require('assert');
const {assess}=require('./erhvervskonto-lib.js');

let r=assess({hasCvr:false,form:'sole',bankPosition:'unknown'});
assert.equal(r.status,'not-yet');
assert.equal(r.nemkontoRequired,false);
assert(/første offentlige udbetaling/i.test(r.summary));

r=assess({hasCvr:true,form:'sole',bankPosition:'allows-private'});
assert.equal(r.status,'private-possible');
assert.equal(r.nemkontoRequired,true);
assert.equal(r.specialBusinessProductRequired,false);
assert(/finansielle institut afgør/i.test(r.summary));

r=assess({hasCvr:true,form:'sole',bankPosition:'requires-business'});
assert.equal(r.status,'bank-requires');
assert.equal(r.specialBusinessProductRequired,true);
assert(/bankens vilkår/i.test(r.summary));

r=assess({hasCvr:true,form:'sole',bankPosition:'unknown'});
assert.equal(r.status,'ask-bank');
assert.equal(r.specialBusinessProductRequired,null);
assert(/NemKonto og en betalt erhvervskonto er ikke det samme/i.test(r.summary));

r=assess({hasCvr:true,form:'company',bankPosition:'unknown'});
assert.equal(r.status,'company-separate');
assert.equal(r.nemkontoRequired,true);
assert.equal(r.specialBusinessProductRequired,true);
assert(/adskilt/i.test(r.summary));

r=assess({hasCvr:true,form:'other',bankPosition:'unknown'});
assert.equal(r.status,'other-form');
assert.equal(r.specialBusinessProductRequired,null);

r=assess({hasCvr:true,form:'sole',denied:true,danishEligibility:true});
assert.equal(r.status,'basic-right');
assert.equal(r.basalRight,true);
assert(/10 arbejdsdage/i.test(r.summary));

r=assess({hasCvr:true,form:'sole',denied:true,danishEligibility:false});
assert.equal(r.status,'check-eligibility');
assert.equal(r.basalRight,null);

console.log('erhvervskonto-test: 8 scenarios passed');
