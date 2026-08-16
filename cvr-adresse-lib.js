(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.FirmaKronerCvrAddress=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function assess(input={}){
    const goal=String(input.goal||'privacy');
    const businessAtHome=Boolean(input.businessAtHome);
    const cprProtected=Boolean(input.cprProtected);

    if(goal==='marketing'){
      return {
        status:'free-protection',
        title:'Du behøver ikke en ny virksomhedsadresse for dét',
        summary:'Hvis målet kun er færre salgs- og reklamehenvendelser, er CVR-reklamebeskyttelse den relevante gratis løsning. For personligt ejede virksomheder kan Robinsonlisten være et ekstra lag.',
        paidAddress:false
      };
    }

    if(goal==='google'){
      return {
        status:'google-only',
        title:'Google-profil og CVR er to forskellige ting',
        summary:'En udekørende servicevirksomhed kan skjule adressen på sin Google Virksomhedsprofil, men det ændrer ikke den virksomhedsadresse, der offentliggøres i CVR.',
        paidAddress:false
      };
    }

    if(!businessAtHome){
      return {
        status:'already-separated',
        title:'Din hjemmeadresse er allerede adskilt fra virksomhedsadressen',
        summary:'Hvis CVR allerede bruger en anden gyldig virksomhedsadresse end din bopæl, er det ikke hjemmeadressen, der bliver vist som virksomhedens adresse.',
        paidAddress:false
      };
    }

    return {
      status:'separate-address',
      title:'Nej — ikke så længe hjemmet er virksomhedens registrerede adresse',
      summary:cprProtected
        ? 'CPR-navne- og adressebeskyttelse kan beskytte din privatadresse som person, men ikke en virksomhedsadresse. Når de to adresser er ens, vil adressen derfor fortsat kunne fremgå som virksomhedens adresse i CVR.'
        : 'Virksomhedsadressen offentliggøres i CVR. Hvis du ikke ønsker bopælen vist som virksomhedens adresse, kræver det i praksis, at virksomheden registreres på en anden gyldig adresse.',
      paidAddress:true
    };
  }
  return {assess};
});
