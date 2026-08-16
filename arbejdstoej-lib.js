(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerWorkwear=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function num(v){const n=Number(v);return Number.isFinite(n)?n:0}
  function clamp(v,min,max){return Math.min(max,Math.max(min,v))}
  function assess(input={}){
    const cost=Math.max(0,num(input.cost));
    const special=Boolean(input.special);
    const privateSuitable=Boolean(input.privateSuitable);
    const extraCost=Math.max(0,num(input.extraCost));
    const documented=Boolean(input.documented);
    let status='uncertain';
    let reason='Fradrag for arbejdstøj kræver en konkret vurdering af både tøjets karakter og den reelle merudgift.';
    let deductible=null;

    if(privateSuitable || !special){
      status='no';
      reason='Tøjet er ikke markeret som specialbeklædning, der er uegnet til privat brug. Almindeligt tøj er som udgangspunkt en privat udgift, også når det bruges på arbejde.';
      deductible=0;
    }else if(extraCost<=0){
      status='no';
      reason='Selv specialbeklædning kræver en reel merudgift, når besparelsen på almindeligt tøj tages med. Du har ikke angivet en merudgift.';
      deductible=0;
    }else if(!documented){
      status='possible';
      reason='Tøjet og merudgiften peger i den rigtige retning, men dokumentation for køb og merudgift mangler i dette scenario.';
      deductible=null;
    }else{
      status='possible';
      reason='Du har angivet specialbeklædning, der ikke egner sig privat, samt en dokumenteret merudgift. Det matcher de centrale betingelser i Den juridiske vejledning.';
      deductible=clamp(extraCost,0,cost);
    }
    return {cost,special,privateSuitable,extraCost,documented,status,reason,deductible};
  }
  return {assess};
});
