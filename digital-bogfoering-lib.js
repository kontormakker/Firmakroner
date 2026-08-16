(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports) module.exports=api;
  else root.FirmaKronerDigitalBooks=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  const THRESHOLD=300000;
  function num(v){const n=Number(v);return Number.isFinite(n)?Math.max(0,n):0}
  function assess(input={}){
    const startYear=Math.trunc(num(input.startYear)||2024);
    const turnover2024=num(input.turnover2024);
    const turnover2025=num(input.turnover2025);
    const personOwned=input.personOwned!==false;

    if(!personOwned){
      return {supported:false,reason:'Denne checker er afgrænset til personligt ejede virksomheder. Selskaber som ApS/A/S følger andre ikrafttrædelsesregler.'};
    }
    if(startYear>=2026){
      return {supported:true,required2026:false,status:'not-yet',reason:'En personligt ejet virksomhed stiftet i 2026 er ikke omfattet allerede fra starten. Kravet kan tidligst indtræde fra starten af virksomhedens tredje indkomstår, hvis den faktiske nettoomsætning har oversteget 300.000 kr. i de to foregående indkomstår.'};
    }
    if(startYear===2025){
      return {supported:true,required2026:false,status:'not-yet',reason:'Virksomheden har kun ét indkomstår bag sig før 2026. Kravet kan tidligst indtræde fra starten af tredje indkomstår, hvis den faktiske nettoomsætning overstiger 300.000 kr. i både første og andet indkomstår.'};
    }
    const over2024=turnover2024>THRESHOLD;
    const over2025=turnover2025>THRESHOLD;
    const required2026=over2024&&over2025;
    return {
      supported:true,required2026,status:required2026?'required':'not-required',
      reason:required2026
        ? 'Nettoomsætningen er over 300.000 kr. i begge de to indkomstår umiddelbart før 2026. Det udløser pligt til digital bogføring fra første indkomstperiode, der starter 1. januar 2026 eller senere.'
        : 'Kravet om digital bogføring udløses ikke af omsætningsgrænsen i 2026, fordi nettoomsætningen ikke er over 300.000 kr. i begge de to foregående indkomstår.',
      turnover2024,turnover2025,over2024,over2025
    };
  }
  return {THRESHOLD,assess};
});
