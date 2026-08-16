(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerRepresentation=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function num(v){const n=Number(v);return Number.isFinite(n)?n:0}
  function calculate(input={}){
    const gross=Math.max(0,num(input.amount));
    const vatRate=Math.max(0,num(input.vatRate));
    const vatRegistered=Boolean(input.vatRegistered);
    const businessConnection=Boolean(input.businessConnection);
    const type=['advertising','restaurant','representation'].includes(input.type)?input.type:'representation';
    const vat=gross-(gross/(1+vatRate/100));
    const net=gross-vat;
    let vatDeduction=0;
    let incomeTaxDeduction=0;
    let deductibleExpenseBase=0;

    if(type==='advertising'){
      vatDeduction=vatRegistered?vat:0;
      deductibleExpenseBase=gross-vatDeduction;
      incomeTaxDeduction=deductibleExpenseBase;
    }else if(type==='restaurant'){
      // Current SKAT guidance allows full input-VAT deduction for restaurant costs
      // incurred for business connections. Other restaurant situations have their
      // own rules, so this calculator deliberately does not guess them.
      vatDeduction=vatRegistered&&businessConnection?vat:0;
      deductibleExpenseBase=gross-vatDeduction;
      incomeTaxDeduction=deductibleExpenseBase*0.25;
    }else{
      vatDeduction=0;
      deductibleExpenseBase=gross;
      incomeTaxDeduction=gross*0.25;
    }
    return {gross,vat,net,type,vatDeduction,deductibleExpenseBase,incomeTaxDeduction};
  }
  return {calculate};
});
