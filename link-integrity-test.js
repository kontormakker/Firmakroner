const fs=require('fs');
const path=require('path');
const assert=require('assert');

const xml=fs.readFileSync('sitemap.xml','utf8');
const base='https://kontormakker.github.io/Firmakroner/';
const publicUrls=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const publicFiles=new Set(publicUrls.map(url=>url===base?'index.html':url.slice(base.length)));

function localTarget(from,href){
  const raw=href.split('#')[0].split('?')[0];
  if(!raw||raw==='./'||raw==='.') return 'index.html';
  if(raw.startsWith('/Firmakroner/')) return raw.slice('/Firmakroner/'.length)||'index.html';
  if(raw.startsWith('/')) return null; // absolute path outside this Pages project
  const resolved=path.posix.normalize(path.posix.join(path.posix.dirname(from),raw));
  return resolved.endsWith('/')?resolved+'index.html':resolved;
}

let internal=0,external=0,newTabs=0;
for(const file of publicFiles){
  assert(fs.existsSync(file),`${file}: sitemap file missing`);
  const html=fs.readFileSync(file,'utf8');
  const anchors=[...html.matchAll(/<a\b([^>]*)>/gi)];
  for(const [,attrs] of anchors){
    const hrefMatch=attrs.match(/\bhref=["']([^"']+)["']/i);
    if(!hrefMatch) continue;
    const href=hrefMatch[1].replace(/&amp;/g,'&');
    assert(!/^javascript:/i.test(href),`${file}: javascript: links are forbidden`);
    assert(!/^http:\/\//i.test(href),`${file}: insecure external link ${href}`);

    if(/^https:\/\//i.test(href)){
      external++;
    }else if(/^mailto:/i.test(href)||/^tel:/i.test(href)||href.startsWith('#')){
      // valid non-file destinations
    }else{
      const target=localTarget(file,href);
      assert(target,`${file}: absolute local link escapes Pages project: ${href}`);
      assert(fs.existsSync(target),`${file}: broken internal link ${href} -> ${target}`);
      internal++;
    }

    if(/\btarget=["']_blank["']/i.test(attrs)){
      newTabs++;
      const rel=(attrs.match(/\brel=["']([^"']*)["']/i)||[])[1]||'';
      assert(/\bnoopener\b/i.test(rel),`${file}: target=_blank must include rel=noopener (${href})`);
    }
  }
}

assert(internal>0,'expected internal links');
assert(external>0,'expected external source links');
console.log(`link-integrity-test: ${publicFiles.size} pages, ${internal} internal links, ${external} external links, ${newTabs} secured new-tab links`);
