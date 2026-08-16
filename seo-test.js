const fs=require('fs');
const path=require('path');

const xml=fs.readFileSync('sitemap.xml','utf8');
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
if(!urls.length) throw new Error('sitemap has no URLs');

const seenCanonical=new Set();
for(const url of urls){
  const u=new URL(url);
  const rel=u.pathname.replace(/^\/Firmakroner\/?/,'');
  const file=rel||'index.html';
  if(!fs.existsSync(file)) throw new Error(`sitemap URL has no file: ${url} -> ${file}`);
  const html=fs.readFileSync(file,'utf8');
  if(!/<title>[^<]{8,}<\/title>/i.test(html)) throw new Error(`${file}: missing/short title`);
  if(!/<meta\s+name=["']description["']\s+content=["'][^"']{40,}["']/i.test(html)) throw new Error(`${file}: missing/short meta description`);
  if(!/<meta\s+name=["']robots["']\s+content=["'][^"']*index[^"']*["']/i.test(html)) throw new Error(`${file}: missing index robots directive`);
  const canonical=(html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)||[])[1];
  if(!canonical) throw new Error(`${file}: missing canonical`);
  if(canonical!==url) throw new Error(`${file}: canonical mismatch (${canonical} != ${url})`);
  if(seenCanonical.has(canonical)) throw new Error(`${file}: duplicate canonical ${canonical}`);
  seenCanonical.add(canonical);
}

const toolFiles=urls
  .map(url=>new URL(url).pathname.replace(/^\/Firmakroner\/?/,'')||'index.html')
  .filter(file=>!['index.html','om.html','privatliv.html','affiliate.html','satser-2026.html'].includes(file));
for(const file of toolFiles){
  const html=fs.readFileSync(file,'utf8');
  if(!/(skat\.dk|info\.skat\.dk|erhvervsstyrelsen\.dk|virksomhedsguiden\.dk)/i.test(html)){
    throw new Error(`${file}: no official source domain found`);
  }
}

const page404=fs.readFileSync('404.html','utf8');
if(!/noindex/i.test(page404)) throw new Error('404.html must be noindex');
if(!/href=["']\.\/?["']/i.test(page404)) throw new Error('404.html must link back to portal');

console.log(`seo-test: ${urls.length} sitemap URLs, canonicals and source guards passed`);
