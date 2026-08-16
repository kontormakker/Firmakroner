const assert=require('assert');
const {assess}=require('./cvr-adresse-lib.js');

let r=assess({goal:'privacy',businessAtHome:true,cprProtected:false});
assert.equal(r.status,'separate-address');
assert.equal(r.paidAddress,true);
assert(/offentliggøres i CVR/i.test(r.summary));

r=assess({goal:'privacy',businessAtHome:true,cprProtected:true});
assert.equal(r.status,'separate-address');
assert(/ikke en virksomhedsadresse/i.test(r.summary));

r=assess({goal:'privacy',businessAtHome:false,cprProtected:true});
assert.equal(r.status,'already-separated');
assert.equal(r.paidAddress,false);

r=assess({goal:'marketing',businessAtHome:true,cprProtected:false});
assert.equal(r.status,'free-protection');
assert.equal(r.paidAddress,false);
assert(/gratis løsning/i.test(r.summary));

r=assess({goal:'google',businessAtHome:true,cprProtected:false});
assert.equal(r.status,'google-only');
assert.equal(r.paidAddress,false);
assert(/Google Virksomhedsprofil/i.test(r.summary));

console.log('cvr-adresse-test: 5 scenarios passed');
