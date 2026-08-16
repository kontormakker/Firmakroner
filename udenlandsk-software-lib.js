(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerForeignSoftware=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function num(v){const n=Number(v);return Number.isFinite(n)?n:0}
  function clamp(v,min,max){return Math.min(max,Math.max(min,v))}
  function calculate(input={}){
    const amount=Math.max(0,num(input.amount));
    const location=input.location==='non-eu'?'non-eu':'eu';
    const vatRegistered=Boolean(input.vatRegistered);
    const pmv=Boolean(input.pmv);
    const foreignVat=Boolean(input.foreignVat);
    const businessUse=clamp(num(input.businessUse),0,100);
    const registrationRequired=!vatRegistered;
    const pmvConversionRequired=pmv&&!vatRegistered;
    const invoiceProblem=foreignVat;
    const reverseVat=invoiceProblem?0:amount*0.25;
    const deductibleVat=invoiceProblem||!vatRegistered?0:reverseVat*(businessUse/100);
    const netVat=invoiceProblem?0:reverseVat-deductibleVat;
    return {
      amount,location,vatRegistered,pmv,foreignVat,businessUse,
      registrationRequired,pmvConversionRequired,invoiceProblem,
      reverseVat,deductibleVat,netVat,
      euBoxA:location==='eu'&&!invoiceProblem?amount:0
    };
  }
  return {calculate};
});
