(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerPMV=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const VAT_THRESHOLD=50000;
  function num(v){const n=Number(v);return Number.isFinite(n)?Math.max(0,n):0}
  function assess(input={}){
    const turnover=num(input.turnover);
    const wantsVat=Boolean(input.wantsVat);
    const needsEmployees=Boolean(input.needsEmployees);
    const buysForeignServices=Boolean(input.buysForeignServices);
    const reasons=[];
    const cautions=[];

    if(turnover>VAT_THRESHOLD) reasons.push('Den forventede momspligtige omsætning er over 50.000 kr. i kalenderåret, så virksomheden skal momsregistreres. En PMV kan ikke være momsregistreret.');
    if(turnover===VAT_THRESHOLD) cautions.push('Du ligger præcis på 50.000 kr. Grænsen for obligatorisk momsregistrering er “mere end 50.000 kr.”, men der er ingen buffer, hvis omsætningen bliver højere end forventet.');
    if(wantsVat) reasons.push('Du vil være frivilligt momsregistreret for fx at få momsfradrag. En PMV kan ikke være momsregistreret.');
    if(needsEmployees) reasons.push('Du har brug for ansatte. En PMV kan ikke have ansatte.');
    if(buysForeignServices) reasons.push('Du forventer køb af ydelser fra udenlandske virksomheder, som kan gøre dansk momsregistrering nødvendig efter reglerne om omvendt betalingspligt. Det passer ikke med en PMV, som ikke er momsregistreret.');

    let status='possible';
    if(reasons.length) status='no';
    else if(turnover===VAT_THRESHOLD) status='edge';
    return {status,turnover,wantsVat,needsEmployees,buysForeignServices,reasons,cautions};
  }
  return {VAT_THRESHOLD,assess};
});
