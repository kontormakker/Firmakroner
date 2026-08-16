(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerPurchase=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const SMALL_ASSET_LIMIT_2026=36000;
  const MIXED_ASSET_LIMIT_2026=16900;
  const MAX_DEPR_RATE=25;
  const GREEN_FACTOR_2025_2026=1.08;

  function num(v,min=0,max=Infinity){
    const n=Number(v);
    if(!Number.isFinite(n)) return min;
    return Math.min(max,Math.max(min,n));
  }

  function calculate(input={}){
    const gross=num(input.gross);
    const vatRate=num(input.vatRate,0,100);
    const vatRegistered=Boolean(input.vatRegistered);
    const vatDeductPct=vatRegistered?num(input.vatDeductPct,0,100):0;
    const type=input.type==='expense'?'expense':'asset';
    const taxDeductPct=num(input.taxDeductPct,0,100);
    const taxRatePct=num(input.taxRatePct,0,65);
    const deprRatePct=num(input.deprRatePct,0,MAX_DEPR_RATE);

    const vatPart=vatRate?gross*vatRate/(100+vatRate):0;
    const vatDeduction=vatPart*(vatDeductPct/100);
    // Non-deductible VAT is an actual cost and therefore remains in the tax acquisition/cost basis.
    const costAfterVat=gross-vatDeduction;

    const mixedUseAsset=type==='asset'&&taxDeductPct<100;
    const ordinarySmallAsset=type==='asset'&&!mixedUseAsset&&costAfterVat<=SMALL_ASSET_LIMIT_2026;
    const ordinaryLargeAsset=type==='asset'&&!mixedUseAsset&&costAfterVat>SMALL_ASSET_LIMIT_2026;

    const greenRequested=Boolean(input.greenRequested);
    const greenConditions={
      inPeriod:Boolean(input.greenInPeriod),
      factoryNew:Boolean(input.greenFactoryNew),
      electricOrBattery:Boolean(input.greenElectricOrBattery),
      excludedType:Boolean(input.greenExcludedType),
      fossilCapable:Boolean(input.greenFossilCapable)
    };
    const greenEligible=type==='asset'&&!mixedUseAsset&&greenConditions.inPeriod&&greenConditions.factoryNew&&greenConditions.electricOrBattery&&!greenConditions.excludedType&&!greenConditions.fossilCapable;
    const greenApplied=greenRequested&&greenEligible;

    let ordinaryTaxBase=0;
    let taxBase=0;
    let treatment='expense';
    let pausedReason='';

    if(type==='expense'){
      ordinaryTaxBase=costAfterVat*(taxDeductPct/100);
      taxBase=ordinaryTaxBase;
      treatment='expense';
    }else if(mixedUseAsset){
      treatment='mixed-paused';
      pausedReason='Blandet privat/erhvervsmæssig brug følger særregler. FirmaKroner stopper skatteestimatet i stedet for at anvende den almindelige 36.000-kr.-grænse.';
    }else{
      ordinaryTaxBase=ordinarySmallAsset?costAfterVat:costAfterVat*(deprRatePct/100);
      if(greenApplied){
        taxBase=costAfterVat*GREEN_FACTOR_2025_2026*(deprRatePct/100);
        treatment='green-saldo';
      }else{
        taxBase=ordinaryTaxBase;
        treatment=ordinarySmallAsset?'small-asset':'ordinary-saldo';
      }
    }

    const taxSaving=taxBase*(taxRatePct/100);
    const firstYearScenarioCost=Math.max(0,costAfterVat-taxSaving);
    const greenEnhancedBasis=greenEligible?costAfterVat*GREEN_FACTOR_2025_2026:0;
    const greenFirstYearTaxBase=greenEligible?greenEnhancedBasis*(deprRatePct/100):0;
    const greenVsOrdinaryFirstYear=greenEligible?greenFirstYearTaxBase-ordinaryTaxBase:0;

    return {
      gross,vatRate,vatRegistered,vatDeductPct,type,taxDeductPct,taxRatePct,deprRatePct,
      vatPart,vatDeduction,costAfterVat,
      mixedUseAsset,ordinarySmallAsset,ordinaryLargeAsset,
      greenRequested,greenConditions,greenEligible,greenApplied,greenEnhancedBasis,greenFirstYearTaxBase,greenVsOrdinaryFirstYear,
      ordinaryTaxBase,taxBase,taxSaving,firstYearScenarioCost,treatment,pausedReason,
      smallAssetLimit:SMALL_ASSET_LIMIT_2026,mixedAssetLimit:MIXED_ASSET_LIMIT_2026
    };
  }

  return {SMALL_ASSET_LIMIT_2026,MIXED_ASSET_LIMIT_2026,MAX_DEPR_RATE,GREEN_FACTOR_2025_2026,calculate};
});
