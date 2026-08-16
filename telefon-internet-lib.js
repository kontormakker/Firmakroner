(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerPhoneInternet=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const BENEFIT_2026=3500;
  function num(v){const n=Number(v);return Number.isFinite(n)?n:0}
  function clamp(v,min,max){return Math.min(max,Math.max(min,v))}
  function calculate(input={}){
    const phoneCost=Math.max(0,num(input.phoneCost));
    const internetCost=Math.max(0,num(input.internetCost));
    const includePhone=Boolean(input.includePhone);
    const includeInternet=Boolean(input.includeInternet);
    const phonePrivate=Boolean(input.phonePrivate);
    const homeBusiness=Boolean(input.homeBusiness);
    const networkAccess=Boolean(input.networkAccess);
    const months=clamp(Math.round(num(input.months)||12),1,12);
    const taxRate=clamp(num(input.taxRate),0,100);

    const deductible=(includePhone?phoneCost:0)+(includeInternet?internetCost:0);
    const phoneTriggers=includePhone&&phonePrivate;
    const internetTriggers=includeInternet&&!homeBusiness&&!networkAccess;
    const benefitTriggers=phoneTriggers||internetTriggers;
    const taxableBenefit=benefitTriggers?BENEFIT_2026*(months/12):0;
    const netTaxBaseEffect=deductible-taxableBenefit;
    const estimatedTaxEffect=netTaxBaseEffect*(taxRate/100);

    return {
      deductible,
      phoneTriggers,
      internetTriggers,
      benefitTriggers,
      taxableBenefit,
      netTaxBaseEffect,
      estimatedTaxEffect,
      months,
      taxRate
    };
  }
  return {BENEFIT_2026,calculate};
});
