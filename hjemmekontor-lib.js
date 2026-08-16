(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerHomeOffice=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function num(v){const n=Number(v);return Number.isFinite(n)?n:0}
  function clamp(v,min,max){return Math.min(max,Math.max(min,v))}
  function assess(input={}){
    const privatePossible=Boolean(input.privatePossible);
    const mainWorkplace=Boolean(input.mainWorkplace);
    const normalHours=Boolean(input.normalHours);
    const exclusiveBusiness=Boolean(input.exclusiveBusiness);
    const equipmentCost=Math.max(0,num(input.equipmentCost));
    const businessUse=clamp(num(input.businessUse),0,100);
    const equipmentDeduction=equipmentCost*(businessUse/100);

    let roomStatus='uncertain';
    let roomReason='Fradrag for selve rummet kræver en konkret samlet vurdering.';
    if(privatePossible || !exclusiveBusiness){
      roomStatus='unlikely';
      roomReason='Rummet kan bruges privat eller er ikke udelukkende erhvervsmæssigt. Det taler stærkt imod fradrag for selve rummet.';
    }else if(mainWorkplace && normalHours){
      roomStatus='possible';
      roomReason='Rummet er angivet som uegnet til privat brug, udelukkende erhvervsmæssigt og som hovedarbejdssted i normal arbejdstid. Det er de stærkeste signaler, men fradraget er stadig en konkret vurdering.';
    }else{
      roomStatus='weak';
      roomReason='Selv uden privat brug mangler et eller flere af de forhold, praksis lægger vægt på: hovedarbejdssted og væsentlig brug i normal arbejdstid.';
    }
    return {roomStatus,roomReason,equipmentCost,businessUse,equipmentDeduction};
  }
  return {assess};
});
