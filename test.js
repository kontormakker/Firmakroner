const assert=(c,m)=>{if(!c)throw new Error(m)};
function calc({gross=10000,rate=25,vatRegistered=true,vatDeduct=100,taxDeduct=100,taxRate=40,type='asset',deprRate=25}={}){
 const vatPart=rate?gross*rate/(100+rate):0;
 const vatBack=vatPart*(vatRegistered?vatDeduct/100:0);
 const afterVat=gross-vatBack;
 const thresholdBasis=vatRegistered?gross-vatPart:gross;
 const mixedUseAsset=type==='asset'&&taxDeduct<100;
 const overThreshold=type==='asset'&&!mixedUseAsset&&thresholdBasis>36000;
 const deductibleBase=afterVat*(taxDeduct/100);
 const taxBase=mixedUseAsset?0:(overThreshold?deductibleBase*(deprRate/100):deductibleBase);
 const taxSave=taxBase*(taxRate/100);
 return{vatPart,vatBack,afterVat,thresholdBasis,mixedUseAsset,overThreshold,taxBase,taxSave,effective:afterVat-taxSave};
}
const near=(a,b)=>Math.abs(a-b)<.01;let n=0,r;
r=calc();assert(near(r.vatPart,2000),'VAT extraction');assert(near(r.afterVat,8000),'after VAT');assert(near(r.taxSave,3200),'tax scenario');assert(near(r.effective,4800),'effective scenario');n++;
r=calc({vatRegistered:false});assert(near(r.vatBack,0),'no VAT deduction');assert(near(r.afterVat,10000),'gross stays');n++;
r=calc({vatDeduct:50,taxDeduct:50});assert(near(r.vatBack,1000),'partial VAT');assert(r.mixedUseAsset,'mixed-use detected');assert(near(r.taxSave,0),'mixed-use tax paused');n++;
r=calc({gross:45000});assert(!r.overThreshold,'45k gross equals 36k net, not over');n++;
r=calc({gross:45001});assert(r.overThreshold,'just over 36k net');n++;
r=calc({gross:50000,deprRate:25});assert(near(r.taxBase,10000),'25% first-year depreciation base');assert(near(r.taxSave,4000),'large asset first-year tax effect');n++;
r=calc({gross:50000,deprRate:10});assert(near(r.taxBase,4000),'10% depreciation');n++;
r=calc({gross:50000,type:'expense'});assert(!r.overThreshold,'expense bypasses asset threshold');assert(r.taxSave>10000,'expense scenario');n++;
console.log(`${n}/8 tests passed`);