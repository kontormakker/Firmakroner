const assert=require('assert');
const {spawnSync}=require('child_process');

let r=spawnSync(process.execPath,['freshness-test.js'],{encoding:'utf8',env:{...process.env,FIRMAKRONER_AUDIT_DATE:'2026-12-31'}});
assert.equal(r.status,0,`2026-12-31 should still pass:\n${r.stdout}\n${r.stderr}`);

r=spawnSync(process.execPath,['freshness-test.js'],{encoding:'utf8',env:{...process.env,FIRMAKRONER_AUDIT_DATE:'2027-01-01'}});
assert.notEqual(r.status,0,'2027-01-01 must fail until a fresh primary-source audit updates the manifest');
assert(/rule audit expired/i.test((r.stdout||'')+(r.stderr||'')),'future failure must explain that the rule audit expired');

console.log('freshness-policy-test: year rollover lock verified');
