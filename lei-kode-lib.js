(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.FirmaKronerLei=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
  function assess(input={}){
    const entity=String(input.entity||'legal');
    const activity=String(input.activity||'trade');

    if(entity==='private'){
      return {
        status:'no-private',
        title:'Nej — ikke som privatperson',
        summary:'Fysiske personer identificeres med CPR-nummer og skal derfor ikke have en LEI-kode for almindelig handel med værdipapirer.',
        leiRequired:false
      };
    }

    if(entity==='sole'){
      if(activity==='derivatives'){
        return {
          status:'yes-sole-derivatives',
          title:'Ja — enkeltmandsvirksomhed + derivater er undtagelsen',
          summary:'Finanstilsynet oplyser, at en enkeltmandsvirksomhed skal have LEI-kode, når den handler derivater efter EMIR-reglerne.',
          leiRequired:true
        };
      }
      if(activity==='hold-only'){
        return {
          status:'no-hold',
          title:'Nej — ikke bare fordi virksomheden allerede ejer værdipapirer',
          summary:'Hvis der ikke skal købes eller sælges, udløser selve ejerskabet ikke et LEI-krav. For en enkeltmandsvirksomhed gælder der desuden særregler, og almindelig handel uden derivater kræver ikke LEI.',
          leiRequired:false
        };
      }
      if(activity==='trade'){
        return {
          status:'no-sole-normal',
          title:'Normalt nej for enkeltmandsvirksomhed',
          summary:'Finanstilsynet oplyser, at en enkeltmandsvirksomhed ikke skal have LEI-kode, når den handler andre finansielle instrumenter end derivater. Vælg derivater, hvis det er dét, du skal handle.',
          leiRequired:false
        };
      }
      return {
        status:'no-activity',
        title:'Nej — ikke uden en relevant finansiel transaktion',
        summary:'LEI-kravet er knyttet til bestemte aktiviteter på finansmarkederne, ikke til det at have et CVR-nummer i sig selv.',
        leiRequired:false
      };
    }

    if(entity==='legal'){
      if(activity==='hold-only'){
        return {
          status:'not-until-trade',
          title:'Ikke før selskabet vil købe eller sælge',
          summary:'En juridisk person må gerne eje værdipapirer uden LEI, hvis den ikke vil købe flere eller sælge. LEI bliver nødvendig i forbindelse med køb eller salg.',
          leiRequired:false
        };
      }
      if(activity==='trade'||activity==='derivatives'){
        return {
          status:'yes-legal',
          title:'Ja — juridisk person, der vil handle, skal have LEI',
          summary:'Selskaber, foreninger, fonde og andre juridiske personer skal have LEI-kode for at kunne købe eller sælge værdipapirer. Der er ingen bagatelgrænse for antal eller værdi.',
          leiRequired:true
        };
      }
      return {
        status:'no-activity',
        title:'Ikke alene fordi enheden eksisterer',
        summary:'Et selskab eller en anden juridisk person behøver ikke LEI alene på grund af CVR-nummeret. Kravet bliver relevant, når enheden vil gennemføre de finansielle transaktioner, reglerne omfatter.',
        leiRequired:false
      };
    }

    return {
      status:'check-entity',
      title:'Tjek først om du er en juridisk person i LEI-reglernes forstand',
      summary:'Checkeren kan sikkert afgøre privatperson, enkeltmandsvirksomhed og typiske juridiske personer som ApS/A/S, forening og fond. Andre konstruktioner bør afklares med værdipapirhandleren eller Finanstilsynets vejledning.',
      leiRequired:null
    };
  }
  return {assess};
});
