(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerCourse=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function num(v){const n=Number(v);return Number.isFinite(n)?n:0}
  function assess(input={}){
    const cost=Math.max(0,num(input.cost));
    const directRelation=Boolean(input.directRelation);
    const maintainsKnowledge=Boolean(input.maintainsKnowledge);
    const newQualification=Boolean(input.newQualification);
    const newIncomeArea=Boolean(input.newIncomeArea);
    const privateCharacter=Boolean(input.privateCharacter);
    let status='uncertain', reason='Kursets forbindelse til din nuværende indtjening skal vurderes konkret.', deductibleEstimate=null;

    if(privateCharacter){
      status='no';
      reason='Kurset er markeret som helt eller delvist privat. Private kursusudgifter kan ikke trækkes fra som virksomhedsudgift.';
      deductibleEstimate=0;
    }else if(newQualification||newIncomeArea){
      status='no';
      reason='Kurset ser ud til at skabe nye kvalifikationer eller et nyt indkomstgrundlag. Det taler imod fradrag som løbende driftsudgift.';
      deductibleEstimate=0;
    }else if(directRelation&&maintainsKnowledge){
      status='possible';
      reason='Kurset er angivet som direkte knyttet til din nuværende indtjening og som vedligeholdelse/ajourføring af eksisterende faglig viden. Det matcher de stærkeste signaler for fradrag.';
      deductibleEstimate=cost;
    }
    return {status,reason,cost,deductibleEstimate};
  }
  return {assess};
});
