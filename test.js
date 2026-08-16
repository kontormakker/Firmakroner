const assert=require('assert');
const {calculate,SMALL_ASSET_LIMIT_2026,MIXED_ASSET_LIMIT_2026,GREEN_FACTOR_2025_2026}=require('./firmakoeb-lib.js');
const near=(a,b)=>assert.ok(Math.abs(a-b)<0.01,`${a} != ${b}`);
let n=0,r;

assert.equal(SMALL_ASSET_LIMIT_2026,36000);assert.equal(MIXED_ASSET_LIMIT_2026,16900);assert.equal(GREEN_FACTOR_2025_2026,1.08);n++;

r=calculate({gross:10000,vatRate:25,vatRegistered:true,vatDeductPct:100,taxDeductPct:100,taxRatePct:40,type:'asset',deprRatePct:25});
near(r.vatPart,2000);near(r.vatDeduction,2000);near(r.costAfterVat,8000);near(r.taxBase,8000);near(r.taxSaving,3200);near(r.firstYearScenarioCost,4800);assert.equal(r.treatment,'small-asset');n++;

r=calculate({gross:10000,vatRate:25,vatRegistered:false,vatDeductPct:100,taxDeductPct:100,taxRatePct:40,type:'asset'});
near(r.vatDeduction,0);near(r.costAfterVat,10000);near(r.taxBase,10000);n++;

r=calculate({gross:45000,vatRate:25,vatRegistered:true,vatDeductPct:100,taxDeductPct:100,type:'asset',deprRatePct:25});
near(r.costAfterVat,36000);assert(r.ordinarySmallAsset);near(r.taxBase,36000);n++;

r=calculate({gross:45001,vatRate:25,vatRegistered:true,vatDeductPct:100,taxDeductPct:100,type:'asset',deprRatePct:25});
assert(r.ordinaryLargeAsset);near(r.taxBase,r.costAfterVat*0.25);n++;

// Non-deductible VAT stays in acquisition cost. With only 50% VAT deduction, 45k gross becomes 40.5k tax basis, not 36k.
r=calculate({gross:45000,vatRate:25,vatRegistered:true,vatDeductPct:50,taxDeductPct:100,type:'asset',deprRatePct:25});
near(r.vatPart,9000);near(r.vatDeduction,4500);near(r.costAfterVat,40500);assert(r.ordinaryLargeAsset);near(r.taxBase,10125);n++;

r=calculate({gross:50000,vatRate:25,vatRegistered:true,vatDeductPct:100,taxDeductPct:75,type:'asset',taxRatePct:40});
assert(r.mixedUseAsset);assert.equal(r.treatment,'mixed-paused');near(r.taxBase,0);near(r.taxSaving,0);n++;

r=calculate({gross:50000,vatRate:25,vatRegistered:true,vatDeductPct:100,taxDeductPct:100,type:'asset',deprRatePct:10,taxRatePct:40});
near(r.costAfterVat,40000);near(r.taxBase,4000);near(r.taxSaving,1600);n++;

const greenBase={gross:125000,vatRate:25,vatRegistered:true,vatDeductPct:100,taxDeductPct:100,type:'asset',deprRatePct:25,taxRatePct:40,greenRequested:true,greenInPeriod:true,greenFactoryNew:true,greenElectricOrBattery:true,greenNoImmediateWriteOff:true,greenExcludedType:false,greenFossilCapable:false};
r=calculate(greenBase);
assert(r.greenEligible&&r.greenApplied);near(r.costAfterVat,100000);near(r.greenEnhancedBasis,108000);near(r.taxBase,27000);near(r.ordinaryTaxBase,25000);near(r.greenVsOrdinaryFirstYear,2000);near(r.taxSaving,10800);n++;

r=calculate({...greenBase,greenNoImmediateWriteOff:false});
assert(!r.greenEligible&&!r.greenApplied);near(r.taxBase,25000);n++;

r=calculate({...greenBase,greenExcludedType:true});
assert(!r.greenEligible&&!r.greenApplied);near(r.taxBase,25000);n++;

r=calculate({...greenBase,taxDeductPct:80});
assert(!r.greenEligible);assert.equal(r.treatment,'mixed-paused');near(r.taxBase,0);n++;

// Under the small-asset limit, enhanced saldo can have a higher lifetime basis but a lower first-year deduction than ordinary immediate deduction.
r=calculate({...greenBase,gross:12500});
near(r.costAfterVat,10000);near(r.ordinaryTaxBase,10000);near(r.greenFirstYearTaxBase,2700);near(r.taxBase,2700);assert(r.greenVsOrdinaryFirstYear<0);n++;

r=calculate({gross:12500,vatRate:25,vatRegistered:true,vatDeductPct:100,taxDeductPct:60,type:'expense',taxRatePct:40});
near(r.costAfterVat,10000);near(r.taxBase,6000);near(r.taxSaving,2400);assert.equal(r.treatment,'expense');n++;

r=calculate({gross:-100,vatRate:25,vatRegistered:true,vatDeductPct:100,taxDeductPct:100,type:'asset'});
near(r.gross,0);near(r.costAfterVat,0);near(r.taxBase,0);n++;

console.log(`firmakoeb: ${n}/15 audited tests passed`);
