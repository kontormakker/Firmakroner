const assert=require('assert');
function classify({months,kind,use,docs=true}){
  if(use==='private')return'no';
  if(kind==='establishment')return'no';
  if(kind==='unsure')return'caution';
  if(months>6)return'caution';
  if(kind==='asset')return'caution';
  if(use==='mixed')return'caution';
  return'possible';
}
assert.equal(classify({months:3,kind:'operating',use:'business'}),'possible');
assert.equal(classify({months:3,kind:'establishment',use:'business'}),'no');
assert.equal(classify({months:1,kind:'operating',use:'private'}),'no');
assert.equal(classify({months:7,kind:'operating',use:'business'}),'caution');
assert.equal(classify({months:3,kind:'asset',use:'business'}),'caution');
console.log('5/5 startup-expense classification tests passed');
