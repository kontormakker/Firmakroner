const fs=require('fs');
const assert=require('assert');

const manifest=JSON.parse(fs.readFileSync('rules-manifest.json','utf8'));
assert.equal(manifest.schemaVersion,1,'unsupported rules manifest schema');
assert.equal(manifest.policy.primarySourcesOnlyForFinalRules,true,'primary-source policy must remain enabled');

const today=(process.env.FIRMAKRONER_AUDIT_DATE||new Date().toISOString().slice(0,10));
const xml=fs.readFileSync('sitemap.xml','utf8');
const prefix='https://kontormakker.github.io/Firmakroner/';
const publicFiles=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(m=>m[1])
  .filter(url=>url.startsWith(prefix))
  .map(url=>url.slice(prefix.length)||'index.html');
const nonRulePages=new Set(['index.html','om.html','privatliv.html','affiliate.html']);
const expectedAuditSurfaces=publicFiles.filter(file=>!nonRulePages.has(file));

assert.equal(Object.keys(manifest.tools).length,expectedAuditSurfaces.length,'rules manifest count must match public rule surfaces');
for(const file of expectedAuditSurfaces){
  const entry=manifest.tools[file];
  assert(entry,`${file}: missing from rules-manifest.json`);
  assert(['high','medium','low'].includes(entry.risk),`${file}: invalid risk`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(entry.reviewedAt),`${file}: invalid reviewedAt`);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(entry.reviewAfter),`${file}: invalid reviewAfter`);
  assert(today<=entry.reviewAfter,`${file}: rule audit expired after ${entry.reviewAfter}; re-check primary official sources before releasing`);
  assert(Array.isArray(entry.sources)&&entry.sources.length>0,`${file}: no declared primary source domains`);
  const html=fs.readFileSync(file,'utf8').toLowerCase();
  for(const domain of entry.sources){
    assert(html.includes(domain.toLowerCase()),`${file}: declared source ${domain} is not present on the page`);
  }
  if(entry.rateSensitive){
    assert(/2026|50\.000|36\.000|16\.900|3\.500|3,94|2,28|300\.000/.test(html),`${file}: rate-sensitive page has no explicit year/rate cue`);
  }
}

assert.equal(manifest.policy.nextFullReviewNoLaterThan,'2027-01-01','2027 rollover gate must not be silently removed');
console.log(`freshness-test: ${expectedAuditSurfaces.length} audited public rule surfaces valid on ${today}; next mandatory rollover review 2027-01-01`);
