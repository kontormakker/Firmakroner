(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerPMV=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const PMV_LIMIT=50000;
  function num(v){const n=Number(v);return Number.isFinite(n)?Math.max(0,n):0}
  function assess(input={}){
    const turnover=num(input.turnover);
    const wantsVat=Boolean(input.wantsVat);
    const needsEmployees=Boolean(input.needsEmployees);
    const buysForeignServices=Boolean(input.buysForeignServices);
    const needsNonEuTrade=Boolean(input.needsNonEuTrade);
    const reasons=[];

    if(turnover>=PMV_LIMIT) reasons.push('En PMV er for momspligtig omsætning under 50.000 kr. pr. kalenderår. Ved 50.000 kr. eller derover passer PMV derfor ikke til denne case. Den almindelige pligt til momsregistrering indtræder først, når den momspligtige omsætning overstiger 50.000 kr. i kalenderåret.');
    if(wantsVat) reasons.push('Du vil være momsregistreret. En PMV kan ikke være momsregistreret, så det kræver en anden virksomhedsregistrering, fx enkeltmandsvirksomhed.');
    if(needsEmployees) reasons.push('Du har brug for ansatte. En PMV kan ikke have ansatte.');
    if(buysForeignServices) reasons.push('Du forventer at købe ydelser fra virksomheder i udlandet, fx SaaS. Sådanne køb kan kræve dansk momsregistrering, hvilket ikke er foreneligt med PMV.');
    if(needsNonEuTrade) reasons.push('Du forventer import eller eksport af varer uden for EU. En PMV kan ikke registreres som importør eller eksportør til handel uden for EU.');

    return {status:reasons.length?'no':'possible',turnover,wantsVat,needsEmployees,buysForeignServices,needsNonEuTrade,reasons};
  }
  return {PMV_LIMIT,assess};
});
