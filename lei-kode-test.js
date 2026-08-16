const assert=require('assert');
const {assess}=require('./lei-kode-lib.js');

let r=assess({entity:'legal',activity:'trade'});
assert.equal(r.status,'yes-legal');
assert.equal(r.leiRequired,true);
assert(/ingen bagatelgrænse/i.test(r.summary));

r=assess({entity:'legal',activity:'derivatives'});
assert.equal(r.status,'yes-legal');
assert.equal(r.leiRequired,true);

r=assess({entity:'legal',activity:'hold-only'});
assert.equal(r.status,'not-until-trade');
assert.equal(r.leiRequired,false);
assert(/eje værdipapirer uden LEI/i.test(r.summary));

r=assess({entity:'sole',activity:'trade'});
assert.equal(r.status,'no-sole-normal');
assert.equal(r.leiRequired,false);
assert(/andre finansielle instrumenter end derivater/i.test(r.summary));

r=assess({entity:'sole',activity:'derivatives'});
assert.equal(r.status,'yes-sole-derivatives');
assert.equal(r.leiRequired,true);
assert(/EMIR/i.test(r.summary));

r=assess({entity:'private',activity:'trade'});
assert.equal(r.status,'no-private');
assert.equal(r.leiRequired,false);
assert(/CPR-nummer/i.test(r.summary));

r=assess({entity:'legal',activity:'none'});
assert.equal(r.status,'no-activity');
assert.equal(r.leiRequired,false);

r=assess({entity:'other',activity:'trade'});
assert.equal(r.status,'check-entity');
assert.equal(r.leiRequired,null);

console.log('lei-kode-test: 8 scenarios passed');
