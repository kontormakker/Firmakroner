const fs=require('fs');
const assert=require('assert');

const xml=fs.readFileSync('sitemap.xml','utf8');
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert(urls.length>0,'sitemap must contain URLs');
assert.equal(new Set(urls).size,urls.length,'sitemap URLs must be unique');

const prefix='https://kontormakker.github.io/Firmakroner/';
const infoPages=new Set(['index.html','om.html','privatliv.html','affiliate.html','satser-2026.html']);
const official=/(skat\.dk|info\.skat\.dk|erhvervsstyrelsen\.dk|virksomhedsguiden\.dk|nemkonto\.dk|finanstilsynet\.dk|retsinformation\.dk)/i;
const PARTNER_ID='57323';
const APPROVED_BANNERS={
  '50128':{brand:'Dinero',page:'skal-jeg-bogfoere-digitalt-2026.html'},
  '85033':{brand:'LEI Service DK',page:'skal-jeg-have-lei-kode.html'}
};
const seenBanners=new Map();
let issuedAffiliateLinks=0;

for(const url of urls){
  assert(url.startsWith(prefix),`unexpected sitemap host/path: ${url}`);
  const rel=url.slice(prefix.length)||'index.html';
  assert(fs.existsSync(rel),`sitemap file missing: ${rel}`);
  const html=fs.readFileSync(rel,'utf8');
  assert(/<title>[^<]+<\/title>/i.test(html),`${rel}: title missing`);
  assert(/<meta\s+name=["']description["']/i.test(html),`${rel}: meta description missing`);
  assert(html.includes(`rel="canonical" href="${url}"`)||html.includes(`rel='canonical' href='${url}'`),`${rel}: canonical mismatch`);
  if(!infoPages.has(rel)) assert(official.test(html),`${rel}: no primary official source domain`);

  const directTrackingAnchors=[...html.matchAll(/<a\b[^>]*href=["']([^"']*partner-ads\.com\/[^"']*klikbanner\.php[^"']*)["'][^>]*>/gi)];
  assert.equal(directTrackingAnchors.length,0,`${rel}: Partner-Ads tracking URL must not be active in href before consent`);

  const dataLinks=[...html.matchAll(/<a\b([^>]*)\bdata-affiliate-url=["']([^"']*partner-ads\.com\/[^"']*klikbanner\.php[^"']*)["']([^>]*)>/gi)];
  issuedAffiliateLinks+=dataLinks.length;
  for(const match of dataLinks){
    const attrs=(match[1]+' '+match[3]);
    const hrefMatch=attrs.match(/\bhref=["']([^"']+)["']/i);
    const affiliateUrl=match[2].replace(/&amp;/g,'&');
    const bannerMatch=affiliateUrl.match(/[?&]bannerid=(\d+)/i);
    assert(hrefMatch,`${rel}: consent-gated affiliate anchor must still have an inert href`);
    assert(!/partner-ads\.com/i.test(hrefMatch[1]),`${rel}: affiliate href must remain local/inert before consent`);
    assert(/\btarget=["']_blank["']/i.test(attrs),`${rel}: affiliate link must open in a new tab after consent`);
    assert(/rel=["'][^"']*sponsored[^"']*nofollow[^"']*noopener[^"']*["']/i.test(attrs),`${rel}: affiliate link must be sponsored nofollow noopener`);
    assert(affiliateUrl.includes(`partnerid=${PARTNER_ID}`),`${rel}: unexpected Partner-Ads partner id`);
    assert(bannerMatch&&APPROVED_BANNERS[bannerMatch[1]],`${rel}: unapproved Partner-Ads banner id`);
    const approved=APPROVED_BANNERS[bannerMatch[1]];
    assert.equal(rel,approved.page,`${rel}: ${approved.brand} affiliate link placed on unexpected page`);
    assert(!seenBanners.has(bannerMatch[1]),`${rel}: duplicate issued affiliate banner ${bannerMatch[1]}`);
    seenBanners.set(bannerMatch[1],rel);
  }

  assert(!/<script[^>]+partner-ads\.com/i.test(html),`${rel}: no Partner-Ads scripts allowed`);
  assert(!/<(?:img|iframe)[^>]+partner-ads\.com/i.test(html),`${rel}: no Partner-Ads pixel/banner embeds allowed`);
}

assert.equal(urls.length,23,'expected 23 public URLs after LEI checker release');
const index=fs.readFileSync('index.html','utf8');
assert(/name=["']google-site-verification["']/i.test(index),'Google Search Console verification must remain on the homepage');
assert(/18 gratis værktøjer/i.test(index),'portal tool count must stay in sync');
assert(/skjul-hjemmeadresse-cvr\.html/i.test(index),'CVR privacy checker must be discoverable from portal');
assert(/skal-jeg-have-erhvervskonto\.html/i.test(index),'business account checker must be discoverable from portal');
assert(/skal-jeg-have-lei-kode\.html/i.test(index),'LEI checker must be discoverable from portal');

const cvr=fs.readFileSync('skjul-hjemmeadresse-cvr.html','utf8');
assert(/virksomhedsadresser altid skal offentliggøres/i.test(cvr),'CVR privacy page must state the public business-address rule');
assert(/reklamebeskyttelse/i.test(cvr),'CVR privacy page must surface the free anti-marketing option');
assert(!/partner-ads\.com/i.test(cvr),'CVR privacy page must remain non-commercial before program approval');

const bank=fs.readFileSync('skal-jeg-have-erhvervskonto.html','utf8');
assert(/NemKonto og en betalt erhvervskonto er ikke det samme/i.test(fs.readFileSync('erhvervskonto-lib.js','utf8')),'business account logic must preserve NemKonto/product distinction');
assert(/10 arbejdsdage/i.test(bank),'business account page must disclose the basic-account decision deadline');
assert(/nemkonto\.dk/i.test(bank)&&/finanstilsynet\.dk/i.test(bank)&&/retsinformation\.dk/i.test(bank),'business account page must retain primary official sources');
assert(!/partner-ads\.com/i.test(bank),'business account checker must stay non-commercial until a program is actually approved');

const lei=fs.readFileSync('skal-jeg-have-lei-kode.html','utf8');
const leiLogic=fs.readFileSync('lei-kode-lib.js','utf8');
assert(/ingen bagatelgrænse/i.test(leiLogic),'LEI logic must preserve no-de-minimis rule');
assert(/enkeltmandsvirksomhed/i.test(leiLogic)&&/derivater/i.test(leiLogic)&&/EMIR/i.test(leiLogic),'LEI logic must preserve sole-proprietor derivatives exception');
assert(/eje værdipapirer uden LEI/i.test(leiLogic),'LEI logic must preserve hold-without-trading distinction');
assert(/finanstilsynet\.dk/i.test(lei),'LEI checker must retain Finanstilsynet primary source');
assert(/Reklame · reklamelink for LEI Service DK/i.test(lei),'LEI affiliate disclosure must be explicit');
assert(/data-affiliate-url=["'][^"']*partnerid=57323&amp;bannerid=85033/i.test(lei),'LEI issued tracking URL missing');
assert(/id=["']leiPartnerConsent["'][^>]*type=["']checkbox["']|type=["']checkbox["'][^>]*id=["']leiPartnerConsent["']/i.test(lei),'LEI affiliate consent checkbox missing');
assert(!/id=["']leiPartnerConsent["'][^>]*\bchecked\b/i.test(lei),'LEI affiliate consent must never be pre-checked');
assert(/leiPartnerConsent\.checked/i.test(lei)&&/dataset\.affiliateUrl/i.test(lei),'LEI affiliate URL must only be activated by consent logic');
assert(/leiAd\.hidden=r\.leiRequired!==true/i.test(lei),'LEI ad must only be shown when the rule result says LEI is required');

const digital=fs.readFileSync('skal-jeg-bogfoere-digitalt-2026.html','utf8');
assert(/Reklame · reklamelink for Dinero/i.test(digital),'Dinero affiliate disclosure must remain explicit');
assert(/data-affiliate-url=["'][^"']*partnerid=57323&amp;bannerid=50128/i.test(digital),'Dinero issued tracking URL missing');
assert(/id=["']partnerConsent["'][^>]*type=["']checkbox["']|type=["']checkbox["'][^>]*id=["']partnerConsent["']/i.test(digital),'Dinero affiliate consent checkbox missing');
assert(!/id=["']partnerConsent["'][^>]*\bchecked\b/i.test(digital),'Dinero affiliate consent must never be pre-checked');
assert(/partnerConsent\.checked/i.test(digital)&&/dataset\.affiliateUrl/i.test(digital),'Dinero affiliate URL must only be activated by consent logic');

const purchase=fs.readFileSync('firmakoeb.html','utf8');
assert(/108 %-saldo/i.test(purchase),'firm-purchase page must disclose the 2025-2026 enhanced green basis');
assert(/16\.900 kr\./i.test(purchase),'firm-purchase page must disclose mixed-use 2026 limit');
assert(/Ikke-fradragsberettiget moms/i.test(purchase),'firm-purchase page must keep non-deductible VAT in cost basis');
assert(!/Ingen affiliate-links er aktive endnu/i.test(purchase),'stale affiliate status must not return');

const affiliate=fs.readFileSync('affiliate.html','utf8');
assert(/aktive affiliate-samarbejder med[\s\S]*Dinero[\s\S]*LEI Service DK/i.test(affiliate),'affiliate disclosure must reflect both issued partnerships');
assert(/Beregninger påvirkes aldrig/i.test(affiliate),'affiliate independence rule missing');
assert(/samtykke/i.test(affiliate),'affiliate disclosure must explain consent before tracking');
const privacy=fs.readFileSync('privatliv.html','utf8');
assert(/Partner-Ads/i.test(privacy),'privacy page must describe Partner-Ads click boundary');
assert(/Dinero/i.test(privacy)&&/LEI Service DK/i.test(privacy),'privacy page must name the active Partner-Ads placements');
assert(/samtykke/i.test(privacy),'privacy page must describe affiliate consent boundary');

assert.equal(issuedAffiliateLinks,2,'exactly two issued affiliate placements are allowed');
assert.equal(seenBanners.size,2,'both approved affiliate banners must be present exactly once');
for(const bannerId of Object.keys(APPROVED_BANNERS)) assert(seenBanners.has(bannerId),`approved banner ${bannerId} missing`);

console.log(`compliance-test: ${urls.length} public URLs checked; ${issuedAffiliateLinks} issued affiliate placements compliant; all canonicals required`);
