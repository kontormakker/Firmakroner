const fs=require('fs');

function attr(tag,name){
  const m=tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`,'i'));
  return m?m[1]:null;
}
function meta(html,name){
  for(const tag of html.match(/<meta\b[^>]*>/gi)||[]){
    if((attr(tag,'name')||'').toLowerCase()===name.toLowerCase()) return attr(tag,'content');
  }
  return null;
}
function canonical(html){
  for(const tag of html.match(/<link\b[^>]*>/gi)||[]){
    if((attr(tag,'rel')||'').toLowerCase()==='canonical') return attr(tag,'href');
  }
  return null;
}

const xml=fs.readFileSync('sitemap.xml','utf8');
const urls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1].trim());
if(urls.length<10) throw new Error(`unexpectedly small sitemap: ${urls.length}`);
if(new Set(urls).size!==urls.length) throw new Error('duplicate URL in sitemap');

const seenCanonical=new Set();
for(const url of urls){
  const u=new URL(url);
  const rel=u.pathname.replace(/^\/Firmakroner\/?/,'');
  const file=rel||'index.html';
  if(!fs.existsSync(file)) throw new Error(`sitemap URL has no local file: ${url}`);
  const html=fs.readFileSync(file,'utf8');
  const title=(html.match(/<title>([^<]+)<\/title>/i)||[])[1];
  if(!title||title.trim().length<8) throw new Error(`${file}: missing/short title`);
  const description=meta(html,'description');
  if(!description||description.trim().length<30) throw new Error(`${file}: missing/short meta description`);
  const robots=meta(html,'robots');
  if(!robots||!robots.toLowerCase().includes('index')) throw new Error(`${file}: missing index robots directive`);
  const c=canonical(html);
  if(!c) throw new Error(`${file}: missing canonical`);
  if(c!==url) throw new Error(`${file}: canonical mismatch (${c} != ${url})`);
  if(seenCanonical.has(c)) throw new Error(`${file}: duplicate canonical ${c}`);
  seenCanonical.add(c);
}

if(!fs.existsSync('404.html')) throw new Error('404.html missing');
const page404=fs.readFileSync('404.html','utf8');
const robots404=meta(page404,'robots')||'';
if(!robots404.toLowerCase().includes('noindex')) throw new Error('404.html must be noindex');
if(!/href=["']\.\/?["']/i.test(page404)) throw new Error('404.html must link back to portal');

console.log(`seo-test: ${urls.length} sitemap URLs, metadata, canonicals and 404 guard passed`);
