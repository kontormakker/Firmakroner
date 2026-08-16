const fs=require('fs');
const assert=require('assert');

const xml=fs.readFileSync('sitemap.xml','utf8');
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert(urls.length>0,'sitemap must contain URLs');
assert.equal(new Set(urls).size,urls.length,'sitemap URLs must be unique');

const prefix='https://kontormakker.github.io/Firmakroner/';
const infoPages=new Set(['index.html','om.html','privatliv.html','affiliate.html','satser-2026.html']);
const official=/(skat\.dk|info\.skat\.dk|erhvervsstyrelsen\.dk|virksomhedsguiden\.dk)/i;
const APPROVED_AFFILIATE={brand:'Dinero',network:'Partner-Ads',partnerId:'57323',bannerId:'50128'};
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
    const links=[...html.matchAll(/<a\b[^>]*href=["']([^"']*partner-ads\.com[^"']*)["'][^>]*>/gi)];
    partnerLinks+=links.length;
    for(const match of links){
      const link=match[0],href=match[1].replace(/&amp;/g,'&');
      assert(/rel=["'][^"']*sponsored[^"']*nofollow[^"']*noopener[^"']*["']/i.test(link),`${rel}: affiliate link must be sponsored nofollow noopener`);
      assert(href.includes(`partnerid=${APPROVED_AFFILIATE.partnerId}`),`${rel}: unexpected Partner-Ads partner id`);
      assert(href.includes(`bannerid=${APPROVED_AFFILIATE.bannerId}`),`${rel}: unexpected Dinero ad id`);
    }
    if(links.length) assert(/reklame[^<]{0,80}reklamelink for Dinero/i.test(html)||/reklamelink for Dinero/i.test(html),`${rel}: affiliate link lacks clear advertising label`);
    assert(!/<script[^>]+partner-ads\.com/i.test(html),`${rel}: no Partner-Ads scripts allowed`);
    assert(!/<(?:img|iframe)[^>]+partner-ads\.com/i.test(html),`${rel}: no Partner-Ads pixel/banner embeds allowed`);
  }
}

assert.equal(urls.length,20,'expected 20 public URLs after PMV release');
const index=fs.readFileSync('index.html','utf8');
assert(/name=["']google-site-verification["']/i.test(index),'Google Search Console verification must remain on the homepage');
assert(/15 gratis værktøjer/i.test(index),'portal tool count must stay in sync');
const purchase=fs.readFileSync('firmakoeb.html','utf8');
assert(/108 %-saldo/i.test(purchase),'firm-purchase page must disclose the 2025-2026 enhanced green basis');
assert(/16\.900 kr\./i.test(purchase),'firm-purchase page must disclose mixed-use 2026 limit');
assert(/Ikke-fradragsberettiget moms/i.test(purchase),'firm-purchase page must keep non-deductible VAT in cost basis');
assert(!/Ingen affiliate-links er aktive endnu/i.test(purchase),'stale affiliate status must not return');
const affiliate=fs.readFileSync('affiliate.html','utf8');
assert(new RegExp(`aktivt affiliate-samarbejde med ${APPROVED_AFFILIATE.brand}`,'i').test(affiliate),'affiliate disclosure must reflect issued Dinero partnership');
assert(/Beregninger påvirkes aldrig/i.test(affiliate),'affiliate independence rule missing');
const privacy=fs.readFileSync('privatliv.html','utf8');
assert(new RegExp(APPROVED_AFFILIATE.network,'i').test(privacy),'privacy page must describe Partner-Ads click boundary');
assert(partnerLinks>=1,'issued Dinero affiliate link must remain present in at least one contextual placement');

console.log(`compliance-test: ${urls.length} public URLs checked; ${partnerLinks} issued ${APPROVED_AFFILIATE.brand} affiliate link(s) compliant; all canonicals required`);
