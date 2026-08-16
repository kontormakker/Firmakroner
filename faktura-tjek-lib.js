(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerInvoiceCheck=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const FULL_FIELDS=[
    ['date','Fakturadato'],
    ['number','Fortløbende fakturanummer'],
    ['seller','Sælgers navn og adresse'],
    ['sellerVat','Sælgers CVR-/SE-nummer'],
    ['buyer','Kundens navn og adresse'],
    ['description','Varens/ydelsens art og mængde/omfang'],
    ['delivery','Leveringsdato, hvis den er forskellig fra fakturadato'],
    ['base','Momsgrundlag og pris pr. enhed uden moms samt relevante rabatter'],
    ['rate','Momssats'],
    ['vatAmount','Momsbeløb']
  ];
  const SIMPLE_FIELDS=[
    ['date','Fakturadato'],
    ['number','Fortløbende fakturanummer'],
    ['seller','Sælgers navn og adresse'],
    ['sellerVat','Sælgers CVR-/SE-nummer'],
    ['description','Varens/ydelsens art og mængde/omfang'],
    ['simpleTotalVat','Samlet omsætningsbeløb og momsbeløb (eller oplysninger til at beregne momsen)']
  ];
  function num(v){const n=Number(v);return Number.isFinite(n)?n:0}
  function check(input={}){
    const amount=Math.max(0,num(input.amount));
    const buyerRegistered=input.buyerRegistered!==false;
    const buyerRequestsFull=Boolean(input.buyerRequestsFull);
    const deliveryDifferent=Boolean(input.deliveryDifferent);
    const normalDomestic=input.normalDomestic!==false;

    if(!normalDomestic){
      return {supported:false,reason:'Værktøjet er afgrænset til almindeligt dansk salg. EU-salg, fjernsalg og særlige fakturaregler skal vurderes særskilt.'};
    }
    if(!buyerRegistered){
      return {supported:false,reason:'Denne version tjekker fakturaer til en dansk momsregistreret virksomhed. Salg til private har særregler og er derfor ikke klassificeret her.'};
    }

    const simplified=amount<3000&&!buyerRequestsFull;
    const source=simplified?SIMPLE_FIELDS:FULL_FIELDS;
    const required=source.filter(([key])=>!(key==='delivery'&&!deliveryDifferent));
    const missing=required.filter(([key])=>!Boolean(input.fields&&input.fields[key])).map(([,label])=>label);
    return {
      supported:true,
      amount,
      invoiceType:simplified?'simplified':'full',
      simplified,
      required:required.map(([,label])=>label),
      missing,
      complete:missing.length===0
    };
  }
  return {FULL_FIELDS,SIMPLE_FIELDS,check};
});
