const fs=require('fs');
const assert=require('assert');

const xml=fs.readFileSync('sitemap.xml','utf8');
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert(urls.length>0,'sitemap must contain URLs');
assert.equal(new Set(urls).size,urls.length,'sitemap URLs must be unique');

const prefix='https://kontormakker.github.io/Firmakroner/';
const infoPages=new Set(['index.html','om.html','privatliv.html','affiliate.html','satser-2026.html']);
const official=/(skat\.dk|info\.skat\.dk|erhvervsstyrelsen\.dk|virksomhedsguiden\.dk)/i;
let partnerLinks=0;

for(const url of urls){
  assert(url.startsWith(prefix),`unexpected sitemap host/path: ${url}`);
  const rel=url.slice(prefix.length)||'index.html';
  assert(fs.existsSync(rel),`sitemap file missing: ${rel}`);
  const html=fs.readFileSync(rel,'utf8');
  assert(/<title>[^<]+<\/title>/i.test(html),`${rel}: title missing`);
  assert(/<meta\s+name=["']description["']/i.test(html),`${rel}: meta description missing`);
  assert(html.includes(`rel="canonical" href="${url}"`)||html.includes(`rel='canonical' href='${url}'`),`${rel}: canonical mismatch`);
  if(!infoPages.has(rel)) assert(official.test(html),`${rel}: no primary official source domain`);

  if(/partner-ads\.com/i.test(html)){
    const links=[...html.matchAll(/<a\b[^>]*href=["'][^"']*partner-ads\.com[^"']*["'][^>]*>/gi)].map(m=>m[0]);
    partnerLinks+=links.length;
    for(const link of links){
      assert(/rel=["'][^"']*sponsored[^"']*nofollow[^"']*noopener[^"']*["']/i.test(link),`${rel}: affiliate link must be sponsored nofollow noopener`);
    }
    if(links.length) assert(/reklame[^<]{0,80}reklamelink for Dinero/i.test(html)||/reklamelink for Dinero/i.test(html),`${rel}: affiliate link lacks clear advertising label`);
    assert(!/<script[^>]+partner-ads\.com/i.test(html),`${rel}: no Partner-Ads scripts allowed`);
    assert(!/<(?:img|iframe)[^>]+partner-ads\.com/i.test(html),`${rel}: no Partner-Ads pixel/banner embeds allowed`);
  }
}

const index=fs.readFileSync('index.html','utf8');
assert(/name=["']google-site-verification["']/i.test(index),'Google Search Console verification must remain on the homepage');
const affiliate=fs.readFileSync('affiliate.html','utf8');
assert(/aktivt affiliate-samarbejde med Dinero/i.test(affiliate),'affiliate disclosure must reflect active Dinero partnership');
assert(/Beregninger påvirkes aldrig/i.test(affiliate),'affiliate independence rule missing');
const privacy=fs.readFileSync('privatliv.html','utf8');
assert(/Partner-Ads/i.test(privacy),'privacy page must describe Partner-Ads click boundary');
assert(partnerLinks>=1,'at least one contextual Dinero affiliate link expected');

console.log(`compliance-test: ${urls.length} public URLs checked; ${partnerLinks} affiliate link(s) compliant`);
