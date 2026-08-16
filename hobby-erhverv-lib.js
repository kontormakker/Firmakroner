(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerHobbyBusiness=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function num(v){const n=Number(v);return Number.isFinite(n)?Math.max(0,n):0}
  function assess(input={}){
    const profitOutlook=Boolean(input.profitOutlook);
    const systematicIncome=Boolean(input.systematicIncome);
    const intensity=Boolean(input.intensity);
    const budget=Boolean(input.budget);
    const skills=Boolean(input.skills);
    const persistentSupport=Boolean(input.persistentSupport);
    const privatePurpose=Boolean(input.privatePurpose);
    const privateUseAssets=Boolean(input.privateUseAssets);
    const revenue=num(input.revenue);
    const relatedExpenses=num(input.relatedExpenses);

    const positives=[]; const warnings=[];
    if(profitOutlook) positives.push('realistisk udsigt til rentabel drift'); else warnings.push('ingen realistisk udsigt til overskud er markeret');
    if(systematicIncome) positives.push('systematisk indtjening er et centralt formål'); else warnings.push('aktiviteten er ikke markeret som systematisk indtægtserhvervelse');
    if(intensity) positives.push('aktiviteten har en vis intensitet og seriøsitet'); else warnings.push('lav intensitet/omfang er markeret');
    if(budget) positives.push('lønsomhed/budget er undersøgt');
    if(skills) positives.push('relevante faglige forudsætninger er markeret');
    if(persistentSupport) warnings.push('driften forventes vedvarende at kræve penge fra anden indkomst');
    if(privatePurpose) warnings.push('et væsentligt privat/hobbyformål er markeret');
    if(privateUseAssets) warnings.push('virksomhedsaktiver bruges også privat');

    let signal='mixed';
    if(profitOutlook&&systematicIncome&&intensity&&!privatePurpose&&!persistentSupport) signal='business';
    if((!profitOutlook&&!intensity)||(privatePurpose&&!systematicIncome)||(!profitOutlook&&persistentSupport)) signal='hobby';

    const net=revenue-relatedExpenses;
    const hobbyTaxableNet=Math.max(0,net);
    const hobbyLossNoOffset=Math.max(0,-net);
    return {signal,positives,warnings,revenue,relatedExpenses,net,hobbyTaxableNet,hobbyLossNoOffset};
  }
  return {assess};
});
